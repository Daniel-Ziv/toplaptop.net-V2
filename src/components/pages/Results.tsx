import React, { useState } from 'react'
import LaptopResultCard from '../LaptopResultCard.tsx'
import Header from '../Header'
import laptops from '../../data/laptops.json'
import FloatingCompareButton from '../FloatingCompareButton'
import { ComparisonProvider } from '../ComparisonContext.tsx';

interface ResultsProps {
  prevStep: () => void
}

interface Laptop {
  name: string
  price: number
  weight: number
  screen_size: number
  product_img: string
  url: string
  matchPercentage?: number
  manufacturer: string
  laptopSeries: string
  ram_size: number
}

const Results: React.FC<ResultsProps> = ({ prevStep }) => {
  const [displayCount, setDisplayCount] = useState(5)
  const typedLaptops = laptops as Laptop[]
  
  const showMore = () => {
    setDisplayCount(prev => Math.min(prev + 5, typedLaptops.length))
  }

  const hasMoreLaptops = displayCount < typedLaptops.length

  return (
    <ComparisonProvider>
      <div className="min-h-screen py-8" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header
            text="המחשבים המומלצים עבורך"
            className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display"
          />
          <div className="flex flex-col gap-8">
            {typedLaptops.slice(0, displayCount).map((laptop, index) => (
              <LaptopResultCard
                key={index}
                name={laptop.name}
                price={laptop.price}
                weight={laptop.weight}
                screenSize={laptop.screen_size}
                imageUrl={laptop.product_img}
                productUrl={laptop.url}
                matchPercentage={40}
                manufacturer={laptop.manufacturer}
                laptopSeries={laptop.laptopSeries}
                laptopRam = {laptop.ram_size}
              />
            ))}
            
            <div className="flex flex-col gap-4 items-center mt-4">
              {hasMoreLaptops && (
                <button
                  onClick={showMore}
                  className="w-full max-w-md px-4 py-2 bg-blue-500 text-white rounded-md transition-colors hover:bg-blue-600 text-lg"
                >
                  הצג עוד {Math.min(5, typedLaptops.length - displayCount)} מחשבים
                </button>
              )}
              
              <button
                onClick={prevStep}
                className="w-full max-w-md px-4 py-2 bg-black text-white rounded-md transition-colors text-lg"
              >
                חזרה לשאלון
              </button>
            </div>
          </div>
        </div>
        <FloatingCompareButton />
      </div>
    </ComparisonProvider>
  )
}

export default Results