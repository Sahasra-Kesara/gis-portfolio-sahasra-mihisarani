import React from 'react';
import { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import BlogCard from '@/components/BlogCard';
import { blogs } from '@/data/blogs';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Technical articles and research insights on Geoinformatics, GIS, and Remote Sensing.',
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          title="Publications" 
          subtitle="My latest technical articles, research insights, and perspectives on geospatial technology." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
