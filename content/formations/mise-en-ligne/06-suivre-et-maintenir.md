---
titre: "Suivre, mesurer et faire durer"
resume: "Mesurer l'audience sans espionner, lire la Search Console, surveiller la disponibilité, et organiser la vie du site après la mise en ligne."
---

Un site en ligne n'est pas terminé : il commence sa vie. Les contenus vieillissent, les logiciels doivent être mis à jour, les certificats et les noms de domaine se renouvellent, et surtout, on peut enfin **savoir** si le site remplit son rôle. Ce dernier chapitre vous donne les outils pour suivre un site dans la durée, et pour aider le client à en tirer des décisions.

## Mesurer l'audience, sans espionner

Savoir combien de personnes visitent le site, d'où elles viennent et quelles pages elles consultent est utile. Mais beaucoup d'outils de statistiques collectent bien plus que nécessaire, partagent les données avec des tiers, et **exigent un consentement**, donc un bandeau cookies.

Il existe des alternatives :

- **Les outils de mesure respectueux de la vie privée**, dont certains sont hébergés en Europe, d'autres auto-hébergeables (logiciels libres). Certains fonctionnent sans cookie ; d'autres peuvent être configurés pour respecter les conditions d'**exemption de consentement** définies par la CNIL. La CNIL publie des recommandations et des exemples de configuration conformes : consultez-les avant de choisir.
- **Les journaux du serveur** (*logs*), analysés par l'hébergeur : une mesure grossière mais sans aucun traceur.

Quel que soit l'outil, **mesurez peu, mais utile**. Pour un site vitrine, cinq indicateurs suffisent :

| Indicateur | Ce qu'il dit |
|---|---|
| Visiteurs par mois | La tendance générale |
| Sources de trafic | Recherche, accès direct, réseaux sociaux, sites référents |
| Pages les plus vues | Ce qui intéresse vraiment |
| Pages d'entrée | Par où les gens arrivent (souvent pas par l'accueil) |
| **Conversions** | Formulaires envoyés, clics sur le téléphone, demandes de devis |

La dernière ligne est la plus importante, et la plus souvent oubliée. Un site qui passe de 500 à 1 000 visiteurs mais toujours à 3 demandes de devis par mois n'a pas progressé. Configurez un **objectif** sur l'envoi du formulaire (la page de remerciement, par exemple) et sur les clics sur `tel:` et `mailto:`.

## Lire la Search Console

La **Google Search Console** (et Bing Webmaster Tools) est l'outil le plus précieux après la mise en ligne. Gratuite, elle montre le site **du point de vue du moteur de recherche**.

Les rapports à consulter :

- **Performances** : pour quelles **requêtes** le site apparaît, combien de fois (*impressions*), combien de clics, à quelle position moyenne. C'est une mine d'or : vous y découvrez les mots que les gens utilisent réellement.
- **Pages** (indexation) : quelles pages sont indexées, lesquelles ne le sont pas, et pourquoi (`noindex` oublié, page introuvable, redirection, contenu jugé dupliqué…).
- **Signaux Web essentiels** : les Core Web Vitals mesurés chez les vrais visiteurs.
- **Sécurité et actions manuelles** : alertes en cas de piratage ou de pénalité. Normalement vide ; vérifiez-le quand même.

> **Astuce** Dans le rapport Performances, filtrez sur les requêtes qui ont **beaucoup d'impressions mais peu de clics**. Ce sont des pages que le moteur montre, mais que les gens ne choisissent pas : souvent, un meilleur `<title>` et une meilleure méta-description suffisent à doubler les clics.

## Surveiller la disponibilité

Un site peut tomber en panne sans que personne ne s'en aperçoive pendant des jours : problème d'hébergement, certificat expiré, extension défaillante après une mise à jour automatique. Les **services de surveillance de disponibilité** (*uptime monitoring*), dont beaucoup ont une offre gratuite, testent le site à intervalles réguliers et vous alertent par e-mail ou notification en cas de panne.

Surveillez au minimum :

- la **page d'accueil** (le site répond-il ?) ;
- l'**expiration du certificat** HTTPS (normalement automatique, mais une erreur de renouvellement arrive) ;
- l'**expiration du nom de domaine**.

## Le calendrier de vie du site

