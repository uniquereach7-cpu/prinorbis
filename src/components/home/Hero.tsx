import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Chapter, StatusPill } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Button";
import { HeroOrbit } from "./HeroOrbit";
import { stages } from "@/content/site";

export function Hero() {
  return (
    <Chapter label="00 · Launchpad" className="overflow-hidden bg-paper pt-[72px]">
      <div
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        aria-hidden
      />

      <div className="container-site relative grid items-center gap-12 pt-10 pb-16 md:pt-16 lg:min-h-[calc(100svh-72px-64px)] lg:grid-cols-12 lg:gap-8 lg:pb-12">
        <div className="lg:col-span-6 xl:col-span-6">
          <Link href="/agentic-cfo" className="rise inline-block transition-opacity hover:opacity-80">
            <StatusPill live>Agentic CFO · early access open</StatusPill>
          </Link>

          <p className="eyebrow rise mt-8 text-ink-muted [animation-delay:80ms]">
            AI strategy, agents and delivery
          </p>

          <h1 className="display-xl rise mt-4 text-ink [animation-delay:140ms]">
            Move first<span className="text-red">.</span>
          </h1>

          <p className="lead rise mt-7 max-w-xl text-ink-muted [animation-delay:220ms]">
            We help mid-sized businesses get working AI into the business before their competitors do.
            Consulting-grade strategy, redesigned processes and agents that actually ship.
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:300ms]">
            <ButtonLink href="/contact" arrow>
              Book an AI opportunity assessment
            </ButtonLink>
            <ButtonLink href="/agentic-cfo" variant="secondary">
              Meet Agentic CFO
            </ButtonLink>
          </div>
        </div>

        <div className="rise relative lg:col-span-6 [animation-delay:200ms] xl:-mr-10">
          <div className="on-dark relative overflow-hidden rounded-[var(--radius-xl)] bg-night text-paper shadow-[0_40px_80px_-40px_rgba(6,23,34,0.55)]">
            <div
              className="dot-grid pointer-events-none absolute inset-0 opacity-60"
              style={{ "--dot": "#17303f" } as React.CSSProperties}
              aria-hidden
            />
            <div className="telemetry absolute top-5 left-5 z-10 text-paper/50">Orbis · system map</div>
            <div className="telemetry absolute top-5 right-5 z-10 hidden text-paper/50 sm:block">Stage 00 · Launchpad</div>
            <div className="relative px-4 pt-10 pb-8 sm:px-10">
              <HeroOrbit />
            </div>
            <div className="telemetry absolute bottom-5 left-5 z-10 text-paper/50">3 agents · your team in control</div>
            <div className="telemetry absolute right-5 bottom-5 z-10 hidden text-paper/50 sm:block">
              Humans approve
            </div>
          </div>
        </div>
      </div>

      <div className="container-site relative">
        <div className="telemetry flex h-16 items-center justify-between gap-6 border-t border-ink/10 text-ink-muted">
          <span>Stage 00 / 04</span>
          <span className="hidden items-center gap-3 md:flex">
            {stages.map((s, i) => (
              <span key={s.id} className="flex items-center gap-3">
                {s.name}
                {i < stages.length - 1 && <span className="w-8 border-t border-dashed border-ink/30" />}
              </span>
            ))}
          </span>
          <span className="flex items-center gap-2">
            Scroll to launch <ArrowDown className="size-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Chapter>
  );
}
