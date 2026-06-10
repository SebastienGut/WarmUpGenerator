# Audit complet — warmup-generator.com
*10 juin 2026 · Fond, forme, SEO, technique · Basé sur le code, le site live et les données GSC*

---

## Synthèse

Le site est techniquement propre, le contenu est au-dessus de la moyenne des concurrents, et l'indexation a démarré (le blocage critique de l'audit du 23 mai est levé). Le vrai problème n'est plus technique : **c'est un problème d'autorité et de différenciation des pages**. Google connaît 58 pages, n'en a indexé que 7, et laisse 48 pages en "Détectée, actuellement non indexée" — le signal classique d'un domaine neuf, sans backlink, dont les pages templates ne justifient pas (encore) le budget de crawl.

Les données GSC (3 mois) le confirment : 11 clics / 32 impressions, dont ~85 % sur la requête branded "warmup generator" (position ~6 — tu n'es même pas 1er sur ton propre nom, crossfitwarmup.com et d'autres outils anglophones te concurrencent). La visibilité non-branded est nulle : 2 impressions.

**Diagnostic en une phrase : le moteur est bon, il n'y a pas d'essence.** Les 3 leviers, dans l'ordre : (1) faire indexer les 48 pages en attente, (2) obtenir les 10-20 premiers backlinks, (3) différencier les pages templates. Le reste est de l'optimisation à la marge.

---

## 1. Données GSC (17 mai → 10 juin)

| Métrique | Valeur | Lecture |
|---|---|---|
| Clics / Impressions | 11 / 32 | Quasi-invisible. Normal pour un domaine de 3 semaines. |
| CTR / Position | 34,4 % / 6,4 | Excellent CTR mais sur du branded uniquement — non significatif. |
| Pages indexées | 7 / 58 | **Le goulot d'étranglement n°1.** |
| "Détectée, non indexée" | 48 pages | Google connaît les URL (sitemap) mais ne juge pas utile de les crawler. |
| "Page avec redirection" | 3 | Probablement les variantes www → apex. Aucun correctif requis. |
| Requêtes | warmup generator (8 clics), warm up generator (1), echauffement lombaire (0/1), étirement statique (0/1) | Zéro traction non-branded. Les 2 impressions hors marque viennent de pages protection/blog — c'est là que ça mordra en premier. |

**"Détectée, actuellement non indexée" — ce que ça veut dire vraiment :** Google a un budget de crawl proportionnel à l'autorité perçue du domaine. Avec 0 backlink, il indexe la home et quelques pages, puis attend des signaux (liens entrants, trafic, fraîcheur) avant d'investir davantage. Ce n'est PAS un problème de robots.txt, de sitemap ou de qualité technique — tout ça est correct.

**Actions immédiates (manuelles, dans GSC) :**
1. Inspection d'URL → "Demander une indexation" pour les ~12 pages prioritaires : les 4 pages protection, les 6 pages exercice, /blog, /echauffement. Quota ~10/jour, étale sur 2-3 jours. Recommence chaque semaine pour les pages toujours absentes.
2. Vérifier que le sitemap soumis dans GSC remonte bien les 58 URL sans erreur.
3. Surveiller Indexation → Pages chaque semaine : l'objectif est 30+ pages indexées fin juillet.

---

## 2. SEO — Fond et stratégie

### 2.1 Ce qui est bien (à ne pas toucher)
- Architecture en silo cohérente : générateur → hubs (/echauffement, /blog) → pages feuilles (exercice, combo, protection, muscle/objectif).
- URL françaises lisibles, canonicals corrects, robots/noindex bien posés (/result, /debug-algo).
- JSON-LD riche et rendu côté serveur (HowTo, FAQPage, BreadcrumbList, Article) — GSC reconnaît déjà les enrichissements "Fils d'Ariane" et "FAQ".
- Les pages exercice (squat, développé couché, soulevé de terre, tractions, rowing, développé militaire) sont ton meilleur actif : aucun concurrent ne couvre "échauffement avant le squat" avec un protocole dédié. Max-powerlifting.fr est le seul sur le créneau développé couché.
- Positionnement produit imbattable sur sa niche : gratuit, sans pub, hors ligne, instantané.

### 2.2 Les problèmes de fond

**A. Pages muscle/objectif trop semblables (28 pages).** Les 4 variantes d'un même muscle partageaient le même H1, le même titre à 90 %, la même intro templatée et la même FAQ. Pour Google c'est du near-duplicate → exactement le profil des pages laissées en "détectée, non indexée". *Correctif partiel appliqué (voir §5) : H1 et titres différenciés, durée réelle affichée, maillage croisé. Mais à terme, envisage de réduire : 7 pages muscle solides (/echauffement/pecs) valent mieux que 28 pages tièdes. Les requêtes réelles sont "échauffement pecs", pas "échauffement pecs hypertrophie".*

