"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface ProjectCategory {
  id: string;
  label: string;
  icon?: string;
  shortLabel?: string;
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
    { id: "all", label: "All Projects", shortLabel: "All" },
    { id: "web", label: "Websites", shortLabel: "Websites" },
    { id: "web-app", label: "Web Apps", shortLabel: "Web Apps" },
    { id: "mobile", label: "Mobile Apps", shortLabel: "Mobile Apps" },
    { id: "ecommerce", label: "E-Commerce", shortLabel: "E-Commerce" },
    { id: "dashboard", label: "Dashboards", shortLabel: "Dashboards" },
    { id: "ai-ml", label: "AI/ML", shortLabel: "AI/ML" },
  ],
  showCount = true,
  projectCounts = {
    all: 0,
    web: 0,
    "web-app": 0,
    mobile: 0,
    ecommerce: 0,
    dashboard: 0,
    "ai-ml": 0,
  },
}: ProjectsFilterProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check scroll position
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  // Handle touch events for mobile scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const container = containerRef.current;

    if (container) {
      const startScrollLeft = container.scrollLeft;

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const diffX = touch.clientX - startX;
        container.scrollLeft = startScrollLeft - diffX;
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }
  };

  // Mobile view - Horizontal scrollable
  if (isMobile && !showAllFilters) {
    return (
      <div className="mb-6 sm:mb-12 lg:mb-16">
        <div className="relative h-36">
          {/* Scroll buttons for mobile */}
          <div className="absolute w-full bottom-8">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>

          {/* Filter header for mobile */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                Filter by
              </span>
            </div>
            <button
              onClick={() => setShowAllFilters(true)}
              className="text-xs text-[#FF6B00] font-medium px-2 py-1 hover:bg-[#FF6B00]/5 rounded"
            >
              Show all
            </button>
          </div>

          {/* Horizontal scrollable container */}
          <div
            ref={containerRef}
            className="flex gap-2 overflow-x-auto py-3 px-2 scrollbar-hide"
            onScroll={checkScroll}
            onTouchStart={handleTouchStart}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white shadow-sm scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-sm whitespace-nowrap">
                  {category.shortLabel || category.label}
                </span>
                {showCount && projectCounts[category.id] > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full min-w-5 text-center ${
                      activeCategory === category.id
                        ? "bg-white/20"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {projectCounts[category.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile expanded view or Desktop view
  return (
    <div className="mb-8 sm:mb-12 lg:mb-16">
      {/* Mobile header for expanded view */}
      {isMobile && showAllFilters && (
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              All Filters
            </span>
          </div>
          <button
            onClick={() => setShowAllFilters(false)}
            className="text-xs text-gray-500 font-medium px-2 py-1 hover:bg-gray-100 rounded"
          >
            Collapse
          </button>
        </div>
      )}

      {/* Filter Tabs - Grid layout for mobile expanded, flex for desktop */}
      <div
        className={`${
          isMobile && showAllFilters
            ? "grid grid-cols-2 sm:grid-cols-3 gap-2"
            : "flex flex-wrap justify-center gap-2 sm:gap-3"
        }`}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              onCategoryChange(category.id);
              if (isMobile) setShowAllFilters(false);
            }}
            onMouseEnter={() => !isMobile && setHoveredCategory(category.id)}
            onMouseLeave={() => !isMobile && setHoveredCategory(null)}
            className={`group relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white shadow-sm sm:shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            } ${isMobile && showAllFilters ? "w-full text-center" : ""}`}
          >
            {/* Content */}
            <div
              className={`flex flex-row items-center justify-center gap-1.5 sm:gap-2 ${
                isMobile && showAllFilters ? "flex-col" : ""
              }`}
            >
              <span
                className={`whitespace-nowrap ${
                  isMobile && showAllFilters
                    ? "text-sm font-medium"
                    : "text-sm sm:text-base"
                }`}
              >
                {isMobile && !showAllFilters
                  ? category.shortLabel || category.label
                  : category.label}
              </span>
              {showCount && projectCounts[category.id] > 0 && (
                <span
                  className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                    activeCategory === category.id
                      ? "bg-white/20"
                      : "bg-gray-100 text-gray-600"
                  } ${isMobile && showAllFilters ? "mt-1" : ""}`}
                >
                  {projectCounts[category.id]}
                </span>
              )}
            </div>

            {/* Hover effect for desktop */}
            {!isMobile &&
              hoveredCategory === category.id &&
              activeCategory !== category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/5 to-[#FF8A33]/5 rounded-full" />
              )}
          </button>
        ))}
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
