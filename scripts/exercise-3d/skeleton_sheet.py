"""Planche de squelettes (positions MoMask .npy) : 8 instants par variante,
vue de face et de profil, pour juger le mouvement avant tout rendu.
Usage : python skeleton_sheet.py <dossier_generation> <sortie_prefixe>"""
import glob
import os
import sys

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402

CHAINS = [[0, 2, 5, 8, 11], [0, 1, 4, 7, 10], [0, 3, 6, 9, 12, 15], [9, 14, 17, 19, 21], [9, 13, 16, 18, 20]]
COLORS = ["#c8202a", "#1f5fbf", "#1d2125", "#c8202a", "#1f5fbf"]  # droite rouge, gauche bleu

src, prefix = sys.argv[1], sys.argv[2]
files = sorted(glob.glob(os.path.join(src, "**", "*_ik.npy"), recursive=True))
groups = {}
for f in files:
    groups.setdefault(os.path.basename(os.path.dirname(f)), []).append(f)
for g, fs in groups.items():
    fig, axes = plt.subplots(len(fs) * 2, 8, figsize=(16, 4.2 * len(fs)))
    for r, f in enumerate(fs):
        j = np.load(f)
        idx = np.linspace(0, len(j) - 1, 8).astype(int)
        for c, t in enumerate(idx):
            for v, (hx, label) in enumerate(((0, "face"), (2, "profil"))):
                ax = axes[2 * r + v, c]
                p = j[t]
                for ch, col in zip(CHAINS, COLORS):
                    ax.plot(p[ch, hx], p[ch, 1], color=col, lw=2)
                ax.set_xlim(p[0, hx] - 1, p[0, hx] + 1)
                ax.set_ylim(-0.1, 1.9)
                ax.set_aspect("equal")
                ax.axis("off")
                if c == 0:
                    ax.set_title(f"var {r} {label}", fontsize=8, loc="left")
                else:
                    ax.set_title(f"{t / 20:.1f}s", fontsize=7)
    plt.tight_layout()
    plt.savefig(f"{prefix}{g}.png", dpi=60)
    plt.close(fig)
    print("ok", g)
