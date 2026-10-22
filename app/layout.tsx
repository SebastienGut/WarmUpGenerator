import type { Metadata, Viewport } from "next";
import ClientScripts from "@/components/ClientScripts";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";

// Condensé sportif pour titres et chiffres : se lit de loin, téléphone au sol.
// Auto-hébergé par next/font, aucune requête vers Google côté visiteur.
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Échauffement musculation gratuit & personnalisé",
    template: "%s · Warmup",
  },
  description:
    "Un échauffement musculation en un tap, selon ce que tu travailles : mobilité et activation ciblées, mode guidé. Plus un calculateur de séries d'approche. Gratuit, hors ligne.",
  applicationName: "Warmup Generator",
  authors: [{ name: "Warmup Generator" }],
  openGraph: {
    title: "Warmup Generator — Échauffement musculation personnalisé",
    description:
      "Ton échauffement musculation en un tap, selon ce que tu travailles. Gratuit, sans compte.",
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
      "Ton échauffement musculation en un tap, selon ce que tu travailles.",
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
    statusBarStyle: "default",
    title: "Warmup",
  },
  formatDetection: { telephone: false, email: false, address: false },
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#131210" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${barlow.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/logo-apple-touch.png" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <ClientScripts />
      </body>
    </html>
  );
}
