// Routines « Une douleur ? » : mobilité douce et renforcement léger autour d'une
// articulation qui gêne, plus longues et plus lentes qu'un échauffement.
//
// Ce ne sont pas des traitements. Elles s'adressent aux gênes légères et connues
// (sous 3 sur 10), suivent les principes de la reprise progressive (amplitude sans
// douleur, isométrie et contrôle avant la charge) et renvoient vers un
// professionnel dès qu'un signe d'alerte apparaît. Les pictogrammes sont ceux de
// lib/figures.ts.

import type { BodyZone } from "@/lib/warmup-data";
import type { PlanPhase, PrepStep, SessionPlan } from "@/lib/session-engine";

export const REHAB_ZONES: { id: BodyZone; label: string }[] = [
  { id: "epaule", label: "Épaule" },
  { id: "coudes", label: "Coude" },
  { id: "poignets", label: "Poignet" },
  { id: "bas-du-dos", label: "Bas du dos" },
  { id: "hanches", label: "Hanche" },
  { id: "genou", label: "Genou" },
  { id: "chevilles", label: "Cheville" },
];

interface RehabExercise {
  figure: string;
  name: string;
  phase: "mobility" | "activation";
  dose: string;
  seconds: number;
  instructions: string;
  why: string;
}

const x = (e: RehabExercise) => e;

