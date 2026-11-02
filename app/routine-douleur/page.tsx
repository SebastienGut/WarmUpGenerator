import type { Metadata } from "next";
import RehabView from "@/components/RehabView";

export const metadata: Metadata = {
  title: "Routine douleur",
  // Une URL par combinaison de zones : jamais indexée (les guides /douleur le sont).
  robots: { index: false, follow: true },
};

// Page statique : la routine est calculée dans le navigateur à partir de l'URL.
export default function RehabPage() {
  return <RehabView />;
}
