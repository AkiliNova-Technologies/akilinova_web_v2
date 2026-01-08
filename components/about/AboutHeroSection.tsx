"use client";

import { Sparkles, ArrowDown, Globe, Target, Users, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AboutHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function AboutHeroSection({
  title = "Pioneering African Innovation",
  subtitle = "Our Story",
  description = "We're building the future of technology in Africa, one innovative solution at a time. Our journey began with a simple vision: to transform digital landscapes across the continent.",
}: AboutHeroProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative py-20 sm:py-20 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 overflow-hidden"
    >
      {/* Gradient Orbs - Optimized for mobile */}
      <div className="absolute -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-500/15 to-transparent rounded-full blur-xl sm:blur-2xl lg:blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/8 rounded-full blur-xl sm:blur-2xl lg:blur-3xl" />

      {/* Grid Pattern - Reduced opacity on mobile */}
      <div
        className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-3 sm:mb-4 md:mb-6 leading-tight">
          {title}
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-1 sm:mt-2">
            African Innovation
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
          {description}
        </p>


      </div>

      {/* Scroll Indicator - Optimized for mobile */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <div className={`animate-bounce transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-2.5 sm:h-3 bg-[#FF6B00] rounded-full mt-1.5 sm:mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}