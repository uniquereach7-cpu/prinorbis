import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CfoColony } from "@/components/cfo/CfoColony";
import { WorkflowDiagram } from "@/components/cfo/WorkflowDiagram";
import { Waitlist } from "@/components/cfo/Waitlist";
import { Console } from "@/components/living/Console";
import { blob } from "@/components/living/geometry";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/Chapter";
import { Faq } from "@/components/ui/Faq";
import { cfoFaqs, cfoSuite, consoleLines } from "@/content/site";

export const metadata: Metadata = {
  title: "Agentic CFO",
  description:
    "Agentic CFO is a suite of agents for the finance back office: accounting, AP and AR, reconciliation, close and forecasting. Coming soon, early access open.",
};

const today = [
  {
    area: "Month-end close",
    now: "A spreadsheet checklist, chased over email, with sign-off held up by one missing reconciliation.",
    next: "The close agent runs the checklist, drafts the accruals and shows exactly what is blocking sign-off.",
  },
  {
    area: "Payables and receivables",
    now: "Invoices keyed by hand, matched by eye, and customers chased when someone remembers.",
    next: "Invoices are read and matched as they arrive. Follow-ups go out on schedule, in your tone.",
  },
  {
    area: "Reconciliation",
    now: "Hours spent ticking bank lines, with breaks listed but rarely explained.",
    next: "Lines are matched continuously and every break comes with an explanation and an owner.",
  },
  {
    area: "Forecasting",
    now: "A cash forecast that is out of date by the time it reaches the leadership team.",
    next: "The forecast refreshes as actuals land, and scenarios run when someone asks a what-if.",
  },
];

