# Warmup Generator

Générateur d'échauffements pour la musculation, construit sur la séance réelle.
L'utilisateur indique les exercices qu'il va faire (squat, développé couché,
tractions…), la charge de sa première série et ce qui le gêne ; un algorithme
déterministe compose un échauffement en quatre temps, inspiré du protocole RAMP :
mise en route, mobilité, activation, puis séries d'approche calculées.

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

Le moteur est dans [`lib/session-engine.ts`](lib/session-engine.ts). Il part des
exercices de la séance, décrits dans [`lib/lifts.ts`](lib/lifts.ts) : chacun déclare ses
**exigences** (`demands`, notées de 1 à 3) — un squat exige des chevilles et des hanches
mobiles, des genoux contrôlés, des fessiers et un gainage actifs.

1. **Carte des besoins.** Les exigences des exercices sont additionnées, pondérées par la
   position dans la séance (le premier exercice pèse le plus, l'isolation moitié moins).
   Une zone déclarée douloureuse renforce les besoins correspondants.
2. **Sélection gloutonne, une carte par phase.** Pour la mobilité puis l'activation, on
   retient à chaque tour l'exercice de préparation qui couvre le mieux les besoins
   restants, puis on réduit ceux qu'il couvre. Les phases ont chacune leur carte : mobiliser
   les omoplates ne doit pas épuiser le besoin de les activer avant des tractions.
3. **Garde-fous.** Contre-indications exclues, étirements statiques réservés aux zones
   douloureuses, seuil de pertinence, versions sans matériel si pas d'élastique, pas de
   doublon d'un même geste.
4. **Séries d'approche.** Montée complète sur le premier exercice
   ([`lib/approach-sets.ts`](lib/approach-sets.ts) : paliers selon les reps de travail,
   arrondis aux disques réels), rappel court sur les suivants.

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
