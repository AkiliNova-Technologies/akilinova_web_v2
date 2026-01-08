"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, Sparkles } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  dropdown?: NavItem[];
}

interface NavbarProps {
  logo?: string;
  brandName?: string;
  navItems?: NavItem[];
  className?: string;
}

export default function Navbar({
  logo,
  brandName = "AkiliNova Tech",
  navItems = [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
    },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  className = "",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleNavClick = (item: NavItem) => {
    if (item.dropdown) {
      toggleDropdown(item.label);
    } else {
      closeMenu();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-transparent backdrop-blur-md"
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-3 group"
                onClick={closeMenu}
              >
                {logo ? (
                  <img
                    className="h-8 w-8 lg:h-10 lg:w-10 transition-transform duration-300 group-hover:scale-110"
                    src={logo}
                    alt={`${brandName} logo`}
                  />
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                  </div>
                )}
                <span
                  className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                    isScrolled
                      ? "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                      : "text-white"
                  } group-hover:scale-105 transition-transform duration-300`}
                >
                  {brandName}
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div
              className="hidden lg:flex items-center gap-1"
              ref={dropdownRef}
            >
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          pathname.startsWith(item.href)
                            ? "text-orange-600 bg-orange-50"
                            : isScrolled
                            ? "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                            : "text-white/90 hover:text-white! hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
                          <div className="py-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 transition-colors duration-200 group"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-orange-500 transition-colors duration-300" />
                                  <span className="font-medium">
                                    {subItem.label}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-4 rounded-xl font-medium transition-all duration-300 relative group ${
                        pathname === item.href
                          ? "text-orange-600"
                          : isScrolled
                          ? "text-gray-700 hover:text-orange-600"
                          : "text-white/90! hover:text-white!"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 ${
                          pathname === item.href
                            ? "w-full bg-gradient-to-r from-orange-500 to-orange-600"
                            : "group-hover:w-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
                        }`}
                      />
                    </Link>
                  )}
                </div>
              ))}

              <button className="ml-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2.5 rounded-xl transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 mt-2 py-4 animate-slideDown">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.href}>
                    {item.dropdown ? (
                      <div className="px-4">
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium ${
                            pathname.startsWith(item.href)
                              ? "text-orange-600 bg-orange-50"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              openDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === item.label && (
                          <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={closeMenu}
                                className={`block py-2.5 px-4 rounded-lg font-medium ${
                                  pathname === subItem.href
                                    ? "text-orange-600 bg-orange-50"
                                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/50"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`block px-4 py-3.5 mx-4 rounded-lg font-medium ${
                          pathname === item.href
                            ? "text-orange-600 bg-orange-50"
                            : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 mt-6">
                <button
                  onClick={closeMenu}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </button>
              </div>

            </div>
          )}
        </div>
      </nav>

      {/* Add styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
