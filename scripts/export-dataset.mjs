// Exporte le jeu de données ouvert au format Hugging Face, à partir de l'export
// JSON prérendu par le build (même contenu que /api/exercices).
//
// Usage :
//   npm run build && node scripts/export-dataset.mjs
//   hf upload fabdigstudio/warmup-exercises-fr dataset . --repo-type dataset
import fs from "node:fs/promises";
import path from "node:path";

const SOURCE = ".next/server/app/api/exercices.body";
const OUT = "dataset";

const payload = JSON.parse(await fs.readFile(SOURCE, "utf8"));
await fs.mkdir(OUT, { recursive: true });

await fs.writeFile(path.join(OUT, "exercises.json"), JSON.stringify(payload, null, 2) + "\n");
await fs.writeFile(path.join(OUT, "exercises.jsonl"), payload.exercises.map((e) => JSON.stringify(e)).join("\n") + "\n");

const fields = Object.entries(payload.fieldDefinitions)
  .map(([k, v]) => `| \`${k}\` | ${v} |`)
  .join("\n");

const card = `---
license: cc-by-4.0
language:
- fr
pretty_name: Exercices d'échauffement musculation (FR)
size_categories:
- n<1K
task_categories:
- other
tags:
- fitness
- strength-training
- warm-up
- injury-prevention
- french
configs:
- config_name: default
  data_files: exercises.jsonl
---

# Exercices d'échauffement pour la musculation (français)

${payload.count} exercices d'échauffement en français, annotés pour une sélection
automatique : qualités physiques préparées, contre-indications par zone sensible,
zones soulagées, phase de l'échauffement, matériel et alternative sans matériel.

C'est la base qui alimente [Warmup Generator](${payload.source.replace("/donnees", "")}), un générateur
qui construit l'échauffement à partir des exercices de la séance (squat, développé
couché, tractions…) : il croise le champ \`prepFocus\` avec les exigences de ces
exercices, exclut les \`contraindications\` des zones déclarées douloureuses et
ajoute ce qui figure dans \`painSupport\`.

Version ${payload.version}.

## Champs

| Champ | Définition |
|---|---|
${fields}

Les codes (zones, matériel, qualités préparées…) sont décodés dans \`exercises.json\`,
clé \`vocabularies\`.

## Limites

Données de préparation à l'entraînement, pas données médicales : les
contre-indications reflètent les précautions courantes en musculation, pas un avis
clinique.

## Licence et attribution

CC BY 4.0. Attribution : ${payload.license.attribution}
Documentation : ${payload.source}
`;
await fs.writeFile(path.join(OUT, "README.md"), card);
console.log(`${payload.count} exercices, version ${payload.version} → ${OUT}/`);
