---
titre: "Mettre en page avec Flexbox et Grid"
resume: "Aligner, répartir, disposer en colonnes. Les deux outils de mise en page modernes, et quand utiliser l'un ou l'autre."
---

Pendant longtemps, mettre deux blocs côte à côte en CSS relevait du bricolage : flottants, tableaux, astuces douteuses. Ce temps est révolu. Deux outils, **Flexbox** et **Grid**, couvrent aujourd'hui la quasi-totalité des mises en page, et sont pris en charge par tous les navigateurs actuels.

La règle de choix tient en une phrase :

> **À retenir** **Flexbox** organise des éléments sur **une dimension** (une ligne *ou* une colonne). **Grid** organise sur **deux dimensions** (des lignes *et* des colonnes en même temps).

## Flexbox

On active Flexbox sur un **conteneur**. Ses **enfants directs** deviennent des éléments flexibles.

```html
<header class="entete">
  <a href="/" class="logo">Boulangerie Martin</a>
  <nav>…</nav>
</header>
```

```css
.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

Trois lignes, et le logo se place à gauche, la navigation à droite, les deux alignés verticalement au centre. C'est le cas d'usage le plus courant de Flexbox.

### Les deux axes

Flexbox raisonne en **axe principal** et **axe secondaire** :

- `flex-direction: row` (par défaut) : l'axe principal est horizontal ;
- `flex-direction: column` : l'axe principal est vertical.

Ensuite :

| Propriété (sur le conteneur) | Agit sur | Valeurs courantes |
|---|---|---|
| `justify-content` | l'axe **principal** | `flex-start`, `center`, `space-between`, `flex-end` |
| `align-items` | l'axe **secondaire** | `stretch` (défaut), `center`, `flex-start`, `baseline` |
| `gap` | l'espace **entre** les éléments | `1rem`, `24px`… |
| `flex-wrap` | le passage à la ligne | `nowrap` (défaut), `wrap` |

### Le menu horizontal

```css
.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
```

Avec `flex-wrap: wrap`, les liens passent à la ligne quand la place manque, au lieu de déborder.

### Partager l'espace

Sur les **enfants**, la propriété `flex` contrôle la manière dont ils se partagent la place :

```css
.recherche {
  display: flex;
  gap: 0.5rem;
}
.recherche input { flex: 1; }   /* prend toute la place restante */
.recherche button { flex: none; } /* garde sa taille naturelle */
```

`flex: 1` signifie « grandis pour occuper l'espace disponible ». Si trois enfants ont `flex: 1`, ils se partagent l'espace à parts égales.

### Centrer quelque chose, enfin

La blague éternelle du CSS, « comment centrer une div », se règle en trois lignes :

```css
.centre {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
```

(Avec Grid, c'est même deux lignes : `display: grid; place-items: center;`.)

## Grid

Grid découpe un conteneur en **lignes** et en **colonnes**, puis y place les enfants.

```css
.offres {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
```

- `repeat(3, 1fr)` crée trois colonnes ;
- `fr` (*fraction*) est une unité propre à Grid : « une part de l'espace disponible ». Trois `1fr` = trois colonnes égales.

Les enfants se rangent automatiquement, de gauche à droite puis ligne par ligne. Ajoutez une sixième carte : une deuxième ligne se crée toute seule.

### La grille qui s'adapte toute seule

Voici sans doute la ligne de CSS la plus utile que vous apprendrez :

```css
.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
}
```

Traduction : « crée autant de colonnes que possible, chacune d'au moins 16 rem, et partage le reste équitablement ». Sur un grand écran, quatre colonnes ; sur une tablette, deux ; sur un téléphone, une. **Sans une seule requête media.** Vous l'utiliserez pour les cartes de services, les galeries, les listes de produits, les équipes.

### Colonnes de largeurs différentes

```css
.article-avec-encart {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}
```

Le contenu prend deux tiers, l'encart un tiers. On peut mélanger les unités : `grid-template-columns: 250px 1fr;` crée une barre latérale fixe et une zone principale fluide.

### Placer un élément précisément

```css
.mise-en-avant {
  grid-column: span 2;  /* occupe deux colonnes */
}
.bandeau {
  grid-column: 1 / -1;  /* de la première à la dernière ligne de grille : toute la largeur */
}
```

### Les zones nommées

Pour une mise en page de page complète, Grid permet de **dessiner** la disposition :

```css
.page {
  display: grid;
  grid-template-columns: 1fr 18rem;
  grid-template-areas:
    "entete  entete"
    "contenu encart"
    "pied    pied";
  gap: 2rem;
}
.page > header { grid-area: entete; }
.page > main   { grid-area: contenu; }
.page > aside  { grid-area: encart; }
.page > footer { grid-area: pied; }
```

La disposition se lit directement dans le code. Pour la réorganiser sur mobile, il suffira de redéfinir `grid-template-areas`, comme on le verra au chapitre suivant.

## Lequel choisir ?

| Besoin | Outil |
|---|---|
| Logo à gauche, menu à droite | Flexbox |
| Une rangée de boutons ou d'étiquettes | Flexbox |
| Un champ et son bouton côte à côte | Flexbox |
| Une grille de cartes | Grid |
| Une mise en page en colonnes | Grid |
| Une galerie d'images | Grid |
| Centrer un élément | L'un ou l'autre |

Ils se combinent très bien : une grille de cartes (Grid), dont chaque carte aligne son contenu verticalement (Flexbox en colonne) pour que les boutons restent en bas, même si les textes ont des longueurs différentes.

```css
.carte {
  display: flex;
  flex-direction: column;
}
.carte .bouton {
  margin-top: auto; /* pousse le bouton tout en bas de la carte */
}
```

> **Astuce** Dans Firefox et Chrome, l'inspecteur affiche un badge `flex` ou `grid` à côté des conteneurs. Cliquez dessus : les lignes de la grille et les zones flexibles s'affichent en surimpression sur la page. C'est le meilleur moyen de comprendre ce qui se passe.

> **Exercice** Sur votre page d'accueil : (1) passez l'en-tête en Flexbox avec le logo à gauche et le menu à droite ; (2) transformez votre section d'offres en grille `auto-fill` de cartes ; (3) faites en sorte que le bouton de chaque carte soit toujours aligné en bas. Redimensionnez la fenêtre pour voir la grille s'adapter. Si vous voulez vous entraîner davantage, les jeux gratuits *Flexbox Froggy* et *Grid Garden* sont excellents.

## Ce qu'il faut retenir

- **Flexbox** : une dimension. `justify-content` sur l'axe principal, `align-items` sur l'axe secondaire, `gap` pour l'espacement.
- **Grid** : deux dimensions. `grid-template-columns` avec `fr` et `repeat()`.
- `repeat(auto-fill, minmax(16rem, 1fr))` crée une grille qui s'adapte seule à l'écran.
- Les deux se combinent : Grid pour la disposition générale, Flexbox à l'intérieur des composants.
