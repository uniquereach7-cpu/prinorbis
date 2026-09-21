"use client";

import { useRef } from "react";
import { useAnimationFrame, useReducedMotion } from "motion/react";
import { Mark } from "@/components/brand/Mark";
import { DrawnPath } from "@/components/ui/DrawnPath";

/*
 * The launchpad set piece: Orbis Agents circling the Prinorbis mark.
 * Each agent travels its own ring; a dashed handoff line always points
 * back to the centre. Positions are written straight to the DOM each frame.
 */

const C = 300;

const agents = [
  { id: "AGENT.CFO", r: 150, period: 46, phase: -0.6 },
  { id: "AGENT.CRO", r: 222, period: 70, phase: 2.1 },
  { id: "AGENT.INSURE", r: 222, period: 70, phase: 4.3 },
];

const rings = [96, 150, 222, 272];

const labelWidth = (id: string) => id.length * 7.4 + 22;
const labelOffset = (id: string, x: number) =>
  x > C + 30 ? `translate(${-16 - labelWidth(id)} -11)` : "translate(16 -11)";

export function HeroOrbit() {
  const reduce = useReducedMotion();
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const labelRefs = useRef<(SVGGElement | null)[]>([]);

  const place = (t: number) => {
    agents.forEach((a, i) => {
      const angle = a.phase + (t / 1000 / a.period) * Math.PI * 2;
      const x = C + Math.cos(angle) * a.r;
      const y = C + Math.sin(angle) * a.r;
      nodeRefs.current[i]?.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      // keep the label on the side facing the centre so it never leaves the frame
      labelRefs.current[i]?.setAttribute("transform", labelOffset(a.id, x));
      const line = lineRefs.current[i];
      if (line) {
        line.setAttribute("x2", x.toFixed(2));
        line.setAttribute("y2", y.toFixed(2));
      }
    });
  };

  useAnimationFrame((t) => {
    if (!reduce) place(t);
  });

  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full" aria-hidden>
        {rings.map((r, i) => (
          <circle
            key={r}
            cx={C}
            cy={C}
            r={r}
            fill="none"
            stroke="#9bb6c6"
            strokeOpacity={i === 3 ? 0.18 : 0.26}
            strokeWidth={1}
            strokeDasharray={i === 3 ? "2 7" : undefined}
          />
        ))}
        <g className="spin-slow">
          <circle
            cx={C}
            cy={C}
            r={186}
            fill="none"
            stroke="#9bb6c6"
            strokeOpacity={0.35}
            strokeDasharray="1 11"
            strokeLinecap="round"
            strokeWidth={2}
          />
        </g>

        {/* the trajectory into orbit */}
        <DrawnPath
          auto
          d="M 18 590 C 90 520, 150 470, 196 420 S 250 330, 300 300"
          stroke="#9bb6c6"
          strokeOpacity={0.55}
          strokeWidth={1.25}
          dash="4 6"
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
        <circle cx={18} cy={590} r={3.5} fill="#9bb6c6" fillOpacity={0.7} />

        {agents.map((a, i) => {
          const x = C + Math.cos(a.phase) * a.r;
          const y = C + Math.sin(a.phase) * a.r;
          const w = labelWidth(a.id);
          return (
            <g key={a.id}>
              <line
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                x1={C}
                y1={C}
                x2={x}
                y2={y}
                stroke="#9bb6c6"
                strokeOpacity={0.35}
                strokeDasharray="3 7"
                className="dash-flow"
              />
              <g
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                transform={`translate(${x} ${y})`}
              >
                <circle r={11} fill="#061722" stroke="#9bb6c6" strokeOpacity={0.4} />
                <circle r={4.5} fill="#f4f2ee" />
                <g
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  transform={labelOffset(a.id, x)}
                >
                  <rect width={w} height={22} rx={11} fill="#0c2433" stroke="#9bb6c6" strokeOpacity={0.3} />
                  <text
                    x={w / 2}
                    y={14.5}
                    textAnchor="middle"
                    fill="#f4f2ee"
                    fillOpacity={0.88}
                    style={{ font: "500 10.5px var(--font-mono)", letterSpacing: "0.1em" }}
                  >
                    {a.id}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </svg>

      {/* the mark sits at the centre, its red dot is the first point */}
      <div className="absolute top-1/2 left-1/2 w-[19%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[-38%] rounded-full bg-blue/25 blur-2xl" aria-hidden />
        <Mark tone="dark" live className="relative w-full" />
      </div>
    </div>
  );
}
