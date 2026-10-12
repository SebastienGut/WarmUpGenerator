import { redirect } from "next/navigation";
import { ZONE_ORDER } from "@/lib/lifts";
import { serializeSession } from "@/lib/session-engine";
import type { BodyZone, MuscleGroup } from "@/lib/warmup-data";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const ZONES: BodyZone[] = ["epaule", "genou", "bas-du-dos", "hanches", "poignets", "coudes", "chevilles"];

// Ancienne page de résultat (générateur par muscle) : les liens déjà partagés
// mènent au même échauffement par zones.
export default async function LegacyResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const str = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : "");
  const zones = str("muscles").split(",").filter((m): m is MuscleGroup => (ZONE_ORDER as string[]).includes(m));
  if (!zones.length) redirect("/");
  redirect(
    `/plan?${serializeSession({
      zones,
      lifts: [],
      pain: str("zones").split(",").filter((z): z is BodyZone => (ZONES as string[]).includes(z)),
      band: false,
      short: str("duree") === "3",
    })}`,
  );
}
