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
    <main className="relative min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
          <Link href="/blog" className="transition-colors hover:text-accent-ink">Blog</Link>
          <span aria-hidden="true" className="text-faint">/</span>
          <span className="font-display font-semibold uppercase tracking-wide text-ink">{post.h1}</span>
        </nav>

        {/* HERO */}
        <section className="mb-12 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/a-propos"
              className="font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-80"
            >
              Par Sébastien Gutierrez
            </Link>
            <span className="text-faint">·</span>
            <span className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              {post.publishDate}
            </span>
            <span className="text-faint">·</span>
            <span className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              {post.readingTime} de lecture
            </span>
          </div>
          <h1 className="font-display text-[41px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink md:text-[48px]">
            {post.h1}
          </h1>
          <p className="text-[16px] leading-[1.7] text-muted">{post.intro}</p>
        </section>

        {/* ARTICLE CONTENT */}
        <article className="mb-14 flex flex-col gap-12">
          {post.sections.map((section, i) => (
            <section key={i} className="flex flex-col gap-4">
              <h2 className="font-display text-[26px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
                {section.heading}
              </h2>
              <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
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
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-accent px-6 py-5 text-on-accent transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-display text-[14px] font-bold uppercase tracking-wide opacity-70">
                → Plan personnalisé
              </span>
              <span className="font-display text-[21px] font-extrabold uppercase leading-tight tracking-tight md:text-[20px]">
                Générer ton échauffement sur mesure
              </span>
              <span className="text-[12px] font-medium opacity-75">
                Adapté à tes muscles, ton objectif, tes zones sensibles · 30 secondes
              </span>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 transition-transform group-hover:translate-x-1">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                <path d="M0 0 L14 8 L0 16 Z" />
              </svg>
            </div>
          </Link>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2">
            <h2 className="font-display text-[26px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
              Questions fréquentes
            </h2>
            <span className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              FAQ · {post.faqs.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {post.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-card px-5 py-4 transition-colors hover:border-line-strong [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-bold leading-snug text-ink">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 font-mono text-[16px] text-subtle transition-transform group-open:rotate-45 group-open:text-accent-ink">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED */}
        {post.relatedLinks.length > 0 && (
          <section className="mb-14">
            <p className="mb-4 font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              À lire aussi
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {post.relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
                >
                  <span className="truncate">{l.label}</span>
                  <span aria-hidden="true" className="shrink-0 font-mono text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent-ink">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* DISCLAIMER */}
        <footer className="border-t border-line pt-6 text-[11px] leading-relaxed text-subtle">
          Cet article est informatif et ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou
          d&apos;un médecin du sport. En cas de douleur persistante, consulte un professionnel de santé.
        </footer>

      </div>
    </main>
  );
}
