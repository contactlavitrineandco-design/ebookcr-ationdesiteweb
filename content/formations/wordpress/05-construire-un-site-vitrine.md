---
titre: "Construire un site vitrine que le client sait modifier"
resume: "De l'arborescence aux menus, des pages aux médias : un site WordPress pensé pour être mis à jour par un non-technicien, sans casser la charte."
---

Le vrai critère de réussite d'un site WordPress n'est pas le jour de la livraison. C'est **six mois plus tard**, quand le client doit changer ses horaires, ajouter un nouveau service ou remplacer une photo, seul. S'il y arrive sans vous appeler et sans casser la mise en page, vous avez fait du bon travail.

Ce chapitre construit le site d'Atelier Nord avec cette idée en tête.

## 1. Créer l'arborescence

Commencez par créer **toutes les pages vides** (*Pages → Ajouter*), avec leur titre définitif :

- Accueil
- Réalisations
- Cuisines, Bibliothèques, Rangements (pages **enfants** de « Réalisations » ou pages de premier niveau, selon votre arborescence)
- L'atelier
- Contact
- Mentions légales
- Politique de confidentialité

Pour chaque page, vérifiez le **slug** (la fin de l'adresse, dans le panneau de droite) : court, en minuscules, sans mots inutiles. `/cuisines/` plutôt que `/nos-magnifiques-cuisines-sur-mesure/`.

Puis dans **Réglages → Lecture**, désignez « Accueil » comme page d'accueil statique.

## 2. Les menus

Dans l'Éditeur de site, ouvrez **Navigation** et composez le menu principal à partir des pages créées. Quelques principes :

- **cinq ou six entrées maximum** dans le menu principal ;
- l'appel à l'action principal (« Demander un devis ») peut prendre l'apparence d'un **bouton** ;
- les pages légales vont dans le **pied de page**, pas dans le menu principal ;
- vérifiez le comportement sur mobile : le bloc Navigation gère automatiquement un menu dépliable, réglable dans ses options.

## 3. Construire les pages avec des compositions

Plutôt que de construire chaque page bloc par bloc, procédez ainsi :

1. Construisez **une** section soignée (par exemple : un titre, un texte, trois cartes de services).
2. Transformez-la en **composition** (sélectionnez le groupe → *⋮ → Créer une composition*), avec un nom explicite : « Section — trois services ».
3. Faites de même pour chaque type de section récurrent : témoignage, appel à l'action, étapes, questions fréquentes, image et texte.
4. Construisez ensuite les pages en **assemblant** ces compositions.

Vous obtenez une **bibliothèque de sections** à la charte du client. Le jour où il veut une nouvelle page « Escaliers », il assemble des compositions existantes et remplace les textes. Le résultat est cohérent sans effort.

> **À retenir** Nommez vos compositions avec des mots que le client comprend. « Section — témoignage client » est clair ; « Hero v2 alt » ne l'est pas.

## 4. Les médias

La médiathèque est l'endroit où les sites WordPress prennent le plus de poids inutile. Avant de livrer :

- **Redimensionnez** les images avant de les envoyer : une photo de 6 000 pixels sortie d'un appareil photo pèse plusieurs mégaoctets. 2 000 pixels de large suffisent pour une image pleine largeur. WordPress génère automatiquement des tailles intermédiaires et utilise `srcset` (vu dans « HTML & CSS, à la main »), mais il conserve l'original.
- **Convertissez** en WebP ou AVIF quand c'est possible. Les versions récentes de WordPress prennent en charge ces formats.
- **Nommez les fichiers** avant l'envoi : `cuisine-chene-lambersart.webp` plutôt que `IMG_4528.jpg`. C'est utile pour le référencement et pour retrouver les images.
- **Renseignez le texte alternatif** dans la médiathèque. Il sera repris par défaut à chaque insertion.

Et un point de droit souvent négligé : **chaque image doit être utilisable légalement**. Photos du client (vérifiez qu'il en est l'auteur ou qu'il a les droits), banques d'images sous licence, illustrations créées pour le projet. Une image trouvée sur un moteur de recherche n'est pas libre de droits, et les agences qui défendent les photographes envoient des mises en demeure chiffrées en centaines d'euros.

## 5. Verrouiller ce qui ne doit pas bouger

L'éditeur de blocs permet de **verrouiller** des blocs (*⋮ → Verrouiller*) : empêcher leur déplacement, leur suppression, ou les deux. C'est très utile pour :

- les sections structurelles d'une page d'accueil ;
- l'en-tête et le pied de page ;
- les compositions synchronisées.

Le client peut alors modifier les **textes et les images**, mais pas la **structure**. C'est la meilleure protection contre le « j'ai voulu changer un mot et toute la page a disparu ».

Et rappelez-vous : un client connecté avec un compte **Éditeur** n'a pas accès à l'Éditeur de site ni aux styles globaux. Il ne peut modifier que les contenus.

## 6. Les pages légales

WordPress propose un modèle de **politique de confidentialité** (*Réglages → Confidentialité*). C'est un point de départ, à **adapter** : le texte générique ne correspond jamais exactement au site (quelles extensions, quels traceurs, quel hébergeur, quelle durée de conservation des messages du formulaire). Les mentions légales, elles, sont à rédiger avec les informations du client (identité, SIRET, hébergeur, directeur de publication).

Le contenu précis de ces pages est détaillé dans « Mettre en ligne et faire durer ». Ce qui compte ici : **elles font partie de la livraison**, au même titre que la page d'accueil.

## 7. Le guide du client

Le dernier livrable, et celui qui vous évitera le plus d'appels : un **guide d'utilisation court**, propre au site. Deux à quatre pages, avec des captures d'écran :

1. Se connecter (adresse de l'administration, gestionnaire de mots de passe).
2. Modifier un texte sur une page existante.
3. Remplacer une image (et renseigner son texte alternatif).
4. Créer une nouvelle page à partir des compositions.
5. Publier une actualité (si le site en a).
6. Ce qu'il ne faut pas faire : installer des extensions, changer de thème, supprimer des comptes.
7. Qui contacter en cas de problème.

Une courte vidéo d'écran commentée, enregistrée sur le vrai site du client, complète très bien ce guide.

> **Exercice** Construisez dans votre WordPress d'entraînement le site complet d'Atelier Nord (ou de votre entreprise d'entraînement) : toutes les pages de l'arborescence, menu principal et menu de pied de page, au moins cinq compositions nommées clairement, des images optimisées avec leur texte alternatif. Verrouillez les sections structurelles de l'accueil. Puis connectez-vous avec le compte Éditeur et essayez de créer une page « Escaliers » à partir des compositions, en chronométrant. Si cela prend plus de dix minutes, simplifiez vos compositions.

## Ce qu'il faut retenir

- On construit pour le client **dans six mois**, pas pour la démo de livraison.
- Arborescence et **slugs** courts d'abord, menu de cinq ou six entrées.
- Une **bibliothèque de compositions** à la charte permet au client de créer des pages cohérentes.
- Images **redimensionnées, nommées, décrites**, et **légalement utilisables**.
- **Verrouillez** la structure, laissez libres les textes et les images.
- Pages légales et **guide d'utilisation** font partie de la livraison.
