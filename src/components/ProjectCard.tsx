import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-white border border-gray-200 hover:border-teal-500/30 transition-colors flex flex-col h-full">
      <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            [Image: {project.title}]
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-teal-600 text-xs font-semibold px-3 py-1 shadow-sm uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-navy-900 mb-4 line-clamp-2 leading-snug">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tools.slice(0, 4).map((tool, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1">
              +{project.tools.length - 4}
            </span>
          )}
        </div>
        
        <Link 
          href={`/portfolio/${project.slug}`}
          className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 text-sm tracking-wide uppercase group-hover:underline underline-offset-4 decoration-2 decoration-teal-600/30"
        >
          View Project
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
