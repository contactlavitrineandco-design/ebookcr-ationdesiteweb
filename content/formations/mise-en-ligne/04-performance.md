---
titre: "Un site rapide"
resume: "Mesurer, comprendre les indicateurs Core Web Vitals, et corriger les causes de lenteur qui pèsent vraiment : images, polices, scripts, hébergement."
---

Un site lent perd ses visiteurs avant même qu'ils aient vu la page. Sur mobile, avec une connexion moyenne, chaque seconde d'attente supplémentaire fait partir une part importante des visiteurs. La performance est aussi un critère de référencement, et un enjeu environnemental : une page plus légère consomme moins d'énergie à transmettre et à afficher.

La bonne nouvelle : pour un site vitrine, **quatre ou cinq causes** expliquent presque toutes les lenteurs, et elles se corrigent.

## Mesurer d'abord

On ne corrige pas une lenteur au jugé. Trois outils gratuits :

- **Lighthouse**, intégré à Chrome (onglet *Lighthouse* des outils de développement) : un audit complet avec des recommandations. Lancez-le en mode **mobile**, en navigation privée (pour que vos extensions de navigateur ne faussent pas la mesure).
- **PageSpeed Insights** (pagespeed.web.dev) : le même audit, plus les **données réelles** des visiteurs quand le site a assez de trafic.
- **L'onglet Réseau** des outils de développement : la liste de chaque fichier chargé, son poids et sa durée. Triez par taille : les coupables apparaissent en haut.

## Les indicateurs Core Web Vitals

Les moteurs de recherche mesurent l'expérience de chargement avec trois indicateurs, les **Core Web Vitals** :

| Indicateur | Ce qu'il mesure | Bon score |
|---|---|---|
| **LCP** (*Largest Contentful Paint*) | Le temps d'affichage du plus grand élément visible (souvent l'image principale ou le grand titre) | ≤ 2,5 s |
| **INP** (*Interaction to Next Paint*) | La réactivité aux interactions (clic, toucher, frappe) | ≤ 200 ms |
| **CLS** (*Cumulative Layout Shift*) | La stabilité visuelle : la page « saute »-t-elle pendant le chargement ? | ≤ 0,1 |

Pour un site vitrine, le **LCP** et le **CLS** sont presque toujours les deux à surveiller. L'INP pose surtout problème sur des sites chargés de JavaScript.

## Cause n° 1 : les images

C'est, de très loin, la cause la plus fréquente. Une seule photo non optimisée de 5 Mo pèse plus que tout le reste du site.

- **Redimensionner** : jamais plus large que l'affichage maximal (environ 2 000 px pour une image pleine largeur, beaucoup moins pour une vignette).
- **Compresser** et **convertir** en **WebP** ou **AVIF** : souvent 50 à 80 % de poids en moins sans différence visible.
- **Servir la bonne taille** avec `srcset` et `sizes` (voir « HTML & CSS, à la main » ; WordPress le fait automatiquement).
- **Différer** les images hors écran avec `loading="lazy"`, **sauf** l'image principale visible au chargement : celle-ci doit charger en priorité, on peut même l'indiquer avec `fetchpriority="high"`.
- **Toujours** indiquer `width` et `height` : le navigateur réserve la place, et la page ne saute pas (meilleur CLS).

```html
<img src="atelier-1200.webp" alt="…" width="1200" height="800" fetchpriority="high">
```

Pour les logos et les icônes, préférez le format **SVG** : vectoriel, net à toutes les tailles, et généralement très léger.

## Cause n° 2 : les polices

Chaque police, chaque graisse, chaque style (italique) est un fichier à télécharger.

- **Limitez** le nombre de fichiers : deux familles, deux ou trois graisses au total. Une police **variable** remplace plusieurs fichiers.
- **Hébergez-les** sur votre serveur (bon pour la vitesse et pour le RGPD, comme vu dans « Design & ergonomie »).
- Utilisez le format **WOFF2**.
- Ajoutez `font-display: swap` dans la déclaration `@font-face` : le texte s'affiche immédiatement avec une police de secours, puis bascule. Sans cela, le texte peut rester invisible pendant le chargement.
- **Préchargez** la police principale si elle est utilisée dans le premier écran :

```html
<link rel="preload" href="/polices/texte.woff2" as="font" type="font/woff2" crossorigin>
```

## Cause n° 3 : les scripts tiers

