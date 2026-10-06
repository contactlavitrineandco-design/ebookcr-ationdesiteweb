---
titre: "Atelier : la page d'accueil complète"
resume: "Assembler tout ce que vous avez appris dans une vraie page d'accueil de site vitrine, de la structure au menu mobile."
---

Dernier chapitre, et le plus important : on assemble. Vous allez construire, de A à Z, la page d'accueil d'un site vitrine professionnel. Le code est donné en entier, mais **ne le copiez pas** : lisez une section, fermez le livre, écrivez-la de mémoire, puis comparez. C'est la méthode la plus efficace pour transformer une lecture en compétence.

Le sujet : *Atelier Nord*, un artisan menuisier qui fabrique des cuisines et des bibliothèques sur mesure.

## L'arborescence du projet

```
atelier-nord/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── menu.js
└── images/
    ├── atelier-800.webp
    ├── atelier-1600.webp
    └── logo.svg
```

## 1. Les variables de la charte

On commence le CSS par des **propriétés personnalisées** (variables CSS). Toute la charte graphique est définie en un seul endroit :

```css
:root {
  --couleur-texte: #1d1b18;
  --couleur-fond: #faf7f2;
  --couleur-surface: #ffffff;
  --couleur-accent: #8a4b1f;
  --couleur-accent-fonce: #6b3814;
  --couleur-trait: #ddd5c8;

  --police-titres: Georgia, "Times New Roman", serif;
  --police-texte: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --rayon: 6px;
  --espace-section: clamp(3.5rem, 9vw, 7rem);
  --largeur-max: 72rem;
}
```

On les utilise ensuite avec `var()` : `color: var(--couleur-accent);`. Le jour où le client veut un vert sapin, une seule ligne change.

## 2. Le HTML complet

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Menuisier à Lille — cuisines et bibliothèques sur mesure | Atelier Nord</title>
  <meta name="description" content="Atelier Nord conçoit et fabrique à Lille des cuisines, bibliothèques et rangements sur mesure en bois massif. Devis gratuit, pose comprise.">
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a class="lien-evitement" href="#contenu">Aller au contenu</a>

  <header class="entete">
    <div class="conteneur entete__interieur">
      <a href="/" class="logo">
        <img src="images/logo.svg" alt="" width="32" height="32">
        Atelier Nord
      </a>
      <button class="menu-bouton" type="button" aria-expanded="false" aria-controls="menu">
        Menu
      </button>
      <nav aria-label="Navigation principale">
        <ul class="menu" id="menu">
          <li><a href="/" aria-current="page">Accueil</a></li>
          <li><a href="/realisations.html">Réalisations</a></li>
          <li><a href="/atelier.html">L'atelier</a></li>
          <li><a href="/contact.html" class="bouton">Demander un devis</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="contenu">
    <section class="accroche">
      <div class="conteneur accroche__grille">
        <div>
          <p class="surtitre">Menuiserie sur mesure · Lille et métropole</p>
          <h1>Des meubles qui tombent juste, au millimètre.</h1>
          <p class="chapeau">Cuisines, bibliothèques et rangements dessinés pour votre intérieur, fabriqués dans notre atelier en bois massif, posés par nos soins.</p>
          <div class="actions">
            <a href="/contact.html" class="bouton">Demander un devis gratuit</a>
            <a href="/realisations.html" class="lien-fleche">Voir nos réalisations</a>
          </div>
        </div>
        <img
          src="images/atelier-800.webp"
          srcset="images/atelier-800.webp 800w, images/atelier-1600.webp 1600w"
          sizes="(min-width: 56rem) 50vw, 100vw"
          alt="Bibliothèque en chêne massif installée autour d'une fenêtre"
          width="1600" height="1200">
      </div>
    </section>

    <section class="section" aria-labelledby="titre-offres">
      <div class="conteneur">
        <h2 id="titre-offres">Ce que nous fabriquons</h2>
        <div class="cartes">
          <article class="carte">
            <h3>Cuisines</h3>
            <p>Façades en bois massif, plans de travail sur mesure, conçus autour de votre façon de cuisiner.</p>
            <a href="/cuisines.html" class="lien-fleche">Découvrir nos cuisines</a>
          </article>
          <article class="carte">
            <h3>Bibliothèques</h3>
            <p>Sous un escalier, autour d'une porte, du sol au plafond : chaque centimètre est utilisé.</p>
            <a href="/bibliotheques.html" class="lien-fleche">Découvrir nos bibliothèques</a>
          </article>
          <article class="carte">
            <h3>Rangements</h3>
            <p>Dressings, placards sous combles, meubles d'entrée : du rangement qui ne ressemble pas à du rangement.</p>
            <a href="/rangements.html" class="lien-fleche">Découvrir nos rangements</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--sombre" aria-labelledby="titre-methode">
      <div class="conteneur">
        <h2 id="titre-methode">Comment ça se passe</h2>
        <ol class="etapes">
          <li><h3>Visite et mesures</h3><p>Nous venons chez vous, gratuitement, pour comprendre le besoin et relever les cotes.</p></li>
          <li><h3>Plans et devis</h3><p>Vous recevez des plans détaillés et un devis ferme sous dix jours.</p></li>
          <li><h3>Fabrication</h3><p>Tout est fabriqué dans notre atelier de Lille, en quatre à huit semaines.</p></li>
          <li><h3>Pose</h3><p>Nous posons et ajustons nous-mêmes. Vous n'avez rien à faire.</p></li>
        </ol>
      </div>
    </section>

    <section class="section" aria-labelledby="titre-avis">
      <div class="conteneur">
        <h2 id="titre-avis">Ils nous ont fait confiance</h2>
        <div class="cartes">
          <figure class="avis">
            <blockquote><p>Une cuisine parfaite, posée en deux jours sans une trace de poussière. On en parle encore.</p></blockquote>
            <figcaption>Hélène et Marc, Lambersart</figcaption>
          </figure>
          <figure class="avis">
            <blockquote><p>Ils ont trouvé une solution pour une bibliothèque que trois cuisinistes jugeaient impossible.</p></blockquote>
            <figcaption>Thomas, Lille Wazemmes</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section appel" aria-labelledby="titre-appel">
      <div class="conteneur">
        <h2 id="titre-appel">Un projet en tête ?</h2>
        <p>Décrivez-le en quelques lignes, nous vous rappelons sous 48 heures.</p>
        <a href="/contact.html" class="bouton">Demander un devis gratuit</a>
      </div>
    </section>
  </main>

  <footer class="pied">
    <div class="conteneur pied__grille">
      <address>
        <strong>Atelier Nord</strong><br>
        8 rue de l'Industrie, 59000 Lille<br>
        <a href="tel:+33320000000">03 20 00 00 00</a> ·
        <a href="mailto:contact@atelier-nord.fr">contact@atelier-nord.fr</a>
      </address>
      <ul class="pied__liens">
        <li><a href="/mentions-legales.html">Mentions légales</a></li>
        <li><a href="/confidentialite.html">Confidentialité</a></li>
      </ul>
    </div>
  </footer>

  <script src="js/menu.js" defer></script>
