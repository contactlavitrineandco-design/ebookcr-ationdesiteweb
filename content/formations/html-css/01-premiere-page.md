---
titre: "Votre première page, ligne par ligne"
resume: "Créer un fichier, écrire un document HTML complet, l'ouvrir dans le navigateur, et comprendre chaque ligne."
apercu: true
---

Dans ce livre, on écrit tout à la main. Pas de modèle téléchargé, pas de générateur : chaque ligne que vous taperez, vous saurez pourquoi elle est là. C'est plus lent les premiers jours, et beaucoup plus rapide ensuite, parce que vous ne serez plus jamais bloqué devant un code que vous ne comprenez pas.

On commence par le plus petit site possible : une page.

## Créer le projet

1. Dans votre dossier `Sites`, créez un dossier `atelier`.
2. Ouvrez-le dans VS Code (*Fichier → Ouvrir le dossier*).
3. Créez un fichier nommé `index.html`.

Le nom n'est pas un hasard : `index.html` est le fichier que les serveurs affichent quand on demande la racine d'un site.

## Le squelette minimal

Tapez ceci, sans copier-coller. Taper, c'est mémoriser.

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Atelier — ma première page</title>
  </head>
  <body>
    <h1>Bonjour.</h1>
    <p>Ceci est ma première page web, écrite à la main.</p>
  </body>
</html>
```

Enregistrez, puis clic droit sur le fichier → *Open with Live Server*. Votre page s'ouvre dans le navigateur. Modifiez le texte du paragraphe, enregistrez : la page se met à jour toute seule.

Vous venez de créer un site web. Il n'est en ligne nulle part, mais il est complet et valide.

## Ligne par ligne

### `<!doctype html>`

La **déclaration de type de document**. Elle indique au navigateur qu'il s'agit de HTML moderne. Sans elle, le navigateur bascule dans un mode de compatibilité avec les pages des années 1990 (le *quirks mode*) et certaines règles CSS se comportent bizarrement. Elle est toujours en première ligne, sans exception.

### `<html lang="fr">`

L'élément **racine** : tout le reste est à l'intérieur. L'attribut `lang="fr"` déclare la langue du contenu. Il sert aux lecteurs d'écran (qui choisissent la bonne prononciation), aux moteurs de recherche et aux outils de traduction. On l'oublie souvent ; vous, non.

### `<head>` … `</head>`

L'**en-tête du document** : des informations *sur* la page, qui ne s'affichent pas dans la page elle-même.

- `<meta charset="utf-8">` : l'encodage des caractères. Sans lui, vos accents peuvent s'afficher en `Ã©`. Il doit apparaître tôt dans le `<head>`.
- `<meta name="viewport" …>` : indispensable sur mobile. Sans cette ligne, les téléphones affichent la page comme sur un écran d'ordinateur, en tout petit. Nous y reviendrons au chapitre sur le responsive.
- `<title>` : le texte de l'onglet du navigateur, et surtout le **titre bleu affiché dans les résultats des moteurs de recherche**. Chaque page doit avoir un titre unique et descriptif.

### `<body>` … `</body>`

Le **corps** : tout ce qui s'affiche à l'écran.

## Balises, éléments, attributs

Trois mots que vous croiserez partout :

```html
<a href="contact.html" title="Nous écrire">Contact</a>
```

- `<a>` est la **balise ouvrante**, `</a>` la **balise fermante** ;
- `href="contact.html"` est un **attribut** : un nom, un signe égal, une valeur entre guillemets ;
- l'ensemble, du début à la fin, est un **élément** ;
- « Contact » est son **contenu**.

Certains éléments n'ont pas de contenu, donc pas de balise fermante : on les appelle **éléments vides**. Par exemple `<meta>`, `<img>`, `<br>`, `<input>`, `<link>`.

Les éléments s'**imbriquent** comme des poupées russes, et doivent se fermer dans l'ordre inverse de leur ouverture :

```html
<!-- Correct -->
<p>Un mot <strong>important</strong> ici.</p>

<!-- Incorrect : strong est fermé après p -->
<p>Un mot <strong>important</p></strong>
```

Le texte entre `<!--` et `-->` est un **commentaire** : il est ignoré par le navigateur et sert à laisser des notes dans le code.

## Les éléments de texte essentiels

Enrichissons la page. Remplacez le contenu de `<body>` :

```html
<h1>Boulangerie Martin</h1>
<p>Pain au levain, viennoiseries maison et pâtisseries du week-end, à Lyon depuis 1987.</p>

