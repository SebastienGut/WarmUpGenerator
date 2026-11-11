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
  /** Sections de fond, propres à la zone, sous la section principale. */
  guide?: { title: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  related: string[];
  /** Pages hors échauffements par zone : exercice précis, douleur. */
  links?: { href: string; label: string }[];
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
      "L'échauffement haut du corps prêt à suivre : épaules, haut du dos et omoplates en {min} minutes, avec ou sans élastique. Démonstrations et mode guidé.",
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
    guide: [
      {
        title: "Une seule routine pour pousser et tirer",
        paragraphs: [
          "Une séance haut du corps mélange développés et tirages : l'échauffement prépare donc l'épaule dans toutes les directions. La mobilité du haut du dos donne de la place à l'épaule, puis trois exercices d'activation couvrent la coiffe des rotateurs, le grand dentelé et l'arrière de l'épaule.",
          "Les pectoraux, le dos et les bras se préparent ensuite sur les séries d'approche de chaque premier exercice.",
        ],
      },
      {
        title: "Entre deux exercices",
        paragraphs: [
          "Quand tu passes d'un développé à un tirage, pas besoin de refaire la routine : une série légère du nouvel exercice suffit, les épaules sont déjà prêtes.",
        ],
      },
    ],
    faqs: [
      { q: "Quels exercices pour s'échauffer le haut du corps ?", a: "Cat-cow et rotation thoracique pour la mobilité, puis trois exercices d'activation : pompes scapulaires, rotation externe et face pull. Chacun a sa variante selon ton matériel (poulie, élastique ou poids du corps)." },
      DUREE,
      { q: "Faut-il un élastique pour s'échauffer le haut du corps ?", a: "Non. Il rend l'activation de l'arrière de l'épaule plus facile à doser, mais sans matériel la routine passe à la rotation externe allongé sur le côté et au W allongé sur le ventre." },
      ETIREMENTS,
    ],
    related: ["push", "pull", "epaules", "pecs", "dos"],
    links: [
      { href: "/echauffement/exercice/developpe-couche", label: "Échauffement avant le développé couché" },
      { href: "/echauffement/exercice/tractions", label: "Échauffement avant les tractions" },
      { href: "/echauffement/protection/epaule-douleur", label: "Échauffement épaule douloureuse" },
    ],
  },
  "bas-du-corps": {
    slug: "bas-du-corps",
    zones: ["jambes", "fessiers", "core"],
    template: "bas",
    cover: "souleve-de-terre",
    metaTitle: "Échauffement bas du corps (muscu) : la routine en {min} min",
    metaDescription:
      "L'échauffement bas du corps prêt à suivre : chevilles, hanches, fessiers et gainage en {min} minutes avant squat ou soulevé de terre. Mode guidé.",
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
    guide: [
      {
        title: "Squat et soulevé de terre dans la même séance",
        paragraphs: [
          "Le squat et le soulevé de terre sollicitent les mêmes articulations, mais pas de la même façon : le squat descend en flexion profonde de hanche et de cheville, le soulevé de terre recule les hanches en gardant les tibias presque verticaux. La routine prépare les deux : cheville et squat profond assisté pour le premier, good morning pour la charnière du second.",
          "Le glute bridge et le dead bug réveillent les fessiers et le gainage, qui tiennent le genou dans l'axe et le dos neutre sous la barre.",
        ],
      },
    ],
    faqs: [
      { q: "Quels exercices pour s'échauffer le bas du corps ?", a: "La mobilisation de cheville au mur, le squat profond assisté et le good morning au poids du corps, puis le glute bridge et le dead bug. Cinq exercices, dans un ordre qui limite les passages au sol." },
      DUREE,
      { q: "Comment protéger ses genoux à l'échauffement ?", a: "En préparant la cheville et la hanche, souvent responsables de la douleur au genou, et en activant les fessiers qui gardent le genou dans l'axe du pied. Si un genou est sensible, suis la routine « Une douleur ? » de l'accueil (zone « Genou ») avant de t'échauffer." },
      ETIREMENTS,
    ],
    related: ["jambes", "fessiers", "full-body", "core"],
    links: [
      { href: "/echauffement/exercice/squat", label: "Échauffement avant le squat" },
      { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement avant le soulevé de terre" },
      { href: "/douleur/bas-du-dos-souleve-de-terre", label: "Mal au bas du dos au soulevé de terre" },
      { href: "/echauffement/protection/lombaires", label: "Échauffement avec des lombaires sensibles" },
    ],
  },
  "full-body": {
    slug: "full-body",
    zones: ["pecs", "dos", "jambes", "fessiers"],
    template: "full",
    cover: "kettlebell-swing",
    metaTitle: "Échauffement full body : la routine complète en {min} min",
    metaDescription:
      "L'échauffement full body prêt à suivre : épaules, hanches, chevilles, fessiers en {min} minutes avant une séance complète. Mode guidé, gratuit.",
    h1: "Échauffement full body",
    kicker: "Tout le corps, {min} minutes",
    keyAnswer:
      "Un échauffement full body tient en {min} minutes : mobilisation de cheville au mur, squat profond assisté et good morning pour le bas du corps, puis face pull, rotation externe et pompes scapulaires pour les épaules, et un dead bug pour le gainage. Sept exercices aux doses réduites, pour tout préparer sans fatiguer.",
    needs: [
      { title: "Des doses réduites", body: "Sept exercices, c'est le plafond : chacun est dosé un peu plus bas que dans une séance ciblée, pour préparer sans fatiguer." },
      { title: "Le haut et le bas préparés", body: "Épaules et haut du dos pour les poussées et tirages, hanches et chevilles pour les squats et les charnières." },
      { title: "Un gainage réveillé", body: "C'est lui qui transmet la force entre le haut et le bas dans les mouvements composés." },
    ],
    guide: [
      {
        title: "Sept exercices, pas plus",
        paragraphs: [
          "Une séance full body sollicite tout le corps, mais l'échauffement ne peut pas additionner une routine haut du corps et une routine bas du corps sans devenir trop long. Il garde l'essentiel de chaque zone, à doses réduites : la cheville et la hanche pour les squats et les charnières, la coiffe des rotateurs et les omoplates pour les développés et les tirages, et le gainage.",
          "Chaque premier exercice de la séance reçoit ensuite ses propres séries d'approche.",
        ],
      },
      {
        title: "L'ordre de la routine",
        paragraphs: [
          "En salle, la routine commence debout par le bas du corps, passe aux épaules à la poulie, et finit au sol par le dead bug : un seul passage au sol, pour ne pas perdre de temps à changer de position.",
        ],
      },
    ],
    faqs: [
      { q: "Comment s'échauffer avant une séance full body ?", a: "Commence par le bas du corps debout (cheville au mur, squat profond assisté, good morning), enchaîne avec les épaules (face pull, rotation externe, pompes scapulaires) et termine par un dead bug au sol. Puis passe aux séries d'approche de ton premier exercice." },
      { q: "Existe-t-il un échauffement full body en 5 minutes ?", a: "Presque : la routine complète tient en {min} minutes. Si tu es pressé, fais les quatre premiers exercices et passe aux séries d'approche." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["haut-du-corps", "bas-du-corps", "sans-materiel"],
    links: [
      { href: "/blog/guide-complet-echauffement-musculation", label: "Comment s'échauffer avant la musculation" },
      { href: "/echauffement/exercice/squat", label: "Échauffement avant le squat" },
      { href: "/echauffement/exercice/developpe-couche", label: "Échauffement avant le développé couché" },
    ],
  },
  push: {
    slug: "push",
    zones: ["pecs", "epaules", "bras"],
    template: "push",
    cover: "developpe-couche",
    metaTitle: "Échauffement push day : pecs, épaules, triceps en {min} min",
    metaDescription:
      "L'échauffement push day avant développé couché et militaire : épaules, omoplates, coudes en {min} minutes. Démonstrations en images, mode guidé.",
    h1: "Échauffement push day",
    kicker: "Pecs, épaules, triceps, {min} minutes",
    keyAnswer:
      "Avant une séance push (développé couché, développé militaire, dips), l'échauffement prépare l'épaule avant tout : un cat-cow pour mobiliser la colonne, puis pompes scapulaires pour le dentelé, rotation externe pour la coiffe des rotateurs et face pull pour l'arrière de l'épaule. Compte {min} minutes, puis les séries d'approche sur ton premier exercice.",
    needs: [
      { title: "Une épaule stable sous la charge", body: "La coiffe des rotateurs et les muscles des omoplates gardent l'épaule centrée pendant les développés." },
      { title: "Un haut du dos qui s'ouvre", body: "Une bonne extension thoracique permet de garder les omoplates serrées sur le banc et de pousser au-dessus de la tête sans cambrer." },
      { title: "Des coudes et des poignets prêts", body: "Les triceps et les dips mettent les coudes sous tension : les séries d'approche du premier exercice les préparent." },
    ],
    guide: [
      {
        title: "Pourquoi l'épaule passe avant les pecs",
        paragraphs: [
          "Au push day, les pectoraux et les triceps se préparent très bien sur les premières séries légères de développé. Ce qui demande une préparation à part, c'est l'épaule : elle travaille sous charge dans presque tous les exercices de la séance, et ses stabilisateurs ne se réveillent pas tout seuls.",
          "D'où une routine centrée sur la coiffe des rotateurs (rotation externe), le grand dentelé (pompes scapulaires) et l'arrière de l'épaule (face pull), en deux séries légères chacun.",
        ],
      },
      {
        title: "Selon ton premier exercice",
        paragraphs: [
          "Développé couché : enchaîne avec la barre seule, puis tes séries d'approche jusqu'à la charge de travail.",
          "Développé militaire : ajoute quelques wall slides pour monter les bras sans cambrer, puis commence à la barre seule.",
          "Dips : commence par une série au poids du corps sur une amplitude réduite, puis descends un peu plus à chaque série.",
          "Développé aux haltères : une série avec des haltères nettement plus légers suffit avant la charge de travail.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il échauffer les triceps au push day ?", a: "Pas séparément : ils travaillent dans tous les développés, et les séries d'approche du premier exercice les préparent. Si ta séance commence par un exercice de triceps isolé, fais une série légère de 12 à 15 répétitions." },
      { q: "Comment s'échauffer avant le développé couché ?", a: "Préparer l'épaule (cat-cow, pompes scapulaires, rotation externe, face pull), puis faire des séries d'approche sur le développé couché lui-même, de la barre seule jusqu'à la charge de travail." },
      DUREE,
      { q: "Et si j'ai mal à l'épaule au développé couché ?", a: "Sous 3 sur 10, suis la routine « Une douleur ? » de l'accueil (zone « Épaule ») : mobilité douce et renforcement léger, plus long qu'un échauffement. Lis aussi le guide douleur à l'épaule au développé couché, pour comprendre d'où elle vient." },
      ETIREMENTS,
    ],
    related: ["pull", "haut-du-corps", "pecs", "epaules"],
    links: [
      { href: "/echauffement/exercice/developpe-couche", label: "Échauffement avant le développé couché" },
      { href: "/echauffement/exercice/developpe-militaire", label: "Échauffement avant le développé militaire" },
      { href: "/douleur/epaule-developpe-couche", label: "Mal à l'épaule au développé couché" },
      { href: "/douleur/poignet-pompes", label: "Douleur au poignet aux pompes" },
    ],
  },
  pull: {
    slug: "pull",
    zones: ["dos", "bras"],
    template: "pull",
    cover: "tractions",
    metaTitle: "Échauffement pull day : dos et biceps en {min} min",
    metaDescription:
      "L'échauffement pull day prêt à suivre avant tractions et rowing : omoplates, haut du dos, coudes en {min} minutes. Démonstrations en images et mode guidé.",
    h1: "Échauffement pull day",
    kicker: "Dos, biceps, {min} minutes",
    keyAnswer:
      "Avant une séance pull (tractions, rowing, tirages), l'échauffement prépare le dos et les épaules : cat-cow, rotation thoracique et wall slides pour la mobilité, puis face pull pour l'arrière de l'épaule et un curl marteau très léger pour les biceps et les coudes. Compte environ {min} minutes avant les séries d'approche.",
    needs: [
      { title: "Des omoplates qui démarrent le mouvement", body: "Une traction ou un rowing commence par abaisser et rapprocher les omoplates, avant de plier les coudes." },
      { title: "Des épaules libres au-dessus de la tête", body: "Les tractions et tirages verticaux partent bras tendus au-dessus de la tête." },
      { title: "Des coudes préparés", body: "Les biceps et les tendons du coude encaissent beaucoup au pull day : un curl marteau très léger les prépare sans les fatiguer." },
    ],
    guide: [
      {
        title: "Le dos travaille, les omoplates décident",
        paragraphs: [
          "Au pull day, le grand dorsal se prépare sur les premières séries légères de tractions ou de tirage. La routine s'occupe de ce qui conditionne la qualité de ces séries : un haut du dos mobile, des épaules qui montent librement au-dessus de la tête et des omoplates qui démarrent le mouvement.",
          "Le curl marteau très léger, en fin de routine, prépare les coudes et les biceps, sollicités par tous les tirages.",
        ],
      },
      {
        title: "Selon ton premier exercice",
        paragraphs: [
          "Tractions : une suspension à la barre et quelques tractions scapulaires, puis une série facile avant les séries de travail.",
          "Tirage vertical : une série légère de 12 à 15 répétitions, puis monte progressivement.",
          "Rowing barre : quelques good mornings au poids du corps pour trouver la position penchée, puis la barre seule.",
          "Soulevé de terre en début de séance : il demande sa propre préparation, centrée sur les hanches et le gainage.",
        ],
      },
    ],
    faqs: [
      { q: "Comment s'échauffer avant les tractions ?", a: "Mobilise le haut du dos et les épaules (rotation thoracique, wall slides), active l'arrière de l'épaule (face pull), puis fais une ou deux séries faciles de tractions, ou de tirage vertical léger, avant tes séries de travail." },
      DUREE,
      { q: "Faut-il échauffer les biceps séparément ?", a: "Une série de curl marteau très léger suffit, et la routine pull l'inclut. Sans matériel, il n'y a pas d'équivalent fiable : les premières séries de tirage, légères, font ce travail." },
      ETIREMENTS,
    ],
    related: ["push", "dos", "bras", "haut-du-corps"],
    links: [
      { href: "/echauffement/exercice/tractions", label: "Échauffement avant les tractions" },
      { href: "/echauffement/exercice/rowing-barre", label: "Échauffement avant le rowing barre" },
      { href: "/douleur/epaule-tractions", label: "Mal à l'épaule aux tractions" },
      { href: "/douleur/coude-curl-biceps", label: "Mal au coude au curl biceps" },
    ],
  },
  "sans-materiel": {
    slug: "sans-materiel",
    zones: ["pecs", "dos", "jambes", "fessiers"],
    template: "full",
    equipment: "none",
    cover: "art-squat-profond-rebond",
    metaTitle: "Échauffement musculation sans matériel : {min} min, tout le corps",
    metaDescription:
      "Un échauffement musculation sans matériel, au poids du corps : mobilité et activation de tout le corps en {min} minutes. Démonstrations, mode guidé.",
    h1: "Échauffement musculation sans matériel",
    kicker: "Poids du corps, tout le corps, {min} minutes",
    keyAnswer:
      "Un échauffement musculation sans matériel se fait au poids du corps, avec un mur : mobilisation de cheville, squat profond assisté et good morning, puis W allongé sur le ventre et rotation externe allongé sur le côté pour les épaules, pompes scapulaires contre un mur et dead bug. {min} minutes suffisent, à la salle comme à la maison.",
    needs: [
      { title: "Le poids du corps suffit", body: "La mobilité et l'activation n'ont pas besoin de charge : l'objectif est de préparer, pas de fatiguer." },
      { title: "Un mur et un bout de sol", body: "C'est tout ce qu'il faut pour la cheville au mur, les pompes scapulaires et les exercices au sol." },
      { title: "Des versions de remplacement", body: "Le face pull n'a pas d'équivalent au poids du corps : il est remplacé par le W allongé, qui travaille les mêmes muscles, et l'outil l'indique." },
    ],
    guide: [
      {
        title: "Ce qui remplace la poulie et l'élastique",
        paragraphs: [
          "Sans poulie ni élastique, deux exercices changent : le face pull devient un W allongé sur le ventre, et la rotation externe se fait allongé sur le côté. Ils travaillent les mêmes muscles de l'arrière de l'épaule et de la coiffe des rotateurs, avec le poids du bras comme seule résistance.",
          "Les pompes scapulaires se font contre un mur, et tout le bas du corps se fait au poids du corps.",
        ],
      },
      {
        title: "À la maison",
        paragraphs: [
          "La routine sert aussi avant une séance au poids du corps à la maison : pompes, squats, fentes. Ensuite, commence chaque exercice par une série facile, loin de l'échec.",
        ],
      },
    ],
    faqs: [
      { q: "Peut-on bien s'échauffer sans matériel ?", a: "Oui pour la mobilité et presque toute l'activation (squat profond assisté, good morning, pompes scapulaires, dead bug). Seuls le face pull et les exercices de bras n'ont pas d'équivalent exact : la routine les remplace par l'exercice le plus proche, et l'indique." },
      DUREE,
      { q: "Quel échauffement sans matériel pour le haut du corps ?", a: "Cat-cow, rotation thoracique à quatre pattes, pompes scapulaires contre un mur, rotation externe allongé sur le côté et W allongé sur le ventre. Choisis « Sans matériel » sur la page échauffement haut du corps." },
      ETIREMENTS,
    ],
    related: ["full-body", "haut-du-corps", "bas-du-corps"],
    links: [
      { href: "/blog/echauffement-debutant-musculation", label: "Échauffement pour débuter la musculation" },
      { href: "/blog/guide-complet-echauffement-musculation", label: "Comment s'échauffer avant la musculation" },
    ],
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
    guide: [
      {
        title: "Pourquoi la routine est si courte",
        paragraphs: [
          "La routine pectoraux tient en {min} minutes parce que le muscle pectoral se prépare très bien tout seul, sur les séries d'approche du développé couché. Ce qui ne se prépare pas tout seul, c'est l'épaule : la coiffe des rotateurs et le grand dentelé, qui gardent l'articulation stable quand la barre descend.",
          "Si ta séance enchaîne plusieurs exercices de poussée lourds, prends plutôt l'échauffement push day, plus complet.",
        ],
      },
      {
        title: "Avant le développé couché",
        paragraphs: [
          "Après la routine, commence à la barre seule pour 8 répétitions, puis monte en 2 à 4 paliers en baissant les répétitions, jusqu'à un dernier palier entre 75 et 90 % de ta charge de travail. Repose-toi 2 à 3 minutes avant la première vraie série.",
          "Pour un développé incliné ou des écartés en début de séance, même principe : une ou deux séries nettement plus légères avant la charge de travail.",
        ],
      },
    ],
    faqs: [
      { q: "Comment s'échauffer les pecs ?", a: "Pas avec des pompes jusqu'à la fatigue : avec un peu de mobilité, puis les pompes scapulaires et la rotation externe pour stabiliser l'épaule. Le muscle pectoral se prépare ensuite avec les séries d'approche sur ton premier exercice." },
      DUREE,
      { q: "Un échauffement pecs avec élastique ?", a: "Choisis « Élastique » au-dessus de la routine : la rotation externe se fait alors à l'élastique, coude au corps, avec une résistance très légère." },
      ETIREMENTS,
    ],
    related: ["push", "epaules", "haut-du-corps"],
    links: [
      { href: "/echauffement/exercice/developpe-couche", label: "Échauffement avant le développé couché" },
      { href: "/douleur/epaule-developpe-couche", label: "Mal à l'épaule au développé couché" },
      { href: "/blog/echauffement-pecs-musculation", label: "Guide : préparer la séance pectoraux" },
    ],
  },
  dos: {
    slug: "dos",
    zones: ["dos"],
    cover: "rowing-barre",
    metaTitle: "Échauffement dos (musculation) : la routine en {min} min",
    metaDescription:
      "L'échauffement dos en musculation, avant tractions, rowing et tirages : omoplates, haut du dos et épaules en {min} minutes. Démonstrations en images et mode guidé.",
    h1: "Échauffement dos",
    kicker: "Avant tractions, rowing, tirages",
    keyAnswer:
      "Avant une séance dos en musculation, l'échauffement prépare les omoplates et le haut du dos : wall slides, cat-cow et rotation thoracique à quatre pattes pour la mobilité, puis face pull pour l'arrière de l'épaule. Pour le rowing penché ou le soulevé de terre, ajoute un good morning au poids du corps : il prépare la charnière de hanche.",
    needs: [
      { title: "Des omoplates qui bougent bien", body: "Tous les tirages commencent par elles ; un dos qui tire « avec les bras » travaille mal." },
      { title: "Un haut du dos mobile", body: "La rotation et l'extension thoracique libèrent l'épaule pour les tirages verticaux." },
      { title: "Une charnière de hanche maîtrisée", body: "Le rowing penché se fait buste incliné, dos plat : il demande des ischios et un bas du dos prêts." },
    ],
    guide: [
      {
        title: "Échauffer les dorsaux, ou ce qui les fait travailler",
        paragraphs: [
          "Le grand dorsal n'a pas besoin d'un exercice à part : il se prépare très bien sur les premières séries légères de ton tirage. Ce qui demande de l'attention avant, ce sont les omoplates, le haut du dos et les épaules. Si l'omoplate ne bouge pas, le mouvement part des bras et le dos travaille moins.",
          "C'est pour ça que la routine ne contient pas de tirage lourd : trois exercices de mobilité pour donner de l'amplitude, puis un face pull pour réveiller l'arrière de l'épaule sans entamer ta force.",
        ],
      },
      {
        title: "Selon le premier exercice de ta séance dos",
        paragraphs: [
          "Tractions ou tirage vertical : les bras passent au-dessus de la tête, donc les wall slides comptent le plus. Ajoute une suspension à la barre et quelques tractions scapulaires avant ta première vraie série.",
          "Rowing barre : tu tiens le buste penché pendant toute la série. Ajoute 8 à 10 good mornings au poids du corps pour trouver la position, puis commence à la barre seule.",
          "Rowing assis, tirage à la poulie : la routine suffit. Monte ensuite progressivement sur l'exercice lui-même, en gardant les premières répétitions lentes pour sentir les omoplates se rapprocher.",
          "Soulevé de terre : il mérite sa propre préparation, centrée sur les hanches et le gainage plus que sur le haut du dos.",
        ],
      },
    ],
    faqs: [
      { q: "Comment s'échauffer le dos avant la musculation ?", a: "Avec des wall slides, un cat-cow et une rotation thoracique pour la mobilité, puis un face pull pour l'activation. Si ta séance contient du rowing penché ou du soulevé de terre, ajoute un good morning au poids du corps." },
      { q: "Quel échauffement pour une séance dos à la salle ?", a: "La routine ci-dessus en version Salle : le face pull se fait à la corde, sur une poulie haute. Enchaîne avec des séries légères de ton premier exercice, en augmentant la charge à chaque série jusqu'à ta charge de travail." },
      { q: "Faut-il échauffer les dorsaux séparément ?", a: "Non. Les premières séries légères de tractions ou de tirage préparent le grand dorsal. L'échauffement sert surtout à libérer le haut du dos et à réveiller les muscles qui placent les omoplates." },
      { q: "Comment s'échauffer avec un mal de dos ?", a: "Sous 3 sur 10, suis la routine « Une douleur ? » de l'accueil (zone « Bas du dos ») : mobilité douce et renforcement léger, plus long qu'un échauffement. Lis aussi le guide lombaires. Une douleur qui irradie dans la jambe ou qui persiste demande un avis médical." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["pull", "haut-du-corps", "bras"],
    links: [
      { href: "/echauffement/exercice/tractions", label: "Échauffement avant les tractions" },
      { href: "/echauffement/exercice/rowing-barre", label: "Échauffement avant le rowing barre" },
      { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement avant le soulevé de terre" },
      { href: "/echauffement/protection/lombaires", label: "Échauffement avec des lombaires sensibles" },
    ],
  },
  epaules: {
    slug: "epaules",
    zones: ["epaules"],
    cover: "developpe-militaire",
    equipment: "band",
    metaTitle: "Échauffement épaules (musculation) : la routine en {min} min",
    metaDescription:
      "L'échauffement épaules en musculation, avec élastique ou sans : mobilité, coiffe des rotateurs et omoplates en {min} minutes. Démonstrations, mode guidé.",
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
    guide: [
      {
        title: "Pourquoi les moulinets ne suffisent pas",
        paragraphs: [
          "Les grands cercles de bras font bouger l'articulation, mais sans résistance ni contrôle : ils ne demandent presque rien à la coiffe des rotateurs ni aux muscles qui guident l'omoplate. Or ce sont eux qui gardent l'épaule centrée quand la charge arrive.",
          "Garde quelques cercles si ça te fait du bien, puis passe à ce qui prépare vraiment : monter les bras en contrôlant le dos, tourner l'épaule contre une résistance légère, tirer vers le visage avec les coudes hauts.",
        ],
      },
      {
        title: "Selon ce qui t'attend",
        paragraphs: [
          "Développé militaire, élévations latérales : les bras passent au-dessus de la tête ou à l'horizontale. Prends ton temps sur les wall slides, puis commence ton premier exercice très léger.",
          "Développé couché, dips : l'épaule doit rester stable, omoplates serrées. Ajoute des pompes scapulaires, ou suis directement l'échauffement pectoraux ou push day.",
          "Tractions, tirage vertical : l'épaule travaille bras tendus au-dessus de la tête. Termine par une suspension à la barre et quelques tractions scapulaires.",
        ],
      },
      {
        title: "Bien doser",
        paragraphs: [
          "Ces exercices doivent rester faciles : ils réveillent, ils ne fatiguent pas. Si le trapèze monte vers l'oreille ou si le mouvement devient saccadé, la résistance est trop forte. Une sensation de chaleur dans l'arrière de l'épaule est normale, une brûlure en fin de série veut dire que tu en fais trop.",
        ],
      },
    ],
    faqs: [
      { q: "Comment échauffer ses épaules avant le développé militaire ?", a: "Wall slides pour l'amplitude, rotation externe et face pull pour la stabilité, puis des séries légères sur le développé lui-même, en commençant à la barre seule." },
      { q: "Les moulinets de bras suffisent-ils à échauffer les épaules ?", a: "Non. Ils mobilisent l'articulation mais sollicitent très peu la coiffe des rotateurs et les omoplates. Ajoute au moins une rotation externe légère et un face pull, ou un W allongé sans matériel." },
      { q: "Quel élastique pour s'échauffer les épaules ?", a: "Le plus léger possible : l'échauffement de la coiffe des rotateurs se fait avec une faible résistance et beaucoup de contrôle, sur 12 à 15 répétitions. Un élastique trop dur fait compenser le trapèze." },
      { q: "Comment s'échauffer les épaules sans matériel ?", a: "Wall slides, rotation externe allongé sur le côté et W allongé sur le ventre : ils couvrent la mobilité et l'activation sans élastique. Choisis « Sans matériel » au-dessus de la routine pour les voir." },
      { q: "Et si j'ai mal à l'épaule ?", a: "Sous 3 sur 10, suis la routine « Une douleur ? » de l'accueil (zone « Épaule ») : mobilité douce et renforcement léger, plus long qu'un échauffement. Lis aussi le guide épaule. Une douleur la nuit ou une perte de force brutale demandent un avis médical." },
      DUREE,
    ],
    related: ["haut-du-corps", "push", "pecs"],
    links: [
      { href: "/echauffement/exercice/developpe-militaire", label: "Échauffement avant le développé militaire" },
      { href: "/echauffement/protection/epaule-douleur", label: "Échauffement épaule douloureuse" },
      { href: "/douleur/epaule-developpe-couche", label: "Mal à l'épaule au développé couché" },
      { href: "/douleur/epaule-tractions", label: "Mal à l'épaule aux tractions" },
    ],
  },
  bras: {
    slug: "bras",
    zones: ["bras"],
    cover: "curl-biceps",
    metaTitle: "Échauffement bras (musculation) : biceps, triceps en {min} min",
    metaDescription:
      "L'échauffement bras en musculation, avant biceps et triceps : coudes, poignets et avant-bras en quelques minutes. Démonstrations et mode guidé.",
    h1: "Échauffement bras",
    kicker: "Biceps, triceps, coudes",
    keyAnswer:
      "Avant une séance bras, l'échauffement vise les coudes et les poignets, très sollicités par les curls et les extensions : pronation-supination des avant-bras, puis un curl marteau très léger et une extension triceps légère, à la poulie, à l'haltère ou à l'élastique. Sans matériel, la routine prépare tout ce qui porte le bras : cercles d'épaule, poignets, flexions du coude, pompes scapulaires et rotation externe.",
    needs: [
      { title: "Des coudes préparés", body: "Les tendons du coude encaissent les curls et les extensions : une série très légère de chaque les prépare." },
      { title: "Des poignets mobiles", body: "La prise sur la barre ou les haltères met les poignets en tension, surtout en supination." },
      { title: "Une épaule stable", body: "Elle tient le bras en place ; une épaule qui bouge fait tricher sur les curls." },
    ],
    guide: [
      {
        title: "Le coude d'abord, le muscle ensuite",
        paragraphs: [
          "Le biceps et le triceps sont des muscles petits : ils montent vite en température dès qu'ils travaillent. Ce qui demande plus de temps, ce sont les tendons du coude, qui encaissent chaque curl et chaque extension. D'où une préparation courte, mais qui passe bien par le coude et l'avant-bras.",
          "La rotation des avant-bras, paume vers le haut puis vers le bas, prépare le coude et le poignet au changement de prise. Le curl marteau et l'extension très légers font ensuite passer un peu de charge dans les tendons, sans entamer ta force.",
        ],
      },
      {
        title: "Séance bras, ou bras en fin de séance",
        paragraphs: [
          "Pour une séance consacrée aux bras, fais la routine complète, puis une série légère de 12 à 15 répétitions sur ton premier exercice de biceps et sur ton premier exercice de triceps.",
          "Si les bras arrivent après les pecs ou le dos, ils ont déjà beaucoup travaillé pendant les développés ou les tirages. Pas besoin de refaire la routine : une série légère sur le premier exercice de bras suffit.",
        ],
      },
      {
        title: "Sans matériel",
        paragraphs: [
          "Sans haltère ni élastique, la routine devient plus longue et prépare tout ce qui porte le bras : cercles d'épaule, rotation des avant-bras et des poignets, rotation externe allongé sur le côté, flexions du coude poing serré et pompes scapulaires contre un mur. Choisis « Sans matériel » au-dessus de la routine.",
        ],
      },
    ],
    faqs: [
      { q: "Les rotations de bras servent-elles à s'échauffer ?", a: "Les rotations des avant-bras oui, avant les curls et les extensions : elles préparent le coude et le poignet. Les grands moulinets des épaules aident peu pour une séance bras, sauf en complément." },
      { q: "Faut-il échauffer biceps et triceps séparément ?", a: "La routine prépare les deux, avec un curl marteau et une extension très légers. Ensuite, fais une série légère sur le premier exercice de chaque muscle avant de charger." },
      { q: "Faut-il s'échauffer avant de faire les bras ?", a: "Oui, surtout pour les coudes : quelques minutes de mobilité des avant-bras et des coudes, puis une série légère de 12 à 15 répétitions avant la première série de travail de chaque exercice." },
      { q: "Et si j'ai mal au coude au curl ?", a: "Sous 3 sur 10, suis la routine « Une douleur ? » de l'accueil (zone « Coude ») et consulte le guide douleur au coude au curl biceps. Une douleur persistante au coude demande d'adapter la charge et la prise." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["pull", "push", "haut-du-corps"],
    links: [
      { href: "/douleur/coude-curl-biceps", label: "Mal au coude au curl biceps" },
      { href: "/echauffement/protection/poignets", label: "Échauffement des poignets" },
    ],
  },
  jambes: {
    slug: "jambes",
    zones: ["jambes", "fessiers"],
    template: "legs",
    cover: "squat",
    metaTitle: "Échauffement jambes (leg day) : la routine en {min} min",
    metaDescription:
      "L'échauffement jambes prêt à suivre avant squat, presse et fentes : chevilles, hanches, genoux, fessiers en {min} minutes. Démonstrations en images et mode guidé.",
    h1: "Échauffement jambes",
    kicker: "Leg day, avant squat, presse, fentes",
    keyAnswer:
      "Avant une séance jambes, l'échauffement prépare les chevilles, les hanches et les genoux : mobilisation de cheville genou au mur, squat profond assisté et good morning au poids du corps, puis glute bridge pour les fessiers et élévations de mollets. {min} minutes suffisent avant les séries d'approche sur le squat ou la presse.",
    needs: [
      { title: "Des chevilles mobiles", body: "Au squat, le genou doit pouvoir avancer au-dessus du pied sans que le talon décolle." },
      { title: "Des hanches qui descendent", body: "La flexion profonde de hanche permet de squatter bas en gardant le dos neutre." },
      { title: "Des genoux bien guidés", body: "Les fessiers gardent le genou dans l'axe du pied, surtout à la remontée." },
    ],
    guide: [
      {
        title: "Ce qui limite le squat, ce n'est pas le muscle",
        paragraphs: [
          "Les quadriceps et les fessiers se préparent sur les premières séries légères. Ce qui limite souvent le squat ou la presse, c'est la mobilité : une cheville raide fait décoller les talons ou plonger le buste, une hanche raide empêche de descendre en gardant le dos neutre.",
          "La routine commence donc par la cheville, la hanche et la charnière, avant d'activer les fessiers et les mollets.",
        ],
      },
      {
        title: "Selon ton premier exercice",
        paragraphs: [
          "Squat : la barre seule, puis 3 à 5 paliers jusqu'à ta charge de travail, en baissant les répétitions.",
          "Presse à cuisses : une série légère de 12 à 15 répétitions, puis deux paliers intermédiaires.",
          "Fentes : quelques fentes au poids du corps, en amplitude croissante, avant de prendre les haltères.",
          "Soulevé de terre roumain : 8 à 10 good mornings au poids du corps, puis la barre seule.",
        ],
      },
    ],
    faqs: [
      { q: "Comment s'échauffer pour le leg day ?", a: "Mobilisation de cheville au mur, squat profond assisté, good morning au poids du corps, puis glute bridge et élévations de mollets. Termine par des séries d'approche sur ton premier exercice, de la barre seule jusqu'à ta charge." },
      { q: "Comment s'échauffer les genoux avant le squat ?", a: "En préparant la cheville et la hanche, qui guident le genou, et en activant les fessiers. Si un genou est sensible, suis la routine « Une douleur ? » de l'accueil (zone « Genou ») et lis le guide douleur au genou au squat." },
      DUREE,
      ETIREMENTS,
    ],
    related: ["bas-du-corps", "fessiers", "full-body"],
    links: [
      { href: "/echauffement/exercice/squat", label: "Échauffement avant le squat" },
      { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement avant le soulevé de terre" },
      { href: "/douleur/genou-squat", label: "Douleur au genou pendant le squat" },
      { href: "/echauffement/protection/genou", label: "Échauffement genou sensible" },
    ],
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
    guide: [
      {
        title: "Réveiller le fessier avant la charge",
        paragraphs: [
          "Sur le hip thrust, les fentes ou le soulevé de terre roumain, le fessier doit prendre sa part dès la première série. S'il ne s'active pas, ce sont souvent les ischios ou le bas du dos qui compensent. Le glute bridge, avec deux secondes de contraction en haut, sert à sentir le muscle travailler avant la charge.",
          "Les transitions 90/90 et le good morning donnent l'amplitude de hanche que ces exercices demandent.",
        ],
      },
      {
        title: "Avant le hip thrust",
        paragraphs: [
          "Après la routine, fais une série de hip thrust sans charge ou avec la barre seule, puis monte en 2 ou 3 paliers jusqu'à ta charge de travail. Garde la règle du glute bridge : serre en haut, sans cambrer le bas du dos.",
        ],
      },
    ],
    faqs: [
      { q: "Comment activer ses fessiers avant la séance ?", a: "Avec un glute bridge de 10 répétitions, en serrant les fessiers deux secondes en haut. Il s'agit de réveiller, pas de fatiguer : les séries d'approche du premier exercice font le reste." },
      DUREE,
      { q: "Faut-il un élastique pour activer les fessiers ?", a: "Non : la routine fessiers se fait entièrement au poids du corps." },
      ETIREMENTS,
    ],
    related: ["bas-du-corps", "jambes"],
    links: [
      { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement avant le soulevé de terre" },
      { href: "/douleur/genou-squat", label: "Douleur au genou pendant le squat" },
    ],
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
    guide: [
      {
        title: "Du gainage dynamique, pas de longues planches",
        paragraphs: [
          "Le gainage avant un squat ou un soulevé de terre sert à réveiller les muscles qui gardent le dos neutre, pas à les fatiguer. Le bird dog et le dead bug le font en bougeant bras et jambes sans laisser le dos bouger : c'est ce que le tronc doit faire sous la barre.",
          "Une longue planche tenue jusqu'à la fatigue fait l'inverse : elle entame ces muscles avant la séance.",
        ],
      },
      {
        title: "Sous la barre",
        paragraphs: [
          "Avant chaque série lourde, inspire profondément dans le ventre et serre les abdominaux avant de descendre : c'est ce verrouillage, plus que l'échauffement, qui stabilise le dos sous la charge.",
        ],
      },
    ],
    faqs: [
      { q: "Faut-il faire du gainage avant le squat ?", a: "Un peu, oui : un ou deux exercices de gainage dynamique (dead bug, bird dog) réveillent les muscles profonds sans les fatiguer. Évite les longues planches qui épuisent avant la séance." },
      DUREE,
      { q: "Et si j'ai mal au bas du dos ?", a: "Sous 3 sur 10, suis la routine « Une douleur ? » de l'accueil (zone « Bas du dos ») : mobilité douce et renforcement léger, plus long qu'un échauffement. Lis aussi le guide douleur au bas du dos au soulevé de terre." },
      ETIREMENTS,
    ],
    related: ["bas-du-corps", "dos", "full-body"],
    links: [
      { href: "/echauffement/exercice/squat", label: "Échauffement avant le squat" },
      { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement avant le soulevé de terre" },
      { href: "/echauffement/protection/lombaires", label: "Échauffement avec des lombaires sensibles" },
    ],
  },
};

/** Durée réelle du plan affiché sur la page (moteur, version complète). */
export function landingMinutes(l: Pick<Landing, "zones" | "template" | "equipment">, short = false) {
  return buildSessionPlan({ zones: l.zones, template: l.template, lifts: [], pain: [], band: false, equipment: l.equipment ?? "gym", short }).minutes;
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
