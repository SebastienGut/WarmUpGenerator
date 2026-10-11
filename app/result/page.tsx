import { redirect } from "next/navigation";
import { MUSCLE_LIFTS } from "@/lib/seo-plan";
import { serializeSession } from "@/lib/session-engine";
import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const ZONES: BodyZone[] = ["epaule", "genou", "bas-du-dos", "hanches", "poignets", "coudes", "chevilles"];
const REPS: Record<string, number> = { force: 5, hypertrophie: 10, reprise: 12, mobilite: 12 };

// Ancienne page de résultat (générateur par muscle). Les liens déjà partagés
// sont traduits vers le moteur par séance : chaque muscle devient son
// exercice de séance le plus représentatif.
export default async function LegacyResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const str = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : "");
  const muscles = str("muscles").split(",").filter((m): m is MuscleGroup => m in MUSCLE_LIFTS);
  const lifts = [...new Set(muscles.map((m) => MUSCLE_LIFTS[m][0]))];
  if (!lifts.length) redirect("/");
  redirect(
    `/plan?${serializeSession({
      lifts,
      workReps: REPS[str("objectif")] ?? 10,
      pain: str("zones").split(",").filter((z): z is BodyZone => (ZONES as string[]).includes(z)),
      band: false,
      short: str("duree") === "3",
    })}`,
  );
}
