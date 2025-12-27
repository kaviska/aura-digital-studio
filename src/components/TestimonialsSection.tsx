import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Oolin transformed our vision into reality. Their expertise in React and Node.js helped us launch our SaaS platform 2 months ahead of schedule.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, FinanceFlow",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "The team's attention to detail and commitment to quality is unmatched. They delivered a complex financial application that exceeded our expectations.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, HealthTech Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Working with Oolin was a game-changer. Their mobile development expertise helped us reach millions of users with our healthcare app.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "VP Engineering, RetailMax",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content: "Their e-commerce solution increased our online sales by 300%. The platform handles thousands of transactions daily without any issues.",
    rating: 5,
  },
];

const clientLogos = [
  "TechCorp", "InnovateLabs", "StartupX", "GlobalTech", "NextGen", "FutureSoft"
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-container bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan font-semibold mb-4 tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it – hear from some of our satisfied clients.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-cyan/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-cyan text-cyan" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan/30"
                />
                <div>
                  <h4 className="font-display font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="text-2xl font-display font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
