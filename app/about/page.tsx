import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import JourneyTimelineSection from "@/components/about/JourneyTimelineSection";
import LeadershipTeamSection from "@/components/about/LeadershipTeamSection";
import MissionVisionSection from "@/components/about/MIssionVisionSection";

export default function About() {
  return (
    <main>
      <Navbar />
      <AboutHeroSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <LeadershipTeamSection />
      {/* <JourneyTimelineSection /> */}
      <Footer />
    </main>
  );
}
