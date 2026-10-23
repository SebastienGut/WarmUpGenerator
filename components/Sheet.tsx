"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Panneau qui monte du bas de l'écran (centré sur ordinateur). Fermeture par
 * le fond, la touche Échap, ou en le tirant vers le bas sur mobile.
 */
export default function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  tall = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Occupe presque toute la hauteur (sélecteur d'exercices). */
  tall?: boolean;
}) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={`relative flex w-full flex-col rounded-t-3xl bg-paper shadow-[0_-12px_40px_rgba(0,0,0,0.18)] outline-none sm:max-w-[520px] sm:rounded-3xl ${
              tall ? "h-[92dvh] sm:h-[80dvh]" : "max-h-[88dvh]"
            }`}
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
            drag={reduce ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
          >
            <div className="flex shrink-0 flex-col items-center px-5 pt-3">
              <span className="h-1.5 w-10 rounded-full bg-line-strong sm:hidden" aria-hidden="true" />
              <div className="mt-3 flex w-full items-center justify-between">
                <h2 className="font-display text-[24px] font-extrabold leading-none tracking-tight text-ink">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-[22px] text-muted hover:bg-ink/[0.06] hover:text-ink"
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3" onPointerDownCapture={(e) => e.stopPropagation()}>
              {children}
            </div>
            {footer && <div className="shrink-0 border-t border-line px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
