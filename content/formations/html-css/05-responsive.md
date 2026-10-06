---
titre: "Un site lisible sur tous les écrans"
resume: "Concevoir mobile d'abord, utiliser les requêtes media avec mesure, des typographies fluides et des images adaptées."
---

Plus de la moitié des visites d'un site vitrine se font sur téléphone, et pour certains métiers (restauration, commerces de proximité, artisans), c'est bien davantage. Un site qui s'affiche mal sur mobile n'est pas « un peu moins bien » : il perd la majorité de ses visiteurs. On appelle **responsive** (ou adaptatif) un site qui s'ajuste à la taille de l'écran.

Bonne nouvelle : si vous avez suivi les chapitres précédents, votre site est déjà à moitié responsive. Les éléments de bloc s'adaptent naturellement à la largeur disponible, et les grilles `auto-fill` gèrent seules leurs colonnes. Ce chapitre traite du reste.

## La balise viewport, encore

Elle est dans votre `<head>` depuis le premier chapitre, mais rappelons pourquoi :

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Sans elle, un téléphone simule un écran d'ordinateur de 980 px de large puis réduit le tout. Votre texte devient minuscule et vos requêtes media ne se déclenchent jamais. Ne bloquez jamais le zoom (`user-scalable=no`) : c'est un obstacle majeur pour les personnes malvoyantes.

## Penser « mobile d'abord »

La méthode la plus robuste consiste à écrire le CSS **pour le petit écran d'abord**, puis à l'enrichir pour les écrans plus larges. Pourquoi ?

- Sur mobile, la mise en page est presque toujours **une seule colonne** : c'est la plus simple, celle qui demande le moins de code.
- On ajoute ensuite de la complexité **quand il y a de la place**, plutôt que d'en retirer quand il n'y en a plus.
- Le CSS final est plus court, et les téléphones (souvent moins puissants) ont moins de règles à annuler.

## Les requêtes media

Une requête media applique des règles **sous condition** :

```css
/* Par défaut (mobile) : une colonne */
.article-avec-encart {
  display: grid;
  gap: 2rem;
}

/* À partir de 48rem de large (environ 768 px) : deux colonnes */
@media (min-width: 48rem) {
  .article-avec-encart {
    grid-template-columns: 2fr 1fr;
  }
}
```

On écrit des `min-width` (« à partir de ») quand on part du mobile.

### Où placer les points de rupture ?

