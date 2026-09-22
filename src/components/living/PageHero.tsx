import { GrowthCanvas, type Layout } from "./GrowthCanvas";

type PageHeroProps = {
  chapter: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  children?: React.ReactNode;
  /** Optional living network behind the copy. */
  growth?: { desktop: Layout; mobile: Layout; rngSeed?: number };
  visual?: React.ReactNode;
  tone?: "night" | "forest";
};

/** The opening chapter for inner pages: dark ground, big headline, a living drawing. */
export function PageHero({ chapter, eyebrow, title, lead, children, growth, visual, tone = "night" }: PageHeroProps) {
  return (
    <section
      data-chapter={chapter}
      data-tone="dark"
      className={`on-dark relative overflow-hidden text-bone ${tone === "night" ? "bg-night" : "bg-forest"}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(30,92,65,0.6),transparent_60%)]" aria-hidden />
      {growth && (
        <div className="absolute inset-0 opacity-90">
          <GrowthCanvas desktop={growth.desktop} mobile={growth.mobile} labels={false} seedGlow={false} rngSeed={growth.rngSeed} />
        </div>
      )}
      <div className="container-site relative grid min-h-[88svh] items-center gap-12 pt-36 pb-20 lg:grid-cols-12 lg:pt-32">
        <div className={visual ? "lg:col-span-6" : "lg:col-span-8"}>
          <p className="eyebrow rise flex items-center gap-2.5 text-bone/55 [animation-delay:1s]">
            <span className="size-1.5 rounded-full bg-lime" />
            {eyebrow}
          </p>
          <h1 className="display-xl rise mt-6 [animation-delay:1.05s]">{title}</h1>
          <div className="lead rise mt-8 max-w-xl text-bone/70 [animation-delay:1.2s]">{lead}</div>
          {children && <div className="rise mt-10 [animation-delay:1.3s]">{children}</div>}
        </div>
        {visual && <div className="rise relative lg:col-span-6 [animation-delay:1.15s]">{visual}</div>}
      </div>
    </section>
  );
}
