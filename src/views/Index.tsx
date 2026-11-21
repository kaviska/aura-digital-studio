import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
// import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <PageEffects />
        <Header />
        <main>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <ServicesSection />
          <TechStackSection />
          <WhyChooseUsSection />
          {/* <TestimonialsSection /> */}
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
