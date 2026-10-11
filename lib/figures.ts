// Postures des pictogrammes, par identifiant d'exercice (préparation et
// séance). Conventions d'angles : voir lib/figure.ts. Toutes les figures
// regardent vers la droite.

import type { Figure, Pose } from "@/lib/figure";

const STAND: Pose = { t: 0, ua: 0, fa: 0, th: 0, sh: 0 };
const ARMS_FWD = { ua: 90, fa: 90 };
const SQUAT_LOW: Pose = { t: 38, ua: 85, fa: 85, th: 100, sh: -34 };
// Quadrupédie : mains sous les épaules, genoux sous les hanches, tibias au sol.
const QUAD: Pose = { t: 90, ua: 0, fa: 0, th: 0, sh: -90, ft: -90 };
// Planche bras tendus : corps gainé, pointe des pieds au sol.
const PLANK: Pose = { t: 78, ua: 0, fa: 0, th: -78, sh: -78, ft: 0 };
// Allongé sur le dos, tête à gauche, genoux fléchis pieds au sol.
const BACK_BENT: Pose = { t: -90, ua: 90, fa: 90, th: 135, sh: 28 };
// Allongé sur le ventre, tête à droite.
const PRONE: Pose = { t: 90, ua: 90, fa: 90, th: -90, sh: -90, ft: 0 };

const f = (view: Figure["view"], a: Pose, b: Pose, extra: Partial<Figure> = {}): Figure => ({ view, frames: [a, b], ...extra });

export const FALLBACK_FIGURE: Figure = f("side", STAND, { ...STAND, ua: 20, fa: 20 }, { dur: 3 });

