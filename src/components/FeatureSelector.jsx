import React, { useState, useMemo } from "react";
import { Cpu, MemoryStick, Microchip, MonitorCheck, HardDrive, Cable, Fingerprint, MonitorCog, Laptop, Battery, Wifi, Monitor, Gauge, RotateCw, Smartphone } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox } from "@nextui-org/react";
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
    "4 ג״ב",  // 68
    "16 ג״ב", // 2371
    "64 ג״ב", // 103
    "8 ג״ב",  // 991
    "32 ג״ב", // 952
    "128 ג״ב", // 2
],
  'סוג זכרון': [
    "DDR5",
    "DDR3",
    "DDR2",
    "DDR6"
  ],
  'נפח-אחסון': [
    "128 ג״ב",     // 44
    "160 ג״ב",     // 3
    "250 ג״ב",     // 1
    "256 ג״ב",     // 475
    "320 ג״ב",     // 7
    "512 ג״ב",     // 1946
    "640 ג״ב",     // 2
    "750 ג״ב",     // 7
    "1000 ג״ב",    // 1848
    "1256 ג״ב", // 5
    "2000 ג״ב",    // 191
    "3000 ג״ב",    // 1
    "4000 ג״ב", // 16
    "8000 ג״ב",    // 1

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
    "Razer",       // 16
  
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
  ],
  'סוג מסך': [
    "IPS",
    "OLED",
    "LED",
    "Mini-LED",
    "LCD",
    "VA",
    "TN",
    "AMOLED",
    "Retina",
    "Liquid Retina"
  ]
};
const featureNameMapping = {
  'מעבד': 'cpu',
  'ראם': 'ram_size',
  'סוג זכרון': 'ram_type',
  'נפח-אחסון': 'storage_space',
  'רזולוציית מסך': 'screenRes',
  'קצב רענון': 'screen_hz',
  'יצרן': 'manufacturer',
  'כרטיס מסך': 'gpu',
  'אבטחה': 'security',
  'חיבורים': 'connections',
  'מחשב שהוא גם טאבלט': 'flippingScreen',
  'סוג מסך': 'screenType'
};

const cpuModelScores = {

  "Intel Core i5": 6,
 
 "Intel Core i7": 8,
 
 "Intel Core Ultra 7": 8,
 
 "Intel Core i9": 10,
 
 "Intel Core i3": 4,
 
 "M1": 8,
 
 "Intel Core Ultra 5": 6,
 
 "Intel Celeron": 3,
 
 "AMD Ryzen 7": 8,
 
 "M3": 8,
 
 "AMD Athlon Silver": 4,
 
 "Intel Core Ultra 9": 10,
 
 "M2": 8,
 
 "Intel Processor": 4,
 
 "Intel Core 7": 8,
 
 "AMD Ryzen 5": 6,
 
 "M3 Pro": 8,
 
 "Intel Core 5": 6,
 
 "AMD Ryzen Ai 9": 10,
 
 "Intel Pentium": 3,
 
 "Intel Pentium Silver": 3,
 
 "AMD Ryzen 9": 10,
 
 "Intel N200": 3,
 
 "AMD Ryzen 7 PRO": 8,
 
 "Qualcomm Snapdragon": 8,
 
 "AMD": 4,
 
 "M3 Max": 10,
 
 "Intel N100": 2,
 
 "Intel Core 3": 4,
 
 "Qualcomm Snapdragon X Plus": 8,
 
 "M2 Max": 10,
 
 "M2 PRO": 8,
 
 "Intel Pentium Gold": 3,
 
 "AMD A4": 2,
 
 "X Elite": 6,
 
 "Intel Core 2 Duo": 2,
 
 "M1 Max": 10,
 
 "AMD Ryzen 5 PRO": 6,
 
 "Intel Atom": 2,
 
 "Intel Core M3": 4,
 
 "AMD Athlon Silver APU": 4,
 
 "Intel Core Duo": 2,
 
 "M1 Pro": 8,
 
 "Intel Core M5": 4,
 
 "Intel Xeon": 6,
 
 "AMD Ryzen 3": 4,
 
 "Intel Mobile": 4,
 
 "M4 Pro": 8,
 
 "M4": 8,
 
 "M4 Max": 10,
 
 };

