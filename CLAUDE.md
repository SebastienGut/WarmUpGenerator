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
  echauffement/, douleur/, blog/   # Pages SEO statiques
lib/
  lifts.ts                # Exercices de séance et leurs exigences (entrée du moteur)
  warmup-data.ts          # Exercices de préparation annotés (prepFocus, contre-indications…)
  session-engine.ts       # Moteur : mise en route → mobilité → activation → séries d'approche
  approach-sets.ts        # Paliers de montée en charge et disques par côté
  seo-plan.ts             # Plans des pages SEO, produits par le moteur
  saved-sessions.ts       # Séances récentes (localStorage, sur l'appareil)
  figure.ts, figures.ts   # Moteur de pictogrammes animés + postures de chaque exercice
components/
  SessionBuilder.tsx, PlanView.tsx, GuidedMode.tsx, Plates.tsx, ApproachCalculator.tsx
  ExerciseFigure.tsx, Sheet.tsx                  # Pictogramme animé, panneau coulissant
  SEOPage.tsx, SEOHubPage.tsx, BlogArticle.tsx   # Gabarits éditoriaux
```

## Fonctionnalités
1. Choix des exercices de la séance (catalogue + séances types Push, Pull, Jambes…)
2. Charge et répétitions de la première série (facultatif)
3. Zones qui coincent (épaule, coude, poignet, bas du dos, hanche, genou, cheville)
4. Options : élastique disponible, version courte
5. Plan RAMP : mise en route → mobilité → activation → séries d'approche
6. Mode guidé plein écran (repos décomptés, écran maintenu allumé), séances récentes

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
- Ne pas générer de pages sans demande de recherche réelle (leçon de la matrice muscle × objectif)

## Conventions
- Composants en PascalCase
- Pas de `any` TypeScript
- Design « fiche de séance du coach » : papier/encre + accent vermillon, tokens dans `app/globals.css` (`bg-paper`, `text-ink`, `text-muted`, `text-subtle`, `border-line`, `bg-accent`, `text-accent-ink`…). Jamais de couleur hex en dur dans les composants.
- Typo : `font-display` (Barlow Condensed) pour titres et chiffres, Geist pour le texte. Petit texte d'accent en `text-accent-ink` (contraste AA).
- Disques de charge : composant `Plates` aux couleurs de compétition (25 rouge, 20 bleu, 15 jaune, 10 vert, 5 blanc).
- Mobile-first (audience principale = utilisateurs en salle avec leur téléphone)
- Animations d'entrée en CSS (`anim-rise`, `anim-slide`, `anim-grow`) : jamais d'opacité 0 inscrite par JS dans le HTML serveur. framer-motion réservé aux interactions.
- Tout nouvel exercice (lib/warmup-data.ts ou lib/lifts.ts) doit avoir sa posture dans lib/figures.ts.
- Aucun tracking, aucun cookie, aucune dépendance externe payante
