import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "POS Systems", "E-commerce", "Web Apps", "WordPress"];

const projects = [
  {
    id: 1,
    title: "POS System",
    description: "A comprehensive web-based Point of Sale system with admin dashboard. Features include inventory management, sales tracking, and user authentication. Login with admin@example.com / password for demo access.",
    image: "/groccery.svg",
    category: "POS Systems",
    techStack: ["Next", "React", "Tailwind", "MySql", "github"],
    liveUrl: "https://temp-pos.vercel.app",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 2,
    title: "Restaurant POS System",
    description: "Multi-role restaurant POS system with separate access for Admin, Kitchen, Cashier, and Waiter. Features role-based permissions, order management, kitchen display system, and real-time updates.",
    image: "/resturant.avif",
    category: "POS Systems",
    techStack: ["Laravel", "Tailwind", "React", "Redux", "MUI"],
    liveUrl: "https://white-octopus-933718.hostingersite.com",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 3,
    title: "Japanese E-Commerce",
    description: "A comprehensive Japanese e-commerce platform built with WooCommerce. Features include multi-language support, Japanese payment gateways, and custom product catalog management.",
    image: "/groccery.svg",
    category: "E-commerce",
    techStack: ["Laravel", "Tailwind", "React", "Redux", "MUI"],
    liveUrl: "https://iymart.jp/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 4,
    title: "Japanese Car Sales",
    description: "Japanese car dealership website with advanced search filters, car listings management, and inquiry system. Features include vehicle comparison, detailed specifications, and contact forms.",
    image: "/car.webp",
    category: "Web Apps",
    techStack: ["Laravel", "Php", "Bootstrap", "Css", "JavaScript"],
    liveUrl: "https://nipponcars.jp/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
   {
    id: 7,
    title: "Next.js E-Commerce",
    description: "Modern e-commerce website built with Next.js featuring product catalog, shopping cart, user authentication, and responsive design. Includes Redux for state management and Material-UI components.",
    image: "/e-commerce-img.avif",
    category: "E-commerce",
    techStack: ["Laravel", "React", "Tailwind", "Redux", "MUI", "github"],
    liveUrl: "https://next-e-commerce-neon.vercel.app/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
   {
    id: 9,
    title: "ERP System",
   
    image: "/dashboard.png",
    description: "Comprehensive ERP system built for travel agencies featuring 12 specialized panels. Includes export functionality to PDF and Excel, automated invoice generation, and complete account management system for streamlined travel business operations.",
    category: "Web Apps",
    techStack: ["AI", "React", "Next", "Tailwind", "OpenAI"],
    liveUrl: "https://cvreviewexpert.com/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 9,
    title: "CV Review Expert",
    description: "AI-powered CV review platform that provides intelligent feedback and recommendations to improve your resume. Features include automated analysis, personalized suggestions, and professional formatting tips.",
    image: "/cvreview.jpeg",
    category: "Web Apps",
    techStack: ["AI", "React", "Next", "Tailwind", "OpenAI"],
    liveUrl: "https://cvreviewexpert.com/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  // {
  //   id: 5,
  //   title: "Instagram Downloader Tool",
  //   description: "A web tool for downloading Instagram content including photos, videos, and stories. Built with Next.js and features a clean, user-friendly interface with fast download capabilities.",
  //   image: "/instragram.jpg",
  //   category: "Web Apps",
  //   techStack: ["Next", "React", "MUI", "Tailwind", "github"],
  //   liveUrl: "https://savefrominsta.app/",
  //   githubUrl: "#",
  //   caseStudyUrl: "#",
  // },
  {
    id: 6,
    title: "Parking Booking System",
    description: "Airport parking booking platform with Stripe payment integration. Features include real-time availability, booking management, and automated confirmation emails.",
    image: "/Meet&Greet.png",
    category: "Web Apps",
    techStack: ["Html", "Css", "Bootstrap", "Php", "Stripe"],
    liveUrl: "https://parking.yourmeetandgreetservice.co.uk/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
 
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section-container" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-cyan font-semibold mb-4 tracking-wider uppercase text-sm">
            Our Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our latest work and see how we've helped businesses achieve their digital goals.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "hero" : "glass"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover-lift"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 tech-badge">
                  {project.category}
                </span>

                {/* Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm">
                  <Button variant="hero" size="icon" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
