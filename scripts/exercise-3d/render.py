"""
Rendu 3D des animations d'exercices.

Un mannequin MPFB (MakeHuman, CC0) est animé par des postures anatomiques
écrites d'après la consigne de chaque exercice (poses3d.py, moteur rig3d.py) ;
les segments travaillés sont teintés en rouge. Chaque image est rendue avec fond
transparent (EEVEE), puis assemblée en WebP animé par build-webp.py.

Usage :
  blender -b --python scripts/exercise-3d/render.py -- <dossier_png> <id> [<id> ...]
Variables : PREVIEW=1 (4 images seulement), VIEWS=1 (4 images sous 3 angles).
"""

import json
import math
import os
import sys

import bpy
import numpy as np
from mathutils import Matrix, Vector

from bl_ext.blender_org.mpfb.services.humanservice import HumanService

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rig3d  # noqa: E402
from poses3d import POSES  # noqa: E402

argv = sys.argv[sys.argv.index("--") + 1 :]
OUT_DIR, IDS = argv[0], argv[1:]

FPS = 24
RES = (480, 440)  # 2 × le cadre des pictogrammes (240 × 220)
BODY = (0.11, 0.125, 0.14)  # gris acier (linéaire), lisible sur fond clair comme sombre
WORK = (0.6, 0.012, 0.02)  # rouge du disque de 25 (linéaire)
METAL = (0.03, 0.035, 0.04)


# --------------------------------------------------------------------------
# Scène, mannequin, matériaux


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
    # Volume conservé aux articulations (quaternions doubles) : pas d'épaule ni
    # de coude qui s'écrase aux grands angles.
    for m in mesh.modifiers:
        if m.type == "ARMATURE":
            m.use_deform_preserve_volume = True
    # Peau lisse façon mannequin d'atelier.
    sub = mesh.modifiers.new("Subdiv", "SUBSURF")
    sub.levels = sub.render_levels = 1
    bpy.ops.object.select_all(action="DESELECT")
    mesh.select_set(True)
    bpy.context.view_layer.objects.active = mesh
    bpy.ops.object.shade_smooth()
    return mesh, rig


def worked_bones(spec, rig):
    """Os teintés : préfixes de noms d'os (« upperarm », « spine », « thigh_l »…)."""
    names = [b.name for b in rig.data.bones]
    return {n for n in names for pat in spec.get("work", []) if n.startswith(pat)}


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
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    grad = nt.nodes.new("ShaderNodeTexGradient")
    grad.gradient_type = "SPHERICAL"
    transp = nt.nodes.new("ShaderNodeBsdfTransparent")
    dark = nt.nodes.new("ShaderNodeEmission")
    dark.inputs["Color"].default_value = (0, 0, 0, 1)
    mix = nt.nodes.new("ShaderNodeMixShader")
    pw = nt.nodes.new("ShaderNodeMath")
    pw.operation = "MULTIPLY"
    pw.inputs[1].default_value = 0.28
    # UV centrés puis gradient sphérique : 1 au centre, 0 au bord.
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
# Mesures sur le corps posé


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


def hand(rig, side):
    return rig.matrix_world @ rig.pose.bones["hand_" + side].tail


def anchor_point(rig, spec):
    """Point d'appui qui ne glisse pas d'une image à l'autre."""
    a = spec.get("anchor", "feet")
    if a == "hands":
        return (hand(rig, "l") + hand(rig, "r")) / 2
    pairs = {"feet": ("foot_l", "foot_r"), "knees": ("calf_l", "calf_r")}
    if a in pairs:
        l, r = pairs[a]
        return (bone_head(rig, l) + bone_head(rig, r)) / 2
    return bone_head(rig, {"hip": "pelvis"}.get(a, a))


# --------------------------------------------------------------------------
# Accessoires : barre, haltères, kettlebell, barre de traction, mur, élastique.
# Volontairement simples et sombres : ils situent le geste sans voler la vedette.


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


