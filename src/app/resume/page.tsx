import React from 'react';
import { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import { accomplishments, reference, socialLinks } from '@/data/resume';
import { blogs } from '@/data/blogs';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional CV of V.G. Sahasra Mihisarani, including accomplishments, publications, research projects, and references.',
};

export default function ResumePage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="bg-white border border-gray-200 p-10 md:p-16 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-10 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy-950 tracking-tight mb-4">
                V.G. Sahasra Mihisarani
              </h1>
              <p className="text-teal-600 font-semibold tracking-widest uppercase text-sm mb-6">
                Geoinformatics Undergraduate
              </p>
              
              <div className="flex flex-col gap-2 text-gray-600 text-sm">
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Galle, Sri Lanka
                </p>
                {/* <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +94 740378425
                </p> */}
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:sahasramihisarani631@gmail.com" className="hover:text-teal-600 transition-colors">sahasramihisarani631@gmail.com</a>
                </p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 flex flex-col gap-4">
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="bg-teal-600 text-white text-center font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:bg-teal-700 transition-colors"
              >
                Download PDF
              </a>
              <div className="flex justify-center gap-4 text-sm font-medium text-gray-600">
                <a href={socialLinks.linkedin} className="hover:text-teal-600 transition-colors">LinkedIn</a>
                <span className="text-gray-300">|</span>
                <a href={socialLinks.medium} className="hover:text-teal-600 transition-colors">Medium</a>
                <span className="text-gray-300">|</span>
                <a href={socialLinks.coursera} className="hover:text-teal-600 transition-colors">Coursera</a>
              </div>
            </div>
          </div>
          
          {/* Accomplishments */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-1 bg-teal-500 section-divider" />
              Accomplishments
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accomplishments.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Publications */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-1 bg-teal-500 section-divider" />
              Publications
            </h3>
            <ol className="list-decimal list-outside ml-5 space-y-3 text-gray-700">
              {blogs.map((blog) => (
                <li key={blog.id} className="pl-2">
                  <span className="font-medium text-navy-900">{blog.title}</span>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Research Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-1 bg-teal-500 section-divider" />
              Research Projects
            </h3>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="border-l-2 border-gray-200 pl-4 hover:border-teal-500 transition-colors">
                  <h4 className="font-bold text-navy-900 text-lg mb-1">{project.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Reference */}
          <div>
            <h3 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-1 bg-teal-500 section-divider" />
              Reference
            </h3>
            <div className="bg-gray-50 p-6 border border-gray-200">
              <h4 className="font-bold text-navy-900 text-lg">{reference.name}</h4>
              <p className="text-teal-600 font-medium mb-1">{reference.position}</p>
              <p className="text-gray-600 mb-4">{reference.company}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>{reference.location}</p>
                <p>General: {reference.general}</p>
                <p>Mobile: {reference.mobile}</p>
                <p>Email: <a href={`mailto:${reference.email}`} className="text-teal-600 hover:underline">{reference.email}</a></p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
