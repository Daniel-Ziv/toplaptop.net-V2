import React, { createContext, useContext, useState } from 'react';

interface Laptop {
    name: string;
    price: number;
    weight: number;
    screen_size: number;
    product_img: string;
    url: string;
    matchPercentage: number;
    manufacturer: string;
    laptopSeries: string;
    ram_size: number;
    ram_type: string;
    storage_space: string;
    storage_type: string;
    for_gaming: boolean;
    cpu: string;
    cpu_ghz: number;
    screen_hz: number;
    screenRes: string;
    screenType: string;
    connections: string[];
    touchscreen: boolean;
    security: string[];
    flippingScreen: boolean;
    cpuModel: string;
    cpuGen: string;
    withOs: string;
    gpu: string;
  }
  

interface ComparisonContextType {
  selectedLaptops: Laptop[];
  toggleLaptopSelection: (laptop: Laptop) => void;
  clearComparison: () => void;
  isCompareMode: boolean;
  setIsCompareMode: (value: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedLaptops, setSelectedLaptops] = useState<Laptop[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);

  const toggleLaptopSelection = (laptop: Laptop) => {
    if (!isCompareMode) return; // Only allow selection in compare mode
    
    setSelectedLaptops(prev => {
      const isSelected = prev.some(l => l.name === laptop.name);
      if (isSelected) {
        return prev.filter(l => l.name !== laptop.name);
      }
      if (prev.length < 2) {
        return [...prev, laptop];
      }
      return prev;
    });
  };

  const clearComparison = () => {
    setSelectedLaptops([]);
    setIsCompareMode(false);
  };

  return (
    <ComparisonContext.Provider value={{ 
      selectedLaptops, 
      toggleLaptopSelection, 
      clearComparison,
      isCompareMode,
      setIsCompareMode
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};