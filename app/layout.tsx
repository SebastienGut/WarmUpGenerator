import type { Metadata, Viewport } from "next";
import ClientScripts from "@/components/ClientScripts";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Échauffement musculation gratuit & personnalisé",
    template: "%s · Warmup Generator",
  },
  description:
    "Crée en 30 secondes un plan d'échauffement adapté à tes muscles cibles, ton objectif et tes zones sensibles. 100% gratuit, sans inscription, fonctionne hors ligne.",
  applicationName: "Warmup Generator",
  authors: [{ name: "Warmup Generator" }],
  openGraph: {
    title: "Warmup Generator — Échauffement musculation personnalisé",
    description:
      "Plan d'échauffement sur mesure en 30 secondes. Gratuit, sans inscription, sans pub.",
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Warmup Generator",
    // og:image auto-généré par app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Warmup Generator — Échauffement musculation personnalisé",
    description:
      "Plan d'échauffement sur mesure en 30 secondes. Gratuit, sans inscription.",
    // twitter:image auto-généré par app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Warmup",
  },
  formatDetection: { telephone: false, email: false, address: false },
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/logo-apple-touch.png" />
      </head>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-geist-sans)" }}>
        {children}
        <ClientScripts />
      </body>
    </html>
  );
}
