"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import { useChapter } from "./ChapterProvider";

/*
 * A root that grows down the right edge as the visitor scrolls. Each chapter
 * of the page is a node; its branchlet sprouts once the root reaches it.
 * The growing tip is the first point: lime on forest, flare on bone.
 */
export function GrowthRail() {
  const { tone, markers } = useChapter();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const height = useTransform(smooth, (v) => `${v * 100}%`);
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => setProgress(v));

  if (markers.length < 2) return null;
  const dark = tone === "dark";

  return (
    <div aria-hidden className="pointer-events-none fixed top-[120px] right-5 bottom-12 z-40 hidden w-6 lg:block xl:right-7">
      <div className={`absolute inset-y-0 right-3 w-px ${dark ? "bg-bone/10" : "bg-ink/10"}`} />
      <motion.div
        className={`absolute top-0 right-3 w-[1.5px] origin-top transition-colors duration-500 ${dark ? "bg-sage" : "bg-forest"}`}
        style={{ height }}
      />
      {markers.map((m, i) => {
        const reached = progress >= m.at - 0.002;
        const left = i % 2 === 0;
        return (
          <svg
            key={m.label}
            viewBox="0 0 24 18"
            className="absolute right-3 h-[18px] w-6 overflow-visible"
            style={{ top: `calc(${m.at * 100}% - 9px)`, transform: left ? "translateX(1px)" : "translateX(1px) scaleX(-1)" }}
          >
            <path
              d="M24 9 Q 14 9 6 2"
              fill="none"
              strokeWidth="1.25"
              strokeLinecap="round"
              className={`transition-[stroke-dashoffset,stroke] duration-700 ${dark ? "stroke-sage" : "stroke-forest"}`}
              strokeDasharray="22"
              strokeDashoffset={reached ? 0 : 22}
            />
            <circle
              cx="6"
              cy="2"
              r="1.8"
              className={`transition-opacity duration-500 ${dark ? "fill-sage" : "fill-forest"}`}
              opacity={reached ? 1 : 0}
            />
          </svg>
        );
      })}
      <motion.span className="absolute right-3 translate-x-1/2 -translate-y-1/2" style={{ top: height }}>
        <span className="relative flex size-2.5">
          <span className={`pulse-ring absolute inset-0 rounded-full ${dark ? "bg-lime" : "bg-flare"}`} />
          <span className={`relative size-2.5 rounded-full ${dark ? "bg-lime" : "bg-flare"}`} />
        </span>
      </motion.span>
    </div>
  );
}
