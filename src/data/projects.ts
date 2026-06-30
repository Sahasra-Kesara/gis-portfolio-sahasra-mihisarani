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
    slug: 'mangrove-mapping-madol-duwa',
    title:
      'Use of Remote Sensing and GIS Techniques to Map Extent and Changes in Mangrove Forests in Madol Duwa, Sri Lanka',
    images: ['/images/projects/project-1.jpg', '/images/projects/project-1b.jpg'],
    description:
      'A comprehensive study using remote sensing and GIS techniques to map and monitor changes in mangrove forest extent in Madol Duwa, Sri Lanka.',
    objective:
      'To analyze spatial and temporal changes in mangrove forests using multi-temporal satellite imagery and GIS analysis techniques.',
    tools: ['ArcGIS Pro', 'QGIS', 'Python', 'Remote Sensing'],
    category: 'Remote Sensing',
    methodology:
      'Multi-temporal satellite image analysis combined with ground-truth verification and spatial change detection algorithms.',
    dataSources:
      'Landsat and Sentinel-2 satellite imagery, field survey data, historical aerial photographs',
    analysis:
      'Change detection analysis, NDVI computation, supervised classification, and accuracy assessment',
    results:
      'Identified significant changes in mangrove extent over a 20-year period, providing data for conservation planning and management strategies.',
  },
  {
    id: 2,
    slug: 'tsunami-early-warning-hambantota',
    title:
      'Developing Tsunami Early Warning Systems in Hambantota Harbour Area',
    images: ['/images/projects/project-2.jpg', '/images/projects/project-2b.jpg'],
    description:
      'Research focused on developing effective tsunami early warning systems for the Hambantota Harbour area using GIS-based approaches.',
    objective:
      'To develop a GIS-based tsunami early warning framework by analyzing coastal vulnerability and wave propagation patterns.',
    tools: ['ArcGIS Pro', 'QGIS', 'Python', 'Spatial Analysis'],
    category: 'Disaster Risk Management',
    methodology:
      'Coastal vulnerability assessment using multi-criteria analysis, wave propagation modeling, and evacuation route optimization.',
    dataSources:
      'Bathymetric data, coastal elevation models, population density data, infrastructure maps',
    analysis:
      'Vulnerability mapping, wave simulation modeling, evacuation route analysis, and risk zone classification',
    results:
      'Developed a comprehensive early warning framework with identified high-risk zones and optimized evacuation routes for the Hambantota Harbour area.',
  },
  {
    id: 3,
    slug: 'coastal-erosion-southern-sri-lanka',
    title:
      'Coastal Erosion and its Impacts on Tourism and Livelihoods in Southern Sri Lanka',
    images: ['/images/projects/project-3.jpg', '/images/projects/project-3b.jpg'],
    description:
      'Analysis of coastal erosion patterns and their socioeconomic impacts on tourism and livelihoods in the southern coastal region of Sri Lanka.',
    objective:
      'To assess the extent and rate of coastal erosion and evaluate its impacts on local tourism and community livelihoods.',
    tools: ['ArcGIS Pro', 'QGIS', 'Remote Sensing', 'Spatial Analysis'],
    category: 'Environmental Research',
    methodology:
      'Shoreline change analysis using multi-temporal satellite imagery, field surveys, and socioeconomic impact assessment.',
    dataSources:
      'Satellite imagery, drone survey data, shoreline position data, socioeconomic survey results',
    analysis:
      'Digital Shoreline Analysis System (DSAS), erosion rate calculation, land use change detection, and impact assessment',
    results:
      'Quantified erosion rates along the southern coast and identified critical areas where erosion significantly impacts tourism infrastructure and local livelihoods.',
  },
  {
    id: 4,
    slug: 'nasa-research-koggala',
    title:
      'Proposal for Establishing a NASA Branch in Koggala, Southern Province, Sri Lanka',
    images: ['/images/projects/project-4.jpg'],
    description:
      'A research proposal analyzing the feasibility of establishing a NASA research facility in Koggala, leveraging its strategic geographic location and existing infrastructure.',
    objective:
      'To evaluate the geographic and infrastructural suitability of Koggala as a potential site for a NASA research branch.',
    tools: ['ArcGIS Pro', 'QGIS', 'Spatial Analysis', 'Site Selection'],
    category: 'Spatial Analysis',
    methodology:
      'Multi-criteria site suitability analysis, geographic advantage assessment, and infrastructure evaluation.',
    dataSources:
      'Geographic data, infrastructure maps, climate data, accessibility analysis data',
    analysis:
      'Site suitability modeling, accessibility analysis, environmental assessment, and comparative location analysis',
    results:
      'Demonstrated the strategic advantages of Koggala including geographic location, climate conditions, and existing infrastructure that support the feasibility of a research facility.',
  },
];
