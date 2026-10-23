"""Planche contact de quelques images d'un rendu, sur fond clair et sombre.
Usage : python sheet.py <dossier_png> <sortie.png> <id> [<id> ...]"""
import os
import sys

from PIL import Image

src, out, ids = sys.argv[1], sys.argv[2], sys.argv[3:]
rows = []
for fid in ids:
    files = sorted(f for f in os.listdir(os.path.join(src, fid)) if f.endswith(".png"))
    pick = files if len(files) <= 4 else [files[i] for i in (0, len(files) // 6, len(files) // 3, len(files) // 2)]
    rows.append([Image.open(os.path.join(src, fid, f)) for f in pick])
W, H = rows[0][0].size
sheet = Image.new("RGBA", (W * 4, H * len(rows) * 2), (244, 245, 242, 255))
for r, imgs in enumerate(rows):
    sheet.paste(Image.new("RGBA", (W * 4, H), (27, 31, 35, 255)), (0, (2 * r + 1) * H))
    for c, im in enumerate(imgs):
        sheet.alpha_composite(im, (c * W, 2 * r * H))
        sheet.alpha_composite(im, (c * W, (2 * r + 1) * H))
sheet.convert("RGB").resize((W * 2, H * len(rows))).save(out)