const ramSizeScores = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 5,
  8: 6,
  12: 7,
  16: 8,
  18: 8,
  24: 8,
  32: 9,
  36: 9,
  48: 9,
  64: 10,
  93: 10,
  96: 10,
  128: 10,
};

const ramTypeScores = {
  "DDR2": 2,
  "DDR3": 3,
  "DDR4": 4,
  "DDR5": 5,
  "DDR6": 6,
  "DDRAM": 1
}

// GPU scores: mapping specific models to objective scores
const gpuModelScores = {
  "NVIDIA GTX 1650": 6,
  "NVIDIA GTX 1650 Ti": 6,
  "NVIDIA GeForce GTX 1060": 6,
  "NVIDIA GeForce GTX 1660Ti": 7,
  "NVIDIA GeForce GTX 960M": 5,
  "NVIDIA RTX 2060": 7,
  "NVIDIA RTX 3050": 7,
  "NVIDIA GeForce RTX 2060 Max-Q": 7,
  "NVIDIA GeForce RTX 3050 Ti": 7,
  "NVIDIA RTX 3060": 8,
  "NVIDIA GeForce RTX 3060": 8,
  "NVIDIA GeForce RTX 3070": 9,
  "NVIDIA GeForce RTX 3070 Ti": 9,
  "NVIDIA RTX 3070": 9,
  "NVIDIA GeForce RTX 3080": 10,
  "NVIDIA GeForce RTX 3080 Ti": 10,
  "NVIDIA RTX 3080": 10,
  "NVIDIA RTX 4060": 9,
  "NVIDIA RTX 4070": 9,
  "NVIDIA RTX 4080": 10,
  "NVIDIA RTX 4090": 10,
  "Intel UHD Graphics": 4,
  "Intel Iris Xe": 5,
  "Intel Iris Xe Graphics": 5,
  "Intel UHD Graphics 600": 3,
  "Intel UHD Graphics 605": 3,
  "Intel Iris Plus": 4,
  "Intel HD Graphics 620": 3,
  "Intel HD Graphics 520": 3,
  "Intel HD Graphics 4000": 3,
  "Intel HD Graphics 530": 3,
  "Intel HD Graphics": 2,
  "Intel UHD 600": 3,
  "Intel Iris Xe Max": 5,
  "Integrated Intel Iris Xe Graphics": 5,
  "Integrated Intel UHD Graphics": 4,
  "Intel Iris Plus Graphics": 4,
  "AMD Radeon RX 5600M": 7,
  "AMD Radeon RX 6800M": 9,
  "AMD Radeon RX 6800S": 9,
  "AMD Radeon RX 6500M": 6,
  "AMD Radeon RX Vega": 6,
  "AMD Radeon RX Vega 8": 5,
  "AMD Radeon Vega 7 Graphics": 5,
  "AMD Radeon 880M": 5,
  "AMD Radeon Pro 560": 5,
  "Integrated AMD Radeon 780M": 5,
  "AMD Radeon RX 890M": 6,
  "AMD Radeon Graphics": 5,
  "AMD Radeon R5": 2,
  "Integrated AMD Radeon": 4,
  "NVIDIA Quadro RTX 3000": 6,
  "NVIDIA Quadro RTX 4000": 7,
  "NVIDIA Quadro RTX 5000": 8,
  "NVIDIA Quadro T500": 4,
  "NVIDIA Quadro T2000": 5,
  "NVIDIA T1200": 5,
  "NVIDIA T600": 5,
  "NVIDIA RTX A500": 6,
  "NVIDIA RTX A1000": 7,
  "NVIDIA RTX A2000": 7,
  "NVIDIA RTX A3000": 8,
  "NVIDIA RTX A4000": 8,
  "NVIDIA RTX A5000": 9,
  "Intel Arc A370M": 6,
  "Intel Arc Graphics": 5,
  "Integrated Intel Arc Graphics": 5,
  "NVIDIA GeForce MX330": 4,
  "NVIDIA GeForce MX350": 5,
  "NVIDIA GeForce MX450": 5,
  "NVIDIA GeForce MX550": 6,
  "NVIDIA GeForce MX570": 6,
  "NVIDIA GeForce 940MX": 4,
  "Integrated Intel HD Graphics": 3,
  "Intel UHD Graphics 620": 4,
  "NVIDIA RTX 2000": 6,
  "NVIDIA RTX 2000 Ada": 7,
  "Intel Integrated Graphics": 3,
  "Intel Iris X Graphics": 5,
  "Core GPU-8": 6,
  "Core GPU-10": 7,
  "Core GPU-14": 8,
  "Core GPU-16": 8,
  "Core GPU-24": 9,
  "Core GPU-30": 9,
  "Core GPU-38": 10,
  "Core GPU-40": 10,
  "Qualcomm Adreno": 3,
  "Integrated Qualcomm Adreno GPU": 3,
  "NVIDIA RTX 5000 Ada": 9,
  "NVIDIA RTX 4000 Ada": 8,
  "NVIDIA RTX 3000 Ada": 7,
  "Intel GMA HD": 2,
  "Intel HD Graphics 400": 2,
  "NVIDIA GeForce GT 740M": 2,
  "NVIDIA GeForce GT 750M": 3,
  "NVIDIA GeForce GT 840M": 3,
  "NVIDIA GeForce GT 920M": 2,
  "NVIDIA GeForce GT 930M": 3,
  "NVIDIA GeForce GT 820M": 2,
  "NVIDIA GeForce GTX1070": 8,
  "NVIDIA GeForce GTX 950M": 4,
  "AMD Radeon R2": 1,
  "AMD Radeon R3": 2,
  "Intel Iris Graphics": 3,
  "Intel HD Graphics 3000": 2,
  "Intel HD Graphics 4400": 3,
  "Intel HD Graphics 5500": 3,
  "NVIDIA RTX 4000": 8,
  "NVIDIA Quadro T550": 5,
  "AMD Radeon RX 6850M": 8,
  "ATI Radeon hd3450": 1,
  "Intel HD Graphics 4200": 2,
  "Intel HD Graphics 515": 3,
  "NVIDIA GeForce GT 710M": 2,
  "NVIDIA GeForce GT 525M": 2,
  "NVIDIA GeForce GT 610M": 2,
  "NVIDIA GeForce RTX 4050": 8,  
  "7-Core GPU": 6,            
  "Intel Graphics": 3,        
  "10-Core GPU": 7,             
  "Integrated AMD Radeon 610M": 4,
  "NVIDIA Geforce RTX 2050": 6, 
  "Intel UMA": 3,               
  "Integrated AMD Radeon 680M Graphics": 5,
  "Integrated Intel UHD GRAPHICS 600": 3,
  "NVIDIA GeFORCE 920MX": 3,
  "NVIDIA RTX 500 ADA": 6,      
  "Nvidia RTX 3000 Ada": 7,     
  "GPU-618": 3,                  
  "AMD Radeon": 4,               
  "Integrated graphics": 3,    
  "AMD Radeon 610": 4,
  "AMD Radeon R7 M445": 4,
  "NVIDIA GeForce MX570 A": 6,   
  "Intel Premium UHD Graphics": 4,
  "Core GPU-19": 8,            
  "NVIDIA RTX A4500": 8,         
  "NVIDIA GeForce GTX1060": 6,  
  "Intel Iris Xe Graphics Eligible": 5, 
  "Integrated Intel UHD GRAPHICS 605": 3, 
  "NVIDIA RTX 3500": 7,
  "NVIDIA RTX 3500 Ada": 7,
  "Nvidia RTX 1000 Ada": 6,
  "Core GPU-32": 9,           
  "AMD Radeon 520": 3,
  "Intel HD Graphics 500": 2,
  "Intel HD Graphics 5000": 3,
  "Nvidia GeForce GTX 850M": 4,
  "AMD FirePro W4170M": 5,
  "NAVIDIA GeForce GTX970M": 6,
  "NVIDIA RTX A5500": 9,
  "Nvidia Quadro T1000": 5,
  "Integrated Qualcomm Adreno 680 GPU": 3,
  "ATI JET LE R5 M230": 2,
  "AMD FirePro W5130M": 5,
  "NVIDIA GeForce MX250": 4,
  "NVIDIA GeForce GTX1660": 7, 
  "NVIDIA GeForce RTX3000": 7,   
  "AMD Radeon R5 M335": 3,
  "Intel HD graphics 2000": 2,
  "AMD Radeon R9 M265X": 5,
  "NVIDIA Quardro RTX 3000": 6,  
  "AMD Radeon Pro 555X": 5,
  "Core GPU-20": 8,
  "Intel Graphic Media Accelerator": 2,
  "NVidia GeForce GT 525M": 2,   
  "NVIDIA GeForce GT 420M": 2,
  "NVIDIA GeForce GT 635M": 3,
  "Intel GMA 950": 1,
  "AMD Radeon HD 7730M": 4,
  "AMD Radeon HD7570M": 3,
  "Intel GMA X4500": 1,
  "NVIDIA GeForce GTX880M": 5,
  "AMD Radeon HD 8870M": 4,
  "ATI Radeon HD 5145": 2,
  "ATI Radeon HD 5650": 3,
  "ATI JET LE R5": 2,
  "16-Core GPU": 8,             
  "AMD Radeon R5 M230": 2,
  "AMD Radeon R3 Graphics": 2,   
  "Intel HD Graphics 630": 3,
  "Intel HD Graphics 600": 3,     
  "NVIDIA GeForce RTX 4090": 10, 
  "NVIDIA GeForce RTX 4080": 10, 
  "NVIDIA GeForce RTX 4070": 9,   
  "NVIDIA GeForce RTX 4060": 9,   
  "NVIDIA GeForce RTX 3050": 7,   
  "NVIDIA Geforce RTX 2060": 7,   
  "Intel Arc A350M": 5,
  "NVIDIA GeForce MX130": 3,
  "NVIDIA GeForce MX150": 3,
  "NVIDIA GeForce RTX 2070": 8,
  "NVIDIA GeForce RTX 2080": 9,
  "NVIDIA Quadro P520": 4,
  "NVIDIA Quadro P2000": 5,
  "AMD Radeon 890M": 5,
  "AMD Radeon R5 M430": 3,
  "Integrated AMD Radeon 660M": 4,
  "Integrated Intel Iris Plus Graphics": 4,
  "Core GPU-18": 8,
};

