"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

type SplitRevealProps = {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  /** Reveal immediately on mount instead of on scroll (for heroes). */
  onMount?: boolean;
};

/** Headlines rise line by line from behind a mask as they scroll into view. */
export function SplitReveal({ as = "h2", className, children, delay = 0, onMount = false }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = ref.current;
        if (!el) return;
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              delay,
              scrollTrigger: onMount ? undefined : { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const Tag = as as "h2";
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  );
}