Chaque intégration tierce (outil de statistiques, chat, vidéo, carte, réseau social, widget d'avis) charge du code depuis un autre serveur, souvent **lourd**, et que vous ne contrôlez pas.

- **Questionnez chaque script** : est-il indispensable ? Un lien vers la page Instagram remplace avantageusement un flux Instagram intégré.
- **Chargez à la demande** : une vidéo ou une carte peuvent être remplacées par une image cliquable qui ne charge le lecteur qu'au clic (« façade »). Bénéfice double : performance, et pas de traceurs avant interaction.
- Chargez vos propres scripts avec `defer` (ou en fin de page), pour qu'ils ne bloquent pas l'affichage.

## Cause n° 4 : l'hébergement et le cache

Si le serveur met une seconde à commencer à répondre (le temps avant le premier octet, ou **TTFB**), aucune optimisation des images ne compensera.

- Pour **WordPress**, un **cache de pages** est indispensable : il enregistre une version HTML prête de chaque page, pour ne pas solliciter PHP et la base de données à chaque visite. Beaucoup d'hébergeurs l'intègrent ; sinon, une extension de cache.
- Une version de **PHP récente** est sensiblement plus rapide que les anciennes.
- Un **CDN** (réseau de serveurs répartis géographiquement) rapproche les fichiers des visiteurs. Les hébergeurs statiques l'incluent.
- Configurez les **en-têtes de cache** des fichiers statiques (images, CSS, polices) pour que le navigateur les garde en mémoire lors des visites suivantes.
- Vérifiez que la **compression** (gzip ou Brotli) est activée pour le HTML, le CSS et le JavaScript.

## Cause n° 5 : le poids du thème ou du constructeur

Sur WordPress, un thème « multi-usages » ou un constructeur de pages peut charger des centaines de kilo-octets de CSS et de JavaScript sur chaque page, dont l'essentiel ne sert pas. C'est l'une des raisons pour lesquelles « WordPress sans bricolage » recommande un thème à blocs léger et l'éditeur natif. Sur un site existant, regardez dans l'onglet Réseau le poids des fichiers CSS et JS : au-delà de quelques centaines de kilo-octets au total, il y a probablement du ménage à faire.

## Un budget de performance

Pour ne pas dériver au fil des évolutions, fixez-vous un **budget** et vérifiez-le à chaque livraison. Pour un site vitrine, par exemple :

| Élément | Budget indicatif |
|---|---|
| Poids total de la page d'accueil | moins de 1 Mo, idéalement moins de 500 Ko |
| Nombre de requêtes | moins de 40 |
| LCP mobile (Lighthouse) | moins de 2,5 s |
| CLS | moins de 0,1 |
| Score Lighthouse Performance mobile | 90 ou plus |

> **Astuce** L'onglet Réseau permet de **simuler une connexion lente** (menu *Limitation* / *Throttling*, « 3G rapide » ou « 4G lente »). Rechargez votre page dans ces conditions : vous vivrez ce que vivent une partie de vos visiteurs, et vous comprendrez immédiatement ce qui doit être optimisé.

## La sobriété, au-delà de la vitesse

La performance rejoint une démarche plus large d'**écoconception** : concevoir des services numériques qui consomment moins de ressources. En France, le référentiel général d'écoconception de services numériques (RGESN) propose des bonnes pratiques. Pour un site vitrine, elles se résument souvent à ce chapitre : moins d'images et des images plus légères, moins de scripts, pas de vidéo en lecture automatique, des fonctionnalités utiles plutôt que décoratives. Ce sont aussi des arguments que de plus en plus de clients apprécient.

> **Exercice** Lancez Lighthouse en mode mobile sur votre site d'entraînement et notez les scores et les trois indicateurs. Dans l'onglet Réseau, triez par taille et identifiez les trois fichiers les plus lourds. Corrigez : conversion des images en WebP aux bonnes dimensions, `width`/`height` partout, `fetchpriority` sur l'image principale, polices réduites et préchargées. Relancez Lighthouse et comparez. Notez le budget de performance que vous appliquerez désormais à vos projets.

## Ce qu'il faut retenir

- **Mesurez** avec Lighthouse (mobile), PageSpeed Insights et l'onglet Réseau.
- Surveillez **LCP ≤ 2,5 s**, **CLS ≤ 0,1** et **INP ≤ 200 ms**.
- Les **images** d'abord : dimensions, WebP/AVIF, `srcset`, `lazy` sauf l'image principale, `width`/`height`.
- **Polices** limitées, auto-hébergées, WOFF2, `font-display: swap`.
- **Scripts tiers** questionnés et chargés à la demande.
- **Cache**, PHP récent, compression, CDN ; un **budget** vérifié à chaque livraison.
