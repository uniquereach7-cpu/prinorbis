import { Cell } from "@/components/living/Cell";
import { Mycelium } from "@/components/living/Mycelium";
import { Console } from "@/components/living/Console";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { crossAgentLines, orbisAgents } from "@/content/site";

export function AgentCellRow() {
  return (
    <div className="relative">
      <Mycelium className="pointer-events-none absolute inset-0 hidden size-full lg:block" />
      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
        {orbisAgents.map((a, i) => (
          <Cell key={a.id} seed={11 + i * 17} live={i === 0} className="mx-auto w-full max-w-[420px]">
            <p className="telemetry text-bone/55">{a.id}</p>
            <h3 className="mt-3 font-display text-[clamp(1.35rem,2vw,1.8rem)] leading-tight font-semibold tracking-[-0.02em]">{a.name}</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-bone/70 md:text-[14px]">{a.body}</p>
            <p className={`telemetry mt-4 ${i === 0 ? "text-lime" : "text-bone/45"}`}>{a.status}</p>
          </Cell>
        ))}
      </div>
    </div>
  );
}

export function AgentsSection() {
  return (
    <section data-chapter="03 · Network · Orbis Agents" data-tone="dark" className="on-dark relative overflow-hidden bg-forest py-28 text-bone md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(30,92,65,0.8),transparent_65%)]" aria-hidden />
      <div className="container-site relative">
        <p className="eyebrow text-bone/60">03 · Network · Orbis Agents</p>
        <SplitReveal className="display-l mt-5 max-w-4xl">
          Agents that <span className="serif-accent text-lime">grow</span> with you.
        </SplitReveal>
        <Reveal>
          <p className="lead mt-7 max-w-2xl text-bone/70">
            Each agent is a living cell of the system: it does real work, hands off to the others, and escalates to your
            people when judgement is needed.
          </p>
        </Reveal>

        <div className="mt-16 md:mt-20">
          <AgentCellRow />
        </div>

        <Reveal className="mt-14">
          <Console lines={crossAgentLines} />
        </Reveal>

        <Reveal className="mt-12 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/agents" variant="bone" arrow>
            Meet the agents
          </ButtonLink>
          <ButtonLink href="/agentic-cfo" variant="outline-dark">
            Explore Agentic CFO
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
