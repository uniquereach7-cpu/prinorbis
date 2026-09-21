import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Chapter } from "@/components/ui/Chapter";
import { MissionBrief } from "@/components/forms/MissionBrief";
import { stages } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book an AI opportunity assessment with Prinorbis. Three questions, then a conversation with a partner.",
};

export default function ContactPage() {
  return (
    <Chapter label="Mission brief" className="min-h-dvh overflow-hidden bg-paper pt-[72px]">
      <div
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
        aria-hidden
      />
      <div className="container-site relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow rise flex items-center gap-2 text-ink-muted">
            <span className="size-1.5 rounded-full bg-red" aria-hidden />
            Contact · Mission brief
          </p>
          <h1 className="display-xl rise mt-4 text-ink [animation-delay:100ms]">
            Plot your first point.
          </h1>
          <p className="lead rise mt-7 max-w-md text-ink-muted [animation-delay:180ms]">
            Tell us the function you lead, your industry and where you are today. We will suggest a stage to start at,
            and a partner will get in touch to book the conversation.
          </p>

          <div className="rise mt-12 [animation-delay:240ms]">
            <p className="telemetry text-ink-muted">Where engagements start</p>
            <ul className="mt-4 border-t border-ink/10">
              {stages.map((s) => (
                <li key={s.id} className="border-b border-ink/10">
                  <Link
                    href={`/services#${s.id}`}
                    className="group flex items-center gap-4 py-3.5 text-[15px] text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="telemetry w-6">{s.code}</span>
                    <span className="font-semibold text-ink">{s.name}</span>
                    <span className="hidden truncate sm:inline">{s.headline}</span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rise lg:col-span-6 lg:col-start-7 [animation-delay:200ms]">
          <MissionBrief />
        </div>
      </div>
    </Chapter>
  );
}
