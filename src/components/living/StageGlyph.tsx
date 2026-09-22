"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { branches, thread } from "./geometry";
import type { StageId } from "@/content/site";

/*
 * One small drawing per stage, after the reference: a seed with rings, a
 * root, a spreading network and a canopy. Each draws itself in on view.
 */

const glyphs = {
  discover: { segs: [], nodes: [] as [number, number][] },
  prove: (() => {
    const segs = branches({ x: 150, y: 40, angle: 90, length: 46, levels: 6, seed: 3, spread: 30, decay: 0.8, width: 3.4, tropism: { angle: 90, strength: 0.15 }, bend: 0.3 });
    return { segs, nodes: segs.filter((s) => s.depth === 6).slice(0, 5).map((s) => s.tip) };
  })(),
  launch: (() => {
    const segs = [0, 72, 144, 216, 288].flatMap((a, i) =>
      branches({ x: 150, y: 120, angle: a + 10, length: 38, levels: 4, seed: 60 + i, spread: 28, decay: 0.78, width: 2.8, bend: 0.3, triple: 0.3 }),
    );
    return { segs: segs.sort((a, b) => a.depth - b.depth), nodes: segs.filter((s) => s.depth === 4).filter((_, i) => i % 4 === 0).map((s) => s.tip) };
  })(),
  orbit: (() => {
    const segs = branches({ x: 150, y: 232, angle: -90, length: 58, levels: 7, seed: 34, spread: 30, decay: 0.76, width: 4.6, bend: 0.2, triple: 0.2 });
    return { segs, nodes: segs.filter((s) => s.depth === 7).filter((_, i) => i % 5 === 0).map((s) => s.tip) };
  })(),
};

export function StageGlyph({ stage, tone = "light", className = "" }: { stage: StageId; tone?: "light" | "dark"; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const g = glyphs[stage];
  const strong = tone === "dark" ? "#f4efe4" : "#16432f";
  const soft = "#8fae96";
  const point = tone === "dark" ? "#c8f03c" : "#e0572b";
  const maxDepth = Math.max(1, ...g.segs.map((s) => s.depth));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
        tl.from(q("[data-draw]"), { drawSVG: "0%", duration: 0.7, ease: "power2.out", stagger: { each: 0.012, from: "start" } });
        tl.from(q("[data-pop]"), { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box", duration: 0.5, stagger: 0.05, ease: "back.out(2)" }, "-=0.4");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox="0 0 300 240" className={className} aria-hidden>
      {stage === "discover" && (
        <>
          <circle data-draw cx="150" cy="120" r="92" fill="none" stroke={soft} strokeOpacity="0.5" strokeWidth="1.2" />
          <circle data-draw cx="150" cy="120" r="58" fill="none" stroke={soft} strokeWidth="1.5" />
          <circle data-draw cx="150" cy="120" r="28" fill="none" stroke={soft} strokeOpacity="0.4" strokeDasharray="2 5" />
          <circle data-pop cx="150" cy="120" r="15" fill={point} />
        </>
      )}
      {g.segs.map((s, i) => (
        <path
          key={i}
          data-draw
          d={s.d}
          fill="none"
          stroke={s.depth <= maxDepth * 0.45 ? strong : soft}
          strokeWidth={s.width}
          strokeLinecap="round"
        />
      ))}
      {stage === "launch" &&
        g.nodes.slice(0, -1).map(([x, y], i) => {
          const [x2, y2] = g.nodes[i + 1];
          return <path key={`t${i}`} data-draw d={thread(x, y, x2, y2, 0.18)} fill="none" stroke={soft} strokeDasharray="2 4" strokeWidth="1" />;
        })}
      {g.nodes.map(([x, y], i) => (
        <circle key={i} data-pop cx={x} cy={y} r={i === 0 && stage !== "discover" ? 5 : 3.5} fill={i === 0 ? point : strong} />
      ))}
      {stage === "launch" && <circle data-pop cx="150" cy="120" r="8" fill={strong} />}
      {stage === "prove" && <circle data-pop cx="150" cy="40" r="7" fill={strong} />}
    </svg>
  );
}
