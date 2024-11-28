import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0
  });

  return (
    <div ref={ref} className={className}>
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          width="200"
          height="200"
        />
      )}
      {(!inView || !loaded) && (
        <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage;