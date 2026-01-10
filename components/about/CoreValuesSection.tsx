"use client";

import { Award, Sparkles, Users, Zap, Heart, Shield } from "lucide-react";

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface CoreValuesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  values?: ValueItem[];
}

export default function CoreValuesSection({
  title = "Our Core Values",
  subtitle = "What Drives Us",
  description = "Our values are the foundation of everything we do, guiding our decisions and shaping our culture.",
  values = [
    {
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Innovation",
      description:
        "We constantly push boundaries and embrace new technologies to create groundbreaking solutions.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and building strong partnerships with our clients.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Excellence",
      description:
        "We strive for perfection in every project, delivering quality that exceeds expectations.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Impact",
      description:
        "We measure success by the positive change we create in businesses and communities.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and ethical practices in everything we do.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Passion",
      description:
        "We're driven by a deep passion for technology and its potential to transform Africa.",
      color: "from-red-500 to-orange-500",
    },
  ],
}: CoreValuesProps) {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-3 md:mb-4">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            {description}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-200 hover:border-orange-300 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${value.color} p-2.5 sm:p-3 md:p-3 mb-4 sm:mb-5 md:mb-6 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
              >
                <div className="text-white flex items-center justify-center">
                  {value.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}