export const FIGURES: Record<string, Figure> = {
  // ── Mobilité ─────────────────────────────────────────────────────
  "art-cervicales": f("side", { ...STAND, hd: -38 }, { ...STAND, hd: 38 }, { hi: ["head"], dur: 3 }),
  "art-epaules-cercles": f("side", { ...STAND, ua: -35, fa: -35 }, { ...STAND, ua: 195, fa: 195 }, { hi: ["ua", "fa"], dur: 2.4 }),
  "art-poignets": f("side", { ...STAND, ua: 25, fa: 70 }, { ...STAND, ua: 25, fa: 120 }, { hi: ["fa"] }),
  "art-coudes": f("side", { ...STAND, ...ARMS_FWD }, { ...STAND, ua: 90, fa: 175 }, { hi: ["fa"] }),
  "art-ouverture-pecs": f("side", { ...STAND, ua: 88, fa: 88 }, { ...STAND, ua: -70, fa: -70 }, { hi: ["ua", "fa"] }),
  "art-mobilisation-thoracique": f("front", { t: -14, ua: 140, fa: -130, th: 8, sh: 8 }, { t: 14, ua: 140, fa: -130, th: 8, sh: 8 }, { hi: ["torso"], dur: 3 }),
  "art-chat-vache": f("side", { ...QUAD, t: 72, t2: 108, hd: 30 }, { ...QUAD, t: 106, t2: 74, hd: -35 }, { hi: ["torso"], dur: 3.2 }),
  "art-hanches-cercles": f("front", { t: -10, ua: 35, fa: -45, th: 10, sh: 10 }, { t: 10, ua: 35, fa: -45, th: 10, sh: 10 }, { hi: ["torso"] }),
  "art-cheville-genou-mur": f(
    "side",
    { t: 8, ua: 78, fa: 78, th: 18, sh: -6, th2: -24, sh2: -24 },
    { t: 12, ua: 72, fa: 72, th: 46, sh: -28, th2: -24, sh2: -24 },
    { anchor: "foot1", props: [{ kind: "wall", x: 186 }], hi: ["sh"] },
  ),
  "art-squat-profond-rebond": f("side", { ...SQUAT_LOW, th: 92, sh: -30 }, { ...SQUAT_LOW, t: 42, th: 108, sh: -38 }, { hi: ["th", "sh"], dur: 1.8 }),
  "art-genoux-cercles": f("side", { t: 42, ua: 35, fa: 20, th: 30, sh: -18 }, { t: 42, ua: 35, fa: 20, th: 42, sh: -30 }, { hi: ["sh"] }),
  "art-chevilles": f("side", { ...STAND, th: 55, sh: 10, ft: 50 }, { ...STAND, th: 55, sh: 10, ft: 140, th2: 0, sh2: 0 }, { anchor: "foot2", hi: ["sh"] }),
  "art-tronc-lateral": f("front", { t: -18, ua: 8, fa: 4, th: 12, sh: 12 }, { t: 18, ua: 8, fa: 4, th: 12, sh: 12 }, { hi: ["torso"], dur: 3 }),
  "art-lombaires-essuie-glace": f("side", { ...BACK_BENT, ua: -80, fa: -90 }, { ...BACK_BENT, ua: -80, fa: -90, th: 105, sh: 60 }, { hi: ["th"], dur: 3 }),
  "prep-charniere-hanche": f("side", { ...STAND }, { t: 76, ua: 0, fa: 0, th: -12, sh: 6 }, { hi: ["torso", "th"], dur: 2.8 }),
  "prep-inchworm": f("side", { t: 122, ua: 0, fa: 0, th: -4, sh: -4 }, { ...PLANK }, { anchor: "hand", hi: ["th"], dur: 3.2 }),
  "prep-extension-thoracique-banc": f(
    "side",
    { t: 66, ua: 150, fa: -40, th: 8, sh: -90, ft: -90 },
    { t: 96, t2: 104, ua: 170, fa: -30, th: -36, sh: -90, ft: -90 },
    { props: [{ kind: "bench", x: 170, y: 150, w: 56, h: 54 }], hi: ["torso"], dur: 3 },
  ),
  "cib-hanches-fente-rotation": f(
    "side",
    { t: 30, ua: 10, fa: 10, ua2: 0, fa2: 0, th: 82, sh: 0, th2: -40, sh2: -92, ft2: -90 },
    { t: 24, ua: 180, fa: 180, ua2: 0, fa2: 0, th: 82, sh: 0, th2: -40, sh2: -92, ft2: -90 },
    { anchor: "foot1", hi: ["ua", "fa"], dur: 3 },
  ),
  "cib-hanches-essuie-glace": f("side", { t: -90, ua: -80, fa: -90, th: 150, sh: 150 }, { t: -90, ua: -80, fa: -90, th: 110, sh: 110 }, { hi: ["th", "sh"], dur: 3 }),
  "cib-epaule-capsule-posterieure": f("front", { t: 0, ua: -70, fa: -70, ua2: 20, fa2: -110, th: 8, sh: 8 }, { t: 0, ua: -92, fa: -92, ua2: 25, fa2: -120, th: 8, sh: 8 }, { hi: ["ua"], dur: 3.2 }),
  "cib-lombaires-genoux-poitrine": f("side", { t: -90, ua: 150, fa: 100, th: -150, sh: 115 }, { t: -90, ua: 160, fa: 110, th: -165, sh: 105 }, { hi: ["th"], dur: 3.2 }),
  "cib-poignets-etire-extenseurs": f("side", { ...STAND, ...ARMS_FWD, ua2: 60, fa2: 110 }, { ...STAND, ua: 90, fa: 98, ua2: 62, fa2: 116 }, { hi: ["fa"], dur: 3.2 }),
  "cib-poignets-etire-flechisseurs": f("side", { ...STAND, ...ARMS_FWD, ua2: 60, fa2: 110 }, { ...STAND, ua: 90, fa: 82, ua2: 62, fa2: 104 }, { hi: ["fa"], dur: 3.2 }),
  "cib-poignets-activation-progressive": f("side", { ...QUAD, ua: 0, fa: 0 }, { ...QUAD, ua: -22, fa: -22 }, { anchor: "hand", hi: ["fa"], dur: 2.8 }),
  "cib-coudes-etire-triceps": f("side", { ...STAND, ua: 170, fa: -15, ua2: 160, fa2: -150 }, { ...STAND, ua: 176, fa: -32, ua2: 165, fa2: -150 }, { hi: ["ua"], dur: 3.2 }),
  "cib-coudes-pronation-supination": f("side", { ...STAND, ua: 0, fa: 80 }, { ...STAND, ua: 0, fa: 100 }, { hi: ["fa"], dur: 2 }),
  "cib-chevilles-etire-mollet": f(
    "side",
    { t: 18, ua: 72, fa: 72, th: 22, sh: -12, th2: -30, sh2: -30 },
    { t: 28, ua: 64, fa: 64, th: 30, sh: -22, th2: -38, sh2: -38 },
    { anchor: "foot1", props: [{ kind: "wall", x: 190 }], hi: ["sh2"], dur: 3 },
  ),

  // ── Activation ───────────────────────────────────────────────────
  "act-pecs-pompes-reprise": f("side", { ...PLANK }, { ...PLANK, t: 86, th: -86, sh: -86, ua: -125, fa: 15 }, { hi: ["ua", "fa"], dur: 2.6 }),
  "act-pecs-iso": f("side", { ...PLANK, t: 76 }, { ...PLANK, t: 82 }, { hi: ["torso"], dur: 1.8 }),
  "act-dos-rowing-haltere": f(
    "side",
    { t: 78, ua: 0, fa: 0, ua2: 20, fa2: 20, th: 12, sh: -6, th2: -18, sh2: -18 },
    { t: 78, ua: -65, fa: 5, ua2: 20, fa2: 20, th: 12, sh: -6, th2: -18, sh2: -18 },
    { props: [{ kind: "db" }], hi: ["ua", "fa"] },
  ),
  "act-dos-face-pull-elastique": f("side", { ...STAND, ...ARMS_FWD }, { ...STAND, ua: -75, fa: 160 }, { props: [{ kind: "band", to: [226, 58] }], hi: ["ua", "fa"] }),
  "act-dos-superman": f("side", { ...PRONE }, { ...PRONE, t: 80, ua: 104, fa: 104, th: -100, sh: -100 }, { hi: ["torso", "th"], dur: 2.8 }),
  "act-epaules-rotation-coiffe": f("front", { t: 0, ua: 6, fa: -70, th: 8, sh: 8 }, { t: 0, ua: 6, fa: 80, th: 8, sh: 8 }, { hi: ["fa", "fa2"], dur: 2.6 }),
  "act-epaules-y-raise": f("front", { t: 0, ua: 12, fa: 12, th: 8, sh: 8 }, { t: 0, ua: 150, fa: 150, th: 8, sh: 8 }, { hi: ["ua", "fa", "ua2", "fa2"], dur: 2.8 }),
  "act-jambes-squat-corps": f("side", { ...STAND, ...ARMS_FWD }, { ...SQUAT_LOW }, { hi: ["th", "sh"], dur: 2.6 }),
  "act-jambes-fentes": f(
    "side",
    { ...STAND, th: 25, sh: 0, th2: -20, sh2: -20 },
    { t: 4, ua: 0, fa: 0, th: 82, sh: 0, th2: -24, sh2: -88, ft2: 0 },
    { anchor: "foot1", hi: ["th", "sh"], dur: 2.6 },
  ),
  "act-jambes-leg-curl-leger": f("side", { ...PRONE, ua: 0, fa: 90 }, { ...PRONE, ua: 0, fa: 90, sh: 175 }, { hi: ["sh"], dur: 2.4 }),
  "act-jambes-mkg-haut": f("side", { ...STAND, ua: 80, fa: 80, th: -35, sh: -40 }, { ...STAND, ua: 80, fa: 80, th: 62, sh: 50, th2: 0, sh2: 0 }, { anchor: "foot2", props: [{ kind: "wall", x: 198 }], hi: ["th", "sh"], dur: 1.6 }),
  "act-fessiers-pont": f("side", { ...BACK_BENT }, { ...BACK_BENT, t: -112, th: 100, sh: 4 }, { anchor: "foot1", hi: ["th"], dur: 2.6 }),
  "act-fessiers-kickback-elastique": f("side", { ...QUAD }, { ...QUAD, th: -98, sh: -98, ft: -90 }, { anchor: "hand", hi: ["th", "sh"], dur: 2.4 }),
  "act-bras-pompes-mur": f(
    "side",
    { t: 22, ua: 68, fa: 68, th: -22, sh: -22 },
    { t: 28, ua: 15, fa: 115, th: -28, sh: -28 },
    { props: [{ kind: "wall", x: 196 }], hi: ["fa"], dur: 2.4 },
  ),
  "act-bras-pushdown-elastique": f("side", { ...STAND, t: 6, ua: 0, fa: 150 }, { ...STAND, t: 6, ua: 0, fa: 0 }, { props: [{ kind: "band", to: [170, 22] }], hi: ["fa"] }),
  "act-bras-curl-elastique": f("side", { ...STAND, ua: 0, fa: 0 }, { ...STAND, ua: 0, fa: 155 }, { props: [{ kind: "band", to: [126, 200] }], hi: ["fa"] }),
  "act-core-dead-bug": f(
    "side",
    { t: -90, ua: 180, fa: 180, th: 180, sh: 90 },
    { t: -90, ua: -100, fa: -100, ua2: 180, fa2: 180, th: 180, sh: 90, th2: 100, sh2: 100 },
    { hi: ["ua", "th2", "sh2"], dur: 3 },
  ),
  "act-core-planche": f("side", { t: 84, ua: 0, fa: 90, th: -84, sh: -84, ft: 0 }, { t: 86, ua: 0, fa: 90, th: -86, sh: -86, ft: 0 }, { hi: ["torso"], dur: 3 }),
  "act-core-bird-dog": f("side", { ...QUAD }, { ...QUAD, ua: 96, fa: 96, th2: -96, sh2: -96 }, { anchor: "hand", hi: ["ua", "fa", "th2", "sh2"], dur: 3 }),
  "prep-glisses-mur": f("front", { t: 0, ua: 80, fa: 175, th: 6, sh: 6 }, { t: 0, ua: 155, fa: 160, th: 6, sh: 6 }, { hi: ["ua", "fa", "ua2", "fa2"], dur: 3 }),
  "prep-tractions-scapulaires": f("side", { t: 0, ua: 180, fa: 180, th: 4, sh: -14 }, { t: -4, ua: 176, fa: 150, th: 4, sh: -14 }, { hang: true, props: [{ kind: "pullbar" }], hi: ["torso"], dur: 2.4 }),
  "prep-pull-apart": f("side", { ...STAND, ...ARMS_FWD }, { ...STAND, ua: -78, fa: -78 }, { hi: ["ua", "fa"], dur: 2.4 }),

  // ── Préparation ciblée ───────────────────────────────────────────
  "cib-epaule-retraction-scapulaire": f("side", { ...STAND, ua: 88, fa: 88 }, { ...STAND, t: -4, ua: 74, fa: 74 }, { props: [{ kind: "band", to: [226, 66] }], hi: ["ua"] }),
  "cib-epaule-yt-sol": f("front", { t: 0, ua: 150, fa: 150, th: 6, sh: 6 }, { t: 0, ua: 92, fa: 92, th: 6, sh: 6 }, { hi: ["ua", "fa", "ua2", "fa2"], dur: 3 }),
  "cib-genou-tke": f("side", { ...STAND, th: 18, sh: -16 }, { ...STAND }, { hi: ["th", "sh"], dur: 2.2 }),
  "cib-genou-slr": f("side", { t: -90, ua: 90, fa: 90, th: 90, sh: 90, ft: 180, th2: 135, sh2: 28 }, { t: -90, ua: 90, fa: 90, th: 132, sh: 132, ft: 220, th2: 135, sh2: 28 }, { hi: ["th", "sh"], dur: 2.8 }),
  "cib-genou-step-up": f(
    "side",
    { t: 8, ua: 0, fa: 0, th: 72, sh: -4, th2: -12, sh2: -12, lift: 34 },
    { t: 0, ua: 0, fa: 0, th: 0, sh: 0, th2: -22, sh2: -62, lift: 34 },
    { ground: "foot1", anchor: "foot1", props: [{ kind: "box", x: 112, y: 170, w: 70, h: 34 }], hi: ["th", "sh"], dur: 2.8 },
  ),
  "cib-lombaires-hip-thrust-pdc": f("side", { ...BACK_BENT, th2: 100, sh2: 100 }, { ...BACK_BENT, t: -112, th: 100, sh: 4, th2: 100, sh2: 100 }, { anchor: "foot1", hi: ["th"], dur: 2.6 }),
  "cib-lombaires-extension-banc": f(
    "side",
    { t: 160, ua: 0, fa: 0, th: -62, sh: -62 },
    { t: 92, ua: 150, fa: -40, th: -62, sh: -62 },
    { ground: "foot1", anchor: "foot1", props: [{ kind: "box", x: 150, y: 118, w: 26, h: 86 }], hi: ["torso"], dur: 2.8 },
  ),
  "cib-hanches-fire-hydrant": f("side", { ...QUAD }, { ...QUAD, th: -40, sh: -110 }, { anchor: "hand", hi: ["th"], dur: 2.4 }),
  "cib-chevilles-montees-pointe": f("side", { ...STAND }, { ...STAND, ft: 38, ft2: 38 }, { hi: ["sh"], dur: 2.2 }),

  // ── Séance : poussée ─────────────────────────────────────────────
  "developpe-couche": f(
    "side",
    { t: -90, ua: 180, fa: 180, th: 78, sh: 0 },
    { t: -90, ua: 28, fa: 180, th: 78, sh: 0 },
    { seat: 48, props: [{ kind: "bench", x: 52, y: 160, w: 108, h: 8 }, { kind: "bar" }], hi: ["ua", "fa"], dur: 2.4 },
  ),
  "developpe-incline": f(
    "side",
    { t: -58, ua: 165, fa: 165, th: 80, sh: 0 },
    { t: -58, ua: 30, fa: 170, th: 80, sh: 0 },
    { seat: 48, props: [{ kind: "bar" }], hi: ["ua", "fa"], dur: 2.4 },
  ),
  "developpe-halteres": f(
    "side",
    { t: -90, ua: 180, fa: 180, th: 78, sh: 0 },
    { t: -90, ua: 25, fa: 175, th: 78, sh: 0 },
    { seat: 48, props: [{ kind: "bench", x: 52, y: 160, w: 108, h: 8 }, { kind: "db" }], hi: ["ua", "fa"], dur: 2.4 },
  ),
  "developpe-militaire": f("side", { ...STAND, ua: 40, fa: 172 }, { ...STAND, ua: 178, fa: 178 }, { props: [{ kind: "bar" }], hi: ["ua", "fa"], dur: 2.4 }),
  "developpe-epaules-halteres": f("side", { t: 0, ua: 30, fa: 175, th: 90, sh: 0 }, { t: 0, ua: 175, fa: 178, th: 90, sh: 0 }, { seat: 46, props: [{ kind: "db" }], hi: ["ua", "fa"], dur: 2.4 }),
  dips: f("side", { t: 8, ua: 0, fa: 0, th: -10, sh: -70 }, { t: 22, ua: -62, fa: 8, th: -14, sh: -74 }, { hang: 100, hi: ["ua", "fa"], dur: 2.4 }),
  pompes: f("side", { ...PLANK }, { ...PLANK, t: 86, th: -86, sh: -86, ua: -125, fa: 15 }, { hi: ["ua", "fa"], dur: 2.2 }),

  // ── Séance : tirage ──────────────────────────────────────────────
  tractions: f("side", { t: 0, ua: 180, fa: 180, th: 10, sh: -30 }, { t: -6, ua: 28, fa: 176, th: 18, sh: -30 }, { hang: true, props: [{ kind: "pullbar" }], hi: ["ua", "fa"], dur: 2.6 }),
  "tirage-vertical": f("side", { t: -6, ua: 172, fa: 172, th: 88, sh: 0 }, { t: -12, ua: 25, fa: 172, th: 88, sh: 0 }, { seat: 50, hi: ["ua", "fa"], dur: 2.4 }),
  "rowing-barre": f("side", { t: 68, ua: 0, fa: 0, th: 14, sh: -12 }, { t: 68, ua: -62, fa: 0, th: 14, sh: -12 }, { props: [{ kind: "bar" }], hi: ["ua", "fa"], dur: 2.2 }),
  "rowing-haltere": f(
    "side",
    { t: 78, ua: 0, fa: 0, ua2: 20, fa2: 20, th: 12, sh: -6, th2: -18, sh2: -18 },
    { t: 78, ua: -65, fa: 5, ua2: 20, fa2: 20, th: 12, sh: -6, th2: -18, sh2: -18 },
    { props: [{ kind: "db" }], hi: ["ua", "fa"] },
  ),
  "tirage-horizontal": f(
    "side",
    { t: 4, ua: 90, fa: 90, th: 84, sh: 72 },
    { t: -6, ua: -62, fa: 90, th: 84, sh: 72 },
    { seat: 20, props: [{ kind: "band", to: [228, 128] }], hi: ["ua", "fa"], dur: 2.4 },
  ),

  // ── Séance : jambes ──────────────────────────────────────────────
  squat: f("side", { ...STAND, ua: -50, fa: 150 }, { ...SQUAT_LOW, ua: -50, fa: 150 }, { props: [{ kind: "bar" }], hi: ["th", "sh"], dur: 2.6 }),
  presse: f(
    "side",
    { t: -48, ua: 20, fa: 20, th: 150, sh: 62 },
    { t: -48, ua: 20, fa: 20, th: 118, sh: 112 },
    { seat: 40, hi: ["th", "sh"], dur: 2.4 },
  ),
  "souleve-de-terre": f("side", { t: 62, ua: 0, fa: 0, th: 72, sh: -16 }, { ...STAND }, { props: [{ kind: "bar" }], hi: ["torso", "th"], dur: 2.8 }),
  "souleve-roumain": f("side", { ...STAND }, { t: 78, ua: 0, fa: 0, th: -10, sh: 6 }, { props: [{ kind: "bar" }], hi: ["torso"], dur: 2.8 }),
  "hip-thrust": f(
    "side",
    { t: -60, ua: 110, fa: 110, th: 150, sh: 22 },
    { t: -95, ua: 100, fa: 100, th: 95, sh: 4 },
    { anchor: "foot1", props: [{ kind: "bar" }], hi: ["th"], dur: 2.6 },
  ),
  fentes: f(
    "side",
    { ...STAND, th: 25, sh: 0, th2: -20, sh2: -20 },
    { t: 4, ua: 0, fa: 0, th: 82, sh: 0, th2: -24, sh2: -88, ft2: 0 },
    { anchor: "foot1", props: [{ kind: "db" }], hi: ["th", "sh"], dur: 2.6 },
  ),

  // ── Séance : isolation ───────────────────────────────────────────
  "elevations-laterales": f("front", { t: 0, ua: 10, fa: 10, th: 8, sh: 8 }, { t: 0, ua: 88, fa: 88, th: 8, sh: 8 }, { props: [{ kind: "db" }], hi: ["ua", "fa", "ua2", "fa2"], dur: 2.4 }),
  ecartes: f("side", { t: 0, ua: -60, fa: -50, th: 90, sh: 0 }, { t: 0, ua: 88, fa: 88, th: 90, sh: 0 }, { seat: 46, hi: ["ua", "fa"], dur: 2.4 }),
  "curl-biceps": f("side", { ...STAND }, { ...STAND, fa: 150 }, { props: [{ kind: "db" }], hi: ["fa"], dur: 2.2 }),
  triceps: f("side", { ...STAND, t: 8, fa: 150 }, { ...STAND, t: 8 }, { props: [{ kind: "band", to: [168, 22] }], hi: ["fa"], dur: 2.2 }),
  "leg-extension": f("side", { t: -4, ua: 0, fa: 0, th: 90, sh: 0 }, { t: -4, ua: 0, fa: 0, th: 90, sh: 88 }, { seat: 54, hi: ["sh"], dur: 2.2 }),
  "leg-curl": f("side", { ...PRONE, ua: 0, fa: 90 }, { ...PRONE, ua: 0, fa: 90, sh: 175 }, { hi: ["sh"], dur: 2.2 }),
  mollets: f("side", { ...STAND }, { ...STAND, ft: 36, ft2: 36 }, { hi: ["sh"], dur: 2 }),
};
