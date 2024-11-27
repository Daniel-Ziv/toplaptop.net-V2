import { useState } from 'react';

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
    <div className="flex justify-center gap-4" dir="rtl">
      <button 
        className={`px-4 py-2 border-2 border-black rounded-lg transition-all duration-200
          ${activeButton === 'price' 
            ? 'bg-black text-white shadow-inner' 
            : 'text-black hover:bg-black hover:text-white'}`}
        onClick={handlePriceSort}
      >
        מיון לפי מחיר
      </button>

      <button 
        className={`px-4 py-2 border-2 border-black rounded-lg transition-all duration-200
          ${activeButton === 'performance' 
            ? 'bg-black text-white shadow-inner' 
            : 'text-black hover:bg-black hover:text-white'}`}
        onClick={handlePerformanceSort}
      >
        מיין לפי עוצמה
      </button>
    </div>
  );
}