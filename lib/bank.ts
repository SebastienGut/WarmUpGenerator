// Banque d'exercices de préparation du moteur v3 (docs/guides/brief-moteur-v3.md).
//
// Banque réduite : chaque exercice a une fonction identifiable dans une routine.
// Chaque exercice existe en variantes selon le matériel disponible ; quand il n'y
// a pas d'équivalent honnête (un face pull sans résistance n'est pas un face pull),
// la variante renvoie vers un autre exercice nommé tel quel, ou disparaît.
// Les dosages sont des choix de programmation (une série, résistance facile, sans
// fatigue), pas des valeurs démontrées.

export type Equipment = "none" | "band" | "gym";
export const EQUIPMENT_LABELS: Record<Equipment, string> = { none: "Sans matériel", band: "Élastique", gym: "Salle" };

export type BankPhase = "mobility" | "activation";
export type BankPosition = "debout" | "appui" | "quadrupedie" | "sol";

export interface Variant {
  name: string;
  instructions: string;
  /** Pictogramme (identifiant dans lib/figures.ts). */
  figure: string;
  /** Images de démonstration (public/demos/{demo}-depart|arrivee.webp), si elles diffèrent de `figure`. */
  demo?: string;
  /** Ce qu'il faut sous la main : mur, banc, ancrage… */
  needs?: string;
}

export interface BankExercise {
  id: string;
  phase: BankPhase;
  position: BankPosition;
  /** Fonction de l'exercice dans la préparation, en une phrase. */
  why: string;
  dose: string;
  /** Durée estimée pour la dose par défaut, côtés et installation compris (s). */
  seconds: number;
  /** Variante par matériel. Une chaîne = remplacé par cet autre exercice ; null = retiré. */
  variants: { gym: Variant; band: Variant | string | null; none: Variant | string | null };
  /** Zones sensibles qui déconseillent l'exercice (identifiants BodyZone). */
  avoid?: string[];
}

const same = (v: Variant) => ({ gym: v, band: v, none: v });

/** Exercice identique quel que soit le matériel, sur une seule ligne. */
const ex = (id: string, phase: BankPhase, position: BankPosition, why: string, dose: string, seconds: number, name: string, instructions: string, figure: string, needs?: string): BankExercise => ({
  id, phase, position, why, dose, seconds, variants: same({ name, instructions, figure, needs }),
});

