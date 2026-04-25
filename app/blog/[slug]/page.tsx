import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dummyBlogs } from "@/data/Blogs";
import { SITE_CONFIG } from "@/lib/seo-utils";
import BlogDetailsClient from "./BlogDetailsClient";

type Props = {
  params: Promise<{ slug: string }>;
};

function getBlogBySlug(slug: string) {
  return dummyBlogs.find((blog) => blog.slug === slug && blog.isPublished);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: `Blog Post Not Found | ${SITE_CONFIG.name}`,
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_CONFIG.url}/blog/${blog.slug}`;
  const image = blog.featuredImage || `${SITE_CONFIG.url}/og-image.png`;

  return {
    title: `${blog.title} | ${SITE_CONFIG.name}`,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords || blog.tags,
    authors: [{ name: blog.author.name }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      url,
      type: "article",
      siteName: SITE_CONFIG.name,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author.name],
      tags: blog.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) notFound();

  const url = `${SITE_CONFIG.url}/blog/${blog.slug}`;
  const image = blog.featuredImage || `${SITE_CONFIG.url}/og-image.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <BlogDetailsClient slug={slug} />
    </>
  );
}
