import HeroSection from "@/components/Home/HeroSection";
import Services from "@/components/Home/Services";
import About from "@/components/Home/About";
import ProviderStories from "@/components/Home/Stories";
import CTASection from "@/components/Home/CTA";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Services />
      <About />
      <ProviderStories />
      <CTASection />
      <Footer />
    </>
  );
}
