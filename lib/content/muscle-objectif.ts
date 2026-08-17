import type { MuscleGroup, Objective } from "@/lib/warmup-data";

/**
 * Contenu spécifique au croisement muscle × objectif.
 *
 * But : différencier réellement les 28 pages /echauffement/{muscle}/{objectif}
 * pour qu'elles ne soient pas perçues comme du near-duplicate par Google
 * (chacune doit porter un contenu propre à SON objectif sur CE muscle, pas un
 * simple paragraphe substitué).
 *
 * Deux niveaux complémentaires :
 *  - OBJECTIVE_PROFILES : la science d'entraînement propre à chaque objectif
 *    (charges, reps, ce que l'échauffement amorce, FAQ dédiées). Distingue les
 *    4 objectifs d'un même muscle.
 *  - MUSCLE_OBJECTIVE_NOTES : un paragraphe d'accroche unique pour chacune des
 *    28 combinaisons, qui relie concrètement l'anatomie du muscle à l'objectif.
 */

export interface ObjectiveProfile {
  /** Titre de la section "conseils" propre à l'objectif */
  adviceTitle: string;
  /** Para 1 des conseils : la physiologie de l'objectif appliquée au muscle */
  science: (muscleLow: string) => string;
  /** Para 2 des conseils : guidage concret charges / répétitions */
  chargeReps: (muscleLow: string) => string;
  /** FAQ propre à l'objectif (varie sur les 4 objectifs) */
  faq: (muscleLow: string) => { q: string; a: string };
  /** FAQ "séries de chauffe / charge" propre à l'objectif */
  rampFaq: (muscleLow: string) => { q: string; a: string };
}

