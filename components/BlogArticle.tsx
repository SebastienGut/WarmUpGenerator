import Link from "next/link";
import type { BlogPost } from "@/lib/blog-content";
import { frDateToISO } from "@/lib/dates";

interface BlogArticleProps {
  post: BlogPost;
  siteUrl: string;
}

export default function BlogArticle({ post, siteUrl }: BlogArticleProps) {
  const path = `/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.h1,
    description: post.metaDescription,
    inLanguage: "fr-FR",
    url: `${siteUrl}${path}`,
    datePublished: frDateToISO(post.publishDate),
    dateModified: frDateToISO(post.publishDate),
    author: {
      "@type": "Person",
      name: "Sébastien Gutierrez",
      url: `${siteUrl}/a-propos`,
      description: "Pratiquant de musculation de longue date, créateur de Warmup Generator.",
    },
    publisher: { "@type": "Organization", name: "Warmup Generator", url: siteUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.h1, item: `${siteUrl}${path}` },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
          <Link href="/blog" className="transition-colors hover:text-[#A3FF12]">Blog</Link>
          <span aria-hidden="true" className="text-[#2E2E33]">/</span>
          <span className="font-mono uppercase tracking-[0.12em] text-white">{post.h1}</span>
        </nav>

        {/* HERO */}
        <section className="mb-12 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/a-propos"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A3FF12] transition-opacity hover:opacity-80"
            >
              Par Sébastien Gutierrez
            </Link>
            <span className="text-[#2E2E33]">·</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              {post.publishDate}
            </span>
            <span className="text-[#2E2E33]">·</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              {post.readingTime} de lecture
            </span>
          </div>
          <h1 className="font-sans text-[36px] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[48px]">
            {post.h1}
          </h1>
          <p className="text-[16px] leading-[1.7] text-[#A1A1A6]">{post.intro}</p>
        </section>

        {/* ARTICLE CONTENT */}
        <article className="mb-14 flex flex-col gap-12">
          {post.sections.map((section, i) => (
            <section key={i} className="flex flex-col gap-4">
              <h2 className="font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
                {section.heading}
              </h2>
              <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[#A1A1A6] md:text-[16px]">
                {section.content.map((p, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </section>
          ))}
        </article>

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

        {/* FAQ */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3">
            <h2 className="font-sans text-[22px] font-black uppercase tracking-tight text-white md:text-[24px]">
              Questions fréquentes
            </h2>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A5A60]">
              FAQ · {post.faqs.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {post.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-5 py-4 transition-colors hover:border-white/[0.12] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-bold leading-snug text-white">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 font-mono text-[16px] text-[#5A5A60] transition-transform group-open:rotate-45 group-open:text-[#A3FF12]">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-white/[0.06] pt-3 text-[13px] leading-relaxed text-[#A1A1A6]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED */}
        {post.relatedLinks.length > 0 && (
          <section className="mb-14">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              À lire aussi
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {post.relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
                >
                  <span className="truncate">{l.label}</span>
                  <span aria-hidden="true" className="shrink-0 font-mono text-[#5A5A60] transition-all group-hover:translate-x-0.5 group-hover:text-[#A3FF12]">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* DISCLAIMER */}
        <footer className="border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-[#5A5A60]">
          Cet article est informatif et ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou
          d&apos;un médecin du sport. En cas de douleur persistante, consulte un professionnel de santé.
        </footer>

      </div>
    </main>
  );
}
