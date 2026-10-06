---
titre: "Thèmes et éditeur de blocs"
resume: "Choisir un thème qui ne vous trahira pas, comprendre les styles globaux, les modèles et les compositions, et poser une charte cohérente."
---

Le thème est la décision la plus structurante d'un projet WordPress. Un mauvais choix se paie pendant toute la vie du site : lenteur, incompatibilités, impossibilité de faire évoluer le design. Ce chapitre vous apprend à choisir, puis à maîtriser les outils de l'éditeur de blocs qui permettent de personnaliser un thème **sans écrire de code**.

## Deux familles de thèmes

**Les thèmes classiques** sont construits en PHP. On les personnalise via l'outil *Personnaliser* (le « Customizer ») et les options propres à chaque thème. L'éditeur de blocs ne sert alors qu'au contenu des pages.

**Les thèmes à blocs** (*block themes*) sont construits entièrement en blocs. Tout se modifie dans l'**Éditeur de site** (*Apparence → Éditeur*) : en-tête, pied de page, modèles de pages, styles globaux. C'est la direction prise par WordPress, et le choix que nous recommandons pour les nouveaux projets.

Les thèmes par défaut de WordPress (nommés d'après l'année de leur sortie : Twenty Twenty-Four, Twenty Twenty-Five…) sont des thèmes à blocs légers, bien codés et maintenus par l'équipe de WordPress. Ce sont d'excellents points de départ.

## Choisir un thème : la grille

Avant d'installer un thème, vérifiez :

| Critère | Où regarder | Seuil acceptable |
|---|---|---|
| Source | Répertoire officiel wordpress.org, ou éditeur reconnu | Jamais de thème « premium » piraté (*nulled*) : ils contiennent très souvent du code malveillant |
| Mises à jour | Fiche du thème : « Dernière mise à jour » | Moins de six mois |
| Compatibilité | Version de WordPress testée | La version actuelle |
| Légèreté | Tester la démo avec Lighthouse ou l'onglet Réseau | Page de démo sous 1 Mo |
| Dépendances | Description | Méfiance si le thème « nécessite » 5 extensions pour fonctionner |
| Accessibilité | Étiquette *Accessibility Ready* du répertoire | Un vrai plus |

> **Le piège** Les thèmes « multi-usages » qui promettent 200 démos importables en un clic. Ils embarquent un code énorme pour couvrir tous les cas, imposent souvent leur constructeur de pages, et la démo importée remplit le site de contenus et d'images à supprimer. Pour un site vitrine, un thème simple et bien construit est toujours préférable.

## L'Éditeur de site

Avec un thème à blocs, ouvrez **Apparence → Éditeur**. Vous y trouvez :

- **Navigation** : les menus du site ;
- **Styles** : la charte graphique globale ;
- **Pages** : les contenus ;
- **Modèles** : la structure de chaque type de page (page, article, archive, 404…) ;
- **Compositions** : des assemblages de blocs réutilisables.

### Les styles globaux : la charte en un seul endroit

Dans **Styles**, on définit une fois pour toutes :

- la **typographie** : polices des titres et du texte, tailles, interlignage. WordPress permet d'installer des polices directement depuis la bibliothèque de polices, **hébergées sur votre serveur** (plutôt que chargées depuis un service tiers, ce qui est préférable pour la vie privée et la performance) ;
- la **palette de couleurs** : quatre à six couleurs nommées (fond, texte, accent, accent secondaire, gris) ;
- les **espacements** : la largeur du contenu, l'espace entre les blocs ;
- les styles **par type de bloc** : tous les boutons, tous les titres, toutes les citations.

Résistez à la tentation de modifier les couleurs et les polices bloc par bloc dans chaque page. C'est exactement l'équivalent des attributs `style=""` en HTML : impossible à maintenir. **Tout ce qui est récurrent se règle dans les styles globaux.**

### Les modèles et les parties de modèle

Un **modèle** définit la structure d'un type de page. Le modèle « Page » contient par exemple : l'en-tête, le titre de la page, son contenu, le pied de page.

L'**en-tête** et le **pied de page** sont des **parties de modèle** : modifiés une fois, ils changent sur tout le site.

Pour une page d'accueil sans titre automatique, ou une page de contact avec une mise en page particulière, on peut créer un modèle personnalisé et l'attribuer à la page concernée.

