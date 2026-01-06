"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ChevronRight, Star, Zap } from "lucide-react";

export default function PartnersSection() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  const partners = [
    { 
      name: "Safaricom", 
      logo: "/logos/safaricom.svg",
      description: "Digital Solutions Provider",
      since: "2019"
    },
    { 
      name: "MTN Group", 
      logo: "/logos/mtn.svg",
      description: "Telecommunications Partner",
      since: "2020"
    },
    { 
      name: "IBM", 
      logo: "/logos/ibm.svg",
      description: "Enterprise Solutions",
      since: "2018"
    },
    { 
      name: "Andela", 
      logo: "/logos/andela.svg",
      description: "Talent Development",
      since: "2021"
    },
    { 
      name: "Flutterwave", 
      logo: "/logos/flutterwave.svg",
      description: "Payment Solutions",
      since: "2022"
    },
    { 
      name: "Chipper Cash", 
      logo: "/logos/chipper.svg",
      description: "Fintech Innovation",
      since: "2021"
    },
  ];

  const stats = [
    { value: "50+", label: "Successful Partnerships" },
    { value: "15", label: "African Countries" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Coverage" },
  ];

  // Auto-rotate highlighted partners
  useEffect(() => {
    if (partners.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * partners.length);
      setHoveredPartner(partners[randomIndex].name);
      
      setTimeout(() => {
        setHoveredPartner(null);
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 overflow-hidden">
      {/* Gradient Orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Strategic Partnerships
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6">
            Trusted by{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Industry Leaders
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 to-transparent rounded-full" />
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We collaborate with visionary companies across Africa and globally to
            drive digital transformation and innovation.
          </p>
        </div>

        {/* Stats */}
        <div
          
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="relative">
          {/* Glow effect behind grid */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5 rounded-3xl blur-3xl" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 relative">
            {partners.map((partner, index) => (
              <div
               
                className={`relative group cursor-pointer ${
                  hoveredPartner === partner.name ? "z-10" : ""
                }`}
              >
                {/* Card */}
                <div className={`relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-xl p-4 h-full border transition-all duration-300 ${
                  hoveredPartner === partner.name
                    ? "border-orange-500/50 shadow-2xl shadow-orange-500/10 scale-105"
                    : "border-gray-800 hover:border-orange-500/30"
                }`}>
                  {/* Partner Logo/Name */}
                  <div className="flex flex-col items-center justify-center h-24">
                    <div className={`text-xl font-bold text-center transition-all duration-300 ${
                      hoveredPartner === partner.name
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}>
                      {partner.name}
                    </div>
                    
                    {/* Since Badge */}
                    <div className="mt-3 px-2 py-1 bg-gray-800/50 rounded-full">
                      <span className="text-xs text-gray-400">Since {partner.since}</span>
                    </div>
                  </div>

                  
                </div>

                {/* Connection Dots */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                  <div className="w-1 h-1 bg-gray-700 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}