"use client";

import {
  Building2, // Financial Services
  HeartPulse, // Healthcare
  ShoppingBag, // E-commerce
  GraduationCap, // Education
  Sprout, // Agriculture
  Truck, // Logistics
  Home, // Real Estate
  Factory, // Manufacturing
  Smartphone, // For Financial Services sub-icons
  Shield, // For Financial Services sub-icons
  CreditCard, // For Financial Services sub-icons
  Activity, // For Healthcare sub-icons
  Stethoscope, // For Healthcare sub-icons
  Calendar, // For Healthcare sub-icons
  Package, // For E-commerce sub-icons
  ShoppingCart, // For E-commerce sub-icons
  Warehouse, // For E-commerce sub-icons
  BookOpen, // For Education sub-icons
  Users, // For Education sub-icons
  MonitorPlay, // For Education sub-icons
  Leaf, // For Agriculture sub-icons
  Warehouse as Farm, // For Agriculture sub-icons
  BarChart3, // For Agriculture sub-icons
  Wifi, // For Agriculture sub-icons (IoT)
  MapPin, // For Logistics sub-icons
  Navigation, // For Logistics sub-icons
  PackageCheck, // For Logistics sub-icons
  Route, // For Logistics sub-icons
  Key, // For Real Estate sub-icons
  Camera, // For Real Estate sub-icons
  CalendarDays, // For Real Estate sub-icons
  Settings, // For Manufacturing sub-icons
  ClipboardCheck, // For Manufacturing sub-icons
  Gauge, // For Manufacturing sub-icons
  Layers, // For Manufacturing sub-icons
  VideoIcon,
  StoreIcon,
  GlobeIcon,
} from "lucide-react";

interface Industry {
  name: string;
  description: string;
  icon: React.ReactNode;
  projects: string;
  color: string;
}

interface IndustriesWeServeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  industries?: Industry[];
}

