"use client";

import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactMethodsSection from "@/components/contact/ContactMethodsSection";
import FormAndFAQSection from "@/components/contact/FormAndFAQSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        <ContactHeroSection />
        <FormAndFAQSection />
        <ChatWidget />
      </div>

      <Footer />
    </>
  );
}
