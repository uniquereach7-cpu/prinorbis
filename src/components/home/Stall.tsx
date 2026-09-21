"use client";

import { motion } from "motion/react";
import { Chapter, Eyebrow } from "@/components/ui/Chapter";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/content/site";

const struck = ["The roadmap.", "The pilot.", "The deck."];

export function Stall() {
  return (
    <Chapter label="01 · Discover" className="bg-paper py-24 md:py-36">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow className="text-ink-muted">01 · Discover · The stall</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 className="display-l max-w-4xl text-ink">Most AI never leaves the pilot.</h2>
            </Reveal>

            <motion.div
              className="mt-12 flex flex-wrap items-baseline gap-x-7 gap-y-3 md:mt-16"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            >
              {struck.map((word, i) => (
                <span key={word} className="headline relative text-ink-muted/80">
                  {word}
                  <motion.span
                    aria-hidden
                    className="absolute top-[55%] left-0 h-[3px] w-full origin-left rounded-full bg-red"
                    variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.35 }}
                  />
                </span>
              ))}
              <motion.span
                className="display-l mt-3 flex basis-full items-center gap-4 text-blue md:gap-5"
                variants={{ hidden: { opacity: 0, x: -14 }, shown: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.5, delay: 0.35 + struck.length * 0.35 + 0.1 }}
              >
                <span className="w-10 border-t-2 border-dashed border-blue/50 md:w-16" aria-hidden />
                Production<span className="-ml-3 text-red md:-ml-4">.</span>
              </motion.span>
            </motion.div>

            <Reveal delay={0.1}>
              <p className="lead mt-12 max-w-3xl text-ink-muted">
                Mid-sized businesses are under pressure to act on AI. Large consultancies are priced for companies many
                times their size. Software vendors sell licences, not outcomes. In-house teams rarely have the bench. So
                pilots stall, and decks never become systems. We built Prinorbis to fix the stall.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.08}>
              <div className="border-t border-ink/15 pt-6">
                <p className="telemetry text-ink-muted">{p.code}</p>
                <h3 className="title mt-4 text-ink">{p.title}</h3>
                <p className="mt-3 max-w-sm text-[15.5px] leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
