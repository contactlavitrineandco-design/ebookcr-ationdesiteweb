---
titre: "Peu d'extensions, mais les bonnes"
resume: "Évaluer une extension avant de l'installer, la liste courte des besoins réels d'un site vitrine, et les pièges juridiques et techniques."
---

Chaque extension installée est du code écrit par quelqu'un d'autre, qui s'exécute à chaque visite, qui doit être mis à jour, et qui peut contenir une faille. La plupart des sites WordPress piratés le sont **par une extension**, pas par le cœur de WordPress. La règle de ce chapitre est donc simple : **chaque extension doit justifier sa présence**.

## Avant d'installer : les cinq questions

1. **Ai-je vraiment besoin de cette fonctionnalité ?** Beaucoup de besoins sont couverts nativement : galerie, colonnes, accordéon, boutons, intégration de vidéos, éditeur de site.
2. **Une seule extension peut-elle couvrir plusieurs besoins ?** Mieux vaut une extension solide que trois petites.
3. **Est-elle activement maintenue ?** Dernière mise à jour récente, compatibilité avec la version actuelle de WordPress, réponses de l'auteur sur le forum de support.
4. **Est-elle largement utilisée ?** Un grand nombre d'installations actives signifie que les problèmes sont repérés et corrigés vite.
5. **Que fait-elle des données ?** Envoie-t-elle des informations vers des serveurs tiers ? Dépose-t-elle des cookies ? C'est une question juridique autant que technique.

> **Le piège** Les versions « gratuites » qui truffent l'administration de bannières publicitaires, ou dont la moitié des fonctions affichées sont réservées à la version payante. Elles ne sont pas forcément mauvaises, mais elles rendront votre client fou. Testez toujours l'expérience complète en local avant de choisir.

## Les besoins réels d'un site vitrine

Voici, par besoin, ce qu'un site vitrine nécessite généralement. Nous citons des familles d'outils plutôt qu'une liste figée : les extensions évoluent, et votre jugement doit primer. Appliquez la grille ci-dessus à chaque candidate.

### 1. Formulaire de contact

Indispensable sur la plupart des sites. Plusieurs extensions éprouvées existent, de la plus légère (formulaires codés en quelques balises) à la plus visuelle (glisser-déposer). Vérifiez :

- la **protection anti-spam** intégrée, idéalement sans service tiers déposant des traceurs (champ piège, jeton temporel, ou solution anti-robots respectueuse de la vie privée) ;
- la possibilité d'**ajouter la mention RGPD** sous le formulaire ;
- ce que l'extension **conserve** : beaucoup stockent une copie de chaque message dans la base de données. C'est pratique, mais il faut alors prévoir une durée de conservation et la mentionner dans la politique de confidentialité.

### 2. Délivrabilité des e-mails

C'est le problème que personne n'anticipe : par défaut, WordPress envoie ses e-mails via la fonction d'envoi du serveur, et une grande partie finit en spam ou n'arrive jamais. Le client croit que personne ne le contacte, alors que les messages se perdent.

La solution est une extension **SMTP** qui fait passer les e-mails par un vrai serveur d'envoi (celui de la messagerie du domaine, ou un service transactionnel). Associée aux enregistrements DNS SPF, DKIM et DMARC vus dans « Les fondations du web », elle règle le problème. **Testez l'envoi d'un formulaire avant chaque livraison.**

### 3. Référencement naturel (SEO)

WordPress gère nativement les titres et une partie des métadonnées, mais une extension SEO apporte : le contrôle du **titre** et de la **méta-description** de chaque page, le **plan du site XML**, les balises de partage sur les réseaux sociaux, et des réglages d'indexation fins. Une seule extension SEO par site, jamais deux.

### 4. Sauvegardes

Même si l'hébergeur sauvegarde, une sauvegarde **indépendante**, stockée **ailleurs** que sur le serveur, est indispensable. Une extension de sauvegarde planifie des copies complètes (base de données + fichiers) vers un stockage externe. Détails au chapitre 6.

### 5. Sécurité

