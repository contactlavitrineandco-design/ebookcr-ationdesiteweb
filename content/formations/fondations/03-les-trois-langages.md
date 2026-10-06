---
titre: "HTML, CSS, JavaScript : qui fait quoi"
resume: "La structure, l'apparence, le comportement. Trois langages, trois rôles, une règle : ne pas les mélanger."
---

Toutes les pages web, de la plus simple à la plus complexe, reposent sur trois langages que le navigateur sait lire. Les outils changent tous les ans ; ces trois-là sont là depuis plus de vingt-cinq ans et le seront encore longtemps. C'est pour ça qu'il vaut la peine de bien comprendre leur rôle, même si vous comptez travailler surtout avec WordPress ou un outil sans code.

Une image aide à fixer les idées : **une maison**.

- Le **HTML** est la structure : les murs, les pièces, les portes.
- Le **CSS** est l'aménagement : la peinture, le mobilier, l'éclairage.
- Le **JavaScript** est l'équipement : l'interphone, les volets électriques, le thermostat.

Une maison sans peinture reste habitable. Une maison sans murs, non.

## HTML : la structure et le sens

HTML (*HyperText Markup Language*) n'est pas un langage de programmation : c'est un langage de **balisage**. On entoure des contenus de **balises** qui disent ce qu'ils *sont*.

```html
<h1>Boulangerie Martin</h1>
<p>Pain au levain, viennoiseries maison, ouvert du mardi au dimanche.</p>
<a href="/horaires">Voir nos horaires</a>
```

- `<h1>` dit : « ceci est le titre principal de la page » ;
- `<p>` dit : « ceci est un paragraphe » ;
- `<a>` dit : « ceci est un lien vers une autre page ».

Le point essentiel, que beaucoup de débutants ratent : **on choisit une balise pour ce que le contenu signifie, jamais pour son apparence**. Un titre est un `<h1>` parce que c'est un titre, pas parce qu'on veut l'écrire en gros. Pour l'écrire en gros, on utilisera le CSS.

Pourquoi c'est si important ? Parce que d'autres que des humains lisent votre HTML :

- les **moteurs de recherche**, qui s'en servent pour comprendre de quoi parle la page ;
- les **lecteurs d'écran**, utilisés par les personnes aveugles ou malvoyantes, qui annoncent « titre de niveau 1 », « lien », « liste de 4 éléments » ;
- les **navigateurs** eux-mêmes, qui proposent des modes lecture, des traductions automatiques, etc.

Un HTML bien construit, dit **sémantique**, rend un site plus accessible et mieux référencé, gratuitement.

## CSS : l'apparence

CSS (*Cascading Style Sheets*, feuilles de style en cascade) décrit **à quoi ressemblent** les éléments : couleurs, polices, tailles, espacements, disposition à l'écran.

```css
h1 {
  font-family: Georgia, serif;
  font-size: 48px;
  color: #3b2a1a;
}

p {
  max-width: 60ch;
  line-height: 1.6;
}
```

Une règle CSS se lit ainsi : « pour tous les éléments `h1`, applique telle police, telle taille, telle couleur ». Le mot « cascade » signifie que plusieurs règles peuvent s'appliquer au même élément, et que le navigateur suit un ordre de priorité précis pour décider laquelle l'emporte. Nous y consacrerons un chapitre entier dans « HTML & CSS, à la main ».

Le CSS se range idéalement dans un **fichier séparé** (`style.css`), relié à toutes les pages. Changer la couleur des titres de tout un site revient alors à modifier une seule ligne.

## JavaScript : le comportement

JavaScript est, lui, un vrai **langage de programmation**. Il permet à la page de réagir : ouvrir un menu sur mobile, valider un formulaire avant l'envoi, afficher une carte interactive, charger du contenu sans recharger la page.

```js
const bouton = document.querySelector(".menu-bouton");
const menu = document.querySelector(".menu");

bouton.addEventListener("click", () => {
  menu.classList.toggle("ouvert");
});
```

Ce petit programme dit : « quand on clique sur le bouton du menu, ajoute ou retire la classe `ouvert` sur le menu ». C'est ensuite le CSS qui décide à quoi ressemble un menu « ouvert ».

Pour un site vitrine, la quantité de JavaScript nécessaire est souvent **très faible**. C'est une bonne nouvelle : moins de JavaScript, c'est un site plus rapide, plus robuste et plus accessible.

> **À retenir** Règle d'or des créateurs de sites : faites avec HTML ce qui peut l'être, puis avec CSS, et n'utilisez JavaScript que pour le reste. Un menu, un accordéon (`<details>`), une galerie défilante peuvent souvent se faire sans une ligne de JavaScript.

## Comment ils s'assemblent

Le HTML est le point d'entrée. C'est lui qui appelle le CSS et le JavaScript :

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Boulangerie Martin</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Boulangerie Martin</h1>
    <p>Pain au levain et viennoiseries maison.</p>
    <script src="menu.js" defer></script>
  </body>
</html>
```

- `<head>` contient les informations *sur* la page (titre de l'onglet, encodage, feuilles de style) ;
- `<body>` contient ce qui est affiché ;
- `<link>` charge le CSS ;
- `<script>` charge le JavaScript (`defer` lui demande d'attendre que la page soit lue).

## Et PHP, Python, les bases de données ?

Vous croiserez d'autres langages. Leur particularité : ils s'exécutent **sur le serveur**, pas dans le navigateur. Leur rôle est de **fabriquer** du HTML à la volée (c'est le site dynamique du chapitre 1).

WordPress, par exemple, est écrit en **PHP** et stocke ses contenus dans une base de données **MySQL** ou **MariaDB**. Quand un visiteur arrive, PHP lit la base, assemble le HTML et l'envoie. Le navigateur, lui, ne voit jamais le PHP : il reçoit du HTML, du CSS et du JavaScript, comme pour n'importe quel site.

Ce qui veut dire que **même sur WordPress, tout finit en HTML et CSS**. Savoir les lire, c'est pouvoir corriger ce que les outils font mal.

> **Exercice** Ouvrez une page web, faites un clic droit puis *Afficher le code source de la page* (`Ctrl + U`). Repérez : la balise `<title>`, au moins un `<link rel="stylesheet">`, au moins un `<script>`. Puis cherchez (`Ctrl + F`) les balises `<h1>` et `<h2>` : la structure des titres vous paraît-elle logique ? Notez vos observations, vous y reviendrez.

## Ce qu'il faut retenir

- **HTML** : la structure et le sens. On choisit les balises selon ce que le contenu *est*.
- **CSS** : l'apparence. Dans un fichier séparé, partagé par toutes les pages.
- **JavaScript** : le comportement. À utiliser avec parcimonie sur un site vitrine.
- Les langages **serveur** (PHP…) fabriquent du HTML ; le navigateur ne reçoit jamais que les trois langages ci-dessus.
