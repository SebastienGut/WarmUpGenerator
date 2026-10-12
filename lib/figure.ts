// Moteur de pictogrammes animés d'exercices.
//
// Un squelette 2D articulé, décrit par des angles, rendu en traits épais
// arrondis (style pictogramme sportif). Chaque exercice a deux postures ; le
// composant interpole de l'une à l'autre. Tout est calculé, rien n'est dessiné
// à la main : un style cohérent sur toute la banque, quelques octets par
// exercice, et un rendu identique hors ligne.
//
// Conventions (vue de profil, la figure regarde vers la droite, +x) :
//   - t  : inclinaison du tronc, de la hanche vers les épaules.
//          0 = debout, 90 = penché à l'horizontale vers l'avant,
//          -90 = allongé sur le dos (tête vers l'arrière), 180 = tête en bas.
//   - membres : angle absolu du segment. 0 = vers le bas, 90 = vers l'avant,
//          180 = vers le haut, -90 = vers l'arrière.
//   - ua/fa : bras et avant-bras proches ; ua2/fa2 : côté éloigné (plus pâle).
//   - th/sh : cuisse et jambe proches ; th2/sh2 : côté éloigné.
// Vue de face : t ignoré ; bras et jambes en abduction (0 = le long du corps,
// 90 = à l'horizontale, 180 = au-dessus de la tête), côté gauche en miroir
// sauf si ua2/fa2/th2/sh2 sont donnés.

export interface Pose {
  t?: number;
  ua: number;
  fa: number;
  ua2?: number;
  fa2?: number;
  th: number;
  sh: number;
  th2?: number;
  sh2?: number;
  /** Angle absolu du pied ; par défaut perpendiculaire à la jambe. */
  ft?: number;
  ft2?: number;
  /** Inclinaison de la tête par rapport au tronc. */
  hd?: number;
  /** Moitié haute du tronc (dos rond / dos creux) ; par défaut = t. */
  t2?: number;
  /** Élévation verticale, en unités du dessin (marche, pointe des pieds…). */
  lift?: number;
}

export type Segment = "head" | "torso" | "ua" | "fa" | "th" | "sh" | "ua2" | "fa2" | "th2" | "sh2";

export type Prop =
  | { kind: "bar" }
  | { kind: "db" }
  | { kind: "kb" }
  | { kind: "band"; to: [number, number] }
  | { kind: "wall"; x: number }
  | { kind: "bench"; x: number; y: number; w: number; h?: number }
  | { kind: "box"; x: number; y: number; w: number; h: number }
  | { kind: "pullbar" }
  | { kind: "mat" }
  /** Barres parallèles sous les mains (dips). */
  | { kind: "rails" }
  /** Appui sous la hanche, qui suit le corps (banc à lombaires). */
  | { kind: "hipPad" };

export interface Figure {
  view: "side" | "front";
  frames: [Pose, Pose];
  /** Joint qui reste fixe horizontalement d'une posture à l'autre. */
  anchor?: "foot" | "foot1" | "foot2" | "hand" | "hip" | "head";
  /** Suspendu : mains fixées à cette hauteur (true = barre de traction). */
  hang?: boolean | number;
  /** Appui : le pied proche porte le poids (fentes, step-up), au lieu du point le plus bas. */
  ground?: "auto" | "foot1";
  /** Assis : hanche à cette hauteur au-dessus du sol. */
  seat?: number;
  props?: Prop[];
  /** Segments travaillés, dessinés en couleur d'accent. */
  hi?: Segment[];
  /** Durée d'un aller-retour, en secondes. */
  dur?: number;
}

export const VIEW_W = 240;
export const VIEW_H = 220;
export const GROUND = 204;
const BAR_Y = 38;

const LEN = { torso: 58, neck: 6, head: 14, ua: 32, fa: 30, th: 44, sh: 43, foot: 12 };
const SHOULDER_HALF = 17;
const HIP_HALF = 9;

type Pt = [number, number];
export interface Skeleton {
  hip: Pt;
  hip2: Pt;
  shoulder: Pt;
  shoulder2: Pt;
  head: Pt;
  elbow: Pt;
  hand: Pt;
  elbow2: Pt;
  hand2: Pt;
  knee: Pt;
  ankle: Pt;
  toe: Pt;
  knee2: Pt;
  ankle2: Pt;
  toe2: Pt;
  /** Milieu du tronc (vue de profil). */
  mid?: Pt;
}

