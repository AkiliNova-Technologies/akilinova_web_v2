"use client";

import { Calendar, Target, Rocket, Award, TrendingUp, Zap } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface JourneyTimelineProps {
  title?: string;
  subtitle?: string;
  events?: TimelineEvent[];
}

export default function JourneyTimelineSection({
  title = "Our Journey",
  subtitle = "Milestones & Growth",
  events = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to transform African businesses through technology",
      icon: <Target className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2020",
      title: "First Major Project",
      description: "Successfully delivered a fintech solution for East African market",
      icon: <Rocket className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2021",
      title: "Regional Expansion",
      description: "Expanded operations to 5 additional African countries",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Received Innovation Award for excellence in technology solutions",
      icon: <Award className="w-5 h-5" />,
      color: "from-orange-500 to-red-500"
    },
    {
      year: "2023",
      title: "Team Growth",
      description: "Expanded team to 25+ experts across technology and business",
      icon: <Zap className="w-5 h-5" />,
      color: "from-indigo-500 to-blue-500"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Planning expansion to West and Southern African markets",
      icon: <Calendar className="w-5 h-5" />,
      color: "from-gray-500 to-gray-700"
    }
  ]
}: JourneyTimelineProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A timeline of our growth, achievements, and vision for the future
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/20 via-orange-500/40 to-orange-500/20" />
          
          {/* Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative ${index >= 3 ? 'md:col-start-2' : ''}`}
              >
                {/* Timeline Point */}
                <div className="absolute top-1/2 -translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 -translate-x-4 md:-translate-x-0">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${event.color} shadow-lg`} />
                </div>

                {/* Card */}
                <div className="ml-10 lg:ml-0 lg:text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center mb-4 lg:mx-auto`}>
                    <div className="text-white">
                      {event.icon}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold mb-3">
                    {event.year}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}