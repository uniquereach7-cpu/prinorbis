"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/*
 * Threads between neighbouring cells in a row, with lime pulses travelling
 * along them: the handoffs between agents. Sized for a row of square cells
 * (viewBox height = one cell), so it lines up with a gap-less CSS grid.
 */
export function Mycelium({ cells = 3, className = "" }: { cells?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const w = cells * 400;
  const threads: string[] = [];
  for (let c = 0; c < cells - 1; c++) {
    const x1 = c * 400 + 360;
    const x2 = (c + 1) * 400 + 40;
    [-1, 0, 1].forEach((k) => {
      const y = 200 + k * 26;
      const bow = 30 * k + (c % 2 ? 12 : -12);
      threads.push(`M${x1} ${y} C${x1 + 30} ${y + bow} ${x2 - 30} ${y - bow} ${x2} ${y}`);
    });
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q("[data-thread]"), {
          drawSVG: "50% 50%",
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
        q("[data-pulse]").forEach((dot, i) => {
          const path = q("[data-thread]")[i % threads.length] as unknown as SVGPathElement;
          gsap.to(dot, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            duration: 2.4,
            ease: "sine.inOut",
            repeat: -1,
            repeatDelay: 1.2 + (i % 3) * 0.7,
            delay: i * 0.45,
            yoyo: i % 2 === 1,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox={`0 0 ${w} 400`} className={className} aria-hidden>
      {threads.map((d, i) => (
        <path key={i} data-thread d={d} fill="none" stroke="#8fae96" strokeOpacity={i % 3 === 1 ? 0.55 : 0.28} strokeWidth={i % 3 === 1 ? 1.5 : 1} />
      ))}
      {threads.map((_, i) =>
        i % 3 === 1 || i % 3 === 0 ? <circle key={i} data-pulse r={i % 3 === 1 ? 4 : 2.5} fill="#c8f03c" cx={-20} cy={-20} /> : null,
      )}
    </svg>
  );
}
