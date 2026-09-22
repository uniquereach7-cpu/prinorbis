"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PlantSvg } from "@/components/living/PlantSvg";
import { ButtonLink } from "@/components/ui/Button";
import { stages } from "@/content/site";

/*
 * The path. On desktop the section pins and one plant grows through the four
 * stages as the visitor scrolls: seed, roots, the network underground, then
 * the canopy. Stage copy swaps alongside. Smaller screens and reduced motion
 * get the finished plant and a plain list.
 */

const ORDER = ["seed", "root", "network", "canopy"] as const;

export function PathGrowth() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      const byDepth = (group: string) => {
        const paths = q(`[data-g="${group}"] [data-draw]`) as unknown as SVGElement[];
        const map = new Map<number, SVGElement[]>();
        for (const p of paths) {
          const d = Number(p.getAttribute("data-depth") ?? 0);
          map.set(d, [...(map.get(d) ?? []), p]);
        }
        return [...map.entries()].sort((a, b) => a[0] - b[0]);
      };

      const growGroup = (tl: gsap.core.Timeline, group: string, at: number, span: number) => {
        const levels = byDepth(group);
        const step = span / Math.max(1, levels.length);
        levels.forEach(([, els], i) => {
          tl.to(els, { drawSVG: "100%", duration: step * 1.4, ease: "none" }, at + i * step);
        });
        // A fixed total stagger, so a canopy with a hundred leaves finishes as fast as a seed with one.
        tl.to(
          q(`[data-g="${group}"] [data-pop]`),
          { scale: 1, opacity: 1, duration: span * 0.25, stagger: { amount: span * 0.3 }, ease: "back.out(2)" },
          at + span * 0.45,
        );
      };

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(q("[data-draw]"), { drawSVG: "0%" });
        gsap.set(q("[data-pop]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
        gsap.set(q("[data-stage]"), { autoAlpha: 0, y: 40 });
        gsap.set(q('[data-stage="0"]'), { autoAlpha: 1, y: 0 });
        gsap.set(q("[data-bar]"), { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            start: "top top",
            end: "+=2800",
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              const i = Math.min(3, Math.floor(self.progress * 4));
              if (counter.current) counter.current.textContent = `0${i + 1}`;
            },
          },
        });

        ORDER.forEach((g, i) => {
          const at = i;
          growGroup(tl, g, at + 0.04, 0.6);
          tl.to(q(`[data-bar="${i}"]`), { scaleX: 1, duration: 1 }, at);
          if (i > 0) {
            tl.to(q(`[data-stage="${i - 1}"]`), { autoAlpha: 0, y: -40, duration: 0.18 }, at - 0.08);
            tl.to(q(`[data-stage="${i}"]`), { autoAlpha: 1, y: 0, duration: 0.2 }, at + 0.06);
          }
        });
        tl.to({}, { duration: 0.12 });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(q("[data-draw]"), { drawSVG: "0%" });
        gsap.set(q("[data-pop]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
        const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-plant]")[0], start: "top 75%", once: true } });
        ORDER.forEach((g, i) => growGroup(tl, g, i * 0.45, 0.5));
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-chapter="02 · Root · The path" data-tone="light" className="relative bg-bone">
      <div data-pin className="relative lg:flex lg:h-svh lg:items-center">
        <div className="container-site grid items-center gap-10 py-24 lg:grid-cols-12 lg:py-0">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ink-muted">The path</p>
            <h2 className="display-l mt-4 text-ink">
              Four stages. One <span className="serif-accent text-forest">living</span> system.
            </h2>

            {/* Desktop: stacked, one stage at a time. Mobile: a list. */}
            <div className="mt-12 grid gap-10 lg:mt-14 lg:gap-0">
              {stages.map((s, i) => (
                <div key={s.id} data-stage={i} className="lg:col-start-1 lg:row-start-1">
                  <p className="telemetry text-ink-muted">
                    {s.code} · {s.name}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(2.6rem,4.4vw,4rem)] leading-none font-semibold tracking-[-0.03em] text-forest">
                    {s.growth}
                  </h3>
                  <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-muted">{s.growthLine}</p>
                  <div className="mt-6 max-w-md border-t border-ink/10 pt-4">
                    <p className="telemetry text-ink-muted">You leave with</p>
                    <p className="mt-2 text-[15px] leading-snug text-ink">{s.leaveWith}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 hidden items-center gap-5 lg:flex">
              <p className="telemetry text-ink-muted">
                Growth stage <span ref={counter}>01</span> / 04
              </p>
              <div className="flex gap-1.5">
                {stages.map((s, i) => (
                  <span key={s.id} className="relative h-[3px] w-10 overflow-hidden rounded-full bg-ink/10">
                    <span data-bar={i} className="absolute inset-0 rounded-full bg-forest" />
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <ButtonLink href="/services" arrow>
                See how an engagement runs
              </ButtonLink>
            </div>
          </div>

          <div data-plant className="relative lg:col-span-7">
            <PlantSvg className="mx-auto h-auto w-full max-w-[720px] lg:max-h-[86svh]" />
            <div className="telemetry pointer-events-none absolute top-[55%] right-2 text-ink-muted/60 lg:right-8">Ground line</div>
          </div>
        </div>
      </div>
    </section>
  );
}
