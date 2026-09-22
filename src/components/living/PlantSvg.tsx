import { GROUND, SEED, plant, strokeFor, type PlantStage } from "./plant";

/*
 * The plant drawing. Each stage is its own group so a scroll timeline can
 * grow them in order; paths carry data-draw and data-depth, dots data-pop.
 */
export function PlantSvg({ stages = ["seed", "root", "network", "canopy"], className = "" }: { stages?: PlantStage[]; className?: string }) {
  const show = (s: PlantStage) => stages.includes(s);

  return (
    <svg viewBox="0 0 800 800" className={className} role="img" aria-label="A plant growing from seed to roots, network and canopy">
      {/* soil */}
      <g opacity="0.5">
        {Array.from({ length: 90 }, (_, i) => {
          const x = (i * 97) % 760 + 20;
          const y = GROUND + 20 + ((i * 53) % 300);
          return <circle key={i} cx={x} cy={y} r={1.1} fill="#8fae96" opacity={0.25 + ((i * 7) % 10) / 30} />;
        })}
      </g>
      <line x1="20" x2="780" y1={GROUND} y2={GROUND} stroke="#16432f" strokeOpacity="0.25" strokeDasharray="3 7" strokeLinecap="round" />

      {show("canopy") && (
        <g data-g="canopy">
          {plant.canopy.map((s, i) => (
            <path key={i} data-draw data-depth={s.depth} d={s.d} fill="none" stroke={strokeFor(s, 7)} strokeWidth={s.width} strokeLinecap="round" />
          ))}
          {plant.leaves.map(([x, y], i) => (
            <circle key={i} data-pop cx={x} cy={y} r={i % 3 === 0 ? 3.4 : 2.2} fill={i % 3 === 0 ? "#16432f" : "#8fae96"} />
          ))}
        </g>
      )}

      {show("network") && (
        <g data-g="network">
          {plant.network.map((s, i) => (
            <path key={i} data-draw data-depth={s.depth} d={s.d} fill="none" stroke={strokeFor(s, 5)} strokeWidth={s.width} strokeLinecap="round" />
          ))}
          {plant.links.map((d, i) => (
            <path key={i} data-draw data-depth={6} d={d} fill="none" stroke="#8fae96" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" />
          ))}
          {plant.nodes.map(([x, y], i) => (
            <g key={i} data-pop>
              <circle cx={x} cy={y} r={7} fill="#f4efe4" stroke="#16432f" strokeWidth="1.5" />
              <circle cx={x} cy={y} r={2.4} fill="#16432f" />
            </g>
          ))}
        </g>
      )}

      {show("root") && (
        <g data-g="root">
          {plant.roots.map((s, i) => (
            <path key={i} data-draw data-depth={s.depth} d={s.d} fill="none" stroke={strokeFor(s, 6)} strokeWidth={s.width} strokeLinecap="round" />
          ))}
        </g>
      )}

      {show("seed") && (
        <g data-g="seed">
          <circle data-draw data-depth={0} cx={SEED[0]} cy={SEED[1]} r={46} fill="none" stroke="#8fae96" strokeWidth="1.25" />
          <circle data-draw data-depth={1} cx={SEED[0]} cy={SEED[1]} r={78} fill="none" stroke="#8fae96" strokeOpacity="0.6" strokeWidth="1" />
          <circle data-pop cx={SEED[0]} cy={SEED[1]} r={13} fill="#e0572b" />
        </g>
      )}
    </svg>
  );
}
