---
titre: "Comprendre WordPress avant de l'installer"
resume: "WordPress.org ou WordPress.com, cœur, thèmes, extensions, base de données : comment la machine fonctionne, et pourquoi on s'en sert."
apercu: true
---

WordPress fait tourner une part considérable des sites web dans le monde. Cette popularité a un revers : on trouve en ligne des millions de tutoriels contradictoires, des thèmes vendus comme des couteaux suisses, et des sites qui empilent quarante extensions pour afficher trois pages. Ce livre prend le chemin inverse : **comprendre la machine, l'utiliser sobrement, et livrer des sites qui durent**.

Avant d'installer quoi que ce soit, ce chapitre vous donne la carte du territoire.

## WordPress.org et WordPress.com : pas la même chose

C'est la première confusion à lever.

**WordPress.org** est le site du **logiciel libre** WordPress. Vous le téléchargez gratuitement et l'installez sur l'hébergement de votre choix. Vous (ou votre client) êtes propriétaire de tout : fichiers, base de données, nom de domaine. On l'appelle souvent « WordPress auto-hébergé ».

**WordPress.com** est un **service commercial** qui héberge des sites WordPress pour vous, avec des formules gratuites et payantes. Pratique, mais selon la formule, vous ne pouvez pas installer toutes les extensions ou tous les thèmes, et vous dépendez de l'offre de l'entreprise.

Dans ce livre, on parle de **WordPress.org**, installé sur un hébergement que vous choisissez. C'est ce que vous utiliserez dans l'immense majorité des projets clients.

## Ce que WordPress fait vraiment

Rappelez-vous le site dynamique des « Fondations du web » : le serveur fabrique chaque page à la demande. WordPress est exactement ça :

1. un visiteur demande `/nos-cuisines/` ;
2. le serveur lance WordPress, écrit en **PHP** ;
3. WordPress interroge la **base de données** (MySQL ou MariaDB) pour récupérer le contenu de la page ;
4. il passe ce contenu au **thème**, qui l'habille de HTML et de CSS ;
5. les **extensions** peuvent intervenir à chaque étape pour ajouter ou modifier quelque chose ;
6. le HTML final est envoyé au navigateur.

## Les quatre pièces du puzzle

### Le cœur

Le logiciel WordPress lui-même : la gestion des utilisateurs, des contenus, des médias, l'interface d'administration, l'éditeur. Il est mis à jour régulièrement, et **on ne le modifie jamais** : toute modification serait effacée à la mise à jour suivante.

### La base de données

Elle stocke tout ce qui est saisi via l'interface : textes des pages et articles, réglages, comptes utilisateurs, menus. Les **fichiers** (images, PDF) sont eux stockés dans le dossier `wp-content/uploads` sur le serveur. Conséquence importante : **une sauvegarde complète d'un WordPress, c'est la base de données *et* les fichiers.** L'un sans l'autre ne sert à rien.

### Le thème

Il contrôle l'**apparence** : mise en page, typographie, couleurs, en-tête, pied de page. On peut changer de thème sans perdre ses contenus (ils sont dans la base), mais la présentation change, parfois radicalement.

### Les extensions

Les extensions (*plugins*) ajoutent des **fonctionnalités** : formulaire de contact, référencement, sauvegardes, boutique en ligne, multilingue… Le répertoire officiel en compte des dizaines de milliers. C'est la grande force de WordPress, et sa principale source de problèmes.

## Pages et articles

WordPress distingue deux types de contenus principaux :

| | Pages | Articles |
|---|---|---|
| Nature | Contenu **permanent** | Contenu **daté**, chronologique |
| Exemples | Accueil, Services, À propos, Contact | Actualités, blog, annonces |
| Organisation | Hiérarchie (page parente / enfant) | Catégories et étiquettes |
| Affichage | Dans les menus | Dans une liste, du plus récent au plus ancien |

Un site vitrine est surtout fait de **pages**. Les articles ne servent que si le client publie réellement des actualités. Un blog dont le dernier article date de trois ans fait plus de tort qu'aucun blog du tout.

