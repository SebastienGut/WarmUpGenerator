"""
Cinématique anatomique du mannequin MPFB (rig « game_engine »).

Une posture se décrit articulation par articulation, en degrés, comme en kiné :
  body   (pitch, roll, yaw)   orientation de tout le corps (pitch 90 = face au sol)
  pelvis (bascule, incl., rot) bassin par rapport au corps
  spine  (flexion, incl., rot) colonne, répartie sur trois vertèbres
  neck   (flexion, incl., rot) cou et tête
  clav   (élévation, protraction)          clavicule (épaule « qui monte / avance »)
  sh     (flexion, abduction, rotation ext., abduction horizontale)  épaule
  el     flexion du coude
  wr     (flexion vers l'avant de la main, inclinaison)               poignet
  hip    (flexion, abduction, rotation ext.)                           hanche
  kn     flexion du genou
  ank    flexion dorsale de la cheville (pointe vers le haut)
  grip   0 à 1 : main ouverte → poing
Suffixes _l / _r pour un côté ; sans suffixe, les deux côtés.

Repère du corps au repos : regarde vers -Y, gauche = +X, haut = +Z. Chaque os
reçoit une rotation exprimée dans le repère de son parent déjà posé, puis
convertie dans son repère local de repos : aucun roulis parasite, la rotation
autour de l'os est toujours explicite.
"""

import math

from mathutils import Matrix, Vector


def R(axis, deg):
    return Matrix.Rotation(math.radians(deg), 3, axis)


def side_rot(kind, side, v):
    """Rotation anatomique d'une articulation latérale (gauche = +X)."""
    s = 1 if side == "l" else -1
    if kind == "sh":
        flex, abd, rot, hab = (list(v) + [0, 0, 0, 0])[:4]
        return R("Z", s * hab) @ R("X", -flex) @ R("Y", -s * abd) @ R("Z", s * rot)
    if kind == "hip":
        flex, abd, rot = (list(v) + [0, 0, 0])[:3]
        return R("X", -flex) @ R("Y", -s * abd) @ R("Z", s * rot)
    if kind == "clav":
        elev, prot = (list(v) + [0, 0])[:2]
        return R("Z", -s * prot) @ R("Y", -s * elev)
    if kind == "el":
        return R("X", -v)
    if kind == "kn":
        return R("X", v)
    if kind == "ank":
        return R("X", -v)
    if kind == "wr":
        flex, dev = (list(v) + [0, 0])[:2] if isinstance(v, (list, tuple)) else (v, 0)
        return R("X", -flex) @ R("Y", -s * dev)
    raise KeyError(kind)


def trunk_rot(v, share=1.0):
    flex, lat, rot = (list(v) + [0, 0, 0])[:3]
    return R("Z", rot * share) @ R("Y", lat * share) @ R("X", flex * share)


# Os pilotés → (articulation, côté). Les autres suivent leur parent.
LIMBS = {
    "clavicle_l": ("clav", "l"), "clavicle_r": ("clav", "r"),
    "upperarm_l": ("sh", "l"), "upperarm_r": ("sh", "r"),
    "lowerarm_l": ("el", "l"), "lowerarm_r": ("el", "r"),
    "hand_l": ("wr", "l"), "hand_r": ("wr", "r"),
    "thigh_l": ("hip", "l"), "thigh_r": ("hip", "r"),
    "calf_l": ("kn", "l"), "calf_r": ("kn", "r"),
    "foot_l": ("ank", "l"), "foot_r": ("ank", "r"),
}
SPINE = {"spine_01": 0.3, "spine_02": 0.3, "spine_03": 0.4}
NECK = {"neck_01": 0.5, "head": 0.5}
FINGERS = ("index", "middle", "ring", "pinky")

# Position neutre de chaque segment (debout, bras le long du corps) : le rig
# MPFB est en pose « A », bras écartés à 45° et coudes un peu fléchis.
NEUTRAL_DIR = {
    "upperarm_l": (0.12, 0.0, -1), "upperarm_r": (-0.12, 0.0, -1),
    "lowerarm_l": (0.08, -0.02, -1), "lowerarm_r": (-0.08, -0.02, -1),
    "hand_l": (0.06, -0.02, -1), "hand_r": (-0.06, -0.02, -1),
    "thigh_l": (0.05, 0.0, -1), "thigh_r": (-0.05, 0.0, -1),
    "calf_l": (0.02, 0.03, -1), "calf_r": (-0.02, 0.03, -1),
}


def get(p, key, side, default):
    """Valeur d'articulation : clé latérale prioritaire, sinon clé commune."""
    if side and f"{key}_{side}" in p:
        return p[f"{key}_{side}"]
    return p.get(key, default)


