import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Smartphone, Palette, Cloud, Plug, Cog, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and Vue. Responsive, fast, and SEO-optimized.",
    features: ["Progressive Web Apps", "E-commerce Platforms", "Content Management Systems"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and Swift.",
    features: ["iOS & Android Apps", "Cross-Platform Solutions", "App Store Optimization"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that combines aesthetics with functionality. We create interfaces that users love.",
    features: ["User Research", "Wireframing & Prototyping", "Design Systems"],
  },
  {
    icon: Cloud,
    title: "SaaS & Custom Software",
    description: "End-to-end SaaS product development from concept to launch. Scalable architecture for growing businesses.",
    features: ["Product Strategy", "MVP Development", "Scalable Architecture"],
  },
  {
    icon: Plug,
    title: "API & System Integration",
    description: "Seamless integration of third-party services and APIs. Connect your systems for automated workflows.",
    features: ["RESTful & GraphQL APIs", "Third-party Integrations", "Legacy System Migration"],
  },
  {
    icon: Cog,
    title: "DevOps & Cloud Services",
    description: "Cloud infrastructure setup and management. CI/CD pipelines, containerization, and monitoring.",
    features: ["AWS, GCP, Azure", "Docker & Kubernetes", "CI/CD Pipelines"],
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-container bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan font-semibold mb-4 tracking-wider uppercase text-sm">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Comprehensive IT{" "}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From concept to deployment, we offer end-to-end services to bring your 
            digital vision to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-2xl p-8 hover-lift cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-cyan transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-cyan font-medium text-sm group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">
              Discuss Your Project
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
