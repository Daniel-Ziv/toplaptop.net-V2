import React, { useEffect, useState, useRef } from 'react';
import { Diff } from "lucide-react";
import { useComparison } from './ComparisonContext.tsx';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";


//data on each spec so we know who is better and tell the user:
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

 // RAM scores: mapping GB size to an objective score out of 10
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


const ComparisonPopup = ({ isOpen, onClose, laptops, handleSelectLaptop }) => {
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
          if (!value1 || !value2) return null;
            
          const cpuScore1 = cpuModelScores[value1] || 0;
          const cpuScore2 = cpuModelScores[value2] || 0;
          
          if (cpuScore1 === cpuScore2) {
              return { comparison: 'מעבד זהה', winner: 'tie' };
          }
          console.log(cpuScore1, cpuScore2);
          return {
              comparison: `מעבד חזק יותר`,
              winner: cpuScore1 > cpuScore2 ? 'laptop1' : 'laptop2',
          };
        case 'cpuModel':
          if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין') return null;
          if (value1 === value2) return { comparison: 'זהה', winner: 'tie' };
          return { comparison: 'שונה', winner: null };
      
        case 'cpuGen':
            if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין') return null;
            if (value1 === value2) return { comparison: 'זהה', winner: 'tie' };
            return { comparison: 'שונה', winner: null };
        
         
        case 'ram_type':
                if (
                  (!value1 && !value2) || 
                  (value1 === 'לא זמין' && value2 === 'לא זמין')
              ) {
                  return null; // Skip comparison if both are not available
              }
                  
                const ramTypeScore1 = ramTypeScores[value1] || 0;
                const ramTypeScore2 = ramTypeScores[value2] || 0;
                
                if (ramTypeScore1 === ramTypeScore2) {
                    return { comparison: 'סוג זכרון ראם זהה', winner: 'tie' };
                }
                return {
                    comparison: "זכרון ראם מהיר יותר",
                    winner: ramTypeScore1 > ramTypeScore2 ? 'laptop1' : 'laptop2',
                };
        case 'storage_type':
                if (
                  (!value1 && !value2) || 
                  (value1 === 'לא זמין' && value2 === 'לא זמין')
              ) {
                  return null; // Skip comparison if both are not available
              }
                  
                const storageTypeScore1 = storageTypeScores[value1] || 0;
                const storageTypeScore2 = storageTypeScores[value2] || 0;
                
                if (storageTypeScore1 === storageTypeScore2) {
                    return { comparison: 'סוג זכרון פנימי זהה', winner: 'tie' };
                }
                return {
                    comparison: "זכרון מהיר יותר",
                    winner: storageTypeScore1 > storageTypeScore2 ? 'laptop1' : 'laptop2',
                };
        case 'screenType':

        case 'withOs':
          // Skip if both values are unavailable
          if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין') return null;
          
          // If both have 'ללא', no winner
          if (value1 === 'ללא' && value2 === 'ללא') {
              return { comparison: 'שניהם ללא מערכת הפעלה', winner: null };
          }
          
          // If one has 'ללא' and the other has an OS
          if (value1 === 'ללא' && value2 !== 'ללא') {
              return { comparison: 'כולל מערכת הפעלה', winner: 'laptop2' };
          }
          if (value2 === 'ללא' && value1 !== 'ללא') {
              return { comparison: 'כולל מערכת הפעלה', winner: 'laptop1' };
          }
          
          // If both have OS but different ones, no clear winner
          if (value1 === value2) {
              return { comparison: 'מערכת הפעלה זהה', winner: 'tie' };
          }
          return { comparison: 'מערכת הפעלה שונה', winner: null };
        case 'gpu':
          if (
            (!value1 && !value2) || 
            (value1 === 'לא זמין' && value2 === 'לא זמין')
        ) {
            return null; // Skip comparison if both are not available
        }
            
          const gpuScore1 = gpuModelScores[value1] || 0;
          const gpuScore2 = gpuModelScores[value2] || 0;
          console.log(gpuScore1, gpuScore2);
          if (gpuScore1 === gpuScore2) {
            
              return { comparison: 'כרטיסי מסך עם כח זהה', winner: 'tie' };
          }
          return {
              comparison: "כרטיס מסך עם כח גבוה יותר",
              winner: gpuScore1 > gpuScore2 ? 'laptop1' : 'laptop2',
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

        case 'screenhz':
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

        case 'for_gaming':
          
        case 'touchscreen':
        case 'flippingScreen':
            if (value1 === true && value2 === true) {
                return { comparison: 'שניהם כוללים', winner: 'tie' };
            } else if (value1 === true && value2 !== true) {
                return { comparison: 'כולל אפשרות', winner: 'laptop1' };
            } else if (value2 === true && value1 !== true) {
                return { comparison: 'כולל אפשרות', winner: 'laptop2' };
            } else {
                return { comparison: 'לא זמין בשניהם', winner: null };
            }

        case 'screenRes':
            if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין') return null;
            return {
                comparison: value1 === value2 ? 'רזולוציה זהה' : 'רזולוציה שונה',
                winner: null
            };
        case 'connections':
          if (Array.isArray(value1) && Array.isArray(value2)) {
            // Filter out any common connections
            const uniqueIn1 = value1.filter(item => !value2.includes(item));
            const uniqueIn2 = value2.filter(item => !value1.includes(item));
            
            // Both laptops might have unique connections
            let hasAdvantages = false;
            if (uniqueIn1.length > 0 || uniqueIn2.length > 0) {
              hasAdvantages = true;
            }
            
            if (!hasAdvantages) {
              return { comparison: 'חיבורים זהים', winner: 'tie' };
            }
            
            // Return both sets of unique connections, letting each laptop show its advantages
            return {
              comparison: 'חיבורים ייחודיים',
              winner: uniqueIn1.length > 0 && uniqueIn2.length === 0 ? 'laptop1' : 
                    uniqueIn2.length > 0 && uniqueIn1.length === 0 ? 'laptop2' : 'both',
              uniqueIn1,
              uniqueIn2
            };
          }
          return null;
        case 'security':
            if (Array.isArray(value1) && Array.isArray(value2)) {
                // Filter out "לא כולל" before comparing
                const filteredValue1 = value1.filter(item => !item.includes("לא כולל") && !item.includes("לא זמין"));
                const filteredValue2 = value2.filter(item => !item.includes("לא כולל") && !item.includes("לא זמין"));
                
                const uniqueIn1 = filteredValue1.filter(item => !filteredValue2.includes(item));
                const uniqueIn2 = filteredValue2.filter(item => !filteredValue1.includes(item));
                
                if (uniqueIn1.length === 0 && uniqueIn2.length === 0) {
                    return { comparison: 'אבטחה זהה', winner: 'tie' };
                }
                
                if (uniqueIn1.length > uniqueIn2.length && uniqueIn1.length > 0) {
                    return {
                        comparison: `${uniqueIn1.length} אפשרויות אבטחה נוספות`,
                        winner: 'laptop1',
                        uniqueIn1,
                        uniqueIn2
                    };
                }
                
                if (uniqueIn2.length > uniqueIn1.length && uniqueIn2.length > 0) {
                    return {
                        comparison: `${uniqueIn2.length} אפשרויות אבטחה נוספות`,
                        winner: 'laptop2',
                        uniqueIn1,
                        uniqueIn2
                    };
                }
                
            }
            return null;
           
            default:
              if (!value1 || !value2 || value1 === 'לא זמין' || value2 === 'לא זמין' || value1 === 'לא רלוונטי' || value2 === 'לא רלוונטי') return null;
              if (value1 === value2) return { comparison: 'זהה', winner: 'tie' };
              return { 
                  comparison: 'שונה',
                  winner: null
              };
    }

    
};

  const specs = [
    { key: 'product_img', label: '' },  
    { key: 'cpu', label: 'מעבד' },        
    { key: 'cpuModel', label: 'דגם מעבד' }, 
    { key: 'cpuGen', label: 'דור מעבד' }, 
    { key: 'cpu_ghz', label: 'מהירות מעבד' }, 
    { key: 'ram_size', label: 'זיכרון RAM' },
    { key: 'ram_type', label: 'סוג זיכרון' }, 
    { key: 'storage_space', label: 'נפח אחסון' }, 
    { key: 'storage_type', label: 'סוג אחסון' }, 
    { key: 'screen_size', label: 'גודל מסך' }, 
    { key: 'screenhz', label: 'קצב רענון מסך' },
    { key: 'screenRes', label: 'רזולוציה' }, 
    { key: 'screenType', label: 'סוג מסך' }, 
    { key: 'for_gaming', label: 'לגיימינג' },
    { key: 'touchscreen', label: 'מסך מגע' },
    { key: 'flippingScreen', label: 'מסך מתהפך' },
    { key: 'connections', label: 'חיבורים' }, 
    { key: 'security', label: 'אבטחה' }, 
    { key: 'weight', label: 'משקל' }, 
    { key: 'price', label: 'מחיר' },
    { key: 'gpu' , label: 'כרטיס מסך' }, 
    { key: 'withOs', label: 'מערכת הפעלה' }, 
];


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

  // Helper function to get descriptive advantage text
  const getAdvantageDescription = (spec, laptop1Value, laptop2Value) => {
    switch(spec.key) {
      case 'cpu':
        return 'מעבד חזק יותר';
      case 'cpu_ghz':
        return `מהירות מעבד גבוהה יותר`;
      case 'for_gaming':
        return 'מתאים לגיימינג';
      case 'touchscreen':
        return 'מסך מגע';
      case 'flippingScreen':
        return 'מסך מתהפך(מחשב שהופך לטאבלט)';
      case 'ram_size':
        return 'יותר זכרון ראם';
      case 'ram_type':
        return 'מהירות ראם גבוהה יותר'
      case 'storage_space':
        return 'נפח אחסון גדול יותר';
      case 'storage_type':
        return 'סוג אחסון מהיר יותר';
      case 'screenhz':
        return 'קצב רענון מסך גבוה יותר';
      case 'gpu':
        return 'כרטיס מסך חזק יותר';
      case 'weight':
        return 'משקל קל יותר';
      case 'withOs':
        return 'כולל מערכת הפעלה';
      case 'price':
        return 'מחיר נמוך יותר';
      case 'connections':
      
          const connectionsResult = compareSpecs(spec.key, laptops[0], laptops[1]);
          // For laptop1
          if (connectionsResult?.uniqueIn1?.length > 0 && spec === laptops[0]) {
            return `חיבורים נוספים: ${connectionsResult.uniqueIn1.join(', ')}`;
          }
          // For laptop2
          if (connectionsResult?.uniqueIn2?.length > 0 && spec === laptops[1]) {
            return `חיבורים נוספים: ${connectionsResult.uniqueIn2.join(', ')}`;
          }
          return null;
      case 'security':
        const securityResult = compareSpecs(spec.key, laptops[0], laptops[1]);
        if (securityResult?.uniqueIn1?.length > 0 && spec === laptops[0]) {
          return `אבטחה נוספת: ${securityResult.uniqueIn1.join(', ')}`;
        }
        if (securityResult?.uniqueIn2?.length > 0 && spec === laptops[1]) {
          return `אבטחה נוספת: ${securityResult.uniqueIn2.join(', ')}`;
        }
        return null;
        }
      };

  specs.forEach(spec => {
    if (spec.key === 'product_img') return;
    const result = compareSpecs(spec.key, laptops[0], laptops[1]);
    
    if (spec.key === 'security') {
      if (result?.uniqueIn1?.length > 0) {
        advantages.laptop1.push(`אבטחה נוספת: ${result.uniqueIn1.join(', ')}`);
      }
      if (result?.uniqueIn2?.length > 0) {
        advantages.laptop2.push(`אבטחה נוספת: ${result.uniqueIn2.join(', ')}`);
      }
    }

    if (spec.key === 'connections') {
      // Add unique connections to respective advantages
      if (result?.uniqueIn1?.length > 0) {
        advantages.laptop1.push(`חיבורים נוספים: ${result.uniqueIn1.join(', ')}`);
      }
      if (result?.uniqueIn2?.length > 0) {
        advantages.laptop2.push(`חיבורים נוספים: ${result.uniqueIn2.join(', ')}`);
      }
    } else if (result && result.winner === 'laptop1') {
      advantages.laptop1.push(getAdvantageDescription(spec, laptops[0][spec.key], laptops[1][spec.key]));
    } else if (result && result.winner === 'laptop2') {
      advantages.laptop2.push(getAdvantageDescription(spec, laptops[1][spec.key], laptops[0][spec.key]));
    }
  });


  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-center" dir="rtl">סיכום יתרונות:</h3>
      <div className="grid grid-cols-2 gap-4">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {advantages.laptop1.length > 0 ? (
          <div style={{ flex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '0.5rem',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {advantages.laptop1.filter(Boolean).map((advantage, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                textAlign: 'right'
              }}>
                <span style={{ color: '#006400' }}>+</span>
                <span style={{ wordBreak: 'break-word' }}>{advantage}</span>
              </div>
            ))}
          </div>
        </div>
        ) : (
        <div style={{ flex: 1 }}>
          <p className="text-sm text-gray-500 text-center">אין יתרונות בולטים</p>
        </div>
      )}
     <div className="gap-1" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        
        <Button
        
          onPress={() => handleSelectLaptop(laptops[0])}
          color="primary"
          className="w-full max-w-sm"
          size="lg"
          style={{
            backgroundColor: '#198754',
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: 500,
            border: 'none',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)'
          }}
        >
          השווא מול אחר
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onPress={() => window.open(laptops[0].url, '_blank')}
          color="secondary"
          className="w-full max-w-sm"
          size="lg"
          style={{
            backgroundColor: 'white',
            color: '#198754',
            border: '2px solid #198754',
            padding: '10px 24px',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          קישור למוצר
        </Button>
      </div>
  </div>
</div>

<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  {advantages.laptop2.length > 0 ? (
   <div style={{ flex: 1 }}>
   <div style={{
     display: 'grid',
     gridTemplateColumns: 'repeat(1, 1fr)',
     gap: '0.5rem',
     maxWidth: '400px',
     margin: '0 auto'
   }}>
     {advantages.laptop2.filter(Boolean).map((advantage, index) => (
       <div key={index} style={{
         display: 'flex',
         alignItems: 'flex-start',
         gap: '8px',
         textAlign: 'right'
       }}>
         <span style={{ color: '#006400' }}>+</span>
         <span style={{ wordBreak: 'break-word' }}>{advantage}</span>
       </div>
     ))}
   </div>
 </div>
  ) : (
        <div style={{ flex: 1 }}>
          <p className="text-sm text-gray-500 text-center">אין יתרונות בולטים</p>
        </div>
      )}
   <div className="gap-1 " style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:'1vw'}}>
        <Button
          onPress={() => handleSelectLaptop(laptops[1])}
          color="primary"
          className="w-full max-w-sm"
          size="lg"
          style={{
            backgroundColor: '#198754',
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: 500,
            border: 'none',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)'
          }}
        >
          השווא מול אחר
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onPress={() => window.open(laptops[1].url, '_blank')}
          color="secondary"
          className="w-full max-w-sm"
          size="lg"
          style={{
            backgroundColor: 'white',
            color: '#198754',
            border: '2px solid #198754',
            padding: '10px 24px',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          קישור למוצר
        </Button>
      </div>
  </div>
    </div>

      </div>

<div className="flex flex-col items-center mt-4 gap-4">
 
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
  <ModalContent className="h-full" dir="rtl">
    <ModalHeader className="flex flex-col gap-1 border-b text-center">
      השוואת מחשבים ניידים
    </ModalHeader>
    <ModalBody className="overflow-x-hidden">
      {/* Column Headers */}
      <div className="grid grid-cols-2 ">
        <div className="text-lg font-bold text-center">
          {laptops[0].manufacturer.replace(/[\u0590-\u05FF]/g, '')} {laptops[0].laptopSeries.replace(/[\u0590-\u05FF]/g, '')}
        </div>
        <div className="text-lg font-bold text-center">
          {laptops[1].manufacturer.replace(/[\u0590-\u05FF]/g, '')} {laptops[1].laptopSeries.replace(/[\u0590-\u05FF]/g, '')}
        </div>
      </div>

      {/* Specs Grid with Middle Labels */}
      {specs.map((spec, index) => (
  <div key={spec.key} className="relative">
    {/* Label in the middle - moved higher */}
    {spec.key !== 'product_img' && (
      <div 
        className="absolute left-1/2 top-[20%] -translate-x-1/2 z-10 bg-white px-2 font-bold text-sm"
        style={{ width: 'fit-content' }}
      >
        {spec.label}
      </div>
    )}
    
    {/* Values grid */}
    <div className="grid grid-cols-2 border-b relative">
      <div className={`p-2 border-l ${getBackgroundColor(spec, 0)}`}>
        <div className="flex justify-center items-center text-sm">
          {spec.key === 'product_img' ? (
            <div className="w-[250px] h-[250px] flex items-center justify-center">
               <img 
                  src={laptops[0].product_img}
                  alt={laptops[0].name}
                  className="max-w-full max-h-full object-contain"
                  width="250"
                  height="250"
                />
            </div>
          ) : spec.key === 'connections' || spec.key === 'security' ? (
            <span 
              style={{
                display: 'block',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textAlign: 'center',
                marginTop: '1rem'
              }}
        >
          {Array.isArray(laptops[0][spec.key]) 
            ? laptops[0][spec.key].map((connection, idx) => {
                const isUnique = !laptops[1][spec.key]?.includes(connection) && !connection.includes('לא כולל');
                return (
                  <span key={idx}>
                    <span style={isUnique ? { backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px' } : {}}>
                      {connection}
                    </span>
                    {idx < laptops[0][spec.key].length - 1 ? ', ' : ''}
                  </span>
                );
              })
            : laptops[0][spec.key] || 'לא זמין'}
        </span>
          ) : (
            <span 
              style={{
                ...getValueStyle(spec, 0),
                display: 'block',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textAlign: 'center',
                marginTop: '1rem'
              }}
            >
              {typeof laptops[0][spec.key] === 'boolean' 
                ? (laptops[0][spec.key] ? 'כן' : 'לא') 
                : laptops[0][spec.key] || 'לא זמין'}
            </span>
          )}
        </div>
      </div>
      <div className={`p-2 ${getBackgroundColor(spec, 1)}`}>
        <div className="flex justify-center items-center text-sm">
          {spec.key === 'product_img' ? (
            <div className="w-[250px] h-[250px] flex items-center justify-center">
              <img 
                  src={laptops[1].product_img}
                  alt={laptops[1].name}
                  className="max-w-full max-h-full object-contain"
                  width="250"
                  height="250"
                />
            </div>
          ) : spec.key === 'connections' || spec.key === 'security' ? (
            <span 
            style={{
              display: 'block',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textAlign: 'center',
              marginTop: '1rem'
            }}
          >
            {Array.isArray(laptops[0][spec.key]) 
              ? laptops[1][spec.key].map((connection, idx) => {
                  const isUnique = !laptops[0][spec.key]?.includes(connection) && !connection.includes('לא כולל');
                  return (
                    <span key={idx}>
                      <span style={isUnique ? { backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px' } : {}}>
                        {connection}
                      </span>
                      {idx < laptops[1][spec.key].length - 1 ? ', ' : ''}
                    </span>
                  );
                })
              : laptops[1][spec.key] || 'לא זמין'}
          </span>
          ) : (
            <span 
              style={{
                ...getValueStyle(spec, 1),
                display: 'block',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textAlign: 'center',
                marginTop: '1rem'
              }}
            >
              {typeof laptops[1][spec.key] === 'boolean' 
                ? (laptops[1][spec.key] ? 'כן' : 'לא') 
                : laptops[1][spec.key] || 'לא זמין'}
            </span>
          )}
        </div>
      </div>
    </div>
    
  </div>
))}

      {generateSummary()}
    </ModalBody>
    <ModalFooter className="border-t">
      <Button 
        color="danger" 
        variant="light" 
        onPress={onClose}
        className="mx-auto"
        
      >
        סיום השוואה
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
  const { selectedLaptops, isCompareMode, setIsCompareMode, clearComparison, toggleLaptopSelection } = useComparison();

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

  const handleSelectLaptop = (laptop) => {
    setTimeout(() => {
      clearComparison();
      toggleLaptopSelection(laptop);
      setIsCompareMode(true);
      setIsPopupOpen(false);
    }, 100);
};

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
    clearComparison();
    setIsPopupOpen(false);
    setIsCompareMode(false);
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
        return "לחצו להשוואה";
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
      base: '#bf0020', //#6c757d nice grey for backup
     
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
          transform: `translateY(${isVisible && !isAtBottom && !isPopupOpen ? '0' : '100%'})`,
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
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.hover;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.base;
          }}
        >
          <span>{buttonText}</span>
         
        </button>
      </div>

      <ComparisonPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        laptops={selectedLaptops}
        handleSelectLaptop={handleSelectLaptop}
      />
    </>
  );
};

export default FloatingCompareButton;