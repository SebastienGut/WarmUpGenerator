import type { SEOExercise, SEOFaq } from "@/components/SEOPage";

export interface ComboContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string[];
  exercises: SEOExercise[];
  advice: { title: string; paragraphs: string[] };
  faqs: SEOFaq[];
}

export const COMBO_PAGES: Record<string, ComboContent> = {
  "haut-du-corps": {
    slug: "haut-du-corps",
    metaTitle: "Échauffement haut du corps — Plan complet musculation 5 min",
    metaDescription:
      "Plan d'échauffement haut du corps complet pour la musculation. Pecs, dos, épaules et bras en 6 mouvements. Mobilisation et activation. Gratuit.",
    h1: "Échauffement haut du corps",
    subtitle: "Pecs · Dos · Épaules · Bras · 5 minutes",
    intro: [
      "Un <strong class='text-white'>échauffement haut du corps</strong> efficace prépare en parallèle les épaules, le rachis thoracique, les coudes et les poignets — toutes les articulations qui vont travailler en synergie pendant ta séance. Plutôt que d'enchaîner mécaniquement des cercles d'épaules, ce protocole en 6 mouvements active les chaînes musculaires dans un ordre logique : mobilité, puis stabilité, puis activation.",
      "À pratiquer avant n'importe quelle séance pecs, dos, épaules, bras ou full-body orientée haut du corps. Compte 5 minutes. Le résultat : tu arrives sur ta première série de chauffe avec des épaules mobiles, des omoplates qui glissent librement, un grand dentelé activé et des coudes \"chauds\". Tu gagnes 5 à 10 % de force disponible dès la première série de travail.",
    ],
    exercises: [
      {
        name: "Cercles d'épaules amples",
        description:
          "Debout, bras le long du corps. Grands cercles vers l'arrière puis vers l'avant. Mouvement lent, amplitude maximale. Lubrifie l'articulation gléno-humérale et réveille la coiffe des rotateurs.",
        durationSeconds: 30,
        reps: "30s",
      },
      {
        name: "Mobilisation thoracique en quadrupédie",
        description:
          "À quatre pattes, main droite derrière la nuque. Coude vers le coude opposé puis ouverture vers le plafond. La cage thoracique tourne. Libère le segment T1-T8 souvent figé par la position assise.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Wall slides (glissements muraux)",
        description:
          "Dos contre un mur, bras en W. Glisse les bras au-dessus de la tête en gardant les avant-bras au mur. Active les fixateurs scapulaires (trapèze inférieur, rhomboïdes), clé du tirage et du développé sains.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
      {
        name: "Pompes scapulaires",
        description:
          "Position de pompe (genoux ou pieds), coudes verrouillés. Descends en rapprochant les omoplates puis pousse en les écartant. Active le grand dentelé, indispensable pour pousser sans douleur d'épaule.",
        durationSeconds: 30,
        reps: "10 répétitions",
      },
      {
        name: "Rotations externes coude au corps",
        description:
          "Coude collé au flanc, avant-bras à 90°. Rotation externe (la main s'éloigne). Élastique léger pour plus d'efficacité. Cible directe sur la coiffe des rotateurs (sus-épineux, infra-épineux, petit rond).",
        durationSeconds: 60,
        reps: "12 par bras",
      },
      {
        name: "Cercles de poignets et flexions",
        description:
          "Cercles dans chaque sens, puis flexions/extensions des poignets paume au sol. Prépare les structures distales pour la prise de barre, haltères, anneaux. Évite les douleurs de poignet en bas du DC.",
        durationSeconds: 30,
        reps: "30s combiné",
      },
    ],
    advice: {
      title: "Pourquoi la mobilité thoracique change tout",
      paragraphs: [
        "La <strong class='text-white'>cage thoracique</strong> est le levier oublié des sessions haut du corps. Une cage thoracique rigide reporte tout le stress sur les épaules — qui finissent par compenser et s'irriter. Au tirage, ça se traduit par une difficulté à \"sortir la poitrine\" et amener les omoplates en retraction. Au DC, par une perte de stabilité de l'arche.",
        "Les deux mouvements thoraciques de ce protocole (rotation en quadrupédie, wall slides) attaquent directement ce problème. Si tu fais beaucoup de bureau, ajoute un cat-cow et un \"thread the needle\" en plus.",
        "Sur les charges lourdes au DC ou OHP, n'omet pas l'<strong class='text-white'>activation de la coiffe</strong>. Sans elle, tes 100 kg au DC sont sur structure passive (capsule, ligaments) plutôt que sur la coiffe active. C'est exactement comme ça qu'on développe une tendinopathie en 6 mois.",
      ],
    },
    faqs: [
      {
        q: "Faut-il s'échauffer avant chaque séance même légère ?",
        a: "Oui — y compris les jours \"light\". Une séance courte mais avec des charges sous-maximales sollicite quand même tes coiffes, capsules et tendons. L'échauffement reste le meilleur ratio temps investi / blessures évitées.",
      },
      {
        q: "Est-ce que cet échauffement remplace les séries de chauffe avec barre ?",
        a: "Non. Il prépare le corps. Sur les exercices polyarticulaires lourds (DC, OHP, rowing), enchaîne 2 à 3 séries de chauffe progressive avec la barre avant tes séries effectives.",
      },
      {
        q: "Combien de temps avant la séance ?",
        a: "Idéalement juste avant. L'effet de l'échauffement (température, vascularisation, conduction nerveuse) culmine 5 à 10 minutes après et décline ensuite. Si tu fais 20 minutes de cardio léger en plus, intercale ce protocole entre le cardio et tes séries de travail.",
      },
      {
        q: "Pas le temps : qu'est-ce que je peux skip ?",
        a: "Si tu n'as que 3 minutes, garde : mobilisation thoracique en quadrupédie, wall slides, rotations externes. C'est le triptyque non négociable. Skip les cercles de poignets seulement si tu ne fais pas de DC ou de calisthénie.",
      },
    ],
  },

  "bas-du-corps": {
    slug: "bas-du-corps",
    metaTitle: "Échauffement bas du corps — Squat, fentes, jambes en sécurité",
    metaDescription:
      "Plan d'échauffement bas du corps complet pour la musculation. Hanches, genoux, chevilles, fessiers et chaînes postérieures. 6 mouvements, 5 min. Gratuit.",
    h1: "Échauffement bas du corps",
    subtitle: "Hanches · Fessiers · Quadriceps · Ischios · 5 minutes",
    intro: [
      "Un <strong class='text-white'>échauffement bas du corps</strong> sérieux ne se résume pas à \"faire le tour du sac de riz\". Pour squatter lourd, fendre profond ou tirer un soulevé propre, tu as besoin d'une <strong class='text-white'>hanche mobile</strong> (rotation interne et externe), de <strong class='text-white'>chevilles libres</strong> en dorsiflexion, de <strong class='text-white'>fessiers actifs</strong> (et pas seulement \"des quadriceps qui tirent\").",
      "Ce protocole en 6 mouvements en 5 minutes adresse les trois étages — hanche, genou, cheville — dans un ordre fonctionnel. À pratiquer avant chaque séance jambes, full-body ou explosive (sprint, sauts). Le résultat : amplitude complète accessible, pattern moteur du squat amorcé, chaîne postérieure prête à recevoir la charge.",
    ],
    exercises: [
      {
        name: "Mobilisation cheville en fente",
        description:
          "Position fente, genou avant aligné sur le pied, talon collé au sol. Pousse le genou vers l'avant. La dorsiflexion de cheville conditionne directement la profondeur de squat possible.",
        durationSeconds: 60,
        reps: "10 par côté",
      },
      {
        name: "90/90 hip switches",
        description:
          "Assis, jambes en équerre (90°/90°, une devant, une côté). Bascule d'un côté à l'autre. Travaille rotation interne et externe de hanche, clé du squat profond et du SDT roumain.",
        durationSeconds: 90,
        reps: "10 cycles",
      },
      {
        name: "Pont fessier au sol",
        description:
          "Allongé, pieds à plat. Pousse dans les talons, fessiers contractés en haut, sans cambrer. Active les fessiers — sans cette activation, le squat devient un \"squat quadriceps\" qui charge le genou.",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
      {
        name: "Cossack squat (squat cosaque)",
        description:
          "Pieds très écartés, transfère le poids sur une jambe en flexion profonde, jambe opposée tendue, talon au sol. Mobilise hanches, adducteurs, chevilles dans un schéma global multi-plans.",
        durationSeconds: 60,
        reps: "6 par côté",
      },
      {
        name: "Bird-dog",
        description:
          "À quatre pattes, bras droit et jambe gauche tendus. Le dos reste plat, le bassin immobile. Active le gainage anti-rotation, indispensable pour stabiliser sous charge debout (squat, SDT).",
        durationSeconds: 45,
        reps: "8 par côté",
      },
      {
        name: "Air squats lents",
        description:
          "Squat au poids du corps, 3 secondes en descente, pause d'1 seconde en bas, remontée explosive. Programme le pattern moteur sans charge, en répétant la \"forme parfaite\" avant la barre.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Activer les fessiers : le levier sous-utilisé",
      paragraphs: [
        "Si tu passes 8 heures par jour assis, tes fessiers sont en <strong class='text-white'>amnésie motrice</strong>. Ils existent, mais le système nerveux les sollicite mal. Conséquence : sur le squat, ce sont tes quadriceps et ton bas du dos qui font tout le boulot. Ton genou et tes lombaires chauffent, pendant que tes fessiers restent endormis.",
        "Le <strong class='text-white'>pont fessier</strong> dans ce protocole ne sert pas à \"renforcer\" — il sert à <em>réveiller</em>. 12 répétitions suffisent à signaler aux fessiers \"tu vas bosser dans 5 minutes, prépare-toi\". Tu sentiras la différence dès la première série de squat.",
        "Le second levier : la <strong class='text-white'>cheville</strong>. Une dorsiflexion limitée empêche d'aller profond sur le squat sans compenser (talons qui se lèvent, dos qui s'enroule). Si tu sens que tu \"ne descends pas\", c'est rarement la souplesse de hanche — c'est la cheville. Ce mouvement seul te débloque souvent en 2-3 semaines de pratique régulière.",
      ],
    },
    faqs: [
      {
        q: "Faut-il faire du cardio avant l'échauffement spécifique ?",
        a: "5 minutes de vélo ou de marche rapide en plus de ce protocole est un plus, pas une obligation. Ça augmente la température corporelle générale et la fréquence cardiaque, ce qui rend l'activation musculaire plus efficace. À placer avant le protocole, pas après.",
      },
      {
        q: "Est-ce que je peux squatter sans avoir une bonne mobilité de cheville ?",
        a: "Oui, en utilisant des chaussures à talon (chaussures d'haltérophilie) ou une cale sous les talons. Ça réduit la dorsiflexion requise. Mais c'est un palliatif — travaille la cheville en parallèle avec le mouvement \"mobilisation cheville en fente\" pour récupérer ta mobilité naturelle.",
      },
      {
        q: "Puis-je sauter cet échauffement les jours de hip thrust ou de leg curl seul ?",
        a: "Réduis-le au pont fessier + bird-dog si tu fais uniquement du travail isolé non polyarticulaire. Pour tout exercice debout en charge (squat, fente, SDT, presse à 45°, hack squat), garde le protocole complet.",
      },
      {
        q: "Est-ce que ça aide pour le sprint ou le saut ?",
        a: "Oui, mais ajoute-y des mouvements explosifs courts en fin de protocole : skips A, foulées bondissantes, 2-3 sauts verticaux progressifs. La musculation et l'explosivité ont besoin de signaux nerveux différents — l'échauffement explosif les réveille.",
      },
    ],
  },

  "full-body": {
    slug: "full-body",
    metaTitle: "Échauffement full body — Plan musculation complet en 5 min",
    metaDescription:
      "Plan d'échauffement full body complet pour la musculation. Mobilisation totale, activation chaînes musculaires, prêt pour séance complète. Gratuit, sans inscription.",
    h1: "Échauffement full body",
    subtitle: "Corps entier · Toutes articulations · 5-6 minutes",
    intro: [
      "Un <strong class='text-white'>échauffement full body</strong> est l'option intelligente quand tu fais du circuit, du crossfit, de l'haltéro ou une séance qui combine plusieurs zones musculaires. Plutôt que de prendre 8 minutes à enchaîner haut du corps + bas du corps séparés, ce protocole condense les mouvements de mobilisation et d'activation les plus rentables en 6 exercices, 5 à 6 minutes.",
      "L'objectif : élever la température, libérer les segments les plus souvent figés (hanche, thoracique, épaule), activer la chaîne postérieure et amorcer le gainage. À pratiquer avant n'importe quelle séance polyvalente, EMOM, AMRAP, training fonctionnel ou complexe haltéro.",
    ],
    exercises: [
      {
        name: "World's greatest stretch",
        description:
          "Position fente, main opposée à la jambe avant au sol. Tourne le tronc en levant l'autre bras vers le plafond. Mobilise hanche, thoracique, épaule en un seul mouvement intégré.",
        durationSeconds: 90,
        reps: "5 par côté",
      },
      {
        name: "Inchworm (chenille)",
        description:
          "Debout, descends mains au sol, marche avec les mains jusqu'à la planche, redescends en fente, reviens debout. Enchaîne mobilité postérieure, gainage, mobilité de hanche.",
        durationSeconds: 90,
        reps: "5 répétitions",
      },
      {
        name: "Bird-dog dynamique",
        description:
          "À quatre pattes, alterne bras droit / jambe gauche puis bras gauche / jambe droite. Tronc immobile. Active gainage anti-rotation et coordination contralatérale.",
        durationSeconds: 60,
        reps: "10 par côté",
      },
      {
        name: "Squat ouvert avec mobilité thoracique",
        description:
          "En bas d'un squat profond, mains au sol entre les pieds. Tends une main vers le plafond en suivant des yeux, puis l'autre. Mobilité combinée hanche + thoracique sous tension.",
        durationSeconds: 60,
        reps: "5 par côté",
      },
      {
        name: "Pompes scapulaires + pompe complète",
        description:
          "Position de pompe. 5 pompes scapulaires (bras tendus, omoplates qui glissent), puis 5 pompes complètes (genoux ou pieds). Active chaîne antérieure et grand dentelé.",
        durationSeconds: 60,
        reps: "5 + 5",
      },
      {
        name: "Pont fessier monté",
        description:
          "Allongé, pieds à plat. Pousse dans les talons, fessiers contractés en haut. Active la chaîne postérieure avant tout exercice debout chargé.",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
    ],
    advice: {
      title: "Le full-body, c'est l'art de prioriser",
      paragraphs: [
        "Avec un échauffement full body, tu ne peux pas tout faire à fond. La logique : <strong class='text-white'>cibler les segments qui limitent</strong> ta séance du jour. Si elle est dominée par le tirage et le squat, insiste sur thoracique et hanche. Si elle est dominée par le DC et la fente, insiste sur épaule et cheville.",
        "Les <strong class='text-white'>mouvements composés</strong> (world's greatest stretch, inchworm, squat ouvert thoracique) sont les plus rentables : un seul mouvement libère plusieurs articulations à la fois. C'est pour ça qu'ils dominent ce protocole — temps limité, rendement maximal.",
        "Si ta séance commence par un mouvement <strong class='text-white'>très technique ou maximal</strong> (clean & jerk, snatch, squat à 90 % du 1RM), ajoute 2-3 répétitions à vide ou très légères du mouvement principal en fin d'échauffement. C'est la passerelle entre la mobilité générale et la spécificité maximale.",
      ],
    },
    faqs: [
      {
        q: "Cet échauffement est-il adapté au CrossFit ?",
        a: "Oui — c'est même son cas d'usage idéal. Pour un WOD avec multiples patterns, il prépare en parallèle. Ajoute juste 30-60 secondes de mouvement spécifique sur le 'BUY-IN' du WOD si nécessaire (kettlebell swing, double-under léger, etc.).",
      },
      {
        q: "Combien de fois par semaine peut-on faire un échauffement full body ?",
        a: "Tous les jours d'entraînement sans risque. Il a un effet de mobilisation et d'activation, pas de surcharge. Tu peux même l'utiliser comme routine de réveil en 5 minutes le matin si tu te sens raide.",
      },
      {
        q: "Est-ce suffisant avant un soulevé de terre lourd ?",
        a: "Pour la mobilité oui, mais ajoute toujours 2-3 séries de chauffe progressive avec la barre avant les séries de travail (40 %, 60 %, 80 % du 1RM en montée). Les patterns lourds demandent une activation spécifique au mouvement.",
      },
      {
        q: "Quel est le meilleur ordre d'échauffement ?",
        a: "Mobilité globale (cardio léger ou enchaînement composé) → mobilité ciblée des segments les plus rigides → activation des muscles clés → chauffe progressive sur le mouvement principal. Le protocole ci-dessus suit cet ordre.",
      },
    ],
  },

  push: {
    slug: "push",
    metaTitle: "Échauffement push — Pecs épaules triceps avant musculation",
    metaDescription:
      "Plan d'échauffement push (poussée) complet : pecs, épaules, triceps. 6 mouvements en 5 minutes pour développé couché, dips et tractions de force. Gratuit.",
    h1: "Échauffement push (pecs · épaules · triceps)",
    subtitle: "Pattern poussée · Coiffe · Coude · 5 minutes",
    intro: [
      "Un <strong class='text-white'>échauffement push</strong> efficace prépare les trois acteurs principaux de la poussée : pectoraux, épaules (deltoïdes antérieur et coiffe), triceps. Ce qui distingue un échauffement push réussi d'un échauffement bâclé : l'activation de la <strong class='text-white'>coiffe des rotateurs</strong> et du <strong class='text-white'>grand dentelé</strong>, deux structures qui stabilisent l'épaule sous charge et qui sont absentes des échauffements génériques.",
      "À pratiquer avant toute séance dominée par la poussée — DC, développé incliné/décliné, OHP, dips, pompes lestées, push press. Compte 5 minutes. Le résultat : épaule stable, coude lubrifié, omoplate qui glisse correctement, et un système nerveux prêt pour des charges lourdes au-dessus de 80 % du 1RM.",
    ],
    exercises: [
      {
        name: "Cercles d'épaules amples + cross-body",
        description:
          "30 secondes de cercles amples vers l'arrière, puis 30 secondes de cross-body (un bras tiré contre la poitrine avec l'autre). Ouvre la coiffe et étire les deltoïdes postérieurs.",
        durationSeconds: 60,
        reps: "60s combiné",
      },
      {
        name: "Mobilisation thoracique + ouverture de poitrine",
        description:
          "À quatre pattes, main sous l'épaule, l'autre derrière la nuque. Tourne le coude vers le plafond pour ouvrir la cage thoracique. La poitrine 's'ouvre' — clé d'un DC avec une bonne arche.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Pompes scapulaires",
        description:
          "Position planche, coudes verrouillés. Les omoplates glissent : rétraction puis protraction. Active le grand dentelé. Sans son activation, l'épaule \"flotte\" sur le DC.",
        durationSeconds: 30,
        reps: "10 répétitions",
      },
      {
        name: "Rotations externes coude au corps (élastique)",
        description:
          "Coude collé au flanc, avant-bras à 90°. Rotation externe contre une bande élastique. Cible directement la coiffe (sus-épineux, infra-épineux). Non négociable avant un DC lourd.",
        durationSeconds: 60,
        reps: "12 par bras",
      },
      {
        name: "Pompes incliner amplitude croissante",
        description:
          "Pompes contre un mur ou un banc, 5 répétitions. Puis pompes au sol, amplitude réduite, 5 répétitions. Active progressivement la chaîne push à charge croissante.",
        durationSeconds: 60,
        reps: "5 + 5",
      },
      {
        name: "Extensions triceps au-dessus de la tête (à vide)",
        description:
          "Bras tendus au-dessus de la tête, fléchis et étends les coudes lentement. Sans charge ou très légère. Lubrifie le coude et active le triceps avant un mouvement chargé (dips, extensions, kickback).",
        durationSeconds: 30,
        reps: "12 répétitions",
      },
    ],
    advice: {
      title: "Le rituel pré-DC qui change tout",
      paragraphs: [
        "Avant ta première série de chauffe au DC, prends 30 secondes pour <strong class='text-white'>te \"installer\"</strong> sur le banc : pieds bien plantés, omoplates rétractées et collées au banc, dos cambré (cambrure naturelle, pas exagérée), poitrine sortie. Ce setup devient automatique avec la pratique mais doit être répété chaque fois.",
        "L'erreur classique : <strong class='text-white'>poser la barre direct au milieu de la poitrine</strong> sans avoir engagé les omoplates. Sous charge, les épaules roulent vers l'avant, et toute la stabilité passe sur la capsule articulaire. C'est l'autoroute vers la tendinopathie en 6-12 mois.",
        "Si tu sens que tes <strong class='text-white'>pecs ne s'activent pas</strong> bien malgré l'échauffement, ajoute 1-2 sets de pec deck très légers ou de pompes serrées avant ta première barre. Ça réveille spécifiquement le grand pectoral via une contraction concentrique sans charge axiale.",
      ],
    },
    faqs: [
      {
        q: "Combien de temps avant ma première série de DC ?",
        a: "Idéalement 2 à 5 minutes après la fin de l'échauffement. Au-delà de 10 minutes, l'effet d'activation décline. Place tes séries de chauffe avec la barre directement après ce protocole.",
      },
      {
        q: "Faut-il vraiment faire les rotations externes même si je n'ai pas mal aux épaules ?",
        a: "Oui — surtout si tu n'as pas mal. La coiffe des rotateurs est asymptomatique jusqu'au moment où elle ne l'est plus. Préventivement, 60 secondes par séance push pendant des années te coûtent moins cher qu'une consultation de kiné et 3 mois d'arrêt.",
      },
      {
        q: "Puis-je remplacer les pompes par autre chose ?",
        a: "Oui : pompes au mur, sur banc, ou pec deck très léger. L'objectif est l'activation progressive du grand pectoral, pas un travail de force. N'importe quelle contraction concentrique légère et contrôlée fait le job.",
      },
      {
        q: "Mes coudes craquent au DC : c'est grave ?",
        a: "Si ce sont juste des craquements indolores en début de mouvement, c'est généralement bénin (libération de gaz dans l'articulation). Si la douleur accompagne le craquement, ou s'il y a une perte de force, consulte. Les extensions triceps à vide aident à la lubrification du coude.",
      },
    ],
  },

  pull: {
    slug: "pull",
    metaTitle: "Échauffement pull — Dos biceps et arrière épaules en sécurité",
    metaDescription:
      "Plan d'échauffement pull (tirage) complet : dos, biceps, arrière d'épaule. 6 mouvements en 5 minutes pour tractions, rowing et SDT. Gratuit.",
    h1: "Échauffement pull (dos · biceps · arrière épaules)",
    subtitle: "Pattern tirage · Scapulae · Coude · 5 minutes",
    intro: [
      "Un <strong class='text-white'>échauffement pull</strong> bien conduit prépare la chaîne du tirage : grand dorsal, trapèzes, rhomboïdes, deltoïdes postérieurs, biceps, avant-bras. Ce qui sépare un échauffement pull efficace d'un \"je secoue mes bras\" : l'activation des <strong class='text-white'>fixateurs scapulaires</strong> (trapèze inférieur, rhomboïdes), souvent endormis chez les pratiquants modernes assis 8h/jour.",
      "À pratiquer avant toute séance dominée par le tirage — tractions, rowing barre/haltère, tirage poulie haute/basse, soulevé de terre, face pulls, curls. Compte 5 minutes. Le résultat : omoplates qui glissent et se rétractent librement, dos activé (et pas \"que des biceps\"), épaule postérieure éveillée.",
    ],
    exercises: [
      {
        name: "Cat-cow large amplitude",
        description:
          "À quatre pattes, alterne dos creux (cow) et dos rond (cat). Mouvement lent, amplitude maximale. Mobilise toute la colonne et prépare les rétractions scapulaires.",
        durationSeconds: 45,
        reps: "10 cycles",
      },
      {
        name: "Mobilisation thoracique \"thread the needle\"",
        description:
          "À quatre pattes, passe le bras droit sous le bras gauche, épaule au sol, puis ouvre vers le plafond en suivant des yeux. Libère la rotation thoracique, clé du rowing avec une bonne extension thoracique.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Scapular pulls (tractions scapulaires à la barre)",
        description:
          "Suspendu à une barre, bras tendus. Sans plier les coudes, descends en activant les omoplates (\"écarte les épaules de tes oreilles\"). Active spécifiquement les fixateurs avant les vraies tractions.",
        durationSeconds: 45,
        reps: "8 répétitions",
      },
      {
        name: "Band pull-aparts",
        description:
          "Bande élastique tenue devant à hauteur de poitrine, bras tendus. Écarte la bande en serrant les omoplates. Le mouvement vient du milieu du dos, pas des bras. Active rhomboïdes et trapèze moyen.",
        durationSeconds: 60,
        reps: "15 répétitions",
      },
      {
        name: "Face pulls élastique",
        description:
          "Élastique fixé en hauteur, tire vers le visage en gardant les coudes hauts. Externalise les rotations d'épaule et active le deltoïde postérieur. Antidote naturel de la posture moderne épaules en avant.",
        durationSeconds: 60,
        reps: "12 répétitions",
      },
      {
        name: "Curls à vide / mobilisation coudes",
        description:
          "Bras le long du corps, fléchis et étends les coudes lentement, paumes alternativement supination et pronation. Lubrifie le coude et active les biceps avant un curl ou un rowing chargé.",
        durationSeconds: 30,
        reps: "12 répétitions",
      },
    ],
    advice: {
      title: "Tirer avec le dos, pas avec les bras",
      paragraphs: [
        "L'erreur n°1 sur le tirage : <strong class='text-white'>commencer le mouvement par les coudes</strong>. Conséquence : les biceps font tout le travail, les omoplates restent en élévation, le dos n'est pas vraiment sollicité. Tu ne progresses plus en largeur de dos, et tes coudes finissent par crier.",
        "La séquence saine sur n'importe quel tirage : <strong class='text-white'>dépression scapulaire (épaules basses) → rétraction scapulaire (omoplates qui se rapprochent) → flexion du coude</strong>. Les deux premières étapes prennent 0,3 seconde mais font toute la différence. Les <em>scapular pulls</em> de ce protocole programment exactement cette séquence.",
        "Si tu n'as <strong class='text-white'>aucune sensation dans le dos</strong> sur le rowing ou le tirage, le problème vient quasi-toujours de ce point. Travaille à charge réduite (50 % de l'habituel) pendant 2-3 séances en te concentrant sur la séquence \"épaules basses → omoplates → coudes\". La connexion neuro-musculaire revient en quelques séances.",
      ],
    },
    faqs: [
      {
        q: "Faut-il s'échauffer différemment avant des tractions ?",
        a: "Garde le protocole et ajoute juste 1-2 sets de scapular pulls supplémentaires + 1 série de tractions à amplitude réduite (juste le mouvement haut). C'est plus efficace que d'enchaîner directement vers une vraie traction à froid.",
      },
      {
        q: "Combien de temps avant le SDT lourd ?",
        a: "Garde ce protocole pull (qui mobilise le thoracique et active le dos) puis ajoute un échauffement spécifique SDT : 2-3 répétitions à 30 %, 50 %, 70 % de tes séries de travail. Le pattern SDT mérite 5 répétitions à vide en pure technique avant toute charge.",
      },
      {
        q: "J'ai mal aux coudes en tirage : que faire ?",
        a: "Le plus souvent : prise trop serrée qui force l'avant-bras, ou tu \"tires avec les bras\" au lieu d'engager le dos. Élargis ta prise pour qu'elle soit à largeur d'épaule, et concentre-toi sur les scapular pulls et la séquence omoplate-d'abord. La douleur disparaît souvent en 2-3 semaines.",
      },
      {
        q: "Les face pulls sont-ils vraiment utiles ?",
        a: "Oui — c'est l'un des meilleurs exercices pour la santé de l'épaule à long terme. Ils contrebalancent les heures passées épaules en avant (bureau, conduite, téléphone) et activent une zone (deltoïde postérieur, externalisateurs) que le DC sur-développe en sens inverse. À garder même hors échauffement, en finisher de séance.",
      },
    ],
  },
};

export const COMBO_SLUGS = Object.keys(COMBO_PAGES);
