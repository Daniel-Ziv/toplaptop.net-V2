import { Check,X,  ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Image, CircularProgress, Card, CardBody, CardFooter, Button, Modal } from "@nextui-org/react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useComparison}  from './ComparisonContext';
import styles from "./ProductCard.module.css";
import { motion } from "framer-motion";
import LaptopDetailsModal from './LaptopDetailsModal';

interface ComponentScore {
  name: string;
  score: number;
}



interface ProductCardProps {
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
  storage_space: any;
  storage_type: string;
  for_gaming: boolean;
  cpu: string;
  cpu_ghz: number;
  screenhz: number;
  screenRes: string;
  screenType: string;
  connections: string[];
  touchscreen: boolean;
  security: string[];
  flippingScreen: boolean;
  cpuModel: string;
  cpuGen: any;
  withOs: string;
  gpu: string;
  componentScores: ComponentScore[];
  answers: any;

}

export default function LaptopResultCard({
  name,
  price,
  weight,
  screen_size,
  product_img,
  url,
  matchPercentage,
  manufacturer,
  laptopSeries,
  ram_size,
  ram_type,
  storage_space,
  storage_type,
  for_gaming,
  cpu,
  cpu_ghz,
  screenhz,
  screenRes,
  screenType,
  connections,
  touchscreen,
  security,
  flippingScreen,
  cpuModel,
  cpuGen,
  withOs,
  gpu,
  componentScores,
  answers
  
}: ProductCardProps) {
  const { selectedLaptops, toggleLaptopSelection, isCompareMode } = useComparison();
  const isSelected = selectedLaptops.some(laptop => laptop.name === name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger selection if clicking the product link button
    if ((e.target as HTMLElement).closest('button')?.classList.contains('product-link')) {
      return;
    }
    if (!isCompareMode) return; // Only allow selection in compare mode
    
    toggleLaptopSelection({
      name,
      price,
      weight,
      screen_size,
      product_img,  // Note the property name change to match the data
      url,        // Note the property name change to match the data
      matchPercentage,
      manufacturer,
      laptopSeries,
      ram_size,    // Note the property name change to match the data
      ram_type,
      storage_space,
      storage_type,
      for_gaming,
      cpu,
      cpu_ghz,
      screenhz,
      screenRes,
      screenType,
      connections,
      touchscreen,
      security,
      flippingScreen,
      cpuModel,
      cpuGen,
      withOs,
      gpu,
      
    });
  };

  const getFilteredSpecs = (specs: { value: any; label: string }[]) => {
    return specs
      .filter(spec => {
        const specValue = String(spec.value).toLowerCase();
        return spec.value && 
               specValue !== 'לא זמין' && 
               specValue !== 'ללא' &&
               specValue !== 'undefined' &&
               specValue !== 'לא רלוונטי' &&
               spec.value !== null;
      })
      .map(spec => `${spec.value}${spec.label}`)
      .join(' ');
  };
  
  // Inside your component, add this array of specs
  const titleSpecs = [
    { value: ram_size, label: 'GB RAM' },
    { value: ram_type, label: '' },
    { value: cpu, label: '' },
    { value: screenType, label: '' },
    { value: screenhz, label: 'hz' }
  ];

  const isValidPrice = (price: number, answers: any) => {
    if (!answers.budget.priceImportance) return true;
    return (price <= answers.budget.price);
  };
  
  const isValidWeight = (weight: number, answers: any) => {
    if (!answers.weightImportance) return true;
    else if (answers.weightImportance === 0.125) return weight <= 2;
    else if (answers.weightImportance === 0.25) return weight <= 1.5;
  };
  
  const isValidScreenSize = (screenSize: number, answers: any) => {
    // If no sizes are selected or importance is 0, consider it valid
    if (!answers.screenSize.selectedScreenSizes.length || answers.screenSize.sizeImportance === 0) {
      return true;
    }
  
    // Define size ranges
    const sizeRanges = {
      'small': [0, 13],
      'medium': [13, 14],
      'large': [14, 16],
      'huge': [16, Infinity]
    };
  
    // Check if screen size falls within any of the selected size categories
    return answers.screenSize.selectedScreenSizes.some((selectedSize: any) => {
      const range = sizeRanges[selectedSize as keyof typeof sizeRanges];
      return screenSize >= range[0] && screenSize <= range[1];
    });
  };

  return (
    <div 
    className={`bg-white rounded-lg border-2 w-full max-w-4xl mx-auto mb-4 relative
      ${isCompareMode ? 'hover:border-gray-300 cursor-pointer' : ''}
      transition-all duration-200
      ${isSelected ? 'border-success' : ''}`}
      onClick={handleCardClick}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-success text-white rounded-full p-2">
            <Check size={20} />
          </div>
        </div>
      )}

      <div className="p-2">
        <div className={styles.responsiveContainer}>
          {/* Match Percentage */}
          <div style={{ width: 125, height: 125 }} 
           onClick={(e) => {
            e.stopPropagation(); // Prevent card selection
            setIsModalOpen(true);
          }}
          >
            <CircularProgressbarWithChildren
              value={matchPercentage}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "#00E699",
              })}
            >
              <div className="text-2xl  text-gray-600">{matchPercentage}%</div>
              <div className="font-semibold" style={{ fontSize: '14px', color: "grey" } }>לחצו לפירוט</div>
            </CircularProgressbarWithChildren>
          </div>
          
           {/* Add LaptopDetailsModal */}
          <LaptopDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            answers={answers}
            matchPercentage={matchPercentage}
            componentScores={componentScores}
          />
          
          {/* Product Details */}
          <div className="flex-1 space-y-4 text-right">
            <h3 className={`text-m rtl ${styles.responsiveHeader}`}>{manufacturer} {laptopSeries !== 'לא זמין' && laptopSeries !== 'לא רלוונטי' ? laptopSeries : ''} - {getFilteredSpecs(titleSpecs)}</h3>
            <div className="flex justify-center text-sm text-center" dir="rtl">
              <div className="flex items-center gap-2 p-2 w-full">
                <span className={`text-center ${styles.laptopCardSpecs}`} style={{ fontSize: '18px' }}>
                  {price}₪<br/>
                  <span style={{display: "inline-flex", color:"#888", fontSize:"14px"}}>
                  {isValidPrice(price, answers) ? 
                    <Check className="h-4 w-4 text-success" /> : 
                    <X className="h-4 w-4 text-danger" />} מחיר
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 w-full">
                <p className="text-center" style={{ fontSize: '18px'}}>
                  {weight} ק"ג <br/>
                  <span style={{display: "inline-flex", color:"#888", fontSize:"14px"}}>
                  {isValidWeight(weight, answers) ? 
                    <Check className="h-4 w-4 text-success" /> : 
                    <X className="h-4 w-4 text-danger" />} משקל
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 p-2 w-full">
                <span className="text-center" style={{ fontSize: '18px' }}>
                  <span className="inline">{screen_size} אינטש </span><br/>
                  <span style={{display: "inline-flex", color:"#888", fontSize:"14px"}}>
                  {isValidScreenSize(screen_size, answers) ? 
                    <Check className="h-4 w-4 text-success" /> : 
                    <X className="h-4 w-4 text-danger" />} מסך
                  </span>
                </span>
              </div>
            </div>
          </div>
              
          {/* Product Image */}
          <div className="relative shrink-0">
            <img
              src={product_img}
              alt={name}
              className="object-contain"
              width="200"
              height="200"
            />
          </div>
        </div>
        
        <div className="relative w-full">
          
      <div className={`${styles.responsiveButton} flex justify-start `}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isCompareMode) {
              window.open(url, '_blank');
            }
          }}
          className={`mb-2 product-link bg-black text-white font-medium py-2 px-5 rounded transition-colors`}
        >
          קישור למוצר
        </button>
        
        
      </div>
      
    </div>
        
      </div>
      

      {/* Selection overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isSelected ? 0.1 : 0 }}
        className="absolute inset-0 bg-success pointer-events-none rounded-lg"
      />
    </div>
  )
}