import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { SITE_CONFIG, COMMON_KEYWORDS } from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: `Technology Blog - Latest Insights on Web Development, AI & Cloud | ${SITE_CONFIG.name}`,
  description: `Stay updated with the latest trends in web development, mobile apps, AI, and cloud computing. Expert insights and tutorials from ${SITE_CONFIG.name}'s technology blog for African businesses.`,
  keywords: [
    ...COMMON_KEYWORDS,
    "technology blog",
    "web development blog",
    "mobile app development blog",
    "AI blog",
    "machine learning articles",
    "cloud computing blog",
    "tech tutorials",
    "programming blog",
    "software development blog",
    "Uganda tech blog",
    "Kenya tech blog",
    "African technology blog",
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} Technology Blog`,
    description: "Expert insights on web development, AI, and cloud computing for African businesses",
    url: `${SITE_CONFIG.url}/blog`,
    type: "website",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Technology Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    title: `${SITE_CONFIG.name} Blog`,
    description: "Latest insights on web development, AI, and cloud computing",
    images: [`${SITE_CONFIG.url}/og-blog.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}