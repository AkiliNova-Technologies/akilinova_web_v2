"use client";

interface Industry {
  name: string;
  description: string;
  icon: string;
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
      icon: "🏦",
      projects: "15+",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Healthcare",
      description: "Medical systems and health tech solutions",
      icon: "🏥",
      projects: "12+",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "E-commerce",
      description: "Online retail and marketplace platforms",
      icon: "🛒",
      projects: "18+",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Education",
      description: "EdTech and learning management systems",
      icon: "🎓",
      projects: "10+",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Agriculture",
      description: "AgriTech and supply chain solutions",
      icon: "🌱",
      projects: "8+",
      color: "from-green-600 to-lime-500"
    },
    {
      name: "Logistics",
      description: "Transport and delivery management systems",
      icon: "🚚",
      projects: "14+",
      color: "from-gray-600 to-gray-800"
    },
    {
      name: "Real Estate",
      description: "Property management and listing platforms",
      icon: "🏠",
      projects: "9+",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Manufacturing",
      description: "Industrial automation and management systems",
      icon: "🏭",
      projects: "7+",
      color: "from-blue-600 to-indigo-500"
    }
  ]
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
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-2xl`}>
                  {industry.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{industry.name}</h3>
                  <div className="mt-1 px-3 py-1 bg-gray-100 rounded-full inline-block">
                    <span className="text-xs font-medium text-gray-700">{industry.projects} Projects</span>
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
                      className="px-2 py-1 bg-gray-50 rounded-md text-xs text-gray-700 border border-gray-200"
                    >
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
    "Financial Services": ["Mobile Banking", "Payment Systems", "Risk Management", "FinTech Apps"],
    "Healthcare": ["EHR Systems", "Telemedicine", "Appointment Booking", "Medical Records"],
    "E-commerce": ["Online Stores", "Marketplaces", "Payment Gateways", "Inventory Management"],
    "Education": ["LMS Platforms", "E-learning Apps", "Student Portals", "Course Management"],
    "Agriculture": ["Farm Management", "Supply Chain", "Marketplace", "IoT Solutions"],
    "Logistics": ["Fleet Management", "Tracking Systems", "Delivery Apps", "Route Optimization"],
    "Real Estate": ["Property Listings", "CRM Systems", "Virtual Tours", "Booking Systems"],
    "Manufacturing": ["ERP Systems", "Inventory Control", "Quality Management", "Production Planning"]
  };
  return services[industry] || ["Custom Solutions", "Web Apps", "Mobile Apps", "Cloud Services"];
}