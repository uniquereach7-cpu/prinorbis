import { Chapter, Eyebrow } from "@/components/ui/Chapter";
import { Reveal } from "@/components/ui/Reveal";
import { MissionBrief } from "@/components/forms/MissionBrief";

export function BriefSection() {
  return (
    <Chapter label="Mission brief" className="overflow-hidden bg-paper py-24 md:py-32">
      <div
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_70%)]"
        aria-hidden
      />
      <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5 lg:pt-6">
          <Eyebrow point className="text-ink-muted">
            Mission brief
          </Eyebrow>
          <h2 className="display-l mt-4 text-ink">Plot your first point.</h2>
          <p className="lead mt-6 max-w-md text-ink-muted">
            Three questions. We will suggest the stage to start at, then book a conversation with a partner.
          </p>
          <ul className="mt-10 space-y-4 text-[15px] text-ink-muted">
            {[
              "A partner in the first conversation, not a sales rep",
              "A straight answer if AI is not the right move yet",
              "No obligation beyond the call",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 w-4 border-t border-dashed border-ink/40" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <MissionBrief />
        </Reveal>
      </div>
    </Chapter>
  );
}