// Storage type scores: objective scores for storage types
const storageTypeScores = {
  "HDD": 4,
  "SSD": 8,
  "NVMe SSD": 10,
};

const storageSpaceScores = {
  16: 1,
  32: 2,
  64: 3,
  128: 4,
  160: 4,
  250: 5,
  256: 5,
  320: 6,
  500: 6,
  508: 6,          // 500+8
  524: 6,          // 500+24
  640: 6,
  750: 7,
  774: 7,          // 750+24
  1000: 7,
  1008: 7,         // 1000+8
  1024: 7,         // 1000+24
  1032: 7,         // 1000+32
  1128: 8,         // 1000+128
  1256: 8,         // 1000+256
  1512: 8,         // 1000+512
  2000: 8,
  3000: 9,
  4000: 10,
  8000: 10
}


// Update the features array to mark all features that have sub-selections
const features = [
  { name: 'מעבד', icon: <Cpu className="w-6 h-6" />, hasSubSelection: true },
  { name: 'ראם', icon: <MemoryStick className="w-6 h-6" />, hasSubSelection: true },
  { name: 'סוג זכרון', icon: <Microchip className="w-6 h-6" />, hasSubSelection: true },
  { name: 'נפח-אחסון', icon: <HardDrive className="w-6 h-6" />, hasSubSelection: true },
  { name: 'כרטיס מסך', icon: <MonitorCog className="w-6 h-6" />, hasSubSelection: true },
  { name: 'יצרן', icon: <Laptop className="w-6 h-6" /> , hasSubSelection: true},
  { name: 'חיבורים', icon: <Cable className="w-6 h-6" />, hasSubSelection: true },
  { name: 'אבטחה', icon: <Fingerprint className="w-6 h-6" />, hasSubSelection: true },
  { name: 'מחשב שהוא גם טאבלט', icon: <RotateCw className="w-6 h-6" />, isBooleanToggle: true },
  { name: 'רזולוציית מסך', icon: <MonitorCheck className="w-6 h-6" />, hasSubSelection: true },
  { name: 'סוג מסך', icon: <MonitorCheck className="w-6 h-6" />, hasSubSelection: true },
  { name: 'קצב רענון', icon: <Gauge className="w-6 h-6" />, hasSubSelection: true }
];

