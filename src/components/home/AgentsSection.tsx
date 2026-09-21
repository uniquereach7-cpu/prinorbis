import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chapter, Eyebrow, StatusPill } from "@/components/ui/Chapter";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Console } from "./Console";
import { cfoSuite, orbisAgents } from "@/content/site";

function HexBullet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={`size-3.5 shrink-0 ${className}`} aria-hidden>
      <polygon points="0,-10 8.66,-5 8.66,5 0,10 -8.66,5 -8.66,-5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function AgentsSection() {
  const [cfo, ...others] = orbisAgents;

  return (
    <Chapter label="03 · Launch" tone="dark" id="agents" className="overflow-hidden bg-blue-deep py-24 text-paper md:py-32">
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
        style={{ "--dot": "#1a4a62" } as React.CSSProperties}
        aria-hidden
      />
      <div className="container-site relative">
        <Reveal>
          <Eyebrow className="text-paper/60">03 · Launch · Orbis Agents</Eyebrow>
          <h2 className="display-l mt-4 max-w-3xl">Agents that ship.</h2>
          <p className="lead mt-6 max-w-2xl text-paper/70">
            Orbis Agents do real work inside your workflows, hand off to each other, and escalate to your people when
            judgement is needed. They are built by the same team that designs the strategy.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] bg-night p-7 sm:p-10">
              <svg
                viewBox="0 0 400 400"
                className="pointer-events-none absolute -top-24 -right-24 size-[360px] opacity-40"
                aria-hidden
              >
                {[70, 120, 170].map((r) => (
                  <circle key={r} cx={200} cy={200} r={r} fill="none" stroke="#9bb6c6" strokeOpacity={0.35} />
                ))}
              </svg>
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <p className="telemetry text-paper/50">{cfo.id}</p>
                <StatusPill tone="dark" live>
                  {cfo.status}
                </StatusPill>
              </div>
              <h3 className="display-l relative mt-8 text-[clamp(2rem,3.6vw,3rem)]">{cfo.name}</h3>
              <p className="relative mt-4 max-w-lg text-paper/70">{cfo.body}</p>

              <ul className="relative mt-8 grid gap-2.5 sm:grid-cols-2">
                {cfoSuite.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border border-paper/10 bg-paper/[0.03] px-4 py-3"
                  >
                    <HexBullet className="text-steel" />
                    <span className="text-[15px] font-medium">{a.name}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex flex-wrap gap-3 pt-10">
                <ButtonLink href="/agentic-cfo" variant="paper" arrow>
                  Explore Agentic CFO
                </ButtonLink>
                <ButtonLink href="/agentic-cfo#early-access" variant="outline-dark">
                  Join early access
                </ButtonLink>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            {others.map((a, i) => (
              <Reveal key={a.id} delay={0.08 * (i + 1)}>
                <article className="flex h-full flex-col rounded-[var(--radius-xl)] border border-paper/15 p-7 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="telemetry text-paper/50">{a.id}</p>
                    <span className="telemetry rounded-full border border-paper/15 px-3 py-1.5 text-paper/60">
                      {a.status}
                    </span>
                  </div>
                  <h3 className="headline mt-6">{a.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-paper/65">{a.body}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <Link
                href="/contact"
                className="group flex items-center justify-between rounded-[var(--radius-xl)] border border-dashed border-paper/20 px-7 py-6 text-paper/70 transition-colors hover:border-paper/50 hover:text-paper sm:px-8"
              >
                <span className="text-[15px]">Need an agent for another function? Tell us the workflow.</span>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-5">
          <Console />
        </Reveal>
      </div>
    </Chapter>
  );
}
