// Relecture automatique du texte visible de toutes les pages (serveur de prod local) :
// mots collés, ponctuation sans espace, et mentions de fonctions qui n'existent plus.
// Usage : npm run build && npm start (port 3100 via .claude/launch.json), puis
//   node scripts/bench/text-audit.mjs [dossier de sortie du texte extrait]
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = process.argv[2];

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));

// Mentions de l'ancienne version de l'outil (à corriger dans les textes).
const STALE = [
  [/mise en route/i, "phase « mise en route » (supprimée : plus de cardio)"],
  [/cardio léger|minutes? de cardio/i, "cardio dans l'échauffement (supprimé)"],
  [/pictogrammes? animés?/i, "pictogrammes animés (remplacés par des démonstrations en images)"],
  [/Mes zones/, "« Mes zones » (retiré de l'accueil)"],
  [/version courte/i, "version courte (retirée)"],
  [/Ça coince/i, "« Ça coince ? » (retiré)"],
  [/coche[sz]? « /i, "« coche … dans l'outil » (l'outil n'a plus de cases à cocher)"],
  [/Avec élastique|J'ai un élastique/i, "option élastique (devenue le choix du matériel)"],
  [/zones? qui coincent/i, "zones qui coincent (devenu « zone sensible »)"],
  [/Haut du corps »|Bas du corps »|« Jambes »/i, "anciens noms de séances (Legs, Upper)"],
];

const issues = [];
for (const path of urls) {
  const html = await (await fetch(`${BASE}${path}`)).text();
  const main = html.match(/<main[\s\S]*<\/main>/)?.[0] ?? html;
  const text = main
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    // Les balises de bloc séparent des mots ; les balises en ligne (strong, em, a, span) non :
    // c'est précisément là que se cachent les mots collés.
    .replace(/<\/?(p|div|li|h[1-6]|br|tr|td|th|section|article|ul|ol|header|footer|nav|button|figcaption|summary|details)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;|&#xa0;/g, " ")
    .replace(/<!-- -->/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
  if (OUT) {
    mkdirSync(OUT, { recursive: true });
    writeFileSync(`${OUT}/${(path.replace(/\//g, "_") || "_accueil").replace(/^_/, "") || "accueil"}.txt`, text);
  }
  for (const line of text.split("\n")) {
    const l = line.trim();
    if (!l) continue;
    // Mot collé : minuscule suivie d'une majuscule (hors sigles connus), ou ponctuation suivie d'une lettre.
    for (const m of l.matchAll(/[a-zà-ÿ][A-ZÀ-Ý][a-zà-ÿ]/g)) {
      const ctx = l.slice(Math.max(0, m.index - 25), m.index + 25);
      if (!/GoatCounter|LanguageTool|IndexNow|YouTube|GitHub|McGill|iPhone|PubMed|TikTok|LinkedIn|WhatsApp|JavaScript|OpenAI|ChatGPT|HuggingFace|ResearchGate/.test(ctx)) issues.push([path, "mot collé", ctx]);
    }
    for (const m of l.matchAll(/[a-zà-ÿ][.;!?][A-Za-zÀ-ÿ]{2,}/g)) {
      const ctx = l.slice(Math.max(0, m.index - 25), m.index + 25);
      if (!/https?:|www\.|\.com|\.txt|\.fr|\.org|\.md|\.json|e\.g|i\.e|etc\.|\.ts|\.js|vs\./.test(ctx)) issues.push([path, "ponctuation sans espace", ctx]);
    }
    for (const [re, why] of STALE) if (re.test(l)) issues.push([path, why, l.slice(0, 140)]);
  }
}
for (const [p, k, c] of issues) console.log(`${p}\t${k}\t${c}`);
console.log(`\n${urls.length} pages relues, ${issues.length} points`);
