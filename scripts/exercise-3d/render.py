"""
Rendu 3D des animations d'exercices, à partir des mêmes postures que les
pictogrammes (lib/figures.ts, exportées en JSON par export-poses.mjs).

Un mannequin MPFB (MakeHuman, CC0) reçoit, image par image, les angles
d'articulations de la posture interpolée ; les segments travaillés sont teintés
en rouge. Chaque image est rendue avec fond transparent (EEVEE), puis assemblée
en WebP animé par build-webp.py.

Usage :
  blender -b --python scripts/exercise-3d/render.py -- <poses.json> <dossier_png> <id> [<id> ...]
"""

import json
import math
import os
import sys

import bpy
import numpy as np
from mathutils import Matrix, Vector

from bl_ext.blender_org.mpfb.services.humanservice import HumanService

argv = sys.argv[sys.argv.index("--") + 1 :]
POSES_FILE, OUT_DIR, IDS = argv[0], argv[1], argv[2:]
FIGS = json.load(open(POSES_FILE, encoding="utf-8"))

FPS = 24
RES = (480, 440)  # 2 × le cadre des pictogrammes (240 × 220)
BODY = (0.11, 0.125, 0.14)  # gris acier (linéaire), lisible sur fond clair comme sombre
WORK = (0.6, 0.012, 0.02)  # rouge du disque de 25 (linéaire)


# --------------------------------------------------------------------------
# Scène, mannequin, matériaux


def srgb(c):
    return tuple(((v + 0.055) / 1.055) ** 2.4 if v > 0.04045 else v / 12.92 for v in c)


def setup_scene():
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o)
    sc = bpy.context.scene
    for engine in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
        try:
            sc.render.engine = engine
            break
        except TypeError:
            continue
    sc.render.resolution_x, sc.render.resolution_y = RES
    sc.render.film_transparent = True
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA"
    sc.view_settings.view_transform = "Standard"
    try:
        sc.eevee.taa_render_samples = 32
        sc.eevee.use_shadows = True
    except AttributeError:
        pass
    world = bpy.data.worlds.new("World")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (0.75, 0.77, 0.8, 1)
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.55
    sc.world = world
    # Lumière principale douce, en haut à gauche de la caméra.
    sun = bpy.data.objects.new("Key", bpy.data.lights.new("Key", "SUN"))
    sun.data.energy = 3.2
    sun.data.angle = math.radians(35)
    sun.rotation_euler = (math.radians(50), 0, math.radians(-120))
    sc.collection.objects.link(sun)
    return sc


def create_mannequin():
    macro = {
        "gender": 0.5, "age": 0.45, "muscle": 0.68, "weight": 0.45, "proportions": 0.6,
        "height": 0.5, "cupsize": 0.4, "firmness": 0.6,
        "race": {"asian": 0.33, "caucasian": 0.33, "african": 0.33},
    }
    mesh = HumanService.create_human(macro_detail_dict=macro)
    rig = HumanService.add_builtin_rig(mesh, "game_engine")
    # Peau lisse façon mannequin d'atelier.
    sub = mesh.modifiers.new("Subdiv", "SUBSURF")
    sub.levels = sub.render_levels = 1
    bpy.ops.object.select_all(action="DESELECT")
    mesh.select_set(True)
    bpy.context.view_layer.objects.active = mesh
    bpy.ops.object.shade_smooth()
    return mesh, rig


SEGMENT_BONES = {
    "torso": ["pelvis", "spine_01", "spine_02", "spine_03"],
    "head": ["neck_01", "head"],
    "ua": ["upperarm_{s}", "clavicle_{s}"],
    "fa": ["lowerarm_{s}", "hand_{s}"],
    "th": ["thigh_{s}"],
    "sh": ["calf_{s}", "foot_{s}", "ball_{s}"],
}


