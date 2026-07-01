'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SearchBar from './SearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT ME', path: '/about' },
    { name: 'RESUME', path: '/resume' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const dropdownLinks = [
    { name: 'View All Projects', path: '/portfolio' },
    { name: 'View All Publications', path: '/blog' },
    { name: 'View All Certifications', path: '/certifications' },
  ];

  const isExploreActive = dropdownLinks.some(link => pathname.startsWith(link.path));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-4 border-b border-gray-200' : 'bg-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4 md:gap-8">
        <Link href="/" className="text-navy-900 font-bold text-sm sm:text-base md:text-xl tracking-tight z-50 relative shrink-0">
          V.G. SAHASRA MIHISARANI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 items-center flex-grow justify-center">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs font-semibold tracking-widest transition-colors ${
                pathname === link.path
                  ? 'text-teal-500'
                  : 'text-gray-600 hover:text-navy-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1 text-xs font-semibold tracking-widest transition-colors focus:outline-none ${
                isExploreActive || isDropdownOpen
                  ? 'text-teal-500'
                  : 'text-gray-600 hover:text-navy-900'
              }`}
            >
              EXPLORE
              <svg 
                className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-4 w-56 bg-white border border-gray-200 shadow-lg py-2 flex flex-col z-50">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`px-4 py-3 text-xs font-semibold tracking-widest transition-colors ${
                      pathname === link.path
                        ? 'text-teal-500 bg-gray-50'
                        : 'text-gray-600 hover:text-teal-500 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs font-semibold tracking-widest transition-colors ${
                pathname === link.path
                  ? 'text-teal-500'
                  : 'text-gray-600 hover:text-navy-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:block z-50">
          <SearchBar />
        </div>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden z-50 relative flex items-center gap-2 sm:gap-4">
          <button
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
          <span
            className={`block w-6 h-0.5 bg-navy-900 transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-navy-900 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-navy-900 transition-transform duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
        </div>

        {/* Mobile Nav Panel */}
        <div
          className={`fixed inset-0 bg-white z-40 flex flex-col justify-center transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden`}
        >
          <div className="flex flex-col h-full pt-32 px-8 overflow-y-auto pb-12">
            <div className="mb-8 w-full max-w-sm">
              <SearchBar />
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold tracking-widest border-b border-gray-100 pb-4 ${
                    pathname === link.path ? 'text-teal-500' : 'text-navy-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="py-2">
                <span className="text-sm font-bold tracking-widest text-gray-400 mb-4 block">EXPLORE</span>
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-base font-semibold tracking-wide ${
                        pathname === link.path ? 'text-teal-500' : 'text-navy-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold tracking-widest border-b border-gray-100 pb-4 pt-2 ${
                    pathname === link.path ? 'text-teal-500' : 'text-navy-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
