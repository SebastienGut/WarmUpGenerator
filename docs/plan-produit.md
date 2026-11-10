# Plan produit : rendre Warmup vraiment utile

> À reprendre avec : « Lis docs/plan-produit.md et attaque le lot suivant non terminé. »
> Mis à jour : 2 nov. 2026. Chaque lot se termine par des vérifications, un push en main
> (Seb teste sur téléphone) et la mise à jour de ce fichier (cocher, noter les décisions).

## Où on en est
- **Signal encourageant** : l'aperçu IA de Google recommande Warmup Generator sur
  « générateur d'échauffement musculation » ; ~16 clics la semaine du 26 oct. 2026.
- **Verdict de Seb, sportif** : en l'état, le site « n'a aucune valeur » : visuel raté,
  logique des exercices proposés peu crédible, page d'accueil surchargée.
- Source complémentaire : un audit ChatGPT (prompt collé par Seb le 2 nov.), dont on garde
  la vision et les anomalies vérifiées ci-dessous.

## Vision (inchangée, décisions de Seb)
- Je choisis les muscles que je travaille aujourd'hui → j'obtiens vite une préparation
  adaptée → je la suis exercice par exercice → je la retrouve la prochaine fois.
- Pas de questionnaire, pas de saisie des exercices ou charges. Séances types = raccourcis
  vers une combinaison de muscles. La personnalisation vient de la qualité du moteur.
- Deux outils distincts : l'échauffement ; les séries d'approche à côté, sans alourdir l'entrée.
- Gratuit, sans compte, sans IA en ligne, hors ligne, aucune dépendance payante.
- Promesse exacte : échauffement adapté aux groupes travaillés, pas un diagnostic ni la
  connaissance de toute la séance.

---

## Lot 0 — Bugs et incohérences (rapide, à faire en premier)
- [x] **Séances récentes** : la déduplication se fait sur le paramètre `s` (exercices) ; les
      routines par zones (`z`) ont toutes `s` vide → chaque routine écrase la précédente
      (`lib/saved-sessions.ts`). Dédupliquer sur la combinaison réelle (zones + options).
- [x] **Variante du jour automatique** (`dayVariant` dans SessionBuilder) : empêche de retrouver
      la même routine. Routine stable par défaut ; la variation reste un choix (↻ Varier).
