"use client"

import * as React from "react"
import {
  IconBriefcase,
  IconCalendar,
  IconChartBar,
  IconDashboard,
  IconFileText,
  IconHelp,
  IconInnerShadowTop,
  IconLayoutKanban,
  IconMail,
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "admin@yourcompany.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Projects",
      url: "/admin/dashboard/projects",
      icon: IconBriefcase,
    },
    {
      title: "Blogs",
      url: "/admin/dashboard/blogs",
      icon: IconFileText,
    },
    {
      title: "Leads",
      url: "/admin/dashboard/leads",
      icon: IconUsers,
    },
    {
      title: "Calendar",
      url: "/admin/dashboard/calendar",
      icon: IconCalendar,
    },
    {
      title: "Kanban",
      url: "/admin/dashboard/kanban",
      icon: IconLayoutKanban,
    },
  ],
  navSecondary: [
    {
      title: "Analytics",
      url: "/admin/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Settings",
      url: "/admin/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Search",
      url: "/admin/dashboard/search",
      icon: IconSearch,
    },
  ],
  cmsItems: [
    {
      name: "Contact Forms",
      url: "/admin/dashboard/contacts",
      icon: IconMail,
    },
    {
      name: "FAQs",
      url: "/admin/dashboard/faqs",
      icon: IconHelp,
    },
    {
      name: "Messages",
      url: "/admin/dashboard/messages",
      icon: IconMessageCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Akilinova Hub</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.cmsItems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}