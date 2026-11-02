// Disques à charger d'un côté de la barre : une pastille par disque, à la couleur
// de compétition (25 rouge, 20 bleu, 15 jaune, 10 vert, 5 blanc), le poids écrit
// dessus. En salle, on lit la couleur avant le chiffre.

const SPEC: Record<string, { d: number; className: string }> = {
  "25": { d: 1, className: "bg-[var(--plate-25)] text-white" },
  "20": { d: 1, className: "bg-[var(--plate-20)] text-white" },
  "15": { d: 0.92, className: "bg-[var(--plate-15)] text-black" },
  "10": { d: 0.86, className: "bg-[var(--plate-10)] text-black" },
  "5": { d: 0.78, className: "bg-[var(--plate-5)] text-black ring-1 ring-inset ring-line-strong" },
  "2.5": { d: 0.7, className: "bg-[var(--plate-2_5)] text-white" },
  "1.25": { d: 0.64, className: "bg-[var(--plate-1_25)] text-black" },
};

export function frKg(n: number) {
  return String(n).replace(".", ",");
}

export default function Plates({ plates, size = 28 }: { plates: number[]; size?: number }) {
  if (!plates.length) return null;
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`Par côté : ${plates.map(frKg).join(" + ")} kg`}>
      {plates.map((p, i) => {
        const s = SPEC[String(p)] ?? SPEC["1.25"];
        const d = Math.round(size * s.d);
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`inline-flex shrink-0 items-center justify-center rounded-full font-display leading-none tabular ${s.className}`}
            style={{ width: d, height: d, fontSize: Math.max(10, d * (String(p).length > 2 ? 0.34 : 0.44)) }}
          >
            {frKg(p)}
          </span>
        );
      })}
    </span>
  );
}
