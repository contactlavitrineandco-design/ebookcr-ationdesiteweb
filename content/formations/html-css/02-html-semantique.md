---
titre: "Structurer avec un HTML sémantique"
resume: "header, nav, main, section, article, footer : donner du sens à chaque zone de la page, pour les humains, les lecteurs d'écran et les moteurs."
---

Au chapitre précédent, vous avez écrit du contenu. Il faut maintenant l'**organiser** en zones : un en-tête, une navigation, un contenu principal, un pied de page. Pendant des années, on a tout fait avec des `<div>`, des boîtes génériques sans signification. Le HTML moderne propose des éléments qui disent **quel rôle joue chaque zone**. On parle de HTML sémantique.

## Le problème de la « soupe de div »

Voici une page telle qu'on en trouve encore beaucoup :

```html
<div class="header">
  <div class="logo">Boulangerie Martin</div>
  <div class="menu">…</div>
</div>
<div class="content">…</div>
<div class="footer">…</div>
```

Visuellement, avec le bon CSS, rien ne la distingue d'une page bien construite. Mais pour un lecteur d'écran ou un moteur de recherche, c'est une suite de boîtes anonymes. Rien n'indique où est le menu, ni où commence le contenu.

## Les éléments de structure

Voici la même page, écrite correctement :

```html
<body>
  <header class="site-header">
    <a href="/" class="logo">Boulangerie Martin</a>
    <nav aria-label="Navigation principale">
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/pains.html">Nos pains</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Boulangerie Martin</h1>
    <section>
      <h2>Nos pains</h2>
      …
    </section>
    <section>
      <h2>Horaires</h2>
      …
    </section>
  </main>

  <footer class="site-footer">
    <p>12 rue des Remparts, 69007 Lyon</p>
    <a href="/mentions-legales.html">Mentions légales</a>
  </footer>
</body>
```

