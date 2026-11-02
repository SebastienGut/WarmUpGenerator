import Link from "next/link";

// Pages d'atterrissage calquées sur les recherches les plus fréquentes.
const POPULAR_PLANS: { href: string; label: string }[] = [
  { href: "/echauffement/haut-du-corps", label: "Haut du corps" },
  { href: "/echauffement/bas-du-corps", label: "Bas du corps" },
  { href: "/echauffement/full-body", label: "Full body" },
  { href: "/echauffement/push", label: "Push day" },
  { href: "/echauffement/pull", label: "Pull day" },
  { href: "/echauffement/sans-materiel", label: "Sans matériel" },
  { href: "/echauffement/exercice/squat", label: "Avant le squat" },
  { href: "/echauffement/exercice/developpe-couche", label: "Avant le développé couché" },
];

// Pages hub par groupe musculaire (cibles SEO principales)
const MUSCLE_GUIDES: { href: string; label: string }[] = [
  { href: "/echauffement/pecs", label: "Pectoraux" },
  { href: "/echauffement/dos", label: "Dos" },
  { href: "/echauffement/epaules", label: "Épaules" },
  { href: "/echauffement/jambes", label: "Jambes" },
  { href: "/echauffement/fessiers", label: "Fessiers" },
  { href: "/echauffement/bras", label: "Bras" },
  { href: "/echauffement/core", label: "Gainage" },
  { href: "/echauffement/exercice", label: "Avant un exercice précis" },
];

const PROTECTION_LINKS: { href: string; label: string }[] = [
  { href: "/echauffement/protection/epaule-douleur", label: "Épaule douloureuse" },
  { href: "/echauffement/protection/genou", label: "Genou sensible" },
  { href: "/echauffement/protection/lombaires", label: "Lombaires / bas du dos" },
  { href: "/echauffement/protection/poignets", label: "Poignets fragiles" },
];

// Cluster douleur : liés depuis la page la plus forte du site, volontairement.
// Google « détecte sans explorer » une partie du site faute d'autorité ; la
// profondeur de maillage est le levier direct sur la priorité de crawl, donc
// ces pages doivent être à un clic de l'accueil, pas trois.
const DOULEUR_LINKS: { href: string; label: string }[] = [
  { href: "/douleur/epaule-developpe-couche", label: "Épaule au développé couché" },
  { href: "/douleur/genou-squat", label: "Genou au squat" },
  { href: "/douleur/bas-du-dos-souleve-de-terre", label: "Bas du dos au soulevé de terre" },
  { href: "/douleur/poignet-pompes", label: "Poignets aux pompes" },
  { href: "/douleur/epaule-tractions", label: "Épaule aux tractions" },
  { href: "/douleur/coude-curl-biceps", label: "Coude au curl" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Combien de temps doit durer un échauffement ?",
    a: "Pour la plupart des séances, 5 à 10 minutes suffisent : quelques minutes de mise en route, puis de la mobilité et de l'activation ciblées sur les muscles du jour. Le plan affiche sa durée réelle, transitions comprises. Viennent ensuite les séries d'approche sur ton premier exercice lourd.",
  },
  {
    q: "Faut-il s'étirer avant la musculation ?",
    a: "Les étirements statiques longs (plus de 60 secondes par muscle) juste avant l'effort peuvent réduire un peu la force et la puissance ; des étirements courts ont un effet négligeable. On privilégie donc la mobilité dynamique et l'activation avant la séance, et on garde les étirements tenus pour après ou pour un autre moment.",
  },
  {
    q: "Cet échauffement remplace-t-il les séries de chauffe avec barre ?",
    a: "Non. L'échauffement prépare les zones que tu vas travailler ; les séries d'approche préparent le geste et la charge. Sur un exercice lourd (squat, développé couché, soulevé de terre), fais ensuite quelques séries à charge croissante : le calculateur de séries d'approche donne les charges et les disques.",
  },
  {
    q: "Peut-on s'échauffer avec une douleur à l'épaule ou au genou ?",
    a: "Une gêne légère et connue peut se préparer en douceur : indique la zone qui coince, le plan évite les exercices qui la sollicitent fortement et rappelle de garder la gêne faible (sous 3 sur 10). Ce n'est ni un diagnostic ni un soin : une douleur vive, qui augmente ou qui dure demande l'avis d'un kiné ou d'un médecin.",
  },
  {
    q: "Le générateur fonctionne-t-il hors connexion en salle ?",
    a: "Oui. Après la première visite, l'outil est mis en cache et fonctionne sans réseau : tu peux générer ton échauffement et le suivre étape par étape même sans Wi-Fi. Tout est calculé sur ton téléphone.",
  },
];

export default function HomepageSEO() {
  // Sous l'outil, un index sobre : tous les guides restent à un clic de
  // l'accueil (exploration par les moteurs) sans concurrencer l'outil.
  // Schema FAQPage retiré : rich results FAQ réservés aux sites de santé/État depuis 2023.
  const columns: { title: string; links: { href: string; label: string }[] }[] = [
    { title: "Par séance", links: POPULAR_PLANS },
    { title: "Par muscle", links: MUSCLE_GUIDES },
    {
      title: "Douleurs et zones sensibles",
      links: [...DOULEUR_LINKS, ...PROTECTION_LINKS],
    },
  ];
  return (
    <section aria-labelledby="seo-heading" className="w-full border-t border-line bg-paper">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-12 px-5 py-12 sm:px-8">
        <div>
          <h2 id="seo-heading" className="mb-5 font-display text-[22px] font-extrabold tracking-tight text-ink">
            Tous les échauffements
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {columns.map((c, i) => (
              <nav key={c.title} aria-label={c.title} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <p className="mb-2 text-[14px] font-semibold text-subtle">{c.title}</p>
                <ul className={i === 2 ? "columns-2 gap-x-6 sm:columns-1 [&>li]:mb-1.5 [&>li]:break-inside-avoid" : "flex flex-col gap-1.5"}>
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[15px] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-display text-[22px] font-extrabold tracking-tight text-ink">Questions fréquentes</h2>
          <div className="flex flex-col border-t border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-line py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-semibold text-ink">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="text-subtle transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <footer className="flex flex-col gap-4 border-t border-line pt-8 text-[13px] text-subtle">
          <nav aria-label="Liens secondaires" className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              ["/series-approche", "Séries d'approche"],
              ["/echauffement", "Tous les guides"],
              ["/blog", "Blog"],
              ["/methodologie", "Méthodologie"],
              ["/a-propos", "À propos"],
              ["/donnees", "Données ouvertes"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="font-semibold text-ink hover:underline underline-offset-4">
                {label}
              </Link>
            ))}
          </nav>
          <p>
            Gratuit, sans inscription, fonctionne hors ligne. Ne remplace pas l&apos;avis d&apos;un kiné ou d&apos;un
            médecin du sport : en cas de douleur qui dure, consulte un professionnel de santé.
          </p>
        </footer>
      </div>
    </section>
  );
}
