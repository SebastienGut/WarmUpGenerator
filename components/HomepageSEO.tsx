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
    a: "Non. L'échauffement général prépare le corps. Sur les exercices polyarticulaires lourds (squat, développé couché, soulevé de terre), ajoute toujours 2 à 3 séries de chauffe progressive avec la barre avant tes séries de travail effectives.",
  },
  {
    q: "L'application est-elle vraiment gratuite ?",
    a: "Oui — 100 % gratuite, sans inscription, sans publicité, sans email demandé. Le générateur tourne entièrement dans ton navigateur, fonctionne hors ligne après la première visite, et ne collecte aucune donnée personnelle.",
  },
  {
    q: "Quelle différence entre un échauffement pour la force et pour l'hypertrophie ?",
    a: "Pour la force (charges maximales), l'activation neuro-musculaire est prioritaire : il faut que le système nerveux soit prêt à recruter un maximum d'unités motrices dès la première série. Pour l'hypertrophie, la connexion mind-muscle prime — tu dois sentir le muscle travailler. Le générateur adapte automatiquement la sélection d'exercices selon ton objectif.",
  },
  {
    q: "Peut-on s'échauffer avec une douleur à l'épaule ou au genou ?",
    a: "Oui, à condition d'adapter le protocole. Un échauffement spécifique « zone sensible » utilise des mouvements thérapeutiques à faible charge qui préparent l'articulation fragilisée sans l'aggraver. Le générateur intègre cette logique : sélectionne ta zone sensible et il exclut les exercices contre-indiqués.",
  },
  {
    q: "Peut-on s'échauffer efficacement en 3 minutes ?",
    a: "En 3 minutes, on peut faire un échauffement minimal suffisant pour une séance légère ou de reprise. Pour des charges lourdes (squat lourd, développé couché à 80 %+), 5 à 8 minutes sont nécessaires. Le générateur propose des plans sur 3, 5 ou 8 minutes — choisis selon l'intensité de ta séance.",
  },
  {
    q: "Quel échauffement avant les squats ?",
    a: "Le squat sollicite chevilles, genoux, hanches, lombaires et thoracique simultanément. L'échauffement idéal comprend : rotations de cheville, mobilité thoracique en rotation, hip circles, fentes marchées et activation des fessiers. Le générateur a un plan dédié « Jambes » et une page spécifique squat avec le protocole complet.",
  },
  {
    q: "Faut-il faire du cardio avant de faire de la musculation ?",
    a: "Non, ce n'est pas nécessaire ni optimal. Un cardio prolongé (10-15 min de tapis) avant la musculation fatigue le système énergétique et peut réduire ta force disponible. Un échauffement spécifique articulaire + activation musculaire est bien plus efficace pour préparer une séance de force ou d'hypertrophie.",
  },
  {
    q: "Le générateur fonctionne-t-il hors connexion en salle ?",
    a: "Oui. Après la première visite, l'application est mise en cache et fonctionne sans réseau. Tu peux générer un plan et utiliser le mode timer plein écran même en sous-sol sans Wi-Fi. Aucune donnée n'est envoyée à un serveur — tout tourne localement dans ton navigateur.",
  },
];

