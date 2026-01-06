"use client";

import { useState } from "react";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDownload,
  IconTrendingUp,
  IconCalendar,
  IconClock,
  IconUsers,
  IconCheck,
  IconX,
  IconEdit,
  IconEye,
  IconTrash,
  IconExternalLink,
  IconStar,
  IconStarFilled,
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
import { EventManager, type Event } from "@/components/event-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Types
export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceType: string;
  description?: string;
  date: Date;
  duration: number;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

// Demo data
const demoEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily sync with the engineering team",
    startTime: new Date(new Date().setHours(9, 0, 0, 0)),
    endTime: new Date(new Date().setHours(9, 30, 0, 0)),
    color: "blue",
    category: "Meeting",
    tags: ["Work", "Team"],
  },
  {
    id: "2",
    title: "Client Meeting",
    description: "Quarterly review with TechCorp",
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    color: "purple",
    category: "Meeting",
    tags: ["Important", "Client"],
  },
  {
    id: "3",
    title: "Doctor Appointment",
    description: "Annual checkup",
    startTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    color: "green",
    category: "Personal",
    tags: ["Personal"],
  },
];

const demoAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "John Smith",
    clientEmail: "john.smith@example.com",
    clientPhone: "+1 (555) 123-4567",
    serviceType: "Consultation",
    description: "Initial business consultation",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    duration: 60,
    status: "confirmed",
    assignedTo: "Sarah Johnson",
    notes: "Client interested in web development services",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 15),
  },
  {
    id: "2",
    clientName: "Emily Davis",
    clientEmail: "emily.davis@example.com",
    serviceType: "Design Review",
    description: "UI/UX design feedback session",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    duration: 90,
    status: "scheduled",
    assignedTo: "Mike Chen",
    createdAt: new Date(2024, 0, 16),
    updatedAt: new Date(2024, 0, 16),
  },
  {
    id: "3",
    clientName: "Robert Wilson",
    clientEmail: "robert.wilson@example.com",
    clientPhone: "+1 (555) 987-6543",
    serviceType: "Technical Support",
    description: "System troubleshooting",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    duration: 45,
    status: "completed",
    assignedTo: "Alex Kim",
    notes: "Issue resolved successfully",
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 14),
  },
  {
    id: "4",
    clientName: "Jessica Taylor",
    clientEmail: "jessica.taylor@example.com",
    serviceType: "Strategy Session",
    description: "Marketing strategy planning",
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    duration: 120,
    status: "cancelled",
    assignedTo: "David Park",
    notes: "Client rescheduled for next week",
    createdAt: new Date(2024, 0, 8),
    updatedAt: new Date(2024, 0, 12),
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(demoEvents);
  const [appointments, setAppointments] =
    useState<Appointment[]>(demoAppointments);
  const [activeTab, setActiveTab] = useState("calendar");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "Consultation",
    description: "",
    date: new Date(),
    duration: 60,
    status: "scheduled",
    assignedTo: "",
    notes: "",
  });

  // Stats
  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter((e) => e.startTime > new Date()).length,
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter((a) => a.status === "scheduled")
      .length,
    confirmedAppointments: appointments.filter((a) => a.status === "confirmed")
      .length,
    completedAppointments: appointments.filter((a) => a.status === "completed")
      .length,
    cancelledAppointments: appointments.filter((a) => a.status === "cancelled")
      .length,
    todayAppointments: appointments.filter(
      (a) => a.date.toDateString() === new Date().toDateString()
    ).length,
    totalDuration: appointments.reduce((sum, a) => sum + a.duration, 0),
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.clientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.clientEmail
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.serviceType
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    const matchesService =
      serviceFilter === "all" || appointment.serviceType === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Get unique service types
  const serviceTypes = Array.from(
    new Set(appointments.map((a) => a.serviceType))
  );

  // Section cards data
  const statsCards: SectionCard[] = [
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents.toString(),
      trend: {
        direction: "up",
        value: "+3",
        label: "This week",
      },
      icon: <IconCalendar className="size-5" />,

      footer: {
        primary: "Next 7 days",
        secondary: "Manage your schedule",
      },
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments.toString(),
      trend: {
        direction: "up",
        value: "+2",
        label: "From yesterday",
      },
      icon: <IconClock className="size-5" />,

      footer: {
        primary: `${stats.totalDuration} minutes scheduled`,
        secondary: "Check your calendar",
      },
    },
    {
      title: "Pending Confirmation",
      value: stats.pendingAppointments.toString(),
      trend: {
        direction: "down",
        value: "-1",
        label: "Recently confirmed",
      },
      icon: <IconUsers className="size-5" />,

      footer: {
        primary: `${stats.confirmedAppointments} confirmed`,
        secondary: "Follow up needed",
      },
    },
    {
      title: "Completion Rate",
      value: `${Math.round(
        (stats.completedAppointments / appointments.length) * 100
      )}%`,
      trend: {
        direction: "up",
        value: "+5%",
        label: "This month",
      },
      icon: <IconCheck className="size-5" />,

      footer: {
        primary: `${stats.completedAppointments} completed`,
        secondary: "Excellent performance",
      },
    },
  ];

  // Get status color
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "confirmed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "completed":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "no-show":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // Event handlers
  const handleCreateEvent = (event: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEvents([...events, newEvent]);
  };

  const handleUpdateEvent = (id: string, event: Partial<Event>) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, ...event } : e)));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleCreateAppointment = () => {
    if (
      !newAppointment.clientName ||
      !newAppointment.clientEmail ||
      !newAppointment.date
    )
      return;

    const appointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: newAppointment.clientName,
      clientEmail: newAppointment.clientEmail,
      clientPhone: newAppointment.clientPhone,
      serviceType: newAppointment.serviceType || "Consultation",
      description: newAppointment.description,
      date: newAppointment.date,
      duration: newAppointment.duration || 60,
      status: newAppointment.status || "scheduled",
      assignedTo: newAppointment.assignedTo,
      notes: newAppointment.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setAppointments([...appointments, appointment]);
    setIsAppointmentDialogOpen(false);
    setNewAppointment({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceType: "Consultation",
      description: "",
      date: new Date(),
      duration: 60,
      status: "scheduled",
      assignedTo: "",
      notes: "",
    });
  };

  const handleUpdateAppointmentStatus = (
    id: string,
    status: Appointment["status"]
  ) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status, updatedAt: new Date() } : a
      )
    );
  };

  const handleDeleteAppointment = (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((a) => a.id !== id));
    }
  };

  // Table fields configuration for appointments
  const appointmentFields: TableField<Appointment>[] = [
    {
      key: "clientName",
      header: "Client",
      cell: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
            {row.clientName.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.clientName}</div>
            <div className="text-xs text-gray-500">{row.clientEmail}</div>
          </div>
        </div>
      ),
      enableSorting: true,
    },
    {
      key: "serviceType",
      header: "Service",
      cell: (_, row) => (
        <Badge variant="outline" className="capitalize">
          {row.serviceType}
        </Badge>
      ),
      align: "center",
    },
    {
      key: "date",
      header: "Date & Time",
      cell: (_, row) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            {row.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-xs text-gray-500">
            {row.date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
      enableSorting: true,
    },
    {
      key: "duration",
      header: "Duration",
      cell: (_, row) => (
        <div className="flex items-center gap-1 text-gray-600">
          <IconClock size={14} />
          <span>{row.duration} min</span>
        </div>
      ),
      align: "center",
    },
    {
      key: "status",
      header: "Status",
      cell: (_, row) => (
        <Badge
          variant="outline"
          className={`capitalize ${getStatusColor(row.status)}`}
        >
          {row.status}
        </Badge>
      ),
      align: "center",
      enableSorting: true,
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      cell: (_, row) => (
        <span className="text-gray-600">{row.assignedTo || "Unassigned"}</span>
      ),
    },
  ];

  // Table actions configuration for appointments
  const appointmentActions: TableAction<Appointment>[] = [
    {
      type: "view",
      label: "View Details",
      icon: <IconEye className="size-4" />,
      onClick: (appointment) => setSelectedAppointment(appointment),
    },
    {
      type: "edit",
      label: "Edit",
      icon: <IconEdit className="size-4" />,
      onClick: (appointment) => {
        setSelectedAppointment(appointment);
        setIsAppointmentDialogOpen(true);
      },
    },
    {
      type: "custom",
      label: (appointment) =>
        appointment.status === "completed" ? "Mark Pending" : "Mark Complete",
      icon: (appointment) =>
        appointment.status === "completed" ? (
          <IconX className="size-4" />
        ) : (
          <IconCheck className="size-4" />
        ),
      onClick: (appointment) => {
        const newStatus =
          appointment.status === "completed" ? "scheduled" : "completed";
        handleUpdateAppointmentStatus(appointment.id, newStatus);
      },
    },
    {
      type: "delete",
      label: "Delete",
      icon: <IconTrash className="size-4" />,
      onClick: (appointment) => handleDeleteAppointment(appointment.id),
    },
  ];

  // Quick status update buttons
  const StatusButtons = ({ appointment }: { appointment: Appointment }) => (
    <div className="flex gap-1">
      {appointment.status !== "confirmed" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleUpdateAppointmentStatus(appointment.id, "confirmed")
          }
          className="text-xs h-7 px-2"
        >
          <IconCheck size={12} />
          Confirm
        </Button>
      )}
      {appointment.status !== "completed" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleUpdateAppointmentStatus(appointment.id, "completed")
          }
          className="text-xs h-7 px-2"
        >
          Complete
        </Button>
      )}
      {appointment.status !== "cancelled" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleUpdateAppointmentStatus(appointment.id, "cancelled")
          }
          className="text-xs h-7 px-2 text-red-600"
        >
          <IconX size={12} />
          Cancel
        </Button>
      )}
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
              {/* <SectionCards cards={statsCards} layout="1x4" /> */}

              {/* Main Content Tabs */}
              <div className="px-4 lg:px-6">
                <Card className="border-gray-200 rounded-sm">
                  <CardHeader className="border-b pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle className="text-xl">
                        Events & Appointments
                      </CardTitle>
                      <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full sm:w-auto"
                      >
                        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
                          <TabsTrigger value="calendar">
                            <IconCalendar size={16} className="mr-2" />
                            Calendar
                          </TabsTrigger>
                          <TabsTrigger value="appointments">
                            <IconUsers size={16} className="mr-2" />
                            Appointments
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 ">
                    {/* Calendar View */}
                    {activeTab === "calendar" && (
                      <div className="p-4">
                        <EventManager
                          events={events}
                          onEventCreate={handleCreateEvent}
                          onEventUpdate={handleUpdateEvent}
                          onEventDelete={handleDeleteEvent}
                          categories={[
                            "Meeting",
                            "Task",
                            "Reminder",
                            "Personal",
                            "Appointment",
                          ]}
                          availableTags={[
                            "Important",
                            "Urgent",
                            "Work",
                            "Personal",
                            "Team",
                            "Client",
                          ]}
                          defaultView="month"
                          className="border-0 p-0"
                        />
                      </div>
                    )}

                    {/* Appointments View */}
                    {activeTab === "appointments" && (
                      <div className="p-6">
                        {/* Appointments Header */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h2 className="text-2xl font-semibold text-gray-900">
                                Client Appointments
                              </h2>
                              <p className="text-sm text-gray-500 mt-1">
                                Manage client appointments, schedules, and
                                follow-ups
                              </p>
                            </div>
                            <Button
                              onClick={() => setIsAppointmentDialogOpen(true)}
                              className="bg-primary"
                            >
                              <IconPlus size={20} />
                              New Appointment
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
                                placeholder="Search appointments..."
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
                                  <SelectItem value="all">
                                    All Status
                                  </SelectItem>
                                  <SelectItem value="scheduled">
                                    Scheduled
                                  </SelectItem>
                                  <SelectItem value="confirmed">
                                    Confirmed
                                  </SelectItem>
                                  <SelectItem value="completed">
                                    Completed
                                  </SelectItem>
                                  <SelectItem value="cancelled">
                                    Cancelled
                                  </SelectItem>
                                  <SelectItem value="no-show">
                                    No Show
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <Select
                                value={serviceFilter}
                                onValueChange={setServiceFilter}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Service" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">
                                    All Services
                                  </SelectItem>
                                  {serviceTypes.map((service) => (
                                    <SelectItem key={service} value={service}>
                                      {service}
                                    </SelectItem>
                                  ))}
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

                        {/* Status Summary */}
                        <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                          {[
                            {
                              status: "scheduled",
                              label: "Scheduled",
                              count: stats.pendingAppointments,
                              color: "blue",
                            },
                            {
                              status: "confirmed",
                              label: "Confirmed",
                              count: stats.confirmedAppointments,
                              color: "green",
                            },
                            {
                              status: "completed",
                              label: "Completed",
                              count: stats.completedAppointments,
                              color: "purple",
                            },
                            {
                              status: "cancelled",
                              label: "Cancelled",
                              count: stats.cancelledAppointments,
                              color: "red",
                            },
                            {
                              status: "total",
                              label: "Total",
                              count: stats.totalAppointments,
                              color: "gray",
                            },
                          ].map((stat) => (
                            <Card
                              key={stat.status}
                              className={`border-l-4 border-l-${stat.color}-500`}
                            >
                              <CardContent className="p-3">
                                <div className="text-2xl font-bold">
                                  {stat.count}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {stat.label}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        {/* Data Table */}
                        <DataTable
                          data={filteredAppointments}
                          fields={appointmentFields}
                          actions={appointmentActions}
                          enableSelection={true}
                          enablePagination={true}
                          pageSize={10}
                          onRowClick={(appointment) =>
                            setSelectedAppointment(appointment)
                          }
                        />

                        {/* Quick Actions Bar */}
                        {selectedAppointment && (
                          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold">Quick Actions</h3>
                                <p className="text-sm text-gray-500">
                                  Selected: {selectedAppointment.clientName}
                                </p>
                              </div>
                              <StatusButtons
                                appointment={selectedAppointment}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Appointment Dialog */}
      <Dialog
        open={isAppointmentDialogOpen}
        onOpenChange={setIsAppointmentDialogOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedAppointment ? "Edit Appointment" : "New Appointment"}
            </DialogTitle>
            <DialogDescription>
              {selectedAppointment
                ? "Update appointment details"
                : "Schedule a new client appointment"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={
                  selectedAppointment
                    ? selectedAppointment.clientName
                    : newAppointment.clientName
                }
                onChange={(e) =>
                  selectedAppointment
                    ? setSelectedAppointment({
                        ...selectedAppointment,
                        clientName: e.target.value,
                      })
                    : setNewAppointment({
                        ...newAppointment,
                        clientName: e.target.value,
                      })
                }
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email *</Label>
              <Input
                id="clientEmail"
                type="email"
                value={
                  selectedAppointment
                    ? selectedAppointment.clientEmail
                    : newAppointment.clientEmail
                }
                onChange={(e) =>
                  selectedAppointment
                    ? setSelectedAppointment({
                        ...selectedAppointment,
                        clientEmail: e.target.value,
                      })
                    : setNewAppointment({
                        ...newAppointment,
                        clientEmail: e.target.value,
                      })
                }
                placeholder="client@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={
                    selectedAppointment
                      ? selectedAppointment.date.toISOString().split("T")[0]
                      : newAppointment.date
                      ? newAppointment.date.toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    selectedAppointment
                      ? setSelectedAppointment({ ...selectedAppointment, date })
                      : setNewAppointment({ ...newAppointment, date });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  step="15"
                  value={
                    selectedAppointment
                      ? selectedAppointment.duration
                      : newAppointment.duration
                  }
                  onChange={(e) =>
                    selectedAppointment
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          duration: parseInt(e.target.value),
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          duration: parseInt(e.target.value),
                        })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select
                  value={
                    selectedAppointment
                      ? selectedAppointment.serviceType
                      : newAppointment.serviceType
                  }
                  onValueChange={(value) =>
                    selectedAppointment
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          serviceType: value,
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          serviceType: value,
                        })
                  }
                >
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Design Review">Design Review</SelectItem>
                    <SelectItem value="Technical Support">
                      Technical Support
                    </SelectItem>
                    <SelectItem value="Strategy Session">
                      Strategy Session
                    </SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={
                    selectedAppointment
                      ? selectedAppointment.status
                      : newAppointment.status
                  }
                  onValueChange={(value: Appointment["status"]) =>
                    selectedAppointment
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          status: value,
                        })
                      : setNewAppointment({ ...newAppointment, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={
                  selectedAppointment
                    ? selectedAppointment.description
                    : newAppointment.description
                }
                onChange={(e) =>
                  selectedAppointment
                    ? setSelectedAppointment({
                        ...selectedAppointment,
                        description: e.target.value,
                      })
                    : setNewAppointment({
                        ...newAppointment,
                        description: e.target.value,
                      })
                }
                placeholder="Brief description of the appointment..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            {selectedAppointment && (
              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteAppointment(selectedAppointment.id);
                  setIsAppointmentDialogOpen(false);
                  setSelectedAppointment(null);
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setIsAppointmentDialogOpen(false);
                setSelectedAppointment(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedAppointment) {
                  // Update existing appointment
                  setAppointments(
                    appointments.map((a) =>
                      a.id === selectedAppointment.id
                        ? { ...selectedAppointment, updatedAt: new Date() }
                        : a
                    )
                  );
                  setSelectedAppointment(null);
                } else {
                  handleCreateAppointment();
                }
                setIsAppointmentDialogOpen(false);
              }}
            >
              {selectedAppointment ? "Save Changes" : "Create Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
