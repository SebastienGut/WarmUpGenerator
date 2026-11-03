@AGENTS.md

# Warmup Generator

Application web publique de génération d'échauffements personnalisés pour la musculation.

## Stack
- **Framework** : Next.js 16 (App Router) — lire `node_modules/next/dist/docs/` avant d'écrire du code
- **Style** : Tailwind CSS v4, tokens sémantiques (clair/sombre selon le système)
- **Langage** : TypeScript
- **Déploiement** : Vercel

## Lancer le projet
```bash
npm run dev      # dev sur http://localhost:3000
npm run build    # build production
npm run lint     # vérifier le code
```

## Structure
```
app/
  page.tsx                # Accueil : choix de la séance (SessionBuilder)
  plan/page.tsx           # Plan, calculé dans le navigateur à partir de l'URL (PlanView)
  routine-douleur/        # Routine de soin « Une douleur ? » (RehabView)
  series-approche/        # Calculateur de séries d'approche
  result/page.tsx         # Ancienne URL, redirige vers /plan
  echauffement/[slug]/    # Pages d'atterrissage (push, jambes, épaules…) : l'outil EST le contenu
  echauffement/, douleur/, blog/   # Pages SEO statiques
  lab-figures/            # Planche des pictogrammes, dev uniquement (404 en production)
lib/
  routines.ts, bank.ts    # Routines de référence par séance, banque d'exercices et variantes par matériel
  session-engine.ts       # Moteur : mobilité → activation (+ zone sensible) ; séries d'approche du mode guidé
  rehab.ts                # Routines « Une douleur ? » et exercices ajoutés pour une zone sensible
  approach-sets.ts        # Paliers de montée en charge et disques par côté
  lifts.ts                # Exercices de séance (séances types, pages exercice)
  warmup-data.ts          # Référentiel d'exercices annotés (pages SEO, open data)
  demos.ts                # Démonstrations disponibles (généré par npm run demos)
  figure.ts, figures.ts   # Pictogrammes animés (repli quand une démonstration manque)
  content/                # Contenus éditoriaux (landings, douleur, protection, exercice)
  saved-sessions.ts, equipment-pref.ts   # Séances récentes et matériel, sur l'appareil
components/
  SessionBuilder, PlanView, RehabView, GuidedMode, ApproachCalculator   # Écrans
  PlanParts, InlinePlan, LandingPage, ExerciseVisual, ExerciseFigure, Plates, Sheet, Logo
  SEOPage, SEOHubPage, BlogArticle, HomepageSEO                           # Gabarits éditoriaux
scripts/bench/ (contrôles), scripts/assets/ (logo, démos, planche), scripts/seo/ (IndexNow, dataset, article)
docs/ : plan-produit.md, decisions-a-prendre.md, guides/, seo/, archive/
```
Commandes utiles : `npm run check` (moteur), `npm run routines`, `npm run crawl`, `npm run demos`,
`npm run logo`, `npm run indexnow`.

## Fonctionnalités
Deux outils **distincts** (décision de Seb : ne pas mêler échauffement et montée en charge) :
1. **Générateur d'échauffement** — séance type (Push, Pull, Legs, Upper, Full body) ; routines de référence
   (lib/routines.ts, lib/bank.ts), mobilité → activation, sans cardio ; matériel sans / élastique / salle.
   Pages par zone (landings) composées par le moteur. Mode guidé, ↻ Varier, séances récentes.
   **Une douleur ?** (/routine-douleur, lib/rehab.ts) — zones douloureuses → routine de soin plus longue
   (mobilité douce, renforcement léger), règle des 3/10 à cocher, renvoi discret vers un professionnel.
2. **Calculateur de séries d'approche** (/series-approche) — exercice + charge de travail du jour + reps
   → montée en charge avec disques, déroulable avec minuteur de repos.

## Philosophie produit
- **100% gratuit**, aucune monétisation, aucun affiliation, aucun emailing
- **Zéro coût serveur** : pas d'API externe, tout tourne en local dans le navigateur
- La génération du plan est purement algorithmique (JS statique, pas d'IA)
- L'outil fonctionne hors ligne (service worker, pages-outils mises en cache)

## Stratégie SEO / GEO
- Cible : pratiquants francophones qui veulent savoir comment s'échauffer en salle
- Keywords : "échauffement musculation", "échauffement [exercice]", "séries d'approche", requêtes symptôme ("mal à l'épaule au développé couché")
- SSG partout, métadonnées complètes, og:image par section
- JSON-LD : BreadcrumbList, Article, WebApplication, Dataset (HowTo et FAQPage retirés : plus de rich results)
- GEO : blocs « En bref » autoportants, `/llms.txt`, open data `/api/exercices` (CC BY 4.0), IndexNow pour Bing
- Ne pas générer de pages sans demande de recherche réelle (matrice muscle × objectif et combos retirés en oct. 2026, redirigés en 301)

## Conventions
- Composants en PascalCase
- Pas de `any` TypeScript
- Design « affiche de compétition » (direction B, choisie par Seb le 2 nov. 2026 ; maquettes :
  docs/archive/2026-11-maquettes/directions.html) : papier clair, grands aplats aux couleurs des disques (`bg-blue`,
  `bg-green`, `bg-yellow`, `bg-black`, `bg-accent` rouge), bandeaux d'affiche en tête des écrans clés.
  Phases = disques : mise en route vert (`ph-raise`), mobilité jaune (`ph-mobility`), activation bleu
  (`ph-activation`), action rouge (`accent`). `StepBar` (PlanParts, un segment par exercice) est la frise
  du plan et la jauge du mode guidé ; plus de barre chargée dessinée (refusée par Seb). Tokens dans `app/globals.css`. Jamais de couleur hex en dur dans les composants (exception :
  variables locales de couleur des pictogrammes posés sur un aplat).
- Typo : Anton (`font-display`, une seule graisse) pour titres et chiffres, classe `.poster` pour
  l'inclinaison des grands titres ; Archivo pour le texte. Pas de texte transparent sur les aplats
  (contraste AA). Boutons d'action : pilule noire.
- Disques de charge : composant `Plates`, une pastille ronde par disque, poids écrit dessus, aux couleurs de
  compétition (25 rouge, 20 bleu, 15 jaune, 10 vert, 5 blanc).
- Logo : dessin de Seb (W en ruban finissant en flèche montante), source `brand/logo-warmup.png` ;
  favicon, icônes d'app et `public/logo-mark.png` (en-têtes) générés par `python scripts/assets/build-logo.py`.
- Mobile-first (audience principale = utilisateurs en salle avec leur téléphone)
- Mouvement : un seul moment non déclenché (le chargement des disques, `plate-load`) ; le reste répond aux actions. Animations d'entrée en CSS, jamais d'opacité 0 inscrite par JS dans le HTML serveur. framer-motion réservé aux interactions.
- Tout nouvel exercice (lib/warmup-data.ts ou lib/lifts.ts) doit avoir sa posture dans lib/figures.ts.
- Démonstrations : images IA (2 par exercice, départ/arrivée) dans brand/demos/, importées par
  `node scripts/assets/import-demos.mjs` vers public/demos/ et lib/demos.ts ; `ExerciseVisual` les affiche, sinon le
  pictogramme. Prompts et checklists : docs/guides/demos-ia.md. Toute image est relue contre sa checklist avant import.
- Aucun tracking, aucun cookie, aucune dépendance externe payante