def worked_bones(fig, near, far):
    """Os des segments travaillés. Un segment noté sur le côté proche colore
    aussi le côté éloigné quand les deux côtés font le même mouvement."""
    hi = set(fig.get("hi", []))
    a, b = fig["frames"]
    bones = set()
    for seg in hi:
        base = seg.rstrip("2")
        side = far if seg.endswith("2") else near
        names = SEGMENT_BONES.get(base, [])
        for n in names:
            bones.add(n.format(s=side))
        if base in ("ua", "fa", "th", "sh") and not seg.endswith("2"):
            asym = any(base + "2" in p and p[base + "2"] != p.get(base) for p in (a, b))
            if not asym:
                for n in names:
                    bones.add(n.format(s=far))
    return bones


def paint(mesh, bones):
    """Couleur par sommet : part du rouge = poids cumulé des os travaillés,
    pour un passage doux d'une zone à l'autre."""
    me = mesh.data
    groups = {g.index: g.name for g in mesh.vertex_groups}
    deform = {n for n in groups.values() if n in mesh.parent.data.bones} if mesh.parent else set(groups.values())
    attr = me.color_attributes.get("work") or me.color_attributes.new("work", "FLOAT_COLOR", "POINT")
    body, work = BODY + (1,), WORK + (1,)
    for v in me.vertices:
        tot = w = 0.0
        for g in v.groups:
            name = groups.get(g.group)
            if name in deform:
                tot += g.weight
                if name in bones:
                    w += g.weight
        k = (w / tot) if tot else 0.0
        k = min(1.0, max(0.0, (k - 0.25) / 0.5))  # transition resserrée
        attr.data[v.index].color = tuple(body[i] + (work[i] - body[i]) * k for i in range(4))
    mat = bpy.data.materials.get("Mannequin") or bpy.data.materials.new("Mannequin")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    col = nt.nodes.new("ShaderNodeAttribute")
    col.attribute_name = "work"
    nt.links.new(col.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.55
    nt.links.new(bsdf.outputs[0], out.inputs[0])
    me.materials.clear()
    me.materials.append(mat)


def contact_shadow(sc):
    """Ombre de contact : disque flou sous le corps (EEVEE n'a pas d'attrape-ombre)."""
    bpy.ops.mesh.primitive_plane_add(size=1)
    plane = bpy.context.active_object
    plane.name = "Shadow"
    mat = bpy.data.materials.new("Shadow")
    mat.use_nodes = True
    mat.blend_method = "BLEND" if hasattr(mat, "blend_method") else None
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    grad = nt.nodes.new("ShaderNodeTexGradient")
    grad.gradient_type = "SPHERICAL"
    mapn = nt.nodes.new("ShaderNodeMapping")
    mapn.inputs["Location"].default_value = (0.5, 0.5, 0)
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.0
    ramp.color_ramp.elements[0].color = (0, 0, 0, 1)
    ramp.color_ramp.elements[1].position = 1.0
    ramp.color_ramp.elements[1].color = (1, 1, 1, 1)
    transp = nt.nodes.new("ShaderNodeBsdfTransparent")
    dark = nt.nodes.new("ShaderNodeEmission")
    dark.inputs["Color"].default_value = (0, 0, 0, 1)
    mix = nt.nodes.new("ShaderNodeMixShader")
    pw = nt.nodes.new("ShaderNodeMath")
    pw.operation = "MULTIPLY"
    pw.inputs[1].default_value = 0.28
    # Centre (0,5 ; 0,5) → gradient sphérique : 1 au centre, 0 au bord.
    sub = nt.nodes.new("ShaderNodeVectorMath")
    sub.operation = "SUBTRACT"
    sub.inputs[1].default_value = (0.5, 0.5, 0)
    nt.links.new(tc.outputs["UV"], sub.inputs[0])
    sc2 = nt.nodes.new("ShaderNodeVectorMath")
    sc2.operation = "SCALE"
    sc2.inputs["Scale"].default_value = 2.0
    nt.links.new(sub.outputs[0], sc2.inputs[0])
    nt.links.new(sc2.outputs[0], grad.inputs["Vector"])
    nt.links.new(grad.outputs["Fac"], pw.inputs[0])
    nt.links.new(pw.outputs[0], mix.inputs[0])
    nt.links.new(transp.outputs[0], mix.inputs[1])
    nt.links.new(dark.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs[0])
    plane.data.materials.append(mat)
    plane.visible_shadow = False
    return plane


# --------------------------------------------------------------------------
# Postures : mêmes conventions que lib/figure.ts


def lerp_pose(a, b, k):
    keys = set(a) | set(b)

    def fb(p, key):
        if key in p:
            return p[key]
        base = {"ua2": "ua", "fa2": "fa", "th2": "th", "sh2": "sh", "ft2": "ft"}.get(key)
        if base and base in p:
            return p[base]
        if key in ("ft", "ft2"):
            return p.get("ft", 90)
        if key == "t2":
            return p.get("t", 0)
        return 0

    return {k_: fb(a, k_) + (fb(b, k_) - fb(a, k_)) * k for k_ in keys}


def phase(x):
    """Même rythme que le composant ExerciseFigure : aller, pause, retour."""
    tri = x * 2 if x < 0.5 else 2 - x * 2
    held = min(1, max(0, (tri - 0.12) / 0.76))
    return 4 * held**3 if held < 0.5 else 1 - (-2 * held + 2) ** 3 / 2


def sag(a):
    """Segment de membre vu de profil : 0 = bas, 90 = avant, 180 = haut. Avant = -Y."""
    r = math.radians(a)
    return Vector((0, -math.sin(r), -math.cos(r)))


def trunk(t):
    r = math.radians(t)
    return Vector((0, -math.sin(r), math.cos(r)))


def directions(view, p):
    """Direction cible (repère armature) de chaque os piloté."""
    g = lambda k, d=0: p.get(k, d)
    d = {}
    if view == "front":
        # Face caméra : le côté proche est le gauche du personnage (+X).
        ab = lambda a, sgn: Vector((sgn * math.sin(math.radians(a)), 0, -math.cos(math.radians(a))))
        tilt = Matrix.Rotation(math.radians(-g("t")), 4, "Y")
        up = (tilt @ Vector((0, 0, 1))).normalized()
        for b in ("pelvis", "spine_01", "spine_02", "spine_03", "neck_01", "head"):
            d[b] = up
        d["upperarm_l"] = (tilt @ ab(g("ua"), 1)).normalized()
        d["lowerarm_l"] = (tilt @ ab(g("fa"), 1)).normalized()
        d["upperarm_r"] = (tilt @ ab(g("ua2", g("ua")), -1)).normalized()
        d["lowerarm_r"] = (tilt @ ab(g("fa2", g("fa")), -1)).normalized()
        d["thigh_l"] = ab(g("th"), 1)
        d["calf_l"] = ab(g("sh"), 1)
        d["thigh_r"] = ab(g("th2", g("th")), -1)
        d["calf_r"] = ab(g("sh2", g("sh")), -1)
        return d
    # Profil : le côté proche est le droit du personnage (-X), face à la caméra.
    t, t2 = g("t"), g("t2", g("t"))
    d["pelvis"] = d["spine_01"] = d["spine_02"] = trunk(t)
    d["spine_03"] = trunk(t2)
    d["neck_01"] = d["head"] = trunk(t2 + g("hd"))
    # Léger écart latéral : en 3D, un bras dans le plan du corps traverse le buste.
    out = lambda v, sgn, k=0.22: (v + Vector((sgn * k, 0, 0))).normalized()
    d["upperarm_r"], d["lowerarm_r"] = out(sag(g("ua")), -1), out(sag(g("fa")), -1, 0.08)
    d["upperarm_l"], d["lowerarm_l"] = out(sag(g("ua2", g("ua"))), 1), out(sag(g("fa2", g("fa"))), 1, 0.08)
    d["thigh_r"], d["calf_r"] = out(sag(g("th")), -1, 0.06), sag(g("sh"))
    d["thigh_l"], d["calf_l"] = out(sag(g("th2", g("th"))), 1, 0.06), sag(g("sh2", g("sh")))
    # Mains en appui (buste penché, avant-bras vertical) : à plat, doigts vers l'avant.
    if t >= 45:
        if abs(g("fa")) < 35:
            d["hand_r"] = out(sag(80), -1, 0.1)
        if abs(g("fa2", g("fa"))) < 35:
            d["hand_l"] = out(sag(80), 1, 0.1)
    d["foot_r"] = sag(g("ft", 90))
    d["foot_l"] = sag(g("ft2", g("ft", 90)))
    return d


ORDER = ["pelvis", "spine_01", "spine_02", "spine_03", "neck_01", "head",
         "upperarm_l", "lowerarm_l", "hand_l", "upperarm_r", "lowerarm_r", "hand_r",
         "thigh_l", "calf_l", "foot_l", "thigh_r", "calf_r", "foot_r"]


def apply_pose(rig, view, p, rest_y):
    for pb in rig.pose.bones:
        pb.matrix_basis = Matrix.Identity(4)
    bpy.context.view_layer.update()
    dirs = directions(view, p)
    for name in ORDER:
        if name not in dirs:
            continue
        pb = rig.pose.bones[name]
        cur = pb.matrix.to_3x3() @ Vector((0, 1, 0))
        rot = cur.rotation_difference(dirs[name]).to_matrix().to_4x4()
        m = pb.matrix.copy()
        loc = m.translation.copy()
        m = rot @ m
        m.translation = loc
        pb.matrix = m
        bpy.context.view_layer.update()


def world_points(mesh, step=7):
    dg = bpy.context.evaluated_depsgraph_get()
    ev = mesh.evaluated_get(dg)
    me = ev.to_mesh()
    mw = ev.matrix_world
    co = np.empty(len(me.vertices) * 3, dtype=np.float32)
    me.vertices.foreach_get("co", co)
    co = co.reshape(-1, 3)[::step]
    ev.to_mesh_clear()
    return [mw @ Vector(c) for c in co]


def bone_head(rig, name):
    return rig.matrix_world @ rig.pose.bones[name].head


def anchor_point(rig, fig):
    a = fig.get("anchor") or ("hand" if fig.get("hang") else "foot")
    if a == "hand":
        return (bone_head(rig, "hand_l") + bone_head(rig, "hand_r")) / 2
    if a == "hip":
        return bone_head(rig, "pelvis")
    if a == "head":
        return bone_head(rig, "head")
    if a in ("foot1", "foot2"):
        near = "r" if fig["view"] == "side" else "l"
        side = near if a == "foot1" else ("l" if near == "r" else "r")
        return bone_head(rig, "foot_" + side)
    return (bone_head(rig, "foot_l") + bone_head(rig, "foot_r")) / 2


# --------------------------------------------------------------------------
# Accessoires : barre, haltères, kettlebell, barre de traction, mur, élastique.
# Volontairement simples et sombres : ils situent le geste sans voler la vedette.

METAL = (0.03, 0.035, 0.04)


def flat_mat(name, color, rough=0.45):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color + (1,)
    bsdf.inputs["Roughness"].default_value = rough
    return mat


def cylinder(name, r, length, color, axis="X"):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=length, vertices=32)
    o = bpy.context.active_object
    o.name = name
    if axis == "X":
        o.rotation_euler = (0, math.radians(90), 0)
    elif axis == "Y":
        o.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(rotation=True)
    bpy.ops.object.shade_smooth()
    o.data.materials.append(flat_mat(name + "M", color))
    return o


