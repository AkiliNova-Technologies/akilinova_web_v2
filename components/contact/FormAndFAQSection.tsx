"use client";

import { useState } from "react";
import { Send, Mail, Phone } from "lucide-react";
import Select, { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const budgetOptions = [
  { value: "", label: "Select budget range" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-30k", label: "$15,000 - $30,000" },
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k+", label: "$50,000+" },
];

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "web-dev", label: "Custom Web Development" },
  { value: "mobile-dev", label: "Mobile App Development" },
  { value: "cloud", label: "Cloud Solutions & DevOps" },
  { value: "ai-ml", label: "AI & Machine Learning" },
  { value: "data", label: "Data Engineering & Analytics" },
  { value: "cybersecurity", label: "Cybersecurity & Compliance" },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity, but most web applications take 4-8 weeks, while mobile apps typically take 6-12 weeks from concept to deployment.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes, we offer comprehensive post-launch support including maintenance, updates, and 24/7 technical support to ensure your solution runs smoothly.",
  },
  {
    question: "What's your development process?",
    answer:
      "We follow an agile methodology with four key phases: Discovery & Planning, Design & Architecture, Development & Testing, and Deployment & Support.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Absolutely! We love working with startups and offer flexible engagement models to suit different budgets and growth stages.",
  },
];

export default function FormAndFAQSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white  py-20">

       {/* Background Elements - Simplified in compact mode */}
      
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A33]">
              {" "}
              FAQs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up delay-100">
            Send us your project details or get quick answers to common
            questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h3>
                <p className="text-gray-600">
                  Fill out the form and we'll get back to you within 2 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 h-11 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 h-11 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company Name
                    </label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 h-11 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all duration-300"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Budget
                    </label>
                    <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                      <SelectTrigger className="w-full min-h-11 bg-white border-gray-300 text-gray-900 hover:border-[#FF6B00] focus:border-[#FF6B00] focus:ring-[#FF6B00]/20">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions
                          .filter(option => option.value !== "")
                          .map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <Select onValueChange={(value) => handleSelectChange('service', value)}>
                    <SelectTrigger className="w-full min-h-11 bg-white border-gray-300 text-gray-900 hover:border-[#FF6B00] focus:border-[#FF6B00] focus:ring-[#FF6B00]/20">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions
                        .filter(option => option.value !== "")
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '700ms' }}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Details *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project requirements, goals, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 hover:scale-[1.02]"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="animate-slide-up delay-300">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Common Questions
                </h3>
                <p className="text-gray-600">
                  Quick answers to frequently asked questions.
                </p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="animate-slide-up bg-white rounded-xl p-6 border border-gray-200 hover:border-[#FF6B00]/50 transition-all duration-300 hover:shadow-sm"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Additional Help */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[#FF6B00]/10 to-[#FF8A33]/5 rounded-xl border border-[#FF6B00]/20 animate-fade-in delay-700">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Need Immediate Help?
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Can't find what you're looking for? We're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:info@akilinovatech.com"
                    className="flex-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white! py-2 px-4 rounded-lg text-sm font-semibold text-center hover:shadow-md transition-all duration-300 active:scale-95 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email Support
                  </a>
                  <a
                    href="tel:+254789874647"
                    className="flex-1 border border-[#FF6B00] text-[#FF6B00] py-2 px-4 rounded-lg text-sm font-semibold text-center hover:bg-gradient-to-r hover:from-[#FF6B00] hover:to-[#FF8A33] hover:text-white! transition-all duration-300 active:scale-95 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}