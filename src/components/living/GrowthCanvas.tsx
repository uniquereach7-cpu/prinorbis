"use client";

import { useEffect, useRef, useState } from "react";
import { Colony, type Cloud } from "./colony";
import { mulberry32 } from "@/lib/random";

/*
 * The living network. A space-colonization colony grows live from a glowing
 * seed; once grown, it is re-drawn with pipe-model thickness and lime
 * "nutrient" pulses keep travelling from the seed out to the tips.
 * Tips brighten near the pointer. Everything is fractions of the canvas,
 * so the same layout scales from phone to wide desktop.
 */

export type Layout = {
  seed: [number, number];
  clouds: (Omit<Cloud, "count"> & { count: number; label?: string })[];
  scatter: { x0: number; x1: number; y0: number; y1: number; count: number };
};

type Props = {
  desktop: Layout;
  mobile: Layout;
  className?: string;
  /** Show agent pills at labelled clouds. */
  labels?: boolean;
  /** Overall opacity of the drawing (e.g. behind text on mobile). */
  seedGlow?: boolean;
  speed?: number;
  rngSeed?: number;
};

type Pulse = { path: number[]; t: number; speed: number };

const LIME = [200, 240, 60] as const;
const SAGE = [176, 200, 180] as const;
const NIGHT = [11, 34, 25] as const;

/**
 * Opaque colour between sage (t = 0) and lime (t = 1), pre-blended onto the
 * night ground. Opaque strokes avoid the beading that translucent,
 * round-capped segments show at every joint.
 */
function tone(t: number, alpha: number) {
  const c = SAGE.map((v, i) => v + (LIME[i] - v) * t);
  const o = c.map((v, i) => Math.round(NIGHT[i] + (v - NIGHT[i]) * alpha));
  return `rgb(${o[0]},${o[1]},${o[2]})`;
}