def hand(rig, side):
    return rig.matrix_world @ rig.pose.bones["hand_" + side].tail


def build_props(fig):
    objs = []
    for pr in fig.get("props", []):
        k = pr["kind"]
        if k == "pullbar":
            objs.append((k, cylinder("PullBar", 0.016, 1.3, METAL)))
        elif k == "bar":
            bar = cylinder("Bar", 0.014, 1.9, METAL)
            for sx in (-1, 1):
                plate = cylinder("Plate", 0.2, 0.05, (0.5, 0.02, 0.03))
                plate.location = (sx * 0.78, 0, 0)
                plate.parent = bar
            objs.append((k, bar))
        elif k == "db":
            for side in ("l", "r"):
                objs.append((k + side, cylinder("Db" + side, 0.05, 0.24, METAL)))
        elif k == "kb":
            bpy.ops.mesh.primitive_uv_sphere_add(radius=0.1)
            kb = bpy.context.active_object
            bpy.ops.object.shade_smooth()
            kb.data.materials.append(flat_mat("KbM", METAL))
            objs.append((k, kb))
        elif k == "wall":
            bpy.ops.mesh.primitive_cube_add(size=1)
            wall = bpy.context.active_object
            wall.scale = (1.3, 0.04, 2.3)
            wall.data.materials.append(flat_mat("WallM", (0.45, 0.47, 0.5), 0.8))
            objs.append(((k, pr.get("x", 60)), wall))
        elif k == "band":
            objs.append(((k, pr["to"][0]), cylinder("Band", 0.007, 1.0, (0.6, 0.06, 0.05), axis="Z")))
    return objs


