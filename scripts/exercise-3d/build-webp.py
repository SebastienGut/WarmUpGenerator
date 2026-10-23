"""Assemble les images rendues en WebP animés (transparents, en boucle).
Deux tailles : 480 px (mode guidé, détail) et 200 px (listes), plus une image
fixe (-p) pour les vignettes immobiles et le mouvement réduit. Met à jour
lib/exercise-3d.ts, la liste des exercices disponibles en 3D.
Usage : python build-webp.py <dossier_png> <dossier_sortie> <id> [<id> ...]"""
import json
import os
import re
import sys

from PIL import Image

src, out, ids = sys.argv[1], sys.argv[2], sys.argv[3:]
os.makedirs(out, exist_ok=True)
for fid in ids:
    d = os.path.join(src, fid)
    meta = json.load(open(os.path.join(d, "meta.json")))
    # Une image sur deux (12 i/s) : le geste reste fluide, le fichier pèse moitié moins.
    frames = [Image.open(os.path.join(d, f)).convert("RGBA") for f in sorted(os.listdir(d)) if f.endswith(".png")]
    poster_src = frames[0]
    frames = frames[::2]
    ms = round(2000 / meta["fps"])
    poster = os.path.join(out, f"{fid}-p.webp")
    poster_src.save(poster, quality=78, method=6)
    print(f"{poster} {os.path.getsize(poster) // 1024} Ko")
    for suffix, width, q in (("", 480, 62), ("-s", 200, 60)):
        h = round(frames[0].height * width / frames[0].width)
        imgs = [f.resize((width, h), Image.LANCZOS) for f in frames]
        path = os.path.join(out, f"{fid}{suffix}.webp")
        imgs[0].save(path, save_all=True, append_images=imgs[1:], duration=ms, loop=0, quality=q, alpha_quality=70, method=4, kmax=24, allow_mixed=True)
        print(f"{path} {os.path.getsize(path) // 1024} Ko, {len(imgs)} images")

ids_all = sorted(re.sub(r"-p\.webp$", "", f) for f in os.listdir(out) if f.endswith("-p.webp"))
manifest = os.path.join(os.path.dirname(__file__), "..", "..", "lib", "exercise-3d.ts")
header = (
    "// Généré par scripts/exercise-3d/build-webp.py : exercices disposant d'une\n"
    "// animation 3D dans public/exercices-3d (sinon, pictogramme vectoriel).\n"
)
with open(manifest, "w", encoding="utf-8", newline="\n") as fh:
    fh.write(header + "export const EXERCISE_3D = new Set<string>(" + json.dumps(ids_all, indent=2) + ");\n")
print(f"{len(ids_all)} exercices en 3D -> lib/exercise-3d.ts")
