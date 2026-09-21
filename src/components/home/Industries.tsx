"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Chapter, Eyebrow } from "@/components/ui/Chapter";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/site";

/*
 * Six industries orbit the first point. Pick one to see where agents
 * pay back first. The selected node lights up on its ring.
 */

const C = 260;
const radii = [64, 96, 128, 160, 192, 224];
const angles = [-40, 150, 35, 250, 110, -95];
const speeds = [90, 120, 150, 110, 170, 140];

export function Industries() {
  const [selected, setSelected] = useState(0);

  return (
    <Chapter label="04 · Orbit" tone="dark" id="industries" className="overflow-hidden bg-night py-24 text-paper md:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <svg viewBox="0 0 520 520" className="size-full" aria-hidden>
              {radii.map((r, i) => {
                const on = i === selected;
                const a = (angles[i] * Math.PI) / 180;
                return (
                  <g
                    key={r}
                    className="spin-slow"
                    style={{
                      animationDuration: `${speeds[i]}s`,
                      animationDirection: i % 2 ? "reverse" : "normal",
                      transformOrigin: `${C}px ${C}px`,
                      transformBox: "view-box",
                    }}
                  >
                    <circle
                      cx={C}
                      cy={C}
                      r={r}
                      fill="none"
                      stroke={on ? "#f4f2ee" : "#9bb6c6"}
                      strokeOpacity={on ? 0.55 : 0.2}
                      strokeWidth={on ? 1.5 : 1}
                      style={{ transition: "stroke 300ms, stroke-opacity 300ms" }}
                    />
                    <g
                      transform={`translate(${C + Math.cos(a) * r} ${C + Math.sin(a) * r})`}
                      onClick={() => setSelected(i)}
                      className="cursor-pointer"
                    >
                      <g
                        className="spin-slow"
                        style={{
                          animationDuration: `${speeds[i]}s`,
                          animationDirection: i % 2 ? "normal" : "reverse",
                          transformBox: "fill-box",
                          transformOrigin: "center",
                        }}
                      >
                        <circle
                          r={on ? 15 : 12}
                          fill={on ? "#f4f2ee" : "#061722"}
                          stroke="#9bb6c6"
                          strokeOpacity={on ? 0 : 0.5}
                          style={{ transition: "r 300ms, fill 300ms" }}
                        />
                        <text
                          y={4}
                          textAnchor="middle"
                          fill={on ? "#061722" : "#f4f2ee"}
                          fillOpacity={on ? 1 : 0.75}
                          style={{ font: "600 10px var(--font-mono)" }}
                        >
                          {industries[i].code}
                        </text>
                      </g>
                    </g>
                  </g>
                );
              })}
              <circle cx={C} cy={C} r={30} fill="#045475" fillOpacity={0.22} />
              <circle cx={C} cy={C} r={9} fill="#f11123" className="pulse-ring" />
              <circle cx={C} cy={C} r={9} fill="#f11123" />
            </svg>
            <p className="telemetry absolute bottom-0 left-0 text-paper/40">Six industries · one first point</p>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal>
            <Eyebrow className="text-paper/60">04 · Orbit · Where we work</Eyebrow>
            <h2 className="display-l mt-4">Your first point.</h2>
            <p className="lead mt-6 max-w-xl text-paper/65">
              We work across six industries, and every engagement adds capability the next one builds on. Pick one to see
              where agents tend to pay back first.
            </p>
          </Reveal>

          <ul className="mt-10 border-t border-paper/10">
            {industries.map((ind, i) => {
              const on = i === selected;
              return (
                <li key={ind.code} className="border-b border-paper/10">
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-expanded={on}
                    className={`flex w-full items-center gap-4 py-4 text-left transition-colors ${
                      on ? "text-paper" : "text-paper/55 hover:text-paper/85"
                    }`}
                  >
                    <span className="telemetry w-6 text-paper/40">{ind.code}</span>
                    <span className="font-display text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold tracking-[-0.02em]">
                      {ind.name}
                    </span>
                    <span
                      className={`ml-auto size-2 rounded-full bg-red transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="grid gap-2 pb-5 pl-10 sm:grid-cols-3 sm:gap-3">
                          {ind.uses.map((u) => (
                            <li
                              key={u}
                              className="rounded-[var(--radius-md)] border border-paper/10 bg-paper/[0.04] px-3.5 py-3 text-[14px] leading-snug text-paper/80"
                            >
                              {u}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Chapter>
  );
}
