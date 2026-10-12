import { FigureStill } from "@/components/ExerciseFigure";
import { FIGURES } from "@/lib/figures";

// Planche de contrôle des pictogrammes (temporaire, non publiée).
export default async function DevFigures({ searchParams }: { searchParams: Promise<{ p?: string; ids?: string }> }) {
  const sp = await searchParams;
  const page = Number(sp.p ?? 0);
  const ids = sp.ids ? sp.ids.split(",") : Object.keys(FIGURES).slice(page * 24, page * 24 + 24);
  return (
    <main className="grid grid-cols-3 gap-2 p-3">
      {ids.map((id) => (
        <div key={id} className="rounded border border-line bg-card p-1">
          <div className="flex">
            <FigureStill id={id} k={0} className="h-24 w-1/2" />
            <FigureStill id={id} k={1} className="h-24 w-1/2" />
          </div>
          <p className="truncate text-[10px] text-muted">{id}</p>
        </div>
      ))}
    </main>
  );
}
