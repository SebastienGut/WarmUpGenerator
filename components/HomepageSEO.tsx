import Link from "next/link";

const POPULAR_PLANS: { href: string; label: string }[] = [
  { href: "/echauffement/exercice/developpe-couche", label: "Développé couché" },
  { href: "/echauffement/exercice/squat", label: "Squat" },
  { href: "/echauffement/exercice/souleve-de-terre", label: "Soulevé de terre" },
  { href: "/echauffement/exercice/tractions", label: "Tractions" },
  { href: "/echauffement/combo/haut-du-corps", label: "Haut du corps" },
  { href: "/echauffement/combo/bas-du-corps", label: "Bas du corps" },
  { href: "/echauffement/combo/full-body", label: "Full body" },
  { href: "/echauffement/protection/epaule-douleur", label: "Épaule sensible" },
];

// Pages hub par groupe musculaire (cibles SEO principales)
const MUSCLE_GUIDES: { href: string; label: string }[] = [
  { href: "/echauffement/pecs", label: "Pectoraux" },
  { href: "/echauffement/dos", label: "Dos" },
  { href: "/echauffement/epaules", label: "Épaules" },
  { href: "/echauffement/jambes", label: "Jambes" },
  { href: "/echauffement/fessiers", label: "Fessiers" },
  { href: "/echauffement/bras", label: "Bras" },
  { href: "/echauffement/core", label: "Core" },
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
    q: "Pourquoi s'échauffer avant une séance de musculation ?",
    a: "Un échauffement musculation augmente la température corporelle, lubrifie les articulations, active le système nerveux et prépare les muscles à des charges lourdes. Résultat : moins de blessures, plus de force disponible et une meilleure connexion neuro-musculaire dès la première série de travail.",
  },
  {
    q: "Combien de temps doit durer un échauffement ?",
    a: "Cinq à huit minutes suffisent pour la majorité des séances. Compte 2 à 3 minutes de mobilisation articulaire générale, puis 2 à 5 minutes d'activation musculaire ciblée sur les muscles que tu vas travailler. Au-delà de 10 minutes, tu fatigues sans bénéfice supplémentaire.",
  },
  {
    q: "Faut-il s'étirer avant la musculation ?",
    a: "Non, pas en statique. Les étirements statiques avant l'effort réduisent la force et la puissance de 5 à 10 % pendant 30 à 60 minutes. Privilégie la mobilité dynamique (cercles d'épaules, fentes marchées, swings de hanches) et l'activation musculaire. Garde les étirements statiques pour la fin de séance ou les jours de repos.",
  },
  {
    q: "Cet échauffement remplace-t-il les séries de chauffe avec barre ?",
    a: "Non. L'échauffement général prépare le corps. Sur les exercices polyarticulaires lourds (squat, développé couché, soulevé de terre), ajoute toujours 2 à 5 séries d'approche à charge croissante avant tes séries de travail : le calculateur de séries d'approche du site te donne les charges exactes.",
  },
  {
    q: "L'application est-elle vraiment gratuite ?",
    a: "Oui — 100 % gratuite, sans inscription, sans publicité, sans email demandé. Le générateur tourne entièrement dans ton navigateur, fonctionne hors ligne après la première visite, et ne collecte aucune donnée personnelle.",
  },
  {
    q: "Quelle différence entre un échauffement pour la force et pour l'hypertrophie ?",
    a: "Pour la force (charges maximales), l'activation neuro-musculaire est prioritaire : il faut que le système nerveux soit prêt à recruter un maximum d'unités motrices dès la première série. Pour l'hypertrophie, la connexion mind-muscle prime — tu dois sentir le muscle travailler. Le générateur en tient compte à travers tes répétitions de travail : plus elles sont basses, plus la montée en charge est longue et ses répétitions courtes.",
  },
  {
    q: "Peut-on s'échauffer avec une douleur à l'épaule ou au genou ?",
    a: "Oui, à condition d'adapter le protocole. Un échauffement spécifique « zone sensible » utilise des mouvements thérapeutiques à faible charge qui préparent l'articulation fragilisée sans l'aggraver. Le générateur intègre cette logique : indique la zone qui coince, il exclut les exercices contre-indiqués, ajoute une préparation dédiée et te rappelle le seuil de douleur à ne pas dépasser pendant les séries d'approche.",
  },
  {
    q: "Peut-on s'échauffer efficacement en 3 minutes ?",
    a: "En 3 minutes, on peut faire un échauffement minimal suffisant pour une séance légère ou de reprise. Pour des charges lourdes (squat lourd, développé couché à 80 %+), 5 à 8 minutes sont nécessaires. La version courte du générateur supprime le cardio et ne garde que l'essentiel : deux mobilités, une activation et tes séries d'approche.",
  },
  {
    q: "Quel échauffement avant les squats ?",
    a: "Le squat sollicite chevilles, genoux, hanches, lombaires et thoracique simultanément. L'échauffement idéal comprend : rotations de cheville, mobilité thoracique en rotation, hip circles, fentes marchées et activation des fessiers. Choisis « Squat » dans le générateur : il sélectionne la mobilité de cheville et de hanche, active les fessiers et calcule ta montée en charge jusqu'à ta charge de travail.",
  },
  {
    q: "Faut-il faire du cardio avant de faire de la musculation ?",
    a: "Non, ce n'est pas nécessaire ni optimal. Un cardio prolongé (10-15 min de tapis) avant la musculation fatigue le système énergétique et peut réduire ta force disponible. Un échauffement spécifique articulaire + activation musculaire est bien plus efficace pour préparer une séance de force ou d'hypertrophie.",
  },
  {
    q: "Le générateur fonctionne-t-il hors connexion en salle ?",
    a: "Oui. Après la première visite, l'application est mise en cache et fonctionne sans réseau. Tu peux construire ton échauffement et le suivre étape par étape même en sous-sol sans Wi-Fi. Aucune donnée n'est envoyée à un serveur — tout tourne localement dans ton navigateur.",
  },
];