const EX = {
  retraction: x({ figure: "rehab-retraction-bras-tendus", name: "Rétraction des omoplates, bras tendus", phase: "activation", dose: "2 × 10, tenir 3 s", seconds: 80, instructions: "Debout, bras tendus devant toi à hauteur d'épaules. Sans plier les coudes, recule les épaules pour rapprocher les omoplates, sans les hausser, tiens 3 secondes, relâche.", why: "Réapprend à l'omoplate à se placer : c'est elle qui donne de la place à l'épaule." }),
  carsEpaule: x({ figure: "prep-epaules-cars", name: "Cercles d'épaule lents", phase: "mobility", dose: "5 par sens et par côté", seconds: 90, instructions: "Bras tendu, dessine le plus grand cercle possible, très lentement, le reste du corps immobile. Réduis le cercle là où ça tire.", why: "Explore l'amplitude disponible sans charge, pour qu'elle reste accessible." }),
  wallSlides: x({ figure: "prep-glisses-mur", name: "Wall slides (glissés au mur)", phase: "mobility", dose: "2 × 8, lents", seconds: 75, instructions: "Avant-bras contre le mur, fais glisser les bras vers le haut en gardant le contact, puis redescends. Monte seulement jusqu'où c'est confortable.", why: "Lever le bras en guidant l'omoplate, sans compensation du bas du dos." }),
  reCote: x({ figure: "prep-rotation-externe-cote", name: "Rotation externe allongé sur le côté", phase: "activation", dose: "2 × 12 par côté", seconds: 120, instructions: "Allongé sur le côté, coude plié à 90° collé au flanc. Tourne l'avant-bras vers le plafond en 2 secondes, redescends en 3.", why: "Renforce doucement la coiffe des rotateurs, qui centre la tête de l'humérus." }),
  ytSol: x({ figure: "cib-epaule-yt-sol", name: "Y-T debout", phase: "activation", dose: "2 × 8", seconds: 80, instructions: "Debout, pouces vers l'arrière, monte les bras en Y au-dessus de la tête puis ouvre-les en T à hauteur d'épaules, en serrant les omoplates. Lentement, sans hausser les épaules.", why: "Active le bas des trapèzes, souvent endormi quand l'épaule gêne." }),
  capsule: x({ figure: "cib-epaule-capsule-posterieure", name: "Étirement de l'arrière de l'épaule", phase: "mobility", dose: "2 × 30 s par côté", seconds: 130, instructions: "Ramène le bras tendu devant la poitrine avec l'autre main, épaule basse. Étirement léger, jamais de pincement à l'avant.", why: "Assouplit l'arrière de l'épaule, qui limite souvent la rotation." }),

  pronoSupi: x({ figure: "cib-coudes-pronation-supination", name: "Pronation-supination de l'avant-bras", phase: "mobility", dose: "2 × 10 par côté", seconds: 80, instructions: "Coude plié à 90°, collé au corps. Tourne la paume vers le haut puis vers le bas, lentement, sur toute l'amplitude confortable.", why: "Mobilise l'articulation du coude et de l'avant-bras sans contrainte." }),
  flexExtCoude: x({ figure: "art-coudes", name: "Flexions-extensions du coude", phase: "mobility", dose: "2 × 10 par côté", seconds: 70, instructions: "Plie et tends le coude lentement, sans forcer en fin d'extension.", why: "Fait circuler le liquide articulaire et réchauffe les tendons du coude." }),
  etireExt: x({ figure: "cib-poignets-etire-extenseurs", name: "Étirement des extenseurs du poignet", phase: "mobility", dose: "3 × 30 s par côté", seconds: 190, instructions: "Bras tendu devant, paume vers le bas, plie le poignet avec l'autre main jusqu'à un étirement léger sur le dessus de l'avant-bras.", why: "Détend les muscles qui s'insèrent à l'extérieur du coude (épicondyle)." }),
  etireFlech: x({ figure: "cib-poignets-etire-flechisseurs", name: "Étirement des fléchisseurs du poignet", phase: "mobility", dose: "3 × 30 s par côté", seconds: 190, instructions: "Bras tendu devant, paume vers le haut, ramène les doigts vers toi avec l'autre main, étirement léger.", why: "Détend les muscles qui s'insèrent à l'intérieur du coude (épitrochlée)." }),
  etireTriceps: x({ figure: "cib-coudes-etire-triceps", name: "Étirement du triceps", phase: "mobility", dose: "2 × 30 s par côté", seconds: 130, instructions: "Main derrière la tête, l'autre main pousse doucement le coude vers l'arrière.", why: "Relâche l'arrière du coude, sollicité par les extensions et les développés." }),

  rotPoignets: x({ figure: "art-poignets", name: "Rotations des poignets", phase: "mobility", dose: "10 par sens", seconds: 50, instructions: "Doigts entrecroisés, dessine de grands cercles lents avec les poignets.", why: "Remet en mouvement le poignet dans toutes les directions." }),
  appuiPoignets: x({ figure: "cib-poignets-activation-progressive", name: "Mise en charge progressive des poignets", phase: "activation", dose: "2 × 10 bascules", seconds: 90, instructions: "À quatre pattes, mains sous les épaules, avance doucement le poids du corps au-dessus des mains puis recule. Réduis l'amplitude si ça tire.", why: "Réhabitue le poignet à porter du poids, progressivement." }),

  genouxPoitrine: x({ figure: "cib-lombaires-genoux-poitrine", name: "Genoux sur la poitrine", phase: "mobility", dose: "3 × 20 s", seconds: 80, instructions: "Allongé sur le dos, ramène les deux genoux vers la poitrine avec les mains, respire lentement.", why: "Décomprime doucement le bas du dos." }),
  catCow: x({ figure: "art-chat-vache", name: "Cat-cow (dos rond / dos creux)", phase: "mobility", dose: "2 × 8, lents", seconds: 75, instructions: "À quatre pattes, arrondis le dos en expirant puis creuse-le en inspirant, sans forcer en fin de mouvement.", why: "Mobilise la colonne vertèbre par vertèbre, dans l'amplitude confortable." }),
  essuieGlace: x({ figure: "art-lombaires-essuie-glace", name: "Essuie-glaces des jambes", phase: "mobility", dose: "2 × 8 par côté", seconds: 80, instructions: "Allongé sur le dos, genoux pliés, laisse tomber les deux genoux d'un côté puis de l'autre, épaules au sol.", why: "Rotation douce du bas du dos et des hanches." }),
  birdDog: x({ figure: "act-core-bird-dog", name: "Bird dog", phase: "activation", dose: "2 × 6 par côté, tenir 5 s", seconds: 130, instructions: "À quatre pattes, tends un bras et la jambe opposée, dos plat, tiens 5 secondes, reviens. Le bassin ne bascule pas.", why: "Gainage qui protège le dos : il résiste à la rotation sans comprimer." }),
  deadBug: x({ figure: "act-core-dead-bug", name: "Dead bug", phase: "activation", dose: "2 × 6 par côté", seconds: 100, instructions: "Allongé, bras vers le plafond, genoux à 90°. Descends un bras et la jambe opposée en gardant le bas du dos collé au sol.", why: "Renforce les abdominaux profonds en gardant le dos neutre." }),
  pont: x({ figure: "act-fessiers-pont", name: "Pont fessier", phase: "activation", dose: "2 × 12, tenir 2 s en haut", seconds: 110, instructions: "Allongé, pieds à plat, pousse dans les talons pour monter le bassin, serre les fessiers 2 secondes, redescends lentement.", why: "Les fessiers soulagent le bas du dos et guident le genou." }),
  planchelat: x({ figure: "prep-planche-laterale", name: "Planche latérale, genoux au sol", phase: "activation", dose: "3 × 15 s par côté", seconds: 120, instructions: "Sur un coude, genoux pliés au sol, monte le bassin pour aligner épaule, hanche et genou. Respire.", why: "Renforce les muscles du côté du tronc, qui stabilisent le bas du dos." }),

  nonante: x({ figure: "prep-90-90", name: "Transitions de hanches 90/90", phase: "mobility", dose: "2 × 6 transitions", seconds: 90, instructions: "Assis, genoux pliés à 90° tous les deux du même côté, bascule-les de l'autre côté lentement, mains au sol si besoin.", why: "Travaille les rotations de hanche en douceur." }),
  fenteBasse: x({ figure: "cib-hanches-fente-rotation", name: "Fente basse, genou au sol", phase: "mobility", dose: "5 respirations par côté", seconds: 80, instructions: "Un genou au sol, l'autre pied devant, avance doucement le bassin jusqu'à sentir l'avant de la hanche s'étirer.", why: "Assouplit l'avant de la hanche, souvent raide quand on reste assis." }),
  coquillage: x({ figure: "prep-clamshell", name: "Coquillage (clamshell)", phase: "activation", dose: "2 × 12 par côté", seconds: 120, instructions: "Allongé sur le côté, genoux pliés, pieds joints : ouvre le genou du dessus sans faire rouler le bassin, referme lentement.", why: "Renforce le moyen fessier, qui stabilise la hanche et le genou." }),
  fireHydrant: x({ figure: "cib-hanches-fire-hydrant", name: "Ouverture de hanche à quatre pattes", phase: "activation", dose: "2 × 8 par côté", seconds: 90, instructions: "À quatre pattes, ouvre le genou plié sur le côté sans tourner le buste, redescends lentement.", why: "Active les rotateurs de hanche dans une position sans charge." }),

  fenteIso: x({ figure: "prep-fente-iso", name: "Fente tenue (isométrie)", phase: "activation", dose: "4 × 30 s par côté", seconds: 290, instructions: "En fente, descends à mi-hauteur et tiens, genou aligné avec le pied. Choisis une hauteur où la douleur reste sous 3 sur 10.", why: "L'effort tenu sans mouvement charge le genou et ses tendons de façon contrôlée, et soulage souvent la douleur." }),
  slr: x({ figure: "cib-genou-slr", name: "Relevé de jambe tendue", phase: "activation", dose: "2 × 10 par côté", seconds: 110, instructions: "Allongé, une jambe pliée, l'autre tendue : contracte la cuisse, lève la jambe tendue à hauteur du genou opposé, redescends lentement.", why: "Renforce le quadriceps sans plier le genou." }),
  chevilleMur: x({ figure: "art-cheville-genou-mur", name: "Mobilisation de cheville genou au mur", phase: "mobility", dose: "2 × 10 par côté", seconds: 110, instructions: "Pied à une main du mur, avance le genou vers le mur sans décoller le talon, reviens.", why: "Une cheville mobile soulage le genou, qui compense souvent ses raideurs." }),
  stepUp: x({ figure: "cib-genou-step-up", name: "Montée de marche contrôlée", phase: "activation", dose: "2 × 8 par côté", seconds: 110, instructions: "Sur une marche basse, monte en poussant dans le talon, genou dans l'axe du pied, redescends en 3 secondes.", why: "Reprend le geste du quotidien avec contrôle du genou." }),

  rotChevilles: x({ figure: "art-chevilles", name: "Rotations de chevilles", phase: "mobility", dose: "10 par sens et par côté", seconds: 70, instructions: "Pied décollé du sol, dessine de grands cercles lents avec la pointe du pied.", why: "Remet la cheville en mouvement dans toutes les directions." }),
  etireMollet: x({ figure: "cib-chevilles-etire-mollet", name: "Étirement du mollet au mur", phase: "mobility", dose: "2 × 30 s par côté", seconds: 130, instructions: "Mains au mur, une jambe tendue derrière, talon au sol, avance le bassin jusqu'à un étirement léger du mollet.", why: "Un mollet souple libère la flexion de cheville." }),
  pointes: x({ figure: "cib-chevilles-montees-pointe", name: "Montées sur la pointe des pieds, lentes", phase: "activation", dose: "2 × 12, descente en 3 s", seconds: 100, instructions: "Debout, une main au mur, monte sur la pointe des pieds puis redescends lentement.", why: "Renforce le mollet et le tendon d'Achille de façon progressive." }),
} satisfies Record<string, RehabExercise>;

