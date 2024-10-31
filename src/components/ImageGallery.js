"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StackedImg1 from '../assets/StackedImg1.png';
import StackedImg2 from '../assets/StackedImg2.png';
import StackedImg3 from '../assets/StackedImg3.png';

/**
 * @typedef {Object} ImageCardProps
 * @property {string} src - Image source URL
 * @property {string} alt - Alternative text for the image
 * @property {number} opacity - Opacity level
 * @property {number} translateY - Vertical translation value
 */

/**
 * @param {ImageCardProps} props
 */
const ImageCard = ({ src, alt, opacity, translateY }) => (
  <motion.div
    className="absolute w-full rounded-lg shadow-md overflow-hidden"
    style={{ opacity, y: translateY }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity, y: translateY }}
    transition={{ duration: 0.5 }}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </motion.div>
);

const ImageGallery = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const images = [
    

    { src: StackedImg3, alt: "Image 3" },
    { src: StackedImg2, alt: "Image 2" },
    { src: StackedImg1, alt: "Image 1" },
  ];

  const opacities = [0.2, 0.5,1 ]
  const verticalOffsets = [0, 50, 80]


  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ height: '250px' }}>
{images.map((image, index) => (
        <ImageCard
          key={index}
          {...image}
          opacity={isVisible ? opacities[index] : 0}
          translateY={isVisible ? verticalOffsets[index] : 40}
      />
      ))}
    </div>
  );
};

export default ImageGallery;


