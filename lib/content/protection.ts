import type { SEOExercise, SEOFaq } from "@/components/SEOPage";

export interface ProtectionContent {
  slug: string;
  zoneLabel: string; // "épaule", "genou", "lombaires", "poignets"
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string[];
  exercises: SEOExercise[];
  advice: { title: string; paragraphs: string[] };
  faqs: SEOFaq[];
}

export const PROTECTION_PAGES: Record<string, ProtectionContent> = {
  "epaule-douleur": {
    slug: "epaule-douleur",
    zoneLabel: "épaule",
    metaTitle: "Échauffement épaule sensible — Plan sécurisé pour la musculation",
    metaDescription:
      "Plan d'échauffement épaule complet pour les pratiquants avec douleur ou gêne articulaire. 6 mouvements doux ciblés coiffe des rotateurs, omoplate et thoracique. Gratuit.",
    h1: "Échauffement épaule pour douleur ou gêne",
    subtitle: "Protocole musculation · Coiffe des rotateurs · Mobilité scapulaire",
    intro: [
      "L'épaule est l'articulation la plus mobile et la plus instable du corps. Quand elle devient douloureuse en musculation — que ce soit sur le développé couché, les tractions ou un simple mouvement quotidien — l'échauffement classique ne suffit plus. Il faut un protocole spécifique qui réveille la <strong class='text-white'>coiffe des rotateurs</strong>, libère la <strong class='text-white'>mobilité thoracique</strong> et restabilise l'<strong class='text-white'>omoplate</strong> avant toute charge.",
      "Cet échauffement ne traite pas la cause d'une douleur installée. Si tu ressens une douleur aiguë, persistante ou qui s'aggrave, consulte un kinésithérapeute. En revanche, pour les gênes diffuses, les épaules \"capricieuses\" ou les sensations d'accrochage, ce protocole en 6 mouvements réduit le risque de blessure et améliore le confort articulaire dès la première série.",
      "À pratiquer avant chaque séance impliquant le haut du corps — pecs, dos, épaules, bras. Compte 5 à 6 minutes. Aucun matériel requis, un élastique léger est un plus pour les exercices d'activation.",
    ],
    exercises: [
      {
        name: "Cercles d'épaules amples",
        description:
          "Debout, bras le long du corps. Effectue de grands cercles avec les épaules, vers l'arrière puis vers l'avant. Mouvement lent, contrôlé, amplitude maximale sans douleur.",
        durationSeconds: 30,
        reps: "30s",
      },
      {
        name: "Mobilisation thoracique en quadrupédie",
        description:
          "À quatre pattes, main droite derrière la nuque. Amène le coude droit vers le coude gauche puis ouvre vers le plafond en suivant des yeux. Priorise la rotation du tronc plutôt que le bras seul.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Wall slides (glissements muraux)",
        description:
          "Dos contre un mur, bras en W. Glisse les bras au-dessus de la tête en gardant les avant-bras au mur. Si tes coudes ou poignets quittent le mur, réduis l'amplitude. Active les fixateurs de l'omoplate.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
      {
        name: "Rotations externes coude au corps",
        description:
          "Coude collé au flanc, avant-bras à 90°. Effectue une rotation externe (la main s'éloigne du nombril). Avec un élastique léger pour plus d'efficacité. Cible la coiffe des rotateurs.",
        durationSeconds: 60,
        reps: "12 par bras",
      },
      {
        name: "Y-T-W au sol",
        description:
          "Allongé sur le ventre, front au sol. Bras en Y (au-dessus de la tête), puis T (croix), puis W (coudes pliés vers les hanches). Décolle les bras du sol à chaque position. Renforce le bas trapèze et les rhomboïdes.",
        durationSeconds: 60,
        reps: "5 cycles complets",
      },
      {
        name: "Pompes scapulaires",
        description:
          "En position de pompe (genoux ou pieds). Sans plier les coudes, descends en rapprochant les omoplates puis pousse en les écartant. Réveille le grand dentelé, clé pour l'antépulsion saine.",
        durationSeconds: 30,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Erreurs fréquentes à éviter",
      paragraphs: [
        "<strong class='text-white'>Sauter directement aux séries de chauffe sur l'exercice principal</strong> est la première cause d'aggravation des douleurs d'épaule. La coiffe des rotateurs a besoin d'un signal d'activation spécifique avant de stabiliser des charges lourdes en développé couché ou militaire.",
        "<strong class='text-white'>Forcer l'amplitude</strong> en pensant \"si je tire plus fort, j'irai mieux\" est une autre erreur. La règle est simple : zéro douleur pendant l'échauffement. Une légère tension est normale, une douleur — même modérée — signale qu'il faut réduire l'amplitude ou arrêter.",
        "<strong class='text-white'>Négliger la mobilité thoracique</strong> est un classique. Une cage thoracique rigide reporte tout le stress sur l'épaule. Les deux exercices de rotation thoracique du protocole sont non négociables.",
      ],
    },
    faqs: [
      {
        q: "Puis-je faire du développé couché avec une épaule douloureuse ?",
        a: "Cela dépend de l'intensité et de la nature de la douleur. Si la douleur est aiguë ou augmente pendant l'exercice, arrête et consulte un kinésithérapeute. Pour une gêne diffuse, ce protocole d'échauffement et un travail à amplitude réduite (planches sous la barre, prise plus serrée) peuvent permettre de continuer en attendant un avis professionnel.",
      },
      {
        q: "Combien de temps avant de voir une amélioration ?",
        a: "La plupart des gênes d'épaule liées à un manque d'activation s'améliorent en 2 à 4 semaines avec un échauffement quotidien et un travail régulier de la coiffe. Les blessures plus profondes (tendinopathie, conflit, lésion labrale) demandent un suivi spécialisé et plusieurs mois.",
      },
      {
        q: "Faut-il faire ce protocole tous les jours ou seulement avant les séances ?",
        a: "Avant chaque séance haut du corps au minimum. Si tu as une gêne installée, ajouter une session courte les jours de repos (3-4 mouvements) accélère la récupération. Le mouvement lubrifie l'articulation et stimule la circulation locale.",
      },
      {
        q: "Quels exercices de musculation éviter avec une épaule sensible ?",
        a: "Temporairement : développé militaire derrière la nuque, tirage à la nuque, élévations latérales très lourdes, dips trop profonds. Privilégie les variantes neutres (haltères en pronation neutre) et les amplitudes contrôlées. La progression revient avec la guérison.",
      },
    ],
  },

  genou: {
    slug: "genou",
    zoneLabel: "genou",
    metaTitle: "Échauffement genou musculation — Squat, fentes, presse en sécurité",
    metaDescription:
      "Plan d'échauffement genou complet pour les pratiquants avec gêne articulaire. 6 mouvements pour mobiliser hanche, genou et cheville avant squat ou jambes. Gratuit.",
    h1: "Échauffement genou pour la musculation",
    subtitle: "Protocole bas du corps · Hanche · Cheville · VMO",
    intro: [
      "Le genou est rarement la vraie source du problème. Dans 80 % des cas, une douleur ou gêne au genou en musculation vient d'<strong class='text-white'>une hanche peu mobile</strong> (rotation interne limitée), d'une <strong class='text-white'>cheville rigide</strong> (dorsiflexion insuffisante) ou d'un <strong class='text-white'>déséquilibre quadriceps / VMO</strong>. Ce protocole d'échauffement adresse les trois.",
      "À pratiquer avant chaque séance jambes — squat, presse, fentes, soulevé de terre roumain. Compte 5 minutes. L'objectif : que tu arrives sur ta première série de chauffe avec la mobilité, l'activation et la stabilité nécessaires pour exécuter le mouvement proprement, sans compensation pathogène.",
      "Si la douleur est aiguë, vive, ou qu'elle apparaît au repos, ce n'est pas un sujet d'échauffement — consulte un kinésithérapeute ou un médecin du sport. Pour les gênes mécaniques, les sensations d'accrochage, les genoux \"qui chauffent\" en début de séance, ce protocole change la donne.",
    ],
    exercises: [
      {
        name: "Mobilisation cheville en fente",
        description:
          "Position fente, genou avant aligné sur le pied. Pousse le genou vers l'avant en gardant le talon collé au sol. Cherche l'amplitude maximale sans douleur. La dorsiflexion de cheville conditionne la profondeur du squat.",
        durationSeconds: 60,
        reps: "10 par côté",
      },
      {
        name: "90/90 hip switches",
        description:
          "Assis au sol, jambes en équerre (90° chacune, une devant, une côté). Bascule d'un côté à l'autre en gardant le tronc droit. Travaille rotation interne et externe de hanche, clé pour un squat profond.",
        durationSeconds: 90,
        reps: "10 cycles",
      },
      {
        name: "Pont fessier deux jambes",
        description:
          "Allongé au sol, genoux fléchis, pieds à plat. Pousse dans les talons et lève le bassin. Serre les fessiers en haut, sans cambrer le bas du dos. Active fessiers et ischio, désactive le réflexe \"tout-quadriceps\".",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
      {
        name: "Cossack squat (squat cosaque)",
        description:
          "Pieds très écartés, transfère le poids sur une jambe en flexion profonde, jambe opposée tendue, talon en contact au sol. Mobilise hanches, adducteurs et chevilles dans un schéma global.",
        durationSeconds: 60,
        reps: "6 par côté",
      },
      {
        name: "Step-up lent contrôlé",
        description:
          "Sur une marche basse (20-30 cm), monte lentement (3 secondes) en activant le fessier de la jambe haute. Redescends lentement. Active la chaîne postérieure et stabilise le genou en charge unilatérale.",
        durationSeconds: 60,
        reps: "8 par jambe",
      },
      {
        name: "Air squats lents amplitude croissante",
        description:
          "Squat au poids du corps, descente progressive. Premier 1/3 d'amplitude, puis 1/2, puis amplitude complète. 3 répétitions par niveau. Prépare le pattern moteur sans charge.",
        durationSeconds: 60,
        reps: "9 répétitions totales",
      },
    ],
    advice: {
      title: "Le piège \"genou en avant des orteils\"",
      paragraphs: [
        "Pendant des décennies, on a entendu \"interdit, le genou ne doit pas dépasser les orteils\". <strong class='text-white'>C'est faux pour la plupart des squats.</strong> Empêcher le genou d'avancer reporte tout le stress sur le bas du dos et limite l'activation du quadriceps. Ce qui compte : que le genou suive l'axe du pied (pas de valgus dynamique), pas qu'il reste derrière les orteils.",
        "<strong class='text-white'>Le valgus dynamique</strong> (genou qui rentre vers l'intérieur en sortie de squat) est la vraie cause de blessure. Il vient quasi-toujours d'une faiblesse du moyen fessier ou d'une cheville rigide. C'est pour ça que ce protocole insiste sur la hanche et la cheville plutôt que sur le genou lui-même.",
        "Si tu as déjà une douleur fémoro-patellaire (en avant du genou), réduis temporairement l'amplitude du squat à un parallèle ou au-dessus, et travaille le VMO via les step-ups et les terminal knee extensions. La douleur disparaît souvent en 4 à 6 semaines avec ce protocole.",
      ],
    },
    faqs: [
      {
        q: "Puis-je faire du squat lourd avec un genou douloureux ?",
        a: "Si la douleur est légère et n'augmente pas pendant l'effort, oui — avec un échauffement adapté et une amplitude que tu maîtrises. Si la douleur s'intensifie ou tu ressens un craquement, arrête et consulte. Mieux vaut perdre 4 semaines de squat lourd qu'aggraver une lésion méniscale ou ligamentaire.",
      },
      {
        q: "Le squat profond est-il dangereux pour le genou ?",
        a: "Non, c'est un mythe. Les études (Hartmann et al., 2013) montrent que le squat profond, exécuté avec une bonne technique, n'augmente pas le risque de blessure et offre un meilleur recrutement musculaire. Ce qui blesse, c'est la mauvaise technique ou un saut brutal d'intensité, pas l'amplitude en soi.",
      },
      {
        q: "Faut-il porter une genouillère pour s'entraîner ?",
        a: "Pour s'entraîner régulièrement, non. Les genouillères en compression peuvent rassurer et réchauffer mais elles ne corrigent rien. Sur des charges très lourdes (>85 % du 1RM), des genouillères élastiques de force athlétique apportent un rebond mécanique légitime. Évite de devenir dépendant.",
      },
      {
        q: "Combien de temps avant de reprendre le squat après une douleur ?",
        a: "Si la douleur disparaît au repos en 48-72h et ne réapparaît pas avec ce protocole d'échauffement, tu peux reprendre à 60-70 % de ta charge habituelle et progresser de 5 % par séance. Si elle persiste plus d'une semaine, consulte. Une tendinite rotulienne mal gérée peut t'arrêter 3 mois.",
      },
    ],
  },

  lombaires: {
    slug: "lombaires",
    zoneLabel: "lombaires",
    metaTitle: "Échauffement bas du dos — Plan musculation pour lombaires sensibles",
    metaDescription:
      "Échauffement complet pour le bas du dos avant musculation. Mobilisation lombaire, gainage, activation fessière. 6 exercices sécurisés. Gratuit, sans inscription.",
    h1: "Échauffement bas du dos / lombaires",
    subtitle: "Protocole musculation · Mobilisation rachis · Activation fessière",
    intro: [
      "Le bas du dos est la zone la plus fréquemment blessée en musculation. La cause n'est presque jamais \"un dos faible\" — c'est plutôt <strong class='text-white'>un manque de mobilité de hanche</strong> qui force les lombaires à compenser, ou <strong class='text-white'>un gainage inactif</strong> qui laisse la colonne fléchir sous charge. Ce protocole adresse les deux.",
      "À pratiquer avant chaque séance impliquant un soulevé de terre, un squat lourd, des rowings ou tout exercice debout chargé. Compte 5 à 6 minutes. Tu peux aussi l'utiliser comme routine de matin si ton dos est raide au réveil — c'est souvent plus efficace que des étirements statiques.",
      "Si tu as une <strong class='text-white'>douleur sciatique</strong> (irradiation jusqu'à la jambe), une <strong class='text-white'>douleur aiguë qui te bloque</strong>, ou un trauma récent, ce n'est pas un sujet d'échauffement — consulte un médecin du sport ou un kinésithérapeute. Pour les raideurs, les gênes diffuses ou les lombaires \"qui chauffent\" sur le SDT, le protocole change la donne.",
    ],
    exercises: [
      {
        name: "Cat-cow (chat-vache)",
        description:
          "À quatre pattes. Inspire en creusant le dos (cow), expire en arrondissant (cat). Amplitude maximale, mouvement lent et fluide. Mobilise toute la colonne, pas seulement les lombaires.",
        durationSeconds: 60,
        reps: "10 cycles",
      },
      {
        name: "Bird-dog",
        description:
          "À quatre pattes, tends le bras droit et la jambe gauche en gardant le tronc parfaitement immobile (un verre d'eau sur le bas du dos ne tombe pas). Active gainage profond et coordination contralatérale.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Rotations thoraciques en quadrupédie",
        description:
          "À quatre pattes, main droite derrière la nuque. Amène le coude vers le sol, puis ouvre vers le plafond. La cage thoracique tourne, le bassin reste fixe. Libère la rotation thoracique souvent figée.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Pont fessier monté",
        description:
          "Allongé, pieds à plat, fessiers contractés en haut du mouvement. Serre fort les fessiers, ne laisse pas le bas du dos faire le travail. Désactive le réflexe \"je pousse avec mes lombaires\".",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
      {
        name: "Dead bug (insecte mort)",
        description:
          "Allongé sur le dos, bras tendus, jambes fléchies à 90°. Tends le bras gauche au-dessus de la tête et la jambe droite en avant. Le bas du dos reste collé au sol. Gainage anti-extension lombaire.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Soulevé de terre à vide en pattern",
        description:
          "Debout, mains aux fémurs, charnière de hanche pure : pousse les fessiers vers l'arrière, garde le dos plat, descends jusqu'à mi-tibias. Sans charge. Programme le pattern moteur du SDT avant la barre.",
        durationSeconds: 45,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Mobilité de hanche : la clé du dos sain",
      paragraphs: [
        "Si tu fais des heures de bureau par jour, tes <strong class='text-white'>fléchisseurs de hanche</strong> (ilio-psoas) sont raccourcis. Quand tu te mets en position de squat ou de soulevé, ils tirent sur les lombaires et créent une hyperlordose compensatoire. Résultat : tu \"sors les fesses\" exagérément et chauffes le bas du dos sur chaque rep.",
        "Le <strong class='text-white'>cat-cow et la rotation thoracique</strong> dans ce protocole adressent en partie ce problème. Si tu veux aller plus loin, ajoute 2 minutes d'étirement du psoas en fente debout après ta séance — pas avant. Les étirements statiques avant une séance lourde réduisent ta force et la stabilité.",
        "Le second levier critique : le <strong class='text-white'>gainage anti-extension</strong>. Les exercices de type dead bug, planche, gainage latéral apprennent à ton tronc à <em>résister</em> à l'extension lombaire sous charge. C'est ce qui te permet de tenir un squat lourd sans que ton bassin bascule en avant à chaque répétition.",
      ],
    },
    faqs: [
      {
        q: "Puis-je faire du soulevé de terre avec un mal de dos ?",
        a: "Cela dépend. Une raideur diffuse au réveil qui s'estompe avec ce protocole, oui — souvent même, le SDT léger soulage. Une douleur aiguë qui irradie ou te bloque, non — repos et consultation. Le SDT n'est pas dangereux par nature, c'est sa mauvaise exécution sous charge non maîtrisée qui blesse.",
      },
      {
        q: "Faut-il porter une ceinture de force pour protéger le dos ?",
        a: "Pas en dessous de 80 % du 1RM sur SDT et squat. La ceinture augmente la pression intra-abdominale et offre plus de stabilité, mais utilisée trop tôt elle empêche de développer un gainage naturellement fort. Sur les charges lourdes (PR, séries au-delà de 85 %), elle a sa place.",
      },
      {
        q: "Les abdos protègent-ils le dos ?",
        a: "Oui, mais pas comme on le croit. Ce ne sont pas les crunchs qui aident — c'est le gainage anti-rotation et anti-extension (planche, dead bug, paloff press). Ces exercices apprennent au tronc à stabiliser la colonne sous charge dynamique, ce qui prévient bien plus efficacement la blessure que des séries de relevés de buste.",
      },
      {
        q: "Combien de temps avant de reprendre après un lumbago ?",
        a: "48 à 72h de repos relatif (marche, mobilisations douces) puis reprise progressive sans charge avec ce protocole. Reprise des charges à 50 % de l'habituel, +10 % par séance si zéro douleur. Si le lumbago est récidivant ou ne passe pas en 5 jours, consulte un kinésithérapeute.",
      },
    ],
  },

  poignets: {
    slug: "poignets",
    zoneLabel: "poignets",
    metaTitle: "Échauffement poignets — Musculation et calisthénie sans douleur",
    metaDescription:
      "Échauffement poignets complet pour la musculation. Mobilisation, renforcement et activation avant développé couché, dips, pompes ou exercices au sol. Gratuit.",
    h1: "Échauffement poignets pour la musculation",
    subtitle: "Protocole · Mobilité · Renforcement extrinsèque · Préhension",
    intro: [
      "Le poignet est sollicité dès qu'il y a charge sur les bras — développé couché, dips, tractions, pompes, kettlebells, calisthénie. Une <strong class='text-white'>douleur de poignet</strong> en musculation vient le plus souvent d'un manque de mobilité (ce qui force des angles défavorables sous charge), d'un renforcement insuffisant des muscles fléchisseurs/extenseurs, ou d'une mauvaise prise sur la barre.",
      "Ce protocole prépare le poignet en 4 minutes via mobilisation, étirements actifs et activation des muscles stabilisateurs de l'avant-bras. À pratiquer avant chaque séance haut du corps. Particulièrement utile pour les pratiquants de calisthénie, ceux qui font beaucoup de pompes, ou qui développent des charges lourdes au DC.",
      "Si tu as une <strong class='text-white'>douleur aiguë</strong>, un gonflement, ou un déficit de force soudain, consulte. Une fracture du scaphoïde mal diagnostiquée laisse des séquelles. Pour les gênes diffuses, les sensations de pincement ou les poignets qui chauffent en bas de pompe, le protocole résout l'essentiel.",
    ],
    exercises: [
      {
        name: "Cercles de poignets",
        description:
          "Mains tendues devant toi, doigts joints. Effectue de grands cercles avec les poignets, 30 secondes dans chaque sens. Mouvement lent, amplitude maximale. Lubrification articulaire de base.",
        durationSeconds: 60,
        reps: "30s par sens",
      },
      {
        name: "Étirement fléchisseurs (paume vers le ciel)",
        description:
          "Bras tendu devant toi, main paume vers le ciel. Avec l'autre main, tire les doigts vers toi, vers le bas. Tu dois sentir un étirement sur le dessous de l'avant-bras. Tiens, sans rebond.",
        durationSeconds: 30,
        reps: "15s par bras",
      },
      {
        name: "Étirement extenseurs (paume vers le sol)",
        description:
          "Bras tendu devant toi, main paume vers le sol, dos de la main vers toi. Tire les doigts vers toi avec l'autre main. Étirement sur le dessus de l'avant-bras. Sans douleur, juste une tension.",
        durationSeconds: 30,
        reps: "15s par bras",
      },
      {
        name: "Wrist push-ups (pompes de poignets)",
        description:
          "À genoux ou debout, paumes au sol ou contre un mur, doigts vers toi. Bascule lentement le poids vers tes paumes pour étirer les fléchisseurs sous charge légère. Renforce et mobilise simultanément.",
        durationSeconds: 60,
        reps: "10 répétitions lentes",
      },
      {
        name: "Front et back raises de poignets (haltère ou bouteille)",
        description:
          "Avant-bras posé sur la cuisse, paume vers le ciel pour les flexions, paume vers le sol pour les extensions. Charge légère (1-3 kg ou bouteille d'eau). Active les muscles intrinsèques de l'avant-bras.",
        durationSeconds: 60,
        reps: "12 répétitions par sens",
      },
      {
        name: "Préhension (squeeze) progressive",
        description:
          "Saisis une serviette ou un objet rond, et serre fort, 5 secondes. Relâche. Augmente progressivement l'intensité sur 5 répétitions. Active la grip strength avant tout exercice impliquant la barre.",
        durationSeconds: 30,
        reps: "5 squeezes",
      },
    ],
    advice: {
      title: "Prise de barre : 90 % des problèmes viennent de là",
      paragraphs: [
        "Sur le développé couché, beaucoup de pratiquants ont une <strong class='text-white'>prise \"poignets cassés\"</strong> où la barre s'enfonce dans la paume vers les doigts. Sous charge, le poignet est en hyperextension extrême, ce qui crée une douleur en quelques semaines. La bonne prise : barre dans la <strong class='text-white'>base de la paume</strong>, alignée avec l'avant-bras. Poignet droit ou très légèrement en extension.",
        "Sur les pompes et les dips, la <strong class='text-white'>douleur en bas du mouvement</strong> vient souvent d'un manque de mobilité en extension de poignet. Le protocole ci-dessus la corrige en 2-3 semaines. En attendant, pose les pompes sur des poignées de pompes (parallètes) — la prise neutre soulage instantanément.",
        "Pour les pratiquants de musculation lourde au-delà de 100 kg au DC, des <strong class='text-white'>bandes de poignet (wrist wraps)</strong> ne sont pas un signe de faiblesse — elles protègent la structure passive sur les charges proches du max. Les utiliser au-dessous de 70 % du 1RM est par contre contre-productif : tu n'entraînes plus tes stabilisateurs.",
      ],
    },
    faqs: [
      {
        q: "Puis-je faire des pompes avec une douleur de poignet ?",
        a: "Oui, en utilisant des poignées parallètes (prise neutre) qui éliminent l'hyperextension. Si la douleur persiste même en prise neutre, consulte. Le syndrome du canal carpien et certaines tendinopathies demandent un repos plus long et un suivi spécialisé.",
      },
      {
        q: "Les bandes de poignet (wrist wraps) sont-elles indispensables ?",
        a: "Non, sauf à très haute intensité (>85 % du 1RM sur DC, dips lestés lourds). Elles compensent une instabilité ponctuelle sous charge maximale. À l'usage régulier sur charges modérées, elles affaiblissent les stabilisateurs naturels. Privilégie-les pour les séries lourdes seulement.",
      },
      {
        q: "J'ai mal au poignet sur le rowing barre. Pourquoi ?",
        a: "Le plus souvent : prise trop large qui force le poignet en flexion latérale, ou tu \"tires avec les bras\" au lieu d'engager le dos. Resserre la prise pour qu'elle soit alignée avec tes coudes, et concentre-toi sur la rétraction des omoplates avant que les coudes bougent.",
      },
      {
        q: "Combien de temps avant de retrouver des poignets sans douleur ?",
        a: "Pour une douleur diffuse liée à un manque de mobilité ou d'activation, 2 à 4 semaines avec ce protocole quotidien suffisent généralement. Pour une tendinite installée, compte 6 à 8 semaines avec adaptation des charges. Au-delà, consulte.",
      },
    ],
  },
};

export const PROTECTION_SLUGS = Object.keys(PROTECTION_PAGES);
