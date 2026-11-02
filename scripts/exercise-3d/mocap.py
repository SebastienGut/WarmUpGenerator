"""
Transfert d'un mouvement capté ou généré (BVH au squelette HumanML3D, celui
de MoMask) vers le mannequin MPFB.

Principe : pour chaque os, on mesure sa rotation monde par rapport à la pose de
repos du BVH (pose en T), et on applique la même rotation à l'os correspondant
du mannequin placé lui aussi en T. On copie ainsi la rotation complète, roulis
compris : pas de membre vrillé. Le déplacement du bassin est mis à l'échelle de
la taille du mannequin.
"""

import math

import bpy
from mathutils import Matrix, Vector

# Os du mannequin (rig game_engine) ← articulation du BVH.
MAP = {
    "pelvis": "Hips", "spine_01": "Spine", "spine_02": "Spine1", "spine_03": "Spine2",
    "neck_01": "Neck", "head": "Head",
    "clavicle_l": "LeftShoulder", "upperarm_l": "LeftArm", "lowerarm_l": "LeftForeArm", "hand_l": "LeftHand",
    "clavicle_r": "RightShoulder", "upperarm_r": "RightArm", "lowerarm_r": "RightForeArm", "hand_r": "RightHand",
    "thigh_l": "LeftUpLeg", "calf_l": "LeftLeg", "foot_l": "LeftFoot", "ball_l": "LeftToe",
    "thigh_r": "RightUpLeg", "calf_r": "RightLeg", "foot_r": "RightFoot", "ball_r": "RightToe",
}
SRC_FPS = 20


class Mocap:
    def __init__(self, path, kin, target_rig):
        before = set(bpy.data.objects)
        bpy.ops.import_anim.bvh(filepath=path, axis_forward="-Z", axis_up="Y", rotate_mode="NATIVE",
                                frame_start=1, use_fps_scale=False, update_scene_fps=False, update_scene_duration=False)
        self.src = next(o for o in bpy.data.objects if o not in before and o.type == "ARMATURE")
        self.src.hide_render = True
        mw = self.src.matrix_world.to_3x3()
        self.rest = {b.name: mw @ b.matrix_local.to_3x3() for b in self.src.data.bones}
        sb = self.src.data.bones
        world = self.src.matrix_world
        self.hips_rest = world @ sb["Hips"].head_local
        # Orientation : le BVH regarde vers ses orteils ; le mannequin regarde vers -Y.
        toe = (world @ sb["LeftToe"].head_local) - (world @ sb["LeftFoot"].head_local)
        toe.z = 0
        yaw = math.atan2(toe.x, -toe.y)  # angle de toe par rapport à -Y
        self.yaw = Matrix.Rotation(-yaw, 3, "Z")
        # Échelle : longueur de jambe du mannequin / du BVH.
        leg_src = (sb["LeftUpLeg"].head_local - sb["LeftFoot"].head_local).length
        tb = target_rig.data.bones
        leg_tgt = (tb["thigh_l"].head_local - tb["foot_l"].head_local).length
        self.scale = leg_tgt / leg_src
        # Mannequin en T, même référence que le BVH (clavicules à plat).
        self.tpose = kin.world({"sh": (0, 90), "clav": (-6, 0)})
        self.kin = kin

    def world_at(self, frame):
        """Rotations monde du mannequin et déplacement du bassin à l'image BVH donnée
        (nombre réel : on interpole entre deux images)."""
        sc = bpy.context.scene
        f = int(math.floor(frame))
        sc.frame_set(f + 1, subframe=frame - f)
        mw = self.src.matrix_world.to_3x3()
        pbs = self.src.pose.bones
        W = {}
        yi = self.yaw.inverted()
        for tgt, src in MAP.items():
            d = (mw @ pbs[src].matrix.to_3x3()) @ self.rest[src].inverted()
            W[tgt] = self.yaw @ d @ yi @ self.tpose[tgt]
        hips = self.src.matrix_world @ pbs["Hips"].head
        move = self.yaw @ (hips - self.hips_rest) * self.scale
        return W, move

    def cleanup(self):
        act = self.src.animation_data.action if self.src.animation_data else None
        bpy.data.objects.remove(self.src)
        if act:
            bpy.data.actions.remove(act)
