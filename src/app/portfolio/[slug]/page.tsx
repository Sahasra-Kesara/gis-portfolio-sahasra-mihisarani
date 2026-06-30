import React from 'react';
import { Metadata } from 'next';
import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';

// Await the params according to Next.js 15+ requirements
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link 
          href="/portfolio" 
          className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 text-sm tracking-wide uppercase mb-10 group"
        >
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>
        
        {/* Header */}
        <div className="mb-12">
          <span className="bg-teal-50 text-teal-600 border border-teal-200 text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-4 inline-block">
            {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-navy-950 tracking-tight leading-tight mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tools.map((tool, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
        
        {/* Main Image */}
        <div className="mb-16 border border-gray-200 h-64 md:h-[500px]">
          <ImageSlider 
            images={project.images} 
            alt={project.title} 
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
            <p>{project.description}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-3">
              <span className="w-6 h-1 bg-teal-500 inline-block" />
              Research Objective
            </h2>
            <p>{project.objective}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-3">
              <span className="w-6 h-1 bg-teal-500 inline-block" />
              Methodology
            </h2>
            <p>{project.methodology}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-3">
              <span className="w-6 h-1 bg-teal-500 inline-block" />
              Data Sources
            </h2>
            <p>{project.dataSources}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-3">
              <span className="w-6 h-1 bg-teal-500 inline-block" />
              Analysis
            </h2>
            <p>{project.analysis}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-3">
              <span className="w-6 h-1 bg-teal-500 inline-block" />
              Results
            </h2>
            <p>{project.results}</p>
          </section>
          
        </div>
      </div>
    </div>
  );
}
