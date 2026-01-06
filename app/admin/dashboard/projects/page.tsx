"use client";

import { useState } from "react";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDownload,
  IconExternalLink,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Edit, Eye, Trash } from "lucide-react";
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
import { ProjectCreateSheet } from "@/components/projects/ProjectCreateSheet";
import { ProjectEditSheet } from "@/components/projects/ProjectEditSheet";
import { ProjectViewSheet } from "@/components/projects/ProjectViewSheet";

// Project type definition
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  status: "completed" | "in-progress" | "upcoming" | "planning";
  category: "web" | "web-app" | "mobile" | "ecommerce" | "dashboard" | "ai-ml";
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  location?: string;
  duration?: string;
  teamSize?: string;
  launchDate?: string;
  timeline?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  challenges?: string[];
  solutions?: string[];
  keyFeatures?: string[];
  impact?: string[];
  stackExplanation?: {
    frontend?: string;
    backend?: string;
    infrastructure?: string;
    mobile?: string;
    ai?: string;
    security?: string;
  };
  [key: string]: any;
}

// Sample data
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A comprehensive e-commerce solution with advanced inventory management",
    status: "completed",
    category: "ecommerce",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    client: "TechMart Inc.",
    location: "Kenya, Uganda",
    duration: "6 Months",
    teamSize: "8",
    launchDate: "2024-01-15",
    liveUrl: "https://example.com",
    featured: true,
    createdAt: "2023-06-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Healthcare Mobile App",
    description:
      "Telemedicine platform connecting patients with healthcare providers",
    status: "in-progress",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Node.js"],
    client: "MediCare Solutions",
    location: "Ghana",
    duration: "8 Months",
    teamSize: "6",
    launchDate: "2024-02-20",
    featured: false,
    createdAt: "2023-07-10T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "3",
    title: "AI Chat Assistant",
    description:
      "AI-driven virtual assistant for automated customer engagement",
    status: "in-progress",
    category: "ai-ml",
    technologies: ["Python", "FastAPI", "OpenAI API", "PostgreSQL"],
    client: "ChatBot Corp",
    location: "Nigeria",
    duration: "5 Months",
    teamSize: "5",
    launchDate: "2025-04-10",
    liveUrl: "https://example.com",
    featured: true,
    createdAt: "2024-12-05T00:00:00Z",
    updatedAt: "2025-04-10T00:00:00Z",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || project.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Stats
  const stats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    upcoming: projects.filter((p) => p.status === "upcoming").length,
  };

  // Section cards data
  const projectCards: SectionCard[] = [
    {
      title: "Total Projects",
      value: stats.total,
      trend: {
        direction: "up",
        value: "+3",
        label: "New this month",
      },
      footer: {
        primary: "Trending up this month",
        secondary: "Portfolio expanding steadily",
      },
    },
    {
      title: "Completed",
      value: stats.completed,
      trend: {
        direction: "up",
        value: "+5",
        label: "Delivered this quarter",
      },
      footer: {
        primary: "Strong delivery rate",
        secondary: "On track with timeline",
      },
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      trend: {
        direction: "up",
        value: `${stats.inProgress}`,
        label: "Active development",
      },
      footer: {
        primary: "Currently in development",
        secondary: "Multiple projects underway",
      },
    },
    {
      title: "Upcoming",
      value: stats.upcoming,
      trend: {
        direction: "up",
        value: "+2",
        label: "Scheduled soon",
      },
      footer: {
        primary: "Pipeline growing",
        secondary: "New opportunities secured",
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "upcoming":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "planning":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const handleCreateProject = (
    newProject: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    const project: Project = {
      ...newProject,
      id: (projects.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: "",
      description: "",
      status: "completed",
      category: "web",
      technologies: [],
    };
    setProjects([...projects, project]);
    setIsCreateDialogOpen(false);
  };

  const handleEditProject = (updatedProject: Project) => {
    setProjects(
      projects.map((p) =>
        p.id === updatedProject.id
          ? { ...updatedProject, updatedAt: new Date().toISOString() }
          : p
      )
    );
    setIsEditDialogOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== projectId));
    }
  };

  // Table fields configuration
  const projectFields: TableField<Project>[] = [
    {
      key: "title",
      header: "Project Name",
      cell: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {row.title.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.title}</div>
            <div className="text-sm text-gray-500 line-clamp-1">
              {row.description}
            </div>
          </div>
        </div>
      ),
      enableSorting: true,
    },
    {
      key: "category",
      header: "Category",
      cell: (_, row) => (
        <Badge variant="outline" className="capitalize">
          {row.category.replace("-", " ")}
        </Badge>
      ),
      align: "center",
      enableSorting: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (_, row) => (
        <Badge
          variant="outline"
          className={`capitalize ${getStatusColor(row.status)}`}
        >
          {row.status.replace("-", " ")}
        </Badge>
      ),
      align: "center",
      enableSorting: true,
    },
    {
      key: "client",
      header: "Client",
      cell: (_, row) => (
        <span className="text-gray-600">{row.client || "N/A"}</span>
      ),
      enableSorting: true,
    },
    {
      key: "duration",
      header: "Duration",
      cell: (_, row) => (
        <span className="text-gray-600">{row.duration || "N/A"}</span>
      ),
      align: "center",
    },
    {
      key: "teamSize",
      header: "Team",
      cell: (_, row) => (
        <span className="text-gray-600">
          {row.teamSize ? `${row.teamSize} members` : "N/A"}
        </span>
      ),
      align: "center",
    },
    {
      key: "technologies",
      header: "Technologies",
      cell: (_, row) => (
        <div className="flex flex-wrap gap-1">
          {row.technologies.slice(0, 2).map((tech, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {row.technologies.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{row.technologies.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
  ];

  // Table actions configuration
  const projectActions: TableAction<Project>[] = [
    {
      type: "view",
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (project) => {
        setSelectedProject(project);
        setIsViewDialogOpen(true);
      },
    },
    {
      type: "edit",
      label: "Edit Project",
      icon: <Edit className="size-4" />,
      onClick: (project) => {
        setSelectedProject(project);
        setIsEditDialogOpen(true);
      },
    },
    {
      type: "delete",
      label: "Delete Project",
      icon: <Trash className="size-4" />,
      onClick: (project) => handleDeleteProject(project.id),
    },
  ];

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
              <SectionCards cards={projectCards} layout="1x4" />

              {/* Projects Table Section */}
              <div className="px-4 lg:px-6">
                <div className="bg-white rounded-lg border border-gray-200">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                          All Projects
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Manage your portfolio projects and showcase your work
                        </p>
                      </div>
                      <Button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="bg-primary"
                      >
                        <IconPlus size={20} />
                        New Project
                      </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="relative flex-1 max-w-md">
                        <IconSearch
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          placeholder="Search projects..."
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
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="planning">Planning</SelectItem>
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
                            <SelectItem value="web">Website</SelectItem>
                            <SelectItem value="web-app">Web App</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="ecommerce">
                              E-commerce
                            </SelectItem>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                            <SelectItem value="ai-ml">AI/ML</SelectItem>
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

                  {/* Data Table */}
                  <div className="p-6">
                    <DataTable
                      data={filteredProjects}
                      fields={projectFields}
                      actions={projectActions}
                      enableSelection={true}
                      enablePagination={true}
                      pageSize={10}
                      onRowClick={(project) => {
                        setSelectedProject(project);
                        setIsViewDialogOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Dialogs */}
      <ProjectCreateSheet
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProject}
      />

      {selectedProject && (
        <>
          <ProjectEditSheet
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            project={selectedProject}
            onSubmit={handleEditProject}
          />
          <ProjectViewSheet
            open={isViewDialogOpen}
            onOpenChange={setIsViewDialogOpen}
            project={selectedProject}
          />
        </>
      )}
    </SidebarProvider>
  );
}
