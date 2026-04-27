"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HelpCircle,
  Plus,
  ChevronRight,
  Shield,
  Zap,
  Target,
  Dumbbell,
  Heart,
  Sparkles,
} from "lucide-react";
import type { MuscleGroup, Objective, SensitiveZone } from "@/lib/warmup-data";
import { ALL_ZONES, ZONE_LABELS } from "@/lib/warmup-data";

const MUSCLES: { key: MuscleGroup; label: string; img: string }[] = [
  { key: "pecs",    label: "Pecs",    img: "/pecs.png" },
  { key: "dos",     label: "Dos",     img: "/dos.png" },
  { key: "epaules", label: "Épaules", img: "/epaules.png" },
  { key: "jambes",  label: "Jambes",  img: "/jambes.png" },
  { key: "bras",    label: "Bras",    img: "/bras.png" },
  { key: "core",    label: "Core",    img: "/core.png" },
];

const OBJECTIVES: { key: Objective; label: string; Icon: typeof Target }[] = [
  { key: "force", label: "Force", Icon: Target },
  { key: "hypertrophie", label: "Volume", Icon: Dumbbell },
  { key: "mobilite", label: "Mobilité", Icon: Sparkles },
  { key: "reprise", label: "Reprise", Icon: Heart },
];

const DURATIONS = [
  { value: 3 as const, label: "3mn" },
  { value: 5 as const, label: "5mn" },
  { value: 8 as const, label: "8mn" },
];

const ZONE_OPTIONS = ALL_ZONES.filter((z) => z !== "aucune") as SensitiveZone[];

