import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Metadata } from "next";
import { SITE_CONFIG, COMMON_KEYWORDS, generateOrganizationSchema } from "@/lib/seo-utils";

// Generate metadata using centralized config
export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [
    ...COMMON_KEYWORDS,
    "web development Uganda",
    "software development Kampala",
    "Uganda technology company",
    "React development Africa",
    "Next.js development",
    "enterprise software Uganda",
    "startup technology partner",
    "business automation",
  ],
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: "en_UG",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Technology Solutions for Africa`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  other: {
    "contact:email": SITE_CONFIG.email,
    "contact:phone": SITE_CONFIG.phone,
    "geo.region": "UG",
    "geo.placename": "Kampala",
  },
};

export default function Home() {
  // Use centralized organization schema
  const organizationSchema = generateOrganizationSchema();

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: "AkiliNova Tech",
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Local Business Schema (for better local SEO in Uganda)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/logo.png`,
    "@id": SITE_CONFIG.url,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$-$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Kampala",
      addressRegion: "Central Region",
      addressCountry: "UG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "0.3476", // Kampala coordinates
      longitude: "32.5825",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Uganda",
      },
      {
        "@type": "Country",
        name: "Kenya",
      },
      {
        "@type": "Country",
        name: "Tanzania",
      },
      {
        "@type": "Continent",
        name: "Africa",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.linkedin.com/company/akilinovatech",
      "https://twitter.com/akilinovatech",
      "https://github.com/akilinovatech",
      "https://www.facebook.com/akilinovatech",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom web applications and websites",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "iOS and Android mobile applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Solutions",
            description: "Artificial intelligence and machine learning",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Services",
            description: "Cloud infrastructure and migration",
          },
        },
      ],
    },
  };

  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection 
        serviceCount={3} 
        showDevelopmentProcess={false} 
        compactMode={true}
      />
      <CTASection />
      <TestimonialSection />
      <Footer />
      
      {/* Structured Data - Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      
      {/* Structured Data - Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      
      {/* Structured Data - Local Business Schema */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </main>
  );
}