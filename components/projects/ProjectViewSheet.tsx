"use client"

import {
  IconExternalLink,
  IconCalendar,
  IconUsers,
  IconClock,
  IconMapPin,
  IconBrandGithub,
  IconStar,
  IconTrendingUp,
  IconCode,
  IconLighter,
  IconTarget,
  IconCheck,
  IconAlertTriangle,
  IconBuilding,
  IconGlobe,
  IconDatabase,
  IconCloud,
  IconDeviceMobile,
  IconBrain,
  IconInfoCircle,
} from "@tabler/icons-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Button from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Project } from "@/app/admin/dashboard/projects/page"

interface ProjectViewSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project
  onEdit?: () => void
}

export function ProjectViewSheet({
  open,
  onOpenChange,
  project,
  onEdit,
}: ProjectViewSheetProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: <IconCheck size={14} />,
          label: "Completed"
        }
      case "in-progress":
        return {
          color: "bg-blue-500",
          textColor: "text-blue-700",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          icon: <IconClock size={14} />,
          label: "In Progress"
        }
      case "upcoming":
        return {
          color: "bg-orange-500",
          textColor: "text-orange-700",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          icon: <IconCalendar size={14} />,
          label: "Upcoming"
        }
      case "planning":
        return {
          color: "bg-purple-500",
          textColor: "text-purple-700",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          icon: <IconTarget size={14} />,
          label: "Planning"
        }
      default:
        return {
          color: "bg-gray-500",
          textColor: "text-gray-700",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          icon: <IconInfoCircle size={14} />,
          label: "Unknown"
        }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <IconGlobe size={16} className="text-blue-600" />
      case "web-app":
        return <IconGlobe size={16} className="text-indigo-600" />
      case "mobile":
        return <IconDeviceMobile size={16} className="text-purple-600" />
      case "ecommerce":
        return <IconTrendingUp size={16} className="text-green-600" />
      case "dashboard":
        return <IconDatabase size={16} className="text-orange-600" />
      case "ai-ml":
        return <IconBrain size={16} className="text-red-600" />
      default:
        return <IconCode size={16} className="text-gray-600" />
    }
  }

  const getCategoryLabel = (category: string) => {
    return category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())
  }

  const statusConfig = getStatusConfig(project.status)
  const hasChallenges = project.challenges && project.challenges.filter(c => c.trim()).length > 0
  const hasSolutions = project.solutions && project.solutions.filter(s => s.trim()).length > 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} border capitalize flex items-center gap-1.5`}
                >
                  {statusConfig.icon}
                  {statusConfig.label}
                </Badge>
                {project.featured && (
                  <Badge 
                    variant="outline" 
                    className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1.5"
                  >
                    <IconStar size={14} />
                    Featured
                  </Badge>
                )}
              </div>
              <SheetTitle className="text-2xl font-bold mb-2 break-words">
                {project.title}
              </SheetTitle>
              <SheetDescription className="text-base text-gray-600 leading-relaxed">
                {project.description}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] px-6 py-4">
          <div className="space-y-6">
            {/* Project Stats */}
            <Card className="overflow-hidden shadow-none">
              <CardContent className="p-4 shadow-none">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.client && (
                    <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full mb-2">
                        <IconBuilding size={18} className="text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Client</p>
                      <p className="text-sm font-semibold text-gray-800 truncate w-full">
                        {project.client}
                      </p>
                    </div>
                  )}
                  
                  {project.duration && (
                    <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full mb-2">
                        <IconClock size={18} className="text-green-600" />
                      </div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Duration</p>
                      <p className="text-sm font-semibold text-gray-800">{project.duration}</p>
                    </div>
                  )}
                  
                  {project.teamSize && (
                    <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-full mb-2">
                        <IconUsers size={18} className="text-purple-600" />
                      </div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Team Size</p>
                      <p className="text-sm font-semibold text-gray-800">{project.teamSize}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center text-center p-3 bg-orange-50 rounded-lg">
                    <div className="p-2 bg-orange-100 rounded-full mb-2">
                      {getCategoryIcon(project.category)}
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Category</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {getCategoryLabel(project.category)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Information */}
            {(project.launchDate || project.timeline || project.location) && (
              <Card className="shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <IconCalendar size={18} className="text-gray-600" />
                    Timeline & Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.launchDate && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 font-medium">Launch Date</p>
                        <div className="flex items-center gap-2">
                          <IconCalendar size={14} className="text-gray-400" />
                          <p className="text-sm font-medium">
                            {new Date(project.launchDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {project.timeline && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 font-medium">Timeline</p>
                        <div className="flex items-center gap-2">
                          <IconClock size={14} className="text-gray-400" />
                          <p className="text-sm font-medium">{project.timeline}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.location && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 font-medium">Location</p>
                        <div className="flex items-center gap-2">
                          <IconMapPin size={14} className="text-gray-400" />
                          <p className="text-sm font-medium">{project.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Full Description */}
            {project.fullDescription && (
              <Card className="shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <IconLighter size={18} className="text-blue-600" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {project.fullDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <Card className="shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <IconCode size={18} className="text-purple-600" />
                    Technologies Stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.filter(f => f.trim()).length > 0 && (
              <Card className="shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <IconTarget size={18} className="text-green-600" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-3">
                    {project.keyFeatures.filter(f => f.trim()).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-medium mt-0.5 shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Challenges & Solutions */}
            {(hasChallenges || hasSolutions) && (
              <div className="space-y-4">
                {hasChallenges && (
                  <Card className="border-l-4 border-l-orange-500 shadow-none">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center gap-2 text-orange-700">
                        <IconAlertTriangle size={18} />
                        Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {project.challenges!.filter(c => c.trim()).map((challenge, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                            <p className="text-sm text-gray-600 leading-relaxed">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {hasSolutions && (
                  <Card className="border-l-4 border-l-blue-500 shadow-none">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center gap-2 text-blue-700">
                        <IconCheck size={18} />
                        Solutions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {project.solutions!.filter(s => s.trim()).map((solution, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                            <p className="text-sm text-gray-600 leading-relaxed">{solution}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Impact & Results */}
            {project.impact && project.impact.filter(i => i.trim()).length > 0 && (
              <Card className="shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <IconTrendingUp size={18} className="text-green-600" />
                    Impact & Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-3">
                    {project.impact.filter(i => i.trim()).map((result, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-medium shrink-0">
                          ✓
                        </div>
                        <p className="text-sm text-gray-700">{result}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stack Explanation */}
            {project.stackExplanation && (
              <Card className="shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Technology Architecture</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {project.stackExplanation.frontend && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-blue-100 rounded">
                            <IconCode size={16} className="text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800">Frontend</h4>
                        </div>
                        <p className="text-sm text-gray-600">{project.stackExplanation.frontend}</p>
                      </div>
                    )}
                    
                    {project.stackExplanation.backend && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-green-100 rounded">
                            <IconDatabase size={16} className="text-green-600" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800">Backend</h4>
                        </div>
                        <p className="text-sm text-gray-600">{project.stackExplanation.backend}</p>
                      </div>
                    )}
                    
                    {project.stackExplanation.infrastructure && (
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-orange-100 rounded">
                            <IconCloud size={16} className="text-orange-600" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800">Infrastructure</h4>
                        </div>
                        <p className="text-sm text-gray-600">{project.stackExplanation.infrastructure}</p>
                      </div>
                    )}
                    
                    {project.stackExplanation.mobile && (
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-purple-100 rounded">
                            <IconDeviceMobile size={16} className="text-purple-600" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800">Mobile</h4>
                        </div>
                        <p className="text-sm text-gray-600">{project.stackExplanation.mobile}</p>
                      </div>
                    )}
                    
                    {project.stackExplanation.ai && (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-red-100 rounded">
                            <IconBrain size={16} className="text-red-600" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800">AI/ML</h4>
                        </div>
                        <p className="text-sm text-gray-600">{project.stackExplanation.ai}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Links */}
            {(project.liveUrl || project.githubUrl) && (
              <Card className="shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Project Links</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.liveUrl && (
                      <Button 
                        asChild 
                        className="w-full h-auto py-3 bg-gray-200 hover:bg-gray-300 text-gray-800!"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <IconExternalLink size={18} />
                          <span>View Live Site</span>
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button 
                        variant="outline" 
                        asChild 
                        className="w-full h-auto py-3"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <IconBrandGithub size={18} />
                          <span>View on GitHub</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className="bg-gray-50 shadow-none">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Created</p>
                    <p className="font-medium text-gray-800">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium">Last Updated</p>
                    <p className="font-medium text-gray-800">
                      {new Date(project.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <SheetFooter className="px-6 py-4 border-t">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <IconInfoCircle size={14} />
              <span>Project ID: {project.id.substring(0, 8)}...</span>
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
                  Edit Project
                </Button>
              )}
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}