class Rig:
    def __init__(self, rig):
        self.rig = rig
        self.rest = {b.name: b.matrix_local.to_3x3() for b in rig.data.bones}
        self.parent = {b.name: (b.parent.name if b.parent else None) for b in rig.data.bones}
        self.order = [b.name for b in rig.data.bones]  # parents avant enfants
        # Rotation monde qui amène chaque os de sa pose de repos à la neutre.
        self.neutral = {}
        for b in rig.data.bones:
            if b.name in NEUTRAL_DIR:
                d = (b.tail_local - b.head_local).normalized()
                self.neutral[b.name] = d.rotation_difference(Vector(NEUTRAL_DIR[b.name]).normalized()).to_matrix()
            else:
                self.neutral[b.name] = Matrix.Identity(3)

    def pose(self, p):
        """Applique une posture (dict d'articulations) au squelette."""
        A, W = {}, {}
        for name in self.order:
            par = self.parent[name]
            Ap = A.get(par, Matrix.Identity(3))
            local = Matrix.Identity(3)
            if name == "pelvis":
                pitch, roll, yaw = (list(p.get("body", (0, 0, 0))) + [0, 0, 0])[:3]
                local = R("Z", yaw) @ R("Y", roll) @ R("X", pitch) @ trunk_rot(p.get("pelvis", (0, 0, 0)))
            elif name in SPINE:
                local = trunk_rot(p.get("spine", (0, 0, 0)), SPINE[name])
            elif name in NECK:
                local = trunk_rot(p.get("neck", (0, 0, 0)), NECK[name])
            elif name in LIMBS:
                kind, side = LIMBS[name]
                v = get(p, kind, side, 0 if kind in ("el", "kn", "ank") else (0, 0, 0))
                if kind == "clav":
                    v = self.auto_clavicle(p, side, v)
                elif kind == "sh":
                    v = self.shoulder_minus_clavicle(p, side, v)
                local = side_rot(kind, side, v)
            elif name.startswith(FINGERS) or name.startswith("thumb"):
                g = get(p, "grip", name[-1], 0.25)
                k = 0.35 if name.startswith("thumb") else 1.0
                local = R("X", -75 * g * k) if not name.startswith("thumb") else R("Y", 20 * g)
            A[name] = Ap @ local
        for name in self.order:
            W[name] = A[name] @ self.neutral[name]
        pb = self.rig.pose.bones
        for name in self.order:
            par = self.parent[name]
            Wp = W[par] if par else Matrix.Identity(3)
            rest = self.rest[name]
            if name.startswith(FINGERS) or name.startswith("thumb"):
                # Doigts : flexion dans leur propre repère (axe X local = charnière).
                g = get(p, "grip", name.split("_")[-1], 0.25)
                ang = 70 * g if not name.startswith("thumb") else 25 * g
                basis = Matrix.Rotation(math.radians(ang), 3, "X")
            else:
                basis = rest.inverted() @ Wp.inverted() @ W[name] @ rest
            pb[name].rotation_mode = "QUATERNION"
            pb[name].rotation_quaternion = basis.to_quaternion()
            pb[name].location = (0, 0, 0)

    # Rythme scapulo-huméral : au-delà de 60° d'abduction, la clavicule s'élève
    # d'un cinquième de l'angle, retranché à l'épaule pour garder l'angle total.
    # (L'élévation de la clavicule se fait dans le plan frontal : elle ne compense
    # pas une flexion vers l'avant, qui reste entière à l'épaule.)
    @staticmethod
    def _extra(v):
        v = list(v) + [0, 0, 0, 0]
        return 0.2 * max(0.0, v[1] - 60) if v[1] >= v[0] else 0.0

    def auto_clavicle(self, p, side, v):
        elev, prot = (list(v) + [0, 0])[:2]
        return (elev + self._extra(get(p, "sh", side, (0, 0, 0))), prot)

    def shoulder_minus_clavicle(self, p, side, v):
        v = list(v) + [0, 0, 0, 0]
        v[1] -= self._extra(v)
        return v[:4]


# --------------------------------------------------------------------------
# Lignes de temps : images clés et interpolation


def _vec(v):
    if v is None:
        return None
    return list(v) if isinstance(v, (list, tuple)) else [v]


def _val(p, key):
    """Valeur d'une articulation ; une clé latérale absente reprend la clé commune."""
    if key in p:
        return p[key]
    if key[-2:] in ("_l", "_r"):
        return p.get(key[:-2])
    return None


def blend(a, b, k):
    """Interpolation articulation par articulation (valeur absente = 0)."""
    out = {}
    for key in set(a) | set(b):
        la, lb = _vec(_val(a, key)), _vec(_val(b, key))
        n = max(len(la or []), len(lb or []))
        la = (la or []) + [0] * (n - len(la or []))
        lb = (lb or []) + [0] * (n - len(lb or []))
        mix = [x + (y - x) * k for x, y in zip(la, lb)]
        ref = _val(a, key) if _val(a, key) is not None else _val(b, key)
        scalar = not isinstance(ref, (list, tuple))
        out[key] = mix[0] if scalar else mix
    return out


def ease(x):
    return x * x * (3 - 2 * x)


def sample(spec, x):
    """Posture à l'instant x ∈ [0, 1[ de la boucle.

    spec["keys"] : liste de postures. spec["loop"] :
      "pingpong" (défaut) aller puis retour, avec une pause à chaque extrémité ;
      "cycle"    les postures s'enchaînent et reviennent à la première (marche).
    spec["base"] : posture commune complétée par chaque image clé."""
    base = spec.get("base", {})
    keys = [{**base, **k} for k in spec["keys"]]
    if len(keys) == 1:
        return keys[0]
    if spec.get("loop", "pingpong") == "cycle":
        n = len(keys)
        f = x * n
        i = int(f) % n
        return blend(keys[i], keys[(i + 1) % n], ease(f - int(f)))
    tri = x * 2 if x < 0.5 else 2 - x * 2
    held = min(1.0, max(0.0, (tri - 0.08) / 0.84))
    f = held * (len(keys) - 1)
    i = min(int(f), len(keys) - 2)
    return blend(keys[i], keys[i + 1], ease(f - i))
