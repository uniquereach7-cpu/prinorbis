import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { StageGlyph } from "@/components/living/StageGlyph";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { insights, stages } from "@/content/site";

export function generateStaticParams() {
  return insights.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = insights.find((n) => n.slug === slug);
  return note ? { title: note.title, description: note.dek } : {};
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const note = insights.find((n) => n.slug === slug);
  if (!note) notFound();
  const stage = stages.find((s) => s.id === note.stage)!;
  const next = insights[(insights.indexOf(note) + 1) % insights.length];

  return (
    <>
      <article data-chapter={`Field note · ${stage.name}`} data-tone="light" className="bg-bone pt-40 pb-24 md:pb-32">
        <div className="container-site">
          <Link href="/insights" className="telemetry rise inline-flex items-center gap-2 text-ink-muted hover:text-ink [animation-delay:1s]">
            <ArrowLeft className="size-3.5" /> All field notes
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="telemetry rise flex items-center gap-2.5 text-ink-muted [animation-delay:1.05s]">
                <span className="size-1.5 rounded-full bg-flare" />
                {stage.code} · {stage.name} · {note.read}
              </p>
              <h1 className="display-l rise mt-6 text-ink [animation-delay:1.1s]">{note.title}</h1>
              <p className="serif-accent rise mt-8 max-w-2xl text-[clamp(1.5rem,2.4vw,2rem)] leading-snug text-forest [animation-delay:1.2s]">
                {note.dek}
              </p>
            </div>
            <div className="rise hidden lg:col-span-3 lg:col-start-10 lg:block [animation-delay:1.2s]">
              <StageGlyph stage={note.stage} className="h-48 w-auto" />
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t border-ink/10 pt-14 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <p className="telemetry text-ink-muted">Speaks to</p>
              <Link href={`/services#${stage.id}`} className="mt-3 inline-flex items-center gap-1.5 font-semibold text-forest hover:underline">
                {stage.name} · {stage.growth} <ArrowUpRight className="size-3.5" />
              </Link>
            </aside>
            <Reveal as="div" stagger={0.1} className="space-y-7 text-[18.5px] leading-[1.75] text-ink/85 lg:col-span-7">
              {note.body.map((p, i) => (
                <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[4.2em] first-letter:leading-[0.8] first-letter:text-forest" : ""}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </article>

      <section data-chapter="Next note" data-tone="dark" className="on-dark bg-night py-24 text-bone">
        <div className="container-site flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link href={`/insights/${next.slug}`} className="group max-w-2xl">
            <p className="telemetry text-bone/50">Next note</p>
            <p className="headline mt-4 group-hover:text-lime">{next.title}</p>
          </Link>
          <ButtonLink href="/contact" variant="lime" arrow>
            Plant your first point
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
