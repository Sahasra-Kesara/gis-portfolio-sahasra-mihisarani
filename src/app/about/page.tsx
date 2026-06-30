import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import { education, skills } from '@/data/resume';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about V.G. Sahasra Mihisarani, a Geoinformatics undergraduate specializing in GIS, Remote Sensing, and Spatial Analysis.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="About Me" subtitle="My academic journey and technical expertise in Geoinformatics." />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-12">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Profile Summary</h3>
            <div className="prose prose-lg text-gray-600 mb-8">
              <p className="mb-4">
                I am a Geoinformatics undergraduate specializing in GIS, Remote Sensing, Spatial Analysis, and Environmental Applications.
              </p>
              <p>
                My interests include satellite image analysis, disaster risk management, coastal studies, and applying geospatial technologies to solve real-world problems.
              </p>
            </div>
            <Link 
              href="/resume" 
              className="inline-block bg-teal-600 text-white font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:bg-teal-700 transition-colors"
            >
              Read Full Resume
            </Link>
          </div>
          
          {/* Education Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-navy-900 mb-8">Education</h3>
            <div className="relative border-l-2 border-teal-500 pl-8 ml-4 space-y-12">
              {education.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-teal-500" />
                  <h4 className="text-xl font-bold text-navy-900">{item.degree}</h4>
                  <p className="text-teal-600 font-medium my-1">{item.institution}</p>
                  <p className="text-gray-500 text-sm">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-navy-900 mb-8">Professional Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-gray-50 border border-gray-200 p-8 hover:border-teal-500/30 transition-colors">
              <h4 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-200 pb-4">
                Geospatial Technologies
              </h4>
              <ul className="space-y-3">
                {skills.geospatialTechnologies.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 p-8 hover:border-teal-500/30 transition-colors">
              <h4 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-200 pb-4">
                Software
              </h4>
              <ul className="space-y-3">
                {skills.software.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 p-8 hover:border-teal-500/30 transition-colors">
              <h4 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-200 pb-4">
                Programming
              </h4>
              <ul className="space-y-3">
                {skills.programming.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 p-8 hover:border-teal-500/30 transition-colors">
              <h4 className="text-lg font-bold text-navy-900 mb-6 border-b border-gray-200 pb-4">
                Research
              </h4>
              <ul className="space-y-3">
                {skills.research.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