</body>
</html>
```

Relisez-le en repérant tout ce que vous avez appris : `lang`, `viewport`, `title` et `description` soignés, lien d'évitement, structure sémantique, `aria-current`, `aria-labelledby` qui nomme chaque section, `srcset`, `alt` utiles et vides, `<address>`, liens `tel:` et `mailto:`.

## 3. Le CSS

```css
/* Base */
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: var(--police-texte);
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--couleur-texte);
  background: var(--couleur-fond);
}
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { font-family: var(--police-titres); font-weight: 400; line-height: 1.12; margin: 0 0 0.6em; }
h1 { font-size: clamp(2.25rem, 1.4rem + 4vw, 4rem); }
h2 { font-size: clamp(1.75rem, 1.3rem + 2vw, 2.6rem); }
h3 { font-size: 1.35rem; }
p { margin: 0 0 1em; }
a { color: var(--couleur-accent); }
:focus-visible { outline: 3px solid var(--couleur-accent); outline-offset: 3px; }

.conteneur { max-width: var(--largeur-max); margin-inline: auto; padding-inline: 1.25rem; }

.lien-evitement:not(:focus) {
  position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%);
}

/* Boutons et liens d'action */
.bouton {
  display: inline-block;
  padding: 0.85rem 1.4rem;
  background: var(--couleur-accent);
  color: #fff;
  text-decoration: none;
  border-radius: var(--rayon);
  font-weight: 600;
}
.bouton:hover { background: var(--couleur-accent-fonce); }
.lien-fleche { font-weight: 600; }
.lien-fleche::after { content: " →"; }

/* En-tête */
.entete { border-bottom: 1px solid var(--couleur-trait); background: var(--couleur-fond); }
.entete__interieur { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; padding-block: 1rem; }
.logo { display: flex; align-items: center; gap: 0.6rem; font-family: var(--police-titres); font-size: 1.4rem; color: inherit; text-decoration: none; }
.menu-bouton { font: inherit; padding: 0.6rem 1rem; border: 2px solid currentColor; border-radius: var(--rayon); background: none; cursor: pointer; }
.menu { display: none; list-style: none; margin: 0; padding: 0; }
.menu.est-ouvert { display: grid; gap: 0.75rem; width: 100%; padding-block: 1rem; }
.entete nav { width: 100%; }
.menu a:not(.bouton) { color: inherit; text-decoration: none; }
.menu a[aria-current="page"] { text-decoration: underline; text-underline-offset: 0.3em; }