export const OBJECTIVE_PROFILES: Record<Objective, ObjectiveProfile> = {
  force: {
    adviceTitle: "Préparer une séance de force lourde",
    science: (m) =>
      `En <strong class='text-white'>force pure</strong> (séries de 1 à 5 répétitions proches du maximum), le facteur limitant n'est pas la fatigue musculaire mais le <strong class='text-white'>recrutement nerveux</strong> : ta capacité à activer un maximum d'unités motrices dès la première répétition. L'échauffement ci-dessus n'est pas là pour te fatiguer — il pré-active le système nerveux et répète le schéma moteur à vide, pour que tes ${m} encaissent la charge sans temps de latence.`,
    chargeReps: (m) =>
      `Concrètement : garde l'échauffement court et non fatigant, puis enchaîne des <strong class='text-white'>séries de chauffe progressives</strong> à la barre — typiquement 50 %, 70 %, 85 %, puis 1-2 répétitions à 90-95 % avant ta première série de travail. Sur les mouvements légers d'activation, cherche à être <strong class='text-white'>explosif</strong> à la montée même sans charge : c'est ce qui réveille les fibres rapides dont dépend la force sur les ${m}.`,
    faq: () => ({
      q: "Un échauffement long améliore-t-il la force ?",
      a: "Non, c'est même contre-productif. Pour la force, un échauffement trop long ou trop intense entame le stock d'énergie nerveuse que tu veux préserver pour tes séries lourdes. 5 à 6 minutes de mobilisation et d'activation ciblée suffisent, puis tu montes en charge avec la barre. La potentiation vient des séries de chauffe progressives, pas du volume d'échauffement.",
    }),
    rampFaq: (m) => ({
      q: "Combien de séries de chauffe à la barre après cet échauffement ?",
      a: `Pour une séance de force sur les ${m}, compte 3 à 4 séries de chauffe progressives sur ton premier exercice lourd : par exemple 5 reps à 50 %, 3 à 70 %, 2 à 85 %, 1 à 90-95 %, avant tes séries de travail. Cet échauffement général prépare le corps ; les séries de chauffe préparent le mouvement spécifique et la charge.`,
    }),
  },

  hypertrophie: {
    adviceTitle: "Optimiser une séance de prise de muscle",
    science: (m) =>
      `En <strong class='text-white'>hypertrophie</strong> (séries de 8 à 15 répétitions, volume élevé), le levier principal est la <strong class='text-white'>connexion mind-muscle</strong> : sentir les ${m} se contracter sur chaque répétition pour qu'ils reçoivent réellement la tension, au lieu de la laisser fuir vers les muscles assistants. L'activation ciblée ci-dessus établit cette connexion à froid, avant que la fatigue des premières séries ne brouille le signal.`,
    chargeReps: (m) =>
      `Tu as besoin de moins de séries de chauffe lourdes qu'en force, mais d'une <strong class='text-white'>activation plus qualitative</strong> : une à deux séries légères en amplitude complète et tempo lent sur ton premier exercice, en cherchant le contact musculaire sur les ${m}. Contrôle l'<strong class='text-white'>excentrique</strong> (la phase de descente) dès l'échauffement — c'est là que se construit le muscle, et l'habituer tôt améliore la qualité de toutes tes séries de travail.`,
    faq: () => ({
      q: "L'échauffement change-t-il quelque chose à la prise de muscle ?",
      a: "Indirectement, oui. Un muscle bien activé et connecté reçoit plus de tension mécanique à charge égale — le moteur principal de l'hypertrophie. À l'inverse, attaquer froid laisse les muscles assistants compenser : tu fais le mouvement, mais le muscle cible prend une part réduite du travail. L'activation pré-séance maximise le stimulus utile de chaque série.",
    }),
    rampFaq: () => ({
      q: "Faut-il des séries de chauffe avant chaque exercice d'hypertrophie ?",
      a: "Sur le premier exercice (souvent le plus lourd), oui : 1 à 2 séries légères en contrôle suffisent. Sur les exercices d'isolation suivants, une série d'approche est généralement assez puisque les muscles sont déjà chauds et connectés. L'essentiel est de ne jamais attaquer une série de travail à froid sur un nouveau pattern de mouvement.",
    }),
  },

  reprise: {
    adviceTitle: "Reprendre en sécurité après une pause ou une blessure",
    science: (m) =>
      `En <strong class='text-white'>reprise</strong> — retour de blessure, longue coupure, ou ${m} encore courbaturés — l'échauffement devient ta principale assurance. L'objectif n'est pas la performance mais la <strong class='text-white'>remise en charge progressive des tissus</strong> et le retour de la proprioception : réapprendre au corps le mouvement avant de lui réimposer la charge. Un protocole complet de mobilisation puis d'activation douce prépare sans agresser.`,
    chargeReps: () =>
      `La règle d'or : <strong class='text-white'>recommence plus bas que ton ego ne le voudrait</strong>. Reprends à 50-60 % des charges d'avant la pause et remonte sur plusieurs séances, pas en une seule. Pendant l'échauffement comme sur tes premières séries, reste à l'écoute : une gêne diffuse qui s'estompe en bougeant est normale, une douleur vive et localisée est un signal d'arrêt. Privilégie l'amplitude contrôlée à la charge.`,
    faq: () => ({
      q: "Combien de temps s'échauffer en reprise ?",
      a: "Plus longtemps qu'en temps normal : 8 à 10 minutes plutôt que 5. En reprise, la phase de mobilisation articulaire et de proprioception est aussi importante que la séance elle-même. Prends le temps de réveiller chaque articulation et de retrouver les sensations avant de charger — c'est ce qui évite la rechute.",
    }),
    rampFaq: () => ({
      q: "À quelle charge reprendre après cet échauffement ?",
      a: "Démarre à 50-60 % de ce que tu soulevais avant la coupure, même si ça te paraît trop facile. Le tissu musculaire récupère vite, mais les tendons et les articulations se réadaptent plus lentement — c'est eux que tu protèges en remontant progressivement sur 2 à 4 semaines. Mieux vaut une reprise frustrante qu'une rechute.",
    }),
  },

  mobilite: {
    adviceTitle: "Faire de l'échauffement un vrai travail de mobilité",
    science: (m) =>
      `Quand la séance vise la <strong class='text-white'>mobilité</strong>, l'échauffement n'est plus une préparation : il <strong class='text-white'>fait partie du travail</strong>. L'enjeu est de gagner de l'amplitude <em>active</em> et contrôlée sur les articulations des ${m}, pas seulement de t'étirer passivement. La mobilisation ci-dessus libère les amplitudes que tu vas ensuite exploiter et renforcer — une amplitude que tu ne contrôles pas n'est pas de la mobilité, c'est de la fragilité.`,
    chargeReps: () =>
      `Travaille en <strong class='text-white'>contrôle de fin d'amplitude</strong> : va chercher la position extrême, puis contracte activement pour y rester sans élan (rotations articulaires lentes, type CARs). Oublie les charges lourdes ce jour-là — la progression se mesure en degrés d'amplitude gagnés et contrôlés, pas en kilos. Quelques répétitions lentes et précises valent mieux que beaucoup de répétitions relâchées.`,
    faq: () => ({
      q: "Mobilité et étirement, est-ce la même chose ?",
      a: "Non. L'étirement passif allonge le muscle sans contrôle ; la mobilité, c'est ta capacité à produire et contrôler du mouvement dans toute l'amplitude d'une articulation. Pour la musculation, c'est la mobilité qui compte : elle te permet d'aller en position basse de squat ou de développé en sécurité. Cet échauffement travaille l'amplitude active, pas l'étirement statique.",
    }),
    rampFaq: () => ({
      q: "Peut-on faire ce travail de mobilité tous les jours ?",
      a: "Oui — contrairement à une séance lourde, le travail de mobilité contrôlée peut se pratiquer quotidiennement, y compris les jours off, car il sollicite peu les muscles et beaucoup le système nerveux et les articulations. C'est même la fréquence qui fait progresser l'amplitude : 5 à 10 minutes par jour battent une grosse session hebdomadaire.",
    }),
  },
};