export function GrowthCanvas({ desktop, mobile, className = "", labels = true, seedGlow = true, speed = 3, rngSeed = 11 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const growRef = useRef<HTMLCanvasElement>(null);
  const finalRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef<HTMLCanvasElement>(null);
  const [pills, setPills] = useState<{ label: string; x: number; y: number }[]>([]);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const canvases = [baseRef.current, growRef.current, finalRef.current, liveRef.current];
    if (!el || canvases.some((c) => !c)) return;
    const [base, growC, finalC, live] = canvases as HTMLCanvasElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let visible = true;
    let lastW = 0;
    let cleanupRun: (() => void) | undefined;
    const pointer = { x: -9999, y: -9999, on: false };

    const run = () => {
      cleanupRun?.();
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w < 10 || h < 10) return;
      lastW = w;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      for (const c of [base, growC, finalC, live]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
      }
      const ctx = (c: HTMLCanvasElement) => {
        const x = c.getContext("2d")!;
        x.setTransform(dpr, 0, 0, dpr, 0, 0);
        return x;
      };
      const bctx = ctx(base);
      const gctx = ctx(growC);
      const fctx = ctx(finalC);
      const lctx = ctx(live);
      finalC.style.opacity = "0";
      setGrown(false);

      const layout = w < 768 ? mobile : desktop;
      const scale = Math.min(1.25, Math.max(0.6, Math.sqrt((w * h) / (1440 * 860))));
      const seed = { x: layout.seed[0] * w, y: layout.seed[1] * h };
      const colony = new Colony({
        width: w,
        height: h,
        seed,
        clouds: layout.clouds.map((c) => ({
          x: c.x * w,
          y: c.y * h,
          rx: c.rx * w,
          ry: c.ry * h,
          count: Math.round(c.count * scale),
        })),
        scatter: {
          x0: layout.scatter.x0 * w,
          x1: layout.scatter.x1 * w,
          y0: layout.scatter.y0 * h,
          y1: layout.scatter.y1 * h,
          count: Math.round(layout.scatter.count * scale),
        },
        step: 5,
        influence: 62 * Math.max(0.8, scale),
        kill: 6,
        rngSeed,
      });

      setPills(
        labels
          ? layout.clouds.filter((c) => c.label).map((c) => ({ label: c.label!, x: c.x * 100, y: c.y * 100 }))
          : [],
      );

      // Spores: faint background specks.
      const rng = mulberry32(rngSeed + 1);
      for (let i = 0; i < Math.round((w * h) / 9000); i++) {
        bctx.fillStyle = `rgba(143,174,150,${0.08 + rng() * 0.22})`;
        bctx.beginPath();
        bctx.arc(rng() * w, rng() * h, 0.6 + rng() * 1.1, 0, Math.PI * 2);
        bctx.fill();
      }

      // thin = 0 for trunks, 1 for the finest twigs.
      const drawSeg = (c: CanvasRenderingContext2D, i: number, width: number, thin: number) => {
        const p = colony.parent[i];
        if (p < 0) return;
        c.strokeStyle = tone(thin, 0.95 - thin * 0.4);
        c.lineWidth = width;
        c.beginPath();
        c.moveTo(colony.xs[p], colony.ys[p]);
        c.lineTo(colony.xs[i], colony.ys[i]);
        c.stroke();
      };
      gctx.lineCap = "round";
      fctx.lineCap = "round";

      let tips: number[] = [];
      let twinkle: { i: number; phase: number }[] = [];
      const pulses: Pulse[] = [];

      const finish = () => {
        const desc = colony.descendants();
        for (let i = 1; i < colony.count; i++) {
          const girth = Math.sqrt(desc[i]);
          drawSeg(fctx, i, Math.min(4.4, 0.5 + girth * 0.2), Math.max(0, 1 - girth / 7));
        }
        finalC.style.transition = reduce ? "none" : "opacity 900ms ease";
        finalC.style.opacity = "1";
        growC.style.transition = reduce ? "none" : "opacity 900ms ease";
        growC.style.opacity = "0";
        tips = colony.tips();
        const r = mulberry32(rngSeed + 2);
        twinkle = tips
          .filter(() => r() < 0.12)
          .slice(0, 140)
          .map((i) => ({ i, phase: r() * Math.PI * 2 }));
        setGrown(true);
      };

      growC.style.transition = "none";
      growC.style.opacity = "1";

      if (reduce) {
        while (!colony.done) colony.step();
        finish();
      }

      let t0 = performance.now();
      let last = t0;
      let owed = 0;
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(0.5, (now - last) / 1000);
        last = now;
        if (!visible) return;
        const time = (now - t0) / 1000;

        if (!colony.done) {
          // Time-based growth: the same pace on 60 Hz, 120 Hz or a throttled tab.
          owed += dt * speed * 60;
          const steps = Math.min(40, Math.floor(owed));
          owed -= steps;
          for (let s = 0; s < steps; s++) {
            const [a, b] = colony.step();
            for (let i = a; i < b; i++) {
              const trunk = Math.exp(-colony.hops[i] / 30);
              drawSeg(gctx, i, Math.max(0.5, 3.4 * trunk), 1 - trunk);
            }
            if (colony.done) {
              finish();
              break;
            }
          }
        }

        lctx.clearRect(0, 0, w, h);

        // The seed: the first point, glowing.
        if (seedGlow) {
          const g = 1 + Math.sin(time * 2.2) * 0.12;
          const grad = lctx.createRadialGradient(seed.x, seed.y, 0, seed.x, seed.y, 46 * g);
          grad.addColorStop(0, "rgba(200,240,60,0.55)");
          grad.addColorStop(1, "rgba(200,240,60,0)");
          lctx.fillStyle = grad;
          lctx.beginPath();
          lctx.arc(seed.x, seed.y, 46 * g, 0, Math.PI * 2);
          lctx.fill();
          lctx.fillStyle = "#c8f03c";
          lctx.beginPath();
          lctx.arc(seed.x, seed.y, 8.5, 0, Math.PI * 2);
          lctx.fill();
        }

        if (!colony.done) return;

        // Pointer light.
        if (pointer.on) {
          const pg = lctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 160);
          pg.addColorStop(0, "rgba(200,240,60,0.10)");
          pg.addColorStop(1, "rgba(200,240,60,0)");
          lctx.fillStyle = pg;
          lctx.beginPath();
          lctx.arc(pointer.x, pointer.y, 160, 0, Math.PI * 2);
          lctx.fill();
        }

        // Twinkling tips.
        for (const tw of twinkle) {
          const x = colony.xs[tw.i];
          const y = colony.ys[tw.i];
          const near = pointer.on ? Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 170) : 0;
          const a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(time * 1.6 + tw.phase)) + near * 0.5;
          lctx.fillStyle = `rgba(200,240,60,${Math.min(1, a)})`;
          lctx.beginPath();
          lctx.arc(x, y, 1.6 + near * 2.2, 0, Math.PI * 2);
          lctx.fill();
        }

        // Nutrient pulses from the seed to the tips.
        if (!reduce && tips.length) {
          while (pulses.length < 14) {
            const tip = tips[Math.floor(Math.random() * tips.length)];
            const path = colony.pathTo(tip);
            if (path.length > 20) pulses.push({ path, t: 0, speed: 60 + Math.random() * 50 });
          }
          lctx.lineCap = "round";
          for (let p = pulses.length - 1; p >= 0; p--) {
            const pu = pulses[p];
            pu.t += pu.speed * dt;
            const head = Math.floor(pu.t);
            if (head >= pu.path.length) {
              pulses.splice(p, 1);
              continue;
            }
            const tail = Math.max(0, head - 16);
            for (let k = tail + 1; k <= head; k++) {
              const a = (k - tail) / (head - tail + 1);
              lctx.strokeStyle = `rgba(214,255,90,${a * 0.9})`;
              lctx.lineWidth = 1.2 + a * 1.4;
              lctx.beginPath();
              lctx.moveTo(colony.xs[pu.path[k - 1]], colony.ys[pu.path[k - 1]]);
              lctx.lineTo(colony.xs[pu.path[k]], colony.ys[pu.path[k]]);
              lctx.stroke();
            }
            lctx.fillStyle = "rgba(230,255,150,1)";
            lctx.beginPath();
            lctx.arc(colony.xs[pu.path[head]], colony.ys[pu.path[head]], 2.2, 0, Math.PI * 2);
            lctx.fill();
          }
        }
      };

      if (reduce) {
        t0 = performance.now();
        frame(t0);
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(frame);
      }

      cleanupRun = () => {
        cancelAnimationFrame(raf);
        for (const c of [bctx, gctx, fctx, lctx]) c.clearRect(0, 0, w, h);
      };
    };

    run();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (Math.abs(el.clientWidth - lastW) > 40) run();
      }, 250);
    });
    ro.observe(el);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= r.width && pointer.y <= r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cleanupRun?.();
      ro.disconnect();
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
    };
  }, [desktop, mobile, labels, seedGlow, speed, rngSeed]);

  return (
    <div ref={wrap} className={`absolute inset-0 ${className}`} aria-hidden>
      <canvas ref={baseRef} className="absolute inset-0" />
      <canvas ref={growRef} className="absolute inset-0" />
      <canvas ref={finalRef} className="absolute inset-0" />
      <canvas ref={liveRef} className="absolute inset-0" />
      {pills.map((p) => (
        <div
          key={p.label}
          className={`absolute flex items-center gap-2 transition-opacity duration-700 ${grown ? "opacity-100" : "opacity-0"}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-8px, -50%)" }}
        >
          <span className="relative flex size-4 items-center justify-center rounded-full border-2 border-lime bg-night">
            <span className="pulse-ring absolute inset-0 rounded-full border border-lime" />
          </span>
          <span className="telemetry rounded-full border border-sage/40 bg-night/80 px-2.5 py-1 text-bone/90 backdrop-blur-sm">
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}
