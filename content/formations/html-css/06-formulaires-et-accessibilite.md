---
titre: "Formulaires et accessibilité"
resume: "Construire un formulaire de contact correct, et appliquer les règles d'accessibilité qui comptent vraiment."
---

Le formulaire de contact est souvent le seul élément interactif d'un site vitrine, et c'est aussi celui qui concentre le plus d'erreurs. Ce chapitre vous apprend à en construire un correctement, puis élargit à l'**accessibilité** en général : le fait qu'un site soit utilisable par tout le monde, y compris les personnes en situation de handicap.

L'accessibilité n'est pas un supplément. Environ une personne sur cinq vit avec une forme de handicap, permanente ou temporaire, et chacun d'entre nous a un jour un bras dans le plâtre, un écran en plein soleil ou une connexion lente. En France, elle est en outre une **obligation légale** pour de nombreux sites, que nous détaillerons dans « Mettre en ligne et faire durer ».

## Un formulaire de contact complet

```html
<form action="/merci.html" method="post" class="formulaire">
  <div class="champ">
    <label for="nom">Votre nom</label>
    <input id="nom" name="nom" type="text" autocomplete="name" required>
  </div>

  <div class="champ">
    <label for="email">Votre adresse e-mail</label>
    <input id="email" name="email" type="email" autocomplete="email" required
           aria-describedby="email-aide">
    <p id="email-aide" class="aide">Nous ne l'utiliserons que pour vous répondre.</p>
  </div>

  <div class="champ">
    <label for="telephone">Téléphone <span class="facultatif">(facultatif)</span></label>
    <input id="telephone" name="telephone" type="tel" autocomplete="tel">
  </div>

  <fieldset class="champ">
    <legend>Votre demande concerne</legend>
    <label><input type="radio" name="sujet" value="commande" checked> Une commande</label>
    <label><input type="radio" name="sujet" value="information"> Une information</label>
  </fieldset>

  <div class="champ">
    <label for="message">Votre message</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>

  <p class="mention">
    Les informations saisies servent uniquement à répondre à votre demande.
    <a href="/confidentialite.html">En savoir plus sur vos données</a>.
  </p>

  <button type="submit">Envoyer le message</button>
</form>
```

### Ce qui fait la différence

**Chaque champ a un `<label>` relié.** L'attribut `for` du label correspond à l'`id` du champ. Résultat : un clic sur le texte active le champ (pratique sur mobile), et les lecteurs d'écran annoncent « Votre nom, zone de saisie, obligatoire ». Un `placeholder` (texte gris dans le champ) **ne remplace jamais** un label : il disparaît dès qu'on tape, et son contraste est souvent insuffisant.

**Le bon type de champ.** `type="email"` affiche un clavier avec `@` sur mobile et vérifie le format ; `type="tel"` affiche un pavé numérique. Il existe aussi `url`, `number`, `date`, `search`.

**`autocomplete`.** Il permet au navigateur de remplir automatiquement les champs connus. Un formulaire rempli en deux secondes est un formulaire envoyé.

**`required`.** Le navigateur refuse l'envoi tant que le champ est vide, et l'annonce. Indiquez aussi visuellement les champs facultatifs (ou obligatoires) : il est plus simple de marquer la minorité.

**`<fieldset>` et `<legend>`.** Ils regroupent des choix liés, comme des boutons radio, et donnent la question à laquelle ils répondent.

**La mention d'information.** Dès qu'un formulaire collecte des données personnelles, le RGPD impose d'informer la personne : à quoi servent les données et où en savoir plus. Une ligne suffit, avec un lien vers la politique de confidentialité.

## Où partent les données ?

Un formulaire HTML, à lui seul, ne sait pas envoyer d'e-mail. L'attribut `action` désigne l'adresse qui **recevra** les données ; il faut quelque chose de l'autre côté pour les traiter. Sur un site statique, trois options :

1. un **service de formulaires** tiers, qui reçoit les données et vous les transmet par e-mail (vérifiez qu'il héberge les données en Europe, ou qu'il est conforme au RGPD) ;
2. la fonction de formulaires intégrée à certains **hébergeurs statiques** ;
3. un petit **script serveur** (en PHP sur un hébergement mutualisé, par exemple).

Sur WordPress, une extension de formulaires s'en charge ; nous verrons laquelle choisir.

> **Attention** Tout formulaire public reçoit du spam automatisé. Prévoyez une protection : un champ piège invisible (*honeypot*), un délai minimum de remplissage, ou une solution anti-robots respectueuse de la vie privée. Évitez les dispositifs qui déposent des traceurs publicitaires sans consentement.

## Mettre en forme le formulaire

