import React, { useState, useEffect } from 'react'
import LaptopResultCard from '../LaptopResultCard'
import Header from '../Header'
import laptops from '../../data/laptops.json'
import FloatingCompareButton from '../FloatingCompareButton'
import { ComparisonProvider } from '../ComparisonContext';
import {calculateLaptopScore} from '../algo/calculateLaptopScore';
import NavigationButtons from '../NavigationButtons'
import { Skeleton } from "@nextui-org/react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { encodeParameters, decodeParameters } from '../../assets/utils/urlParams';


interface ResultsProps {
  prevStep: () => void;
  answers: any;
}

interface ComponentScore {
  name: string;
  score: number;
}

interface Laptop {
  name: string;
  price: number;
  weight: number;
  screen_size: number;
  product_img: string;
  url: string;
  matchPercentage?: number;
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
  componentScores?: ComponentScore[];

}



const Results: React.FC<ResultsProps> = ({ prevStep, answers }) => {
  const [displayCount, setDisplayCount] = useState(5)
  const [sortedLaptops, setSortedLaptops] = useState<Laptop[]>([]); // Use sortedLaptops to render results
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

 

  const LaptopSkeleton = () => (
    <div className="w-full p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="rounded-lg">
          <div className="h-48 w-48"></div>
        </Skeleton>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2 rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
            <Skeleton className="h-4 w-1/3 rounded-lg" />
          </div>
        </div>
        <div className="w-32 flex flex-col items-center justify-center">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 mt-2 rounded-lg" />
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    const calculateScores = async () => {
      setIsLoading(true);
  
      const encodedParams = searchParams.get('q');
      const answersToUse = encodedParams ? decodeParameters(encodedParams) : answers;
  
      if (answersToUse) {
        // Calculate match percentage for each laptop
        const scoredLaptops: Laptop[] = laptops.map((laptop) => {
          const { finalScore, componentScores } = calculateLaptopScore(laptop, answersToUse);
          return {
            ...laptop,
            matchPercentage: finalScore,
            componentScores: componentScores
          };
        });
  
        // Filter out laptops with a matchPercentage of 0
        const filteredLaptops = scoredLaptops.filter((laptop) => 
          laptop.matchPercentage && laptop.matchPercentage > 0
        );
  
        // Sort laptops by match percentage
        filteredLaptops.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  
        setSortedLaptops(filteredLaptops);
  
        // If this is a new search (not from URL), update the URL
        if (!encodedParams && answers) {
          const encoded = encodeParameters(answers);
          setSearchParams({ q: encoded });
        }
      }
  
      setIsLoading(false);
    };
  
    calculateScores();
  }, [answers, searchParams]);
  
  
  const showMore = () => {
    setDisplayCount((prev) => Math.min(prev + 5, sortedLaptops.length));
  };

  const hasMoreLaptops = displayCount < sortedLaptops.length;

  return (
    <ComparisonProvider>
      <div className="min-h-screen py-8" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header
            text="המחשבים המומלצים עבורך"
            className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
          />
         <div className="flex flex-col gap-8">
         {isLoading ? (
            // Show skeletons while loading
            Array(displayCount).fill(0).map((_, index) => (
              <LaptopSkeleton key={`skeleton-${index}`} />
            ))
          ) : sortedLaptops.length === 0 ? (
            // Show message if no laptops match
            <p className="text-center text-gray-600 text-xl mt-8">
              אין מחשבים שעומדים בדרישות. ייתכן שהמאפיינים שהגדרת מחמירים מדי.
              נסה להרפות כמה מהתנאים לקבלת תוצאות נוספות.
            </p>
            ) : (
            sortedLaptops.slice(0, displayCount).map((laptop, index) => ( // Use sortedLaptops here

              <LaptopResultCard
              key={index}
              name={laptop.name}
              price={laptop.price}
              weight={laptop.weight}
              screen_size={laptop.screen_size}
              product_img={laptop.product_img}     
              url={laptop.url}                      
              matchPercentage={laptop.matchPercentage || 0}
              manufacturer={laptop.manufacturer}
              laptopSeries={laptop.laptopSeries}
              ram_size={laptop.ram_size}            
              ram_type={laptop.ram_type}            
              storage_space={laptop.storage_space}  
              storage_type={laptop.storage_type}    
              for_gaming={laptop.for_gaming}        
              cpu={laptop.cpu}
              cpu_ghz={laptop.cpu_ghz}              
              screenhz={laptop.screenhz}
              screenRes={laptop.screenRes}
              screenType={laptop.screenType}
              connections={laptop.connections}
              touchscreen={laptop.touchscreen}
              security={laptop.security}
              flippingScreen={laptop.flippingScreen}
              cpuModel={laptop.cpuModel}
              cpuGen={laptop.cpuGen}        
              withOs={laptop.withOs}
              gpu={laptop.gpu}
              componentScores={laptop.componentScores || []}

              />
            ))
          )}
            <div className="mb-6">
            <NavigationButtons onNext={showMore} onBack={prevStep} disableNext={!hasMoreLaptops} nextText="הצג עוד" backText="חזרה לשאלון"/>
            </div>
          </div>
        </div>
        <FloatingCompareButton />
      </div>
    </ComparisonProvider>
  )
}

export default Results