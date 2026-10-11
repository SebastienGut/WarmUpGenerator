import type { Metadata } from "next";
import PlanView from "@/components/PlanView";

export const metadata: Metadata = {
  title: "Ton échauffement",
  // Une URL par combinaison de séance : jamais indexée. Les versions
  // indexables sont les pages exercice statiques.
  robots: { index: false, follow: true },
};

// Page statique : le plan est calculé dans le navigateur à partir de l'URL.
// Aucun serveur sollicité, et la page reste utilisable hors ligne une fois
// mise en cache par le service worker — en salle, au sous-sol, sans réseau.
export default function PlanPage() {
  return <PlanView />;
}
