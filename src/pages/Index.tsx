import { Helmet } from "react-helmet-async";
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

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Oolin - We Build Scalable Digital Solutions | IT Company</title>
        <meta 
          name="description" 
          content="Transform your business with cutting-edge technology. Oolin delivers innovative web, mobile, and software solutions that drive growth and efficiency." 
        />
        <meta name="keywords" content="IT company, software development, web development, mobile apps, SaaS, custom software, React, Node.js" />
        <meta property="og:title" content="Oolin - We Build Scalable Digital Solutions" />
        <meta property="og:description" content="Transform your business with cutting-edge technology. We deliver innovative web, mobile, and software solutions." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://Oolin.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <TechStackSection />
          <WhyChooseUsSection />
          {/* <TestimonialsSection /> */}
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
