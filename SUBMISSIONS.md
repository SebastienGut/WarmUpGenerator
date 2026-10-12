# Pack de soumissions — textes prêts à coller

Tout est rédigé. Tu crées le compte, tu colles, tu valides.

## À lire avant de commencer

Sois lucide sur ce que ça rapporte. **La plupart de ces liens sont en `nofollow`**
— ils ne transmettent pas d'autorité au sens SEO classique. Leur intérêt réel est
ailleurs :

1. **Le trafic direct.** Un bon post Show HN ou Product Hunt amène quelques
   centaines de visiteurs en une journée. C'est plus que ce que ton site fait en
   trois mois de Google.
2. **La découverte en cascade.** Quelqu'un voit le projet, en parle sur son blog
   ou son forum — et *ce* lien-là compte.
3. **Les signaux de marque.** Un site cité à plusieurs endroits distincts est
   perçu comme une entité réelle, ce qui pèse dans l'évaluation globale du domaine.

Ce qui rapporterait le plus reste hors de portée d'une soumission : qu'un kiné,
un coach ou un développeur trouve l'outil ou le jeu de données assez utile pour
en parler spontanément. C'est le pari de l'open data.

**À ne pas faire :** les services qui promettent des inscriptions massives en
annuaires. C'est le profil de liens que Google ignore au mieux et sanctionne au
pire, et ça n'existe pas d'autre version de ce raccourci.

**À ne pas faire non plus :** ajouter toi-même le lien sur Wikipédia. C'est une
violation explicite de leurs règles sur les conflits d'intérêts, et ça se retourne
contre le projet.

---

## 1. AlternativeTo — https://alternativeto.net

Rendement correct : trafic réel et fiche durable. Cherche d'abord si une app
similaire existe, ta fiche apparaîtra alors dans ses alternatives.

- **Name** : `Warmup Generator`
- **URL** : `https://warmup-generator.com`
- **Licence** : Open Source / Free
- **Platforms** : Web, Self-Hosted (PWA)
- **Catégories** : Health & Fitness, Sport

**Description courte**

```
Free warm-up builder for strength training. Enter the exercises of today's session
(squat, bench, pull-ups…) and get a warm-up built for them: targeted mobility,
activation, and calculated warm-up sets with plates per side. Runs in the browser,
works offline, no account or ads.
```

**Description longue**

```
Warmup Generator builds the warm-up for the session you are actually doing, not a
generic routine.

You list today's exercises in order, optionally your first working set (e.g.
100 kg × 5) and any joint that is bothering you. Each exercise declares what it
demands — a squat needs mobile ankles and hips, controlled knees, active glutes; a
bench press needs stable shoulder blades and a ready rotator cuff — and the
algorithm picks the preparation drills that cover those demands best, without
duplicates. The warm-up follows the RAMP structure: a short raise, mobility,
activation, then warm-up sets on your first lift, rounded to real plates.

A guided full-screen mode walks you through it in the gym: one movement per screen,
rest timers between warm-up sets, screen kept awake. Recent sessions are saved on
the device, so "my Monday push day" is one tap away.

Declaring a sensitive joint does not just remove exercises: contraindicated drills
are excluded, a dedicated preparation is added, and you get a self-regulation cue
for the warm-up sets.

Everything runs client-side, so it works offline. No account, no ads, no cookies.
The exercise dataset is open under CC BY 4.0 and the code is AGPL-3.0.

Content is in French.
```

**Tags** : `warm-up`, `fitness`, `strength-training`, `gym`, `offline`, `pwa`,
`open-source`, `no-tracking`, `french`

---

## 2. Show HN — https://news.ycombinator.com/submit

Très forte variance : soit ça ne décolle pas, soit tu prends plusieurs milliers de
visites. Poste en semaine, tôt le matin heure du Pacifique. Un seul essai — HN
détecte et pénalise les reposts.

Angle choisi : **le problème algorithmique et le jeu de données ouvert**, pas
« j'ai fait une app fitness ». C'est ce qui intéresse cette audience.

- **Title** (80 caractères max)

```
Show HN: A warm-up builder that reads your workout, not your muscle groups
```