def place_props(objs, rig, frame0, pts):
    """Accessoires accrochés aux mains ; les fixes (mur, barre de traction,
    ancrage d'élastique) gardent la position de la première image."""
    hl, hr = hand(rig, "l"), hand(rig, "r")
    mid = (hl + hr) / 2
    for key, o in objs:
        k = key[0] if isinstance(key, tuple) else key
        if k == "bar":
            o.location = mid
        elif k in ("dbl", "dbr"):
            o.location = hl if k == "dbl" else hr
        elif k == "kb":
            o.location = mid - Vector((0, 0, 0.12))
        elif k == "pullbar":
            if "pullbar" not in frame0:
                frame0["pullbar"] = Vector((mid.x, mid.y, max(hl.z, hr.z)))
            o.location = frame0["pullbar"]
        elif k == "wall":
            if "wall" not in frame0:
                behind = key[1] < 120
                ys = [q.y for q in pts]
                frame0["wall"] = Vector((sum(q.x for q in pts) / len(pts), (max(ys) + 0.05) if behind else (min(ys) - 0.05), 1.15))
            o.location = frame0["wall"]
        elif k == "band":
            if "band" not in frame0:
                fwd = -1 if key[1] > 120 else 1
                frame0["band"] = mid + Vector((0, 0.9 * fwd, 0))
            a, b = mid, frame0["band"]
            o.location = (a + b) / 2
            d = b - a
            o.scale = (1, 1, max(0.01, d.length))
            o.rotation_euler = Vector((0, 0, 1)).rotation_difference(d.normalized()).to_euler()


