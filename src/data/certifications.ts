export type Certification = {
  id: number;
  title: string;
  organization: string;
  description: string;
  image: string;
};

export const certifications: Certification[] = [
  {
    id: 1,
    title: 'GIS Fundamentals',
    organization: 'Esri',
    description:
      'Comprehensive certification covering fundamental GIS concepts, spatial analysis, and cartographic principles.',
    image: '/images/certifications/cert-1.jpg',
  },
  {
    id: 2,
    title: 'Remote Sensing and Image Interpretation',
    organization: 'Coursera',
    description:
      'Advanced certification in remote sensing techniques, satellite image interpretation, and digital image processing.',
    image: '/images/certifications/cert-2.jpg',
  },
  {
    id: 3,
    title: 'Spatial Data Science',
    organization: 'Esri',
    description:
      'Certification in spatial data science methodologies, spatial statistics, and geospatial machine learning.',
    image: '/images/certifications/cert-3.jpg',
  },
  {
    id: 4,
    title: 'Python for Geospatial Analysis',
    organization: 'Udemy',
    description:
      'Certification in Python programming for geospatial data analysis, automation, and visualization.',
    image: '/images/certifications/cert-4.jpg',
  },
  {
    id: 5,
    title: 'Disaster Risk Management using GIS',
    organization: 'World Bank',
    description:
      'Certification in applying GIS technologies for disaster risk assessment, management, and emergency response planning.',
    image: '/images/certifications/cert-5.jpg',
  },
  {
    id: 6,
    title: 'Environmental Impact Assessment',
    organization: 'Coursera',
    description:
      'Certification in environmental impact assessment methodologies using geospatial technologies.',
    image: '/images/certifications/cert-6.jpg',
  },
];