| Élément | Signification | Combien ? |
|---|---|---|
| `<header>` | En-tête du site (ou d'une section) : logo, titre, navigation | Un principal, d'autres possibles dans des `<article>` |
| `<nav>` | Bloc de liens de navigation **importants** | Un ou plusieurs (menu principal, fil d'Ariane…) |
| `<main>` | Contenu principal, propre à cette page | **Un seul** par page |
| `<section>` | Partie thématique du contenu, avec son propre titre | Autant que nécessaire |
| `<article>` | Contenu autonome, qui aurait du sens seul (article de blog, avis client, fiche produit) | Autant que nécessaire |
| `<aside>` | Contenu annexe (encadré, liens connexes) | Au besoin |
| `<footer>` | Pied de page du site (ou d'une section) | Un principal |

Les lecteurs d'écran transforment ces éléments en **repères** (*landmarks*). Un utilisateur aveugle peut sauter directement à la navigation ou au contenu principal, comme vous le faites d'un coup d'œil.

### section ou article ?

Posez-vous la question : *ce bloc aurait-il du sens s'il était copié seul sur un autre site ?* Un avis client, un article de blog, une carte de produit : oui, c'est un `<article>`. La partie « Nos horaires » d'une page d'accueil : non, c'est une `<section>`.

Et `<div>` dans tout ça ? Il reste parfaitement légitime **quand aucun autre élément ne convient**, typiquement pour regrouper des éléments dans un but purement visuel (une grille, une colonne). La règle : un `<div>` ne veut rien dire, et c'est très bien quand on ne veut rien dire.

## Les éléments de texte qui ont du sens

Au-delà de la structure, plusieurs éléments précisent la nature d'un contenu :

```html
<p>Ouvert le <time datetime="2026-12-24">24 décembre</time> jusqu'à 17 h.</p>

<blockquote cite="https://avis.exemple/123">
  <p>Le meilleur pain au levain du quartier, sans hésitation.</p>
</blockquote>
<p>— Claire, cliente depuis 2019</p>

<address>
  12 rue des Remparts, 69007 Lyon<br>
  <a href="mailto:bonjour@boulangerie-martin.fr">bonjour@boulangerie-martin.fr</a>
</address>

<p>Prix : <abbr title="toutes taxes comprises">TTC</abbr></p>
```

- `<time>` : une date ou une heure lisible par les machines ;
- `<blockquote>` : une citation longue ; `<q>` pour une citation courte dans une phrase ;
- `<address>` : les coordonnées de contact du site ou de l'auteur ;
- `<abbr>` : une abréviation, avec sa forme développée.

## Le cas des boutons et des liens

Une confusion très répandue, aux conséquences réelles :

- un **lien** (`<a href>`) **emmène quelque part** : une autre page, une ancre, un fichier ;
- un **bouton** (`<button>`) **déclenche une action** : envoyer un formulaire, ouvrir un menu, fermer une fenêtre.

```html
<!-- Correct -->
<a href="/reservation.html" class="bouton">Réserver une pièce montée</a>
<button type="button" class="menu-bouton" aria-expanded="false">Menu</button>

<!-- Incorrect : une div qui fait semblant d'être un bouton -->
<div class="bouton" onclick="ouvrirMenu()">Menu</div>
```

La `<div>` cliquable ne peut pas être atteinte au clavier (touche `Tab`), n'est pas annoncée comme un bouton, et ne réagit pas à la touche Entrée. Les vrais éléments font tout ça gratuitement. **Utilisez-les.**

> **À retenir** L'apparence d'un élément ne dit rien de sa nature. Un lien peut ressembler à un bouton, et inversement : c'est le CSS qui décide. Mais le choix de l'élément HTML, lui, dépend uniquement de ce qu'il fait.

## Le lien d'évitement

Pour les personnes qui naviguent au clavier, devoir traverser tout le menu sur chaque page est pénible. On ajoute en tout début de `<body>` un lien qui saute directement au contenu :

```html
<a href="#contenu" class="lien-evitement">Aller au contenu</a>
…
<main id="contenu">
```

On le cache visuellement en CSS, et on le fait réapparaître quand il reçoit le focus clavier. Vous verrez comment au chapitre sur les formulaires et l'accessibilité. Ce site-ci en possède un : appuyez sur `Tab` en arrivant sur la page d'accueil.

## Les métadonnées utiles dans le `<head>`

Un `<head>` complet, pour un site vitrine, ressemble à ceci :

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pains au levain à Lyon 7e — Boulangerie Martin</title>
  <meta name="description" content="Boulangerie artisanale à Lyon 7e : pain au levain, viennoiseries maison, pâtisseries du week-end. Ouvert du mardi au dimanche.">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/css/style.css">
  <meta property="og:title" content="Boulangerie Martin, Lyon 7e">
  <meta property="og:image" content="https://www.boulangerie-martin.fr/images/partage.jpg">
</head>
```

- la **description** apparaît souvent sous le titre dans les résultats de recherche : 150 caractères environ, rédigés pour donner envie de cliquer ;
- l'**icône** (*favicon*) s'affiche dans l'onglet ;
- les balises **Open Graph** (`og:`) contrôlent l'aperçu quand la page est partagée sur les réseaux sociaux ou les messageries.

> **Exercice** Reprenez la page d'accueil du chapitre précédent et restructurez-la : un `<header>` avec un logo-lien et une `<nav>` contenant une liste de liens, un `<main>` avec le `<h1>` et au moins trois `<section>` titrées, un `<footer>` avec l'adresse dans un `<address>` et un lien vers les mentions légales. Ajoutez le lien d'évitement et une `meta description`. Puis installez l'extension de navigateur *HeadingsMap* (ou équivalent) et vérifiez que le plan des titres est logique.

## Ce qu'il faut retenir

- Les éléments `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` donnent un **rôle** à chaque zone.
- Un seul `<main>` par page ; un `<div>` quand aucun élément n'a de sens.
- **Lien = aller quelque part. Bouton = faire quelque chose.** Jamais de `<div>` cliquable.
- Le lien d'évitement et la `meta description` sont des détails qui distinguent un travail professionnel.
