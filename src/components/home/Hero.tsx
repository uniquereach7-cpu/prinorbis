"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { GrowthCanvas, type Layout } from "@/components/living/GrowthCanvas";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/Chapter";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { stages } from "@/content/site";

const DESKTOP: Layout = {
  seed: [0.5, 0.64],
  clouds: [
    { x: 0.79, y: 0.19, rx: 0.06, ry: 0.06, count: 520, label: "AGENT.CFO" },
    { x: 0.9, y: 0.57, rx: 0.035, ry: 0.09, count: 380, label: "AGENT.CRO" },
    { x: 0.7, y: 0.9, rx: 0.07, ry: 0.04, count: 380, label: "AGENT.INSURE" },
    { x: 0.64, y: 0.08, rx: 0.04, ry: 0.035, count: 140 },
    { x: 0.96, y: 0.1, rx: 0.02, ry: 0.06, count: 140 },
    { x: 0.95, y: 0.82, rx: 0.025, ry: 0.06, count: 120 },
    { x: 0.46, y: 0.2, rx: 0.035, ry: 0.06, count: 90 },
  ],
  scatter: { x0: 0.5, x1: 1, y0: 0, y1: 1, count: 110 },
};

const MOBILE: Layout = {
  seed: [0.5, 0.94],
  clouds: [
    { x: 0.22, y: 0.3, rx: 0.1, ry: 0.06, count: 260, label: "AGENT.CFO" },
    { x: 0.78, y: 0.16, rx: 0.1, ry: 0.06, count: 260, label: "AGENT.CRO" },
    { x: 0.62, y: 0.56, rx: 0.1, ry: 0.05, count: 220, label: "AGENT.INSURE" },
  ],
  scatter: { x0: 0, x1: 1, y0: 0.05, y1: 0.9, count: 80 },
};

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-copy]"), { yPercent: -18, opacity: 0.1, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-net]"), { scale: 1.08, yPercent: 8, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-chapter="00 · Seed · Living systems online"
      data-tone="dark"
      className="on-dark relative flex min-h-svh flex-col overflow-hidden bg-night text-bone"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_62%_60%,rgba(30,92,65,0.55),transparent_60%)]"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col lg:block">
        <div data-copy className="container-site relative z-10 pt-32 pb-8 lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:pt-24 lg:pb-24">
          <div className="max-w-xl">
            <Link href="/agentic-cfo" className="rise inline-block transition-opacity [animation-delay:1s] hover:opacity-80">
              <StatusPill tone="dark" live>
                Agentic CFO · early access open
              </StatusPill>
            </Link>
            <p className="eyebrow rise mt-8 text-bone/55 [animation-delay:1.05s]">00 · Seed · Living systems online</p>
            <SplitReveal as="h1" onMount delay={1.05} className="display-xl mt-5">
              Move <span className="serif-accent pr-[0.04em] text-lime">first.</span>
            </SplitReveal>
            <p className="lead rise mt-8 max-w-md text-bone/70 [animation-delay:1.3s]">
              Intelligence that grows into the way your business works. Planted where it pays back first, directed by
              your people.
            </p>
            <div className="rise mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:1.4s]">
              <ButtonLink href="/contact" variant="lime" arrow>
                Plant your first point
              </ButtonLink>
              <ButtonLink href="/agents" variant="outline-dark">
                Meet the agents
              </ButtonLink>
            </div>
          </div>
        </div>

        <div data-net className="relative h-[110vw] max-h-[640px] origin-[50%_64%] lg:absolute lg:inset-0 lg:h-auto lg:max-h-none">
          <GrowthCanvas desktop={DESKTOP} mobile={MOBILE} />
        </div>
      </div>

      <div className="container-site relative z-10">
        <div className="telemetry flex h-16 items-center justify-between gap-6 border-t border-bone/10 text-bone/50">
          <span>Growth stage 00 / 04</span>
          <span className="hidden items-center gap-3 md:flex">
            {stages.map((s, i) => (
              <span key={s.id} className="flex items-center gap-3">
                {s.growth}
                {i < stages.length - 1 && <span className="text-lime">→</span>}
              </span>
            ))}
          </span>
          <span className="flex items-center gap-2">
            Scroll to grow <ArrowDown className="size-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </section>
  );
}
