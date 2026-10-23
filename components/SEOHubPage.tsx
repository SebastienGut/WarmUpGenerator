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
            className="font-display text-[22px] font-extrabold leading-none tracking-tight text-ink transition-colors hover:underline underline-offset-4"
          >
            Warmup
          </Link>
          <Link
            href="/"
            className="ml-auto text-[14px] font-semibold text-ink transition-opacity hover:opacity-80"
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
                <Link href={b.href} className="transition-colors hover:underline underline-offset-4">
                  {b.label}
                </Link>
              ) : (
                <span className="font-display font-semibold text-ink">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span aria-hidden="true" className="text-faint">/</span>}
            </span>
          ))}
        </nav>

        <section className="mb-14 flex max-w-[720px] flex-col gap-4">
          <h1 className="font-display text-[32px] font-extrabold leading-[1.02] tracking-tight text-ink hyphens-auto sm:text-[40px] md:text-[46px]">
            {title}
          </h1>
          <p className="-mt-2 text-[14px] font-semibold text-subtle">{subtitle}</p>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
            <h2 className="font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-ink">
              {itemsTitle}
            </h2>
            <span className="shrink-0 text-[14px] font-semibold text-ink">
              {items.length} guides
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col border-b border-line pb-4"
              >
                <h3 className="font-display text-[19px] font-extrabold leading-tight tracking-tight text-ink group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                {item.kicker && <span className="mt-1 text-[13px] font-semibold text-subtle">{item.kicker}</span>}
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="mb-14">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink pb-2">
              <h2 className="font-display text-[26px] font-extrabold leading-[0.95] tracking-tight text-ink">
                Questions frequentes
              </h2>
              <span className="shrink-0 text-[14px] font-semibold text-subtle">
                FAQ - {faqs.length}
              </span>
            </div>
            <div className="flex flex-col border-t border-line">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group border-b border-line py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-bold leading-snug text-ink">
                    <span>{faq.q}</span>
                    <span aria-hidden="true" className="shrink-0 text-[16px] text-subtle transition-transform group-open:rotate-45 group-open:text-ink">
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

        <section className="mb-14 border-l-2 border-line pl-6">
          <h2 className="mb-4 font-display text-[26px] font-extrabold tracking-tight text-ink">
            {relatedTitle}
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
              >
                <span className="truncate">{link.label}</span>
                <span aria-hidden="true" className="shrink-0 text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-ink">
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
