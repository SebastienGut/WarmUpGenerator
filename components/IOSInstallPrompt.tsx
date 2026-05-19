"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ios-install-dismissed";
const DISMISS_TTL_DAYS = 7;

export default function IOSInstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone =
      ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true) ||
      window.matchMedia("(display-mode: standalone)").matches;

    if (!isIOS || isStandalone) return;

    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const since = Date.now() - Number(dismissed);
      if (since < DISMISS_TTL_DAYS * 86400 * 1000) return;
    }

    const timer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setVisible(false);
    setExpanded(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      {/* Bouton compact — le ✕ ici = cooldown 7j, clic principal = ouvre les étapes */}
      {!expanded && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#141417]/95 px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:border-[#A3FF12]/40 active:scale-95"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <path d="M6 0v8M3 3L6 0l3 3M1 6v7h10V6" stroke="#A3FF12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[13px] font-bold text-white">Installer l&apos;application</span>
          </button>
          <button
            onClick={dismiss}
            aria-label="Ne plus afficher"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-[#141417]/95 text-[#5A5A60] shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:text-white active:scale-95"
          >
            <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
              <path d="M1 1l7 7M8 1l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Instructions dépliées */}
      {expanded && (
        <div
          role="dialog"
          aria-label="Instructions d'installation"
          className="w-[calc(100vw-2.5rem)] max-w-[360px] rounded-2xl border border-white/[0.10] bg-[#141417]/98 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md"
          style={{ animation: "slideUp 0.2s ease-out" }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 pb-3 pt-4">
            <span className="text-[13px] font-bold text-white">Installer sur ton iPhone</span>
            <button onClick={() => setExpanded(false)} aria-label="Fermer" className="flex h-7 w-7 items-center justify-center rounded-lg text-[#5A5A60] transition-colors hover:text-white">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3FF12]/10 font-mono text-[11px] font-bold text-[#A3FF12]">1</span>
              <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#A1A1A6]">
                <span>Appuie sur</span>
                <span className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/[0.06] px-2 py-0.5">
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                    <path d="M5.5 0v8M2 2.5L5.5 0 9 2.5M1 6v6h9V6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-mono text-[10px] text-white">Partager</span>
                </span>
                <span>en bas de Safari</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3FF12]/10 font-mono text-[11px] font-bold text-[#A3FF12]">2</span>
              <p className="text-[13px] text-[#A1A1A6]">Choisis <strong className="text-white">&ldquo;Sur l&apos;écran d&apos;accueil&rdquo;</strong></p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3FF12]/10 font-mono text-[11px] font-bold text-[#A3FF12]">3</span>
              <p className="text-[13px] text-[#A1A1A6]">Appuie sur <strong className="text-white">&ldquo;Ajouter&rdquo;</strong> — c&apos;est tout</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
