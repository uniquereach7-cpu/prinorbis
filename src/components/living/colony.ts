import { gaussian, mulberry32, range } from "@/lib/random";

/*
 * Space colonization (Runions et al., "Modeling Trees with a Space
 * Colonization Algorithm", 2007). Attractor points pull the nearest branch
 * tips toward them; tips extend a fixed step per iteration and attractors
 * are consumed once reached. Dense attractor clouds become the tangled
 * clusters where agents sit.
 */

export type Cloud = { x: number; y: number; rx: number; ry: number; count: number };

export type ColonyConfig = {
  width: number;
  height: number;
  seed: { x: number; y: number };
  clouds: Cloud[];
  scatter: { x0: number; x1: number; y0: number; y1: number; count: number };
  step?: number;
  influence?: number;
  kill?: number;
  maxNodes?: number;
  rngSeed?: number;
  /** Share of the seed-to-cloud distance covered by an opening shoot toward each cloud. */
  shootReach?: number;
};

export class Colony {
  xs: Float32Array;
  ys: Float32Array;
  parent: Int32Array;
  hops: Uint16Array;
  count = 0;
  done = false;

  private ax: Float32Array;
  private ay: Float32Array;
  private alive: Uint8Array;
  private aliveCount: number;
  private accX: Float32Array;
  private accY: Float32Array;
  private accN: Uint16Array;
  private grid = new Map<number, number[]>();
  private aGrid = new Map<number, number[]>();
  private cell: number;
  private stepLen: number;
  private influence: number;
  private kill: number;
  private max: number;
  private stalls = 0;
  private rng: () => number;
  /** Opening shoots: the seed fans out toward every cloud before colonization begins. */
  private shoots: { tip: number; tx: number; ty: number; left: number; bend: number }[] = [];

  constructor(cfg: ColonyConfig) {
    this.rng = mulberry32(cfg.rngSeed ?? 7);
    this.stepLen = cfg.step ?? 6;
    this.influence = cfg.influence ?? 80;
    this.kill = cfg.kill ?? 9;
    this.max = cfg.maxNodes ?? 7000;
    this.cell = this.influence;

    this.xs = new Float32Array(this.max);
    this.ys = new Float32Array(this.max);
    this.parent = new Int32Array(this.max);
    this.hops = new Uint16Array(this.max);
    this.accX = new Float32Array(this.max);
    this.accY = new Float32Array(this.max);
    this.accN = new Uint16Array(this.max);

    const pts: number[] = [];
    for (const c of cfg.clouds) {
      for (let i = 0; i < c.count; i++) {
        pts.push(c.x + gaussian(this.rng) * c.rx, c.y + gaussian(this.rng) * c.ry);
      }
    }
    const s = cfg.scatter;
    for (let i = 0; i < s.count; i++) pts.push(range(this.rng, s.x0, s.x1), range(this.rng, s.y0, s.y1));

    const n = pts.length / 2;
    this.ax = new Float32Array(n);
    this.ay = new Float32Array(n);
    this.alive = new Uint8Array(n);
    let k = 0;
    for (let i = 0; i < n; i++) {
      const x = pts[i * 2];
      const y = pts[i * 2 + 1];
      if (x < 2 || y < 2 || x > cfg.width - 2 || y > cfg.height - 2) continue;
      this.ax[k] = x;
      this.ay[k] = y;
      this.alive[k] = 1;
      this.bucket(this.aGrid, x, y).push(k);
      k++;
    }
    this.aliveCount = k;

    const seed = this.add(cfg.seed.x, cfg.seed.y, -1);
    const reach = cfg.shootReach ?? 0.45;
    for (const c of cfg.clouds) {
      const dist = Math.hypot(c.x - cfg.seed.x, c.y - cfg.seed.y);
      this.shoots.push({
        tip: seed,
        tx: c.x,
        ty: c.y,
        left: Math.floor((dist * reach) / this.stepLen),
        bend: (this.rng() - 0.5) * 1.1,
      });
    }
  }

  /** Extend each opening shoot one step, curving gently toward its cloud. */
  private growShoots(): boolean {
    let grew = false;
    for (const s of this.shoots) {
      if (s.left <= 0 || this.count >= this.max) continue;
      const x = this.xs[s.tip];
      const y = this.ys[s.tip];
      const a = Math.atan2(s.ty - y, s.tx - x) + s.bend * (s.left > 8 ? 1 : 0) * 0.5;
      const w = (this.rng() - 0.5) * 0.35;
      s.tip = this.add(x + Math.cos(a + w) * this.stepLen, y + Math.sin(a + w) * this.stepLen, s.tip);
      s.bend *= 0.94;
      s.left--;
      grew = true;
    }
    return grew;
  }

  private key(cx: number, cy: number) {
    return cx * 4096 + cy;
  }

  private bucket(grid: Map<number, number[]>, x: number, y: number) {
    const k = this.key(Math.floor(x / this.cell), Math.floor(y / this.cell));
    let b = grid.get(k);
    if (!b) {
      b = [];
      grid.set(k, b);
    }
    return b;
  }