export default function Home() {
  const router = useRouter();
  const [muscles, setMuscles] = useState<MuscleGroup[]>(["pecs", "epaules"]);
  const [objective, setObjective] = useState<Objective>("force");
  const [zones, setZones] = useState<SensitiveZone[]>([]);
  const [duration, setDuration] = useState<3 | 5 | 8>(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const zoneSummary = useMemo(
    () => (zones.length ? zones.map((z) => ZONE_LABELS[z]).join(", ") : "Ajouter une contrainte"),
    [zones]
  );

  const ready = muscles.length > 0;

  function toggleMuscle(m: MuscleGroup) {
    setMuscles((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  }
  function toggleZone(z: SensitiveZone) {
    setZones((p) => (p.includes(z) ? p.filter((x) => x !== z) : [...p, z]));
  }
  function handleGenerate() {
    if (generating || !ready) return;
    setGenerating(true);
    const params = new URLSearchParams();
    params.set("muscles", muscles.join(","));
    params.set("objectif", objective);
    params.set("zones", zones.length ? zones.join(",") : "aucune");
    params.set("duree", String(duration));
    setTimeout(() => router.push(`/result?${params.toString()}`), 2200);
  }

  return (
    <>
      <main className="relative flex min-h-screen flex-col bg-[#050505]">
        <div className="content-layer mx-auto flex w-full max-w-[440px] flex-1 flex-col px-5 pt-7 pb-6">

          {/* HEADER */}
          <header className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A3FF12]/10 ring-1 ring-[#A3FF12]/20">
              <Zap className="h-4.5 w-4.5 fill-[#A3FF12] stroke-[#A3FF12]" strokeWidth={2.5} />
            </div>
            <h1 className="font-sans text-[17px] font-black uppercase tracking-tight text-white">
              Warmup Generator
            </h1>
          </header>

          {/* HERO TITLE */}
          <div className="mt-5">
            <h2 className="font-sans text-[34px] font-black leading-[0.95] tracking-tight text-white">
              Ton échauffement<br />
              <span className="italic text-[#A3FF12]">sur mesure.</span>
            </h2>
          </div>

          {/* CONTENT */}
          <div className="mt-6 flex flex-col gap-4">

            {/* 1. MUSCLES */}
            <Section number="01" label="Cibles" hint={`${muscles.length} sélectionné${muscles.length > 1 ? "s" : ""}`}>
              <div className="grid grid-cols-3 gap-1.5">
                {MUSCLES.map(({ key, label, img }) => {
                  const active = muscles.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleMuscle(key)}
                      className={`relative overflow-hidden rounded-xl border aspect-square max-h-[95px] transition-all duration-150 active:scale-95 focus-visible:outline-none ${
                        active
                          ? "border-[#A3FF12] shadow-[0_0_0_1px_rgba(163,255,18,0.2)]"
                          : "border-white/[0.06] hover:border-white/[0.12]"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={label}
                        fill
                        className={`object-cover transition-all duration-150 ${active ? "opacity-100" : "opacity-55 grayscale"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* 2. OBJECTIF */}
            <Section number="02" label="Intention">
              <div className="grid grid-cols-4 gap-1.5">
                {OBJECTIVES.map(({ key, label, Icon }) => {
                  const active = objective === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setObjective(key)}
                      className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-4 transition-all duration-150 active:scale-95 focus-visible:outline-none ${
                        active
                          ? "border-[#A3FF12] bg-[#A3FF12]/[0.06] shadow-[0_0_0_1px_rgba(163,255,18,0.2)]"
                          : "border-white/[0.06] bg-[#0C0C0E]"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${active ? "text-[#A3FF12]" : "text-[#5A5A60]"}`}
                        strokeWidth={active ? 2.4 : 1.8}
                      />
                      <span className={`text-[10px] font-bold leading-tight ${active ? "text-[#A3FF12]" : "text-[#A1A1A6]"}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* 3. CONSTRAINT + DURÉE: ligne combinée */}
            <div className="grid grid-cols-[1fr_auto] gap-3">
              {/* Zones sensibles */}
              <Section number="03" label="Zones sensibles" optional>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-3 py-3 text-left transition active:scale-[0.99] hover:border-white/[0.12]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Plus className="h-4 w-4 shrink-0 text-[#A3FF12]" strokeWidth={2.4} />
                    <span className="truncate text-[12px] font-semibold text-white">{zoneSummary}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#5A5A60]" strokeWidth={2} />
                </button>
              </Section>

              {/* Durée */}
              <Section number="04" label="Durée" align="end">
                <div className="flex gap-1.5">
                  {DURATIONS.map(({ value, label }) => {
                    const active = duration === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDuration(value)}
                        className={`flex h-[44px] w-[52px] items-center justify-center rounded-xl border font-mono text-[12px] font-black transition-all duration-150 active:scale-95 focus-visible:outline-none ${
                          active
                            ? "border-[#A3FF12] bg-[#A3FF12]/[0.06] text-[#A3FF12] shadow-[0_0_0_1px_rgba(163,255,18,0.2)]"
                            : "border-white/[0.06] bg-[#0C0C0E] text-[#5A5A60]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </Section>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!ready || generating}
              className={`group relative flex w-full items-center justify-between overflow-hidden rounded-2xl px-6 py-5 text-left transition-all active:scale-[0.98] focus-visible:outline-none ${
                ready
                  ? "bg-[#A3FF12] text-black energy-ring"
                  : "bg-[#111316] border border-[#A3FF12]/40 text-white"
              }`}
            >
              <div>
                <div className="font-sans text-[19px] font-black uppercase leading-none tracking-tight">
                  Générer le plan
                </div>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${ready ? "bg-black/15" : "bg-[#A3FF12]/10"}`}>
                <Zap className={`h-5 w-5 ${ready ? "fill-black stroke-black" : "stroke-[#A3FF12] fill-[#A3FF12]"}`} strokeWidth={2.4} />
              </div>
            </button>
            <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-[#5A5A60]">
              <Shield className="h-3 w-3 shrink-0" strokeWidth={2} />
              <span>Gratuit · Sans inscription · Par un sportif pour les sportifs</span>
            </div>
          </div>
        </div>
      </main>

      {/* OVERLAY GÉNÉRATION */}
      <AnimatePresence>
        {generating && <GeneratingOverlay />}
      </AnimatePresence>

      {/* MODAL ZONES */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 backdrop-blur-md sm:items-center"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="w-full max-w-[440px] rounded-3xl border border-white/[0.08] bg-[#0C0C0E] p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
                03 · Zones sensibles
              </p>
              <h3 className="mt-1 font-sans text-[20px] font-black uppercase leading-tight text-white">
                Sélectionne tes zones
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {ZONE_OPTIONS.map((zone) => {
                  const active = zones.includes(zone);
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => toggleZone(zone)}
                      className={`rounded-xl border px-3 py-2.5 text-left text-[13px] font-bold transition-all duration-150 active:scale-95 focus-visible:outline-none ${
                        active
                          ? "border-[#A3FF12] bg-[#A3FF12]/[0.06] text-[#A3FF12]"
                          : "border-white/[0.06] bg-white/[0.02] text-white"
                      }`}
                    >
                      {ZONE_LABELS[zone]}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex gap-2">
                {zones.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setZones([])}
                    className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[13px] font-bold text-[#A1A1A6] active:scale-[0.98]"
                  >
                    Effacer
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 rounded-xl bg-[#A3FF12] px-4 py-3 text-[13px] font-black uppercase tracking-wider text-black active:scale-[0.98]"
                >
                  Valider
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Section({
  number,
  label,
  hint,
  optional,
  align,
  children,
}: {
  number: string;
  label: string;
  hint?: string;
  optional?: boolean;
  align?: "start" | "end";
  children: React.ReactNode;
}) {
  return (
    <section className={`flex flex-col gap-2 ${align === "end" ? "items-end" : "items-stretch"}`}>
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#5A5A60]">{number}</span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">{label}</span>
          {optional && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#5A5A60]">opt.</span>
          )}
        </div>
        {hint && (
          <span className="font-mono text-[9.5px] font-semibold uppercase tracking-widest text-[#A3FF12]">
            {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function GeneratingOverlay() {
  const phases = ["Mobilisation", "Activation", "Protection"];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="flex flex-col items-center gap-8 px-6">
        {/* Pulse rings */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-[#A3FF12]"
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
            />
          ))}
          <Zap className="relative h-9 w-9 fill-[#A3FF12] stroke-[#A3FF12]" strokeWidth={2.5} />
        </div>

        {/* Phases timeline reveal */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#5A5A60]">
            Composition en cours
          </p>
          <div className="flex flex-col items-center gap-1.5">
            {phases.map((phase, i) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.45, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 20 }}
                  transition={{ delay: 0.3 + i * 0.45, duration: 0.3 }}
                  className="h-px bg-[#A3FF12]"
                />
                <span className="font-sans text-[16px] font-black uppercase tracking-wide text-white">
                  {phase}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
