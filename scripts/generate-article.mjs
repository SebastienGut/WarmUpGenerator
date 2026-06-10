/**
 * generate-article.mjs
 * Génère automatiquement un nouvel article de blog et l'ajoute à blog-content.ts
 * Appelé par le GitHub Action weekly-content.yml
 *
 * Usage: node scripts/generate-article.mjs
 * Requiert: ANTHROPIC_API_KEY dans l'environnement
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── 1. Lire les slugs existants ────────────────────────────────────────────
const blogContent = readFileSync(join(ROOT, "lib/blog-content.ts"), "utf8");
const slugMatches = [...blogContent.matchAll(/slug:\s*"([^"]+)"/g)];
const existingSlugs = slugMatches.map((m) => m[1]);
console.log("Slugs existants:", existingSlugs);

// ─── 2. Pool de sujets candidats ────────────────────────────────────────────
// Triés par priorité SEO (volume estimé × difficulté faible)
// ⚠️ NOTE SEO : ne JAMAIS ajouter ici de sujet "échauffement {muscle} musculation"
// (dos, pecs, épaules, jambes, bras, core, fessiers) — ces requêtes sont la cible
// des pages /echauffement/{muscle}/{objectif}. Un article de blog sur le même
// mot-clé cannibaliserait nos propres pages : Google hésiterait entre les deux
// URL et n'en classerait aucune correctement.
const CANDIDATE_TOPICS = [
  {
    slug: "echauffement-force-musculation",
    keyword: "échauffement musculation force",
    angle:
      "Protocole d'échauffement optimisé pour une séance de force (charges maximales, 1-5 reps). Recrutement neuro-musculaire, activation CNS, séries de chauffe progressives.",
  },
  {
    slug: "echauffement-hypertrophie-musculation",
    keyword: "échauffement musculation hypertrophie",
    angle:
      "Échauffement spécifique pour une séance d'hypertrophie (8-15 reps). Mind-muscle connection, activation ciblée, différence avec l'échauffement force.",
  },
  {
    slug: "s-echauffer-musculation-maison",
    keyword: "s'échauffer musculation maison",
    angle:
      "Comment s'échauffer efficacement pour la musculation à la maison, sans matériel. Adapter le protocole aux contraintes de l'entraînement maison.",
  },
  {
    slug: "warm-up-musculation",
    keyword: "warm up musculation",
    angle:
      "Qu'est-ce qu'un warm up en musculation, comment le faire et pourquoi il est différent des étirements. Article bilingue FR/EN pour capter les requêtes mixtes.",
  },
  {
    slug: "echauffement-avant-1rm",
    keyword: "échauffement avant un max musculation",
    angle:
      "Comment s'échauffer avant de tenter un 1RM (squat, développé couché, soulevé de terre). Pyramide de chauffe, potentiation post-activation, gestion de la fatigue nerveuse, erreurs qui coûtent des kilos le jour J.",
  },
  {
    slug: "musculation-avec-courbatures",
    keyword: "s'entraîner avec des courbatures",
    angle:
      "Peut-on s'entraîner avec des courbatures ? Ce que disent les études sur le DOMS, quand forcer et quand s'abstenir, et comment adapter son échauffement (mode reprise) pour une séance sur muscles courbaturés.",
  },
  {
    slug: "echauffement-musculation-apres-40-ans",
    keyword: "échauffement musculation après 40 ans",
    angle:
      "Pourquoi l'échauffement devient non négociable après 40 ans : tendons moins élastiques, récupération plus lente, historique de blessures. Protocole adapté, durées rallongées, zones à surveiller en priorité.",
  },
  {
    slug: "musculation-le-matin-echauffement",
    keyword: "musculation le matin échauffement",
    angle:
      "S'entraîner le matin : pourquoi le corps a besoin d'un échauffement plus long au réveil (disques hydratés, température corporelle basse, raideur nocturne) et le protocole spécifique pour les séances avant 9h.",
  },
];

// Filtrer les sujets déjà écrits
const pending = CANDIDATE_TOPICS.filter((t) => !existingSlugs.includes(t.slug));
if (pending.length === 0) {
  console.log("Tous les sujets candidats ont déjà été écrits. Rien à faire.");
  process.exit(0);
}

const topic = pending[0];
console.log(`\nSujet sélectionné: ${topic.slug}`);

// ─── 3. Appel API Claude ─────────────────────────────────────────────────────
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY manquante");
  process.exit(1);
}

const SYSTEM_PROMPT = `Tu es un rédacteur SEO expert en musculation et préparation physique, francophone.
Tu génères des articles de blog pour warmup-generator.com — un outil gratuit de génération d'échauffements personnalisés pour la musculation.

Règles absolues :
- Langue : français, tutoiement, ton sportif direct (pas de jargon marketing)
- Contenu scientifiquement rigoureux mais accessible au grand public francophone
- Chaque article doit apporter une valeur réelle et concrète — pas de remplissage
- L'article doit intégrer naturellement des liens internes vers le générateur (/)
- Format de sortie : JSON strict, pas de texte avant ou après`;

const USER_PROMPT = `Génère un article de blog complet pour warmup-generator.com sur le sujet suivant.

Slug: "${topic.slug}"
Mot-clé cible: "${topic.keyword}"
Angle éditorial: "${topic.angle}"

Produis un objet JSON valide avec exactement cette structure TypeScript:

{
  "slug": string,
  "metaTitle": string,         // max 50 chars, inclut le mot-clé, PAS le nom du site
  "metaDescription": string,   // 140-155 chars, inclut le mot-clé, appel à l'action
  "h1": string,                // titre accrocheur, différent du metaTitle
  "publishDate": string,       // format "DD mois YYYY" en français, date d'aujourd'hui approximative
  "readingTime": string,       // "X min"
  "intro": string,             // 2-3 phrases, accroche forte, annonce le plan
  "sections": [
    {
      "heading": string,       // H2 en majuscules ou avec forte emphase, max 60 chars
      "content": string[]      // array de paragraphes HTML (peuvent contenir <strong class='text-white'>...</strong>)
    }
  ],                           // 4 à 6 sections
  "faqs": [
    { "q": string, "a": string }
  ],                           // 4 questions précises et utiles, réponses 2-4 phrases
  "relatedLinks": [
    { "href": string, "label": string }
  ]  // 3-4 liens internes parmi: /blog/*, /echauffement/exercice/*, /echauffement/combo/*, /echauffement/protection/*
}

URLs disponibles pour relatedLinks:
- /blog/pourquoi-s-echauffer-musculation
- /blog/combien-de-temps-s-echauffer-musculation
- /blog/echauffement-dynamique-ou-statique
- /blog/guide-complet-echauffement-musculation
- /blog/echauffement-debutant-musculation
- /blog/echauffement-pecs-musculation
- /blog/erreurs-echauffement-musculation
- /echauffement/exercice/squat
- /echauffement/exercice/developpe-couche
- /echauffement/exercice/souleve-de-terre
- /echauffement/exercice/rowing-barre
- /echauffement/exercice/tractions
- /echauffement/exercice/developpe-militaire
- /echauffement/combo/haut-du-corps
- /echauffement/combo/bas-du-corps
- /echauffement/combo/full-body
- /echauffement/protection/epaule-douleur
- /echauffement/protection/genou
- /echauffement/protection/lombaires
- /echauffement/protection/poignets

IMPORTANT: Renvoie UNIQUEMENT le JSON, sans markdown, sans explication.`;

console.log("Appel API Claude...");

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: USER_PROMPT }],
  }),
});

if (!response.ok) {
  const err = await response.text();
  console.error("Erreur API:", err);
  process.exit(1);
}

const data = await response.json();
const rawContent = data.content[0].text.trim();
console.log("Réponse reçue, parsing JSON...");

// ─── 4. Parser et valider ────────────────────────────────────────────────────
let newPost;
try {
  // Nettoyer les éventuels backticks markdown
  const cleaned = rawContent.replace(/^```json\n?/, "").replace(/\n?```$/, "");
  newPost = JSON.parse(cleaned);
} catch (e) {
  console.error("Erreur de parsing JSON:", e.message);
  console.error("Contenu brut:", rawContent.slice(0, 500));
  process.exit(1);
}

// Vérifications minimales
const required = ["slug", "metaTitle", "metaDescription", "h1", "sections", "faqs", "relatedLinks"];
for (const field of required) {
  if (!newPost[field]) {
    console.error(`Champ manquant: ${field}`);
    process.exit(1);
  }
}

// S'assurer que le slug est correct
newPost.slug = topic.slug;
console.log(`Article généré: "${newPost.h1}" (${newPost.readingTime})`);

// ─── 5. Injecter dans blog-content.ts ────────────────────────────────────────
const newPostStr = JSON.stringify(newPost, null, 2)
  // Convertir les guillemets doubles en simple pour TypeScript si nécessaire
  // (le JSON reste valide tel quel dans un tableau TypeScript)
  .replace(/^/gm, "  "); // indentation de 2 espaces

// Insérer avant le dernier "];" du tableau BLOG_POSTS
const insertionMarker = "];\n\nexport const BLOG_SLUGS";
const insertionIdx = blogContent.lastIndexOf(insertionMarker);

if (insertionIdx === -1) {
  console.error("Marqueur d'insertion introuvable dans blog-content.ts");
  process.exit(1);
}

const updatedContent =
  blogContent.slice(0, insertionIdx) +
  ",\n\n  " +
  JSON.stringify(newPost, null, 2).replace(/^/gm, "  ").trim() +
  ",\n" +
  blogContent.slice(insertionIdx);

writeFileSync(join(ROOT, "lib/blog-content.ts"), updatedContent, "utf8");
console.log(`✓ Article "${newPost.slug}" ajouté dans lib/blog-content.ts`);

// ─── 6. Vérifier la syntaxe TypeScript basiquement ──────────────────────────
// (Le build Vercel valide au moment du déploiement)
console.log("✓ Script terminé avec succès");
console.log(`  Slug: ${newPost.slug}`);
console.log(`  metaTitle (${newPost.metaTitle.length} chars): ${newPost.metaTitle}`);
console.log(`  Sections: ${newPost.sections.length}`);
console.log(`  FAQs: ${newPost.faqs.length}`);
