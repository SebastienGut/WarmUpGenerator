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
      className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2.5rem)] max-w-[400px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/[0.10] bg-[#141417]/95 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md"
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      {/* iOS share icon */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#A3FF12]/10">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
          <path
            d="M8 1v10M4 4l4-4 4 4M2 8v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8"
            stroke="#A3FF12"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[13px] font-bold text-white">Installer l&apos;app</span>
        <span className="text-[11px] text-[#A1A1A6]">
          Safari → <span className="font-mono">↑</span> → <em className="not-italic font-medium text-white">Sur l&apos;écran d&apos;accueil</em>
        </span>
      </div>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#5A5A60] transition-colors hover:bg-white/[0.06] hover:text-white"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
          <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
