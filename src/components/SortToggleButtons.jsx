import { useState } from 'react';
import { ArrowUpDown, Zap } from 'lucide-react';

export default function SortToggleButtons({ onSortByPrice, onSortByPerformance, onResetSort }) {
  const [activeButton, setActiveButton] = useState(null);

  const handlePriceSort = () => {
    if (activeButton === 'price') {
      setActiveButton(null);
      onResetSort();
    } else {
      setActiveButton('price');
      onSortByPrice();
    }
  };
  

  const handlePerformanceSort = () => {
    if (activeButton === 'performance') {
      setActiveButton(null);
      onResetSort();
    } else {
      setActiveButton('performance');
      onSortByPerformance();
    }
  };

  return (
    <>
      <div className="flex justify-center mt-1 w-full max-w-4xl mx-auto mb-1 relative gap-2" dir="rtl">
        <button
          className={`flex-grow h-full w-full px-4 py-2 border border-gray-500 rounded-md text-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center
            ${activeButton === 'price'
              ? 'bg-gray-300 text-gray-700'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
          onClick={handlePriceSort}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
          מיון לפי מחיר
        </button>

        <button
          className={`flex-grow h-full w-full px-4 py-2 border border-gray-500 rounded-md text-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center
            ${activeButton === 'performance'
              ? 'bg-gray-300 text-gray-700'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
          onClick={handlePerformanceSort}
        >
          <Zap className="ml-2 h-4 w-4" />
          מיון לפי עוצמה
        </button>
        
      </div>
      <div>
  </div>
    </>
  );
}

