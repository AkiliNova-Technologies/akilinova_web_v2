import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";
import ServicesCTASection from "@/components/services/CTASection";
import IndustriesWeServeSection from "@/components/services/IndustriesWeServeSection";

import ServicesHeroSection from "@/components/services/ServicesHeroSection";
import ServicesSection from "@/components/services/ServicesSection";
import WhyChooseUsSection from "@/components/services/WhyChooseUsSection";


export default function Services() {
  return (
    <main>
      <Navbar />
      <ServicesHeroSection />
      <ServicesSection showDevelopmentProcess={false} />
      <WhyChooseUsSection />
      <IndustriesWeServeSection />
      <Footer />
    </main>
  );
}
