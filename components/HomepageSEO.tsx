import Link from "next/link";

const POPULAR_PLANS: { muscle: string; objectif: string; label: string }[] = [
  { muscle: "pecs", objectif: "force", label: "Pecs · Force" },
  { muscle: "dos", objectif: "hypertrophie", label: "Dos · Volume" },
  { muscle: "epaules", objectif: "mobilite", label: "Épaules · Mobilité" },
  { muscle: "jambes", objectif: "force", label: "Jambes · Force" },
  { muscle: "fessiers", objectif: "hypertrophie", label: "Fessiers · Volume" },
  { muscle: "bras", objectif: "hypertrophie", label: "Bras · Volume" },
  { muscle: "core", objectif: "mobilite", label: "Core · Mobilité" },
  { muscle: "dos", objectif: "reprise", label: "Dos · Reprise" },
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
];

export default function HomepageSEO() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      aria-labelledby="seo-heading"
      className="content-layer relative w-full bg-[#050505] border-t border-white/[0.06]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            {POPULAR_PLANS.map(({ muscle, objectif, label }) => (
              <Link
                key={`${muscle}-${objectif}`}
                href={`/echauffement/${muscle}/${objectif}`}
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

        {/* FOOTER */}
        <footer className="flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-[11px] text-[#5A5A60]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono uppercase tracking-[0.18em]">
              Warmup Generator
            </p>
            <p>
              Gratuit · Sans inscription · Fonctionne hors ligne
            </p>
          </div>
          <p className="text-[#5A5A60]/80">
            Cet outil ne remplace pas l&apos;avis d&apos;un kinésithérapeute ou d&apos;un médecin du
            sport. En cas de douleur persistante, consulte un professionnel de santé.
          </p>
        </footer>

      </div>
    </section>
  );
}
