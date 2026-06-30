'use client';

import React, { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          title="Portfolio" 
          subtitle="A showcase of my research and projects in Geoinformatics, GIS, and Remote Sensing." 
        />
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 mt-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
                filter === category 
                  ? 'bg-navy-900 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-navy-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
