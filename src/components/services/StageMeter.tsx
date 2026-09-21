import { stages, type StageId } from "@/content/site";

const heights = [30, 50, 74, 100];

/** Four rising bars, one per stage, with the first point above the current one. */
export function StageMeter({ current, tone }: { current: StageId; tone: "light" | "dark" }) {
  const idx = stages.findIndex((s) => s.id === current);
  const on = tone === "dark" ? "bg-paper" : "bg-ink";
  const off = tone === "dark" ? "bg-paper/15" : "bg-ink/10";

  return (
    <div className="flex h-20 items-end gap-1.5" aria-hidden>
      {heights.map((h, i) => (
        <div key={i} className="relative w-7" style={{ height: `${h}%` }}>
          {i === idx && <span className="absolute -top-4 left-1/2 size-2 -translate-x-1/2 rounded-full bg-red" />}
          <div className={`size-full rounded-t-[5px] ${i === idx ? on : off}`} />
        </div>
      ))}
    </div>
  );
}
