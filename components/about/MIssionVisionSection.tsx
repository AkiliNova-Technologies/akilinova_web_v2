"use client";

import { Target, Globe, CheckCircle, Star } from "lucide-react";

interface MissionVisionProps {
  missionTitle?: string;
  missionDescription?: string;
  visionTitle?: string;
  visionDescription?: string;
}

export default function MissionVisionSection({
  missionTitle = "Our Mission",
  missionDescription = "To empower African businesses with cutting-edge technology solutions that drive growth, enhance efficiency, and create sustainable digital transformation across the continent.",
  visionTitle = "Our Vision",
  visionDescription = "To be the leading technology partner for African innovation, creating a future where every business on the continent has access to world-class digital solutions tailored to their unique challenges and opportunities."
}: MissionVisionProps) {
  const missionPoints = [
    "Build scalable software solutions",
    "Foster digital inclusion",
    "Drive economic growth through technology",
    "Create lasting impact in communities"
  ];

  const visionPoints = [
    "Lead African tech innovation",
    "Bridge the digital divide",
    "Inspire the next generation",
    "Shape the future of African tech"
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Purpose &{" "}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Direction
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guided by a clear mission and an ambitious vision for Africa's digital future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <div className="group bg-white rounded-2xl p-6 md:p-8 lg:p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{missionTitle}</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-2" />
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {missionDescription}
            </p>

            <div className="space-y-3">
              {missionPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{visionTitle}</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2" />
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {visionDescription}
            </p>

            <div className="space-y-3">
              {visionPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}