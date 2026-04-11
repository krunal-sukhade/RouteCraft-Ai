import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bg3 from '../assets/bg3.jpeg';
import Bg1 from '../assets/Bg1.avif';
import Bg2 from '../assets/Bg2.avif';
import Bg3 from '../assets/Bg3.avif';
import Bg4 from '../assets/Bg4.avif';

// Replace these with your actual image paths
const backgroundImages = [
  Bg1,
  Bg2,
  Bg3,
  Bg4,
  bg3,
];

const BackgroundSlider = ({ children, videoSrc = null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(!!videoSrc);

  useEffect(() => {
    if (!videoSrc) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [videoSrc]);

  return (
    <>
      {/* Fixed Background Container - stays in place while scrolling */}
      <div className="fixed inset-0 z-0">
        {/* Video Background */}
        {videoSrc && isVideoPlaying && (
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onError={() => setIsVideoPlaying(false)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Image Slider Background */}
        {!videoSrc && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={backgroundImages[currentIndex]}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Gradient Overlay - Adjusts based on theme */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          document.documentElement.classList.contains('dark') 
            ? 'bg-gradient-to-b from-black/80 via-black/60 to-black/90' 
            : 'bg-gradient-to-b from-black/50 via-black/30 to-black/60'
        }`}></div>

        {/* Slider Indicators (only for image slideshow) */}
        {!videoSrc && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Content - this will scroll over the fixed background */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default BackgroundSlider;