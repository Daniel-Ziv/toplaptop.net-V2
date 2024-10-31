import React, { useState, useMemo } from "react";
import { Cpu, MemoryStick, Microchip, MonitorCheck, HardDrive, Cable, Fingerprint, MonitorCog, Laptop, Battery, Wifi, Monitor, Gauge } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Search } from "lucide-react";

const subSelections = {
  'מעבד': [
    "Intel Core i7",
    "Intel Core i5",
    "Intel Core i9",
    "Intel Core Ultra 7",
    "Intel Core i3",
    "Intel Core Ultra 5",
    "AMD Ryzen 7",
    "Intel Core Ultra 9",
    "Intel Core 7",
    "Intel Celeron",
    "Intel Core 5",
    "AMD Ryzen 9",
    "M1",
    "M2",
    "AMD Ryzen Ai 9",
    "M3",
    "AMD Ryzen 5",
    "AMD Ryzen 7 PRO",
    "M3 Pro",
    "M3 Max",
    "Qualcomm Snapdragon",
    "Intel Pentium Silver",
    "M2 Max",
    "M2 PRO",
    "Intel Core 3",
    "Intel Processor",
    "Intel Core 2 Duo",
    "AMD",
    "AMD Athlon Silver",
    "Intel Pentium Gold",
    "M1 Pro",
    "Intel Pentium"
  ],
  'ראם': [
    "16 ג״ב", // 2371
    "8 ג״ב",  // 991
    "32 ג״ב", // 952
    "64 ג״ב", // 103
    "4 ג״ב",  // 68
    "24 ג״ב", // 49
    "36 ג״ב", // 13
    "3 ג״ב",  // 6
    "2 ג״ב",  // 6
    "18 ג״ב", // 5
    "12 ג״ב", // 4
    "128 ג״ב", // 2
    "96 ג״ב",  // 2
    "48 ג״ב",  // 2
    "93 ג״ב"   // 1
],
  'סוג זכרון': [
    "DDR5",
    "DDR3",
    "DDRAM",
    "DDR2",
    "DDR6"
  ],
  'נפח-אחסון': [
    "128 ג״ב",     // 44
    "160 ג״ב",     // 3
    "250 ג״ב",     // 1
    "256 ג״ב",     // 475
    "320 ג״ב",     // 7
    "500 ג״ב",     // 6
    "512 ג״ב",     // 1946
    "640 ג״ב",     // 2
    "750 ג״ב",     // 7
    "1000 ג״ב",    // 1848
    "2000 ג״ב",    // 191
    "3000 ג״ב",    // 1
    "4000 ג״ב",    // 4
    "8000 ג״ב",    // 1
    "500+8 ג״ב",   // 2
    "1000+8 ג״ב",  // 3
    "500+24 ג״ב",  // 3
    "750+24 ג״ב",  // 1
    "1000+24 ג״ב", // 1
    "1000+32 ג״ב", // 1
    "1000+128 ג״ב", // 1
    "1000+256 ג״ב", // 5
    "1000+512 ג״ב", // 3
    "1000+1000 ג״ב", // 17
    "2000+2000 ג״ב", // 16
    "4000+4000 ג״ב"  // 1
],
  'רזולוציית מסך': [
    "1366x768",
    "1900x1200",
    "1920x1080",
    "1920x1200",
    "2048x1280",
    "2160x1350",
    "2240x1400",
    "2256x1504",
    "2496x1664",
    "2560x1440",
    "2560x1600",
    "2560x1664",
    "2880x1620",
    "2880x1800",
    "3000x2000",
    "3024x1964",
    "3072x1920",
    "3200x2000",
    "3456x2160",
    "3456x2234",
    "3840x2160",
    "3840x2400"
  ],
  'קצב רענון': [
    "60 הרץ",
    "90 הרץ",
    "120 הרץ",
    "144 הרץ",
    "165 הרץ",
    "240 הרץ",
    "300 הרץ",
    "360 הרץ"
  ],
  'יצרן': [
    "Lenovo",      // 1720
    "Asus",        // 1340
    "Dell",        // 944
    "HP",          // 901
    "Apple",       // 254
    "Acer",        // 137
    "Microsoft",   // 85
    "Gigabyte",    // 78
    "Dynabook",    // 78
    "MSI",         // 26
    "Panasonic",   // 23
    "Getac",       // 17
    "Razer",       // 16
    "Gateway",     // 9
    "LG",          // 6
    "Emdoor",      // 6
    "Gurren Buggie", // 5
    "Huawei",      // 3
    "Xiaomi",      // 3
    "Fujitsu",     // 3
    "Samsung",     // 2
    "Blackview",   // 1
    "Alienware",   // 1
    "AData",       // 1
    "Iview",       // 1
  ],
  'כרטיס מסך': [
    "Intel Iris Xe Graphics",
    "Integrated Intel Iris Xe Graphics",
    "Intel UHD Graphics",
    "Integrated Intel UHD Graphics",
    "NVIDIA GeForce RTX 4060",
    "Integrated Intel Graphics",
    "NVIDIA GeForce RTX 4050",
    "Intel Arc Graphics",
    "NVIDIA GeForce RTX 3050",
    "Intel Graphics",
    "NVIDIA GeForce RTX 4070",
    "NVIDIA GeForce RTX 3060",
    "NVIDIA GeForce RTX 3050 Ti",
    "Intel Iris Plus",
    "NVIDIA GeForce RTX 4080",
    "Intel Iris X Graphics",
    "NVIDIA GeForce MX450",
    "NVIDIA Geforce RTX 2050",
    "NVIDIA GeForce RTX 3070 Ti",
    "NVIDIA GeForce RTX 4090",
    "NVIDIA RTX A500",
    "NVIDIA GeForce RTX 3070",
    "Integrated AMD Radeon Graphics",
    "Nvidia RTX 2000 Ada",
    "10-Core GPU",
    "NVIDIA RTX A2000",
    "NVIDIA RTX 2000",
    "NVIDIA RTX A1000",
    "Intel HD Graphics 620",
    "NVIDIA GeForce MX330",
    "AMD Radeon Graphics",
    "NVIDIA GeForce MX350",
    "Intel Integrated Graphics",
    "NVIDIA GeForce MX550",
    "Intel UHD 600",
    "Intel UMA",
    "NVIDIA RTX A3000",
    "Integrated AMD Radeon 780M",
    "NVIDIA RTX 500 ADA",
    "NVIDIA GeForce GTX 1650",
    "Integrated AMD Radeon 680M Graphics",
    "NVIDIA GeForce RTX 3080",
    "Intel UHD Graphics 620",
    "AMD Radeon 880M",
    "Intel Iris Plus Graphics",
    "Intel HD Graphics 4000",
    "Intel HD Graphics"
  ],
  'אבטחה': [
    "קורא טביעות אצבע",
    "מצלמת IR"
  ],
  'חיבורים': [
    "Bluetooth",
    "USB",
    "HDMI",
    "אוזניות/מיקרופון",
    "USB-C",
    "DisplayPort",
    "RJ-45",
    "Thunderbolt",
    "Card Reader",
    "VGA",
    "S-Video"
  ]
};

