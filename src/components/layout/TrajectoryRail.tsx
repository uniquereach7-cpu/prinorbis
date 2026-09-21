"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useChapter } from "./ChapterProvider";

/*
 * A dashed flight path fixed to the right edge. The red first point travels
 * down it as the visitor scrolls; ticks mark each chapter of the page.
 * Decorative only, so it is hidden from assistive tech.
 */
export function TrajectoryRail() {
  const { tone, markers } = useChapter();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const top = useTransform(smooth, (v) => `${v * 100}%`);

  if (markers.length < 2) return null;

  const dark = tone === "dark";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-[112px] right-5 bottom-10 z-40 hidden w-3 lg:block xl:right-7"
    >
      <div
        className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-500 ${
          dark ? "text-paper/30" : "text-ink/25"
        }`}
        style={{
          backgroundImage: "linear-gradient(to bottom, currentColor 0 4px, transparent 4px 10px)",
          backgroundSize: "1px 10px",
        }}
      />
      {markers.map((m) => (
        <span
          key={m.label}
          className={`absolute left-1/2 h-px w-2.5 -translate-x-1/2 transition-colors duration-500 ${
            dark ? "bg-paper/50" : "bg-ink/40"
          }`}
          style={{ top: `${m.at * 100}%` }}
        />
      ))}
      <motion.span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top }}>
        <span className="relative flex size-2.5">
          <span className="pulse-ring absolute inset-0 rounded-full bg-red" />
          <span className="relative size-2.5 rounded-full bg-red shadow-[0_0_0_3px_var(--color-paper)]" />
        </span>
      </motion.span>
    </div>
  );
}
