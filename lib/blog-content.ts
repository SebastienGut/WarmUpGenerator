import type { SEOSource } from "@/components/SEOPage";
import { SOURCES } from "@/lib/content/sources";
export interface BlogSection {
  heading: string;
  content: string[];
}

export interface BlogPost {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  publishDate: string;
  readingTime: string;
  intro: string;
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
  relatedLinks: { href: string; label: string }[];
  /** Réponse autoportante de 40 à 60 mots, citable hors contexte, affichée « En bref » */
  keyAnswer?: string;
  /** Date (« 11 novembre 2026 ») de la dernière mise à jour réelle du contenu */
  updatedDate?: string;
  /** Références vérifiées (lib/content/sources.ts) */
  sources?: SEOSource[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pourquoi-s-echauffer-musculation",
    keyAnswer:
      "S'échauffer avant la musculation sert à arriver sur les séries lourdes avec les articulations mobilisées, les muscles stabilisateurs réveillés et le geste déjà répété avec des charges croissantes. Une revue de 32 études (Fradkin et coll., 2010) montre que l'échauffement améliore la performance dans environ 79 % des mesures. Cinq à huit minutes suffisent.",
    sources: [SOURCES.fradkin2010, SOURCES.mccrary2015, SOURCES.behm2016],
    updatedDate: "11 novembre 2026",
    metaTitle: "Pourquoi s'échauffer avant la musculation ? Ce que dit la science",
    metaDescription:
      "Les 3 raisons physiologiques qui rendent l'échauffement obligatoire avant toute séance de musculation — et comment le faire en 5 minutes chrono.",
    h1: "Pourquoi s'échauffer avant la musculation ?",
    publishDate: "19 mai 2026",
    readingTime: "4 min",
    intro:
      "L'échauffement est la partie de la séance que tout le monde sait nécessaire et que tout le monde saute quand il est pressé. C'est une erreur — pas parce que c'est une règle, mais parce que ça coûte des blessures et de la performance. Voilà ce qui se passe physiologiquement quand tu commences à froid, et pourquoi 5 minutes bien faites changent tout.",
    sections: [
      {
        heading: "Ce qui se passe dans un muscle à froid",
        content: [
          "À froid, un muscle se contracte un peu moins vite, et une articulation qui n'a pas bougé depuis des heures n'utilise pas toute son amplitude. Quelques minutes de mouvement changent ça : c'est l'effet le mieux établi de l'échauffement, lié à la hausse de température du muscle.",
          "Résultat concret : ta première série lourde à froid se fait avec un muscle moins rapide et un geste pas encore répété. Les tendons, moins vascularisés que les muscles, reçoivent la charge sans montée progressive.",
        ],
      },
      {
        heading: "Ce que l'échauffement apporte",
        content: [
          "<strong class='text-ink'>1. Une meilleure performance.</strong> Dans une revue de 32 études (Fradkin et coll., 2010), l'échauffement améliore la performance dans environ 79 % des mesures. Pour le haut du corps, les échauffements à charge élevée, comme les séries d'approche, améliorent la force et la puissance (McCrary et coll., 2015).",
          "<strong class='text-ink'>2. Des articulations préparées.</strong> La mobilité et l'activation font travailler les articulations du jour dans toute leur amplitude avant qu'elles ne portent une charge. Sur la prévention des blessures en musculation, les études restent rares : c'est un argument de bon sens plus qu'un chiffre.",
          "<strong class='text-ink'>3. Activation neuro-musculaire.</strong> L'échauffement spécifique programme le système nerveux sur le pattern de mouvement de la séance. Meilleur recrutement des unités motrices, meilleure coordination inter-musculaire. C'est pourquoi un athlète de force réalise toujours ses séries de chauffe progressives avant d'attaquer le poids de travail.",
        ],
      },
      {
        heading: "Les 3 phases d'un bon échauffement musculation",
        content: [
          "<strong class='text-ink'>Phase 1 — Articulaire (2 min) :</strong> mobilisation des articulations impliquées dans la séance. Objectif : répartir le liquide synovial, libérer les amplitudes de mouvement. Exemples : cercles d'épaules, rotations thoraciques, hip circles, cercles de cheville selon les groupes travaillés.",
          "<strong class='text-ink'>Phase 2 — Activation musculaire (3 min) :</strong> mouvements ciblés sur les muscles à travailler. Objectif : connexion neuro-musculaire, pré-activation des fibres sans les fatiguer. Les exercices sont spécifiques au groupe musculaire et à l'objectif de la séance.",
          "<strong class='text-ink'>Phase 3 — Séries de chauffe</strong> (hors plan du générateur) : sur les exercices polyarticulaires lourds, 2 à 3 séries progressives avec la barre avant le poids de travail. Cette phase est distincte de l'échauffement général ci-dessus.",
        ],
      },
      {
        heading: "L'erreur la plus commune : l'échauffement mal orienté",
        content: [
          "Quinze minutes de tapis roulant suivies d'étirements statiques. Double problème : le cardio prolongé crée une fatigue métabolique sans préparer les structures musculaires et articulaires spécifiques, et les étirements statiques longs avant l'effort réduisent un peu la force (environ 5 % en moyenne, surtout quand chaque étirement dure 60 secondes ou plus). Résultat : tu arrives sur ta première série de squat plus fatigué et moins fort que si tu n'avais rien fait.",
          "Un bon échauffement est <strong class='text-ink'>spécifique, bref et progressif</strong>. Il cible exactement ce que tu vas travailler, dure 5 à 8 minutes, et augmente progressivement l'intensité sans entamer les réserves.",
        ],
      },
    ],
    faqs: [
      {
        q: "Combien de temps faut-il s'échauffer avant la musculation ?",
        a: "5 à 8 minutes pour la majorité des séances. En dessous de 5 min, la température musculaire n'a pas eu le temps de monter suffisamment. Au-delà de 10 min, tu commences à fatiguer sans bénéfice supplémentaire. Le générateur propose une routine de 6 minutes par séance ; le calculateur de séries d'approche allonge ensuite la montée en charge quand ta première série est lourde.",
      },
      {
        q: "Faut-il s'étirer avant la musculation ?",
        a: "Non, pas en statique long. Tenus 60 secondes ou plus, les étirements statiques réduisent un peu la force, d'environ 5 % en moyenne ; courts, leur effet est faible. Privilégie la mobilité dynamique (mouvements en amplitude croissante) et l'activation musculaire. Les étirements statiques ont leur place en fin de séance ou les jours off.",
      },
      {
        q: "L'échauffement est-il vraiment nécessaire si on fait des séries légères ?",
        a: "Même pour une séance légère, l'échauffement réduit les contraintes tendineuses et améliore la connexion neuro-musculaire. Un plan de 3 minutes suffit dans ce cas — le générateur adapte la durée selon ton niveau d'intensité.",
      },
    ],
    relatedLinks: [
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps s'échauffer ?" },
      { href: "/blog/echauffement-dynamique-ou-statique", label: "Dynamique ou statique ?" },
      { href: "/echauffement/exercice/squat", label: "Échauffement avant squat" },
      { href: "/echauffement/exercice/developpe-couche", label: "Échauffement avant développé couché" },
    ],
  },

