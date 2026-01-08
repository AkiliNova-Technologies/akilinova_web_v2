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
    <section className="relative py-12 sm:py-16 lg:py-20 xl:py-28 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
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
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-orange-500" />
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Ready to Transform?
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
              className={`group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-12 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform w-full sm:w-auto ${
                activeButton === "project" ? "scale-105" : ""
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
                activeButton === "consultation" ? "scale-105" : ""
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

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            {[
              {
                icon: <CheckCircle className="w-5 h-5" />,
                text: "No upfront costs",
                color: "text-green-400",
                bgColor: "bg-green-400/10",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                text: "Fast delivery",
                color: "text-blue-400",
                bgColor: "bg-blue-400/10",
              },
              {
                icon: <Shield className="w-5 h-5" />,
                text: "Quality guaranteed",
                color: "text-purple-400",
                bgColor: "bg-purple-400/10",
              },
              {
                icon: <Globe className="w-5 h-5" />,
                text: "Pan-African support",
                color: "text-orange-400",
                bgColor: "bg-orange-400/10",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl ${item.bgColor} backdrop-blur-sm border border-white/10`}
              >
                <div className={item.color}>{item.icon}</div>
                <span className="text-sm text-gray-300 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center px-2 sm:px-0">
            <div className="flex items-center justify-center max-w-lg gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-full sm:rounded-full border border-white/10">
              {[
                { value: "48h", label: "Response Time" },
                { value: "15+", label: "Countries" },
                { value: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                  {index < 2 && (
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Corner Badges */}
      <div className="hidden lg:block">
        <div className="absolute top-6 sm:top-8 lg:top-10 left-6 sm:left-8 lg:left-10">
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm animate-float delay-0">
            <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-orange-400" />
            Fast Delivery
          </div>
        </div>
        <div className="absolute top-6 sm:top-8 lg:top-10 right-6 sm:right-8 lg:right-10">
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm animate-float delay-500">
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400" />
            Innovative Solutions
          </div>
        </div>
        <div className="absolute bottom-12 sm:bottom-16 lg:bottom-20 left-6 sm:left-8 lg:left-10">
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm animate-float delay-1000">
            <Globe className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-400" />
            African Focus
          </div>
        </div>
        <div className="absolute bottom-12 sm:bottom-16 lg:bottom-20 right-6 sm:right-8 lg:right-10">
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm animate-float delay-1500">
            <Shield className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-400" />
            5-Star Rated
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