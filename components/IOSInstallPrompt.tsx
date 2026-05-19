"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ios-install-dismissed";
const DISMISS_TTL_DAYS = 7;

export default function IOSInstallPrompt() {
  const [visible, setVisible] = useState(false);

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
  }

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[380px] -translate-x-1/2 rounded-2xl border border-white/[0.10] bg-[#141417]/98 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md"
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A3FF12]/10">
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" aria-hidden="true">
              <path d="M6.5 1v9M3 3.5L6.5 0 10 3.5M1 7v7h11V7" stroke="#A3FF12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[13px] font-bold text-white">Installer l&apos;app sur ton iPhone</span>
        </div>
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#5A5A60] transition-colors hover:text-white"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3 px-4 py-4">
        {/* Step 1 */}
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3FF12]/10 font-mono text-[11px] font-bold text-[#A3FF12]">1</span>
          <div className="flex items-center gap-2 text-[13px] text-[#A1A1A6]">
            <span>Appuie sur</span>
            {/* iOS share icon — same look as the real button */}
            <span className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/[0.06] px-2 py-0.5">
              <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                <path d="M5.5 0v8M2 2.5L5.5 0 9 2.5M1 6v6h9V6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[10px] text-white">Partager</span>
            </span>
            <span>en bas de Safari</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3FF12]/10 font-mono text-[11px] font-bold text-[#A3FF12]">2</span>
          <p className="text-[13px] text-[#A1A1A6]">
            Fais défiler et choisis{" "}
            <strong className="text-white">&ldquo;Sur l&apos;écran d&apos;accueil&rdquo;</strong>
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3FF12]/10 font-mono text-[11px] font-bold text-[#A3FF12]">3</span>
          <p className="text-[13px] text-[#A1A1A6]">
            Appuie sur <strong className="text-white">&ldquo;Ajouter&rdquo;</strong> — c&apos;est tout
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
