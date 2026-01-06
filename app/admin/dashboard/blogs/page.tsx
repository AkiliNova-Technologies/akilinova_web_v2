"use client";

import { useState } from "react";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDownload,
  IconTrendingUp,
  IconEdit,
  IconEye,
  IconTrash,
  IconCalendar,
  IconUser,
  IconTag,
  IconClock,
  IconMessage,
  IconHeart,
  IconStar,
  IconStarFilled,
  IconExternalLink,
  IconLayoutGrid,
  IconList,
} from "@tabler/icons-react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DataTable,
  type TableField,
  type TableAction,
} from "@/components/data-table";
import { SectionCards, type SectionCard } from "@/components/section-cards";
import { BlogCreateSheet } from "@/components/blog/BlogCreateSheet";
import { BlogEditSheet } from "@/components/blog/BlogEditSheet";
import { BlogViewSheet } from "@/components/blog/BlogViewSheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyBlogs } from "@/data/Blogs";
import type { BlogPost } from "@/types/blog";

export default function BlogDashboardPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(dummyBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && blog.isPublished) ||
      (statusFilter === "draft" && !blog.isPublished);

    const matchesCategory =
      categoryFilter === "all" ||
      blog.categories.some((cat) => cat.slug === categoryFilter);

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Stats
  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.isPublished).length,
    featured: blogs.filter((b) => b.isFeatured).length,
    draft: blogs.filter((b) => !b.isPublished).length,
    totalViews: blogs.reduce((sum, blog) => sum + blog.viewCount, 0),
    totalLikes: blogs.reduce((sum, blog) => sum + blog.likeCount, 0),
    totalComments: blogs.reduce((sum, blog) => sum + blog.commentCount, 0),
    averageReadTime: Math.round(
      blogs.reduce((sum, blog) => sum + blog.readTime, 0) / blogs.length
    ),
  };

  // Get unique categories
  const categories = Array.from(
    new Set(blogs.flatMap((blog) => blog.categories))
  ).map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    count: blogs.filter((blog) => blog.categories.some((c) => c.id === cat.id))
      .length,
  }));

  // Section cards data
  const blogStatsCards: SectionCard[] = [
    {
      title: "Total Posts",
      value: stats.total,
      trend: {
        direction: "up",
        value: "+2",
        label: "This month",
      },
      icon: <IconEdit className="size-5" />,
      footer: {
        primary: `${stats.published} published, ${stats.draft} drafts`,
        secondary: "Keep up the momentum!",
      },
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      trend: {
        direction: "up",
        value: "+15%",
        label: "From last month",
      },
      icon: <IconEye className="size-5" />,
      footer: {
        primary: `${Math.round(
          stats.totalViews / stats.published
        ).toLocaleString()} avg views per post`,
        secondary: "Engagement is growing",
      },
    },
    {
      title: "Engagement",
      value: `${stats.totalLikes}+`,
      trend: {
        direction: "up",
        value: "+23%",
        label: "More interactions",
      },
      icon: <IconHeart className="size-5" />,
      footer: {
        primary: `${stats.totalLikes} likes, ${stats.totalComments} comments`,
        secondary: "Readers are engaged",
      },
    },
    {
      title: "Avg. Read Time",
      value: `${stats.averageReadTime} min`,
      trend: {
        direction: "up",
        value: "+1 min",
        label: "Longer content",
      },
      icon: <IconClock className="size-5" />,
      footer: {
        primary: "In-depth content performing well",
        secondary: "Quality over quantity",
      },
    },
  ];

  const getStatusColor = (isPublished: boolean, isFeatured: boolean) => {
    if (isFeatured)
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    if (isPublished)
      return "bg-green-500/10 text-green-600 border-green-500/20";
    return "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  const handleCreateBlog = (
    newBlog: Omit<
      BlogPost,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "viewCount"
      | "likeCount"
      | "commentCount"
    >
  ) => {
    const blog: BlogPost = {
      ...newBlog,
      id: (blogs.length + 1).toString(),
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      author: { name: "" },
      categories: [],
      tags: [],
      readTime: 0,
      isPublished: false,
      isFeatured: false,
    };
    setBlogs([...blogs, blog]);
    setIsCreateDialogOpen(false);
  };

  const handleEditBlog = (updatedBlog: BlogPost) => {
    setBlogs(
      blogs.map((b) =>
        b.id === updatedBlog.id
          ? { ...updatedBlog, updatedAt: new Date().toISOString() }
          : b
      )
    );
    setIsEditDialogOpen(false);
    setSelectedBlog(null);
  };

  const handleDeleteBlog = (blogId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone."
      )
    ) {
      setBlogs(blogs.filter((b) => b.id !== blogId));
    }
  };

  const handleTogglePublish = (blogId: string) => {
    setBlogs(
      blogs.map((b) =>
        b.id === blogId
          ? {
              ...b,
              isPublished: !b.isPublished,
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    );
  };

  const handleToggleFeatured = (blogId: string) => {
    setBlogs(
      blogs.map((b) =>
        b.id === blogId
          ? {
              ...b,
              isFeatured: !b.isFeatured,
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    );
  };

  // Table fields configuration
  const blogFields: TableField<BlogPost>[] = [
    {
      key: "title",
      header: "Post Title",
      cell: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 line-clamp-1">
              {row.title}
            </div>
            <div className="text-sm text-gray-500 max-w-xs truncate">
              {row.excerpt}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <IconUser size={12} />
                {row.author.name}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                {new Date(row.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ),
      enableSorting: true,
    },
    {
      key: "categories",
      header: "Categories",
      cell: (_, row) => (
        <div className="flex flex-wrap gap-1">
          {row.categories.slice(0, 2).map((cat, idx) => (
            <Badge key={cat.id} variant="outline" className="text-xs">
              {cat.name}
            </Badge>
          ))}
          {row.categories.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{row.categories.length - 2}
            </Badge>
          )}
        </div>
      ),
      align: "center",
    },
    {
      key: "status",
      header: "Status",
      cell: (_, row) => (
        <div className="flex flex-col gap-1">
          <Badge
            variant="outline"
            className={`capitalize w-fit ${getStatusColor(
              row.isPublished,
              row.isFeatured
            )}`}
          >
            {row.isFeatured ? (
              <IconStarFilled size={12} className="mr-1" />
            ) : row.isPublished ? (
              "Published"
            ) : (
              "Draft"
            )}
            {row.isFeatured && " Featured"}
          </Badge>
          {row.isPublished && (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <IconEye size={10} />
              {row.viewCount.toLocaleString()} views
            </div>
          )}
        </div>
      ),
      align: "center",
      enableSorting: true,
    },
    {
      key: "readTime",
      header: "Read Time",
      cell: (_, row) => (
        <div className="flex items-center gap-1 text-gray-600">
          <IconClock size={14} />
          <span>{row.readTime} min</span>
        </div>
      ),
      align: "center",
      enableSorting: true,
    },
    {
      key: "engagement",
      header: "Engagement",
      cell: (_, row) => (
        <div className="flex items-center gap-3 text-gray-600">
          <div className="flex items-center gap-1 text-sm">
            <IconHeart size={14} />
            <span>{row.likeCount}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <IconMessage size={14} />
            <span>{row.commentCount}</span>
          </div>
        </div>
      ),
      align: "center",
    },
    {
      key: "tags",
      header: "Tags",
      cell: (_, row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.tags.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {row.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{row.tags.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
  ];

  // Table actions configuration
  const blogActions: TableAction<BlogPost>[] = [
    {
      type: "view",
      label: "View Post",
      icon: <IconEye className="size-4" />,
      onClick: (blog) => {
        setSelectedBlog(blog);
        setIsViewDialogOpen(true);
      },
    },
    {
      type: "custom",
      label: (blog) => (blog.isFeatured ? "Remove Featured" : "Make Featured"),
      icon: (blog) =>
        blog.isFeatured ? (
          <IconStarFilled className="size-4" />
        ) : (
          <IconStar className="size-4" />
        ),
      onClick: (blog) => handleToggleFeatured(blog.id),
    },
    {
      type: "edit",
      label: "Edit Post",
      icon: <IconEdit className="size-4" />,
      onClick: (blog) => {
        setSelectedBlog(blog);
        setIsEditDialogOpen(true);
      },
    },
    {
      type: "delete",
      label: "Delete Post",
      icon: <IconTrash className="size-4" />,
      onClick: (blog) => handleDeleteBlog(blog.id),
    },
  ];

  // Grid View Component
  const BlogGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBlogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
        >
          {/* Blog Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              <Badge
                variant="outline"
                className={`${getStatusColor(
                  blog.isPublished,
                  blog.isFeatured
                )}`}
              >
                {blog.isFeatured
                  ? "Featured"
                  : blog.isPublished
                  ? "Published"
                  : "Draft"}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex flex-wrap gap-1 mb-2">
              {blog.categories.slice(0, 2).map((cat) => (
                <Badge key={cat.id} variant="secondary" className="text-xs">
                  {cat.name}
                </Badge>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {blog.excerpt}
            </p>

            {/* Author & Date */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  {blog.author.name.charAt(0)}
                </div>
                <span>{blog.author.name}</span>
              </div>
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <IconClock size={14} />
                  <span>{blog.readTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconEye size={14} />
                  <span>{blog.viewCount}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IconMessage size={14} />
                <span>{blog.commentCount}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setSelectedBlog(blog);
                  setIsEditDialogOpen(true);
                }}
              >
                <IconEdit size={16} />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleTogglePublish(blog.id)}
              >
                {blog.isPublished ? "Unpublish" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-white!">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Section Cards */}
              <SectionCards cards={blogStatsCards} layout="1x4" />

              {/* Blog Table Section */}
              <div className="px-4 lg:px-6">
                <div className="bg-white rounded-lg border border-gray-200">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                          Blog Posts
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Manage your blog content, analytics, and engagement
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tabs
                          value={viewMode}
                          onValueChange={(v) => setViewMode(v as any)}
                        >
                          <TabsList>
                            <TabsTrigger value="list">
                              <IconList size={18} />
                              <span className="hidden sm:inline ml-2">
                                List
                              </span>
                            </TabsTrigger>
                            <TabsTrigger value="grid">
                              <IconLayoutGrid size={18} />
                              <span className="hidden sm:inline ml-2">
                                Grid
                              </span>
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <Button
                          onClick={() => setIsCreateDialogOpen(true)}
                          className="bg-primary"
                        >
                          <IconPlus size={20} />
                          New Post
                        </Button>
                      </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="relative flex-1 max-w-md">
                        <IconSearch
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          placeholder="Search posts, authors, or keywords..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Select
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          value={categoryFilter}
                          onValueChange={setCategoryFilter}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.slug}>
                                {cat.name} ({cat.count})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select defaultValue="newest">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="views">Most Views</SelectItem>
                            <SelectItem value="likes">Most Likes</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button variant="outline" size="sm">
                          <IconFilter size={18} />
                          More Filters
                        </Button>

                        <Button variant="outline" size="sm">
                          <IconDownload size={18} />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {viewMode === "list" ? (
                      <DataTable
                        data={filteredBlogs}
                        fields={blogFields}
                        actions={blogActions}
                        enableSelection={true}
                        enablePagination={true}
                        pageSize={10}
                        onRowClick={(blog) => {
                          setSelectedBlog(blog);
                          setIsViewDialogOpen(true);
                        }}
                      />
                    ) : (
                      <BlogGridView />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Dialogs */}
      <BlogCreateSheet
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateBlog}
      />

      {selectedBlog && (
        <>
          <BlogEditSheet
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            blog={selectedBlog}
            onSubmit={handleEditBlog}
          />
          <BlogViewSheet
            open={isViewDialogOpen}
            onOpenChange={setIsViewDialogOpen}
            blog={selectedBlog}
          />
        </>
      )}
    </SidebarProvider>
  );
}
