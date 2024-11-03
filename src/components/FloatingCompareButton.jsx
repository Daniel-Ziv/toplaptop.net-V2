import React, { useEffect, useState, useRef } from 'react';
import { Diff } from "lucide-react";
import { useComparison } from './ComparisonContext.tsx';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";





const ComparisonPopup = ({ isOpen, onClose, laptops }) => {
  if (!laptops || laptops.length !== 2) {
    return null;
  }

  const compareSpecs = (spec, laptop1, laptop2) => {
    if (!laptop1 || !laptop2) return { comparison: 'נסו שוב או עם מחשבים אחרים', winner: null };
    
    const value1 = laptop1[spec];
    const value2 = laptop2[spec];
    
    // Skip comparison if both values are empty or unavailable
    if ((value1 === 'לא זמין' && value2 === 'לא זמין') || 
        (value1 === undefined && value2 === undefined) ||
        (value1 === '' && value2 === '') ||
        (value1 === null && value2 === null)) {
        return null;
    }

    

    // Special handling for different specs
    switch (spec) {
        case 'price':
            if (typeof value1 !== 'number' || typeof value2 !== 'number') return null;
            if (value1 === value2) return { comparison: 'המחיר זהה', winner: 'tie' };
            return { 
                comparison: `הפרש של ${Math.abs(value1 - value2).toLocaleString()} ₪`,
                winner: value1 < value2 ? 'laptop1' : 'laptop2'
            };
            
        case 'ram_size':
            const ram1 = parseFloat(value1);
            const ram2 = parseFloat(value2);
            if (!isNaN(ram1) && !isNaN(ram2)) {
                if (ram1 === ram2) return { comparison: 'זיכרון זהה', winner: 'tie' };
                return {
                    comparison: `הפרש של ${Math.abs(ram1 - ram2)}GB`,
                    winner: ram1 > ram2 ? 'laptop1' : 'laptop2'
                };
            }
            return null;
            
        case 'cpu':
        case 'cpuModel':
        case 'cpuGeneration':
        case 'ram_type':
        case 'storage_type':
        case 'screenType':
        case 'operatingSystem':
            // For text-based comparisons
            if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין') return null;
            return {
                comparison: value1 === value2 ? 'זהה' : 'שונה',
                winner: null
            };

        case 'cpu_ghz':
            const speed1 = parseFloat(value1);
            const speed2 = parseFloat(value2);
            if (!isNaN(speed1) && !isNaN(speed2)) {
                if (speed1 === speed2) return { comparison: 'מהירות זהה', winner: 'tie' };
                return {
                    comparison: `הפרש של ${Math.abs(speed1 - speed2).toFixed(1)}GHz`,
                    winner: speed1 > speed2 ? 'laptop1' : 'laptop2'
                };
            }
            return null;

        case 'storage_space':
            const storage1 = parseInt(value1);
            const storage2 = parseInt(value2);
            if (!isNaN(storage1) && !isNaN(storage2)) {
                if (storage1 === storage2) return { comparison: 'נפח זהה', winner: 'tie' };
                return {
                    comparison: `הפרש של ${Math.abs(storage1 - storage2)}GB`,
                    winner: storage1 > storage2 ? 'laptop1' : 'laptop2'
                };
            }
            return null;

        case 'screen_size':
            const size1 = parseFloat(value1);
            const size2 = parseFloat(value2);
            if (!isNaN(size1) && !isNaN(size2)) {
                if (size1 === size2) return { comparison: 'גודל זהה', winner: 'tie' };
                return {
                    comparison: `הפרש של ${Math.abs(size1 - size2).toFixed(1)} אינץ'`,
                    winner: size1 > size2 ? 'laptop1' : 'laptop2'
                };
            }
            return null;

        case 'screenRefreshRate':
            const rate1 = parseInt(value1);
            const rate2 = parseInt(value2);
            if (!isNaN(rate1) && !isNaN(rate2)) {
                if (rate1 === rate2) return { comparison: 'קצב רענון זהה', winner: 'tie' };
                return {
                    comparison: `הפרש של ${Math.abs(rate1 - rate2)}Hz`,
                    winner: rate1 > rate2 ? 'laptop1' : 'laptop2'
                };
            }
            return null;

        case 'weight':
            const weight1 = parseFloat(value1);
            const weight2 = parseFloat(value2);
            if (!isNaN(weight1) && !isNaN(weight2)) {
                if (weight1 === weight2) return { comparison: 'משקל זהה', winner: 'tie' };
                return {
                    comparison: `הפרש של ${Math.abs(weight1 - weight2).toFixed(2)}kg`,
                    winner: weight1 < weight2 ? 'laptop1' : 'laptop2' // lighter is better
                };
            }
            return null;

        case 'screenResolution':
            if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין') return null;
            return {
                comparison: value1 === value2 ? 'רזולוציה זהה' : 'רזולוציה שונה',
                winner: null
            };

        // Add any remaining specific cases here
        default:
            // Only compare if both values are present and not 'לא זמין'
            if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין') return null;
            if (value1 === value2) return { comparison: 'זהה', winner: 'tie' };
            return { 
                comparison: 'שונה',
                winner: null
            };
    }
};

  const specs = [
    { key: 'product_img', label: '' },  // changed from 'image'
    { key: 'cpu', label: 'מעבד' },           // changed from 'processor'
    { key: 'cpuModel', label: 'דגם מעבד' },  // added
    { key: 'cpuGeneration', label: 'דור מעבד' }, // added
    { key: 'cpu_ghz', label: 'מהירות מעבד' }, // added
    { key: 'ram_size', label: 'זיכרון RAM' },
    { key: 'ram_type', label: 'סוג זיכרון' }, // added
    { key: 'storage_space', label: 'נפח אחסון' }, // changed from 'storage'
    { key: 'storage_type', label: 'סוג אחסון' }, // added
    { key: 'screen_size', label: 'גודל מסך' }, // changed from 'display'
    { key: 'screenRefreshRate', label: 'קצב רענון מסך' }, // added
    { key: 'screenResolution', label: 'רזולוציה' }, // added
    { key: 'screenType', label: 'סוג מסך' }, // added
    { key: 'for_gaming', label: 'לגיימינג' }, // added
    { key: 'touchscreen', label: 'מסך מגע' }, // added
    { key: 'flippingScreen', label: 'מסך מתהפך' }, // added
    { key: 'connections', label: 'חיבורים' }, // added
    { key: 'security', label: 'אבטחה' }, // added
    { key: 'operatingSystem', label: 'מערכת הפעלה' }, // added
    { key: 'weight', label: 'משקל' }, // added
    { key: 'price', label: 'מחיר' },
    { key: 'gpu' , label: 'כרטיס מסך' }, // added
];

const renderSpec = (spec, laptopIndex) => {
  const value1 = laptops[0][spec.key];
  const value2 = laptops[1][spec.key];
  
  // Skip only if both values are unavailable
  if (value1 === 'לא זמין' && value2 === 'לא זמין') {
      return null;
  }

  // For image, always render without highlighting
  if (spec.key === 'product_img') {
      return (
          <div key={spec.key} style={{ padding: '8px' }}>
              <img 
                  src={laptops[laptopIndex].product_img}
                  alt={laptops[laptopIndex].name}
                  style={{ 
                      width: '100%', 
                      height: 'auto', 
                      borderRadius: '4px' 
                  }}
              />
          </div>
      );
  }

  const value = laptops[laptopIndex][spec.key];
  const valueStyle = getValueStyle(spec, laptopIndex);
  
  return (
      <div key={spec.key} style={{ padding: '8px' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px' }}>{spec.label}</div>
          {/* For boolean values */}
          {['for_gaming', 'touchscreen', 'flippingScreen'].includes(spec.key) ? (
              <span style={valueStyle}>
                  {value === true ? 'כן' : value === false ? 'לא' : 'לא זמין'}
              </span>
          ) : (
              <span style={valueStyle}>
                  {value || 'לא זמין'}
              </span>
          )}
      </div>
  );
};
const getBackgroundColor = (spec, laptopIndex) => {
  const result = compareSpecs(spec.key, laptops[0], laptops[1]);
  // Check if result is null before trying to access winner property
  if (!result) return '';
  if (result.winner === 'tie' || result.winner === null) return '';
  if (laptopIndex === 0 && result.winner === 'laptop1') return 'bg-green-100';
  if (laptopIndex === 1 && result.winner === 'laptop2') return 'bg-green-100';
  return 'bg-red-100';
};

const getValueStyle = (spec, laptopIndex) => {
  const result = compareSpecs(spec.key, laptops[0], laptops[1]);
  if (!result || result.winner === 'tie' || result.winner === null) return {};
  
  const baseStyle = {
      padding: '2px 8px',
      borderRadius: '4px',
  };
  

  if ((laptopIndex === 0 && result.winner === 'laptop1') || 
      (laptopIndex === 1 && result.winner === 'laptop2')) {
      return {
          ...baseStyle,
          backgroundColor: '#dcfce7', // light green
      };
  }
  
  return {
      ...baseStyle,
      backgroundColor: '#fee2e2', // light red
  };
};


const generateSummary = () => {
  const advantages = {
      laptop1: [],
      laptop2: []
  };

  specs.forEach(spec => {
      if (spec.key === 'product_img') return;
      const result = compareSpecs(spec.key, laptops[0], laptops[1]);
      // Only process if result exists and has a winner
      if (result && result.winner === 'laptop1') {
          advantages.laptop1.push(spec.label);
      } else if (result && result.winner === 'laptop2') {
          advantages.laptop2.push(spec.label);
      }
  });

  return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold mb-3">סיכום השוואה</h3>
          <div className="grid grid-cols-2 gap-4">
              <div>
                  <h4 className="font-bold text-sm mb-2">{laptops[0].manufacturer} {laptops[0].laptopSeries} - יתרונות:</h4>
                  {advantages.laptop1.length > 0 ? (
                      <ul className="list-disc list-inside">
                          {advantages.laptop1.map(adv => (
                              <li key={adv} className="text-sm">{adv}</li>
                          ))}
                      </ul>
                  ) : (
                      <p className="text-sm text-gray-500">אין יתרונות בולטים</p>
                  )}
              </div>
              <div>
                  <h4 className="font-bold text-sm mb-2">{laptops[1].manufacturer} {laptops[1].laptopSeries} - יתרונות:</h4>
                  {advantages.laptop2.length > 0 ? (
                      <ul className="list-disc list-inside">
                          {advantages.laptop2.map(adv => (
                              <li key={adv} className="text-sm">{adv}</li>
                          ))}
                      </ul>
                  ) : (
                      <p className="text-sm text-gray-500">אין יתרונות בולטים</p>
                  )}
              </div>
          </div>
      </div>
  );
};

  return (
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
        className="rtl h-[90vh] sm:h-auto mx-auto w-full max-w-full sm:max-w-4xl"
        hideCloseButton
        isDismissable={true}
        onClickOutside={onClose}
      >
        <ModalContent className="h-full">
          <ModalHeader className="flex flex-col gap-1 border-b">
            השוואת מחשבים ניידים
          </ModalHeader>
          <ModalBody className="overflow-x-hidden">
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column - First Laptop */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-center">{laptops[0].manufacturer} {laptops[0].laptopSeries}</h3>
                <div className="space-y-4">
                  {specs.map(spec => renderSpec(spec, 0))}
                </div>
              </div>
  
              {/* Right Column - Second Laptop */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-center">{laptops[1].manufacturer} {laptops[1].laptopSeries}</h3>
                <div className="space-y-4">
                  {specs.map(spec => renderSpec(spec, 1))}
                </div>
              </div>
            </div>
  
            {generateSummary()}
          </ModalBody>
          <ModalFooter className="border-t">
            <Button 
              color="danger" 
              variant="light" 
              onPress={onClose}
              className="mx-auto"
            >
              סגור
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
// Rest of the FloatingCompareButton component remains the same
const FloatingCompareButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { selectedLaptops, isCompareMode, setIsCompareMode } = useComparison();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isCompareMode) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
      
      const bottomThreshold = 70;
      const isBottom =
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - bottomThreshold;
      
      if (isBottom !== isAtBottom) {
        setIsAtBottom(isBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAtBottom, isCompareMode]);

  const handleClick = () => {
    if (isCompareMode && selectedLaptops.length === 0) {
      setIsCompareMode(false);
      return;
    }
    
    if (!isCompareMode) {
      setIsCompareMode(true);
      return;
    }
    
    if (selectedLaptops.length === 2) {
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const getButtonText = () => {
    if (!isCompareMode) {
      return "השוואת מחשבים";
    }
    
    switch (selectedLaptops.length) {
      case 0:
        return "בחרו מחשב/לחצו לביטול";
      case 1:
        return "בחרו עוד אחד";
      case 2:
        return "לחץ להשוואה";
      default:
        return "השוואת מחשבים";
    }
  };

  const getButtonColors = () => {
    if (!isCompareMode) {
      return {
        base: '#198754',
        hover: '#157347'
      };
    }
    if (selectedLaptops.length === 2) {
      return {
        base: '#198754',
        hover: '#157347'
      };
    }
    return {
      base: '#6c757d',
      hover: '#5c636a'
    };
  };

  const colors = getButtonColors();
  const buttonText = getButtonText();

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 50,
          transform: `translateY(${isVisible && !isAtBottom ? '0' : '100%'})`,
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isVisible && !isAtBottom ? 1 : 0,
          pointerEvents: isVisible && !isAtBottom ? 'auto' : 'none',
        }}
      >
        <button
          onClick={handleClick}
          style={{
            width: '256px',
            height: '48px',
            fontSize: '1.125rem',
            backgroundColor: colors.base,
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.hover;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.base;
          }}
        >
          <span>{buttonText}</span>
          <Diff size={20} />
        </button>
      </div>

      <ComparisonPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        laptops={selectedLaptops}
      />
    </>
  );
};

export default FloatingCompareButton;