### Les compositions

Une **composition** (*pattern*) est un assemblage de blocs prêt à l'emploi : une section « trois services », un bandeau d'appel à l'action, une grille de témoignages. Le thème en fournit, le répertoire de WordPress en propose des centaines, et vous pouvez créer les vôtres.

Il en existe deux sortes :

- **non synchronisées** : insérées comme point de départ, puis modifiées librement sur chaque page ;
- **synchronisées** : modifiées une fois, elles changent partout où elles sont utilisées. Idéal pour un bandeau « Demander un devis » répété sur plusieurs pages.

> **À retenir** Créer quatre ou cinq compositions sur mesure pour votre client (section de services, témoignage, appel à l'action, équipe) est l'un des meilleurs services que vous puissiez lui rendre. Il pourra créer de nouvelles pages cohérentes sans jamais casser la charte.

## Les blocs essentiels

Vous construirez l'essentiel d'un site vitrine avec une quinzaine de blocs :

| Bloc | Usage |
|---|---|
| Paragraphe, Titre, Liste | Le texte |
| Image, Galerie | Les visuels |
| Bouton(s) | Les appels à l'action |
| Groupe | Regrouper des blocs, leur donner un fond et des marges : c'est le `<div>` (ou la `<section>`) de l'éditeur |
| Colonnes | Disposer côte à côte |
| Rangée, Pile, Grille | Variantes du Groupe, en Flexbox horizontal, vertical, ou en Grid |
| Couverture | Image ou couleur de fond avec du texte par-dessus |
| Média et texte | Une image à côté d'un texte |
| Détails | Accordéon (questions fréquentes) |
| Séparateur, Espacement | Rythme visuel, avec modération |

Vous reconnaissez les notions des livres précédents : le Groupe et ses variantes, ce sont **Flexbox et Grid** avec une interface. Si vous avez lu « HTML & CSS, à la main », vous comprendrez immédiatement pourquoi un bloc se comporte comme il le fait.

### Les bonnes pratiques dans l'éditeur

- **Utilisez la vue en liste** (icône en haut à gauche) pour voir la structure de la page et sélectionner précisément un bloc imbriqué.
- **Respectez la hiérarchie des titres** : le titre de la page est souvent le `<h1>` ; vos sections commencent donc en `<h2>`.
- **Ne créez pas d'espace avec des paragraphes vides.** Utilisez les réglages d'espacement des blocs.
- **Renseignez le texte alternatif** de chaque image, dans le panneau de droite.
- **Ancrez vos sections** (réglage *Avancé → Ancre HTML*) pour pouvoir y faire des liens.

## Un peu de CSS, quand c'est nécessaire

Il arrive qu'un réglage manque. Les thèmes à blocs permettent d'ajouter du CSS personnalisé dans **Styles → menu ⋮ → CSS supplémentaire**. Gardez-le court, commenté, et préférez toujours les réglages natifs quand ils existent.

Pour des modifications plus importantes d'un thème, on crée un **thème enfant** : un petit thème qui hérite de tout le thème parent et ne contient que vos modifications. Ainsi, les mises à jour du thème parent n'écrasent pas votre travail. Ne modifiez **jamais** directement les fichiers d'un thème que vous n'avez pas écrit.

> **Exercice** Dans votre WordPress local, activez le thème par défaut le plus récent. Dans **Styles**, définissez la charte d'Atelier Nord (ou de votre entreprise d'entraînement) : deux polices, une palette de cinq couleurs, le style des boutons. Modifiez l'en-tête pour y placer le logo et le menu. Créez une composition synchronisée « Demander un devis ». Puis construisez la page d'accueil avec les mêmes sections que dans le projet de « HTML & CSS, à la main », uniquement avec des blocs natifs.

## Ce qu'il faut retenir

- Préférez un **thème à blocs** léger, à jour, issu du répertoire officiel ou d'un éditeur reconnu. Jamais de thème piraté.
- La charte se règle **une fois** dans les **styles globaux**, jamais bloc par bloc.
- **Modèles** et **parties de modèle** structurent le site ; les **compositions** permettent au client de créer des pages cohérentes.
- Les blocs Groupe, Rangée, Pile et Grille, ce sont **Flexbox et Grid** avec une interface.
- On ne modifie jamais un thème tiers : **CSS supplémentaire** ou **thème enfant**.
