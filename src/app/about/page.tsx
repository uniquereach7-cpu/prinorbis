import type { Metadata } from "next";
import { Chapter, Eyebrow } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/brand/Mark";
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
      <Chapter label="About · The origin" className="overflow-hidden bg-paper pt-[72px]">
        <div
          className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
          aria-hidden
        />
        <div className="container-site relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow rise text-ink-muted">About · Princeps Orbis</p>
            <h1 className="display-xl rise mt-4 text-ink [animation-delay:100ms]">
              We go first so you can<span className="text-red">.</span>
            </h1>
          </div>
          <div className="rise lg:col-span-5 [animation-delay:200ms]">
            <div className="on-dark relative mx-auto max-w-md overflow-hidden rounded-[var(--radius-xl)] bg-night p-10 sm:p-14">
              <svg viewBox="0 0 300 300" className="absolute inset-0 size-full" aria-hidden>
                {[70, 105, 140].map((r, i) => (
                  <circle
                    key={r}
                    cx={150}
                    cy={150}
                    r={r}
                    fill="none"
                    stroke="#9bb6c6"
                    strokeOpacity={0.25}
                    strokeDasharray={i === 1 ? "2 8" : undefined}
                  />
                ))}
              </svg>
              <Mark tone="dark" live className="relative mx-auto w-1/2" />
              <p className="telemetry relative mt-10 text-center text-paper/50">prin · OR · bis</p>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter label="About · The name" className="bg-paper pb-24 md:pb-32">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow className="text-ink-muted">The name</Eyebrow>
          </div>
          <Reveal className="lg:col-span-8">
            <p className="headline text-ink">
              The Romans had a word for the person who stepped forward first: <em className="not-italic text-blue">princeps</em>.
              Not a king. A first citizen, first among equals.
            </p>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-muted">
              <p>
                We named Prinorbis after that idea because it describes the advantage our clients are after. Mid-sized
                businesses will never outspend the giants on AI. They can out-move them.
              </p>
              <p>
                Our job is to make that happen: find where AI pays back first, prove it fast, ship it into the business,
                and keep it running. Consulting when you need a plan, and Orbis Agents when a workflow needs doing.
              </p>
            </div>
          </Reveal>
        </div>
      </Chapter>

      <Chapter label="About · Pillars" className="bg-mist py-24 md:py-32">
        <div className="container-site">
          <Reveal>
            <Eyebrow className="text-ink-muted">What we stand on</Eyebrow>
            <h2 className="display-l mt-4 max-w-3xl text-ink">Consultants who ship.</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-[var(--radius-lg)] bg-paper-raised p-8">
                  <p className="telemetry text-ink-muted">{p.code}</p>
                  <h3 className="headline mt-8 text-ink">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <ul className="mt-16 grid gap-x-10 border-t border-ink/15 sm:grid-cols-2">
            {beliefs.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={(i % 2) * 0.06} className="border-b border-ink/15 py-6">
                <p className="title text-ink">{t}</p>
                <p className="mt-2 text-ink-muted">{b}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Chapter>

      <Chapter label="About · The team" tone="dark" className="bg-night py-24 text-paper md:py-32">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow className="text-paper/60">Who is in the room</Eyebrow>
              <h2 className="display-l mt-4">Senior in the room.</h2>
              <p className="lead mt-6 max-w-md text-paper/65">
                Our leadership has run large AI and data programmes across the US, the UK and India. The people you meet
                in the first conversation are the people who do the work.
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              {team.map((m, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-dashed border-paper/20 p-6">
                    <div className="flex aspect-square w-full items-center justify-center rounded-[var(--radius-md)] bg-night-raised">
                      <span className="font-display text-3xl font-semibold text-paper/30">{m.initials}</span>
                    </div>
                    <h3 className="title mt-5">{m.name}</h3>
                    <p className="telemetry mt-2 text-steel">{m.role}</p>
                    <p className="mt-4 text-[14px] leading-relaxed text-paper/50">{m.bio}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter label="About · Next" className="bg-paper py-24 md:py-32">
        <div className="container-site flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow point className="text-ink-muted">
              Next
            </Eyebrow>
            <h2 className="display-l mt-4 max-w-2xl text-ink">Find your first point.</h2>
          </Reveal>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" arrow>
              Book an assessment
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              See the path
            </ButtonLink>
          </div>
        </div>
      </Chapter>
    </>
  );
}
