# Warmup Generator

Générateur d'échauffements personnalisés pour la musculation. L'utilisateur choisit
ses groupes musculaires, son objectif de séance, ses zones sensibles et une durée ;
un algorithme déterministe compose un protocole séquencé en trois phases.

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

Le fichier [`lib/warmup-engine.ts`](lib/warmup-engine.ts) contient la logique
intéressante. Le problème n'est pas de piocher des exercices au hasard dans une
liste filtrée — c'est de composer un protocole cohérent sous contraintes multiples
et parfois contradictoires.

Chaque exercice de [`lib/warmup-data.ts`](lib/warmup-data.ts) est annoté avec :

| Dimension | Rôle dans la sélection |
|---|---|
| `muscles` | Groupes préparés par l'exercice |
| `objectives` | Objectifs de séance où il est pertinent |
| `contraindications` | Zones sensibles qui **excluent** l'exercice |
| `painSupport` | Zones sensibles que l'exercice **soulage** activement |
| `joints` | Articulations mobilisées, pour le scoring de couverture |
| `prepFocus` / `prepIntensity` | Nature et intensité de la préparation |
| `movementKey` | Identifie les variantes d'un même mouvement, pour éviter les doublons |

L'algorithme doit alors : couvrir tous les groupes musculaires demandés, respecter la
séquence articulaire → activation → spécifique, écarter les exercices contre-indiqués,
réserver un créneau aux exercices qui soulagent une zone sensible déclarée, éviter deux
variantes du même mouvement, et faire tenir le tout dans la durée choisie.

La distinction `contraindications` / `painSupport` est ce qui rend le résultat utile
plutôt que générique : déclarer une épaule sensible ne se contente pas de retirer des
exercices, ça en fait entrer d'autres.

## Structure

```
app/
  page.tsx                              Configuration du plan
  result/                               Plan généré, mode timer plein écran
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
  warmup-data.ts                        Référentiel d'exercices annotés
  warmup-engine.ts                      Algorithme de composition du plan
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

Next.js 15 (App Router) · TypeScript · Tailwind CSS · déployé sur Vercel.
Toutes les pages de contenu sont générées statiquement (SSG).

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
