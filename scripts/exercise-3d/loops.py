"""
Trouve, dans chaque mouvement généré (positions d'articulations .npy de MoMask,
22 articulations, axe Y vertical, 20 i/s), le passage qui boucle le mieux : la
posture de fin ressemble à celle du début, avec assez de mouvement entre les
deux pour montrer l'exercice.

Usage : python loops.py <dossier_generation> <sortie.json> [durée_min_s] [durée_max_s]
"""

import glob
import json
import os
import sys

import numpy as np

src, out = sys.argv[1], sys.argv[2]
tmin = float(sys.argv[3]) if len(sys.argv) > 3 else 1.6
tmax = float(sys.argv[4]) if len(sys.argv) > 4 else 6.0
FPS = 20

res = {}
for f in sorted(glob.glob(os.path.join(src, "**", "*_ik.npy"), recursive=True)):
    j = np.load(f)  # (T, 22, 3)
    rel = j - j[:, :1]  # posture indépendante de la position du bassin
    T = len(j)
    best = None
    for a in range(0, T - int(tmin * FPS)):
        for b in range(a + int(tmin * FPS), min(T, a + int(tmax * FPS))):
            gap = np.linalg.norm(rel[a] - rel[b], axis=1).mean()
            # Vitesse proche aux deux bouts : la boucle ne marque pas d'arrêt brusque.
            va = rel[min(a + 1, T - 1)] - rel[a]
            vb = rel[min(b + 1, T - 1)] - rel[b]
            vgap = np.linalg.norm(va - vb, axis=1).mean() * FPS * 0.15
            seg = rel[a:b + 1]
            energy = np.linalg.norm(seg - seg.mean(0), axis=2).mean()
            drift = np.linalg.norm((j[b, 0] - j[a, 0])[[0, 2]])  # glissement au sol
            score = gap + vgap + 0.5 * drift - 0.35 * energy
            if best is None or score < best[0]:
                best = (score, a, b, gap, energy, drift)
    s, a, b, gap, energy, drift = best
    key = os.path.relpath(f, src).replace("\\", "/")
    res[key] = {"start": a, "end": b, "score": round(float(s), 4), "gap": round(float(gap), 4),
                "energy": round(float(energy), 4), "drift": round(float(drift), 4)}
    print(f"{key}: {a}->{b} ({(b - a) / FPS:.1f} s) écart {gap:.3f} amplitude {energy:.3f} glisse {drift:.2f}")
json.dump(res, open(out, "w"), indent=1)
