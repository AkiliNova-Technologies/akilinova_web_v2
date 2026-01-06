"use client";

import { Sparkles, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProjectsHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ProjectsHeroSection({
  title = "Featured Projects",
  subtitle = "Our Portfolio",
  description = "Explore our portfolio of innovative solutions that have helped businesses across Africa achieve digital transformation and drive growth.",
}: ProjectsHeroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
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
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6 leading-tight">
          {title}
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-2">
            Transforming Africa
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {description}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#FF6B00] rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
