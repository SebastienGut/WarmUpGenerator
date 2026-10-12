# Warmup Generator

Deux outils d'échauffement pour la musculation, volontairement séparés :

- **Le générateur** : on choisit une séance type (Push, Pull, Jambes…) ou ses zones,
  et ce qui coince ; un algorithme déterministe compose un échauffement inspiré du
  protocole RAMP (mise en route, mobilité, activation), avec un pictogramme animé
  par exercice et un mode guidé pour la salle.
- **Le calculateur de séries d'approche** : à partir de la charge de travail du jour
  sur un exercice, il donne la montée en charge, disques par côté, avec minuteur.

**[warmup-generator.com](https://warmup-generator.com)** · Gratuit, sans publicité,
sans inscription, sans collecte de données.

---

## Les contraintes du projet

Elles sont volontaires et structurent toutes les décisions techniques :

- **Zéro coût serveur.** Pas d'API externe, pas de base de données, pas d'appel à un
  service d'IA. La génération est algorithmique et s'exécute dans le navigateur.
- **Pas de tracking publicitaire, pas de cookie.** La seule mesure d'audience est
  [GoatCounter](https://www.goatcounter.com/), sans cookie, sans identifiant
  persistant et sans donnée personnelle — d'où l'absence de bandeau de consentement.
  Aucune régie publicitaire, aucun revendeur de données.
- **Fonctionne hors ligne.** L'usage réel se fait dans une salle de sport, souvent
  avec une connexion mauvaise ou inexistante.
- **Mobile-first.** L'utilisateur est debout, téléphone en main, entre deux séries.

## Le cœur du projet : l'algorithme de sélection

Le moteur est dans [`lib/session-engine.ts`](lib/session-engine.ts).

1. **Carte des besoins.** Chaque zone est décrite par ce qu'exigent ses exercices
   typiques ([`lib/lifts.ts`](lib/lifts.ts), champ `demands` noté de 1 à 3) : les
   jambes exigent chevilles et hanches mobiles, genoux contrôlés, fessiers et gainage
   actifs. Ces exercices typiques ne servent qu'à estimer la demande : l'outil ne
   présume pas de ce que la personne fera. Une zone douloureuse renforce les besoins
   correspondants.
2. **Sélection gloutonne, une carte par phase.** Pour la mobilité puis l'activation, on
   retient à chaque tour l'exercice de préparation qui couvre le mieux les besoins
   restants, puis on réduit ceux qu'il couvre. Une variante (paramètre `v`) fait
   tourner les exercices presque aussi pertinents que le meilleur.
3. **Garde-fous.** Contre-indications exclues, étirements statiques réservés aux zones
   douloureuses, seuil de pertinence, versions sans matériel si pas d'élastique, pas de
   doublon d'un même geste.

Les séries d'approche sont calculées à part ([`lib/approach-sets.ts`](lib/approach-sets.ts),
`buildRampPlan`) : paliers selon les répétitions de travail, arrondis aux disques réels.

Les pictogrammes sont générés, pas dessinés : un squelette 2D articulé
([`lib/figure.ts`](lib/figure.ts)) et deux postures par exercice
([`lib/figures.ts`](lib/figures.ts)), interpolées à l'affichage.

Chaque exercice de [`lib/warmup-data.ts`](lib/warmup-data.ts) est annoté avec :

| Dimension | Rôle dans la sélection |
|---|---|
| `prepFocus` | Qualités préparées (cheville, coiffe, fessiers…), croisées avec les exigences |
| `prepRoles` | Phase où l'exercice peut servir (mobilité, activation, stabilité…) |
| `contraindications` | Zones sensibles qui **excluent** l'exercice |
| `painSupport` / `therapeutic` | Zones sensibles que l'exercice **soulage** activement |
| `trainingValue` | Qualité intrinsèque, départage à pertinence égale |
| `fallback` | Version sans matériel |

Le moteur est vérifié sur l'ensemble des combinaisons exercice × douleur × options :
aucune contre-indication violée.

## Structure

```
app/
  page.tsx                              Constructeur de séance
  plan/                                 Plan calculé dans le navigateur, mode guidé
  series-approche/                      Calculateur de séries d'approche
  douleur/[slug]/                       Cluster « douleur × exercice » (requête symptôme)
  echauffement/
    [muscle]/[objectif]/                Matrice muscle × objectif
    protection/[zone]/                  Protocoles par zone sensible
    exercice/[slug]/                    Guides par exercice principal
    combo/[combo]/                      Guides par groupe musculaire
  blog/[slug]/                          Guides rédactionnels
  donnees/                              Documentation du jeu de données ouvert
  api/exercices/                        Export JSON (CC BY 4.0)
  llms.txt/                             Description du site pour les moteurs génératifs
lib/
  warmup-data.ts                        Référentiel d'exercices de préparation annotés
  lifts.ts                              Catalogue des exercices de séance et leurs exigences
  session-engine.ts                     Algorithme de composition du plan
  approach-sets.ts                      Calcul des séries d'approche et des disques
  content/                              Contenu éditorial par cluster
```

## Données ouvertes

Le référentiel d'exercices est publié sous **CC BY 4.0** :

```bash
curl https://warmup-generator.com/api/exercices
```

Documentation, structure et exemples : **[warmup-generator.com/donnees](https://warmup-generator.com/donnees)**.

À notre connaissance il n'existe pas d'équivalent ouvert en français intégrant la
dimension contre-indication. Réutilisation libre, y compris commerciale, avec
attribution. Aucune clé d'API, aucune limite de débit.

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint
```

Next.js 16 (App Router) · TypeScript · Tailwind CSS · déployé sur Vercel.
Toutes les pages sont générées statiquement (SSG) ; le plan est calculé côté client.
Icônes : `node scripts/generate-icons.mjs`. Signalement à Bing : `node scripts/indexnow.mjs`.

## Avertissement

Ce projet porte sur la préparation physique, pas sur le traitement des blessures.
Les pages consacrées aux douleurs signalent explicitement les symptômes qui imposent
une consultation. Rien ici ne remplace l'avis d'un kinésithérapeute ou d'un médecin
du sport — merci de conserver cette nuance en cas de réutilisation du contenu ou des
données.

## Licence

**Code : [AGPL-3.0](LICENSE).** Tu peux l'utiliser, le modifier et le
redistribuer, y compris commercialement. En contrepartie, toute version
modifiée doit être publiée sous la même licence — y compris si tu la déploies
comme service en ligne sans en distribuer le code. C'est la clause spécifique
à l'AGPL, et c'est volontaire : ce projet est gratuit et le restera, et le
copyleft garantit que ses dérivés le soient aussi.

**Données : [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).**
Le référentiel d'exercices est sous une licence délibérément plus permissive
que le code : réutilisation libre, y compris commerciale et dans un produit
fermé, avec pour seule obligation l'attribution. L'objectif est que ces données
servent au plus grand nombre.
