"use client";

import { Sparkles, ArrowDown } from "lucide-react";
import { useState } from "react";

interface BlogsHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function BlogsHeroSection({
  title = "AkiliNova Technologies",
  subtitle = "Latest Insights",
  description = "Discover the latest insights, tutorials, and industry trends in web development, AI, and digital innovation from our team of experts."
}: BlogsHeroProps) {
  const [isHovered, setIsHovered] = useState(false);

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
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
          <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-2">
            Blog
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {description}
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              100+
            </div>
            <div className="text-gray-400 text-xs mt-1">Articles Published</div>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-gray-400 text-xs mt-1">Monthly Readers</div>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              15+
            </div>
            <div className="text-gray-400 text-xs mt-1">Expert Authors</div>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              8+
            </div>
            <div className="text-gray-400 text-xs mt-1">Categories</div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="group px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            onClick={() => document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Articles
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
          <button
            className="px-8 py-3 rounded-full bg-white/10 text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => window.open('/blog/categories', '_self')}
          >
            Browse Categories
          </button>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#FF6B00] rounded-full mt-2" style={{ animation: 'pulse 2s infinite' }} />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
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