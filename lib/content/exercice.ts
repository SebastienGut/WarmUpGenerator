import type { SEOExercise, SEOFaq } from "@/components/SEOPage";

export interface ExerciceContent {
  slug: string;
  exerciseLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string[];
  exercises: SEOExercise[];
  advice: { title: string; paragraphs: string[] };
  faqs: SEOFaq[];
}

export const EXERCICE_PAGES: Record<string, ExerciceContent> = {
  "developpe-couche": {
    slug: "developpe-couche",
    exerciseLabel: "développé couché",
    metaTitle: "Échauffement développé couché — Plan complet avant DC",
    metaDescription:
      "Échauffement développé couché complet : coiffe, grand dentelé, pec mineur, thoracique. 6 mouvements en 5 minutes pour DC sain et performant. Gratuit.",
    h1: "Échauffement avant le développé couché",
    subtitle: "Coiffe · Grand dentelé · Cage thoracique · 5 minutes",
    intro: [
      "Le <strong class='text-white'>développé couché</strong> est l'exercice le plus pratiqué en salle, et celui qui blesse le plus d'épaules. La cause n'est pas le DC en soi — c'est le DC fait à froid, sans activation préalable de la coiffe des rotateurs et du grand dentelé. Avec ce protocole spécifique, tu prépares les structures qui stabilisent l'épaule sous une charge axiale lourde.",
      "À pratiquer juste avant tes premières séries de chauffe avec barre. Compte 4 à 5 minutes. Le résultat : omoplates qui se rétractent et glissent librement, cage thoracique mobile (clé d'une bonne arche), coiffe activée, grand dentelé prêt à protéger l'articulation. Tu gagnes en stabilité, donc en puissance disponible — souvent 5 à 10 % sur la première série de travail.",
    ],
    exercises: [
      {
        name: "Mobilisation thoracique en quadrupédie",
        description:
          "À quatre pattes, main droite derrière la nuque. Coude vers le coude opposé, puis ouverture vers le plafond. La cage thoracique tourne. Indispensable pour une arche dorsale propre au DC.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Ouverture de poitrine au mur",
        description:
          "Bras tendu contre un mur, paume à plat, à hauteur d'épaule. Pivote le corps loin du mur pour étirer pectoral et avant de l'épaule. Sans douleur, juste une tension. Étire le pec mineur, souvent raccourci.",
        durationSeconds: 30,
        reps: "15s par côté",
      },
      {
        name: "Pompes scapulaires",
        description:
          "Position planche, coudes verrouillés. Les omoplates glissent : rétraction (vers l'arrière) puis protraction (vers l'avant). Active spécifiquement le grand dentelé, indispensable pour stabiliser sous la barre.",
        durationSeconds: 30,
        reps: "10 répétitions",
      },
      {
        name: "Rotations externes à l'élastique",
        description:
          "Élastique fixé à hauteur de coude. Coude collé au flanc, avant-bras à 90°. Rotation externe contre la résistance. Cible la coiffe (sus-épineux, infra-épineux, petit rond). Non négociable avant DC lourd.",
        durationSeconds: 60,
        reps: "12 par bras",
      },
      {
        name: "Pompes inclinées progressives",
        description:
          "Pompes contre un banc ou un mur, 5 répétitions. Puis pompes au sol amplitude réduite, 5 répétitions. Active progressivement le grand pectoral en mode poussée, à charge croissante.",
        durationSeconds: 60,
        reps: "5 + 5",
      },
      {
        name: "Chauffe à la barre vide",
        description:
          "Allonge-toi sur le banc, installe-toi (omoplates rétractées, dos cambré, pieds plantés). Effectue 10 répétitions à la barre vide en explorant la trajectoire. Verrouille le pattern moteur avant la charge.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Le setup du DC : 30 secondes qui changent tout",
      paragraphs: [
        "Beaucoup de pratiquants <strong class='text-white'>s'allongent et soulèvent</strong>. C'est l'autoroute vers la blessure. Le bon setup, à reproduire chaque fois : (1) allonge-toi, yeux sous la barre, (2) plante les pieds au sol, (3) pousse les omoplates dans le banc et serre-les ensemble, (4) cambre légèrement (cambrure naturelle, pas exagérée), (5) sors la poitrine, (6) saisis la barre. Ce rituel verrouille la coiffe et le grand dentelé en position de protection.",
        "La <strong class='text-white'>trajectoire de la barre</strong> n'est pas verticale — elle décrit une courbe légère : descente vers le bas du sternum / ligne des mamelons, remontée vers les yeux. Une trajectoire purement verticale fait travailler les épaules au lieu des pecs et augmente le stress articulaire.",
        "Sur les <strong class='text-white'>charges proches du max</strong> (>85 % du 1RM), des <em>wrist wraps</em> légères et un setup parfait deviennent critiques. À l'inverse, l'usage systématique de wraps sur des charges modérées affaiblit tes stabilisateurs. Garde-les pour les séries lourdes.",
      ],
    },
    faqs: [
      {
        q: "Combien de séries de chauffe avec la barre avant les séries de travail ?",
        a: "Pour un travail à 80 % du 1RM, 3 séries suffisent : barre vide × 10, 50 % × 5, 70 % × 3. Pour des séries au-delà de 90 %, ajoute une 4ème série à 85 % × 1-2 reps. L'objectif : préparer le système nerveux sans accumuler de fatigue.",
      },
      {
        q: "Le développé couché peut-il abîmer les épaules ?",
        a: "Le DC bien exécuté est l'un des exercices les plus sûrs. Le DC mal exécuté (sans rétraction scapulaire, prise trop large, descente incomplète, ou trop loué d'un coup) est l'un des plus dangereux. La technique et l'échauffement font 90 % de la différence.",
      },
      {
        q: "Faut-il faire les pompes avant le DC ?",
        a: "Les pompes à charge progressive sont une excellente \"bridge\" entre le mouvement à vide et la barre chargée. Elles activent le pec et le grand dentelé en chaîne fermée. Si tu as déjà la coiffe activée et la mobilité thoracique faite, tu peux skip — surtout si tu fais aussi du DC haltères ou du DC incliné dans la séance.",
      },
      {
        q: "Combien de temps pour récupérer entre les séries ?",
        a: "Pour de la force pure (1-5 reps à 85 %+), 3 à 5 minutes. Pour de l'hypertrophie (8-12 reps à 70 %), 90 secondes à 2 minutes. Trop court = fatigue qui dégrade la technique, donc risque de blessure.",
      },
    ],
  },

  squat: {
    slug: "squat",
    exerciseLabel: "squat",
    metaTitle: "Échauffement squat — Mobilité hanche cheville et activation fessière",
    metaDescription:
      "Échauffement squat complet : mobilité hanche, dorsiflexion cheville, activation fessière. 6 mouvements en 5 min pour squat lourd et profond. Gratuit.",
    h1: "Échauffement avant le squat",
    subtitle: "Hanche · Cheville · Fessiers · Pattern · 5 minutes",
    intro: [
      "Le <strong class='text-white'>squat</strong> est le roi des exercices de jambes mais aussi le plus exigeant en mobilité et en coordination. Trois facteurs déterminent un squat propre et lourd : <strong class='text-white'>la dorsiflexion de cheville</strong>, <strong class='text-white'>la rotation et flexion de hanche</strong>, et <strong class='text-white'>l'activation fessière</strong>. Ce protocole spécifique adresse les trois.",
      "À pratiquer juste avant tes séries de chauffe à la barre. Compte 5 minutes. Le résultat : amplitude complète accessible (descente sous la parallèle sans compenser), pattern moteur amorcé, fessiers actifs (et pas un \"squat quadriceps\" qui charge le genou), gainage prêt. Tu peux ajouter 5-10 kg sur ta première série de travail rien qu'avec un échauffement bien fait.",
    ],
    exercises: [
      {
        name: "Mobilisation cheville en fente",
        description:
          "Position fente, talon avant collé au sol. Pousse le genou vers l'avant, amplitude maximale sans douleur. La dorsiflexion de cheville conditionne directement la profondeur de squat possible.",
        durationSeconds: 60,
        reps: "10 par côté",
      },
      {
        name: "90/90 hip switches",
        description:
          "Assis, jambes en équerre (90°/90°). Bascule d'un côté à l'autre. Travaille rotation interne et externe de hanche, fondamental pour un squat profond où les genoux suivent les pieds sans valgus.",
        durationSeconds: 90,
        reps: "10 cycles",
      },
      {
        name: "Pont fessier monté",
        description:
          "Allongé, pieds à plat. Pousse dans les talons, fessiers contractés en haut. Active spécifiquement les fessiers — sans cette activation, le squat devient un squat \"tout-quadriceps\" qui charge le genou.",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
      {
        name: "Cossack squat",
        description:
          "Pieds très écartés, transfère le poids sur une jambe en flexion profonde. Mobilise hanches, adducteurs, chevilles dans un schéma global. Excellent pour libérer la zone interne de la hanche.",
        durationSeconds: 60,
        reps: "6 par côté",
      },
      {
        name: "Air squats avec pause en bas",
        description:
          "Squat au poids du corps, descente en 3 secondes, pause de 1 seconde en position basse, remontée explosive. Programme le pattern moteur sans charge en accentuant la position basse.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
      {
        name: "Squats à la barre vide",
        description:
          "Pose la barre sur les trapèzes (ou en front squat selon ta variante). 10 répétitions à la barre vide en explorant la trajectoire et la respiration. Verrouille la technique avant d'ajouter la charge.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Profondeur, dos et bracing : les trois clés",
      paragraphs: [
        "Le <strong class='text-white'>squat profond</strong> (cuisses sous la parallèle, hanches passant sous les genoux) n'est pas dangereux — au contraire, il offre un meilleur recrutement musculaire et est plus sûr pour les ligaments du genou que le quart de squat (Hartmann et al., 2013). Ce qui blesse, c'est la mauvaise technique ou un saut brutal d'intensité, pas l'amplitude en soi.",
        "Le <strong class='text-white'>dos plat</strong> est non négociable. Si tu as un \"butt wink\" (bassin qui bascule en arrière en bas du squat), ça vient soit d'un manque de mobilité de hanche (le 90/90 et le cossack t'aident), soit d'une descente trop rapide. Ralentis. Si le butt wink persiste, réduis la profondeur jusqu'à ce que tu maîtrises la mobilité.",
        "Le <strong class='text-white'>bracing</strong> (gainage abdominal) est le levier de stabilité oublié. Avant chaque répétition lourde : inspire profondément dans le ventre (pas dans la poitrine), serre tout l'abdomen comme si tu allais recevoir un coup. Pression intra-abdominale = colonne stable = squat plus lourd et plus sûr.",
      ],
    },
    faqs: [
      {
        q: "Squat profond ou squat à la parallèle : que choisir ?",
        a: "Si ta mobilité te permet d'aller en profondeur sans butt wink ni perte de cambrure, va profond — recrutement musculaire optimal et plus sûr. Si pas encore, va à la parallèle propre et travaille la mobilité en parallèle. Mieux vaut un squat parallèle parfait qu'un squat profond pourri.",
      },
      {
        q: "Puis-je squatter sans chaussures spéciales ?",
        a: "Oui — beaucoup de pratiquants squattent en chaussures plates (Converse, baskets minimalistes) avec d'excellents résultats. Les chaussures d'haltérophilie (talon surélevé) aident si ta cheville manque de dorsiflexion ou si tu fais du high-bar / front squat. Évite les running shoes très amorties — instables sous charge.",
      },
      {
        q: "Combien de séries de chauffe avant le squat lourd ?",
        a: "Pour une série de travail à 80 % : barre vide × 10, 40 % × 5, 60 % × 3, 75 % × 1-2. Pour 90 %+, ajoute 85 % × 1. Ne jamais skipper la barre vide même si tu \"te sens chaud\" — c'est le moment où tu programmes le pattern moteur.",
      },
      {
        q: "J'ai mal aux genoux au squat : c'est l'amplitude ?",
        a: "Rarement. Les douleurs de genou en squat viennent quasi-toujours de (1) un valgus dynamique (genou qui rentre vers l'intérieur), (2) une cheville rigide qui force le genou à compenser, ou (3) des fessiers inactifs qui laissent les quads tout faire. Travaille l'échauffement ci-dessus et la technique avant de blâmer l'amplitude.",
      },
    ],
  },

  "souleve-de-terre": {
    slug: "souleve-de-terre",
    exerciseLabel: "soulevé de terre",
    metaTitle: "Échauffement soulevé de terre — Hanches, dos, gainage avant SDT",
    metaDescription:
      "Échauffement soulevé de terre complet : charnière de hanche, mobilité thoracique, gainage anti-extension. 6 mouvements en 5 min pour SDT lourd. Gratuit.",
    h1: "Échauffement avant le soulevé de terre",
    subtitle: "Hanches · Chaîne postérieure · Gainage · 5 minutes",
    intro: [
      "Le <strong class='text-white'>soulevé de terre</strong> (SDT) est l'exercice qui sollicite le plus de masse musculaire en une seule répétition. C'est aussi celui qui blesse le plus de bas du dos — quand il est fait à froid, sans charnière de hanche maîtrisée, avec un gainage absent. Ce protocole prépare les trois piliers du SDT : <strong class='text-white'>mobilité de hanche</strong>, <strong class='text-white'>activation chaîne postérieure</strong>, et <strong class='text-white'>gainage anti-extension</strong>.",
      "À pratiquer juste avant tes séries de chauffe avec barre. Compte 5 minutes. Le résultat : pattern de hip hinge programmé, fessiers et ischios actifs, gainage solide pour transférer la force du sol jusqu'aux épaules sans que la colonne ne fléchisse. Sur le SDT, c'est exactement ce qui sépare une PR propre d'une blessure du dos.",
    ],
    exercises: [
      {
        name: "Cat-cow large amplitude",
        description:
          "À quatre pattes, alterne dos creux (cow) et dos rond (cat). Mobilise toute la colonne avant de la charger en charge axiale. Mouvement lent, amplitude maximale.",
        durationSeconds: 45,
        reps: "10 cycles",
      },
      {
        name: "Bird-dog",
        description:
          "À quatre pattes, tends le bras droit et la jambe gauche. Tronc parfaitement immobile (un verre d'eau sur le dos ne tombe pas). Active le gainage anti-rotation et la coordination contralatérale, clé pour stabiliser la colonne sous la barre.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Pont fessier monté",
        description:
          "Allongé, pieds à plat. Pousse dans les talons, fessiers contractés en haut. Active les fessiers — sans cette activation, le SDT devient un \"SDT lombaires\" qui charge le bas du dos au lieu de la chaîne postérieure.",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
      {
        name: "Charnière de hanche à vide (hip hinge)",
        description:
          "Debout, mains aux fémurs. Pousse les fessiers vers l'arrière, garde le dos plat, descends jusqu'à mi-tibias. Sans charge. Programme le pattern moteur du SDT — la flexion vient de la hanche, pas du dos.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
      {
        name: "SDT roumain à la barre vide",
        description:
          "Barre vide, pieds largeur de hanches. Pousse les hanches en arrière, garde le dos plat et la barre proche du corps. Descends jusqu'à mi-tibias, remonte en serrant les fessiers. Verrouille le pattern.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
      {
        name: "SDT classique à la barre vide",
        description:
          "Position de départ : barre au-dessus du milieu du pied, hanches plus hautes que les genoux, dos plat, omoplates au-dessus de la barre. Tire en poussant le sol, finis hanches en avant. 5 répétitions techniques.",
        durationSeconds: 60,
        reps: "5 répétitions",
      },
    ],
    advice: {
      title: "Le hip hinge : le mouvement le plus mal compris",
      paragraphs: [
        "Le <strong class='text-white'>hip hinge</strong> (charnière de hanche) est la base de tout SDT propre. Pourtant, beaucoup de pratiquants le confondent avec un squat. Différence : sur le squat, les genoux fléchissent fortement et le tronc reste vertical. Sur le hip hinge, ce sont les <em>hanches</em> qui partent en arrière et le tronc qui s'incline vers l'avant — les genoux se déverrouillent légèrement seulement.",
        "<strong class='text-white'>Test simple</strong> : place un manche à balai dans le dos, en contact avec la nuque, le milieu du dos et le sacrum. Hip hinge correct = les trois points restent en contact pendant tout le mouvement. Si le sacrum se décolle, ton bas du dos s'enroule — c'est exactement ce qu'il faut éviter sous charge.",
        "Pour les <strong class='text-white'>charges lourdes</strong> (>80 % du 1RM), une ceinture de force devient légitime. Elle augmente la pression intra-abdominale et offre plus de stabilité. À utiliser sur les séries top set, pas sur tout l'échauffement et les warm-up sets — ça affaiblit ton bracing naturel.",
      ],
    },
    faqs: [
      {
        q: "SDT classique ou sumo : que choisir ?",
        a: "Question d'anatomie. Bras longs + tronc court = SDT classique souvent plus efficace. Bras courts + tronc long = SDT sumo souvent plus naturel. Essaie les deux pendant 4 semaines chacun et compare. Beaucoup de pratiquants trouvent le sumo moins stressant pour le bas du dos.",
      },
      {
        q: "Faut-il des straps pour s'entraîner ?",
        a: "Pas en dessous de 80 % du 1RM. La grip strength est un atout naturel à développer — utiliser des straps trop tôt te limite à ton grip max. Sur les séries lourdes, le top set, les rep PR, les straps deviennent légitimes pour ne pas que ta prise limite ton dos.",
      },
      {
        q: "Combien de séries de chauffe avant le SDT lourd ?",
        a: "Pour une série de travail à 80 % du 1RM : barre vide × 5 (technique), 40 % × 5, 60 % × 3, 75 % × 1. Pour 90 %+, ajoute 85 % × 1. Le SDT a besoin de moins de séries de chauffe que le squat car il fatigue plus le système nerveux — mais il faut activer la chaîne postérieure au préalable.",
      },
      {
        q: "Le SDT abîme-t-il forcément le dos ?",
        a: "Non. Le SDT bien exécuté est un des exercices les plus sûrs pour le dos — il <em>renforce</em> les érecteurs spinaux et la chaîne postérieure. Le SDT mal exécuté (dos rond, départ avec les hanches trop basses ou trop hautes, tirer avec les bras) blesse. La différence est dans l'apprentissage technique et l'échauffement.",
      },
    ],
  },

  "rowing-barre": {
    slug: "rowing-barre",
    exerciseLabel: "rowing barre",
    metaTitle: "Échauffement rowing barre — Dos thoracique scapulaires avant tirage",
    metaDescription:
      "Échauffement rowing barre complet : mobilisation thoracique, scapulaires, hip hinge. 6 mouvements en 5 min pour rowing puissant et sûr. Gratuit.",
    h1: "Échauffement avant le rowing barre",
    subtitle: "Thoracique · Scapulaires · Hip hinge · 5 minutes",
    intro: [
      "Le <strong class='text-white'>rowing barre</strong> est probablement l'exercice le plus rentable pour développer un dos épais et puissant. C'est aussi un des plus techniques : il combine un <em>hip hinge</em> tenu (comme un demi-SDT statique), une rétraction scapulaire, et une flexion de coude — le tout sous charge. Ce protocole prépare ces trois éléments en 5 minutes.",
      "À pratiquer avant ta série de chauffe à la barre. Le résultat : cage thoracique mobile (clé d'une bonne extension de buste), omoplates qui glissent et se rétractent librement, chaîne postérieure stable pour tenir le hip hinge sous la charge. Tu cesseras de \"tirer avec les biceps\" — le dos prend enfin la moitié du travail qui lui revient.",
    ],
    exercises: [
      {
        name: "Mobilisation thoracique \"thread the needle\"",
        description:
          "À quatre pattes, passe le bras droit sous le bras gauche, épaule au sol, puis ouvre vers le plafond. Libère la rotation thoracique, indispensable pour un buste qui s'étend correctement au rowing.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Cat-cow large amplitude",
        description:
          "À quatre pattes, alterne dos creux et dos rond. Mobilise la colonne avant la position penchée chargée. Mouvement lent.",
        durationSeconds: 30,
        reps: "10 cycles",
      },
      {
        name: "Band pull-aparts",
        description:
          "Bande élastique tenue devant à hauteur de poitrine, bras tendus. Écarte la bande en serrant les omoplates. Le mouvement vient du milieu du dos. Active rhomboïdes et trapèze moyen.",
        durationSeconds: 60,
        reps: "15 répétitions",
      },
      {
        name: "Face pulls élastique",
        description:
          "Élastique fixé en hauteur, tire vers le visage en gardant les coudes hauts. Active deltoïde postérieur et externalisateurs d'épaule. Antidote des heures épaules en avant.",
        durationSeconds: 60,
        reps: "12 répétitions",
      },
      {
        name: "Charnière de hanche à vide",
        description:
          "Debout, mains aux fémurs. Pousse les fessiers en arrière, dos plat, descends jusqu'à mi-tibias. Programme le pattern de hip hinge tenu nécessaire pour la position penchée du rowing.",
        durationSeconds: 45,
        reps: "10 répétitions",
      },
      {
        name: "Rowing à la barre vide",
        description:
          "Position penchée (hip hinge tenu, dos plat), barre vide. 10 répétitions en se concentrant sur la séquence : épaules basses → omoplates rétractées → coudes qui plient. Verrouille le pattern.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Tirer avec le dos, pas avec les bras",
      paragraphs: [
        "L'erreur n°1 sur le rowing : <strong class='text-white'>commencer le mouvement par les coudes</strong>. Conséquence : les biceps font tout le travail, les omoplates restent en élévation, le dos n'est pas vraiment sollicité. Tu ne progresses plus en épaisseur de dos, et tes coudes finissent par crier.",
        "La séquence saine : <strong class='text-white'>(1) épaules basses (dépression scapulaire), (2) omoplates qui se rapprochent (rétraction), (3) flexion du coude</strong>. Les deux premières étapes prennent 0,3 seconde mais font toute la différence. Si tu n'arrives pas à les sentir, travaille à charge réduite (50 % de l'habituel) pendant 2-3 séances en te concentrant uniquement sur cette séquence.",
        "Pour la <strong class='text-white'>position</strong> : penche-toi à environ 45° (pas trop horizontal — c'est plus du SDT —, pas trop vertical — c'est plus du shrug). Genoux légèrement fléchis. Barre proche des tibias. Dos plat (cambrure naturelle). C'est cette position que tu dois maintenir pendant toute la série, sans que le buste remonte progressivement à chaque répétition.",
      ],
    },
    faqs: [
      {
        q: "Rowing barre ou rowing haltère : que choisir ?",
        a: "Les deux sont complémentaires. Rowing barre = plus de charge, plus de stress sur la chaîne postérieure (proche du SDT). Rowing haltère = plus d'amplitude, focus unilatéral, moins de stress lombaire. Programme idéal : un des deux par séance, alternance hebdomadaire ou mensuelle.",
      },
      {
        q: "Pronation, supination ou prise neutre ?",
        a: "Pronation (paumes vers toi) cible plus le haut du dos et le deltoïde postérieur. Supination (paumes vers l'avant) recrute plus de biceps et de grand dorsal bas. Prise neutre (poignées parallèles, possible sur Smith ou T-bar) est la plus confortable pour les coudes et l'épaule. Toutes valident — alterne pour la variété.",
      },
      {
        q: "Mon bas du dos chauffe sur le rowing : pourquoi ?",
        a: "Trois causes habituelles : (1) buste trop penché (proche horizontal), qui charge tes érecteurs spinaux comme un faux SDT statique, (2) charge trop lourde qui te fait perdre la position, (3) gainage absent. Travaille à charge réduite avec un buste autour de 45° et un bracing solide. Si la douleur persiste, vérifie ton hip hinge.",
      },
      {
        q: "Combien de répétitions pour développer le dos ?",
        a: "8-12 répétitions à 70-80 % du 1RM est la zone classique pour l'hypertrophie du dos. Pour la force pure (renforcer la chaîne et habituer aux charges lourdes), descends à 4-6 reps. Pour la connexion neuro-musculaire (si tu \"ne sens pas\" ton dos), monte à 12-15 reps avec une charge plus légère et concentre-toi sur la séquence omoplate-d'abord.",
      },
    ],
  },

  tractions: {
    slug: "tractions",
    exerciseLabel: "tractions",
    metaTitle: "Échauffement tractions — Préparer dos épaules grip avant pull-ups",
    metaDescription:
      "Échauffement tractions complet : scapulaires, mobilité thoracique, grip. 6 mouvements en 5 min pour tractions strictes ou lestées. Gratuit.",
    h1: "Échauffement avant les tractions",
    subtitle: "Pull-ups · Scapulae · Thoracique · Grip · 5 minutes",
    intro: [
      "Les <strong class='text-white'>tractions</strong> (pull-ups) sont l'exercice de tirage de référence — et l'un des plus exigeants pour les épaules quand elles sont mal préparées. Sous une charge égale à ton poids du corps (et plus si tu lestes), la coiffe des rotateurs et les fixateurs scapulaires doivent être <em>déjà actifs</em> avant la première répétition. Ce protocole les active spécifiquement.",
      "À pratiquer juste avant tes premières tractions de la séance. Compte 4 à 5 minutes. Le résultat : omoplates qui glissent et se rétractent librement (la base d'une traction propre), grip prêt, coiffe activée, mobilité thoracique disponible pour amener la poitrine vers la barre. Tu enchaîneras 1 à 2 répétitions de plus dès la première série juste grâce à un échauffement bien fait.",
    ],
    exercises: [
      {
        name: "Mobilisation thoracique en quadrupédie",
        description:
          "À quatre pattes, main droite derrière la nuque. Coude vers le coude opposé, ouverture vers le plafond. Libère la rotation thoracique. Sans elle, tu n'amènes pas la poitrine à la barre, tu \"tires juste avec les bras\".",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Cercles d'épaules amples",
        description:
          "Debout, bras le long du corps. Grands cercles vers l'arrière puis vers l'avant. Lubrifie l'articulation gléno-humérale avant la suspension chargée.",
        durationSeconds: 30,
        reps: "30s",
      },
      {
        name: "Band pull-aparts",
        description:
          "Bande élastique tenue devant, bras tendus. Écarte la bande en serrant les omoplates. Active rhomboïdes et trapèze moyen — clé pour engager le dos en haut de traction.",
        durationSeconds: 45,
        reps: "15 répétitions",
      },
      {
        name: "Dead hangs (suspensions)",
        description:
          "Suspendu à la barre, bras tendus, épaules <em>actives</em> (pas avachies dans les épaules — \"écarte les épaules de tes oreilles\"). Décompresse la colonne et active le grip. 30 secondes de qualité.",
        durationSeconds: 30,
        reps: "30s",
      },
      {
        name: "Scapular pulls (tractions scapulaires)",
        description:
          "Suspendu à la barre, bras tendus. Sans plier les coudes, descends en activant les omoplates. Le corps remonte de quelques centimètres. Active spécifiquement les fixateurs avant les vraies tractions.",
        durationSeconds: 45,
        reps: "8 répétitions",
      },
      {
        name: "Tractions à amplitude réduite",
        description:
          "1 ou 2 séries de 3 répétitions à amplitude haute (juste les 30 % du haut du mouvement). Active la chaîne complète à charge croissante avant les séries de travail.",
        durationSeconds: 60,
        reps: "2 × 3 répétitions",
      },
    ],
    advice: {
      title: "Engager le dos avant les bras",
      paragraphs: [
        "Une <strong class='text-white'>traction propre</strong> commence par une <em>scapular pull</em> — les omoplates tirent en premier, le corps s'élève de quelques centimètres avant que les coudes ne plient. Si tu plies directement les coudes, tu fais une traction \"biceps\" : épaules dans les oreilles, dos non engagé, plafond de progression rapide. La séquence saine : <strong class='text-white'>épaules basses → rétraction scapulaire → flexion des coudes</strong>.",
        "Pour <strong class='text-white'>monter haut</strong> (poitrine à la barre, pas juste menton), tu as besoin d'une cage thoracique mobile en extension. C'est la mobilité thoracique en quadrupédie de ce protocole qui te la donne. Sans elle, tu plafonnes au menton et tu rates la moitié du recrutement du grand dorsal.",
        "Si tu ne fais <strong class='text-white'>pas encore une seule traction</strong>, suis ce protocole puis travaille les tractions <em>excentriques</em> (saute en haut, descends en 5 secondes) et les <em>scapular pulls</em>. C'est plus efficace que les tirages assistés à la machine. Compte 4-8 semaines pour ta première traction stricte si tu pars de zéro.",
      ],
    },
    faqs: [
      {
        q: "Pronation, supination ou prise neutre ?",
        a: "Pronation (paumes vers l'avant) = traction classique, recrute plus le haut du dos et le grand dorsal. Supination (paumes vers toi, chin-up) = plus de biceps et plus facile pour la plupart. Prise neutre = la plus confortable pour les coudes et l'épaule. Toutes les trois valent le coup — alterne sur le mois.",
      },
      {
        q: "Combien de tractions pour avoir un dos large ?",
        a: "Pour le développement de la largeur, 3-4 séries de 6-12 reps avec une bonne technique, 2x par semaine. Si tu en fais déjà 12 strictes, leste-toi avec 5-10 kg pour rester dans cette zone d'hypertrophie. Tirer 25 reps à vide te développe l'endurance, pas la masse.",
      },
      {
        q: "Faut-il des straps ou de la magnésie ?",
        a: "Pour des séries strictes au poids du corps, ni l'un ni l'autre. Sur des tractions lestées (>20 kg), des straps sont légitimes pour ne pas que ton grip cède avant ton dos. La magnésie aide aussi sur les barres glissantes. Évite les straps systématiques — ton grip se développe en grande partie sur les tractions.",
      },
      {
        q: "Mes épaules grincent en haut de traction : que faire ?",
        a: "Souvent : un manque d'activation des fixateurs scapulaires (les <em>scapular pulls</em> de ce protocole adressent ça), ou une coiffe peu mobile. Réduis temporairement l'amplitude (ne va pas chercher la poitrine au début), travaille les pull-aparts et face pulls, et reviens progressivement à l'amplitude complète après 2-3 semaines.",
      },
    ],
  },

  "developpe-militaire": {
    slug: "developpe-militaire",
    exerciseLabel: "développé militaire",
    metaTitle: "Échauffement développé militaire — OHP épaules thoracique avant push press",
    metaDescription:
      "Échauffement développé militaire complet : coiffe, thoracique, grand dentelé. 6 mouvements en 5 min pour OHP, push press, push jerk. Gratuit.",
    h1: "Échauffement avant le développé militaire",
    subtitle: "OHP · Coiffe · Thoracique · Grand dentelé · 5 minutes",
    intro: [
      "Le <strong class='text-white'>développé militaire</strong> (OHP — overhead press) est l'exercice qui exige le plus de mobilité et de stabilité d'épaule. Pour pousser une charge au-dessus de la tête sans douleur, tu as besoin d'une <strong class='text-white'>flexion gléno-humérale complète</strong>, d'un <strong class='text-white'>thoracique mobile</strong> en extension, et d'un <strong class='text-white'>grand dentelé actif</strong> qui fait basculer correctement les omoplates en haut du mouvement.",
      "À pratiquer juste avant tes séries de chauffe. Compte 5 minutes. Le résultat : l'épaule passe \"librement\" en flexion totale, la cage thoracique reste ouverte, le grand dentelé active la rotation supérieure de l'omoplate (rythme scapulo-huméral). Tu pousses 5-10 kg de plus avec moins de stress articulaire — et surtout, tu protèges ta coiffe contre l'usure répétée du push lourd.",
    ],
    exercises: [
      {
        name: "Mobilisation thoracique en extension (\"thoracic opener\")",
        description:
          "Allongé sur le dos, un rouleau ou une serviette enroulée sous le milieu du dos. Bras au-dessus de la tête. Étire la cage thoracique en extension. Sans cette mobilité, tu ne montes pas la barre verticalement.",
        durationSeconds: 45,
        reps: "30s + 30s",
      },
      {
        name: "Cercles d'épaules amples + cross-body",
        description:
          "30s de cercles amples, puis 30s de cross-body stretch (un bras tiré contre la poitrine). Lubrifie la gléno-humérale et étire le deltoïde postérieur.",
        durationSeconds: 60,
        reps: "60s combiné",
      },
      {
        name: "Wall slides (glissements muraux)",
        description:
          "Dos contre un mur, bras en W. Glisse les bras au-dessus de la tête en gardant les avant-bras au mur. Active le rythme scapulo-huméral nécessaire à l'OHP. Si tu n'arrives pas à monter haut sans décoller, tu sais où est le travail.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
      {
        name: "Pompes scapulaires",
        description:
          "Position planche, coudes verrouillés. Les omoplates glissent. Active le grand dentelé, indispensable à l'OHP pour la rotation supérieure de l'omoplate.",
        durationSeconds: 30,
        reps: "10 répétitions",
      },
      {
        name: "Rotations externes à l'élastique",
        description:
          "Coude au flanc, avant-bras à 90°. Rotation externe contre la résistance. Cible la coiffe (sus-épineux, infra-épineux). Non négociable avant un push lourd.",
        durationSeconds: 60,
        reps: "12 par bras",
      },
      {
        name: "OHP à la barre vide",
        description:
          "Barre vide, prise légèrement plus large qu'épaules. 10 répétitions en explorant la trajectoire : barre qui passe devant la tête, finit derrière le plan des oreilles. Verrouille le pattern moteur.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Trajectoire et bracing : les non-dits du push lourd",
      paragraphs: [
        "La <strong class='text-white'>trajectoire de la barre</strong> à l'OHP n'est pas verticale comme on l'imagine. Au démarrage, ta tête est sur le passage de la barre — pour la laisser monter, tu dois soit pencher la tête en arrière, soit ramener la tête vers l'avant <em>après</em> que la barre soit passée. La barre finit <strong class='text-white'>au-dessus du milieu de l'oreille</strong>, pas devant. Une trajectoire \"en avant\" charge les épaules et le bas du dos.",
        "Le <strong class='text-white'>bracing</strong> est aussi important qu'au squat. Une OHP debout sans gainage sérieux = un transfert de force qui passe par les lombaires. Avant chaque répétition lourde : inspire profondément, serre les abdos et les fessiers comme si tu allais recevoir un coup. La cage abdominale stable = les épaules peuvent pousser sans qu'aucune énergie ne se perde.",
        "Pour <strong class='text-white'>les pratiquants avec mobilité d'épaule limitée</strong>, le <em>landmine press</em> (barre dans un coin, on pousse en diagonale) est une excellente alternative pendant que tu travailles la mobilité. Le push press (avec impulsion des jambes) est aussi plus accessible que le strict press pour les charges lourdes.",
      ],
    },
    faqs: [
      {
        q: "Développé militaire ou développé assis : que choisir ?",
        a: "Le développé militaire <em>debout</em> (OHP strict) est plus fonctionnel et sollicite davantage de stabilisateurs (gainage, fessiers). Le développé <em>assis</em> permet plus de charge mais isole l'épaule. Programme idéal : OHP debout en exercice principal, développé assis en accessoire si tu veux pousser plus lourd ou compléter le volume.",
      },
      {
        q: "Combien de séries de chauffe avant l'OHP lourd ?",
        a: "Pour 80 % du 1RM : barre vide × 10, 50 % × 5, 70 % × 3, 80 % × 1. L'OHP demande plus de chauffe que le DC car la coiffe est plus exposée. Ne sous-estime pas la barre vide — c'est là que tu programmes la trajectoire.",
      },
      {
        q: "L'OHP debout abîme-t-il le dos ?",
        a: "Pas s'il est bien exécuté. Le bracing solide et un léger crunch des fessiers protègent les lombaires. Si tu as mal au bas du dos sur l'OHP, c'est presque toujours un problème de bracing absent + une trop grande hyperextension lombaire pour compenser un manque de mobilité d'épaule. Travaille la mobilité thoracique et le gainage avant de blâmer l'exercice.",
      },
      {
        q: "Push press ou strict press ?",
        a: "Le strict press (sans aide des jambes) est l'étalon-or pour la force d'épaule pure. Le push press (avec impulsion des genoux) permet plus de charge et entraîne la coordination triple-extension (cheville, genou, hanche). Programme : strict press en exercice principal, push press en variante hebdomadaire ou en finisher pour pousser des charges plus lourdes.",
      },
    ],
  },
};

export const EXERCICE_SLUGS = Object.keys(EXERCICE_PAGES);
