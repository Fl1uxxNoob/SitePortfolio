import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PluginsSection from "@/components/PluginsSection";
import BotsSection from "@/components/BotsSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PluginsSection />
      <BotsSection />
      <ScreenshotsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
