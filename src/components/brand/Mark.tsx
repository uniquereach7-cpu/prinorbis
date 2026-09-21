import { useId } from "react";

/*
 * The Prinorbis hex mark, rebuilt from the supplied logo as vector geometry.
 * Pointy-top hexagon ring (outer R 100, inner R 59) split into five segments,
 * an inner hexagon, and the red "first point" set into the right edge.
 */

const BLUE = "#045475";
const BLUE_ON_DARK = "#1f7aa3";
const RED = "#F11123";

const segments = {
  topLeft: "-86.6,-50 0,-100 0,-59 -51.1,-29.5",
  topRight: "0,-100 86.6,-50 51.1,-29.5 0,-59",
  right: "86.6,-50 86.6,50 51.1,29.5 51.1,-29.5",
  bottomRight: "86.6,50 5.4,96.9 5.4,55.9 51.1,29.5",
  left: "-86.6,-50 -51.1,-29.5 -51.1,27.5 -86.6,44.5",
  core: "0,-27.4 23.7,-13.7 23.7,13.7 0,27.4 -23.7,13.7 -23.7,-13.7",
};

type MarkProps = {
  className?: string;
  tone?: "light" | "dark";
  /** Pulse the first point once in a while. */
  live?: boolean;
  title?: string;
};

export function Mark({ className, tone = "light", live = false, title }: MarkProps) {
  const id = useId();
  const maskId = `gap-${id}`;
  const blue = tone === "dark" ? BLUE_ON_DARK : BLUE;

  return (
    <svg
      viewBox="-90 -103 180 204"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-90" y="-103" width="180" height="204">
          <rect x="-90" y="-103" width="180" height="204" fill="white" />
          <circle cx="67.6" cy="0" r="25.3" fill="black" />
        </mask>
      </defs>
      <polygon points={segments.topLeft} fill={blue} />
      <polygon points={segments.topRight} fill={RED} />
      <polygon points={segments.right} fill={blue} mask={`url(#${maskId})`} />
      <polygon points={segments.bottomRight} fill={RED} />
      <polygon points={segments.left} fill={RED} />
      <polygon points={segments.core} fill={blue} />
      {live && <circle cx="67.6" cy="0" r="18.4" fill={RED} className="pulse-ring" />}
      <circle cx="67.6" cy="0" r="18.4" fill={RED} />
    </svg>
  );
}
