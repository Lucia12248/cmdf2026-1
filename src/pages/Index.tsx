import BackgroundOrbs from "@/components/wonderead/BackgroundOrbs";
import Navbar from "@/components/wonderead/Navbar";
import HeroSection from "@/components/wonderead/HeroSection";
import Ticker from "@/components/wonderead/Ticker";
import FeaturesSection from "@/components/wonderead/FeaturesSection";
import ADHDSection from "@/components/wonderead/ADHDSection";
import SceneBrowser from "@/components/wonderead/SceneBrowser";
import ParentDashboard from "@/components/wonderead/ParentDashboard";
import CTASection from "@/components/wonderead/CTASection";
import Footer from "@/components/wonderead/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BackgroundOrbs />
      <Navbar />
      <HeroSection />
      <Ticker />
      <FeaturesSection />
      <ADHDSection />
      <SceneBrowser />
      <ParentDashboard />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
