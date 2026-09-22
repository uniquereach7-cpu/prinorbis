import { mulberry32, range, round, type Rng } from "@/lib/random";

/*
 * Generative geometry for the living-systems drawings. Everything is seeded,
 * so a drawing renders identically on the server and in the browser.
 */

export type Segment = { d: string; depth: number; width: number; tip: [number, number] };

type BranchOptions = {
  x: number;
  y: number;
  /** Direction in degrees: -90 is up, 90 is down. */
  angle: number;
  length: number;
  levels: number;
  seed: number;
  /** Max deviation of a child from its parent, in degrees. */
  spread?: number;
  /** Length multiplier per level. */
  decay?: number;
  /** Pull every branch back toward this heading (degrees), 0..1. */
  tropism?: { angle: number; strength: number };
  width?: number;
  /** Chance of a third child at each fork. */
  triple?: number;
  /** Curvature of each segment, as a share of its length. */
  bend?: number;
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Recursive branching: roots, canopies and fans, drawn as gently curved segments. */
export function branches(opts: BranchOptions): Segment[] {
  const {
    spread = 34,
    decay = 0.72,
    width = 3,
    triple = 0.25,
    bend = 0.22,
  } = opts;
  const rng = mulberry32(opts.seed);
  const out: Segment[] = [];

  const grow = (x: number, y: number, angle: number, len: number, level: number) => {
    let a = angle;
    if (opts.tropism) a += (opts.tropism.angle - a) * opts.tropism.strength;
    const ex = x + Math.cos(rad(a)) * len;
    const ey = y + Math.sin(rad(a)) * len;
    const side = rng() < 0.5 ? -1 : 1;
    const off = len * bend * range(rng, 0.2, 1) * side;
    const mx = (x + ex) / 2 + Math.cos(rad(a + 90)) * off;
    const my = (y + ey) / 2 + Math.sin(rad(a + 90)) * off;
    out.push({
      d: `M${round(x)} ${round(y)}Q${round(mx)} ${round(my)} ${round(ex)} ${round(ey)}`,
      depth: level,
      width: Math.max(0.6, width * Math.pow(0.68, level)),
      tip: [round(ex), round(ey)],
    });
    if (level >= opts.levels) return;
    const n = rng() < triple ? 3 : 2;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1) - 0.5;
      const childAngle = a + t * spread * 2 + range(rng, -spread, spread) * 0.45;
      grow(ex, ey, childAngle, len * decay * range(rng, 0.8, 1.15), level + 1);
    }
  };

  grow(opts.x, opts.y, opts.angle, opts.length, 0);
  return out.sort((p, q) => p.depth - q.depth);
}

/** Catmull-Rom through closed points, returned as a cubic Bezier path. */
export function closedSpline(pts: [number, number][]) {
  const n = pts.length;
  let d = `M${round(pts[0][0])} ${round(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2[0])} ${round(p2[1])}`;
  }
  return d + "Z";
}

/** An organic cell outline: a circle nudged by seeded noise. */
export function blob(cx: number, cy: number, r: number, seed: number, wobble = 0.16, points = 9) {
  const rng = mulberry32(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (1 + range(rng, -wobble, wobble));
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return closedSpline(pts);
}

/**
 * A living outline at time t (seconds): every point breathes on its own
 * rhythm, and two waves travel around the rim so bulges move like an amoeba
 * reaching out. At t = 0 it is a stable shape, safe to render on the server.
 */
export function amoeba(cx: number, cy: number, r: number, seed: number, t: number, amp = 0.08, points = 12) {
  const rng = mulberry32(seed);
  const pts: [number, number][] = [];
  const waveA = range(rng, 0, Math.PI * 2);
  const waveB = range(rng, 0, Math.PI * 2);
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const base = range(rng, -0.35, 0.35);
    const f = range(rng, 0.6, 1.3);
    const p = range(rng, 0, Math.PI * 2);
    const n =
      base * 0.5 +
      Math.sin(t * f + p) * 0.45 +
      Math.sin(a * 2 - t * 0.9 + waveA) * 0.55 +
      Math.sin(a * 3 + t * 0.6 + waveB) * 0.35;
    const rr = r * (1 + n * amp);
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return closedSpline(pts);
}

/** A tree ring: a circle with low-frequency, seeded irregularity. */
export function ring(cx: number, cy: number, r: number, seed: number, amp = 0.06, points = 40) {
  const rng: Rng = mulberry32(seed);
  const waves = [0, 1, 2].map(() => ({ f: Math.floor(range(rng, 2, 5)), p: range(rng, 0, Math.PI * 2), a: range(rng, 0.3, 1) }));
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const t = (i / points) * Math.PI * 2;
    const n = waves.reduce((s, w) => s + Math.sin(t * w.f + w.p) * w.a, 0) / 2;
    const rr = r * (1 + n * amp);
    pts.push([cx + Math.cos(t) * rr, cy + Math.sin(t) * rr]);
  }
  return closedSpline(pts);
}

/** A point on a ring at a given angle, following the same noise as ring(). */
export function ringPoint(cx: number, cy: number, r: number, seed: number, angleDeg: number, amp = 0.06) {
  const rng: Rng = mulberry32(seed);
  const waves = [0, 1, 2].map(() => ({ f: Math.floor(range(rng, 2, 5)), p: range(rng, 0, Math.PI * 2), a: range(rng, 0.3, 1) }));
  const t = rad(angleDeg);
  const n = waves.reduce((s, w) => s + Math.sin(t * w.f + w.p) * w.a, 0) / 2;
  const rr = r * (1 + n * amp);
  return [round(cx + Math.cos(t) * rr), round(cy + Math.sin(t) * rr)] as const;
}

/** A soft curve between two points, bowed to one side: used for mycelium threads. */
export function thread(x1: number, y1: number, x2: number, y2: number, bow = 0.2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return `M${round(x1)} ${round(y1)}Q${round(mx - dy * bow)} ${round(my + dx * bow)} ${round(x2)} ${round(y2)}`;
}
