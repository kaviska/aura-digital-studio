import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Web Apps", "Mobile Apps", "E-commerce", "SaaS"];

const projects = [
  {
    id: 1,
    title: "FinTrack Pro",
    description: "AI-powered financial management platform with real-time analytics and automated reporting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "SaaS",
    techStack: ["React", "Node.js", "PostgreSQL", "TensorFlow"],
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 2,
    title: "ShopEase",
    description: "Multi-vendor e-commerce marketplace with advanced inventory management and payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "E-commerce",
    techStack: ["Next.js", "Stripe", "MongoDB", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 3,
    title: "HealthMate",
    description: "Telemedicine mobile app connecting patients with healthcare providers through video consultations.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    category: "Mobile Apps",
    techStack: ["React Native", "Firebase", "WebRTC", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 4,
    title: "TaskFlow",
    description: "Enterprise project management solution with Kanban boards, time tracking, and team collaboration.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    category: "Web Apps",
    techStack: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 5,
    title: "EduLearn",
    description: "Online learning platform with live classes, course management, and progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
    category: "SaaS",
    techStack: ["React", "Django", "PostgreSQL", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 6,
    title: "FoodieApp",
    description: "Food delivery mobile application with real-time order tracking and restaurant management.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    category: "Mobile Apps",
    techStack: ["Flutter", "Firebase", "Google Maps", "Stripe"],
    liveUrl: "#",
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
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm">
                  <Button variant="hero" size="icon" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="glass" size="icon" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="glass" size="icon" asChild>
                    <a href={project.caseStudyUrl}>
                      <FileText className="w-5 h-5" />
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