**B. Cannibalisation à venir via le générateur d'articles.** `scripts/generate-article.mjs` a en file d'attente "echauffement-dos-musculation", "echauffement-epaules-musculation", etc. — ces articles de blog vont concurrencer tes propres pages /echauffement/dos/*. Deux URL du même site sur la même requête = Google hésite et n'en classe aucune. **Recommandation : retire les sujets "muscle" de CANDIDATE_TOPICS** et remplace par des sujets informationnels sans page existante : "étirements avant musculation danger", "échauffement 1RM", "courbatures et échauffement", "échauffement après 40 ans", "échauffement femme musculation", "échauffement home gym sans matériel".

**C. Le workflow hebdo semble en panne.** Dernier article : 31 mai. Le cron tourne le lundi (1er et 8 juin) et n'a rien produit. Vérifie GitHub → Actions : secret ANTHROPIC_API_KEY expiré, erreur de script, ou tous les sujets épuisés. La cadence régulière est un de tes rares signaux de fraîcheur — c'est important.

**D. E-E-A-T inexistant.** Tout est signé "Warmup Generator" (une organisation anonyme). Pour du contenu santé/sport (zone YMYL-adjacente), Google valorise un auteur identifiable. Crée une vraie page auteur : prénom, photo, parcours sportif, et signe les articles `author: Person` dans le JSON-LD. "Par un sportif pour les sportifs" est un bon slogan mais zéro preuve.

**E. Position 6 sur ta propre marque.** Mets le site en lien sur tous tes profils (GitHub, LinkedIn, X, Reddit), et obtiens 2-3 mentions avec le nom exact "Warmup Generator" — ça suffit généralement à prendre la position 1 branded en quelques semaines.

### 2.3 Backlinks — le chantier n°1 (0 actuellement)

Sans liens, rien ne se passera, même avec un contenu parfait. Plan réaliste pour un outil gratuit sans budget :

| Canal | Action | Effort | Impact |
|---|---|---|---|
| Communautés FR | Posts utiles (pas promo) sur r/musculationfr, forum SuperPhysique, forum All-musculation, Discord fitness FR. Format : "j'ai fait un outil gratuit, feedback bienvenu" | Faible | Élevé (premiers liens + vrais utilisateurs) |
| Annuaires d'outils | Product Hunt, AlternativeTo, toolify.ai, betalist, les annuaires "outils gratuits" FR | Faible | Moyen (liens faciles, trafic ponctuel) |
| Coachs / kinés | 10-20 emails personnalisés à des coachs FR avec blog : "outil gratuit à recommander à vos clients, intégrable par lien" | Moyen | Élevé (liens thématiques = les plus puissants) |
| Créateurs YouTube/TikTok fitness FR | Proposer l'outil comme ressource en description | Moyen | Élevé |
| Guest posts | 2-3 articles invités sur blogs muscu FR de taille moyenne | Élevé | Élevé |

Objectif raisonnable : 15-25 domaines référents d'ici septembre. C'est le seuil où les pages long-tail commencent à sortir.

### 2.4 Réalisme sur les keywords

"échauffement musculation" (tête de traîne) est verrouillé par Decathlon, Fitness Park, L'Orange Bleue, Nutripure, SuperPhysique — des domaines à forte autorité. **Tu ne les battras pas en 2026 et ce n'est pas grave.** Le chemin : gagner d'abord sur "échauffement avant le squat", "échauffement développé couché", "échauffement épaule douloureuse musculation", "générateur échauffement" — des requêtes où la concurrence est faible et ton contenu objectivement meilleur. Le volume cumulé de 30 longues traînes dépasse la requête principale, et c'est ce qui construira l'autorité pour attaquer la tête plus tard.

---

## 3. Forme / UX / Produit

- **Le produit est la meilleure arme SEO.** Un outil que les gens utilisent, mettent en favori et partagent génère les signaux que Google cherche. Priorise la boucle : utilisateur → bookmark/PWA → réutilisation → partage.
- **Bouton partage du plan.** Une URL de résultat est déjà partageable (params dans l'URL) mais rien n'incite au partage. Ajoute "Copier le lien de ce plan" sur /result — chaque plan partagé dans un groupe WhatsApp/Discord de salle est de la distribution gratuite.
- **Incohérence de label :** la home affiche "Volume" mais toutes les pages SEO et le moteur disent "Hypertrophie". Unifie (suggestion : "Volume / Hypertrophie" sur la home, ou "Volume" partout — c'est le terme que le grand public tape le moins, mais comprend le mieux).
- **PWA :** sw.js + manifest + prompt iOS présents — bon. Mesure le taux d'installation via GoatCounter (événement custom) pour savoir si la boucle de rétention fonctionne.
- **Accessibilité :** contraste lime #A3FF12 sur noir OK, mais vérifie les textes gris #5A5A60 sur #050505 (ratio ~3,2:1 — limite pour du texte de 10-11px). Pas bloquant SEO, mais facile à corriger.

---

## 4. Technique

- **Stack saine :** Next 16 App Router, SSG sur toutes les pages SEO, images optimisées avec `sizes` corrects, pas de JS lourd hors framer-motion. Les Core Web Vitals ne montrent rien d'alarmant dans GSC. Lance quand même un PageSpeed Insights mobile sur la home et une page exercice pour confirmer (vise LCP < 2,5 s).
- **Redirection www → apex** configurée dans next.config.ts — correct, explique les 3 "pages avec redirection" dans GSC.
- **GoatCounter :** léger, sans cookie, cohérent avec la philosophie. Pense à consulter les referrers — c'est ton seul moyen de voir les backlinks arriver.
- ~~**Faux avis dans le JSON-LD**~~ : un `aggregateRating` 4.8/127 votes était déclaré sur la home alors qu'aucun système de notation n'existe. C'est une violation directe des règles "structured data" de Google (risque d'action manuelle = perte de TOUS les rich snippets). **Supprimé.**
- ~~**Sitemap `lastModified: new Date()`**~~ : toutes les URL prétendaient changer à chaque build — signal de fraîcheur factice que Google apprend à ignorer. **Corrigé** (dates réelles pour le blog, date de contenu stable ailleurs).
- ~~**`datePublished` non-ISO**~~ : "19 mai 2026" dans le schema Article au lieu de "2026-05-19". **Corrigé** + `dateModified` ajouté.
- ~~**OG image absente des 28 pages muscle/objectif**~~ : **corrigé** (génération dynamique par muscle/objectif).

---

## 5. Correctifs appliqués dans ce commit

1. `app/page.tsx` — suppression du faux `aggregateRating` (risque de pénalité structured data).
2. `lib/dates.ts` (nouveau) — conversion dates françaises → ISO 8601.
3. `components/BlogArticle.tsx` — `datePublished`/`dateModified` en ISO dans le schema Article.
4. `app/sitemap.ts` — `lastModified` réels (dates de publication pour le blog, date de contenu stable pour le reste).
5. `app/echauffement/[muscle]/[objectif]/page.tsx` — H1 et title différenciés par objectif ("Échauffement Pectoraux Force" au lieu de 4× "Échauffement Pectoraux"), suppression de la fausse promesse "5 min" (durée réelle calculée), maillage interne croisé vers les pages exercice/protection/combo pertinentes (2 liens contextuels par muscle — aide aussi l'indexation des pages orphelines).
6. `app/echauffement/[muscle]/[objectif]/opengraph-image.tsx` (nouveau) — OG image dynamique pour les 28 pages.

---

## 6. Plan d'action priorisé (4 semaines)

**Semaine 1 — Indexation + marque**
- [ ] Demander l'indexation manuelle des 12 pages prioritaires dans GSC (§1)
- [ ] Réparer le workflow GitHub Actions (vérifier les logs du 1er et 8 juin)
- [ ] Lien vers le site depuis tous tes profils publics
- [ ] Déployer les correctifs de ce commit

**Semaine 2 — Premiers backlinks**
- [ ] 3 posts communautaires (Reddit, SuperPhysique, Discord) — format retour d'expérience, pas pub
- [ ] Soumission aux annuaires d'outils (Product Hunt inclus)
- [ ] Purger CANDIDATE_TOPICS des sujets cannibalisants, ajouter 6 sujets long-tail

**Semaine 3 — E-E-A-T + produit**
- [ ] Page auteur réelle + `author: Person` dans les schemas
- [ ] Bouton "Copier le lien de ce plan" sur /result
- [ ] Unifier Volume/Hypertrophie

**Semaine 4 — Outreach**
- [ ] 15 emails coachs/kinés FR
- [ ] 2 propositions de guest post
- [ ] Bilan GSC : pages indexées, impressions non-branded (objectif : >10 pages indexées, >100 impressions)

**KPI à 90 jours (réalistes) :** 35+ pages indexées · 15+ domaines référents · 1 500+ impressions/mois · 80+ clics/mois · top 10 sur 5 requêtes long-tail ("échauffement avant le squat", "échauffement développé couché", "échauffement épaule musculation", "générateur échauffement", "échauffement genou musculation").

---

*Rappel honnête : un domaine de 3 semaines sans backlink qui vise des top positions, c'est 3-6 mois de travail de distribution, pas un problème de code. Ton site est déjà dans le top 5 % technique des sites de sa niche — la bataille se joue maintenant en dehors du repo.*
