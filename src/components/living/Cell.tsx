"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { blob } from "./geometry";

/*
 * An agent drawn as a living cell: a membrane, a body and a nucleus that
 * slowly change shape. The shapes morph between two seeded outlines.
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
  const shapes = {
    outer: [blob(200, 200, 186, seed, 0.1), blob(200, 200, 186, seed + 50, 0.1)],
    membrane: [blob(200, 200, 172, seed + 1, 0.12), blob(200, 200, 172, seed + 51, 0.12)],
    body: [blob(200, 206, 150, seed + 2, 0.13), blob(200, 206, 150, seed + 52, 0.13)],
    halo: [blob(200, 98, 34, seed + 3, 0.2), blob(200, 98, 34, seed + 53, 0.2)],
    nucleus: [blob(200, 98, 22, seed + 4, 0.22), blob(200, 98, 22, seed + 54, 0.22)],
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        (Object.keys(shapes) as (keyof typeof shapes)[]).forEach((k, i) => {
          gsap.to(q(`[data-shape="${k}"]`), {
            morphSVG: shapes[k][1],
            duration: 5 + i * 0.9 + (seed % 3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
        gsap.from(q("[data-shape]"), {
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
        <path data-shape="outer" d={shapes.outer[0]} fill="none" stroke="#8fae96" strokeOpacity="0.28" strokeWidth="1.2" />
        <path data-shape="membrane" d={shapes.membrane[0]} fill="none" stroke="#8fae96" strokeOpacity="0.5" strokeWidth="1.5" />
        <path data-shape="body" d={shapes.body[0]} fill={body} />
        <path data-shape="halo" d={shapes.halo[0]} fill="none" stroke="#8fae96" strokeOpacity="0.45" strokeWidth="1.2" />
        <path data-shape="nucleus" d={shapes.nucleus[0]} fill={live ? "#c8f03c" : "#8fae96"} />
      </svg>
      <div className="absolute inset-[18%] top-[36%] flex flex-col items-center text-center">{children}</div>
    </div>
  );
}
