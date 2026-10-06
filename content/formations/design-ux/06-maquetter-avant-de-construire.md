---
titre: "Maquetter avant de construire"
resume: "Du croquis papier à la maquette haute fidélité : pourquoi maquetter, avec quels outils, et comment présenter son travail."
---

Construire directement un site dans WordPress ou en code, sans maquette, c'est comme bâtir une maison sans plan : possible pour un abri de jardin, risqué pour tout le reste. La **maquette** permet de prendre les décisions de structure et de design quand elles ne coûtent presque rien à changer, c'est-à-dire **avant** d'avoir écrit une ligne de code.

## Les trois niveaux de maquette

### 1. Le croquis (papier, 15 minutes)

Un crayon, une feuille, des rectangles. On dessine la structure des pages principales : où va le titre, où vont les blocs, quelle est la place de l'image, où est le bouton. Aucune couleur, aucun texte définitif.

C'est l'étape la plus rentable de tout le projet. En un quart d'heure, on explore trois ou quatre dispositions différentes, et on élimine les mauvaises idées sans aucun regret.

### 2. Le wireframe (fil de fer, quelques heures)

Une version numérique, en noir, blanc et gris, des pages principales, avec les **vrais contenus** ou des textes proches. Le wireframe fixe :

- l'**arborescence** et la navigation ;
- la **structure** de chaque page type : l'ordre et la nature des sections ;
- la **hiérarchie** des informations ;
- les **appels à l'action**.

Pourquoi en gris ? Pour que la discussion porte sur la structure et le contenu, pas sur la couleur du bouton. Si vous montrez une version colorée trop tôt, le client ne commentera que les couleurs.

### 3. La maquette (haute fidélité)

La version qui ressemble au site final : typographie, couleurs, images, espacements. Elle sert à **valider le design** avant la construction.

Pour un site vitrine, maquettez en haute fidélité :

- la **page d'accueil**, en version ordinateur **et** mobile ;
- **une page de contenu type** (page de service) ;
- la **page de contact** avec son formulaire ;
- les **composants** : boutons et leurs états (normal, survol, focus), champs, cartes.

Inutile de maquetter toutes les pages : les autres se construisent avec le système.

## Les outils

**Figma** est aujourd'hui l'outil de référence en design d'interface. Il fonctionne dans le navigateur, propose une offre gratuite suffisante pour démarrer, et permet de partager une maquette avec un simple lien. Des alternatives existent, dont **Penpot**, un logiciel libre qui peut être auto-hébergé.

Quel que soit l'outil, quatre fonctions comptent vraiment :

- les **cadres** (*frames*) aux dimensions d'écran (1440 px pour un ordinateur, 390 px pour un mobile, par exemple) ;
- les **grilles de mise en page** : appliquez votre grille de colonnes à chaque cadre ;
- la **mise en page automatique** (*auto layout* dans Figma) : l'équivalent visuel de Flexbox. Les éléments s'empilent avec un espacement défini et s'adaptent à leur contenu. Si vous avez compris Flexbox, vous la comprendrez en cinq minutes ;
- les **styles et composants** : couleurs, styles de texte et éléments réutilisables, définis une fois et utilisés partout. C'est votre système de design, dans l'outil.

> **À retenir** Construisez la maquette avec les mêmes valeurs que le futur site : votre échelle typographique, votre palette, votre échelle d'espacements. Une maquette dessinée « à l'œil » se transforme en semaines d'ajustements au moment de l'intégration.

## Le système de design, en pratique

Avant la première page, créez dans votre outil une page « Système » qui contient :

1. **Les couleurs**, nommées par rôle (Fond, Texte, Accent…), avec leurs valeurs et les ratios de contraste vérifiés.
2. **Les styles de texte** : Titre 1, Titre 2, Titre 3, Texte, Petit texte, Bouton… avec police, taille, graisse et interlignage.
3. **L'échelle d'espacements**, sous forme de petits carrés de chaque taille.
4. **Les composants** : bouton principal, bouton secondaire, lien, champ, carte, avec leurs états.

Cette page est ensuite **la référence** pour l'intégration. Elle se traduit presque ligne à ligne en variables CSS ou en styles globaux WordPress.

## Les contenus dans la maquette

Rappel des « Fondations du web » : **le contenu d'abord**. Une maquette pleine de faux texte ment :

- les vrais titres sont plus longs (ou plus courts) que prévu ;
- les vraies photos n'ont pas le cadrage parfait de la banque d'images ;
- un service a trois lignes de description, un autre en a quinze.

Utilisez au maximum les **vrais textes** du client, même provisoires. Et testez les cas limites : le titre le plus long, la carte avec le plus de texte, le nom de l'entreprise sur mobile.

## Les images

Si le client n'a pas de photos, c'est **le moment** de le dire, pas la veille de la mise en ligne. Les options, dans l'ordre de préférence :

1. **Un photographe professionnel** pour une demi-journée : c'est souvent le meilleur investissement du projet.
2. Des **photos du client**, avec quelques conseils de prise de vue (lumière naturelle, cadrage, appareil tenu horizontalement).
3. Des **banques d'images**, en choisissant des images cohérentes entre elles et en vérifiant les licences.
4. Des **illustrations** ou une approche typographique, sans photos.

Évitez les images générées pour représenter des personnes ou des lieux présentés comme réels (l'équipe, l'atelier, des réalisations) : ce serait tromper le visiteur.

## Présenter son travail

La manière de présenter une maquette influence fortement les retours.

- **Rappelez les objectifs** avant de montrer quoi que ce soit : « L'objectif de l'accueil est de… Le visiteur type est… »
- **Présentez dans le contexte** : la maquette mobile sur un vrai téléphone, l'ordinateur en plein écran, et non une miniature dans un e-mail.
- **Justifiez les choix** par les objectifs et les règles : « Le bouton est de la couleur d'accent parce que c'est l'action principale », plutôt que « je trouvais ça joli ».
- **Posez des questions précises** : « Les trois services sont-ils dans le bon ordre de priorité ? » plutôt que « Ça vous plaît ? ».
- **Limitez les allers-retours** : convenez à l'avance du nombre de séries de modifications incluses (le livre « Du savoir-faire au métier » y revient).

> **Exercice** Pour votre entreprise d'entraînement : (1) faites trois croquis papier différents de la page d'accueil en 15 minutes ; (2) choisissez le meilleur et réalisez-en le wireframe en niveaux de gris dans Figma ou Penpot, version ordinateur et mobile ; (3) créez la page « Système » (couleurs, textes, espacements, boutons) ; (4) réalisez la maquette haute fidélité de l'accueil. Comparez-la ensuite à la page que vous avez construite plus tôt : qu'auriez-vous fait différemment si vous aviez maquetté d'abord ?

## Ce que vous savez faire maintenant

Vous disposez maintenant d'une méthode complète pour concevoir des sites qui ont l'air professionnels, sans compter sur l'inspiration : un système (typographie, couleurs, espacements, composants), des règles de hiérarchie et d'alignement, une approche du parcours du visiteur, et un processus de maquettage.

Le livre suivant, « Mettre en ligne et faire durer », s'occupe du moment où tout cela devient public.

## Ce qu'il faut retenir

- **Croquis → wireframe → maquette** : on prend les décisions quand elles ne coûtent rien.
- Le **wireframe en gris** centre la discussion sur la structure.
- Maquettez l'**accueil (ordinateur et mobile), une page type, le contact et les composants**.
- Une page **Système** dans l'outil, avec les mêmes valeurs que le futur site.
- **Vrais contenus**, vraies images, et une présentation qui **justifie** les choix.
