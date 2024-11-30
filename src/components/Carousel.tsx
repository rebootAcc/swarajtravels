"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Carousel({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const carouselContainerRef = useRef<HTMLDivElement>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigation = (index: number) => {
    if (currentIndex > index) {
      setDirection("next");
    } else {
      setDirection("prev");
    }
    setCurrentIndex(index);
  };

  // Get the array of children (ensure it's always an array for easier mapping)
  const slides = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const autoplayInterval = 3000; // Time in milliseconds (3 seconds)

    // Start autoplay when component mounts
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length; // Loop to the first slide
        setDirection("next");
        return nextIndex;
      });
    }, autoplayInterval);

    // Clear the interval when the component is unmounted
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        {/* Container for the carousel slides */}
        <motion.div
          className="flex w-full"
          key={currentIndex} // Only re-render when currentIndex changes
          initial={{ x: direction === "next" ? "100%" : "-100%" }} // Initial position based on direction
          animate={{ x: 0 }} // Animate to the center
          exit={{ x: direction === "next" ? "-100%" : "100%" }} // Exit in the opposite direction
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {slides.map((child, index) => {
            const isActive = index === currentIndex;
            return (
              <motion.div
                key={index}
                ref={carouselContainerRef}
                className={`flex-shrink-0 w-full ${
                  isActive ? "block" : "hidden"
                }`} // Show only active slide
                initial={{
                  x: direction === "next" ? "100%" : "-100%",
                }}
                animate={{
                  x: isActive ? 0 : direction === "next" ? "100%" : "-100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {child}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute z-50 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.length > 0 &&
          slides.map((_, count) => (
            <button
              type="button"
              className={`w-6 lg:w-8 h-1 lg:h-2 rounded-full ${
                currentIndex === count ? "bg-primary" : "bg-white"
              }`}
              key={count}
              onClick={() => handleNavigation(count)}
            />
          ))}
      </div>
    </div>
  );
}
