"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";

const contactMethods = [
  {
    icon: <Mail className="h-8 w-8" />,
    title: "Email Us",
    description: "Send us a detailed message about your project",
    contact: "info@akilinovatech.com",
    action: "mailto:info@akilinovatech.com",
    gradient: "from-[#FF6B00] to-[#FF8A33]",
  },
  {
    icon: <Phone className="h-8 w-8" />,
    title: "Call Us",
    description: "Speak directly with our team",
    contact: "+254 789 874 647",
    action: "tel:+254789874647",
    gradient: "from-[#FF6B00] to-[#FF8A33]",
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Visit Us",
    description: "Meet us at our headquarters",
    contact: "Kampala, Uganda",
    action: "#",
    gradient: "from-[#FF6B00] to-[#FF8A33]",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Business Hours",
    description: "We're available to help you",
    contact: "Mon - Fri: 8AM - 6PM EAT",
    action: "#",
    gradient: "from-[#FF6B00] to-[#FF8A33]",
  },
];

export default function ContactMethodsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-b from-[#122A44] to-[#0D1C2E] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <Sparkles className="h-4 w-4 mr-2 text-[#FF6B00] animate-spin-slow" />
            <span className="text-sm font-medium text-white">
              Contact Methods
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
            Multiple Ways to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A33]">
              {" "}
              Reach Us
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up delay-100">
            Choose the most convenient way to get in touch with our team. We're
            always ready to discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <a
                href={method.action}
                className={`
                  bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 
                  transition-all duration-300 group text-center h-full flex flex-col
                  hover:border-[#FF6B00]/30 hover:scale-105
                  ${hoveredCard === index ? 'scale-105 border-[#FF6B00]/30' : ''}
                `}
              >
                <div 
                  className={`
                    w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl 
                    flex items-center justify-center text-white mb-6 mx-auto 
                    transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                    ${hoveredCard === index ? 'scale-110 rotate-3' : ''}
                  `}
                >
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FF8A33] transition-colors">
                  {method.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4 grow">
                  {method.description}
                </p>
                <div className="text-[#FF8A33] font-semibold text-lg transition-transform duration-300 group-hover:scale-105">
                  {method.contact}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}