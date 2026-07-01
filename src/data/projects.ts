export type Project = {
  id: number;
  slug: string;
  title: string;
  images: string[];
  description: string;
  objective: string;
  tools: string[];
  category: string;
  methodology: string;
  dataSources: string;
  analysis: string;
  results: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'buffer-mapping-sri-lanka',
    title: 'Buffer mapping in Sri Lanka.',
    images: [],
    description: 'This project demonstrates how buffer analysis can be applied to road networks and forest areas to support spatial planning, environmental conservation, and risk management.',
    objective: 'To apply buffer analysis to road networks and forest areas for spatial planning and risk management.',
    tools: ['GIS', 'Remote Sensing'],
    category: 'Spatial Analysis',
    methodology: 'Geospatial data management, spatial analysis, and map production using GIS tools.',
    dataSources: 'Road networks and forest areas spatial data',
    analysis: 'Buffer analysis',
    results: 'The project strengthened my interest in leveraging GIS and Remote Sensing technologies to address real-world challenges and contribute to sustainable development.',
  },
  {
    id: 2,
    slug: 'fieldwork-experience-surveying-mapping',
    title: 'Fieldwork Experience in Surveying & Mapping',
    images: [
      '/images/projects/Fieldwork-Experience-in-Surveying-&-Mapping-01.jpg',
      '/images/projects/Fieldwork-Experience-in-Surveying-&-Mapping-02.jpg',
      '/images/projects/Fieldwork-Experience-in-Surveying-&-Mapping-03.jpg'
    ],
    description: 'Gaining hands-on experience with a Total Station and applying surveying principles in a real-world environment.',
    objective: 'To strengthen understanding of field measurements, data collection, instrument handling, and teamwork essential skills in geospatial and surveying applications.',
    tools: ['Total Station', 'Surveying Equipment'],
    category: 'Surveying',
    methodology: 'Practical field measurements, data collection, and instrument handling.',
    dataSources: 'Primary field survey data',
    analysis: 'Real-world environment surveying and mapping analysis.',
    results: 'Field training bridges the gap between classroom knowledge and professional practice, helping develop accuracy, responsibility, and problem-solving abilities required in the surveying industry.',
  },
  {
    id: 3,
    slug: 'mapping-boundaries-gps-field-survey-kdu',
    title: 'Mapping the Boundaries- GPS Field Survey at KDU Southern Campus',
    images: [
      '/images/projects/Mapping-the-Boundaries-GPS-Field-Survey-at-KDU-Southern-Campus.jpg',
      '/images/projects/Mapping-the-Boundaries-GPS-FieldS-urvey-at-KDU-Southern-Campus.jpg',
      '/images/projects/Mapping-the-Boundaries-GPS-FieldS-urvey-at-KDU-Southern-Campus-03.jpg'
    ],
    description: 'Boundary mapping of the Southern Campus, collecting precise GPS data points along the perimeter to accurately visualize the campus extent.',
    objective: 'To collect precise GPS data points along the perimeter to accurately visualize the campus extent.',
    tools: ['GPS Handheld units', 'GIS Software'],
    category: 'Field Survey',
    methodology: 'Data acquisition in the field using GPS handheld units and map generation using GIS software.',
    dataSources: 'Primary GPS data points',
    analysis: 'Boundary mapping and spatial visualization.',
    results: 'Provided a hands-on opportunity to apply Geoinformatics principles in a real-world scenario, covering the entire workflow from data acquisition to final map generation.',
  },
  {
    id: 4,
    slug: 'visualization-regional-administration',
    title: 'Visualization is key to understanding regional administration.',
    images: [
      '/images/projects/Visualization-is-key-to-understanding-regional-administration..jpg'
    ],
    description: 'Layout of the Kandy Divisional Secretariats in ArcGIS Pro, essential for urban planning, resource allocation, and understanding the geographic context of administrative governance.',
    objective: 'To visualize the Kandy Divisional Secretariats for urban planning and resource allocation.',
    tools: ['ArcGIS Pro'],
    category: 'Cartography',
    methodology: 'Map layout design and spatial data visualization.',
    dataSources: 'Administrative boundaries and spatial data of Kandy Divisional Secretariats',
    analysis: 'Regional administration visualization.',
    results: 'Successfully brought raw spatial data together into a professional layout ready for reporting and analysis.',
  },
  {
    id: 5,
    slug: 'comparative-analysis-wall-surface-temperature',
    title: 'Comparative Analysis of Wall Surface Temperature-Heritage vs. Modern Buildings in Galle Fort',
    images: [
      '/images/projects/Comparative-Analysis-of-Wall-Surface-Temperature-Heritage-vs.-Modern-Buildings-in-Galle Fort.jpg',
      '/images/projects/Comparative-Analysis-of-Wall-Surface-Temperature-Heritage-vs.-Modern-Buildings-in-Galle Fort-02.jpg',
      '/images/projects/Comparative-Analysis-of-Wall-Surface-Temperature-Heritage-vs.-Modern-Buildings-in-Galle Fort-03.jpg',
      '/images/projects/Comparative-Analysis-of-Wall-Surface-Temperature-Heritage-vs.-Modern-Buildings-in-Galle Fort-4.jpg'
    ],
    description: 'A study comparing the wall surface temperatures of heritage and modern buildings in Galle Fort, focusing on the effects of building materials and proximity to the sea.',
    objective: 'To compare wall surface temperatures of heritage vs. modern buildings and analyze the impact of proximity to the sea.',
    tools: ['RStudio', 'ggplot2', 'Base R', 'Statistical Analysis'],
    category: 'Environmental Analysis',
    methodology: 'Statistical analysis including mean comparison, variance analysis, boxplots, bar charts, and interaction plots.',
    dataSources: 'Wall surface temperature readings of heritage and modern buildings in Galle Fort',
    analysis: 'Heritage buildings showed lower temperatures (mean ≈ 28.7°C) than modern (mean ≈ 32.3°C). Buildings near the sea maintain lower temperatures.',
    results: 'Underscored the importance of sustainable architectural practices. Modern buildings experience a steeper temperature rise further from the coast, making them more susceptible to urban heat.',
  },
  {
    id: 6,
    slug: 'geospatial-analysis-temperature-distribution-mapping',
    title: 'Geospatial Analysis Project – Temperature Distribution Mapping',
    images: [
      '/images/projects/Geospatial-Analysis-Project–Temperature-Distribution-Mapping.jpg',
      '/images/projects/Geospatial-Analysis-Project–Temperature-Distribution-Mapping-2.jpg',
      '/images/projects/Geospatial-Analysis-Project–Temperature-Distribution-Mapping-3.jpg',
      '/images/projects/Geospatial-Analysis-Project–Temperature-Distribution-Mapping-4.jpg'
    ],
    description: 'Using tools such as QGIS, Google Earth Pro, and GPS Visualizer, collected and processed spatial data to create heatmaps and spatial distribution maps of recorded temperature points.',
    objective: 'To analyze and interpret environmental conditions, supporting better urban planning and climate-related decision-making.',
    tools: ['QGIS', 'Google Earth Pro', 'GPS Visualizer'],
    category: 'Geospatial Analysis',
    methodology: 'Spatial data collection, processing, and visualization.',
    dataSources: 'Recorded temperature points and road network data',
    analysis: 'Heatmaps to identify temperature hotspots, spatial distribution maps, and road network integration for better spatial context.',
    results: 'Demonstrated how geospatial technologies can be used to analyze environmental conditions and support better urban planning.',
  }
];
