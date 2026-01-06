"use client";

import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  status: string;
  technologies: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  client?: string;
  location?: string;
  duration?: string;
  teamSize?: string;
}

interface ProjectsGridProps {
  projects: Project[];
  activeCategory: string;
  onProjectClick?: (project: Project) => void;
}

export default function ProjectsGrid({ 
  projects, 
  activeCategory, 
  onProjectClick 
}: ProjectsGridProps) {
  return (
    <div 
      key={activeCategory}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in"
    >
      {projects.map((project, index) => (
        <div 
          key={project.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ProjectCard 
            project={project} 
            index={index} 
            onClick={onProjectClick}
          />
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}