// Update the features array to mark all features that have sub-selections
const features = [
  { name: 'מעבד', icon: <Cpu className="w-6 h-6" />, hasSubSelection: true },
  { name: 'ראם', icon: <MemoryStick className="w-6 h-6" />, hasSubSelection: true },
  { name: 'סוג זכרון', icon: <Microchip className="w-6 h-6" />, hasSubSelection: true },
  { name: 'נפח-אחסון', icon: <HardDrive className="w-6 h-6" />, hasSubSelection: true },
  { name: 'כרטיס מסך', icon: <MonitorCog className="w-6 h-6" />, hasSubSelection: true },
  { name: 'יצרן', icon: <Laptop className="w-6 h-6" /> , hasSubSelection: true},
  { name: 'חיי-סוללה', icon: <Battery className="w-6 h-6" /> },
  { name: 'חיבורים', icon: <Cable className="w-6 h-6" />, hasSubSelection: true },
  { name: 'אחריות', icon: <Monitor className="w-6 h-6" /> },
  { name: 'טביעת אצבע', icon: <Fingerprint className="w-6 h-6" />, hasSubSelection: true },
  { name: 'רזולוציית מסך', icon: <MonitorCheck className="w-6 h-6" />, hasSubSelection: true },
  { name: 'קצב רענון', icon: <Gauge className="w-6 h-6" />, hasSubSelection: true }
];



