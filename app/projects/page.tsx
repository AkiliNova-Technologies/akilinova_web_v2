"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectsHeroSection from "@/components/projects/ProjectsHeroSection";
import ProjectsFilterSection from "@/components/projects/ProjectsFilterSection";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

// Sample data - replace with your actual data
const sampleProjects = [
  {
    id: "1",
    title: "FinTech Mobile Banking App",
    description: "A secure mobile banking solution for East African market with real-time transactions and AI-powered fraud detection.",
    category: "mobile",
    status: "completed",
    technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
    liveUrl: "https://example.com",
    location: "Kenya, Uganda, Tanzania",
    duration: "4 Months",
    teamSize: "5",
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Scalable online marketplace connecting African artisans with global customers.",
    category: "ecommerce",
    status: "completed",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    liveUrl: "https://example.com",
    location: "Nigeria, Ghana",
    duration: "6 Months",
    teamSize: "8",
  },
  {
    id: "3",
    title: "Healthcare Management System",
    description: "Comprehensive healthcare management platform for hospitals across West Africa.",
    category: "web-app",
    status: "in-progress",
    technologies: ["Vue.js", "Python", "Django", "Docker"],
    location: "Ghana, Senegal",
    duration: "5 Months",
    teamSize: "6",
  },
  {
    id: "4",
    title: "Agricultural Analytics Dashboard",
    description: "AI-powered analytics platform for farmers to optimize crop yield and market prices.",
    category: "dashboard",
    status: "completed",
    technologies: ["React", "Python", "TensorFlow", "Azure"],
    liveUrl: "https://example.com",
    location: "Rwanda, Ethiopia",
    duration: "3 Months",
    teamSize: "4",
  },
  {
    id: "5",
    title: "EdTech Learning Platform",
    description: "Interactive learning platform with personalized courses for African students.",
    category: "web",
    status: "completed",
    technologies: ["Angular", "Firebase", "Stripe", "Google Cloud"],
    liveUrl: "https://example.com",
    location: "South Africa",
    duration: "7 Months",
    teamSize: "7",
  },
  {
    id: "6",
    title: "Logistics Management System",
    description: "Real-time logistics tracking and management system for delivery companies.",
    category: "web-app",
    status: "upcoming",
    technologies: ["React", "Node.js", "Redis", "AWS"],
    location: "Kenya, Uganda",
    duration: "4 Months",
    teamSize: "5",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? sampleProjects
      : sampleProjects.filter((project) => project.category === activeCategory);

  // Calculate project counts
  const projectCounts = {
    all: sampleProjects.length,
    web: sampleProjects.filter((p) => p.category === "web").length,
    "web-app": sampleProjects.filter((p) => p.category === "web-app").length,
    mobile: sampleProjects.filter((p) => p.category === "mobile").length,
    ecommerce: sampleProjects.filter((p) => p.category === "ecommerce").length,
    dashboard: sampleProjects.filter((p) => p.category === "dashboard").length,
    "ai-ml": sampleProjects.filter((p) => p.category === "ai-ml").length,
  };

  // Handle project click to navigate to details page
  const handleProjectClick = (project: any) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <ProjectsHeroSection />

        {/* Projects Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectsFilterSection
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              projectCounts={projectCounts}
            />

            <ProjectsGrid
              projects={filteredProjects}
              activeCategory={activeCategory}
              onProjectClick={handleProjectClick}
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}