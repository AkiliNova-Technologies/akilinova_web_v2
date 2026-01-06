"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
interface Project {
  id: string;
  title: string;
  fullDescription: string;
  launchDate: string;
  timeline: string;
  teamSize: string;
  status: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  challenges: string[];
  solutions: string[];
  keyFeatures: string[];
  impact: string[];
  stackExplanation: {
    frontend: string;
    backend: string;
    infrastructure?: string;
  };
}

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
      { threshold: 0.1, rootMargin: "-100px" }
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
      className={`${className} transition-all duration-700 ease-out ${
        isInView
          ? "opacity-100 transform-none"
          : "opacity-0 translate-y-16"
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
      { threshold: 0.1, rootMargin: "-50px" }
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
      className={`${className} transition-all duration-500 ease-out ${
        isInView
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

// This is a Client Component, but we need to handle params differently
export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  
  // For demo purposes - replace with actual data fetching
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("overview");

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
    
    // Mock data fetching - replace with actual API call
    const fetchProject = async () => {
      setLoading(true);
      try {
        // Replace with actual fetch logic
        // await fetchProjectById(id);
        
        // Mock project data - you could also fetch based on the actual id
        const mockProjects: Record<string, Project> = {
          "1": {
            id: "1",
            title: "FinTech Mobile Banking App",
            fullDescription: "A secure mobile banking solution for East African market with real-time transactions and AI-powered fraud detection.",
            launchDate: "2024-01-15",
            timeline: "4 Months",
            teamSize: "5 members",
            status: "Completed",
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/example",
            technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
            challenges: [
              "Ensuring banking-grade security for mobile transactions",
              "Handling real-time processing for millions of users",
              "Complying with multiple country regulations",
            ],
            solutions: [
              "Implemented end-to-end encryption and biometric authentication",
              "Used microservices architecture with auto-scaling",
              "Created modular compliance layer for different regions",
            ],
            keyFeatures: [
              "Real-time money transfers",
              "AI-powered fraud detection",
              "Multi-currency support",
              "Bill payments and airtime purchase",
              "Investment portfolio tracking",
            ],
            impact: [
              "Served 500,000+ active users",
              "Processed $50M+ in transactions monthly",
              "Reduced fraud incidents by 85%",
              "Improved transaction speed by 70%",
            ],
            stackExplanation: {
              frontend: "React Native with TypeScript for cross-platform mobile development.",
              backend: "Node.js microservices with MongoDB for scalable banking operations.",
              infrastructure: "AWS with auto-scaling, load balancing, and multi-region deployment.",
            },
          },
          "2": {
            id: "2",
            title: "E-Commerce Platform",
            fullDescription: "Scalable online marketplace connecting African artisans with global customers.",
            launchDate: "2024-03-20",
            timeline: "6 Months",
            teamSize: "8 members",
            status: "Completed",
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/example",
            technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
            challenges: [
              "Handling high traffic during sales events",
              "Implementing secure payment processing",
              "Creating responsive mobile experience",
            ],
            solutions: [
              "Implemented caching and load balancing",
              "Integrated Stripe with 3D secure authentication",
              "Used React Native for cross-platform mobile app",
            ],
            keyFeatures: [
              "Advanced search and filtering",
              "Real-time inventory management",
              "AI-powered recommendations",
              "Multi-language support",
              "Mobile-responsive design",
            ],
            impact: [
              "Increased conversion rate by 40%",
              "Reduced page load time by 60%",
              "Improved customer satisfaction score by 35%",
              "Scaled to handle 10k concurrent users",
            ],
            stackExplanation: {
              frontend: "Next.js with TypeScript and Tailwind CSS for a modern, type-safe UI.",
              backend: "Node.js with Express and PostgreSQL for scalable data handling.",
              infrastructure: "AWS with auto-scaling groups and CloudFront for global CDN.",
            },
          },
          // Add more projects as needed...
        };
        
        const project = mockProjects[id] || mockProjects["1"]; // Fallback to first project
        setCurrentProject(project);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

    return () => {
      // Clean up current project when leaving the page
      setCurrentProject(null);
    };
  }, [id]);

  const project = currentProject;

  if (loading || !id) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <Link href="/projects" className="text-[#FF6B00] hover:text-[#FF8A33] transition-colors">
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

        {/* Content */}
        <div
          ref={containerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-2">
              <AnimatedCard delay={0.2}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-8">
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
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          activeSection === item.id
                            ? "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  {/* Project Meta */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar className="h-4 w-4 text-[#FF6B00]" />
                        <span>
                          Launched:{" "}
                          {new Date(project.launchDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="h-4 w-4 text-[#FF6B00]" />
                        <span>Timeline: {project.timeline}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Users className="h-4 w-4 text-[#FF6B00]" />
                        <span>Team: {project.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
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
              <div
                key={activeSection}
                className="transition-all duration-500 ease-out"
              >
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
    </>
  );
}

// Project Hero Section
const ProjectHeroSection = ({ project, router }: { project: Project; router: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
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
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 -left-10 w-72 h-72 bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8A33]/20 rounded-full blur-3xl transition-all duration-2000 ${
            isInView ? "opacity-30 scale-100" : "opacity-0 scale-90"
          }`}
        ></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedHeading>
          {/* Badge */}
          <div className="flex flex-row items-center mb-8 gap-6">
            <button
              className="px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shadow-sm"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft className="h-6 w-6 text-white!" />
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20">
              <Sparkles className="h-4 w-4 mr-2 text-[#FF6B00]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Case Study</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Description */}
          <p
            className={`text-xl text-gray-600 leading-relaxed max-w-4xl mb-8 transition-all duration-700 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {project.fullDescription}
          </p>

          {/* Action Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white! px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
            {/* {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 border border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-sm"
              >
                <Github className="h-4 w-4" />
                View Code
              </a>
            )} */}
          </div>
        </AnimatedHeading>
      </div>
      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${
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
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Objectives
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#FF6B00]" />
                  Create a scalable and maintainable architecture
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#FF6B00]" />
                  Ensure high performance under heavy load
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#FF6B00]" />
                  Provide excellent user experience
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
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
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Challenges & Solutions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#FF6B00]" />
              Challenges
            </h3>
            <ul className="space-y-3">
              {project.challenges.map((challenge: string, index: number) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#FF6B00]" />
              Solutions
            </h3>
            <ul className="space-y-3">
              {project.solutions.map((solution: string, index: number) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 shrink-0" />
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
    React: <Globe className="h-6 w-6" />,
    "Node.js": <Code className="h-6 w-6" />,
    MongoDB: <Database className="h-6 w-6" />,
    "React Native": <Smartphone className="h-6 w-6" />,
    AWS: <Cpu className="h-6 w-6" />,
    Firebase: <Zap className="h-6 w-6" />,
    Stripe: <Shield className="h-6 w-6" />,
  };

  return (
    <AnimatedCard delay={0.5}>
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {project.technologies.map((tech: string, index: number) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:border-gray-300"
            >
              <div className="text-[#FF6B00]">
                {stackIcons[tech] || <Code className="h-6 w-6" />}
              </div>
              <span className="text-gray-900 font-medium">{tech}</span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Frontend Architecture
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {project.stackExplanation.frontend}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Backend Infrastructure
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {project.stackExplanation.backend}
            </p>
          </div>
          {project.stackExplanation.infrastructure && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Infrastructure & Deployment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {project.stackExplanation.infrastructure}
              </p>
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
};

// Impact & Results Section
const ImpactSection = ({ project }: { project: Project }) => {
  return (
    <AnimatedCard delay={0.6}>
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact & Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.impact.map((result: string, index: number) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            >
              <BarChart3 className="h-8 w-8 text-[#FF6B00] mx-auto mb-3" />
              <p className="text-gray-900 text-sm">{result}</p>
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
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.keyFeatures.map((feature: string, index: number) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-start gap-3 transition-all duration-300 hover:scale-102 hover:bg-gray-100"
            >
              <CheckCircle className="h-5 w-5 text-[#FF6B00] mt-0.5 shrink-0" />
              <span className="text-gray-900">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};