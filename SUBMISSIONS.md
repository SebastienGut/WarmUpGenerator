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
Free warm-up routine generator for strength training. Pick your target muscles,
session goal and any sensitive joints, and get a sequenced routine in about 30
seconds. Runs entirely in the browser, works offline, no account or ads.
```

**Description longue**

```
Warmup Generator creates a warm-up tailored to what you are actually training
that day, rather than a generic routine.

You select your muscle groups, your session goal (strength, hypertrophy, return
from a break, or mobility), any joints that are currently bothering you, and a
duration. The algorithm composes a sequenced routine in three phases: joint
mobilisation, muscle activation, then movement-specific preparation.

The part that makes it more than a random picker is the injury data. Every
exercise is annotated with both contraindications and pain-support information,
so declaring a sensitive shoulder does not just remove exercises from the pool —
it brings in the ones that actively help.

Everything runs client-side, so it works offline in the gym. No account, no ads,
no cookies. The exercise dataset is open under CC BY 4.0 and the code is AGPL-3.0.

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
Show HN: Warm-up planner that routes around your bad shoulder (open dataset)
```

- **URL** : `https://warmup-generator.com`

- **Premier commentaire, à poster immédiatement après**

```
I kept skipping warm-ups because deciding what to actually do took longer than
the warm-up itself. So I built a generator: pick your muscle groups, session
goal, any joints that hurt, and a duration, and it composes a sequenced routine.

The interesting constraint turned out to be injuries. Most exercise databases map
a movement to a muscle group and stop there. Mine annotates each of the 52
exercises with two extra dimensions: contraindications (zones where this movement
is a bad idea) and pain-support (zones this movement actively helps). So flagging
a sensitive shoulder doesn't just filter the pool down — it pulls different
exercises in.

The selection then has to satisfy several constraints at once: cover every
requested muscle group, respect the mobilisation → activation → specific
sequence, exclude contraindicated movements, reserve a slot for pain-support
work, avoid two variants of the same movement pattern, and fit the chosen
duration. It's a small enough search space that a greedy scoring pass with
backtracking works fine.

Everything is static and client-side — no API, no database, no server cost, and
it works offline in the gym where reception is bad. No account, no ads, no
cookies (analytics is GoatCounter, which is cookieless).

The dataset is CC BY 4.0 at /api/exercices, documented at /donnees. As far as I
can tell there's no open French-language exercise dataset carrying the
contraindication dimension, which is the part that makes automated selection
actually useful. Code is AGPL-3.0.

Content is in French — I'm aware that limits the audience here, but the dataset
and the approach should translate.
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
Warmup Generator (warmup-generator.com) builds a warm-up routine tailored to
what you're training, your session goal, and whichever joints are bothering you.

Three constraints shaped every technical decision:

Zero server cost. No API, no database, no AI calls. The generation is a
deterministic algorithm running in the browser. My hosting bill is nothing and
will stay nothing, which is what makes "free forever" credible rather than a
promise I'd eventually break.

Works offline. The actual usage context is a gym basement with no reception. It's
a PWA, fully static, everything cached.

No monetization. No ads, no email capture, no premium tier, no affiliate links.
This is deliberate — it's a portfolio piece and a public utility, not a business.

The hard part wasn't the stack, it was the data model. Every exercise carries
contraindications and pain-support annotations, so a declared sensitive shoulder
changes which exercises come in, not just which ones drop out. I published that
dataset openly under CC BY 4.0 — partly because it's genuinely useful to others,
partly because being the thing people cite is the only link-building strategy
available when you refuse to do outreach.

Currently at position 31 in Google after three months, which is exactly where a
zero-authority domain in a competitive niche should be. Happy to talk about the
SEO side if that's interesting.
```

---

## 4. Reddit

Ce sont les seuls endroits où la démarche demande un vrai jugement : un post
ressenti comme promotionnel se fait supprimer et nuit au projet. Lis les règles du
sub, et n'y va que si tu es prêt à répondre aux commentaires.

### r/musculation ou r/frenchfitness

- **Titre**

```
J'ai fait un générateur d'échauffement gratuit qui s'adapte aux articulations qui coincent
```

- **Corps**

```
Salut,

J'ai développé un petit outil parce que je zappais systématiquement l'échauffement
— décider quoi faire me prenait plus de temps que l'échauffement lui-même.

Tu choisis tes groupes musculaires, ton objectif de séance, les zones qui te font
mal en ce moment et une durée. Ça te sort un protocole séquencé : mobilisation
articulaire, puis activation, puis préparation spécifique au mouvement.

Le truc sur lequel j'ai passé le plus de temps, c'est la gestion des douleurs.
Chaque exercice est annoté avec les zones où il est déconseillé, mais aussi celles
qu'il soulage. Du coup cocher « épaule sensible » ne se contente pas de retirer des
exercices, ça en fait entrer d'autres.

C'est gratuit, sans pub, sans inscription, sans récupération d'email, et ça marche
hors ligne une fois la page chargée (utile en sous-sol). Je ne monétise pas et je
n'ai pas l'intention de le faire.

Je précise que ça ne remplace pas un kiné : les pages sur les douleurs indiquent
explicitement les symptômes qui doivent envoyer consulter plutôt que bricoler son
échauffement.

warmup-generator.com

Je prends tous les retours, en particulier si vous trouvez des exercices mal
classés — la base est ouverte et je la corrige volontiers.
```

### r/datasets — pour le jeu de données uniquement

- **Titre**

```
[OC] 52 French-language warm-up exercises annotated with injury contraindications (CC BY 4.0)
```

- **Corps**

```
I've released the exercise dataset behind a warm-up generator I built.

52 exercises in French, each annotated with target muscle groups, training
objectives, required equipment, mobilised joints — and two fields I haven't found
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
- [Warmup Generator](https://warmup-generator.com) - Générateur d'échauffements personnalisés pour la musculation, avec jeu de données d'exercices ouvert (CC BY 4.0). Sans publicité ni inscription, fonctionne hors ligne.
```

- **Titre de la PR**

```
Add Warmup Generator
```

- **Corps de la PR**

```
Adds Warmup Generator, a free warm-up routine generator for strength training.

- No ads, no account, no cookies, no monetization
- Runs fully client-side and works offline (PWA)
- Ships an open exercise dataset (52 entries, CC BY 4.0) with injury
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
