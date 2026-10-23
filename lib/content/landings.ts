// Pages d'atterrissage « échauffement + zone » : chacune répond à une recherche
// réellement tapée (suggestions Google, octobre 2026) et place l'outil, prêt à
// l'emploi, au-dessus de l'explication.

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
  /** Élastique activé par défaut (page « épaules » : la recherche « élastique » est fréquente). */
  band?: boolean;
}

const ETIREMENTS = {
  q: "Faut-il s'étirer avant la musculation ?",
  a: "Pas en étirement statique long. Tenir une position d'étirement 30 secondes ou plus juste avant l'effort peut réduire temporairement la force. Avant la séance, on privilégie la mobilité dynamique (des mouvements contrôlés dans toute l'amplitude) et l'activation ; les étirements longs se font après la séance ou un autre jour.",
};
const DUREE = {
  q: "Combien de temps doit durer l'échauffement ?",
  a: "Cinq à dix minutes suffisent avant une séance de musculation : deux minutes pour faire monter la température, puis quelques mouvements de mobilité et d'activation ciblés. Avant un exercice lourd, ajoute ensuite des séries d'approche sur l'exercice lui-même, en montant progressivement la charge.",
};

export const LANDINGS: Record<string, Landing> = {
  "haut-du-corps": {
    slug: "haut-du-corps",
    zones: ["pecs", "dos", "epaules"],
    cover: "developpe-militaire",
    metaTitle: "Échauffement haut du corps (muscu) : la routine en 6 min",
    metaDescription:
      "L'échauffement haut du corps prêt à suivre : épaules, haut du dos et omoplates en 6 minutes, avec ou sans élastique. Animations et mode guidé, gratuit.",
    h1: "Échauffement haut du corps",
    kicker: "Pecs, dos, épaules, 6 minutes",
    keyAnswer:
      "Un bon échauffement du haut du corps en musculation dure environ six minutes : deux minutes de cardio léger, puis de la mobilité pour les épaules et le haut du dos (glissés au mur, rotation thoracique), et enfin l'activation des omoplates et de la coiffe des rotateurs, qui stabilisent l'épaule pendant les développés et les tirages.",
    needs: [
      { title: "Des épaules qui montent librement", body: "Développés et tirages verticaux demandent de passer les bras au-dessus de la tête sans cambrer le bas du dos." },
      { title: "Un haut du dos mobile", body: "La rotation et l'extension du haut du dos donnent de la place à l'épaule ; un dos raide, c'est l'épaule qui compense." },
      { title: "Des omoplates et une coiffe réveillées", body: "Ce sont elles qui gardent la tête de l'humérus centrée quand la charge arrive." },
    ],
    section: {
      title: "Avec ou sans élastique",
      paragraphs: [
        "Un élastique léger rend l'activation plus efficace (face pull, rotation externe, écartés), mais il n'est pas indispensable : chaque exercice a sa version au poids du corps. Active « Avec élastique » au-dessus pour voir la variante correspondante.",
        "Avant un développé couché ou un développé militaire lourd, enchaîne ensuite sur des séries d'approche : la barre seule, puis des paliers de plus en plus lourds sur l'exercice lui-même.",
      ],
    },
    faqs: [
      { q: "Quels exercices pour s'échauffer le haut du corps ?", a: "Des glissés au mur et une rotation thoracique pour la mobilité, puis des mouvements d'activation des omoplates et de la coiffe des rotateurs : Y-T, écartés à l'élastique, face pull ou tractions scapulaires. Le générateur choisit ceux qui couvrent le mieux pecs, dos et épaules, et les varie d'une séance à l'autre." },
      DUREE,
      { q: "Faut-il un élastique pour s'échauffer le haut du corps ?", a: "Non. Il rend l'activation de l'arrière de l'épaule plus facile à doser, mais tous les exercices proposés ont une version sans matériel, comme le serrage des omoplates ou les W allongé." },
      ETIREMENTS,
    ],
    related: ["push", "pull", "epaules", "pecs", "dos"],
  },
  "bas-du-corps": {
    slug: "bas-du-corps",
    zones: ["jambes", "fessiers", "core"],
    cover: "souleve-de-terre",
    metaTitle: "Échauffement bas du corps (muscu) : la routine en 6 min",
    metaDescription:
      "L'échauffement bas du corps prêt à suivre : chevilles, hanches, fessiers et gainage en 6 minutes avant squat ou soulevé de terre. Animations et mode guidé.",
    h1: "Échauffement bas du corps",
    kicker: "Jambes, fessiers, gainage, 6 minutes",
    keyAnswer:
      "Un échauffement du bas du corps en musculation dure environ six minutes : deux minutes de cardio léger, de la mobilité de cheville et de hanche (squat profond, charnière de hanche, squat cosaque), puis l'activation des fessiers et du gainage, qui protègent les genoux et le bas du dos pendant le squat et le soulevé de terre.",
    needs: [
      { title: "Des chevilles qui laissent passer le genou", body: "Une cheville raide oblige à pencher le buste ou à décoller les talons au squat." },
      { title: "Des hanches mobiles dans tous les sens", body: "Flexion profonde pour le squat, charnière pour le soulevé de terre, rotation pour garder les genoux dans l'axe." },
      { title: "Des fessiers et un gainage actifs", body: "Ils tiennent le genou aligné et le bas du dos neutre quand la charge pèse." },
    ],
    section: {
      title: "Avant le squat ou le soulevé de terre",
      paragraphs: [
        "L'échauffement prépare la zone ; la montée en charge prépare le geste. Après ces six minutes, fais tes séries d'approche sur ton premier exercice : la barre seule, puis trois à cinq paliers jusqu'à ta charge de travail.",
      ],
    },
    faqs: [
      { q: "Quels exercices pour s'échauffer le bas du corps ?", a: "Un squat profond contrôlé et une mobilité de cheville au mur, une charnière de hanche à vide, puis des exercices d'activation comme le pont fessier, le soulevé de terre sur une jambe ou l'extension en quadrupédie. Le générateur en sélectionne six et les varie." },
      DUREE,
      { q: "Comment protéger ses genoux à l'échauffement ?", a: "En préparant la cheville et la hanche, souvent responsables de la douleur au genou, et en activant les fessiers qui gardent le genou dans l'axe du pied. Si un genou est sensible, coche « Genou » dans l'outil : il retire ce qui est contre-indiqué et ajoute une préparation dédiée." },
      ETIREMENTS,
    ],
    related: ["jambes", "fessiers", "full-body", "core"],
  },
  "full-body": {
    slug: "full-body",
    zones: ["pecs", "dos", "jambes", "fessiers"],
    cover: "kettlebell-swing",
    metaTitle: "Échauffement full body : la routine complète en 6 min",
    metaDescription:
      "L'échauffement full body prêt à suivre : épaules, hanches, chevilles, fessiers en 6 minutes avant une séance complète. Version courte 4 min, mode guidé.",
    h1: "Échauffement full body",
    kicker: "Tout le corps, 6 minutes",
    keyAnswer:
      "Un échauffement full body efficace dure cinq à six minutes : deux minutes de cardio léger, trois mouvements de mobilité qui couvrent à la fois hanches, chevilles et épaules, puis trois exercices d'activation pour les fessiers, le gainage et les omoplates. Il prépare une séance complète sans fatiguer avant les séries de travail.",
    needs: [
      { title: "Peu d'exercices, mais qui couvrent large", body: "Les meilleurs mouvements full body travaillent plusieurs articulations à la fois, comme le squat profond ou la marche en chenille." },
      { title: "Le haut et le bas préparés", body: "Épaules et haut du dos pour les poussées et tirages, hanches et chevilles pour les squats et les charnières." },
      { title: "Un gainage réveillé", body: "C'est lui qui transmet la force entre le haut et le bas dans les mouvements composés." },
    ],
    faqs: [
      { q: "Comment s'échauffer avant une séance full body ?", a: "Deux minutes de cardio léger, puis des mouvements qui préparent plusieurs zones à la fois : squat profond, glissés au mur, charnière de hanche, et l'activation des fessiers et des omoplates. Le générateur construit cette routine en un tap et la varie d'une séance à l'autre." },
      { q: "Existe-t-il un échauffement full body en 5 minutes ?", a: "Oui : active « Version courte » au-dessus. Elle retire le cardio et garde l'essentiel, deux mouvements de mobilité et une activation, pour environ quatre minutes." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["haut-du-corps", "bas-du-corps", "sans-materiel"],
  },
  push: {
    slug: "push",
    zones: ["pecs", "epaules", "bras"],
    cover: "developpe-couche",
    metaTitle: "Échauffement push day : pecs, épaules, triceps en 6 min",
    metaDescription:
      "L'échauffement push day prêt à suivre avant développé couché et développé militaire : épaules, omoplates, coudes en 6 minutes. Animations, mode guidé.",
    h1: "Échauffement push day",
    kicker: "Pecs, épaules, triceps, 6 minutes",
    keyAnswer:
      "Avant une séance push (développé couché, développé militaire, dips), l'échauffement doit préparer l'épaule avant tout : mobilité du haut du dos et des bras au-dessus de la tête, puis activation de la coiffe des rotateurs et des omoplates, qui stabilisent l'épaule sous la barre. Comptez six minutes, cardio léger compris.",
    needs: [
      { title: "Une épaule stable sous la charge", body: "La coiffe des rotateurs et les muscles des omoplates gardent l'épaule centrée pendant les développés." },
      { title: "Un haut du dos qui s'ouvre", body: "Une bonne extension thoracique permet de garder les omoplates serrées sur le banc et de pousser au-dessus de la tête sans cambrer." },
      { title: "Des coudes et des poignets prêts", body: "Les triceps et les dips mettent les coudes sous tension : quelques répétitions légères suffisent à les préparer." },
    ],
    faqs: [
      { q: "Comment s'échauffer avant le développé couché ?", a: "Préparer l'épaule avec de la mobilité thoracique et des glissés au mur, activer l'arrière de l'épaule (Y-T, écartés à l'élastique), puis faire des séries d'approche sur le développé couché lui-même, de la barre seule jusqu'à la charge de travail." },
      DUREE,
      { q: "Et si j'ai mal à l'épaule au développé couché ?", a: "Coche « Épaule » dans l'outil : il retire les exercices contre-indiqués et ajoute une préparation dédiée. Pour comprendre d'où vient la douleur, consulte le guide douleur à l'épaule au développé couché." },
      ETIREMENTS,
    ],
    related: ["pull", "haut-du-corps", "pecs", "epaules"],
  },
  pull: {
    slug: "pull",
    zones: ["dos", "bras"],
    cover: "tractions",
    metaTitle: "Échauffement pull day : dos et biceps en 6 min",
    metaDescription:
      "L'échauffement pull day prêt à suivre avant tractions et rowing : omoplates, haut du dos, coudes en 6 minutes. Pictogrammes animés et mode guidé.",
    h1: "Échauffement pull day",
    kicker: "Dos, biceps, 6 minutes",
    keyAnswer:
      "Avant une séance pull (tractions, rowing, tirages), l'échauffement doit apprendre au dos à démarrer par les omoplates : mobilité des épaules au-dessus de la tête, puis tractions scapulaires ou serrage des omoplates, et quelques répétitions légères pour les coudes. Comptez environ six minutes, cardio léger compris.",
    needs: [
      { title: "Des omoplates qui démarrent le mouvement", body: "Une traction ou un rowing commence par abaisser et rapprocher les omoplates, avant de plier les coudes." },
      { title: "Des épaules libres au-dessus de la tête", body: "Les tractions et tirages verticaux partent bras tendus au-dessus de la tête." },
      { title: "Des coudes préparés", body: "Les biceps et les tendons du coude encaissent beaucoup au pull day : ils aiment monter en température progressivement." },
    ],
    faqs: [
      { q: "Comment s'échauffer avant les tractions ?", a: "Mobilise les épaules (glissés au mur), puis fais des tractions scapulaires : suspendu bras tendus, abaisse les omoplates sans plier les coudes. Enchaîne avec une ou deux séries faciles à amplitude réduite avant tes séries de travail." },
      DUREE,
      { q: "Faut-il échauffer les biceps séparément ?", a: "Rarement : ils travaillent déjà dans les tirages du début de séance. Une série légère de curl avant ta première série de travail de biceps suffit." },
      ETIREMENTS,
    ],
    related: ["push", "dos", "bras", "haut-du-corps"],
  },
  "sans-materiel": {
    slug: "sans-materiel",
    zones: ["pecs", "dos", "jambes", "fessiers"],
    cover: "art-squat-profond-rebond",
    metaTitle: "Échauffement musculation sans matériel : 6 min, tout le corps",
    metaDescription:
      "Un échauffement musculation sans aucun matériel, au poids du corps : mobilité et activation de tout le corps en 6 minutes. Animations, mode guidé, gratuit.",
    h1: "Échauffement musculation sans matériel",
    kicker: "Poids du corps, tout le corps, 6 minutes",
    keyAnswer:
      "Un échauffement musculation sans matériel se fait entièrement au poids du corps : deux minutes de cardio sur place, des mouvements de mobilité comme le squat profond, la charnière de hanche et les glissés au mur, puis de l'activation comme le pont fessier ou les W allongé. Six minutes suffisent, à la salle comme à la maison.",
    needs: [
      { title: "Le poids du corps suffit", body: "La mobilité et l'activation n'ont pas besoin de charge : l'objectif est de préparer, pas de fatiguer." },
      { title: "Un mur et un bout de sol", body: "C'est tout ce qu'il faut pour les glissés au mur, les ponts et les exercices à quatre pattes." },
      { title: "Des versions de remplacement", body: "Quand un exercice idéal demande un élastique, l'outil propose sa variante sans matériel." },
    ],
    faqs: [
      { q: "Peut-on bien s'échauffer sans matériel ?", a: "Oui. Les exercices d'échauffement les plus utiles (squat profond, charnière de hanche, glissés au mur, pont fessier) se font au poids du corps. Le matériel devient utile ensuite, pour les séries d'approche avec la barre." },
      DUREE,
      { q: "Quel échauffement sans matériel pour le haut du corps ?", a: "Glissés au mur, rotation thoracique à quatre pattes, Y-T et W allongé : ils préparent les épaules et les omoplates sans élastique. La page échauffement haut du corps propose une routine dédiée." },
      ETIREMENTS,
    ],
    related: ["full-body", "haut-du-corps", "bas-du-corps"],
  },
  pecs: {
    slug: "pecs",
    zones: ["pecs"],
    cover: "developpe-couche",
    metaTitle: "Échauffement pectoraux : la routine avant les pecs (6 min)",
    metaDescription:
      "L'échauffement pectoraux prêt à suivre avant développé couché ou incliné : épaules, omoplates, haut du dos en 6 minutes, avec ou sans élastique.",
    h1: "Échauffement pectoraux",
    kicker: "Avant développé couché, incliné, écartés",
    keyAnswer:
      "Avant une séance pectoraux, on échauffe surtout l'épaule : mobilité du haut du dos et de l'épaule (rotation thoracique, glissés au mur), puis activation des omoplates et de la coiffe des rotateurs pour stabiliser l'épaule sous la barre. Six minutes suffisent, avant les séries d'approche sur le développé couché.",
    needs: [
      { title: "L'épaule avant le muscle", body: "Les pecs se chauffent tout seuls pendant les premières séries ; l'épaule, elle, a besoin d'être préparée." },
      { title: "Des omoplates serrées et stables", body: "Sur le banc, les omoplates rapprochées protègent l'épaule et donnent une base solide." },
      { title: "Un haut du dos qui s'ouvre", body: "Il permet de garder la poitrine haute sans forcer sur le bas du dos." },
    ],
    faqs: [
      { q: "Comment s'échauffer les pecs ?", a: "Pas avec des pompes jusqu'à la fatigue : avec de la mobilité d'épaule et du haut du dos, puis l'activation de l'arrière de l'épaule (Y-T, écartés à l'élastique). Le muscle pectoral se prépare ensuite avec les séries d'approche sur ton premier exercice." },
      DUREE,
      { q: "Un échauffement pecs avec élastique ?", a: "Active « Avec élastique » dans la routine : l'outil propose alors face pull, rotation externe et écartés à l'élastique, plus efficaces pour réveiller l'arrière de l'épaule." },
      ETIREMENTS,
    ],
    related: ["push", "epaules", "haut-du-corps"],
  },
  dos: {
    slug: "dos",
    zones: ["dos"],
    cover: "rowing-barre",
    metaTitle: "Échauffement dos (musculation) : la routine en 6 min",
    metaDescription:
      "L'échauffement dos prêt à suivre avant tractions, rowing et tirages : omoplates, haut du dos, charnière de hanche en 6 minutes. Animations et mode guidé.",
    h1: "Échauffement dos",
    kicker: "Avant tractions, rowing, tirages",
    keyAnswer:
      "Avant une séance dos en musculation, l'échauffement prépare les omoplates et le haut du dos : mobilité des épaules au-dessus de la tête et rotation thoracique, puis activation des muscles qui abaissent et rapprochent les omoplates, comme les tractions scapulaires. Pour le rowing penché, on ajoute une charnière de hanche à vide.",
    needs: [
      { title: "Des omoplates qui bougent bien", body: "Tous les tirages commencent par elles ; un dos qui tire « avec les bras » travaille mal." },
      { title: "Un haut du dos mobile", body: "La rotation et l'extension thoracique libèrent l'épaule pour les tirages verticaux." },
      { title: "Une charnière de hanche maîtrisée", body: "Le rowing penché se fait buste incliné, dos plat : il demande des ischios et un bas du dos prêts." },
    ],
    faqs: [
      { q: "Comment s'échauffer le dos avant la musculation ?", a: "Avec des glissés au mur et une rotation thoracique pour la mobilité, puis des tractions scapulaires ou du serrage d'omoplates pour l'activation. Si ta séance contient du rowing penché ou du soulevé de terre, ajoute une charnière de hanche." },
      { q: "Comment s'échauffer avec un mal de dos ?", a: "Coche « Bas du dos » dans l'outil : il retire les mouvements contre-indiqués et privilégie le pont fessier et le gainage. Une douleur qui irradie dans la jambe ou qui persiste demande un avis médical." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["pull", "haut-du-corps", "bras"],
  },
  epaules: {
    slug: "epaules",
    zones: ["epaules"],
    cover: "developpe-militaire",
    band: true,
    metaTitle: "Échauffement épaules (élastique ou sans) : routine 6 min",
    metaDescription:
      "L'échauffement épaules prêt à suivre, avec élastique ou sans matériel : mobilité, coiffe des rotateurs et omoplates en 6 minutes. Animations et mode guidé.",
    h1: "Échauffement épaules",
    kicker: "Avec élastique ou sans matériel",
    keyAnswer:
      "Un échauffement des épaules efficace combine mobilité (glissés au mur, cercles contrôlés, passages d'épaules) et activation de la coiffe des rotateurs et des omoplates (rotation externe, face pull, Y-T). Avec un élastique léger, l'activation est plus facile à doser ; sans élastique, chaque exercice a sa version au poids du corps.",
    needs: [
      { title: "De l'amplitude au-dessus de la tête", body: "Développé militaire, tractions, élévations : l'épaule doit monter sans que le bas du dos se cambre pour compenser." },
      { title: "Une coiffe des rotateurs réveillée", body: "Ces petits muscles centrent l'humérus dans l'articulation ; ils fatiguent vite, d'où des séries légères." },
      { title: "Des omoplates qui suivent", body: "L'omoplate doit tourner avec le bras ; un serrage actif évite que l'épaule pince." },
    ],
    section: {
      title: "Échauffement épaules avec élastique",
      paragraphs: [
        "La routine ci-dessus est réglée avec élastique : rotation externe, face pull et écartés y sont les exercices les plus utiles, avec une résistance très légère. Désactive l'option pour voir la version sans matériel.",
      ],
    },
    faqs: [
      { q: "Quel élastique pour s'échauffer les épaules ?", a: "Le plus léger possible : l'échauffement de la coiffe des rotateurs se fait avec une faible résistance et beaucoup de contrôle, sur 12 à 15 répétitions. Un élastique trop dur fait compenser le trapèze." },
      { q: "Comment s'échauffer les épaules sans matériel ?", a: "Glissés au mur, cercles d'épaule contrôlés, Y-T et W allongé : ils couvrent la mobilité et l'activation sans élastique. Désactive l'option élastique dans la routine pour les voir." },
      { q: "Et si j'ai mal à l'épaule ?", a: "Coche « Épaule » dans l'outil : il retire les exercices contre-indiqués et ajoute une préparation dédiée. Une douleur la nuit ou une perte de force brutale demandent un avis médical." },
      DUREE,
    ],
    related: ["haut-du-corps", "push", "pecs"],
  },
  bras: {
    slug: "bras",
    zones: ["bras"],
    cover: "curl-biceps",
    metaTitle: "Échauffement bras : biceps, triceps, coudes en 5 min",
    metaDescription:
      "L'échauffement bras prêt à suivre avant biceps et triceps : coudes, poignets et épaules en quelques minutes. Pictogrammes animés et mode guidé, gratuit.",
    h1: "Échauffement bras",
    kicker: "Biceps, triceps, coudes",
    keyAnswer:
      "Avant une séance bras, l'échauffement vise d'abord les coudes et les poignets, très sollicités par les curls et les extensions : mobilité des avant-bras et des coudes, puis quelques répétitions légères pour les biceps et les triceps. Les épaules méritent aussi un peu de mobilité, car elles stabilisent tous les mouvements de bras.",
    needs: [
      { title: "Des coudes préparés", body: "Les tendons du coude encaissent les curls et les extensions : ils aiment une montée en température progressive." },
      { title: "Des poignets mobiles", body: "La prise sur la barre ou les haltères met les poignets en tension, surtout en supination." },
      { title: "Une épaule stable", body: "Elle tient le bras en place ; une épaule qui bouge fait tricher sur les curls." },
    ],
    faqs: [
      { q: "Faut-il s'échauffer avant de faire les bras ?", a: "Oui, surtout pour les coudes : quelques minutes de mobilité des avant-bras et des coudes, puis une série légère de 12 à 15 répétitions avant la première série de travail de chaque exercice." },
      { q: "Et si j'ai mal au coude au curl ?", a: "Coche « Coude » dans l'outil pour une préparation dédiée, et consulte le guide douleur au coude au curl biceps. Une douleur persistante au coude demande d'adapter la charge et la prise." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["pull", "push", "haut-du-corps"],
  },
  jambes: {
    slug: "jambes",
    zones: ["jambes", "fessiers"],
    cover: "squat",
    metaTitle: "Échauffement jambes (leg day) : la routine en 6 min",
    metaDescription:
      "L'échauffement jambes prêt à suivre avant squat, presse et fentes : chevilles, hanches, genoux, fessiers en 6 minutes. Pictogrammes animés et mode guidé.",
    h1: "Échauffement jambes",
    kicker: "Leg day, avant squat, presse, fentes",
    keyAnswer:
      "Avant une séance jambes, l'échauffement prépare les chevilles, les hanches et les genoux : squat profond contrôlé, mobilité de cheville au mur et charnière de hanche, puis activation des fessiers et du gainage. Six minutes suffisent avant de passer aux séries d'approche sur le squat ou la presse.",
    needs: [
      { title: "Des chevilles mobiles", body: "Au squat, le genou doit pouvoir avancer au-dessus du pied sans que le talon décolle." },
      { title: "Des hanches qui descendent", body: "La flexion profonde de hanche permet de squatter bas en gardant le dos neutre." },
      { title: "Des genoux bien guidés", body: "Les fessiers gardent le genou dans l'axe du pied, surtout à la remontée." },
    ],
    faqs: [
      { q: "Comment s'échauffer pour le leg day ?", a: "Deux minutes de cardio léger (vélo, rameur), puis un squat profond contrôlé, une mobilité de cheville et une charnière de hanche, et enfin l'activation des fessiers. Termine par des séries d'approche sur ton premier exercice, de la barre seule jusqu'à ta charge." },
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
      "L'échauffement fessiers prêt à suivre : hanches et activation des fessiers en 6 minutes avant hip thrust, soulevé de terre roumain et fentes. Mode guidé.",
    h1: "Échauffement fessiers",
    kicker: "Avant hip thrust, soulevé roumain, fentes",
    keyAnswer:
      "Un échauffement fessiers combine mobilité de hanche (charnière à vide, 90/90, squat profond) et activation ciblée (pont fessier, coquillage, marche latérale à l'élastique). L'objectif est de sentir le fessier travailler avant la charge, pour qu'il prenne sa part dès la première série de hip thrust ou de fentes.",
    needs: [
      { title: "Des hanches mobiles", body: "Extension complète pour le hip thrust, flexion pour les fentes et le soulevé roumain." },
      { title: "Un fessier qui s'active", body: "Sans activation, les ischios et le bas du dos prennent souvent le relais." },
      { title: "Un moyen fessier réveillé", body: "C'est lui qui stabilise le bassin et le genou sur une jambe, aux fentes." },
    ],
    faqs: [
      { q: "Comment activer ses fessiers avant la séance ?", a: "Avec un pont fessier (en marche pour plus de difficulté), le coquillage pour le moyen fessier, et la marche latérale à l'élastique. Deux ou trois exercices de 10 à 15 répétitions suffisent : il s'agit de réveiller, pas de fatiguer." },
      DUREE,
      { q: "Faut-il un élastique pour activer les fessiers ?", a: "Il aide pour la marche latérale, mais pas indispensable : le pont fessier et le coquillage se font au poids du corps." },
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
      "L'échauffement du gainage prêt à suivre avant squat et soulevé de terre : bas du dos, abdominaux profonds et hanches en 6 minutes. Mode guidé, gratuit.",
    h1: "Échauffement gainage (core)",
    kicker: "Avant squat et soulevé de terre",
    keyAnswer:
      "Échauffer le gainage avant la musculation, c'est réveiller les muscles qui gardent le dos neutre sous la charge : dead bug, extension en quadrupédie, Pallof press ou position creuse, après un peu de mobilité de hanche et du bas du dos. C'est la préparation la plus utile avant un squat ou un soulevé de terre lourd.",
    needs: [
      { title: "Un dos qui reste neutre", body: "Sous la barre, le gainage empêche le dos de s'arrondir ou de se cambrer." },
      { title: "Des hanches libres", body: "Une hanche raide fait travailler le bas du dos à sa place." },
      { title: "De l'anti-rotation", body: "Résister à la torsion protège le dos dans les mouvements à une main ou une jambe." },
    ],
    faqs: [
      { q: "Faut-il faire du gainage avant le squat ?", a: "Un peu, oui : un ou deux exercices de gainage dynamique (dead bug, extension en quadrupédie) réveillent les muscles profonds sans les fatiguer. Évite les longues planches qui épuisent avant la séance." },
      DUREE,
      { q: "Et si j'ai mal au bas du dos ?", a: "Coche « Bas du dos » dans l'outil : il privilégie le pont fessier et le gainage, et retire ce qui est contre-indiqué. Lis aussi le guide douleur au bas du dos au soulevé de terre." },
      ETIREMENTS,
    ],
    related: ["bas-du-corps", "dos", "full-body"],
  },
};

export const LANDING_SLUGS = Object.keys(LANDINGS);