  private add(x: number, y: number, parent: number) {
    const i = this.count++;
    this.xs[i] = x;
    this.ys[i] = y;
    this.parent[i] = parent;
    this.hops[i] = parent < 0 ? 0 : this.hops[parent] + 1;
    this.bucket(this.grid, x, y).push(i);
    return i;
  }

  private nearest(x: number, y: number, maxDist: number) {
    const cx = Math.floor(x / this.cell);
    const cy = Math.floor(y / this.cell);
    let best = -1;
    let bestD = maxDist * maxDist;
    for (let gx = cx - 1; gx <= cx + 1; gx++) {
      for (let gy = cy - 1; gy <= cy + 1; gy++) {
        const b = this.grid.get(this.key(gx, gy));
        if (!b) continue;
        for (const i of b) {
          const dx = this.xs[i] - x;
          const dy = this.ys[i] - y;
          const d = dx * dx + dy * dy;
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
      }
    }
    return best;
  }

  /** One growth iteration. Returns the index range of the nodes it added. */
  step(): [number, number] {
    const start = this.count;
    if (this.done) return [start, start];
    if (this.growShoots()) return [start, this.count];

    this.accN.fill(0, 0, this.count);
    this.accX.fill(0, 0, this.count);
    this.accY.fill(0, 0, this.count);

    let influenced = 0;
    for (let a = 0; a < this.ax.length; a++) {
      if (!this.alive[a]) continue;
      const n = this.nearest(this.ax[a], this.ay[a], this.influence);
      if (n < 0) continue;
      const dx = this.ax[a] - this.xs[n];
      const dy = this.ay[a] - this.ys[n];
      const len = Math.hypot(dx, dy) || 1;
      this.accX[n] += dx / len;
      this.accY[n] += dy / len;
      this.accN[n]++;
      influenced++;
    }

    // Nothing in reach yet: let a sample of attractors pull their nearest node from afar.
    if (influenced === 0) {
      for (let s = 0; s < 60; s++) {
        const a = Math.floor(this.rng() * this.ax.length);
        if (!this.alive[a]) continue;
        let best = -1;
        let bestD = Infinity;
        for (let i = 0; i < this.count; i++) {
          const d = (this.xs[i] - this.ax[a]) ** 2 + (this.ys[i] - this.ay[a]) ** 2;
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best < 0) continue;
        const len = Math.sqrt(bestD) || 1;
        this.accX[best] += (this.ax[a] - this.xs[best]) / len;
        this.accY[best] += (this.ay[a] - this.ys[best]) / len;
        this.accN[best]++;
      }
    }

    const end = this.count;
    for (let i = 0; i < end && this.count < this.max; i++) {
      if (!this.accN[i]) continue;
      let dx = this.accX[i] + (this.rng() - 0.5) * 0.35;
      let dy = this.accY[i] + (this.rng() - 0.5) * 0.35;
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;
      const nx = this.xs[i] + dx * this.stepLen;
      const ny = this.ys[i] + dy * this.stepLen;
      // Skip if another node already occupies this spot (stops oscillation).
      const near = this.nearest(nx, ny, this.stepLen * 0.45);
      if (near >= 0) continue;
      this.add(nx, ny, i);
    }

    // Consume attractors reached by the new nodes.
    for (let i = start; i < this.count; i++) {
      const cx = Math.floor(this.xs[i] / this.cell);
      const cy = Math.floor(this.ys[i] / this.cell);
      for (let gx = cx - 1; gx <= cx + 1; gx++) {
        for (let gy = cy - 1; gy <= cy + 1; gy++) {
          const b = this.aGrid.get(this.key(gx, gy));
          if (!b) continue;
          for (const a of b) {
            if (!this.alive[a]) continue;
            if ((this.ax[a] - this.xs[i]) ** 2 + (this.ay[a] - this.ys[i]) ** 2 < this.kill * this.kill) {
              this.alive[a] = 0;
              this.aliveCount--;
            }
          }
        }
      }
    }

    this.stalls = this.count === start ? this.stalls + 1 : 0;
    if (this.aliveCount <= 0 || this.stalls > 6 || this.count >= this.max) this.done = true;
    return [start, this.count];
  }

  /** Number of tips downstream of each node: the pipe model for branch thickness. */
  descendants() {
    const d = new Uint16Array(this.count).fill(1);
    for (let i = this.count - 1; i > 0; i--) {
      const p = this.parent[i];
      if (p >= 0) d[p] = Math.min(65000, d[p] + d[i]);
    }
    return d;
  }

  /** Leaf nodes (nothing grows from them). */
  tips() {
    const hasChild = new Uint8Array(this.count);
    for (let i = 1; i < this.count; i++) hasChild[this.parent[i]] = 1;
    const out: number[] = [];
    for (let i = 0; i < this.count; i++) if (!hasChild[i]) out.push(i);
    return out;
  }

  /** Node indices from the seed out to node i. */
  pathTo(i: number) {
    const path: number[] = [];
    let n = i;
    while (n >= 0) {
      path.push(n);
      n = this.parent[n];
    }
    return path.reverse();
  }
}
