---
titre: "Couleurs et contrastes"
resume: "Construire une palette restreinte où chaque couleur a un rôle, respecter les contrastes d'accessibilité, et éviter les associations qui fatiguent."
---

La couleur est l'outil le plus visible du design, et donc le plus dangereux. Une mauvaise palette peut rendre un site illisible, criard ou triste ; une bonne passe presque inaperçue, parce qu'elle fait simplement son travail : **guider l'œil**.

## Le principe : un rôle par couleur

Une palette web n'est pas une collection de couleurs qu'on aime. C'est un ensemble de **rôles**, chacun tenu par une couleur :

| Rôle | Description | Nombre |
|---|---|---|
| **Fond** | La couleur dominante, celle de la page | 1, parfois 2 (fond principal et fond alterné) |
| **Texte** | Le texte courant et les titres | 1, plus une variante atténuée |
| **Accent** | Les actions : boutons, liens, éléments à remarquer | 1 |
| **Neutres** | Bordures, séparateurs, fonds de cartes, textes secondaires | 3 à 5 nuances de gris |
| **États** | Erreur, succès, avertissement, information | 3 ou 4, utilisés seulement quand c'est nécessaire |

Total : une dizaine de valeurs, dont **une seule vraie couleur** (l'accent). C'est peu, et c'est voulu.

### La règle 60-30-10

Une règle empruntée à la décoration intérieure aide à doser :

- **60 %** de la surface pour la couleur dominante (le fond) ;
- **30 %** pour la couleur secondaire (le texte, les blocs sombres) ;
- **10 %** pour l'accent.

L'accent n'est efficace que parce qu'il est **rare**. Si le bouton « Demander un devis » est de la même couleur que les titres, les icônes et le pied de page, il ne ressort plus.

## Choisir les couleurs

### Partir de l'existant

Le client a souvent un logo, une devanture, des documents imprimés. Partez de là : la couleur d'accent du site est généralement **la couleur principale de l'identité**. Récupérez sa valeur exacte (dans le fichier du logo, ou avec la pipette d'un outil de dessin).

### Les fonds : rarement blanc pur, rarement noir pur

Un blanc légèrement teinté (`#faf8f5`, crème ; `#f7f9fa`, bleuté) est plus doux à l'œil que le blanc pur et donne une atmosphère. De même, un texte gris très foncé (`#1d1d1f`) est plus agréable qu'un noir absolu sur un écran. La différence est subtile, mais elle fait partie de ce qui distingue un site travaillé.

### Les neutres, teintés de l'accent

Une astuce de designer : plutôt que des gris purs, utilisez des gris **légèrement teintés** par la couleur d'accent (ou par sa complémentaire). Un site à accent brique aura des gris chauds ; un site à accent bleu, des gris froids. L'ensemble paraît immédiatement plus harmonieux.

### Raisonner en teinte, saturation, luminosité

Le format **HSL** (teinte, saturation, luminosité) est bien plus intuitif que l'hexadécimal pour construire une palette :

```css
:root {
  --accent: hsl(18 70% 40%);         /* brique */
  --accent-fonce: hsl(18 70% 30%);   /* même teinte, plus sombre : survol */
  --accent-clair: hsl(18 70% 94%);   /* même teinte, très clair : fond d'encart */
  --gris-900: hsl(30 10% 12%);       /* texte */
  --gris-600: hsl(30 6% 40%);        /* texte secondaire */
  --gris-200: hsl(30 15% 86%);       /* bordures */
  --fond: hsl(36 40% 97%);           /* fond crème */
}
```

En gardant la même teinte et en ne variant que la luminosité, on obtient des déclinaisons cohérentes de l'accent sans effort. Les navigateurs récents comprennent aussi l'espace colorimétrique **OKLCH**, qui donne des dégradés de luminosité encore plus réguliers à l'œil ; HSL suffit largement pour démarrer.

## Les contrastes : non négociables

Vous les avez vus dans « HTML & CSS, à la main », rappelons-les car c'est ici qu'ils se décident :

| Élément | Contraste minimal (WCAG niveau AA) |
|---|---|
| Texte courant | **4,5 : 1** |
| Grand texte (≥ 24 px, ou ≥ 18,66 px en gras) | **3 : 1** |
| Composants d'interface et graphiques utiles | **3 : 1** |

Concrètement :

- un texte gris clair sur fond blanc (`#999` sur `#fff`) **échoue** : environ 2,8 : 1 ;
- `#767676` sur blanc est à peu près la limite du texte courant ;
- un bouton blanc sur un jaune vif ou un vert clair **échoue** presque toujours : il faut alors un texte foncé sur le bouton, ou un accent plus sombre.

Vérifiez **chaque** combinaison texte/fond de votre palette avec un outil de contraste, et notez les combinaisons autorisées. Une palette n'est validée que lorsque toutes ses associations courantes passent.

> **Le piège** La maquette est validée sur l'écran calibré du designer, en intérieur. Le site est consulté sur un téléphone à mi-luminosité, en plein soleil, par quelqu'un de 65 ans. Le gris « élégant » devient invisible. Les seuils de contraste ne sont pas une contrainte esthétique : ce sont des conditions de lisibilité réelle.

## Ne jamais communiquer par la couleur seule

Environ 8 % des hommes et 0,5 % des femmes ont une forme de daltonisme. Une information portée **uniquement** par la couleur leur échappe :

- un champ en erreur signalé seulement par une bordure rouge → ajoutez un message et une icône ;
- un lien distingué seulement par sa couleur au milieu d'un paragraphe → gardez le soulignement ;
- un graphique à courbes rouge et verte → ajoutez des motifs ou des étiquettes.

Les outils de développement de Chrome et Firefox permettent de **simuler** différentes formes de daltonisme : utilisez-les sur vos maquettes.

## Le mode sombre

De nombreux visiteurs ont activé le mode sombre de leur système. Un site peut s'y adapter avec la requête `prefers-color-scheme: dark`. Ce n'est pas obligatoire pour un site vitrine, mais si vous le proposez :

- ne vous contentez pas d'inverser les couleurs : réduisez la saturation de l'accent, qui « brûle » sur fond sombre ;
- évitez le noir pur (`#000`) comme fond, préférez un gris très foncé ;
- revérifiez **tous** les contrastes.

## Les images font partie de la palette

Une photo très colorée à côté d'un accent vif crée un conflit. Quelques pistes pour harmoniser :

- choisir des photos dont les tons s'accordent avec la palette (ou l'inverse : construire la palette à partir des photos du client) ;
- appliquer un même traitement à toutes les images (légère désaturation, même chaleur) ;
- utiliser les fonds colorés de la palette derrière les images détourées ou les illustrations.

> **Exercice** Construisez la palette de votre entreprise d'entraînement en HSL : un fond, une variante de fond, une couleur de texte, une variante atténuée, un accent avec ses versions foncée et claire, trois gris teintés, et une couleur d'erreur. Testez chaque association texte/fond utile avec un outil de contraste et notez les ratios dans un tableau. Appliquez la palette à votre page, puis utilisez le simulateur de daltonisme des outils de développement pour vérifier qu'aucune information ne se perd.

## Ce qu'il faut retenir

- Une palette, ce sont des **rôles** : fond, texte, accent, neutres, états.
- **Une seule** vraie couleur d'accent, réservée aux actions : 60-30-10.
- Fonds et textes rarement purs ; **gris teintés** par l'accent ; raisonnez en **HSL**.
- Contraste **4,5 : 1** pour le texte, **3 : 1** pour les grands textes et l'interface. Vérifiez tout.
- **Jamais d'information portée par la couleur seule.**