export default function AgenticCfoPage() {
  return (
    <>
      <section data-chapter="Orbis Agents · Agentic CFO" data-tone="dark" className="on-dark relative overflow-hidden bg-night text-bone">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,rgba(30,92,65,0.7),transparent_60%)]" aria-hidden />
        <div className="container-site relative grid min-h-svh items-center gap-12 pt-36 pb-20 lg:grid-cols-12 lg:pt-28">
          <div className="lg:col-span-6">
            <div className="rise [animation-delay:1s]">
              <StatusPill tone="dark" live>
                Coming soon · early access open
              </StatusPill>
            </div>
            <p className="eyebrow rise mt-8 text-bone/55 [animation-delay:1.05s]">Orbis Agents · Agent.CFO</p>
            <h1 className="display-xl rise mt-5 [animation-delay:1.1s]">
              Agentic <span className="serif-accent text-lime">CFO.</span>
            </h1>
            <p className="headline rise mt-7 max-w-lg text-sage [animation-delay:1.2s]">The finance back office, grown from agents. Approved by your team.</p>
            <p className="lead rise mt-6 max-w-xl text-bone/70 [animation-delay:1.25s]">
              A suite of agents that works across accounting, payables and receivables, reconciliation, close and
              forecasting. Your team sets the rules and makes the calls. The agents do the legwork.
            </p>
            <div className="rise mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:1.35s]">
              <ButtonLink href="#early-access" variant="lime" arrow>
                Join the early access list
              </ButtonLink>
              <ButtonLink href="#suite" variant="outline-dark">
                Meet the suite
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <CfoColony />
          </div>
        </div>
      </section>

      <section data-chapter="Finance today" data-tone="light" className="bg-bone py-28 md:py-40">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ink-muted">Finance today</p>
            <SplitReveal className="display-l mt-5 text-ink">
              Finance runs on <span className="serif-accent text-forest">heroics.</span>
            </SplitReveal>
            <p className="lead mt-7 max-w-md text-ink-muted">
              Good finance teams hold the month together with spreadsheets, email and late nights. Agentic CFO takes the
              repeatable work off their plate, so their judgement goes where it counts.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="hidden grid-cols-[1fr_1fr] gap-6 pb-4 sm:grid sm:pl-[30%]">
              <p className="telemetry text-ink-muted">Today</p>
              <p className="telemetry flex items-center gap-2 text-forest">
                <span className="size-1.5 rounded-full bg-flare" aria-hidden />
                With Agentic CFO
              </p>
            </div>
            <Reveal as="div" stagger={0.07} className="border-t border-ink/15">
              {today.map((row) => (
                <div key={row.area} className="grid gap-3 border-b border-ink/15 py-7 sm:grid-cols-[30%_1fr_1fr] sm:gap-6">
                  <p className="title text-ink">{row.area}</p>
                  <p className="text-[15px] leading-relaxed text-ink-muted">
                    <span className="telemetry mb-1 block sm:hidden">Today</span>
                    {row.now}
                  </p>
                  <p className="text-[15px] leading-relaxed text-ink">
                    <span className="telemetry mb-1 block text-forest sm:hidden">With Agentic CFO</span>
                    {row.next}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section id="suite" data-chapter="The suite" data-tone="light" className="scroll-mt-20 bg-mist py-28 md:py-40">
        <div className="container-site">
          <p className="eyebrow text-ink-muted">The suite · five agents</p>
          <SplitReveal className="display-l mt-5 max-w-3xl text-ink">
            One suite. Five agents. One <span className="serif-accent text-forest">ledger.</span>
          </SplitReveal>
          <p className="lead mt-7 max-w-2xl text-ink-muted">
            Each agent owns a slice of the finance back office and hands off to the next. Start with the one that hurts
            most, and add the rest when it has proved itself.
          </p>

          <Reveal as="div" stagger={0.06} className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cfoSuite.map((a, i) => (
              <article key={a.id} className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-ink/10 bg-bone-raised p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(11,34,25,0.5)]">
                <div className="flex items-center justify-between">
                  <svg viewBox="0 0 60 60" className="size-12 transition-transform duration-700 group-hover:rotate-45" aria-hidden>
                    <path d={blob(30, 30, 24, 40 + i, 0.16)} fill="#16432f" />
                    <circle cx="30" cy="24" r="5" fill="#8fae96" />
                  </svg>
                  <p className="telemetry text-ink-muted">Agent.{a.id}</p>
                </div>
                <h3 className="headline mt-8 text-ink">{a.name}</h3>
                <ul className="mt-5 space-y-3">
                  {a.tasks.map((t) => (
                    <li key={t} className="flex gap-3 text-[15px] leading-snug text-ink-muted">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <p className="telemetry flex items-center gap-2 border-t border-ink/10 pt-5 text-ink-muted">
                    Hands off to <ArrowRight className="size-3" strokeWidth={2} aria-hidden /> {a.handsOff}
                  </p>
                </div>
              </article>
            ))}
            <article className="on-dark flex h-full flex-col rounded-[var(--radius-lg)] bg-night p-8 text-bone">
              <div className="flex items-center justify-between">
                <p className="telemetry text-bone/50">Human in the loop</p>
                <span className="size-2 rounded-full bg-lime" aria-hidden />
              </div>
              <h3 className="headline mt-8">Your team</h3>
              <p className="mt-5 text-[15px] leading-relaxed text-bone/70">
                Controllers, approvers and the CFO stay in charge. They review exceptions, approve what posts, and set the
                rules the agents follow.
              </p>
              <div className="mt-auto pt-8">
                <ButtonLink href="#early-access" variant="lime" arrow>
                  Shape the first release
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section data-chapter="How it works" data-tone="dark" className="on-dark bg-night py-28 text-bone md:py-40">
        <div className="container-site">
          <p className="eyebrow text-bone/55">How it works</p>
          <SplitReveal className="display-l mt-5 max-w-3xl">
            Between your systems and your <span className="serif-accent text-lime">sign-off.</span>
          </SplitReveal>
          <p className="lead mt-7 max-w-2xl text-bone/65">
            Agentic CFO is designed to sit inside the tools your finance team already uses. Which systems it connects to is
            scoped with you during Discover.
          </p>
          <div className="mt-16">
            <WorkflowDiagram />
          </div>
          <Reveal className="mt-12">
            <Console lines={consoleLines} title="Agent.CFO · console" />
          </Reveal>
        </div>
      </section>

      <section id="early-access" data-chapter="Early access" data-tone="dark" className="on-dark relative scroll-mt-20 overflow-hidden bg-forest py-28 text-bone md:py-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(200,240,60,0.08),transparent_55%)]" aria-hidden />
        <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-bone/60">Early access</p>
            <SplitReveal className="display-l mt-5">
              First in. <span className="serif-accent text-lime">Fully built.</span>
            </SplitReveal>
            <p className="lead mt-7 max-w-md text-bone/70">
              Agentic CFO is in development. We are working with a small group of finance teams to shape the first release
              around real workflows.
            </p>
            <Reveal as="div" stagger={0.08} className="mt-10 space-y-6">
              {[
                ["A say in the roadmap", "Tell us which workflow to build for first."],
                ["A pilot on your data", "Prove one agent before anything is rolled out."],
                ["A straight answer", "We will tell you what is ready, and what is not."],
              ].map(([t, b]) => (
                <div key={t} className="flex gap-4">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-lime" aria-hidden />
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1 text-[15px] text-bone/65">{b}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <Waitlist />
          </Reveal>
        </div>
      </section>

      <section data-chapter="Questions" data-tone="light" className="bg-bone py-28 md:py-40">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-ink-muted">Questions</p>
            <SplitReveal className="display-l mt-5 text-ink">
              Plain <span className="serif-accent text-forest">answers.</span>
            </SplitReveal>
            <p className="mt-6 max-w-sm text-ink-muted">Anything else, ask us directly. If Agentic CFO is not the right fit yet, we will say so.</p>
            <div className="mt-9">
              <ButtonLink href="/contact" variant="outline" arrow>
                Talk to a partner
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={cfoFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