const categorizeByStrength = (items, scores) => {
  return items.reduce((acc, item) => {
    const score = scores[item] || 0;
    if (score >= 8) acc.strong.push(item);
    else if (score >= 5) acc.medium.push(item);
    else if (score > 0) acc.weak.push(item);
    else acc.uncategorized.push(item);
    return acc;
  }, { strong: [], medium: [], weak: [], uncategorized: [] });
};

const categorizeRamTypes = (items) => {
  return items.reduce((acc, item) => {
    if (item === "DDR5" || item === "DDR6") acc.fast.push(item);
    else acc.standard.push(item);
    return acc;
  }, { fast: [], standard: [] });
};



export default function FeatureSelector({ selectedFeatures, onSelectionChange }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [currentFeature, setCurrentFeature] = useState(null)
  const [tempSelections, setTempSelections] = useState({})
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFeature = (featureName) => {
    const feature = features.find(f => f.name === featureName)
    const englishName = featureNameMapping[featureName]
  
    if (feature?.isBooleanToggle) {
      const newFeatures = { ...selectedFeatures }
      if (selectedFeatures[englishName]) {
        delete newFeatures[englishName]
      } else {
        newFeatures[englishName] = true
      }
      onSelectionChange(newFeatures)
      return
    }
  
    if (feature?.hasSubSelection) {
      setCurrentFeature(featureName)
      setSearchQuery("")
      setTempSelections(prevSelections => ({
        ...prevSelections,
        [englishName]: selectedFeatures[englishName] || []
      }))
      onOpen()
    }
  }
  
  const isFeatureSelected = (feature) => {
    const englishName = featureNameMapping[feature.name]
    
    if (feature.isBooleanToggle) {
      return selectedFeatures[englishName] === true
    }
    
    return Array.isArray(selectedFeatures[englishName]) && 
           selectedFeatures[englishName].length > 0
  }

  const getSelectionCount = (feature) => {
    const englishName = featureNameMapping[feature.name]
    return selectedFeatures[englishName]?.length || 0
  }

  
  const sortFeatureOptions = (options, featureName) => {
    const numericFeatures = ['ראם', 'נפח-אחסון', 'קצב רענון', 'רזולוציית מסך'];
  
    if (numericFeatures.includes(featureName)) {
      // Sort numerically
      const sorted = [...options].sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      });
  
      // Arrange into columns
      const columnCount = 3; // Adjust for the number of columns you want
      const rowCount = Math.ceil(sorted.length / columnCount);
      const result = Array(sorted.length);
  
      sorted.forEach((item, index) => {
        const row = index % rowCount;
        const col = Math.floor(index / rowCount);
        const newIndex = row * columnCount + col;
        result[newIndex] = item;
      });
  
      return result.filter(Boolean);
    }
  
    // Alphabetical sort for non-numeric features
    return options.sort((a, b) => a.localeCompare(b));
  };
  
   
  
  const filteredOptions = useMemo(() => {
    if (!currentFeature || !searchQuery) {
      return sortFeatureOptions(subSelections[currentFeature] || [], currentFeature);
    }
    
    const filtered = subSelections[currentFeature].filter(option =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return sortFeatureOptions(filtered, currentFeature);
  }, [currentFeature, searchQuery]);



  
  const categorizedOptions = useMemo(() => {
    if (!currentFeature) return { items: [] };

    const options = filteredOptions;
    if (currentFeature === 'כרטיס מסך') {
      return categorizeByStrength(options, gpuModelScores);
    } else if (currentFeature === 'מעבד') {
      return categorizeByStrength(options, cpuModelScores);
    } else if (currentFeature === 'סוג זכרון') {
      return categorizeRamTypes(options);
    } else {
      return { items: options };
    }
  }, [currentFeature, filteredOptions]);

  const toggleSubSelection = (item) => {
    const englishName = featureNameMapping[currentFeature];
    
    if (englishName === 'ram_size') {
      const numericValue = parseInt(item.split(' ')[0]);
      setTempSelections(prev => {
        const current = prev[englishName] || [];
        return {
          ...prev,
          [englishName]: current.includes(numericValue) 
            ? current.filter(i => i !== numericValue)
            : [...current, numericValue]
        };
      });
      return;
    }
  
    if (englishName === 'storage_space') {
      const numericValue = parseInt(item);
      setTempSelections(prev => {
        const current = prev[englishName] || [];
        return {
          ...prev,
          [englishName]: current.includes(numericValue)
            ? current.filter(i => i !== numericValue)
            : [...current, numericValue]
        };
      });
      return;
    }
  
    if (englishName === 'screen_hz') {
      const numericValue = parseInt(item); // item is already a number
      setTempSelections(prev => {
        const current = prev[englishName] || [];
        return {
          ...prev,
          [englishName]: current.includes(numericValue)
            ? current.filter(i => i !== numericValue)
            : [...current, numericValue]
        };
      });
      return;
    }
  
    setTempSelections(prev => {
      const current = prev[englishName] || [];
      return {
        ...prev,
        [englishName]: current.includes(item)
          ? current.filter(i => i !== item)
          : [...current, item]
      };
    });
  };

  const toggleCategory = (category) => {
    const englishName = featureNameMapping[currentFeature];
    const categoryItems = categorizedOptions[category] || [];
    setTempSelections(prev => {
      const current = prev[englishName] || [];
      const allSelected = categoryItems.every(item => current.includes(item));
      const newSelections = allSelected
        ? current.filter(item => !categoryItems.includes(item))
        : [...new Set([...current, ...categoryItems])];
      return { ...prev, [englishName]: newSelections };
    });
  };

  const handleModalSave = () => {
    const englishName = featureNameMapping[currentFeature];
    const selections = tempSelections[englishName] || [];
    
    const newFeatures = {
      ...selectedFeatures,
      [englishName]: selections,
    };
  
    if (newFeatures[englishName].length === 0) {
      delete newFeatures[englishName];
    }
  
    onSelectionChange(newFeatures);
    onClose();
  };

  const handleModalClose = () => {
    setSearchQuery("");
    onClose();
  };

  const isItemSelected = (item) => {
    const englishName = featureNameMapping[currentFeature];
    
    if (englishName === 'ram_size') {
      const numericValue = parseInt(item.split(' ')[0]);
      const currentSelections = tempSelections[englishName] || [];
      return currentSelections.includes(numericValue);
    }
  
    if (englishName === 'storage_space') {
      return tempSelections[englishName]?.includes(parseInt(item)) || false;
    }
  
    if (englishName === 'screen_hz') {
      const numericValue = parseInt(item); // item is already a number
      return tempSelections[englishName]?.includes(numericValue) || false;
    }
  
    return tempSelections[englishName]?.includes(item) || false;
  };
  

  

  
  const renderCategorySection = (title, items, category) => {
    if (!items || items.length === 0) return null;
    const allSelected = items.every(item => isItemSelected(item));
    return (
      <div key={title} className="mb-4 ">
        <Button
          color={allSelected ? "primary" : "default"}
          variant="light"
          onClick={() => toggleCategory(category)}
          className="px-6 py-2 text-lg font-medium hover:bg-gray-100"
          startContent={
            <div className={`w-2 h-2 rounded-full ${
              allSelected ? 'bg-primary' : 'bg-gray-400'
            }`} 
            />
          }
        >
          {title}
        </Button>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {items.map((item) => (
            <Checkbox
              key={item}
              isSelected={isItemSelected(item)}
              onValueChange={() => toggleSubSelection(item)}
            >
              {item}
            </Checkbox>
          ))}
        </div>
      </div>
    );
  };

  const renderUncategorizedItems = (items) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item) => (
          <Checkbox
            key={item}
            isSelected={isItemSelected(item)}
            onValueChange={() => toggleSubSelection(item)}
          >
            {item}
          </Checkbox>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const isSelected = isFeatureSelected(feature);
            const selectionCount = getSelectionCount(feature);
            
            return (
              <button
                key={feature.name}
                onClick={() => toggleFeature(feature.name)}
                className={`h-24 p-2 border rounded-lg flex flex-col items-center justify-center transition-colors
                  ${isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-green-100 hover:bg-green-200'}`}
              >
                <div>{feature.icon}</div>
                <span className="mt-2">{feature.name}</span>
                {feature.tooltip && (
                  <span className="text-xs mt-1 opacity-75">{feature.tooltip}</span>
                )}
                {feature.hasSubSelection && selectionCount > 0 && (
                  <span className="text-xs mt-1">
                    {selectionCount} נבחרו
                  </span>
                )}
              </button>
            );
          })}
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
                  {(currentFeature === 'מעבד' || currentFeature === 'כרטיס מסך') && (
                  <Input
                    type="text"
                    placeholder="חפש..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search className="text-default-400" size={20} />}
                    size="sm"
                  />
                )}
                </div>
              </ModalHeader>
              <ModalBody className="overflow-y-auto ">
                {currentFeature === 'מעבד' || currentFeature === 'כרטיס מסך' ? (
                  <>
                    {renderCategorySection("חזק (לחיץ)", categorizedOptions.strong, "strong")}
                    {renderCategorySection("בינוני (לחיץ)", categorizedOptions.medium, "medium")}
                    {renderCategorySection("חלש (לחיץ)", categorizedOptions.weak, "weak")}
                    {renderCategorySection("אחר", categorizedOptions.uncategorized, "uncategorized")}
                  </>
                ) : currentFeature === 'סוג זכרון' ? (
                  <>
                    {renderCategorySection("מהיר (לחיץ)", categorizedOptions.fast, "fast")}
                    {renderCategorySection("סטנדרטי (לחיץ)", categorizedOptions.standard, "standard")}
                  </>
                ) : (
                  renderUncategorizedItems(categorizedOptions.items)
                )}
                {filteredOptions.length === 0 && searchQuery && (
                  <p className="text-center text-gray-500 my-4" dir="rtl">
                    לא נמצאו תוצאות עבור "{searchQuery}"
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="sticky bottom-0 z-10 bg-white shadow-sm">
                
                <Button color="danger" variant="light" onPress={onClose}>
                  ביטול
                </Button>
                <Button color="primary" onPress={handleModalSave}>
                  שמור {(() => {
                    const englishName = featureNameMapping[currentFeature];
                    return tempSelections[englishName]?.length > 0 
                      ? `(${tempSelections[englishName].length})`
                      : '';
                  })()}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}