/* Sections */
.section { padding-block: var(--espace-section); }
.section--sombre { background: var(--couleur-texte); color: var(--couleur-fond); }
.accroche { padding-block: clamp(2.5rem, 7vw, 6rem); }
.accroche__grille { display: grid; gap: 2.5rem; align-items: center; }
.accroche img { border-radius: var(--rayon); }
.surtitre { text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.85rem; color: var(--couleur-accent); font-weight: 600; }
.chapeau { font-size: 1.2rem; max-width: 34em; }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.75rem; margin-top: 1.75rem; }

.cartes { display: grid; grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr)); gap: 1.5rem; }
.carte { display: flex; flex-direction: column; background: var(--couleur-surface); border: 1px solid var(--couleur-trait); border-radius: var(--rayon); padding: 1.75rem; }
.carte .lien-fleche { margin-top: auto; }

.etapes { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 2rem; counter-reset: etape; }
.etapes li { counter-increment: etape; border-top: 1px solid rgba(255, 255, 255, 0.25); padding-top: 1.25rem; }
.etapes li::before { content: "0" counter(etape); font-family: var(--police-titres); font-size: 2rem; color: #e0a072; }

.avis { margin: 0; padding: 1.75rem; background: var(--couleur-surface); border-left: 4px solid var(--couleur-accent); }
.avis blockquote { margin: 0 0 1rem; font-family: var(--police-titres); font-size: 1.25rem; }
.avis figcaption { color: #5c5650; font-size: 0.95rem; }

.appel { text-align: center; }
.appel p { margin-inline: auto; max-width: 30em; }

/* Pied de page */
.pied { border-top: 1px solid var(--couleur-trait); padding-block: 2.5rem; font-size: 0.95rem; }
.pied__grille { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1.5rem; }
.pied address { font-style: normal; }
.pied__liens { list-style: none; padding: 0; margin: 0; display: flex; gap: 1.5rem; }

/* Écrans larges */
@media (min-width: 56rem) {
  .menu-bouton { display: none; }
  .entete nav { width: auto; }
  .menu, .menu.est-ouvert { display: flex; align-items: center; gap: 2rem; width: auto; padding: 0; }
  .accroche__grille { grid-template-columns: 1.1fr 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

## 4. Le JavaScript du menu

Douze lignes, pas une de plus :

```js
const bouton = document.querySelector(".menu-bouton");
const menu = document.getElementById("menu");

bouton.addEventListener("click", () => {
  const ouvert = bouton.getAttribute("aria-expanded") === "true";
  bouton.setAttribute("aria-expanded", String(!ouvert));
  menu.classList.toggle("est-ouvert", !ouvert);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("est-ouvert")) {
    bouton.setAttribute("aria-expanded", "false");
    menu.classList.remove("est-ouvert");
    bouton.focus();
  }
});
```

`aria-expanded` informe les lecteurs d'écran de l'état du menu ; la touche Échap le referme et ramène le focus sur le bouton.

> **Le piège** Si le JavaScript ne se charge pas (erreur réseau, extension de blocage), ce menu reste fermé sur mobile. Pour une robustesse maximale, une variante consiste à afficher le menu par défaut et à ne le masquer que lorsque le script ajoute une classe `js` sur `<html>`. C'est le principe de l'**amélioration progressive** : le site fonctionne toujours, et JavaScript l'améliore quand il est là.

## 5. La recette avant de dire « terminé »

Un site n'est pas fini quand il est beau sur votre écran. Déroulez cette liste :

- [ ] Validateur W3C : zéro erreur.
- [ ] Navigation complète au clavier, focus toujours visible.
- [ ] Testé sur Firefox, Chrome, Safari, et sur un vrai téléphone.
- [ ] Lighthouse : 90 ou plus en Performance, Accessibilité, Bonnes pratiques et SEO.
- [ ] Contrastes vérifiés.
- [ ] Toutes les images ont un `alt` approprié et sont compressées.
- [ ] Chaque page a un `<title>` et une `meta description` uniques.
- [ ] Aucune faute d'orthographe dans les textes.
- [ ] Liens `tel:` et `mailto:` testés.

> **Exercice** Réalisez cette page en entier, puis **adaptez-la** à l'entreprise que vous avez choisie dans « Les fondations du web » : autres textes, autres couleurs, une section en plus ou en moins. Ajoutez la page `contact.html` avec le formulaire du chapitre précédent, en réutilisant l'en-tête et le pied de page. Passez la recette complète. Ce projet sera la première pièce de votre portfolio.

## Ce que vous savez faire maintenant

Vous savez écrire une page web complète, sémantique, accessible et responsive, sans dépendre d'aucun outil. C'est une compétence que beaucoup de personnes qui « font des sites » n'ont pas. Elle vous servira partout : pour corriger un thème WordPress, pour juger le code produit par un outil, pour comprendre pourquoi une mise en page casse.

La suite logique : « WordPress sans bricolage » pour produire des sites que vos clients modifieront eux-mêmes, et « Design & ergonomie » pour que vos pages soient aussi belles que bien construites.