```css
.formulaire { display: grid; gap: 1.25rem; max-width: 36rem; }
.champ label { display: block; font-weight: 600; margin-bottom: 0.35rem; }
.formulaire input,
.formulaire textarea {
  width: 100%;
  font: inherit;               /* sinon, police système minuscule */
  padding: 0.75rem;
  border: 2px solid #8a8a8a;   /* contraste suffisant avec le fond */
  border-radius: 6px;
}
.formulaire input:focus-visible,
.formulaire textarea:focus-visible {
  outline: 3px solid #9c3d12;
  outline-offset: 2px;
}
.aide { font-size: 0.9rem; color: #555; margin: 0.35rem 0 0; }
fieldset { border: 0; padding: 0; margin: 0; }
```

Remarquez `font: inherit` : par défaut, les champs n'héritent pas de la police de la page. Et `font-size` d'au moins 16 px dans les champs : en dessous, Safari sur iPhone zoome automatiquement sur le champ, ce qui désoriente l'utilisateur.

## Les règles d'accessibilité qui comptent le plus

Les référentiels officiels (WCAG au niveau international, RGAA en France) comptent des dizaines de critères. Voici ceux qui couvrent l'essentiel des problèmes rencontrés sur les sites vitrines.

### 1. Le clavier

Débranchez votre souris (ou ne la touchez plus) et parcourez votre site avec `Tab`, `Maj + Tab`, `Entrée` et `Espace`. Vous devez pouvoir **tout atteindre et tout activer**, dans un ordre logique, en voyant **toujours** où vous êtes.

Ce dernier point est crucial : ne supprimez jamais le contour de focus (`outline: none`) sans le remplacer par un indicateur visible. Utilisez `:focus-visible`, qui ne s'affiche que lors d'une navigation au clavier.

### 2. Les contrastes

Le texte doit se détacher suffisamment de son fond. Les seuils minimaux (niveau AA) :

| Élément | Rapport de contraste minimal |
|---|---|
| Texte courant | 4,5 : 1 |
| Grand texte (24 px, ou 18,66 px en gras) | 3 : 1 |
| Éléments d'interface (bordures de champs, icônes utiles) | 3 : 1 |

Le gris clair sur blanc, si élégant sur une maquette, échoue presque toujours. Vérifiez avec le *WebAIM Contrast Checker* ou directement dans l'inspecteur, qui affiche le rapport de contraste quand on clique sur une couleur.

### 3. L'information ne repose jamais sur la couleur seule

« Les champs en rouge sont obligatoires » : inutilisable pour un daltonien (environ 8 % des hommes). Ajoutez toujours un texte, une icône ou un motif.

### 4. Les textes alternatifs

Revus au premier chapitre : un `alt` qui décrit l'**apport** de l'image, vide pour une image décorative. Une icône seule dans un lien ou un bouton doit avoir un nom accessible :

```html
<a href="https://instagram.com/boulangeriemartin" aria-label="Instagram de la boulangerie">
  <svg aria-hidden="true">…</svg>
</a>
```

### 5. Le cacher visuellement, mais pas aux lecteurs d'écran

Il arrive qu'on veuille un texte lu par les lecteurs d'écran mais invisible à l'écran (comme le lien d'évitement au repos). La classe utilitaire classique :

```css
.visuellement-cache:not(:focus):not(:active) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

Appliquée au lien d'évitement, elle le cache au repos et le révèle quand il reçoit le focus clavier.

### 6. Les animations

Certaines personnes souffrent de troubles vestibulaires que les animations peuvent déclencher. Respectez leur réglage système :

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 7. ARIA, avec modération

Les attributs `aria-*` permettent de donner des informations supplémentaires aux technologies d'assistance. Ils sont utiles (`aria-label`, `aria-expanded`, `aria-describedby`, `aria-current="page"`), mais la première règle d'ARIA est… de ne pas l'utiliser quand un élément HTML natif fait l'affaire. Un `<button>` vaut mieux qu'une `<div role="button">`.

> **Exercice** Ajoutez le formulaire de contact à votre page `contact.html`. Puis faites l'audit suivant : (1) parcourez tout le site au clavier, sans souris ; (2) vérifiez trois contrastes de texte avec l'inspecteur ; (3) lancez l'audit *Lighthouse* (onglet du même nom dans Chrome) en cochant *Accessibility* ; (4) si vous êtes sur Mac, activez VoiceOver (`Cmd + F5`) et écoutez votre page d'accueil ; sur Windows, installez le lecteur d'écran gratuit NVDA. Corrigez tout ce qui ressort.

## Ce qu'il faut retenir

- Chaque champ a un **`<label>` relié** ; le placeholder ne le remplace jamais.
- Bon **type** de champ, **`autocomplete`**, **`required`**, **mention RGPD**, protection anti-spam.
- Un site doit être **entièrement utilisable au clavier**, avec un focus toujours visible.
- **Contraste** de 4,5 : 1 minimum pour le texte ; jamais d'information portée par la couleur seule.
- HTML natif d'abord, **ARIA** seulement en complément.
