// Vérifie toutes les pages du build de production servi en local (serveur
// « prod » de .claude/launch.json, port 3100) : statut 200, canonical, h1,
// titres, anciennes formulations, redirections.
// Usage : node scripts/bench/crawl.mjs [http://localhost:3100]
const BASE = process.argv[2] ?? "http://localhost:3100";
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://warmup-generator.com", BASE));
const extra = ["/plan", "/llms.txt", "/api/exercices", "/robots.txt", "/manifest.webmanifest", "/opengraph-image", "/icon", "/echauffement/epaules/opengraph-image"].map((p) => BASE + p);

const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
const problems = [];
let ok = 0;
for (const url of [...new Set([...urls, ...extra])]) {
  const res = await fetch(url, { redirect: "manual" });
  if (res.status !== 200) {
    problems.push(`${res.status} ${url}`);
    continue;
  }
  if ((res.headers.get("content-type") ?? "").includes("text/html")) {
    const html = await res.text();
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    if (title.length > 75) problems.push(`titre de ${title.length} car. : ${url}`);
    if (/\/result\?/.test(html)) problems.push(`lien vers /result : ${url}`);
    if (/\{min\}|\{court\}/.test(html)) problems.push(`gabarit de durée non rempli : ${url}`);
    if (!/<link rel="canonical"/.test(html) && !url.includes("/plan")) problems.push(`sans canonical : ${url}`);
    if (!/<h1/.test(html) && !url.includes("/plan")) problems.push(`sans h1 : ${url}`);
  }
  ok++;
}
for (const [from, expect] of [
  ["/result", "/"],
  ["/echauffement/combo", "/echauffement"],
  ["/echauffement/combo/haut-du-corps", "/echauffement/haut-du-corps"],
  ["/echauffement/pecs/force", "/echauffement/pecs"],
]) {
  const res = await fetch(BASE + from, { redirect: "manual" });
  const loc = res.headers.get("location") ?? "";
  if (![307, 308].includes(res.status) || !loc.endsWith(expect)) problems.push(`redirection ${from} → ${res.status} ${loc}`);
}
console.log(`${ok} URL en 200`);
console.log(problems.length ? problems.join("\n") : "aucun problème");
process.exitCode = problems.length ? 1 : 0;
