"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const steps = [
  { code: "01", title: "Sense", body: "Reads what changed in your ledgers, CRM, inboxes and feeds." },
  { code: "02", title: "Act", body: "Matches, drafts, chases and explains, inside the rules you set." },
  { code: "03", title: "Hand off", body: "Passes finished work to the next agent in the system." },
  { code: "04", title: "Escalate", body: "Asks your people when a call needs judgement, with the context ready." },
];

/** How an agent works: a root line that draws across four nodes as it scrolls by. */
export function AgentLoop() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 1 } });
        tl.fromTo(q("[data-line]"), { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: 1 });
        q("[data-step]").forEach((el, i) => {
          tl.from(el, { opacity: 0.15, y: 20, duration: 0.2 }, i * 0.25);
          tl.from(q(`[data-node="${i}"]`), { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box", duration: 0.12 }, i * 0.25);
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute top-3 left-0 hidden h-[60px] w-full md:block" aria-hidden>
        <path data-line d="M20 30 C 200 5, 360 55, 600 30 S 1000 5, 1180 30" fill="none" stroke="#16432f" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.code} data-step className="md:pt-24">
            <svg viewBox="0 0 40 40" className="size-10 md:absolute md:top-5" style={{ left: `calc(${(i / 4) * 100}% + 0px)` }} aria-hidden>
              <circle data-node={i} cx="20" cy="20" r="11" fill={i === 3 ? "#e0572b" : "#f4efe4"} stroke="#16432f" strokeWidth="2" />
            </svg>
            <p className="telemetry mt-4 text-ink-muted md:mt-0">{s.code}</p>
            <h3 className="headline mt-3 text-ink">{s.title}</h3>
            <p className="mt-3 max-w-xs text-[15.5px] leading-relaxed text-ink-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
