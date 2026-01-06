"use client";

import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState<"project" | "consultation" | null>(
    null
  );

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
            backgroundSize: "60px 60px",
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
            For African Businesses
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onMouseEnter={() => setIsHovered("project")}
            onMouseLeave={() => setIsHovered(null)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onMouseEnter={() => setIsHovered("consultation")}
            onMouseLeave={() => setIsHovered(null)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5 text-orange-500" />
            <span>Book Free Consultation</span>
          </button>
        </div>
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
