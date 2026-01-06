"use client";

import { ChevronRight, Grid3x3, LayoutDashboard } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface BlogsFilterSectionProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];
  loading?: boolean;
}

export default function BlogsFilterSection({
  activeCategory,
  onCategoryChange,
  categories,
  loading = false,
}: BlogsFilterSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Show only first 6 categories initially, or all if showAll is true
  const displayedCategories = showAll ? categories : categories.slice(0, 6);
  const hasMoreCategories = categories.length > 6;
  const hiddenCount = categories.length - 6;

  return (
    <div className="w-full">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-[#FF6B00]" />
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        </div>

        {/* View All Link - Only show if there are more categories */}
        {hasMoreCategories && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-sm font-medium text-[#FF6B00] hover:text-[#FF8A33] transition-colors"
          >
            {showAll ? "Show Less" : `View All (${categories.length})`}
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${
                showAll ? "rotate-90" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div
        className="flex flex-1 w-full flex-wrap justify-center gap-3 p-4 mb-8 max-h-[400px] overflow-hidden overflow-y-scroll filter-scrollbar horizontal-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {displayedCategories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            disabled={loading}
            className={`
              px-5 py-2.5 flex flex-1 min-w-full rounded-full font-medium text-sm justify-center transition-all duration-300
              relative overflow-hidden group border whitespace-nowrap
              ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white shadow-xs border-orange-200 "
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-[#FF6B00] shadow-none"
              }
              ${loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            style={{
              animationDelay: `${index * 30}ms`,
              animation: "slide-up 0.3s ease-out forwards",
              opacity: 0,
            }}
          >
            <span className="relative z-10">
              {category.name}
              <span
                className={`ml-2 text-xs ${
                  activeCategory === category.id
                    ? "text-white/90"
                    : "text-gray-500"
                }`}
              >
                ({category.count})
              </span>
            </span>
          </button>
        ))}

        {/* Show More Indicator (when collapsed) */}
        {!showAll && hasMoreCategories && (
          <button
            onClick={() => setShowAll(true)}
            className="px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 whitespace-nowrap"
            style={{
              animationDelay: `${Math.min(6, categories.length) * 30}ms`,
              animation: "slide-up 0.3s ease-out forwards",
              opacity: 0,
            }}
          >
            +{hiddenCount} More
          </button>
        )}
      </div>

      {/* Category Page Link - Fixed at bottom */}
      {/* <div className="text-center pt-4 border-t border-gray-100">
        <button
          onClick={() => window.open('/blog/categories', '_self')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FF6B00]/10 to-[#FF8A33]/10 text-[#FF6B00] font-medium text-sm hover:from-[#FF6B00]/20 hover:to-[#FF8A33]/20 transition-all duration-300 hover:scale-105 border border-[#FF6B00]/20"
        >
          Explore All Categories Page
          <ChevronRight className="w-4 h-4" />
        </button>
      </div> */}
    </div>
  );
}