def build_props(spec):
    objs = []
    for pr in spec.get("props", []):
        pr = pr if isinstance(pr, dict) else {"kind": pr}
        k = pr["kind"]
        if k == "pullbar":
            objs.append((pr, cylinder("PullBar", 0.016, 1.3, METAL)))
        elif k == "bar":
            bar = cylinder("Bar", 0.014, 1.9, METAL)
            for sx in (-1, 1):
                plate = cylinder("Plate", 0.2, 0.05, (0.5, 0.02, 0.03))
                plate.location = (sx * 0.78, 0, 0)
                plate.parent = bar
            objs.append((pr, bar))
        elif k == "db":
            for side in ("l", "r"):
                objs.append(({"kind": "db", "side": side}, cylinder("Db" + side, 0.05, 0.24, METAL)))
        elif k == "kb":
            bpy.ops.mesh.primitive_uv_sphere_add(radius=0.1)
            kb = bpy.context.active_object
            bpy.ops.object.shade_smooth()
            kb.data.materials.append(flat_mat("KbM", METAL))
            objs.append((pr, kb))
        elif k == "wall":
            bpy.ops.mesh.primitive_cube_add(size=1)
            wall = bpy.context.active_object
            wall.scale = (1.3, 0.04, 2.3)
            wall.data.materials.append(flat_mat("WallM", (0.45, 0.47, 0.5), 0.8))
            objs.append((pr, wall))
        elif k == "band":
            objs.append((pr, cylinder("Band", 0.007, 1.0, (0.6, 0.06, 0.05), axis="Z")))
    return objs


def place_props(objs, rig, frame0, pts):
    """Accessoires accrochés aux mains ; les fixes (mur, barre de traction,
    ancrage d'élastique) gardent la position de la première image."""
    hl, hr = hand(rig, "l"), hand(rig, "r")
    mid = (hl + hr) / 2
    for pr, o in objs:
        k = pr["kind"]
        if k == "bar":
            o.location = mid
        elif k == "db":
            o.location = hl if pr["side"] == "l" else hr
        elif k == "kb":
            o.location = mid - Vector((0, 0, 0.12))
        elif k == "pullbar":
            if "pullbar" not in frame0:
                frame0["pullbar"] = Vector((mid.x, mid.y, max(hl.z, hr.z)))
            o.location = frame0["pullbar"]
        elif k == "wall":
            if "wall" not in frame0:
                ys = [q.y for q in pts]
                behind = pr.get("side", "back") == "back"
                frame0["wall"] = Vector((sum(q.x for q in pts) / len(pts), (max(ys) + 0.03) if behind else (min(ys) - 0.03), 1.15))
            o.location = frame0["wall"]
        elif k == "band":
            if "band" not in frame0:
                fwd = -1 if pr.get("to", "front") == "front" else 1
                frame0["band"] = mid + Vector((0, 0.9 * fwd, 0))
            a, b = mid, frame0["band"]
            o.location = (a + b) / 2
            d = b - a
            o.scale = (1, 1, max(0.01, d.length))
            o.rotation_euler = Vector((0, 0, 1)).rotation_difference(d.normalized()).to_euler()


# --------------------------------------------------------------------------
# Caméra et rendu

CAMERAS = {
    # Azimut depuis la face (0 = de face, -90 = profil droit), élévation, en degrés.
    "side": (-62, 8),  # trois quarts côté droit : le geste de profil, le volume en plus
    "front": (18, 8),  # trois quarts de face
    "back": (155, 12),  # trois quarts de dos (omoplates)
    "top": (-55, 32),  # plongée (exercices au sol)
}


def setup_camera(sc, view):
    cam = bpy.data.objects.new("Cam", bpy.data.cameras.new("Cam"))
    cam.data.type = "ORTHO"
    sc.collection.objects.link(cam)
    sc.camera = cam
    az_deg, el_deg = CAMERAS[view] if isinstance(view, str) else view
    az, el = math.radians(az_deg), math.radians(el_deg)
    # De la cible vers la caméra.
    cam["dir"] = [math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el)]
    return cam


