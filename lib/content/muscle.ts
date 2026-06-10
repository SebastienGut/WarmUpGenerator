import type { MuscleGroup } from "@/lib/warmup-data";

// Contenu spécifique par muscle : anatomie, points faibles courants, priorités
// d'échauffement. Partagé entre les pages hub /echauffement/{muscle} et les
// pages /echauffement/{muscle}/{objectif} (anti near-duplicate).
export const MUSCLE_INSIGHTS: Record<MuscleGroup, string> = {
  pecs: `Particularité des <strong class='text-white'>pectoraux</strong> : ils ne travaillent jamais seuls. Chaque poussée sollicite l'articulation gléno-humérale, la coiffe des rotateurs et le grand dentelé — et c'est presque toujours l'épaule, pas le pec, qui lâche en premier. Un bon échauffement pecs est donc d'abord un échauffement d'épaule : mobilité thoracique pour permettre la rétraction scapulaire, activation de la coiffe pour stabiliser la tête humérale sous charge, puis seulement montée en charge progressive sur le mouvement de poussée.`,
  dos: `Particularité du <strong class='text-white'>dos</strong> : c'est la zone où la connexion neuro-musculaire est la plus difficile à établir. La plupart des pratiquants "tirent avec les bras" parce que leurs dorsaux et rhomboïdes ne sont pas réveillés. L'enjeu de cet échauffement n'est pas seulement thermique — c'est d'apprendre à tes omoplates à initier le mouvement (rétraction, dépression) avant que les coudes bougent. Quelques minutes d'activation scapulaire changent la qualité de toute la séance de tirage.`,
  epaules: `Particularité des <strong class='text-white'>épaules</strong> : l'articulation la plus mobile du corps est aussi la moins stable. Le deltoïde se charge vite, mais la coiffe des rotateurs (sus-épineux, infra-épineux, petit rond, sous-scapulaire) — qui centre la tête humérale pendant chaque élévation — répond lentement et a besoin d'un signal d'activation dédié. Sauter cette étape avant un développé militaire ou des élévations lourdes, c'est la recette des conflits sous-acromiaux qui traînent des mois.`,
  jambes: `Particularité des <strong class='text-white'>jambes</strong> : la qualité d'une séance se joue sur deux articulations que la plupart des gens n'échauffent jamais — la cheville et la hanche. Une dorsiflexion de cheville limitée interdit le squat profond et reporte le stress sur le genou ; une hanche figée force les lombaires à compenser. C'est pourquoi ce plan commence par la mobilité distale avant toute activation : débloquer les amplitudes d'abord, réveiller les muscles ensuite.`,
  fessiers: `Particularité des <strong class='text-white'>fessiers</strong> : ce sont les muscles les plus puissants du corps et les plus souvent "éteints". Des heures de position assise inhibent le grand fessier — phénomène d'inhibition réciproque par les fléchisseurs de hanche raccourcis. Résultat : sur le hip thrust ou le squat, les ischio et les lombaires font le travail à sa place. L'activation ciblée pré-séance (ponts, abductions) rétablit le recrutement avant la première barre.`,
  bras: `Particularité des <strong class='text-white'>bras</strong> : biceps et triceps croisent deux articulations chacun (épaule + coude), et le coude est une articulation de charnière qui tolère mal les départs à froid en flexion/extension chargée. Les tendinopathies du long biceps et l'épicondylite — les deux blessures classiques des séances bras — apparaissent presque toujours sur des tissus froids. Échauffer la rotation d'épaule et les poignets avant les curls et extensions n'est pas optionnel.`,
  core: `Particularité du <strong class='text-white'>core</strong> : son rôle en musculation n'est pas de produire du mouvement mais d'en empêcher — résister à l'extension, à la flexion latérale et à la rotation sous charge. L'échauffer, c'est donc réveiller cette fonction de gainage réflexe (transverse, obliques, multifides) et la coordination bassin-colonne, pas faire des crunchs. C'est le prérequis silencieux de tous tes exercices debout chargés, du soulevé de terre au développé militaire.`,
};