type ExKey = keyof typeof EX;

/** Routine de chaque zone, dans l'ordre d'exécution : mobilité douce, puis renforcement léger. */
const ROUTINES: Record<BodyZone, ExKey[]> = {
  epaule: ["carsEpaule", "wallSlides", "capsule", "retraction", "reCote", "ytSol"],
  coudes: ["flexExtCoude", "pronoSupi", "etireExt", "etireFlech", "etireTriceps"],
  poignets: ["rotPoignets", "pronoSupi", "etireFlech", "etireExt", "appuiPoignets"],
  "bas-du-dos": ["genouxPoitrine", "catCow", "essuieGlace", "birdDog", "deadBug", "pont", "planchelat"],
  hanches: ["nonante", "fenteBasse", "essuieGlace", "coquillage", "pont", "fireHydrant"],
  genou: ["chevilleMur", "slr", "coquillage", "pont", "fenteIso", "stepUp"],
  chevilles: ["rotChevilles", "chevilleMur", "etireMollet", "pointes"],
};

const MAX = 8;

export function parseRehabZones(raw: string): BodyZone[] {
  const ids = REHAB_ZONES.map((z) => z.id) as string[];
  return raw.split(",").filter((z): z is BodyZone => ids.includes(z));
}

export function rehabLabel(zones: BodyZone[]) {
  return zones.map((z) => REHAB_ZONES.find((r) => r.id === z)?.label ?? z).join(" + ");
}

