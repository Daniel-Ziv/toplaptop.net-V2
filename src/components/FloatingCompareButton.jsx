import React, { useEffect, useState, useRef } from 'react';
import { Diff } from "lucide-react";
import { useComparison } from './ComparisonContext.tsx';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ComparisonPopup = ({ isOpen, onClose, laptops }) => {
  if (!laptops || laptops.length !== 2) {
    return null;
  }

  const compareSpecs = (spec, laptop1, laptop2) => {
    if (!laptop1 || !laptop2) return { comparison: 'מידע לא זמין', winner: null };
    
    const value1 = laptop1[spec];
    const value2 = laptop2[spec];
    
    if (value1 === undefined || value2 === undefined) return { comparison: 'מידע לא זמין', winner: null };
    
    if (spec === 'price') {
      if (typeof value1 !== 'number' || typeof value2 !== 'number') return { comparison: 'מידע לא זמין', winner: null };
      if (value1 === value2) return { comparison: 'זהה', winner: 'tie' };
      return { 
        comparison: `${Math.abs(value1 - value2)} ₪ ${value1 > value2 ? 'יקר יותר' : 'זול יותר'}`,
        winner: value1 < value2 ? 'laptop1' : 'laptop2'
      };
    }

    // For RAM comparison (assuming format like "16GB")
    if (spec === 'ram') {
      const ram1 = parseInt(value1);
      const ram2 = parseInt(value2);
      if (!isNaN(ram1) && !isNaN(ram2)) {
        return {
          comparison: 'שונה',
          winner: ram1 > ram2 ? 'laptop1' : ram1 < ram2 ? 'laptop2' : 'tie'
        };
      }
    }
    
    return { 
      comparison: value1 === value2 ? 'זהה' : 'שונה',
      winner: value1 === value2 ? 'tie' : null
    };
  };

  const specs = [
    { key: 'image', label: 'תמונה' },
    { key: 'processor', label: 'מעבד' },
    { key: 'ram', label: 'זיכרון RAM' },
    { key: 'storage', label: 'אחסון' },
    { key: 'display', label: 'מסך' },
    { key: 'graphics', label: 'כרטיס מסך' },
    { key: 'price', label: 'מחיר' }
  ];

  const getBackgroundColor = (spec, laptopIndex) => {
    const result = compareSpecs(spec.key, laptops[0], laptops[1]);
    if (result.winner === 'tie' || result.winner === null) return '';
    if (laptopIndex === 0 && result.winner === 'laptop1') return 'bg-green-100';
    if (laptopIndex === 1 && result.winner === 'laptop2') return 'bg-green-100';
    return 'bg-red-100';
  };

  const generateSummary = () => {
    const advantages = {
      laptop1: [],
      laptop2: []
    };

    specs.forEach(spec => {
      if (spec.key === 'image') return;
      const result = compareSpecs(spec.key, laptops[0], laptops[1]);
      if (result.winner === 'laptop1') {
        advantages.laptop1.push(spec.label);
      } else if (result.winner === 'laptop2') {
        advantages.laptop2.push(spec.label);
      }
    });

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-bold mb-3">סיכום השוואה</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-sm mb-2">{laptops[0].name} - יתרונות:</h4>
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
            <h4 className="font-bold text-sm mb-2">{laptops[1].name} - יתרונות:</h4>
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
      isDismissable={false}
    >
      <ModalContent className="h-full">
        <ModalHeader className="flex flex-col gap-1 border-b">
          השוואת מחשבים ניידים
        </ModalHeader>
        <ModalBody className="overflow-x-hidden">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column - First Laptop */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-center">{laptops[0].name}</h3>
              <div className="space-y-4">
                {specs.map(spec => (
                  <div key={spec.key} className={`p-2 rounded ${getBackgroundColor(spec, 0)}`}>
                    <div className="font-medium mb-1">{spec.label}</div>
                    {spec.key === 'image' ? (
                      <img 
                        src={laptops[0].imageUrl} 
                        alt={laptops[0].name}
                        className="w-full h-auto rounded"
                      />
                    ) : (
                      <div>{laptops[0][spec.key] || 'לא זמין'}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Second Laptop */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-center">{laptops[1].name}</h3>
              <div className="space-y-4">
                {specs.map(spec => (
                  <div key={spec.key} className={`p-2 rounded ${getBackgroundColor(spec, 1)}`}>
                    <div className="font-medium mb-1">{spec.label}</div>
                    {spec.key === 'image' ? (
                      <img 
                        src={laptops[1].imageUrl} 
                        alt={laptops[1].name}
                        className="w-full h-auto rounded"
                      />
                    ) : (
                      <div>{laptops[1][spec.key] || 'לא זמין'}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Section */}
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
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
      
      const bottomThreshold = 50;
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
  }, [isAtBottom]);

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