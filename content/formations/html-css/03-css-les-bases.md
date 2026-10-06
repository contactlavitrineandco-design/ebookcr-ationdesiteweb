---
titre: "CSS : sélecteurs, cascade et modèle de boîte"
resume: "Les trois notions qui expliquent 90 % des comportements « bizarres » du CSS. Une fois comprises, on arrête de deviner."
---

Le CSS a la réputation d'être frustrant. On change une valeur, rien ne bouge ; on en change une autre, tout se décale. Presque toujours, c'est parce qu'on ignore l'une de ces trois notions : **les sélecteurs**, **la cascade** et **le modèle de boîte**. Ce chapitre les pose une bonne fois pour toutes.

## Relier la feuille de style

Créez `css/style.css` et reliez-le dans le `<head>` de chaque page :

```html
<link rel="stylesheet" href="css/style.css">
```

Tout votre CSS ira dans ce fichier. Pas d'attribut `style=""` dans le HTML : il est impossible à maintenir et écrase tout le reste.

## Anatomie d'une règle

```css
.carte h2 {
  font-size: 1.5rem;
  color: #3b2a1a;
}
```

- `.carte h2` est le **sélecteur** : à quels éléments s'applique la règle ;
- `font-size` est une **propriété**, `1.5rem` sa **valeur** ;
- l'ensemble `propriété: valeur;` est une **déclaration**.

## Les sélecteurs

| Sélecteur | Cible | Exemple |
|---|---|---|
| `p` | Tous les éléments de ce type | tous les paragraphes |
| `.carte` | Tous les éléments ayant cette **classe** | `<div class="carte">` |
| `#contact` | L'élément ayant cet **identifiant** | `<section id="contact">` |
| `.carte h2` | Les `h2` situés **à l'intérieur** d'un `.carte` | descendant |
| `.menu > li` | Les `li` **enfants directs** de `.menu` | enfant |
| `a:hover` | Les liens **survolés** | pseudo-classe |
| `a:focus-visible` | Les liens qui ont le **focus clavier** | pseudo-classe |
| `li:first-child` | Le **premier** `li` de son parent | pseudo-classe |
| `.bouton::after` | Un **pseudo-élément** généré après le contenu | pseudo-élément |

### La règle pratique : des classes, presque toujours

Ciblez vos éléments avec des **classes**, et réservez les `id` aux ancres de liens et aux formulaires. Les classes sont réutilisables, et leur poids dans la cascade (on y vient) reste raisonnable.

Nommez vos classes selon **ce qu'est** l'élément, pas son apparence : `.carte-produit`, `.alerte`, `.bouton-principal`. Pas `.rouge-gras` : le jour où la charte passe au vert, le nom ment.

## La cascade

Plusieurs règles peuvent viser le même élément avec des valeurs contradictoires. Le navigateur départage dans cet ordre :

