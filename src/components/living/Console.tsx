"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Line = { agent: string; text: string; handoff?: boolean };

/*
 * An illustrative agent log. Lines type in one after another while the
 * console is on screen, then the sequence restarts. No invented figures.
 */
export function Console({ lines, title = "Orbis · console · live" }: { lines: Line[]; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const running = inView && !reduce;

  useEffect(() => {
    if (!running) return;
    const current = lines[line];
    if (!current) {
      const t = setTimeout(() => {
        setLine(0);
        setChars(0);
      }, 3400);
      return () => clearTimeout(t);
    }
    if (chars < current.text.length) {
      const t = setTimeout(() => setChars((c) => Math.min(current.text.length, c + 2)), 24);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, 700);
    return () => clearTimeout(t);
  }, [running, line, chars, lines]);

  const shown = reduce ? lines.length : line;

  return (
    <div ref={ref} className="overflow-hidden rounded-[var(--radius-lg)] border border-bone/10 bg-night text-bone">
      <div className="flex items-center justify-between border-b border-bone/10 px-6 py-4">
        <p className="telemetry flex items-center gap-2.5 text-bone/75">
          <span className="relative flex size-1.5">
            <span className="pulse-ring absolute inset-0 rounded-full bg-lime" />
            <span className="relative size-1.5 rounded-full bg-lime" />
          </span>
          {title}
        </p>
        <p className="telemetry hidden text-bone/35 sm:block">Illustrative sequence</p>
      </div>
      <div className="min-h-[220px] px-6 py-5 font-mono text-[13px] leading-[2] sm:text-[14px]">
        {lines.map((l, i) => {
          if (i > shown) return null;
          const typing = i === shown && !reduce;
          const text = typing ? l.text.slice(0, chars) : l.text;
          return (
            <div key={i} className="flex gap-4">
              <span className="w-[120px] shrink-0 text-bone/45 sm:w-[140px]">{l.agent} ›</span>
              <span className={l.handoff ? "text-lime" : "text-bone/90"}>
                {text}
                {typing && <span className="blink ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-lime" />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
