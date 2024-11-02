import React from 'react'
import LaptopResultCard from '../LaptopResultCard.tsx'
import Header from '../Header'
import laptops from '../../data/laptops.json'

interface ResultsProps {
  prevStep: () => void
}

const Results: React.FC<ResultsProps> = ({ prevStep }) => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header 
          text="המחשבים המומלצים עבורך"
          className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display" 
        />
        
        <div className="flex flex-col gap-6">
          {laptops.slice(0, 5).map((laptop, index) => (
            <LaptopResultCard
              key={index}
              name={laptop.name}
              price={laptop.price}
              weight={laptop.weight}
              screenSize={laptop.screen_size}
              imageUrl={laptop.product_img}
              productUrl={laptop.url}
              matchPercentage={98} 
            />
          ))}
        </div>
      </div>
      <button 
        onClick={prevStep}
        className="w-full max-w-md mx-auto mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-lg"
      >
        חזרה לשאלון
      </button>
    </div>
  )
}

export default Results