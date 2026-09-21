"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-ink/15">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <li key={item.q} className="border-b border-ink/15">
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="title text-ink">{item.q}</span>
              <Plus
                className={`size-5 shrink-0 text-ink-muted transition-transform duration-300 ${on ? "rotate-45" : ""}`}
                strokeWidth={1.5}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 leading-relaxed text-ink-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
