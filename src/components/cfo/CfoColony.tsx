"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { blob, thread } from "@/components/living/geometry";
import { cfoSuite } from "@/content/site";

/*
 * The Agentic CFO suite as a colony: five agent cells and your team around
 * the ledger nucleus, joined by threads that carry work between them.
 */

const C = 300;
const R = 196;
const members = [...cfoSuite.map((a) => ({ label: a.short, id: a.id, team: false })), { label: "Your team", id: "APPROVES", team: true }];
const pos = members.map((_, i) => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  return [C + Math.cos(a) * R, C + Math.sin(a) * R] as const;
});

export function CfoColony() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({ delay: 1.1 });
        tl.from(q("[data-core]"), { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box", duration: 0.9, ease: "back.out(1.6)" });
        tl.from(q("[data-spoke]"), { drawSVG: "0%", duration: 0.8, stagger: 0.06, ease: "power2.out" }, "-=0.4");
        tl.from(q("[data-member]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%", transformBox: "fill-box", duration: 0.7, stagger: 0.08, ease: "back.out(1.8)" }, "-=0.6");
        tl.from(q("[data-ring]"), { drawSVG: "0%", duration: 1.2, ease: "power2.inOut" }, "-=0.5");
        q("[data-cell]").forEach((el, i) => {
          gsap.to(el, { morphSVG: el.getAttribute("data-alt")!, duration: 4 + (i % 3), yoyo: true, repeat: -1, ease: "sine.inOut" });
        });
        q("[data-pulse]").forEach((dot, i) => {
          const path = q("[data-ring]")[0] as unknown as SVGPathElement;
          gsap.to(dot, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: i / 3, end: i / 3 + 1 },
            duration: 12,
            ease: "none",
            repeat: -1,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const ringD = pos.map(([x, y], i) => {
    const [nx, ny] = pos[(i + 1) % pos.length];
    return (i === 0 ? `M${x} ${y}` : "") + thread(x, y, nx, ny, -0.12).replace(/^M[^Q]+/, "");
  }).join("");

  return (
    <svg ref={ref} viewBox="-40 -20 680 640" className="h-auto w-full overflow-visible" role="img" aria-label="Five finance agents and your team around the ledger">
      <defs>
        <radialGradient id="cfo-core">
          <stop offset="0%" stopColor="#c8f03c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c8f03c" stopOpacity="0" />
        </radialGradient>
      </defs>
      {pos.map(([x, y], i) => (
        <path key={i} data-spoke d={thread(C, C, x, y, i % 2 ? 0.08 : -0.08)} fill="none" stroke="#8fae96" strokeOpacity="0.35" strokeDasharray="3 6" />
      ))}
      <path data-ring d={ringD + "Z"} fill="none" stroke="#8fae96" strokeOpacity="0.45" strokeWidth="1.25" />
      {[0, 1, 2].map((i) => (
        <circle key={i} data-pulse r="4.5" fill="#c8f03c" cx={-50} cy={-50} />
      ))}

      <g data-core>
        <circle cx={C} cy={C} r={80} fill="url(#cfo-core)" />
        <path data-cell d={blob(C, C, 46, 3, 0.14)} data-alt={blob(C, C, 46, 53, 0.14)} fill="#16432f" stroke="#8fae96" strokeOpacity="0.5" />
        <circle cx={C} cy={C} r={11} fill="#c8f03c" className="pulse-ring" />
        <circle cx={C} cy={C} r={11} fill="#c8f03c" />
        <text x={C} y={C + 32} textAnchor="middle" fill="#f4efe4" fillOpacity="0.6" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.14em" }}>
          LEDGER
        </text>
      </g>

      {members.map((m, i) => {
        const [x, y] = pos[i];
        const right = x > C + 20;
        const left = x < C - 20;
        const lx = right ? x + 50 : left ? x - 50 : x;
        const ly = right || left ? y - 4 : y < C ? y - 56 : y + 66;
        const anchor = right ? "start" : left ? "end" : "middle";
        return (
          <g key={m.id} data-member>
            <path
              data-cell
              d={blob(x, y, 36, 20 + i, 0.16)}
              data-alt={blob(x, y, 36, 70 + i, 0.16)}
              fill={m.team ? "#f4efe4" : "#10301f"}
              stroke="#8fae96"
              strokeOpacity={m.team ? 0 : 0.6}
              strokeWidth="1.25"
            />
            <circle cx={x} cy={y - 8} r={m.team ? 6 : 5} fill={m.team ? "#e0572b" : "#8fae96"} />
            <text x={lx} y={ly} textAnchor={anchor} fill="#f4efe4" style={{ font: "600 17px var(--font-display)" }}>
              {m.label}
            </text>
            <text x={lx} y={ly + 18} textAnchor={anchor} fill="#8fae96" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.12em" }}>
              {m.team ? "APPROVES" : `AGENT.${m.id}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
