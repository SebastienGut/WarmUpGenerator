"""Planche contact d'un rendu pour relecture : une ligne par angle de vue (VIEWS=1)
ou, pour un rendu simple, quatre instants sur fond clair puis sombre.
Usage : python sheet.py <dossier_png> <sortie.png> <id> [<id> ...]"""
import os
import sys
from collections import defaultdict

from PIL import Image

LIGHT, DARK = (244, 245, 242, 255), (27, 31, 35, 255)

src, out, ids = sys.argv[1], sys.argv[2], sys.argv[3:]
rows = []  # (fond, images)
for fid in ids:
    files = sorted(f for f in os.listdir(os.path.join(src, fid)) if f.endswith(".png"))
    groups = defaultdict(list)
    for f in files:
        groups[f.split("-")[0] if "-" in f else ""].append(f)
    for view, fs in groups.items():
        pick = fs if len(fs) <= 6 else [fs[i] for i in (0, len(fs) // 6, len(fs) // 3, len(fs) // 2)]
        imgs = [Image.open(os.path.join(src, fid, f)) for f in pick]
        rows.append((LIGHT, imgs))
        if not view:
            rows.append((DARK, imgs))
W, H = rows[0][1][0].size
cols = max(len(r[1]) for r in rows)
sheet = Image.new("RGBA", (W * cols, H * len(rows)), LIGHT)
for r, (bg, imgs) in enumerate(rows):
    sheet.paste(Image.new("RGBA", (W * cols, H), bg), (0, r * H))
    for c, im in enumerate(imgs):
        sheet.alpha_composite(im, (c * W, r * H))
scale = min(1.0, 1400 / sheet.width)
sheet.convert("RGB").resize((round(sheet.width * scale), round(sheet.height * scale))).save(out)
