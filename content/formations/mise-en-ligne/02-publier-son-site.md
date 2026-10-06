---
titre: "Publier son site"
resume: "FTP, Git, hébergeurs statiques, migration d'un WordPress : les méthodes pour mettre un site en ligne, le relier à son domaine et activer HTTPS."
---

Votre site fonctionne sur votre ordinateur. Il faut maintenant le copier sur un serveur et le relier à son nom de domaine. Selon le type de site, plusieurs méthodes existent ; ce chapitre présente les trois que vous utiliserez le plus.

## Méthode 1 : envoyer les fichiers (site statique, hébergement classique)

C'est la méthode historique, toujours valable pour un site statique sur un hébergement mutualisé.

1. Récupérez chez l'hébergeur les **identifiants SFTP** : adresse du serveur, identifiant, mot de passe, port (22 pour SFTP).
2. Ouvrez un client comme **FileZilla** ou **Cyberduck**, et connectez-vous en **SFTP** (le FTP simple transmet les mots de passe en clair : évitez-le).
3. Repérez le **dossier racine** du site sur le serveur : souvent `www`, `public_html` ou `htdocs`. C'est le dossier dont le contenu est servi quand on visite le domaine.
4. **Glissez le contenu** de votre dossier de projet (pas le dossier lui-même) dans ce dossier racine. Le fichier `index.html` doit se retrouver directement dans la racine.
5. Visitez le domaine : le site s'affiche.

**Limites** : chaque mise à jour se fait à la main, on oublie facilement un fichier, et on ne sait plus quelle version est en ligne. Parfait pour un premier site, vite fastidieux ensuite.

## Méthode 2 : publier depuis Git (site statique, hébergement statique)

C'est la méthode moderne pour les sites statiques, et celle que nous recommandons. Vous avez installé Git dans « Les fondations du web » ; voici à quoi il sert ici.

Des services d'**hébergement statique** (Netlify, Cloudflare Pages, GitHub Pages, et d'autres, dont certains hébergés en Europe) se connectent à votre dépôt Git. À chaque fois que vous **poussez** une modification, ils publient automatiquement la nouvelle version.

1. Poussez votre projet sur un dépôt (GitHub, GitLab, Codeberg…).
2. Créez un compte sur le service d'hébergement statique choisi, et connectez-le au dépôt.
3. Indiquez la **branche** à publier (`main`) et le **dossier** à servir (la racine, ou un dossier `dist` si vous utilisez un générateur).
4. Le service publie le site sur une adresse provisoire du type `atelier-nord.exemple.app`.
5. Ajoutez votre **domaine personnalisé** dans les réglages du service : il vous indique les enregistrements DNS à créer.

