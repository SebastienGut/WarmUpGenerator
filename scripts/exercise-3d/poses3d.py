"""
Postures 3D des exercices, écrites d'après leur consigne (lib/warmup-data.ts).
Conventions : voir rig3d.py. Repères utiles :
  - basculer le bassin vers l'avant entraîne les cuisses vers l'arrière :
    angle absolu de la cuisse (0 = verticale, + = vers l'avant) = hanche - bassin ;
    angle absolu du tibia = cuisse - genou ;
  - pied à plat : flexion dorsale de cheville = - angle absolu du tibia ;
  - body (90, 0, 0) = corps face au sol ; les bras « vers le sol » sont alors
    fléchis à 90°, le plafond est du côté du dos ; en rotation de colonne
    (spine, 3e valeur), une valeur positive abaisse l'épaule droite.

Chaque exercice : keys (postures clés), loop ("pingpong" aller-retour avec pause,
"cycle" enchaînement), dur (secondes par boucle), anchor (appui fixe : feet,
hands, knees, hip), view (side, front, back, top ou (azimut, élévation)),
work (os teintés en rouge, par préfixe), props, hang (suspendu), base (posture
commune à toutes les clés).
"""

# Quatre pattes : mains sous les épaules, genoux sous les hanches, dessus des pieds au sol.
QUAD = {
    "body": (90, 0, 0),
    "hip": (90, 0, 0),
    "kn": 90,
    "ank": -75,
    "sh": (90, 0, 0),
    "wr": 85,
    "grip": 0.05,
}

