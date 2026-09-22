"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ring, ringPoint } from "./geometry";
import { industries } from "@/content/site";

/*
 * Every year of growth leaves a ring. Rings draw outward from the first
 * point as the section scrolls in; each industry sits on its own ring.
 */

const C = 300;
const RINGS = Array.from({ length: 10 }, (_, k) => 34 + k * 27);
const NODE_RING = [3, 4, 5, 6, 7, 8];
const NODE_ANGLE = [-62, 148, 24, 236, 98, -128];

export function TreeRings({ selected, onSelect, className = "" }: { selected?: number; onSelect?: (i: number) => void; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%", end: "center 45%", scrub: 1 } });
        tl.from(q("[data-ring]"), { drawSVG: "0%", duration: 1, stagger: 0.12, ease: "none" });
        tl.from(q("[data-node]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%", stagger: 0.1, duration: 0.4 }, 0.6);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox="0 0 600 600" className={className} role="img" aria-label="Growth rings with six industries">
      <defs>
        <radialGradient id="ring-core">
          <stop offset="0%" stopColor="#c8f03c" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#c8f03c" stopOpacity="0" />
        </radialGradient>
      </defs>
      {RINGS.map((r, k) => {
        const on = selected !== undefined && NODE_RING[selected] === k;
        return (
          <path
            key={r}
            data-ring
            d={ring(C, C, r, 90 + k, 0.035 + k * 0.009)}
            fill="none"
            stroke={on ? "#f4efe4" : "#8fae96"}
            strokeOpacity={on ? 0.8 : 0.16 + (k % 3 === 0 ? 0.22 : 0.08)}
            strokeWidth={on ? 1.6 : k % 3 === 0 ? 1.4 : 1}
            style={{ transition: "stroke 400ms, stroke-opacity 400ms" }}
          />
        );
      })}
      <circle cx={C} cy={C} r={56} fill="url(#ring-core)" />
      <circle cx={C} cy={C} r={8} fill="#c8f03c" className="pulse-ring" />
      <circle cx={C} cy={C} r={8} fill="#c8f03c" />

      {industries.map((ind, i) => {
        const k = NODE_RING[i];
        const [x, y] = ringPoint(C, C, RINGS[k], 90 + k, NODE_ANGLE[i], 0.035 + k * 0.009);
        const on = selected === i;
        return (
          <g
            key={ind.slug}
            data-node
            onClick={() => onSelect?.(i)}
            className={onSelect ? "cursor-pointer" : undefined}
            role={onSelect ? "button" : undefined}
            aria-label={onSelect ? ind.name : undefined}
          >
            <circle cx={x} cy={y} r={on ? 15 : 11} fill={on ? "#c8f03c" : "#0b2219"} stroke="#8fae96" strokeOpacity={on ? 0 : 0.7} style={{ transition: "r 300ms, fill 300ms" }} />
            <text x={x} y={y + 3.5} textAnchor="middle" fill={on ? "#0b2219" : "#f4efe4"} style={{ font: "600 9.5px var(--font-mono)" }}>
              {ind.code}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