**Avantages** : historique complet (on peut revenir à n'importe quelle version), publication en une commande, HTTPS automatique, sites très rapides grâce à la distribution sur des serveurs proches des visiteurs (CDN), et souvent un aperçu de chaque modification avant publication.

> **Attention** Vérifiez les conditions de l'offre gratuite (usage commercial autorisé ? limites de trafic ?) et la localisation des données. Pour un site professionnel, lisez les conditions d'utilisation, et mentionnez l'hébergeur réel dans les mentions légales.

## Méthode 3 : migrer un WordPress

Un WordPress, c'est des **fichiers** et une **base de données**. Le migrer de votre ordinateur vers l'hébergeur (ou d'un hébergeur à l'autre) implique de déplacer les deux, **et** de remplacer l'ancienne adresse (`atelier-nord.local`) par la nouvelle (`https://www.atelier-nord.fr`) partout dans la base.

Ce dernier point est piégeux : WordPress stocke certaines données sous une forme « sérialisée », où la longueur des textes est enregistrée. Un simple rechercher-remplacer dans un fichier SQL casse ces données. Il faut un outil qui en tient compte.

En pratique, deux approches :

**L'extension de migration** (la plus simple) : une extension crée une archive complète du site (fichiers + base) sur l'environnement d'origine ; on installe un WordPress vierge sur la destination, on y installe la même extension, et on importe l'archive. L'outil remplace les adresses proprement. Local, l'outil de développement présenté dans « WordPress sans bricolage », propose aussi des fonctions d'envoi vers certains hébergeurs.

**La méthode manuelle** (pour comprendre, ou quand l'archive est trop lourde) :

1. Exportez la base de données (phpMyAdmin, ou l'outil de Local).
2. Envoyez les fichiers par SFTP.
3. Créez une base de données chez l'hébergeur et importez l'export.
4. Mettez à jour `wp-config.php` avec les nouveaux identifiants de base de données.
5. Remplacez les adresses avec un outil qui gère la sérialisation (la commande `wp search-replace` de WP-CLI, par exemple).
6. Dans l'administration, réenregistrez les permaliens (**Réglages → Permaliens → Enregistrer**).

Après une migration, vérifiez toujours : connexion à l'administration, affichage des images, liens internes, formulaire de contact.

## Relier le domaine

Quelle que soit la méthode, il reste à faire pointer le domaine vers l'hébergement. Rappel des « Fondations du web » :

- soit vous **modifiez les enregistrements** chez le bureau d'enregistrement : un enregistrement `A` (vers l'adresse IP du serveur) pour le domaine nu, et souvent un `CNAME` pour `www` ;
- soit vous **déléguez la zone** en changeant les serveurs de noms (en notant d'abord les enregistrements `MX` et `TXT` existants pour ne pas casser la messagerie).

L'hébergeur indique toujours les valeurs exactes à saisir. Puis on attend la propagation.

### Avec ou sans www ?

Les deux fonctionnent. Choisissez **une** version principale et faites **rediriger** l'autre vers elle (redirection 301). Sinon, les moteurs de recherche peuvent voir deux sites identiques, et les statistiques sont dispersées. La plupart des hébergeurs proposent ce réglage en un clic.

## Activer HTTPS

Aujourd'hui, HTTPS est **gratuit** grâce à l'autorité de certification Let's Encrypt, et presque tous les hébergeurs l'activent automatiquement, ou en un clic. Une fois le certificat en place :

1. **Forcez la redirection** de `http://` vers `https://` (réglage de l'hébergeur, ou règle de redirection) ;
2. sur WordPress, vérifiez que les adresses du site sont bien en `https` (**Réglages → Général**) ;
3. traquez le **contenu mixte** : une image ou un script appelé en `http://` dans une page `https://` provoque un avertissement. L'onglet *Console* des outils de développement les signale.

Pour aller plus loin, l'en-tête **HSTS** (*HTTP Strict Transport Security*) demande aux navigateurs de toujours utiliser HTTPS pour ce domaine. Ne l'activez qu'une fois sûr que HTTPS fonctionne partout, sous-domaines compris : il est difficile à annuler.

## Les environnements

Dès que vous travaillez pour des clients, distinguez :

- l'environnement **local** : votre ordinateur, où vous construisez ;
- l'environnement de **préproduction** (ou recette) : une copie en ligne, protégée par un mot de passe et non indexée, où le client valide ;
- l'environnement de **production** : le site public.

On ne modifie jamais directement la production sans l'avoir testé ailleurs. Beaucoup d'hébergeurs WordPress proposent un environnement de préproduction en un clic.

> **Exercice** Publiez votre site statique d'entraînement avec la méthode Git sur un hébergement statique gratuit, sur l'adresse provisoire fournie. Vérifiez HTTPS. Faites une modification, poussez-la, et observez la publication automatique. Si vous avez un WordPress local, entraînez-vous à le migrer vers un second site local avec une extension de migration, puis vérifiez images, liens et connexion.

## Ce qu'il faut retenir

- **SFTP** pour un site statique sur hébergement classique ; jamais de FTP en clair.
- **Git + hébergement statique** : historique, publication automatique, HTTPS et CDN inclus.
- Migrer un **WordPress** = fichiers + base + remplacement des adresses avec un outil qui gère la **sérialisation**.
- Une seule version du domaine (**avec ou sans www**), l'autre en **redirection 301**.
- **HTTPS forcé**, pas de contenu mixte, HSTS quand tout est stable.
- **Local → préproduction → production** : on ne teste jamais en production.
