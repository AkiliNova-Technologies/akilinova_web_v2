"use client";

import { useState } from "react";
import {
  Code2,
  Smartphone,
  Cloud,
  Brain,
  Database,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  GitBranch,
  Zap,
  Layers,
} from "lucide-react";

interface ServicesSectionProps {
  serviceCount?: number;
  showDevelopmentProcess?: boolean;
  compactMode?: boolean; // New prop for simplified view
}

const serviceIcons = [
  Code2, // Custom Web Development
  Smartphone, // Mobile App Development
  Cloud, // Cloud Solutions & DevOps
  Brain, // AI & Machine Learning
  Database, // Data Engineering & Analytics
  Shield, // Cybersecurity & Compliance
];

export default function ServicesSection({
  serviceCount,
  showDevelopmentProcess = true,
  compactMode = false, // Default to full view
}: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      icon: Code2,
      title: "Custom Web Development",
      shortTitle: "Web Dev",
      description:
        "Scalable web applications built with modern frameworks tailored for African markets",
      shortDescription: "Modern web apps for African markets",
      features: [
        "React, Next.js, Vue.js development",
        "Node.js, Python, .NET backends",
        "Progressive Web Apps (PWA)",
        "African language support & localization",
      ],
      keyFeatures: ["Modern frameworks", "Scalable backends", "PWA support"],
      technologies: ["React", "Node.js", "TypeScript", "Next.js"],
      color: "from-blue-500 to-cyan-500",
      stats: "100+ projects delivered",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      shortTitle: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications optimized for African connectivity",
      shortDescription: "Native & cross-platform mobile apps",
      features: [
        "iOS and Android development",
        "React Native cross-platform",
        "App Store optimization",
        "Offline-first capabilities",
      ],
      keyFeatures: ["iOS/Android", "React Native", "Offline support"],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      color: "from-purple-500 to-pink-500",
      stats: "50M+ app downloads",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions & DevOps",
      shortTitle: "Cloud & DevOps",
      description:
        "Scalable cloud infrastructure and deployment for African enterprises",
      shortDescription: "Cloud infrastructure & deployment",
      features: [
        "AWS, Azure, Google Cloud",
        "Container orchestration",
        "CI/CD implementation",
        "Multi-region deployment",
      ],
      keyFeatures: ["Multi-cloud", "Containers", "CI/CD"],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
      color: "from-orange-500 to-red-500",
      stats: "99.9% uptime SLA",
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      shortTitle: "AI & ML",
      description:
        "Intelligent automation and data-driven insights for African businesses",
      shortDescription: "AI automation & data insights",
      features: [
        "ML model development",
        "Natural Language Processing",
        "Predictive analytics",
        "AI-powered automation",
      ],
      keyFeatures: ["ML models", "NLP", "Predictive analytics"],
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI"],
      color: "from-green-500 to-emerald-500",
      stats: "40% efficiency increase",
    },
    {
      icon: Database,
      title: "Data Engineering & Analytics",
      shortTitle: "Data & Analytics",
      description:
        "Data pipelines and business intelligence for informed decisions",
      shortDescription: "Data pipelines & BI solutions",
      features: [
        "Data warehouse design",
        "ETL pipeline development",
        "BI dashboards",
        "Real-time analytics",
      ],
      keyFeatures: ["Data pipelines", "BI dashboards", "Real-time analytics"],
      technologies: ["Python", "Spark", "PostgreSQL", "MongoDB"],
      color: "from-indigo-500 to-blue-500",
      stats: "10M+ data points processed",
    },
    {
      icon: Shield,
      title: "Cybersecurity & Compliance",
      shortTitle: "Security",
      description:
        "Comprehensive security solutions and audits for African regulations",
      shortDescription: "Security solutions & compliance",
      features: [
        "Security assessments",
        "Penetration testing",
        "GDPR, HIPAA compliance",
        "Local regulatory compliance",
      ],
      keyFeatures: ["Security audits", "Penetration testing", "Compliance"],
      technologies: ["OWASP", "ISO 27001", "SOC 2", "PCI DSS"],
      color: "from-red-500 to-orange-500",
      stats: "Zero data breaches",
    },
  ];

  const displayedServices = serviceCount
    ? services.slice(0, serviceCount)
    : services;

  const getGridClass = () => {
    if (compactMode) {
      if (serviceCount === 1) return "grid-cols-1 max-w-xl mx-auto";
      if (serviceCount === 2)
        return "grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto";
      if (serviceCount === 3) return "grid-cols-1 lg:grid-cols-3";
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }

    if (serviceCount === 1) return "grid-cols-1 max-w-2xl mx-auto";
    if (serviceCount === 2)
      return "grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto";
    if (serviceCount === 3) return "grid-cols-1 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section
      className={`relative ${
        compactMode ? "py-12 lg:py-16" : "py-20 lg:py-16"
      } bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden`}
    >
      {/* Background Elements - Simplified in compact mode */}
      {!compactMode && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-4 lg:mb-6">
          {!compactMode && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Our Expertise
              </span>
            </div>
          )}

          <h2
            className={`${
              compactMode
                ? "text-2xl md:text-3xl"
                : "text-4xl md:text-5xl lg:text-6xl"
            } font-bold text-gray-900 mb-4`}
          >
             Building the Future of 
            {" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  African Tech
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 to-transparent rounded-full" />
              </span>
            
          </h2>

          
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions tailored for African
              businesses, combining global standards with local context and
              expertise.
            </p>
          
        </div>

        {/* Services Grid */}
        <div
          className={`grid ${getGridClass()} gap-4 lg:gap-6 ${
            compactMode ? "mb-8" : "mb-20"
          }`}
        >
          {displayedServices.map((service, index) => {
            const IconComponent = service.icon;

            if (compactMode) {
              // Compact Card View
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    setActiveService(activeService === index ? null : index)
                  }
                >
                  <div className="flex flex-col items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-3 flex-shrink-0`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">
                        {service.shortTitle || service.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {service.shortDescription || service.description}
                      </p>


                      {/* Features List */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-orange-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-start text-gray-600"
                            >
                              <span className="text-orange-500 mr-2 mt-1 font-bold">
                                •
                              </span>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Full Card View
            return (
              <div
                key={index}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                className={`relative group cursor-pointer ${
                  activeService === index ? "z-10" : ""
                }`}
              >
                {/* Card */}
                <div
                  className={`relative bg-white rounded-2xl p-6 lg:p-8 h-full border transition-all duration-300 ${
                    activeService === index
                      ? "border-gray-300 shadow-xl shadow-orange-500/5 transform -translate-y-1"
                      : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
                  }`}
                >
                  {/* Icon with gradient */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6`}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                    <IconComponent className="w-8 h-8 text-white relative z-10" />
                  </div>

                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-4">
                    <Zap className="w-3 h-3 text-orange-500" />
                    {service.stats}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-orange-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start text-gray-600"
                        >
                          <span className="text-orange-500 mr-2 mt-1 font-bold">
                            •
                          </span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-orange-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                            activeService === index
                              ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 text-orange-700"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all duration-300">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
