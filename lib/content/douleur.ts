import type { SEOExercise, SEOFaq, SEOSection } from "@/components/SEOPage";

/**
 * Cluster « douleur » : pages symptôme × exercice.
 *
 * Différence stratégique avec /echauffement/protection/{zone} :
 *  - protection cible « échauffement + zone » → requête solution, faible volume,
 *    l'utilisateur sait déjà qu'il lui faut un échauffement.
 *  - douleur cible « mal à X quand je fais Y » → requête symptôme, volume réel,
 *    l'utilisateur cherche une explication et ne connaît pas encore la solution.
 *
 * Conséquence sur la structure : la section `causes` (diagnostic) passe AVANT le
 * protocole. Répondre d'abord à l'intention (« pourquoi j'ai mal »), proposer
 * l'échauffement ensuite. Une page qui attaque directement par le protocole ne
 * satisfait pas la requête et se fait sortir des SERP.
 *
 * Chaque page porte un bloc « signaux d'alerte » : ces requêtes touchent à la
 * blessure, on oriente vers un professionnel de santé au lieu de retenir
 * l'utilisateur à tout prix.
 */

export interface DouleurContent {
  slug: string;
  /** Zone douloureuse, pour les liens croisés et les fils d'Ariane */
  zoneLabel: string;
  /** Exercice déclencheur, utilisé dans le fil d'Ariane */
  exerciseLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  /** Réponse autoportante de 40-60 mots, citable hors contexte (voir SEOPage) */
  keyAnswer: string;
  intro: string[];
  /** Diagnostic : rendu avant le protocole */
  causes: SEOSection;
  exercises: SEOExercise[];
  advice: { title: string; paragraphs: string[] };
  faqs: SEOFaq[];
  /** Query string de deep-link vers /result */
  planParams: string;
  /** Page protection correspondante, pour le maillage interne */
  relatedProtection: string;
}

