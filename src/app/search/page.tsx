import React, { Suspense } from 'react';
import { Metadata } from 'next';
import SearchResults from './SearchResults';
import SectionTitle from '@/components/SectionTitle';

export const metadata: Metadata = {
  title: 'Search Results | V.G. Sahasra Mihisarani',
  description: 'Search across all projects, publications, and certifications.',
};

export default function SearchPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <SectionTitle 
          title="Search Results" 
          subtitle="Explore projects, publications, and certifications"
        />
        
        <div className="mt-12 bg-white p-8 md:p-12 border border-gray-200">
          <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading search results...</div>}>
            <SearchResults />
          </Suspense>
        </div>

      </div>
    </div>
  );
}
