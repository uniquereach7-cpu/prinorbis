import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { site, stages } from "@/content/site";

const columns = [
  {
    title: "Services",
    links: stages.map((s) => ({ href: `/services#${s.id}`, label: `${s.code} · ${s.name}` })),
  },
  {
    title: "Orbis Agents",
    links: [
      { href: "/agentic-cfo", label: "Agentic CFO" },
      { href: "/agentic-cfo#suite", label: "The CFO suite" },
      { href: "/agentic-cfo#early-access", label: "Early access" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/#industries", label: "Industries" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer data-chapter="You are in orbit" data-tone="dark" className="on-dark relative overflow-hidden bg-night text-paper">
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-40"
        style={{ "--dot": "#1b3444" } as React.CSSProperties}
        aria-hidden
      />
      <div className="container-site relative pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="dark" size="md" />
            <p className="display-l mt-10 text-paper">{site.line}</p>
            <p className="mt-4 max-w-sm text-paper/60">{site.descriptor}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pt-2">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="telemetry text-paper/40">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[15px] text-paper/80 transition-colors hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="telemetry flex items-center gap-2.5 text-paper/50">
            <span className="size-1.5 rounded-full bg-red" aria-hidden />
            You are in orbit · {site.legalName}
          </p>
          <p className="telemetry text-paper/35">© {new Date().getFullYear()} {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
