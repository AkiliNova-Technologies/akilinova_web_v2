"use client";

import { useState } from "react";

interface ProjectCategory {
  id: string;
  label: string;
  icon?: string;
}

interface ProjectsFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: ProjectCategory[];
  showCount?: boolean;
  projectCounts?: { [key: string]: number };
}

export default function ProjectsFilterSection({
  activeCategory,
  onCategoryChange,
  categories = [
    { id: "all", label: "All Projects", icon: "🌟" },
    { id: "web", label: "Websites", icon: "🌐" },
    { id: "web-app", label: "Web Apps", icon: "💻" },
    { id: "mobile", label: "Mobile Apps", icon: "📱" },
    { id: "ecommerce", label: "E-Commerce", icon: "🛒" },
    { id: "dashboard", label: "Dashboards", icon: "📊" },
    { id: "ai-ml", label: "AI/ML", icon: "🤖" },
  ],
  showCount = true,
  projectCounts = {
    "all": 0,
    "web": 0,
    "web-app": 0,
    "mobile": 0,
    "ecommerce": 0,
    "dashboard": 0,
    "ai-ml": 0
  }
}: ProjectsFilterProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="mb-12 lg:mb-16">

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`group relative px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white! shadow-xs scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-orange-300"
            }`}
          >
            {/* Content */}
            <div className="flex items-center gap-2">
              <span>{category.label}</span>
              {showCount && projectCounts[category.id] > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === category.id
                    ? "bg-white/20"
                    : "bg-gray-100"
                }`}>
                  {projectCounts[category.id]}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}