"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectsHeroSection from "@/components/projects/ProjectsHeroSection";
import ProjectsFilterSection from "@/components/projects/ProjectsFilterSection";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { dummyProjects } from "@/data/Projects";
import Script from "next/script";
import { SITE_CONFIG } from "@/lib/seo-utils";

// This is a CLIENT component with all the interactive logic
// NO metadata export here!

export default function ProjectsPageClient() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? dummyProjects
      : dummyProjects.filter((project) => project.category === activeCategory);

  // Calculate project counts
  const projectCounts = {
    all: dummyProjects.length,
    web: dummyProjects.filter((p) => p.category === "web").length,
    "web-app": dummyProjects.filter((p) => p.category === "web-app").length,
    mobile: dummyProjects.filter((p) => p.category === "mobile").length,
    ecommerce: dummyProjects.filter((p) => p.category === "ecommerce").length,
    dashboard: dummyProjects.filter((p) => p.category === "dashboard").length,
    "ai-ml": dummyProjects.filter((p) => p.category === "ai-ml").length,
  };

  // Handle project click to navigate to details page
  const handleProjectClick = (project: any) => {
    router.push(`/projects/${project.id}`);
  };

  // Collection Page Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_CONFIG.name} Projects Portfolio`,
    description: "Showcase of successful web and mobile application projects",
    url: `${SITE_CONFIG.url}/projects`,
    about: {
      "@type": "CreativeWork",
      name: "Software Development Projects",
    },
  };

  // Portfolio ItemList Schema
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Project Portfolio",
    description: "Our completed web, mobile, and AI projects",
    itemListElement: dummyProjects.slice(0, 10).map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "BusinessApplication",
        url: `${SITE_CONFIG.url}/projects/${project.id}`,
      },
    })),
  };

  const breadcrumbSchema = {
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
    ],
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

      {/* Structured Data - Collection Page */}
      <Script
        id="collection-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      {/* Structured Data - Portfolio List */}
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />

      {/* Structured Data - Breadcrumb */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}