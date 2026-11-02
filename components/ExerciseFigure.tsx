"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FIGURE_CONST, GROUND, VIEW_H, VIEW_W, lerpPose, placed, placement, type Figure, type Segment } from "@/lib/figure";
import { FIGURES, FALLBACK_FIGURE } from "@/lib/figures";

// Une seule boucle d'animation pour toutes les figures de la page.
type Tick = (now: number) => void;
const subscribers = new Set<Tick>();
let raf = 0;
function loop(now: number) {
  subscribers.forEach((fn) => fn(now));
  raf = subscribers.size ? requestAnimationFrame(loop) : 0;
}
function subscribe(fn: Tick) {
  subscribers.add(fn);
  if (!raf) raf = requestAnimationFrame(loop);
  return () => {
    subscribers.delete(fn);
  };
}

// Aller-retour avec un temps de pause en fin de course : le mouvement se lit
// comme une répétition, pas comme une oscillation.
function phase(now: number, dur: number) {
  const x = (now / 1000 / dur) % 1;
  const tri = x < 0.5 ? x * 2 : 2 - x * 2;
  const held = Math.min(1, Math.max(0, (tri - 0.12) / 0.76));
  return held < 0.5 ? 4 * held ** 3 : 1 - (-2 * held + 2) ** 3 / 2;
}

const { STROKE, LEN, BAR_Y } = FIGURE_CONST;

