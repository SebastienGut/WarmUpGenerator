import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HubItem {
  href: string;
  title: string;
  description: string;
  kicker?: string;
}

interface HubLink {
  href: string;
  label: string;
}

interface HubFaq {
  q: string;
  a: string;
}

interface SEOHubPageProps {
  title: string;
  subtitle: string;
  intro: string[];
  breadcrumbs: Breadcrumb[];
  itemsTitle: string;
  items: HubItem[];
  faqs?: HubFaq[];
  relatedTitle: string;
  relatedLinks: HubLink[];
  siteUrl: string;
  path: string;
}

export default function SEOHubPage({
  title,
  subtitle,
  intro,
  breadcrumbs,
  itemsTitle,
  items,
  faqs = [],
  relatedTitle,
  relatedLinks,
  siteUrl,
  path,
}: SEOHubPageProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: b.href ? `${siteUrl}${b.href}` : `${siteUrl}${path}`,
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: intro[0],
    url: `${siteUrl}${path}`,
    inLanguage: "fr-FR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.title,
        url: `${siteUrl}${item.href}`,
      })),
    },
  };
  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  return (
    <main className="relative min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[900px] items-center gap-2.5 px-6 py-3">
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

      <div className="mx-auto w-full max-w-[900px] px-6 py-10 md:py-14">
        <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-subtle">
          {breadcrumbs.map((b, i) => (
            <span key={b.label} className="flex items-center gap-1.5">
              {b.href ? (
                <Link href={b.href} className="transition-colors hover:text-accent-ink">
                  {b.label}
                </Link>
              ) : (
                <span className="font-display font-semibold uppercase tracking-wide text-ink">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span aria-hidden="true" className="text-faint">/</span>}
            </span>
          ))}
        </nav>

        <section className="mb-14 flex max-w-[720px] flex-col gap-4">
          <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
            {subtitle}
          </p>
          <h1 className="font-display text-[41px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink md:text-[48px]">
            {title}
          </h1>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2">
            <h2 className="font-display text-[26px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
              {itemsTitle}
            </h2>
            <span className="shrink-0 font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">
              {items.length} guides
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[170px] flex-col justify-between rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent/40"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-display text-[14px] font-extrabold tabular text-accent-ink">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    {item.kicker && (
                      <span className="truncate text-right font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
                        {item.kicker}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[17px] font-black uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.description}</p>
                </div>
                <span className="mt-5 font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">
                  Voir le protocole
                </span>
              </Link>
            ))}
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="mb-14">
            <div className="mb-6 flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2">
              <h2 className="font-display text-[26px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
                Questions frequentes
              </h2>
              <span className="shrink-0 font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
                FAQ - {faqs.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-line bg-card px-5 py-4 transition-colors hover:border-line-strong [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-bold leading-snug text-ink">
                    <span>{faq.q}</span>
                    <span aria-hidden="true" className="shrink-0 font-mono text-[16px] text-subtle transition-transform group-open:rotate-45 group-open:text-accent-ink">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="mb-14 border-l-2 border-accent/40 pl-6">
          <h2 className="mb-4 font-display text-[26px] font-extrabold uppercase tracking-tight text-ink">
            {relatedTitle}
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                <span className="truncate">{link.label}</span>
                <span aria-hidden="true" className="shrink-0 font-mono text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent-ink">
                  -&gt;
                </span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-line pt-6 text-[11px] leading-relaxed text-subtle">
          Warmup Generator fournit des protocoles informatifs. En cas de douleur persistante,
          consulte un professionnel de sante.
        </footer>
      </div>
    </main>
  );
}
