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
Free warm-up app for strength training. Pick what you're training (push, pull,
legs, upper or lower body) and get a targeted warm-up in one tap, each drill shown
as an animated pictogram. A separate calculator turns today's working weight into
warm-up sets, plates per side. Runs in the browser, works offline, no account or ads.
```

**Description longue**

```
Warmup Generator is two tools that stay separate on purpose.

The warm-up generator: tap a session type (Push, Pull, Legs, Upper, Lower, Full
body) or pick muscle groups, flag a joint that bothers you, and get a short warm-up:
a raise, targeted mobility, then activation. It doesn't guess which exercises you'll
do — it prepares the area. Every drill has an animated pictogram, and a guided
full-screen mode runs it in the gym with the screen kept awake.

The warm-up set calculator: choose the lift, enter today's working weight and reps,
and get the ramp-up, rounded to real plates and drawn in competition colours, with
rest timers.

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
Show HN: Gym warm-ups as animated pictograms, generated from joint angles
```

- **URL** : `https://warmup-generator.com`

- **Premier commentaire, à poster immédiatement après**

```
Two small tools for lifters, kept separate on purpose.

The warm-up generator: tap what you're training (push, pull, legs…) and get a
six-minute warm-up — a raise, targeted mobility, activation. Each zone is described
by what its typical lifts demand (legs: ankle and hip mobility, knee control, glutes,
bracing), weighted 1 to 3. A greedy pass then picks, from an 80-drill dataset, the
drill covering the most remaining demand and discounts what it covered, with
separate maps for mobility and activation. Declared painful joints exclude
contraindicated drills and pull in dedicated ones; I check every zone × pain ×
option combination for violations (zero).

My first version tried to be clever: it asked for your exact exercises and folded
warm-up sets into the warm-up. A lifter's feedback was blunt — don't guess my
session, and don't mix the general warm-up with ramping up on the bar. So the ramp
is now a second tool: lift, today's working weight and reps in, warm-up sets out,
rounded to real plates and drawn in competition colours, with rest timers.

The pictograms aren't drawn: a 2D articulated skeleton is defined by joint angles,
each drill has two poses, and the component interpolates between them. 117 drills,
a few hundred bytes each, consistent style, works offline.

Everything is static and client-side — no API, no database, no server cost. No
account, no ads, no cookies (analytics is GoatCounter, cookieless). Dataset CC BY
4.0 at /api/exercices, code AGPL-3.0. Content is in French.
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
Warmup Generator (warmup-generator.com) is two free tools for lifters: a warm-up
generator (pick what you're training, get a targeted six-minute warm-up with
animated pictograms) and a warm-up set calculator (today's working weight in,
ramp-up with plates out).

Three constraints shaped every technical decision:

Zero server cost. No API, no database, no AI calls. Everything is computed in the
browser by a deterministic algorithm. My hosting bill is nothing and will stay
nothing, which is what makes "free forever" credible.

Works offline. The real context is a gym basement with no reception.

No monetization. No ads, no email capture, no premium tier, no affiliate links.

The most useful lesson came from user feedback: my second version asked for your
exact exercises and mixed the warm-up with the ramp-up sets. Too clever. Splitting
it into two simple tools made both better.
```

---

## 4. Reddit

Ce sont les seuls endroits où la démarche demande un vrai jugement : un post
ressenti comme promotionnel se fait supprimer et nuit au projet. Lis les règles du
sub, et n'y va que si tu es prêt à répondre aux commentaires.

### r/musculation ou r/frenchfitness

- **Titre**

```
J'ai fait un outil gratuit : ton échauffement muscu en un tap, et un calculateur de séries d'approche
```

- **Corps**

```
Salut,

Je zappais systématiquement l'échauffement — décider quoi faire me prenait plus de
temps que l'échauffement lui-même. Du coup j'ai fait deux petits outils.

1. L'échauffement : tu touches ce que tu fais aujourd'hui (push, pull, jambes, haut
   ou bas du corps…) et tu as en 6 minutes une mise en route, de la mobilité et de
   l'activation ciblées. Chaque exercice est illustré par une petite animation, et il
   y a un mode guidé pour la salle (un exercice par écran, écran qui reste allumé).
   Si une articulation coince, ça retire ce qui est contre-indiqué et ajoute une
   préparation dédiée.

2. Les séries d'approche : tu choisis l'exercice, ta charge de travail du jour et tes
   reps, il te donne la montée en charge avec les disques à mettre de chaque côté,
   et peut la dérouler avec les minuteurs de repos.

Gratuit, sans pub, sans compte, sans mail, ça marche hors ligne. Je ne monétise pas.

warmup-generator.com

Je prends tous les retours, surtout si un exercice proposé vous paraît absurde.
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
- [Warmup Generator](https://warmup-generator.com) - Échauffement musculation en un tap par zone, calculateur de séries d'approche, avec jeu de données d'exercices ouvert (CC BY 4.0). Sans publicité ni inscription, fonctionne hors ligne.
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
