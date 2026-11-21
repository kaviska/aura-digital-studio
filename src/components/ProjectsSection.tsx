import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";

const categories = ["All", "POS Systems", "E-commerce", "Web Apps", "WordPress"];

const fallbackProjects = [
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
    id: 10,
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
    id: 11,
    title: "Aayubo Events",
    description: "Online ticketing platform for event organizers and attendees with streamlined booking flows and event management tools.",
    image: "/download (15).jpg",
    category: "Web Apps",
    techStack: ["React", "Next", "Tailwind", "MySql"],
    liveUrl: "https://events.aayubo.jp/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 12,
    title: "TapID Platform",
    description: "NFC card generation platform for creating and managing smart digital cards with fast provisioning and profile linking.",
    image: "/download (16).jpg",
    category: "Web Apps",
    techStack: ["React", "Laravel", "Tailwind", "MySql"],
    liveUrl: "https://tapid.oolln.com/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 13,
    title: "Rentify",
    description: "Item rental management platform for tracking listings, availability, and bookings in one central dashboard.",
    image: "/download (17).jpg",
    category: "Web Apps",
    techStack: ["React", "Next", "Tailwind", "MySql"],
    liveUrl: "https://rentify.aayubo.jp/",
    githubUrl: "#",
    caseStudyUrl: "#",
  },
 
];

type Project = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
};

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-secondary to-accent/20">
        <ImageOff className="h-10 w-10 text-muted-foreground/60" />
      </div>
    );
  }

  return (
    <img
      src={src.includes("%") ? src : encodeURI(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Subtle 3D tilt for mouse users; touch devices never fire mousemove so cards stay flat.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="spotlight group relative flex flex-col rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[0_25px_50px_-20px_hsl(var(--primary)/0.45)]"
    >
      {/* No backdrop-filter on the image area: iOS Safari can drop images under blurred, clipped, transformed layers. */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-secondary [transform:translateZ(0)]">
        <ProjectImage src={project.image} alt={project.title} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/80 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          {project.category}
        </span>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live site`}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan to-accent text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 md:-translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-xl font-bold transition-colors group-hover:text-cyan">
          {project.title}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-all group-hover:gap-2.5"
          >
            View live project
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load projects");
        return response.json();
      })
      .then((managedProjects) => {
        if (Array.isArray(managedProjects) && managedProjects.length > 0) {
          setProjects(managedProjects);
        }
      })
      .catch(() => {
        // Keep the bundled portfolio visible if the database is unavailable.
      });
  }, []);

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="section-container relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-12"
        >
          <span className="section-eyebrow">Our Portfolio</span>
          <h2 className="mb-6 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Real products running in production. Explore what we've shipped for our clients.
          </p>
        </motion.div>

        {/* Category filters: swipeable row on mobile, centered on larger screens */}
        <div className="-mx-4 mb-10 overflow-x-auto px-4 scrollbar-hide md:mb-12">
          <div className="mx-auto flex w-max gap-1 rounded-full border border-border/60 bg-card/60 p-1.5">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