# --------------------------------------------------------------------------
# Caméra et rendu


def setup_camera(sc, view):
    cam = bpy.data.objects.new("Cam", bpy.data.cameras.new("Cam"))
    cam.data.type = "ORTHO"
    sc.collection.objects.link(cam)
    sc.camera = cam
    # Trois quarts : assez de volume pour lire la 3D, assez de profil pour lire le geste.
    if view == "side":
        az = math.radians(-90 + 28)  # depuis le côté droit, légèrement de face
    else:
        az = math.radians(18)
    el = math.radians(8)
    fwd = Vector((math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el)))
    # fwd : de la cible vers la caméra
    cam["dir"] = list(fwd)
    return cam


def frame_camera(cam, all_pts):
    fwd = Vector(cam["dir"]).normalized()
    look = -fwd
    up = Vector((0, 0, 1))
    right = look.cross(up).normalized()
    up2 = right.cross(look).normalized()
    xs = [p.dot(right) for p in all_pts]
    ys = [p.dot(up2) for p in all_pts]
    zs = [p.dot(fwd) for p in all_pts]
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    aspect = RES[0] / RES[1]
    cam.data.ortho_scale = max(w, h * aspect) * 1.12
    center = right * cx + up2 * cy + fwd * (max(zs) + 3)
    cam.location = center
    rot = Matrix((right, up2, fwd)).transposed().to_4x4()
    cam.rotation_euler = rot.to_euler()
    cam.data.clip_end = 20


