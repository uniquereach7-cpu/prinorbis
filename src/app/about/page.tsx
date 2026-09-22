import type { Metadata } from "next";
import { GlobeLazy } from "@/components/living/GlobeLazy";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { pillars, team } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Prinorbis comes from Princeps Orbis, first citizen of the world. We read it as a job description: go first. Meet the firm helping mid-sized businesses move first on AI.",
};

const beliefs = [
  ["Verbs first.", "We would rather ship one agent than present ten ideas."],
  ["Specific or silent.", "No invented statistics. If there is no evidence yet, we describe the method."],
  ["Accountable for the outcome.", "We measure ourselves against your business case, not our hours."],
  ["Sized for the mid-market.", "Senior people, short paths and fees that make sense for your business."],
];

export default function AboutPage() {
  return (
    <>
      <section data-chapter="About · Princeps Orbis" data-tone="dark" className="on-dark relative overflow-hidden bg-night text-bone">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_50%,rgba(30,92,65,0.75),transparent_60%)]" aria-hidden />
        <div className="container-site relative grid min-h-svh items-center gap-6 pt-32 pb-16 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-6">
            <p className="eyebrow rise text-bone/55 [animation-delay:1s]">The origin</p>
            <h1 className="rise mt-6 [animation-delay:1.05s]">
              <span className="serif-accent block text-[clamp(4rem,10vw,9rem)] leading-[0.9] text-bone">
                Princeps <span className="text-lime">Orbis.</span>
              </span>
              <span className="display-l mt-6 block text-[clamp(1.6rem,2.6vw,2.4rem)] text-sage">First citizen of the world.</span>
            </h1>
            <p className="lead rise mt-8 max-w-md text-bone/70 [animation-delay:1.25s]">
              We read the name as a job description: go first. Mid-sized businesses will never outspend the giants on AI.
              They can out-move them.
            </p>
            <p className="telemetry rise mt-10 text-bone/40 [animation-delay:1.35s]">Say it prin · OR · bis</p>
          </div>
          <div className="relative h-[80vw] max-h-[720px] lg:col-span-6 lg:h-[78svh]">
            <GlobeLazy className="absolute inset-0 -mx-10 lg:-mr-24" />
          </div>
        </div>
      </section>

      <section data-chapter="About · The story" data-tone="light" className="bg-bone py-28 md:py-44">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-ink-muted">The story</p>
          </div>
          <div className="lg:col-span-9">
            <SplitReveal className="display-l max-w-4xl text-ink">
              Not a king. A first citizen, <span className="serif-accent text-forest">first among equals.</span>
            </SplitReveal>
            <ScrubText className="mt-12 max-w-3xl font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.35] font-medium tracking-[-0.015em] text-forest">
              The Romans had a word for the person who stepped forward first: princeps. We named Prinorbis after that idea
              because it describes the advantage our clients are after. Our job is to make it happen: find where AI pays back
              first, prove it fast, ship it into the business, and keep it growing.
            </ScrubText>
          </div>
        </div>
      </section>

      <section data-chapter="About · What we stand on" data-tone="light" className="bg-mist py-28 md:py-40">
        <div className="container-site">
          <p className="eyebrow text-ink-muted">What we stand on</p>
          <SplitReveal className="display-l mt-5 max-w-3xl text-ink">
            Consultants who <span className="serif-accent text-forest">ship.</span>
          </SplitReveal>
          <Reveal as="div" stagger={0.08} className="mt-16 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.code} className="flex h-full flex-col rounded-[var(--radius-xl)] bg-bone-raised p-9">
                <p className="telemetry text-ink-muted">{p.code}</p>
                <h3 className="headline mt-10 text-ink">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            ))}
          </Reveal>
          <Reveal as="div" stagger={0.06} className="mt-20 grid gap-x-12 border-t border-ink/15 sm:grid-cols-2">
            {beliefs.map(([t, b]) => (
              <div key={t} className="border-b border-ink/15 py-7">
                <p className="serif-accent text-[1.75rem] leading-tight text-forest">{t}</p>
                <p className="mt-2 text-ink-muted">{b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section data-chapter="About · Who is in the room" data-tone="dark" className="on-dark bg-night py-28 text-bone md:py-40">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-bone/55">Who is in the room</p>
            <SplitReveal className="display-l mt-5">
              Senior in the <span className="serif-accent text-lime">room.</span>
            </SplitReveal>
            <p className="lead mt-7 max-w-md text-bone/65">
              Our leadership has run large AI and data programmes across the US, the UK and India. The people you meet in the
              first conversation are the people who do the work.
            </p>
          </div>
          <Reveal as="div" stagger={0.08} className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {team.map((m, i) => (
              <article key={i} className="flex h-full flex-col rounded-[var(--radius-lg)] border border-dashed border-bone/20 p-6">
                <div className="flex aspect-square w-full items-center justify-center rounded-[var(--radius-md)] bg-night-raised">
                  <span className="serif-accent text-5xl text-bone/30">{m.initials}</span>
                </div>
                <h3 className="title mt-5">{m.name}</h3>
                <p className="telemetry mt-2 text-sage">{m.role}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-bone/50">{m.bio}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section data-chapter="About · Next" data-tone="light" className="bg-bone py-28 md:py-36">
        <div className="container-site flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-ink-muted">
              <span className="size-1.5 rounded-full bg-flare" /> Next
            </p>
            <SplitReveal className="display-l mt-5 max-w-2xl text-ink">
              Find your <span className="serif-accent text-forest">first point.</span>
            </SplitReveal>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" arrow>
              Start at Discover
            </ButtonLink>
            <ButtonLink href="/services" variant="outline">
              See the path
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
