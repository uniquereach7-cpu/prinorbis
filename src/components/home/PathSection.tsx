"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Chapter, Eyebrow } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { KeyVisual } from "./KeyVisual";
import { stages, type StageId } from "@/content/site";

export function PathSection() {
  const [active, setActive] = useState<StageId | null>(null);

  return (
    <Chapter label="02 · Prove" className="overflow-hidden bg-mist py-24 md:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow className="text-ink-muted">02 · Prove · The path</Eyebrow>
            <h2 className="display-l mt-4 max-w-2xl text-ink">Four stages. One trajectory.</h2>
            <p className="lead mt-6 max-w-xl text-ink-muted">
              Every engagement follows the same path, with a clear exit at each stage. Start where you are. Stop when
              the evidence says so.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/services" arrow>
              See how an engagement runs
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 lg:-mr-16 xl:-mr-24">
          <KeyVisual active={active} />
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s) => (
            <Link
              key={s.id}
              href={`/services#${s.id}`}
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(s.id)}
              onBlur={() => setActive(null)}
              className="group flex flex-col bg-paper-raised p-7 transition-colors hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <p className="telemetry min-h-7 pr-4 text-ink-muted">
                  {s.code} · {s.formal}
                </p>
                <ArrowUpRight
                  className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <h3 className="headline mt-6 text-ink">{s.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{s.summary}</p>
              <div className="mt-auto pt-6">
                <div className="border-t border-ink/10 pt-4">
                  <p className="telemetry text-ink-muted">You leave with</p>
                  <p className="mt-2 text-[14.5px] leading-snug text-ink">{s.leaveWith}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
