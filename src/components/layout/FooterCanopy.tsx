"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { branches } from "@/components/living/geometry";

const left = branches({ x: -20, y: 520, angle: -48, length: 150, levels: 7, seed: 77, spread: 28, decay: 0.77, width: 5, bend: 0.2, triple: 0.2 });
const right = branches({ x: 1460, y: 520, angle: -132, length: 150, levels: 7, seed: 78, spread: 28, decay: 0.77, width: 5, bend: 0.2, triple: 0.2 });
const all = [...left, ...right].sort((a, b) => a.depth - b.depth);

/** Two canopies reaching in from the corners of the footer, grown on arrival. */
export function FooterCanopy() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q("path"), {
          drawSVG: "0%",
          duration: 1.2,
          ease: "power2.out",
          stagger: { each: 0.006 },
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
        gsap.from(q("circle"), {
          opacity: 0,
          duration: 0.6,
          stagger: 0.01,
          delay: 1,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full" aria-hidden>
      {all.map((s, i) => (
        <path
          key={i}
          d={s.d}
          fill="none"
          stroke={s.depth > 4 ? "#c8f03c" : "#8fae96"}
          strokeOpacity={s.depth > 4 ? 0.22 : 0.3}
          strokeWidth={s.width}
          strokeLinecap="round"
        />
      ))}
      {all
        .filter((s) => s.depth === 7)
        .filter((_, i) => i % 3 === 0)
        .map((s, i) => (
          <circle key={i} cx={s.tip[0]} cy={s.tip[1]} r={2} fill="#c8f03c" opacity={0.6} />
        ))}
    </svg>
  );
}
