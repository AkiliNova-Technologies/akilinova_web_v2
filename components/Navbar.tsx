"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  ArrowRight 
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  dropdown?: NavItem[];
  icon?: React.ReactNode;
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
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
    setMobileDropdownOpen(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileDropdownOpen(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
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
            <div className="flex items-center gap-3 relative z-[60]">
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
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
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
                            : "text-white/90 hover:text-white hover:bg-white/10"
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
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fadeIn">
                          <div className="py-2">
                            {item.dropdown.map((subItem, index) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 transition-colors duration-200 group"
                                onClick={() => setOpenDropdown(null)}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-orange-500 group-hover:scale-125 transition-all duration-300" />
                                  <span className="font-medium">
                                    {subItem.label}
                                  </span>
                                  <ChevronRight className="h-3 w-3 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-orange-500" />
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
                      className={`px-4 py-4 rounded-md font-medium transition-all duration-300 relative group ${
                        pathname === item.href
                          ? "text-orange-600"
                          : isScrolled
                          ? "text-gray-700 hover:text-orange-600"
                          : "text-white/90 hover:text-white"
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

              <button className="ml-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group">
                Get Started
                <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 relative z-[60] ${
                isScrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen
                      ? "rotate-45 translate-y-0"
                      : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen
                      ? "-rotate-45 translate-y-0"
                      : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden animate-fadeIn"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-[55] lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-3">
              {logo ? (
                <img
                  className="h-8 w-8"
                  src={logo}
                  alt={`${brandName} logo`}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              )}
              <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Menu
              </span>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-4">
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  className="animate-slideInRight"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.dropdown ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className={`w-full flex items-center justify-between px-4 py-4 rounded-sm font-semibold transition-all duration-300 ${
                          pathname.startsWith(item.href)
                            ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 shadow-none"
                            : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon && <span className="text-orange-500">{item.icon}</span>}
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            mobileDropdownOpen === item.label ? "rotate-180 text-orange-500" : "text-gray-400"
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown Items */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          mobileDropdownOpen === item.label
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="ml-4 mt-1 pl-4 border-l-2 border-orange-200 space-y-1">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={closeMenu}
                              className={`flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition-all duration-200 group ${
                                pathname === subItem.href
                                  ? "text-orange-600 bg-orange-50"
                                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/50 active:bg-orange-100"
                              }`}
                              style={{ animationDelay: `${(index + subIndex) * 30}ms` }}
                            >
                              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                pathname === subItem.href
                                  ? "bg-orange-500 scale-125"
                                  : "bg-gray-300 group-hover:bg-orange-400 group-hover:scale-110"
                              }`} />
                              <span className="flex-1">{subItem.label}</span>
                              <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                                pathname === subItem.href
                                  ? "opacity-100 translate-x-0 text-orange-500"
                                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400"
                              }`} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                        pathname === item.href
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 shadow-none"
                          : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon && <span className="text-orange-500">{item.icon}</span>}
                        {item.label}
                      </span>
                      {pathname === item.href && (
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-white to-orange-50">
            <button
              onClick={closeMenu}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 active:scale-95 group"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              Ready to transform your ideas into reality
            </p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
          opacity: 0;
        }

        /* Smooth scrolling for mobile menu */
        @media (max-width: 1024px) {
          body.menu-open {
            overflow: hidden;
          }
        }
      `}</style>
    </>
  );
}