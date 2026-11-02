// Monogramme Warmup Generator : un W d'affiche, incliné comme les titres, posé sur
// une barre jaune. Mêmes coordonnées que les icônes (scripts/build-logo.py).

const SKEW = Math.tan((7 * Math.PI) / 180);
const pts = (list: [number, number][]) => list.map(([x, y]) => `${(x + (50 - y) * SKEW).toFixed(2)},${y}`).join(" ");
const W = pts([[13, 22], [30, 22], [36, 55], [43, 22], [57, 22], [64, 55], [70, 22], [87, 22], [73, 74], [56, 74], [50, 46], [44, 74], [27, 74]]);
const BAR = pts([[16, 81], [84, 81], [84, 89], [16, 89]]);

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" rx="22" className="fill-accent" />
      <polygon points={W} className="fill-white" />
      <polygon points={BAR} className="fill-yellow" />
    </svg>
  );
}

/** Logo complet : monogramme + nom, pour l'en-tête. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-[19px] leading-[0.95]">
        Warmup
        <br />
        Generator
      </span>
    </span>
  );
}
