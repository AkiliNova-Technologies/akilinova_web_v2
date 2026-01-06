"use client";

import { Target, Clock, Users, Shield, Award, Zap } from "lucide-react";

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface WhyChooseUsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  benefits?: BenefitItem[];
}

export default function WhyChooseUsSection({
  title = "Built for African Excellence",
  subtitle = "Why Choose Us",
  description = "We combine global technology standards with deep local expertise to deliver solutions that truly understand and serve African business needs.",
  benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "African Market Expertise",
      description: "Deep understanding of local challenges and opportunities across African markets.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Agile development process ensuring timely delivery without compromising quality.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dedicated Teams",
      description: "Expert developers and designers focused exclusively on your project success.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "Rigorous testing and quality assurance processes for reliable solutions.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Award-Winning",
      description: "Recognized for innovation and excellence in technology solutions.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Scalable Solutions",
      description: "Future-proof technology that grows with your business needs.",
      color: "from-yellow-500 to-orange-500"
    }
  ]
}: WhyChooseUsProps) {
  return (
    <section className="py-8 lg:py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4">
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}