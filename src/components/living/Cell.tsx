"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { amoeba } from "./geometry";
import { useAmoeba } from "./useAmoeba";

/*
 * An agent drawn as a living cell: two membranes, a body and a nucleus, each
 * rippling on its own rhythm like an amoeba. The outer layers move most.
 */

type CellProps = {
  seed: number;
  children?: React.ReactNode;
  className?: string;
  /** Colour of the cell body; the ground behind it should be a shade lighter. */
  body?: string;
  live?: boolean;
};

export function Cell({ seed, children, className = "", body = "#0b2219", live = false }: CellProps) {
  const ref = useRef<HTMLDivElement>(null);
  useAmoeba(ref);

  const layers = [
    { key: "outer", cx: 200, cy: 200, r: 182, amp: 0.11, speed: 0.6, seed: seed, fill: "none", stroke: 0.3, width: 1.2 },
    { key: "membrane", cx: 200, cy: 200, r: 168, amp: 0.095, speed: 0.8, seed: seed + 1, fill: "none", stroke: 0.55, width: 1.5 },
    { key: "body", cx: 200, cy: 206, r: 148, amp: 0.06, speed: 0.65, seed: seed + 2, fill: body, stroke: 0, width: 0 },
    { key: "halo", cx: 200, cy: 98, r: 34, amp: 0.12, speed: 1, seed: seed + 3, fill: "none", stroke: 0.45, width: 1.2 },
    { key: "nucleus", cx: 200, cy: 98, r: 22, amp: 0.14, speed: 1.3, seed: seed + 4, fill: live ? "#c8f03c" : "#8fae96", stroke: 0, width: 0 },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q("[data-amoeba]"), {
          scale: 0.6,
          opacity: 0,
          transformOrigin: "50% 50%",
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        {layers.map((l) => (
          <path
            key={l.key}
            data-amoeba
            data-cx={l.cx}
            data-cy={l.cy}
            data-r={l.r}
            data-seed={l.seed}
            data-amp={l.amp}
            data-speed={l.speed}
            d={amoeba(l.cx, l.cy, l.r, l.seed, 0, l.amp)}
            fill={l.fill}
            stroke={l.stroke ? "#8fae96" : "none"}
            strokeOpacity={l.stroke}
            strokeWidth={l.width}
          />
        ))}
      </svg>
      <div className="absolute inset-[18%] top-[36%] flex flex-col items-center text-center">{children}</div>
    </div>
  );
}