const rad = (d: number) => (d * Math.PI) / 180;
const limb = (a: number): Pt => [Math.sin(rad(a)), Math.cos(rad(a))];
const add = (p: Pt, d: Pt, k: number): Pt => [p[0] + d[0] * k, p[1] + d[1] * k];

/** Squelette en coordonnées locales, hanche à l'origine. */
export function skeleton(view: Figure["view"], p: Pose): Skeleton {
  if (view === "front") {
    // Côté droit de l'image = côté « proche » ; le gauche est en miroir.
    const ua2 = p.ua2 ?? p.ua, fa2 = p.fa2 ?? p.fa, th2 = p.th2 ?? p.th, sh2 = p.sh2 ?? p.sh;
    const mirror = (a: number) => -a;
    const neckBase: Pt = [0, -LEN.torso];
    const shoulder: Pt = [SHOULDER_HALF, -LEN.torso + 4];
    const shoulder2: Pt = [-SHOULDER_HALF, -LEN.torso + 4];
    const hip: Pt = [HIP_HALF, 0];
    const hip2: Pt = [-HIP_HALF, 0];
    const elbow = add(shoulder, limb(p.ua), LEN.ua);
    const hand = add(elbow, limb(p.fa), LEN.fa);
    const elbow2 = add(shoulder2, limb(mirror(ua2)), LEN.ua);
    const hand2 = add(elbow2, limb(mirror(fa2)), LEN.fa);
    const knee = add(hip, limb(p.th), LEN.th);
    const ankle = add(knee, limb(p.sh), LEN.sh);
    const knee2 = add(hip2, limb(mirror(th2)), LEN.th);
    const ankle2 = add(knee2, limb(mirror(sh2)), LEN.sh);
    // Inclinaison latérale du buste : rotation du haut du corps autour du bassin.
    const tilt = rad(p.t ?? 0);
    const rot = (q: Pt): Pt => [q[0] * Math.cos(tilt) - q[1] * Math.sin(tilt), q[0] * Math.sin(tilt) + q[1] * Math.cos(tilt)];
    const head: Pt = [neckBase[0], neckBase[1] - LEN.neck - LEN.head];
    return {
      hip, hip2, knee, ankle, knee2, ankle2,
      shoulder: rot(shoulder), shoulder2: rot(shoulder2), elbow: rot(elbow), hand: rot(hand),
      elbow2: rot(elbow2), hand2: rot(hand2), head: rot(head),
      toe: add(ankle, [1, 0], LEN.foot * 0.6),
      toe2: add(ankle2, [-1, 0], LEN.foot * 0.6),
    };
  }
  const t = p.t ?? 0;
  const tdir: Pt = [Math.sin(rad(t)), -Math.cos(rad(t))];
  const hip: Pt = [0, 0];
  const t2 = p.t2 ?? t;
  const mid = add(hip, tdir, LEN.torso / 2);
  const shoulder = add(mid, [Math.sin(rad(t2)), -Math.cos(rad(t2))], LEN.torso / 2);
  const hd = rad(t2 + (p.hd ?? 0));
  const head = add(shoulder, [Math.sin(hd), -Math.cos(hd)], LEN.neck + LEN.head);
  const elbow = add(shoulder, limb(p.ua), LEN.ua);
  const hand = add(elbow, limb(p.fa), LEN.fa);
  const elbow2 = add(shoulder, limb(p.ua2 ?? p.ua), LEN.ua);
  const hand2 = add(elbow2, limb(p.fa2 ?? p.fa), LEN.fa);
  const knee = add(hip, limb(p.th), LEN.th);
  const ankle = add(knee, limb(p.sh), LEN.sh);
  const knee2 = add(hip, limb(p.th2 ?? p.th), LEN.th);
  const ankle2 = add(knee2, limb(p.sh2 ?? p.sh), LEN.sh);
  // Pied à plat par défaut : c'est la posture de la quasi-totalité des exercices debout.
  const toe = add(ankle, limb(p.ft ?? 90), LEN.foot);
  const toe2 = add(ankle2, limb(p.ft2 ?? p.ft ?? 90), LEN.foot);
  return { hip, hip2: hip, shoulder, shoulder2: shoulder, head, elbow, hand, elbow2, hand2, knee, ankle, toe, knee2, ankle2, toe2, mid };
}

