export type Education = {
  id: number;
  degree: string;
  institution: string;
  period: string;
};

export type Skills = {
  geospatialTechnologies: string[];
  software: string[];
  programming: string[];
  research: string[];
};

export type Reference = {
  name: string;
  position: string;
  company: string;
  location: string;
  general: string;
  mobile: string;
  email: string;
};

export type SocialLinks = {
  linkedin: string;
  medium: string;
  coursera: string;
};

export const education: Education[] = [
  {
    id: 1,
    degree: 'BSc in Geoinformatics',
    institution: 'General Sir John Kotelawala Defence University (KDU)',
    period: '2023 - Present',
  },
  {
    id: 2,
    degree: 'GCE Advanced Level (2021) - Bio Stream',
    institution: 'Sanghamitta Girls College, Galle',
    period: '2021',
  },
  {
    id: 3,
    degree: 'GCE Ordinary Level (2018)',
    institution: 'Sanghamitta Girls College, Galle',
    period: '2018',
  },
];

export const skills: Skills = {
  geospatialTechnologies: [
    'GIS',
    'Remote Sensing',
    'Photogrammetry',
    'Disaster Risk Management',
  ],
  software: ['ArcGIS Pro', 'QGIS'],
  programming: ['Python', 'Data Analysis'],
  research: [
    'Scientific Writing',
    'Proposal Development',
    'Technical Articles',
  ],
};

export const accomplishments: string[] = [
  'Published 10+ technical GIS articles on Medium',
  'Completed GIS and Remote Sensing certifications',
  'Research on coastal erosion and mangrove mapping',
  'Developed spatial analysis projects',
  'Disaster risk management research',
  'Satellite image analysis experience',
];

export const reference: Reference = {
  name: 'M. S. Kesara Cooray',
  position: 'Director / CEO',
  company: 'StackNet (Pvt) Ltd',
  location: 'Moratuwa, Colombo, Sri Lanka',
  general: '+94 11 264 6619',
  mobile: '+94 77 05 68 688',
  email: 'kesara@stacknet.lk',
};

export const socialLinks: SocialLinks = {
  linkedin: '#',
  medium: '#',
  coursera: '#',
};
