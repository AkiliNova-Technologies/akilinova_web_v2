/**
 * SEO Utilities and Constants
 * Centralized SEO configuration for consistent metadata across the site
 */

// Site Configuration
export const SITE_CONFIG = {
  name: "AkiliNova Technologies",
  title: "AkiliNova Technologies - Expert Web & Mobile Development Solutions in Africa",
  description:
    "AkiliNova delivers cutting-edge web development, mobile apps, AI solutions, and cloud services for businesses across Africa. Transform your digital presence with our expert team.",
  url: "https://akilinovatech.com",
  ogImage: "https://akilinovatech.com/og-image.png",
  twitterHandle: "@akilinovatech",
  email: "info@akilinovatechnologies.com",
  phone: "+256-789-874-647",
  address: "Kampala, Uganda",
  foundingYear: "2020",
};

// Common Keywords
export const COMMON_KEYWORDS = [
  "web development",
  "mobile app development",
  "custom software development",
  "AI solutions",
  "machine learning",
  "cloud computing",
  "digital transformation",
  "Kenya web development",
  "East Africa technology",
  "Nairobi software company",
];

// Social Media Links
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/akilinovatech",
  twitter: "https://twitter.com/akilinovatech",
  github: "https://github.com/akilinovatech",
  facebook: "https://www.facebook.com/akilinovatech",
  instagram: "https://www.instagram.com/akilinovatech",
};

// Service-Specific Keywords
export const SERVICE_KEYWORDS = {
  web: [
    "React development",
    "Next.js development",
    "responsive web design",
    "e-commerce development",
    "progressive web apps",
  ],
  mobile: [
    "React Native development",
    "iOS app development",
    "Android app development",
    "cross-platform apps",
    "mobile-first development",
  ],
  ai: [
    "artificial intelligence",
    "machine learning solutions",
    "data analytics",
    "predictive analytics",
    "AI chatbots",
  ],
  cloud: [
    "cloud migration",
    "AWS solutions",
    "cloud architecture",
    "DevOps services",
    "scalable infrastructure",
  ],
};

// Generate page metadata
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  noIndex = false,
  canonical,
}: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
}) {
  return {
    title,
    description,
    keywords: [...COMMON_KEYWORDS, ...keywords],
    openGraph: {
      title,
      description,
      url: canonical || SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage || SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      title,
      description,
      images: [ogImage || SITE_CONFIG.ogImage],
    },
    alternates: {
      canonical: canonical || SITE_CONFIG.url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

// Generate Organization JSON-LD
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/Logo.png`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "UG",
      addressLocality: "Kampala",
      addressRegion: "Kampala County",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      availableLanguage: ["English", "Swahili"],
    },
    sameAs: Object.values(SOCIAL_LINKS),
    foundingDate: SITE_CONFIG.foundingYear,
  };
}

// Generate Article JSON-LD (for blog posts)
export function generateArticleSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  image,
  url,
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image || SITE_CONFIG.ogImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/Logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

// Generate BreadcrumbList JSON-LD
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate Service JSON-LD
export function generateServiceSchema({
  name,
  description,
  serviceType,
  areaServed = "Kenya",
}: {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
  };
}

// Generate FAQ JSON-LD
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate Product JSON-LD (for case studies/projects)
export function generateProductSchema({
  name,
  description,
  image,
  aggregateRating,
}: {
  name: string;
  description: string;
  image?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    image: image || SITE_CONFIG.ogImage,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
      },
    }),
  };
}

// Helper function to inject JSON-LD into page
export function injectJsonLd(data: any) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// SEO Checklist for pages
export const SEO_CHECKLIST = {
  title: "Between 50-60 characters",
  description: "Between 150-160 characters",
  keywords: "10-15 relevant keywords",
  ogImage: "1200x630px minimum",
  canonical: "Include canonical URL",
  jsonLd: "Add structured data when applicable",
  headings: "Use proper H1, H2, H3 hierarchy",
  altText: "All images must have alt text",
  internalLinks: "Link to relevant internal pages",
  mobileOptimized: "Ensure mobile responsiveness",
};