/**
 * Accroche unique par combinaison muscle × objectif (paragraphe d'intro n°1).
 * 28 paragraphes distincts : c'est le cœur de la différenciation anti-duplicate.
 */
export const MUSCLE_OBJECTIVE_NOTES: Record<MuscleGroup, Record<Objective, string>> = {
  pecs: {
    force: `Sur un <strong class='text-white'>développé couché lourd</strong> (1 à 5 reps), ce qui te limite n'est presque jamais la force du pec lui-même mais la stabilité de l'épaule et la solidité de la rétraction scapulaire sous charge maximale. Préparer la coiffe des rotateurs et le grand dentelé avant la barre te donne une base stable d'où pousser — sans elle, l'épaule "flotte" et tu perds plusieurs kilos de potentiel dès la mise en place.`,
    hypertrophie: `En <strong class='text-white'>hypertrophie des pectoraux</strong>, tout se joue sur la sensation : si tu ne sens pas le pec se contracter, ce sont l'épaule antérieure et le triceps qui récupèrent le travail. Une activation ciblée à vide (pompes lentes, écartés sans charge) "allume" le pectoral pour qu'il initie la poussée dès ta première série de travail, pas à la troisième.`,
    reprise: `Reprendre les <strong class='text-white'>pectoraux</strong> après une douleur d'épaule ou une longue coupure demande de reconstruire la stabilité avant de chercher la charge. Ce plan monte en intensité tout en douceur et insiste sur la coiffe, pour que ta première séance de développé prépare le mouvement sans réveiller la gêne qui t'avait arrêté.`,
    mobilite: `Un travail de <strong class='text-white'>mobilité orienté pecs et épaule</strong> vise à récupérer l'amplitude de rétraction scapulaire et d'extension thoracique que les poussées répétées et la position assise raccourcissent. L'objectif n'est pas d'étirer le pectoral mais de gagner du contrôle actif en fin d'amplitude, pour des écartés et des dips plus profonds et plus sûrs.`,
  },
  dos: {
    force: `Sur un <strong class='text-white'>soulevé de terre ou un rowing lourd</strong>, le dos doit créer une tension isométrique énorme avant même que la barre quitte le sol. Réveiller la rétraction et la dépression scapulaires en amont apprend à tes dorsaux et trapèzes à se verrouiller tôt — ce qui protège les lombaires et transmet davantage de force à la barre.`,
    hypertrophie: `Le <strong class='text-white'>dos</strong> est le muscle où "tirer avec les bras" sabote le plus la croissance. Réveiller la rétraction des omoplates avant la séance fait initier chaque tirage par le dos et non par les biceps — la condition numéro un pour que tes dorsaux prennent réellement le stimulus sur des séries de 8 à 15 reps.`,
    reprise: `Reprendre le <strong class='text-white'>dos</strong> après un lumbago ou une pause se joue sur la charnière de hanche et le gainage, pas sur la force de tirage. Ce plan réactive en douceur le pattern de hip-hinge et la coordination scapulaire à vide, pour que ton premier rowing ou tirage se fasse sur des bases sûres.`,
    mobilite: `La <strong class='text-white'>mobilité du dos</strong> se travaille surtout au niveau du rachis thoracique, souvent figé par les heures assises, et de la coordination des omoplates. Gagner de l'extension et de la rotation thoraciques actives améliore ta posture de tirage et libère l'épaule — un thoracique mobile, c'est moins de compensation lombaire et cervicale sous charge.`,
  },
  epaules: {
    force: `Pour un <strong class='text-white'>développé militaire lourd</strong>, la puissance des deltoïdes ne sert à rien si la coiffe des rotateurs ne centre pas la tête humérale au passage du point de blocage. L'activation dédiée de la coiffe avant tes séries lourdes stabilise l'articulation et débloque la force que le deltoïde peut réellement exprimer en sécurité.`,
    hypertrophie: `En <strong class='text-white'>hypertrophie des épaules</strong>, le piège est de laisser les trapèzes voler le travail des deltoïdes sur les élévations. Pré-activer le deltoïde moyen et la coiffe à vide te permet de sentir l'épaule travailler en isolation dès la première série — la clé pour faire grossir des deltoïdes souvent récalcitrants.`,
    reprise: `L'<strong class='text-white'>épaule</strong> est l'articulation qui rechute le plus vite quand on reprend trop fort. Ce plan privilégie le réveil progressif de la coiffe et le contrôle de l'amplitude avant tout retour aux développés, pour reconstruire la stabilité avant de redemander de la force.`,
    mobilite: `La <strong class='text-white'>mobilité d'épaule</strong> conditionne à peu près tout le haut du corps : passage de barre au-dessus de la tête, position basse de développé, santé de l'articulation à long terme. Le travail ci-dessous cherche le contrôle actif en flexion et rotation complètes — l'amplitude la plus utile et la plus souvent perdue chez les pratiquants.`,
  },
  jambes: {
    force: `Sur un <strong class='text-white'>squat lourd</strong>, la force des jambes reste bloquée si la cheville et la hanche n'ouvrent pas l'amplitude. Mobiliser la dorsiflexion de cheville et la hanche avant de charger te permet d'atteindre la profondeur sans reporter le stress sur le genou ni le bas du dos — c'est de l'amplitude utilisable, donc de la force exprimable.`,
    hypertrophie: `En <strong class='text-white'>hypertrophie des jambes</strong>, la profondeur fait le muscle : un squat ou une presse en amplitude complète recrute bien plus de fibres qu'un demi-mouvement. Débloquer cheville et hanche à l'échauffement te donne accès à cette amplitude dès les premières séries, là où la croissance se gagne.`,
    reprise: `Reprendre les <strong class='text-white'>jambes</strong> après une pause ou une gêne au genou demande de restaurer la mobilité distale et le contrôle avant la charge. Ce plan réveille cheville, hanche et fessiers pour décharger le genou, et réintroduit le pattern de squat à vide avant tout retour à la barre.`,
    mobilite: `La <strong class='text-white'>mobilité des membres inférieurs</strong> se gagne sur deux verrous : la dorsiflexion de cheville et l'ouverture de hanche. Travailler ces deux amplitudes en contrôle actif transforme la profondeur et la sécurité de tous tes mouvements de jambes — c'est le chantier le plus rentable pour qui squatte ou tire.`,
  },
  fessiers: {
    force: `Sur un <strong class='text-white'>hip thrust ou un soulevé de terre lourd</strong>, des fessiers mal activés laissent les ischio-jambiers et les lombaires faire le travail à leur place. L'activation ciblée (ponts, abductions) avant la barre rétablit le recrutement du grand fessier pour que la force vienne d'où elle doit venir — la hanche, pas le bas du dos.`,
    hypertrophie: `Pour faire grossir les <strong class='text-white'>fessiers</strong>, encore faut-il qu'ils s'allument : des heures assises les inhibent, et sans activation préalable c'est l'arrière de cuisse qui prend la tension. Quelques minutes de ponts et d'abductions établissent la connexion fessière avant ta première série, condition indispensable d'un vrai stimulus de croissance.`,
    reprise: `En <strong class='text-white'>reprise sur les fessiers</strong>, l'enjeu est de réveiller un muscle souvent endormi sans surcharger les lombaires qui compensaient à sa place. Ce plan réactive progressivement le grand fessier et le gainage du bassin, pour que le hip thrust et le soulevé roumain repartent sur les bons appuis.`,
    mobilite: `La <strong class='text-white'>mobilité de hanche</strong> est le cœur du travail fessier : sans ouverture suffisante, l'amplitude du hip thrust et du squat se reporte sur le bas du dos. Le plan ci-dessous cherche le contrôle actif de la hanche en flexion et en rotation, pour des fessiers qui travaillent en pleine amplitude plutôt que des lombaires qui compensent.`,
  },
  bras: {
    force: `Même en <strong class='text-white'>force sur les bras</strong> (curls et extensions lourds, tractions lestées), le coude est une charnière qui tolère mal les départs à froid sous charge. Préparer la rotation d'épaule, le coude et les poignets avant les séries lourdes protège les tendons du biceps et de l'épicondyle, là où apparaissent les blessures classiques des séances bras.`,
    hypertrophie: `En <strong class='text-white'>hypertrophie des bras</strong>, biceps et triceps répondent à la qualité de contraction plus qu'à la charge. Échauffer coudes et poignets puis faire quelques contractions à vide te permet de sentir le muscle dès la première série et de pousser en sécurité — un avant-bras et un coude froids bridraient la connexion et inviteraient la tendinite.`,
    reprise: `Les <strong class='text-white'>bras</strong> concentrent deux blessures de surcharge fréquentes : tendinopathie du long biceps et épicondylite. En reprise, ce plan réintroduit en douceur la flexion-extension chargée du coude et la mobilité du poignet, pour recharger les tendons progressivement plutôt que de relancer l'inflammation.`,
    mobilite: `La <strong class='text-white'>mobilité utile aux bras</strong> se situe surtout au coude et au poignet — souvent négligés jusqu'à ce qu'ils coincent sur les curls EZ ou les extensions. Travailler l'amplitude active de ces articulations, plus la rotation d'épaule, garde tes séances de bras indolores et techniquement propres.`,
  },
  core: {
    force: `En <strong class='text-white'>force</strong>, le core ne produit pas le mouvement : il transmet la force du bas vers le haut en empêchant ta colonne de céder sous la barre. Réveiller le gainage anti-extension et la coordination bassin-colonne avant un soulevé ou un développé militaire lourd, c'est verrouiller le canal par lequel passe toute ta puissance.`,
    hypertrophie: `Pour développer un <strong class='text-white'>core</strong> visible et fonctionnel, l'enjeu est de réveiller le transverse et les obliques dans leur fonction de gainage, pas d'enchaîner les crunchs à froid. Cette activation rend tes exercices de core suivants plus efficaces et stabilise tous tes mouvements debout chargés, où l'abdomen travaille réellement.`,
    reprise: `En <strong class='text-white'>reprise</strong>, le core est souvent la pièce manquante après une douleur lombaire : c'est lui qui protège le rachis quand tu recharges. Ce plan réintroduit en douceur le gainage réflexe (dead bug, bird-dog) et la dissociation bassin-colonne, base de toute remise en charge sûre.`,
    mobilite: `La <strong class='text-white'>mobilité liée au core</strong> concerne surtout la dissociation entre le bassin, le rachis lombaire et le thoracique — la capacité à bouger une zone sans entraîner l'autre. Gagner ce contrôle améliore la rotation, protège les lombaires et rend ton gainage plus intelligent que de simples planches statiques.`,
  },
};
