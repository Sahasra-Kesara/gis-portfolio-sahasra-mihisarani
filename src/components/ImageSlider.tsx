'use client';

import React, { useState } from 'react';
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

  return (
    <div className={className}>
      <Image
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        fill
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
  );
}
