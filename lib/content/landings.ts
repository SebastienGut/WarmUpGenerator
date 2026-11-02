// Pages d'atterrissage « échauffement + zone » : chacune répond à une recherche
// réellement tapée (suggestions Google, octobre 2026) et place l'outil, prêt à
// l'emploi, au-dessus de l'explication.

import type { Equipment } from "@/lib/bank";
import { buildSessionPlan } from "@/lib/session-engine";
import type { MuscleGroup } from "@/lib/warmup-data";

export interface Landing {
  slug: string;
  zones: MuscleGroup[];
  /** Exercice dont le pictogramme illustre la page. */
  cover: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  /** Réponse autoportante, 40 à 60 mots, citable hors contexte. */
  keyAnswer: string;
  /** Les trois choses que la zone exige, en clair. */
  needs: { title: string; body: string }[];
  section?: { title: string; paragraphs: string[] };
  faqs: { q: string; a: string }[];
  related: string[];
  /** Séance type dont la page affiche la routine de référence ; sinon, composition des zones. */
  template?: string;
  /** Matériel imposé par la page (« sans matériel », « épaules » avec élastique) ; sinon, celui de l'appareil. */
  equipment?: Equipment;
}

const ETIREMENTS = {
  q: "Faut-il s'étirer avant la musculation ?",
  a: "Pas en étirement statique long. Tenir un étirement plus de 60 secondes juste avant l'effort peut réduire un peu la force ; des étirements courts ont un effet négligeable. Avant la séance, on privilégie la mobilité dynamique (des mouvements contrôlés dans toute l'amplitude) et l'activation ; les étirements longs se font après la séance ou un autre jour.",
};
const DUREE = {
  q: "Combien de temps doit durer l'échauffement ?",
  a: "Quatre à sept minutes de préparation suffisent avant une séance de musculation : quelques mouvements de mobilité, puis l'activation des muscles qui stabilisent les articulations du jour. Ensuite, la vraie montée en température se fait sur ton premier exercice, avec des séries d'approche de plus en plus lourdes.",
};

