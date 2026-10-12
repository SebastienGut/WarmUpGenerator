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
    <main className="relative min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] items-center gap-2.5 px-6 py-3">
          <Link
            href="/"
            className="font-display text-[22px] font-extrabold uppercase leading-none tracking-tight text-ink transition-colors hover:text-accent-ink"
          >
            Warmup<span className="text-accent">.</span>
          </Link>
          <Link
            href="/"
            className="ml-auto font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-80"
          >
            ← Générateur
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[720px] px-6 py-10 md:py-14">

        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-subtle">
          <Link href="/" className="transition-colors hover:text-accent-ink">Accueil</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <span className="font-display font-semibold uppercase tracking-wide text-ink">Blog</span>
        </nav>

        {/* HERO */}
        <section className="mb-12">
          <p className="mb-3 font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
            Guides & conseils
          </p>
          <h1 className="mb-4 font-display text-[41px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink md:text-[48px]">
            Échauffement musculation
          </h1>
          <p className="text-[16px] leading-[1.7] text-muted">
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
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-card p-6 transition-colors hover:border-accent/30"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
                    {post.publishDate}
                  </span>
                  <span className="text-faint">·</span>
                  <span className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="font-display text-[23px] font-extrabold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent md:text-[22px]">
                  {post.h1}
                </h2>
                <p className="text-[14px] leading-relaxed text-muted">
                  {post.intro.slice(0, 160)}…
                </p>
                <span className="font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink transition-all group-hover:translate-x-1">
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
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-accent px-6 py-5 text-on-accent transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-display text-[14px] font-bold uppercase tracking-wide opacity-85">
                → Plan personnalisé
              </span>
              <span className="font-display text-[21px] font-extrabold uppercase leading-tight tracking-tight md:text-[20px]">
                Générer ton échauffement sur mesure
              </span>
              <span className="text-[12px] font-medium">
                Par zone ou type de séance · Prêt en un tap
              </span>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                <path d="M0 0 L14 8 L0 16 Z" />
              </svg>
            </div>
          </Link>
        </section>

        <footer className="border-t border-line pt-6 text-[11px] leading-relaxed text-subtle">
          Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du
          sport. En cas de douleur persistante, consulte un professionnel de santé.
        </footer>

      </div>
    </main>
  );
}
