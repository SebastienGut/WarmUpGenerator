# Démonstrations des exercices : kit de génération par IA

> Décision de Seb (3 nov. 2026) : les pictogrammes en bâtons ne suffisent pas ; les démonstrations
> seront des images générées par IA, deux par exercice (départ, arrivée). Le site les affiche en
> alternance ; tant qu'un exercice n'a pas ses deux images, il garde son pictogramme.

## Méthode (à suivre dans l'ordre)

1. **Une seule conversation** dans ton générateur (ChatGPT, comme pour le logo) pour tout le lot :
   c'est ce qui garde le même personnage et le même style d'une image à l'autre.
2. **Colle d'abord le prompt de style** ci-dessous, et demande la **fiche personnage** (étape 0).
   Garde cette image : si le style dérive en cours de route, renvoie-la avec « même personnage, même style ».
3. **Une image par message.** Colle le prompt « départ » d'un exercice, puis le prompt « arrivée ».
   Le personnage doit être identique, au même cadrage, seule la position change.
4. **Vérifie avec la checklist** de l'exercice avant de passer au suivant. Une image fausse est pire
   que pas d'image : en cas de doute, régénère (« corrige : … »).
5. **Télécharge et renomme** chaque image exactement `{clé}-depart.png` et `{clé}-arrivee.png`
   (la clé est indiquée pour chaque exercice), puis dépose-les dans `brand/demos/`.
6. **Dis-moi « importe les démos »** : je relis chaque image contre la checklist, je les recadre au même
   format (4:3, fond papier) avec `node scripts/import-demos.mjs`, et je les mets en ligne.

