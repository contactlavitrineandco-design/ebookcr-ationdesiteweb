---
titre: "Grilles, espacements et hiérarchie"
resume: "L'espace vide est un matériau. Une échelle d'espacements, une grille d'alignement et quelques lois de perception suffisent à ordonner n'importe quelle page."
---

Si la typographie représente l'essentiel de ce qu'on voit sur un site, l'**espace** représente l'essentiel de ce qui le rend lisible. Les débutants ont peur du vide et remplissent ; les professionnels savent que le vide **organise**. Ce chapitre vous donne les outils pour maîtriser l'espace sans hésiter.

## Une échelle d'espacements

Comme pour la typographie, on ne choisit pas les espacements au cas par cas. On définit une **échelle**, et on n'en sort jamais.

Une échelle classique, fondée sur des multiples de 4 ou de 8 pixels :

| Nom | Valeur | Usage typique |
|---|---|---|
| `--esp-1` | 4 px | Écart entre une icône et son texte |
| `--esp-2` | 8 px | Écart entre un label et son champ |
| `--esp-3` | 16 px | Écart entre deux paragraphes, padding d'un petit bouton |
| `--esp-4` | 24 px | Padding d'une carte, écart entre éléments d'une liste |
| `--esp-5` | 32 px | Écart entre une carte et la suivante |
| `--esp-6` | 48 px | Écart entre un titre de section et son contenu |
| `--esp-7` | 64 px | — |
| `--esp-8` | 96 px | Écart entre deux sections de page |

Remarquez que les écarts **grandissent** avec la taille des éléments. Entre deux mots, quelques pixels ; entre deux sections, une centaine. Cette progression n'est pas arbitraire, elle découle de la loi qui suit.

> **À retenir** Quand vous hésitez entre deux valeurs, prenez la plus grande. Le défaut le plus courant des sites amateurs n'est jamais « trop d'espace », c'est presque toujours « pas assez ».

## La loi de proximité

Notre cerveau regroupe automatiquement les éléments **proches** les uns des autres et sépare ceux qui sont éloignés. C'est l'une des **lois de la Gestalt**, issues de la psychologie de la perception, et c'est la plus utile en design web.

Conséquence directe : **l'espace entre deux éléments exprime leur relation**.

- Un titre doit être **plus proche** du texte qu'il introduit que du bloc qui le précède. Sinon, il semble flotter entre deux sections, ou appartenir à la précédente.
- Le label d'un champ doit être plus proche de **son** champ que du champ précédent.
- La légende d'une image doit coller à l'image.

C'est une erreur extrêmement fréquente : des marges identiques au-dessus et au-dessous des titres. Corrigez-la (moins d'espace en dessous qu'au-dessus) et la page devient immédiatement plus lisible.

## Les autres lois utiles

- **Similarité** : des éléments qui se ressemblent (même couleur, même forme) sont perçus comme ayant la même fonction. D'où l'importance que tous les liens se ressemblent, et que rien d'autre ne leur ressemble.
- **Région commune** : des éléments placés dans un même cadre (une carte, un fond coloré) sont perçus comme un groupe. Utile, mais n'encadrez pas tout : l'espace suffit souvent.
- **Continuité** : l'œil suit les alignements. Des éléments alignés sur une même ligne sont lus comme une suite.

## La grille

Une **grille** est un ensemble de colonnes invisibles sur lesquelles s'alignent tous les éléments de la page. Elle donne une impression d'ordre, même quand le visiteur ne la perçoit pas consciemment.

Pour un site vitrine :

- une **largeur maximale de contenu** : entre 1 100 et 1 300 px pour la mise en page, environ 65 caractères pour les textes longs ;
- une grille de **12 colonnes** sur grand écran (elle se divise en 2, 3, 4 et 6, ce qui permet toutes les dispositions courantes), qui se réduit à 4 ou 6 colonnes sur tablette et à une seule sur mobile ;
- des **gouttières** (espaces entre colonnes) constantes, tirées de votre échelle d'espacements (24 ou 32 px) ;
- des **marges latérales** d'au moins 16 à 20 px sur mobile : le texte ne doit jamais toucher le bord de l'écran.

La règle d'or : **tout s'aligne sur quelque chose**. Le bord gauche d'un titre, d'une image et d'un bouton dans une même section doivent tomber sur la même ligne. Un décalage de quelques pixels suffit à donner une impression de négligence, même si personne ne saurait dire pourquoi.

## La hiérarchie visuelle

La hiérarchie, c'est l'**ordre dans lequel l'œil parcourt la page**. Vous la contrôlez avec six leviers :

| Levier | Plus important = |
|---|---|
| Taille | plus grand |
| Graisse | plus gras |
| Couleur | plus contrasté, ou de la couleur d'accent |
| Position | plus haut, plus à gauche (pour un lecteur de langue occidentale) |
| Espace | plus isolé, entouré de plus de vide |
| Densité | moins d'éléments autour |

Pour chaque section, décidez **un seul** élément principal. Puis organisez le reste en deux ou trois niveaux au maximum. Si tout crie, rien n'est entendu.

### Les parcours de lecture

Sur une page de texte, l'œil balaye souvent selon un motif en **F** : la première ligne en entier, puis une partie de la suivante, puis il descend le long du bord gauche. Conséquences :

- les **premiers mots** des titres, des paragraphes et des éléments de liste portent l'essentiel de l'information : mettez-y les mots importants ;
- le **bord gauche** est la zone la plus lue : c'est là que vont les intertitres et les points d'entrée.

Sur une page d'accueil plus visuelle, l'œil suit plutôt un motif en **Z** : du logo en haut à gauche vers l'action en haut à droite, puis en diagonale vers le contenu, puis à nouveau de gauche à droite. C'est pour cela que le bouton d'action principal se place souvent en haut à droite et à la fin de l'accroche.

## Le rythme vertical

Une page se lit comme une partition : les sections doivent avoir un **rythme**. Quelques techniques simples :

- **alterner** les dispositions : texte à gauche et image à droite, puis l'inverse, puis une grille de cartes, puis un bandeau pleine largeur ;
- **alterner** les fonds : fond principal, fond légèrement teinté, fond sombre pour une section forte ;
- garder des **espacements identiques** entre toutes les sections, pour que les variations de contenu se lisent comme des variations voulues.

> **Exercice** Imprimez (ou faites une capture d'écran de) la page d'accueil que vous avez construite. Avec un feutre, tracez les alignements verticaux : combien de lignes différentes ? Visez-en le moins possible. Entourez l'élément principal de chaque section : y en a-t-il un seul ? Vérifiez enfin que chaque titre est plus proche de son contenu que de la section précédente. Corrigez votre CSS en n'utilisant que les valeurs de votre échelle d'espacements.

## Ce qu'il faut retenir

- Une **échelle d'espacements** (multiples de 4 ou 8), et rien en dehors. Dans le doute, plus d'espace.
- **Loi de proximité** : l'espace exprime les relations. Un titre colle à son contenu.
- Une **grille** et des **alignements** stricts : tout s'aligne sur quelque chose.
- La **hiérarchie** se règle avec la taille, la graisse, la couleur, la position, l'espace et la densité. **Un** élément principal par section.
- Les mots importants **en début** de ligne ; un **rythme** régulier entre les sections.
