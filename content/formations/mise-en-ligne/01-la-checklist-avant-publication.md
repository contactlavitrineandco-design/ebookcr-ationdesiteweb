---
titre: "La checklist avant publication"
resume: "Tout ce qu'il faut vérifier avant qu'un site devienne public : contenus, technique, légal, accès. La liste que les professionnels déroulent à chaque projet."
apercu: true
---

La mise en ligne est le moment où un site cesse d'être un projet et devient un outil public. C'est aussi le moment où les oublis coûtent le plus cher : une page d'exemple indexée par les moteurs de recherche, un formulaire qui n'envoie rien, des mentions légales vides, un site inaccessible sur iPhone. Personne ne s'en aperçoit pendant la construction ; tout le monde s'en aperçoit après.

Les pilotes de ligne, avec des milliers d'heures de vol, déroulent une checklist avant chaque décollage. Pas parce qu'ils ne savent pas piloter : parce que la mémoire humaine oublie, surtout sous la pression d'une échéance. Faites comme eux.

Ce chapitre vous donne **la** checklist. Les chapitres suivants détaillent chaque domaine.

## Comment l'utiliser

- Copiez-la dans votre outil de notes ou de gestion de projet, une fois par projet.
- Cochez **réellement** chaque point, en vérifiant, pas de mémoire.
- Ajoutez-y vos propres points au fil des projets : chaque erreur commise une fois doit devenir une ligne de la liste.
- Faites-la dérouler par quelqu'un d'autre quand c'est possible : on ne voit pas ses propres fautes.

## 1. Contenus

- [ ] Tous les textes sont définitifs et **relus** (orthographe, typographie française).
- [ ] Plus aucun texte d'exemple (*lorem ipsum*), aucune page de démonstration.
- [ ] Les coordonnées (téléphone, adresse, e-mail, horaires) sont exactes et identiques partout.
- [ ] Chaque image a un texte alternatif adapté, et toutes sont **légalement utilisables** (droits, licences, autorisation des personnes photographiées).
- [ ] Les images sont redimensionnées et compressées.
- [ ] L'année du copyright, s'il y en a un, est correcte.
- [ ] Les liens internes fonctionnent (aucun lien vers l'environnement de test ou `localhost`).
- [ ] Les documents téléchargeables (PDF) sont à jour.

## 2. Fonctionnel

- [ ] Le formulaire de contact a été **testé de bout en bout** : envoi, réception chez le client (et pas dans les spams), message de confirmation.
- [ ] Les liens `tel:` et `mailto:` fonctionnent sur mobile.
- [ ] La page 404 existe, est utile (lien vers l'accueil, recherche ou menu) et ne renvoie pas un code 200.
- [ ] Le site fonctionne sur Firefox, Chrome, Safari et sur un vrai téléphone (iPhone **et** Android si possible).
- [ ] Le site est entièrement utilisable **au clavier**.
- [ ] Les intégrations tierces (carte, vidéo, prise de rendez-vous) fonctionnent et respectent le consentement si elles déposent des traceurs.

## 3. Technique

- [ ] Le site est en **HTTPS**, avec redirection automatique de `http://` vers `https://`.
- [ ] Une seule version du domaine est principale (avec ou sans `www`), l'autre redirige.
- [ ] Le validateur HTML ne signale pas d'erreur bloquante.
- [ ] Le score Lighthouse est bon en Performance, Accessibilité, Bonnes pratiques et SEO (visez 90 ou plus).
- [ ] La favicon s'affiche.
- [ ] Sur WordPress : versions à jour, extensions inutiles supprimées, comptes de test supprimés, Santé du site au vert.

## 4. Référencement

- [ ] La case « **Demander aux moteurs de ne pas indexer ce site** » (WordPress) est **décochée**, ou la balise `noindex` retirée.
- [ ] Le fichier `robots.txt` n'interdit pas tout le site.
- [ ] Chaque page a un **`<title>`** unique et une **méta-description** rédigée.
- [ ] Les titres des pages suivent une hiérarchie logique (un seul `h1`).
- [ ] Un **plan du site XML** existe et sera déclaré dans la Search Console.
- [ ] En cas de refonte : les **redirections 301** des anciennes adresses vers les nouvelles sont en place.
- [ ] L'aperçu de partage (titre, description, image) s'affiche correctement sur les réseaux sociaux et les messageries.

## 5. Légal

- [ ] **Mentions légales** complètes, avec les vraies informations de l'éditeur et de l'hébergeur.
- [ ] **Politique de confidentialité** adaptée au site réel (formulaire, extensions, durées de conservation, sous-traitants).
- [ ] **Mention d'information** sous chaque formulaire collectant des données.
- [ ] **Aucun traceur non essentiel avant consentement**, ou bandeau de consentement conforme.
- [ ] Si le site vend : **CGV**, informations précontractuelles, médiateur de la consommation.
- [ ] Si l'entreprise y est soumise : **déclaration d'accessibilité**.

## 6. Accès et propriété

- [ ] Le **nom de domaine** est au nom du client, et la date de renouvellement est notée.
- [ ] Le client a reçu tous ses **identifiants** (hébergement, domaine, administration, comptes tiers), de manière sécurisée.
- [ ] Les **sauvegardes** sont actives, externes, et une restauration a été testée.
- [ ] La **Search Console** (et éventuellement l'outil de statistiques) est configurée, au nom du client.
- [ ] Le **guide d'utilisation** est remis.

## Le jour J

La mise en ligne elle-même se prépare :

1. **Choisissez le moment** : un mardi ou un mercredi matin plutôt qu'un vendredi soir. S'il y a un problème, vous voulez avoir le temps de le corriger, et que le client soit joignable.
2. **Baissez le TTL** des enregistrements DNS concernés la veille (voir « Les fondations du web »).
3. **Faites une sauvegarde** de l'ancien site s'il existe, et de la nouvelle version.
4. **Basculez**, puis vérifiez immédiatement les points critiques : accueil, formulaire, HTTPS, indexation autorisée.
5. **Prévenez le client** que la propagation peut prendre quelques heures, et qu'il peut voir l'ancien site pendant ce temps.
6. **Revérifiez le lendemain**, depuis un autre réseau (votre téléphone en 4G/5G, par exemple).

> **À retenir** « C'est en ligne » n'est pas la fin du projet. La fin, c'est quand vous avez vérifié, le lendemain, depuis un autre appareil, que tout fonctionne, et que le client a reçu tout ce qui lui appartient.

> **Exercice** Copiez cette checklist dans votre outil de notes et adaptez-la : supprimez ce qui ne s'applique jamais à vos projets, ajoutez trois points spécifiques à votre façon de travailler. Puis déroulez-la sur votre site d'entraînement. Combien de points échouent ? Notez-les : les chapitres suivants vont vous aider à les corriger.

## Ce qu'il faut retenir

- Une **checklist écrite**, cochée en vérifiant réellement, à chaque projet.
- Six domaines : **contenus, fonctionnel, technique, référencement, légal, accès**.
- Les grands classiques de l'oubli : **case « ne pas indexer »**, **formulaire non testé**, **mentions légales vides**, **domaine au nom du prestataire**.
- On publie **en début de semaine**, on **revérifie le lendemain**, depuis un autre réseau.