Le chapitre sur la maintenance de « WordPress sans bricolage » proposait une routine mensuelle, trimestrielle et annuelle pour la partie technique. Ajoutez-y la vie **éditoriale** et **stratégique** :

**Chaque mois**
- [ ] Coup d'œil aux statistiques : visiteurs, sources, conversions.
- [ ] Vérification de la Search Console : erreurs d'indexation, alertes.
- [ ] Test du formulaire de contact.

**Chaque trimestre**
- [ ] Relecture des pages principales : prix, horaires, équipe, offres toujours exacts ?
- [ ] Ajout de nouvelles réalisations ou de nouveaux avis.
- [ ] Analyse des requêtes de la Search Console : de nouveaux sujets à traiter ?
- [ ] Lighthouse sur les pages principales.

**Chaque année**
- [ ] Bilan avec le client : le site a-t-il rempli ses objectifs ? Que faut-il faire évoluer ?
- [ ] Revue des mentions légales, de la politique de confidentialité et des traceurs.
- [ ] Renouvellements : domaine, hébergement, licences.
- [ ] Vérification que les accès sont toujours détenus par les bonnes personnes.

## Faire évoluer plutôt que refaire

Beaucoup de sites sont refaits entièrement tous les trois ou quatre ans, parce qu'ils ont été laissés à l'abandon entre-temps. Une approche plus saine (et plus économique pour le client) consiste à les faire **évoluer en continu** : une nouvelle page par trimestre, une section améliorée grâce aux statistiques, un titre réécrit grâce à la Search Console.

Quand une refonte est vraiment nécessaire, la règle d'or est de **préserver ce qui fonctionne** :

- listez toutes les adresses existantes (la Search Console et le plan du site vous aident) ;
- conservez les adresses quand c'est possible ;
- sinon, mettez en place des **redirections 301** de chaque ancienne adresse vers la nouvelle page équivalente ;
- conservez les contenus qui attirent du trafic, en les améliorant plutôt qu'en les supprimant ;
- surveillez attentivement la Search Console pendant les semaines qui suivent.

Une refonte sans redirections peut faire perdre en quelques jours des années de référencement.

## Le dossier du site

Pour chaque site que vous livrez, constituez un **dossier** remis au client (et dont vous gardez une copie, avec son accord) :

- les **accès** : liste des comptes et de leur propriétaire (les mots de passe eux-mêmes se transmettent via un gestionnaire de mots de passe partagé ou un canal sécurisé, jamais en clair par e-mail) ;
- les **dates de renouvellement** : domaine, hébergement, licences ;
- la **liste des extensions** et services tiers utilisés, avec leur rôle ;
- le **système de design** : polices, couleurs, composants ;
- le **guide d'utilisation** ;
- le **journal des interventions**.

Ce dossier protège le client : il peut changer de prestataire à tout moment sans repartir de zéro. Et paradoxalement, c'est ce genre de transparence qui donne envie aux clients de rester.

> **Exercice** Pour votre site d'entraînement publié : (1) installez un outil de mesure d'audience respectueux de la vie privée, en vérifiant s'il nécessite un consentement dans sa configuration ; (2) configurez un objectif sur l'envoi du formulaire ; (3) mettez en place une surveillance de disponibilité gratuite ; (4) rédigez le dossier du site selon le modèle ci-dessus. Dans un mois, consultez la Search Console et notez trois enseignements.

## Ce que vous savez faire maintenant

Vous savez faire passer un site du statut de projet à celui d'outil public et durable : la checklist de publication, les méthodes de mise en ligne, les bases solides du référencement, la performance, les obligations légales, et le suivi dans le temps.

Il reste une étape au programme : transformer ce savoir-faire en activité. C'est l'objet du dernier livre, « Du savoir-faire au métier ».

## Ce qu'il faut retenir

- **Mesurez peu, mais utile**, avec un outil respectueux de la vie privée, et suivez les **conversions**.
- La **Search Console** montre le site du point de vue du moteur : requêtes, indexation, alertes.
- **Surveillez la disponibilité**, le certificat et l'expiration du domaine.
- Un **calendrier** mensuel, trimestriel et annuel, technique et éditorial.
- **Faire évoluer** plutôt que refaire ; en cas de refonte, **redirections 301** systématiques.
- Un **dossier du site** remis au client : accès, renouvellements, extensions, design, guide, journal.