## Les rôles des utilisateurs

WordPress gère plusieurs **rôles**, avec des droits différents :

| Rôle | Peut… |
|---|---|
| Administrateur | Tout faire : installer des extensions, changer de thème, gérer les utilisateurs |
| Éditeur | Publier et modifier tous les contenus, y compris ceux des autres |
| Auteur | Publier et modifier ses propres articles |
| Contributeur | Rédiger des articles, sans pouvoir les publier |
| Abonné | Gérer son profil |

> **À retenir** Un client qui veut seulement mettre à jour ses textes n'a pas besoin d'être administrateur. Lui donner un compte **Éditeur** le protège de lui-même : il ne pourra pas installer par erreur une extension douteuse ou supprimer le thème. Gardez un compte administrateur séparé, que vous lui remettez aussi, mais qu'il n'utilise pas au quotidien.

## Pourquoi WordPress, et pourquoi pas

Soyons honnêtes sur les deux côtés.

**Les vraies forces**
- Le client devient **autonome** pour ses contenus.
- C'est un **logiciel libre** : pas d'abonnement à l'outil, liberté de changer d'hébergeur et de prestataire.
- Une **communauté** et une documentation immenses.
- Des milliers de professionnels le connaissent : votre client ne sera pas prisonnier de vous.

**Les vraies contraintes**
- **Maintenance indispensable.** Un WordPress jamais mis à jour finit presque toujours par être piraté. Le chapitre 6 y est consacré.
- **Performances** à surveiller, surtout avec des constructeurs de pages lourds.
- **Qualité inégale** de l'écosystème : pour une excellente extension, combien de médiocres ou d'abandonnées ?

Notre approche tient en une phrase : **un thème moderne et léger, l'éditeur de blocs natif, et le moins d'extensions possible.** C'est ce qui donne des sites rapides, sûrs, faciles à maintenir et faciles à transmettre.

## L'éditeur de blocs et les constructeurs de pages

Depuis quelques années, WordPress intègre un éditeur visuel appelé **éditeur de blocs** (on l'appelle aussi Gutenberg, du nom de son projet de développement). Chaque élément de contenu (paragraphe, titre, image, colonnes, bouton) est un **bloc**. Avec les thèmes dits « à blocs », on peut même modifier l'en-tête, le pied de page et les modèles de pages avec ce même éditeur : c'est l'**édition complète du site** (*Full Site Editing*).

Avant cela, on utilisait massivement des **constructeurs de pages** tiers (Elementor, Divi, WPBakery…). Ils sont toujours très répandus et vous en rencontrerez forcément sur des sites existants. Ils offrent beaucoup de possibilités visuelles, mais alourdissent souvent les pages, enferment les contenus dans leur format propre, et ajoutent une dépendance supplémentaire.

Dans ce livre, nous travaillons avec **l'éditeur de blocs natif**. Il est aujourd'hui assez mûr pour la grande majorité des sites vitrines, et c'est le choix le plus durable.

> **Exercice** Rendez-vous sur wordpress.org et parcourez trois sections : *Thèmes*, *Extensions*, et la documentation (*Learn WordPress*). Dans le répertoire des extensions, cherchez « formulaire de contact » et comparez les trois premiers résultats selon ces critères : nombre d'installations actives, date de dernière mise à jour, compatibilité avec la dernière version de WordPress, note moyenne. Notez vos observations : c'est exactement la grille que nous appliquerons au chapitre 4.

## Ce qu'il faut retenir

- On utilise **WordPress.org**, le logiciel libre, installé sur un hébergement choisi.
- WordPress = **cœur** (jamais modifié) + **base de données** + **thème** (apparence) + **extensions** (fonctionnalités).
- Une sauvegarde complète = **base de données + fichiers**.
- **Pages** pour le permanent, **articles** pour le daté.
- Donnez au client un rôle **Éditeur** pour le quotidien.
- Notre méthode : thème léger, éditeur de blocs natif, extensions au strict minimum.
