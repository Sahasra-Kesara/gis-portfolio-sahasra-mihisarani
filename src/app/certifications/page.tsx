import React from 'react';
import { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import CertificateCard from '@/components/CertificateCard';
import { certifications } from '@/data/certifications';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Professional certifications and continuing education in GIS and Remote Sensing.',
};

export default function CertificationsPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          title="Certifications" 
          subtitle="Continuous learning and professional development credentials in Geoinformatics." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {certifications.map((cert) => (
            <CertificateCard key={cert.id} certification={cert} />
          ))}
        </div>
      </div>
    </div>
  );
}