- [x] **Message de fin** « Barre chargée / première série de travail » faux après un simple
      échauffement : adapter au contenu réalisé (et proposer les séries d'approche).
- [x] **Durée estimée** : ajouter les transitions entre exercices (changement de position,
      prise de matériel), arrondir honnêtement.
- [x] **FAQ et textes** : traquer les contradictions avec les capacités réelles du générateur
      et les affirmations trop absolues (douleurs, prévention des blessures, étirements, durées).
- Vérif : tests de comportement (pas des tests qui recopient l'implémentation).

## Lot 1 — Le moteur et la base d'exercices (le cœur de la valeur) — remplacé par le lot 1 bis (moteur v3)
Objectif : qu'un sportif regarde la routine et se dise « oui, c'est exactement ce que je ferais ».
1. **Audit de la base** (`lib/warmup-data.ts`, 80 exercices de préparation) : pour chacun,
   rôle (mise en route / mobilité / activation), zones, matériel, position (debout, sol,
   quatre pattes, banc), dosage, et verdict garder / corriger / retirer. Ajouter les manques
   évidents. Signaler à Seb les exercices discutables plutôt que de les garder par défaut.
2. **Règles de sélection**, écrites puis codées (`lib/session-engine.ts`) :
   - mutualiser les besoins communs d'une combinaison (pecs + épaules + bras ≠ 3 listes collées) ;
   - pas de doublons fonctionnels, pas d'exercice ajouté pour remplir un quota ;
   - limiter les changements de position et de matériel, ordre logique (debout → sol, ou l'inverse) ;
   - dosage qui prépare sans fatiguer ; activation ≠ préfatigue ;
   - routine stable, variation volontaire ; substitutions cohérentes (sans élastique…) ;
   - chaque exercice a un rôle défendable et une justification liée à la sélection, écrite
     pour cet exercice dans ce contexte, pas un discours générique.
3. **Sources** : appuyer les règles importantes (protocole RAMP de Jeffreys, études sur
   l'échauffement dynamique et les étirements statiques, séries d'approche). Distinguer
   résultats scientifiques, choix de conception et points à faire valider par un coach.
   Mettre à jour /methodologie en conséquence. Ne jamais prétendre à une validation par un coach.
4. **Banc d'essai** : un muscle seul, muscles proches (pecs + épaules), haut du corps, jambes,
   full body, avec et sans élastique, version courte, zones qui coincent. Pour chaque cas :
   la routine produite, relue comme un coach (doublons, ordre, matériel, durée, cohérence des
   différences entre routines). Garder ces cas comme tests de non-régression.
5. **Validation par Seb** sur 5 routines types avant de passer au lot 2.

## Lot 2 — Le parcours : choisir, comprendre, suivre, retrouver — en grande partie fait
1. **Accueil = l'outil** : sélection des groupes musculaires simple et agréable (séances types
   en raccourcis), visible sans défiler sur téléphone. Le contenu SEO (FAQ, guides, liens)
   descend nettement ou part sur les pages dédiées, sans supprimer d'URL indexée.
2. **Transition** courte et sobre vers le plan (pas de fausse « analyse IA », pas d'attente artificielle).
3. **Aperçu** : muscles choisis, durée honnête, liste des exercices, bouton « C'est parti ».
4. **Mode guidé** :
   - un exercice à la fois, avec sa démonstration, ses répétitions ou sa durée, une consigne courte
     et la raison de sa présence dans la routine ;
   - pause, précédent et suivant toujours accessibles, y compris pendant un minuteur ;
   - écran allumé, gros boutons utilisables en salle.
5. **Fin** adaptée à ce qui a été fait ; retrouver sa routine (séances récentes fiables) ;
   lien vers les séries d'approche en complément.
6. Vérif : parcours complet sur mobile et desktop, clavier, contrastes, mouvement réduit,
   hors ligne.

## Lot 3 — Direction artistique — B choisie et en ligne
- Retour de Seb et de l'audit : visuel « froid, robotique, peu sportif », personnages
  approximatifs. Il faut une vraie direction artistique, pas des couleurs changées.
- Méthode (skill frontend-design + design-critique) : comparer deux directions concrètes en
  maquette (accueil, aperçu, mode guidé, sur téléphone), choisir avec Seb, puis implémenter.
- Cibles : sportif, physique, précis, motivant, lisible en salle ; typographie expressive pour
  les titres, lisible pour les consignes ; palette resserrée ; illustrations homogènes ;
  mouvements sobres et utiles. Pas d'esthétique de tableau de bord.
- Garder ce qui marche de la refonte du 23 oct. si Seb le confirme (« barre chargée » ?) ;
  sinon repartir de la comparaison.

## Lot 4 — Démonstrations des exercices — images IA en ligne (77 exercices)
- La compréhension du mouvement prime sur la sophistication. Aucune animation douteuse
  présentée comme finale.
- **3D abandonnée** (2 nov. 2026, verdict de Seb : « complètement éclaté »). Code retiré de main ;
  le dernier état (Blender + MPFB, moteur anatomique, MoMask) reste sur la branche
  `feat/exercise-3d-v2` pour mémoire. Ne pas relancer sans nouvelle idée validée par Seb.
- Pistes sans 3D : illustrations fixes « départ → arrivée » soignées et homogènes, ou pictogrammes
  retravaillés ; auditer appuis, trajectoire, amplitude et rythme de chaque visuel.
- À faire **après** le lot 1, sur la base d'exercices stabilisée.

## Lot 5 — Contenu, SEO, GEO (en continu)
- Préserver les URL utiles, métadonnées, maillage ; pas de suppression massive sans examen.
- Promesses exactes partout (l'aperçu IA de Google reprend nos phrases : elles doivent être vraies).
- Garder /llms.txt, les blocs « En bref » et l'open data à jour après chaque lot.
- Suivre l'évolution des clics (Seb) après chaque mise en ligne.

## Hors périmètre (décisions)
- Pas de compte obligatoire, de chatbot, de gamification, d'IA en ligne pour choisir les exercices.
- Ne pas affirmer de meilleure rétention sans données.

## Lot 1 bis — Moteur v3 (brief de Seb, docs/guides/brief-moteur-v3.md) — fait, en attente de validation
- Banque `lib/bank.ts` : vrais noms, variante par matériel (salle / élastique / sans), remplacement
  honnête ou retrait. Routines `lib/routines.ts` : une par séance type, bases par zone pour « Mes zones ».
- Pas de cardio ; mobilité puis activation ; message de fin imposé ; accroche sur l'accueil.
- Réglage matériel mémorisé sur l'appareil (`lib/equipment-pref.ts`), URL `m=n|e|s`, séance `t=`.
- Reste : validation des routines (docs/decisions-a-prendre.md). Complément lombaire abandonné (Seb, 3 nov. 2026).

## Journal
- 3 nov. 2026 : retours de Seb sur téléphone. Accueil : six cartes visibles sans défiler (bandeau et cartes
  resserrés, séances récentes sous les cartes), « Routine de soin » retiré, carte Séries d'approche refaite
  (escalier de paliers, sans disques). Routines à 6 min (durée réelle par dose, activation en 2 séries ;
  Pull sans matériel 5 min, faute de curl). Zone sensible sur le plan : 1 à 2 exercices de soin ajoutés
  (lib/rehab.ts PREP_EXTRAS). Séries d'approche refondues : dernier palier lourd (90/85/80/75 % selon les
  reps), sauts ≤ 20 kg ou 20 %, 2 à 4 paliers, reps décroissantes, repos 2-3 min avant le travail, option
  « muscles déjà échauffés » ; textes de la page calculés depuis l'outil.
- 3 nov. 2026 : incident de mise en ligne : Vercel n'a pas reçu la notification GitHub de deux pushs
  (47b33e7, 404c2a5 : aucun statut sur le commit). Relancé par un commit vide. À surveiller : après un push,
  vérifier qu'un statut « Vercel » apparaît sur le commit (gh api repos/SebastienGut/WarmUpGenerator/commits/<sha>/statuses).
- Nov. 2026 : ↻ par exercice à la place de ↻ Varier (ALTERNATIVES, 13 exercices ajoutés à la banque avec des
  images existantes, URL x=) ; Bras sans matériel complété ; accueil mobile cadré sur un écran (bandeau + 6 cartes).
- 3 nov. 2026 : cartes de l'accueil en démonstrations détourées (scripts/assets/build-covers.mjs), image pour
  « Une douleur ? ».
- 3 nov. 2026 : lot 4 suite, 32 exercices de séance (développés, tirages, squats, soulevés, machines,
  tractions…) générés et relus de la même façon ; ils remplacent les pictogrammes dans le calculateur de
  séries d'approche, le mode guidé et les pages d'atterrissage. Les cartes de l'accueil gardent leurs
  pictogrammes (posés sur les aplats de couleur).
- 3 nov. 2026 : lot 4, 45 démonstrations générées par Claude dans le ChatGPT de Seb (une image en deux
  panneaux par exercice pour garder personnage et cadrage), relues contre leur checklist ; 8 refaites
  (wall slides, W allongé, rétraction, rotations de poignets, coquillage, ouverture de hanche, fente basse,
  rotation thoracique). Import : découpe, cadre commun, fond ramené au papier, WebP (1,2 Mo au total).
- 3 nov. 2026 : verdict de Seb sur les pictogrammes corrigés : « pas terrible ». Choix : images IA,
  2 par exercice. Code prêt (ExerciseVisual, lib/demos.ts, scripts/assets/import-demos.mjs : cadre 4:3,
  fond papier) ; kit de prompts et checklists pour 45 exercices dans docs/guides/demos-ia.md.
- 3 nov. 2026 : lot 4. Audit des 42 pictogrammes réellement affichés (séances × matériel + routines
  douleur) sur planche contact (docs/pictogrammes/, outil scripts/assets/build-figure-sheet.mjs + /lab-figures
  en dev). Corrigés : dead bug (bras à travers le sol), planche latérale genoux au sol, pompes
  scapulaires (banc et mur, deux figures), squat assisté (mains au montant), montée de marche (tête
  hors cadre), rotation thoracique (main derrière la tête), curl haltères (haltères, plus d'élastique),
  rétraction sans élastique, Y-T debout. Nouveau repère « rotation » (flèche courbe) pour ce qui tourne
  sur soi : pronation-supination, poignets, chevilles, 90/90, essuie-glaces, ouverture de hanche.
- 3 nov. 2026 : logo (monogramme W), accueil épuré (Legs, Upper, Bas retiré), disques en pastilles,
  frise en segments ; routine « Une douleur ? » (lib/rehab.ts) à la place de « Mes zones » ; plan
  réduit au matériel + ↻ Varier. Vérifs lot 2 : contraste AA clair/sombre sur 8 écrans
  (scripts/bench/contrast.js), focus visible sur les aplats, Échap et focus dans le mode guidé,
  focus du panneau stabilisé, mouvement réduit et hors ligne relus. Open data v2 (routines par
  séance × matériel, routines douleur) et llms.txt à jour. Complément lombaire abandonné.
- 2 nov. 2026 : lot 1 bis, moteur v3 (branche bloc/moteur-v3). Routines du brief, variantes par
  matériel, « Mes zones » par tours (chaque zone servie, exercice partagé d'abord, bras = biceps +
  triceps), remplacements signalés (« Remplace : … »). Contrôles : 7 980 routines, 0 écart.
  Landings (13 « En bref », FAQ), /methodologie, llms.txt et FAQ réécrits sans cardio. Crawl 54 URL OK.
- 2 nov. 2026 : bloc lots 0-1-2 + audit pictogrammes fusionné en main et en ligne (crawl 54 URL OK,
  contraste clair/sombre OK, IndexNow 46 URL). Lot 3 : docs/archive/2026-11-maquettes/directions.html, deux
  directions (A « chrono de salle », B « affiche de compétition ») sur accueil, plan, mode guidé.
- 2 nov. 2026 : lot 4, audit des 50 pictogrammes sélectionnables (départ/arrivée). Corrigés : charnière
  de hanche (mains sur les hanches), tractions scapulaires (coudes tendus), W allongé (sur le ventre).
  Limites connues des pictogrammes 2D : les rotations ne se voient pas (rotation du buste debout,
  pronation-supination, cercles de hanches) ; rotation externe « allongé sur le côté » dessinée sur le
  dos. Piste : illustrations fixes départ → arrivée avec flèches de rotation (lot 3/4).
- 2 nov. 2026 : lot 2. Mode guidé : pause/reprise de tout minuteur, chrono proposé pour les positions
  tenues (signal de changement de côté à mi-temps), raison de chaque exercice affichée, on peut passer
  à tout moment. Accueil : sous l'outil, un index sobre (3 colonnes de liens, 5 questions) au lieu des
  cartes, doublons et 11 FAQ. Reste : transition vers le plan (jugée non nécessaire pour l'instant).
- 2 nov. 2026 : lot 1. Nouveau moteur fondé sur des besoins de coach (lib/prep-catalog.ts : 26 besoins,
  leur liste d'exercices et leur raison ; besoins par zone ; position de chaque exercice). Besoins
  additionnés entre zones, besoin principal de chaque zone servi d'abord, couverture unique, bras et
  gainage secondaires avec d'autres zones, biceps/triceps selon tirage/poussée, répétition du geste
  au poids du corps, ordre debout → sol → debout. Contrôles : scripts/bench/engine-checks.ts
  (5 080 routines, 0 écart). Résumés « En bref » des 13 landings réécrits selon les nouveaux plans,
  /methodologie réécrite (principes, prouvé / choisi / à valider, sources corrigées).
  Reste : validation de Seb (docs/decisions-a-prendre.md).
- 2 nov. 2026 : lot 0 fait (branche bloc/produit-v1). Séances récentes dédupliquées par composition ; routine stable, la séance déjà faite se rouvre avec ses réglages ; fin de mode guidé adaptée (échauffement ou montée, exercices passés comptés) ; durée avec transitions (10 s, +15 s au changement de matériel) ; durées des landings et de la version courte calculées par le moteur ({min}, {court}) ; FAQ de l'accueil réécrites (cardio, étirements, douleurs, squat). Constats pour le lot 1 : version courte à 2 min, plan « bras » à 3 exercices, durées de 3 à 8 min selon les zones.
- 2 nov. 2026 : 3D retirée à 100 % (code, animations, scripts, brief).
- 2 nov. 2026 : plan créé à partir du verdict de Seb et de l'audit ChatGPT. Anomalies du lot 0
  vérifiées dans le code : séances récentes (confirmé), durée sans transitions (confirmé),
  message de fin (confirmé).

- 2 nov. 2026 : direction B choisie par Seb, implémentation en cours sur la branche bloc/direction-b (tokens, Anton + .poster, accueil, plan, mode guidé, landings). Reste : contrôle contraste clair/sombre, pages de contenu, OG images, build + crawl, puis merge en main.
