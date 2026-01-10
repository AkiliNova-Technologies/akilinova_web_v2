import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
  weight: ["400", "600", "700"],
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

// Comprehensive metadata for better SEO
export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default:
      "AkiliNova Technologies | Web & Mobile App Development Company in Africa",
    template: "%s | AkiliNova Technologies - Solutions",
  },
  description:
    "AkiliNova Technologies is a leading web and mobile app development company in Africa. We build custom software, AI-powered systems, and cloud applications for startups and enterprises.",

  // Enhanced Keywords
  keywords: [
    // Brand (VERY IMPORTANT)
    "AkiliNova Technologies",
    "AkiliNova Tech",
    "AkiliNova software company",

    // Core Services (commercial intent)
    "custom web development company",
    "mobile app development company",
    "enterprise software development",
    "AI software development services",
    "cloud application development",
    "business automation software",

    // Regional Authority (pick your REAL market)
    "software development company in Uganda",
    "web development company Kampala",
    "mobile app developers in Uganda",
    "African software development company",
    "East Africa technology partner",

    // Technologies (buyer-focused, not generic)
    "Next.js development company",
    "React web development services",
    "Node.js backend development",
    "React Native mobile app developers",
    "cloud-native application development",

    // Use-case driven (search intent)
    "custom business software solutions",
    "startup MVP development Africa",
    "enterprise digital transformation Africa",
    "API development services Africa",
  ],

  // Authors and Creator
  authors: [
    {
      name: "AkiliNova Technologies",
      url: "https://akilinovatech.com",
    },
  ],
  creator: "AkiliNova Technologies",
  publisher: "AkiliNova Technology Solutions",

  // Verification and Ownership
  metadataBase: new URL("https://akilinovatech.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "en-KE": "/en-KE",
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akilinovatech.com",
    siteName: "AkiliNova Technologies",
    title:
      "AkiliNova Technologies - Expert Web & Mobile Development Solutions in Africa",
    description:
      "Leading technology partner for African businesses. We deliver custom web applications, mobile apps, AI solutions, and cloud services that drive business growth and digital transformation.",
    images: [
      {
        url: "https://akilinovatech.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AkiliNova Technologies - Solutions for Africa",
        type: "image/jpeg",
      },
      {
        url: "https://akilinovatech.com/og-image.png",
        width: 1200,
        height: 1200,
        alt: "AkiliNova Technologies Logo",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@akilinovatech", // Replace with your Twitter handle
    creator: "@akilinova",
    title: "AkiliNova - Expert Web & Mobile Development Solutions in Africa",
    description:
      "Leading technology partner for African businesses. Custom web applications, mobile apps, AI solutions, and cloud services.",
    images: ["https://akilinovatech.com/og-image.png"], // Replace with actual image
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons and Favicons
  icons: {
    icon: [
      // { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      // { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/Logo.png", sizes: "any" },
    ],
    apple: [
      // { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/Logo.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#FF6B00", // Your brand color
      },
    ],
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Application Info
  applicationName: "AkiliNova Technologies",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AkiliNova Technologies",
  },

  // Format Detection
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },

  // Category
  category: "technology",

  // Additional Meta Tags
  other: {
    // Business Information
    "contact:email": "info@akilinovatechnologies.com",
    "contact:phone": "+256-789-874-647",
    "contact:address": "Kampala, Uganda",

    // Geographic
    "geo.region": "UG",
    "geo.placename": "Kampala",

    // Rating
    rating: "general",

    // Language
    language: "English",

    // Copyright
    copyright: `© ${new Date().getFullYear()} AkiliNova Technologies. All rights reserved.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Additional SEO Enhancements */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Canonical URL - Important for SEO */}
        <link rel="canonical" href="https://akilinovatech.com" />

        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="Qphz0wWnP-Nk7SL26MpKwfE49KJheIJValWqYhULeQI"
        />

        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#FF6B00" />
        <meta name="msapplication-TileColor" content="#122A44" />

        {/* Apple Mobile Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Structured Data (JSON-LD) for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AkiliNova Technologies",
              alternateName: "AkiliNova Technology Solutions",
              url: "https://akilinovatech.com",
              logo: "https://akilinovatech.com/Logo.png",
              description:
                "Expert web development, mobile apps, AI solutions, and cloud services for African businesses",
              address: {
                "@type": "PostalAddress",
                addressCountry: "UG",
                addressLocality: "Kampala",
                addressRegion: "Kampala County",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                email: "info@akilinovatechnologies.com",
                availableLanguage: ["English", "Swahili"],
              },
              sameAs: [
                "https://www.linkedin.com/company/akilinovatech",
                "https://twitter.com/akilinovatech",
                "https://github.com/akilinovatech",
                "https://www.facebook.com/akilinovatech",
              ],
              foundingDate: "2020",
              founders: [
                {
                  "@type": "Person",
                  name: "Albert Watbin", // Replace with actual name
                },
              ],
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: "10-50",
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "Uganda",
                },
                {
                  "@type": "Continent",
                  name: "Africa",
                },
              ],
              knowsAbout: [
                "Web Development",
                "Mobile App Development",
                "Artificial Intelligence",
                "Cloud Computing",
                "Digital Transformation",
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Web Development",
                    description:
                      "Custom web applications and websites for businesses",
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
                    name: "AI & Machine Learning",
                    description:
                      "Artificial intelligence and machine learning solutions",
                  },
                },
              ],
            }),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AkiliNova Technologies",
              url: "https://akilinovatech.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://akilinovatech.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
