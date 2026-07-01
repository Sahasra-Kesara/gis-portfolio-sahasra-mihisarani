import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";
import { certifications } from "@/data/certifications";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import CertificateCard from "@/components/CertificateCard";
import SectionTitle from "@/components/SectionTitle";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-50 border-b border-gray-200 gis-grid-bg coordinate-overlay">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-20">
          <div className="max-w-3xl">
            <h2 className="text-teal-600 font-bold tracking-widest uppercase mb-4 text-sm">
              Geoinformatics Undergraduate | GIS Researcher | Remote Sensing Enthusiast
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-navy-950 tracking-tight leading-tight mb-8">
              V.G. Sahasra <br className="hidden md:block" /> Mihisarani
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              "Exploring the world through geospatial technology, remote sensing, and spatial analysis to understand environmental challenges and create meaningful solutions."
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/portfolio" 
                className="bg-navy-900 text-white font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:bg-navy-800 transition-colors"
              >
                View Portfolio
              </Link>
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="bg-teal-600 text-white font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:bg-teal-700 transition-colors"
              >
                Download Resume
              </a>
              <Link 
                href="/contact" 
                className="bg-transparent border border-navy-900 text-navy-900 font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:bg-navy-900 hover:text-white transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <SectionTitle 
              title="Recent Projects" 
              subtitle="Latest geospatial research and analysis projects."
            />
            <Link 
              href="/portfolio" 
              className="hidden md:flex items-center text-teal-600 font-medium hover:text-teal-700 tracking-wide uppercase text-sm group mb-[72px]"
            >
              View All Projects
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="mt-8 md:hidden">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-teal-600 font-medium tracking-wide uppercase text-sm"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            title="Recent Publications" 
            subtitle="Latest technical articles and research insights on Medium."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/blog" 
              className="inline-block bg-white border border-gray-300 text-navy-900 font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:border-teal-500 hover:text-teal-600 transition-colors"
            >
              View All Publications
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            title="Certifications" 
            subtitle="Professional development and continuous learning in GIS and Remote Sensing."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {certifications.map((cert) => (
              <CertificateCard key={cert.id} certification={cert} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/certifications" 
              className="inline-block bg-white border border-gray-300 text-navy-900 font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:border-teal-500 hover:text-teal-600 transition-colors"
            >
              View All Certifications
            </Link>
          </div>
        </div>
      </section>

      {/* Research Activities */}
      <section className="py-24 bg-navy-900 text-white gis-grid-bg relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-1 bg-teal-500 mb-6 section-divider" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Research Focus Areas
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Applying spatial science to solve complex real-world environmental and societal challenges.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-navy-800 p-6 border border-navy-700 hover:border-teal-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-teal-400 mb-3">GIS Analysis</h3>
                  <p className="text-sm text-gray-400">Advanced spatial analysis, suitability modeling, and geographic data visualization.</p>
                </div>
                <div className="bg-navy-800 p-6 border border-navy-700 hover:border-teal-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-teal-400 mb-3">Remote Sensing</h3>
                  <p className="text-sm text-gray-400">Satellite image processing, change detection, and environmental monitoring.</p>
                </div>
                <div className="bg-navy-800 p-6 border border-navy-700 hover:border-teal-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-teal-400 mb-3">Disaster Risk</h3>
                  <p className="text-sm text-gray-400">Early warning systems, vulnerability assessment, and emergency management.</p>
                </div>
                <div className="bg-navy-800 p-6 border border-navy-700 hover:border-teal-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-teal-400 mb-3">Environmental</h3>
                  <p className="text-sm text-gray-400">Coastal erosion analysis, mangrove mapping, and resource conservation.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-navy-800 p-8 md:p-12 border border-navy-700 text-center">
              <h3 className="text-2xl font-bold mb-4">Interested in collaboration?</h3>
              <p className="text-gray-400 mb-8">
                I am currently open to research opportunities, internships, and collaborative projects in the field of Geoinformatics.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-teal-600 text-white font-semibold uppercase tracking-wider text-sm px-8 py-4 hover:bg-teal-500 transition-colors w-full sm:w-auto"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
