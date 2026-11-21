import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { ParticleField } from "@/components/hero/ParticleField";
import { FloatingCards } from "@/components/hero/FloatingCards";

const beams = [
  { left: "12%", delay: "0s", duration: "7s" },
  { left: "28%", delay: "3.5s", duration: "9s" },
  { left: "47%", delay: "1.2s", duration: "8s" },
  { left: "66%", delay: "5s", duration: "10s" },
  { left: "84%", delay: "2.4s", duration: "7.5s" },
];

/** Splits text into words that rise out of a blur one after another. */
function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: delay + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {" "}
        </span>
      ))}
    </>
  );
}

const rotatingWords = ["Scalable", "Secure", "Stunning", "Smart"];

const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-grid align-bottom">
      {/* Invisible longest word reserves width so the line never jumps */}
      <span className="invisible col-start-1 row-start-1">Stunning</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text col-start-1 row-start-1"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor tracking: normalized (-0.5..0.5) for parallax, pixels for the spotlight.
  const mouseX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const spotX = useMotionValue(-1000);
  const spotY = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX}px ${spotY}px, hsl(var(--primary) / 0.18), transparent 60%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    spotX.set(event.clientX - rect.left);
    spotY.set(event.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img src={heroBg.src} alt="" aria-hidden className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      </motion.div>

      {/* Aurora lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora-blob left-[-10%] top-[5%] h-[45vmax] w-[45vmax] bg-primary/50" />
        <div
          className="aurora-blob right-[-15%] top-[25%] h-[40vmax] w-[40vmax] bg-accent/50"
          style={{ animationDelay: "-6s", animationDuration: "22s" }}
        />
        <div
          className="aurora-blob bottom-[-20%] left-[25%] h-[35vmax] w-[35vmax] bg-red-500/30"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      {/* Interactive particle network */}
      <ParticleField className="absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      {/* Cursor spotlight */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      {/* Falling light beams */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {beams.map((beam) => (
          <span
            key={beam.left}
            className="hero-beam"
            style={{ left: beam.left, animationDelay: beam.delay, animationDuration: beam.duration }}
          />
        ))}
      </div>

      <FloatingCards mouseX={mouseX} mouseY={mouseY} />

      {/* Dot grid with radial fade */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--cyan) / 0.45) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 mx-auto px-4 pb-16 pt-28 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="spin-border mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Now taking new projects
            </span>
          </motion.div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <RevealWords text="We Build" delay={0.15} />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <RotatingWord />
            </motion.span>
            <br />
            <RevealWords text="Digital Solutions" delay={0.6} />
          </h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.85}
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            We design and engineer web platforms, POS systems, e-commerce stores and SaaS
            products that help businesses grow and run more efficiently.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button variant="hero" size="xl" className="group relative w-full overflow-hidden sm:w-auto" asChild>
              <a href="#projects">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                View Our Work
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" className="w-full backdrop-blur-sm sm:w-auto" asChild>
              <a href="#contact">
                <MessageCircle className="h-5 w-5" />
                Let's Talk
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.15}
            className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/50 bg-card/40 p-4 text-center backdrop-blur-md transition-colors hover:border-primary/40"
              >
                <div className="mb-1 font-display text-3xl font-bold gradient-text sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
