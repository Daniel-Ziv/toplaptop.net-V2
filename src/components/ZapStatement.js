"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import zapLogo from '../assets/zapLogo.png';
export default function ZapStatement() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="py-3 flex items-center justify-center"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse" dir="rtl">
          <div className="bg-white  rounded-md px-3 py-1 flex items-center">
            <span className="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-700 text-center ml-2">המחיר הקובע הוא באתר</span>
            
              
                <img src={zapLogo} width={100} height={100} alt="zap logo"></img>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
