import React, { useEffect, useState, useRef } from 'react';
import { Diff } from "lucide-react";

const FloatingCompareButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const lastScrollY = useRef(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling up, show when scrolling down
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Check if at bottom
      const bottomThreshold = 50;
      const isBottom =
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - bottomThreshold;
      
      if (isBottom !== isAtBottom) {
        setIsAtBottom(isBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAtBottom]);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        transform: `translateY(${isVisible && !isAtBottom ? '0' : '100%'})`,
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        opacity: isVisible && !isAtBottom ? 1 : 0,
        pointerEvents: isVisible && !isAtBottom ? 'auto' : 'none',
      }}
      ref={buttonRef}
    >
      <button
        style={{
          width: '256px',
          height: '48px',
          fontSize: '1.125rem',
          backgroundColor: '#198754',
          color: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease-in-out',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#157347'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#198754'}
      >
        <span>השוואת מחשבים</span>
        <Diff size={20} />
      </button>
    </div>
  );
};

export default FloatingCompareButton;