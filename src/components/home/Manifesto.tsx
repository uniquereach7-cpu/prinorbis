"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { branches } from "@/components/living/geometry";

const vine = branches({ x: 60, y: -10, angle: 88, length: 120, levels: 6, seed: 404, spread: 26, decay: 0.8, width: 2.4, tropism: { angle: 92, strength: 0.2 }, bend: 0.35 });

/** "Software was built. Intelligence is grown." A vine grows down the margin as you read. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap.fromTo(
          q("[data-vine] path"),
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            stagger: 0.02,
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 1 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-chapter="01 · Seed · A different idea" data-tone="light" className="relative overflow-hidden bg-bone py-28 md:py-44">
      <svg data-vine viewBox="0 0 200 900" className="pointer-events-none absolute top-0 left-0 hidden h-full w-[14vw] max-w-[220px] md:block" aria-hidden>
        {vine.map((s, i) => (
          <path key={i} d={s.d} fill="none" stroke={s.depth < 3 ? "#16432f" : "#8fae96"} strokeWidth={s.width} strokeLinecap="round" />
        ))}
      </svg>

      <div className="container-site relative grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="eyebrow text-ink-muted">A different idea of software</p>
        </div>
        <div className="lg:col-span-9">
          <SplitReveal as="h2" className="display-l max-w-4xl text-ink">
            Software was built. Intelligence is <span className="serif-accent text-forest">grown.</span>
          </SplitReveal>
          <ScrubText className="mt-12 max-w-3xl font-display text-[clamp(1.4rem,2.3vw,2.1rem)] leading-[1.3] font-medium tracking-[-0.015em] text-forest">
            We do not install AI and walk away. We plant it where it pays back first, root it in your workflows, and let
            it grow across the business, with your people deciding where every branch goes.
          </ScrubText>
        </div>
      </div>
    </section>
  );
}
