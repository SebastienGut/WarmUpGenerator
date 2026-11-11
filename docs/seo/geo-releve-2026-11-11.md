# Relevé GEO du 11 novembre 2026

Point de départ des citations par les moteurs génératifs, mesuré le jour de la mise en ligne
des blocs SEO/GEO du lot 5 (commit 72d6ee4). À refaire avec **exactement les mêmes questions**
vers le 9 décembre 2026, en même temps que la lecture de Search Console.

## Méthode
- Chrome de Seb (session Google connectée, localisation France) : résultats personnalisés,
  à comparer d'un relevé à l'autre plutôt qu'à prendre comme absolus.
- Google : `google.com/search?q=…&hl=fr&gl=fr`. Position = rang parmi les résultats naturels
  de la première page (« > 10 » = absent de la première page). Aperçu IA déplié pour vérifier
  les sources.
- Perplexity : `perplexity.ai/search?q=…`, sans compte.
- ChatGPT : chat éphémère avec recherche web (`chatgpt.com/?temporary-chat=true&hints=search&q=…`),
  rien dans l'historique de Seb.
- « Cité » = le domaine ou le nom Warmup Generator apparaît dans la réponse ou ses sources.
  Un seul passage par question : les réponses des IA varient d'un essai à l'autre.

## Résultats

| Question | Google, position | Aperçu IA Google | Perplexity | ChatGPT |
|---|---|---|---|---|
| générateur d'échauffement musculation | 1 | cité | cité (premier) | cité (premier, « meilleur choix ») |
| comment s'échauffer avant la musculation | > 10 | non | non | non |
| échauffement épaules musculation | > 10 | non | non | non |
| échauffement avant les tractions | > 10 | non | non | non |
| douleur épaule traction | > 10 | non | cité | non |
| douleur poignet pompes | > 10 | non | cité | non |
| douleur coude curl biceps | > 10 | cité | non | non |
| échauffement dos musculation | 6 | cité | non | non |
| séries d'approche musculation | > 10 | non | cité | non |
| combien de temps s'échauffer musculation | 8 | cité | non | non |
| échauffement pectoraux | 2 | cité | cité | non |
| **Total** | 4 en première page | **5 / 11** | **5 / 11** | **1 / 11** |

## Lecture
- L'aperçu IA de Google cite le site surtout là où il est déjà en première page (dos, durée,
  pectoraux), plus une page douleur (coude).
- Perplexity cite les pages douleur et le calculateur de séries d'approche même quand Google
  ne les classe pas en première page : le contenu structuré (« En bref », diagnostic) y porte.
- ChatGPT ne cite le site que sur la recherche « générateur ». Sa recherche web s'appuie sur Bing,
  où le site était absent de l'index en octobre : vérifier l'indexation dans Bing Webmaster Tools
  (action côté compte de Seb) est le levier le plus direct pour ChatGPT.
- Les pages réécrites le 11 nov. (épaules, tractions) ne sont pas encore citées : normal le jour
  même, c'est ce que le prochain relevé doit mesurer.
