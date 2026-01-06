"use client";

import { Linkedin, Users, Award, Globe, Briefcase, Mail } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  experience: string;
  location: string;
  linkedin?: string;
  email?: string;
}

interface LeadershipTeamProps {
  title?: string;
  subtitle?: string;
  description?: string;
  members?: TeamMember[];
}

export default function LeadershipTeamSection({
  title = "Meet Our Leadership",
  subtitle = "Leadership Team",
  description = "Our diverse team of experts brings together decades of experience in technology, business, and African market development.",
  members = [
    {
      name: "Watbin Albert",
      role: "Chief Executive Officer",
      bio: "Visionary leader with 10+ years in tech innovation and African market development. Passionate about driving digital transformation across the continent.",
      image: "/images/team/david-mwangi.jpg",
      experience: "10+ Years Experience",
      location: "Kampala, Uganda",
      linkedin: "#",
      email: "albert@akilinova.com"
    },
    {
      name: "Hawah Naiga",
      role: "Chief Marketing Officer",
      bio: "Tech expert specializing in scalable architecture and innovative solutions for African enterprises. Former lead engineer at major tech firms.",
      image: "/images/team/sarah-kintu.jpg",
      experience: "8+ Years Experience",
      location: "Nairobi, Kenya",
      linkedin: "#",
      email: "sarah@akilinova.com"
    },
    {
      name: "Michael Osei",
      role: "Head of Operations",
      bio: "Operations specialist with extensive experience in project management and business development across multiple African markets.",
      image: "/images/team/michael-osei.jpg",
      experience: "12+ Years Experience",
      location: "Accra, Ghana",
      linkedin: "#",
      email: "michael@akilinova.com"
    },
    {
      name: "Amina Diallo",
      role: "Lead Product Designer",
      bio: "User experience expert passionate about creating intuitive, culturally-relevant designs for African users and businesses.",
      image: "/images/team/amina-diallo.jpg",
      experience: "6+ Years Experience",
      location: "Dakar, Senegal",
      linkedin: "#",
      email: "amina@akilinova.com"
    }
  ]
}: LeadershipTeamProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 mb-4">
            <Users className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {members.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto relative">
                  {member.image && !imageErrors[member.name] ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-2xl border-2 border-gray-200 group-hover:border-orange-500 transition-colors duration-300"
                      onError={() => handleImageError(member.name)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {member.name}
              </h3>
              <div className="text-orange-600 font-semibold text-center mb-4">
                {member.role}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 pt-6 border-t border-gray-100">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-300"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-300"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}