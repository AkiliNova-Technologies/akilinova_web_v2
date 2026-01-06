"use client";

import { ExternalLink, Eye, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

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

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: (project: Project) => void;
}

export default function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  const router = useRouter(); // Initialize router
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return {
          bg: "bg-green-500/10",
          text: "text-green-600",
          border: "border-green-500/20",
          label: "Completed",
        };
      case "in-progress":
      case "in progress":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-600",
          border: "border-blue-500/20",
          label: "In Progress",
        };
      case "upcoming":
        return {
          bg: "bg-orange-500/10",
          text: "text-orange-600",
          border: "border-orange-500/20",
          label: "Upcoming",
        };
      default:
        return {
          bg: "bg-gray-500/10",
          text: "text-gray-600",
          border: "border-gray-500/20",
          label: project.status,
        };
    }
  };

  const status = getStatusColor(project.status);
  const animationDelay = index * 100;

  // Handle card click to navigate to details page
  const handleCardClick = () => {
    if (onClick) {
      onClick(project); // Call custom onClick if provided
    } else {
      // Default navigation to project details page
      router.push(`/projects/${project.id}`);
    }
  };

  // Handle View Details button click
  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    if (onClick) {
      onClick(project);
    } else {
      router.push(`/projects/${project.id}`);
    }
  };

  // Handle Live Demo click
  const handleLiveDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    // Live demo link will open in new tab, so don't navigate
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick} // Use the new handler
      className={`
        bg-white rounded-2xl border border-gray-200 
        transition-all duration-300 group overflow-hidden flex flex-col h-full
        shadow-sm hover:shadow-md hover:border-[#FF6B00]/50
        animate-slide-up cursor-pointer
        ${isHovered ? "scale-[1] border-[#FF6B00]/30" : ""}
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {project.image && !imageError ? (
          <img
            src={project.image}
            alt={project.title}
            className={`
              w-full h-full object-cover group-hover:scale-110 transition-transform duration-500
              ${isHovered ? "scale-110" : "scale-100"}
            `}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 
            flex items-center justify-center text-gray-700 text-4xl font-bold`}
          >
            {project.title
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>
        )}

        {/* Status Badge */}
        <div 
          className="absolute top-4 right-4 animate-fade-in"
          style={{ animationDelay: `${animationDelay + 200}ms` }}
        >
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text} ${status.border}`}>
            {status.label}
          </span>
        </div>

        {/* Category Badge */}
        <div 
          className="absolute top-4 left-4 animate-fade-in"
          style={{ animationDelay: `${animationDelay + 300}ms` }}
        >
          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 border border-gray-200">
            {project.category.replace("-", " ").toUpperCase()}
          </div>
        </div>

        {/* Overlay Gradient */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent 
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `} />
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col grow">
        <h3 className={`
          text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300
          ${isHovered ? "text-[#FF8A33]" : ""}
        `}>
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 grow">
          {project.description}
        </p>

        {/* Meta Info */}
        {(project.duration || project.location) && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.duration && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{project.duration}</span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{project.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 2).map((tech, techIndex) => (
              <span
                key={techIndex}
                className={`
                  px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-700 border border-gray-200 
                  transition-all duration-300
                  animate-slide-up
                  ${isHovered ? "scale-105 bg-[#FF6B00]/10 border-[#FF6B00]/30" : ""}
                `}
                style={{ animationDelay: `${animationDelay + 400 + techIndex * 50}ms` }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 2 && (
              <span
                className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-500 border border-gray-200 animate-slide-up"
                style={{ animationDelay: `${animationDelay + 500}ms` }}
              >
                +{project.technologies.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <div className="flex-1 transition-transform duration-300 hover:scale-105 active:scale-95">
            <button
              onClick={handleViewDetailsClick} // Updated handler
              className={`
                w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold text-sm 
                transition-all duration-300 flex items-center justify-center gap-2 
                border border-gray-300 hover:bg-gray-50 hover:border-gray-400
              `}
            >
              <Eye className="h-4 w-4" />
              View Details
            </button>
          </div>
          
          {project.liveUrl && (
            <div className="flex-1 transition-transform duration-300 hover:scale-105 active:scale-95">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveDemoClick} // Updated handler
                className={`
                  w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white! py-2 px-4 rounded-lg 
                  font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 
                  hover:shadow-lg hover:shadow-orange-500/25
                `}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </div>
          )}
        </div>
      </div>

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
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}