import { motion, useTransform, type MotionValue } from "framer-motion";
import { CheckCircle2, TrendingUp, Zap } from "lucide-react";

type Props = { mouseX: MotionValue<number>; mouseY: MotionValue<number> };

function useParallax(value: MotionValue<number>, strength: number) {
  return useTransform(value, [-0.5, 0.5], [-strength, strength]);
}

const codeLines = [
  { indent: 0, parts: [["text-fuchsia-400", "const "], ["text-sky-300", "app"], ["text-zinc-200", " = "], ["text-amber-300", "build"], ["text-zinc-200", "({"]] },
  { indent: 1, parts: [["text-emerald-300", "scalable"], ["text-zinc-200", ": "], ["text-orange-300", "true"], ["text-zinc-200", ","]] },
  { indent: 1, parts: [["text-emerald-300", "secure"], ["text-zinc-200", ": "], ["text-orange-300", "true"], ["text-zinc-200", ","]] },
  { indent: 1, parts: [["text-emerald-300", "stack"], ["text-zinc-200", ": ["], ["text-lime-300", "'next'"], ["text-zinc-200", ", "], ["text-lime-300", "'laravel'"], ["text-zinc-200", "]"]] },
  { indent: 0, parts: [["text-zinc-200", "});"]] },
];

const bars = [38, 52, 45, 64, 58, 78, 92];

/** Decorative product-UI cards orbiting the headline (desktop only). */
export function FloatingCards({ mouseX, mouseY }: Props) {
  const x1 = useParallax(mouseX, -28);
  const y1 = useParallax(mouseY, -22);
  const x2 = useParallax(mouseX, 34);
  const y2 = useParallax(mouseY, 26);
  const x3 = useParallax(mouseX, -18);
  const y3 = useParallax(mouseY, 30);
  const x4 = useParallax(mouseX, 22);
  const y4 = useParallax(mouseY, -18);

  const card = "absolute rounded-2xl border border-border/60 bg-card/70 shadow-2xl backdrop-blur-xl";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] hidden xl:block">
      {/* Code editor */}
      <motion.div style={{ x: x1, y: y1 }} className="absolute left-[4%] top-[22%]">
        <motion.div
          initial={{ opacity: 0, x: -60, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`${card} w-72 hero-float !border-white/10 !bg-zinc-950/85 p-4 [animation-duration:7s]`}
        >
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-auto text-[10px] text-muted-foreground">app.ts</span>
          </div>
          <div className="space-y-1 font-mono text-xs">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + i * 0.18 }}
                style={{ paddingLeft: line.indent * 14 }}
                className="whitespace-nowrap"
              >
                {line.parts.map(([cls, text], j) => (
                  <span key={j} className={cls}>{text}</span>
                ))}
              </motion.div>
            ))}
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-primary align-middle" />
          </div>
        </motion.div>
      </motion.div>

      {/* Growth chart */}
      <motion.div style={{ x: x2, y: y2 }} className="absolute right-[4%] top-[20%]">
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 5 }}
          transition={{ delay: 1.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`${card} w-60 hero-float p-4 [animation-delay:-2s] [animation-duration:8s]`}
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Monthly growth</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="mb-3 font-display text-2xl font-bold">+128%</p>
          <div className="flex h-16 items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.5 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                className="flex-1 rounded-t bg-gradient-to-t from-accent to-primary"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Deploy toast */}
      <motion.div style={{ x: x3, y: y3 }} className="absolute bottom-[20%] left-[8%]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`${card} flex hero-float items-center gap-3 px-4 py-3 [animation-delay:-4s] [animation-duration:6s]`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/15">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </span>
          <span>
            <span className="block text-sm font-semibold">Deployed to production</span>
            <span className="block text-xs text-muted-foreground">Build passed · 42s</span>
          </span>
        </motion.div>
      </motion.div>

      {/* Performance ring */}
      <motion.div style={{ x: x4, y: y4 }} className="absolute bottom-[22%] right-[9%]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`${card} flex hero-float items-center gap-3 px-4 py-3 [animation-delay:-1s] [animation-duration:7.5s]`}
        >
          <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" className="stroke-secondary" strokeWidth="3.5" />
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.98 }}
              transition={{ delay: 1.8, duration: 1.4, ease: "easeOut" }}
            />
          </svg>
          <span>
            <span className="flex items-center gap-1 text-sm font-semibold">
              <Zap className="h-3.5 w-3.5 text-amber-400" /> Performance 98
            </span>
            <span className="block text-xs text-muted-foreground">Lighthouse score</span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