export const DOULEUR_PAGES: Record<string, DouleurContent> = {
  "epaule-developpe-couche": {
    slug: "epaule-developpe-couche",
    zoneLabel: "épaule",
    exerciseLabel: "développé couché",
    metaTitle: "Douleur à l'épaule au développé couché : causes et solutions",
    metaDescription:
      "Pourquoi ton épaule fait mal au développé couché : les 4 causes réelles, comment corriger ta technique et le protocole d'échauffement en 6 mouvements. Gratuit.",
    h1: "Douleur à l'épaule au développé couché",
    subtitle: "Diagnostic · Correction technique · Protocole d'échauffement",
    keyAnswer:
      "Une douleur à l'épaule au développé couché vient le plus souvent d'un <strong class='text-white'>conflit sous-acromial</strong> : la tête de l'humérus remonte et pince les tendons de la coiffe des rotateurs. Les trois causes principales sont des omoplates non verrouillées pendant la poussée, des coudes ouverts à 90° du tronc au lieu de 45-60°, et un volume de tirages inférieur au volume de poussées.",
    intro: [
      "C'est la douleur la plus rapportée en salle de musculation. Elle se situe presque toujours sur le <strong class='text-white'>devant de l'épaule</strong>, apparaît en position basse et augmente au fil des séries. Certains la décrivent comme un pincement bref, d'autres comme une brûlure profonde qui persiste plusieurs heures après la séance.",
      "Le point important : ce n'est pas une fatalité anatomique, et ce n'est pas le prix à payer pour développer lourd. Le pincement résulte d'un déséquilibre installé — des pectoraux devenus forts, des stabilisateurs scapulaires jamais travaillés — que trois ou quatre séances suffisent souvent à commencer à inverser.",
      "Voici d'où vient exactement la douleur, ce qu'il faut corriger dans ton exécution, et le protocole qui restabilise l'articulation avant la barre. À lire avant ta prochaine séance pecs.",
    ],
    causes: {
      title: "D'où vient la douleur, concrètement",
      paragraphs: [
        "<strong class='text-white'>1. L'omoplate ne reste pas verrouillée.</strong> Un développé couché sain se fait sur des omoplates rétractées et abaissées, qui créent une plateforme stable. Si tu pousses avec les omoplates libres, l'épaule s'enroule vers l'avant à chaque répétition et l'espace sous-acromial se referme. C'est la cause n°1, et elle est purement technique.",
        "<strong class='text-white'>2. Les coudes trop écartés.</strong> Coudes à 90° du tronc, la tête humérale subit un stress maximal en rotation externe forcée. L'angle sain se situe autour de <strong class='text-white'>45 à 60°</strong> par rapport au buste. Cette seule correction supprime la douleur chez beaucoup de pratiquants.",
        "<strong class='text-white'>3. Un déséquilibre poussée / tirage.</strong> Si ton volume de développés dépasse largement ton volume de tirages horizontaux, les rotateurs internes et le petit pectoral se raccourcissent et tirent l'épaule en antépulsion. La règle de sécurité : au moins autant de séries de tirage que de poussée sur la semaine.",
        "<strong class='text-white'>4. Une coiffe des rotateurs jamais activée.</strong> La coiffe est un groupe de petits muscles profonds qui centrent la tête humérale. Ils ne s'allument pas tout seuls sous une barre lourde : sans activation préalable, le deltoïde antérieur domine et l'humérus remonte. C'est ce que corrige le protocole ci-dessous.",
        "<strong class='text-white'>Signaux qui imposent une consultation :</strong> douleur nocturne qui te réveille, perte de force brutale, impossibilité de lever le bras sur le côté, sensation de blocage ou de ressaut net, douleur qui persiste plus de trois semaines malgré l'adaptation. Une rupture de coiffe ou une lésion du bourrelet ne se règle pas par l'échauffement — vois un kinésithérapeute ou un médecin du sport.",
      ],
    },
    exercises: [
      {
        name: "Mobilisation thoracique en quadrupédie",
        description:
          "À quatre pattes, main derrière la nuque. Amène le coude vers le coude opposé, puis ouvre vers le plafond en suivant du regard. Un thoracique rigide reporte tout le stress sur l'épaule : c'est le premier verrou à lever.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Wall slides",
        description:
          "Dos au mur, bras en W, avant-bras en contact. Glisse les bras vers le haut sans décoller les coudes ni les poignets. Réduis l'amplitude si le contact se perd. Réapprend à l'omoplate à sonner correctement en élévation.",
        durationSeconds: 60,
        reps: "10 répétitions",
      },
      {
        name: "Rotations externes coude au corps",
        description:
          "Coude collé au flanc, avant-bras à 90°, élastique léger. La main s'éloigne du nombril, lentement, sans compenser avec le buste. Cible directement l'infra-épineux, le principal frein à la remontée de la tête humérale.",
        durationSeconds: 60,
        reps: "15 par bras",
      },
      {
        name: "Pompes scapulaires",
        description:
          "En position de pompe, bras tendus verrouillés. Sans plier les coudes, laisse le buste descendre entre les omoplates puis pousse pour les écarter au maximum. Réveille le grand dentelé, le muscle qui plaque l'omoplate sur la cage.",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
      {
        name: "Face pull à l'élastique",
        description:
          "Élastique à hauteur de visage, tire vers le front en écartant les mains, coudes hauts. Termine en rotation externe. Le meilleur exercice correctif du déséquilibre poussée/tirage — à garder aussi en fin de séance.",
        durationSeconds: 60,
        reps: "15 répétitions",
      },
      {
        name: "Développé à vide, omoplates verrouillées",
        description:
          "Allongé sur le banc, barre à vide. Rétracte et abaisse les omoplates, garde-les serrées pendant toute la série, coudes à 45-60°. 10 répétitions lentes pour programmer le pattern avant de charger.",
        durationSeconds: 45,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Les 3 corrections techniques qui changent tout",
      paragraphs: [
        "<strong class='text-white'>Verrouille avant de décharger la barre.</strong> Rétracte les omoplates, abaisse-les vers les fesses, ancre-les dans le banc — puis seulement sors la barre du rack. Beaucoup de pratiquants se mettent en place correctement, puis perdent tout le placement au moment du décrochage. Fais-toi aider pour le premier mouvement sur les séries lourdes.",
        "<strong class='text-white'>Passe temporairement aux haltères en prise neutre.</strong> Contrairement à la barre qui impose une trajectoire fixe et une prise en pronation, les haltères laissent l'épaule choisir son angle. Le développé haltères prise marteau est souvent indolore là où la barre fait mal. Ce n'est pas une régression : c'est une variante qui te permet de continuer à progresser pendant que tu corriges.",
        "<strong class='text-white'>Réduis l'amplitude avant de réduire la charge.</strong> Si la douleur n'apparaît qu'en position basse, arrête la descente 3 à 5 cm au-dessus de ta poitrine (un tapis roulé ou une planche sur le torse sert de repère physique). Tu gardes l'essentiel du stimulus en supprimant l'angle qui pince. Reviens progressivement à l'amplitude complète quand la gêne a disparu.",
      ],
    },
    faqs: [
      {
        q: "Dois-je arrêter complètement le développé couché ?",
        a: "Rarement. Si la douleur est diffuse et n'augmente pas au fil des séries, tu peux continuer en corrigeant l'angle des coudes, en verrouillant les omoplates et en réduisant l'amplitude. Si elle est vive, augmente pendant l'effort ou persiste après la séance, mets le mouvement de côté 2 à 3 semaines et remplace-le par du développé haltères prise neutre ou des pompes, le temps que l'inflammation retombe.",
      },
      {
        q: "Pourquoi j'ai mal seulement en bas du mouvement ?",
        a: "Parce que c'est la position où l'épaule est en extension et rotation externe maximales, donc là où l'espace sous-acromial est le plus réduit. Si la douleur est strictement localisée en bas, c'est un très bon indicateur d'un problème mécanique — angle de coudes, omoplates non verrouillées, amplitude excessive pour ta mobilité actuelle — et pas d'une lésion structurelle.",
      },
      {
        q: "L'échauffement suffit-il à faire disparaître la douleur ?",
        a: "L'échauffement seul ne corrige pas une cause technique ou un déséquilibre de volume. Il crée les conditions pour que la séance se passe bien — coiffe activée, thoracique mobile, omoplate contrôlée — mais si tu retournes ensuite à des coudes à 90° avec deux fois plus de poussée que de tirage, la douleur reviendra. Le protocole et les corrections techniques vont ensemble.",
      },
      {
        q: "Combien de temps avant de retrouver un développé indolore ?",
        a: "Pour une gêne mécanique liée à la technique et au manque d'activation, la plupart des pratiquants constatent une nette amélioration en 2 à 4 semaines avec ce protocole avant chaque séance et les corrections d'exécution. Au-delà de 6 semaines sans progrès, ou si la douleur s'aggrave, c'est le moment de consulter : une tendinopathie installée demande un protocole de renforcement progressif encadré.",
      },
    ],
    planParams: "muscles=pecs,epaules&objectif=reprise&zones=epaule",
    relatedProtection: "epaule-douleur",
  },

  "genou-squat": {
    slug: "genou-squat",
    zoneLabel: "genou",
    exerciseLabel: "squat",
    metaTitle: "Douleur au genou pendant le squat : causes et correction",
    metaDescription:
      "Mal aux genoux au squat ? Les vraies causes (cheville, hanche, valgus) rarement le genou lui-même. Diagnostic, correction technique et échauffement en 6 mouvements.",
    h1: "Douleur au genou pendant le squat",
    subtitle: "Diagnostic · Cheville & hanche · Protocole d'échauffement",
    keyAnswer:
      "Une douleur au genou pendant le squat vient rarement du genou lui-même : le genou est une charnière coincée entre la hanche et la cheville, et il subit ce que ces deux articulations n'absorbent pas. Les causes dominantes sont un <strong class='text-white'>manque de dorsiflexion de cheville</strong>, un valgus dynamique lié à un moyen fessier faible, et une progression de charge plus rapide que l'adaptation du tendon rotulien.",
    intro: [
      "C'est une douleur qui s'installe rarement d'un coup. Elle commence par une gêne en fin de séance, puis apparaît plus tôt, puis finit par se rappeler à toi dans les escaliers. Beaucoup de pratiquants réagissent en renforçant le genou ou en mettant une genouillère — et se demandent pourquoi rien ne change.",
      "La localisation, elle, te renseigne beaucoup. Une douleur <strong class='text-white'>en avant, autour ou sous la rotule</strong>, qui apparaît en descente et augmente avec le volume, oriente vers un syndrome fémoro-patellaire : la rotule ne coulisse pas dans son axe. Une douleur <strong class='text-white'>juste sous la rotule, sur le tendon</strong>, plutôt en fin de série et le lendemain matin, évoque une tendinopathie rotulienne.",
      "Ces deux situations se traitent différemment, mais elles partagent le même point de départ : rendre à la cheville et à la hanche l'amplitude et le contrôle qu'elles ont perdus. Voici comment identifier laquelle te concerne, et quoi faire.",
    ],
    causes: {
      title: "Les 4 causes réelles, dans l'ordre de fréquence",
      paragraphs: [
        "<strong class='text-white'>1. Une cheville qui manque de dorsiflexion.</strong> Pour descendre en squat, le tibia doit s'incliner vers l'avant. Si ta cheville bloque, le corps trouve une autre solution : les talons décollent, le buste plonge, ou le genou part vers l'intérieur. Test simple : à genou fléchi face à un mur, pied à 10 cm, essaie de toucher le mur avec le genou sans décoller le talon. Si tu n'y arrives pas, ta cheville est le problème.",
        "<strong class='text-white'>2. Le valgus dynamique.</strong> C'est le genou qui rentre vers l'intérieur en sortie de squat. Il vient d'un moyen fessier trop faible pour maintenir le fémur en rotation externe sous charge. Chaque répétition en valgus cisaille l'articulation fémoro-patellaire. Filme-toi de face sur une série : tu le verras immédiatement.",
        "<strong class='text-white'>3. Une progression trop rapide.</strong> Le tendon rotulien s'adapte plus lentement que le muscle. Si tu as gagné 20 kg au squat en deux mois, ton quadriceps a suivi mais pas ton tendon. C'est la cause classique de la tendinopathie rotulienne — et la seule solution est de réduire temporairement la charge, pas de « pousser à travers ».",
        "<strong class='text-white'>4. Le mythe du genou derrière les orteils.</strong> Vouloir empêcher le genou d'avancer force un buste très penché et reporte la contrainte sur les lombaires, sans protéger le genou. Ce qui compte réellement, c'est que le <strong class='text-white'>genou suive l'axe du pied</strong>. Qu'il dépasse les orteils est normal et sain pour la plupart des morphologies.",
        "<strong class='text-white'>Signaux qui imposent une consultation :</strong> gonflement, genou qui se dérobe, blocage en pleine amplitude, craquement douloureux suivi d'un épanchement, douleur au repos ou la nuit. Ce sont des signes possibles de lésion méniscale ou ligamentaire, hors du champ de l'échauffement.",
      ],
    },
    exercises: [
      {
        name: "Mobilisation de cheville au mur",
        description:
          "Pied à 10-12 cm d'un mur, pousse le genou vers le mur en gardant le talon collé au sol. Le genou suit l'axe du 2e orteil. C'est le test et le remède : gagner 2 cm ici change la profondeur et le confort de tout ton squat.",
        durationSeconds: 60,
        reps: "12 par côté",
      },
      {
        name: "90/90 hip switches",
        description:
          "Assis au sol, jambes en équerre. Bascule d'un côté à l'autre, tronc droit, sans t'aider des mains si possible. Restaure la rotation interne de hanche, sans laquelle le fémur ne peut pas se placer correctement en bas de squat.",
        durationSeconds: 90,
        reps: "10 cycles",
      },
      {
        name: "Abduction en side-lying (moyen fessier)",
        description:
          "Allongé sur le côté, jambe du dessus tendue, lève-la vers le plafond légèrement en arrière du plan du corps. Mouvement lent, sans basculer le bassin. C'est l'antidote direct au valgus dynamique.",
        durationSeconds: 60,
        reps: "15 par côté",
      },
      {
        name: "Pont fessier deux jambes",
        description:
          "Allongé, pieds à plat, pousse dans les talons et serre les fessiers en haut sans cambrer. Sort le squat du mode tout-quadriceps en réveillant la chaîne postérieure, ce qui décharge mécaniquement la rotule.",
        durationSeconds: 45,
        reps: "15 répétitions",
      },
      {
        name: "Extension terminale du genou",
        description:
          "Élastique derrière le genou légèrement fléchi, tends la jambe à fond en contractant fort le quadriceps interne juste au-dessus de la rotule. Cible le vaste médial, stabilisateur clé du suivi rotulien.",
        durationSeconds: 60,
        reps: "15 par jambe",
      },
      {
        name: "Air squats à amplitude croissante",
        description:
          "Squat au poids du corps : 3 reps à un tiers d'amplitude, 3 à mi-course, 3 en amplitude complète. Genoux dans l'axe des pieds sur chaque répétition. Programme le pattern et teste l'amplitude indolore du jour.",
        durationSeconds: 60,
        reps: "9 répétitions",
      },
    ],
    advice: {
      title: "Adapter le squat sans arrêter de progresser",
      paragraphs: [
        "<strong class='text-white'>Écarte un peu plus les pieds et ouvre les pointes.</strong> Un stance légèrement plus large, pointes ouvertes à 20-30°, donne de la place à la hanche et réduit la demande en dorsiflexion de cheville. Beaucoup de douleurs disparaissent avec ce seul ajustement, parce que le corps cesse de compenser.",
        "<strong class='text-white'>Utilise des chaussures à talon surélevé.</strong> Des chaussures d'haltérophilie — ou à défaut de petites cales sous les talons — compensent artificiellement un déficit de cheville et te permettent de squatter droit et profond pendant que tu travailles la mobilité en parallèle. C'est un outil, pas une triche.",
        "<strong class='text-white'>Si le tendon rotulien est en cause, ne cherche pas le repos complet.</strong> Un tendon douloureux se soigne par la charge, mais une charge contrôlée. Réduis à 50-60 % de ta charge habituelle, travaille en descente lente (3 secondes) sur des amplitudes indolores, et remonte de 5 à 10 % par semaine. Le repos total affaiblit le tendon et fait rechuter dès la reprise.",
      ],
    },
    faqs: [
      {
        q: "Le squat profond abîme-t-il les genoux ?",
        a: "Non. C'est un des mythes les plus tenaces de la musculation. Les travaux de synthèse sur le sujet, notamment Hartmann et coll. (2013), montrent qu'un squat profond exécuté correctement ne dégrade pas l'articulation et sollicite mieux les muscles qu'un demi-squat. Ce qui blesse, c'est l'amplitude que ta mobilité ne permet pas encore, ou une charge qui progresse plus vite que tes tissus.",
      },
      {
        q: "Faut-il porter des genouillères ?",
        a: "Pour l'entraînement courant, non. Les manchons en néoprène réchauffent et rassurent mais ne corrigent aucun défaut mécanique. Les genouillères élastiques de force athlétique apportent un vrai rebond mécanique au-delà de 85 % du maximum, ce qui est légitime en powerlifting. Le risque est d'en faire une béquille qui masque un problème technique au lieu de le résoudre.",
      },
      {
        q: "Puis-je continuer à squatter avec une douleur légère ?",
        a: "Le repère utilisé en rééducation est celui de la douleur tolérable : jusqu'à 3 sur 10, qui n'augmente pas au fil des séries et qui a disparu le lendemain matin, tu peux continuer en adaptant amplitude et charge. Si elle dépasse ce seuil, monte pendant la séance, ou persiste plus de 24 heures, c'est un signal d'arrêt qui demande de réduire nettement la charge.",
      },
      {
        q: "Quels exercices remplacer le squat en attendant ?",
        a: "La presse à cuisses à amplitude réduite, le hip thrust et le soulevé de terre roumain sollicitent fortement les jambes en chargeant beaucoup moins l'articulation fémoro-patellaire. Le split squat bulgare est souvent bien toléré aussi, car la charge est plus légère et le travail unilatéral corrige les déséquilibres qui causaient la douleur.",
      },
    ],
    planParams: "muscles=jambes,fessiers&objectif=reprise&zones=genou",
    relatedProtection: "genou",
  },

  "bas-du-dos-souleve-de-terre": {
    slug: "bas-du-dos-souleve-de-terre",
    zoneLabel: "bas du dos",
    exerciseLabel: "soulevé de terre",
    metaTitle: "Mal au bas du dos après un soulevé de terre : que faire",
    metaDescription:
      "Douleur lombaire au soulevé de terre : distinguer la courbature normale du signal d'alerte, corriger la charnière de hanche, et le protocole d'échauffement complet.",
    h1: "Mal au bas du dos au soulevé de terre",
    subtitle: "Diagnostic · Charnière de hanche · Protocole d'échauffement",
    keyAnswer:
      "Une sensation de travail dans les lombaires après un soulevé de terre est normale : les érecteurs du rachis travaillent en isométrie et peuvent être courbaturés. Une <strong class='text-white'>douleur vive et localisée pendant le mouvement</strong> ne l'est pas. Elle signale presque toujours une charnière de hanche que le corps ne produit pas, et que la colonne lombaire produit à sa place en fléchissant sous charge.",
    intro: [
      "Le soulevé de terre a une réputation particulière : c'est l'exercice que tout le monde soupçonne dès qu'un dos fait mal. Cette réputation est largement imméritée, mais elle a un effet pervers — elle pousse à arrêter au premier signal, alors que la bonne réaction dépend entièrement de ce que tu ressens exactement.",
      "Les repères concrets pour trancher : une gêne diffuse et symétrique, apparue 12 à 48 heures après la séance, qui s'améliore quand tu bouges, est une courbature. Une douleur apparue <strong class='text-white'>pendant</strong> le mouvement, d'un seul côté, avec une sensation nette au moment où elle survient, ne l'est pas. Et toute douleur qui descend dans la fesse ou la jambe sort complètement de la catégorie courbature.",
      "La suite t'explique pourquoi la colonne finit par faire le travail de la hanche, comment corriger l'exécution, et à quel rythme recharger sans récidiver.",
    ],
    causes: {
      title: "Pourquoi le bas du dos prend le travail de la hanche",
      paragraphs: [
        "<strong class='text-white'>1. La charnière de hanche n'est pas acquise.</strong> Un soulevé de terre est un mouvement de hanche : les fessiers reculent, le buste s'incline, la colonne reste neutre et rigide. Si tu ne dissocies pas hanche et colonne, tu « plies le dos » au lieu de « reculer les fesses ». Chaque répétition met alors le disque intervertébral en flexion sous charge — exactement ce qu'il tolère le moins.",
        "<strong class='text-white'>2. La barre est trop loin du corps.</strong> Chaque centimètre entre la barre et tes tibias augmente le bras de levier sur tes lombaires. Une barre qui s'éloigne en cours de tirage transforme un soulevé de terre en good morning chargé. La barre doit frôler les jambes du début à la fin.",
        "<strong class='text-white'>3. Le gainage n'est pas verrouillé avant le tirage.</strong> Le tronc doit être mis sous pression <em>avant</em> que la barre bouge : grande inspiration bloquée, abdominaux contractés comme si tu allais encaisser un coup. Sans cette pression intra-abdominale, la colonne n'a pas de soutien interne et cède progressivement pendant la montée.",
        "<strong class='text-white'>4. Des fléchisseurs de hanche raccourcis.</strong> Les heures assises raccourcissent le psoas, qui s'insère directement sur les vertèbres lombaires. Sous charge, il tire la colonne en hyperlordose, ce qui crée la fameuse sensation de « pincement » en fin de mouvement quand tu verrouilles trop fort en arrière.",
        "<strong class='text-white'>Signaux qui imposent une consultation :</strong> douleur qui descend dans la fesse ou la jambe, fourmillements, engourdissement, perte de force dans le pied, ou douleur qui te bloque complètement plus de 72 heures. Une irradiation sciatique n'est pas un sujet d'échauffement — consulte rapidement.",
      ],
    },
    exercises: [
      {
        name: "Cat-cow",
        description:
          "À quatre pattes, alterne dos creux et dos rond en amplitude complète, lentement. Réveille la mobilité segmentaire de la colonne et te reconnecte à la position neutre — celle que tu devras tenir sous la barre.",
        durationSeconds: 60,
        reps: "10 cycles",
      },
      {
        name: "Charnière de hanche au bâton",
        description:
          "Un bâton ou une barre à vide dans le dos, en contact sur trois points : sacrum, omoplates, arrière du crâne. Recule les fessiers en gardant les trois contacts. Si un contact se perd, tu plies le dos. Le meilleur outil d'apprentissage du hip hinge.",
        durationSeconds: 60,
        reps: "12 répétitions",
      },
      {
        name: "Dead bug",
        description:
          "Sur le dos, bras et jambes en l'air, bas du dos plaqué au sol. Tends bras et jambe opposés sans laisser le dos se creuser. Entraîne le gainage anti-extension, exactement la fonction que doit tenir ton tronc sous la barre.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Bird-dog",
        description:
          "À quatre pattes, tends bras et jambe opposés en gardant le bassin parfaitement immobile. Imagine un verre d'eau posé sur ton bas du dos. Coordination contralatérale et stabilité lombaire sous mouvement.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Pont fessier monté",
        description:
          "Allongé, pieds à plat, monte le bassin en serrant fort les fessiers. Le mouvement vient de la hanche, pas du bas du dos : si tu sens tes lombaires, tu cambres au lieu de contracter les fessiers.",
        durationSeconds: 45,
        reps: "15 répétitions",
      },
      {
        name: "Soulevé de terre roumain à vide",
        description:
          "Barre à vide ou mains aux cuisses. Charnière pure, dos plat, descente jusqu'à mi-tibia, barre qui frôle les jambes. 10 répétitions lentes pour programmer la trajectoire avant de charger.",
        durationSeconds: 45,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Corriger l'exécution avant de recharger",
      paragraphs: [
        "<strong class='text-white'>Filme-toi de profil.</strong> C'est le diagnostic le plus rapide et le plus fiable. Tu verras immédiatement si ton dos s'arrondit au décollage, si la barre s'éloigne des tibias, ou si tes hanches montent avant la barre — le défaut le plus courant, qui transforme le mouvement en good morning et charge les lombaires au maximum.",
        "<strong class='text-white'>Repars du sumo ou du trap bar.</strong> Ces deux variantes placent le buste plus vertical et réduisent nettement la contrainte de cisaillement sur les lombaires, à charge égale. Le trap bar en particulier est un excellent pont pour continuer à tirer lourd pendant que tu reconstruis ta charnière de hanche en conventionnel.",
        "<strong class='text-white'>Ne remets pas la charge d'avant.</strong> Après un épisode douloureux, reprends à 50 % et remonte de 10 % par séance uniquement si la séance précédente s'est passée sans douleur ni raideur le lendemain. La tentation de retrouver ses charges en deux séances est la cause n°1 de récidive lombaire.",
      ],
    },
    faqs: [
      {
        q: "Courbature lombaire ou blessure : comment faire la différence ?",
        a: "Une courbature est diffuse, symétrique, apparaît 12 à 48 heures après la séance, s'améliore quand tu bouges et disparaît en 2 à 3 jours. Une blessure est plutôt localisée d'un côté, souvent apparue pendant l'effort avec une sensation nette, s'aggrave au mouvement et ne s'estompe pas spontanément. Toute douleur qui irradie dans la jambe sort de la catégorie courbature.",
      },
      {
        q: "Le soulevé de terre est-il mauvais pour le dos ?",
        a: "Non. Bien exécuté et progressivement chargé, c'est au contraire un des meilleurs exercices pour renforcer la chaîne postérieure et rendre le dos plus résistant. Les études sur les lombalgies chroniques montrent que le renforcement en charge est plus efficace que le repos. Ce qui blesse, c'est la technique dégradée sous une charge trop lourde ou trop vite augmentée.",
      },
      {
        q: "Faut-il une ceinture de force pour protéger le dos ?",
        a: "Elle a sa place au-delà de 80-85 % du maximum, où elle augmente la pression intra-abdominale et la stabilité. En dessous, elle prive ton gainage du stimulus dont il a besoin pour se renforcer. Une ceinture ne corrige jamais un dos qui s'arrondit : si ta technique casse, la ceinture ne fait que te permettre de charger plus lourd un mouvement défaillant.",
      },
      {
        q: "Combien de temps de repos après un lumbago ?",
        a: "Le repos strict au lit est aujourd'hui déconseillé : il retarde la récupération. On privilégie 48 à 72 heures de repos relatif — marche, mobilisations douces, cat-cow — puis une reprise progressive sans charge avec ce protocole. Retour aux barres à 50 % environ une semaine après la disparition de la douleur. Si ça dure plus de 5 jours ou récidive, consulte un kinésithérapeute.",
      },
    ],
    planParams: "muscles=dos,core&objectif=reprise&zones=bas-du-dos",
    relatedProtection: "lombaires",
  },

  "poignet-pompes": {
    slug: "poignet-pompes",
    zoneLabel: "poignets",
    exerciseLabel: "pompes",
    metaTitle: "Mal aux poignets pendant les pompes : causes et solutions",
    metaDescription:
      "Douleur au poignet en pompe : pourquoi l'extension à 90° fait mal, les alternatives immédiates (poignées, poings) et le protocole de mobilité en 6 mouvements.",
    h1: "Mal aux poignets pendant les pompes",
    subtitle: "Diagnostic · Alternatives immédiates · Mobilité du poignet",
    keyAnswer:
      "En position de pompe, le poignet est en extension proche de 90° tout en supportant environ deux tiers du poids du corps. La douleur vient dans la majorité des cas d'un simple <strong class='text-white'>déficit de mobilité en extension</strong>, pas d'une tendinite. La solution immédiate est de passer en prise neutre — poignées de pompes, haltères ou poings — ce qui supprime l'extension et la douleur.",
    intro: [
      "Peu de gens ont naturellement l'amplitude de poignet qu'exige une pompe au sol — et passer ses journées les mains sur un clavier, poignets figés en position neutre, n'arrange rien. C'est pour ça que cette douleur touche autant de débutants en calisthénie et de gens qui se lancent dans un défi type « 100 pompes par jour ».",
      "Ce qu'il faut retenir avant tout : ce n'est presque jamais grave. Ni tendinite, ni canal carpien dans l'immense majorité des cas — un déficit d'amplitude, associé à des avant-bras jamais préparés à travailler en charge dans cette position. Ça se corrige en quelques semaines, et tu n'as pas besoin d'arrêter de t'entraîner pendant ce temps.",
      "Voici le mécanisme précis, les trois alternatives qui suppriment la douleur dès aujourd'hui, et le protocole qui règle le fond pour revenir aux pompes à plat.",
    ],
    causes: {
      title: "Pourquoi ça fait mal, et où exactement",
      paragraphs: [
        "<strong class='text-white'>1. Manque d'extension du poignet.</strong> Test : mains jointes en prière devant la poitrine, descends les mains vers le nombril en gardant les paumes collées. Si tu n'atteins pas 90° entre l'avant-bras et la main, tu manques d'amplitude. En pompe, ton corps va chercher les derniers degrés en compression osseuse — d'où la douleur sur le <strong class='text-white'>dessus du poignet</strong>, côté dos de la main.",
        "<strong class='text-white'>2. Appui mal réparti sur la main.</strong> Beaucoup de gens s'appuient sur le talon de la paume, ce qui concentre toute la charge sur une petite zone du carpe. Un appui sain se répartit sur la base de l'index, la base de l'auriculaire et le talon de la main, avec les <strong class='text-white'>doigts activement plaqués</strong> au sol — comme si tu voulais griffer le tapis.",
        "<strong class='text-white'>3. Avant-bras non préparés.</strong> Les muscles fléchisseurs et extenseurs du poignet stabilisent l'articulation sous charge. S'ils ne sont jamais entraînés, ils fatiguent en quelques séries et laissent la contrainte passer sur les structures passives — ligaments et capsule.",
        "<strong class='text-white'>4. Un volume qui a augmenté trop vite.</strong> Passer de 20 à 100 pompes par séance en deux semaines dépasse la capacité d'adaptation des tissus du poignet, qui sont peu vascularisés et lents à se renforcer. C'est fréquent chez les débutants en calisthénie et lors des défis type « 100 pompes par jour ».",
        "<strong class='text-white'>Signaux qui imposent une consultation :</strong> fourmillements ou engourdissement dans les doigts (surtout pouce, index, majeur), douleur qui réveille la nuit, gonflement visible, perte de force de préhension, ou douleur vive après une chute sur la main — une fracture du scaphoïde passe souvent inaperçue et laisse des séquelles si elle n'est pas traitée.",
      ],
    },
    exercises: [
      {
        name: "Cercles de poignets",
        description:
          "Doigts entrelacés, effectue de grands cercles lents dans un sens puis dans l'autre. Amplitude maximale. Lubrification articulaire de base, indispensable si tu viens de passer des heures au clavier.",
        durationSeconds: 60,
        reps: "30s par sens",
      },
      {
        name: "Étirement des extenseurs",
        description:
          "Bras tendu devant, paume vers le sol, dos de la main vers toi. Tire doucement les doigts vers le corps avec l'autre main. Tension sur le dessus de l'avant-bras, jamais de douleur. Sans à-coups.",
        durationSeconds: 40,
        reps: "20s par bras",
      },
      {
        name: "Étirement des fléchisseurs",
        description:
          "Bras tendu devant, paume vers le ciel. Tire les doigts vers le bas et vers toi. Tension sur le dessous de l'avant-bras. C'est cet étirement qui débloque directement l'extension dont tu manques en pompe.",
        durationSeconds: 40,
        reps: "20s par bras",
      },
      {
        name: "Mise en charge progressive à quatre pattes",
        description:
          "À quatre pattes, paumes au sol, doigts vers l'avant. Transfère lentement ton poids vers les mains puis relâche. Puis recommence doigts orientés vers les genoux. Charge l'amplitude d'extension de façon progressive et contrôlée.",
        durationSeconds: 60,
        reps: "10 par orientation",
      },
      {
        name: "Flexions-extensions de poignet chargées",
        description:
          "Avant-bras posé sur la cuisse, une bouteille d'eau ou un haltère léger en main. 12 flexions paume vers le ciel, puis 12 extensions paume vers le sol. Renforce les stabilisateurs qui te manquent sous charge.",
        durationSeconds: 60,
        reps: "12 par sens",
      },
      {
        name: "Pompes scapulaires en appui doigts actifs",
        description:
          "Position de pompe, doigts écartés et plaqués au sol comme des griffes, poids réparti sur toute la main. Sans plier les coudes, rapproche puis écarte les omoplates. Réveille le grand dentelé tout en pratiquant le bon appui.",
        durationSeconds: 45,
        reps: "12 répétitions",
      },
    ],
    advice: {
      title: "Trois alternatives qui suppriment la douleur immédiatement",
      paragraphs: [
        "<strong class='text-white'>Les poignées de pompes ou deux haltères.</strong> C'est la solution la plus simple et la plus efficace : la prise neutre garde le poignet dans l'axe de l'avant-bras et supprime totalement l'extension. Tu peux continuer à t'entraîner normalement, sans aucune douleur, dès aujourd'hui — et le bonus est une amplitude de descente plus grande sur les pectoraux.",
        "<strong class='text-white'>Les pompes sur les poings.</strong> Poings fermés, appui sur les deux premières phalanges, poignet aligné avec l'avant-bras. Fais-le sur un tapis au début. Même bénéfice que les poignées sans matériel, avec en prime un renforcement de la stabilité du poignet en position neutre.",
        "<strong class='text-white'>Réduis l'angle avant de réduire le volume.</strong> Des pompes mains surélevées sur un banc ou un rebord diminuent à la fois la charge et l'extension exigée du poignet. Tu gardes le mouvement et le volume d'entraînement, tu supprimes l'irritation, et tu redescends progressivement vers le sol au fil des semaines pendant que ta mobilité progresse.",
      ],
    },
    faqs: [
      {
        q: "Dois-je arrêter les pompes complètement ?",
        a: "Presque jamais. Passer aux poignées de pompes, aux haltères ou aux poings supprime la douleur dans l'immense majorité des cas tout en te permettant de continuer à progresser. L'arrêt complet est rarement utile : il fait perdre du niveau sans rien renforcer. Ce n'est justifié qu'en cas de douleur vive persistante, et là c'est une consultation qu'il faut, pas du repos.",
      },
      {
        q: "Les bandes de poignet aident-elles pour les pompes ?",
        a: "Peu, et elles peuvent masquer le problème. Les wrist wraps sont conçus pour limiter l'hyperextension sous charge lourde en développé, pas pour compenser un déficit de mobilité au poids du corps. Sur les pompes, la prise neutre est une bien meilleure réponse : elle règle la cause mécanique au lieu de contraindre l'articulation.",
      },
      {
        q: "En combien de temps je récupère l'amplitude ?",
        a: "Pour un déficit de mobilité simple, la plupart des pratiquants retrouvent une extension confortable en 3 à 6 semaines avec ce protocole pratiqué quotidiennement — c'est un travail qui répond très bien à la fréquence, quelques minutes chaque jour valent mieux qu'une longue séance hebdomadaire. Pendant cette période, entraîne-toi en prise neutre plutôt que d'arrêter.",
      },
      {
        q: "J'ai aussi mal en position de planche, est-ce lié ?",
        a: "Oui, c'est exactement le même mécanisme : extension du poignet sous charge, en statique cette fois. Si la planche fait mal, passe sur les avant-bras — c'est la version la plus courante de l'exercice et elle sollicite très bien le gainage sans impliquer le poignet du tout. Le protocole de mobilité règle les deux situations en parallèle.",
      },
    ],
    planParams: "muscles=pecs,bras&objectif=reprise&zones=poignets",
    relatedProtection: "poignets",
  },

  "epaule-tractions": {
    slug: "epaule-tractions",
    zoneLabel: "épaule",
    exerciseLabel: "tractions",
    metaTitle: "Douleur à l'épaule aux tractions : causes et correction",
    metaDescription:
      "Mal à l'épaule en traction : prise, amplitude, contrôle scapulaire. Le diagnostic complet, les corrections techniques et le protocole d'échauffement adapté.",
    h1: "Douleur à l'épaule pendant les tractions",
    subtitle: "Diagnostic · Prise & amplitude · Protocole d'échauffement",
    keyAnswer:
      "Une douleur à l'épaule en traction apparaît généralement en bas du mouvement, dans la phase de suspension. La cause dominante est la <strong class='text-white'>suspension passive</strong> : bras relâchés et épaules remontées, ce sont la capsule et les ligaments qui supportent le poids du corps. Une traction saine commence par une dépression scapulaire active — abaisser les épaules avant de plier les coudes.",
    intro: [
      "La traction est un excellent exercice, mais c'est aussi celui où l'épaule travaille dans sa position la plus exposée : <strong class='text-white'>bras au-dessus de la tête, en suspension, sous tout le poids du corps</strong>. La moindre faiblesse de contrôle scapulaire s'y exprime immédiatement, alors qu'elle passerait inaperçue sur un tirage à la poulie.",
      "Détail qui trompe beaucoup de monde : la douleur se déclenche souvent au moment où l'on se pend, avant même d'avoir tiré. Ça donne l'impression que l'exercice est en cause alors que c'est la <em>façon de se suspendre</em> qui l'est — et la nuance change complètement ce qu'il faut corriger.",
      "Voici ce qui se passe précisément dans l'articulation, ce qu'il faut changer dans ton exécution, et le protocole qui prépare l'épaule à la suspension.",
    ],
    causes: {
      title: "Ce qui se passe dans l'épaule pendant la traction",
      paragraphs: [
        "<strong class='text-white'>1. La suspension passive.</strong> Si tu te pends bras complètement relâchés, épaules « dans les oreilles », l'articulation est en distraction : la tête humérale s'éloigne de la glène et ce sont les structures passives — capsule, ligaments, tendon du long biceps — qui encaissent tout ton poids. Une traction saine commence par une <strong class='text-white'>dépression scapulaire active</strong> : tu abaisses les épaules avant de plier les coudes.",
        "<strong class='text-white'>2. Une prise trop large.</strong> La prise ultra-large, longtemps vendue comme la meilleure pour « élargir le dos », place l'épaule en abduction et rotation externe extrêmes, la position où l'espace sous-acromial est le plus réduit. Une prise à peine plus large que les épaules est plus sûre et recrute aussi bien les dorsaux.",
        "<strong class='text-white'>3. La traction derrière la nuque.</strong> Il n'y a aucun bénéfice à ce mouvement qui ne soit obtenu par la version devant, et il impose à l'épaule une rotation externe forcée sous charge. C'est le seul exercice de cette page que je te recommande de supprimer purement et simplement.",
        "<strong class='text-white'>4. Trop de tirages verticaux, pas assez d'horizontaux.</strong> Un programme dominé par les tractions et le tirage vertical développe le grand dorsal sans renforcer les rhomboïdes, le trapèze moyen et la coiffe — les muscles qui tiennent l'omoplate. L'équilibre demande autant de rowings horizontaux que de tirages verticaux.",
        "<strong class='text-white'>Signaux qui imposent une consultation :</strong> claquement net suivi d'une douleur immédiate, douleur nocturne, perte de force pour lever le bras, sensation d'instabilité ou d'épaule qui « sort ». La suspension sollicite fortement le bourrelet glénoïdien : une lésion à ce niveau demande un diagnostic médical.",
      ],
    },
    exercises: [
      {
        name: "Mobilisation thoracique en quadrupédie",
        description:
          "À quatre pattes, main derrière la nuque, ouvre le coude vers le plafond en suivant du regard. L'extension thoracique conditionne la place disponible pour le bras au-dessus de la tête : sans elle, l'épaule compense.",
        durationSeconds: 60,
        reps: "8 par côté",
      },
      {
        name: "Suspension active à la barre",
        description:
          "Pendu à la barre, bras tendus. Sans plier les coudes, abaisse activement les épaules pour éloigner tes oreilles de tes mains, tiens 5 secondes, relâche à moitié. C'est l'exercice fondamental du contrôle scapulaire en suspension.",
        durationSeconds: 60,
        reps: "6 répétitions de 5s",
      },
      {
        name: "Rotations externes coude au corps",
        description:
          "Coude au flanc, élastique léger, la main s'éloigne du nombril lentement. Active la coiffe des rotateurs, qui doit centrer la tête humérale pendant toute la phase de suspension.",
        durationSeconds: 60,
        reps: "15 par bras",
      },
      {
        name: "Face pull à l'élastique",
        description:
          "Élastique à hauteur de visage, tire vers le front, coudes hauts, termine en rotation externe. Renforce le trapèze moyen et les rotateurs externes — l'équilibre qui manque dans les programmes chargés en tirages verticaux.",
        durationSeconds: 60,
        reps: "15 répétitions",
      },
      {
        name: "Y-T-W au sol",
        description:
          "Allongé sur le ventre, front au sol. Bras en Y, puis T, puis W, en décollant les bras du sol à chaque position sans hausser les épaules. Renforce le bas trapèze, le grand oublié de la stabilité scapulaire.",
        durationSeconds: 60,
        reps: "5 cycles",
      },
      {
        name: "Tractions scapulaires",
        description:
          "Pendu bras tendus, monte le corps de quelques centimètres uniquement en abaissant les omoplates, sans plier les coudes. C'est la première phase de toute traction propre — celle que la plupart des gens sautent.",
        durationSeconds: 45,
        reps: "10 répétitions",
      },
    ],
    advice: {
      title: "Corriger l'exécution",
      paragraphs: [
        "<strong class='text-white'>Commence chaque répétition par les omoplates.</strong> L'ordre correct est : suspension, dépression scapulaire, puis flexion des coudes. Si tu tires directement avec les bras depuis une suspension passive, tu démarres chaque répétition dans la position articulaire la plus fragile. Ce seul changement supprime la douleur chez beaucoup de pratiquants.",
        "<strong class='text-white'>Passe temporairement en prise neutre ou en supination.</strong> Les tractions à prise marteau — mains face à face sur des poignées parallèles — sont presque toujours indolores là où la prise pronation large fait mal, parce qu'elles laissent l'épaule dans un angle bien plus naturel. Le chin-up en supination est également mieux toléré. Ce n'est pas un exercice au rabais.",
        "<strong class='text-white'>Utilise un élastique d'assistance plutôt que de réduire le volume.</strong> Un élastique sous les pieds réduit la charge en bas du mouvement, précisément là où la douleur apparaît, tout en te laissant travailler l'amplitude complète et le contrôle scapulaire. C'est bien plus utile qu'arrêter les tractions pendant un mois.",
      ],
    },
    faqs: [
      {
        q: "La suspension à la barre est-elle bonne ou mauvaise pour l'épaule ?",
        a: "Les deux, selon comment tu la fais. La suspension passive, épaules relâchées, met les structures passives en tension et peut irriter une épaule déjà sensible. La suspension active, avec dépression scapulaire maintenue, est au contraire un excellent exercice de décompression et de renforcement. La différence tient entièrement au contrôle de l'omoplate.",
      },
      {
        q: "Prise large ou prise serrée pour protéger l'épaule ?",
        a: "Une prise légèrement plus large que la largeur des épaules est le meilleur compromis. La prise très large n'apporte pas le supplément de recrutement du grand dorsal qu'on lui prête, et elle place l'articulation dans un angle contraignant. Si l'épaule est sensible, la prise neutre sur poignées parallèles est encore plus confortable.",
      },
      {
        q: "Puis-je remplacer les tractions par du tirage vertical à la poulie ?",
        a: "Oui, c'est une bonne solution temporaire. La poulie te permet de doser précisément la charge et de travailler l'amplitude sans supporter tout ton poids de corps en bas du mouvement. Complète avec des rowings horizontaux, qui renforcent les stabilisateurs scapulaires manquants, et reviens progressivement aux tractions avec assistance élastique.",
      },
      {
        q: "Faut-il faire les tractions en amplitude complète malgré la douleur ?",
        a: "Non. L'amplitude complète est un objectif, pas une obligation à chaque séance. Si les derniers centimètres en bas déclenchent la douleur, arrête-toi juste avant, coudes légèrement fléchis, et travaille en parallèle la suspension active pour reconquérir cette amplitude progressivement. Forcer une amplitude douloureuse entretient l'irritation au lieu de la résoudre.",
      },
    ],
    planParams: "muscles=dos,epaules&objectif=reprise&zones=epaule",
    relatedProtection: "epaule-douleur",
  },

  "coude-curl-biceps": {
    slug: "coude-curl-biceps",
    zoneLabel: "coude",
    exerciseLabel: "curl biceps",
    metaTitle: "Douleur au coude au curl biceps : tendinite et solutions",
    metaDescription:
      "Mal au coude pendant les curls : distinguer tendinite du biceps et épicondylite, corriger la prise et la charge, et le protocole de préparation en 6 mouvements.",
    h1: "Douleur au coude au curl biceps",
    subtitle: "Diagnostic · Tendinopathie · Protocole d'échauffement",
    keyAnswer:
      "La localisation distingue les deux causes. Une douleur <strong class='text-white'>au pli du coude</strong> évoque une tendinopathie distale du biceps, liée à une charge trop vite augmentée ou à la barre droite qui impose une supination complète. Une douleur sur la <strong class='text-white'>face externe du coude</strong> est une épicondylite, causée moins par les curls que par le volume de préhension des tractions et rowings.",
    intro: [
      "Le coude est une articulation peu mobile mais très sollicitée, et ses tendons sont mal vascularisés : ils s'adaptent lentement et récupèrent lentement. D'où le scénario typique — une gêne discrète pendant quelques semaines, qu'on ignore parce qu'elle ne gêne pas vraiment, puis un jour une douleur en ouvrant une bouteille ou en portant un sac.",
      "C'est aussi ce qui rend cette blessure frustrante : au moment où elle devient évidente, elle est déjà installée depuis longtemps, et il faudra plusieurs semaines pour en sortir. Prise tôt, elle se règle avec un changement de barre et un ajustement de volume.",
      "Voici comment identifier laquelle des deux tendinopathies te concerne, ce qu'il faut changer dans ta prise et ta programmation, et le protocole de préparation adapté à une articulation aussi lente à chauffer.",
    ],
    causes: {
      title: "Tendinite du biceps ou épicondylite : identifier laquelle",
      paragraphs: [
        "<strong class='text-white'>La tendinopathie distale du biceps</strong> se manifeste au pli du coude, s'aggrave en fin d'extension et sur les curls lourds en supination. Elle vient presque toujours d'une progression de charge trop rapide, ou d'un travail exclusif à la barre droite qui impose une supination complète non négociable à des avant-bras qui ne l'acceptent pas.",
        "<strong class='text-white'>L'épicondylite latérale</strong> se situe sur la petite proéminence osseuse à l'extérieur du coude. Elle se réveille quand tu serres fort, quand tu portes un objet paume vers le bas, ou en tirage. Contre-intuitivement, ce ne sont pas les curls qui la causent le plus souvent, mais le <strong class='text-white'>volume de préhension</strong> : tractions, rowings, soulevés de terre, port de charges lourdes sans sangles.",
        "<strong class='text-white'>La barre droite est le déclencheur le plus fréquent.</strong> Elle verrouille les avant-bras en supination complète. Si ta morphologie ne permet pas cette amplitude sans contrainte — c'est très courant —, chaque répétition tire sur les insertions tendineuses. La barre EZ, avec ses angles, résout ce problème chez la plupart des gens.",
        "<strong class='text-white'>Le volume caché.</strong> Le biceps travaille dans tous tes tirages : tractions, rowings, tirage horizontal. Si tu ajoutes à ça deux séances de bras par semaine, ton coude encaisse bien plus de volume que ce que dit ton programme. C'est souvent là qu'est la vraie surcharge.",
        "<strong class='text-white'>Signaux qui imposent une consultation :</strong> douleur apparue brutalement avec un claquement audible, hématome ou déformation visible du bras, perte de force marquée en flexion ou en supination. Une rupture du tendon distal du biceps est une urgence chirurgicale relative — elle se répare mal si on attend.",
      ],
    },
    exercises: [
      {
        name: "Flexions-extensions de coude à vide",
        description:
          "Bras le long du corps, effectue des flexions-extensions complètes sans charge, lentement, en alternant prise supination et prise marteau. Fait circuler le liquide et réchauffe un tendon qui met plus longtemps que le muscle à monter en température.",
        durationSeconds: 45,
        reps: "15 répétitions",
      },
      {
        name: "Rotations d'avant-bras (pronation-supination)",
        description:
          "Coude collé au flanc à 90°, tourne lentement la paume vers le ciel puis vers le sol, amplitude maximale. Une bouteille tenue par le goulot ajoute une résistance progressive utile. Prépare spécifiquement la supination exigée par le curl.",
        durationSeconds: 60,
        reps: "15 par bras",
      },
      {
        name: "Cercles et mobilisation de poignet",
        description:
          "Cercles lents dans les deux sens, doigts entrelacés. Les muscles qui s'insèrent sur l'épicondyle passent par le poignet : le mobiliser prépare directement la zone douloureuse en cas d'épicondylite.",
        durationSeconds: 45,
        reps: "20s par sens",
      },
      {
        name: "Extension de poignet excentrique",
        description:
          "Avant-bras sur la cuisse, paume vers le sol, charge très légère. Monte avec l'aide de l'autre main, puis redescends lentement sur 3 secondes avec la main travaillante seule. Le travail excentrique est le traitement de référence de l'épicondylite.",
        durationSeconds: 60,
        reps: "12 par bras",
      },
      {
        name: "Curl à l'élastique en amplitude complète",
        description:
          "Élastique léger, curl lent en contrôlant surtout la descente. Cherche la tension, pas la fatigue. Précharge le tendon dans son amplitude de travail avant de passer aux charges réelles.",
        durationSeconds: 60,
        reps: "15 répétitions",
      },
      {
        name: "Étirement actif des fléchisseurs de l'avant-bras",
        description:
          "Bras tendu devant, paume vers le ciel, tire doucement les doigts vers le bas. Tension modérée sur le dessous de l'avant-bras, 20 secondes par bras, sans à-coups ni rebond.",
        durationSeconds: 40,
        reps: "20s par bras",
      },
    ],
    advice: {
      title: "Ce qu'il faut changer dans la programmation",
      paragraphs: [
        "<strong class='text-white'>Abandonne la barre droite au profit de la barre EZ ou des haltères.</strong> C'est la correction la plus rentable et souvent la seule nécessaire. Les haltères laissent l'avant-bras choisir sa rotation, la barre EZ propose un compromis. Ajoute des curls en prise marteau, qui sollicitent le brachial et le brachio-radial en déchargeant le tendon distal du biceps.",
        "<strong class='text-white'>Compte ton volume de tirage dans ton volume de bras.</strong> Si tu fais quatre séries de tractions et quatre de rowing le lundi, tes biceps et tes coudes ont déjà travaillé. Une séance bras dédiée le mercredi arrive sur des tendons non récupérés. Espace d'au moins 48 heures le travail de dos et le travail de biceps direct.",
        "<strong class='text-white'>Un tendon douloureux se traite par la charge, pas par le repos.</strong> C'est contre-intuitif mais c'est le consensus actuel en rééducation tendineuse : le repos complet affaiblit le tendon et la douleur revient dès la reprise. Réduis à 50 %, travaille en descente lente sur 3 secondes, dans une amplitude indolore, et remonte de 10 % par semaine. Le travail excentrique est ton meilleur outil.",
      ],
    },
    faqs: [
      {
        q: "Puis-je continuer les curls avec une douleur au coude ?",
        a: "Oui, si elle reste légère et n'augmente pas au fil des séries. Passe aux haltères ou à la barre EZ, réduis la charge de moitié, ralentis la phase de descente et évite l'extension complète en bas si c'est là que ça pince. Si la douleur dépasse 3 sur 10 ou persiste le lendemain, réduis encore. L'arrêt total n'est presque jamais la bonne réponse pour un tendon.",
      },
      {
        q: "Combien de temps dure une tendinite du coude ?",
        a: "Compte 6 à 12 semaines pour une tendinopathie installée, avec un travail excentrique régulier et une charge adaptée. C'est long, et c'est normal : le tendon est peu vascularisé et se remodèle lentement. La principale cause d'échec est de reprendre les charges habituelles dès que la douleur diminue, autour de la troisième semaine, ce qui relance le cycle.",
      },
      {
        q: "Faut-il mettre du froid ou du chaud ?",
        a: "Le chaud avant la séance, pour préparer un tendon qui monte lentement en température. Le froid éventuellement après, s'il y a une gêne marquée, mais son intérêt réel est limité et il pourrait ralentir le processus d'adaptation. Ni l'un ni l'autre ne remplace l'élément qui soigne vraiment : la mise en charge progressive.",
      },
      {
        q: "Une coudière ou un bracelet épicondylien sert-il à quelque chose ?",
        a: "Le bracelet épicondylien, placé quelques centimètres sous le coude, décharge partiellement l'insertion tendineuse et soulage réellement pendant l'effort en cas d'épicondylite. C'est un outil de confort utile pendant la phase de reprise, mais il ne soigne rien par lui-même : le renforcement excentrique reste le traitement de fond.",
      },
    ],
    planParams: "muscles=bras&objectif=reprise&zones=poignets",
    relatedProtection: "poignets",
  },
};

export const DOULEUR_SLUGS = Object.keys(DOULEUR_PAGES);
