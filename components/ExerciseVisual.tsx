import ExerciseFigure from "@/components/ExerciseFigure";
import { DEMOS } from "@/lib/demos";

/**
 * Démonstration d'un exercice : les deux images (départ, arrivée) en alternance
 * quand elles existent (public/demos, importées par scripts/assets/import-demos.mjs),
 * sinon le pictogramme animé. `still` : départ seul, pour les vignettes.
 */
// Exercices de séance qui partagent les images d'un exercice de préparation identique.
const ALIASES: Record<string, string> = { triceps: "extension-triceps-poulie", "face-pull": "face-pull-poulie" };

export default function ExerciseVisual({ id, demo, label, className = "", still = false }: { id: string; demo?: string; label: string; className?: string; still?: boolean }) {
  const key = demo ?? ALIASES[id] ?? id;
  const size = DEMOS[key];
  if (!size) return <ExerciseFigure id={id} label={label} className={className} animate={!still} />;
  const src = (pos: "depart" | "arrivee") => `/demos/${key}-${pos}.webp`;
  return (
    <span role="img" aria-label={`Mouvement : ${label}`} className={`relative block overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- images statiques déjà optimisées à l'import */}
      <img src={src("depart")} alt="" width={size[0]} height={size[1]} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
      {!still && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src("arrivee")} alt="" width={size[0]} height={size[1]} loading="lazy" className="demo-swap absolute inset-0 h-full w-full object-contain" />
      )}
    </span>
  );
}
