import bpy, sys
from bl_ext.blender_org.mpfb.services.humanservice import HumanService
for o in list(bpy.data.objects):
    bpy.data.objects.remove(o)
basemesh = HumanService.create_human()
rig = HumanService.add_builtin_rig(basemesh, "game_engine")
print("OBJS", [(o.name, o.type) for o in bpy.data.objects])
print("DIMS", basemesh.dimensions[:])
for b in rig.data.bones:
    if any(k in b.name for k in ["index","middle","pinky","ring","thumb"]): continue
    print("BONE", b.name, b.parent.name if b.parent else None, [round(v,3) for v in b.head_local], [round(v,3) for v in b.tail_local])
bpy.ops.wm.save_as_mainfile(filepath=sys.argv[-1])
