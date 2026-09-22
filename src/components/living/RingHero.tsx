"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { TreeRings } from "./TreeRings";
import { industries } from "@/content/site";

/** Rings for the industries hero: tap a node to glide to that industry. */
export function RingHero() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const lenis = useLenis();

  return (
    <div className="relative">
      <TreeRings
        selected={selected}
        onSelect={(i) => {
          setSelected(i);
          const target = `#${industries[i].slug}`;
          if (lenis) lenis.scrollTo(target, { offset: -64 });
          else document.querySelector(target)?.scrollIntoView();
        }}
        className="mx-auto h-auto w-full max-w-[620px]"
      />
      <p className="telemetry absolute bottom-0 left-0 text-bone/40">Tap a ring to jump to it</p>
    </div>
  );
}
