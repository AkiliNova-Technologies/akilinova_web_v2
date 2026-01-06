// app/blog/[slug]/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  Share2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { dummyBlogs } from "@/data/Blogs"; // Import your dummy data

// Types
interface BlogAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: string[];
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  metaDescription?: string;
  metaKeywords?: string[];
}

// Reusable animated components with CSS animations
interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
}

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isInView
          ? "opacity-100 transform-none"
          : "opacity-0 translate-y-16"
      }`}
    >
      {children}
    </div>
  );
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, delay * 1000);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-500 ease-out ${
        isInView
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

export default function BlogDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params as { slug: string };
  
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewCountIncremented, setViewCountIncremented] = useState(false);

  // Get related articles
  const relatedArticles = currentBlog
    ? dummyBlogs
        .filter((blog) => blog.id !== currentBlog.id && blog.isPublished)
        .slice(0, 3)
    : [];

  // Fetch blog by slug
  useEffect(() => {
    const fetchBlog = () => {
      setLoading(true);
      try {
        // Find blog by slug in dummy data
        const blog = dummyBlogs.find((b) => b.slug === slug && b.isPublished);
        
        if (blog) {
          setCurrentBlog(blog);
          
          // Increment view count (simulate)
          if (!viewCountIncremented) {
            // In a real app, you would make an API call here
            console.log(`Incrementing view count for blog: ${blog.title}`);
            setViewCountIncremented(true);
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }

    return () => {
      // Cleanup if needed
    };
  }, [slug, viewCountIncremented]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <Link href="/blog" className="text-[#FF6B00] hover:text-[#FF8A33] transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const blog = currentBlog;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">

        {/* Hero Section */}
        <BlogHeroSection blog={blog} />

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - Now spans 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              {/* Author Card - At the top of content */}
              <AnimatedCard>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] flex items-center justify-center text-white font-bold text-lg">
                        {blog.author.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-semibold text-lg">
                        {blog.author.name}
                      </h3>
                      <p className="text-gray-600">
                        {blog.author.role || "AkiliNova Tech"}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-[#FF6B00]" />
                          <span>{blog.viewCount} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-[#FF6B00]" />
                          <span>{formatDate(blog.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="ml-auto bg-white text-gray-900 py-2 px-4 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: blog.title,
                            text: blog.excerpt,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard!");
                        }
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </AnimatedCard>

              {/* Blog Content Card - Larger size */}
              <AnimatedCard delay={0.1}>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {blog.categories.map((category: BlogCategory, index: number) => (
                      <span
                        key={category.id}
                        className="px-4 py-2 bg-[#FF6B00]/10 text-[#FF6B00] rounded-full text-sm border border-[#FF6B00]/30 font-medium transition-all duration-300 hover:scale-105 hover:bg-[#FF6B00]/20"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>

                  {/* Blog Content */}
                  <article className="prose max-w-none prose-lg">
                    <div
                      className="text-gray-600 leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </article>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h4 className="text-gray-900 font-semibold text-lg mb-4">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {blog.tags.map((tag: string, index: number) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Related Articles Section */}
              {relatedArticles.length > 0 && (
                <AnimatedCard delay={0.2}>
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-[#FF6B00]" />
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((article, index) => (
                        <div
                          key={article.id}
                          className="group transition-all duration-300 hover:-translate-y-1"
                        >
                          <Link
                            href={`/blog/${article.slug}`}
                            className="block p-4 rounded-xl border border-gray-200 hover:border-[#FF6B00]/50 bg-white hover:bg-gray-50 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-gray-900 font-semibold text-lg group-hover:text-[#FF6B00] transition-colors duration-300 mb-2">
                                  {article.title}
                                </h4>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                  {article.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>{formatDate(article.publishedAt)}</span>
                                  <span>•</span>
                                  <span>{article.readTime} min read</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {article.viewCount} views
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF6B00] transition-colors duration-300 mt-1 ml-4" />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              )}
            </div>

            {/* Sidebar - Now only 1 column */}
            <div className="lg:col-span-1">
              <AnimatedCard delay={0.3}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-8">
                  <h4 className="text-gray-900 font-semibold mb-4">Article Stats</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#FF6B00]" />
                        <span>Read Time</span>
                      </div>
                      <span className="font-semibold">{blog.readTime} min</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#FF6B00]" />
                        <span>Published</span>
                      </div>
                      <span className="font-semibold text-sm">
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-[#FF6B00]" />
                        <span>Views</span>
                      </div>
                      <span className="font-semibold">{blog.viewCount}</span>
                    </div>
                  </div>

                  {/* Share Button */}
                  <button
                    className="w-full mt-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: blog.title,
                          text: blog.excerpt,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    Share Article
                  </button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Blog Hero Section
const BlogHeroSection = ({ blog }: { blog: BlogPost }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 py-28"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 -left-10 w-72 h-72 bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8A33]/20 rounded-full blur-3xl transition-all duration-2000 ${
            isInView ? "opacity-30 scale-100" : "opacity-0 scale-90"
          }`}
        ></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedHeading>
          {/* Badge */}
          <div className="flex flex-row items-center mb-8 gap-6">
            <button
              className="px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shadow-sm"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20">
              <Sparkles className="h-4 w-4 mr-2 text-[#FF6B00]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                {blog.isFeatured ? "Featured Article" : "Blog Article"}
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div
            className={`flex flex-wrap items-center gap-6 text-gray-400 mb-8 transition-all duration-700 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#FF6B00]" />
              <span>{blog.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#FF6B00]" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#FF6B00]" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          {/* Excerpt */}
          <p
            className={`text-xl text-gray-400 leading-relaxed mb-8 transition-all duration-700 ease-out delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {blog.excerpt}
          </p>
        </AnimatedHeading>
      </div>
      
      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FF6B00] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};