"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cfoSuite } from "@/content/site";

const systems = ["ERP and general ledger", "Bank and card feeds", "Billing and invoices", "Spreadsheets and email"];
const team = ["Controller reviews exceptions", "Approvers sign off payments", "CFO sees what changed, and why"];

function Column({ code, title, items, highlight = false }: { code: string; title: string; items: string[]; highlight?: boolean }) {
  return (
    <div data-col className={`relative rounded-[var(--radius-lg)] p-7 ${highlight ? "bg-forest ring-1 ring-lime/30" : "border border-bone/12 bg-night-raised"}`}>
      <p className={`telemetry flex items-center gap-2 ${highlight ? "text-lime" : "text-bone/45"}`}>
        {highlight && <span className="size-1.5 rounded-full bg-lime" />}
        {code}
      </p>
      <h3 className="title mt-4">{title}</h3>
      <ul className="mt-6 space-y-2">
        {items.map((it) => (
          <li key={it} className={`rounded-[var(--radius-md)] px-4 py-3 text-[14px] ${highlight ? "bg-night/40" : "bg-bone/[0.04]"}`}>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Flow() {
  return (
    <div className="flex items-center justify-center py-2 lg:px-1 lg:py-0" aria-hidden>
      <svg viewBox="0 0 60 40" className="h-10 w-14 rotate-90 lg:rotate-0">
        <path data-flow d="M2 20 C 20 6, 40 34, 58 20" fill="none" stroke="#8fae96" strokeWidth="1.5" strokeDasharray="3 5" />
        <circle data-flow-dot r="3.5" fill="#c8f03c" cx="-10" cy="-10" />
      </svg>
    </div>
  );
}

/** Where Agentic CFO sits: between the systems you run and the people who sign off. */
export function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q("[data-col]"), { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
        q("[data-flow-dot]").forEach((dot, i) => {
          const path = q("[data-flow]")[i] as unknown as SVGPathElement;
          gsap.to(dot, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1.6, repeat: -1, ease: "sine.inOut", delay: i * 0.8 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div className="grid items-stretch lg:grid-cols-[1fr_64px_1.15fr_64px_1fr]">
        <Column code="In · your systems" title="What you already run" items={systems} />
        <Flow />
        <Column code="Agentic CFO" title="Agents prepare and propose" items={cfoSuite.map((a) => a.name)} highlight />
        <Flow />
        <Column code="Out · your people" title="Your team decides" items={team} />
      </div>
      <p className="mt-7 flex items-center gap-3 text-[14px] text-bone/55">
        <span className="size-1.5 rounded-full bg-lime" aria-hidden />
        Approved work is posted back to your ledger, with a record of who did what.
      </p>
    </div>
  );
}
