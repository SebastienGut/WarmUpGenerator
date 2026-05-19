import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://warmup-generator.com";

export const metadata: Metadata = {
  title: "Blog échauffement musculation — Guides & conseils",
  description:
    "Guides pratiques sur l'échauffement en musculation : pourquoi s'échauffer, combien de temps, dynamique ou statique. Tout pour performer dès la première série.",
  alternates: { canonical: "/blog", languages: { "fr-FR": "/blog" } },
  openGraph: {
    title: "Blog échauffement musculation — Guides & conseils",
    description:
      "Guides pratiques sur l'échauffement en musculation : pourquoi s'échauffer, combien de temps, dynamique ou statique.",
    type: "website",
    locale: "fr_FR",
    url: "/blog",
    siteName: "Warmup Generator",
  },
  robots: { index: true, follow: true },
};

export default function BlogPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#050505]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] items-center gap-2.5 px-6 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A3FF12]/10 ring-1 ring-[#A3FF12]/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#A3FF12" aria-hidden="true">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <Link
            href="/"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#A3FF12]"
          >
            Warmup / Generator
          </Link>
          <Link
            href="/"
            className="ml-auto font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3FF12] transition-opacity hover:opacity-80"
          >
            ← Générateur
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[720px] px-6 py-10 md:py-14">

        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-[#5A5A60]">
          <Link href="/" className="transition-colors hover:text-[#A3FF12]">Accueil</Link>
          <span aria-hidden="true" className="text-[#2E2E33]">/</span>
          <span className="font-mono uppercase tracking-[0.12em] text-white">Blog</span>
        </nav>

        {/* HERO */}
        <section className="mb-12">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            Guides & conseils
          </p>
          <h1 className="mb-4 font-sans text-[36px] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[48px]">
            Échauffement musculation
          </h1>
          <p className="text-[16px] leading-[1.7] text-[#A1A1A6]">
            Tout ce que tu dois savoir sur l&apos;échauffement en musculation — pourquoi c&apos;est
            indispensable, combien de temps ça doit durer, et quelle méthode adopter.
          </p>
        </section>

        {/* ARTICLES */}
        <section className="mb-14">
          <div className="flex flex-col gap-4">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-[#0C0C0E] p-6 transition-colors hover:border-[#A3FF12]/30"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
                    {post.publishDate}
                  </span>
                  <span className="text-[#2E2E33]">·</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="font-sans text-[20px] font-black leading-tight tracking-tight text-white transition-colors group-hover:text-[#A3FF12] md:text-[22px]">
                  {post.h1}
                </h2>
                <p className="text-[14px] leading-relaxed text-[#A1A1A6]">
                  {post.intro.slice(0, 160)}…
                </p>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#A3FF12] transition-all group-hover:translate-x-1">
                  Lire l&apos;article →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-14">
          <Link
            href="/"
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#A3FF12] px-6 py-5 text-black transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                → Plan personnalisé
              </span>
              <span className="font-sans text-[18px] font-black uppercase leading-tight tracking-tight md:text-[20px]">
                Générer ton échauffement sur mesure
              </span>
              <span className="text-[12px] font-medium opacity-75">
                Adapté à tes muscles, ton objectif, tes zones sensibles · 30 secondes
              </span>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="#000" aria-hidden="true">
                <path d="M0 0 L14 8 L0 16 Z" />
              </svg>
            </div>
          </Link>
        </section>

        <footer className="border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-[#5A5A60]">
          Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du
          sport. En cas de douleur persistante, consulte un professionnel de santé.
        </footer>

      </div>
    </main>
  );
}
