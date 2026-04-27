import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Warmup Generator - Echauffement musculation gratuit et personnalise",
  description:
    "Creez en 30 secondes un plan d'echauffement adapte a vos muscles cibles, votre objectif et vos zones sensibles. 100% gratuit, sans inscription, fonctionne hors ligne.",
  keywords: [
    "echauffement musculation",
    "exercices echauffement avant seance",
    "s echauffer avant musculation",
    "plan echauffement personnalise",
  ],
  openGraph: {
    title: "Warmup Generator - Echauffement musculation personnalise",
    description: "Plan d'echauffement sur mesure en 30 secondes. Gratuit, sans inscription.",
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Warmup",
  },
  other: { "mobile-web-app-capable": "yes" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#050505" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
      </head>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-geist-sans)" }}>
        {children}
        <Script id="sw-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').catch(() => {}); }`}
        </Script>
      </body>
    </html>
  );
}
