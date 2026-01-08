"use client";

import { ExternalLink, Eye, Calendar, MapPin, Code, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  viewCount?: number;
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
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < 640);

    // Optional: Add resize listener for responsive behavior
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return {
          bg: "bg-green-500/10",
          text: "text-green-600",
          border: "border-green-500/20",
          label: "Completed",
          shortLabel: "Done",
        };
      case "in-progress":
      case "in progress":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-600",
          border: "border-blue-500/20",
          label: "In Progress",
          shortLabel: "Active",
        };
      case "upcoming":
        return {
          bg: "bg-orange-500/10",
          text: "text-orange-600",
          border: "border-orange-500/20",
          label: "Upcoming",
          shortLabel: "Soon",
        };
      default:
        return {
          bg: "bg-gray-500/10",
          text: "text-gray-600",
          border: "border-gray-500/20",
          label: project.status,
          shortLabel: project.status.slice(0, 4),
        };
    }
  };

  const status = getStatusColor(project.status);
  const animationDelay = index * 100;

  // Handle card click to navigate to details page
  const handleCardClick = () => {
    if (onClick) {
      onClick(project);
    } else {
      router.push(`/projects/${project.id}`);
    }
  };

  // Handle View Details button click
  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(project);
    } else {
      router.push(`/projects/${project.id}`);
    }
  };

  // Handle Live Demo click
  const handleLiveDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Touch handlers for mobile
  const handleTouchStart = () => {
    setIsTouched(true);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
    setTimeout(() => setIsHovered(false), 300);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleCardClick}
      className={`
        bg-white rounded-xl sm:rounded-2xl border border-gray-200 
        transition-all duration-200 group overflow-hidden flex flex-col h-full
        shadow-sm hover:shadow-md sm:hover:shadow-lg hover:border-[#FF6B00]/30
        cursor-pointer active:scale-[0.995] sm:active:scale-100
        ${isHovered ? "border-[#FF6B00]/30 shadow-md sm:shadow-lg" : ""}
        ${isTouched ? "bg-gray-50" : ""}
      `}
    >
      {/* Project Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
        {project.image && !imageError ? (
          <img
            src={project.image}
            alt={project.title}
            className={`
              w-full h-full object-cover transition-transform duration-300
              ${isHovered ? "sm:scale-110" : "scale-100"}
            `}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 
            flex items-center justify-center text-gray-700 text-2xl sm:text-4xl font-bold`}
          >
            {project.title
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 3)}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <span
            className={`
            px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold 
            ${status.bg} ${status.text} ${status.border}
            hidden sm:inline
          `}
          >
            {status.label}
          </span>
          <span
            className={`
            px-2 py-1 rounded-full text-xs font-semibold 
            ${status.bg} ${status.text} ${status.border}
            sm:hidden
          `}
          >
            {status.shortLabel}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 border border-gray-200 backdrop-blur-sm">
            {project.category.replace("-", " ").slice(0, 10).toUpperCase()}
            {project.category.length > 10 ? "..." : ""}
          </div>
        </div>

        {/* Overlay Gradient - Hidden on mobile, shown on hover for desktop */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
          transition-opacity duration-300
          ${isHovered ? "sm:opacity-100" : "opacity-0"}
          hidden sm:block
        `}
        />
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col grow">
        {/* Title */}
        <h3
          className={`
          text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 
          transition-colors duration-200 line-clamp-2
          ${isHovered ? "text-[#FF8A33]" : ""}
        `}
        >
          {project.title}
        </h3>

        {/* Description - Hidden on mobile, shown on tablet+ */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 grow hidden sm:block line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>

        {/* Meta Info - Simplified on mobile */}
        {(project.duration || project.location || project.teamSize) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
            {project.duration && (
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="truncate">{project.duration}</span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="truncate hidden xs:inline">
                  {project.location}
                </span>
                <span className="truncate xs:hidden">
                  {project.location.split(",")[0]}
                </span>
              </div>
            )}
            {project.teamSize && (
              <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                {/* <Users className="min-w-3 h-3 sm:w-3.5 sm:h-3.5" /> */}
                <span className="truncate">{project.teamSize}</span>
              </div>
            )}
          </div>
        )}

        {/* Technologies - Simplified on mobile */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {project.technologies
                .slice(0, isMobile ? 1 : 2)
                .map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`
                    px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-50 rounded-full text-xs text-gray-700 
                    border border-gray-200 transition-all duration-200 flex-shrink-0
                    ${
                      isHovered
                        ? "sm:scale-105 bg-[#FF6B00]/10 border-[#FF6B00]/30"
                        : ""
                    }
                  `}
                  >
                    {tech.length > 12 ? tech.slice(0, 10) + "..." : tech}
                  </span>
                ))}
              {project.technologies.length > 1 && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-50 rounded-full text-xs text-gray-500 border border-gray-200">
                  +{project.technologies.length - 1}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons - Stack on mobile, side-by-side on tablet+ */}
        <div className="flex flex-row xs:flex-row gap-2 sm:gap-3 mt-auto">
          <button
            onClick={handleViewDetailsClick}
            className={`
              flex-1 bg-white text-gray-900 py-2 px-3 sm:py-2 sm:px-4 rounded-lg font-semibold 
              text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 
              border border-gray-300 hover:bg-gray-50 hover:border-gray-400
              active:bg-gray-100 active:scale-95
              ${isTouched ? "bg-gray-50" : ""}
            `}
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>View Details</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveDemoClick}
              className={`
                flex-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white py-2 px-3 sm:py-2 sm:px-4 rounded-lg 
                font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 
                hover:shadow-md sm:hover:shadow-lg hover:shadow-orange-500/25
                active:scale-95 active:shadow-inner
              `}
            >
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {/* Mobile-only quick stats */}
        <div className="sm:hidden flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          {project.client && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="font-medium">Client:</span>
              <span className="truncate max-w-[100px]">{project.client}</span>
            </div>
          )}
          {project.viewCount && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 ml-auto">
              <Eye className="h-3 w-3" />
              <span>{project.viewCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Touch feedback overlay for mobile */}
      <div
        className={`
        absolute inset-0 bg-black/5 rounded-xl sm:rounded-2xl pointer-events-none
        transition-opacity duration-150
        ${isTouched ? "opacity-100" : "opacity-0"}
        sm:hidden
      `}
      />

      {/* CSS Animations - Simplified for mobile */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 640px) {
          .animate-slide-up {
            animation: slide-up 0.3s ease-out forwards;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
