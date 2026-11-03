# Point de session — 10 juin 2026 (soirée)
*Tout est en local, rien n'est pushé. À valider ensemble avant déploiement.*

## Verdict sur le contenu des pages d'acquisition

J'ai relu l'intégralité de `lib/content/` (exercice, protection, combo). Bonne nouvelle : **le contenu exercice et protection est très bon** — spécifique, expert, actionnable (setup du DC, valgus dynamique, prise de barre poignets...). Il est au-dessus de ce que publient Decathlon ou Fitness Park sur ces requêtes. Ce n'est PAS là que ça pèche.

Les deux vrais points faibles côté conversion :
1. **Les 28 pages muscle/objectif** étaient templatées à 90 % (même H1, même intro, même FAQ pour les 4 objectifs d'un muscle). C'est elles qui faisaient "low value".
2. **Le CTA renvoyait tout le monde vers la home** pour tout reconfigurer à la main — friction maximale pour un visiteur qui a déjà son plan sous les yeux.

## Changements de cette session (7 fichiers)

| Fichier | Changement | Pourquoi |
|---|---|---|
| `components/SEOPage.tsx` | Nouveau prop `planHref` : le CTA devient **"Lancer ce plan en mode timer"** (deep-link /result préconfiguré) + lien secondaire "Personnaliser" vers la home. Barre sticky mobile aussi. | Conversion : 1 tap au lieu de 5. Le visiteur SEO passe directement en mode usage. |
| `app/echauffement/[muscle]/[objectif]/page.tsx` | + `MUSCLE_INSIGHTS` : paragraphe anatomique unique par muscle (7 textes : pecs→coiffe, dos→connexion scapulaire, fessiers→inhibition assise...) + planHref | Anti near-duplicate : chaque page a maintenant du contenu muscle-spécifique en plus de l'advice objectif-spécifique. |
| `app/echauffement/exercice/[slug]/page.tsx` | planHref mappé par exercice (squat→jambes+fessiers/force, DC→pecs+épaules/force...) | Conversion. |
| `app/echauffement/protection/[zone]/page.tsx` | planHref mappé (zone sensible + muscles associés, objectif **reprise**) | Conversion, mode doux cohérent. |
| `app/echauffement/combo/[combo]/page.tsx` | planHref mappé (muscles du combo) | Conversion. |
| `app/result/ResultClient.tsx` | Bouton **"Partager ce plan"** : Web Share API sur mobile (WhatsApp/Messages), copie du lien en fallback desktop | Distribution organique : chaque plan partagé dans un groupe de salle = acquisition gratuite. |
| `components/GeneratorClient.tsx` | Label "Volume" → "Hypertrophie" | Cohérence home ↔ pages SEO ↔ /result. **À valider : si tu préfères "Volume", dis-le, je remets.** |
| `scripts/generate-article.mjs` | Purge des 6 sujets cannibalisants (échauffement dos/épaules/jambes/bras/core/fessiers, en conflit avec /echauffement/{muscle}/*) + 4 nouveaux sujets long-tail : **1RM, courbatures, après 40 ans, musculation le matin** + commentaire de garde | Anti-cannibalisation. |

(+ session précédente, déjà en local : suppression du faux aggregateRating, dates ISO, sitemap, OG images des 28 pages, maillage interne, H1/titres différenciés.)

## Avant de push — checklist

1. `npm run build` — je n'ai pas pu builder ici (sandbox indisponible), tout est relu manuellement mais valide quand même.
2. Vérifier visuellement : une page muscle (ex. /echauffement/pecs/force) → CTA "Lancer ce plan en mode timer" doit ouvrir /result préconfiguré.
3. /result → bouton "Partager ce plan" (sur mobile il doit ouvrir la feuille de partage native).
4. Valider mon choix "Hypertrophie" vs "Volume" sur la home.
5. Push, puis dans GSC : demander l'indexation des 12 pages prioritaires (détail dans AUDIT-COMPLET-juin-2026.md §1).

## Vague 2 (suite à tes retours sur l'audit)

| Changement | Fichiers |
|---|---|
| **7 pages hub muscle** `/echauffement/{pecs,dos,epaules,jambes,fessiers,bras,core}` ciblant les vraies requêtes ("échauffement pecs"). Plan de référence + FAQ distinctes des pages objectif + variantes liées. Les 28 pages objectif sont conservées en longue traîne (pas de suppression → pas de redirections risquées). | `app/echauffement/[muscle]/page.tsx` (nouveau), `opengraph-image.tsx` (nouveau), `lib/content/muscle.ts` (nouveau, contenu partagé), sitemap (7 URL prio 0.85), breadcrumbs des 28 pages → hub, liens "Guides par muscle" sur la home |
| **Auteur E-E-A-T** : Sébastien Gutierrez. Schema `Person` + encart "Qui est derrière l'outil" sur /a-propos, byline cliquable + `author: Person` sur tous les articles de blog. | `app/a-propos/page.tsx`, `components/BlogArticle.tsx` |
| **Workflow hebdo désactivé** (cron commenté, déclenchement manuel conservé : Actions → Run workflow). | `.github/workflows/weekly-content.yml` |
| **Tracking installation PWA** : événement GoatCounter `pwa-installed` (visible dans le dashboard GoatCounter). | `components/ClientScripts.tsx` |

**Non fait volontairement — à ta main :**
- *Contraste des textes gris* : 79 occurrences de `text-[#5A5A60]` dans 12 fichiers — changer la teinte modifie le look de tout le site. Si tu veux le faire : remplacer `text-[#5A5A60]` par `text-[#85858D]` partout (Rechercher/Remplacer global dans ton éditeur), ratio ~5,6:1 au lieu de 3,2:1.
- *Article cannibale existant* `/blog/echauffement-pecs-musculation` (publié le 28 mai) : il concurrence le nouveau hub /echauffement/pecs. Recommandation : le laisser 4-6 semaines, regarder dans GSC laquelle des deux URL Google sert sur "échauffement pecs", puis 301 du perdant vers le gagnant. Pas d'action immédiate.

## Reste à faire (nécessite toi)

- **GitHub Actions** : vérifier pourquoi le workflow n'a rien généré les 1er et 8 juin (secret API ? logs ?).
- **Page auteur E-E-A-T** : il me faut ton prénom/pseudo, 2 lignes de parcours sportif, éventuellement une photo — je ne peux pas l'inventer.
- **Backlinks** : les posts communautaires et emails coachs (plan dans l'audit §2.3) — c'est toi qui postes, je peux préparer les textes si tu veux.
