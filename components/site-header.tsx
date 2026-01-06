"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Button from "./ui/button"

// Map of routes to display names
const routeNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/blogs": "Blogs",
  "/leads": "Leads",
  "/appointments": "Appointments",
  "/kanban": "Kanban Board",
  "/contacts": "Contact Forms",
  "/faqs": "FAQs",
  "/messages": "Messages",
  "/analytics": "Analytics",
  "/settings": "Settings",
  "/search": "Search",
  "/inbox": "Inbox",
  "/account": "Account",
  "/billing": "Billing",
  "/notifications": "Notifications",
}

// Function to get page name from pathname
function getPageName(pathname: string): string {
  // Remove trailing slash if present
  const cleanPath = pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname

  // Check for exact match first
  if (routeNames[cleanPath]) {
    return routeNames[cleanPath]
  }

  // Check for nested routes (e.g., /projects/123 -> Projects)
  const segments = cleanPath.split("/").filter(Boolean)
  
  if (segments.length > 0) {
    // Try to match the first segment
    const firstSegment = `/${segments[0]}`
    if (routeNames[firstSegment]) {
      // If it's a detail page (has ID), add context
      if (segments.length > 1) {
        // Check if second segment is an ID (number or UUID pattern)
        const secondSegment = segments[1]
        if (/^\d+$/.test(secondSegment) || /^[a-f0-9-]{36}$/i.test(secondSegment)) {
          return `${routeNames[firstSegment]} Details`
        }
        // Otherwise, capitalize the segment
        return `${routeNames[firstSegment]} - ${secondSegment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`
      }
      return routeNames[firstSegment]
    }

    // Fallback: capitalize and format the last segment
    const lastSegment = segments[segments.length - 1]
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return "Dashboard"
}

interface SiteHeaderProps {
  label?: string // Optional: Override automatic detection
}

export function SiteHeader({ label }: SiteHeaderProps) {
  const pathname = usePathname()
  const pageName = label || getPageName(pathname)

  return (
    <header className="flex min-h-16! shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-white ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageName}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}