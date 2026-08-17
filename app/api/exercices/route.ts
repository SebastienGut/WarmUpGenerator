import { exercises, MUSCLE_LABELS, OBJECTIVE_LABELS, ZONE_LABELS, EQUIPMENT_LABELS } from "@/lib/warmup-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

// Prérendu au build : le jeu de données est statique, aucune raison de le
// recalculer par requête. Sert aussi à garder le coût serveur à zéro.
export const dynamic = "force-static";

/**
 * Export open data du référentiel d'exercices d'échauffement.
 *
 * Publié sous CC BY 4.0 : réutilisable librement avec attribution. L'objectif
 * est double — rendre la base réellement utile à d'autres (apps, étudiants,
 * kinés) et générer des citations entrantes sans démarchage.
 *
 * Le format est volontairement auto-documenté : les référentiels de libellés
 * accompagnent les données pour qu'un consommateur externe n'ait pas besoin de
 * lire notre code TypeScript pour interpréter les codes.
 */
export function GET() {
  const payload = {
    $schema: `${SITE_URL}/api/exercices`,
    name: "Référentiel d'exercices d'échauffement pour la musculation",
    description: `Base de données ouverte de ${exercises.length} exercices d'échauffement en français, annotés par groupe musculaire, objectif d'entraînement, contre-indications par zone sensible, articulations mobilisées et matériel requis.`,
    version: "1.0.0",
    language: "fr",
    license: {
      name: "Creative Commons Attribution 4.0 International",
      id: "CC-BY-4.0",
      url: "https://creativecommons.org/licenses/by/4.0/deed.fr",
      attribution: `Warmup Generator — ${SITE_URL}`,
    },
    source: `${SITE_URL}/donnees`,
    count: exercises.length,
    // Référentiels de libellés : permettent de décoder les champs codés
    vocabularies: {
      muscles: MUSCLE_LABELS,
      objectives: OBJECTIVE_LABELS,
      zones: ZONE_LABELS,
      equipment: EQUIPMENT_LABELS,
      categories: {
        articulaire: "Mobilisation articulaire",
        activation: "Activation musculaire",
        ciblé: "Préparation spécifique",
      },
    },
    fieldDefinitions: {
      id: "Identifiant stable de l'exercice",
      name: "Nom de l'exercice en français",
      category: "Phase de l'échauffement (voir vocabularies.categories)",
      muscles: "Groupes musculaires préparés par l'exercice",
      objectives: "Objectifs de séance pour lesquels l'exercice est pertinent",
      contraindications: "Zones sensibles pour lesquelles l'exercice est déconseillé",
      painSupport: "Zones sensibles que l'exercice aide activement à soulager",
      joints: "Articulations mobilisées",
      durationSeconds: "Durée recommandée en secondes",
      reps: "Répétitions ou consigne de volume, en texte libre",
      equipment: "Matériel requis (voir vocabularies.equipment)",
      description: "Consigne d'exécution en français",
    },
    exercises,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      // Ouvert à la réutilisation cross-origin : c'est le but d'un open data.
      "Access-Control-Allow-Origin": "*",
    },
  });
}
