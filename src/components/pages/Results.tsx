import React, { useState, useEffect } from 'react'
import LaptopResultCard from '../LaptopResultCard'
import Header from '../Header'
import FloatingCompareButton from '../FloatingCompareButton'
import { ComparisonProvider } from '../ComparisonContext';
import {calculateLaptopScore} from '../algo/calculateLaptopScore';
import NavigationButtons from '../NavigationButtons'
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { encodeParameters, decodeParameters } from '../../assets/utils/urlParams';
import { Check, Copy, Share, X, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import SortToggleButtons from '../SortToggleButtons'


interface ResultsProps {
  prevStep: () => void;
  answers: any;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
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
  cpuScore?: number;
  gpuScore?: number;

}



const Results: React.FC<ResultsProps> = ({ prevStep, answers, setIsLoading, isLoading }) => {
  const [displayCount, setDisplayCount] = useState(5)
  const [sortedLaptops, setSortedLaptops] = useState<Laptop[]>([]); // Use sortedLaptops to render results
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showShareModal, setShowShareModal] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<Laptop[]>([]);


  
 
  const handleCopy = async () => {
    const encoded = encodeParameters(answers);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?q=${encoded}`;
    
    try {
      // Try the modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareableUrl);
      } else {
        // Fallback to the older execCommand method
        const textArea = document.createElement('textarea');
        textArea.value = shareableUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        textArea.remove();
        
        if (!successful) {
          throw new Error('Failed to copy text');
        }
      }
      
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // You might want to show a user-friendly error message here
    }
  };
  
 
  //place for_gaming:true at the top if the user has gaming task
  const hasGamingTask = (tasks: any[]) => {
    return tasks.some(task => task.task === "gaming");
  };


  useEffect(() => {
    const calculateScores = async () => {
      setIsLoading(true);

      try {
        // Fetch laptops.json
        const response = await fetch('/data/laptops.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch laptops.json: ${response.statusText}`);
        }
        
        const laptops = await response.json(); // Parse the JSON data
      
      const encodedParams = searchParams.get('q');
      const answersToUse = encodedParams ? decodeParameters(encodedParams) : answers;
    
      if (answersToUse) {
        const scoredLaptops: Laptop[] = laptops.map((laptop: Laptop) => {
          const { finalScore, componentScores, cpuScore, gpuScore } = calculateLaptopScore(laptop, answersToUse);
          return {
            ...laptop,
            matchPercentage: finalScore,
            componentScores: componentScores,
            cpuScore: cpuScore,
            gpuScore: gpuScore,
          };
        });
    
        const isGaming = hasGamingTask(answersToUse.tasks);

        const filteredLaptops = scoredLaptops.filter(laptop =>
          laptop.matchPercentage && laptop.matchPercentage > 0
         ).sort((a, b) => {
          const percentDiff = (b.matchPercentage || 0) - (a.matchPercentage || 0);
          if (percentDiff === 0 && isGaming) {
            return b.for_gaming ? 1 : -1;
          }
          return percentDiff;
         });
        
        setOriginalOrder([...filteredLaptops]);
        setSortedLaptops(filteredLaptops);
      }
    
      if (!encodedParams && window.location.search) {
        window.history.replaceState({}, '', window.location.pathname);
      }
      setIsLoading(false);
      }
      catch (error) {
        console.error('Failed to load laptops:', error);
        setIsLoading(false);
      }
    };
  
    calculateScores();
  }, [answers, searchParams]);


  const shareUrl = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(JSON.stringify(answers))}`

  
  const showMore = () => {
    setDisplayCount((prev) => Math.min(prev + 5, sortedLaptops.length));
  };

  const hasMoreLaptops = displayCount < sortedLaptops.length;

 

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50">
        <Spinner 
          size="lg"
          color="primary"
          className="w-20 h-20"
          label="טוען תוצאות..."
        />
      </div>
    );
  }

 


  return (
    <ComparisonProvider>
      <div className="min-h-screen py-8" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-1 mt-3">
            <button
              onClick={() => setShowShareModal(true)}
              style={{
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.5rem',
                marginTop: '0.2rem',
                flexDirection: 'row-reverse',
              }}
             
              aria-label="שתפו את הדף"
            >
              <Share color="#000000" style={{ height: '1.5rem', width: '1.5rem' }} />
              
            </button>
            <Header
              text="ההמלצות שלנו!"
              className="mb-3 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
            />
             
          </div>

           
                
          <div className="text-center mb-4 mt-6">
          
          
          <SortToggleButtons 
            onSortByPrice={() => {
              const budget = answers.budget.price; // User-defined maximum budget
              const maxPercentage = Math.max(...sortedLaptops.map((laptop) => laptop.matchPercentage || 0)); // Top percentage
              const lambda = 0.5; // Adjust weight for price impact
          
              const newLaptops = [...sortedLaptops].sort((a, b) => {
                const aScore = ((a.matchPercentage ?? 0) / maxPercentage) - lambda * (a.price / budget);
                const bScore = ((b.matchPercentage ?? 0) / maxPercentage) - lambda * (b.price / budget);

                return bScore - aScore; // Sort descending by score
              });
          
              setSortedLaptops(newLaptops);
            }}
            
            onSortByPerformance={() => {
              const maxPercentage = Math.max(...sortedLaptops.map((laptop) => laptop.matchPercentage || 0)); // Top match percentage
              const maxCpuScore = Math.max(...sortedLaptops.map((laptop) => laptop.cpuScore || 0)); // Top CPU score
              const maxRam = Math.max(...sortedLaptops.map((laptop) => laptop.ram_size || 0)); // Top RAM size
              const maxGpuScore = Math.max(...sortedLaptops.map((laptop) => laptop.gpuScore || 0)); // Top GPU score
            
              const cpuWeight = 0.5; // Weight for CPU performance
              const ramWeight = 0.3; // Weight for RAM size
              const gpuWeight = 0.2; // Weight for GPU performance
              const matchWeight = 0.5; // Weight for match percentage
              const budget = answers.budget.price; // User-defined budget
            
              // Filter out laptops exceeding budget if priceImportance is strict (0.25)
              const filteredLaptops = sortedLaptops.filter(
                (laptop) => answers.budget.priceImportance !== 0.25 || laptop.price <= budget
              );
            
              const newLaptops = [...filteredLaptops].sort((a, b) => {
                const aPenalty = a.price > budget
                  ? Math.max(0, 100 - ((a.price - budget) / budget) * 100) // Penalize based on over-budget percentage
                  : 100; // Full score for within budget
            
                const bPenalty = b.price > budget
                  ? Math.max(0, 100 - ((b.price - budget) / budget) * 100)
                  : 100;
            
                const aScore =
                  matchWeight * ((a.matchPercentage ?? 0) / maxPercentage) +
                  cpuWeight * ((a.cpuScore ?? 0) / maxCpuScore) +
                  ramWeight * ((a.ram_size ?? 0) / maxRam) +
                  gpuWeight * ((a.gpuScore ?? 0) / maxGpuScore) +
                  aPenalty * 0.2; // Add price penalty with a weight (adjust as needed)
            
                const bScore =
                  matchWeight * ((b.matchPercentage ?? 0) / maxPercentage) +
                  cpuWeight * ((b.cpuScore ?? 0) / maxCpuScore) +
                  ramWeight * ((b.ram_size ?? 0) / maxRam) +
                  gpuWeight * ((b.gpuScore ?? 0) / maxGpuScore) +
                  bPenalty * 0.2;
            
                return bScore - aScore; // Sort descending by total score
              });
            
              setSortedLaptops(newLaptops);
            }}
            
            
            
            onResetSort={() => setSortedLaptops([...originalOrder])}
          />
        </div>
  <AnimatePresence>
  {showShareModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" // Made overlay darker
        onClick={() => setShowShareModal(false)} 
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 p-3 rounded-xl max-w-md w-full relative z-10 shadow-2xl border-2 border-gray-200 dark:border-gray-700" // Added border and increased shadow
        dir="rtl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">לינק לשיתוף ההמלצות:</h3>
          <button
            onClick={() => setShowShareModal(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="סגור"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-300 dark:border-gray-600"> {/* Made border thicker */}
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300 text-sm"
          />
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
            aria-label={hasCopied ? "הועתק" : "העתק קישור"}
          >
            {hasCopied ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <Copy size={20} className="text-grey-500" />
            )}
          </button>
        </div>
        {hasCopied && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-green-500 text-sm mt-2 text-center"
          >
            הקישור הועתק ללוח!
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )}
  </AnimatePresence>
          <div className="flex flex-col gap-8">
          {sortedLaptops.length === 0 ? (
              // Show message if no laptops match
              <p className="text-center text-gray-600 text-xl mt-8">
                אין מחשבים שעומדים בדרישות. ייתכן שהמאפיינים שהגדרתם מחמירים מדי.
                נסו להרפות כמה מהתנאים לקבלת תוצאות נוספות.
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
              <div className="mb-6" dir='rtl'>
              <div className="flex flex-col items-center  ">
                <Button 
                  color="default"  // Keep color as default for consistent hover and focus behavior
                  size="lg" // Larger button size
                  onClick={showMore} 
                  disabled={!hasMoreLaptops} // Disables if `disableNext` is true
                  className={`w-full max-w-md ${hasMoreLaptops ? 'bg-black text-white' : 'default-700 text-gray-500'}`} // Black when enabled, gray when disabled
                >
                  הצג עוד {/* Text passed as prop */}
                </Button>
                </div>
              </div>
            </div>
          </div>
          <FloatingCompareButton />
        </div>
      </ComparisonProvider>
    )
  }

export default Results