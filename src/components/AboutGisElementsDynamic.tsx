'use client';

import dynamic from 'next/dynamic';

const AboutGisElements = dynamic(() => import('./AboutGisElements'), { ssr: false });

export default function AboutGisElementsDynamic() {
  return <AboutGisElements />;
}
