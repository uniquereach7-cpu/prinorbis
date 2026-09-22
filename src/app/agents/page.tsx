import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AgentCellRow } from "@/components/home/AgentsSection";
import { AgentLoop } from "@/components/agents/AgentLoop";
import { Cell } from "@/components/living/Cell";
import { Console } from "@/components/living/Console";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/Chapter";
import { crossAgentLines, orbisAgents } from "@/content/site";

export const metadata: Metadata = {
  title: "Orbis Agents",
  description:
    "Orbis Agents do real work inside your workflows: Agentic CFO for the finance back office, with Agentic CRO and Agentic Insure in development.",
};

const capabilities: Record<string, string[]> = {
  "AGENT.CFO": ["Accounting and journals", "Payables and receivables", "Reconciliation", "Close management", "Cash-flow forecasting"],
  "AGENT.CRO": ["Pipeline hygiene", "Deal risk signals", "Forecast inputs for sales leaders", "Follow-up nudges for owners"],
  "AGENT.INSURE": ["Policy and coverage checks", "Exposure monitoring", "Renewal preparation", "Flags for a human decision"],
};

const principles = [
  { title: "Humans approve", body: "Anything that posts, pays or goes to a customer waits for a person." },
  { title: "Every action on the record", body: "Each match, draft and handoff is logged for review and audit." },
  { title: "Your rules, not ours", body: "Policies, thresholds and approval chains follow how you already work." },
  { title: "Start with one workflow", body: "Prove one agent on your own data, then grow on evidence." },
];

export default function AgentsPage() {
  return (
    <>
      <section data-chapter="Orbis Agents" data-tone="dark" className="on-dark relative overflow-hidden bg-forest pt-36 pb-24 text-bone md:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(30,92,65,0.9),transparent_65%)]" aria-hidden />
        <div className="container-site relative">
          <div className="max-w-4xl">
            <p className="eyebrow rise flex items-center gap-2.5 text-bone/55 [animation-delay:1s]">
              <span className="size-1.5 rounded-full bg-lime" /> Orbis Agents
            </p>
            <h1 className="display-xl rise mt-6 [animation-delay:1.05s]">
              Agents that <span className="serif-accent text-lime">grow</span> with you.
            </h1>
            <p className="lead rise mt-8 max-w-2xl text-bone/70 [animation-delay:1.2s]">
              Each agent is a living cell of the system. It does real work inside your workflows, hands off to the others, and
              escalates to your people when judgement is needed. Built by the same team that designs the strategy.
            </p>
          </div>
          <div className="rise mt-16 [animation-delay:1.3s]">
            <AgentCellRow />
          </div>
        </div>
      </section>

      <section data-chapter="How an agent works" data-tone="light" className="bg-bone py-28 md:py-40">
        <div className="container-site">
          <p className="eyebrow text-ink-muted">How an agent works</p>
          <SplitReveal className="display-l mt-5 max-w-3xl text-ink">
            Sense. Act. Hand off. <span className="serif-accent text-forest">Escalate.</span>
          </SplitReveal>
          <div className="mt-16 md:mt-24">
            <AgentLoop />
          </div>
        </div>
      </section>

      <section data-chapter="The agents" data-tone="dark" className="on-dark bg-night py-28 text-bone md:py-40">
        <div className="container-site">
          <p className="eyebrow text-bone/55">The family</p>
          <SplitReveal className="display-l mt-5 max-w-3xl">
            One family. Named for the <span className="serif-accent text-lime">function</span> it serves.
          </SplitReveal>

          <div className="mt-16 divide-y divide-bone/10 border-y border-bone/10">
            {orbisAgents.map((a, i) => (
              <Reveal key={a.id} as="article" className="grid items-center gap-10 py-14 md:grid-cols-12">
                <div className="md:col-span-4">
                  <Cell seed={11 + i * 17} live={i === 0} className="mx-auto w-full max-w-[300px]">
                    <p className="telemetry text-bone/50">{a.id}</p>
                  </Cell>
                </div>
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.03em]">{a.name}</h3>
                    <StatusPill tone="dark" live={i === 0}>
                      {a.status}
                    </StatusPill>
                  </div>
                  <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-bone/70">{a.body}</p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {capabilities[a.id].map((c) => (
                      <li key={c} className="rounded-full border border-bone/15 px-4 py-2 text-[14px] text-bone/80">
                        {c}
                      </li>
                    ))}
                  </ul>
                  {a.href && (
                    <Link href={a.href} className="telemetry mt-8 inline-flex items-center gap-1.5 text-lime hover:underline">
                      Explore {a.name} <ArrowUpRight className="size-3.5" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-chapter="Handoffs" data-tone="dark" className="on-dark bg-forest py-28 text-bone md:py-36">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-bone/55">Handoffs</p>
            <SplitReveal className="display-l mt-5">
              One system, <span className="serif-accent text-lime">many</span> cells.
            </SplitReveal>
            <p className="lead mt-6 text-bone/70">
              The revenue agent flags a deal at risk. Finance updates the forecast. Risk checks the exposure. Your people see
              one decision, not three dashboards.
            </p>
          </div>
          <Reveal className="lg:col-span-8">
            <Console lines={crossAgentLines} />
          </Reveal>
        </div>
      </section>

      <section data-chapter="Designed for control" data-tone="light" className="bg-bone py-28 md:py-40">
        <div className="container-site">
          <p className="eyebrow text-ink-muted">Designed for control</p>
          <SplitReveal className="display-l mt-5 max-w-3xl text-ink">
            Agents do the work. People keep the <span className="serif-accent text-forest">keys.</span>
          </SplitReveal>
          <Reveal stagger={0.08} className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <div key={p.title} className="border-t-2 border-forest pt-6">
                <p className="telemetry text-ink-muted">0{i + 1}</p>
                <h3 className="title mt-4 text-ink">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            ))}
          </Reveal>
          <div className="mt-20 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/agentic-cfo#early-access" arrow>
              Join Agentic CFO early access
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Tell us the workflow
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
