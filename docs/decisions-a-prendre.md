# Décisions et actions en attente de Seb

> Consignées au fil du travail autonome, à traiter ensemble lors d'une session.
> Chaque entrée : contexte, options, ce que j'ai fait en attendant.

## Ouvertes

- [ ] **Valider les routines du moteur v3** (décision, lot 1 bis). Elles reprennent ton brief
      (docs/brief-moteur-v3.md) mot pour mot, doses comprises. Liste complète par matériel :
      `node --experimental-strip-types --no-warnings --import ./scripts/bench/register.mjs scripts/bench/plans.ts`.
      Points que j'ai repérés et laissés tels quels en attendant ton avis :
      - **Push** : rotation externe puis face pull, deux exercices pour l'arrière de l'épaule.
        Redondant ou voulu ? (Sans matériel, ils deviennent rotation externe allongé + W allongé.)
      - **Full body** : 7 exercices, ~6 min. Garder 7 ou viser 5-6 ?
      - **↻ Varier** : il ne reste que 4 permutations (dead bug ↔ bird dog, rotation externe debout ↔
        allongé, 90/90 ↔ squat assisté). Garder le bouton ou le retirer ?
      - **Bras sans matériel** : une seule ligne (pronation-supination), aucun équivalent honnête pour
        biceps et triceps. Acceptable, ou ajouter un message « fais une série légère de ton premier exercice » ?
- [ ] **Pictogrammes à regarder** : squat profond assisté (au mur) et rotation thoracique à quatre
      pattes sont nouveaux. Je n'ai pas pu les voir rendus (panneau navigateur masqué) : jette un œil
      sur /plan?t=legs et /plan?t=pull. Pas d'autre travail graphique tant que la banque n'est pas validée.
- [ ] **Routines « Une douleur ? »** (lib/rehab.ts) : 7 zones, 4 à 7 exercices chacune, 7 à 16 min,
      pictogrammes existants uniquement. À relire en sportif, idéalement par un kiné : doses, choix
      (isométrie pour le genou, McGill pour le bas du dos), et la règle des 3/10 à cocher.
- [ ] **Relecture par un coach diplômé** (action, optionnelle) : si tu connais quelqu'un, la page
      /methodologie dit honnêtement que ce n'est pas encore fait.

- [ ] **Nettoyer les outils 3D du PC** (action). Blender (`~/Tools/blender-5.2.3-windows-x64`,
      ~1 Go) et MoMask (`~/Tools/momask`, ~1,5 Go avec PyTorch) ne servent plus depuis l'abandon
      de la 3D. Supprimer le dossier `~/Tools` libère la place. Branche `feat/exercise-3d-v2`
      (GitHub) : la garder pour mémoire ou la supprimer.
- [ ] **Zip Blender ARM64** dans `Téléchargements` (action) : inutile, à supprimer.

## Traitées

- [x] **Version courte, « Ça coince ? », « Mes zones » sur l'accueil** : retirés (3 nov. 2026, retour de Seb) ;
      la douleur a sa routine dédiée. **Jambes / Bas du corps** : Bas retiré de l'accueil, renommage Legs / Upper.

- [x] **Direction artistique** : B, l'affiche de compétition (2 nov. 2026), en ligne.
- [x] **Routines du lot 1** : remplacées par celles du brief moteur v3 (pas de cardio).
