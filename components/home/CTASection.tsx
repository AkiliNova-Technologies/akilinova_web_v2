"use client";

import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Zap,
  CheckCircle,
  Globe,
  Shield,
} from "lucide-react";

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeButton, setActiveButton] = useState<
    "project" | "consultation" | null
  >(null);

  const handleMouseEnter = (button: "project" | "consultation") => {
    setIsHovered(true);
    setActiveButton(button);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveButton(null);
  };

  const handleClick = (action: "project" | "consultation") => {
    if (action === "project") {
      window.location.href = "/contact?type=project";
    } else {
      window.location.href = "/contact?type=consultation";
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-16 xl:py-18 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Ready to Transform
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight">
            Let's Build{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Africa's Digital Future
              </span>
            </span>{" "}
            Together
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
            Partner with us to create innovative technology solutions tailored
            for African markets. From initial concept to scalable deployment,
            we're here to turn your vision into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-2 sm:px-0">
            <button
              onClick={() => handleClick("project")}
              onMouseEnter={() => handleMouseEnter("project")}
              onMouseLeave={handleMouseLeave}
              className={`group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white transition-all duration-300 focus:outline-none focus:ring-0 focus:ring-orange-500/30 overflow-hidden ${
                activeButton === "project" ? "scale-101" : ""
              }`}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <span className="relative text-white">Start Your Project</span>
              <ArrowRight className="relative w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            <button
              onClick={() => handleClick("consultation")}
              onMouseEnter={() => handleMouseEnter("consultation")}
              onMouseLeave={handleMouseLeave}
              className={`group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-12 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg border-2 transition-all duration-300 transform w-full sm:w-auto ${
                activeButton === "consultation" ? "scale-101" : ""
              } ${
                isHovered && activeButton !== "consultation"
                  ? "border-white/10 bg-white/5"
                  : "border-white/30 hover:border-orange-500/50 hover:bg-white/5"
              }`}
            >
              {/* Icon */}
              <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500 group-hover:scale-110 transition-transform duration-300" />

              {/* Text */}
              <span className="text-white">Book Free Consultation</span>

              {/* Indicator Dot */}
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse" />
            </button>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float.delay-500 {
          animation-delay: 0.5s;
        }
        .animate-float.delay-1000 {
          animation-delay: 1s;
        }
        .animate-float.delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
}