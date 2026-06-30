import React from 'react';
import { Certification } from '@/data/certifications';
import ImageSlider from './ImageSlider';

interface CertificateCardProps {
  certification: Certification;
}

export default function CertificateCard({ certification }: CertificateCardProps) {
  return (
    <div className="group bg-white border border-gray-200 hover:border-teal-500/30 transition-colors flex flex-col h-full">
      <ImageSlider 
        images={certification.images} 
        alt={certification.title} 
        className="relative h-48 w-full bg-gray-50 overflow-hidden border-b border-gray-100"
        objectFit="contain"
      />
      
      <div className="p-6 flex flex-col flex-grow text-center">
        <h3 className="text-lg font-bold text-navy-900 mb-1 leading-snug">
          {certification.title}
        </h3>
        
        <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-4">
          {certification.organization}
        </p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {certification.description}
        </p>
      </div>
    </div>
  );
}
