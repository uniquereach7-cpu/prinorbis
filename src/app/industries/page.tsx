import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RingHero } from "@/components/living/RingHero";
import { StageGlyph } from "@/components/living/StageGlyph";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { industries, stages } from "@/content/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Healthcare and life sciences, manufacturing, CPG, communications and media, real estate, and software and gaming: where AI and agents pay back first.",
};

export default function IndustriesPage() {
  return (
    <>
      <section data-chapter="Industries · Six ecosystems" data-tone="dark" className="on-dark relative overflow-hidden bg-night text-bone">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(30,92,65,0.6),transparent_60%)]" aria-hidden />
        <div className="container-site relative grid min-h-svh items-center gap-12 pt-36 pb-20 lg:grid-cols-12 lg:pt-28">
          <div className="lg:col-span-6">
            <p className="eyebrow rise flex items-center gap-2.5 text-bone/55 [animation-delay:1s]">
              <span className="size-1.5 rounded-full bg-lime" /> Industries · Six ecosystems
            </p>
            <h1 className="display-xl rise mt-6 [animation-delay:1.05s]">
              Every ring <span className="serif-accent text-lime">counts.</span>
            </h1>
            <p className="lead rise mt-8 max-w-lg text-bone/70 [animation-delay:1.2s]">
              We work across six industries. Each engagement adds a ring of capability the next one builds on, so the
              patterns we have proved in one business make the next one faster.
            </p>
            <ul className="rise mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2 [animation-delay:1.3s]">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`#${ind.slug}`} className="group flex items-center gap-3 py-1.5 text-[15px] text-bone/70 hover:text-lime">
                    <span className="telemetry text-bone/35">{ind.code}</span>
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rise lg:col-span-6 [animation-delay:1.1s]">
            <RingHero />
          </div>
        </div>
      </section>

      {industries.map((ind, i) => {
        const start = stages.find((s) => s.id === ind.start)!;
        const dark = i % 3 === 2;
        const bg = dark ? "bg-forest" : i % 2 === 0 ? "bg-bone" : "bg-mist";
        return (
          <section
            key={ind.slug}
            id={ind.slug}
            data-chapter={`Ring ${ind.code} · ${ind.name}`}
            data-tone={dark ? "dark" : "light"}
            className={`relative scroll-mt-16 overflow-hidden py-24 md:py-36 ${bg} ${dark ? "on-dark text-bone" : "text-ink"}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-10 right-0 font-display text-[clamp(10rem,28vw,24rem)] leading-none font-bold tracking-[-0.06em] select-none ${
                dark ? "text-bone/[0.04]" : "text-ink/[0.04]"
              }`}
            >
              {ind.code}
            </span>
            <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className={`telemetry ${dark ? "text-bone/50" : "text-ink-muted"}`}>Ring {ind.code}</p>
                <SplitReveal className="display-l mt-5">{ind.name}</SplitReveal>
                <p className={`serif-accent mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight ${dark ? "text-lime" : "text-forest"}`}>{ind.line}</p>
                <p className={`mt-6 max-w-md text-[16.5px] leading-relaxed ${dark ? "text-bone/70" : "text-ink-muted"}`}>{ind.context}</p>
              </div>
              <div className="lg:col-span-7">
                <p className={`telemetry ${dark ? "text-bone/50" : "text-ink-muted"}`}>Where agents pay back first</p>
                <Reveal as="div" stagger={0.08} className="mt-5 grid gap-3 sm:grid-cols-3">
                  {ind.uses.map((u, j) => (
                    <div
                      key={u}
                      className={`flex min-h-40 flex-col justify-between rounded-[var(--radius-lg)] p-6 ${
                        dark ? "border border-bone/12 bg-bone/[0.05]" : "border border-ink/10 bg-bone-raised"
                      }`}
                    >
                      <span className={`telemetry ${dark ? "text-bone/40" : "text-ink-muted"}`}>0{j + 1}</span>
                      <p className="title mt-6">{u}</p>
                    </div>
                  ))}
                </Reveal>

                <div className={`mt-3 grid gap-px overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-2 ${dark ? "bg-bone/12" : "bg-ink/10"}`}>
                  <div className={`p-6 ${dark ? "bg-night-raised" : "bg-bone-raised"}`}>
                    <p className={`telemetry ${dark ? "text-bone/45" : "text-ink-muted"}`}>Relevant agents</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ind.agents.map((a) => (
                        <Link
                          key={a}
                          href={a === "Agentic CFO" ? "/agentic-cfo" : "/agents"}
                          className={`rounded-full border px-3.5 py-1.5 text-[14px] transition-colors ${
                            dark ? "border-bone/20 hover:border-lime hover:text-lime" : "border-ink/15 hover:border-forest"
                          }`}
                        >
                          {a}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link href={`/services#${start.id}`} className={`group flex items-center justify-between gap-4 p-6 ${dark ? "bg-night-raised" : "bg-bone-raised"}`}>
                    <div>
                      <p className={`telemetry ${dark ? "text-bone/45" : "text-ink-muted"}`}>Where most start</p>
                      <p className="mt-3 font-semibold">
                        {start.code} · {start.name} <span className={`serif-accent font-normal ${dark ? "text-lime" : "text-forest"}`}>({start.growth.toLowerCase()})</span>
                      </p>
                    </div>
                    <StageGlyph stage={start.id} tone={dark ? "dark" : "light"} className="h-14 w-auto shrink-0" />
                  </Link>
                </div>
                <Link
                  href="/contact"
                  className={`telemetry mt-6 inline-flex items-center gap-1.5 ${dark ? "text-lime" : "text-forest"} hover:underline`}
                >
                  Talk about {ind.name.toLowerCase()} <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section data-chapter="Your ring" data-tone="dark" className="on-dark bg-night py-28 text-bone md:py-36">
        <div className="container-site flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-bone/55">Not on the list?</p>
            <SplitReveal className="display-l mt-5 max-w-2xl">
              Your industry could be the <span className="serif-accent text-lime">next ring.</span>
            </SplitReveal>
          </div>
          <ButtonLink href="/contact" variant="lime" arrow>
            Plant your first point
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
