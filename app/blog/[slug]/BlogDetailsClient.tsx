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
  Tag,
  Bookmark,
  TrendingUp,
  Heart,
  MessageCircle,
  X,
  Linkedin,
  Facebook,
  Copy,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { dummyBlogs } from "@/data/Blogs";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";

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
      { threshold: 0.1, rootMargin: "-50px" },
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
      className={`${className} transition-all duration-500 ease-out ${
        isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
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
          }, delay * 100);
        }
      },
      { threshold: 0.1, rootMargin: "-30px" },
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
      className={`${className} transition-all duration-300 ease-out ${
        isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

export default function BlogDetailsClient({ slug }: { slug: string }) {
  const router = useRouter();

  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewCountIncremented, setViewCountIncremented] = useState(false);

  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);

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
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Loading blog post...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <Link
            href="/blog"
            className="text-[#FF6B00] hover:text-[#FF8A33] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const blog = currentBlog;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(blog?.title || "");
  const encodedText = encodeURIComponent(blog?.excerpt || "");

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: currentUrl,
        });
      } else {
        setShowShareDialog(true);
      }
    } catch (error) {
      console.log("Share cancelled or failed");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.log("Copy failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <BlogHeroSection blog={blog} />

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Main Content - Now spans 3 columns */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              {/* Mobile Author Info - Simplified */}
              <div className="lg:hidden bg-white rounded-xl p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] flex items-center justify-center text-white font-bold">
                      {blog.author.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold text-sm">
                        {blog.author.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(blog.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{blog.readTime}m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: blog.title,
                          text: blog.excerpt,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied!");
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Blog Content Card */}
              
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
                  {/* Categories - Simplified on mobile */}
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 md:mb-8">
                    {blog.categories.map((category, index) => (
                      <span
                        key={category.id}
                        className={`
      px-3 py-1.5 sm:px-4 sm:py-2 
      bg-[#FF6B00]/10 text-[#FF6B00] 
      rounded-full text-xs sm:text-sm 
      border border-[#FF6B00]/30 font-medium
      ${index > 0 ? "hidden sm:inline-flex" : "inline-flex"}
    `}
                      >
                        {category.name}
                      </span>
                    ))}
                    {blog.categories.length > 1 && window.innerWidth < 640 && (
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                        +{blog.categories.length - 1}
                      </span>
                    )}
                  </div>

                  {/* Blog Content */}
                  <article
                    className="
                            prose prose-slate max-w-none
                            prose-headings:text-gray-900 prose-headings:font-bold
                            prose-h2:text-3xl prose-h2:mt-0 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
                            prose-p:text-gray-700 prose-p:text-[1.05rem] prose-p:leading-8 prose-p:mb-6
                            prose-ul:my-6 prose-ul:space-y-3
                            prose-li:text-gray-700 prose-li:leading-8
                            prose-strong:text-gray-900 prose-strong:font-semibold
                            prose-blockquote:border-l-4 prose-blockquote:border-[#FF6B00]
                            prose-blockquote:bg-orange-50 prose-blockquote:px-6 prose-blockquote:py-4
                            prose-blockquote:rounded-r-xl prose-blockquote:not-italic
  "
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Tags - Hidden on mobile, shown on tablet+ */}
                  <div className="hidden sm:block mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                      <h4 className="text-gray-900 font-semibold text-base sm:text-lg">
                        Tags
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {blog.tags
                        .slice(0, window.innerWidth < 768 ? 3 : 6)
                        .map((tag: string, index: number) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      {blog.tags.length > 3 && window.innerWidth < 768 && (
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              {/* Desktop Author Card - Hidden on mobile */}
              <AnimatedCard className="hidden lg:block">
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

              {/* Related Articles Section */}
              {relatedArticles.length > 0 && (
                <AnimatedCard delay={0.2}>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF6B00]" />
                      Related Articles
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {relatedArticles.map((article, index) => (
                        <div
                          key={article.id}
                          className="group transition-all duration-300"
                        >
                          <Link
                            href={`/blog/${article.slug}`}
                            className="block p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-[#FF6B00]/50 bg-white hover:bg-gray-50 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-gray-900 font-semibold text-sm sm:text-base md:text-lg group-hover:text-[#FF6B00] transition-colors duration-300 mb-1 sm:mb-2 line-clamp-2">
                                  {article.title}
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 hidden sm:block">
                                  {article.excerpt}
                                </p>
                                <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 hidden xs:inline" />
                                    <span>
                                      {formatDate(article.publishedAt)}
                                    </span>
                                  </span>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{article.readTime}m</span>
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-[#FF6B00] transition-colors duration-300 mt-1 ml-2 sm:ml-4" />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              )}
            </div>

            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <AnimatedCard delay={0.3}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-8">
                  <h4 className="text-gray-900 font-semibold mb-4">
                    Article Stats
                  </h4>
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
                        {new Date(blog.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
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
                    onClick={() => setShowShareDialog(true)}
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

      {showShareDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                {/* <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-[#FF6B00]">
                  <Share2 className="h-6 w-6" />
                </div> */}

                <h3 className="text-xl font-bold text-gray-900">
                  Share this article
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Thanks for helping spread useful business and technology
                  insights.
                </p>
              </div>

              <button
                onClick={() => setShowShareDialog(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF6B00]/40 hover:bg-orange-50 hover:text-[#FF6B00]"
              >
                <IconBrandWhatsapp className="h-6 w-6" />
              </a>

              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF6B00]/40 hover:bg-orange-50 hover:text-[#FF6B00]"
              >
                <IconBrandLinkedin className="h-6 w-6" />
              </a>

              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF6B00]/40 hover:bg-orange-50 hover:text-[#FF6B00]"
              >
                <IconBrandX className="h-6 w-6" />
              </a>

              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF6B00]/40 hover:bg-orange-50 hover:text-[#FF6B00]"
              >
                <IconBrandFacebook className="h-6 w-6" />
              </a>
            </div>

            <button
              onClick={handleCopyLink}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] px-4 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-orange-500/25"
            >
              {copied ? (
                <>
                  {/* <Check className="h-4 w-4" /> */}
                  Link copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy article link
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

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
      { threshold: 0.1, rootMargin: "-50px" },
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
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 -left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-r from-[#FF6B00]/15 to-[#FF8A33]/15 rounded-full blur-xl sm:blur-2xl lg:blur-3xl transition-all duration-1500 ${
            isInView
              ? "opacity-20 sm:opacity-30 scale-100"
              : "opacity-0 scale-90"
          }`}
        ></div>
      </div>

      {/* Grid Pattern - Reduced opacity on mobile */}
      <div
        className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8">
        <AnimatedHeading>
          {/* Back Button & Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shadow-sm self-start"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                {blog.isFeatured ? "Featured" : "Blog Post"}
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-4 sm:mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information - Stack on mobile */}
          <div
            className={`flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 md:gap-6 text-gray-400 mb-6 sm:mb-8 transition-all duration-500 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00]" />
              <span className="text-sm sm:text-base">
                {blog.author.name.split(" ")[0]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00]" />
              <span className="text-sm sm:text-base">
                {formatDate(blog.publishedAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00]" />
              <span className="text-sm sm:text-base">
                {blog.readTime} min read
              </span>
            </div>
          </div>

          {/* Excerpt - Hidden on mobile, shown on tablet+ */}
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mb-6 sm:mb-8 hidden sm:block transition-all duration-500 ease-out delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {blog.excerpt}
          </p>
        </AnimatedHeading>
      </div>
    </div>
  );
};
