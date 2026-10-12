import { exercises, MUSCLE_LABELS, OBJECTIVE_LABELS, ZONE_LABELS, EQUIPMENT_LABELS } from "@/lib/warmup-data";
import { FOCUS_LABELS } from "@/lib/session-engine";

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
    description: `Base de données ouverte de ${exercises.length} exercices d'échauffement en français, annotés par qualité physique préparée, contre-indications par zone sensible, groupe musculaire, articulations mobilisées et matériel requis.`,
    version: "1.2.0",
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
      prepFocus: FOCUS_LABELS,
      prepRoles: {
        mobility: "Mobilité",
        activation: "Activation",
        stability: "Stabilité",
        therapeutic: "Préparation d'une zone sensible",
        "core-bracing": "Gainage",
        "posterior-chain": "Chaîne postérieure",
      },
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
      description: "Consigne d'exécution en français (tutoiement)",
      fallback: "Version sans matériel, quand l'exercice demande un élastique ou une barre",
      prepFocus: "Qualités physiques préparées (voir vocabularies.prepFocus) : c'est le champ que croise le générateur avec les exigences des exercices de la séance",
      prepRoles: "Phases de l'échauffement où l'exercice peut servir (voir vocabularies.prepRoles)",
      prepIntensity: "Intensité : soft, moderate ou neural",
      trainingValue: "Intérêt de l'exercice en préparation, de 1 (faible) à 5 (fort)",
      therapeutic: "Zone sensible pour laquelle l'exercice a été conçu",
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