1. **L'origine et l'importance.** Une déclaration marquée `!important` gagne sur les autres. (À éviter : c'est une arme qui se retourne vite contre vous.)
2. **La spécificité.** Le sélecteur le plus précis l'emporte.
3. **L'ordre.** À spécificité égale, la règle écrite **en dernier** gagne.

### Calculer la spécificité

On compte trois colonnes : **(id, classes/pseudo-classes/attributs, éléments)**.

| Sélecteur | Spécificité |
|---|---|
| `p` | (0, 0, 1) |
| `.intro` | (0, 1, 0) |
| `p.intro` | (0, 1, 1) |
| `.carte .titre` | (0, 2, 0) |
| `#contact` | (1, 0, 0) |
| `#contact .titre` | (1, 1, 0) |

On compare colonne par colonne, de gauche à droite. Un seul `id` bat n'importe quel nombre de classes. C'est pourquoi les `id` en CSS posent problème : pour les surcharger ensuite, il faut… un autre `id`, et l'escalade commence.

```css
/* Le paragraphe sera brun : (0,1,1) bat (0,0,1), quel que soit l'ordre */
p.intro { color: #3b2a1a; }
p { color: black; }
```

### L'héritage

Certaines propriétés se **transmettent** des parents aux enfants : surtout celles qui concernent le texte (`color`, `font-family`, `font-size`, `line-height`). D'autres non (`margin`, `border`, `background`). C'est pourquoi on définit la police une seule fois sur `body` :

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #222;
}
```

Tous les éléments en héritent, sauf ceux qui redéfinissent la propriété.

> **Astuce** Quand une règle « ne marche pas », ouvrez l'inspecteur (`F12`), sélectionnez l'élément et regardez le panneau *Styles*. Les déclarations barrées ont perdu la cascade, et l'inspecteur vous dit quelle règle les a battues. Ne devinez jamais : regardez.

## Le modèle de boîte

Pour le navigateur, **chaque élément est une boîte rectangulaire**, constituée de quatre couches, de l'intérieur vers l'extérieur :

1. le **contenu** (*content*) : le texte, l'image ;
2. la **marge intérieure** (*padding*) : l'espace entre le contenu et la bordure ;
3. la **bordure** (*border*) ;
4. la **marge extérieure** (*margin*) : l'espace entre la boîte et ses voisines.

```css
.carte {
  width: 300px;
  padding: 24px;
  border: 1px solid #ddd;
  margin-bottom: 32px;
}
```

Question piège : quelle est la largeur réelle de cette carte à l'écran ? Par défaut, **350 px** : 300 de contenu, plus 2 × 24 de padding, plus 2 × 1 de bordure. C'est contre-intuitif, et c'est la source d'innombrables débordements.

La solution, que tous les professionnels appliquent en début de feuille de style :

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Avec `border-box`, la largeur déclarée **inclut** le padding et la bordure. La carte fait 300 px, point.

### Bloc et en ligne

Les boîtes n'ont pas toutes le même comportement :

- les éléments **de bloc** (`div`, `p`, `h1`, `section`…) prennent toute la largeur disponible et s'empilent verticalement ;
- les éléments **en ligne** (`a`, `strong`, `em`, `span`…) se placent dans le flux du texte et ignorent `width`, `height` et les marges verticales.

La propriété `display` change ce comportement : `display: block`, `inline`, `inline-block`, et surtout `flex` et `grid`, que nous verrons au chapitre suivant.

### La fusion des marges

Deux marges verticales qui se touchent **fusionnent** : un titre avec `margin-bottom: 24px` suivi d'un paragraphe avec `margin-top: 16px` sont séparés de 24 px, pas de 40. Le comportement est voulu (il évite les doubles espacements dans les textes), mais il surprend. Une habitude simple l'évite presque toujours : **ne mettre des marges que vers le bas** (`margin-bottom`), jamais vers le haut.

## Les unités

| Unité | Relative à | Usage conseillé |
|---|---|---|
| `px` | Rien (fixe) | Bordures, petits détails |
| `rem` | Taille de police de la racine (16 px par défaut) | **Tailles de texte**, espacements |
| `em` | Taille de police de l'élément lui-même | Espacements internes d'un bouton |
| `%` | Dimension du parent | Largeurs |
| `vw` / `vh` | 1 % de la largeur / hauteur de la fenêtre | Sections plein écran |
| `ch` | Largeur du caractère « 0 » | **Largeur des textes** (`max-width: 65ch`) |

Utilisez `rem` pour les tailles de police : si un visiteur agrandit le texte dans les réglages de son navigateur, tout votre site suit. En pixels fixes, il ne bouge pas, et vous excluez les personnes malvoyantes.

## Une feuille de style de départ

Voici une base saine pour tous vos projets :

```css
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: #1f1f1f;
  background: #fffdf8;
}

img { max-width: 100%; height: auto; display: block; }

h1, h2, h3 { line-height: 1.15; margin: 0 0 0.5em; }
p, ul, ol { margin: 0 0 1em; }

a { color: #9c3d12; }
a:hover { text-decoration: none; }
a:focus-visible, button:focus-visible { outline: 3px solid #9c3d12; outline-offset: 2px; }

.conteneur { max-width: 70rem; margin-inline: auto; padding-inline: 1.25rem; }
```

> **Exercice** Appliquez cette base à votre page. Puis créez une classe `.carte` (fond blanc, bordure fine, coins arrondis avec `border-radius: 8px`, `padding` de `1.5rem`) et utilisez-la pour trois blocs de votre page. Avec l'inspecteur, survolez une carte et observez le schéma du modèle de boîte dans l'onglet *Calculé* (*Computed*). Retirez temporairement `box-sizing: border-box` et constatez la différence de largeur.

## Ce qu'il faut retenir

- Ciblez avec des **classes** nommées selon le rôle, pas l'apparence.
- La **cascade** départage par importance, puis **spécificité**, puis **ordre**. L'inspecteur vous dit qui gagne.
- Chaque élément est une **boîte** : contenu, padding, bordure, marge. Toujours `box-sizing: border-box`.
- `rem` pour les textes, `ch` pour la largeur des paragraphes, `px` pour les détails.
