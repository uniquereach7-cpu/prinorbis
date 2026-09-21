"use client";

import { motion } from "motion/react";
import { DrawnPath } from "@/components/ui/DrawnPath";
import type { StageId } from "@/content/site";

/*
 * The engagement path: Discover, Prove and Launch rise toward Orbit on one
 * baseline, and a dashed trajectory carries the first point into orbit.
 * Always four stages, always in this order, always rising.
 */

const BASE = 420;

const blocks: { id: StageId; label: string; x: number; w: number; h: number; fill: string; ink: string }[] = [
  { id: "discover", label: "01 · Discover", x: 40, w: 240, h: 100, fill: "#cfdbe2", ink: "#0a1d29" },
  { id: "prove", label: "02 · Prove", x: 300, w: 240, h: 170, fill: "#9bb6c6", ink: "#0a1d29" },
  { id: "launch", label: "03 · Launch", x: 560, w: 240, h: 250, fill: "#045475", ink: "#f4f2ee" },
  { id: "orbit", label: "04 · Orbit", x: 820, w: 420, h: 340, fill: "#061722", ink: "#f4f2ee" },
];

const topRounded = (x: number, w: number, h: number, r = 16) => {
  const y = BASE - h;
  return `M ${x} ${BASE} V ${y + r} Q ${x} ${y} ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${BASE} Z`;
};

const ORBIT = { cx: 1020, cy: 250 };
const LANDING = { x: 914, y: 146 };

export function KeyVisual({ active }: { active: StageId | null }) {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.svg
      viewBox="0 0 1200 440"
      className="block h-auto w-full"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      role="img"
      aria-label="The engagement path: Discover, Prove and Launch rise toward Orbit."
    >
      <defs>
        <clipPath id="kv-orbit-clip">
          <path d={topRounded(820, 420, 340)} />
        </clipPath>
      </defs>

      <line x1={0} x2={1200} y1={BASE} y2={BASE} stroke="#0a1d29" strokeOpacity={0.15} />

      {blocks.map((b, i) => (
        <motion.g
          key={b.id}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
          transition={{ duration: 0.8, ease, delay: i * 0.14 }}
        >
          <g style={{ opacity: active && active !== b.id ? 0.4 : 1, transition: "opacity 300ms" }}>
            <path d={topRounded(b.x, b.w, b.h)} fill={b.fill} />
            <text
              x={b.x + 20}
              y={BASE - 22}
              fill={b.ink}
              fillOpacity={0.85}
              className="hidden sm:block"
              style={{ font: "500 13px var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              {b.label}
            </text>
          </g>
        </motion.g>
      ))}

      {/* orbit rings inside the Orbit block */}
      <motion.g
        clipPath="url(#kv-orbit-clip)"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <g className="spin-slow" style={{ transformOrigin: `${ORBIT.cx}px ${ORBIT.cy}px`, transformBox: "view-box" }}>
          {[55, 100, 150].map((r, i) => (
            <circle
              key={r}
              cx={ORBIT.cx}
              cy={ORBIT.cy}
              r={r}
              fill="none"
              stroke="#9bb6c6"
              strokeOpacity={0.45 - i * 0.08}
              strokeDasharray={i === 1 ? "2 8" : undefined}
              strokeLinecap="round"
              strokeWidth={i === 1 ? 2 : 1.25}
            />
          ))}
        </g>
        <circle cx={ORBIT.cx} cy={ORBIT.cy} r={5} fill="#9bb6c6" fillOpacity={0.6} />
      </motion.g>

      {/* the trajectory */}
      <circle cx={24} cy={318} r={5} fill="#4d5e69" fillOpacity={0.6} />
      <DrawnPath
        d={`M 24 318 C 300 290, 560 110, ${LANDING.x} ${LANDING.y}`}
        stroke="#4d5e69"
        strokeWidth={2}
        transition={{ duration: 1.1, ease, delay: 0.7 }}
      />

      {/* the first point lands */}
      <motion.g
        variants={{ hidden: { scale: 0 }, shown: { scale: 1 } }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.75 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle cx={LANDING.x} cy={LANDING.y} r={9} fill="#f11123" className="pulse-ring" />
        <circle cx={LANDING.x} cy={LANDING.y} r={9} fill="#f11123" stroke="#061722" strokeWidth={3} />
      </motion.g>
    </motion.svg>
  );
}
