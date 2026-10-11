// Soumet toutes les URL du sitemap de production à IndexNow (Bing, Yandex,
// Seznam, Naver). Bing alimente les réponses de ChatGPT Search et Copilot :
// c'est le chemin le plus court vers la citation par les moteurs génératifs.
//
// Usage, après un déploiement :   node scripts/indexnow.mjs
// Ou pour quelques URL précises : node scripts/indexnow.mjs /series-approche /douleur

const HOST = "warmup-generator.com";
const KEY = "69eae1205b270abd267d47e47a2ecb47"; // servi par public/<KEY>.txt
const SITE = `https://${HOST}`;

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => `${SITE}${p}`) : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

// 200 = reçu, 202 = reçu (clé en cours de validation). 403 = fichier de clé introuvable.
console.log(`IndexNow : HTTP ${res.status} pour ${urlList.length} URL`);
if (!res.ok) process.exitCode = 1;
