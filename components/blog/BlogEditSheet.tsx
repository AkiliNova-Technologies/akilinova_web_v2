"use client";

import { useState } from "react";
import { IconX, IconPlus, IconInfoCircle, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { BlogPost } from "@/types/blog";

interface BlogEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: BlogPost;
  onSubmit: (blog: BlogPost) => void; 
}

const sampleCategories = [
  { id: "1", name: "React", slug: "react" },
  { id: "2", name: "TypeScript", slug: "typescript" },
  { id: "3", name: "Node.js", slug: "nodejs" },
  { id: "4", name: "Frontend", slug: "frontend" },
  { id: "5", name: "Backend", slug: "backend" },
  { id: "6", name: "AI/ML", slug: "ai-ml" },
  { id: "7", name: "DevOps", slug: "devops" },
  { id: "8", name: "Web Development", slug: "web-development" },
];

const sampleTags = [
  "React", "TypeScript", "JavaScript", "Next.js", "Node.js",
  "Python", "AI", "Machine Learning", "Web Development",
  "Frontend", "Backend", "Database", "Performance", "Security"
];

export function BlogEditSheet({
  open,
  onOpenChange,
  onSubmit,
}: BlogEditSheetProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: {
      name: "",
      avatar: "",
      role: "",
    },
    categories: [] as Array<{ id: string; name: string; slug: string }>,
    tags: [] as string[],
    readTime: 5,
    publishedAt: new Date().toISOString().split('T')[0],
    isPublished: false,
    isFeatured: false,
    metaDescription: "",
    metaKeywords: [] as string[],
    allowComments: true,
    canonicalUrl: "",
    seoTitle: "",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [requiredFields, setRequiredFields] = useState({
    title: false,
    slug: false,
    excerpt: false,
    content: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  const validateTab = (tab: string) => {
    const errors = { ...requiredFields };
    
    if (tab === "basic") {
      errors.title = !formData.title.trim();
      errors.slug = !formData.slug.trim();
      errors.excerpt = !formData.excerpt.trim();
    }
    
    setRequiredFields(errors);
    return Object.values(errors).every(error => !error);
  };

  const handleTabChange = (value: string) => {
    if (validateTab(activeTab)) {
      setActiveTab(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTab(activeTab)) {
      return;
    }
    
    onSubmit({
        ...formData,
        author: {
            id: "1",
            name: formData.author.name || "Admin",
            avatar: formData.author.avatar,
            role: formData.author.role || "Author",
        },
        categories: formData.categories,
        tags: formData.tags,
        metaKeywords: formData.metaKeywords,
        id: "",
        updatedAt: "",
        viewCount: 0,
        likeCount: 0,
        commentCount: 0
    });
    
    // Reset form
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      author: {
        name: "",
        avatar: "",
        role: "",
      },
      categories: [],
      tags: [],
      readTime: 5,
      publishedAt: new Date().toISOString().split('T')[0],
      isPublished: false,
      isFeatured: false,
      metaDescription: "",
      metaKeywords: [],
      allowComments: true,
      canonicalUrl: "",
      seoTitle: "",
    });
    setActiveTab("basic");
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.metaKeywords.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        metaKeywords: [...formData.metaKeywords, keywordInput.trim()],
      });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      metaKeywords: formData.metaKeywords.filter((k) => k !== keyword),
    });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, slug });
  };

  const FieldLabel = ({ 
    htmlFor, 
    children, 
    required = false,
    tooltip 
  }: { 
    htmlFor?: string; 
    children: React.ReactNode; 
    required?: boolean;
    tooltip?: string;
  }) => (
    <div className="flex items-center gap-1 mb-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {children} {required && <span className="text-red-500">*</span>}
      </Label>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IconInfoCircle size={14} className="text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );

  const InputGroup = ({ 
    children, 
    className = "" 
  }: { 
    children: React.ReactNode; 
    className?: string;
  }) => (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );

  const CardSection = ({ 
    title, 
    description, 
    children, 
    className = "" 
  }: { 
    title: string; 
    description?: string; 
    children: React.ReactNode; 
    className?: string;
  }) => (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="space-y-1 mb-4">
          <h3 className="font-semibold text-base">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <form onSubmit={handleSubmit}>
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-2xl font-bold">Edit Blog Post</SheetTitle>
                <SheetDescription className="mt-1">
                  Edit blog post with SEO optimization and rich content
                </SheetDescription>
              </div>
              <div className="flex items-center gap-2">
                {formData.isFeatured && (
                  <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <IconCheck size={12} className="mr-1" /> Featured
                  </Badge>
                )}
              </div>
            </div>
          </SheetHeader>

          <div className="px-6 py-4 border-b">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  Basic
                  {requiredFields.title || requiredFields.slug || requiredFields.excerpt ? (
                    <IconAlertCircle size={14} className="text-red-500" />
                  ) : (
                    <IconCheck size={14} className="text-green-500" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="content">
                  Content
                </TabsTrigger>
                <TabsTrigger value="seo">
                  SEO
                </TabsTrigger>
                <TabsTrigger value="settings">
                  Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[calc(100vh-240px)] px-6 py-4">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6 mt-0">
                <CardSection 
                  title="Post Information" 
                  description="Basic details about your blog post"
                >
                  <div className="space-y-4">
                    <InputGroup>
                      <FieldLabel htmlFor="title" required tooltip="The main title of your blog post">
                        Post Title
                      </FieldLabel>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value });
                          setRequiredFields(prev => ({ ...prev, title: !e.target.value.trim() }));
                        }}
                        placeholder="Getting Started with React 18"
                        className={requiredFields.title ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {requiredFields.title && (
                        <p className="text-xs text-red-500">Post title is required</p>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="slug" required tooltip="URL-friendly version of your title">
                          URL Slug
                        </FieldLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateSlug}
                        >
                          Generate from title
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => {
                              setFormData({ ...formData, slug: e.target.value });
                              setRequiredFields(prev => ({ ...prev, slug: !e.target.value.trim() }));
                            }}
                            placeholder="getting-started-with-react-18"
                            className={requiredFields.slug ? "border-red-500 focus-visible:ring-red-500" : ""}
                          />
                        </div>
                      </div>
                      {requiredFields.slug && (
                        <p className="text-xs text-red-500">URL slug is required</p>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="excerpt" required tooltip="Brief summary that appears in blog listings">
                        Excerpt
                      </FieldLabel>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => {
                          setFormData({ ...formData, excerpt: e.target.value });
                          setRequiredFields(prev => ({ ...prev, excerpt: !e.target.value.trim() }));
                        }}
                        placeholder="A brief summary of your blog post (1-2 sentences)"
                        rows={3}
                        className={requiredFields.excerpt ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {requiredFields.excerpt && (
                        <p className="text-xs text-red-500">Excerpt is required</p>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="featuredImage" tooltip="Main image that represents your blog post">
                        Featured Image URL
                      </FieldLabel>
                      <Input
                        id="featuredImage"
                        value={formData.featuredImage}
                        onChange={(e) =>
                          setFormData({ ...formData, featuredImage: e.target.value })
                        }
                        placeholder="https://example.com/image.jpg"
                        type="url"
                      />
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="readTime">
                        Estimated Read Time (minutes)
                      </FieldLabel>
                      <Input
                        id="readTime"
                        type="number"
                        min="1"
                        value={formData.readTime}
                        onChange={(e) =>
                          setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })
                        }
                        placeholder="5"
                      />
                    </InputGroup>
                  </div>
                </CardSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CardSection title="Author Information">
                    <div className="space-y-4">
                      <InputGroup>
                        <FieldLabel htmlFor="authorName">
                          Author Name
                        </FieldLabel>
                        <Input
                          id="authorName"
                          value={formData.author.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              author: { ...formData.author, name: e.target.value },
                            })
                          }
                          placeholder="John Doe"
                        />
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="authorRole">
                          Author Role
                        </FieldLabel>
                        <Input
                          id="authorRole"
                          value={formData.author.role}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              author: { ...formData.author, role: e.target.value },
                            })
                          }
                          placeholder="Senior Developer"
                        />
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="authorAvatar">
                          Author Avatar URL
                        </FieldLabel>
                        <Input
                          id="authorAvatar"
                          value={formData.author.avatar}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              author: { ...formData.author, avatar: e.target.value },
                            })
                          }
                          placeholder="https://example.com/avatar.jpg"
                          type="url"
                        />
                      </InputGroup>
                    </div>
                  </CardSection>

                  <CardSection title="Publish Date">
                    <div className="space-y-4">
                      <InputGroup>
                        <FieldLabel htmlFor="publishedAt">
                          Publish Date
                        </FieldLabel>
                        <Input
                          id="publishedAt"
                          type="date"
                          value={formData.publishedAt}
                          onChange={(e) =>
                            setFormData({ ...formData, publishedAt: e.target.value })
                          }
                        />
                      </InputGroup>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="space-y-1">
                          <Label htmlFor="publishNow" className="font-medium cursor-pointer">
                            Publish Now
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Make this post publicly available immediately
                          </p>
                        </div>
                        <Checkbox
                          id="publishNow"
                          checked={formData.isPublished}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, isPublished: checked as boolean })
                          }
                          className="h-5 w-5"
                        />
                      </div>
                    </div>
                  </CardSection>
                </div>

                <CardSection title="Categories & Tags">
                  <div className="space-y-4">
                    <InputGroup>
                      <FieldLabel>Categories</FieldLabel>
                      <Select
                        onValueChange={(value) => {
                          const category = sampleCategories.find(c => c.id === value);
                          if (category && !formData.categories.some(c => c.id === category.id)) {
                            setFormData({
                              ...formData,
                              categories: [...formData.categories, category],
                            });
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select categories" />
                        </SelectTrigger>
                        <SelectContent>
                          {sampleCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.categories.map((category) => (
                            <Badge
                              key={category.id}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {category.name}
                              <button
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    categories: formData.categories.filter((c) => c.id !== category.id),
                                  })
                                }
                                className="ml-1 hover:text-red-600"
                              >
                                <IconX size={14} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel>Tags</FieldLabel>
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="Add tags (e.g., React, TypeScript)"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                        />
                        <Button type="button" onClick={addTag} size="sm">
                          <IconPlus size={18} />
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-red-600"
                              >
                                <IconX size={14} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </InputGroup>
                  </div>
                </CardSection>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6 mt-0">
                <CardSection 
                  title="Blog Content" 
                  description="Write your blog post content using rich text editor"
                >
                  <InputGroup>
                    <FieldLabel htmlFor="content" required>
                      Content
                    </FieldLabel>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => {
                        setFormData({ ...formData, content: e.target.value });
                        setRequiredFields(prev => ({ ...prev, content: !e.target.value.trim() }));
                      }}
                      placeholder="Start writing your blog post here..."
                      rows={20}
                      className="font-mono text-sm"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formData.content.length} characters</span>
                      <span>Markdown supported</span>
                    </div>
                  </InputGroup>
                </CardSection>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6 mt-0">
                <CardSection 
                  title="Search Engine Optimization" 
                  description="Optimize your post for search engines"
                >
                  <div className="space-y-4">
                    <InputGroup>
                      <FieldLabel htmlFor="seoTitle" tooltip="Custom title for search engines (optional)">
                        SEO Title
                      </FieldLabel>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, seoTitle: e.target.value })
                        }
                        placeholder="Optimized title for search engines"
                      />
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="metaDescription" tooltip="Description shown in search results">
                        Meta Description
                      </FieldLabel>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) =>
                          setFormData({ ...formData, metaDescription: e.target.value })
                        }
                        placeholder="A compelling description for search engines"
                        rows={3}
                      />
                      <div className="text-xs text-muted-foreground">
                        Recommended: 150-160 characters
                      </div>
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="canonicalUrl" tooltip="Original URL if this content is republished">
                        Canonical URL
                      </FieldLabel>
                      <Input
                        id="canonicalUrl"
                        value={formData.canonicalUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, canonicalUrl: e.target.value })
                        }
                        placeholder="https://example.com/original-post"
                        type="url"
                      />
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel>Keywords</FieldLabel>
                      <div className="flex gap-2">
                        <Input
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          placeholder="Add SEO keywords"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addKeyword();
                            }
                          }}
                        />
                        <Button type="button" onClick={addKeyword} size="sm">
                          <IconPlus size={18} />
                        </Button>
                      </div>
                      {formData.metaKeywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.metaKeywords.map((keyword) => (
                            <Badge
                              key={keyword}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {keyword}
                              <button
                                type="button"
                                onClick={() => removeKeyword(keyword)}
                                className="ml-1 hover:text-red-600"
                              >
                                <IconX size={14} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </InputGroup>
                  </div>
                </CardSection>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6 mt-0">
                <CardSection title="Post Settings">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <Label htmlFor="featured" className="font-medium cursor-pointer">
                          Feature this post
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Showcase this post prominently on your blog
                        </p>
                      </div>
                      <Checkbox
                        id="featured"
                        checked={formData.isFeatured}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isFeatured: checked as boolean })
                        }
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <Label htmlFor="allowComments" className="font-medium cursor-pointer">
                          Allow Comments
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable readers to leave comments on this post
                        </p>
                      </div>
                      <Checkbox
                        id="allowComments"
                        checked={formData.allowComments}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, allowComments: checked as boolean })
                        }
                        className="h-5 w-5"
                      />
                    </div>
                  </div>
                </CardSection>
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <SheetFooter className="px-6 py-4 border-t sticky bottom-0 bg-background">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-muted-foreground">
                Tab {["basic", "content", "seo", "settings"].indexOf(activeTab) + 1} of 4
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="px-6"
                >
                  Cancel
                </Button>
                {activeTab !== "settings" ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateTab(activeTab)) {
                        const tabs = ["basic", "content", "seo", "settings"];
                        const nextIndex = tabs.indexOf(activeTab) + 1;
                        if (nextIndex < tabs.length) {
                          setActiveTab(tabs[nextIndex]);
                        }
                      }
                    }}
                    className="px-6"
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="px-6 bg-primary hover:bg-primary/90"
                  >
                    Create Post
                  </Button>
                )}
              </div>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
