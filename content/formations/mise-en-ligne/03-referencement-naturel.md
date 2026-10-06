---
titre: "Les bases solides du référencement naturel"
resume: "Comprendre comment un moteur de recherche fonctionne, choisir ses mots-clés, optimiser ses pages, soigner le référencement local, et éviter les arnaques."
---

Le référencement naturel (SEO, pour *search engine optimization*) consiste à aider un site à apparaître dans les résultats des moteurs de recherche, sans payer de publicité. C'est un domaine entouré de mythes, de promesses miraculeuses et de vendeurs pressants. La réalité est plus simple et plus exigeante : **un site techniquement propre, qui répond clairement aux questions de ses visiteurs, finit par être bien référencé**. Il n'y a pas de raccourci durable.

## Comment fonctionne un moteur de recherche

Trois étapes :

1. **L'exploration** (*crawl*) : des robots parcourent le web en suivant les liens, et téléchargent les pages.
2. **L'indexation** : le moteur analyse chaque page (textes, titres, liens, données structurées) et l'enregistre dans son index.
3. **Le classement** : quand quelqu'un fait une recherche, le moteur choisit dans son index les pages les plus pertinentes et les plus fiables, et les ordonne.

Votre travail consiste à faciliter les trois : que le robot **trouve** vos pages, qu'il **comprenne** de quoi elles parlent, et qu'il les juge **pertinentes et dignes de confiance**.

## 1. Être trouvé et indexé

- Le site n'interdit pas l'indexation (la case de WordPress, la balise `noindex`, le fichier `robots.txt`).
- Chaque page importante est **accessible par un lien** depuis une autre page du site.
- Un **plan du site XML** (`sitemap.xml`) liste les pages. WordPress en génère un nativement, les extensions SEO aussi.
- Le site est déclaré dans la **Google Search Console** (et l'équivalent de Bing, Bing Webmaster Tools, qui alimente aussi d'autres moteurs). Ces outils gratuits indiquent quelles pages sont indexées, lesquelles posent problème, et pour quelles recherches le site apparaît.

## 2. Choisir ses mots-clés

Un **mot-clé** est une expression que tapent les internautes. Le choix des mots-clés oriente toute la rédaction.

- **Partez du client et de ses clients** : comment décrivent-ils leur besoin ? « menuisier sur mesure Lille », « bibliothèque sous escalier », « cuisine bois massif prix ».
- **Préférez les expressions précises** aux termes génériques. « Menuisier » seul est hors de portée ; « menuisier agencement sur mesure Lille » est atteignable, et les personnes qui le tapent sont exactement les bons visiteurs.
- **Un sujet principal par page.** La page « Cuisines » vise les recherches sur les cuisines ; la page « Bibliothèques », celles sur les bibliothèques. Deux pages qui visent la même chose se font concurrence.
- **Observez les résultats actuels** : tapez l'expression dans un moteur, regardez quelles pages arrivent en tête et ce qu'elles proposent. C'est la meilleure indication de ce que le moteur considère comme pertinent.

## 3. Optimiser chaque page

Les éléments qui comptent, par ordre d'importance :

### Le titre de la page (`<title>`)

C'est le titre cliquable dans les résultats. Il doit :

- contenir l'expression principale, de préférence au début ;
- être **unique** sur le site ;
- faire environ **50 à 60 caractères** (au-delà, il est coupé) ;
- donner envie de cliquer.

`Bibliothèque sur mesure à Lille — Atelier Nord, menuisier`

### La méta-description

Le texte sous le titre dans les résultats. Elle n'influence pas directement le classement, mais elle influence le **taux de clic**. Environ 150 caractères, qui résument la page et donnent une raison de cliquer. Le moteur peut la remplacer par un extrait de la page s'il la juge moins pertinente.

### Le titre principal et la structure

Un seul `h1`, qui reprend le sujet de la page, puis des intertitres `h2` et `h3` logiques. Les moteurs s'en servent pour comprendre l'organisation du contenu (et vous avez déjà appris à le faire dans « HTML & CSS, à la main »).

### Le contenu

C'est là que tout se joue. Une page bien classée **répond complètement** à la question de la personne qui cherche. Pour une page de service : ce qui est proposé, pour qui, comment ça se passe, les délais, une idée des prix, des exemples, des questions fréquentes. Écrivez pour les humains, avec leurs mots ; les moteurs sont aujourd'hui très bons pour reconnaître un texte utile et pour repérer un texte écrit uniquement pour eux.

