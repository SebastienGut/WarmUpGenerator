import Link from "next/link";
import SessionBuilder, { type CardCovers } from "@/components/SessionBuilder";

// Essai, hors index : l'accueil avec les démonstrations en images sur les cartes,
// à comparer avec l'accueil actuel avant de choisir.
export const metadata = { title: "Aperçu de l'accueil", robots: { index: false, follow: false } };

const VARIANTS: { id: CardCovers; label: string }[] = [
  { id: "picto", label: "Actuel" },
  { id: "medaillon", label: "A · Médaillon" },
  { id: "vignette", label: "B · Vignette" },
];

export default async function ApercuAccueil({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  const covers = VARIANTS.find((x) => x.id === v)?.id ?? "medaillon";
  return (
    <>
      <nav aria-label="Variantes" className="sticky top-0 z-50 flex gap-1.5 bg-ink px-3 py-2">
        {VARIANTS.map((x) => (
          <Link
            key={x.id}
            href={`/apercu/accueil?v=${x.id}`}
            className={`rounded-full px-3 py-1.5 text-[13px] font-semibold ${x.id === covers ? "bg-paper text-ink" : "text-paper"}`}
          >
            {x.label}
          </Link>
        ))}
      </nav>
      <SessionBuilder covers={covers} />
    </>
  );
}
