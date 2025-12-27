import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const techCategories = [
  {
    title: "Frontend",
    techs: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Vue.js", icon: "💚" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
    ],
  },
  {
    title: "Backend",
    techs: [
      { name: "Node.js", icon: "💚" },
      { name: "Python", icon: "🐍" },
      { name: "Laravel", icon: "🔴" },
      { name: "Django", icon: "🟢" },
      { name: "Go", icon: "🔵" },
    ],
  },
  {
    title: "Mobile",
    techs: [
      { name: "React Native", icon: "📱" },
      { name: "Flutter", icon: "💙" },
      { name: "Swift", icon: "🧡" },
      { name: "Kotlin", icon: "🟣" },
    ],
  },
  {
    title: "Database",
    techs: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🐬" },
      { name: "Redis", icon: "🔴" },
      { name: "Firebase", icon: "🔥" },
    ],
  },
  {
    title: "Cloud & DevOps",
    techs: [
      { name: "AWS", icon: "☁️" },
      { name: "Google Cloud", icon: "🌐" },
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "⚙️" },
      { name: "GitHub Actions", icon: "🔄" },
    ],
  },
  {
    title: "Tools & Others",
    techs: [
      { name: "GraphQL", icon: "◆" },
      { name: "REST APIs", icon: "🔗" },
      { name: "WebSocket", icon: "🔌" },
      { name: "Jest", icon: "🃏" },
      { name: "Figma", icon: "🎨" },
    ],
  },
];

export function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technologies" className="section-container bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan font-semibold mb-4 tracking-wider uppercase text-sm">
            Our Tech Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Technologies We{" "}
            <span className="gradient-text">Master</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We leverage cutting-edge technologies to build robust, scalable, and 
            future-proof solutions.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display text-lg font-bold mb-4 text-cyan">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.3, 
                      delay: categoryIndex * 0.1 + techIndex * 0.05 
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-default group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </span>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