// Maillage interne : pages exercice/protection/combo les plus pertinentes par muscle
export const MUSCLE_CROSS_LINKS: Record<MuscleGroup, { href: string; label: string }[]> = {
  pecs: [
    { href: "/echauffement/exercice/developpe-couche", label: "Échauffement développé couché" },
    { href: "/echauffement/combo/push", label: "Échauffement Push (pecs, épaules, triceps)" },
  ],
  dos: [
    { href: "/echauffement/exercice/tractions", label: "Échauffement tractions" },
    { href: "/echauffement/exercice/rowing-barre", label: "Échauffement rowing barre" },
  ],
  epaules: [
    { href: "/echauffement/exercice/developpe-militaire", label: "Échauffement développé militaire" },
    { href: "/echauffement/protection/epaule-douleur", label: "Épaule sensible : protocole adapté" },
  ],
  jambes: [
    { href: "/echauffement/exercice/squat", label: "Échauffement avant le squat" },
    { href: "/echauffement/protection/genou", label: "Genou sensible : protocole adapté" },
  ],
  fessiers: [
    { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement soulevé de terre" },
    { href: "/echauffement/combo/bas-du-corps", label: "Échauffement bas du corps complet" },
  ],
  bras: [
    { href: "/echauffement/exercice/tractions", label: "Échauffement tractions" },
    { href: "/echauffement/protection/poignets", label: "Poignets fragiles : protocole adapté" },
  ],
  core: [
    { href: "/echauffement/protection/lombaires", label: "Lombaires sensibles : protocole adapté" },
    { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement soulevé de terre" },
  ],
};

// Données spécifiques aux pages hub /echauffement/{muscle}
export interface MuscleHubData {
  /** Exercices de séance typiques que ce plan prépare */
  sessionExamples: string;
  /** Zone sensible la plus associée à ce muscle */
  zone: { label: string; href: string; answer: string };
}

export const MUSCLE_HUB: Record<MuscleGroup, MuscleHubData> = {
  pecs: {
    sessionExamples:
      "développé couché (barre ou haltères), développé incliné, dips, écartés à la poulie, pompes lestées",
    zone: {
      label: "l'épaule",
      href: "/echauffement/protection/epaule-douleur",
      answer:
        "L'épaule est la première victime des séances pecs faites à froid. Si tu as une gêne ou une douleur d'épaule, utilise le protocole épaule sensible avant ta séance : il active la coiffe des rotateurs avec des mouvements thérapeutiques à faible charge, sans aggraver l'articulation.",
    },
  },
  dos: {
    sessionExamples:
      "tractions, rowing barre ou haltère, tirage vertical et horizontal, soulevé de terre, shrugs",
    zone: {
      label: "les lombaires",
      href: "/echauffement/protection/lombaires",
      answer:
        "Les séances dos chargent les lombaires sur le rowing et le soulevé de terre. Si ton bas du dos est sensible, fais d'abord le protocole lombaires : mobilisation du rachis, gainage anti-extension et pattern de charnière de hanche à vide.",
    },
  },
  epaules: {
    sessionExamples:
      "développé militaire, développé haltères, élévations latérales et frontales, oiseau, face pulls",
    zone: {
      label: "l'épaule",
      href: "/echauffement/protection/epaule-douleur",
      answer:
        "Une gêne d'épaule sur les développés ou les élévations vient le plus souvent d'une coiffe inactive ou d'un conflit sous-acromial naissant. Le protocole épaule sensible remplace alors cet échauffement : mêmes objectifs, mouvements plus doux et plus progressifs.",
    },
  },
  jambes: {
    sessionExamples:
      "squat, presse à cuisses, fentes, leg extension, leg curl, soulevé de terre roumain, mollets",
    zone: {
      label: "le genou",
      href: "/echauffement/protection/genou",
      answer:
        "Le genou souffre quand la hanche et la cheville ne font pas leur travail. Si tes genoux sont sensibles sur le squat ou la presse, utilise le protocole genou : il insiste sur la mobilité de hanche/cheville et l'activation fessière pour décharger l'articulation.",
    },
  },
  fessiers: {
    sessionExamples:
      "hip thrust, squat, soulevé de terre roumain, fentes bulgares, abductions à la machine ou élastique",
    zone: {
      label: "les lombaires",
      href: "/echauffement/protection/lombaires",
      answer:
        "Des fessiers mal activés laissent les lombaires compenser sur le hip thrust et le soulevé de terre roumain. Si ton bas du dos te le rappelle après chaque séance fessiers, ajoute le protocole lombaires avant celui-ci.",
    },
  },
  bras: {
    sessionExamples:
      "curl barre et haltères, curl marteau, extensions triceps (poulie, barre front), dips, tractions supination",
    zone: {
      label: "les poignets",
      href: "/echauffement/protection/poignets",
      answer:
        "Les poignets encaissent toutes les flexions/extensions chargées des séances bras. Si tu sens des pincements sur les curls ou les extensions, fais d'abord le protocole poignets : mobilité, étirements actifs et renforcement des stabilisateurs de l'avant-bras.",
    },
  },
  core: {
    sessionExamples:
      "planches et gainages lestés, ab wheel, relevés de jambes, pallof press, et tous les exercices debout chargés",
    zone: {
      label: "les lombaires",
      href: "/echauffement/protection/lombaires",
      answer:
        "Core et lombaires sont les deux faces de la même pièce. Si ton bas du dos est sensible, le protocole lombaires est la version douce de cet échauffement : mêmes patterns (dead bug, bird-dog), progression plus prudente.",
    },
  },
};