export default function HomepageSEO() {
  // Schema FAQPage retiré : Google a réservé les rich results FAQ aux sites
  // gouvernementaux/santé (août 2023). Le contenu FAQ reste affiché ci-dessous.
  return (
    <section
      aria-labelledby="seo-heading"
      className="content-layer relative w-full bg-paper border-t border-line"
    >
      <div className="mx-auto w-full max-w-[640px] px-5 py-12 flex flex-col gap-10">

        {/* INTRO SEO */}
        <article className="flex flex-col gap-3">
          <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
            Le guide
          </p>
          <h2
            id="seo-heading"
            className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-ink"
          >
            Pourquoi s&apos;échauffer avant la musculation ?
          </h2>
          <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-muted">
            <p>
              Sauter l&apos;échauffement, c&apos;est entrer en séance avec un corps froid : articulations
              raides, muscles peu vascularisés, système nerveux endormi. À court terme, ta première
              série lourde part sur un geste qui n&apos;a pas été répété. À long terme, tu accumules les micro-traumatismes — tendinites d&apos;épaule, douleurs
              lombaires, gênes au genou.
            </p>
            <p>
              Un bon échauffement musculation suit une logique simple :{" "}
              <strong className="text-ink">élever la température, mobiliser les articulations
              ciblées, activer les muscles que tu vas solliciter</strong>. Cinq minutes bien dosées
              valent mieux que quinze minutes mal pensées. Ce générateur part des exercices de ta séance : un squat
              demande des chevilles et des hanches mobiles, un développé couché des épaules stables. Il
              prépare ce dont tes exercices ont besoin, puis calcule tes séries d&apos;approche sur le
              premier.
            </p>
            <p>
              L&apos;outil est <strong className="text-ink">gratuit, sans inscription, et fonctionne
              hors ligne</strong> une fois la page chargée. Aucune donnée n&apos;est collectée, aucun
              compte n&apos;est requis — pose ton téléphone à côté du tapis et suis l&apos;échauffement
              étape par étape, avec les temps de repos décomptés.
            </p>
          </div>
        </article>

        {/* ÉCHAUFFEMENTS POPULAIRES */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              Plans prêts à l&apos;emploi
            </p>
            <h2 className="font-display text-[23px] font-extrabold leading-tight tracking-tight text-ink">
              Échauffements populaires
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_PLANS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-card px-3 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                <span className="truncate">{label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-subtle transition-colors group-hover:text-accent-ink"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              Guides par muscle
            </p>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GUIDES.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-line bg-card px-3.5 py-1.5 text-[12px] font-bold text-muted transition-colors hover:border-accent/40 hover:text-accent-ink"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* SÉRIES D'APPROCHE — l'étape spécifique, après l'échauffement général */}
        <Link
          href="/series-approche"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.04] px-5 py-4 transition-colors hover:border-accent/50"
        >
          <span className="flex flex-col gap-1">
            <span className="font-display text-[14px] font-bold uppercase tracking-wide text-accent-ink">
              Nouveau · Calculateur
            </span>
            <span className="font-display text-[21px] font-extrabold leading-tight tracking-tight text-ink">
              Séries d&apos;approche : quelle charge, combien de reps
            </span>
            <span className="text-[13px] text-muted">
              Entre ta charge de travail, obtiens ta montée en charge et les disques par côté.
            </span>
          </span>
          <span aria-hidden="true" className="font-mono text-[18px] text-accent transition-transform group-hover:translate-x-0.5">→</span>
        </Link>

        {/* PROTECTION — zones sensibles */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              Tu as une douleur ?
            </p>
            <h2 className="font-display text-[23px] font-extrabold leading-tight tracking-tight text-ink">
              Échauffements pour zones sensibles
            </h2>
            <p className="text-[13px] text-muted leading-relaxed mt-1">
              Protocoles spécifiques pour s&apos;entraîner malgré une gêne ou une douleur articulaire
              (sous réserve d&apos;avis médical en cas de douleur installée).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PROTECTION_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-2 rounded-xl border border-accent/15 bg-accent/[0.03] px-3 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                <span className="truncate">{label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-accent/60 transition-colors group-hover:text-accent-ink"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </article>

        {/* DOULEUR — diagnostic par exercice */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              La douleur vient d&apos;un exercice précis ?
            </p>
            <h2 className="font-display text-[23px] font-extrabold leading-tight tracking-tight text-ink">
              Comprendre d&apos;où vient la douleur
            </h2>
            <p className="text-[13px] text-muted leading-relaxed mt-1">
              Le genou qui souffre au squat vient presque toujours de la cheville ou de la
              hanche. Chaque guide part du mouvement qui déclenche la douleur, explique le
              mécanisme, puis donne les corrections et le protocole.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {DOULEUR_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-card px-3 py-3 text-[13px] font-bold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                <span className="truncate">{label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-subtle transition-colors group-hover:text-accent-ink"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </article>

        {/* FAQ */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-display text-[14px] font-bold uppercase tracking-wide text-subtle">
              FAQ
            </p>
            <h2 className="font-display text-[23px] font-extrabold leading-tight tracking-tight text-ink">
              Questions fréquentes
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-card px-4 py-3 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-bold text-ink">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-subtle transition-transform group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </article>

        {/* GUIDES — liens discrets */}
        <nav aria-label="Guides" className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-6">
          <span className="w-full font-display text-[14px] font-bold uppercase tracking-wide text-faint">Guides</span>
          <Link href="/blog/guide-complet-echauffement-musculation" className="font-mono text-[10px] text-subtle transition-colors hover:text-accent-ink">Guide complet</Link>
          <Link href="/blog/pourquoi-s-echauffer-musculation" className="font-mono text-[10px] text-subtle transition-colors hover:text-accent-ink">Pourquoi s&apos;échauffer</Link>
          <Link href="/blog/combien-de-temps-s-echauffer-musculation" className="font-mono text-[10px] text-subtle transition-colors hover:text-accent-ink">Combien de temps</Link>
          <Link href="/blog/echauffement-dynamique-ou-statique" className="font-mono text-[10px] text-subtle transition-colors hover:text-accent-ink">Dynamique ou statique</Link>
        </nav>

        {/* FOOTER */}
        <footer className="flex flex-col gap-4 border-t border-line pt-8 text-[11px] text-subtle">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono uppercase tracking-[0.18em]">
              Warmup Generator
            </p>
            <p>
              Gratuit · Sans inscription · Fonctionne hors ligne
            </p>
          </div>
          <nav aria-label="Liens secondaires" className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/blog" className="font-display font-semibold uppercase tracking-wide transition-colors hover:text-accent-ink">
              Blog
            </Link>
            <Link href="/a-propos" className="font-display font-semibold uppercase tracking-wide transition-colors hover:text-accent-ink">
              À propos
            </Link>
            <Link href="/methodologie" className="font-display font-semibold uppercase tracking-wide transition-colors hover:text-accent-ink">
              Méthodologie
            </Link>
            <Link href="/echauffement/exercice" className="font-display font-semibold uppercase tracking-wide transition-colors hover:text-accent-ink">
              Exercices
            </Link>
            <Link href="/echauffement/protection" className="font-display font-semibold uppercase tracking-wide transition-colors hover:text-accent-ink">
              Zones sensibles
            </Link>
          </nav>
          <p className="text-subtle/80">
            Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du
            sport. En cas de douleur persistante, consulte un professionnel de santé.
          </p>
        </footer>

      </div>
    </section>
  );
}