  {
    slug: "combien-de-temps-s-echauffer-musculation",
    keyAnswer:
      "Un échauffement de musculation dure 5 à 8 minutes : de la mobilité et de l'activation ciblées sur les zones de la séance, puis des séries d'approche sur le premier exercice. Compte 2 à 3 minutes de plus pour une séance de force lourde, une salle froide ou une articulation sensible. Vingt minutes de cardio ne sont pas nécessaires.",
    updatedDate: "11 novembre 2026",
    metaTitle: "Combien de temps s'échauffer en musculation ? (5 à 8 min)",
    metaDescription:
      "5 à 8 minutes suffisent avant la musculation : un peu plus pour la force, le froid ou une zone sensible, sans cardio. Le détail selon ton objectif.",
    h1: "Combien de temps s'échauffer en musculation ?",
    publishDate: "19 mai 2026",
    readingTime: "3 min",
    intro:
      "5 minutes, 10 minutes, 15 minutes — tout le monde a un avis différent. La réalité, c'est que la durée idéale d'échauffement dépend de 4 variables : l'objectif de la séance, les groupes musculaires travaillés, la présence de zones sensibles, et la température ambiante. Voilà comment calibrer précisément.",
    sections: [
      {
        heading: "La règle de base : 5 à 8 minutes",
        content: [
          "C'est la bonne plage pour la plupart des séances. En dessous de 5 minutes, il est difficile de mobiliser et d'activer les zones du jour. Au-delà de 10 à 15 minutes, l'échauffement commence à prendre sur l'énergie de la séance sans rien préparer de plus.",
          "C'est l'erreur classique des pratiquants qui passent 20 minutes sur le tapis avant de squatter : ils arrivent à leur première série de travail déjà entamés.",
        ],
      },
      {
        heading: "Ajuster selon l'objectif de la séance",
        content: [
          "<strong class='text-ink'>Force (charges maximales, 1 à 5 reps) :</strong> plutôt 8 minutes. Tu vas demander un recrutement maximal des unités motrices dès la première série. L'activation neuro-musculaire doit être complète avant d'attaquer des charges lourdes.",
          "<strong class='text-ink'>Hypertrophie (volume, 8 à 15 reps) :</strong> 5 à 6 minutes suffisent. La connexion mind-muscle est plus importante que l'activation pure — tu as besoin de sentir le muscle, pas de recruter un maximum d'unités motrices.",
          "<strong class='text-ink'>Mobilité :</strong> l'échauffement s'intègre directement dans la séance. Il n'y a pas de phase séparée.",
          "<strong class='text-ink'>Reprise après blessure ou long break :</strong> 8 à 10 minutes, rythme lent, amplitudes réduites au début. Les tissus reviennent en charge progressivement.",
        ],
      },
      {
        heading: "Ajuster selon la température ambiante",
        content: [
          "<strong class='text-ink'>Salle chauffée ou été :</strong> retire 1 à 2 minutes — ton corps est déjà à une température proche de l'optimale. L'échauffement sera plus rapide.",
          "<strong class='text-ink'>Salle froide ou hiver :</strong> ajoute 2 à 3 minutes minimum. Par temps froid, les muscles descendent à 34-35°C — il faut plus de temps pour atteindre les 38-39°C qui optimisent la contraction musculaire.",
          "Si tu arrives directement de l'extérieur par temps froid, compte systématiquement 8 minutes quelle que soit l'intensité de la séance.",
        ],
      },
      {
        heading: "Avec une zone sensible : rallonger systématiquement",
        content: [
          "Épaule, genou, lombaires ou poignets fragiles ? Ajoute 2 à 3 minutes de protocole spécifique à ta gêne. Les tissus fragilisés — tendons partiellement lésés, tissu cicatriciel, cartilage inflammé — montent en température plus lentement et nécessitent une mise en charge très progressive.",
          "C'est la principale protection contre la rechute. Ce n'est pas facultatif.",
        ],
      },
    ],
    faqs: [
      {
        q: "Est-ce que 3 minutes d'échauffement suffisent ?",
        a: "Pour une séance légère ou de mobilité, oui. Pour des charges lourdes (80 %+ du max), non — 5 à 8 minutes sont nécessaires pour que les tendons et les articulations soient prêts. Le générateur propose une routine de 6 minutes : assez pour préparer, sans entamer ta séance.",
      },
      {
        q: "Pourquoi ne pas faire 20 minutes d'échauffement pour être sûr ?",
        a: "Au-delà de 10-12 minutes d'effort, tu entames tes réserves énergétiques et crées une pré-fatigue neuromusculaire. Tes séries de travail sont moins performantes. Un échauffement bien ciblé de 5 à 8 minutes est plus efficace qu'un long échauffement générique.",
      },
      {
        q: "Faut-il s'échauffer entre les exercices d'une même séance ?",
        a: "Non, pas d'échauffement complet. En revanche, sur le premier exercice d'un nouveau groupe musculaire ou un exercice polyarticulaire lourd, une série de chauffe avec charge réduite est recommandée avant les séries de travail.",
      },
    ],
    relatedLinks: [
      { href: "/blog/pourquoi-s-echauffer-musculation", label: "Pourquoi s'échauffer ?" },
      { href: "/blog/echauffement-dynamique-ou-statique", label: "Dynamique ou statique ?" },
      { href: "/echauffement/full-body", label: "Plan full body 6 min" },
      { href: "/echauffement/protection/lombaires", label: "Échauffement lombaires sensibles" },
    ],
  },

