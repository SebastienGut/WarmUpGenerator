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
  page.tsx                # Constructeur de séance (SessionBuilder)
  plan/page.tsx           # Plan, calculé dans le navigateur à partir de l'URL (PlanView)
  series-approche/        # Calculateur de séries d'approche
  result/page.tsx         # Ancienne URL, redirige vers /plan
  echauffement/[slug]/    # Pages d'atterrissage (haut-du-corps, jambes, push…) : l'outil EST le contenu
  echauffement/, douleur/, blog/   # Pages SEO statiques
lib/
  lifts.ts                # Exercices de séance et leurs exigences (entrée du moteur)
  warmup-data.ts          # Exercices de préparation annotés (prepFocus, contre-indications…)
  session-engine.ts       # Moteur : mise en route → mobilité → activation → séries d'approche
  approach-sets.ts        # Paliers de montée en charge et disques par côté
  seo-plan.ts             # Plans des pages SEO, produits par le moteur
  content/landings.ts     # Pages d'atterrissage : zones, réponse « En bref », FAQ, liens
  saved-sessions.ts       # Séances récentes (localStorage, sur l'appareil)
  figure.ts, figures.ts   # Moteur de pictogrammes animés + postures de chaque exercice
components/
  SessionBuilder.tsx, PlanView.tsx, GuidedMode.tsx, Plates.tsx, ApproachCalculator.tsx
  PlanParts.tsx, InlinePlan.tsx, LandingPage.tsx  # Briques de plan partagées, plan intégré aux landings
  ExerciseFigure.tsx, Sheet.tsx                  # Pictogramme animé, panneau coulissant
  SEOPage.tsx, SEOHubPage.tsx, BlogArticle.tsx   # Gabarits éditoriaux
```

## Fonctionnalités
Deux outils **distincts** (décision de Seb : ne pas mêler échauffement et montée en charge) :
1. **Générateur d'échauffement** — séance type (Push, Pull, Jambes, Haut, Bas, Full body) ou zones au choix ;
   zones qui coincent ; élastique ; version courte. Plan : mise en route → mobilité → activation.
   Ne présume jamais des exercices de la séance. Mode guidé, variantes (↻ Varier), séances récentes.
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
- Design « l'échauffement charge la barre » (brief et plan : docs/refonte-design.md, skill frontend-design) :
  fond magnésie, encre fonte, couleurs des disques comme seule source de couleur. Phases = disques :
  mise en route vert (`ph-raise`), mobilité jaune (`ph-mobility`), activation bleu (`ph-activation`),
  travail/action rouge (`accent`). Signature : `Barbell` (PlanParts) — un disque par exercice, frise du plan
  et jauge du mode guidé. Tokens dans `app/globals.css`. Jamais de couleur hex en dur dans les composants.
- Typo : une seule famille, Archivo variable. `font-display` = largeur étendue (titres, chiffres), en casse
  de phrase. Proscrits : capitales pour les libellés, surtitres, méta jointes par « · », « → » décoratifs,
  numérotation 01/02/03 hors vraie séquence, grilles de cartes identiques.
- Disques de charge : composant `Plates` aux couleurs de compétition (25 rouge, 20 bleu, 15 jaune, 10 vert, 5 blanc).
- Mobile-first (audience principale = utilisateurs en salle avec leur téléphone)
- Mouvement : un seul moment non déclenché (le chargement des disques, `plate-load`) ; le reste répond aux actions. Animations d'entrée en CSS, jamais d'opacité 0 inscrite par JS dans le HTML serveur. framer-motion réservé aux interactions.
- Tout nouvel exercice (lib/warmup-data.ts ou lib/lifts.ts) doit avoir sa posture dans lib/figures.ts.
- Aucun tracking, aucun cookie, aucune dépendance externe payante
