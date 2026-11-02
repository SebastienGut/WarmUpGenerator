# Génère les icônes du site à partir du monogramme (mêmes coordonnées que components/Logo.tsx).
# Usage : python scripts/build-logo.py
import math
from PIL import Image, ImageDraw

RED = (200, 32, 42, 255)
WHITE = (255, 255, 255, 255)
YELLOW = (232, 180, 23, 255)
PAPER = (247, 246, 242, 255)

# Monogramme dans une boîte 100 × 100, incliné comme les titres d'affiche.
W = [(13, 22), (30, 22), (36, 55), (43, 22), (57, 22), (64, 55), (70, 22), (87, 22), (73, 74), (56, 74), (50, 46), (44, 74), (27, 74)]
BAR = [(16, 81), (84, 81), (84, 89), (16, 89)]
SKEW = math.tan(math.radians(7))


def skew(pts):
    return [(x + (50 - y) * SKEW, y) for x, y in pts]


def render(size, pad=0.0, bg=None, radius=0.22):
    s = size * 4  # suréchantillonnage, puis réduction pour des bords nets
    im = Image.new("RGBA", (s, s), bg or (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    inset = s * pad
    box = s - 2 * inset
    d.rounded_rectangle([inset, inset, s - inset, s - inset], radius=box * radius, fill=RED)
    k = box / 100
    t = lambda pts: [(inset + x * k, inset + y * k) for x, y in skew(pts)]
    d.polygon(t(W), fill=WHITE)
    d.polygon(t(BAR), fill=YELLOW)
    return im.resize((size, size), Image.LANCZOS)


root = "C:/Users/seb/Desktop/warmup-generator/"
render(512).save(root + "public/logo.png")
render(180, pad=0.0, bg=RED, radius=0).save(root + "app/apple-icon.png")
render(180, pad=0.0, bg=RED, radius=0).save(root + "public/icons/logo-apple-touch.png")
render(192).save(root + "public/icons/logo-pwa-192.png")
render(512).save(root + "public/icons/logo-pwa-512.png")
# Maskable : zone sûre de 80 %, fond plein.
render(512, pad=0.1, bg=RED, radius=0).save(root + "public/icons/logo-pwa-maskable-512.png")
render(512, pad=0.1, bg=RED, radius=0).save(root + "public/icons/maskable-512.png")
ico = render(256)
ico.save(root + "app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
render(96).save(root + "app/icon.png")
print("ok")
