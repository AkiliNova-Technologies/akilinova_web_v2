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
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovation",
      description:
        "We constantly push boundaries and embrace new technologies to create groundbreaking solutions.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and building strong partnerships with our clients.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description:
        "We strive for perfection in every project, delivering quality that exceeds expectations.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Impact",
      description:
        "We measure success by the positive change we create in businesses and communities.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and ethical practices in everything we do.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description:
        "We're driven by a deep passion for technology and its potential to transform Africa.",
      color: "from-red-500 to-orange-500",
    },
  ],
}: CoreValuesProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4">
            <Award className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{value.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
