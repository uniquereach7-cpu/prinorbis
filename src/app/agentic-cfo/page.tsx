import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Chapter, Eyebrow, StatusPill } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { SuiteHex } from "@/components/cfo/SuiteHex";
import { WorkflowDiagram } from "@/components/cfo/WorkflowDiagram";
import { Waitlist } from "@/components/cfo/Waitlist";
import { Console } from "@/components/home/Console";
import { cfoFaqs, cfoSuite } from "@/content/site";

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

const principles = [
  {
    title: "Humans approve",
    body: "Agents prepare and propose. Anything that posts, pays or goes to a customer waits for a person.",
  },
  {
    title: "Every action on the record",
    body: "Each match, draft and handoff is logged, so audit and review have a trail to follow.",
  },
  {
    title: "Your rules, not ours",
    body: "Policies, thresholds and approval chains are set to match how your finance team already works.",
  },
  {
    title: "Start with one workflow",
    body: "Prove one agent on your own data first, then extend across the suite on evidence.",
  },
];

export default function AgenticCfoPage() {
  return (
    <>
      <Chapter label="Orbis Agents · Agentic CFO" className="overflow-hidden bg-paper pt-[72px]">
        <div
          className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          aria-hidden
        />
        <div className="container-site relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="rise">
              <StatusPill live>Coming soon · early access open</StatusPill>
            </div>
            <p className="eyebrow rise mt-8 text-ink-muted [animation-delay:80ms]">Orbis Agents · Agent.CFO</p>
            <h1 className="display-xl rise mt-4 text-ink [animation-delay:140ms]">
              Agentic CFO<span className="text-red">.</span>
            </h1>
            <p className="headline rise mt-6 max-w-lg text-blue [animation-delay:200ms]">
              The finance back office, run by agents. Approved by your team.
            </p>
            <p className="lead rise mt-6 max-w-xl text-ink-muted [animation-delay:260ms]">
              A suite of agents that works across accounting, payables and receivables, reconciliation, close and
              forecasting. Your team sets the rules and makes the calls. The agents do the legwork.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:320ms]">
              <ButtonLink href="#early-access" arrow>
                Join the early access list
              </ButtonLink>
              <ButtonLink href="#suite" variant="secondary">
                Meet the suite
              </ButtonLink>
            </div>
          </div>
          <div className="rise lg:col-span-6 [animation-delay:200ms] xl:-mr-10">
            <div className="on-dark relative overflow-hidden rounded-[var(--radius-xl)] bg-night px-4 pt-14 pb-10 sm:px-8">
              <div
                className="dot-grid pointer-events-none absolute inset-0 opacity-60"
                style={{ "--dot": "#17303f" } as React.CSSProperties}
                aria-hidden
              />
              <p className="telemetry absolute top-5 left-5 text-paper/50">Agent.CFO · suite map</p>
              <p className="telemetry absolute top-5 right-5 hidden text-paper/50 sm:block">v0 · in development</p>
              <div className="relative">
                <SuiteHex />
              </div>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter label="The problem" className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow className="text-ink-muted">Finance today</Eyebrow>
              <h2 className="display-l mt-4 text-ink">Finance runs on heroics.</h2>
              <p className="lead mt-6 max-w-md text-ink-muted">
                Good finance teams hold the month together with spreadsheets, email and late nights. Agentic CFO takes
                the repeatable work off their plate, so their judgement goes where it counts.
              </p>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="hidden grid-cols-[1fr_1fr] gap-6 pb-4 sm:grid sm:pl-[30%]">
                <p className="telemetry text-ink-muted">Today</p>
                <p className="telemetry flex items-center gap-2 text-blue">
                  <span className="size-1.5 rounded-full bg-red" aria-hidden />
                  With Agentic CFO
                </p>
              </div>
              <ul className="border-t border-ink/15">
                {today.map((row, i) => (
                  <Reveal
                    as="li"
                    key={row.area}
                    delay={i * 0.05}
                    className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[30%_1fr_1fr] sm:gap-6"
                  >
                      <p className="title text-ink">{row.area}</p>
                      <p className="text-[15px] leading-relaxed text-ink-muted">
                        <span className="telemetry mb-1 block sm:hidden">Today</span>
                        {row.now}
                      </p>
                      <p className="text-[15px] leading-relaxed text-ink">
                        <span className="telemetry mb-1 block text-blue sm:hidden">With Agentic CFO</span>
                        {row.next}
                      </p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter label="The suite" id="suite" className="bg-mist py-24 md:py-32">
        <div className="container-site">
          <Reveal>
            <Eyebrow className="text-ink-muted">The suite · five agents</Eyebrow>
            <h2 className="display-l mt-4 max-w-3xl text-ink">One suite. Five agents. One ledger.</h2>
            <p className="lead mt-6 max-w-2xl text-ink-muted">
              Each agent owns a slice of the finance back office and hands off to the next. Start with the one that hurts
              most, and add the rest when it has proved itself.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cfoSuite.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.06}>
                <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-ink/10 bg-paper-raised p-7">
                  <div className="flex items-center justify-between">
                    <p className="telemetry text-ink-muted">Agent.{a.id}</p>
                    <p className="telemetry text-ink-muted">0{i + 1}</p>
                  </div>
                  <h3 className="headline mt-8 text-ink">{a.name}</h3>
                  <ul className="mt-5 space-y-3">
                    {a.tasks.map((t) => (
                      <li key={t} className="flex gap-3 text-[15px] leading-snug text-ink-muted">
                        <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-blue" aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <p className="telemetry flex items-center gap-2 border-t border-ink/10 pt-5 text-ink-muted">
                      Hands off to <ArrowRight className="size-3" strokeWidth={2} aria-hidden /> {a.handsOff}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.12}>
              <article className="on-dark flex h-full flex-col rounded-[var(--radius-lg)] bg-night p-7 text-paper">
                <div className="flex items-center justify-between">
                  <p className="telemetry text-paper/50">Human in the loop</p>
                  <span className="size-2 rounded-full bg-red" aria-hidden />
                </div>
                <h3 className="headline mt-8">Your team</h3>
                <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
                  Controllers, approvers and the CFO stay in charge. They review exceptions, approve what posts, and set
                  the rules the agents follow.
                </p>
                <div className="mt-auto pt-6">
                  <ButtonLink href="#early-access" variant="paper" arrow>
                    Shape the first release
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Chapter>

      <Chapter label="How it works" tone="dark" className="overflow-hidden bg-night py-24 text-paper md:py-32">
        <div className="container-site">
          <Reveal>
            <Eyebrow className="text-paper/60">How it works</Eyebrow>
            <h2 className="display-l mt-4 max-w-3xl">Between your systems and your sign-off.</h2>
            <p className="lead mt-6 max-w-2xl text-paper/65">
              Agentic CFO is designed to sit inside the tools your finance team already uses. Which systems it connects
              to is scoped with you during Discover.
            </p>
          </Reveal>
          <div className="mt-14">
            <WorkflowDiagram />
          </div>
          <Reveal className="mt-10">
            <Console title="Agent.CFO · console" />
          </Reveal>
        </div>
      </Chapter>

      <Chapter label="Principles" className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <Reveal>
            <Eyebrow className="text-ink-muted">Designed for finance controls</Eyebrow>
            <h2 className="display-l mt-4 max-w-3xl text-ink">Agents do the work. People keep the keys.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="border-t-2 border-ink pt-6">
                  <p className="telemetry text-ink-muted">0{i + 1}</p>
                  <h3 className="title mt-4 text-ink">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Chapter>

      <Chapter
        label="Early access"
        tone="dark"
        id="early-access"
        className="overflow-hidden bg-blue-deep py-24 text-paper md:py-32"
      >
        <div
          className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_70%)]"
          style={{ "--dot": "#1a4a62" } as React.CSSProperties}
          aria-hidden
        />
        <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow className="text-paper/60">Early access</Eyebrow>
            <h2 className="display-l mt-4">First in. Fully built.</h2>
            <p className="lead mt-6 max-w-md text-paper/70">
              Agentic CFO is in development. We are working with a small group of finance teams to shape the first
              release around real workflows.
            </p>
            <ul className="mt-10 space-y-5">
              {[
                ["A say in the roadmap", "Tell us which workflow to build for first."],
                ["A pilot on your data", "Prove one agent before anything is rolled out."],
                ["A straight answer", "We will tell you what is ready, and what is not."],
              ].map(([t, b]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1.5 w-5 border-t border-dashed border-paper/50" aria-hidden />
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1 text-[15px] text-paper/65">{b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <Waitlist />
          </Reveal>
        </div>
      </Chapter>

      <Chapter label="Questions" className="bg-paper py-24 md:py-32">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow className="text-ink-muted">Questions</Eyebrow>
            <h2 className="display-l mt-4 text-ink">Plain answers.</h2>
            <p className="mt-6 max-w-sm text-ink-muted">
              Anything else, ask us directly. If Agentic CFO is not the right fit yet, we will say so.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="secondary" arrow>
                Talk to a partner
              </ButtonLink>
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={cfoFaqs} />
          </div>
        </div>
      </Chapter>
    </>
  );
}