function Body({ fig, k }: { fig: Figure; k: number }) {
  const pl = useMemo(() => placement(fig), [fig]);
  const pose = lerpPose(fig.frames[0], fig.frames[1], k);
  const { s } = placed(fig, pl, pose);
  const hi = new Set<Segment>(fig.hi ?? []);
  const seg = (a: [number, number], b: [number, number], id: Segment, far = false) => (
    <line
      key={id}
      x1={a[0]}
      y1={a[1]}
      x2={b[0]}
      y2={b[1]}
      stroke={hi.has(id) ? "var(--accent)" : far ? "var(--faint)" : "var(--ink)"}
      strokeWidth={id === "torso" ? STROKE + 4 : far ? STROKE - 2 : STROKE}
      strokeLinecap="round"
    />
  );
  const front = fig.view === "front";
  const hands = [s.hand, s.hand2];
  // De face, les deux côtés sont visibles au même plan.
  const far = !front;

  return (
    <g>
      {/* Accessoires de fond */}
      {fig.props?.map((p, i) => {
        if (p.kind === "wall") return <rect key={i} x={p.x} y={20} width={6} height={GROUND - 20} rx={2} fill="var(--line-strong)" />;
        if (p.kind === "bench") return <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h ?? 8} rx={3} fill="var(--line-strong)" />;
        if (p.kind === "box") return <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} rx={3} fill="var(--line-strong)" />;
        if (p.kind === "pullbar") return <line key={i} x1={40} y1={BAR_Y} x2={200} y2={BAR_Y} stroke="var(--subtle)" strokeWidth={5} strokeLinecap="round" />;
        if (p.kind === "rails") {
          const y = Math.max(s.hand[1], s.hand2[1]) + 6;
          return (
            <g key={i} fill="var(--line-strong)">
              <rect x={s.hand[0] - 46} y={y} width={92} height={6} rx={3} />
              <rect x={s.hand[0] - 40} y={y} width={6} height={GROUND - y} rx={2} />
              <rect x={s.hand[0] + 34} y={y} width={6} height={GROUND - y} rx={2} />
            </g>
          );
        }
        if (p.kind === "hipPad") {
          const [x, y] = s.hip;
          return (
            <g key={i} fill="var(--line-strong)">
              <rect x={x - 16} y={y + 8} width={32} height={12} rx={5} />
              <rect x={x - 3} y={y + 18} width={6} height={GROUND - y - 18} rx={2} />
            </g>
          );
        }
        if (p.kind === "mat") return <rect key={i} x={30} y={GROUND - 1} width={180} height={5} rx={2} fill="var(--line)" />;
        return null;
      })}
      <line x1={24} y1={GROUND + 2} x2={216} y2={GROUND + 2} stroke="var(--line)" strokeWidth={2} strokeLinecap="round" />

      {/* Côté éloigné, derrière */}
      {seg(s.hip2, s.knee2, "th2", far)}
      {seg(s.knee2, s.ankle2, "sh2", far)}
      <line x1={s.ankle2[0]} y1={s.ankle2[1]} x2={s.toe2[0]} y2={s.toe2[1]} stroke={far ? "var(--faint)" : "var(--ink)"} strokeWidth={STROKE - 3} strokeLinecap="round" />
      {seg(s.shoulder2, s.elbow2, "ua2", far)}
      {seg(s.elbow2, s.hand2, "fa2", far)}

      {/* Tronc et tête */}
      {front ? (
        <>
          <line x1={s.shoulder2[0]} y1={s.shoulder2[1]} x2={s.shoulder[0]} y2={s.shoulder[1]} stroke="var(--ink)" strokeWidth={STROKE} strokeLinecap="round" />
          <line x1={s.hip2[0]} y1={s.hip2[1]} x2={s.hip[0]} y2={s.hip[1]} stroke="var(--ink)" strokeWidth={STROKE} strokeLinecap="round" />
          {seg([(s.hip[0] + s.hip2[0]) / 2, s.hip[1]], [(s.shoulder[0] + s.shoulder2[0]) / 2, s.shoulder[1] - 4], "torso")}
        </>
      ) : (
        <>
          {seg(s.hip, s.mid ?? s.shoulder, "torso")}
          {s.mid && <line x1={s.mid[0]} y1={s.mid[1]} x2={s.shoulder[0]} y2={s.shoulder[1]} stroke={hi.has("torso") ? "var(--accent)" : "var(--ink)"} strokeWidth={STROKE + 3} strokeLinecap="round" />}
        </>
      )}
      <circle cx={s.head[0]} cy={s.head[1]} r={LEN.head} fill={hi.has("head") ? "var(--accent)" : "var(--ink)"} />

      {/* Côté proche */}
      {seg(s.hip, s.knee, "th")}
      {seg(s.knee, s.ankle, "sh")}
      <line x1={s.ankle[0]} y1={s.ankle[1]} x2={s.toe[0]} y2={s.toe[1]} stroke="var(--ink)" strokeWidth={STROKE - 3} strokeLinecap="round" />
      {seg(s.shoulder, s.elbow, "ua")}
      {seg(s.elbow, s.hand, "fa")}

      {/* Accessoires tenus */}
      {fig.props?.map((p, i) => {
        if (p.kind === "bar") {
          if (front) {
            const y = (s.hand[1] + s.hand2[1]) / 2;
            return (
              <g key={`b${i}`}>
                <line x1={s.hand2[0] - 34} y1={y} x2={s.hand[0] + 34} y2={y} stroke="var(--subtle)" strokeWidth={4} strokeLinecap="round" />
                <rect x={s.hand2[0] - 40} y={y - 16} width={8} height={32} rx={2} fill="var(--plate-25)" />
                <rect x={s.hand[0] + 32} y={y - 16} width={8} height={32} rx={2} fill="var(--plate-25)" />
              </g>
            );
          }
          return (
            <g key={`b${i}`}>
              <circle cx={s.hand[0]} cy={s.hand[1]} r={17} fill="var(--plate-25)" opacity={0.92} />
              <circle cx={s.hand[0]} cy={s.hand[1]} r={4} fill="var(--paper)" />
            </g>
          );
        }
        if (p.kind === "db") {
          return hands.map((h, j) => (
            <rect key={`d${i}${j}`} x={h[0] - 9} y={h[1] - 4} width={18} height={8} rx={3} fill="var(--subtle)" />
          ));
        }
        if (p.kind === "kb") return <circle key={`k${i}`} cx={s.hand[0]} cy={s.hand[1] + 9} r={9} fill="var(--subtle)" />;
        if (p.kind === "band") {
          return (
            <line key={`e${i}`} x1={s.hand[0]} y1={s.hand[1]} x2={p.to[0]} y2={p.to[1]} stroke="var(--accent)" strokeWidth={3} strokeDasharray="5 4" strokeLinecap="round" opacity={0.8} />
          );
        }
        return null;
      })}
    </g>
  );
}

export default function ExerciseFigure({
  id,
  label,
  className,
  animate = true,
}: {
  id: string;
  label: string;
  className?: string;
  animate?: boolean;
}) {
  const fig = FIGURES[id] ?? FALLBACK_FIGURE;
  const ref = useRef<SVGSVGElement>(null);
  const [k, setK] = useState(0);

  useEffect(() => {
    if (!animate || !ref.current) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let unsub: (() => void) | undefined;
    // Animer seulement ce qui est à l'écran : une liste de 15 figures ne doit
    // pas faire tourner 15 animations hors champ.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !unsub) unsub = subscribe((now) => setK(phase(now, fig.dur ?? 2.6)));
      else if (!entry.isIntersecting && unsub) {
        unsub();
        unsub = undefined;
      }
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      unsub?.();
    };
  }, [animate, fig]);

  return (
    <svg ref={ref} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label={`Mouvement : ${label}`} className={className}>
      <Body fig={fig} k={k} />
    </svg>
  );
}

/** Rendu figé à une position donnée du mouvement (0 = départ, 1 = arrivée). */
export function FigureStill({ id, k, className }: { id: string; k: number; className?: string }) {
  const fig = FIGURES[id] ?? FALLBACK_FIGURE;
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={className} aria-hidden="true">
      <Body fig={fig} k={k} />
    </svg>
  );
}
