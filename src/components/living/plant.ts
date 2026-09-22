import { branches, thread, type Segment } from "./geometry";
import { mulberry32, range } from "@/lib/random";

/*
 * One plant, four stages. The seed sits on the ground line; roots grow down,
 * the network spreads sideways underground, and the canopy rises above.
 * All coordinates live in a 800 x 800 viewBox.
 */

export const GROUND = 470;
export const SEED: [number, number] = [400, GROUND];

export const plant = (() => {
  const roots = branches({
    x: 400, y: GROUND + 6, angle: 90, length: 70, levels: 6, seed: 21, spread: 30, decay: 0.8, width: 3.6,
    tropism: { angle: 90, strength: 0.12 }, bend: 0.3,
  });

  const networkLeft = branches({
    x: 392, y: GROUND + 34, angle: 168, length: 92, levels: 5, seed: 5, spread: 26, decay: 0.78, width: 2.2,
    tropism: { angle: 175, strength: 0.25 }, bend: 0.35, triple: 0.35,
  });
  const networkRight = branches({
    x: 408, y: GROUND + 34, angle: 12, length: 92, levels: 5, seed: 8, spread: 26, decay: 0.78, width: 2.2,
    tropism: { angle: 5, strength: 0.25 }, bend: 0.35, triple: 0.35,
  });
  const network = [...networkLeft, ...networkRight].sort((a, b) => a.depth - b.depth);

  // Nodes where the network meets other processes, plus threads between neighbours.
  const rng = mulberry32(12);
  const pick = (side: typeof networkLeft) =>
    side.filter((s) => s.depth >= 4).map((s) => s.tip).filter(() => rng() < 0.3).slice(0, 6);
  const nodes = [...pick(networkLeft), ...pick(networkRight)];
  const links: string[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const [x1, y1] = nodes[i];
    const [x2, y2] = nodes[i + 1];
    if (Math.hypot(x2 - x1, y2 - y1) < 170) links.push(thread(x1, y1, x2, y2, range(rng, -0.25, 0.25)));
  }

  const canopy = branches({
    x: 400, y: GROUND - 4, angle: -90, length: 118, levels: 7, seed: 34, spread: 30, decay: 0.76, width: 6,
    tropism: { angle: -90, strength: 0.08 }, bend: 0.18, triple: 0.2,
  });
  const leaves = canopy.filter((s) => s.depth >= 6).map((s) => s.tip);
  const crown = leaves.reduce((top, p) => (p[1] < top[1] ? p : top), leaves[0]);

  return { roots, network, nodes, links, canopy, leaves, crown };
})();

export type PlantStage = "seed" | "root" | "network" | "canopy";

export const strokeFor = (s: Segment, max: number) => (s.depth <= max * 0.45 ? "#16432f" : "#8fae96");
