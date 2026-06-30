import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12">
      <div className="w-12 h-1 bg-teal-500 mb-6 section-divider" />
      <h2 className="text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
