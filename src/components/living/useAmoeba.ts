"use client";

import { useEffect, type RefObject } from "react";
import { amoeba } from "./geometry";

/*
 * Keeps every <path data-amoeba> inside the scope moving. Each path carries
 * its own shape in data attributes (cx, cy, r, seed, amp, speed); the outline
 * is recomputed each frame while the scope is on screen.
 */
export function useAmoeba(scope: RefObject<Element | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shapes = Array.from(root.querySelectorAll<SVGPathElement>("[data-amoeba]")).map((el) => {
      const n = (k: string, d = 0) => Number(el.dataset[k] ?? d);
      return { el, cx: n("cx"), cy: n("cy"), r: n("r"), seed: n("seed"), amp: n("amp", 0.08), speed: n("speed", 1) };
    });

    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (now - t0) / 1000;
      for (const s of shapes) s.el.setAttribute("d", amoeba(s.cx, s.cy, s.r, s.seed, t * s.speed, s.amp));
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [scope]);
}
