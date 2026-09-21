import { Reveal } from "@/components/ui/Reveal";
import { cfoSuite } from "@/content/site";

const systems = ["ERP and general ledger", "Bank and card feeds", "Billing and invoices", "Spreadsheets and email"];
const team = ["Controller reviews exceptions", "Approvers sign off payments", "CFO sees what changed, and why"];

function Connector() {
  return (
    <div className="flex items-center justify-center py-2 lg:px-2 lg:py-0" aria-hidden>
      <span className="h-10 border-l-2 border-dashed border-steel/40 lg:hidden" />
      <span className="hidden w-full border-t-2 border-dashed border-steel/40 lg:block" />
    </div>
  );
}

function Column({
  code,
  title,
  items,
  highlight = false,
}: {
  code: string;
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] p-6 ${
        highlight ? "bg-blue text-paper" : "border border-paper/15 bg-night-raised text-paper"
      }`}
    >
      <p className={`telemetry ${highlight ? "text-paper/70" : "text-paper/50"}`}>{code}</p>
      <h3 className="title mt-3">{title}</h3>
      <ul className="mt-5 space-y-2">
        {items.map((it) => (
          <li
            key={it}
            className={`rounded-[var(--radius-md)] px-3.5 py-2.5 text-[14px] ${
              highlight ? "bg-paper/10" : "bg-paper/[0.04]"
            }`}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Where Agentic CFO sits: between the systems you run and the people who sign off. */
export function WorkflowDiagram() {
  return (
    <Reveal>
      <div className="grid items-stretch lg:grid-cols-[1fr_48px_1.15fr_48px_1fr]">
        <Column code="In · your systems" title="What you already run" items={systems} />
        <Connector />
        <Column code="Agentic CFO" title="Agents prepare and propose" items={cfoSuite.map((a) => a.name)} highlight />
        <Connector />
        <Column code="Out · your people" title="Your team decides" items={team} />
      </div>
      <p className="mt-6 flex items-center gap-3 text-[14px] text-paper/55">
        <span className="size-1.5 rounded-full bg-red" aria-hidden />
        Approved work is posted back to your ledger, with a record of who did what.
      </p>
    </Reveal>
  );
}
