import { Check } from "lucide-react"
import React from "react"
import { Image, CircularProgress, Card, CardBody, CardFooter, Button } from "@nextui-org/react"
import Container from "./Container"
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from '../ProductCard.module.css';


interface ProductCardProps {
  name: string
  price: number
  weight: number
  screenSize: number
  imageUrl: string
  productUrl: string
  matchPercentage: number
  manufacturer: string,
  laptopSeries: string
  laptopRam: number


}

export default function LaptopResultCard({
  name,
  price,
  weight,
  screenSize,
  imageUrl ,
  productUrl,
  matchPercentage,
  laptopRam,
  manufacturer,
  laptopSeries
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 w-full max-w-4xl mx-auto mb-4">
      <div className="p-5">
        <div className={styles.responsiveContainer}>
          {/* Match Percentage */}
          <div style={{ width: 125, height: 125 }}>
            <CircularProgressbar
              value={matchPercentage}
              text={`${matchPercentage}%`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textColor: "#999",
                pathColor: "#00E699",
                textSize: "18px"
              })}
            />
            <p className="text-center" style={{ color: '#999' }}>אחוז התאמה</p>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4 text-right">
            <h3 className={`text-xl ${styles.responsiveHeader}`}>{manufacturer} {laptopSeries}</h3>
            <div className="flex justify-center text-sm" dir="rtl">
              <div className="flex items-center gap-2 p-2 w-full">
                <span  className={`text-center ${styles.laptopCardSpecs}`} style={{ fontSize: '18px' }}>
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
            onClick={() => window.open(productUrl, '_blank')}
            className={`bg-black text-white font-medium py-2 px-5 rounded transition-colors `}
          >
            קישור למוצר
          </button>
      </div>
        
    </div>
  </div>

    
  );
};
