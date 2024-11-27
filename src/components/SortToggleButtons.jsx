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
    <div className="flex justify-center gap-1 mt-2" dir="rtl">
      <button 
        className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center
          ${activeButton === 'price' 
            ? 'bg-gray-300 text-gray-700' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
        onClick={handlePriceSort}
      >
        <ArrowUpDown className="ml-2 h-4 w-4" />
        מיון לפי מחיר והתאמה
      </button>

      <button 
        className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center
          ${activeButton === 'performance' 
            ? 'bg-gray-300 text-gray-700' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
        onClick={handlePerformanceSort}
      >
        <Zap className="ml-2 h-4 w-4" />
        מיון לפי עוצמה והתאמה
      </button>
    </div>
  );
}

