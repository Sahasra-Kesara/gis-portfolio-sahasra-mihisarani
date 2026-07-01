'use client';

import dynamic from 'next/dynamic';

const GisGlobe = dynamic(() => import('./GisGlobe'), { ssr: false });

export default function GisGlobeDynamic() {
  return <GisGlobe />;
}
