'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { projects } from '@/data/projects';
import { blogs } from '@/data/blogs';
import { certifications } from '@/data/certifications';
import ProjectCard from '@/components/ProjectCard';
import BlogCard from '@/components/BlogCard';
import CertificateCard from '@/components/CertificateCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  if (!query.trim()) {
    return (
      <div className="text-center py-20 text-gray-500">
        Please enter a search term to find results.
      </div>
    );
  }

  const lowerQuery = query.toLowerCase();

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(lowerQuery) || 
    b.description.toLowerCase().includes(lowerQuery)
  );

  const filteredCerts = certifications.filter(c => 
    c.title.toLowerCase().includes(lowerQuery) || 
    c.description.toLowerCase().includes(lowerQuery) ||
    c.organization.toLowerCase().includes(lowerQuery)
  );

  const hasResults = filteredProjects.length > 0 || filteredBlogs.length > 0 || filteredCerts.length > 0;

  if (!hasResults) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">No results found</h2>
        <p className="text-gray-500">We couldn't find anything matching "{query}". Try a different keyword.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <p className="text-gray-500 mb-8">
        Found {filteredProjects.length + filteredBlogs.length + filteredCerts.length} results for <span className="font-bold text-navy-900">"{query}"</span>
      </p>

      {/* Projects */}
      {filteredProjects.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
            <span className="w-6 h-1 bg-teal-500 inline-block" />
            Projects ({filteredProjects.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {filteredBlogs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
            <span className="w-6 h-1 bg-teal-500 inline-block" />
            Publications ({filteredBlogs.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {filteredCerts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
            <span className="w-6 h-1 bg-teal-500 inline-block" />
            Certifications ({filteredCerts.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.map(cert => (
              <CertificateCard key={cert.id} certification={cert} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
