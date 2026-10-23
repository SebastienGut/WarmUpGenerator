import type { Metadata, Viewport } from "next";
import ClientScripts from "@/components/ClientScripts";
import { GeistMono } from "geist/font/mono";
import { Archivo } from "next/font/google";
import "./globals.css";

// Une seule famille variable : largeur étendue pour les titres et les chiffres
// (lisibles de loin, téléphone posé au sol), normale pour le texte.
// Auto-hébergée par next/font, aucune requête vers Google côté visiteur.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
    { media: "(prefers-color-scheme: light)", color: "#f4f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#121417" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${archivo.variable} ${GeistMono.variable}`}>
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