Le sujet est développé au chapitre 6. Retenez qu'une bonne hygiène (mises à jour, mots de passe, double authentification, peu d'extensions) compte bien plus qu'une extension de sécurité. Si vous en installez une, choisissez-la pour des fonctions précises : limitation des tentatives de connexion, double authentification.

### 6. Performance (selon l'hébergeur)

Beaucoup d'hébergeurs intègrent déjà un système de **cache**. Si ce n'est pas le cas, une extension de cache qui génère des versions statiques des pages accélère nettement le site. Ne cumulez jamais deux extensions de cache.

### 7. Multilingue (si nécessaire)

Un site en plusieurs langues nécessite une extension dédiée. C'est l'une des plus lourdes à gérer : ne l'installez que si le besoin est réel et que les traductions seront effectivement maintenues.

### Ce qui n'est presque jamais nécessaire

- **Un constructeur de pages** tiers, si vous maîtrisez l'éditeur de blocs.
- **Une extension de « blocs supplémentaires »** qui en ajoute 60 dont vous utiliserez 2.
- **Des extensions de réseaux sociaux** qui chargent des scripts tiers (et des traceurs) sur chaque page. Un simple lien vers les profils suffit.
- **Un curseur d'images** (*slider*) en page d'accueil : lourd, peu accessible, et les études d'usage montrent que les visiteurs ne regardent guère que la première diapositive.

## Extensions et RGPD : les traceurs

Certaines extensions ou intégrations déposent des **cookies** ou chargent des ressources depuis des serveurs tiers : statistiques, vidéos YouTube intégrées, cartes Google, polices hébergées par un service tiers, boutons de partage, anti-spam de certains fournisseurs.

En France, tout traceur qui n'est pas strictement nécessaire au fonctionnement du site **exige le consentement préalable** du visiteur (article 82 de la loi Informatique et Libertés). Cela signifie : un bandeau de consentement conforme, avec un bouton « Tout refuser » aussi visible que « Tout accepter », et **aucun dépôt avant l'accord**.

La meilleure stratégie reste d'**éviter** ces traceurs :

- vidéos intégrées en mode « confidentialité renforcée », ou avec une image de prévisualisation qui ne charge la vidéo qu'au clic ;
- carte sous forme d'image cliquable vers le service de cartographie, ou service respectueux de la vie privée ;
- polices hébergées localement ;
- statistiques sans cookies, ou configurées pour être exemptées de consentement selon les critères de la CNIL.

Un site sans traceur non essentiel n'a **pas besoin de bandeau cookies**. C'est plus simple pour vous, plus agréable pour les visiteurs, et plus sûr juridiquement pour le client. Le livre « Mettre en ligne et faire durer » détaille ces obligations.

## Gérer les extensions dans le temps

- **Tenez un registre** pour chaque site client : nom de l'extension, rôle, date d'installation, version gratuite ou licence payante (et date de renouvellement de la licence).
- **Supprimez** (et pas seulement désactivez) toute extension qui ne sert plus.
- **Méfiez-vous des extensions abandonnées** : si une extension n'est plus mise à jour depuis un an, cherchez une alternative avant qu'une faille ne soit découverte.
- Les licences payantes doivent idéalement être **au nom du client**, pour qu'il reste propriétaire de son site.

> **Exercice** Dans votre WordPress d'entraînement, installez au maximum cinq extensions couvrant : formulaire de contact, SMTP, SEO, sauvegarde, et éventuellement cache. Pour chacune, remplissez une ligne de registre (nom, rôle, maintenance, nombre d'installations, données envoyées à des tiers). Créez le formulaire de contact avec la mention RGPD, et vérifiez avec l'onglet Réseau des outils de développement qu'aucune ressource tierce non désirée n'est chargée sur la page d'accueil.

## Ce qu'il faut retenir

- **Chaque extension est une dépendance** : elle doit justifier sa présence.
- Grille d'évaluation : besoin réel, maintenance, popularité, données transmises.
- Le socle d'un site vitrine : **formulaire, SMTP, SEO, sauvegarde**, éventuellement **cache**.
- Pas de traceurs non essentiels = pas de bandeau cookies. Sinon, **consentement préalable** obligatoire.
- Un **registre des extensions** par site, et suppression de tout ce qui ne sert plus.