- **URL** : `https://warmup-generator.com`

- **Premier commentaire, à poster immédiatement après**

```
I kept skipping warm-ups because deciding what to do took longer than the warm-up
itself. My first version asked for muscle groups and a goal, like every other
generator. Nobody thinks like that in a gym — you think "today is squat, RDL, leg
press". So I rebuilt it around the session.

Each lift in the catalogue (37 of them) declares weighted demands: squat needs
ankle and hip mobility, knee control, glutes and bracing; bench needs scapular
stability and a ready rotator cuff. Demands are summed across the session,
weighted by position (first lift counts most, isolation half). Then a greedy pass
picks, for mobility and then activation, the drill from an 80-exercise dataset that
covers the most remaining demand, and discounts what it just covered. Mobility and
activation get separate demand maps — otherwise mobilising the shoulder blades
"uses up" the need to activate them before pull-ups, which was my first bug.

Guard-rails: contraindications per declared painful joint, no static stretching
unless it targets that joint, a relevance threshold so a drill doesn't sneak in on
quality alone, and bodyweight fallbacks when you have no band. I check it against
every lift × pain × option combination: zero contraindication violations.

Then the part lifters actually do: warm-up sets on the first lift, computed from
your working set (heavier sets get more steps with fewer reps), rounded to real
plates and drawn in competition colours.

Everything is static and client-side — no API, no database, no server cost, works
offline in a gym basement. No account, no ads, no cookies (analytics is
GoatCounter, cookieless). Dataset is CC BY 4.0 at /api/exercices, code is AGPL-3.0.

Content is in French — I'm aware that limits the audience here, but the approach
should translate.
```

---

## 3. Indie Hackers — https://www.indiehackers.com

Audience réceptive aux projets sans monétisation. Poste dans le groupe
*Developers* ou *Building in public*.

- **Title**

```
I built a free warm-up generator with zero server cost and no monetization plan
```

- **Body**

```
Warmup Generator (warmup-generator.com) builds a warm-up from the exercises you
are about to do: targeted mobility and activation, then warm-up sets calculated on
your first lift, with plates per side.

Three constraints shaped every technical decision:

Zero server cost. No API, no database, no AI calls. The plan is computed by a
deterministic algorithm in the browser. My hosting bill is nothing and will stay
nothing, which is what makes "free forever" credible rather than a promise I'd
eventually break.

Works offline. The actual usage context is a gym basement with no reception. It's
a PWA, fully static, the tool pages are cached.

No monetization. No ads, no email capture, no premium tier, no affiliate links.

The first version asked for muscle groups and a goal. Almost nobody used it. The
rebuild starts from the session instead ("squat, RDL, leg press"), because that is
how people think in a gym — and it can then do the one thing lifters really do
before a heavy set: warm-up sets.

The exercise dataset is open under CC BY 4.0 — partly because it's useful to
others, partly because being the thing people cite is the only link-building
strategy available when you refuse to do outreach.
```

---

## 4. Reddit

Ce sont les seuls endroits où la démarche demande un vrai jugement : un post
ressenti comme promotionnel se fait supprimer et nuit au projet. Lis les règles du
sub, et n'y va que si tu es prêt à répondre aux commentaires.

### r/musculation ou r/frenchfitness

- **Titre**

```
J'ai fait un outil gratuit qui construit ton échauffement à partir de ta séance (séries d'approche comprises)
```

- **Corps**

