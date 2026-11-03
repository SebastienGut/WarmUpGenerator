# Recette et mise en ligne — refonte d'octobre 2026

Tout le travail est sur la branche `feat/series-approche`, **non poussée**. Rien
n'est en production tant que tu ne fusionnes pas.

---

## 1. Recette, à faire avant de fusionner

Lancer le build de production en local, puis ouvrir le site **sur ton téléphone**
(même Wi-Fi : `http://<ip-de-ton-pc>:3000`) :

```bash
npm run build && npm run start
```

### Le parcours principal

- [ ] Accueil : toucher **Jambes** → l'échauffement s'ouvre (mise en route,
      mobilité, activation), sans aucune supposition sur tes exercices
- [ ] Plan : chaque exercice a son pictogramme animé, la consigne s'ouvre au tap
- [ ] **Ajuster** : changer les zones, cocher **Genou**, version courte → le plan
      se met à jour en direct ; **↻ Varier** propose une autre version
- [ ] **Démarrer** : un geste par écran, chrono du cardio avec « Passer », écran
      qui ne se met pas en veille
- [ ] **Séries d'approche** (second outil) : squat, 100 kg × 5 → montée en charge
      avec disques, puis **Démarrer la montée** avec minuteur de repos
- [ ] Retour à l'accueil : l'échauffement apparaît dans les récents

### Le jugement de coach (le plus important)

C'est la partie que je ne peux pas valider à ta place. Fais 5 ou 6 séances que tu
pratiques vraiment et demande-toi pour chaque exercice proposé : *est-ce que je le
ferais avant cette séance ?* Tout ce qui te paraît absurde est un réglage du moteur
(`lib/lifts.ts` pour les exigences, `lib/session-engine.ts` pour la sélection).

### Le reste

- [ ] Mode clair et mode sombre (réglage du téléphone)
- [ ] `/series-approche` : changer d'exercice, de charge, de barre
- [ ] Une page exercice (`/echauffement/exercice/squat`) : tableau des séries
      d'approche en bas, et le bouton qui ouvre le plan
- [ ] Un ancien lien `/result?muscles=pecs&objectif=force` redirige vers un plan
- [ ] Hors ligne : ouvrir le site, couper le réseau, recharger `/plan?s=squat`

Déjà vérifié de mon côté sur le build de production : 85 URL en 200, redirections,
aucun débordement horizontal à 375 px, contraste AA en clair et en sombre sur 12
gabarits, moteur testé sur 8 100 combinaisons sans contre-indication violée.

---

## 2. Mise en ligne

```bash
git checkout main
git merge feat/series-approche
git push
```

Vercel déploie automatiquement. Ensuite :

1. **Signaler les URL à Bing** (le site n'y est pas indexé, or Bing alimente
   ChatGPT Search et Copilot) :
   ```bash
   node scripts/indexnow.mjs
   ```
2. **Bing Webmaster Tools** — https://www.bing.com/webmasters : importer le site
   depuis la Search Console (2 minutes, depuis ton compte).
3. **Search Console** — demander l'indexation de `/`, `/series-approche` et des
   6 pages exercice, dont le contenu a changé.
4. **Hugging Face** — le jeu de données en ligne est périmé (52 exercices,
   vouvoiement). Les fichiers à jour sont dans `dataset/` :
   ```bash
   hf upload fabdigstudio/warmup-exercises-fr dataset . --repo-type dataset
   ```
   Pour les régénérer après une modification : `npm run build && node scripts/export-dataset.mjs`.

---

## 3. Faire connaître l'outil

Les textes de **[SUBMISSIONS.md](SUBMISSIONS.md)** sont réécrits pour le nouvel
outil (séance → échauffement, séries d'approche, mode guidé). Ordre conseillé et
mises en garde inchangés : étaler sur plusieurs semaines, jamais Wikipédia.

Le meilleur angle est maintenant le post Reddit FR : l'outil répond à une vraie
pratique de salle (les séries d'approche), et la demande de retours est sincère.

**Product Hunt** (texte prêt à coller) :

- Tagline : `Your gym warm-up in one tap, plus a warm-up set calculator`
- Description :
  ```
  Tap what you're training today — push, pull, legs, upper or lower body — and get a
  six-minute warm-up targeted to it, every drill shown as an animated pictogram, with
  a guided full-screen mode for the gym. A separate calculator turns today's working
  weight into warm-up sets, plates per side, with rest timers.

  No account, no ads, no cookies. Everything runs in the browser, so it works
  offline in a basement gym. Dataset CC BY 4.0, code AGPL-3.0.
  ```

---

## 4. Pistes pour une prochaine session

- **Mesurer avant d'étendre.** Attendre 3 à 4 semaines de données (GoatCounter,
  Search Console, Bing) avant de créer de nouvelles pages.
- **Base d'exercices.** 80 exercices de préparation et 37 de séance, chacun avec son pictogramme animé.
  16 anciens exercices faibles (rotations de nuque ou de genou, étirements statiques)
  ne sont jamais choisis ; on peut les élaguer.
- **Matrice muscle × objectif** (28 pages hors sitemap) : le nouveau moteur ne
  différencie l'objectif que par la montée en charge, donc les listes d'exercices
  de ces pages se ressemblent davantage. Candidates à une canonical vers le hub
  muscle si Google continue de les ignorer.
- **Feature silhouettes** — `components/ExerciseSilhouette.tsx`, `public/exercices/`
  et les scripts associés restent non suivis, volontairement.
