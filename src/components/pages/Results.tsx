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
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');

 

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

  const handleEmailShare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
  
    const encoded = encodeParameters(answers);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?q=${encoded}`;
  
    try {
      const response = await fetch('https://1pr5h9rvj1.execute-api.us-east-1.amazonaws.com/sendEmail/send-email', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'ההמלצות שלנו!',
          link: `${shareableUrl}`,
        }),
      });

      if (response.ok) {
        setShowEmailModal(false);
        setEmail('');
        alert('האימייל נשלח בהצלחה!');
      } else {
        const errorMessage = await response.text();
        console.error('Failed to send email:', errorMessage);
        alert('שליחת האימייל נכשלה. אנא נסה שוב.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('שליחת האימייל נכשלה. אנא נסה שוב.');
    }
  };
  

  

  useEffect(() => {
    const calculateScores = async () => {
      setIsLoading(true);
  
      // Only use encoded parameters if we came from a shared link
      const encodedParams = searchParams.get('q');
      const answersToUse = encodedParams ? decodeParameters(encodedParams) : answers;
  
      if (answersToUse) {
        const scoredLaptops: Laptop[] = laptops.map((laptop) => {
          const { finalScore, componentScores } = calculateLaptopScore(laptop, answersToUse);
          return {
            ...laptop,
            matchPercentage: finalScore,
            componentScores: componentScores
          };
        });
  
        const filteredLaptops = scoredLaptops.filter((laptop) => 
          laptop.matchPercentage && laptop.matchPercentage > 0
        );
  
        filteredLaptops.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  
        setSortedLaptops(filteredLaptops);
      }
  
      // Clear URL parameters if we're not coming from a shared link
      if (!encodedParams && window.location.search) {
        window.history.replaceState({}, '', window.location.pathname);
      }
  
      setIsLoading(false);
    };
  
    calculateScores();
  }, [answers]); // Remove searchParams from dependencies
  
  
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
          <div className="text-center mb-6">
            <button 
              onClick={() => setShowEmailModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              שתף באימייל
            </button>
          </div>
          {showEmailModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full" dir="rtl">
      <h3 className="text-lg font-bold mb-4">שתף תוצאות באימייל</h3>
      <form onSubmit={handleEmailShare}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="הכנס כתובת אימייל"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowEmailModal(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ביטול
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            שלח
          </button>
        </div>
      </form>
    </div>
  </div>
)}
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
              answers={answers}

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