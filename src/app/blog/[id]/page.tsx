import React from 'react';
import { Metadata } from 'next';
import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogs } from '@/data/blogs';

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.id.toString() === resolvedParams.id);
  
  if (!blog) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: `${blog.title} | Blog`,
    description: blog.description,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.id.toString() === resolvedParams.id);
  
  if (!blog) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link 
          href="/blog" 
          className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 text-sm tracking-wide uppercase mb-10 group"
        >
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Publications
        </Link>
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-navy-950 tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>
        </div>
        
        {/* Main Image */}
        <div className="mb-16 border border-gray-200 h-64 md:h-[500px]">
          <ImageSlider 
            images={blog.images} 
            alt={blog.title} 
            className="relative h-full w-full bg-gray-100 overflow-hidden" 
          />
        </div>
        
        {/* Content */}
        <div className="prose prose-lg prose-teal max-w-none text-gray-600 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-3">
              <span className="w-6 h-1 bg-teal-500 inline-block" />
              Overview
            </h2>
            <p className="text-xl leading-relaxed">{blog.description}</p>
          </section>
          
          <section>
            <p className="italic bg-gray-50 border-l-4 border-teal-500 p-6 text-gray-700">
              This is a full view of the publication. The original article might be available on <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Medium</a>.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}