export default function HomepageSEO() {
  // Schema FAQPage retiré : Google a réservé les rich results FAQ aux sites
  // gouvernementaux/santé (août 2023). Le contenu FAQ reste affiché ci-dessous.
  return (
    <section
      aria-labelledby="seo-heading"
      className="content-layer relative w-full bg-[#050505] border-t border-white/[0.06]"
    >
      <div className="mx-auto w-full max-w-[640px] px-5 py-12 flex flex-col gap-10">

        {/* INTRO SEO */}
        <article className="flex flex-col gap-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
            Le guide
          </p>
          <h2
            id="seo-heading"
            className="font-sans text-[24px] font-black leading-tight tracking-tight text-white"
          >
            Pourquoi s&apos;échauffer avant la musculation ?
          </h2>
          <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-[#A1A1A6]">
            <p>
              Sauter l&apos;échauffement, c&apos;est entrer en séance avec un corps froid : articulations
              raides, muscles peu vascularisés, système nerveux endormi. À court terme, tu perds
              <strong className="text-white"> 10 à 15 % de force</strong> sur ta première série.
              À long terme, tu accumules les micro-traumatismes — tendinites d&apos;épaule, douleurs
              lombaires, gênes au genou.
            </p>
            <p>
              Un bon échauffement musculation suit une logique simple :{" "}
              <strong className="text-white">élever la température, mobiliser les articulations
              ciblées, activer les muscles que tu vas solliciter</strong>. Cinq minutes bien dosées
              valent mieux que quinze minutes mal pensées. C&apos;est exactement ce que ce générateur
              construit pour toi en 30 secondes : un plan adapté à tes muscles cibles, ton objectif
              (force, hypertrophie, mobilité, reprise) et tes éventuelles zones sensibles.
            </p>
            <p>
              L&apos;outil est <strong className="text-white">gratuit, sans inscription, et fonctionne
              hors ligne</strong> une fois la page chargée. Aucune donnée n&apos;est collectée, aucun
              compte n&apos;est requis — pose ton téléphone à côté du tapis et suis le mode timer
              plein écran pendant ton échauffement.
            </p>
          </div>
        </article>

        {/* ÉCHAUFFEMENTS POPULAIRES */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              Plans prêts à l&apos;emploi
            </p>
            <h2 className="font-sans text-[20px] font-black leading-tight tracking-tight text-white">
              Échauffements populaires
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_PLANS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-3 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
              >
                <span className="truncate">{label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[#5A5A60] transition-colors group-hover:text-[#A3FF12]"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              Guides par muscle
            </p>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GUIDES.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-white/[0.06] bg-[#0C0C0E] px-3.5 py-1.5 text-[12px] font-bold text-[#A1A1A6] transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* PROTECTION — zones sensibles */}
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              Tu as une douleur ?
            </p>
            <h2 className="font-sans text-[20px] font-black leading-tight tracking-tight text-white">
              Échauffements pour zones sensibles
            </h2>
            <p className="text-[13px] text-[#A1A1A6] leading-relaxed mt-1">
              Protocoles spécifiques pour s&apos;entraîner malgré une gêne ou une douleur articulaire
              (sous réserve d&apos;avis médical en cas de douleur installée).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PROTECTION_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-2 rounded-xl border border-[#A3FF12]/15 bg-[#A3FF12]/[0.03] px-3 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
              >
                <span className="truncate">{label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[#A3FF12]/60 transition-colors group-hover:text-[#A3FF12]"
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
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              La douleur vient d&apos;un exercice précis ?
            </p>
            <h2 className="font-sans text-[20px] font-black leading-tight tracking-tight text-white">
              Comprendre d&apos;où vient la douleur
            </h2>
            <p className="text-[13px] text-[#A1A1A6] leading-relaxed mt-1">
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
                className="group flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-[#0C0C0E] px-3 py-3 text-[13px] font-bold text-white transition-colors hover:border-[#A3FF12]/40 hover:text-[#A3FF12]"
              >
                <span className="truncate">{label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[#5A5A60] transition-colors group-hover:text-[#A3FF12]"
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
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5A5A60]">
              FAQ
            </p>
            <h2 className="font-sans text-[20px] font-black leading-tight tracking-tight text-white">
              Questions fréquentes
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/[0.06] bg-[#0C0C0E] px-4 py-3 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-bold text-white">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[#5A5A60] transition-transform group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-[13px] leading-relaxed text-[#A1A1A6]">{f.a}</p>
              </details>
            ))}
          </div>
        </article>

        {/* GUIDES — liens discrets */}
        <nav aria-label="Guides" className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/[0.06] pt-6">
          <span className="w-full font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#3A3A40]">Guides</span>
          <Link href="/blog/guide-complet-echauffement-musculation" className="font-mono text-[10px] text-[#5A5A60] transition-colors hover:text-[#A3FF12]">Guide complet</Link>
          <Link href="/blog/pourquoi-s-echauffer-musculation" className="font-mono text-[10px] text-[#5A5A60] transition-colors hover:text-[#A3FF12]">Pourquoi s&apos;échauffer</Link>
          <Link href="/blog/combien-de-temps-s-echauffer-musculation" className="font-mono text-[10px] text-[#5A5A60] transition-colors hover:text-[#A3FF12]">Combien de temps</Link>
          <Link href="/blog/echauffement-dynamique-ou-statique" className="font-mono text-[10px] text-[#5A5A60] transition-colors hover:text-[#A3FF12]">Dynamique ou statique</Link>
        </nav>

        {/* FOOTER */}
        <footer className="flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-[11px] text-[#5A5A60]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono uppercase tracking-[0.18em]">
              Warmup Generator
            </p>
            <p>
              Gratuit · Sans inscription · Fonctionne hors ligne
            </p>
          </div>
          <nav aria-label="Liens secondaires" className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/blog" className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[#A3FF12]">
              Blog
            </Link>
            <Link href="/a-propos" className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[#A3FF12]">
              À propos
            </Link>
            <Link href="/methodologie" className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[#A3FF12]">
              Méthodologie
            </Link>
            <Link href="/echauffement/exercice" className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[#A3FF12]">
              Exercices
            </Link>
            <Link href="/echauffement/protection" className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[#A3FF12]">
              Zones sensibles
            </Link>
          </nav>
          <p className="text-[#5A5A60]/80">
            Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du
            sport. En cas de douleur persistante, consulte un professionnel de santé.
          </p>
        </footer>

      </div>
    </section>
  );
}
