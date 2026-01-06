"use client";

import { useState } from "react";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDownload,
  IconTrendingUp,
  IconUsers,
  IconCheck,
  IconClock,
  IconAlertCircle,
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
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Task, Column } from "@/types/kanban";

export default function KanbanDashboardPage() {
  const [activeTab, setActiveTab] = useState("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Stats
  const stats = {
    totalTasks: 24,
    completedTasks: 8,
    inProgressTasks: 6,
    overdueTasks: 2,
    totalStoryPoints: 42,
    completedStoryPoints: 18,
    teamCapacity: 85, // percentage
  };

  // Section cards data
  const kanbanStatsCards: SectionCard[] = [
    {
      title: "Total Tasks",
      value: stats.totalTasks.toString(),
      trend: {
        direction: "up",
        value: "+4",
        label: "This week",
      },
      icon: <IconCheck className="size-5" />,

      footer: {
        primary: `${stats.completedTasks} completed`,
        secondary: `${stats.inProgressTasks} in progress`,
      },
    },
    {
      title: "Story Points",
      value: stats.totalStoryPoints.toString(),
      trend: {
        direction: "up",
        value: "+12",
        label: "This sprint",
      },
      icon: <IconTrendingUp className="size-5" />,

      footer: {
        primary: `${stats.completedStoryPoints} completed`,
        secondary: "Burndown on track",
      },
    },
    {
      title: "Team Capacity",
      value: `${stats.teamCapacity}%`,
      trend: {
        direction: "up",
        value: "+5%",
        label: "Utilization",
      },
      icon: <IconUsers className="size-5" />,

      footer: {
        primary: "Optimal utilization",
        secondary: "2 members available",
      },
    },
    {
      title: "Overdue Tasks",
      value: stats.overdueTasks.toString(),
      trend: {
        direction: "down",
        value: "-1",
        label: "From yesterday",
      },
      icon: <IconAlertCircle className="size-5" />,

      footer: {
        primary: "Need attention",
        secondary: "Review required",
      },
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
              {/* <SectionCards cards={kanbanStatsCards} layout="1x4" /> */}

              {/* Main Kanban Board */}
              <div className="px-4 lg:px-6">
                <Card className="border-gray-200 rounded-xs">
                  <CardHeader className="border-b pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-xl">Kanban Board</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          Visual task management with drag and drop
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-3 sm:mt-0">
                        <Tabs
                          value={activeTab}
                          onValueChange={setActiveTab}
                          className="w-full sm:w-auto"
                        >
                          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex">
                            <TabsTrigger value="board">Board View</TabsTrigger>
                            <TabsTrigger value="list">List View</TabsTrigger>
                            <TabsTrigger value="analytics">
                              Analytics
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <Button className="bg-primary">
                          <IconPlus size={20} />
                          New Project
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <Tabs value={activeTab} className="w-full">
                      {/* Board View */}
                      <TabsContent value="board" className="m-0">
                        <div className="p-4">
                          {/* Search and Filters */}
                          <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1 max-w-md">
                              <IconSearch
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                              />
                              <Input
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Select
                                value={filterStatus}
                                onValueChange={setFilterStatus}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">
                                    All Status
                                  </SelectItem>
                                  <SelectItem value="todo">To Do</SelectItem>
                                  <SelectItem value="progress">
                                    In Progress
                                  </SelectItem>
                                  <SelectItem value="review">Review</SelectItem>
                                  <SelectItem value="done">Done</SelectItem>
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

                          {/* Kanban Board Component */}
                          <KanbanBoard
                            className="border-0 p-0"
                            onTaskCreate={(task) =>
                              console.log("Task created:", task)
                            }
                            onTaskUpdate={(task) =>
                              console.log("Task updated:", task)
                            }
                            onTaskDelete={(taskId) =>
                              console.log("Task deleted:", taskId)
                            }
                          />
                        </div>
                      </TabsContent>

                      {/* List View */}
                      <TabsContent value="list" className="m-0">
                        <div className="p-6">
                          <div className="text-center py-12 text-gray-500">
                            <div className="text-lg font-medium mb-2">
                              List View
                            </div>
                            <p>Task list view coming soon...</p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Analytics View */}
                      <TabsContent value="analytics" className="m-0">
                        <div className="p-6">
                          <div className="text-center py-12 text-gray-500">
                            <div className="text-lg font-medium mb-2">
                              Analytics Dashboard
                            </div>
                            <p>Advanced analytics and reports coming soon...</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
