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
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Client Success Stories
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              African Innovators
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how businesses across Africa are transforming with our technology solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  
                  {/* Name & Position */}
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                  </div>
                </div>
                
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors duration-300">
                  <Quote className="w-5 h-5" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-orange-500 fill-orange-500"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 italic mb-6 leading-relaxed line-clamp-4">
                "{testimonial.content}"
              </blockquote>


              {/* Footer */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{testimonial.country}</span>
                </div>
                
                <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors duration-300">
                  {testimonial.duration}
                </div>
              </div>
            </div>
          ))}
        </div>


  
      </div>
    </section>
  );
}