  {
    slug: "echauffement-dynamique-ou-statique",
    keyAnswer:
      "Avant la musculation, l'échauffement dynamique est préférable : des mouvements contrôlés dans toute l'amplitude, puis une activation légère. Les étirements statiques tenus 60 secondes ou plus réduisent la force d'environ 5 % en moyenne ; plus courts, leur effet est faible. Les étirements longs se font après la séance ou les jours de repos.",
    updatedDate: "11 novembre 2026",
    sources: [SOURCES.simic2013, SOURCES.behm2016],
    metaTitle: "Échauffement dynamique ou statique avant la musculation ?",
    metaDescription:
      "Les étirements statiques longs avant l'effort font perdre un peu de force. Ce que disent les études et comment s'échauffer pour performer.",
    h1: "Échauffement dynamique ou statique — que choisir ?",
    publishDate: "19 mai 2026",
    readingTime: "4 min",
    intro:
      "Depuis les années 2000, les études s'accumulent et le message est sans équivoque : les étirements statiques avant un effort de force réduisent les performances. Pourtant, des millions de pratiquants s'étirent encore avant de soulever. Voilà ce que dit la science, et quelle approche adopter.",
    sections: [
      {
        heading: "Le verdict scientifique sur les étirements statiques",
        content: [
          "Une méta-analyse de 2013 portant sur 104 études (Simic et coll.) trouve que les étirements statiques avant un effort de force réduisent la force maximale d'environ <strong class='text-ink'>5 % en moyenne</strong>. Une revue de 2016 (Behm et coll.) précise que l'effet tient surtout aux étirements de 60 secondes ou plus par muscle ; en dessous, il devient faible.",
          "Le mécanisme le plus souvent avancé : l'étirement statique réduit l'activation nerveuse du muscle étiré. Plus l'étirement est long, plus la baisse est nette : au-delà de 60 secondes par muscle, elle devient mesurable sur la première série.",
        ],
      },
      {
        heading: "L'échauffement dynamique : ce que ça signifie concrètement",
        content: [
          "Dynamique ne veut pas dire sauter dans tous les sens. Un échauffement dynamique, ce sont des <strong class='text-ink'>mouvements contrôlés, en amplitude croissante, qui imitent les patterns du mouvement de travail</strong>. Des cercles d'épaules progressifs avant le développé couché. Des rotations thoraciques avant le rowing. Des hip circles avant le squat. Des cercles de cheville avant les fentes.",
          "L'objectif est de répartir le liquide synovial, d'augmenter progressivement l'amplitude de mouvement, et d'activer le système nerveux — sans inhiber la tonicité musculaire nécessaire à la production de force.",
        ],
      },
      {
        heading: "Les étirements statiques ont-ils un rôle en musculation ?",
        content: [
          "Oui — <strong class='text-ink'>après l'effort ou les jours off</strong>. En fin de séance, les étirements statiques améliorent la récupération et développent la souplesse à long terme. Le problème n'est pas l'étirement statique en soi. C'est son placement avant l'effort.",
          "Pour un gain de souplesse réel, les étirements doivent être maintenus 60 à 90 secondes — c'est le seuil minimal pour remodeler le tissu conjonctif. Ce type d'étirement n'a rien à faire avant une série de squat.",
        ],
      },
      {
        heading: "La méthode complète, de l'entrée en salle au retour vestiaire",
        content: [
          "<strong class='text-ink'>Avant la séance (5-8 min) :</strong> mobilité dynamique ciblée sur les articulations sollicitées + activation musculaire spécifique. C'est ce que le générateur construit pour toi à partir des exercices de ta séance.",
          "<strong class='text-ink'>Début de chaque exercice polyarticulaire lourd :</strong> 2 à 3 séries de chauffe progressives avec charge réduite avant le poids de travail.",
          "<strong class='text-ink'>Après la séance :</strong> étirements statiques des groupes travaillés, 30 à 60 secondes par groupe. Favorise la récupération et le maintien de la souplesse.",
          "<strong class='text-ink'>Jours off :</strong> routine de mobilité ou étirements statiques longs (60-90 sec) pour le gain de souplesse réel sur le long terme.",
        ],
      },
    ],
    faqs: [
      {
        q: "Les étirements dynamiques améliorent-ils la souplesse ?",
        a: "Sur le court terme (amplitude disponible pour la séance), oui. Pour un gain de souplesse durable, les étirements statiques longs (60-90 sec) en fin de séance ou les jours off sont plus efficaces. Les deux ont un rôle — à des moments différents.",
      },
      {
        q: "Peut-on faire quelques secondes d'étirements statiques avant l'effort ?",
        a: "Des étirements statiques courts (moins de 60 secondes par muscle) ont un effet faible sur la force ; l'effet devient net au-delà (Behm et coll., 2016). Avant la séance, la mobilité dynamique reste plus utile.",
      },
      {
        q: "L'échauffement dynamique améliore-t-il les performances le jour même ?",
        a: "Oui : dans une revue de 2010 (Fradkin et coll.), l'échauffement améliore la performance dans environ 79 % des mesures étudiées. La mobilité dynamique + l'activation musculaire spécifique permettent d'arriver à la première série de travail avec un recrutement neuro-musculaire optimal.",
      },
    ],
    relatedLinks: [
      { href: "/blog/pourquoi-s-echauffer-musculation", label: "Pourquoi s'échauffer ?" },
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps s'échauffer ?" },
      { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement soulevé de terre" },
      { href: "/echauffement/haut-du-corps", label: "Plan haut du corps" },
    ],
  },
  {
    slug: "guide-complet-echauffement-musculation",
    metaTitle: "Comment s'échauffer avant la musculation : le guide complet",
    metaDescription:
      "Comment s'échauffer avant la musculation : mobilité, activation puis séries d'approche, 5 à 8 minutes, sans cardio ni étirements longs. Avec les études.",
    h1: "Comment s'échauffer avant la musculation",
    publishDate: "19 mai 2026",
    updatedDate: "11 novembre 2026",
    readingTime: "6 min",
    keyAnswer:
      "Pour s'échauffer avant la musculation, compte 5 à 8 minutes en trois temps : quelques mouvements de mobilité pour les articulations du jour, deux ou trois exercices d'activation légers pour les muscles qui les stabilisent, puis des séries d'approche de plus en plus lourdes sur le premier exercice. Le cardio n'est pas nécessaire, et les étirements statiques longs se gardent pour après.",
    sources: [SOURCES.fradkin2010, SOURCES.mccrary2015, SOURCES.behm2016, SOURCES.simic2013],
    intro:
      "La plupart des gens s'échauffent soit trop peu (deux moulinets de bras et on charge), soit à côté (vingt minutes de tapis puis des étirements). Un bon échauffement de musculation est court et précis : il prépare les articulations et les muscles de la séance du jour, puis il amène progressivement à la charge de travail. Voici comment le construire, avec un exemple chiffré et ce que disent les études.",
    sections: [
      {
        heading: "Les trois temps de l'échauffement",
        content: [
          "<strong class='text-ink'>1. La mobilité, 1 à 2 minutes.</strong> Des mouvements contrôlés dans toute l'amplitude, sur les articulations que la séance va solliciter : épaules et haut du dos pour les développés et les tirages, hanches et chevilles pour le squat et le soulevé de terre. Pas de charge, pas de rebond, pas de douleur.",
          "<strong class='text-ink'>2. L'activation, 2 à 3 minutes.</strong> Deux ou trois exercices légers pour les muscles qui stabilisent les articulations du jour : la coiffe des rotateurs et les muscles des omoplates pour le haut du corps, les fessiers et le gainage pour le bas. Ils doivent réveiller, pas fatiguer : on s'arrête bien avant la brûlure.",
          "<strong class='text-ink'>3. Les séries d'approche, sur le premier exercice.</strong> C'est la partie la plus spécifique : le même mouvement que ta série de travail, avec des charges croissantes et des répétitions décroissantes. En général 2 à 4 paliers, le dernier entre 75 et 90 % de ta charge de travail, puis 2 à 3 minutes de repos avant la première vraie série.",
          "Le cardio n'a pas sa place obligatoire dans cette liste. Quelques minutes de vélo peuvent aider si tu arrives frigorifié, mais elles ne préparent ni les épaules ni les hanches. La mobilité et l'activation montent déjà la température des zones qui vont travailler.",
        ],
      },
      {
        heading: "Un exemple concret : avant une séance pecs",
        content: [
          "<strong class='text-ink'>Mobilité :</strong> cat-cow, 6 cycles, pour faire bouger la colonne et le haut du dos.",
          "<strong class='text-ink'>Activation :</strong> pompes scapulaires sur un banc, 10 répétitions, pour le grand dentelé ; rotation externe à la poulie, coude au corps, 10 par côté, pour la coiffe des rotateurs. Trois minutes en tout.",
          "<strong class='text-ink'>Séries d'approche</strong> pour un développé couché à 80 kg × 5 : barre seule × 8, puis 40 kg × 5, 55 kg × 4 et 70 kg × 2, avec 30 secondes à 1 minute entre les premiers paliers et 3 minutes avant la série de travail.",
          "C'est exactement ce que propose <a href='/echauffement/pecs' class='font-semibold text-ink underline underline-offset-2'>l'échauffement pectoraux</a> de Warmup Generator, et le <a href='/series-approche?ex=developpe-couche&charge=80&reps=5' class='font-semibold text-ink underline underline-offset-2'>calculateur de séries d'approche</a> refait le calcul avec ta propre charge.",
        ],
      },
      {
        heading: "Ce que disent les études",
        content: [
          "<strong class='text-ink'>L'échauffement améliore la performance.</strong> Dans une revue de 2010 portant sur 32 études (Fradkin et coll.), l'échauffement améliore la performance dans environ 79 % des mesures étudiées. Pour le haut du corps, une revue de 2015 portant sur 31 essais (McCrary et coll.) trouve des preuves solides que les échauffements dynamiques à charge élevée, comme les séries d'approche, améliorent la force et la puissance.",
          "<strong class='text-ink'>Sur les blessures, les preuves manquent.</strong> La même revue n'a trouvé aucune étude mesurant l'effet de l'échauffement du haut du corps sur les blessures. L'argument raisonnable est ailleurs : arriver sur une charge lourde avec le geste déjà répété et les articulations déjà mobilisées.",
          "<strong class='text-ink'>Les étirements statiques longs coûtent un peu de force.</strong> Une méta-analyse de 104 études (Simic et coll., 2013) trouve une baisse moyenne d'environ 5 % de la force maximale après des étirements statiques. Une revue de 2016 (Behm et coll.) précise que l'effet tient surtout aux étirements de 60 secondes ou plus par muscle ; courts, ils changent peu de chose.",
        ],
      },
      {
        heading: "Combien de temps y passer",
        content: [
          "Compte <strong class='text-ink'>5 à 8 minutes</strong> avant les séries d'approche : 2 à 3 minutes de plus si tu fais une séance de force lourde, si la salle est froide ou si une articulation est sensible. Au-delà de 10 à 15 minutes, l'échauffement commence à prendre sur l'énergie de la séance sans rien préparer de plus.",
          "Les séries d'approche, elles, durent le temps qu'il faut pour monter jusqu'à ta charge. Plus la charge de travail est lourde, plus il y a de paliers. Le détail selon ton objectif est dans <a href='/blog/combien-de-temps-s-echauffer-musculation' class='font-semibold text-ink underline underline-offset-2'>combien de temps s'échauffer</a>.",
        ],
      },
      {
        heading: "Adapter l'échauffement à ta séance",
        content: [
          "<strong class='text-ink'>Push (pecs, épaules, triceps) :</strong> l'épaule avant tout, avec la coiffe des rotateurs et les omoplates. Voir <a href='/echauffement/push' class='font-semibold text-ink underline underline-offset-2'>l'échauffement push day</a>.",
          "<strong class='text-ink'>Pull (dos, biceps) :</strong> omoplates, haut du dos, épaules au-dessus de la tête. Voir <a href='/echauffement/pull' class='font-semibold text-ink underline underline-offset-2'>l'échauffement pull day</a> ou <a href='/echauffement/exercice/tractions' class='font-semibold text-ink underline underline-offset-2'>avant les tractions</a>.",
          "<strong class='text-ink'>Jambes :</strong> chevilles, hanches, fessiers. Voir <a href='/echauffement/jambes' class='font-semibold text-ink underline underline-offset-2'>l'échauffement jambes</a> ou <a href='/echauffement/exercice/squat' class='font-semibold text-ink underline underline-offset-2'>avant le squat</a>.",
          "<strong class='text-ink'>Tout le corps :</strong> un peu de chaque, à doses réduites. Voir <a href='/echauffement/full-body' class='font-semibold text-ink underline underline-offset-2'>l'échauffement full body</a>, ou <a href='/echauffement/sans-materiel' class='font-semibold text-ink underline underline-offset-2'>sans matériel</a> si tu t'entraînes à la maison.",
        ],
      },
      {
        heading: "Avec une articulation qui gêne",
        content: [
          "Une épaule, un genou ou un bas du dos sensible ne demandent pas de renoncer à la séance, mais de lui donner plus de temps : de la mobilité douce et un renforcement léger de la zone, avant l'échauffement habituel. Le repère courant en rééducation : une gêne qui reste sous 3 sur 10 pendant l'effort et qui a disparu le lendemain est compatible avec l'entraînement.",
          "La routine <a href='/routine-douleur' class='font-semibold text-ink underline underline-offset-2'>« Une douleur ? »</a> construit cette préparation par articulation, et les <a href='/douleur' class='font-semibold text-ink underline underline-offset-2'>pages douleur</a> expliquent d'où vient la gêne exercice par exercice.",
        ],
      },
      {
        heading: "Les erreurs les plus fréquentes",
        content: [
          "<strong class='text-ink'>Charger directement.</strong> Même pressé, garde au moins les séries d'approche : ce sont elles qui préparent le geste à la charge.",
          "<strong class='text-ink'>Remplacer l'échauffement par du cardio.</strong> Le tapis élève la température générale, mais ne prépare ni la coiffe des rotateurs ni la cheville.",
          "<strong class='text-ink'>S'étirer longuement avant de soulever.</strong> Garde les étirements de 60 secondes et plus pour la fin de séance ou les jours de repos.",
          "<strong class='text-ink'>Faire le même échauffement pour toutes les séances.</strong> Un échauffement avant le squat ne ressemble pas à un échauffement avant le développé couché.",
          "<strong class='text-ink'>Fatiguer les muscles avant la séance.</strong> L'activation sert à réveiller : si tu sens la brûlure, c'est trop.",
        ],
      },
    ],
    faqs: [
      {
        q: "Peut-on faire de la musculation sans s'échauffer ?",
        a: "On peut, mais on commence ses premières séries lourdes sans avoir répété le geste ni mobilisé les articulations. Les séries d'approche sur le premier exercice sont le minimum à garder, même quand le temps manque.",
      },
      {
        q: "Faut-il s'échauffer avant chaque exercice ?",
        a: "Pas complètement. Après le premier exercice, une ou deux séries légères suffisent quand tu changes de mouvement ou de groupe musculaire, par exemple une série de rowing légère après le développé couché.",
      },
      {
        q: "Combien de séries d'approche faire ?",
        a: "En général 2 à 4, avec des répétitions décroissantes et un dernier palier entre 75 et 90 % de la charge de travail. Plus la charge est lourde, plus il y a de paliers. Le calculateur de séries d'approche donne le détail avec les disques par côté.",
      },
      {
        q: "L'échauffement est-il différent pour un débutant ?",
        a: "Le principe est le même. Un débutant qui travaille avec des charges légères a besoin de moins de paliers d'approche, mais gagne beaucoup à faire la mobilité et l'activation : c'est là qu'il apprend les positions des exercices.",
      },
      {
        q: "Existe-t-il un outil pour savoir comment s'échauffer ?",
        a: "Warmup Generator donne une routine prête à suivre selon ta séance (push, pull, jambes, haut du corps, full body) et ton matériel, avec une démonstration de chaque exercice et un mode guidé. C'est gratuit, sans compte, et ça fonctionne hors ligne.",
      },
    ],
    relatedLinks: [
      { href: "/echauffement", label: "Tous les échauffements prêts à suivre" },
      { href: "/series-approche", label: "Calculateur de séries d'approche" },
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps s'échauffer ?" },
      { href: "/blog/echauffement-dynamique-ou-statique", label: "Dynamique ou statique ?" },
      { href: "/blog/erreurs-echauffement-musculation", label: "Les erreurs d'échauffement" },
      { href: "/blog/echauffement-debutant-musculation", label: "Échauffement pour débutant" },
    ],
  },

  {
    slug: "echauffement-debutant-musculation",
    keyAnswer:
      "Un débutant en musculation peut s'échauffer en 5 minutes sans matériel : cercles d'épaules, cercles de hanches, rotations des poignets et flexions de genoux, cat-cow, puis 10 pompes contre un mur ou sur les genoux, remplacées par 10 squats lents avant une séance jambes. Ensuite, une série légère sur le premier exercice.",
    updatedDate: "11 novembre 2026",
    sources: [SOURCES.behm2016],
    metaTitle: "Échauffement musculation débutant — par où commencer",
    metaDescription:
      "Tu débutes en musculation et tu ne sais pas comment t'échauffer ? Voici un protocole simple en 5 minutes, sans matériel, adapté aux débutants.",
    h1: "Échauffement musculation débutant — le protocole simple",
    publishDate: "26 mai 2026",
    readingTime: "4 min",
    intro:
      "Quand on commence la musculation, l'échauffement est la première chose qu'on sacrifie — soit parce qu'on ne sait pas quoi faire, soit parce qu'on pense que ça ne sert à rien quand les charges sont légères. C'est une erreur. Voici un protocole simple, sans matériel, que tu peux reproduire dès ta prochaine séance.",
    sections: [
      {
        heading: "Pourquoi l'échauffement est encore plus important pour un débutant",
        content: [
          "Contre-intuitivement, les débutants ont encore plus besoin de s'échauffer que les pratiquants confirmés. Deux raisons principales : d'abord, la <strong class='text-ink'>technique n'est pas encore automatisée</strong>. Sur un squat ou un développé couché, le système nerveux doit « câbler » le bon pattern de mouvement à chaque répétition. Un corps froid et un système nerveux non activé rendent ce câblage plus difficile — tu apprends moins bien et tu compenses davantage.",
          "Ensuite, les tendons et les articulations d'un débutant ne sont <strong class='text-ink'>pas encore adaptés au stress mécanique</strong> de la musculation. La progression est rapide au début, les charges augmentent vite — et les tendons mettent plus de temps que les muscles à s'adapter. L'échauffement est ta première protection contre les tendinites qui surviennent précisément à cette période de progression rapide.",
        ],
      },
      {
        heading: "Le protocole 5 minutes — sans matériel",
        content: [
          "<strong class='text-ink'>1 min — Rotation des épaules :</strong> grands cercles vers l'arrière (30s), puis vers l'avant (30s). Lubrifie les articulations gléno-humérales. Fais-les lentement et en amplitude maximale.",
          "<strong class='text-ink'>1 min — Hip circles :</strong> mains sur les hanches, pieds écartés à largeur d'épaules. Trace de grands cercles avec le bassin, 8 dans un sens, 8 dans l'autre. Mobilise les hanches pour tous les exercices de jambes.",
          "<strong class='text-ink'>1 min — Cercles de poignets et flexions de genou :</strong> 30s de rotations de poignets dans les deux sens (important avant tous les exercices avec barre), puis 10 flexions légères de genoux — juste pour lubrifier.",
          "<strong class='text-ink'>1 min — Cat-cow :</strong> à quatre pattes, alterne dos rond et dos creux, 10 cycles lentement. Mobilise toute la colonne avant les exercices en charge axiale.",
          "<strong class='text-ink'>1 min — Pompes à amplitude réduite :</strong> 10 pompes contre le mur ou sur les genoux. Active les pectoraux, épaules et triceps en douceur. Si tu fais une séance jambes, remplace par 10 squats lents au poids du corps.",
        ],
      },
      {
        heading: "Adapter selon la séance du jour",
        content: [
          "Le protocole ci-dessus est généraliste — il prépare l'ensemble des articulations. Selon les exercices de ta séance, adapte-le :",
          "<strong class='text-ink'>Séance haut du corps :</strong> insiste sur les rotations d'épaules et les poignets. Ajoute 5 cercles de bras lents avant de prendre la barre.",
          "<strong class='text-ink'>Séance bas du corps :</strong> insiste sur les hip circles et les flexions de genoux. Ajoute des rotations de cheville (10 dans chaque sens) — les chevilles sont souvent les premières à limiter la profondeur de squat.",
          "<strong class='text-ink'>Full body :</strong> le protocole 5 minutes complet suffit — il couvre tout.",
          "La règle la plus importante : <strong class='text-ink'>fais-le systématiquement</strong>. Un échauffement moyen fait à chaque séance vaut mieux que l'échauffement parfait fait une fois sur deux.",
        ],
      },
      {
        heading: "Les erreurs typiques du débutant",
        content: [
          "<strong class='text-ink'>Erreur 1 : s'étirer statiquement avant de soulever.</strong> Les étirements statiques (tenir une position en forçant l'amplitude) tenus longtemps avant l'effort réduisent un peu la force, d'environ 5 % en moyenne. Tu ne le sens pas, mais la différence est mesurable. Garde les étirements statiques pour après la séance.",
          "<strong class='text-ink'>Erreur 2 : considérer les premières séries légères comme échauffement.</strong> Faire ses premières séries à charge légère n'est pas la même chose qu'un échauffement articulaire et musculaire. Les deux sont nécessaires — l'un prépare le corps, l'autre programme le geste.",
          "<strong class='text-ink'>Erreur 3 : s'échauffer une fois et ne plus y penser.</strong> L'échauffement se fait à chaque séance, pas seulement quand on se « sent raide ». Le corps ne donne pas toujours de signaux avant une blessure — il donne des signaux après.",
        ],
      },
    ],
    faqs: [
      {
        q: "Faut-il s'échauffer même avec des charges légères ?",
        a: "Oui. La charge légère ne protège pas les tendons et les articulations du stress mécanique si le corps est froid. L'échauffement prépare aussi le système nerveux à coordonner le mouvement — plus important encore pour un débutant qui apprend encore les patterns.",
      },
      {
        q: "Combien de temps s'échauffer quand on débute ?",
        a: "5 minutes suffisent pour la plupart des séances de débutant. L'essentiel est que ce soit systématique et ciblé sur les articulations que tu vas solliciter. Au fur et à mesure que les charges augmentent, l'échauffement devra durer 7-8 minutes.",
      },
      {
        q: "Le générateur s'adapte-t-il aux débutants ?",
        a: "Oui — choisis ta séance et ton matériel : la routine de 6 minutes n'utilise que des exercices simples, au poids du corps ou très légers, réalisables sans expérience préalable.",
      },
      {
        q: "Faut-il s'échauffer différemment si on est très débutant ?",
        a: "Le protocole ci-dessus est conçu pour ça — zéro matériel, zéro technique complexe. La seule adaptation : ralentis encore plus chaque mouvement et reste bien en dessous de ta limite d'amplitude. L'échauffement du débutant est aussi un moment d'exploration des amplitudes de mouvement disponibles.",
      },
    ],
    relatedLinks: [
      { href: "/blog/pourquoi-s-echauffer-musculation", label: "Pourquoi s'échauffer ?" },
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps ?" },
      { href: "/echauffement/full-body", label: "Plan full body 6 min" },
      { href: "/echauffement/haut-du-corps", label: "Plan haut du corps" },
    ],
  },

  {
    slug: "echauffement-pecs-musculation",
    keyAnswer:
      "Avant une séance pectoraux, l'échauffement prépare surtout l'épaule, en 5 minutes : rotation thoracique à quatre pattes, ouverture pectorale contre un mur, pompes scapulaires pour le grand dentelé, rotation externe à l'élastique pour la coiffe des rotateurs, puis 10 répétitions à la barre vide avant les séries d'approche du développé couché.",
    updatedDate: "11 novembre 2026",
    sources: [SOURCES.kolber2010, SOURCES.mccrary2015],
    metaTitle: "Échauffement pecs musculation — avant développé couché",
    metaDescription:
      "Comment s'échauffer les pectoraux avant une séance de développé couché ? Activation coiffe, mobilité thoracique, grand dentelé — protocole en 5 min.",
    h1: "Échauffement pecs — préparer la séance pectoraux",
    publishDate: "28 mai 2026",
    readingTime: "4 min",
    intro:
      "La douleur d'épaule au développé couché est l'une des gênes les plus fréquentes en salle. Elle vient souvent d'une épaule mal préparée : coiffe des rotateurs pas encore active, haut du dos raide, grand dentelé endormi. Voici comment préparer correctement les pectoraux, et l'épaule qui va avec, avant chaque séance.",
    sections: [
      {
        heading: "Ce qui limite vraiment le développé couché",
        content: [
          "Le développé couché n'est pas un exercice de pectoraux isolé. Il implique simultanément les <strong class='text-ink'>pectoraux</strong> (moteur principal), la <strong class='text-ink'>coiffe des rotateurs</strong> (stabilisateurs de l'articulation gléno-humérale), le <strong class='text-ink'>grand dentelé</strong> (qui contrôle le mouvement des omoplates) et la <strong class='text-ink'>mobilité thoracique</strong> (qui détermine l'amplitude et la sécurité du mouvement).",
          "Un développé couché fait sans préparation sollicite toutes ces structures à froid. Le premier à céder est presque toujours la coiffe — et une fois la tendinite installée, elle met des semaines à partir. Cinq minutes d'échauffement spécifique changent tout.",
        ],
      },
      {
        heading: "Le protocole pectoraux en 5 étapes",
        content: [
          "<strong class='text-ink'>Étape 1 — Mobilisation thoracique en rotation (1 min) :</strong> à quatre pattes, main droite derrière la tête. Coude vers l'intérieur puis ouvre vers le plafond. La cage thoracique tourne. 8 répétitions par côté. Sans cette mobilité, tu ne peux pas arriver en bas du développé couché avec une arche propre.",
          "<strong class='text-ink'>Étape 2 — Ouverture pectorale contre le mur (45s) :</strong> bras à 90°, paume contre un mur. Pivote doucement le corps en éloignant le buste du bras. Étire le pec mineur souvent raccourci. 15s par côté, 2 fois.",
          "<strong class='text-ink'>Étape 3 — Pompes scapulaires (1 min) :</strong> position planche, coudes verrouillés. Les omoplates glissent : rétraction puis protraction. 12 répétitions. Active le grand dentelé.",
          "<strong class='text-ink'>Étape 4 — Rotations externes à l'élastique (1 min) :</strong> coude collé au flanc, avant-bras à 90°. Rotation externe contre une résistance légère. 12 répétitions par bras. Active la coiffe des rotateurs.",
          "<strong class='text-ink'>Étape 5 — Chauffe à la barre vide (1 min) :</strong> allonge-toi sur le banc, omoplates rétractées, dos légèrement cambré. 10 répétitions à la barre vide en explorant la trajectoire. Verrouille le pattern moteur.",
        ],
      },
      {
        heading: "Le setup du DC : les détails qui changent tout",
        content: [
          "<strong class='text-ink'>Les omoplates en premier :</strong> avant de toucher la barre, rétracte et déprime les omoplates (tire-les vers l'arrière et vers le bas). Ce verrouillage scapulaire crée une plateforme stable pour l'épaule.",
          "<strong class='text-ink'>La trajectoire :</strong> la barre descend vers le bas du sternum, pas vers le cou. Elle remonte en décrivant une légère courbe vers les yeux, pas verticalement. Cette trajectoire naturelle réduit le stress sur les tendons de la coiffe.",
          "<strong class='text-ink'>La respiration :</strong> inspire avant de descendre la barre (pression intra-abdominale), expire en poussant. Ce bracing protège les épaules à chaque répétition.",
        ],
      },
      {
        heading: "Signes que ton échauffement était insuffisant",
        content: [
          "Si tu ressens une gêne dans la zone antérieure de l'épaule après une séance pecs, c'est presque toujours le signe d'une coiffe non préparée soumise à un stress inhabituel. Ce n'est pas une blessure en soi — c'est un signal d'alarme.",
          "Si tu ressens un pincement sous la clavicule (signe d'impingement), c'est souvent lié à un grand dentelé trop peu actif qui laisse les omoplates monter au lieu de se stabiliser. Les pompes scapulaires de ce protocole adressent exactement ça.",
        ],
      },
    ],
    faqs: [
      {
        q: "Faut-il s'échauffer les pecs si on fait du DC haltères plutôt que barre ?",
        a: "Oui — le protocole est le même. Le DC haltères offre même plus de liberté de mouvement à l'épaule, ce qui peut augmenter le stress sur la coiffe si elle n'est pas activée. L'échauffement coiffe + grand dentelé est aussi important sur haltères que sur barre.",
      },
      {
        q: "Peut-on remplacer l'élastique par autre chose pour les rotations externes ?",
        a: "Oui — un câble à la poulie basse fonctionne parfaitement. En l'absence de matériel, des rotations externes isométriques (pousser l'avant-bras contre la paume de l'autre main) offrent une activation suffisante pour une séance légère.",
      },
      {
        q: "J'ai souvent mal à l'épaule au DC — l'échauffement suffit-il ?",
        a: "L'échauffement réduit fortement le risque mais ne règle pas une blessure existante. Si la douleur est présente même avec un bon échauffement, consulte un kiné avant de continuer. Une douleur chronique vient souvent d'un déséquilibre pousseurs/tireurs.",
      },
      {
        q: "Combien de séries de chauffe avec barre avant les séries de travail ?",
        a: "Barre seule × 8, puis deux à quatre paliers réguliers en baissant les répétitions, jusqu'à un dernier palier lourd : 85 % de ta charge de travail avant une série de 5, 90 % avant une série de 1 à 3. Ne skip pas la barre vide — c'est là que tu programmes le pattern et que tu vérifies le setup.",
      },
    ],
    relatedLinks: [
      { href: "/echauffement/exercice/developpe-couche", label: "Protocole développé couché" },
      { href: "/echauffement/exercice/developpe-militaire", label: "Protocole développé militaire" },
      { href: "/blog/echauffement-dynamique-ou-statique", label: "Dynamique ou statique ?" },
      { href: "/echauffement/protection/epaule-douleur", label: "Épaule douloureuse — protocole" },
    ],
  },

  {
    slug: "erreurs-echauffement-musculation",
    keyAnswer:
      "Les cinq erreurs d'échauffement les plus courantes en musculation : s'étirer longuement avant de soulever, remplacer l'échauffement par un long cardio, faire le même échauffement pour toutes les séances, sauter l'échauffement parce qu'on se sent chaud, et confondre l'échauffement général avec les séries d'approche du premier exercice.",
    updatedDate: "11 novembre 2026",
    sources: [SOURCES.simic2013, SOURCES.behm2016],
    metaTitle: "5 erreurs d'échauffement en musculation à corriger",
    metaDescription:
      "Les 5 erreurs d'échauffement les plus communes en salle de musculation et les corrections concrètes. Ne perds plus de force sur ta première série.",
    h1: "Les 5 erreurs d'échauffement les plus communes en musculation",
    publishDate: "31 mai 2026",
    readingTime: "5 min",
    intro:
      "Certaines erreurs d'échauffement sont si répandues qu'elles sont devenues la norme dans la plupart des salles. Résultat : des milliers de pratiquants arrivent à leurs séries de travail moins forts, moins bien préparés, et plus exposés aux blessures — sans s'en rendre compte. Voici les 5 erreurs les plus communes et la correction de chacune.",
    sections: [
      {
        heading: "Erreur 1 — Les étirements statiques avant l'effort",
        content: [
          "C'est l'erreur numéro un. Des millions de pratiquants s'étirent encore statiquement avant de soulever, alors que les études convergent : maintenus 60 secondes ou plus avant un effort de force, les étirements statiques <strong class='text-ink'>réduisent un peu la force maximale</strong>, d'environ 5 % en moyenne.",
          "Le mécanisme le plus souvent avancé : l'étirement statique réduit l'activation nerveuse du muscle étiré. Concrètement, si tu tiens chaque étirement une minute ou plus avant ton squat, ta première série en pâtit.",
          "<strong class='text-ink'>La correction :</strong> remplace les étirements statiques par de la mobilité dynamique et de l'activation musculaire spécifique. Les étirements statiques ont leur rôle — après la séance ou les jours off.",
        ],
      },
      {
        heading: "Erreur 2 — 15 minutes de cardio en guise d'échauffement",
        content: [
          "Le tapis roulant élève la température corporelle globale. C'est utile, mais insuffisant : il ne prépare ni les épaules ni les hanches. Et au-delà de 10 à 15 minutes, il commence à fatiguer sans rien préparer de plus.",
          "Le cardio ne prépare pas les structures spécifiques — la coiffe des rotateurs n'est pas activée, le pattern moteur du squat n'est pas câblé, les articulations ne sont pas mobilisées dans les amplitudes de travail.",
          "<strong class='text-ink'>La correction :</strong> 5 minutes de cardio très léger suffisent si la salle est froide. Remplace le reste par de la mobilité articulaire ciblée et de l'activation musculaire spécifique.",
        ],
      },
      {
        heading: "Erreur 3 — L'échauffement générique",
        content: [
          "L'échauffement de l'épaule avant les tractions est différent de l'échauffement de la hanche avant le squat. Un protocole identique pour tout le monde et tout le temps est un protocole qui prépare mal.",
          "<strong class='text-ink'>La correction :</strong> adapte systématiquement l'échauffement à ta séance du jour. Mobilise les articulations que tu vas solliciter et active les muscles moteurs principaux. Si tu squattes, tes chevilles et tes hanches ont besoin d'attention. Si tu fais du DC, c'est ta cage thoracique et ta coiffe.",
        ],
      },
      {
        heading: "Erreur 4 — Sauter l'échauffement parce qu'on se sent chaud",
        content: [
          "La sensation de chaleur n'est pas un indicateur de préparation musculo-articulaire. Tu peux transpirer et avoir les articulations non lubrifiées, les tendons froids et le système nerveux non activé sur le pattern de travail.",
          "La sensation de chaleur vient vite, mais elle ne dit rien de la mobilité des articulations du jour ni du geste de ton premier exercice. <strong class='text-ink'>La sensation ne remplace pas la préparation</strong>.",
          "<strong class='text-ink'>La correction :</strong> fais systématiquement l'échauffement, quelles que soient les conditions. Si tu as vraiment chaud, réduis à 3-4 minutes mais ne supprime pas la phase d'activation musculaire spécifique.",
        ],
      },
      {
        heading: "Erreur 5 — Confondre échauffement général et séries de chauffe",
        content: [
          "L'échauffement général prépare les articulations et établit la connexion neuro-musculaire. Les séries de chauffe à la barre programment le geste spécifique sous charge. Les deux sont nécessaires — l'un ne remplace pas l'autre.",
          "<strong class='text-ink'>La correction :</strong> sur les exercices polyarticulaires lourds (squat, développé couché, soulevé de terre), toujours faire 2 à 3 séries de chauffe progressives après l'échauffement général. Exemple pour 80 % : barre vide × 10, 50 % × 5, 70 % × 3.",
        ],
      },
    ],
    faqs: [
      {
        q: "Si on corrige ces 5 erreurs, combien de temps dure l'échauffement ?",
        a: "5 à 8 minutes d'échauffement général (mobilité articulaire + activation musculaire), plus 2 à 3 séries de chauffe à la barre sur les exercices lourds. Total : environ 10 à 12 minutes pour une séance avec exercice polyarticulaire. C'est le bon compromis entre préparation et conservation de l'énergie.",
      },
      {
        q: "Peut-on s'étirer statiquement juste 10-15 secondes avant l'effort ?",
        a: "Des étirements courts (moins de 60 secondes par muscle) ont un effet faible sur la force ; l'effet devient net au-delà (Behm et coll., 2016). En dessous, c'est peu risqué mais peu utile : autant faire de la mobilité dynamique.",
      },
      {
        q: "Ces erreurs s'appliquent-elles aussi à la musculation à la maison ?",
        a: "Oui — toutes. Et même davantage pour l'erreur 4 (je me sens chaud) : à la maison, l'environnement détendu peut créer une fausse impression de préparation. Le corps ne distingue pas la salle du salon — les tendons ont les mêmes besoins.",
      },
      {
        q: "Les débutants font-ils plus ces erreurs que les pratiquants avancés ?",
        a: "Les erreurs 1 (étirements statiques) et 2 (trop de cardio) sont plus fréquentes chez les débutants — ce sont des réflexes hérités du sport scolaire. Les erreurs 3 (échauffement générique) et 5 (pas de séries de chauffe) sont au contraire fréquentes chez les pratiquants intermédiaires qui pensent ne plus en avoir besoin.",
      },
    ],
    relatedLinks: [
      { href: "/blog/echauffement-dynamique-ou-statique", label: "Dynamique ou statique ?" },
      { href: "/blog/guide-complet-echauffement-musculation", label: "Guide complet" },
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps ?" },
      { href: "/echauffement/exercice/squat", label: "Protocole squat" },
    ],
  }

];

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);