/**
 * Une zone : sa routine complète. Plusieurs : chaque zone apporte à tour de rôle
 * son exercice suivant (sans doublon) jusqu'à huit, puis mobilité avant renforcement.
 */
export function buildRehabPlan(zones: BodyZone[]): SessionPlan {
  const lists = zones.map((z) => ROUTINES[z]);
  const picked: ExKey[] = [];
  if (lists.length === 1) picked.push(...lists[0]);
  else
    for (let round = 0; picked.length < MAX && round < 8; round++)
      for (const l of lists) {
        const next = l.find((k) => !picked.includes(k));
        if (next && picked.length < MAX) picked.push(next);
      }
  const order = (k: ExKey) => (EX[k].phase === "mobility" ? 0 : 1);
  const keys = [...picked].sort((a, b) => order(a) - order(b));

  const step = (k: ExKey): PrepStep => {
    const e = EX[k];
    return {
      kind: "prep",
      exercise: { id: e.figure, bankId: k, name: e.name, equipment: "none" },
      instructions: e.instructions,
      substituted: false,
      reps: e.dose,
      seconds: e.seconds,
      reason: e.why,
    };
  };
  const phases: PlanPhase[] = [];
  const mob = keys.filter((k) => EX[k].phase === "mobility").map(step);
  const act = keys.filter((k) => EX[k].phase === "activation").map(step);
  if (mob.length) phases.push({ key: "mobility", title: "Mobilité douce", why: "Retrouver l'amplitude confortable, lentement.", steps: mob });
  if (act.length) phases.push({ key: "activation", title: "Renforcement léger", why: "Recharger progressivement, sans dépasser 3 sur 10.", steps: act });
  const seconds = keys.reduce((s, k) => s + EX[k].seconds, 0) + Math.max(0, keys.length - 1) * 15;
  return { title: rehabLabel(zones), lifts: [], phases, minutes: Math.max(1, Math.round(seconds / 60)), warnings: [], equipment: "none" };
}
