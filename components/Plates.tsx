// Chargement d'un côté de la barre, dessiné avec les couleurs des disques de
// compétition (25 rouge, 20 bleu, 15 jaune, 10 vert, 5 blanc). En salle, on
// lit la couleur avant le chiffre : c'est la représentation la plus rapide.

const SPEC: Record<string, { h: number; w: number; color: string; outline?: boolean }> = {
  "25": { h: 1, w: 9, color: "var(--plate-25)" },
  "20": { h: 1, w: 8, color: "var(--plate-20)" },
  "15": { h: 0.86, w: 7, color: "var(--plate-15)" },
  "10": { h: 0.72, w: 6, color: "var(--plate-10)" },
  "5": { h: 0.56, w: 5, color: "var(--plate-5)", outline: true },
  "2.5": { h: 0.44, w: 4, color: "var(--plate-2_5)" },
  "1.25": { h: 0.36, w: 3, color: "var(--plate-1_25)" },
};

export function frKg(n: number) {
  return String(n).replace(".", ",");
}

export default function Plates({ plates, size = 28, showLabel = true }: { plates: number[]; size?: number; showLabel?: boolean }) {
  if (!plates.length) return null;
  const scale = size / 28;
  return (
    <span className="inline-flex items-center gap-2" aria-label={`Par côté : ${plates.map(frKg).join(" + ")} kg`}>
      <span className="inline-flex items-center" aria-hidden="true" style={{ height: size }}>
        {/* manchon de la barre */}
        <span className="rounded-sm bg-faint" style={{ width: 4 * scale, height: 4 * scale }} />
        {plates.map((p, i) => {
          const s = SPEC[String(p)] ?? SPEC["1.25"];
          return (
            <span
              key={i}
              className="rounded-[2px]"
              style={{
                width: s.w * scale,
                height: s.h * size,
                marginLeft: 1.5 * scale,
                background: s.color,
                boxShadow: s.outline ? "inset 0 0 0 1px var(--line-strong)" : undefined,
              }}
            />
          );
        })}
        <span className="bg-faint" style={{ width: 10 * scale, height: 4 * scale, marginLeft: 1.5 * scale }} />
      </span>
      {showLabel && <span className="tabular text-[12px] text-subtle">{plates.map(frKg).join(" + ")}</span>}
    </span>
  );
}
