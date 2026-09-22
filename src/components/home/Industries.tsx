"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { TreeRings } from "@/components/living/TreeRings";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { industries } from "@/content/site";

export function Industries() {
  const [selected, setSelected] = useState(0);

  return (
    <section data-chapter="04 · Canopy · Six ecosystems" data-tone="dark" className="on-dark relative overflow-hidden bg-night py-28 text-bone md:py-40">
      <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <TreeRings selected={selected} onSelect={setSelected} className="mx-auto h-auto w-full max-w-[600px]" />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <p className="eyebrow text-bone/60">04 · Canopy · Six ecosystems</p>
          <SplitReveal className="display-l mt-5">
            Every year of growth leaves a <span className="serif-accent text-lime">ring.</span>
          </SplitReveal>
          <p className="lead mt-7 max-w-xl text-bone/65">
            We work across six industries. Each engagement adds a ring of capability the next one builds on.
          </p>

          <ul className="mt-12 border-t border-bone/10">
            {industries.map((ind, i) => {
              const on = i === selected;
              return (
                <li key={ind.slug} className="border-b border-bone/10" onMouseEnter={() => setSelected(i)}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-expanded={on}
                    className={`flex w-full items-center gap-5 py-5 text-left transition-colors duration-300 ${
                      on ? "text-bone" : "text-bone/45 hover:text-bone/80"
                    }`}
                  >
                    <span className="telemetry w-6 text-bone/35">{ind.code}</span>
                    <span className="font-display text-[clamp(1.2rem,2vw,1.65rem)] font-semibold tracking-[-0.02em]">{ind.name}</span>
                    <span className={`ml-auto size-2 rounded-full bg-lime transition-all duration-300 ${on ? "scale-100" : "scale-0"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-11">
                          <p className="text-bone/70">{ind.line}</p>
                          <Link
                            href={`/industries#${ind.slug}`}
                            className="telemetry mt-4 inline-flex items-center gap-1.5 text-lime hover:underline"
                          >
                            Where agents pay back first <ArrowUpRight className="size-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
