import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/living/PageHero";
import { StageGlyph } from "@/components/living/StageGlyph";
import type { Layout } from "@/components/living/GrowthCanvas";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { stages } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover, Prove, Launch and Orbit: AI opportunity assessments, process reimagination, data strategy, implementation and value realisation for mid-sized businesses.",
};

// Roots hanging from the top edge, reaching down the right of the hero.
const ROOTS: { desktop: Layout; mobile: Layout; rngSeed: number } = {
  rngSeed: 5,
  desktop: {
    seed: [0.74, 0.0],
    clouds: [
      { x: 0.62, y: 0.55, rx: 0.05, ry: 0.07, count: 260 },
      { x: 0.86, y: 0.72, rx: 0.05, ry: 0.07, count: 260 },
      { x: 0.74, y: 0.95, rx: 0.07, ry: 0.04, count: 220 },
      { x: 0.97, y: 0.35, rx: 0.02, ry: 0.07, count: 120 },
    ],
    scatter: { x0: 0.52, x1: 1, y0: 0.1, y1: 1, count: 90 },
  },
  mobile: {
    seed: [0.85, 0.0],
    clouds: [
      { x: 0.7, y: 0.5, rx: 0.08, ry: 0.06, count: 160 },
      { x: 0.92, y: 0.8, rx: 0.06, ry: 0.06, count: 140 },
    ],
    scatter: { x0: 0.5, x1: 1, y0: 0.1, y1: 1, count: 40 },
  },
};

// The ground deepens as the visitor moves along the path.
const grounds = [
  { bg: "bg-bone", dark: false },
  { bg: "bg-mist", dark: false },
  { bg: "bg-forest", dark: true },
  { bg: "bg-night", dark: true },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        chapter="Services · The path"
        eyebrow="Services · The path"
        title={
          <>
            Strategy that <span className="serif-accent text-lime">ships.</span>
          </>
        }
        lead="Four stages, each with a clear output and a clear exit. Start at whichever stage fits where you are today, and stop whenever the evidence says so."
        growth={ROOTS}
      >
        <nav aria-label="Stages" className="grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
          {stages.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className="group rounded-2xl border border-bone/15 bg-night/40 px-4 py-3 backdrop-blur-sm transition-colors hover:border-lime/60"
            >
              <span className="telemetry block text-bone/45">{s.code}</span>
              <span className="mt-1 block font-display text-[16px] font-semibold tracking-[-0.01em] group-hover:text-lime">{s.growth}</span>
            </Link>
          ))}
        </nav>
      </PageHero>

      {stages.map((s, i) => {
        const g = grounds[i];
        return (
          <section
            key={s.id}
            id={s.id}
            data-chapter={`${s.code} · ${s.growth} · ${s.name}`}
            data-tone={g.dark ? "dark" : "light"}
            className={`relative scroll-mt-20 ${g.bg} ${g.dark ? "on-dark text-bone" : "text-ink"} py-24 md:py-36`}
          >
            <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <StageGlyph stage={s.id} tone={g.dark ? "dark" : "light"} className="h-40 w-auto md:h-48" />
                  <p className={`telemetry mt-8 ${g.dark ? "text-bone/50" : "text-ink-muted"}`}>
                    {s.code} · {s.formal}
                  </p>
                  <h2 className="display-l mt-4">
                    {s.name} <span className={`serif-accent ${g.dark ? "text-lime" : "text-forest"}`}>· {s.growth.toLowerCase()}</span>
                  </h2>
                  <p className={`headline mt-5 ${g.dark ? "text-sage" : "text-forest"}`}>{s.headline}</p>
                  <p className={`mt-5 max-w-md text-[16.5px] leading-relaxed ${g.dark ? "text-bone/70" : "text-ink-muted"}`}>{s.summary}</p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Reveal as="div" stagger={0.08} className="grid gap-3 sm:grid-cols-2">
                  {s.offerings.map((o, j) => (
                    <article
                      key={o.name}
                      className={`group flex flex-col rounded-[var(--radius-lg)] p-7 transition-colors duration-300 ${
                        g.dark ? "border border-bone/12 bg-bone/[0.04] hover:bg-bone/[0.08]" : "border border-ink/10 bg-bone-raised hover:border-ink/25"
                      }`}
                    >
                      <p className={`telemetry ${g.dark ? "text-bone/40" : "text-ink-muted"}`}>
                        {s.code}.{j + 1}
                      </p>
                      <h3 className="title mt-6">{o.name}</h3>
                      <p className={`mt-3 text-[15px] leading-relaxed ${g.dark ? "text-bone/65" : "text-ink-muted"}`}>{o.detail}</p>
                    </article>
                  ))}
                </Reveal>

                <Reveal className="mt-3">
                  <div className={`grid gap-px overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-2 ${g.dark ? "bg-bone/12" : "bg-ink/10"}`}>
                    <div className={`p-7 ${g.dark ? "bg-night-raised" : "bg-bone-raised"}`}>
                      <p className={`telemetry ${g.dark ? "text-bone/45" : "text-ink-muted"}`}>You leave with</p>
                      <p className="mt-3 leading-snug font-medium">{s.leaveWith}</p>
                    </div>
                    <div className={`p-7 ${g.dark ? "bg-night-raised" : "bg-bone-raised"}`}>
                      <p className={`telemetry flex items-center gap-2 ${g.dark ? "text-bone/45" : "text-ink-muted"}`}>
                        <span className={`size-1.5 rounded-full ${g.dark ? "bg-lime" : "bg-flare"}`} aria-hidden />
                        {s.id === "orbit" ? "Where it goes" : "You move on when"}
                      </p>
                      <p className="mt-3 leading-snug font-medium">{s.exit}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <section data-chapter="Start here" data-tone="light" className="bg-bone py-28 md:py-40">
        <div className="container-site">
          <div className="grid items-center gap-12 rounded-[var(--radius-xl)] border border-ink/10 bg-bone-raised p-8 md:p-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow flex items-center gap-2.5 text-ink-muted">
                <span className="size-1.5 rounded-full bg-flare" /> Not sure where to start?
              </p>
              <SplitReveal className="display-l mt-5 text-ink">
                Start at <span className="serif-accent text-forest">Discover.</span>
              </SplitReveal>
              <p className="lead mt-6 max-w-xl text-ink-muted">
                An AI opportunity assessment is the lightest way in. You leave with a ranked set of use cases and a business
                case for the first one, whether or not you go further with us.
              </p>
              <div className="mt-9">
                <ButtonLink href="/contact" arrow>
                  Book an assessment
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-4">
              <StageGlyph stage="discover" className="mx-auto h-56 w-auto" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