export default function FeatureSelector({ selectedFeatures, onSelectionChange }) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [currentFeature, setCurrentFeature] = useState(null);
  const [tempSelections, setTempSelections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFeature = (featureName) => {
    const feature = features.find(f => f.name === featureName);
    
    if (feature?.hasSubSelection) {
      setCurrentFeature(featureName);
      setSearchQuery(""); // Reset search when opening modal
      setTempSelections(prevSelections => ({
        ...prevSelections,
        [featureName]: selectedFeatures[featureName] || []
      }));
      onOpen();
      return;
    }

    const newFeatures = {
      ...selectedFeatures,
      [featureName]: selectedFeatures[featureName] ? null : true
    };

    if (newFeatures[featureName] === null) {
      delete newFeatures[featureName];
    }

    onSelectionChange(newFeatures);
  };

  const filteredOptions = useMemo(() => {
    if (!currentFeature || !searchQuery) return subSelections[currentFeature] || [];
    
    return subSelections[currentFeature].filter(option =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentFeature, searchQuery]);

  const toggleSubSelection = (item) => {
    setTempSelections(prev => {
      const current = prev[currentFeature] || [];
      const newSelections = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [currentFeature]: newSelections };
    });
  };

  const handleModalSave = () => {
    const newFeatures = {
      ...selectedFeatures,
      [currentFeature]: tempSelections[currentFeature]
    };

    if (newFeatures[currentFeature].length === 0) {
      delete newFeatures[currentFeature];
    }

    onSelectionChange(newFeatures);
    onClose();
  };

  const handleModalClose = () => {
    setSearchQuery(""); // Reset search when closing
    onClose();
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <button
              key={feature.name}
              onClick={() => toggleFeature(feature.name)}
              className={`h-24 p-2 border rounded-lg flex flex-col items-center justify-center transition-colors
                ${selectedFeatures[feature.name] === true
                  ? 'bg-blue-500 text-white'
                  : Array.isArray(selectedFeatures[feature.name]) && selectedFeatures[feature.name].length > 0
                    ? 'bg-blue-500 text-white'
                    : feature.hasSubSelection
                      ? 'bg-green-100 hover:bg-green-200'
                      : 'bg-gray-200 hover:bg-blue-400 hover:text-white'}`}
            >
              <div>{feature.icon}</div>
              <span className="mt-2">{feature.name}</span>
              {feature.tooltip && (
                <span className="text-xs mt-1 opacity-75">{feature.tooltip}</span>
              )}
              {feature.hasSubSelection && selectedFeatures[feature.name]?.length > 0 && (
                <span className="text-xs mt-1">
                  {selectedFeatures[feature.name].length} נבחרו
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={handleModalClose}
        size="2xl"
        dir="rtl"
        scrollBehavior="inside"
        className="!h-[90vh]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="sticky top-0 z-10 bg-white shadow-sm">
                <div className="w-full flex flex-col gap-4">
                  <h3>בחר {currentFeature}</h3>
                  <Input
                    type="text"
                    placeholder="חפש..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search className="text-default-400" size={20} />}
                    size="sm"
                  />
                </div>
              </ModalHeader>
              <ModalBody className="overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredOptions.map((item) => (
                    <Button
                      key={item}
                      color={tempSelections[currentFeature]?.includes(item) ? "primary" : "default"}
                      variant={tempSelections[currentFeature]?.includes(item) ? "solid" : "bordered"}
                      onClick={() => toggleSubSelection(item)}
                      className="h-12 w-full px-2"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        whiteSpace: 'normal',
                        height: '48px',
                        lineHeight: '1.2'
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                {filteredOptions.length === 0 && searchQuery && (
                  <p className="text-center text-gray-500 my-4">
                    לא נמצאו תוצאות עבור "{searchQuery}"
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="sticky bottom-0 z-10 bg-white shadow-sm">
                <Button color="danger" variant="light" onPress={onClose}>
                  ביטול
                </Button>
                <Button color="primary" onPress={handleModalSave}>
                  שמור {tempSelections[currentFeature]?.length > 0 ? `(${tempSelections[currentFeature].length})` : ''}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}