import React from 'react';
import Image from 'next/image';
import { Certification } from '@/data/certifications';

interface CertificateCardProps {
  certification: Certification;
}

export default function CertificateCard({ certification }: CertificateCardProps) {
  return (
    <div className="group bg-white border border-gray-200 hover:border-teal-500/30 transition-colors flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
        {certification.image ? (
          <Image
            src={certification.image}
            alt={certification.title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-medium">Certificate Preview</span>
          </div>
        )}
      </div>
      
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
