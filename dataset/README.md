---
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

58 exercices d'échauffement en français, annotés pour une sélection
automatique : qualités physiques préparées, contre-indications par zone sensible,
zones soulagées, phase de l'échauffement, matériel et alternative sans matériel.

C'est la base qui alimente [Warmup Generator](https://warmup-generator.com), un générateur
qui construit l'échauffement à partir des exercices de la séance (squat, développé
couché, tractions…) : il croise le champ `prepFocus` avec les exigences de ces
exercices, exclut les `contraindications` des zones déclarées douloureuses et
ajoute ce qui figure dans `painSupport`.

Version 1.1.0.

## Champs

| Champ | Définition |
|---|---|
| `id` | Identifiant stable de l'exercice |
| `name` | Nom de l'exercice en français |
| `category` | Phase de l'échauffement (voir vocabularies.categories) |
| `muscles` | Groupes musculaires préparés par l'exercice |
| `objectives` | Objectifs de séance pour lesquels l'exercice est pertinent |
| `contraindications` | Zones sensibles pour lesquelles l'exercice est déconseillé |
| `painSupport` | Zones sensibles que l'exercice aide activement à soulager |
| `joints` | Articulations mobilisées |
| `durationSeconds` | Durée recommandée en secondes |
| `reps` | Répétitions ou consigne de volume, en texte libre |
| `equipment` | Matériel requis (voir vocabularies.equipment) |
| `description` | Consigne d'exécution en français (tutoiement) |
| `fallback` | Version sans matériel, quand l'exercice demande un élastique ou une barre |
| `prepFocus` | Qualités physiques préparées (voir vocabularies.prepFocus) : c'est le champ que croise le générateur avec les exigences des exercices de la séance |
| `prepRoles` | Phases de l'échauffement où l'exercice peut servir (voir vocabularies.prepRoles) |
| `prepIntensity` | Intensité : soft, moderate ou neural |
| `trainingValue` | Intérêt de l'exercice en préparation, de 1 (faible) à 5 (fort) |
| `therapeutic` | Zone sensible pour laquelle l'exercice a été conçu |

Les codes (zones, matériel, qualités préparées…) sont décodés dans `exercises.json`,
clé `vocabularies`.

## Limites

Données de préparation à l'entraînement, pas données médicales : les
contre-indications reflètent les précautions courantes en musculation, pas un avis
clinique.

## Licence et attribution

CC BY 4.0. Attribution : Warmup Generator — https://warmup-generator.com
Documentation : https://warmup-generator.com/donnees
