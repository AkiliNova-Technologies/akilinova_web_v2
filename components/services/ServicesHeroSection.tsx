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
      className="relative py-20 sm:py-20 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden"
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
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
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

        {/* Mobile Service Highlights - Hidden on desktop */}
        <div className="lg:hidden mb-6">
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <div className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Zap className="h-4 w-4 text-orange-400 flex-shrink-0" />
              <span className="text-xs text-white">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Shield className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <span className="text-xs text-white">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Globe className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-xs text-white">African Focus</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Target className="h-4 w-4 text-purple-400 flex-shrink-0" />
              <span className="text-xs text-white">Custom Solutions</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Responsive sizing */}
        {/* <div className="flex flex-row xs:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12">
          <button
            onMouseEnter={() => !isMobile && setIsHovered("project")}
            onMouseLeave={() => !isMobile && setIsHovered(null)}
            onTouchStart={() => setIsHovered("project")}
            onTouchEnd={() => setIsHovered(null)}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full xs:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-200 active:scale-95"
          >
            <span className="text-sm sm:text-base">Start Your Project</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform duration-300" />
            
            
            <div className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-xl opacity-0 active:opacity-100 transition-opacity duration-150 sm:hidden" />
          </button>

          <button
            onMouseEnter={() => !isMobile && setIsHovered("consultation")}
            onMouseLeave={() => !isMobile && setIsHovered(null)}
            onTouchStart={() => setIsHovered("consultation")}
            onTouchEnd={() => setIsHovered(null)}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full xs:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg sm:rounded-xl hover:border-orange-500/50 hover:bg-white/10 transition-all duration-200 active:scale-95"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <span className="text-sm sm:text-base">Free Consultation</span>
            
            
            <div className="absolute inset-0 bg-white/5 rounded-lg sm:rounded-xl opacity-0 active:opacity-100 transition-opacity duration-150 sm:hidden" />
          </button>
        </div> */}

        {/* Desktop Service Highlights - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Zap className="h-4 w-4 text-orange-400" />
            <span>Fast Delivery</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Shield className="h-4 w-4 text-blue-400" />
            <span>Quality Guaranteed</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Globe className="h-4 w-4 text-green-400" />
            <span>African Focus</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Target className="h-4 w-4 text-purple-400" />
            <span>Custom Solutions</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Optimized for mobile */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <div className={`animate-bounce transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-2.5 sm:h-3 bg-[#FF6B00] rounded-full mt-1.5 sm:mt-2 animate-pulse" />
            </div>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}