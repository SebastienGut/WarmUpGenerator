# Checklist — ce qui reste à faire

Mise à jour du 17 août 2026, en fin de session.

---

## Déjà fait

**Mise en production**
- Contenu déployé et vérifié : 14 URL en 200, dont les 6 pages douleur,
  `/douleur`, `/donnees`, `/api/exercices`, `/llms.txt`
- `schema.org/Dataset` servi sur `/donnees`
- Endpoint JSON conforme : 52 exercices, CC BY 4.0, CORS ouvert
- Accents corrigés dans les titres servis
- Cluster douleur lié depuis la homepage

**Dépôt GitHub**
- Passé en **public**, licence **AGPL-3.0** détectée
- Description, homepage et 8 topics renseignés
- Audit préalable clean : 66 commits scannés, aucun secret

**Search Console**
- Sitemap soumis, **45 URL** (élagage de la matrice, 73 → 45)
- Indexation demandée pour les 8 nouvelles pages
- Mesure de référence relevée au 14/08 : **30 indexées / 69 connues**, dont
  **34 en « Détectée, actuellement non indexée »**

---

## Le point de mesure, dans 2 à 3 semaines

C'est maintenant la chose la plus utile à faire : **attendre sans rien toucher**.
Google doit recrawler pour que l'élagage produise de l'information.

Vers le **7 septembre 2026**, relever dans **Pages → Non indexées** :

- le nombre en « Détectée, actuellement non indexée » — il était à **34**
- le nombre total d'indexées — il était à **30**

S'il descend côté « Détectée », l'élagage a fonctionné. Si les 6 pages douleur
sont indexées et commencent à afficher des impressions, le pivot fonctionne.

Ne pas ajouter de pages d'ici là : la deuxième vague de pages douleur attend
précisément cette mesure.

---

## 1. Publier le jeu de données sur Hugging Face

Les fichiers sont **déjà générés et validés**, tu n'as rien à rédiger ni à
convertir. Je te les ai envoyés dans la conversation :

- `exercises.jsonl` — 52 lignes, une par exercice, format idiomatique HF
- `README.md` — la fiche du jeu de données, avec l'en-tête YAML que Hugging Face
  attend (licence, langue, tags, configuration)
- `exercises.json` — la version complète avec les référentiels de libellés, si tu
  préfères ce format

**Marche à suivre** — https://huggingface.co/new-dataset

1. Nom du dataset : `warmup-exercises-fr`
2. Licence : `cc-by-4.0`
3. Visibilité : Public
4. Créer, puis dans l'onglet **Files** → **Add file** → **Upload files**
5. Déposer `exercises.jsonl` et `README.md` à la racine
6. Commit

La fiche s'affiche automatiquement à partir du `README.md`, et Hugging Face
détecte la licence et les tags depuis son en-tête YAML.

### Zenodo, optionnel — https://zenodo.org/uploads/new

Zenodo attribue un **DOI**, ce qui rend le jeu de données citable dans un travail
académique. Déposer `exercises.json`, licence CC BY 4.0, même titre et même
description que la fiche Hugging Face.

---

## 2. Product Hunt

Un seul lancement possible, à ne pas gâcher. Mardi ou mercredi matin heure du
Pacifique est le créneau habituellement le plus favorable.

- **Tagline** (60 caractères max)

  ```
  Personalized gym warm-ups in 30 seconds, free and offline
  ```

- **Description**

  ```
  Warmup Generator builds a warm-up routine tailored to the muscles you're
  training, your session goal, and any joints that bother you — in about 30
  seconds.

  No account, no ads, no cookies, no personal data. The algorithm runs entirely
  in your browser, so it works offline in the gym where reception is usually
  bad. The only analytics is GoatCounter, which is cookieless.

  What makes the selection non-trivial: every exercise is annotated with both
  contraindications and pain-support data. Declaring a sensitive shoulder
  doesn't just remove exercises — it brings different ones in.

  The exercise dataset is open under CC BY 4.0, and the code is AGPL-3.0 on
  GitHub.
  ```

- **Premier commentaire à poster**

  ```
  I built this because warming up properly is the one thing everyone knows they
  should do and nobody actually plans. Existing routines are generic; what you
  need depends on what you're training and which joints are giving you trouble
  that week.

  The interesting part was the selection algorithm — covering every requested
  muscle group, respecting the mobilization → activation → specific sequence,
  excluding contraindicated movements, reserving a slot for exercises that
  actively help a declared sensitive zone, avoiding two variants of the same
  movement, and fitting it all in the chosen duration.

  Free forever, no monetization planned. Dataset and code are open. Happy to
  answer anything.
  ```

---

## 3. Bonus, sans urgence

Rendement faible.

- **alternativeto.net** — fiche outil
- **Indie Hackers** — post « I built »
- **Hacker News** — `Show HN: Warmup Generator – free offline gym warm-up planner (open dataset)`
- **awesome-lists GitHub** — pull request vers une liste fitness ou open data

Éviter tout service promettant des inscriptions massives en annuaires : c'est
exactement le profil de liens que Google ignore au mieux, sanctionne au pire.

---

## Côté code, pour une prochaine session

- **Deuxième vague de pages douleur** — dips/épaule, développé militaire/épaule,
  hip thrust/lombaires, fentes/genou. À faire **après** avoir vu les données GSC
  des six premières : produire du volume avant d'avoir vérifié la demande est
  précisément l'erreur de la matrice muscle × objectif.
- **Feature silhouettes** — `components/ExerciseSilhouette.tsx`,
  `public/exercices/*.svg` et `scripts/generate-silhouettes.mjs` sont encore non
  suivis. Travail en cours volontairement laissé de côté.
- **Mesure** — la Search Console ne montrera pas les citations dans ChatGPT ou
  Perplexity. Le signal indirect est une hausse du trafic direct et référent sans
  mouvement correspondant des impressions Google.
