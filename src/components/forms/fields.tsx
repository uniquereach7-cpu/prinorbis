import { ChevronDown } from "lucide-react";

export const inputClass =
  "w-full rounded-[var(--radius-md)] border border-line-strong/60 bg-paper-raised px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 transition-colors hover:border-line-strong focus:border-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="telemetry mb-2 block text-ink-muted">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[13px] text-ink-muted">{hint}</p>}
    </div>
  );
}

export function Select({
  id,
  name,
  value,
  onChange,
  options,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-10`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted"
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

export type SubmitState = "idle" | "sending" | "sent" | "error";

export async function submitLead(payload: Record<string, unknown>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
}