```
Salut,

Je zappais systématiquement l'échauffement — décider quoi faire me prenait plus de
temps que l'échauffement lui-même. Du coup j'ai fait un petit outil.

Tu indiques les exercices de ta séance (par ex. squat, SDT roumain, presse), et si
tu veux ta charge de première série. Il te sort :
- 2 min de cardio léger
- la mobilité dont tes exercices ont besoin (cheville et hanche pour le squat,
  charnière de hanche pour le SDT…)
- l'activation des stabilisateurs (fessiers, coiffe, omoplates selon la séance)
- tes séries d'approche calculées sur le premier exercice, avec les disques à
  mettre de chaque côté, puis un rappel court avant les suivants

Il y a un mode guidé pour la salle : un exercice par écran, repos décomptés entre
les séries d'approche, écran qui reste allumé. Tes séances sont gardées sur le
téléphone, tu relances ton push du lundi en un tap.

Si une articulation coince, ça retire ce qui est contre-indiqué, ajoute une
préparation dédiée et te rappelle de garder la douleur sous 3/10 pendant la montée.
Ça ne remplace pas un kiné, les pages douleur disent quand il faut consulter.

Gratuit, sans pub, sans compte, sans mail, ça marche hors ligne. Je ne monétise pas.

warmup-generator.com

Je prends tous les retours, surtout si un choix d'exercice vous paraît absurde pour
votre séance — c'est exactement ce que je cherche à corriger.
```

### r/datasets — pour le jeu de données uniquement

- **Titre**

```
[OC] 80 French-language warm-up exercises annotated with injury contraindications (CC BY 4.0)
```

- **Corps**

```
I've released the exercise dataset behind a warm-up generator I built.

80 exercises in French, each annotated with target muscle groups, the physical
qualities they prepare (ankle mobility, scapular stability…), required equipment — and two fields I haven't found
in other open exercise datasets: contraindications (sensitive zones where the
movement is inadvisable) and pain-support (zones the movement actively helps).

That pair is what makes automated routine generation useful rather than
cosmetic: flagging a bad shoulder changes which exercises are selected, not just
which are filtered out.

JSON, no API key, CORS open, self-documenting (the payload ships its own label
vocabularies and field definitions).

https://warmup-generator.com/api/exercices
Docs: https://warmup-generator.com/donnees

CC BY 4.0. Caveat: this is training-preparation data, not medical data — the
contraindication field reflects common strength-training precautions, not
clinical guidance.
```

---

## 5. Awesome-lists GitHub

Une pull request acceptée sur une liste populaire est un des meilleurs liens
accessibles gratuitement, parce que ces dépôts sont très relayés.

Cherche sur GitHub des dépôts correspondant à ces requêtes, puis vérifie que la
liste est **maintenue** (un commit dans les six derniers mois) avant d'investir du
temps :

```
awesome fitness
awesome open data français
awesome france
awesome health
awesome datasets french
```

Lis toujours le `CONTRIBUTING.md` : ces listes ont des conventions de formatage
strictes et une PR mal formatée est fermée sans discussion.

- **Ligne à ajouter, format habituel**

```markdown
- [Warmup Generator](https://warmup-generator.com) - Échauffement musculation construit sur les exercices de la séance, séries d'approche comprises, avec jeu de données d'exercices ouvert (CC BY 4.0). Sans publicité ni inscription, fonctionne hors ligne.
```

- **Titre de la PR**

```
Add Warmup Generator
```

- **Corps de la PR**

```
Adds Warmup Generator, a free warm-up builder for strength training: it reads the
exercises of the session and computes targeted prep plus warm-up sets.

- No ads, no account, no cookies, no monetization
- Runs fully client-side and works offline (PWA)
- Ships an open exercise dataset (80 entries, CC BY 4.0) with injury
  contraindication annotations
- Code is AGPL-3.0: https://github.com/SebastienGut/WarmUpGenerator

Content is in French.
```

---

## Ordre suggéré

Ne fais pas tout le même jour. Étale sur quelques semaines : une salve de liens
simultanée sur un domaine jeune est un motif que les systèmes anti-spam repèrent,
alors qu'une apparition progressive est banale.

| Ordre | Où | Pourquoi ce rang |
|---|---|---|
| 1 | Hugging Face | Zéro risque, fichiers déjà prêts |
| 2 | AlternativeTo | Fiche durable, faible effort |
| 3 | r/datasets | Angle données, audience réceptive |
| 4 | Product Hunt | Le lancement, quand tu es disponible pour répondre |
| 5 | Show HN | Après Product Hunt, jamais le même jour |
| 6 | Indie Hackers | Sans urgence |
| 7 | Reddit FR | Seulement si tu veux répondre aux commentaires |
| 8 | Awesome-lists | Au fil de l'eau |
