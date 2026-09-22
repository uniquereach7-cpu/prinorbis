import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { FooterCanopy } from "./FooterCanopy";
import { site, stages } from "@/content/site";

const columns = [
  {
    title: "Services",
    links: stages.map((s) => ({ href: `/services#${s.id}`, label: `${s.growth} · ${s.name}` })),
  },
  {
    title: "Orbis Agents",
    links: [
      { href: "/agents", label: "All agents" },
      { href: "/agentic-cfo", label: "Agentic CFO" },
      { href: "/agentic-cfo#early-access", label: "Early access" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/industries", label: "Industries" },
      { href: "/insights", label: "Insights" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer data-chapter="Canopy reached" data-tone="dark" className="on-dark relative overflow-hidden bg-night text-bone">
      <div className="container-site relative pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow flex items-center gap-2.5 text-bone/50">
              <span className="size-1.5 rounded-full bg-lime" /> Canopy reached
            </p>
            <p className="display-l mt-5 max-w-xl">
              Ready to plant your <span className="serif-accent text-lime">first point</span>?
            </p>
            <div className="mt-9">
              <ButtonLink href="/contact" variant="lime" arrow>
                Start at Discover
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pt-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="telemetry text-bone/40">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-center gap-1 text-[15px] text-bone/75 transition-colors hover:text-lime">
                        {l.label}
                        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-20 h-[260px] md:mt-24 md:h-[380px]">
        <FooterCanopy />
        <div className="container-site relative flex h-full items-end pb-6">
          <span className="text-[clamp(4rem,17vw,15.5rem)] leading-[0.8]">
            <Wordmark tone="dark" />
          </span>
        </div>
      </div>

      <div className="container-site relative flex flex-col gap-3 border-t border-bone/10 py-7 md:flex-row md:items-center md:justify-between">
        <p className="telemetry text-bone/45">Canopy reached · you are in orbit · {site.name}</p>
        <p className="telemetry text-bone/30">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </div>
    </footer>
  );
}