<h2>Nos pains</h2>
<p>Tous nos pains sont façonnés à la main et cuits sur sole.</p>
<ul>
  <li>Le levain nature</li>
  <li>Le petit épeautre</li>
  <li>La tourte de seigle</li>
</ul>

<h2>Horaires</h2>
<p>Du mardi au samedi de <strong>7 h à 19 h 30</strong>, le dimanche de 7 h à 13 h.</p>

<h2>Nous trouver</h2>
<p>
  12 rue des Remparts, 69007 Lyon<br>
  <a href="tel:+33478000000">04 78 00 00 00</a>
</p>
```

Vous venez d'utiliser :

| Élément | Rôle |
|---|---|
| `<h1>` à `<h6>` | Titres, du plus important au moins important |
| `<p>` | Paragraphe |
| `<ul>` + `<li>` | Liste non ordonnée (à puces) ; `<ol>` pour une liste numérotée |
| `<strong>` | Importance forte (affiché en gras par défaut) |
| `<em>` | Insistance (affiché en italique par défaut) |
| `<br>` | Retour à la ligne, à réserver aux adresses et aux poèmes |
| `<a>` | Lien |

> **Attention** Un seul `<h1>` par page, et des titres qui se suivent logiquement : pas de `<h4>` directement sous un `<h1>`. Pensez à la table des matières d'un livre. Les lecteurs d'écran permettent de naviguer de titre en titre ; une hiérarchie cassée, c'est un livre dont les chapitres sont dans le désordre.

## Les liens

Un lien relie une page à une autre ressource. Trois cas courants :

```html
<!-- Vers une autre page du même site (chemin relatif) -->
<a href="horaires.html">Nos horaires</a>

<!-- Vers un autre site (URL absolue) -->
<a href="https://www.service-public.fr">Service-public.fr</a>

<!-- Vers une section de la même page -->
<a href="#nous-trouver">Nous trouver</a>
...
<h2 id="nous-trouver">Nous trouver</h2>
```

Les liens `tel:` et `mailto:` ouvrent respectivement le téléphone et la messagerie. Sur mobile, un numéro cliquable n'est pas un luxe : c'est souvent la raison même de la visite.

Rédigez des textes de lien qui ont du sens **hors contexte** : « Voir nos horaires », pas « cliquez ici ». Les lecteurs d'écran proposent une liste de tous les liens de la page ; une liste de dix « cliquez ici » est inutilisable.

## Les images

```html
<img src="images/devanture.jpg" alt="La devanture bleue de la boulangerie, rue des Remparts" width="1200" height="800">
```

- `src` : le chemin du fichier ;
- `alt` : le **texte alternatif**, lu par les lecteurs d'écran et affiché si l'image ne charge pas. Il décrit ce que l'image apporte. Si l'image est purement décorative, on laisse `alt=""` (vide, mais présent) ;
- `width` et `height` : les dimensions réelles du fichier. Ils permettent au navigateur de réserver la place avant le chargement et évitent que la page « saute ».

## Valider son code

Le navigateur est très tolérant : il affiche presque n'importe quoi, même un HTML plein d'erreurs. C'est un piège, parce que les erreurs se manifestent plus tard, de façon imprévisible. Prenez l'habitude de passer vos pages au **validateur du W3C** (validator.w3.org, onglet *Validate by Direct Input*). Visez zéro erreur.

> **Exercice** Créez la page d'accueil de l'entreprise que vous avez choisie à la fin des « Fondations du web » (ou de la boulangerie Martin). Elle doit contenir : un `<title>` descriptif, un `<h1>`, au moins trois `<h2>`, une liste, un lien vers une autre page (`contact.html`, que vous créerez vide), un lien `tel:`, et une image avec un `alt` pertinent. Validez-la au W3C jusqu'à zéro erreur.

## Ce qu'il faut retenir

- Toute page commence par `<!doctype html>`, un `<html lang="fr">`, un `<head>` et un `<body>`.
- Dans le `<head>` : `charset`, `viewport`, `title`, toujours.
- Un élément = balise ouvrante + contenu + balise fermante ; les attributs précisent son comportement.
- **Un seul `<h1>`**, des titres hiérarchisés, des textes de liens explicites, un `alt` à chaque image.
- Le navigateur pardonne tout : **le validateur, non**. Fiez-vous au second.
