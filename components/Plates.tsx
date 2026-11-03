// Disques à charger d'un côté de la barre : une étiquette par disque, le poids
// précédé d'un point à la couleur de compétition (25 rouge, 20 bleu, 15 jaune,
// 10 vert, 5 blanc). Le chiffre reste lisible d'un coup d'œil, la couleur aide à
// trouver le disque sur le rack.

const DOT: Record<string, string> = {
  "25": "bg-[var(--plate-25)]",
  "20": "bg-[var(--plate-20)]",
  "15": "bg-[var(--plate-15)]",
  "10": "bg-[var(--plate-10)]",
  "5": "bg-[var(--plate-5)] ring-1 ring-inset ring-line-strong",
  "2.5": "bg-[var(--plate-2_5)]",
  "1.25": "bg-[var(--plate-1_25)]",
};

export function frKg(n: number) {
  return String(n).replace(".", ",");
}

export default function Plates({ plates, size = 28 }: { plates: number[]; size?: number }) {
  if (!plates.length) return null;
  // `size` (hauteur visée en pixels) règle la taille du texte et du point.
  const font = Math.max(12, Math.round(size * 0.48));
  const dot = Math.max(7, Math.round(size * 0.28));
  return (
    <span className="inline-flex flex-wrap items-center justify-end gap-1" role="img" aria-label={`Par côté : ${plates.map(frKg).join(" + ")} kg`}>
      {plates.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-flex items-center gap-1 rounded-full bg-ink/[0.06] px-2 py-0.5 font-display leading-none text-ink tabular"
          style={{ fontSize: font }}
        >
          <span className={`shrink-0 rounded-full ${DOT[String(p)] ?? DOT["1.25"]}`} style={{ width: dot, height: dot }} />
          {frKg(p)}
        </span>
      ))}
    </span>
  );
}
