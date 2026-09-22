import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MissionBrief } from "@/components/forms/MissionBrief";
import { StageGlyph } from "@/components/living/StageGlyph";
import { stages } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Plant your first point with Prinorbis. Three questions, a suggested starting stage, then a conversation with a partner.",
};

export default function ContactPage() {
  return (
    <section data-chapter="Mission brief" data-tone="light" className="relative min-h-svh overflow-hidden bg-bone pt-36 pb-24">
      <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow rise flex items-center gap-2.5 text-ink-muted [animation-delay:1s]">
            <span className="size-1.5 rounded-full bg-flare" /> Contact · Mission brief
          </p>
          <h1 className="display-xl rise mt-6 text-ink [animation-delay:1.05s]">
            Plant your <span className="serif-accent text-forest">first point.</span>
          </h1>
          <p className="lead rise mt-8 max-w-md text-ink-muted [animation-delay:1.2s]">
            Tell us the function you lead, your industry and where you are today. We will suggest a stage to start at, and a
            partner will get in touch to book the conversation.
          </p>

          <div className="rise mt-12 [animation-delay:1.3s]">
            <p className="telemetry text-ink-muted">Where engagements start</p>
            <ul className="mt-4 border-t border-ink/10">
              {stages.map((s) => (
                <li key={s.id} className="border-b border-ink/10">
                  <Link href={`/services#${s.id}`} className="group flex items-center gap-4 py-3 text-[15px] text-ink-muted transition-colors hover:text-ink">
                    <StageGlyph stage={s.id} className="h-10 w-12 shrink-0" />
                    <span className="font-semibold text-ink">{s.name}</span>
                    <span className="serif-accent text-[17px] text-forest">{s.growth.toLowerCase()}</span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" strokeWidth={1.5} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rise lg:col-span-6 lg:col-start-7 [animation-delay:1.15s]">
          <MissionBrief />
        </div>
      </div>
    </section>
  );
}
