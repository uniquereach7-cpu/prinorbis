import type { Tone } from "@/components/layout/ChapterProvider";

type ChapterProps = {
  /** Shown in the header HUD, e.g. "02 · Root". */
  label: string;
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

/** A page section that registers itself with the header HUD and growth rail. */
export function Chapter({ label, tone = "light", id, className = "", children }: ChapterProps) {
  return (
    <section id={id} data-chapter={label} data-tone={tone} className={`relative ${tone === "dark" ? "on-dark" : ""} ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className = "", point }: { children: React.ReactNode; className?: string; point?: "lime" | "flare" }) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 ${className}`}>
      {point && <span className={`size-1.5 rounded-full ${point === "lime" ? "bg-lime" : "bg-flare"}`} aria-hidden />}
      {children}
    </p>
  );
}

export function StatusPill({ children, tone = "light", live = false }: { children: React.ReactNode; tone?: Tone; live?: boolean }) {
  const dot = tone === "dark" ? "bg-lime" : "bg-flare";
  return (
    <span
      className={`telemetry inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        tone === "dark" ? "border-bone/20 text-bone/80" : "border-ink/15 bg-bone-raised text-ink-muted"
      }`}
    >
      <span className="relative flex size-1.5">
        {live && <span className={`pulse-ring absolute inset-0 rounded-full ${dot}`} />}
        <span className={`relative size-1.5 rounded-full ${dot}`} />
      </span>
      {children}
    </span>
  );
}
