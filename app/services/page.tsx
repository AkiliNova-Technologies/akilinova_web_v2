import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServicesCTASection from "@/components/services/CTASection";
import IndustriesWeServeSection from "@/components/services/IndustriesWeServeSection";
import ServicesHeroSection from "@/components/services/ServicesHeroSection";
import ServicesSection from "@/components/services/ServicesSection";
import WhyChooseUsSection from "@/components/services/WhyChooseUsSection";
import Script from "next/script";
import { Metadata } from "next";
import {
  SITE_CONFIG,
  COMMON_KEYWORDS,
  SERVICE_KEYWORDS,
  generateServiceSchema,
} from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: `Software Development & AI Solutions for Businesses | ${SITE_CONFIG.name}`,
  description: `End-to-end software development, AI solutions, cloud systems, and emerging technologies designed to solve complex business challenges and scale operations.
. ${SITE_CONFIG.name} delivers cutting-edge solutions for businesses across Africa.`,
  keywords: [
    ...COMMON_KEYWORDS,
    ...SERVICE_KEYWORDS.web,
    ...SERVICE_KEYWORDS.mobile,
    ...SERVICE_KEYWORDS.ai,
    ...SERVICE_KEYWORDS.cloud,
    "technology services",
    "software development services",
    "IT consulting",
    "digital solutions",
    "enterprise software",
    "custom development",
  ],
  openGraph: {
    title: `Technology Services - ${SITE_CONFIG.name}`,
    description:
      "Web development, mobile apps, AI solutions, and cloud services for African businesses",
    url: `${SITE_CONFIG.url}/services`,
    type: "website",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-services.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    title: `Technology Services - ${SITE_CONFIG.name}`,
    description: "Comprehensive web, mobile, AI and cloud solutions",
    images: [`${SITE_CONFIG.url}/og-services.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/services`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Services() {
  // Service schemas for all offerings
  const webDevSchema = generateServiceSchema({
    name: "Web Development",
    description:
      "We build secure, scalable web applications and platforms tailored to business workflows, performance, and long-term growth.",
    serviceType: "Web Development",
    areaServed: ["Africa", "Global"],
  });

  const mobileDevSchema = generateServiceSchema({
    name: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android",
    serviceType: "Mobile Application Development",
    areaServed: ["Africa", "Global"],
  });

  const aiSolutionsSchema = generateServiceSchema({
    name: "AI & Machine Learning Solutions",
    description:
      "Artificial intelligence, machine learning, and data analytics solutions",
    serviceType: "Artificial Intelligence Services",
    areaServed: ["Africa", "Global"],
  });

  const cloudServicesSchema = generateServiceSchema({
    name: "Cloud Computing Services",
    description: "Cloud migration, infrastructure setup, and DevOps solutions",
    serviceType: "Cloud Computing Services",
    areaServed: ["Africa", "Global"],
  });

  // Service catalog schema
  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_CONFIG.name} Services`,
    description: "Complete range of technology services",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Web Development",
          description: "Custom web applications and websites",
          provider: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Mobile App Development",
          description: "iOS and Android mobile applications",
          provider: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "AI & Machine Learning",
          description: "Artificial intelligence solutions",
          provider: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Cloud Computing",
          description: "Cloud infrastructure and migration",
          provider: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
          },
        },
      },
    ],
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
        name: "Services",
        item: `${SITE_CONFIG.url}/services`,
      },
    ],
  };

  return (
    <main>
      <Navbar />
      <ServicesHeroSection />
      <ServicesSection showDevelopmentProcess={false} />
      <WhyChooseUsSection />
      <IndustriesWeServeSection />
      <Footer />

      {/* Structured Data - Web Development Service */}
      <Script
        id="web-dev-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webDevSchema),
        }}
      />

      {/* Structured Data - Mobile Development Service */}
      <Script
        id="mobile-dev-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mobileDevSchema),
        }}
      />

      {/* Structured Data - AI Solutions Service */}
      <Script
        id="ai-solutions-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aiSolutionsSchema),
        }}
      />

      {/* Structured Data - Cloud Services */}
      <Script
        id="cloud-services-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cloudServicesSchema),
        }}
      />

      {/* Structured Data - Service Catalog */}
      <Script
        id="service-catalog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceCatalogSchema),
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
    </main>
  );
}
