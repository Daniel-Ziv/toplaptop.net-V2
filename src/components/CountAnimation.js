"use client"

import { useState, useEffect } from 'react'

export default function CountAnimation() {
  const [count, setCount] = useState(0)
  const targetCount = 1000
  const duration = 2000 // Animation duration in milliseconds

  useEffect(() => {
    let startTime = null
    let animationFrameId

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      const currentCount = Math.floor(percentage * targetCount)

      setCount(currentCount)

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animateCount)
      }
    }

    animationFrameId = requestAnimationFrame(animateCount)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="text-2xl  text-black text-center mt-3 font-display" dir="rtl">
        עזרנו ליותר מ -
        <span className=" bg-white text-blue-500 rounded-lg px-1 py-2 ml-1 font-display">
          {count.toLocaleString()}
        </span>
        אנשים למצוא מחשב!
      </div>
  )
}
