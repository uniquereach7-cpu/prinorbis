"use client";

import { useId } from "react";
import { motion, type Transition } from "motion/react";

type DrawnPathProps = {
  d: string;
  stroke: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  dash?: string;
  transition?: Transition;
  /** Animate on mount instead of following the parent's hidden/shown variants. */
  auto?: boolean;
};

/*
 * A dashed trajectory that draws on from start to end. Animating pathLength
 * directly would replace the dash pattern, so the dashes are revealed
 * through a solid mask stroke instead.
 */
export function DrawnPath({
  d,
  stroke,
  strokeWidth = 2,
  strokeOpacity = 1,
  dash = "5 8",
  transition,
  auto = false,
}: DrawnPathProps) {
  const id = useId();
  const draw = auto
    ? { initial: { pathLength: 0 }, animate: { pathLength: 1 } }
    : { variants: { hidden: { pathLength: 0 }, shown: { pathLength: 1 } } };

  return (
    <>
      <mask id={`draw-${id}`} maskUnits="userSpaceOnUse">
        <motion.path
          d={d}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth + 6}
          strokeLinecap="round"
          transition={transition}
          {...draw}
        />
      </mask>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
        strokeDasharray={dash}
        strokeLinecap="round"
        mask={`url(#draw-${id})`}
      />
    </>
  );
}
