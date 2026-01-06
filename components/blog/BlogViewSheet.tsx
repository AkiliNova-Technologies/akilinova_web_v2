"use client";

import {
  IconExternalLink,
  IconCalendar,
  IconUser,
  IconClock,
  IconEye,
  IconHeart,
  IconMessage,
  IconStar,
  IconCode,
  IconTag,
  IconShare2,
  IconTrendingUp,
} from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BlogPost } from "@/types/blog";

interface BlogViewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: BlogPost;
  onEdit?: () => void;
}

export function BlogViewSheet({
  open,
  onOpenChange,
  blog,
  onEdit,
}: BlogViewSheetProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (isPublished: boolean, isFeatured: boolean) => {
    if (isFeatured) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    if (isPublished) return "bg-green-500/10 text-green-600 border-green-500/20";
    return "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  const handleShare = () => {
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
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`${getStatusColor(blog.isPublished, blog.isFeatured)} capitalize flex items-center gap-1.5`}
                >
                  {blog.isFeatured && <IconStar size={14} />}
                  {blog.isFeatured ? "Featured" : blog.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <SheetTitle className="text-2xl font-bold mb-2 break-words">
                {blog.title}
              </SheetTitle>
              <SheetDescription className="text-base text-gray-600 leading-relaxed">
                {blog.excerpt}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] px-6 py-4">
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <IconEye className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Views</p>
                    <p className="font-semibold text-sm">{blog.viewCount.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <IconHeart className="text-green-600" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Likes</p>
                    <p className="font-semibold text-sm">{blog.likeCount}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <IconMessage className="text-purple-600" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Comments</p>
                    <p className="font-semibold text-sm">{blog.commentCount}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <IconClock className="text-orange-600" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Read Time</p>
                    <p className="font-semibold text-sm">{blog.readTime} min</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                  />
                </CardContent>
              </Card>
            )}

            {/* Author & Date */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {blog.author.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold text-lg">
                      {blog.author.name}
                    </h3>
                    <p className="text-gray-600">{blog.author.role}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <IconCalendar size={14} />
                        <span>{formatDate(blog.publishedAt)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <IconClock size={14} />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <IconCode size={18} className="text-blue-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="px-3 py-1.5"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <IconTag size={18} className="text-purple-600" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 text-sm"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Content Preview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">
                  Content Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="max-h-60 overflow-y-auto">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 500) + "..." }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Information */}
            {(blog.metaDescription || blog.metaKeywords) && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <IconTrendingUp size={18} className="text-green-600" />
                    SEO Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {blog.metaDescription && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-1">Meta Description</h4>
                      <p className="text-sm text-gray-600">{blog.metaDescription}</p>
                    </div>
                  )}
                  {blog.metaKeywords && blog.metaKeywords.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-1">Keywords</h4>
                      <div className="flex flex-wrap gap-1">
                        {blog.metaKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full"
                  >
                    <IconShare2 size={18} className="mr-2" />
                    Share
                  </Button>
                  {blog.isPublished && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                    >
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <IconExternalLink size={18} className="mr-2" />
                        View Live
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Created</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(blog.publishedAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Updated</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(blog.updatedAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Post ID</p>
                    <p className="font-medium text-gray-800">{blog.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Slug</p>
                    <p className="font-medium text-gray-800">{blog.slug}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <SheetFooter className="px-6 py-4 border-t">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-500">
              {blog.isPublished ? (
                <span className="flex items-center gap-1">
                  <IconEye size={14} />
                  Public
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <IconEye size={14} />
                  Draft
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="px-4"
              >
                Close
              </Button>
              {onEdit && (
                <Button
                  type="button"
                  onClick={onEdit}
                  className="px-4 bg-primary hover:bg-primary/90"
                >
                  Edit Post
                </Button>
              )}
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}