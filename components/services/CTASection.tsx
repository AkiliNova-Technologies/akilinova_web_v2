"use client";

import { ArrowRight, Calendar, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";

interface ServicesCTASectionProps {
  title?: string;
  description?: string;
}

export default function ServicesCTASection({
  title = "Ready to Transform Your Business?",
  description = "Let's discuss how our technology solutions can drive your growth and digital transformation."
}: ServicesCTASectionProps) {
  const [isHovered, setIsHovered] = useState<"project" | "consultation" | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-3xl p-8 lg:p-12 border border-orange-200 shadow-xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Get Started
              </span>
            </div>

            {/* Content */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {description}
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                "Free initial consultation",
                "Custom solutions tailored to your needs",
                "Fast turnaround time",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Free Consultation</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Prefer to talk?</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a 
                  href="tel:+256789874647" 
                  className="text-gray-900 font-semibold hover:text-orange-600 transition-colors duration-300"
                >
                  📞 +256 789 874 647
                </a>
                <a 
                  href="mailto:info@akilinova.com" 
                  className="text-gray-900 font-semibold hover:text-orange-600 transition-colors duration-300"
                >
                  ✉️ info@akilinova.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}