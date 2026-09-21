"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";

/*
 * Every page is split into chapters: sections marked with
 * data-chapter="02 · Prove" and data-tone="light" | "dark".
 * The header HUD shows the chapter crossing 45% of the viewport,
 * and the header itself flips tone with the chapter behind it.
 */

export type Tone = "light" | "dark";

type ChapterState = {
  label: string;
  tone: Tone;
  headerTone: Tone;
  markers: { label: string; at: number }[];
};

const initial: ChapterState = { label: "", tone: "light", headerTone: "light", markers: [] };

const ChapterContext = createContext<ChapterState>(initial);

export function useChapter() {
  return useContext(ChapterContext);
}

function sameMarkers(a: ChapterState["markers"], b: ChapterState["markers"]) {
  return a.length === b.length && a.every((m, i) => m.label === b[i].label && Math.abs(m.at - b[i].at) < 0.002);
}

export function ChapterProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<ChapterState>(initial);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));

    const measure = () => {
      const vh = window.innerHeight;
      const hudLine = vh * 0.45;
      const headerLine = 36;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - vh);

      let current: HTMLElement | undefined;
      let underHeader: HTMLElement | undefined;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= hudLine) current = el;
        if (rect.top <= headerLine && rect.bottom > headerLine) underHeader = el;
      }
      current ??= els[0];

      const markers = els.map((el) => ({
        label: el.dataset.chapter ?? "",
        at: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY - vh * 0.45) / scrollable)),
      }));

      const next: ChapterState = {
        label: current?.dataset.chapter ?? "",
        tone: (current?.dataset.tone as Tone) ?? "light",
        headerTone: (underHeader?.dataset.tone as Tone) ?? "light",
        markers,
      };

      setState((prev) =>
        prev.label === next.label &&
        prev.tone === next.tone &&
        prev.headerTone === next.headerTone &&
        sameMarkers(prev.markers, next.markers)
          ? prev
          : next,
      );
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <ChapterContext.Provider value={state}>{children}</ChapterContext.Provider>
    </MotionConfig>
  );
}
