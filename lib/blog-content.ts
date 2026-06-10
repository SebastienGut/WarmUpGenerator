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
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pourquoi-s-echauffer-musculation",
    metaTitle: "Pourquoi s'échauffer avant la musculation ? La réponse scientifique",
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
          "À température de repos (~36°C), les filaments d'actine et de myosine glissent avec friction élevée. Les enzymes qui alimentent la contraction musculaire (ATPase) fonctionnent à 20-30 % en dessous de leur optimum. Dans les articulations, le liquide synovial est épais et peu circulant — les surfaces cartilagineuses ne sont pas lubrifiées.",
          "Résultat concret : sur ta première série sans échauffement, tu perds <strong class='text-white'>10 à 15 % de force</strong> par rapport à ton potentiel réel. Tes tendons — moins vascularisés que les muscles, donc plus lents à chauffer — absorbent des contraintes mécaniques pour lesquelles ils ne sont pas prêts. Les micro-traumatismes s'accumulent silencieusement.",
        ],
      },
      {
        heading: "Les 3 bénéfices prouvés de l'échauffement",
        content: [
          "<strong class='text-white'>1. Gain de force disponible.</strong> À 38-39°C, la vélocité de contraction musculaire augmente significativement. Les études mesurent un gain de 4 à 10 % de force sur les séries de travail avec un échauffement bien calibré — sans rien changer au reste du programme.",
          "<strong class='text-white'>2. Protection tendineuse.</strong> Les tendons montent en température plus lentement que les muscles (décalage de 2 à 4 minutes). Un échauffement de 5 minutes réduit ce décalage et diminue fortement le risque de tendinites d'insertion : coiffe des rotateurs, tendon rotulien, tendons épicondyliens.",
          "<strong class='text-white'>3. Activation neuro-musculaire.</strong> L'échauffement spécifique programme le système nerveux sur le pattern de mouvement de la séance. Meilleur recrutement des unités motrices, meilleure coordination inter-musculaire. C'est pourquoi un athlète de force réalise toujours ses séries de chauffe progressives avant d'attaquer le poids de travail.",
        ],
      },
      {
        heading: "Les 3 phases d'un bon échauffement musculation",
        content: [
          "<strong class='text-white'>Phase 1 — Articulaire (2 min) :</strong> mobilisation des articulations impliquées dans la séance. Objectif : répartir le liquide synovial, libérer les amplitudes de mouvement. Exemples : cercles d'épaules, rotations thoraciques, hip circles, cercles de cheville selon les groupes travaillés.",
          "<strong class='text-white'>Phase 2 — Activation musculaire (3 min) :</strong> mouvements ciblés sur les muscles à travailler. Objectif : connexion neuro-musculaire, pré-activation des fibres sans les fatiguer. Les exercices sont spécifiques au groupe musculaire et à l'objectif de la séance.",
          "<strong class='text-white'>Phase 3 — Séries de chauffe</strong> (hors plan du générateur) : sur les exercices polyarticulaires lourds, 2 à 3 séries progressives avec la barre avant le poids de travail. Cette phase est distincte de l'échauffement général ci-dessus.",
        ],
      },
      {
        heading: "L'erreur la plus commune : l'échauffement mal orienté",
        content: [
          "Quinze minutes de tapis roulant suivies d'étirements statiques. Double problème : le cardio prolongé crée une fatigue métabolique sans préparer les structures musculaires et articulaires spécifiques, et les étirements statiques avant l'effort réduisent la force de 5 à 10 % pendant 30 à 60 minutes (inhibition des fuseaux neuromusculaires). Résultat : tu arrives sur ta première série de squat plus fatigué et moins fort que si tu n'avais rien fait.",
          "Un bon échauffement est <strong class='text-white'>spécifique, bref et progressif</strong>. Il cible exactement ce que tu vas travailler, dure 5 à 8 minutes, et augmente progressivement l'intensité sans entamer les réserves.",
        ],
      },
    ],
    faqs: [
      {
        q: "Combien de temps faut-il s'échauffer avant la musculation ?",
        a: "5 à 8 minutes pour la majorité des séances. En dessous de 5 min, la température musculaire n'a pas eu le temps de monter suffisamment. Au-delà de 10 min, tu commences à fatiguer sans bénéfice supplémentaire. Le générateur propose des plans sur 3, 5 ou 8 minutes selon l'intensité de ta séance.",
      },
      {
        q: "Faut-il s'étirer avant la musculation ?",
        a: "Non, pas en statique. Les étirements statiques avant l'effort réduisent la force de 5 à 10 %. Privilégie la mobilité dynamique (mouvements en amplitude croissante) et l'activation musculaire. Les étirements statiques ont leur place en fin de séance ou les jours off.",
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
    metaTitle: "Combien de temps s'échauffer avant la musculation ?",
    metaDescription:
      "3 minutes, 10 minutes, 15 minutes ? La réponse exacte selon ton objectif, tes zones sensibles et la température ambiante.",
    h1: "Combien de temps s'échauffer en musculation ?",
    publishDate: "19 mai 2026",
    readingTime: "3 min",
    intro:
      "5 minutes, 10 minutes, 15 minutes — tout le monde a un avis différent. La réalité, c'est que la durée idéale d'échauffement dépend de 4 variables : l'objectif de la séance, les groupes musculaires travaillés, la présence de zones sensibles, et la température ambiante. Voilà comment calibrer précisément.",
    sections: [
      {
        heading: "La règle de base : 5 à 8 minutes",
        content: [
          "Pour 90 % des séances, c'est la plage optimale. En dessous de 5 minutes, la température musculaire n'a pas eu le temps de monter et les articulations sont encore peu lubrifiées. Au-delà de 10 minutes, tu commences à entamer tes réserves glycolytiques — tu arrives aux séries de travail légèrement fatigué, exactement ce que tu voulais éviter.",
          "C'est l'erreur classique des pratiquants qui passent 20 minutes sur le tapis avant de squatter : ils arrivent à leur première série de travail déjà entamés.",
        ],
      },
      {
        heading: "Ajuster selon l'objectif de la séance",
        content: [
          "<strong class='text-white'>Force (charges maximales, 1 à 5 reps) :</strong> plutôt 8 minutes. Tu vas demander un recrutement maximal des unités motrices dès la première série. L'activation neuro-musculaire doit être complète avant d'attaquer des charges lourdes.",
          "<strong class='text-white'>Hypertrophie (volume, 8 à 15 reps) :</strong> 5 à 6 minutes suffisent. La connexion mind-muscle est plus importante que l'activation pure — tu as besoin de sentir le muscle, pas de recruter un maximum d'unités motrices.",
          "<strong class='text-white'>Mobilité :</strong> l'échauffement s'intègre directement dans la séance. Il n'y a pas de phase séparée.",
          "<strong class='text-white'>Reprise après blessure ou long break :</strong> 8 à 10 minutes, rythme lent, amplitudes réduites au début. Les tissus reviennent en charge progressivement.",
        ],
      },
      {
        heading: "Ajuster selon la température ambiante",
        content: [
          "<strong class='text-white'>Salle chauffée ou été :</strong> retire 1 à 2 minutes — ton corps est déjà à une température proche de l'optimale. L'échauffement sera plus rapide.",
          "<strong class='text-white'>Salle froide ou hiver :</strong> ajoute 2 à 3 minutes minimum. Par temps froid, les muscles descendent à 34-35°C — il faut plus de temps pour atteindre les 38-39°C qui optimisent la contraction musculaire.",
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
        a: "Pour une séance légère ou de mobilité, oui. Pour des charges lourdes (80 %+ du max), non — 5 à 8 minutes sont nécessaires pour que les tendons et les articulations soient prêts. Le générateur propose des plans sur 3, 5 ou 8 minutes selon l'intensité.",
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
      { href: "/echauffement/combo/full-body", label: "Plan full body 5 min" },
      { href: "/echauffement/protection/lombaires", label: "Échauffement lombaires sensibles" },
    ],
  },

  {
    slug: "echauffement-dynamique-ou-statique",
    metaTitle: "Échauffement dynamique ou statique avant la musculation ?",
    metaDescription:
      "Les étirements statiques avant l'effort font perdre 5 à 10 % de force. Ce que dit la science et comment s'échauffer correctement pour performer.",
    h1: "Échauffement dynamique ou statique — que choisir ?",
    publishDate: "19 mai 2026",
    readingTime: "4 min",
    intro:
      "Depuis les années 2000, les études s'accumulent et le message est sans équivoque : les étirements statiques avant un effort de force réduisent les performances. Pourtant, des millions de pratiquants s'étirent encore avant de soulever. Voilà ce que dit la science, et quelle approche adopter.",
    sections: [
      {
        heading: "Le verdict scientifique sur les étirements statiques",
        content: [
          "Une méta-analyse de 2013 portant sur 104 études (Simic et al.) est formelle : les étirements statiques avant un effort de force réduisent la force maximale de <strong class='text-white'>5,5 % en moyenne</strong>, et jusqu'à 8 à 10 % pour les étirements maintenus plus de 60 secondes.",
          "Le mécanisme est connu : l'étirement statique réduit la tonicité des fuseaux neuromusculaires et inhibe l'activité des motoneurones alpha. Résultat concret — si tu t'étires les pectoraux 45 secondes avant ton développé couché, ta première série est objectivement moins forte. Ce n'est pas une théorie : c'est mesurable sur une plateforme de force.",
        ],
      },
      {
        heading: "L'échauffement dynamique : ce que ça signifie concrètement",
        content: [
          "Dynamique ne veut pas dire sauter dans tous les sens. Un échauffement dynamique, c'est des <strong class='text-white'>mouvements contrôlés, en amplitude croissante, qui imitent les patterns du mouvement de travail</strong>. Des cercles d'épaules progressifs avant le développé couché. Des rotations thoraciques avant le rowing. Des hip circles avant le squat. Des cercles de cheville avant les fentes.",
          "L'objectif est de répartir le liquide synovial, d'augmenter progressivement l'amplitude de mouvement, et d'activer le système nerveux — sans inhiber la tonicité musculaire nécessaire à la production de force.",
        ],
      },
      {
        heading: "Les étirements statiques ont-ils un rôle en musculation ?",
        content: [
          "Oui — <strong class='text-white'>après l'effort ou les jours off</strong>. En fin de séance, les étirements statiques améliorent la récupération et développent la souplesse à long terme. Le problème n'est pas l'étirement statique en soi. C'est son placement avant l'effort.",
          "Pour un gain de souplesse réel, les étirements doivent être maintenus 60 à 90 secondes — c'est le seuil minimal pour remoduler le tissu conjonctif. Ce type d'étirement n'a rien à faire avant une série de squat.",
        ],
      },
      {
        heading: "La méthode complète, de l'entrée en salle au retour vestiaire",
        content: [
          "<strong class='text-white'>Avant la séance (5-8 min) :</strong> mobilité dynamique ciblée sur les articulations sollicitées + activation musculaire spécifique. C'est ce que le générateur construit pour toi en 30 secondes.",
          "<strong class='text-white'>Début de chaque exercice polyarticulaire lourd :</strong> 2 à 3 séries de chauffe progressives avec charge réduite avant le poids de travail.",
          "<strong class='text-white'>Après la séance :</strong> étirements statiques des groupes travaillés, 30 à 60 secondes par groupe. Favorise la récupération et le maintien de la souplesse.",
          "<strong class='text-white'>Jours off :</strong> routine de mobilité ou étirements statiques longs (60-90 sec) pour le gain de souplesse réel sur le long terme.",
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
        a: "Des étirements statiques très courts (10-15 secondes) ont un impact faible sur la force — l'inhibition neuromusculaire est quasi négligeable. Le problème se pose à partir de 30-45 secondes de maintien. En dessous, c'est peu risqué mais peu utile.",
      },
      {
        q: "L'échauffement dynamique améliore-t-il les performances le jour même ?",
        a: "Oui — les études montrent un gain de 4 à 10 % de force disponible avec un échauffement bien calibré. La mobilité dynamique + l'activation musculaire spécifique permettent d'arriver à la première série de travail avec un recrutement neuro-musculaire optimal.",
      },
    ],
    relatedLinks: [
      { href: "/blog/pourquoi-s-echauffer-musculation", label: "Pourquoi s'échauffer ?" },
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps s'échauffer ?" },
      { href: "/echauffement/exercice/souleve-de-terre", label: "Échauffement soulevé de terre" },
      { href: "/echauffement/combo/haut-du-corps", label: "Plan haut du corps" },
    ],
  },
  {
    slug: "guide-complet-echauffement-musculation",
    metaTitle: "Guide complet de l'échauffement en musculation (2026)",
    metaDescription:
      "Tout ce qu'il faut savoir sur l'échauffement en musculation : pourquoi, combien de temps, les 3 phases, les erreurs à éviter. Le guide de référence en français.",
    h1: "Guide complet — L'échauffement en musculation",
    publishDate: "19 mai 2026",
    readingTime: "7 min",
    intro:
      "L'échauffement est probablement la partie de la séance la moins bien comprise — et la plus souvent sabotée. Trop court, trop long, mal orienté, ou tout simplement absent. Ce guide couvre tout : la physiologie derrière l'échauffement, les 3 phases d'un protocole efficace, la durée selon ton objectif, les erreurs classiques et comment générer un plan adapté en 30 secondes.",
    sections: [
      {
        heading: "Pourquoi le corps a besoin d'être échauffé",
        content: [
          "À température de repos (36°C), le corps n'est pas optimisé pour l'effort intense. Plusieurs mécanismes physiologiques expliquent pourquoi commencer une séance à froid est à la fois moins performant et plus risqué.",
          "<strong class='text-white'>La viscosité musculaire.</strong> Les filaments contractiles (actine et myosine) glissent avec plus de friction à basse température. La force et la vitesse de contraction sont réduites de 10 à 15 %. Chaque degré gagné au-delà de 36°C améliore la vélocité de contraction.",
          "<strong class='text-white'>Le liquide synovial.</strong> Les articulations sont lubrifiées par un liquide qui, à froid, est épais et peu circulant. Sans échauffement, les surfaces cartilagineuses s'articulent sous des contraintes pour lesquelles elles ne sont pas préparées — c'est là que naissent les micro-traumatismes chroniques.",
          "<strong class='text-white'>Le système nerveux.</strong> Le recrutement des unités motrices est sous-optimal à froid. La connexion neuro-musculaire — la capacité du cerveau à « appeler » les fibres musculaires rapidement — n'est pas établie. L'échauffement spécifique programme ce câblage avant les séries de travail.",
          "<strong class='text-white'>Les tendons.</strong> Moins vascularisés que les muscles, ils montent en température plus lentement. Ce décalage crée une fenêtre de vulnérabilité sur les premières répétitions à froid — tendon rotulien, coiffe des rotateurs, tendons épicondyliens sont les plus exposés.",
        ],
      },
      {
        heading: "Les 3 phases d'un échauffement efficace",
        content: [
          "Un échauffement muscu bien construit suit trois phases distinctes, dans cet ordre. Chacune a un rôle précis — les intervertir ou en sauter une dégrade l'efficacité de l'ensemble.",
          "<strong class='text-white'>Phase 1 — Mobilisation articulaire (2 min).</strong> L'objectif est de répartir le liquide synovial dans les articulations que tu vas solliciter. On travaille en cercles lents et progressifs : épaules, hanches, chevilles, colonne thoracique selon la séance. Aucune charge, aucune douleur. Si tu travailles le haut du corps, tu mobilises l'épaule et la cage thoracique. Si tu squattes, tu mobilises hanches et chevilles en priorité.",
          "<strong class='text-white'>Phase 2 — Activation musculaire (3 à 5 min).</strong> On réveille spécifiquement les muscles qui vont travailler. L'objectif n'est pas de les fatiguer mais d'établir la connexion neuro-musculaire et de les préparer à recevoir une charge. Les exercices sont ciblés, contrôlés, à faible charge ou au poids du corps. C'est ici que se joue la différence entre un échauffement générique (inutile) et un protocole adapté à ta séance.",
          "<strong class='text-white'>Phase 3 — Séries de chauffe (sur les exercices lourds).</strong> Cette phase ne fait pas partie de l'échauffement général — elle se fait à la barre ou aux haltères, juste avant tes séries de travail sur les exercices polyarticulaires. Principe : 2 à 3 séries progressives avec des charges croissantes (50 %, 70 %, 85 % du poids de travail) pour préparer le geste et le système nerveux à la charge maximale.",
        ],
      },
      {
        heading: "Combien de temps s'échauffer selon l'objectif",
        content: [
          "La durée optimale n'est pas fixe — elle dépend de l'intensité de la séance, des groupes musculaires travaillés et de la présence de zones sensibles.",
          "<strong class='text-white'>Force (1 à 5 reps, charges maximales) :</strong> 7 à 8 minutes. Le recrutement neuro-musculaire doit être maximal dès la première série de travail. Une activation insuffisante sur une séance de force se paye directement en kilos perdus sur la barre.",
          "<strong class='text-white'>Hypertrophie (6 à 15 reps, volume) :</strong> 5 à 6 minutes. La connexion mind-muscle prime sur le recrutement brut. L'activation ciblée améliore la qualité des contractions sur les séries de travail.",
          "<strong class='text-white'>Mobilité ou reprise :</strong> 8 à 10 minutes, rythme lent. Sur une séance de reprise après une blessure ou un long break, l'échauffement est aussi une mise en charge progressive des tissus — raccourcir cette phase multiplie le risque de rechute.",
          "<strong class='text-white'>Température ambiante :</strong> par temps froid ou en salle non chauffée, ajoute 2 à 3 minutes. Les muscles démarrent à 34-35°C au lieu de 36°C — le chemin vers les 38-39°C optimaux est plus long.",
          "Règle générale : <strong class='text-white'>en dessous de 5 minutes, l'échauffement est incomplet</strong>. Au-delà de 10 minutes, tu entames tes réserves glycolytiques et tu arrives à ta première série légèrement fatigué.",
        ],
      },
      {
        heading: "Dynamique ou statique — ce que dit la science",
        content: [
          "C'est le malentendu le plus répandu en salle : des millions de pratiquants s'étirent encore statiquement avant de soulever. Les données sont claires depuis plus de 20 ans.",
          "Une méta-analyse portant sur 104 études (Simic et al., 2013) mesure une <strong class='text-white'>réduction moyenne de 5,5 % de la force maximale</strong> après des étirements statiques maintenus avant l'effort. Le mécanisme : l'étirement statique inhibe les fuseaux neuromusculaires et réduit l'activité des motoneurones alpha. Pour des étirements maintenus plus de 60 secondes, la baisse atteint 8 à 10 %.",
          "L'alternative est l'<strong class='text-white'>échauffement dynamique</strong> : des mouvements contrôlés en amplitude croissante qui imitent les patterns du mouvement de travail. Cercles d'épaules progressifs avant le développé couché. Rotations thoraciques avant le rowing. Hip circles avant le squat. Ces mouvements lubrifient les articulations et activent le système nerveux sans inhiber la tonicité musculaire.",
          "Les étirements statiques ont leur rôle — mais <strong class='text-white'>après</strong> la séance ou les jours off, maintenus 60 à 90 secondes pour développer la souplesse sur le long terme.",
        ],
      },
      {
        heading: "Adapter l'échauffement à son groupe musculaire",
        content: [
          "<strong class='text-white'>Pectoraux / développé couché.</strong> Priorité à la mobilité thoracique et à l'activation de la coiffe des rotateurs et du grand dentelé. La cage thoracique rigide est la première cause de douleur d'épaule au DC. Mobilisation thoracique en rotation, ouverture pectorale, band pull-aparts.",
          "<strong class='text-white'>Dos / rowing et tractions.</strong> Activation des rhomboïdes et de l'infra-épineux (rotation externe d'épaule) pour éviter les compensations en protraction scapulaire. Face pulls au câble léger ou avec élastique, rétraction active des omoplates.",
          "<strong class='text-white'>Jambes / squat et soulevé de terre.</strong> Les deux exercices les plus exigeants articulairement — hanches, genoux et chevilles simultanément. Hip circles, mobilité de cheville en appui, fentes marchées, activation des fessiers avec pont fessier ou clamshells.",
          "<strong class='text-white'>Épaules.</strong> Articulation la plus mobile et la plus fragile. Rotation interne/externe légère, pendulum, élévations latérales très légères pour vasculariser la coiffe avant de charger.",
          "<strong class='text-white'>Core.</strong> Activation du transverse et des obliques avant tout exercice axial (squat, soulevé). Dead bugs, bird dogs, planches courtes.",
        ],
      },
      {
        heading: "Les 5 erreurs les plus communes",
        content: [
          "<strong class='text-white'>1. Sauter l'échauffement quand on est « en retard ».</strong> C'est précisément dans ces moments-là que les blessures arrivent — corps froid, esprit distrait, premières charges sans préparation.",
          "<strong class='text-white'>2. Faire 15 minutes de cardio à la place.</strong> Le tapis roulant élève la température générale mais ne prépare pas les structures spécifiques. Tu fatigues le système cardiovasculaire sans établir la connexion neuro-musculaire nécessaire.",
          "<strong class='text-white'>3. Les étirements statiques avant l'effort.</strong> Voir section précédente. Ils réduisent la force disponible pendant 30 à 60 minutes.",
          "<strong class='text-white'>4. L'échauffement générique (le même pour tout le monde, tout le temps).</strong> Un échauffement squat est différent d'un échauffement développé couché. Un pratiquant avec une épaule sensible ne fait pas le même protocole qu'un pratiquant sans gêne.",
          "<strong class='text-white'>5. Oublier les séries de chauffe.</strong> L'échauffement général prépare le corps — il ne remplace pas les séries progressives à la barre sur les exercices polyarticulaires lourds. Les deux sont nécessaires.",
        ],
      },
      {
        heading: "Échauffement avec une zone sensible",
        content: [
          "Épaule douloureuse, genou fragile, lombaires sensibles, poignets — les zones sensibles ne sont pas une contre-indication à l'entraînement. Elles nécessitent un protocole adapté.",
          "Le principe est d'<strong class='text-white'>ajouter des exercices thérapeutiques ciblés</strong> à l'échauffement standard — des mouvements de faible charge qui vascularisent et mobilisent la zone fragilisée sans l'aggraver. Sur une épaule sensible : rotations douces de la coiffe, pendulum, mobilisation sous-scapulaire. Sur un genou fragile : quad sets, activation VMO, mobilisation rotulienne.",
          "Ce n'est pas une approche \"à la légère\" : les pratiquants qui s'entraînent avec une gêne chronique sans adapter leur échauffement accumulent les micro-traumatismes jusqu'à la blessure franche.",
        ],
      },
    ],
    faqs: [
      {
        q: "Peut-on faire de la musculation sans s'échauffer ?",
        a: "Techniquement oui — pratiquement, c'est une stratégie qui fonctionne jusqu'au jour où ça ne fonctionne plus. Les blessures tendineuses et articulaires sont souvent le résultat de mois d'entraînement à froid, pas d'un seul incident. Le risque augmente avec la charge et l'âge.",
      },
      {
        q: "L'échauffement est-il différent pour un débutant et un pratiquant avancé ?",
        a: "Le protocole est similaire — mais un pratiquant avancé charge plus lourd, ce qui rend les séries de chauffe progressives encore plus importantes. Un débutant peut se contenter de 5 minutes d'activation ; un pratiquant qui squatte lourd aura besoin de 8 minutes plus 3 séries de chauffe à la barre.",
      },
      {
        q: "Faut-il s'échauffer entre deux exercices dans la même séance ?",
        a: "Pas d'échauffement complet, mais une série de chauffe légère sur le premier exercice d'un nouveau groupe musculaire. Si tu passes du développé couché au rowing, une série de rowing très légère suffit à réveiller les muscles du dos.",
      },
      {
        q: "L'échauffement sert-il aussi à améliorer la souplesse ?",
        a: "Non — pas l'échauffement dynamique pré-séance. Celui-ci libère les amplitudes disponibles pour la séance mais ne développe pas la souplesse à long terme. Pour gagner en souplesse durablement, les étirements statiques longs (60-90 sec) en fin de séance ou les jours off sont nécessaires.",
      },
      {
        q: "Un générateur d'échauffement, c'est vraiment utile ?",
        a: "Il résout le problème principal : savoir quoi faire exactement selon ce qu'on travaille. La plupart des pratiquants font toujours le même échauffement générique parce que créer un protocole adapté prend du temps. Un générateur qui prend en compte les muscles cibles, l'objectif et les zones sensibles en 30 secondes, c'est la différence entre un échauffement qui prépare et un échauffement qui fait perdre du temps.",
      },
    ],
    relatedLinks: [
      { href: "/blog/pourquoi-s-echauffer-musculation", label: "Pourquoi s'échauffer ?" },
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps ?" },
      { href: "/blog/echauffement-dynamique-ou-statique", label: "Dynamique ou statique ?" },
      { href: "/echauffement/exercice/squat", label: "Échauffement squat" },
      { href: "/echauffement/exercice/developpe-couche", label: "Échauffement développé couché" },
      { href: "/echauffement/combo/full-body", label: "Plan full body" },
    ],
  },

  {
    slug: "echauffement-debutant-musculation",
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
          "Contre-intuitivement, les débutants ont encore plus besoin de s'échauffer que les pratiquants confirmés. Deux raisons principales : d'abord, la <strong class='text-white'>technique n'est pas encore automatisée</strong>. Sur un squat ou un développé couché, le système nerveux doit « câbler » le bon pattern de mouvement à chaque répétition. Un corps froid et un système nerveux non activé rendent ce câblage plus difficile — tu apprends moins bien et tu compenses davantage.",
          "Ensuite, les tendons et les articulations d'un débutant ne sont <strong class='text-white'>pas encore adaptés au stress mécanique</strong> de la musculation. La progression est rapide au début, les charges augmentent vite — et les tendons mettent plus de temps que les muscles à s'adapter. L'échauffement est ta première protection contre les tendinites qui surviennent précisément à cette période de progression rapide.",
        ],
      },
      {
        heading: "Le protocole 5 minutes — sans matériel",
        content: [
          "<strong class='text-white'>1 min — Rotation des épaules :</strong> grands cercles vers l'arrière (30s), puis vers l'avant (30s). Lubrifie les articulations gléno-humérales. Fais-les lentement et en amplitude maximale.",
          "<strong class='text-white'>1 min — Hip circles :</strong> mains sur les hanches, pieds écartés à largeur d'épaules. Trace de grands cercles avec le bassin, 8 dans un sens, 8 dans l'autre. Mobilise les hanches pour tous les exercices de jambes.",
          "<strong class='text-white'>1 min — Cercles de poignets et flexions de genou :</strong> 30s de rotations de poignets dans les deux sens (important avant tous les exercices avec barre), puis 10 flexions légères de genoux — juste pour lubrifier.",
          "<strong class='text-white'>1 min — Cat-cow :</strong> à quatre pattes, alterne dos rond et dos creux, 10 cycles lentement. Mobilise toute la colonne avant les exercices en charge axiale.",
          "<strong class='text-white'>1 min — Pompes à amplitude réduite :</strong> 10 pompes contre le mur ou sur les genoux. Active les pectoraux, épaules et triceps en douceur. Si tu fais une séance jambes, remplace par 10 squats lents au poids du corps.",
        ],
      },
      {
        heading: "Adapter selon la séance du jour",
        content: [
          "Le protocole ci-dessus est généraliste — il prépare l'ensemble des articulations. Selon ce que tu vas travailler, tu peux l'adapter en 30 secondes :",
          "<strong class='text-white'>Séance haut du corps :</strong> insiste sur les rotations d'épaules et les poignets. Ajoute 5 cercles de bras lents avant de prendre la barre.",
          "<strong class='text-white'>Séance bas du corps :</strong> insiste sur les hip circles et les flexions de genoux. Ajoute des rotations de cheville (10 dans chaque sens) — les chevilles sont souvent les premières à limiter la profondeur de squat.",
          "<strong class='text-white'>Full body :</strong> le protocole 5 minutes complet suffit — il couvre tout.",
          "La règle la plus importante : <strong class='text-white'>fais-le systématiquement</strong>. Un échauffement moyen fait à chaque séance vaut mieux que l'échauffement parfait fait une fois sur deux.",
        ],
      },
      {
        heading: "Les erreurs typiques du débutant",
        content: [
          "<strong class='text-white'>Erreur 1 : s'étirer statiquement avant de soulever.</strong> Les étirements statiques (tenir une position en forçant l'amplitude) avant l'effort réduisent la force de 5 à 10 %. Tu ne les sens pas, mais la différence est mesurable dès la première série. Garde les étirements statiques pour après la séance.",
          "<strong class='text-white'>Erreur 2 : considérer les premières séries légères comme échauffement.</strong> Faire ses premières séries à charge légère n'est pas la même chose qu'un échauffement articulaire et musculaire. Les deux sont nécessaires — l'un prépare le corps, l'autre programme le geste.",
          "<strong class='text-white'>Erreur 3 : s'échauffer une fois et ne plus y penser.</strong> L'échauffement se fait à chaque séance, pas seulement quand on se « sent raide ». Le corps ne donne pas toujours de signaux avant une blessure — il donne des signaux après.",
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
        a: "Oui — sélectionne tes groupes musculaires, l'objectif \"Reprise\" ou \"Hypertrophie\" et la durée 5 minutes. Le générateur construit un plan adapté à ton niveau sans exercices trop techniques. Tous les exercices du plan sont réalisables sans expérience préalable.",
      },
      {
        q: "Faut-il s'échauffer différemment si on est très débutant ?",
        a: "Le protocole ci-dessus est conçu pour ça — zéro matériel, zéro technique complexe. La seule adaptation : ralentis encore plus chaque mouvement et reste bien en dessous de ta limite d'amplitude. L'échauffement du débutant est aussi un moment d'exploration des amplitudes de mouvement disponibles.",
      },
    ],
    relatedLinks: [
      { href: "/blog/pourquoi-s-echauffer-musculation", label: "Pourquoi s'échauffer ?" },
      { href: "/blog/combien-de-temps-s-echauffer-musculation", label: "Combien de temps ?" },
      { href: "/echauffement/combo/full-body", label: "Plan full body 5 min" },
      { href: "/echauffement/combo/haut-du-corps", label: "Plan haut du corps" },
    ],
  },

  {
    slug: "echauffement-pecs-musculation",
    metaTitle: "Échauffement pecs musculation — avant développé couché",
    metaDescription:
      "Comment s'échauffer les pectoraux avant une séance de développé couché ? Activation coiffe, mobilité thoracique, grand dentelé — protocole en 5 min.",
    h1: "Échauffement pecs — préparer la séance pectoraux",
    publishDate: "28 mai 2026",
    readingTime: "4 min",
    intro:
      "La douleur d'épaule au développé couché est l'une des blessures les plus communes en salle. Dans 80 % des cas, elle vient d'un manque de préparation : coiffe des rotateurs froide, cage thoracique rigide, grand dentelé inactif. Voici comment préparer correctement les pectoraux — et l'épaule qui va avec — avant chaque séance.",
    sections: [
      {
        heading: "Ce qui limite vraiment le développé couché",
        content: [
          "Le développé couché n'est pas un exercice de pectoraux isolé. Il implique simultanément les <strong class='text-white'>pectoraux</strong> (moteur principal), la <strong class='text-white'>coiffe des rotateurs</strong> (stabilisateurs de l'articulation gléno-humérale), le <strong class='text-white'>grand dentelé</strong> (qui contrôle le mouvement des omoplates) et la <strong class='text-white'>mobilité thoracique</strong> (qui détermine l'amplitude et la sécurité du mouvement).",
          "Un développé couché fait sans préparation sollicite toutes ces structures à froid. Le premier à céder est presque toujours la coiffe — et une fois la tendinite installée, elle met des semaines à partir. Cinq minutes d'échauffement spécifique changent tout.",
        ],
      },
      {
        heading: "Le protocole pectoraux en 5 étapes",
        content: [
          "<strong class='text-white'>Étape 1 — Mobilisation thoracique en rotation (1 min) :</strong> à quatre pattes, main droite derrière la tête. Coude vers l'intérieur puis ouvre vers le plafond. La cage thoracique tourne. 8 répétitions par côté. Sans cette mobilité, tu ne peux pas arriver en bas du développé couché avec une arche propre.",
          "<strong class='text-white'>Étape 2 — Ouverture pectorale contre le mur (45s) :</strong> bras à 90°, paume contre un mur. Pivote doucement le corps en éloignant le buste du bras. Étire le pec mineur souvent raccourci. 15s par côté, 2 fois.",
          "<strong class='text-white'>Étape 3 — Pompes scapulaires (1 min) :</strong> position planche, coudes verrouillés. Les omoplates glissent : rétraction puis protraction. 12 répétitions. Active le grand dentelé.",
          "<strong class='text-white'>Étape 4 — Rotations externes élastique (1 min) :</strong> coude collé au flanc, avant-bras à 90°. Rotation externe contre une résistance légère. 12 répétitions par bras. Active la coiffe des rotateurs.",
          "<strong class='text-white'>Étape 5 — Chauffe à la barre vide (1 min) :</strong> allonge-toi sur le banc, omoplates rétractées, dos légèrement cambré. 10 répétitions à la barre vide en explorant la trajectoire. Verrouille le pattern moteur.",
        ],
      },
      {
        heading: "Le setup du DC : les détails qui changent tout",
        content: [
          "<strong class='text-white'>Les omoplates en premier :</strong> avant de toucher la barre, rétracte et déprime les omoplates (tire-les vers l'arrière et vers le bas). Ce verrouillage scapulaire crée une plateforme stable pour l'épaule.",
          "<strong class='text-white'>La trajectoire :</strong> la barre descend vers le bas du sternum, pas vers le cou. Elle remonte en décrivant une légère courbe vers les yeux, pas verticalement. Cette trajectoire naturelle réduit le stress sur les tendons de la coiffe.",
          "<strong class='text-white'>La respiration :</strong> inspire avant de descendre la barre (pression intra-abdominale), expire en poussant. Ce bracing protège les épaules à chaque répétition.",
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
        a: "Pour un travail à 80 % du 1RM : barre vide × 10, 50 % × 5, 70 % × 3. Pour 90 %+ : ajoute 85 % × 1-2 reps. Ne skip pas la barre vide — c'est là que tu programmes le pattern et que tu vérifies le setup.",
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
          "C'est l'erreur numéro un. Des millions de pratiquants s'étirent encore statiquement avant de soulever, alors que la science est sans appel depuis plus de 20 ans : les étirements statiques maintenus avant un effort de force <strong class='text-white'>réduisent la force maximale de 5 à 10 %</strong> pour les 30 à 60 minutes suivantes.",
          "Le mécanisme : l'étirement statique inhibe les fuseaux neuromusculaires et réduit l'activité des motoneurones alpha. Résultat concret — si tu t'étires les quadriceps 45 secondes avant ton squat, ta première série est objectivement moins forte.",
          "<strong class='text-white'>La correction :</strong> remplace les étirements statiques par de la mobilité dynamique et de l'activation musculaire spécifique. Les étirements statiques ont leur rôle — après la séance ou les jours off.",
        ],
      },
      {
        heading: "Erreur 2 — 15 minutes de cardio en guise d'échauffement",
        content: [
          "Le tapis roulant élève la température corporelle globale. C'est utile — mais insuffisant et contre-productif quand c'est trop long. Au-delà de 8-10 minutes d'effort cardiovasculaire modéré, <strong class='text-white'>tu entames tes réserves glycolytiques</strong> et tu crées une pré-fatigue du système nerveux central.",
          "Le cardio ne prépare pas les structures spécifiques — la coiffe des rotateurs n'est pas activée, le pattern moteur du squat n'est pas câblé, les articulations ne sont pas mobilisées dans les amplitudes de travail.",
          "<strong class='text-white'>La correction :</strong> 5 minutes de cardio très léger suffisent si la salle est froide. Remplace le reste par de la mobilité articulaire ciblée et de l'activation musculaire spécifique.",
        ],
      },
      {
        heading: "Erreur 3 — L'échauffement générique",
        content: [
          "L'échauffement de l'épaule avant les tractions est différent de l'échauffement de la hanche avant le squat. Un protocole identique pour tout le monde et tout le temps est un protocole qui prépare mal.",
          "<strong class='text-white'>La correction :</strong> adapte systématiquement l'échauffement à ta séance du jour. Mobilise les articulations que tu vas solliciter et active les muscles moteurs principaux. Si tu squattes, tes chevilles et tes hanches ont besoin d'attention. Si tu fais du DC, c'est ta cage thoracique et ta coiffe.",
        ],
      },
      {
        heading: "Erreur 4 — Sauter l'échauffement parce qu'on se sent chaud",
        content: [
          "La sensation de chaleur n'est pas un indicateur de préparation musculo-articulaire. Tu peux transpirer et avoir les articulations non lubrifiées, les tendons froids et le système nerveux non activé sur le pattern de travail.",
          "La température de surface monte vite. La température musculaire profonde et la température tendineuse — les deux qui comptent — mettent 4 à 7 minutes à atteindre leur optimal. <strong class='text-white'>La sensation ne remplace pas le temps</strong>.",
          "<strong class='text-white'>La correction :</strong> fais systématiquement l'échauffement, quelles que soient les conditions. Si tu as vraiment chaud, réduis à 3-4 minutes mais ne supprime pas la phase d'activation musculaire spécifique.",
        ],
      },
      {
        heading: "Erreur 5 — Confondre échauffement général et séries de chauffe",
        content: [
          "L'échauffement général prépare les articulations et établit la connexion neuro-musculaire. Les séries de chauffe à la barre programment le geste spécifique sous charge. Les deux sont nécessaires — l'un ne remplace pas l'autre.",
          "<strong class='text-white'>La correction :</strong> sur les exercices polyarticulaires lourds (squat, développé couché, soulevé de terre), toujours faire 2 à 3 séries de chauffe progressives après l'échauffement général. Exemple pour 80 % : barre vide × 10, 50 % × 5, 70 % × 3.",
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
        a: "Des étirements très courts (10-15 secondes) ont un impact minimal sur la force. L'inhibition neuromusculaire devient significative à partir de 30-45 secondes de maintien. En dessous, c'est peu risqué mais aussi peu utile — autant faire de la mobilité dynamique.",
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
