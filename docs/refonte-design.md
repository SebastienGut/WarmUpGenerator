# Refonte design — brief pour la prochaine session

> À lancer avec : « Lis docs/refonte-design.md et applique le skill frontend-design. »
> Le skill est installé localement dans `.claude/skills/frontend-design/` (ignoré par git).

## Constat (Seb, oct. 2026)
- Il veut un rendu au niveau des meilleures apps actuelles : mise en page, visuels, UI/UX, mouvement.
- Le design actuel coche plusieurs « signes IA » listés par le skill :
  fond papier crème + accent vermillon, petits titres en CAPITALES au-dessus des blocs,
  numérotation 01/02/03, méta jointes par « · », « → » ajoutés aux boutons, cartes arrondies identiques.
- Les pictogrammes en bâtons (lib/figure.ts) sont le maillon faible visuel.

## Contraintes qui ne bougent pas
- Deux outils distincts : échauffement par zones / séance type, et calculateur de séries d'approche.
  Ne jamais présumer les exercices de la séance.
- Peu de texte visible, fluide, un tap pour avoir son plan. Mobile d'abord (téléphone en salle).
- SSR lisible par les moteurs : pas d'opacité 0 inscrite par JS, contenu des plans dans le HTML.
- Pas de coût serveur, pas de tracking, pas de `any`, couleurs via tokens dans app/globals.css.
- Landings /echauffement/[slug] : l'outil est le contenu (InlinePlan). Garder H1, « En bref », FAQ, JSON-LD.

## Démarche (imposée par le skill)
1. Demander à Seb 3 à 5 références (Mobbin, Godly, Refero…) et ce qui lui plaît dans chacune
   si elles ne sont pas déjà dans la conversation.
2. Ancrer le design dans le sujet : la salle de muscu (fonte, magnésie, disques de compétition,
   carnet d'entraînement, chrono, tableau blanc du coach) plutôt que la « fiche papier » générique.
3. Plan de tokens compact (4–6 couleurs nommées, 1–2 familles typo, concept de mise en page
   avec wireframes ASCII, principes), puis le relire contre les signes IA et réviser.
4. Proposer 3 directions en maquette (artefact Design ou HTML) sur les 3 écrans clés,
   mobile : accueil (SessionBuilder), plan (PlanView / InlinePlan), mode guidé (GuidedMode).
5. Seb choisit → poser le système (tokens, échelle typo, espacements, règles de mouvement)
   → refaire les écrans un par un, captures avant/après, check contraste/débordement.
6. Un seul moment de mouvement orchestré par écran ; les animations répondent aux actions.

## Animations d'exercices
- Option A (recommandée par défaut) : moteur procédural haut de gamme — corps pleins plutôt que traits,
  3+ images clés avec easing, ombre au sol, respiration au repos, zone travaillée qui s'allume.
  Montrer 3 exercices en maquette avant de migrer les 117.
- Option B : Rive. Seb a créé un compte rive.app. Intégration via `@rive-app/react-canvas` :
  un fichier .riv, un artboard par exercice nommé comme l'id du code, une state machine en boucle ;
  fallback sur les pictogrammes procéduraux. Les .riv ne peuvent être créés que dans l'éditeur Rive.

## Fichiers clés
app/globals.css (tokens), components/SessionBuilder.tsx, PlanView.tsx, PlanParts.tsx, InlinePlan.tsx,
LandingPage.tsx, GuidedMode.tsx, ApproachCalculator.tsx, ExerciseFigure.tsx, lib/figure.ts, lib/figures.ts.
Vérif : `npm run build`, serveur « prod » (.claude/launch.json, port 3100), puis crawl + contraste.
