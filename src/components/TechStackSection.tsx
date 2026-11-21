import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TechSlider } from "@/components/TechSlider";

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
          className="text-center mb-12"
        >
          <span className="section-eyebrow">
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

        <TechSlider />
      </div>
    </section>
  );
}
