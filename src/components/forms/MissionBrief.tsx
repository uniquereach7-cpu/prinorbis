"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { briefOptions, stages } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { branches } from "@/components/living/geometry";
import { Field, Select, inputClass, submitLead, type SubmitState } from "./fields";

const toOptions = (list: string[]) => list.map((v) => ({ value: v, label: v }));
const sprout = branches({ x: 60, y: 118, angle: -90, length: 34, levels: 5, seed: 9, spread: 32, decay: 0.74, width: 3, bend: 0.25 });

/*
 * "Plant your first point": three questions suggest the stage to start at,
 * then a short contact step books the conversation.
 */
export function MissionBrief() {
  const [fn, setFn] = useState(briefOptions.functions[0]);
  const [industry, setIndustry] = useState(briefOptions.industries[0]);
  const [maturity, setMaturity] = useState(briefOptions.maturity[0].value);
  const [step, setStep] = useState<"questions" | "details">("questions");
  const [state, setState] = useState<SubmitState>("idle");

  const stageId = briefOptions.maturity.find((m) => m.value === maturity)?.stage ?? "discover";
  const stage = stages.find((s) => s.id === stageId)!;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      await submitLead({ type: "mission-brief", function: fn, industry, maturity, suggestedStage: stage.name, ...data });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-ink/10 bg-bone-raised p-6 shadow-[0_40px_80px_-50px_rgba(11,34,25,0.45)] sm:p-10">
      <div className="mb-8 flex items-center justify-between">
        <p className="telemetry text-ink-muted">Mission brief</p>
        <p className="telemetry text-ink-muted">Step {state === "sent" ? 3 : step === "questions" ? 1 : 2} / 3</p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {state === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="py-4 text-center" role="status">
            <svg viewBox="0 0 120 130" className="mx-auto h-32" aria-hidden>
              <line x1="10" x2="110" y1="118" y2="118" stroke="#16432f" strokeOpacity="0.3" strokeDasharray="3 5" />
              {sprout.map((s, i) => (
                <motion.path
                  key={i}
                  d={s.d}
                  fill="none"
                  stroke={s.depth < 2 ? "#16432f" : "#8fae96"}
                  strokeWidth={s.width}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + s.depth * 0.18 }}
                />
              ))}
              <motion.circle cx="60" cy="118" r="5" fill="#e0572b" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} />
            </svg>
            <h3 className="headline mt-6 text-ink">Your first point is planted.</h3>
            <p className="mx-auto mt-3 max-w-sm text-ink-muted">
              A partner will be in touch to book the conversation. We will come ready to talk about {stage.name}.
            </p>
          </motion.div>
        ) : step === "questions" ? (
          <motion.div key="questions" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.3, ease }} className="space-y-5">
            <Field label="The function you lead" htmlFor="brief-function">
              <Select id="brief-function" name="function" value={fn} onChange={setFn} options={toOptions(briefOptions.functions)} />
            </Field>
            <Field label="Your industry" htmlFor="brief-industry">
              <Select id="brief-industry" name="industry" value={industry} onChange={setIndustry} options={toOptions(briefOptions.industries)} />
            </Field>
            <Field label="Where you are today" htmlFor="brief-maturity">
              <Select
                id="brief-maturity"
                name="maturity"
                value={maturity}
                onChange={setMaturity}
                options={briefOptions.maturity.map((m) => ({ value: m.value, label: m.label }))}
              />
            </Field>
            <button type="button" onClick={() => setStep("details")} className={`${buttonClass()} mt-2 w-full`}>
              <span className="size-2 rounded-full bg-flare" aria-hidden />
              Find my starting stage
            </button>
          </motion.div>
        ) : (
          <motion.form key="details" onSubmit={onSubmit} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.3, ease }}>
            <div className="on-dark rounded-[var(--radius-lg)] bg-night p-6 text-bone">
              <p className="telemetry text-bone/50">Suggested starting stage</p>
              <p className="headline mt-3">
                {stage.code} · {stage.name} <span className="serif-accent text-lime">({stage.growth.toLowerCase()})</span>
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-bone/70">
                {stage.headline} {stage.leaveWith}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Your name" htmlFor="brief-name">
                <input id="brief-name" name="name" required autoComplete="name" className={inputClass} />
              </Field>
              <Field label="Work email" htmlFor="brief-email">
                <input id="brief-email" name="email" type="email" required autoComplete="email" className={inputClass} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Company" htmlFor="brief-company">
                  <input id="brief-company" name="company" required autoComplete="organization" className={inputClass} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Anything we should know (optional)" htmlFor="brief-note">
                  <textarea id="brief-note" name="note" rows={3} className={`${inputClass} resize-none`} />
                </Field>
              </div>
            </div>

            {state === "error" && (
              <p className="mt-4 text-[14px] text-flare-ink" role="alert">
                Something went wrong sending your brief. Please try again.
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button type="button" onClick={() => setStep("questions")} className={buttonClass("outline")}>
                <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden />
                Back
              </button>
              <button type="submit" disabled={state === "sending"} className={`${buttonClass()} flex-1 disabled:opacity-60`}>
                {state === "sending" ? "Planting…" : "Book the conversation"}
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
