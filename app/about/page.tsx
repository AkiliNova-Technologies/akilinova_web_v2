import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import JourneyTimelineSection from "@/components/about/JourneyTimelineSection";
import LeadershipTeamSection from "@/components/about/LeadershipTeamSection";
import MissionVisionSection from "@/components/about/MIssionVisionSection";
import Script from "next/script";
import { Metadata } from "next";
import { SITE_CONFIG, COMMON_KEYWORDS } from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: `About ${SITE_CONFIG.name} - Leading Technology Partner in Africa | Our Story`,
  description: `Learn about ${SITE_CONFIG.name}, a leading technology company in Uganda providing web development, mobile apps, AI solutions, and cloud services to businesses across Africa since ${SITE_CONFIG.foundingYear}.`,
  keywords: [
    ...COMMON_KEYWORDS,
    `about ${SITE_CONFIG.name}`,
    "technology company Uganda",
    "Kampala software company",
    "African tech company",
    "our team",
    "company history",
    "mission and vision",
    "core values",
    "leadership team",
  ],
  openGraph: {
    title: `About ${SITE_CONFIG.name} - Our Story and Mission`,
    description: "Leading technology partner for African businesses since 2020",
    url: `${SITE_CONFIG.url}/about`,
    type: "website",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Team`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    title: `About ${SITE_CONFIG.name}`,
    description: "Leading technology partner for African businesses",
    images: [`${SITE_CONFIG.url}/og-about.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      foundingDate: SITE_CONFIG.foundingYear,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        addressCountry: "UG",
        addressLocality: "Kampala",
        addressRegion: "Central Region",
      },
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "10-50",
      },
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "Artificial Intelligence",
        "Cloud Computing",
        "Digital Transformation",
        "Software Engineering",
      ],
    },
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
        name: "About",
        item: `${SITE_CONFIG.url}/about`,
      },
    ],
  };

  return (
    <main>
      <Navbar />
      <AboutHeroSection />
      <MissionVisionSection />
      <CoreValuesSection />
      {/* <LeadershipTeamSection /> */}
      {/* <JourneyTimelineSection /> */}
      <Footer />
      
      {/* Structured Data - About Page Schema */}
      <Script
        id="about-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      
      {/* Structured Data - Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </main>
  );
}