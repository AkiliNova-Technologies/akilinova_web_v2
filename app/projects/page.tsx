import { Metadata } from "next";

import { SITE_CONFIG, COMMON_KEYWORDS } from "@/lib/seo-utils";
import ProjectsPageClient from "./ProjectsPageClient";

// This is a SERVER component that exports metadata
export const metadata: Metadata = {
  title: `Our Projects - Portfolio of Successful Applications | ${SITE_CONFIG.name}`,
  description: `Explore ${SITE_CONFIG.name}'s portfolio of successful web applications, mobile apps, AI solutions, and cloud projects delivered for clients across Africa. View our case studies and success stories.`,
  keywords: [
    ...COMMON_KEYWORDS,
    "portfolio",
    "case studies",
    "project showcase",
    "web applications portfolio",
    "mobile apps portfolio",
    "client work",
    "success stories",
    "completed projects",
    "software examples",
    "app development examples",
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} Projects Portfolio`,
    description: "Successful web and mobile applications we've built for African businesses",
    url: `${SITE_CONFIG.url}/projects`,
    type: "website",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-projects.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Projects`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    title: `${SITE_CONFIG.name} Projects`,
    description: "Our portfolio of successful web and mobile applications",
    images: [`${SITE_CONFIG.url}/og-projects.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/projects`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// This component just renders the client component
export default function ProjectsPage() {
  return <ProjectsPageClient />;
}