export default function IndustriesWeServeSection({
  title = "Transforming Multiple Sectors",
  subtitle = "Industries We Serve",
  description = "Our technology solutions have helped businesses across various industries achieve digital transformation and drive growth.",
  industries = [
    {
      name: "Financial Services",
      description: "Banking, FinTech, and payment solutions",
      icon: <Building2 className="w-6 h-6 text-white" />,
      projects: "15+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Healthcare",
      description: "Medical systems and health tech solutions",
      icon: <HeartPulse className="w-6 h-6 text-white" />,
      projects: "12+",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "E-commerce",
      description: "Online retail and marketplace platforms",
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      projects: "18+",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Education",
      description: "EdTech and learning management systems",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      projects: "10+",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Agriculture",
      description: "AgriTech and supply chain solutions",
      icon: <Sprout className="w-6 h-6 text-white" />,
      projects: "8+",
      color: "from-green-600 to-lime-500",
    },
    {
      name: "Logistics",
      description: "Transport and delivery management systems",
      icon: <Truck className="w-6 h-6 text-white" />,
      projects: "14+",
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "Real Estate",
      description: "Property management and listing platforms",
      icon: <Home className="w-6 h-6 text-white" />,
      projects: "9+",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Manufacturing",
      description: "Industrial automation and management systems",
      icon: <Factory className="w-6 h-6 text-white" />,
      projects: "7+",
      color: "from-blue-600 to-indigo-500",
    },
  ],
}: IndustriesWeServeProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4">
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex flex-col items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center shadow-sm`}
                >
                  {industry.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {industry.name}
                  </h3>
                  <div className="mt-2 px-3 py-1 bg-gray-100 rounded-full inline-block">
                    <span className="text-xs font-medium text-gray-700">
                      {industry.projects} Projects
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">
                {industry.description}
              </p>

              {/* Services */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {getIndustryServices(industry.name).map((service, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-50 rounded-md text-xs text-gray-700 border border-gray-200 flex items-center gap-1"
                    >
                      {getServiceIcon(service, idx)}
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function for industry services
function getIndustryServices(industry: string): string[] {
  const services: { [key: string]: string[] } = {
    "Financial Services": [
      "Mobile Banking",
      "Payment Systems",
      "Risk Management",
      "FinTech Apps",
    ],
    Healthcare: [
      "EHR Systems",
      "Telemedicine",
      "Appointment Booking",
      "Medical Records",
    ],
    "E-commerce": [
      "Online Stores",
      "Marketplaces",
      "Payment Gateways",
      "Inventory Management",
    ],
    Education: [
      "LMS Platforms",
      "E-learning Apps",
      "Student Portals",
      "Course Management",
    ],
    Agriculture: [
      "Farm Management",
      "Supply Chain",
      "Marketplace",
      "IoT Solutions",
    ],
    Logistics: [
      "Fleet Management",
      "Tracking Systems",
      "Delivery Apps",
      "Route Optimization",
    ],
    "Real Estate": [
      "Property Listings",
      "CRM Systems",
      "Virtual Tours",
      "Booking Systems",
    ],
    Manufacturing: [
      "ERP Systems",
      "Inventory Control",
      "Quality Management",
      "Production Planning",
    ],
  };
  return (
    services[industry] || [
      "Custom Solutions",
      "Web Apps",
      "Mobile Apps",
      "Cloud Services",
    ]
  );
}

const Video = require("lucide-react").Video;
const Store = require("lucide-react").Store;
const Globe = require("lucide-react").Globe;
const Cloud = require("lucide-react").Cloud;

// Helper function to get service icons
function getServiceIcon(service: string, index: number): React.ReactNode {
  const iconMap: { [key: string]: React.ReactNode } = {
    // Financial Services
    "Mobile Banking": <Smartphone className="w-3 h-3" />,
    "Payment Systems": <CreditCard className="w-3 h-3" />,
    "Risk Management": <Shield className="w-3 h-3" />,
    "FinTech Apps": <Activity className="w-3 h-3" />,

    // Healthcare
    "EHR Systems": <ClipboardCheck className="w-3 h-3" />,
    Telemedicine: <Video className="w-3 h-3" />,
    "Appointment Booking": <Calendar className="w-3 h-3" />,
    "Medical Records": <Stethoscope className="w-3 h-3" />,

    // E-commerce
    "Online Stores": <ShoppingBag className="w-3 h-3" />,
    Marketplaces: <Store className="w-3 h-3" />,
    "Payment Gateways": <CreditCard className="w-3 h-3" />,
    "Inventory Management": <Package className="w-3 h-3" />,

    // Education
    "LMS Platforms": <MonitorPlay className="w-3 h-3" />,
    "E-learning Apps": <BookOpen className="w-3 h-3" />,
    "Student Portals": <Users className="w-3 h-3" />,
    "Course Management": <GraduationCap className="w-3 h-3" />,

    // Agriculture
    "Farm Management": <Farm className="w-3 h-3" />,
    "Supply Chain": <BarChart3 className="w-3 h-3" />,
    Marketplace: <Store className="w-3 h-3" />,
    "IoT Solutions": <Wifi className="w-3 h-3" />,

    // Logistics
    "Fleet Management": <Truck className="w-3 h-3" />,
    "Tracking Systems": <MapPin className="w-3 h-3" />,
    "Delivery Apps": <PackageCheck className="w-3 h-3" />,
    "Route Optimization": <Route className="w-3 h-3" />,

    // Real Estate
    "Property Listings": <Home className="w-3 h-3" />,
    "CRM Systems": <Users className="w-3 h-3" />,
    "Virtual Tours": <Camera className="w-3 h-3" />,
    "Booking Systems": <CalendarDays className="w-3 h-3" />,

    // Manufacturing
    "ERP Systems": <Layers className="w-3 h-3" />,
    "Inventory Control": <Package className="w-3 h-3" />,
    "Quality Management": <ClipboardCheck className="w-3 h-3" />,
    "Production Planning": <Gauge className="w-3 h-3" />,

    // Default
    "Custom Solutions": <Settings className="w-3 h-3" />,
    "Web Apps": <Globe className="w-3 h-3" />,
    "Mobile Apps": <Smartphone className="w-3 h-3" />,
    "Cloud Services": <Cloud className="w-3 h-3" />,
  };


  return iconMap[service] || <div className="w-3 h-3" />;
}
