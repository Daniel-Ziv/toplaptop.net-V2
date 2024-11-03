import { Check } from "lucide-react"
import React from "react"
import { Image, CircularProgress, Card, CardBody, CardFooter, Button } from "@nextui-org/react"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useComparison } from './ComparisonContext.tsx'
import styles from '../ProductCard.module.css'
import { motion } from "framer-motion"

interface ProductCardProps {
  name: string
  price: number
  weight: number
  screenSize: number
  imageUrl: string
  productUrl: string
  matchPercentage: number
  manufacturer: string
  laptopSeries: string
  laptopRam: number
}

export default function LaptopResultCard({
  name,
  price,
  weight,
  screenSize,
  imageUrl,
  productUrl,
  matchPercentage,
  laptopRam,
  manufacturer,
  laptopSeries
}: ProductCardProps) {
  const { selectedLaptops, toggleLaptopSelection, isCompareMode } = useComparison();
  const isSelected = selectedLaptops.some(laptop => laptop.name === name);

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
      screenSize,
      imageUrl,
      productUrl,
      matchPercentage,
      laptopRam,
      manufacturer,
      laptopSeries
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

      <div className="p-5">
        <div className={styles.responsiveContainer}>
          {/* Match Percentage */}
          <div style={{ width: 125, height: 125 }}>
            <CircularProgressbarWithChildren
              value={matchPercentage}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "#00E699",
              })}
            >
              <div className="text-2xl font-semibold text-gray-600">{matchPercentage}%</div>
              <div className="text-sm text-gray-500">אחוז התאמה</div>
            </CircularProgressbarWithChildren>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4 text-right">
            <h3 className={`text-xl ${styles.responsiveHeader}`}>{manufacturer} {laptopSeries}</h3>
            <div className="flex justify-center text-sm" dir="rtl">
              <div className="flex items-center gap-2 p-2 w-full">
                <span className={`text-center ${styles.laptopCardSpecs}`} style={{ fontSize: '18px' }}>
                  {price}₪<br/>
                  <span style={{display: "inline-flex", color:"#888", fontSize:"14px"}}>
                    <Check className="h-4 w-4 text-success" /> מחיר
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 w-full">
                <p className="text-center" style={{ fontSize: '18px'}}>
                  {weight} ק"ג <br/>
                  <span style={{display: "inline-flex", color:"#888", fontSize:"14px"}}>
                    <Check className="h-4 w-4 text-success" /> משקל
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 p-2 w-full">
                <span className="text-center" style={{ fontSize: '18px' }}>
                  <span className="inline">{screenSize} אינטש </span><br/>
                  <span style={{display: "inline-flex", color:"#888", fontSize:"14px"}}>
                    <Check className="h-4 w-4 text-success" /> מסך
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative shrink-0">
            <img
              src={imageUrl}
              alt={name}
              className="object-contain"
              width="200"
              height="200"
            />
          </div>
        </div>

        <div className={`block ${styles.responsiveButton}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(productUrl, '_blank');
            }}
            className="product-link bg-black text-white font-medium py-2 px-5 rounded transition-colors"
          >
            קישור למוצר
          </button>
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