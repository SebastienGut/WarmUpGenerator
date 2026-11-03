// Planche contact des pictogrammes (départ, milieu, arrivée), en PNG, pour les
// relire sans navigateur. Lit la page de travail /lab-figures du serveur de dev.
// Usage (avec npm run dev lancé) : node scripts/assets/build-figure-sheet.mjs [dossier de sortie]
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.argv[2] ?? "figure-sheets";
const PER_PAGE = 10;
const COLORS = { "--ink": "#141414", "--accent": "#c8202a", "--faint": "#b9b6ad", "--line": "#e3e0d8", "--line-strong": "#cfcbc0", "--subtle": "#6b675f", "--paper": "#f7f6f2", "--card": "#ffffff" };

const html = await (await fetch(`${BASE}/lab-figures`)).text();
const cards = [...html.matchAll(/<div data-fig="([^"]+)"[^>]*><p[^>]*>(.*?)<\/p><div class="flex">(.*?)<\/div><\/div>/g)].map((m) => ({
  id: m[1],
  name: m[2].replace(/<!-- -->/g, "").replace(/&#x27;/g, "'").replace(/&amp;/g, "&"),
  svgs: [...m[3].matchAll(/<svg[^>]*viewBox="([^"]+)"[^>]*>(.*?)<\/svg>/g)].map((s) => ({ viewBox: s[1], body: s[2] })),
}));
if (!cards.length) throw new Error("aucune figure trouvée : le serveur de dev tourne-t-il ?");

const resolve = (s) => s.replace(/var\((--[a-z-]+)\)/g, (_, v) => COLORS[v] ?? "#888");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
mkdirSync(OUT, { recursive: true });

const CW = 3 * 220, CH = 190;
for (let p = 0; p * PER_PAGE < cards.length; p++) {
  const page = cards.slice(p * PER_PAGE, (p + 1) * PER_PAGE);
  const cols = 2, rows = Math.ceil(page.length / cols);
  const W = cols * CW + 30, H = rows * CH + 20;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#f7f6f2"/>`;
  page.forEach((c, i) => {
    const x = 10 + (i % cols) * (CW + 10), y = 10 + Math.floor(i / cols) * CH;
    svg += `<rect x="${x}" y="${y}" width="${CW}" height="${CH - 8}" rx="10" fill="#fff" stroke="#e3e0d8"/>`;
    svg += `<text x="${x + 10}" y="${y + 20}" font-family="Arial" font-size="15" font-weight="bold" fill="#141414">${p * PER_PAGE + i + 1}. ${esc(c.name)} (${c.id})</text>`;
    c.svgs.forEach((s, j) => {
      svg += `<svg x="${x + j * 220}" y="${y + 26}" width="220" height="150" viewBox="${s.viewBox}">${resolve(s.body)}</svg>`;
      svg += `<text x="${x + j * 220 + 110}" y="${y + CH - 14}" font-family="Arial" font-size="11" fill="#6b675f" text-anchor="middle">${["départ", "milieu", "arrivée"][j]}</text>`;
    });
  });
  svg += "</svg>";
  await sharp(Buffer.from(svg)).png().toFile(`${OUT}/planche-${p + 1}.png`);
}
console.log(`${cards.length} figures, ${Math.ceil(cards.length / PER_PAGE)} planches dans ${OUT}/`);
