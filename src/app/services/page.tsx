import type { Metadata } from "next";
import Link from "next/link";
import { Chapter, Eyebrow } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StageMeter } from "@/components/services/StageMeter";
import { stages } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover, Prove, Launch and Orbit: AI opportunity assessments, process reimagination, data strategy, implementation and value realisation for mid-sized businesses.",
};

// The ground deepens as the visitor moves along the path.
const grounds = [
  { bg: "bg-paper", tone: "light" as const },
  { bg: "bg-mist", tone: "light" as const },
  { bg: "bg-blue-deep", tone: "dark" as const },
  { bg: "bg-night", tone: "dark" as const },
];

export default function ServicesPage() {
  return (
    <>
      <Chapter label="Services · The path" className="overflow-hidden bg-paper pt-[72px]">
        <div
          className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
          aria-hidden
        />
        <div className="container-site relative pt-16 pb-16 md:pt-24 md:pb-24">
          <p className="eyebrow rise text-ink-muted">Services · The path</p>
          <h1 className="display-xl rise mt-4 max-w-5xl text-ink [animation-delay:100ms]">
            Strategy that ships<span className="text-red">.</span>
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <p className="lead rise max-w-2xl text-ink-muted lg:col-span-7 [animation-delay:180ms]">
              Four stages, each with a clear output and a clear exit. Start at whichever stage fits where you are
              today, and stop whenever the evidence says so. Every stage is run by senior people who have delivered
              this work before.
            </p>
            <nav aria-label="Stages" className="rise lg:col-span-5 [animation-delay:240ms]">
              <ol className="grid grid-cols-2 gap-2">
                {stages.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`#${s.id}`}
                      className="group flex items-center justify-between rounded-[var(--radius-md)] border border-ink/15 bg-paper-raised px-4 py-3.5 transition-colors hover:border-ink/40"
                    >
                      <span>
                        <span className="telemetry block text-ink-muted">{s.code}</span>
                        <span className="mt-1 block font-display text-[15px] font-semibold tracking-tight">{s.name}</span>
                      </span>
                      <span className="size-1.5 rounded-full bg-ink/20 transition-colors group-hover:bg-red" />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </Chapter>

      {stages.map((s, i) => {
        const g = grounds[i];
        const dark = g.tone === "dark";
        return (
          <Chapter
            key={s.id}
            id={s.id}
            label={`${s.code} · ${s.name}`}
            tone={g.tone}
            className={`${g.bg} ${dark ? "text-paper" : "text-ink"} py-20 md:py-28`}
          >
            <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <StageMeter current={s.id} tone={g.tone} />
                  <Eyebrow className={`mt-8 ${dark ? "text-paper/60" : "text-ink-muted"}`}>
                    {s.code} · {s.formal}
                  </Eyebrow>
                  <h2 className="display-l mt-4">{s.name}</h2>
                  <p className={`headline mt-5 ${dark ? "text-steel" : "text-blue"}`}>{s.headline}</p>
                  <p className={`mt-5 max-w-md leading-relaxed ${dark ? "text-paper/70" : "text-ink-muted"}`}>
                    {s.summary}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {s.offerings.map((o, j) => (
                    <Reveal
                      as="li"
                      key={o.name}
                      delay={(j % 2) * 0.06}
                      className={`flex flex-col rounded-[var(--radius-lg)] p-6 ${
                        dark ? "border border-paper/12 bg-paper/[0.04]" : "border border-ink/10 bg-paper-raised"
                      }`}
                    >
                      <p className={`telemetry ${dark ? "text-paper/45" : "text-ink-muted"}`}>
                        {s.code}.{j + 1}
                      </p>
                      <h3 className="title mt-5">{o.name}</h3>
                      <p className={`mt-2.5 text-[15px] leading-relaxed ${dark ? "text-paper/65" : "text-ink-muted"}`}>
                        {o.detail}
                      </p>
                    </Reveal>
                  ))}
                </ul>

                <Reveal className="mt-3">
                  <div
                    className={`grid gap-px overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-2 ${
                      dark ? "bg-paper/12" : "bg-ink/10"
                    }`}
                  >
                    <div className={`p-6 ${dark ? "bg-night-raised" : "bg-paper-raised"}`}>
                      <p className={`telemetry ${dark ? "text-paper/45" : "text-ink-muted"}`}>You leave with</p>
                      <p className="mt-3 leading-snug font-medium">{s.leaveWith}</p>
                    </div>
                    <div className={`p-6 ${dark ? "bg-night-raised" : "bg-paper-raised"}`}>
                      <p className={`telemetry flex items-center gap-2 ${dark ? "text-paper/45" : "text-ink-muted"}`}>
                        <span className="size-1.5 rounded-full bg-red" aria-hidden />
                        {s.id === "orbit" ? "Where it goes" : "You move on when"}
                      </p>
                      <p className="mt-3 leading-snug font-medium">{s.exit}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Chapter>
        );
      })}

      <Chapter label="Start here" className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col gap-10 rounded-[var(--radius-xl)] border border-ink/10 bg-paper-raised p-8 md:flex-row md:items-end md:justify-between md:p-14">
              <div>
                <Eyebrow point className="text-ink-muted">
                  Not sure where to start?
                </Eyebrow>
                <h2 className="display-l mt-4 max-w-2xl text-ink">Start at Discover.</h2>
                <p className="lead mt-5 max-w-xl text-ink-muted">
                  An AI opportunity assessment is the lightest way in. You leave with a ranked set of use cases and a
                  business case for the first one, whether or not you go further with us.
                </p>
              </div>
              <ButtonLink href="/contact" arrow className="shrink-0">
                Book an assessment
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Chapter>
    </>
  );
}
