"use client";

import { ArrowRight, Sparkles, Calendar, Zap, Shield, Globe, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ServicesHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ServicesHeroSection({
  title = "Comprehensive Tech Solutions",
  subtitle = "Our Services",
  description = "End-to-end technology services designed to drive growth, enhance efficiency, and create sustainable digital transformation for African businesses.",
}: ServicesHeroProps) {
  const [isHovered, setIsHovered] = useState<"project" | "consultation" | null>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" } // Reduced margin for mobile
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-20 sm:py-20 md:py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden"
    >
      {/* Background Elements - Optimized for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-500/15 to-transparent rounded-full blur-xl sm:blur-2xl lg:blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/8 rounded-full blur-xl sm:blur-2xl lg:blur-3xl" />
        
        {/* Grid Pattern - Reduced opacity on mobile */}
        <div
          className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-3 sm:mb-4 md:mb-6 leading-tight">
          {title}
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-1 sm:mt-2">
            For African Businesses
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
          {description}
        </p>

      </div>
    </section>
  );
}