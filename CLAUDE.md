@AGENTS.md

# Warmup Generator

Application web publique de génération d'échauffements personnalisés pour la musculation.

## Stack
- **Framework** : Next.js 15 (App Router)
- **Style** : Tailwind CSS, thème dark
- **Langage** : TypeScript
- **Déploiement** : Vercel

## Lancer le projet
```bash
npm run dev      # dev sur http://localhost:3000
npm run build    # build production
npm run lint     # vérifier le code
```

## Structure cible
```
app/
  page.tsx              # Page de configuration (muscles, objectif, durée)
  result/page.tsx       # Page de résultat (plan généré)
  layout.tsx            # Layout global dark
lib/
  warmup-data.ts        # Base de données des exercices
  warmup-engine.ts      # Algorithme de génération du plan
components/
  MuscleChip.tsx        # Bouton pill sélectionnable
  ObjectiveCard.tsx     # Carte sélectionnable (Force / Hypertrophie / etc.)
  DurationPicker.tsx    # Sélecteur 3 / 5 / 8 min
  ExerciseCard.tsx      # Carte exercice dans le résultat
```

## Fonctionnalités
1. Sélection groupes musculaires (Pecs, Dos, Épaules, Jambes, Fessiers, Bras, Core)
2. Objectif (Force, Hypertrophie, Reprise, Mobilité)
3. Zones sensibles (Aucune, Épaule, Genou, Bas du dos, Hanches, Poignets)
4. Durée (3, 5 ou 8 min)
5. Plan séquencé : articulaire → activation → spécifique

## Philosophie produit
- **100% gratuit**, aucune monétisation, aucun affiliation, aucun emailing
- **Zéro coût serveur** : pas d'API externe, tout tourne en local dans le navigateur
- La génération du plan est purement algorithmique (JS statique, pas d'IA)
- L'outil doit fonctionner même hors ligne (PWA à terme)

## Stratégie SEO (priorité)
- Cible : grand public francophone qui ne sait pas comment s'échauffer en salle
- Keywords principaux : "échauffement musculation", "exercices échauffement avant séance", "s'échauffer avant musculation"
- Next.js SSR/SSG pour un score Core Web Vitals maximal
- Métadonnées complètes sur chaque page (title, description, og:image)
- Données structurées JSON-LD (HowTo schema) pour apparaître en featured snippet Google
- URL lisibles : `/echauffement-pecs-force`, `/echauffement-dos-hypertrophie`, etc.
- Page blog/guide : articles statiques sur l'importance de l'échauffement
- Sitemap XML généré automatiquement

## Conventions
- Composants en PascalCase
- Pas de `any` TypeScript
- Thème dark : background #0f1117, accent vert #22c55e
- Mobile-first (audience principale = utilisateurs en salle avec leur téléphone)
- Aucun tracking, aucun cookie, aucune dépendance externe payante
