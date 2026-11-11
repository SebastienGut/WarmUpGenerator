# Warmup Generator

Deux outils d'échauffement pour la musculation, volontairement séparés :

- **Le générateur** : on choisit sa séance (Push, Pull, Legs, Upper, Full body) et son
  matériel (sans matériel, élastique, salle) ; on obtient une routine de 6 minutes,
  mobilité puis activation, avec démonstration de chaque exercice et un mode guidé.
  Une zone sensible ajoute un ou deux exercices doux ; « Une douleur ? » propose une
  routine de soin dédiée.
- **Le calculateur de séries d'approche** : à partir de la charge de travail du jour,
  il donne la montée en charge (paliers, répétitions, repos, disques par côté).

**[warmup-generator.com](https://warmup-generator.com)** · Gratuit, sans publicité,
sans inscription, sans collecte de données.

---

## Pour les coachs et préparateurs physiques

- **Ce que fait l'outil.** Une routine de référence par séance type, mobilité puis activation,
  sans cardio ni étirement long ; la montée en température se fait ensuite sur le premier
  exercice, avec les séries d'approche. Les routines sont listées par séance et par matériel
  avec `npm run routines`.
- **Ce qui est prouvé, ce qui est choisi.** La [méthodologie](https://warmup-generator.com/methodologie)
  sépare ce qui s'appuie sur la recherche (effet de l'échauffement sur la performance, coût des
  étirements statiques longs) de ce qui relève de choix de programmation (exercices, doses,
  ordre). Les doses sont des choix assumés, pas des valeurs démontrées.
- **Des sources vérifiables.** Les pages de contenu citent leurs études avec un lien PubMed
  ([`lib/content/sources.ts`](lib/content/sources.ts)) ; aucune référence n'est ajoutée sans avoir
  été retrouvée dans PubMed.
- **Des règles contrôlées.** `npm run check` vérifie 62 547 combinaisons (séance, matériel,
  zones sensibles) : pas de doublon de fonction, pas d'exercice contre-indiqué pour une zone
  sensible, mobilité avant activation, matériel respecté.
- **Une erreur, un désaccord ?** Ouvre une
  [issue « Correction d'exercice »](https://github.com/SebastienGut/WarmUpGenerator/issues/new?template=correction-exercice.md) :
  consigne, dose, choix d'exercice ou source. Les retours de professionnels sont les bienvenus.

---

## Les contraintes du projet

- **Zéro coût serveur.** Pas d'API externe, pas de base de données, pas d'IA en ligne :
  tout est calculé dans le navigateur.
- **Pas de tracking publicitaire, pas de cookie.** Seule mesure d'audience :
  [GoatCounter](https://www.goatcounter.com/), sans cookie ni donnée personnelle.
- **Fonctionne hors ligne** (service worker) : la salle a souvent un mauvais réseau.
- **Mobile-first** : l'utilisateur est debout, téléphone en main, entre deux séries.

## Comment ça marche

- [`lib/routines.ts`](lib/routines.ts) : une routine de référence par séance type, et la base
  de chaque zone pour les pages par zone.
- [`lib/bank.ts`](lib/bank.ts) : les exercices, avec leur variante par matériel et un
  remplacement honnête (ou un retrait) quand il n'en existe pas.
- [`lib/session-engine.ts`](lib/session-engine.ts) : assemble le plan (variantes, zone sensible,
  durée réelle) ; vérifié sur toutes les combinaisons par `npm run check`.
- [`lib/rehab.ts`](lib/rehab.ts) : routines « Une douleur ? » et exercices ajoutés pour une zone sensible.
- [`lib/approach-sets.ts`](lib/approach-sets.ts) : séries d'approche (dernier palier lourd, sauts
  réguliers, répétitions décroissantes, arrondi aux disques réels).
- Démonstrations : deux images par exercice (`public/demos/`, liste dans [`lib/demos.ts`](lib/demos.ts)) ;
  à défaut, un pictogramme animé ([`lib/figure.ts`](lib/figure.ts), [`lib/figures.ts`](lib/figures.ts)).

## Structure

```
app/                     Pages (Next.js App Router), toutes statiques
  page.tsx               Accueil : choix de la séance
  plan/                  Plan calculé dans le navigateur, mode guidé
  routine-douleur/       Routine « Une douleur ? »
  series-approche/       Calculateur de séries d'approche
  echauffement/          Pages par séance et par zone, guides par exercice, protocoles
  douleur/, blog/        Contenus éditoriaux
  donnees/, api/exercices/, llms.txt/   Données ouvertes et description pour les IA
  lab-figures/           Planche des pictogrammes (développement uniquement)
components/              Composants React (plan, mode guidé, calculateur, gabarits)
lib/                     Moteur, données d'exercices, contenus (lib/content/)
public/                  Icônes, démonstrations (demos/), service worker
brand/                   Logo source et sources des démonstrations (images brutes hors dépôt)
assets/fonts/            Police des images de partage (Open Graph)
dataset/                 Export du référentiel d'exercices (fichiers JSON)
scripts/
  bench/                 Contrôles : moteur, routines, crawl, contraste
  assets/                Logo et icônes, import des démonstrations, planche des pictogrammes
  seo/                   IndexNow, export des données, génération d'article
docs/                    Plan produit, décisions, guides, archives
```

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run lint
npm run check      # contrôle du moteur sur toutes les combinaisons
npm run routines   # affiche les routines par séance et par matériel
npm run crawl      # vérifie toutes les pages (serveur de prod sur le port 3100)
npm run demos      # importe les démonstrations depuis brand/demos/
npm run logo       # régénère favicon et icônes depuis brand/logo-warmup.png
npm run indexnow   # signale les pages à Bing après un déploiement
```

Next.js 16 · TypeScript · Tailwind CSS 4 · déployé sur Vercel à chaque push sur `main`.

## Données ouvertes

Routines du générateur et référentiel d'exercices, sous **CC BY 4.0** :

```bash
curl https://warmup-generator.com/api/exercices
```

Documentation : **[warmup-generator.com/donnees](https://warmup-generator.com/donnees)**.
Aussi publié sur Hugging Face :
[fabdigstudio/warmup-exercises-fr](https://huggingface.co/datasets/fabdigstudio/warmup-exercises-fr).

## Licence

**Code : [AGPL-3.0](LICENSE).** Libre d'utilisation, de modification et de redistribution ;
toute version modifiée, y compris déployée comme service en ligne, doit être publiée sous la
même licence. Ce projet est gratuit et le restera, ses dérivés aussi.

**Données : [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).** Réutilisation
libre, y compris commerciale, avec attribution.
