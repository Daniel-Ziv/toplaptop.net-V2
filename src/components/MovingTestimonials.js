import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: "המוצר הזה שינה את חיי! אני לא יכול לדמיין את היום-יום שלי בלעדיו.",
    author: "דוד כהן"
  },
  {
    id: 2,
    text: "שירות לקוחות מעולה ומוצר איכותי. ממליץ בחום!",
    author: "רחל לוי"
  },
  {
    id: 3,
    text: "הפתרון המושלם לבעיה שהטרידה אותי שנים. תודה רבה!",
    author: "יעל גולן"
  },
  {
    id: 4,
    text: "מחיר משתלם ביותר עבור איכות כל כך גבוהה. קנייה מצוינת.",
    author: "משה אברהם"
  }
];

export default function MovingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" text-black  sm:px-6 lg: text-center font-display">
      <div>
        <div className="relative h-48 text-center font-display">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center font-display">
              <p className="text-xl text-center font-display">{testimonials[currentIndex].text}</p>
              <p className="font-semibold text-center font-display">{testimonials[currentIndex].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
