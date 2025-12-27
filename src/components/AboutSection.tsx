import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Lightbulb, Users } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the global leader in digital transformation, setting the standard for excellence in software development and IT services.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead of technology trends, constantly exploring new tools and methodologies to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our priority. We work closely with clients to understand their unique needs and deliver tailored solutions.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-container" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan font-semibold mb-4 tracking-wider uppercase text-sm">
            About Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Transforming Ideas Into{" "}
            <span className="gradient-text">Digital Reality</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            With over a decade of experience, we've helped startups and enterprises 
            build exceptional digital products that users love.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Story</h3>
              <p className="text-muted-foreground mb-4">
                Founded in 2014, Oolin began as a small team of passionate developers 
                with a shared vision: to make world-class software development accessible 
                to businesses of all sizes.
              </p>
              <p className="text-muted-foreground">
                Today, we're a full-service IT company with a global team of 50+ experts, 
                serving clients across 20+ countries. From startups to Fortune 500 companies, 
                we've delivered solutions that matter.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10+", label: "Years in Business" },
                { value: "200+", label: "Projects Completed" },
                { value: "50+", label: "Team Members" },
                { value: "20+", label: "Countries Served" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="glass rounded-xl p-6 text-center hover-lift"
                >
                  <div className="font-display text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass rounded-xl p-6 hover-lift group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-cyan/30 group-hover:to-accent/30 transition-colors">
                <feature.icon className="w-6 h-6 text-cyan" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
