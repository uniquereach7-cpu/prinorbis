"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { consoleLines } from "@/content/site";

/*
 * An illustrative agent log. Lines type in one after another while the
 * console is on screen, then the sequence restarts. No invented figures.
 */
export function Console({ title = "Orbis · console" }: { title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  const running = inView && !reduce;

  useEffect(() => {
    if (!running) return;
    const current = consoleLines[line];
    if (!current) {
      const restart = setTimeout(() => {
        setLine(0);
        setChars(0);
      }, 3200);
      return () => clearTimeout(restart);
    }
    if (chars < current.text.length) {
      const t = setTimeout(() => setChars((c) => Math.min(current.text.length, c + 2)), 22);
      return () => clearTimeout(t);
    }
    const next = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, 650);
    return () => clearTimeout(next);
  }, [running, line, chars]);

  const shown = reduce ? consoleLines.length : line;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[var(--radius-lg)] border border-paper/10 bg-night text-paper shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3.5">
        <p className="telemetry flex items-center gap-2.5 text-paper/70">
          <span className="relative flex size-1.5">
            <span className="pulse-ring absolute inset-0 rounded-full bg-red" />
            <span className="relative size-1.5 rounded-full bg-red" />
          </span>
          {title}
        </p>
        <p className="telemetry text-paper/35">Illustrative sequence</p>
      </div>
      <div className="min-h-[248px] px-5 py-5 font-mono text-[13px] leading-[1.9] sm:text-[13.5px]" aria-live="off">
        {consoleLines.map((l, i) => {
          if (i > shown) return null;
          const typing = i === shown && !reduce;
          const text = typing ? l.text.slice(0, chars) : l.text;
          return (
            <div key={i} className="flex gap-3">
              <span className="w-[128px] shrink-0 text-steel/70 sm:w-[150px]">{l.agent} ›</span>
              <span className={l.handoff ? "text-[#7fc3e3]" : "text-paper/85"}>
                {text}
                {typing && <span className="blink ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-paper/70" />}
              </span>
            </div>
          );
        })}
        {!reduce && line >= consoleLines.length && (
          <div className="flex gap-3">
            <span className="w-[128px] shrink-0 text-steel/70 sm:w-[150px]">your team ›</span>
            <span className="text-paper/85">
              review queue ready
              <span className="blink ml-1 inline-block h-[1em] w-[7px] translate-y-[2px] bg-red" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
