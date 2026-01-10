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
        compactMode ? "py-8 md:py-12 lg:py-16" : "py-12 md:py-20 lg:py-28"
      } bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden`}
    >
      {/* Background Elements - Simplified in compact mode */}
      {!compactMode && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-orange-500/10 to-transparent rounded-full blur-2xl md:blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full blur-2xl md:blur-3xl" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          {!compactMode && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
              <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Our Expertise
              </span>
            </div>
          )}

          <h2
            className={`${
              compactMode
                ? "text-3xl sm:text-3xl md:text-3xl lg:text-5xl"
                : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            } font-bold text-gray-900 mb-3 md:mb-4`}
          >
            Building the Future of{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                African Tech
              </span>
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Comprehensive technology solutions tailored for African businesses,
            combining global standards with local context and expertise.
          </p>
        </div>

        {/* Services Grid */}
        <div
          className={`grid ${getGridClass()} gap-3 sm:gap-4 md:gap-5 lg:gap-6 ${
            compactMode ? "mb-6 md:mb-8" : "mb-12 md:mb-20"
          }`}
        >
          {displayedServices.map((service, index) => {
            const IconComponent = service.icon;

            if (compactMode) {
              // Compact Card View
              return (
                <div
                  key={index}
                  className="group bg-white rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    setActiveService(activeService === index ? null : index)
                  }
                >
                  <div className="flex flex-col items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${service.color} p-2.5 sm:p-3 flex-shrink-0`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1.5 sm:mb-2">
                        {service.shortTitle || service.title}
                      </h3>

                      <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                        {service.shortDescription || service.description}
                      </p>

                      {/* Features List */}
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-xs sm:text-sm font-semibold text-orange-600 mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          Key Features
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex flex-row items-center text-gray-600"
                            >
                              <span className="text-orange-500 mr-1.5 sm:mr-2 font-bold text-xs">
                                •
                              </span>
                              <span className="text-xs sm:text-sm">
                                {feature}
                              </span>
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
                  className={`relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-6 lg:p-8 h-full border transition-all duration-300 ${
                    activeService === index
                      ? "border-gray-300 shadow-lg md:shadow-xl shadow-orange-500/5 transform -translate-y-0.5 md:-translate-y-1"
                      : "border-gray-200 hover:border-orange-300 hover:shadow-md md:hover:shadow-lg"
                  }`}
                >
                  {/* Icon with gradient */}
                  <div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} p-3 sm:p-3.5 md:p-4 mb-4 sm:mb-5 md:mb-6`}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-xl md:rounded-2xl" />
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white relative z-10" />
                  </div>

                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    <Zap className="w-3 h-3 text-orange-500" />
                    {service.stats}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-orange-600 mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Key Features
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start text-gray-600"
                        >
                          <span className="text-orange-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 font-bold text-xs">
                            •
                          </span>
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-orange-600 mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
                      <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 ${
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
                  <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-100">
                    <button className="inline-flex items-center gap-1.5 sm:gap-2 text-orange-600 text-sm sm:text-base font-semibold hover:gap-2 sm:hover:gap-3 transition-all duration-300">
                      Learn more
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Development Process Section - Hidden in compact mode */}
        {!compactMode && showDevelopmentProcess && (
          <div className="relative">
            {/* Background for process section */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-2xl md:rounded-3xl" />

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 border border-gray-200 shadow-lg md:shadow-xl">
              <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-3 md:mb-4">
                  <GitBranch className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                  <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                    Our Methodology
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  Our Proven Development Process
                </h3>
                <p className="text-base sm:text-lg md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                  A streamlined methodology ensuring successful project delivery
                  from concept to deployment and beyond.
                </p>
              </div>

              <div className="relative">
                {/* Connection Line - Hidden on mobile, visible on lg+ */}
                <div className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                  {[
                    {
                      step: "01",
                      title: "Discovery & Planning",
                      description:
                        "We analyze requirements, define scope, and create a detailed roadmap tailored to African markets.",
                      icon: "🔍",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      step: "02",
                      title: "Design & Architecture",
                      description:
                        "Our team designs UX and technical architecture for optimal performance in local conditions.",
                      icon: "🎨",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      step: "03",
                      title: "Development & Testing",
                      description:
                        "Agile development with continuous testing for quality and reliability across devices.",
                      icon: "⚡",
                      color: "from-orange-500 to-red-500",
                    },
                    {
                      step: "04",
                      title: "Deployment & Support",
                      description:
                        "Seamless deployment with ongoing maintenance and 24/7 local support across Africa.",
                      icon: "🚀",
                      color: "from-green-500 to-emerald-500",
                    },
                  ].map((process, index) => (
                    <div key={index} className="relative text-center">
                      {/* Step Number */}
                      <div
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${process.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 md:mb-6 mx-auto shadow-md md:shadow-lg`}
                      >
                        <div className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-xl md:rounded-2xl" />
                        <span className="relative z-10">{process.icon}</span>
                      </div>

                      {/* Step Content */}
                      <div className="px-2 sm:px-3 md:px-4">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold mb-3 md:mb-4">
                          Step {process.step}
                        </div>

                        <h4 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                          {process.title}
                        </h4>

                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-8 sm:mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                  Ready to start your digital transformation journey?
                </p>

                <button className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:shadow-lg sm:hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}