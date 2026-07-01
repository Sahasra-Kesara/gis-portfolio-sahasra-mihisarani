import React from 'react';
import { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { socialLinks } from '@/data/resume';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for research collaborations, GIS projects, or geospatial consulting opportunities.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          title="Contact Me" 
          subtitle="Let's connect. I'm open to research collaborations, projects, and new opportunities in Geoinformatics." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">Reach out directly via email for inquiries.</p>
              <a href="mailto:sahasramihisarani631@gmail.com" className="text-teal-600 font-medium hover:underline">
                sahasramihisarani631@gmail.com
              </a>
            </div>
            
            {/* <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">Available for calls during business hours.</p>
              <p className="text-teal-600 font-medium">
                +94 740378425
              </p>
            </div> */}
            
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Social Profiles</h3>
              <div className="flex flex-col gap-2 mt-4">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-300 inline-block" /> LinkedIn
                </a>
                <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-300 inline-block" /> Medium
                </a>
              </div>
            </div>
            
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          
        </div>

        {/* 3D Interactive GIS Art moved to home page */}
      </div>
    </div>
  );
}