Tu peux avancer par lots (par exemple les 5 séances d'abord) : chaque exercice complet est publié seul.

## Prompt de style (à coller une fois, au début)

```
For this whole conversation, generate exercise demonstration images in one consistent style:
flat vector illustration, clean and minimal, sports poster look, no gradients.
Always the same character: athletic adult, short dark hair, plain black t-shirt, black shorts,
white sneakers, calm neutral face. Realistic proportions and anatomically correct joints;
both hands and both feet clearly visible and correctly placed.
Plain off-white background (#F7F6F2), one thin light-grey floor line, no scenery, no text,
no logo, no watermark, no arrows. Full body visible, centered, generous margins.
Equipment drawn simply in mid grey; elastic resistance bands in red (#C8202A).
Landscape format 4:3. One image per request. Keep the character, framing and camera angle
identical between the start and end position of the same exercise: only the body position changes.
```

**Étape 0 — fiche personnage :**

```
First, a character reference: the character standing relaxed, side view facing right.
```

## Les 45 exercices

Chaque exercice : la **clé** (nom des fichiers), la **vue**, les deux prompts, puis **à vérifier**.
« Vue de profil » = caméra sur le côté droit du personnage, qui regarde vers la droite.

### Séances (Push, Pull, Legs, Upper, Full body)

**1. Cat-cow** — clé `art-chat-vache` — vue de profil
- Départ : `Side view. On all fours, hands under shoulders, knees under hips. Back rounded up toward the ceiling (cat), head dropped, chin toward chest.`
- Arrivée : `Same character, same framing. On all fours, hands under shoulders, knees under hips. Back arched down (cow), belly toward the floor, chest open, head looking slightly forward.`
- À vérifier : mains sous les épaules, genoux sous les hanches dans les deux images ; seule la colonne change.

**2. Rotation thoracique à quatre pattes, main derrière la tête** — clé `prep-rotation-thoracique-qp` — vue de trois quarts, de face et un peu au-dessus
- Départ : `Three-quarter front view from slightly above. On all fours. Left hand on the floor under the shoulder, right hand placed behind the head. Upper back rotated down so the right elbow points toward the left wrist.`
- Arrivée : `Same character, same framing. On all fours, left hand on the floor, right hand behind the head. Upper back rotated open: the right elbow points to the ceiling, chest turned to the right, eyes following the elbow. Hips stay square above the knees.`
- À vérifier : la main reste derrière la tête (pas le bras tendu) ; le bassin ne tourne pas ; une seule main au sol.

**3. Wall slides (glissés au mur)** — clé `prep-glisses-mur` — vue de profil
- Départ : `Side view. Standing facing a wall, close to it. Forearms flat against the wall, elbows bent at 90° at shoulder height, hands above elbows.`
- Arrivée : `Same character, same framing. Standing facing the wall. Forearms still in contact with the wall, slid upward: arms high in a V above the head, shoulders down, lower back not arched.`
- À vérifier : le mur est visible ; avant-bras au contact du mur dans les deux images.

**4. Mobilisation de cheville genou au mur** — clé `art-cheville-genou-mur` — vue de profil
- Départ : `Side view. Facing a wall, hands on the wall at chest height. Front foot flat about a hand's length from the wall, other foot behind. Front knee straight above the ankle.`
- Arrivée : `Same character, same framing. Same feet position. Front knee pushed forward over the toes until it touches the wall, front heel still flat on the floor.`
- À vérifier : talon avant au sol dans l'arrivée ; le genou touche le mur ; le pied avant ne bouge pas.

**5. Squat profond assisté** — clé `prep-squat-profond-assiste` — vue de profil
- Départ : `Side view. Standing in front of a vertical post (squat rack upright), both hands holding the post at chest height, feet shoulder-width, arms straight.`
- Arrivée : `Same character, same framing. Deep bodyweight squat, hips below knees, heels flat, chest up, both hands still holding the post with arms extended for balance.`
- À vérifier : talons au sol ; les mains tiennent le montant ; dos droit, pas arrondi.

**6. Good morning au poids du corps** — clé `prep-charniere-hanche` — vue de profil
- Départ : `Side view. Standing tall, feet hip-width, knees slightly bent, hands on the hips.`
- Arrivée : `Same character, same framing. Hip hinge: hips pushed back, flat back, torso tilted forward to about 45-60°, knees slightly bent, hands still on the hips, neck neutral.`
- À vérifier : dos plat (pas rond) ; ce sont les fesses qui reculent, pas les genoux qui avancent ; mains sur les hanches.

**7. Transitions de hanches 90/90** — clé `prep-90-90` — vue de face
- Départ : `Front view. Sitting on the floor, torso upright, hands on the floor behind for support. Both knees bent at 90° and both pointing to the left: the front leg's shin across in front of the body, the back leg's shin to the side and behind.`
- Arrivée : `Same character, same framing. Sitting upright. Both knees have rotated over to the right: the same 90/90 position mirrored, both knees bent at 90° pointing to the right.`
- À vérifier : deux angles de 90° aux genoux dans chaque image ; les pieds restent au sol ; buste droit.

**8. Pronation-supination de l'avant-bras** — clé `cib-coudes-pronation-supination` — vue de trois quarts, de face
- Départ : `Three-quarter front view, close enough to see the hand clearly. Standing, right elbow bent at 90°, tucked against the side, forearm pointing forward, palm facing up.`
- Arrivée : `Same character, same framing. Same arm position, elbow still tucked at 90°: forearm rotated so the palm now faces down.`
- À vérifier : la paume est nettement vers le haut puis vers le bas ; le coude reste collé au corps.

**9. Pompes scapulaires sur banc** — clé `act-pecs-iso` — vue de profil
- Départ : `Side view. Incline plank with hands on a flat gym bench, arms straight, body in a straight line from head to heels. Shoulder blades squeezed together, chest slightly sunk between the shoulders.`
- Arrivée : `Same character, same framing. Same incline plank, arms still straight: chest pushed away from the bench, upper back slightly rounded, shoulder blades spread apart.`
- À vérifier : coudes tendus dans les deux images ; seul le haut du dos bouge ; corps gainé.

**10. Pompes scapulaires contre un mur** — clé `prep-pompes-scap-mur` — vue de profil
- Départ : `Side view. Standing leaning toward a wall, hands on the wall at shoulder height, arms straight, feet a step back, body straight. Shoulder blades squeezed together, chest slightly toward the wall.`
- Arrivée : `Same character, same framing. Same position, arms still straight: chest pushed away from the wall, shoulder blades spread apart.`
- À vérifier : le mur est visible ; coudes tendus ; corps droit.

**11. Rotation externe à la poulie, coude au corps** — clé `rotation-externe-poulie` — vue de face
- Départ : `Front view. Standing sideways next to a cable machine (grey), cable handle at elbow height on the athlete's left. Right elbow bent at 90° tucked against the side, right hand holding the handle in front of the belly.`
- Arrivée : `Same character, same framing. Elbow still tucked against the side at 90°: forearm rotated outward to the right, hand pointing out to the side, cable stretched.`
- À vérifier : le coude ne décolle pas du flanc ; l'avant-bras pivote vers l'extérieur.

**12. Rotation externe à l'élastique, coude au corps** — clé `act-epaules-rotation-coiffe` — vue de face
- Départ et arrivée : mêmes prompts que le n° 11, en remplaçant `cable machine … handle` par `a red elastic band anchored at elbow height on the athlete's left, held in the right hand`.
- À vérifier : comme le n° 11.

**13. Rotation externe allongé sur le côté** — clé `prep-rotation-externe-cote` — vue de face, depuis les pieds
- Départ : `View from in front of the athlete. Lying on the left side on the floor, head resting on the left arm, knees slightly bent. Right elbow bent at 90° and tucked on the right flank, right forearm resting across the belly.`
- Arrivée : `Same character, same framing. Same side-lying position, right elbow still on the flank: right forearm rotated up so it points to the ceiling.`
- À vérifier : allongé **sur le côté** (pas sur le dos) ; coude collé au flanc ; seul l'avant-bras monte.

**14. Face pull à la corde, poulie haute** — clé `face-pull-poulie` — vue de profil
- Départ : `Side view. Standing facing a cable machine, rope attachment at face height, arms extended forward holding both ends of the rope.`
- Arrivée : `Same character, same framing. Rope pulled toward the face, hands apart beside the ears, elbows high and out to the sides, shoulder blades squeezed.`
- À vérifier : coudes hauts (au niveau des épaules) ; la corde arrive au visage, pas au menton.

**15. Face pull à l'élastique** — clé `act-dos-face-pull-elastique` — vue de profil
- Départ et arrivée : mêmes prompts que le n° 14 avec `a red elastic band anchored at face height` à la place de la poulie.
- À vérifier : comme le n° 14.

**16. W allongé sur le ventre** — clé `prep-w-sol` — vue de trois quarts, de dessus
- Départ : `Three-quarter view from above. Lying face down on the floor, forehead on a folded towel. Arms in a W shape on the floor: elbows bent, upper arms out to the sides, hands near head level.`
- Arrivée : `Same character, same framing. Same face-down W position with elbows and hands lifted a few centimeters off the floor, shoulder blades squeezed down and together.`
- À vérifier : à plat ventre ; bras en W bien lisibles ; coudes et mains décollés de peu.

**17. Pont fessier** — clé `act-fessiers-pont` — vue de profil
- Départ : `Side view. Lying on the back, knees bent, feet flat on the floor hip-width apart, arms along the body.`
- Arrivée : `Same character, same framing. Hips lifted so shoulders, hips and knees form a straight line, feet flat, arms along the body.`
- À vérifier : épaules au sol ; ligne épaules-hanches-genoux droite, sans cambrure.

**18. Montées sur la pointe des pieds** — clé `cib-chevilles-montees-pointe` — vue de profil
- Départ : `Side view. Standing upright next to a wall, one hand on the wall for balance, feet flat.`
- Arrivée : `Same character, same framing. Same position, risen high onto the balls of both feet, heels lifted.`
- À vérifier : une main au mur ; talons levés nettement dans l'arrivée.

**19. Dead bug** — clé `act-core-dead-bug` — vue de profil
- Départ : `Side view. Lying on the back, lower back flat on the floor. Both arms pointing straight up to the ceiling, hips and knees bent at 90° (shins parallel to the floor).`
- Arrivée : `Same character, same framing. Lower back still flat: one arm lowered overhead toward the floor behind the head, and the opposite leg extended straight just above the floor. The other arm and leg stay in place.`
- À vérifier : bras et jambe **opposés** ; le bras passe au-dessus de la tête ; bas du dos collé au sol.

**20. Bird dog** — clé `act-core-bird-dog` — vue de profil
- Départ : `Side view. On all fours, hands under shoulders, knees under hips, flat back.`
- Arrivée : `Same character, same framing. One arm extended straight forward at shoulder height and the opposite leg extended straight back at hip height, flat back, hips level.`
- À vérifier : bras et jambe opposés ; dos plat ; bassin qui ne bascule pas.

**21. Curl marteau très léger, haltères** — clé `curl-marteau` — vue de profil
- Départ : `Side view. Standing, arms along the body holding light dumbbells, palms facing the thighs (neutral grip).`
- Arrivée : `Same character, same framing. Elbows bent, dumbbells raised to shoulder height with the same neutral grip, elbows still at the sides.`
- À vérifier : prise neutre (pouces vers le haut) ; coudes immobiles le long du corps.

**22. Curl marteau à l'élastique** — clé `act-bras-curl-elastique` — vue de profil
- Départ et arrivée : mêmes prompts que le n° 21 avec `a red elastic band under both feet, ends held in each hand` à la place des haltères.
- À vérifier : comme le n° 21 ; l'élastique passe sous les pieds.

**23. Extension triceps à la poulie, corde** — clé `extension-triceps-poulie` — vue de profil
- Départ : `Side view. Standing facing a cable machine, rope attachment on the high pulley, elbows bent and tucked at the sides, hands at chest height holding the rope.`
- Arrivée : `Same character, same framing. Arms fully extended downward, rope ends pulled apart beside the thighs, elbows still tucked at the sides.`
- À vérifier : les coudes ne bougent pas ; seuls les avant-bras descendent.

**24. Extension triceps à l'élastique** — clé `act-bras-pushdown-elastique` — vue de profil
- Départ et arrivée : mêmes prompts que le n° 23 avec `a red elastic band anchored high above` à la place de la poulie.
- À vérifier : comme le n° 23.

### Routines « Une douleur ? »

**25. Cercles d'épaule lents** — clé `prep-epaules-cars` — vue de profil
- Départ : `Side view. Standing tall, right arm straight, raised forward to shoulder height.`
- Arrivée : `Same character, same framing. Right arm straight, raised high above the head and slightly behind, torso still upright (no back arch).`
- À vérifier : bras tendu ; le buste ne se cambre pas.

**26. Étirement de l'arrière de l'épaule** — clé `cib-epaule-capsule-posterieure` — vue de face
- Départ : `Front view. Standing, right arm straight in front at chest height.`
- Arrivée : `Same character, same framing. Right arm straight across the chest, the left hand gently pulling it at the elbow, right shoulder kept low.`
- À vérifier : main posée au-dessus du coude (pas sur le coude plié) ; épaule basse.

**27. Rétraction des omoplates, bras tendus** — clé `rehab-retraction-bras-tendus` — vue de dos, de trois quarts
- Départ : `Three-quarter back view. Standing, both arms straight in front at shoulder height, shoulder blades relaxed and spread.`
- Arrivée : `Same character, same framing. Arms still straight in front, shoulders drawn back: shoulder blades visibly squeezed together, shoulders not shrugged.`
- À vérifier : coudes tendus ; omoplates rapprochées visibles (vue de dos).

**28. Y-T debout** — clé `cib-epaule-yt-sol` — vue de face
- Départ : `Front view. Standing, both arms raised straight overhead in a Y shape, thumbs pointing back.`
- Arrivée : `Same character, same framing. Both arms straight out to the sides at shoulder height in a T shape, thumbs pointing back, shoulders down.`
- À vérifier : Y puis T bien lisibles ; épaules basses.

**29. Flexions-extensions du coude** — clé `art-coudes` — vue de profil
- Départ : `Side view. Standing, right arm along the body, elbow straight.`
- Arrivée : `Same character, same framing. Right elbow fully bent, hand near the shoulder, upper arm still along the body.`
- À vérifier : le bras ne monte pas ; seul l'avant-bras bouge.

**30. Étirement des extenseurs du poignet** — clé `cib-poignets-etire-extenseurs` — vue de trois quarts, de face
- Départ : `Three-quarter front view, hands clearly visible. Standing, right arm straight in front at shoulder height, palm facing down, wrist straight.`
- Arrivée : `Same character, same framing. Right arm straight, palm down; the left hand presses the back of the right hand so the right wrist bends down, fingers pointing to the floor.`
- À vérifier : **paume vers le bas** ; le poignet plie vers le bas.

**31. Étirement des fléchisseurs du poignet** — clé `cib-poignets-etire-flechisseurs` — vue de trois quarts, de face
- Départ : `Three-quarter front view, hands clearly visible. Standing, right arm straight in front at shoulder height, palm facing up.`
- Arrivée : `Same character, same framing. Right arm straight, palm up; the left hand pulls the right fingers down and back toward the body, stretching the underside of the forearm.`
- À vérifier : **paume vers le haut** ; les doigts tirés vers le bas et vers soi.

**32. Étirement du triceps** — clé `cib-coudes-etire-triceps` — vue de trois quarts, de face
- Départ : `Three-quarter front view. Standing, right arm raised, elbow bent, right hand reaching down behind the head.`
- Arrivée : `Same character, same framing. Same arm position, the left hand gently pushes the right elbow back behind the head.`
- À vérifier : main droite entre les omoplates ; la main gauche sur le coude.

**33. Rotations des poignets** — clé `art-poignets` — vue de face
- Départ : `Front view, hands clearly visible. Standing, fingers interlaced in front of the chest, wrists bent to the left.`
- Arrivée : `Same character, same framing. Fingers still interlaced in front of the chest, wrists bent to the right.`
- À vérifier : doigts entrecroisés ; les poignets changent nettement d'orientation.

**34. Mise en charge progressive des poignets** — clé `cib-poignets-activation-progressive` — vue de profil
- Départ : `Side view. On all fours, hands flat under the shoulders, fingers forward, shoulders right above the wrists.`
- Arrivée : `Same character, same framing. Same hands and knees, body weight shifted forward so the shoulders are ahead of the wrists, arms angled, wrists more bent.`
- À vérifier : les mains ne bougent pas ; ce sont les épaules qui avancent.

**35. Genoux sur la poitrine** — clé `cib-lombaires-genoux-poitrine` — vue de profil
- Départ : `Side view. Lying on the back, knees bent, feet flat on the floor.`
- Arrivée : `Same character, same framing. Lying on the back, both knees pulled toward the chest with the hands holding the shins, head resting on the floor.`
- À vérifier : tête au sol ; les mains tiennent les tibias.

**36. Essuie-glaces des jambes** — clé `art-lombaires-essuie-glace` — vue de dessus
- Départ : `Top-down view. Lying on the back, arms out to the sides on the floor, knees bent together, feet flat, knees pointing up.`
- Arrivée : `Same character, same framing. Both knees lowered together to the right side toward the floor, shoulders and arms still flat on the floor.`
- À vérifier : vue de dessus ; genoux serrés qui tombent d'un côté ; épaules au sol.

**37. Planche latérale, genoux au sol** — clé `prep-planche-laterale` — vue de face
- Départ : `Front view. Lying on the left side, propped on the left forearm (elbow under the shoulder), knees bent at 90° behind, hips resting on the floor.`
- Arrivée : `Same character, same framing. Same forearm and knees on the floor, hips lifted so shoulder, hip and knee form a straight line.`
- À vérifier : **sur le côté** ; coude sous l'épaule ; genoux pliés au sol.

**38. Fente basse, genou au sol** — clé `cib-hanches-fente-rotation` — vue de profil
- Départ : `Side view. Kneeling lunge: right foot forward with the knee bent at 90°, left knee on the floor behind, torso upright, hands on the front knee.`
- Arrivée : `Same character, same framing. Same kneeling lunge with the hips pushed gently forward, stretching the front of the left hip, torso upright.`
- À vérifier : genou arrière au sol ; buste droit, pas cambré.

**39. Coquillage (clamshell)** — clé `prep-clamshell` — vue de face
- Départ : `Front view. Lying on the left side, head on the left arm, hips and knees bent at about 45°, knees and feet together.`
- Arrivée : `Same character, same framing. Feet still together, top knee opened upward like a clamshell, pelvis not rolling backward.`
- À vérifier : **sur le côté** ; les pieds restent joints ; seul le genou du dessus s'ouvre.

**40. Ouverture de hanche à quatre pattes** — clé `cib-hanches-fire-hydrant` — vue de dos
- Départ : `Back view. On all fours, hands under shoulders, knees under hips.`
- Arrivée : `Same character, same framing. Right knee still bent at 90°, lifted out to the side to hip height, torso not rotating.`
- À vérifier : vue de dos ; le genou s'ouvre sur le côté (pas en arrière) ; buste immobile.

**41. Relevé de jambe tendue** — clé `cib-genou-slr` — vue de profil
- Départ : `Side view. Lying on the back, left knee bent with the foot flat, right leg straight on the floor, toes up.`
- Arrivée : `Same character, same framing. Right leg lifted straight to the height of the left knee, thigh contracted.`
- À vérifier : la jambe levée reste tendue ; l'autre genou plié.

**42. Fente tenue (isométrie)** — clé `prep-fente-iso` — vue de profil
- Départ : `Side view. Split stance standing tall, right foot forward, left foot back on the toes, torso upright.`
- Arrivée : `Same character, same framing. Lowered halfway into the lunge and holding: front knee above the ankle and aligned with the foot, back knee off the floor, torso upright.`
- À vérifier : genou avant au-dessus de la cheville ; descente à mi-hauteur seulement.

**43. Montée de marche contrôlée** — clé `cib-genou-step-up` — vue de profil
- Départ : `Side view. Standing in front of a low step (about 20 cm), right foot placed flat on the step, left foot on the floor.`
- Arrivée : `Same character, same framing. Standing tall on the step on the right leg, left foot just lifted beside it, right knee straight and aligned with the foot.`
- À vérifier : marche basse ; le genou reste dans l'axe du pied ; la tête reste dans l'image.

**44. Rotations de chevilles** — clé `art-chevilles` — vue de profil
- Départ : `Side view. Standing on the left leg, one hand on a wall for balance, right foot lifted just off the floor, toes pointed down.`
- Arrivée : `Same character, same framing. Same balance, right foot lifted, ankle flexed so the toes point up.`
- À vérifier : une main au mur ; pied levé ; la cheville change d'orientation.

**45. Étirement du mollet au mur** — clé `cib-chevilles-etire-mollet` — vue de profil
- Départ : `Side view. Hands on a wall, left foot forward close to the wall, right leg straight behind, right heel on the floor, hips upright.`
- Arrivée : `Same character, same framing. Same feet, hips leaning forward toward the wall, right leg still straight with the heel flat, stretching the calf.`
- À vérifier : talon arrière au sol ; jambe arrière tendue.
