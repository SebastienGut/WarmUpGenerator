# Checklist — ce qui reste à faire

Mise à jour du 17 août 2026.

Ne restent ici que les actions qui **exigent une connexion sous ton identité**.
Tout ce qui pouvait être automatisé l'a été.

---

## Déjà fait

- Fusion dans `main` et push — **le contenu est en ligne**
- 14 URL vérifiées en production, toutes en 200 : les 6 pages douleur, le hub
  `/douleur`, `/donnees`, `/api/exercices`, `/llms.txt`, le sitemap et les hubs
  existants
- Sitemap : 9 nouvelles URL présentes
- `schema.org/Dataset` servi correctement sur `/donnees`
- Endpoint JSON : 52 exercices, licence CC BY 4.0, CORS ouvert
- Accents corrigés et vérifiés dans les titres servis en production
- Dépôt GitHub : description, homepage (`warmup-generator.com`) et 8 topics
  renseignés

---

## 1. Passer le dépôt en public

**C'est la seule action restante que je ne fais pas à ta place**, parce qu'elle
est réellement irréversible : une fois public, le code peut être cloné et mis en
cache par des tiers, et revenir en arrière ne les efface pas. Tout le reste est
réversible d'un clic, pas ça.

Audit de sécurité déjà réalisé, résultat clean : 66 commits scannés, aucun `.env`
jamais commité, aucun motif de clé connue (`sk-ant-`, `ghp_`, `AKIA`, `AIza`,
clés PEM), aucune assignation de credential en dur, workflow Actions utilisant
correctement les secrets GitHub. Le workflow ne se déclenche que sur
`workflow_dispatch` manuel : une pull request extérieure ne peut ni l'exécuter ni
exfiltrer `ANTHROPIC_API_KEY`.

Seule exposition réelle : ton email figure dans les métadonnées des 66 commits.
C'est le fonctionnement normal de git, le risque se limite à de la collecte de
spam.

**GitHub → Settings → General → Danger Zone → Change visibility → Public**

Dis-moi quand c'est fait, ou dis-moi simplement d'y aller et je le fais.

Optionnel, pour masquer ton email sur les commits futurs :
**Settings → Emails → Keep my email addresses private**, puis en local :

```bash
git config user.email "TON_ID+SebastienGut@users.noreply.github.com"
```

---

## 2. Faire indexer les nouvelles pages

Objectif : accélérer la découverte, et surtout déclencher l'entrée dans Google
Dataset Search. Cet index découvre les jeux de données en crawlant le balisage
`schema.org/Dataset` — il n'y a pas de formulaire, il suffit que `/donnees` soit
indexée.

**Search Console → Inspection de l'URL → coller l'URL → Demander une indexation**

Dans cet ordre :

```
https://warmup-generator.com/donnees
https://warmup-generator.com/douleur
https://warmup-generator.com/douleur/epaule-developpe-couche
https://warmup-generator.com/douleur/genou-squat
https://warmup-generator.com/douleur/bas-du-dos-souleve-de-terre
https://warmup-generator.com/douleur/poignet-pompes
https://warmup-generator.com/douleur/epaule-tractions
https://warmup-generator.com/douleur/coude-curl-biceps
```

Pendant que tu y es, relève dans **Pages → Non indexées** le nombre d'URL en
« Découverte, actuellement non indexée ». C'est l'indicateur qui dira si le
problème d'autorité se résorbe.

---

## 3. Publier le jeu de données

### Hugging Face Datasets — https://huggingface.co/new-dataset

- **Nom** : `warmup-exercises-fr`
- **Licence** : `cc-by-4.0`
- **Description courte**

  ```
  52 exercices d'échauffement pour la musculation, en français, annotés par
  groupe musculaire, objectif, contre-indications et articulations mobilisées.
  ```

- **Contenu de la dataset card**

  ```markdown
  # Exercices d'échauffement pour la musculation (français)

  52 exercices annotés, conçus pour la génération automatisée de protocoles
  d'échauffement.

  ## Champs

  | Champ | Contenu |
  |---|---|
  | `muscles` | Groupes musculaires préparés |
  | `objectives` | Force, hypertrophie, reprise ou mobilité |
  | `contraindications` | Zones sensibles excluant l'exercice |
  | `painSupport` | Zones sensibles que l'exercice soulage |
  | `joints` | Articulations mobilisées |
  | `category` | Mobilisation, activation ou préparation spécifique |
  | `equipment` | Matériel requis |
  | `durationSeconds` | Durée recommandée |
  | `description` | Consigne d'exécution en français |

  La particularité de ce jeu de données est le couple
  `contraindications` / `painSupport` : il permet non seulement d'écarter un
  exercice quand une zone est sensible, mais aussi d'identifier ceux qui la
  soulagent activement. À notre connaissance, aucun équivalent ouvert en
  français ne porte cette information.

  ## Source

  https://warmup-generator.com/api/exercices — documentation sur
  https://warmup-generator.com/donnees

  ## Licence

  CC BY 4.0. Attribution : Warmup Generator — https://warmup-generator.com

  ## Avertissement

  Données à visée informative sur la préparation physique. Le champ
  `contraindications` ne remplace pas l'évaluation d'un professionnel de santé.
  ```

### Zenodo — https://zenodo.org/uploads/new

Optionnel. Zenodo attribue un **DOI**, ce qui rend le jeu de données citable dans
un travail académique. Déposer le JSON téléchargé depuis `/api/exercices`,
licence CC BY 4.0, mêmes titre et description.

---

## 4. Product Hunt

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

  No account, no ads, no tracking, no data collection. The algorithm runs
  entirely in your browser, so it works offline in the gym where reception is
  usually bad.

  What makes the selection non-trivial: every exercise is annotated with both
  contraindications and pain-support data. Declaring a sensitive shoulder
  doesn't just remove exercises — it brings different ones in.

  The exercise dataset is open under CC BY 4.0, and the whole thing is MIT on
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

## 5. Bonus, sans urgence

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