### L'adresse de la page

Courte, lisible, avec le mot-clé : `/bibliotheques-sur-mesure/`. Et **stable** : changer une adresse fait perdre son historique, sauf redirection 301.

### Les images

Nom de fichier descriptif, texte alternatif pertinent, poids optimisé. Les images peuvent aussi apparaître dans la recherche d'images.

### Les liens internes

Reliez vos pages entre elles avec des textes de liens descriptifs : la page « Cuisines » renvoie vers « Réalisations », l'accueil vers chaque service. Les liens internes aident les robots à trouver les pages et leur indiquent lesquelles sont importantes.

## 4. Le référencement local

Pour un artisan, un commerce ou un cabinet, c'est souvent **le plus important**. Une grande partie des recherches ont une intention locale (« boulangerie ouverte dimanche », « plombier près de chez moi »).

- **La fiche d'établissement** du moteur de recherche (Google Business Profile, notamment) : gratuite, elle affiche l'entreprise sur la carte et dans les résultats locaux. Remplissez-la entièrement : catégorie exacte, horaires, photos, description, lien vers le site. Elle doit être créée et détenue **par le client**.
- **La cohérence** : nom, adresse et téléphone **strictement identiques** sur le site, la fiche d'établissement et les annuaires.
- **Les avis** : encouragez le client à demander des avis à ses clients satisfaits, et à y répondre. Jamais de faux avis : c'est une pratique commerciale trompeuse.
- **Le contenu local** : mentionnez naturellement la ville et la zone d'intervention dans les textes.

## 5. Les données structurées

Les **données structurées** sont des informations ajoutées dans le code, dans un format standardisé (Schema.org, au format JSON-LD), qui décrivent précisément le contenu : une entreprise locale, ses horaires, son adresse, des questions fréquentes, un événement.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Atelier Nord",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "8 rue de l'Industrie",
    "postalCode": "59000",
    "addressLocality": "Lille",
    "addressCountry": "FR"
  },
  "telephone": "+33320000000",
  "url": "https://www.atelier-nord.fr"
}
</script>
```

Elles peuvent permettre des affichages enrichis dans les résultats. Les extensions SEO de WordPress en génèrent une partie automatiquement. Testez-les avec l'outil de test des résultats enrichis du moteur.

## 6. La technique compte aussi

Un site **rapide**, **compatible mobile**, en **HTTPS**, sans erreurs, est mieux traité. Le chapitre suivant, sur la performance, contribue donc directement au référencement.

## Ce qui ne marche pas (ou plus)

- **Répéter un mot-clé** partout dans le texte : contre-productif et pénalisable.
- **Acheter des liens** en masse ou s'inscrire dans des centaines d'annuaires de mauvaise qualité : au mieux inutile, au pire sanctionné.
- **Créer des dizaines de pages quasi identiques** pour chaque ville voisine.
- **Générer du contenu en masse** sans valeur ajoutée.

> **Le piège** Les démarchages promettant « la première position sur Google en 30 jours » ou « garantie de résultat ». Personne ne peut garantir un classement : seul le moteur décide. Mettez vos clients en garde : ce sont souvent des abonnements coûteux et sans effet.

## Soyez patient

Le référencement prend du **temps** : plusieurs semaines pour l'indexation et les premiers signaux, souvent plusieurs mois pour des positions stables. C'est un point important à expliquer au client dès le départ, pour éviter une déception légitime.

> **Exercice** Pour votre site d'entraînement : (1) choisissez une expression principale pour chaque page, en vérifiant les résultats actuels dans un moteur ; (2) réécrivez le `<title>` et la méta-description de chaque page ; (3) ajoutez des données structurées `LocalBusiness` à l'accueil et testez-les ; (4) si le site est en ligne, déclarez-le dans la Search Console et soumettez le plan du site. Revenez-y dans deux semaines pour observer les premières données.

## Ce qu'il faut retenir

- Le SEO, c'est faciliter **l'exploration, la compréhension et la confiance**.
- **Search Console** et **plan du site** dès la mise en ligne.
- **Un sujet par page**, des expressions précises, choisies avec les mots des clients.
- **Titre**, **méta-description**, **h1**, **contenu complet**, **adresse lisible**, **liens internes**.
- Pour les entreprises de proximité, le **référencement local** est prioritaire : fiche d'établissement, cohérence, avis.
- Aucun raccourci durable, aucune garantie possible, et des **délais** à annoncer.
