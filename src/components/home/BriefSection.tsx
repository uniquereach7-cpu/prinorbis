import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { MissionBrief } from "@/components/forms/MissionBrief";

export function BriefSection() {
  return (
    <section data-chapter="Mission brief" data-tone="light" className="relative overflow-hidden bg-bone py-28 md:py-40">
      <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-6">
          <p className="eyebrow flex items-center gap-2.5 text-ink-muted">
            <span className="size-1.5 rounded-full bg-flare" /> Mission brief
          </p>
          <SplitReveal className="display-l mt-5 text-ink">
            Plant your <span className="serif-accent text-forest">first point.</span>
          </SplitReveal>
          <Reveal>
            <p className="lead mt-7 max-w-md text-ink-muted">
              Three questions. We will tell you which stage to start at, and book a conversation with a partner.
            </p>
            <ul className="mt-10 space-y-4 text-[15px] text-ink-muted">
              {["A partner in the first conversation, not a sales rep", "A straight answer if AI is not the right move yet", "No obligation beyond the call"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="size-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <MissionBrief />
        </Reveal>
      </div>
    </section>
  );
}
