"use client";

import { Sparkles, ArrowDown, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ContactHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ContactHeroSection({
  title = "Let's Start",
  subtitle = "Get In Touch",
  description = "Ready to transform your business with cutting-edge technology? Reach out to discuss your project and let's build something amazing together."
}: ContactHeroProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Orange gradient blob */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
        
        {/* Blue gradient blob */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge - Matches Projects styling */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6 animate-fade-in"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}>
            <MessageCircle className="w-4 h-4 text-orange-500" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </div>

        {/* Main Heading - Matches Projects styling */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6 leading-tight">
          {title}
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-2 animate-scale-in">
            Your Project
          </span>
        </h1>

        {/* Description - Matches Projects styling */}
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 animate-slide-up delay-100">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-slide-up delay-200">
          <button
            className="group px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
          <button
            className="px-8 py-3 rounded-full bg-white/10 text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => window.location.href = 'tel:+254789874647'}
          >
            Call Now
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

      {/* Stats Section - Optional, similar to Projects */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 animate-slide-up delay-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-gray-300 text-sm mt-2">Support Available</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              2h
            </div>
            <div className="text-gray-300 text-sm mt-2">Response Time</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-gray-300 text-sm mt-2">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              50+
            </div>
            <div className="text-gray-300 text-sm mt-2">Projects Delivered</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        /* Delayed animations */
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
}