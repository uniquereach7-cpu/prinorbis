import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StageGlyph } from "@/components/living/StageGlyph";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { insights, stages } from "@/content/site";

export const metadata: Metadata = {
  title: "Insights",
  description: "Field notes from Prinorbis on moving first with AI: getting pilots into production, agents and people, and data that is ready enough.",
};

export default function InsightsPage() {
  const [lead, ...rest] = insights;
  const leadStage = stages.find((s) => s.id === lead.stage)!;

  return (
    <>
      <section data-chapter="Insights · Field notes" data-tone="light" className="relative overflow-hidden bg-bone pt-40 pb-20 md:pb-28">
        <div className="container-site">
          <p className="eyebrow rise flex items-center gap-2.5 text-ink-muted [animation-delay:1s]">
            <span className="size-1.5 rounded-full bg-flare" /> Insights · Field notes
          </p>
          <h1 className="display-xl rise mt-6 max-w-5xl text-ink [animation-delay:1.05s]">
            Notes from the <span className="serif-accent text-forest">field.</span>
          </h1>
          <p className="lead rise mt-8 max-w-xl text-ink-muted [animation-delay:1.2s]">
            What we learn getting AI out of the pilot and into the business. Each note is tagged with the stage of the path
            it speaks to.
          </p>
        </div>
      </section>

      <section data-chapter="Latest note" data-tone="light" className="bg-bone pb-24">
        <div className="container-site">
          <Reveal>
            <Link
              href={`/insights/${lead.slug}`}
              className="group on-dark grid overflow-hidden rounded-[var(--radius-xl)] bg-night text-bone md:grid-cols-12"
            >
              <div className="p-8 md:col-span-7 md:p-14">
                <p className="telemetry text-lime">
                  {leadStage.code} · {leadStage.name} · {lead.read}
                </p>
                <h2 className="display-l mt-6 text-[clamp(2rem,3.6vw,3.25rem)]">{lead.title}</h2>
                <p className="lead mt-6 max-w-lg text-bone/65">{lead.dek}</p>
                <span className="telemetry mt-10 inline-flex items-center gap-1.5 text-bone/70 group-hover:text-lime">
                  Read the note <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <div className="relative flex items-center justify-center bg-forest p-10 md:col-span-5">
                <StageGlyph stage={lead.stage} tone="dark" className="h-56 w-auto transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section data-chapter="All notes" data-tone="light" className="bg-bone pb-28 md:pb-40">
        <div className="container-site">
          <SplitReveal as="h2" className="headline text-ink">
            More notes
          </SplitReveal>
          <Reveal as="div" stagger={0.1} className="mt-8 grid gap-4 md:grid-cols-2">
            {rest.map((n) => {
              const s = stages.find((x) => x.id === n.stage)!;
              return (
                <Link
                  key={n.slug}
                  href={`/insights/${n.slug}`}
                  className="group flex flex-col rounded-[var(--radius-xl)] border border-ink/10 bg-bone-raised p-8 transition-colors hover:border-ink/30 md:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <p className="telemetry text-ink-muted">
                      {s.code} · {s.name} · {n.read}
                    </p>
                    <StageGlyph stage={n.stage} className="h-16 w-auto shrink-0" />
                  </div>
                  <h3 className="headline mt-8 text-ink">{n.title}</h3>
                  <p className="mt-4 text-ink-muted">{n.dek}</p>
                  <span className="telemetry mt-8 inline-flex items-center gap-1.5 text-forest">
                    Read the note <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>
    </>
  );
}
