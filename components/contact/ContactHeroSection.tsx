"use client";

import {
  Sparkles,
  ArrowDown,
  MessageCircle,
  Phone,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ContactHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ContactHeroSection({
  title = "Let's Start",
  subtitle = "Get In Touch",
  description = "Ready to transform your business with cutting-edge technology? Reach out to discuss your project and let's build something amazing together.",
}: ContactHeroProps) {
  const [isHovered, setIsHovered] = useState(false);
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
        <div
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4 sm:mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`transition-transform duration-200 hidden sm:block ${
              isHovered ? "rotate-12" : ""
            }`}
          >
          </div>
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-3 sm:mb-4 md:mb-6 leading-tight">
          {title}
          <span
            className={`block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-1 sm:mt-2 transition-all duration-500 ${
              isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            Your Project
          </span>
        </h1>

        {/* Description */}
        <p
          className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0 transition-all duration-500 delay-100 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {description}
        </p>

        {/* CTA Buttons - Responsive sizing */}
        {/* <div
          className={`flex flex-col lg:flex-row xs:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8 transition-all duration-500 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            className="group relative inline-flex items-center justify-center gap-2 w-xs xs:w-auto sm: px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 active:scale-95"
            onClick={() => {
              const contactForm = document.getElementById("contact-form");
              if (contactForm) {
                contactForm.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>Start Your Project</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform duration-300" />

            
            <div className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-full opacity-0 active:opacity-100 transition-opacity duration-150 sm:hidden" />
          </button>

          <button
            className="relative inline-flex items-center justify-center gap-2 w-full xs:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-full bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/20 hover:bg-white/15 transition-all duration-200 active:scale-95"
            onClick={() => (window.location.href = "tel:+254789874647")}
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Call Now</span>

            
            <div className="absolute inset-0 bg-white/5 rounded-lg sm:rounded-full opacity-0 active:opacity-100 transition-opacity duration-150 sm:hidden" />
          </button>
        </div> */}
      </div>


    </section>
  );
}
