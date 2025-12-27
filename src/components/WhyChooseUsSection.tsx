import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Code, Headphones, Rocket, Award } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We follow agile methodologies to ensure rapid development and timely delivery without compromising quality.",
  },
  {
    icon: Shield,
    title: "Scalable Architecture",
    description: "Our solutions are built to grow with your business, handling increased loads seamlessly.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "We write maintainable, well-documented code following industry best practices and standards.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is always available to assist you with any issues or questions.",
  },
  {
    icon: Rocket,
    title: "Innovation Driven",
    description: "We stay ahead of technology trends to bring you the most innovative solutions.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "200+ successful projects and 50+ satisfied clients speak to our commitment to excellence.",
  },
];

export function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-container" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan font-semibold mb-4 tracking-wider uppercase text-sm">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Your Success Is{" "}
            <span className="gradient-text">Our Priority</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We're not just developers – we're your technology partners committed 
            to your long-term success.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan to-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              
              <div className="relative glass rounded-2xl p-8 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan/20 to-accent/20 flex items-center justify-center mb-6 group-hover:from-cyan/30 group-hover:to-accent/30 transition-colors">
                  <reason.icon className="w-7 h-7 text-cyan" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-cyan transition-colors">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
