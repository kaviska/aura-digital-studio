import { motion } from "framer-motion";

type Tech = { name: string; logo: string; tag: string };

const rowOne: Tech[] = [
  { name: "React", logo: "React", tag: "Frontend" },
  { name: "Next.js", logo: "Next", tag: "Framework" },
  { name: "Vue.js", logo: "Vue", tag: "Frontend" },
  { name: "Angular", logo: "Angular", tag: "Frontend" },
  { name: "Tailwind CSS", logo: "Tailwind", tag: "Styling" },
  { name: "JavaScript", logo: "JavaScript", tag: "Language" },
  { name: "HTML5", logo: "Html", tag: "Markup" },
  { name: "CSS3", logo: "Css", tag: "Styling" },
  { name: "Redux", logo: "Redux", tag: "State" },
  { name: "Material UI", logo: "MUI", tag: "UI Kit" },
  { name: "Bootstrap", logo: "Bootstrap", tag: "UI Kit" },
  { name: "Figma", logo: "Figma", tag: "Design" },
];

const rowTwo: Tech[] = [
  { name: "Laravel", logo: "Laravel", tag: "Backend" },
  { name: "PHP", logo: "Php", tag: "Language" },
  { name: "MySQL", logo: "MySql", tag: "Database" },
  { name: "Java", logo: "Java", tag: "Language" },
  { name: "Flutter", logo: "Flutter", tag: "Mobile" },
  { name: "WordPress", logo: "Wordpress", tag: "CMS" },
  { name: "WooCommerce", logo: "Woocommerce", tag: "E-commerce" },
  { name: "Elementor", logo: "Elementor", tag: "Builder" },
  { name: "Stripe", logo: "Stripe", tag: "Payments" },
  { name: "cPanel", logo: "CPannel", tag: "Hosting" },
  { name: "VS Code", logo: "VS", tag: "Tooling" },
  { name: "Metronic", logo: "Metronic", tag: "Admin UI" },
];

function TechTile({ tech }: { tech: Tech }) {
  return (
    <div className="group mr-4 flex shrink-0 items-center gap-4 rounded-2xl border border-border/50 bg-card/70 py-3 pl-3 pr-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_15px_35px_-12px_hsl(var(--primary)/0.45)] md:mr-5">
      <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-inner md:h-14 md:w-14">
        <span className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={`/${tech.logo}.svg`}
          alt=""
          loading="lazy"
          className="relative h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </span>
      <span className="flex flex-col">
        <span className="whitespace-nowrap font-display text-base font-semibold transition-colors group-hover:text-cyan md:text-lg">
          {tech.name}
        </span>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{tech.tag}</span>
      </span>
    </div>
  );
}

function Row({ items, reverse, duration }: { items: Tech[]; reverse?: boolean; duration: number }) {
  return (
    <div className="marquee overflow-hidden py-3">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Duplicated list so the -50% translate loops seamlessly */}
        {[...items, ...items].map((tech, index) => (
          <TechTile key={`${tech.name}-${index}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export function TechSlider() {
  return (
    <div className="relative left-1/2 mb-16 w-screen -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Row items={rowOne} duration={45} />
        <Row items={rowTwo} duration={50} reverse />
      </motion.div>
    </div>
  );
}
