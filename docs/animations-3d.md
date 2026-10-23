# Animations 3D d'exercices : brief pour la prochaine session

> À lancer avec : « Lis docs/animations-3d.md et reprends les animations 3D. »

## Reprise du 24 oct. 2026 : nouveau moteur anatomique

- `rig3d.py` : postures décrites articulation par articulation (flexion, abduction, rotation…),
  converties en rotations d'os sans roulis parasite ; rythme scapulo-huméral, doigts, peau en
  « preserve volume ». Calibrage vérifié (neutre, croix, bras au ciel, squat, rotation).
- `poses3d.py` : postures 3D écrites d'après les consignes, plusieurs images clés, boucle
  aller-retour ou cyclique. Les 7 exercices du plan haut du corps sont écrits et relus sous
  4 angles (`VIEWS=1`, `sheet.py`).
- L'ancien chemin (postures 2D → 3D, `export-poses.mjs`) est supprimé.
- Pièges rencontrés : basculer le bassin recule les cuisses (hanche = cuisse + bassin) ;
  l'élévation de clavicule rapproche les mains au-dessus de la tête (compenser par l'abduction
  quand les mains sont fixes) ; une clé latérale absente doit reprendre la clé commune.
- Prochaine étape : validation par Seb sur téléphone, puis les exercices des autres séances
  types, par lots relus.

## Où on en était (23 oct. 2026)
- Le pipeline existe et marche de bout en bout (`scripts/exercise-3d/`) :
  `export-poses.mjs` (postures de lib/figures.ts → JSON) → `render.py` (Blender + mannequin MPFB,
  rendu EEVEE transparent) → `build-webp.py` (WebP animés 480 px, 200 px, image fixe `-p`,
  met à jour `lib/exercise-3d.ts`) ; `sheet.py` fait une planche contact clair/sombre pour relire.
- 10 exercices rendus dans `public/exercices-3d/` (dont les 7 du plan « haut du corps »).
- **Affichage coupé en production** : `SHOW_3D = false` dans `components/ExerciseFigure.tsx`.
  Le site montre les pictogrammes vectoriels tant que ce n'est pas rallumé.
- Outils installés : Blender 5.2.3 LTS portable (`~/Tools/blender-5.2.3-windows-x64/blender.exe`),
  extension MPFB (plateforme officielle extensions.blender.org). Pillow 12 côté Python.
- Rendu ≈ 1 min 20 par exercice (≈ 60 images à 24 i/s) ; `PREVIEW=1` ne rend que 4 images.

## Retour de Seb
- **Le mannequin gris acier sans visage est validé** (« top ») : garder couleur, matière, zone travaillée
  en rouge, ombre de contact, fond transparent.
- **Refusé en l'état** : « des distorsions de certains membres » et « les mouvements ne reproduisent pas
  correctement ce qui est attendu des exercices ». Il a regardé le plan haut du corps : cardio léger
  (`raise`), glissés au mur, rotation thoracique à quatre pattes, charnière de hanche, Y-T, tractions
  scapulaires, marche de l'ours.

## Diagnostic (causes probables, à confirmer en premier)
1. **Distorsions = torsion des os non maîtrisée.** `apply_pose` oriente chaque os avec
   `rotation_difference` (rotation la plus courte vers la direction voulue) : l'axe Y est bon mais le
   *roulis* (rotation autour de l'os) est arbitraire → avant-bras et épaules vrillés, effet « papillote ».
   Correctif : construire la matrice complète de chaque os à partir de la direction **et** d'un vecteur
   de référence (pôle : axe latéral du corps pour bras et jambes, l'avant pour la colonne), comme une
   contrainte « track to + up axis ».
2. **Peau qui s'écrase aux angles extrêmes** (bras au-dessus de la tête, squat profond) : skinning
   linéaire du rig `game_engine`. Essayer `use_deform_preserve_volume = True` sur le modificateur
   Armature, et/ou le rig `default` de MPFB (plus d'os, poids plus fins).
3. **Clavicules et omoplates jamais pilotées** : bras levés sans élévation de la clavicule → épaule
   cassée. Lier la clavicule à l'élévation du bras (au-delà de ~90°, élever/protracter).
4. **Colonne en un seul bloc** : pelvis, spine_01 et spine_02 reçoivent la même direction → pli au bassin.
   Répartir la flexion sur les trois segments.
5. **Le décalage latéral artificiel des bras/cuisses** (`out(...)` dans `directions`) déforme les gestes ;
   il compensait l'absence d'abduction réelle. À supprimer quand les angles 3D existent.
6. **Gestes infidèles = limite de fond.** Les postures viennent des pictogrammes 2D : angles dans un seul
   plan (profil, ou face pour les vues « front »), deux postures seulement. Impossible d'exprimer une
   rotation du buste (rotation thoracique), un geste hors plan (Y-T, glissés au mur vus en 3/4), une
   rotation externe d'épaule, une marche alternée bras/jambes, etc. Recopier le 2D en 3D ne suffira pas.

## Plan de reprise
1. **Nouveau format de posture 3D, anatomique**, pour chaque exercice (fichier `lib/poses-3d.ts` ou JSON
   dans `scripts/exercise-3d/`) : par articulation, des angles nommés comme en kiné — épaule (flexion,
   abduction, rotation), coude (flexion), colonne en 3 segments (flexion, inclinaison, rotation), hanche
   (flexion, abduction, rotation), genou, cheville, clavicule (élévation, protraction). **Plusieurs images
   clés** (3 à 6) avec leurs instants, pas seulement deux postures ; boucle aller-retour ou cyclique
   (marche, cardio).
2. **Calibrer une fois les axes locaux de chaque os** du rig MPFB (repère de repos) pour convertir ces
   angles en rotations sans roulis parasite. Écrire un test : pose « T », pose « bras au ciel »,
   pose « squat profond », vérifiées en planche contact sous 3 angles (face, profil, 3/4).
3. **Écrire les postures à partir des consignes** (`instructions` dans lib/warmup-data.ts et lib/lifts.ts),
   pas à partir des pictogrammes. Commencer par les 7 du plan haut du corps, puis les exercices des
   autres séances types (Push, Pull, Jambes, Bas, Full body), puis le reste.
4. **Protocole de relecture par exercice** : planche contact 3 vues × 4 instants ; vérifier point par point
   contre la consigne (appuis au sol, mains/pieds qui ne glissent pas, amplitude, côté qui bouge,
   rythme). Corriger avant de passer au suivant. Pas de rendu en masse avant que Seb ait validé
   5 exercices variés (au sol, debout, bras au-dessus de la tête, suspendu, rotation).
5. **Accessoires à finir** : banc, box, barres parallèles, appui de hanche (5 exercices), barre de
   traction mieux cadrée (le mannequin paraît petit sur « tractions scapulaires »).
6. Rallumer `SHOW_3D` seulement quand la banque affichée est validée ; incrémenter la version du
   service worker (`public/sw.js`, WebP en cache permanent) à chaque nouveau rendu publié.

## Garder
- Mannequin MPFB gris acier (`BODY` dans render.py), rouge du disque de 25 pour la zone travaillée,
  caméra orthographique 3/4, fond transparent, ombre de contact, WebP 12 i/s.
- Repli automatique sur le pictogramme vectoriel pour tout exercice non rendu.
