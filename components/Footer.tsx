"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Send,
} from "lucide-react";
import Link from "next/link";

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

interface FooterProps {
  companyName?: string;
  description?: string;
  year?: number;
  sections?: FooterSection[];
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
  };
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "AkiliNova Tech",
  description = "Pioneering digital transformation across Africa with innovative technology solutions.",
  year = new Date().getFullYear(),
  sections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog & News", href: "/blog" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Documentation", href: "/docs" },
        { label: "Support Center", href: "/support" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Solutions", href: "/solutions" },
        { label: "Pricing", href: "/pricing" },
        { label: "API", href: "/api" },
        { label: "Integrations", href: "/integrations" },
      ],
    },
  ],
  contactInfo = {
    email: "hello@akilinova.com",
    phone: "+256 789 874 647",
    address: "Kampala, Uganda",
  },
  className = "",
}) => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Thank you for subscribing!`);
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", label: "YouTube" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ];

  return (
    <footer
      className={`relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 ${className}`}
    >
      {/* Background Elements - Unchanged */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 lg:mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-row items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{companyName}</h3>
                <span className="text-xs text-orange-400 font-medium tracking-wider">PAN-AFRICAN</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              {description}
            </p>

            {/* Social Links - Moved here */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm font-medium mb-4">Follow Us</p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider text-gray-400">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="group-hover:text-orange-400 transition-colors">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider text-gray-400">
                  Contact Info
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Mail className="h-4 w-4" />,
                      text: contactInfo.email,
                      href: `mailto:${contactInfo.email}`,
                    },
                    {
                      icon: <Phone className="h-4 w-4" />,
                      text: contactInfo.phone,
                      href: `tel:${contactInfo.phone}`,
                    },
                    {
                      icon: <MapPin className="h-4 w-4" />,
                      text: contactInfo.address,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                        {item.icon}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm hover:text-orange-400 transition-colors leading-tight"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-sm leading-tight">{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Send className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-white">
                    Newsletter
                  </span>
                </div>

                <p className="text-gray-400 text-xs mb-4">
                  Subscribe to get updates on our latest solutions
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 text-sm"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm">
              © {year} {companyName}. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Empowering Africa through innovation
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {legalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Globe className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-gray-400">Serving 15+ African Countries</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;