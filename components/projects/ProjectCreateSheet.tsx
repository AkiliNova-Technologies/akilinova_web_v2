"use client"

import { useState } from "react"
import { IconX, IconPlus, IconInfoCircle, IconCheck, IconAlertCircle } from "@tabler/icons-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Button from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Project } from "@/app/admin/dashboard/projects/page"

interface ProjectCreateSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void
}

export function ProjectCreateSheet({
  open,
  onOpenChange,
  onSubmit,
}: ProjectCreateSheetProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    status: "planning" as Project["status"],
    category: "web" as Project["category"],
    technologies: [] as string[],
    client: "",
    location: "",
    duration: "",
    teamSize: "",
    launchDate: "",
    timeline: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    challenges: [""],
    solutions: [""],
    keyFeatures: [""],
    impact: [""],
    stackExplanation: {
      frontend: "",
      backend: "",
      infrastructure: "",
    },
  })

  const [techInput, setTechInput] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const [requiredFields, setRequiredFields] = useState({
    title: false,
    description: false,
    status: false,
    category: false,
  })

  const validateTab = (tab: string) => {
    const errors = { ...requiredFields }
    
    if (tab === "basic") {
      errors.title = !formData.title.trim()
      errors.description = !formData.description.trim()
      errors.status = !formData.status
      errors.category = !formData.category
    }
    
    setRequiredFields(errors)
    return Object.values(errors).every(error => !error)
  }

  const handleTabChange = (value: string) => {
    if (validateTab(activeTab)) {
      setActiveTab(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateTab(activeTab)) {
      return
    }
    
    onSubmit({
      ...formData,
      challenges: formData.challenges.filter((c) => c.trim() !== ""),
      solutions: formData.solutions.filter((s) => s.trim() !== ""),
      keyFeatures: formData.keyFeatures.filter((f) => f.trim() !== ""),
      impact: formData.impact.filter((i) => i.trim() !== ""),
    })
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      status: "planning",
      category: "web",
      technologies: [],
      client: "",
      location: "",
      duration: "",
      teamSize: "",
      launchDate: "",
      timeline: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      challenges: [""],
      solutions: [""],
      keyFeatures: [""],
      impact: [""],
      stackExplanation: {
        frontend: "",
        backend: "",
        infrastructure: "",
      },
    })
    setActiveTab("basic")
    setRequiredFields({
      title: false,
      description: false,
      status: false,
      category: false,
    })
  }

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  const addListItem = (field: "challenges" | "solutions" | "keyFeatures" | "impact") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    })
  }

  const removeListItem = (
    field: "challenges" | "solutions" | "keyFeatures" | "impact",
    index: number
  ) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    })
  }

  const updateListItem = (
    field: "challenges" | "solutions" | "keyFeatures" | "impact",
    index: number,
    value: string
  ) => {
    const updated = [...formData[field]]
    updated[index] = value
    setFormData({ ...formData, [field]: updated })
  }

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
  )

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
  )

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
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <form onSubmit={handleSubmit}>
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-2xl font-bold">Create New Project</SheetTitle>
                <SheetDescription className="mt-1">
                  Fill in all required fields marked with <span className="text-red-500">*</span>
                </SheetDescription>
              </div>
              <div className="flex items-center gap-2">
                {formData.featured && (
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
                  {requiredFields.title || requiredFields.description || requiredFields.status || requiredFields.category ? (
                    <IconAlertCircle size={14} className="text-red-500" />
                  ) : (
                    <IconCheck size={14} className="text-green-500" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="details">
                  Details
                </TabsTrigger>
                <TabsTrigger value="technical">
                  Technical
                </TabsTrigger>
                <TabsTrigger value="impact">
                  Impact
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[calc(100vh-240px)] px-6 py-4">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6 mt-0">
                <CardSection 
                  title="Project Overview" 
                  description="Basic information about your project"
                  className="shadow-none"
                >
                  <div className="space-y-4">
                    <InputGroup>
                      <FieldLabel htmlFor="title" required tooltip="The main title of your project">
                        Project Title
                      </FieldLabel>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value })
                          setRequiredFields(prev => ({ ...prev, title: !e.target.value.trim() }))
                        }}
                        placeholder="E-Commerce Platform"
                        className={requiredFields.title ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {requiredFields.title && (
                        <p className="text-xs text-red-500">Project title is required</p>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="description" required tooltip="A brief overview (1-2 sentences)">
                        Short Description
                      </FieldLabel>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => {
                          setFormData({ ...formData, description: e.target.value })
                          setRequiredFields(prev => ({ ...prev, description: !e.target.value.trim() }))
                        }}
                        placeholder="A modern e-commerce platform with real-time inventory management"
                        rows={3}
                        className={requiredFields.description ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {requiredFields.description && (
                        <p className="text-xs text-red-500">Short description is required</p>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="fullDescription" tooltip="Detailed project description for portfolio">
                        Full Description
                      </FieldLabel>
                      <Textarea
                        id="fullDescription"
                        value={formData.fullDescription}
                        onChange={(e) =>
                          setFormData({ ...formData, fullDescription: e.target.value })
                        }
                        placeholder="Detailed description including project goals, scope, and outcomes..."
                        rows={4}
                      />
                    </InputGroup>
                  </div>
                </CardSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CardSection title="Project Status & Category" className="shadow-none">
                    <div className="space-y-4">
                      <InputGroup>
                        <FieldLabel htmlFor="status" required>
                          Status
                        </FieldLabel>
                        <Select
                          value={formData.status}
                          onValueChange={(value: Project["status"]) => {
                            setFormData({ ...formData, status: value })
                            setRequiredFields(prev => ({ ...prev, status: !value }))
                          }}
                        >
                          <SelectTrigger 
                            id="status" 
                            className={requiredFields.status ? "border-red-500 w-full" : "w-full"}
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="completed">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                Completed
                              </div>
                            </SelectItem>
                            <SelectItem value="in-progress">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                In Progress
                              </div>
                            </SelectItem>
                            <SelectItem value="upcoming">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                Upcoming
                              </div>
                            </SelectItem>
                            <SelectItem value="planning">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-500" />
                                Planning
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="category" required>
                          Category
                        </FieldLabel>
                        <Select
                          value={formData.category}
                          onValueChange={(value: Project["category"]) => {
                            setFormData({ ...formData, category: value })
                            setRequiredFields(prev => ({ ...prev, category: !value }))
                          }}
                        >
                          <SelectTrigger 
                            id="category" 
                            className={requiredFields.category ? "border-red-500 w-full" : "w-full"}
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">Website</SelectItem>
                            <SelectItem value="web-app">Web Application</SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                            <SelectItem value="ai-ml">AI/ML</SelectItem>
                          </SelectContent>
                        </Select>
                      </InputGroup>
                    </div>
                  </CardSection>

                  <CardSection title="Project Details" className="shadow-none">
                    <div className="space-y-4">
                      <InputGroup>
                        <FieldLabel htmlFor="client">
                          Client / Company
                        </FieldLabel>
                        <Input
                          id="client"
                          value={formData.client}
                          onChange={(e) =>
                            setFormData({ ...formData, client: e.target.value })
                          }
                          placeholder="TechMart Inc."
                        />
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="location">
                          Location
                        </FieldLabel>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="Kenya, Uganda"
                        />
                      </InputGroup>
                    </div>
                  </CardSection>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CardSection title="Timeline & Team" className="shadow-none">
                    <div className="space-y-4">
                      <InputGroup>
                        <FieldLabel htmlFor="duration">
                          Duration
                        </FieldLabel>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({ ...formData, duration: e.target.value })
                          }
                          placeholder="6 Months"
                        />
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="teamSize">
                          Team Size
                        </FieldLabel>
                        <Input
                          id="teamSize"
                          value={formData.teamSize}
                          onChange={(e) =>
                            setFormData({ ...formData, teamSize: e.target.value })
                          }
                          placeholder="8"
                          type="number"
                          min="1"
                        />
                      </InputGroup>
                    </div>
                  </CardSection>

                  <CardSection title="Launch Information" className="shadow-none">
                    <div className="space-y-4">
                      <InputGroup>
                        <FieldLabel htmlFor="launchDate">
                          Launch Date
                        </FieldLabel>
                        <Input
                          id="launchDate"
                          type="date"
                          value={formData.launchDate}
                          onChange={(e) =>
                            setFormData({ ...formData, launchDate: e.target.value })
                          }
                        />
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="timeline">
                          Timeline
                        </FieldLabel>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) =>
                            setFormData({ ...formData, timeline: e.target.value })
                          }
                          placeholder="4 months"
                        />
                      </InputGroup>
                    </div>
                  </CardSection>
                </div>

                <CardSection title="Project Settings" className="shadow-none">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <Label htmlFor="featured" className="font-medium cursor-pointer">
                        Feature this project
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Showcase this project prominently in your portfolio
                      </p>
                    </div>
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked as boolean })
                      }
                      className="h-5 w-5"
                    />
                  </div>
                </CardSection>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6 mt-0">
                <CardSection title="Project Links" className="shadow-none">
                  <div className="space-y-4">
                    <InputGroup>
                      <FieldLabel htmlFor="liveUrl" tooltip="Live URL where the project is deployed">
                        Live URL
                      </FieldLabel>
                      <Input
                        id="liveUrl"
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, liveUrl: e.target.value })
                        }
                        placeholder="https://example.com"
                      />
                    </InputGroup>

                    <InputGroup>
                      <FieldLabel htmlFor="githubUrl" tooltip="GitHub repository URL">
                        GitHub URL
                      </FieldLabel>
                      <Input
                        id="githubUrl"
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, githubUrl: e.target.value })
                        }
                        placeholder="https://github.com/username/repo"
                      />
                    </InputGroup>
                  </div>
                </CardSection>

                <CardSection 
                  title="Technologies Used" 
                  description="Add technologies and frameworks used in this project"
                  className="shadow-none"
                >
                  <InputGroup>
                    <FieldLabel>Add Technologies</FieldLabel>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTechnology()
                          }
                        }}
                        placeholder="React, Node.js, MongoDB..."
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={addTechnology} 
                        variant="outline"
                        className="shrink-0"
                      >
                        <IconPlus size={18} />
                        Add
                      </Button>
                    </div>
                    
                    {formData.technologies.length > 0 ? (
                      <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg">
                        {formData.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1.5 px-3 py-1.5"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(tech)}
                              className="ml-1 hover:text-red-600 transition-colors"
                              aria-label={`Remove ${tech}`}
                            >
                              <IconX size={14} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No technologies added yet. Add some to get started.
                      </div>
                    )}
                  </InputGroup>
                </CardSection>

                <CardSection 
                  title="Key Features" 
                  description="List the main features of your project"
                  className="shadow-none"
                >
                  <div className="space-y-3">
                    {formData.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex gap-2 items-start group">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium mt-1 shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Input
                            value={feature}
                            onChange={(e) =>
                              updateListItem("keyFeatures", index, e.target.value)
                            }
                            placeholder="Describe a key feature..."
                          />
                        </div>
                        {formData.keyFeatures.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeListItem("keyFeatures", index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <IconX size={18} />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addListItem("keyFeatures")}
                      className="w-full"
                    >
                      <IconPlus size={16} className="mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </CardSection>
              </TabsContent>

              {/* Technical Tab */}
              <TabsContent value="technical" className="space-y-6 mt-0">
                <div className="space-y-6">
                  <CardSection 
                    title="Challenges & Solutions" 
                    description="Describe challenges faced and how they were solved"
                    className="shadow-none"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3 text-sm text-muted-foreground">Challenges</h4>
                        <div className="space-y-3">
                          {formData.challenges.map((challenge, index) => (
                            <div key={index} className="flex gap-2 group">
                              <Textarea
                                value={challenge}
                                onChange={(e) =>
                                  updateListItem("challenges", index, e.target.value)
                                }
                                placeholder="Describe a technical or business challenge..."
                                rows={2}
                                className="resize-none"
                              />
                              {formData.challenges.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeListItem("challenges", index)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <IconX size={18} />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addListItem("challenges")}
                            className="w-full"
                          >
                            <IconPlus size={16} className="mr-2" />
                            Add Challenge
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3 text-sm text-muted-foreground">Solutions</h4>
                        <div className="space-y-3">
                          {formData.solutions.map((solution, index) => (
                            <div key={index} className="flex gap-2 group">
                              <Textarea
                                value={solution}
                                onChange={(e) =>
                                  updateListItem("solutions", index, e.target.value)
                                }
                                placeholder="Describe the solution implemented..."
                                rows={2}
                                className="resize-none"
                              />
                              {formData.solutions.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeListItem("solutions", index)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <IconX size={18} />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addListItem("solutions")}
                            className="w-full"
                          >
                            <IconPlus size={16} className="mr-2" />
                            Add Solution
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardSection>

                  <CardSection 
                    title="Technology Stack" 
                    description="Explain your technology choices for each layer"
                    className="shadow-none"
                  >
                    <div className="space-y-4">
                      <InputGroup>
                        <FieldLabel htmlFor="stackFrontend">
                          Frontend Stack
                        </FieldLabel>
                        <Textarea
                          id="stackFrontend"
                          value={formData.stackExplanation.frontend}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stackExplanation: {
                                ...formData.stackExplanation,
                                frontend: e.target.value,
                              },
                            })
                          }
                          placeholder="React with TypeScript, Tailwind CSS for styling, Redux for state management..."
                          rows={3}
                          className="resize-none"
                        />
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="stackBackend">
                          Backend Stack
                        </FieldLabel>
                        <Textarea
                          id="stackBackend"
                          value={formData.stackExplanation.backend}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stackExplanation: {
                                ...formData.stackExplanation,
                                backend: e.target.value,
                              },
                            })
                          }
                          placeholder="Node.js with Express, MongoDB for database, JWT for authentication..."
                          rows={3}
                          className="resize-none"
                        />
                      </InputGroup>

                      <InputGroup>
                        <FieldLabel htmlFor="stackInfrastructure">
                          Infrastructure & DevOps
                        </FieldLabel>
                        <Textarea
                          id="stackInfrastructure"
                          value={formData.stackExplanation.infrastructure}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stackExplanation: {
                                ...formData.stackExplanation,
                                infrastructure: e.target.value,
                              },
                            })
                          }
                          placeholder="Deployed on AWS, using Docker for containerization, GitHub Actions for CI/CD..."
                          rows={3}
                          className="resize-none"
                        />
                      </InputGroup>
                    </div>
                  </CardSection>
                </div>
              </TabsContent>

              {/* Impact Tab */}
              <TabsContent value="impact" className="space-y-6 mt-0">
                <CardSection 
                  title="Impact & Results" 
                  description="Quantify the success and impact of your project"
                  className="shadow-none"
                >
                  <div className="space-y-3">
                    {formData.impact.map((impactItem, index) => (
                      <div key={index} className="flex gap-2 group items-start">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-medium mt-1 shrink-0">
                          ✓
                        </div>
                        <div className="flex-1">
                          <Input
                            value={impactItem}
                            onChange={(e) =>
                              updateListItem("impact", index, e.target.value)
                            }
                            placeholder="e.g., Increased conversion rate by 35%"
                          />
                        </div>
                        {formData.impact.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeListItem("impact", index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <IconX size={18} />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addListItem("impact")}
                      className="w-full"
                    >
                      <IconPlus size={16} className="mr-2" />
                      Add Impact Result
                    </Button>
                  </div>
                </CardSection>
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <SheetFooter className="px-6 py-6 border-t sticky bottom-0 bg-background">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-muted-foreground">
                Tab {["basic", "details", "technical", "impact"].indexOf(activeTab) + 1} of 4
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
                {activeTab !== "impact" ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateTab(activeTab)) {
                        const tabs = ["basic", "details", "technical", "impact"]
                        const nextIndex = tabs.indexOf(activeTab) + 1
                        if (nextIndex < tabs.length) {
                          setActiveTab(tabs[nextIndex])
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
                    Create Project
                  </Button>
                )}
              </div>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}