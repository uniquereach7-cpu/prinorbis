"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { cfoSuite } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { Field, inputClass, submitLead, type SubmitState } from "@/components/forms/fields";

export function Waitlist() {
  const [state, setState] = useState<SubmitState>("idle");
  const [pains, setPains] = useState<string[]>([]);

  const toggle = (name: string) => setPains((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      await submitLead({ type: "agentic-cfo-early-access", workflows: pains, ...data });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="rounded-[var(--radius-xl)] bg-bone p-6 text-ink sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center" role="status">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest text-lime">
              <Check className="size-6" strokeWidth={2} />
            </span>
            <h3 className="headline mt-6">You are on the list.</h3>
            <p className="mx-auto mt-3 max-w-sm text-ink-muted">
              We will be in touch about early access, starting with a short conversation about your finance workflows.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }}>
            <div className="mb-8 flex items-center justify-between">
              <p className="telemetry text-ink-muted">Early access · Agentic CFO</p>
              <span className="telemetry flex items-center gap-2 text-ink-muted">
                <span className="size-1.5 rounded-full bg-flare" aria-hidden />
                Coming soon
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" htmlFor="wl-name">
                <input id="wl-name" name="name" required autoComplete="name" className={inputClass} />
              </Field>
              <Field label="Work email" htmlFor="wl-email">
                <input id="wl-email" name="email" type="email" required autoComplete="email" className={inputClass} />
              </Field>
              <Field label="Company" htmlFor="wl-company">
                <input id="wl-company" name="company" required autoComplete="organization" className={inputClass} />
              </Field>
              <Field label="Your role" htmlFor="wl-role">
                <input id="wl-role" name="role" placeholder="CFO, controller…" autoComplete="organization-title" className={inputClass} />
              </Field>
            </div>

            <fieldset className="mt-7">
              <legend className="telemetry mb-3 text-ink-muted">Which workflows hurt most?</legend>
              <div className="flex flex-wrap gap-2">
                {cfoSuite.map((a) => {
                  const on = pains.includes(a.short);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(a.short)}
                      className={`rounded-full border px-4 py-2 text-[14px] font-medium transition-colors ${
                        on ? "border-forest bg-forest text-bone" : "border-ink/20 text-ink hover:border-ink/50"
                      }`}
                    >
                      {a.short}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {state === "error" && (
              <p className="mt-4 text-[14px] text-flare-ink" role="alert">
                Something went wrong. Please try again.
              </p>
            )}

            <button type="submit" disabled={state === "sending"} className={`${buttonClass()} mt-8 w-full disabled:opacity-60`}>
              <span className="size-2 rounded-full bg-lime" aria-hidden />
              {state === "sending" ? "Joining…" : "Join the early access list"}
            </button>
            <p className="mt-3 text-center text-[13px] text-ink-muted">No commitment to buy. We only use your details to talk about early access.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
