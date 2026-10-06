---
titre: "Installer WordPress proprement"
resume: "En local pour travailler, chez un hébergeur pour publier. Les réglages à faire dans les dix premières minutes, et ceux qu'on oublie."
---

Une installation de WordPress prend cinq minutes. Une installation **propre**, qui ne vous posera pas de problème dans six mois, en prend vingt. Ce chapitre couvre les deux cas que vous rencontrerez : travailler **en local** sur votre ordinateur, et installer **chez un hébergeur**.

## Travailler en local d'abord

Construire un site directement en ligne pose deux problèmes : le site en chantier est visible (et indexable) par tous, et chaque modification passe par Internet. On préfère donc travailler sur son ordinateur, puis publier.

WordPress a besoin d'un serveur web, de PHP et d'une base de données. Des outils gratuits installent tout ça en un clic :

- **Local** (localwp.com), le plus simple pour démarrer, sur Windows, macOS et Linux ;
- **WordPress Studio**, outil officiel léger ;
- ou les environnements plus généralistes comme MAMP, XAMPP, ou Docker pour les profils techniques.

Avec Local : *Create a new site*, donnez un nom (`atelier-nord`), choisissez l'environnement « préféré », saisissez un identifiant administrateur. Une minute plus tard, votre site tourne sur `atelier-nord.local`.

> **Astuce** Pour vous entraîner sans rien installer, le site **WordPress Playground** (playground.wordpress.net) fait tourner un WordPress complet dans votre navigateur. Parfait pour tester une extension ou un thème, à condition de garder à l'esprit que tout disparaît quand vous fermez l'onglet.

## Installer chez un hébergeur

Presque tous les hébergeurs mutualisés proposent une **installation en un clic** depuis leur espace client. C'est fiable et suffisant dans la plupart des cas. Si vous voulez savoir ce qui se passe, voici l'installation manuelle, qui reste utile à connaître :

1. **Créer une base de données** depuis l'espace client de l'hébergeur. Notez : nom de la base, utilisateur, mot de passe, adresse du serveur de base de données.
2. **Télécharger WordPress** sur wordpress.org/download, en français (fr.wordpress.org).
3. **Envoyer les fichiers** sur le serveur, dans le dossier racine du site (souvent `www` ou `public_html`), via le gestionnaire de fichiers de l'hébergeur ou un client FTP (FileZilla, Cyberduck).
4. **Ouvrir le domaine** dans le navigateur : l'assistant d'installation démarre. Saisissez les informations de la base de données.
5. **Créer le compte administrateur**.

### Le compte administrateur : trois règles

- **Identifiant** : jamais `admin`, ni le nom du site. C'est la première combinaison testée par les robots.
- **Mot de passe** : long et généré aléatoirement, stocké dans un gestionnaire de mots de passe (Bitwarden, 1Password, KeePassXC…).
- **E-mail** : une adresse durable et consultée. C'est là qu'arriveront les alertes de sécurité et les réinitialisations de mot de passe.

## Les réglages des dix premières minutes

Une fois connecté au tableau de bord (`votre-site.fr/wp-admin`), passez dans **Réglages** avant toute autre chose.

### Réglages → Général

- **Titre du site** et **slogan** : le slogan par défaut (« Un site utilisant WordPress ») s'affiche parfois dans les résultats de recherche. Remplacez-le ou videz-le.
- **Adresse web** : vérifiez qu'elle commence par `https://`. Si le certificat est en place chez l'hébergeur, passez les deux adresses en `https`.
- **Langue du site** : Français.
- **Fuseau horaire** : choisissez une **ville** (Paris), pas un décalage UTC, pour que le passage à l'heure d'été soit automatique.
- **Format de date** : `j F Y` (6 octobre 2026).

### Réglages → Lecture

- **Page d'accueil** : pour un site vitrine, choisissez « Une page statique » et sélectionnez votre page d'accueil (créez-la au préalable, ainsi qu'une page « Actualités » si le site aura des articles).
- **Visibilité pour les moteurs de recherche** : pendant la construction en ligne, cochez « Demander aux moteurs de recherche de ne pas indexer ce site ». **Et notez dans votre checklist de mise en ligne de la décocher**. Des sites restent invisibles des mois à cause de cette case oubliée.

### Réglages → Discussion

Un site vitrine n'a généralement pas besoin de commentaires, qui attirent surtout du spam. Décochez « Autoriser les visiteurs à publier des commentaires sur les nouveaux articles ».

### Réglages → Permaliens

Les **permaliens** définissent la forme des adresses. Choisissez **« Titre de la publication »** : vos pages auront des adresses lisibles comme `/nos-cuisines/`, bien plus claires pour les visiteurs et les moteurs de recherche que `/?p=123`.

> **Le piège** Changer la structure des permaliens sur un site déjà en ligne casse tous les liens existants vers ses pages. Faites ce réglage **au début**, et n'y touchez plus.

## Le ménage

Une installation neuve contient des éléments de démonstration à supprimer :

- l'article « Bonjour tout le monde ! » et la page « Page d'exemple » ;
- le commentaire de démonstration ;
- les extensions préinstallées inutiles (certains hébergeurs en ajoutent plusieurs) ;
- les **thèmes inutilisés**, en gardant le thème actif et un thème par défaut récent de WordPress en secours.

Pourquoi supprimer les thèmes et extensions désactivés ? Parce qu'un fichier présent sur le serveur peut contenir une faille **même s'il est désactivé**. Ce qui ne sert pas doit disparaître.

## Les comptes utilisateurs

Créez dès maintenant les comptes nécessaires (**Comptes → Ajouter**) :

- votre compte administrateur ;
- le compte **Éditeur** du client, pour son usage quotidien ;
- éventuellement un compte administrateur au nom du client, dont il garde les identifiants.

Un compte par personne, toujours. Les identifiants partagés empêchent de savoir qui a fait quoi, et de retirer l'accès à quelqu'un sans changer le mot de passe de tous.

## Vérifier la santé du site

WordPress intègre un outil de diagnostic : **Outils → Santé du site**. Il signale une version de PHP trop ancienne, des extensions inactives, l'absence de HTTPS, des tâches planifiées en échec. Visez l'état « Bon », et lisez chaque recommandation : elles sont généralement pertinentes.

> **Exercice** Installez WordPress en local avec Local (ou dans WordPress Playground). Appliquez tous les réglages de ce chapitre : général, lecture (avec une page d'accueil statique), discussion, permaliens. Supprimez les contenus de démonstration et les thèmes inutiles. Créez un compte Éditeur et connectez-vous avec : observez ce qu'il peut faire et ce qui lui est interdit. Terminez par Outils → Santé du site.

## Ce qu'il faut retenir

- Construisez **en local**, publiez ensuite.
- Identifiant administrateur unique, mot de passe généré, e-mail consulté.
- Réglages immédiats : **HTTPS**, fuseau horaire par ville, **page d'accueil statique**, **permaliens « Titre de la publication »**.
- La case « ne pas indexer » : utile pendant le chantier, **fatale si oubliée**.
- Supprimez tout ce qui ne sert pas : contenus de démo, thèmes et extensions inactifs.
- Un compte par personne, et le rôle Éditeur pour le client.
