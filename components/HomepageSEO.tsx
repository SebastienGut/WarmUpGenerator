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
    a: "L'échauffement élève la température des muscles, mobilise les articulations que la séance va solliciter et prépare le système nerveux. Les études montrent surtout un gain de performance sur les premières séries ; un échauffement structuré est aussi associé à moins de blessures dans plusieurs sports, sans que cela soit une garantie.",
  },
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
    q: "L'application est-elle vraiment gratuite ?",
    a: "Oui : gratuite, sans inscription, sans publicité, sans email demandé. Elle tourne dans ton navigateur, fonctionne hors ligne après la première visite, et la seule mesure d'audience (GoatCounter) ne dépose aucun cookie.",
  },
  {
    q: "Quelle différence entre un échauffement pour la force et pour l'hypertrophie ?",
    a: "La préparation des zones est la même. Ce qui change, c'est la montée en charge : avant des séries lourdes et courtes, elle compte plus de paliers et des répétitions plus courtes. C'est ce que calcule le calculateur de séries d'approche à partir de tes répétitions de travail.",
  },
  {
    q: "Peut-on s'échauffer avec une douleur à l'épaule ou au genou ?",
    a: "Une gêne légère et connue peut se préparer en douceur : indique la zone qui coince, le plan évite les exercices qui la sollicitent fortement et rappelle de garder la gêne faible (sous 3 sur 10). Ce n'est ni un diagnostic ni un soin : une douleur vive, qui augmente ou qui dure demande l'avis d'un kiné ou d'un médecin.",
  },
  {
    q: "Peut-on s'échauffer efficacement en 3 minutes ?",
    a: "Pour une séance légère, un échauffement très court vaut mieux que rien. Avant des charges lourdes, garde la version complète puis tes séries d'approche. La version courte du plan retire la mise en route et ne garde que l'essentiel de la mobilité et de l'activation.",
  },
  {
    q: "Quel échauffement avant les squats ?",
    a: "Le squat demande de la mobilité de cheville et de hanche, un buste solide et des fessiers actifs. Choisis « Jambes » ou « Bas du corps » : le plan cible chevilles, hanches et fessiers. Puis fais tes séries d'approche au squat avec le calculateur.",
  },
  {
    q: "Faut-il faire du cardio avant la musculation ?",
    a: "Quelques minutes de cardio léger, oui : c'est la mise en route de nos plans, pour élever la température. Un long cardio intense (15 minutes ou plus) juste avant n'apporte rien de plus et peut entamer ta force disponible.",
  },
  {
    q: "Le générateur fonctionne-t-il hors connexion en salle ?",
    a: "Oui. Après la première visite, l'outil est mis en cache et fonctionne sans réseau : tu peux générer ton échauffement et le suivre étape par étape même sans Wi-Fi. Tout est calculé sur ton téléphone.",
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
      <div className="mx-auto grid w-full max-w-[1080px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-x-14">

        {/* INTRO SEO */}
        {/* Replié par défaut : lisible par les moteurs, discret pour l'utilisateur. */}
        <details className="group lg:col-span-2 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
            <h2
              id="seo-heading"
              className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-ink"
            >
              Pourquoi s&apos;échauffer avant la musculation ?
            </h2>
            <span aria-hidden="true" className="shrink-0 font-display text-[22px] text-subtle transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 flex max-w-[68ch] flex-col gap-3 text-[15px] leading-relaxed text-muted">
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
              valent mieux que quinze minutes mal pensées. Ce générateur part de ce que tu travailles : des jambes
              demande des chevilles et des hanches mobiles, un développé couché des épaules stables. Il
              prépare exactement ces zones. Pour ta première série lourde, le calculateur de séries d&apos;approche donne la montée en charge sur le
              premier.
            </p>
            <p>
              L&apos;outil est <strong className="text-ink">gratuit, sans inscription, et fonctionne
              hors ligne</strong> une fois la page chargée. Aucune donnée n&apos;est collectée, aucun
              compte n&apos;est requis — pose ton téléphone à côté du tapis et suis l&apos;échauffement
              étape par étape, avec les temps de repos décomptés.
            </p>
          </div>
        </details>

        {/* ÉCHAUFFEMENTS POPULAIRES */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-subtle">
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
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-card px-3 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
              >
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <p className="text-[14px] font-semibold text-subtle">
              Guides par muscle
            </p>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GUIDES.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-line bg-card px-3.5 py-1.5 text-[12px] font-bold text-muted transition-colors hover:border-ink hover:underline underline-offset-4"
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
          className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-ink/[0.035] px-5 py-4 transition-colors hover:border-line"
        >
          <span className="flex flex-col gap-1">
            <span className="text-[14px] font-semibold text-ink">
              L&apos;autre outil
            </span>
            <span className="font-display text-[21px] font-extrabold leading-tight tracking-tight text-ink">
              Séries d&apos;approche : quelle charge, combien de reps
            </span>
            <span className="text-[13px] text-muted">
              Entre ta charge de travail, obtiens ta montée en charge et les disques par côté.
            </span>
          </span>
        </Link>

        {/* PROTECTION — zones sensibles */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
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
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-ink/[0.035] px-3 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
              >
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </div>
        </article>

        {/* DOULEUR — diagnostic par exercice */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-subtle">
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
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-card px-3 py-3 text-[13px] font-bold text-ink transition-colors hover:border-ink hover:underline underline-offset-4"
              >
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </div>
        </article>

        {/* FAQ */}
        <article className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-subtle">
              FAQ
            </p>
            <h2 className="font-display text-[23px] font-extrabold leading-tight tracking-tight text-ink">
              Questions fréquentes
            </h2>
          </div>
          <div className="flex flex-col border-t border-line">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group border-b border-line py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-bold text-ink">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className=" text-subtle transition-transform group-open:rotate-180"
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
        <nav aria-label="Guides" className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-6 lg:col-span-2">
          <span className="w-full text-[14px] font-semibold text-subtle">Guides</span>
          <Link href="/blog/guide-complet-echauffement-musculation" className="text-[13px] text-muted transition-colors hover:underline underline-offset-4">Guide complet</Link>
          <Link href="/blog/pourquoi-s-echauffer-musculation" className="text-[13px] text-muted transition-colors hover:underline underline-offset-4">Pourquoi s&apos;échauffer</Link>
          <Link href="/blog/combien-de-temps-s-echauffer-musculation" className="text-[13px] text-muted transition-colors hover:underline underline-offset-4">Combien de temps</Link>
          <Link href="/blog/echauffement-dynamique-ou-statique" className="text-[13px] text-muted transition-colors hover:underline underline-offset-4">Dynamique ou statique</Link>
        </nav>

        {/* FOOTER */}
        <footer className="flex flex-col gap-4 border-t border-line pt-8 text-[12px] text-subtle lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-[18px] font-extrabold text-ink">
              Warmup
            </p>
            <p>
              Gratuit · Sans inscription · Fonctionne hors ligne
            </p>
          </div>
          <nav aria-label="Liens secondaires" className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/blog" className="font-display font-semibold transition-colors hover:underline underline-offset-4">
              Blog
            </Link>
            <Link href="/a-propos" className="font-display font-semibold transition-colors hover:underline underline-offset-4">
              À propos
            </Link>
            <Link href="/methodologie" className="font-display font-semibold transition-colors hover:underline underline-offset-4">
              Méthodologie
            </Link>
            <Link href="/echauffement/exercice" className="font-display font-semibold transition-colors hover:underline underline-offset-4">
              Exercices
            </Link>
            <Link href="/echauffement/protection" className="font-display font-semibold transition-colors hover:underline underline-offset-4">
              Zones sensibles
            </Link>
          </nav>
          <p className="text-subtle">
            Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du
            sport. En cas de douleur persistante, consulte un professionnel de santé.
          </p>
        </footer>

      </div>
    </section>
  );
}