const STROKE = 13;

function lowestY(s: Skeleton) {
  const ys = [s.ankle, s.toe, s.ankle2, s.toe2, s.hand, s.hand2, s.knee, s.knee2, s.elbow, s.elbow2, s.hip, s.shoulder].map((p) => p[1]);
  return Math.max(...ys, s.head[1] + LEN.head) + STROKE / 2;
}

function anchorX(fig: Figure, s: Skeleton) {
  switch (fig.anchor ?? (fig.hang ? "hand" : "foot")) {
    case "hand":
      return (s.hand[0] + s.hand2[0]) / 2;
    case "hip":
      return s.hip[0];
    case "head":
      return s.head[0];
    case "foot1":
      return s.ankle[0];
    case "foot2":
      return s.ankle2[0];
    default:
      return (s.ankle[0] + s.ankle2[0]) / 2;
  }
}

/** Décalage vertical : au sol, ou mains accrochées à la barre de traction. */
function offsetY(fig: Figure, s: Skeleton, lift: number) {
  if (fig.hang) return (fig.hang === true ? BAR_Y : fig.hang) - Math.min(s.hand[1], s.hand2[1]);
  if (fig.seat !== undefined) return GROUND - fig.seat - s.hip[1] - lift;
  if (fig.ground === "foot1") return GROUND - Math.max(s.ankle[1], s.toe[1]) - STROKE / 2 - lift;
  return GROUND - lowestY(s) - lift;
}

export const lerpPose = (a: Pose, b: Pose, k: number): Pose => {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]) as Set<keyof Pose>;
  const out: Partial<Pose> = {};
  const fallback = (p: Pose, key: keyof Pose): number => {
    const v = p[key];
    if (v !== undefined) return v;
    // Les côtés éloignés reprennent le côté proche ; les autres valent 0.
    const base = { ua2: "ua", fa2: "fa", th2: "th", sh2: "sh", ft2: "ft" }[key as string] as keyof Pose | undefined;
    if (base && p[base] !== undefined) return p[base] as number;
    if (key === "ft" || key === "ft2") return p.ft ?? 90;
    if (key === "t2") return p.t ?? 0;
    return 0;
  };
  for (const key of keys) out[key] = fallback(a, key) + (fallback(b, key) - fallback(a, key)) * k;
  return out as Pose;
};

export interface Placement {
  /** Décalage horizontal constant, pour centrer l'ensemble du mouvement. */
  dx: number;
}

/** Centre le mouvement entier (plusieurs postures échantillonnées) dans le cadre. */
export function placement(fig: Figure): Placement {
  let minX = Infinity, maxX = -Infinity;
  for (let i = 0; i <= 8; i++) {
    const s = skeleton(fig.view, lerpPose(fig.frames[0], fig.frames[1], i / 8));
    const ax = anchorX(fig, s);
    const xs = Object.values(s).filter(Boolean).map((p) => (p as Pt)[0] - ax);
    minX = Math.min(minX, ...xs, s.head[0] - ax - LEN.head);
    maxX = Math.max(maxX, ...xs, s.head[0] - ax + LEN.head);
  }
  return { dx: VIEW_W / 2 - (minX + maxX) / 2 };
}

/** Squelette placé dans le cadre du dessin, pour une posture donnée. */
export function placed(fig: Figure, pl: Placement, pose: Pose) {
  const s = skeleton(fig.view, pose);
  const ox = pl.dx - anchorX(fig, s);
  const oy = offsetY(fig, s, pose.lift ?? 0);
  const m = (p: Pt): Pt => [p[0] + ox, p[1] + oy];
  const out = Object.fromEntries(Object.entries(s).filter(([, p]) => p).map(([k, p]) => [k, m(p as Pt)])) as unknown as Skeleton;
  return { s: out, ox, oy };
}

export const FIGURE_CONST = { LEN, STROKE, BAR_Y };