POSES = {
    # Calibrage du moteur : neutre, bras en croix, bras au ciel, squat, rotation.
    "_calib": {
        "loop": "cycle",
        "dur": 5,
        "view": "front",
        "keys": [
            {},
            {"sh": (0, 90)},
            {"sh": (170, 0)},
            {"pelvis": (35, 0, 0), "hip": (130, 12, 15), "kn": 130, "ank": 35, "sh": (90, 0)},
            {"spine": (0, 0, 45), "sh_l": (90, 0, 0, 0), "el": 90},
        ],
        "work": ["thigh"],
    },
    # Cardio léger : petite course sur place, bras fléchis qui balancent.
    "raise": {
        "loop": "cycle",
        "dur": 0.9,
        "anchor": "hip",
        "view": "side",
        "base": {"body": (6, 0, 0), "el": 85, "grip": 0.7},
        "keys": [
            {"hip_r": (60, 0, 0), "kn_r": 85, "ank_r": -15, "hip_l": (-8, 0, 0), "kn_l": 12, "ank_l": 8, "sh_r": (-30, 8), "sh_l": (35, 8)},
            {"hip_r": (20, 0, 0), "kn_r": 40, "hip_l": (10, 0, 0), "kn_l": 30, "ank_l": 10, "sh_r": (0, 8), "sh_l": (0, 8)},
            {"hip_l": (60, 0, 0), "kn_l": 85, "ank_l": -15, "hip_r": (-8, 0, 0), "kn_r": 12, "ank_r": 8, "sh_l": (-30, 8), "sh_r": (35, 8)},
            {"hip_l": (20, 0, 0), "kn_l": 40, "hip_r": (10, 0, 0), "kn_r": 30, "ank_r": 10, "sh_l": (0, 8), "sh_r": (0, 8)},
        ],
        "work": ["thigh", "calf"],
    },
    # Glissés au mur : dos au mur, avant-bras plaqués en W, monter en Y sans décoller.
    "prep-glisses-mur": {
        "dur": 3.0,
        "view": "front",
        "base": {"hip": (8, 4, 0), "kn": 12, "ank": 4, "grip": 0.15},
        "keys": [
            {"sh": (0, 78, 88), "el": 95, "clav": (-6, -8)},
            {"sh": (0, 150, 88), "el": 18, "clav": (6, -4)},
        ],
        "work": ["upperarm", "clavicle", "spine_03"],
    },
    # Rotation thoracique à quatre pattes : bras vers le plafond en ouvrant le buste,
    # puis passé sous l'autre bras, épaule vers le sol. Le bassin ne bouge pas.
    "prep-thread-needle": {
        "dur": 4.0,
        "anchor": "knees",
        "view": (-30, 30),
        "base": QUAD,
        "keys": [
            {"spine": (0, 0, -45), "neck": (0, 0, -35), "sh_r": (0, 92, 0, 40), "el_r": 5, "wr_r": 0, "grip_r": 0.2},
            {"spine": (0, 0, 0), "sh_r": (80, 0, 0, 0), "el_r": 70, "wr_r": 20},
            {"spine": (0, 0, 42), "neck": (0, 0, 30), "sh_r": (88, 0, 0, -78), "el_r": 8, "wr_r": 0, "sh_l": (95, 0, 0), "el_l": 30},
        ],
        "work": ["spine_02", "spine_03", "clavicle_r", "upperarm_r"],
    },
    # Charnière de hanche : genoux légèrement fléchis, mains sur les hanches, fesses
    # vers l'arrière dos plat, puis retour en serrant les fessiers.
    "prep-charniere-hanche": {
        "dur": 3.2,
        "view": "side",
        # Mains sur les hanches : bras écartés vers l'arrière, rotation interne,
        # coudes fléchis, avant-bras vers l'avant du bassin.
        "base": {"sh": (-12, 42, -78), "el": 98, "wr": (0, 10), "grip": 0.1},
        "keys": [
            {"hip": (10, 0, 0), "kn": 18, "ank": 8},
            {"pelvis": (62, 0, 0), "hip": (74, 0, 0), "kn": 26, "ank": 14, "neck": (-12, 0, 0)},
        ],
        "work": ["thigh", "pelvis"],
    },
    # Y-T debout penché : bras pendants, Y dans le prolongement du buste, retour, puis T.
    "cib-epaule-yt-sol": {
        "loop": "cycle",
        "dur": 5.2,
        "view": (145, 18),
        "base": {"pelvis": (45, 0, 0), "hip": (52, 0, 0), "kn": 16, "ank": 9, "neck": (-10, 0, 0), "grip": 0.5},
        "keys": [
            {"sh": (45, 5, 0), "el": 8},
            {"sh": (168, 30, 35), "el": 5, "clav": (0, -14)},
            {"sh": (45, 5, 0), "el": 8},
            {"sh": (8, 88, 70), "el": 5, "clav": (0, -16)},
        ],
        "work": ["upperarm", "clavicle", "spine_03"],
    },
    # Tractions scapulaires : suspendu bras tendus, abaisser les omoplates pour monter
    # de quelques centimètres sans plier les coudes, puis relâcher.
    "prep-tractions-scapulaires": {
        "dur": 2.4,
        "hang": True,
        "anchor": "hands",
        "view": (150, 6),
        # L'abduction compense l'élévation de la clavicule : les mains restent fixes sur la barre.
        "base": {"el": 3, "grip": 1, "hip": (8, 0, 0), "kn": 22, "ank": -25},
        "keys": [
            {"clav": (12, 4), "sh": (172, 26, 10)},
            {"clav": (-18, -6), "sh": (172, -4, 10), "spine": (-6, 0, 0)},
        ],
        "props": ["pullbar"],
        "work": ["spine_02", "spine_03", "clavicle"],
    },
    # Marche de l'ours : à quatre pattes genoux décollés, main et pied opposés avancent
    # à petits pas, dos plat, bassin stable.
    "prep-marche-ours": {
        "loop": "cycle",
        "dur": 1.6,
        "anchor": "hip",
        "view": (-55, 18),
        "base": {**QUAD, "body": (84, 0, 0), "ank": 0, "kn": 95},
        "keys": [
            {"sh_r": (108, 0, 0), "sh_l": (78, 0, 0), "el_r": 15, "hip_l": (102, 0, 0), "kn_l": 105, "hip_r": (80, 0, 0)},
            {},
            {"sh_l": (108, 0, 0), "sh_r": (78, 0, 0), "el_l": 15, "hip_r": (102, 0, 0), "kn_r": 105, "hip_l": (80, 0, 0)},
            {},
        ],
        "work": ["spine", "pelvis", "clavicle", "upperarm"],
    },
}
