import React from 'react';
import Link from 'next/link';
import { Blog } from '@/data/blogs';
import ImageSlider from './ImageSlider';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group bg-white border border-gray-200 hover:border-teal-500/30 transition-colors flex flex-col h-full">
      <ImageSlider 
        images={blog.images} 
        alt={blog.title} 
        className="relative h-48 w-full bg-gray-100 overflow-hidden" 
      />
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-navy-900 mb-3 leading-snug">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {blog.description}
        </p>
        
        <Link 
          href={`/blog/${blog.id}`}
          className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 text-sm tracking-wide uppercase mt-auto"
        >
          Read Article
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
