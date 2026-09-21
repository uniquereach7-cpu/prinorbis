"use client";

import { motion } from "motion/react";
import { cfoSuite } from "@/content/site";

/*
 * The Agentic CFO suite drawn on the logo's hexagon: five agents and your
 * team sit on the six vertices, with the ledger as the first point at the
 * centre. Handoffs travel clockwise around the ring.
 */

const C = 260;
const R = 180;

const nodes = [
  ...cfoSuite.map((a) => ({ id: a.id, label: a.short, team: false })),
  { id: "YOU", label: "Your team", team: true },
];

const points = nodes.map((_, i) => {
  const angle = ((-90 + i * 60) * Math.PI) / 180;
  return { x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R };
});

const hexPath = points.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";

export function SuiteHex() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <svg viewBox="-70 0 660 520" className="h-auto w-full" role="img" aria-label="Five finance agents and your team around the ledger">
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <circle cx={C} cy={C} r={R + 44} fill="none" stroke="#9bb6c6" strokeOpacity={0.15} strokeDasharray="2 8" />
        <path d={hexPath} fill="none" stroke="#9bb6c6" strokeOpacity={0.35} strokeWidth={1.25} />
        {points.map((p, i) => (
          <line
            key={i}
            x1={C}
            y1={C}
            x2={p.x}
            y2={p.y}
            stroke="#9bb6c6"
            strokeOpacity={0.22}
            strokeDasharray="3 7"
            className="dash-flow"
            style={{ animationDirection: "reverse" }}
          />
        ))}
      </motion.g>

      {/* a handoff pulse travels around the hexagon */}
      <motion.circle
        r={4}
        fill="#f4f2ee"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
        style={{ offsetPath: `path("${hexPath}")`, offsetRotate: "0deg" }}
      />

      {points.map((p, i) => {
        const n = nodes[i];
        const below = p.y > C + 10;
        const side = p.x > C + 10 ? 1 : p.x < C - 10 ? -1 : 0;
        const lx = p.x + side * 26;
        const ly = side === 0 ? (below ? p.y + 40 : p.y - 48) : p.y + 4;
        const anchor = side === 1 ? "start" : side === -1 ? "end" : "middle";
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.1 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={p.x} cy={p.y} r={18} fill={n.team ? "#f4f2ee" : "#0c2433"} stroke="#9bb6c6" strokeOpacity={n.team ? 0 : 0.5} />
            <polygon
              points={[0, 1, 2, 3, 4, 5]
                .map((k) => {
                  const a = ((-90 + k * 60) * Math.PI) / 180;
                  return `${(p.x + Math.cos(a) * 7).toFixed(1)},${(p.y + Math.sin(a) * 7).toFixed(1)}`;
                })
                .join(" ")}
              fill={n.team ? "#061722" : "none"}
              stroke={n.team ? "none" : "#9bb6c6"}
              strokeWidth={1.5}
            />
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              fill="#f4f2ee"
              style={{ font: "600 15px var(--font-sans)" }}
            >
              {n.label}
            </text>
            <text
              x={lx}
              y={ly + 17}
              textAnchor={anchor}
              fill="#9bb6c6"
              fillOpacity={0.8}
              style={{ font: "500 9.5px var(--font-mono)", letterSpacing: "0.12em" }}
            >
              {n.team ? "APPROVES" : `AGENT.${n.id}`}
            </text>
          </motion.g>
        );
      })}

      <circle cx={C} cy={C} r={46} fill="#045475" fillOpacity={0.25} />
      <circle cx={C} cy={C} r={12} fill="#f11123" className="pulse-ring" />
      <circle cx={C} cy={C} r={12} fill="#f11123" />
      <text
        x={C}
        y={C + 36}
        textAnchor="middle"
        fill="#f4f2ee"
        fillOpacity={0.6}
        style={{ font: "500 9.5px var(--font-mono)", letterSpacing: "0.14em" }}
      >
        LEDGER
      </text>
    </svg>
  );
}
