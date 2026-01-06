import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactMethodsSection from "@/components/contact/ContactMethodsSection";
import FormAndFAQSection from "@/components/contact/FormAndFAQSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { Metadata } from "next";
import { SITE_CONFIG, COMMON_KEYWORDS } from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: `Contact ${SITE_CONFIG.name} - Get a Free Consultation | Kampala, Uganda`,
  description: `Contact ${SITE_CONFIG.name} for web development, mobile apps, AI solutions, and cloud services. Located in Kampala, Uganda. Get a free consultation and project quote today!`,
  keywords: [
    ...COMMON_KEYWORDS,
    `contact ${SITE_CONFIG.name}`,
    "get quote",
    "free consultation",
    "Kampala office",
    "Uganda technology company",
    "request consultation",
    "contact developer",
    "hire developers Uganda",
    "software consultation",
  ],
  openGraph: {
    title: `Contact ${SITE_CONFIG.name} - Free Consultation`,
    description: "Get in touch with our team for your next project",
    url: `${SITE_CONFIG.url}/contact`,
    type: "website",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: `Contact ${SITE_CONFIG.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    title: `Contact ${SITE_CONFIG.name}`,
    description: "Get in touch for your next project",
    images: [`${SITE_CONFIG.url}/og-contact.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      url: SITE_CONFIG.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressRegion: "Central Region",
        addressCountry: "UG",
        streetAddress: SITE_CONFIG.address,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SITE_CONFIG.phone,
          email: SITE_CONFIG.email,
          contactType: "Customer Service",
          availableLanguage: ["English"],
          areaServed: ["UG", "KE", "TZ", "RW"],
        },
        {
          "@type": "ContactPoint",
          telephone: SITE_CONFIG.phone,
          email: SITE_CONFIG.email,
          contactType: "Sales",
          availableLanguage: ["English"],
        },
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
        name: "Contact",
        item: `${SITE_CONFIG.url}/contact`,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <ContactHeroSection />
        <FormAndFAQSection />
        <ChatWidget />
      </div>
      <Footer />
      
      {/* Structured Data - Contact Page Schema */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
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
    </>
  );
}