export const BANK: Record<string, BankExercise> = {
  "cat-cow": {
    id: "cat-cow",
    phase: "mobility",
    position: "quadrupedie",
    why: "Mobilise toute la colonne en douceur avant de la gainer sous la charge.",
    dose: "6 cycles",
    seconds: 40,
    variants: same({
      name: "Cat-cow (dos rond / dos creux)",
      instructions: "À quatre pattes, mains sous les épaules, genoux sous les hanches. Arrondis le dos en rentrant le menton, puis creuse-le en ouvrant la poitrine. Lentement, sans forcer en fin d'amplitude.",
      figure: "art-chat-vache",
    }),
  },
  "rotation-thoracique": {
    id: "rotation-thoracique",
    phase: "mobility",
    position: "quadrupedie",
    why: "Fait tourner le haut du dos, pour que les épaules n'aient pas à compenser.",
    dose: "5 par côté",
    seconds: 45,
    variants: same({
      name: "Rotation thoracique à quatre pattes, main derrière la tête",
      instructions: "À quatre pattes, une main derrière la tête. Amène le coude vers le bras d'appui, puis ouvre-le vers le plafond en suivant des yeux. Le bassin reste au-dessus des genoux : le mouvement vient du haut du dos.",
      figure: "prep-rotation-thoracique-qp",
    }),
  },
  "wall-slides": {
    id: "wall-slides",
    phase: "mobility",
    position: "debout",
    why: "Prépare l'épaule à monter au-dessus de la tête, omoplates qui suivent.",
    dose: "8 répétitions",
    seconds: 35,
    variants: same({
      name: "Wall slides (glissés des avant-bras au mur)",
      instructions: "Face au mur, avant-bras posés dessus, coudes à hauteur d'épaules. Fais glisser les avant-bras vers le haut en les gardant au contact, sans hausser les épaules ni cambrer, puis redescends.",
      figure: "prep-glisses-mur",
      needs: "un mur",
    }),
  },
  "cheville-mur": {
    id: "cheville-mur",
    phase: "mobility",
    position: "debout",
    why: "En squat et en fente, le genou avance au-dessus du pied : la cheville doit suivre.",
    dose: "10 par côté",
    seconds: 50,
    variants: same({
      name: "Mobilisation de cheville genou au mur",
      instructions: "Pied à une main du mur, talon au sol. Avance le genou vers le mur dans l'axe du pied sans décoller le talon, puis reviens. Recule le pied si c'est trop facile.",
      figure: "art-cheville-genou-mur",
      needs: "un mur",
    }),
  },
  "squat-assiste": {
    id: "squat-assiste",
    phase: "mobility",
    position: "debout",
    why: "Ouvre hanches et chevilles en bas du squat, sans charge ni rebond.",
    dose: "3 × 10 secondes",
    seconds: 45,
    variants: same({
      name: "Squat profond assisté",
      instructions: "Tiens un support stable (montant de rack, poteau). Descends à une profondeur confortable, talons au sol, et tiens 10 secondes en faisant de petits déplacements de hanches. Remonte, recommence. Aucun rebond, aucune profondeur imposée.",
      figure: "prep-squat-profond-assiste",
      needs: "un support à tenir",
    }),
    avoid: ["genou"],
  },
  "good-morning": {
    id: "good-morning",
    phase: "mobility",
    position: "debout",
    why: "Répète la charnière de hanche, dos plat, et délie l'arrière des cuisses.",
    dose: "10 répétitions",
    seconds: 40,
    variants: same({
      name: "Good morning au poids du corps",
      instructions: "Debout, genoux légèrement fléchis, mains sur les hanches. Recule les fesses dos plat jusqu'à sentir l'arrière des cuisses, puis reviens en serrant les fessiers.",
      figure: "prep-charniere-hanche",
    }),
  },
  "90-90": {
    id: "90-90",
    phase: "mobility",
    position: "sol",
    why: "Fait travailler les rotations de hanche dont le squat et les fentes ont besoin.",
    dose: "6 transitions",
    seconds: 40,
    variants: same({
      name: "Transitions de hanches 90/90",
      instructions: "Assis au sol, une jambe pliée à 90° devant, l'autre à 90° sur le côté. Bascule les deux genoux de l'autre côté, buste droit, en t'aidant des mains si besoin.",
      figure: "prep-90-90",
    }),
  },
  "pronation-supination": {
    id: "pronation-supination",
    phase: "mobility",
    position: "debout",
    why: "Prépare coudes et avant-bras aux prises et aux flexions.",
    dose: "6 cycles par côté",
    seconds: 35,
    variants: same({
      name: "Pronation-supination des avant-bras",
      instructions: "Coude fléchi à 90°, collé au corps. Tourne lentement la paume vers le haut puis vers le bas, sur toute l'amplitude.",
      figure: "cib-coudes-pronation-supination",
    }),
  },
  "pompes-scapulaires": {
    id: "pompes-scapulaires",
    phase: "activation",
    position: "appui",
    why: "Réveille le dentelé, qui plaque l'omoplate contre les côtes en fin de poussée.",
    dose: "10 répétitions",
    seconds: 35,
    variants: {
      gym: {
        name: "Pompes scapulaires sur banc",
        instructions: "Mains sur un banc, bras tendus, corps gainé. Sans plier les coudes, laisse les omoplates se rapprocher puis repousse le banc pour les écarter.",
        figure: "act-pecs-iso",
        needs: "un banc",
      },
      band: {
        name: "Pompes scapulaires contre un mur",
        instructions: "Mains au mur à hauteur d'épaules, bras tendus, pieds reculés. Sans plier les coudes, laisse les omoplates se rapprocher puis repousse le mur pour les écarter.",
        figure: "prep-pompes-scap-mur",
        needs: "un mur",
      },
      none: {
        name: "Pompes scapulaires contre un mur",
        instructions: "Mains au mur à hauteur d'épaules, bras tendus, pieds reculés. Sans plier les coudes, laisse les omoplates se rapprocher puis repousse le mur pour les écarter.",
        figure: "prep-pompes-scap-mur",
        needs: "un mur",
      },
    },
    avoid: ["poignets"],
  },
  "rotation-externe": {
    id: "rotation-externe",
    phase: "activation",
    position: "debout",
    why: "La coiffe des rotateurs centre la tête de l'épaule quand les bras poussent.",
    dose: "10 par côté",
    seconds: 50,
    variants: {
      gym: {
        name: "Rotation externe à la poulie, coude au corps",
        instructions: "Poulie à hauteur de coude, de côté. Coude plié à 90° collé au corps, ouvre l'avant-bras vers l'extérieur puis reviens lentement. Charge très légère.",
        figure: "act-epaules-rotation-coiffe",
        demo: "rotation-externe-poulie",
        needs: "une poulie",
      },
      band: {
        name: "Rotation externe à l'élastique, coude au corps",
        instructions: "Élastique fixé à hauteur de coude, de côté. Coude plié à 90° collé au corps, ouvre l'avant-bras vers l'extérieur puis reviens lentement.",
        figure: "act-epaules-rotation-coiffe",
        needs: "un point d'ancrage",
      },
      // Sans résistance, la rotation debout ne travaille pas : la version allongée
      // sur le côté utilise le poids de l'avant-bras.
      none: "rotation-externe-cote",
    },
  },
  "rotation-externe-cote": {
    id: "rotation-externe-cote",
    phase: "activation",
    position: "sol",
    why: "Fait travailler la coiffe des rotateurs contre le poids de l'avant-bras, sans matériel.",
    dose: "10 par côté",
    seconds: 55,
    variants: same({
      name: "Rotation externe allongé sur le côté",
      instructions: "Allongé sur le côté, coude du dessus collé au flanc et plié à 90°. Monte l'avant-bras vers le plafond sans décoller le coude, puis redescends lentement.",
      figure: "prep-rotation-externe-cote",
    }),
  },
  "face-pull": {
    id: "face-pull",
    phase: "activation",
    position: "debout",
    why: "Réveille l'arrière des épaules et les muscles qui serrent les omoplates.",
    dose: "12 répétitions",
    seconds: 40,
    variants: {
      gym: {
        name: "Face pull à la corde, poulie haute",
        instructions: "Corde à la poulie haute. Tire vers le visage en écartant les mains, coudes hauts et vers l'extérieur, omoplates serrées, puis reviens lentement. Charge légère.",
        figure: "act-dos-face-pull-elastique",
        demo: "face-pull-poulie",
        needs: "une poulie",
      },
      band: {
        name: "Face pull à l'élastique",
        instructions: "Élastique fixé à hauteur du visage. Tire vers le visage en écartant les mains, coudes hauts et vers l'extérieur, omoplates serrées, puis reviens lentement.",
        figure: "act-dos-face-pull-elastique",
        needs: "un point d'ancrage",
      },
      // Pas d'équivalent sans résistance : on propose un autre exercice, nommé tel quel.
      none: "w-allonge",
    },
  },
  "w-allonge": {
    id: "w-allonge",
    phase: "activation",
    position: "sol",
    why: "Sans matériel, travaille l'arrière des épaules et le bas des trapèzes contre la gravité.",
    dose: "10 répétitions",
    seconds: 40,
    variants: same({
      name: "W allongé sur le ventre",
      instructions: "Allongé sur le ventre, bras en W, coudes pliés. Décolle coudes et mains du sol en serrant les omoplates vers le bas, tiens deux secondes, repose.",
      figure: "prep-w-sol",
    }),
  },
  "glute-bridge": {
    id: "glute-bridge",
    phase: "activation",
    position: "sol",
    why: "Des fessiers actifs prennent le relais du bas du dos dans les extensions de hanche.",
    dose: "10 répétitions",
    seconds: 35,
    variants: same({
      name: "Glute bridge (pont fessier)",
      instructions: "Allongé sur le dos, pieds à plat, genoux fléchis. Pousse le bassin vers le plafond en serrant les fessiers, tiens une seconde en haut, redescends.",
      figure: "act-fessiers-pont",
    }),
  },
  mollets: {
    id: "mollets",
    phase: "activation",
    position: "debout",
    why: "Prépare mollets et tendons d'Achille, sollicités dans tous les gestes de jambes.",
    dose: "12 répétitions",
    seconds: 35,
    variants: same({
      name: "Élévations de mollets debout, avec appui",
      instructions: "Debout, une main en appui sur un mur ou un rack. Monte sur la pointe des pieds, tiens une seconde, redescends lentement.",
      figure: "cib-chevilles-montees-pointe",
      needs: "un appui",
    }),
  },
  "dead-bug": {
    id: "dead-bug",
    phase: "activation",
    position: "sol",
    why: "Apprend à gainer le tronc en respirant, bas du dos stable.",
    dose: "5 par côté",
    seconds: 45,
    variants: same({
      name: "Dead bug",
      instructions: "Allongé sur le dos, bras vers le plafond, hanches et genoux à 90°, bas du dos au contact du sol. Abaisse bras et jambe opposés sans que le dos décolle, reviens, alterne.",
      figure: "act-core-dead-bug",
    }),
  },
  "bird-dog": {
    id: "bird-dog",
    phase: "activation",
    position: "quadrupedie",
    why: "Gainage et stabilité du bassin pendant que bras et jambe bougent.",
    dose: "5 par côté",
    seconds: 45,
    variants: same({
      name: "Bird dog",
      instructions: "À quatre pattes, dos plat. Tends le bras et la jambe opposés en ligne, tiens deux secondes sans que le bassin bascule, reviens, alterne.",
      figure: "act-core-bird-dog",
    }),
  },
  "curl-marteau": {
    id: "curl-marteau",
    phase: "activation",
    position: "debout",
    why: "Quelques flexions très légères préparent biceps et tendons du coude avant de tirer.",
    dose: "10 répétitions",
    seconds: 30,
    variants: {
      gym: {
        name: "Curl marteau très léger, haltères",
        instructions: "Haltères très légers, paumes face à face. Fléchis les coudes sans balancer le buste, redescends lentement. Aucune fatigue recherchée.",
        figure: "curl-marteau",
        needs: "deux haltères légers",
      },
      band: {
        name: "Curl marteau à l'élastique",
        instructions: "Élastique sous les pieds, prise neutre (paumes face à face). Fléchis les coudes sans balancer le buste, redescends lentement.",
        figure: "act-bras-curl-elastique",
      },
      none: "flexion-coude",
    },
  },
  "extension-triceps": {
    id: "extension-triceps",
    phase: "activation",
    position: "debout",
    why: "Quelques extensions faciles préparent le triceps et le coude avant de pousser.",
    dose: "10 répétitions",
    seconds: 30,
    variants: {
      gym: {
        name: "Extension triceps à la poulie, corde",
        instructions: "Corde à la poulie haute, coudes collés au corps. Tends les bras vers le bas, reviens lentement. Charge très légère.",
        figure: "act-bras-pushdown-elastique",
        demo: "extension-triceps-poulie",
        needs: "une poulie",
      },
      band: {
        name: "Extension triceps à l'élastique",
        instructions: "Élastique fixé en hauteur, coudes collés au corps. Tends les bras vers le bas, reviens lentement.",
        figure: "act-bras-pushdown-elastique",
        needs: "un point d'ancrage",
      },
      none: "flexion-coude",
    },
  },
  // Remplaçants proposés par ↻ sur un exercice (lib/routines.ts, ALTERNATIVES) ; images déjà existantes.
  "cercles-epaule": ex("cercles-epaule", "mobility", "debout", "Explore toute l'amplitude de l'épaule, sans charge.", "5 par sens et par côté", 60, "Cercles d'épaule lents", "Bras tendu, dessine le plus grand cercle possible, très lentement, le reste du corps immobile. Réduis le cercle là où ça tire.", "prep-epaules-cars"),
  "essuie-glaces": ex("essuie-glaces", "mobility", "sol", "Fait tourner le bas du dos et les hanches en douceur.", "8 par côté", 45, "Essuie-glaces des jambes", "Allongé sur le dos, genoux pliés, laisse tomber les deux genoux d'un côté puis de l'autre, épaules au sol.", "art-lombaires-essuie-glace"),
  "rotations-chevilles": ex("rotations-chevilles", "mobility", "debout", "Remet la cheville en mouvement dans toutes les directions.", "10 par sens et par côté", 50, "Rotations de chevilles", "Pied décollé du sol, dessine de grands cercles lents avec la pointe du pied.", "art-chevilles"),
  "rotations-poignets": ex("rotations-poignets", "mobility", "debout", "Prépare les poignets, qui tiennent la charge à chaque répétition.", "10 par sens", 40, "Rotations des poignets", "Doigts entrecroisés, dessine de grands cercles lents avec les poignets.", "art-poignets"),
  "fente-basse": ex("fente-basse", "mobility", "sol", "Ouvre l'avant de la hanche, souvent raide quand on reste assis.", "5 respirations par côté", 50, "Fente basse, genou au sol", "Un genou au sol, l'autre pied devant, avance doucement le bassin jusqu'à sentir l'avant de la hanche s'étirer.", "cib-hanches-fente-rotation"),
  "squat-profond-rebond": { ...ex("squat-profond-rebond", "mobility", "debout", "Ouvre chevilles, genoux et hanches dans la position du squat.", "8 répétitions", 40, "Squat profond au poids du corps", "Pieds largeur d'épaules, descends aussi bas que possible, talons au sol, mains jointes devant la poitrine. Reste une seconde en bas, remonte sans à-coup.", "art-squat-profond-rebond"), avoid: ["genou"] },
  retraction: ex("retraction", "activation", "debout", "Apprend à l'omoplate à se placer avant de pousser ou de tirer.", "2 × 10, tenir 2 s", 60, "Rétraction des omoplates, bras tendus", "Debout, bras tendus devant toi à hauteur d'épaules. Sans plier les coudes, recule les épaules pour rapprocher les omoplates, sans les hausser, tiens 2 secondes, relâche.", "rehab-retraction-bras-tendus"),
  "y-t": ex("y-t", "activation", "debout", "Réveille le bas des trapèzes, qui stabilise l'omoplate.", "2 × 8 répétitions", 60, "Y-T debout", "Debout, pouces vers l'arrière, monte les bras en Y au-dessus de la tête puis ouvre-les en T à hauteur d'épaules, en serrant les omoplates. Lentement, sans hausser les épaules.", "cib-epaule-yt-sol"),
  "flexion-coude": ex("flexion-coude", "activation", "debout", "Réchauffe biceps, triceps et tendons du coude, sans charge.", "2 × 12 par côté, poing serré", 45, "Flexions-extensions du coude", "Poing serré, plie et tends le coude lentement en contractant le bras, sans forcer en fin d'extension.", "art-coudes"),
  "planche-laterale": ex("planche-laterale", "activation", "sol", "Gaine le côté du tronc, qui stabilise le bas du dos.", "2 × 15 s par côté", 60, "Planche latérale, genoux au sol", "Sur un coude, genoux pliés au sol, monte le bassin pour aligner épaule, hanche et genou. Respire.", "prep-planche-laterale"),
  clamshell: ex("clamshell", "activation", "sol", "Réveille le moyen fessier, qui stabilise hanche et genou.", "12 par côté", 50, "Coquillage (clamshell)", "Allongé sur le côté, genoux pliés, pieds joints : ouvre le genou du dessus sans faire rouler le bassin, referme lentement.", "prep-clamshell"),
  "ouverture-hanche": ex("ouverture-hanche", "activation", "quadrupedie", "Active les rotateurs de hanche, sans charge.", "8 par côté", 45, "Ouverture de hanche à quatre pattes", "À quatre pattes, ouvre le genou plié sur le côté sans tourner le buste, redescends lentement.", "cib-hanches-fire-hydrant"),
  "montee-marche": { ...ex("montee-marche", "activation", "debout", "Sollicite mollet, cuisse et contrôle du genou en un seul geste.", "8 par côté", 50, "Montée de marche contrôlée", "Sur une marche basse, monte en poussant dans le talon, genou dans l'axe du pied, redescends en 3 secondes.", "cib-genou-step-up", "Une marche ou un step"), avoid: ["genou"] },
};