def frame_camera(cam, all_pts):
    fwd = Vector(cam["dir"]).normalized()
    look = -fwd
    right = look.cross(Vector((0, 0, 1))).normalized()
    up2 = right.cross(look).normalized()
    xs = [p.dot(right) for p in all_pts]
    ys = [p.dot(up2) for p in all_pts]
    zs = [p.dot(fwd) for p in all_pts]
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    cam.data.ortho_scale = max(w, h * RES[0] / RES[1]) * 1.12
    cam.location = right * cx + up2 * cy + fwd * (max(zs) + 3)
    cam.rotation_euler = Matrix((right, up2, fwd)).transposed().to_4x4().to_euler()
    cam.data.clip_end = 20


def solve_frames(rig, kin, mesh, spec, n):
    """Pose chaque image et calcule le décalage qui pose le corps au sol (ou
    les mains à la barre) sans faire glisser le point d'appui."""
    root = rig.pose.bones["Root"]
    poses, offsets, pts_all, ref = [], [], [], None
    for i in range(n):
        p = rig3d.sample(spec, i / n)
        root.location = (0, 0, 0)
        kin.pose(p)
        bpy.context.view_layer.update()
        pts = world_points(mesh)
        anc = anchor_point(rig, spec)
        if ref is None:
            ref = anc.copy()
        off = Vector((ref.x - anc.x, ref.y - anc.y, 0))
        if spec.get("hang"):
            off.z = 2.3 - max(hand(rig, "l").z, hand(rig, "r").z)
        elif spec.get("seat") is not None:
            off.z = spec["seat"] - bone_head(rig, "pelvis").z
        else:
            off.z = -min(q.z for q in pts)
        poses.append(p)
        offsets.append(off)
        pts_all += [q + off for q in pts[::4]]
    return poses, offsets, pts_all


def shoot(sc, rig, kin, mesh, shadow, props, frame0, p, off, path):
    root = rig.pose.bones["Root"]
    root.location = (0, 0, 0)
    kin.pose(p)
    # La translation de l'os racine s'exprime dans son repère local.
    root.location = rig.data.bones["Root"].matrix_local.to_3x3().inverted() @ off
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
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)


def render_figure(sc, mesh, rig, kin, shadow, fid, spec):
    paint(mesh, worked_bones(spec, rig))
    n = max(24, round(spec.get("dur", 2.6) * FPS))
    poses, offsets, pts_all = solve_frames(rig, kin, mesh, spec, n)
    props = build_props(spec)
    out = os.path.join(OUT_DIR, fid)
    os.makedirs(out, exist_ok=True)
    nk = len(spec["keys"])
    picks = (0, n // 6, n // 3, n // 2) if spec.get("loop", "pingpong") == "pingpong" else tuple(round(j * n / nk) for j in range(nk))
    multi = bool(os.environ.get("VIEWS"))
    own = spec.get("view", "side")
    views = ([own] + [v for v in ("front", "side", "back") if v != own]) if multi else [own]
    for view in views:
        cam = setup_camera(sc, view)
        frame_camera(cam, pts_all + [Vector((pts_all[0].x, pts_all[0].y, 0))])
        frame0 = {}
        for i, (p, off) in enumerate(zip(poses, offsets)):
            if (os.environ.get("PREVIEW") or multi) and i not in picks:
                continue
            tag = view if isinstance(view, str) else "own"
            name = f"{tag}-{i:03d}.png" if multi else f"{i:03d}.png"
            shoot(sc, rig, kin, mesh, shadow, props, frame0, p, off, os.path.join(out, name))
        bpy.data.objects.remove(cam)
    for _, o in props:
        for c in list(o.children):
            bpy.data.objects.remove(c)
        bpy.data.objects.remove(o)
    json.dump({"frames": n, "fps": FPS}, open(os.path.join(out, "meta.json"), "w"))


def main():
    sc = setup_scene()
    mesh, rig = create_mannequin()
    kin = rig3d.Rig(rig)
    shadow = contact_shadow(sc)
    for fid in IDS:
        spec = POSES.get(fid)
        if not spec:
            print("INCONNU", fid)
            continue
        render_figure(sc, mesh, rig, kin, shadow, fid, spec)
        print("RENDU", fid)


main()