const RAW: Record<string, Landing> = {
  "haut-du-corps": {
    slug: "haut-du-corps",
    zones: ["pecs", "dos", "epaules"],
    template: "haut",
    cover: "developpe-militaire",
    metaTitle: "Échauffement haut du corps (muscu) : la routine en {min} min",
    metaDescription:
      "L'échauffement haut du corps prêt à suivre : épaules, haut du dos et omoplates en {min} minutes, avec ou sans élastique. Animations et mode guidé, gratuit.",
    h1: "Échauffement haut du corps",
    kicker: "Pecs, dos, épaules, {min} minutes",
    keyAnswer:
      "Un échauffement du haut du corps en musculation tient en {min} minutes : cat-cow et rotation thoracique à quatre pattes pour mobiliser la colonne et le haut du dos, puis pompes scapulaires pour le dentelé, rotation externe pour la coiffe des rotateurs et face pull pour l'arrière de l'épaule. Les épaules sont alors prêtes pour les développés comme pour les tirages.",
    needs: [
      { title: "Des épaules qui montent librement", body: "Développés et tirages verticaux demandent de passer les bras au-dessus de la tête sans cambrer le bas du dos." },
      { title: "Un haut du dos mobile", body: "La rotation et l'extension du haut du dos donnent de la place à l'épaule ; un dos raide, c'est l'épaule qui compense." },
      { title: "Des omoplates et une coiffe réveillées", body: "Ce sont elles qui gardent la tête de l'humérus centrée quand la charge arrive." },
    ],
    section: {
      title: "Avec ou sans élastique",
      paragraphs: [
        "À la salle, la rotation externe et le face pull se font à la poulie ; avec un élastique, la même chose à l'élastique. Sans matériel, ils sont remplacés par la rotation externe allongé sur le côté et le W allongé sur le ventre, qui travaillent les mêmes muscles. Choisis ton matériel au-dessus de la routine.",
        "Avant un développé couché ou un développé militaire lourd, enchaîne ensuite sur des séries d'approche : la barre seule, puis des paliers de plus en plus lourds sur l'exercice lui-même.",
      ],
    },
    faqs: [
      { q: "Quels exercices pour s'échauffer le haut du corps ?", a: "Cat-cow et rotation thoracique pour la mobilité, puis trois exercices d'activation : pompes scapulaires, rotation externe et face pull. Chacun a sa variante selon ton matériel (poulie, élastique ou poids du corps)." },
      DUREE,
      { q: "Faut-il un élastique pour s'échauffer le haut du corps ?", a: "Non. Il rend l'activation de l'arrière de l'épaule plus facile à doser, mais sans matériel la routine passe à la rotation externe allongé sur le côté et au W allongé sur le ventre." },
      ETIREMENTS,
    ],
    related: ["push", "pull", "epaules", "pecs", "dos"],
  },
  "bas-du-corps": {
    slug: "bas-du-corps",
    zones: ["jambes", "fessiers", "core"],
    template: "bas",
    cover: "souleve-de-terre",
    metaTitle: "Échauffement bas du corps (muscu) : la routine en {min} min",
    metaDescription:
      "L'échauffement bas du corps prêt à suivre : chevilles, hanches, fessiers et gainage en {min} minutes avant squat ou soulevé de terre. Animations et mode guidé.",
    h1: "Échauffement bas du corps",
    kicker: "Jambes, fessiers, gainage, {min} minutes",
    keyAnswer:
      "Un échauffement du bas du corps en musculation tient en {min} minutes : mobilisation de cheville genou au mur, squat profond assisté et good morning au poids du corps pour la mobilité, puis glute bridge pour les fessiers et dead bug pour le gainage. Il se fait sans matériel, et se termine par les séries d'approche sur ton premier exercice.",
    needs: [
      { title: "Des chevilles qui laissent passer le genou", body: "Une cheville raide oblige à pencher le buste ou à décoller les talons au squat." },
      { title: "Des hanches mobiles dans tous les sens", body: "Flexion profonde pour le squat, charnière pour le soulevé de terre, rotation pour garder les genoux dans l'axe." },
      { title: "Des fessiers et un gainage actifs", body: "Ils tiennent le genou aligné et le bas du dos neutre quand la charge pèse." },
    ],
    section: {
      title: "Avant le squat ou le soulevé de terre",
      paragraphs: [
        "L'échauffement prépare la zone ; la montée en charge prépare le geste. Après ces {min} minutes, fais tes séries d'approche sur ton premier exercice : la barre seule, puis trois à cinq paliers jusqu'à ta charge de travail.",
      ],
    },
    faqs: [
      { q: "Quels exercices pour s'échauffer le bas du corps ?", a: "La mobilisation de cheville au mur, le squat profond assisté et le good morning au poids du corps, puis le glute bridge et le dead bug. Cinq exercices, dans un ordre qui limite les passages au sol." },
      DUREE,
      { q: "Comment protéger ses genoux à l'échauffement ?", a: "En préparant la cheville et la hanche, souvent responsables de la douleur au genou, et en activant les fessiers qui gardent le genou dans l'axe du pied. Si un genou est sensible, coche « Genou » dans l'outil : il retire le squat profond et t'oriente vers le guide genou." },
      ETIREMENTS,
    ],
    related: ["jambes", "fessiers", "full-body", "core"],
  },
  "full-body": {
    slug: "full-body",
    zones: ["pecs", "dos", "jambes", "fessiers"],
    template: "full",
    cover: "kettlebell-swing",
    metaTitle: "Échauffement full body : la routine complète en {min} min",
    metaDescription:
      "L'échauffement full body prêt à suivre : épaules, hanches, chevilles, fessiers en {min} minutes avant une séance complète. Version courte {court} min, mode guidé.",
    h1: "Échauffement full body",
    kicker: "Tout le corps, {min} minutes",
    keyAnswer:
      "Un échauffement full body tient en {min} minutes : mobilisation de cheville au mur, squat profond assisté et good morning pour le bas du corps, puis face pull, rotation externe et pompes scapulaires pour les épaules, et un dead bug pour le gainage. Sept exercices aux doses réduites, pour tout préparer sans fatiguer.",
    needs: [
      { title: "Des doses réduites", body: "Sept exercices, c'est le plafond : chacun est dosé un peu plus bas que dans une séance ciblée, pour préparer sans fatiguer." },
      { title: "Le haut et le bas préparés", body: "Épaules et haut du dos pour les poussées et tirages, hanches et chevilles pour les squats et les charnières." },
      { title: "Un gainage réveillé", body: "C'est lui qui transmet la force entre le haut et le bas dans les mouvements composés." },
    ],
    faqs: [
      { q: "Comment s'échauffer avant une séance full body ?", a: "Commence par le bas du corps debout (cheville au mur, squat profond assisté, good morning), enchaîne avec les épaules (face pull, rotation externe, pompes scapulaires) et termine par un dead bug au sol. Puis passe aux séries d'approche de ton premier exercice." },
      { q: "Existe-t-il un échauffement full body en 5 minutes ?", a: "Oui : active « Version courte » au-dessus. Elle garde les quatre premiers exercices de la routine, pour environ {court} minutes." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["haut-du-corps", "bas-du-corps", "sans-materiel"],
  },
  push: {
    slug: "push",
    zones: ["pecs", "epaules", "bras"],
    template: "push",
    cover: "developpe-couche",
    metaTitle: "Échauffement push day : pecs, épaules, triceps en {min} min",
    metaDescription:
      "L'échauffement push day prêt à suivre avant développé couché et développé militaire : épaules, omoplates, coudes en {min} minutes. Animations, mode guidé.",
    h1: "Échauffement push day",
    kicker: "Pecs, épaules, triceps, {min} minutes",
    keyAnswer:
      "Avant une séance push (développé couché, développé militaire, dips), l'échauffement prépare l'épaule avant tout : un cat-cow pour mobiliser la colonne, puis pompes scapulaires pour le dentelé, rotation externe pour la coiffe des rotateurs et face pull pour l'arrière de l'épaule. Compte {min} minutes, puis les séries d'approche sur ton premier exercice.",
    needs: [
      { title: "Une épaule stable sous la charge", body: "La coiffe des rotateurs et les muscles des omoplates gardent l'épaule centrée pendant les développés." },
      { title: "Un haut du dos qui s'ouvre", body: "Une bonne extension thoracique permet de garder les omoplates serrées sur le banc et de pousser au-dessus de la tête sans cambrer." },
      { title: "Des coudes et des poignets prêts", body: "Les triceps et les dips mettent les coudes sous tension : les séries d'approche du premier exercice les préparent." },
    ],
    faqs: [
      { q: "Comment s'échauffer avant le développé couché ?", a: "Préparer l'épaule (cat-cow, pompes scapulaires, rotation externe, face pull), puis faire des séries d'approche sur le développé couché lui-même, de la barre seule jusqu'à la charge de travail." },
      DUREE,
      { q: "Et si j'ai mal à l'épaule au développé couché ?", a: "Coche « Épaule » dans l'outil : il te rappelle de garder la gêne faible et t'oriente vers le guide douleur à l'épaule au développé couché, pour comprendre d'où elle vient." },
      ETIREMENTS,
    ],
    related: ["pull", "haut-du-corps", "pecs", "epaules"],
  },
  pull: {
    slug: "pull",
    zones: ["dos", "bras"],
    template: "pull",
    cover: "tractions",
    metaTitle: "Échauffement pull day : dos et biceps en {min} min",
    metaDescription:
      "L'échauffement pull day prêt à suivre avant tractions et rowing : omoplates, haut du dos, coudes en {min} minutes. Pictogrammes animés et mode guidé.",
    h1: "Échauffement pull day",
    kicker: "Dos, biceps, {min} minutes",
    keyAnswer:
      "Avant une séance pull (tractions, rowing, tirages), l'échauffement prépare le dos et les épaules : cat-cow, rotation thoracique et wall slides pour la mobilité, puis face pull pour l'arrière de l'épaule et un curl marteau très léger pour les biceps et les coudes. Compte environ {min} minutes avant les séries d'approche.",
    needs: [
      { title: "Des omoplates qui démarrent le mouvement", body: "Une traction ou un rowing commence par abaisser et rapprocher les omoplates, avant de plier les coudes." },
      { title: "Des épaules libres au-dessus de la tête", body: "Les tractions et tirages verticaux partent bras tendus au-dessus de la tête." },
      { title: "Des coudes préparés", body: "Les biceps et les tendons du coude encaissent beaucoup au pull day : un curl marteau très léger les prépare sans les fatiguer." },
    ],
    faqs: [
      { q: "Comment s'échauffer avant les tractions ?", a: "Mobilise le haut du dos et les épaules (rotation thoracique, wall slides), active l'arrière de l'épaule (face pull), puis fais une ou deux séries faciles de tractions, ou de tirage vertical léger, avant tes séries de travail." },
      DUREE,
      { q: "Faut-il échauffer les biceps séparément ?", a: "Une série de curl marteau très léger suffit, et la routine pull l'inclut. Sans matériel, il n'y a pas d'équivalent fiable : les premières séries de tirage, légères, font ce travail." },
      ETIREMENTS,
    ],
    related: ["push", "dos", "bras", "haut-du-corps"],
  },
  "sans-materiel": {
    slug: "sans-materiel",
    zones: ["pecs", "dos", "jambes", "fessiers"],
    template: "full",
    equipment: "none",
    cover: "art-squat-profond-rebond",
    metaTitle: "Échauffement musculation sans matériel : {min} min, tout le corps",
    metaDescription:
      "Un échauffement musculation sans aucun matériel, au poids du corps : mobilité et activation de tout le corps en {min} minutes. Animations, mode guidé, gratuit.",
    h1: "Échauffement musculation sans matériel",
    kicker: "Poids du corps, tout le corps, {min} minutes",
    keyAnswer:
      "Un échauffement musculation sans matériel se fait au poids du corps, avec un mur : mobilisation de cheville, squat profond assisté et good morning, puis W allongé sur le ventre et rotation externe allongé sur le côté pour les épaules, pompes scapulaires contre un mur et dead bug. {min} minutes suffisent, à la salle comme à la maison.",
    needs: [
      { title: "Le poids du corps suffit", body: "La mobilité et l'activation n'ont pas besoin de charge : l'objectif est de préparer, pas de fatiguer." },
      { title: "Un mur et un bout de sol", body: "C'est tout ce qu'il faut pour la cheville au mur, les pompes scapulaires et les exercices au sol." },
      { title: "Des versions de remplacement", body: "Le face pull n'a pas d'équivalent au poids du corps : il est remplacé par le W allongé, qui travaille les mêmes muscles, et l'outil l'indique." },
    ],
    faqs: [
      { q: "Peut-on bien s'échauffer sans matériel ?", a: "Oui pour la mobilité et presque toute l'activation (squat profond assisté, good morning, pompes scapulaires, dead bug). Seuls le face pull et les exercices de bras n'ont pas d'équivalent exact : la routine les remplace ou les retire, sans le cacher." },
      DUREE,
      { q: "Quel échauffement sans matériel pour le haut du corps ?", a: "Cat-cow, rotation thoracique à quatre pattes, pompes scapulaires contre un mur, rotation externe allongé sur le côté et W allongé sur le ventre. Choisis « Sans matériel » sur la page échauffement haut du corps." },
      ETIREMENTS,
    ],
    related: ["full-body", "haut-du-corps", "bas-du-corps"],
  },
  pecs: {
    slug: "pecs",
    zones: ["pecs"],
    cover: "developpe-couche",
    metaTitle: "Échauffement pectoraux : la routine avant les pecs ({min} min)",
    metaDescription:
      "L'échauffement pectoraux prêt à suivre avant développé couché ou incliné : épaules, omoplates, haut du dos en {min} minutes, avec ou sans élastique.",
    h1: "Échauffement pectoraux",
    kicker: "Avant développé couché, incliné, écartés",
    keyAnswer:
      "Avant une séance pectoraux, on échauffe surtout l'épaule : un cat-cow pour mobiliser la colonne, des pompes scapulaires pour le dentelé et une rotation externe pour la coiffe des rotateurs. {min} minutes suffisent, avant les séries d'approche sur le développé couché, qui préparent le muscle lui-même.",
    needs: [
      { title: "L'épaule avant le muscle", body: "Les pecs se chauffent tout seuls pendant les premières séries ; l'épaule, elle, a besoin d'être préparée." },
      { title: "Des omoplates serrées et stables", body: "Sur le banc, les omoplates rapprochées protègent l'épaule et donnent une base solide." },
      { title: "Un haut du dos qui s'ouvre", body: "Il permet de garder la poitrine haute sans forcer sur le bas du dos." },
    ],
    faqs: [
      { q: "Comment s'échauffer les pecs ?", a: "Pas avec des pompes jusqu'à la fatigue : avec un peu de mobilité, puis les pompes scapulaires et la rotation externe pour stabiliser l'épaule. Le muscle pectoral se prépare ensuite avec les séries d'approche sur ton premier exercice." },
      DUREE,
      { q: "Un échauffement pecs avec élastique ?", a: "Choisis « Élastique » au-dessus de la routine : la rotation externe se fait alors à l'élastique, coude au corps, avec une résistance très légère." },
      ETIREMENTS,
    ],
    related: ["push", "epaules", "haut-du-corps"],
  },
  dos: {
    slug: "dos",
    zones: ["dos"],
    cover: "rowing-barre",
    metaTitle: "Échauffement dos (musculation) : la routine en {min} min",
    metaDescription:
      "L'échauffement dos prêt à suivre avant tractions, rowing et tirages : omoplates, haut du dos, charnière de hanche en {min} minutes. Animations et mode guidé.",
    h1: "Échauffement dos",
    kicker: "Avant tractions, rowing, tirages",
    keyAnswer:
      "Avant une séance dos en musculation, l'échauffement prépare les omoplates et le haut du dos : wall slides, cat-cow et rotation thoracique à quatre pattes pour la mobilité, puis face pull pour l'arrière de l'épaule. Pour le rowing penché ou le soulevé de terre, ajoute la zone Jambes : le good morning prépare la charnière de hanche.",
    needs: [
      { title: "Des omoplates qui bougent bien", body: "Tous les tirages commencent par elles ; un dos qui tire « avec les bras » travaille mal." },
      { title: "Un haut du dos mobile", body: "La rotation et l'extension thoracique libèrent l'épaule pour les tirages verticaux." },
      { title: "Une charnière de hanche maîtrisée", body: "Le rowing penché se fait buste incliné, dos plat : il demande des ischios et un bas du dos prêts." },
    ],
    faqs: [
      { q: "Comment s'échauffer le dos avant la musculation ?", a: "Avec des wall slides, un cat-cow et une rotation thoracique pour la mobilité, puis un face pull pour l'activation. Si ta séance contient du rowing penché ou du soulevé de terre, ajoute un good morning au poids du corps." },
      { q: "Comment s'échauffer avec un mal de dos ?", a: "Coche « Bas du dos » dans l'outil : il te rappelle de garder la gêne faible et t'oriente vers le guide lombaires. Une douleur qui irradie dans la jambe ou qui persiste demande un avis médical." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["pull", "haut-du-corps", "bras"],
  },
  epaules: {
    slug: "epaules",
    zones: ["epaules"],
    cover: "developpe-militaire",
    equipment: "band",
    metaTitle: "Échauffement épaules (élastique ou sans) : routine {min} min",
    metaDescription:
      "L'échauffement épaules prêt à suivre, avec élastique ou sans matériel : mobilité, coiffe des rotateurs et omoplates en {min} minutes. Animations et mode guidé.",
    h1: "Échauffement épaules",
    kicker: "Avec élastique ou sans matériel",
    keyAnswer:
      "Un échauffement des épaules efficace combine mobilité et activation : wall slides pour monter les bras sans cambrer, puis rotation externe coude au corps pour la coiffe des rotateurs et face pull pour l'arrière de l'épaule. Avec un élastique léger, l'activation est facile à doser ; sans matériel, rotation externe allongé sur le côté et W allongé les remplacent.",
    needs: [
      { title: "De l'amplitude au-dessus de la tête", body: "Développé militaire, tractions, élévations : l'épaule doit monter sans que le bas du dos se cambre pour compenser." },
      { title: "Une coiffe des rotateurs réveillée", body: "Ces petits muscles centrent l'humérus dans l'articulation ; ils fatiguent vite, d'où des séries légères." },
      { title: "Des omoplates qui suivent", body: "L'omoplate doit tourner avec le bras ; un serrage actif évite que l'épaule pince." },
    ],
    section: {
      title: "Échauffement épaules avec élastique",
      paragraphs: [
        "La routine ci-dessus est réglée avec élastique : rotation externe et face pull, avec une résistance très légère. Choisis « Sans matériel » ou « Salle » pour voir les variantes correspondantes.",
      ],
    },
    faqs: [
      { q: "Quel élastique pour s'échauffer les épaules ?", a: "Le plus léger possible : l'échauffement de la coiffe des rotateurs se fait avec une faible résistance et beaucoup de contrôle, sur 12 à 15 répétitions. Un élastique trop dur fait compenser le trapèze." },
      { q: "Comment s'échauffer les épaules sans matériel ?", a: "Wall slides, rotation externe allongé sur le côté et W allongé sur le ventre : ils couvrent la mobilité et l'activation sans élastique. Choisis « Sans matériel » au-dessus de la routine pour les voir." },
      { q: "Et si j'ai mal à l'épaule ?", a: "Coche « Épaule » dans l'outil : il te rappelle de garder la gêne faible et t'oriente vers le guide épaule. Une douleur la nuit ou une perte de force brutale demandent un avis médical." },
      DUREE,
    ],
    related: ["haut-du-corps", "push", "pecs"],
  },
  bras: {
    slug: "bras",
    zones: ["bras"],
    cover: "curl-biceps",
    metaTitle: "Échauffement bras : biceps, triceps, coudes en {min} min",
    metaDescription:
      "L'échauffement bras prêt à suivre avant biceps et triceps : coudes, poignets et épaules en quelques minutes. Pictogrammes animés et mode guidé, gratuit.",
    h1: "Échauffement bras",
    kicker: "Biceps, triceps, coudes",
    keyAnswer:
      "Avant une séance bras, l'échauffement vise les coudes et les poignets, très sollicités par les curls et les extensions : pronation-supination des avant-bras, puis un curl marteau très léger et une extension triceps légère, à la poulie, à l'haltère ou à l'élastique. Sans matériel, seule la mobilité reste : les séries d'approche font le reste.",
    needs: [
      { title: "Des coudes préparés", body: "Les tendons du coude encaissent les curls et les extensions : une série très légère de chaque les prépare." },
      { title: "Des poignets mobiles", body: "La prise sur la barre ou les haltères met les poignets en tension, surtout en supination." },
      { title: "Une épaule stable", body: "Elle tient le bras en place ; une épaule qui bouge fait tricher sur les curls." },
    ],
    faqs: [
      { q: "Faut-il s'échauffer avant de faire les bras ?", a: "Oui, surtout pour les coudes : quelques minutes de mobilité des avant-bras et des coudes, puis une série légère de 12 à 15 répétitions avant la première série de travail de chaque exercice." },
      { q: "Et si j'ai mal au coude au curl ?", a: "Coche « Coude » dans l'outil et consulte le guide douleur au coude au curl biceps. Une douleur persistante au coude demande d'adapter la charge et la prise." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["pull", "push", "haut-du-corps"],
  },
  jambes: {
    slug: "jambes",
    zones: ["jambes", "fessiers"],
    template: "legs",
    cover: "squat",
    metaTitle: "Échauffement jambes (leg day) : la routine en {min} min",
    metaDescription:
      "L'échauffement jambes prêt à suivre avant squat, presse et fentes : chevilles, hanches, genoux, fessiers en {min} minutes. Pictogrammes animés et mode guidé.",
    h1: "Échauffement jambes",
    kicker: "Leg day, avant squat, presse, fentes",
    keyAnswer:
      "Avant une séance jambes, l'échauffement prépare les chevilles, les hanches et les genoux : mobilisation de cheville genou au mur, squat profond assisté et good morning au poids du corps, puis glute bridge pour les fessiers et élévations de mollets. {min} minutes suffisent avant les séries d'approche sur le squat ou la presse.",
    needs: [
      { title: "Des chevilles mobiles", body: "Au squat, le genou doit pouvoir avancer au-dessus du pied sans que le talon décolle." },
      { title: "Des hanches qui descendent", body: "La flexion profonde de hanche permet de squatter bas en gardant le dos neutre." },
      { title: "Des genoux bien guidés", body: "Les fessiers gardent le genou dans l'axe du pied, surtout à la remontée." },
    ],
    faqs: [
      { q: "Comment s'échauffer pour le leg day ?", a: "Mobilisation de cheville au mur, squat profond assisté, good morning au poids du corps, puis glute bridge et élévations de mollets. Termine par des séries d'approche sur ton premier exercice, de la barre seule jusqu'à ta charge." },
      { q: "Comment s'échauffer les genoux avant le squat ?", a: "En préparant la cheville et la hanche, qui guident le genou, et en activant les fessiers. Si un genou est sensible, coche « Genou » dans l'outil et lis le guide douleur au genou au squat." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["bas-du-corps", "fessiers", "full-body"],
  },
  fessiers: {
    slug: "fessiers",
    zones: ["fessiers"],
    cover: "hip-thrust",
    metaTitle: "Échauffement fessiers : activation avant hip thrust et squat",
    metaDescription:
      "L'échauffement fessiers prêt à suivre : hanches et activation des fessiers en {min} minutes avant hip thrust, soulevé de terre roumain et fentes. Mode guidé.",
    h1: "Échauffement fessiers",
    kicker: "Avant hip thrust, soulevé roumain, fentes",
    keyAnswer:
      "Un échauffement fessiers combine mobilité de hanche et de l'arrière des cuisses (transitions 90/90, good morning au poids du corps) et activation ciblée avec le glute bridge. L'objectif est de sentir le fessier travailler avant la charge, pour qu'il prenne sa part dès la première série de hip thrust ou de fentes.",
    needs: [
      { title: "Des hanches mobiles", body: "Extension complète pour le hip thrust, flexion pour les fentes et le soulevé roumain." },
      { title: "Un fessier qui s'active", body: "Sans activation, les ischios et le bas du dos prennent souvent le relais." },
      { title: "Un moyen fessier réveillé", body: "C'est lui qui stabilise le bassin et le genou sur une jambe, aux fentes." },
    ],
    faqs: [
      { q: "Comment activer ses fessiers avant la séance ?", a: "Avec un glute bridge de 10 répétitions, en serrant les fessiers deux secondes en haut. Il s'agit de réveiller, pas de fatiguer : les séries d'approche du premier exercice font le reste." },
      DUREE,
      { q: "Faut-il un élastique pour activer les fessiers ?", a: "Non : la routine fessiers se fait entièrement au poids du corps." },
      ETIREMENTS,
    ],
    related: ["bas-du-corps", "jambes"],
  },
  core: {
    slug: "core",
    zones: ["core"],
    cover: "souleve-de-terre",
    metaTitle: "Échauffement gainage (core) avant squat et soulevé de terre",
    metaDescription:
      "L'échauffement du gainage prêt à suivre avant squat et soulevé de terre : bas du dos, abdominaux profonds et hanches en {min} minutes. Mode guidé, gratuit.",
    h1: "Échauffement gainage (core)",
    kicker: "Avant squat et soulevé de terre",
    keyAnswer:
      "Échauffer le gainage avant la musculation, c'est réveiller les muscles qui gardent le dos neutre sous la charge : un cat-cow pour mobiliser la colonne, puis bird dog et dead bug, deux exercices de gainage dynamique qui résistent à la rotation et à la cambrure. C'est utile avant un squat ou un soulevé de terre lourd.",
    needs: [
      { title: "Un dos qui reste neutre", body: "Sous la barre, le gainage empêche le dos de s'arrondir ou de se cambrer." },
      { title: "Des hanches libres", body: "Une hanche raide fait travailler le bas du dos à sa place." },
      { title: "De l'anti-rotation", body: "Résister à la torsion protège le dos dans les mouvements à une main ou une jambe." },
    ],
    faqs: [
      { q: "Faut-il faire du gainage avant le squat ?", a: "Un peu, oui : un ou deux exercices de gainage dynamique (dead bug, bird dog) réveillent les muscles profonds sans les fatiguer. Évite les longues planches qui épuisent avant la séance." },
      DUREE,
      { q: "Et si j'ai mal au bas du dos ?", a: "Coche « Bas du dos » dans l'outil : il te rappelle de garder la gêne faible et t'oriente vers le guide douleur au bas du dos au soulevé de terre." },
      ETIREMENTS,
    ],
    related: ["bas-du-corps", "dos", "full-body"],
  },
};

/** Durée réelle du plan affiché sur la page (moteur, version complète). */
export function landingMinutes(l: Pick<Landing, "zones" | "template" | "equipment">, short = false) {
  return buildSessionPlan({ zones: l.zones, template: l.template, lifts: [], pain: [], band: false, equipment: l.equipment ?? "gym", short, variant: 0 }).minutes;
}

// Les textes écrivent « {min} » (version complète) et « {court} » (version
// courte) : la durée annoncée est toujours celle du plan réellement affiché,
// même quand le moteur évolue.
function fill<T>(v: T, min: number, court: number): T {
  if (typeof v === "string") return v.replaceAll("{min}", String(min)).replaceAll("{court}", String(court)) as T;
  if (Array.isArray(v)) return v.map((x) => fill(x, min, court)) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fill(x, min, court)])) as T;
  return v;
}

export const LANDINGS: Record<string, Landing> = Object.fromEntries(
  Object.entries(RAW).map(([slug, l]) => [slug, fill(l, landingMinutes(l), landingMinutes(l, true))]),
);

export const LANDING_SLUGS = Object.keys(LANDINGS);
