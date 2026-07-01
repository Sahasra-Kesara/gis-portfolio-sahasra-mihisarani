'use client';

import dynamic from 'next/dynamic';

const ContactGisArt = dynamic(() => import('./ContactGisArt'), { ssr: false });

export default function ContactGisArtDynamic() {
  return <ContactGisArt />;
}