Pas en fonction des appareils à la mode (« l'iPhone 15 fait tant de pixels ») : ils changent chaque année. Placez un point de rupture **là où votre contenu commence à mal s'afficher**. Élargissez progressivement la fenêtre ; quand une ligne de texte devient trop longue ou qu'une grille paraît vide, c'est l'endroit.

En pratique, deux ou trois points suffisent pour un site vitrine, par exemple vers `40rem`, `64rem` et éventuellement `80rem`.

## Le menu sur mobile

C'est la question qui revient sur chaque projet. Plusieurs solutions, de la plus simple à la plus élaborée :

1. **Laisser le menu passer à la ligne** (`flex-wrap: wrap`). Avec quatre ou cinq liens courts, c'est souvent suffisant, et c'est parfaitement accessible.
2. **Un menu dépliable sans JavaScript**, avec l'élément `<details>` :

```html
<details class="menu-mobile">
  <summary>Menu</summary>
  <nav aria-label="Navigation principale">
    <ul>…</ul>
  </nav>
</details>
```

3. **Un bouton « Menu » avec un peu de JavaScript**, qui bascule l'attribut `aria-expanded` et une classe. C'est la solution la plus courante sur les sites professionnels ; nous en verrons une version propre dans le projet final.

Quelle que soit la solution, le menu doit rester **utilisable au clavier**, et le bouton doit avoir une zone cliquable d'au moins 44 × 44 pixels.

## Une typographie fluide

Un titre de 64 px est superbe sur ordinateur et catastrophique sur un téléphone. Plutôt que d'empiler les requêtes media, la fonction `clamp()` permet une taille qui **varie en continu** :

```css
h1 {
  font-size: clamp(2rem, 1.2rem + 4vw, 4rem);
}
```

Lecture : « jamais moins de 2rem, jamais plus de 4rem, et entre les deux, proportionnel à la largeur de l'écran ». La même technique fonctionne pour les espacements de sections :

```css
.section {
  padding-block: clamp(3rem, 8vw, 7rem);
}
```

Et pour le confort de lecture, limitez toujours la largeur des paragraphes :

```css
.texte { max-width: 65ch; }
```

Entre 50 et 75 caractères par ligne, l'œil retrouve facilement le début de la ligne suivante.

## Des images adaptées

Une photo de 3 000 px de large pèse lourd ; l'envoyer à un téléphone de 400 px de large gaspille des données et du temps. HTML permet de proposer **plusieurs tailles** et de laisser le navigateur choisir :

```html
<img
  src="images/devanture-800.jpg"
  srcset="images/devanture-400.jpg 400w,
          images/devanture-800.jpg 800w,
          images/devanture-1600.jpg 1600w"
  sizes="(min-width: 64rem) 50vw, 100vw"
  alt="La devanture bleue de la boulangerie"
  width="1600" height="1067"
  loading="lazy">
```

- `srcset` liste les fichiers disponibles et leur largeur réelle ;
- `sizes` indique la largeur à laquelle l'image sera affichée (ici, la moitié de l'écran sur grand écran, tout l'écran sinon) ;
- `loading="lazy"` diffère le chargement des images situées plus bas dans la page. **Ne l'utilisez pas** sur l'image principale visible dès l'arrivée : elle doit charger immédiatement.

Pour le format, privilégiez **WebP** ou **AVIF**, nettement plus légers que le JPEG à qualité égale, et pris en charge par tous les navigateurs actuels. L'outil Squoosh (squoosh.app) convertit et compresse en quelques secondes.

## Les cibles tactiles

Un doigt est moins précis qu'une souris. Sur mobile :

- les éléments cliquables doivent mesurer **au moins 44 × 44 px** (la norme d'accessibilité WCAG en demande au minimum 24 × 24) ;
- laissez de l'espace entre deux liens voisins ;
- n'utilisez pas le survol (`:hover`) pour révéler une information importante : il n'existe pas sur un écran tactile.

## Tester réellement

Le mode responsive de l'inspecteur (`Ctrl + Maj + M`) est un bon début, mais il ne remplace pas un **vrai téléphone**. Le rendu des polices, la barre d'adresse qui apparaît et disparaît, le clavier qui recouvre la moitié de l'écran quand on remplit un formulaire : tout ça ne se voit que sur l'appareil.

Pour tester votre site local sur votre téléphone, connectez les deux appareils au même réseau Wi-Fi ; Live Server affiche l'adresse réseau à utiliser (du type `http://192.168.1.12:5500`).

> **Exercice** Reprenez votre page et réécrivez son CSS en « mobile d'abord » : une colonne par défaut, puis enrichissez avec une ou deux requêtes `min-width`. Appliquez `clamp()` au `<h1>` et aux espacements de sections. Préparez l'image principale en trois tailles WebP avec `srcset`. Enfin, ouvrez la page sur votre propre téléphone et notez tout ce qui vous gêne : il y aura forcément quelque chose.

## Ce qu'il faut retenir

- La balise **viewport** est obligatoire ; ne bloquez jamais le zoom.
- **Mobile d'abord** : une colonne par défaut, des `min-width` pour enrichir.
- Des points de rupture **là où le contenu casse**, pas selon les modèles de téléphones.
- `clamp()` pour une typographie et des espacements fluides ; `max-width: 65ch` pour les textes.
- `srcset`, `sizes`, WebP/AVIF et `loading="lazy"` pour des images légères.
- Testez sur un **vrai téléphone**, toujours.
