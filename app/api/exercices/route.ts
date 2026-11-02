import type { PrepFocus } from "@/lib/warmup-data";
import { exercises, MUSCLE_LABELS, OBJECTIVE_LABELS, ZONE_LABELS, EQUIPMENT_LABELS } from "@/lib/warmup-data";
import { EQUIPMENT_LABELS as KIT_LABELS, type Equipment } from "@/lib/bank";
import { SESSION_TEMPLATES } from "@/lib/lifts";
import { buildRehabPlan, REHAB_ZONES } from "@/lib/rehab";
import { buildSessionPlan, type PrepStep, type SessionPlan } from "@/lib/session-engine";

// Libellés des qualités préparées (champ prepFocus du jeu de données ouvert).
const FOCUS_LABELS: Record<PrepFocus, string> = {
  scapula: "omoplates",
  "rotator-cuff": "coiffe des rotateurs",
  thoracic: "haut du dos",
  lumbar: "bas du dos",
  hip: "hanches",
  "knee-control": "genoux",
  ankle: "chevilles",
  "wrist-forearm": "poignets",
  "elbow-tendon": "coudes",
  glutes: "fessiers",
  core: "gainage",
  hamstrings: "ischio-jambiers",
  overhead: "épaules en hauteur",
};

// Routines telles que le générateur les affiche : calculées par le moteur au build,
// elles ne peuvent pas diverger du site.
function stepsOf(plan: SessionPlan) {
  return plan.phases.flatMap((ph) =>
    (ph.steps as PrepStep[]).map((s) => ({
      phase: ph.title,
      name: s.exercise.name,
      dose: s.reps,
      instructions: s.instructions,
      why: s.reason,
      ...(s.replaces ? { replaces: s.replaces } : {}),
    })),
  );
}

const KITS: Equipment[] = ["gym", "band", "none"];
const sessionRoutines = SESSION_TEMPLATES.filter((t) => t.id !== "bas").map((t) => ({
  id: t.id,
  name: t.label,
  byEquipment: Object.fromEntries(
    KITS.map((eq) => {
      const plan = buildSessionPlan({ template: t.id, zones: t.zones, lifts: [], pain: [], band: false, equipment: eq, short: false, variant: 0 });
      return [eq, { minutes: plan.minutes, steps: stepsOf(plan) }];
    }),
  ),
}));
const painRoutines = REHAB_ZONES.map((z) => {
  const plan = buildRehabPlan([z.id]);
  return { zone: z.id, name: z.label, minutes: plan.minutes, rule: "Douleur sous 3 sur 10 pendant et après chaque exercice.", steps: stepsOf(plan) };
});

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
    description: `Base de données ouverte en français : les routines d'échauffement du générateur par séance (Push, Pull, Legs, Upper, Full body) et par matériel (salle, élastique, sans matériel), les routines « Une douleur ? » par articulation, et un référentiel de ${exercises.length} exercices annotés (qualité préparée, contre-indications, muscles, articulations, matériel).`,
    version: "2.0.0",
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
      routineEquipment: KIT_LABELS,
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
      sessionRoutines: "Routines du générateur, une par séance type ; byEquipment donne la version pour chaque matériel (voir vocabularies.routineEquipment), dans l'ordre d'exécution, avec dose, consigne, utilité et, le cas échéant, l'exercice remplacé (replaces)",
      painRoutines: "Routines « Une douleur ? » par articulation : mobilité douce puis renforcement léger, à suivre sous 3 sur 10 ; ne remplacent pas un avis médical",
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
      prepFocus: "Qualités physiques préparées (voir vocabularies.prepFocus) : c'est le champ que croise le générateur avec les exigences des zones à échauffer",
      prepRoles: "Phases de l'échauffement où l'exercice peut servir (voir vocabularies.prepRoles)",
      prepIntensity: "Intensité : soft, moderate ou neural",
      trainingValue: "Intérêt de l'exercice en préparation, de 1 (faible) à 5 (fort)",
      therapeutic: "Zone sensible pour laquelle l'exercice a été conçu",
    },
    sessionRoutines,
    painRoutines,
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
