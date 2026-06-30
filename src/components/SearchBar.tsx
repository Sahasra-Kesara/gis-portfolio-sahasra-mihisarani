'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { projects, Project } from '@/data/projects';
import { blogs, Blog } from '@/data/blogs';
import { certifications, Certification } from '@/data/certifications';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Search Results State
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [filteredCerts, setFilteredCerts] = useState<Certification[]>([]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter logic whenever query changes
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProjects([]);
      setFilteredBlogs([]);
      setFilteredCerts([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    setFilteredProjects(projects.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    ));
    
    setFilteredBlogs(blogs.filter(b => 
      b.title.toLowerCase().includes(lowerQuery) || 
      b.description.toLowerCase().includes(lowerQuery)
    ));
    
    setFilteredCerts(certifications.filter(c => 
      c.title.toLowerCase().includes(lowerQuery) || 
      c.description.toLowerCase().includes(lowerQuery) ||
      c.organization.toLowerCase().includes(lowerQuery)
    ));

    setIsOpen(true);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  const hasResults = filteredProjects.length > 0 || filteredBlogs.length > 0 || filteredCerts.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <form onSubmit={handleSearch} className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          className="w-full bg-gray-50 border border-gray-200 text-sm text-navy-900 px-4 py-2 pl-10 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
        />
        <svg 
          className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </form>

      {/* Dropdown Results */}
      {isOpen && query.trim() !== '' && (
        <div className="absolute top-full right-0 mt-2 w-[calc(100vw-3rem)] md:w-96 bg-white border border-gray-200 shadow-xl z-50 max-h-[80vh] overflow-y-auto">
          {!hasResults ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              
              {/* Projects */}
              {filteredProjects.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-1 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Projects ({filteredProjects.length})
                  </div>
                  {filteredProjects.slice(0, 2).map(project => (
                    <Link 
                      key={project.id} 
                      href={`/portfolio/${project.slug}`}
                      onClick={handleLinkClick}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <p className="text-sm font-bold text-navy-900 line-clamp-1">{project.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{project.description}</p>
                    </Link>
                  ))}
                </div>
              )}

              {/* Publications */}
              {filteredBlogs.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-1 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Publications ({filteredBlogs.length})
                  </div>
                  {filteredBlogs.slice(0, 2).map(blog => (
                    <Link 
                      key={blog.id} 
                      href={`/blog/${blog.id}`}
                      onClick={handleLinkClick}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <p className="text-sm font-bold text-navy-900 line-clamp-1">{blog.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{blog.description}</p>
                    </Link>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {filteredCerts.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-1 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Certifications ({filteredCerts.length})
                  </div>
                  {filteredCerts.slice(0, 2).map(cert => (
                    <Link 
                      key={cert.id} 
                      href={`/certifications`} // Note: No individual cert page currently
                      onClick={handleLinkClick}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <p className="text-sm font-bold text-navy-900 line-clamp-1">{cert.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{cert.organization}</p>
                    </Link>
                  ))}
                </div>
              )}

              {/* Show All Link */}
              <div className="px-4 py-3 border-t border-gray-200 mt-2 bg-gray-50">
                <Link 
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleLinkClick}
                  className="block text-center text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  Show all results for "{query}"
                </Link>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
