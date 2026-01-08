"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Clock,
  Zap,
  Shield,
  Database,
  Smartphone,
  Globe,
  Code,
  Sparkles,
  Target,
  CheckCircle,
  BarChart3,
  Cpu,
  ChevronDown,
  Menu,
  X,
  Award,
  TrendingUp,
  Layers,
  Server,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/seo-utils";
import { dummyProjects } from "@/data/Projects";
import { Project } from "@/types/project";

// Reusable animated components with CSS animations
interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
}

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" } // Reduced margin for mobile
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-500 ease-out ${
        isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, delay * 1000);
        }
      },
      { threshold: 0.1, rootMargin: "-30px" } // Reduced margin for mobile
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-300 ease-out ${
        isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Unwrap the params Promise
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setId(unwrappedParams.id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      setLoading(true);
      try {
        const project = dummyProjects.find((p) => p.id === id);
        setCurrentProject(project || null);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

    return () => {
      setCurrentProject(null);
    };
  }, [id]);

  const project = currentProject;

  // Generate SEO schemas when we have a project
  const projectSchema = project
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.fullDescription,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        datePublished: project.launchDate,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: project.liveUrl,
        creator: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
      }
    : null;

  const breadcrumbSchema = project
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_CONFIG.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${SITE_CONFIG.url}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${SITE_CONFIG.url}/projects/${project.id}`,
          },
        ],
      }
    : null;

  if (loading || !id) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <Link
            href="/projects"
            className="text-[#FF6B00] hover:text-[#FF8A33] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <ProjectHeroSection project={project} router={router} />

        {/* Mobile Navigation Menu */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <span className="border p-1 rounded-sm border-gray-300 hover:bg-[#FF6B00]">

                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                </span>
                <span className="text-sm font-medium">Menu</span>
              </button>
              <div className="text-sm text-gray-500 font-medium">
                {activeSection.replace("-", " ")}
              </div>
            </div>
            
            {isMobileMenuOpen && (
              <div className="mt-3 pb-3 animate-slide-down">
                <nav className="grid grid-cols-2 gap-2">
                  {[
                    { id: "overview", label: "Overview", icon: Target },
                    { id: "challenges", label: "Challenges", icon: Zap },
                    { id: "technology", label: "Tech Stack", icon: Code },
                    { id: "impact", label: "Impact", icon: BarChart3 },
                    { id: "features", label: "Features", icon: CheckCircle },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        activeSection === item.id
                          ? "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block lg:col-span-2">
              <AnimatedCard delay={0.2}>
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 sticky top-8">
                  <nav className="space-y-2">
                    {[
                      { id: "overview", label: "Project Overview", icon: Target },
                      { id: "challenges", label: "Challenges & Solutions", icon: Zap },
                      { id: "technology", label: "Technology Stack", icon: Code },
                      { id: "impact", label: "Impact & Results", icon: BarChart3 },
                      { id: "features", label: "Key Features", icon: CheckCircle },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm sm:text-base ${
                          activeSection === item.id
                            ? "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  {/* Project Meta */}
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                    <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                      Project Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-700">
                        <Calendar className="h-4 w-4 text-[#FF6B00] flex-shrink-0" />
                        <span>Launched: {new Date(project.launchDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-700">
                        <Clock className="h-4 w-4 text-[#FF6B00] flex-shrink-0" />
                        <span>Timeline: {project.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-700">
                        <Users className="h-4 w-4 text-[#FF6B00] flex-shrink-0" />
                        <span>Team: {project.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-700">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            project.status === "Completed"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-4">
              <div className="transition-all duration-300 ease-out">
                {activeSection === "overview" && (
                  <ProjectOverview project={project} />
                )}
                {activeSection === "challenges" && (
                  <ChallengesSection project={project} />
                )}
                {activeSection === "technology" && (
                  <TechnologySection project={project} />
                )}
                {activeSection === "impact" && (
                  <ImpactSection project={project} />
                )}
                {activeSection === "features" && (
                  <FeaturesSection project={project} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* SEO Schemas */}
      {project && projectSchema && (
        <Script
          id="project-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectSchema),
          }}
        />
      )}

      {project && breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
    </>
  );
}

// Project Hero Section
const ProjectHeroSection = ({
  project,
  router,
}: {
  project: Project;
  router: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 -left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-r from-[#FF6B00]/15 to-[#FF8A33]/15 rounded-full blur-xl sm:blur-2xl lg:blur-3xl transition-all duration-1000 ${
            isInView ? "opacity-20 sm:opacity-30 scale-100" : "opacity-0 scale-90"
          }`}
        ></div>
      </div>

      {/* Grid Pattern - Reduced opacity on mobile */}
      <div
        className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
        <AnimatedHeading>
          {/* Back Button & Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shadow-sm self-start"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-[#FF6B00]" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Case Study
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-4 sm:mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Description - Hidden on mobile */}
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mb-6 sm:mb-8 hidden sm:block transition-all duration-500 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {project.fullDescription}
          </p>

          {/* Action Buttons */}
          <div
            className={`flex flex-wrap gap-3 sm:gap-4 transition-all duration-500 ease-out delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white! px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
            
            {/* Mobile Stats - Hidden on desktop */}
            <div className="sm:hidden flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(project.launchDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>{project.teamSize}</span>
              </div>
            </div>
          </div>
        </AnimatedHeading>
      </div>
      
      {/* Scroll Indicator - Hidden on mobile */}
      <div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 hidden sm:block ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FF6B00] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Overview Section
const ProjectOverview = ({ project }: { project: Project }) => {
  return (
    <AnimatedCard delay={0.3}>
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Project Overview
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
            {project.fullDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Objectives
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600">
                {project.objectives?.slice(0, 3).map((objective: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                    {objective}
                  </li>
                )) || [
                  "Create scalable architecture",
                  "Ensure high performance",
                  "Provide excellent UX"
                ].map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-500 border border-gray-200">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Challenges & Solutions Section
const ChallengesSection = ({ project }: { project: Project }) => {
  return (
    <AnimatedCard delay={0.4}>
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Challenges & Solutions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00]" />
              Challenges
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {project.challenges?.slice(0, 3).map((challenge: string, index: number) => (
                <li key={index} className="text-gray-600 text-sm sm:text-base flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0" />
                  {challenge}
                </li>
              )) || [
                "High traffic scalability requirements",
                "Complex data processing needs",
                "Tight project deadlines"
              ].map((challenge, index) => (
                <li key={index} className="text-gray-600 text-sm sm:text-base flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00]" />
              Solutions
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {project.solutions?.slice(0, 3).map((solution: string, index: number) => (
                <li key={index} className="text-gray-600 text-sm sm:text-base flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0" />
                  {solution}
                </li>
              )) || [
                "Implemented microservices architecture",
                "Used distributed caching system",
                "Adopted agile development methodology"
              ].map((solution, index) => (
                <li key={index} className="text-gray-600 text-sm sm:text-base flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Technology Stack Section
const TechnologySection = ({ project }: { project: Project }) => {
  const stackIcons: { [key: string]: React.ReactNode } = {
    React: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />,
    "Node.js": <Code className="h-5 w-5 sm:h-6 sm:w-6" />,
    MongoDB: <Database className="h-5 w-5 sm:h-6 sm:w-6" />,
    "React Native": <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />,
    AWS: <Cpu className="h-5 w-5 sm:h-6 sm:w-6" />,
    Firebase: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
    Stripe: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
    Docker: <Server className="h-5 w-5 sm:h-6 sm:w-6" />,
    Redis: <Database className="h-5 w-5 sm:h-6 sm:w-6" />,
  };

  return (
    <AnimatedCard delay={0.5}>
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Technology Stack
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {project.technologies.slice(0, 6).map((tech: string, index: number) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 flex items-center gap-2 sm:gap-3 transition-all duration-200 hover:scale-102 hover:bg-gray-100"
            >
              <div className="text-[#FF6B00]">
                {stackIcons[tech] || <Code className="h-5 w-5 sm:h-6 sm:w-6" />}
              </div>
              <span className="text-gray-900 font-medium text-sm sm:text-base truncate">
                {tech}
              </span>
            </div>
          ))}
          {project.technologies.length > 6 && (
            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm sm:text-base">
                +{project.technologies.length - 6} more
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Frontend Architecture
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {project.stackExplanation?.frontend || "Modern React-based SPA with TypeScript and Tailwind CSS."}
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Backend Infrastructure
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {project.stackExplanation?.backend || "Node.js with Express, MongoDB, and Redis caching."}
            </p>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Impact & Results Section
const ImpactSection = ({ project }: { project: Project }) => {
  return (
    <AnimatedCard delay={0.6}>
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Impact & Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {project.impact?.slice(0, 3).map((result: string, index: number) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 transition-all duration-200 hover:scale-102 hover:bg-gray-100"
            >
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF6B00] mx-auto mb-2 sm:mb-3" />
              <p className="text-gray-900 text-xs sm:text-sm text-center">{result}</p>
            </div>
          )) || [
            "50% increase in user engagement",
            "90% reduction in loading time",
            "Scaled to handle 10x more traffic"
          ].map((result, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 transition-all duration-200 hover:scale-102 hover:bg-gray-100"
            >
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF6B00] mx-auto mb-2 sm:mb-3" />
              <p className="text-gray-900 text-xs sm:text-sm text-center">{result}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

// Key Features Section
const FeaturesSection = ({ project }: { project: Project }) => {
  return (
    <AnimatedCard delay={0.7}>
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {project.keyFeatures?.slice(0, 4).map((feature: string, index: number) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 flex items-start gap-2 sm:gap-3 transition-all duration-200 hover:scale-102 hover:bg-gray-100"
            >
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mt-0.5 flex-shrink-0" />
              <span className="text-gray-900 text-sm sm:text-base">{feature}</span>
            </div>
          )) || [
            "Real-time data synchronization",
            "Advanced analytics dashboard",
            "Multi-platform support",
            "Enterprise-grade security"
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 flex items-start gap-2 sm:gap-3 transition-all duration-200 hover:scale-102 hover:bg-gray-100"
            >
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mt-0.5 flex-shrink-0" />
              <span className="text-gray-900 text-sm sm:text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};