# Génère les icônes du site à partir du logo de Seb (brand/logo-warmup.png).
# Usage : python scripts/build-logo.py
from PIL import Image

root = "C:/Users/seb/Desktop/warmup-generator/"
PAPER = (247, 246, 242, 255)

src = Image.open(root + "brand/logo-warmup.png").convert("RGBA")
# Recadrage sur le dessin réel (on ignore le halo presque transparent).
alpha = src.getchannel("A").point(lambda a: 255 if a > 40 else 0)
mark = src.crop(alpha.getbbox())


def render(size, pad=0.06, bg=None):
    """Logo centré dans un carré, avec une marge relative."""
    canvas = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    inner = int(size * (1 - 2 * pad))
    w, h = mark.size
    k = inner / max(w, h)
    m = mark.resize((max(1, round(w * k)), max(1, round(h * k))), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


# Favicon et icône d'onglet : fond transparent, marge minimale pour rester lisible à 16 px.
render(256, pad=0.02).save(root + "app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
render(96, pad=0.02).save(root + "app/icon.png")
# Logo déclaré aux moteurs (JSON-LD Organization) et logo de l'en-tête.
render(512, pad=0.06).save(root + "public/logo.png")
# En-tête : le dessin seul, recadré (plus large que haut), 120 px de haut pour les écrans denses.
mark.resize((round(mark.width * 120 / mark.height), 120), Image.LANCZOS).save(root + "public/logo-mark.png")
# Icônes d'app : fond papier plein (iOS et Android n'aiment pas la transparence).
render(180, pad=0.1, bg=PAPER).save(root + "app/apple-icon.png")
render(180, pad=0.1, bg=PAPER).save(root + "public/icons/logo-apple-touch.png")
render(192, pad=0.08, bg=PAPER).save(root + "public/icons/logo-pwa-192.png")
render(512, pad=0.08, bg=PAPER).save(root + "public/icons/logo-pwa-512.png")
# Maskable : le système peut rogner jusqu'à 20 % de chaque côté.
render(512, pad=0.2, bg=PAPER).save(root + "public/icons/logo-pwa-maskable-512.png")
render(512, pad=0.2, bg=PAPER).save(root + "public/icons/maskable-512.png")
print("ok", mark.size)
