import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-navy-800 pb-12 mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">V.G. Sahasra Mihisarani</h3>
            <p className="text-gray-400 font-medium">Geoinformatics Undergraduate | GIS Researcher</p>
          </div>
          <div className="flex flex-col md:items-end justify-center gap-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-2">Connect</h4>
            <div className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors font-medium text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors font-medium text-sm">
                Medium
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors font-medium text-sm">
                Coursera
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} V.G. Sahasra Mihisarani. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with geospatial precision <span className="w-2 h-2 bg-teal-500 inline-block"></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
