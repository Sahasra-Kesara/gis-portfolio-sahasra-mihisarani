'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
}

export default function ImageSlider({ 
  images, 
  alt, 
  className = "relative w-full h-full bg-gray-100 overflow-hidden",
  objectFit = 'cover'
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Close full screen on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullScreen(false);
      }
    };
    if (isFullScreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullScreen]);

  if (!images || images.length === 0) {
    return (
      <div className={className}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
          [No Image: {alt}]
        </div>
      </div>
    );
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior if inside an <a> tag
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const openFullScreen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFullScreen(true);
  };
  
  const closeFullScreen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFullScreen(false);
  };

  return (
    <>
      <div className={`${className} cursor-pointer group`} onClick={openFullScreen}>
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`transition-transform duration-500 group-hover:scale-105 ${
            objectFit === 'cover' ? 'object-cover' : 'object-contain p-4'
          }`}
        />
        
        {images.length > 1 && (
          <>
            {/* Counter Badge */}
            <div className="absolute top-4 right-4 z-10 bg-navy-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 shadow-sm tracking-wider pointer-events-none">
              {currentIndex + 1} / {images.length}
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={handlePrevious}
                className="w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-navy-900 shadow-sm transition-colors focus:outline-none"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-navy-900 shadow-sm transition-colors focus:outline-none"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Full Screen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeFullScreen}>
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] focus:outline-none"
            onClick={closeFullScreen}
            aria-label="Close full screen"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]}
                alt={`${alt} - Image ${currentIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrevious}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none z-[110]"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none z-[110]"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium tracking-widest backdrop-blur-sm pointer-events-none z-[110]">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
