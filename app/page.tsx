import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection serviceCount={3} showDevelopmentProcess={false} compactMode={true}/>
      <CTASection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}
