import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Site-wide polish:
 * - a gradient reading-progress bar pinned to the top of the viewport
 * - pointer-tracked "spotlight" glow for any element with the `.spotlight` class
 */
export function PageEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    // Only pointer devices with hover get the spotlight; touch screens skip the listener entirely.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", handleMove, { passive: true });
    return () => document.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan via-red-500 to-accent"
    />
  );
}