def render_figure(sc, mesh, rig, shadow, fid, fig, rest_y):
    view = fig["view"]
    a, b = fig["frames"]
    near, far = ("r", "l") if view == "side" else ("l", "r")
    paint(mesh, worked_bones(fig, near, far))
    n = max(24, round(fig.get("dur", 2.6) * FPS))
    root = rig.pose.bones["Root"]
    poses, offsets, pts_all = [], [], []
    ref = None
    for i in range(n):
        p = lerp_pose(a, b, phase(i / n))
        root.location = (0, 0, 0)
        apply_pose(rig, view, p, rest_y)
        pts = world_points(mesh)
        anc = anchor_point(rig, fig)
        if ref is None:
            ref = anc.copy()
        off = Vector((ref.x - anc.x, ref.y - anc.y, 0))
        if fig.get("hang"):
            off.z = 2.25 - max(bone_head(rig, "hand_l").z, bone_head(rig, "hand_r").z)
        elif fig.get("seat") is not None:
            off.z = 0.45 - bone_head(rig, "pelvis").z
        else:
            off.z = -min(q.z for q in pts)
        poses.append(p)
        offsets.append(off)
        pts_all += [q + off for q in pts[::4]]
    props = build_props(fig)
    setup = setup_camera(sc, view)
    frame_camera(setup, pts_all + [Vector((pts_all[0].x, pts_all[0].y, 0))])
    # Ombre : sous la zone d'appui moyenne.
    foot = sum((o for o in offsets), Vector()) / len(offsets)
    os.makedirs(os.path.join(OUT_DIR, fid), exist_ok=True)
    preview = os.environ.get("PREVIEW")
    frame0 = {}
    for i, (p, off) in enumerate(zip(poses, offsets)):
        if preview and i not in (0, n // 6, n // 3, n // 2):
            continue
        root.location = (0, 0, 0)
        apply_pose(rig, view, p, rest_y)
        # Root : la translation de l'os racine est exprimée dans son repère local.
        rb = rig.data.bones["Root"]
        root.location = rb.matrix_local.to_3x3().inverted() @ off
        bpy.context.view_layer.update()
        body_pts = world_points(mesh, 23)
        place_props(props, rig, frame0, body_pts)
        ground = [q for q in body_pts if q.z < 0.08]
        if ground:
            xs, ys = [q.x for q in ground], [q.y for q in ground]
            shadow.location = ((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, 0.001)
            shadow.scale = (max(0.35, (max(xs) - min(xs)) * 1.5), max(0.35, (max(ys) - min(ys)) * 1.5), 1)
            shadow.hide_render = False
        else:
            shadow.hide_render = True
        sc.render.filepath = os.path.join(OUT_DIR, fid, f"{i:03d}.png")
        bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(setup)
    for _, o in props:
        for c in list(o.children):
            bpy.data.objects.remove(c)
        bpy.data.objects.remove(o)
    json.dump({"frames": n, "fps": FPS}, open(os.path.join(OUT_DIR, fid, "meta.json"), "w"))


def main():
    sc = setup_scene()
    mesh, rig = create_mannequin()
    shadow = contact_shadow(sc)
    rest_y = {b.name: (b.matrix_local.to_3x3() @ Vector((0, 1, 0))) for b in rig.data.bones}
    for fid in IDS:
        fig = FIGS.get(fid)
        if not fig:
            print("INCONNU", fid)
            continue
        render_figure(sc, mesh, rig, shadow, fid, fig, rest_y)
        print("RENDU", fid)


main()
