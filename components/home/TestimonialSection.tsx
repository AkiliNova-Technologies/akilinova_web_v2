"use client";

import { Quote, Star, Globe, TrendingUp, Sparkles } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "CTO, TechInnovate Africa",
      company: "TechInnovate",
      country: "Kenya",
      content: "Working with AkiliNova transformed our digital infrastructure. Their innovative solutions helped us scale across 5 African countries in just 6 months.",
      rating: 5,
      achievement: "Scaled to 5 countries",
      duration: "6 months",
      avatarColor: "from-blue-500 to-cyan-500",
      metric: "500% growth"
    },
    {
      id: 2,
      name: "David Okafor",
      position: "CEO, FinTech Solutions NG",
      company: "FinTech NG",
      country: "Nigeria",
      content: "The mobile banking platform they developed has served over 100,000 customers seamlessly. Their technical expertise is unmatched.",
      rating: 5,
      achievement: "100,000+ customers",
      duration: "8 months",
      avatarColor: "from-green-500 to-emerald-500",
      metric: "99.9% uptime"
    },
    {
      id: 3,
      name: "Amina Mohamed",
      position: "Operations Director, East Africa Logistics",
      company: "EALogistics",
      country: "Tanzania",
      content: "From concept to deployment, the team delivered beyond expectations. Our operational costs reduced by 40% while improving delivery times.",
      rating: 5,
      achievement: "40% cost reduction",
      duration: "12 months",
      avatarColor: "from-purple-500 to-pink-500",
      metric: "2x efficiency"
    },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full blur-xl sm:blur-2xl md:blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4 md:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Client Success Stories
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              African Innovators
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            See how businesses across Africa are transforming with our technology solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-200 hover:border-orange-300 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300`}>
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  
                  {/* Name & Position */}
                  <div className="max-w-[calc(100%-3.5rem)]">
                    <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg line-clamp-1">
                      {testimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
                
                {/* Quote Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors duration-300 flex-shrink-0">
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 fill-orange-500"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 italic mb-4 sm:mb-5 md:mb-6 leading-relaxed text-sm sm:text-base line-clamp-4 sm:line-clamp-4">
                "{testimonial.content}"
              </blockquote>

              {/* Achievement Metric - Added for better mobile display */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 w-fit">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {testimonial.achievement}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 sm:pt-5 md:pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs sm:text-sm text-gray-600">
                    {testimonial.country}
                  </span>
                </div>
                
                <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors duration-300">
                  {testimonial.duration}
                </div>
              </div>

              {/* Metric (hidden on smallest screens) */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 hidden sm:block">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Impact</span>
                  <span className="text-sm font-semibold text-orange-600">
                    {testimonial.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}