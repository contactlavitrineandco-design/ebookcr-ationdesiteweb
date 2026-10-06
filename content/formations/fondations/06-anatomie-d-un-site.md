---
titre: "Anatomie d'un site vitrine"
resume: "Les pages, l'arborescence, la navigation et les contenus qu'on retrouve sur presque tous les sites. Et comment les préparer avant d'écrire une ligne de code."
---

Vous savez maintenant comment le web fonctionne, ce que font les trois langages, quel outil choisir et comment installer votre atelier. Avant de passer à la pratique, il reste une étape que beaucoup sautent et regrettent : **savoir ce qu'on va construire**.

Un site vitrine, c'est-à-dire un site qui présente une activité, suit presque toujours la même anatomie. La connaître vous fera gagner un temps considérable, et vous permettra de repérer immédiatement ce qui manque à un projet.

## Les pages incontournables

### L'accueil

C'est la page la plus visitée, mais souvent pas la première vue : beaucoup de visiteurs arrivent directement sur une page intérieure depuis un moteur de recherche. L'accueil doit répondre en quelques secondes à trois questions :

1. **Qu'est-ce que c'est ?** (une boulangerie artisanale)
2. **Est-ce pour moi ?** (à Lyon 7e, ouverte le dimanche)
3. **Que puis-je faire maintenant ?** (voir les horaires, commander une pièce montée)

### Les pages d'offre

Une page par service, produit ou famille de produits. C'est là que le visiteur prend sa décision, et c'est aussi là que les moteurs de recherche trouvent le plus de contenu à indexer. Une erreur fréquente : tout entasser sur une page « Services » unique.

### À propos

Les visiteurs veulent savoir **qui** est derrière. Une photo réelle, un parcours, des valeurs concrètes. C'est souvent la deuxième page la plus consultée d'un site de petite entreprise.

### Contact

Coordonnées complètes, formulaire si utile, plan d'accès, horaires. Un numéro de téléphone cliquable sur mobile (`<a href="tel:+33478000000">`).

### Les pages légales

En France, tout site professionnel doit comporter des **mentions légales**, et une **politique de confidentialité** dès qu'il collecte des données (un simple formulaire de contact suffit). Nous verrons le détail dans « Mettre en ligne et faire durer ». Pour l'instant, retenez qu'elles font partie du périmètre, et pas en option.

## L'arborescence

L'arborescence, c'est le **plan du site** : la liste des pages et leurs liens de parenté. On la dessine avant tout le reste.

```
Accueil
├── Nos pains
├── Pâtisserie
│   ├── Gâteaux du week-end
│   └── Pièces montées sur commande
├── La boulangerie (à propos)
├── Horaires & accès
└── Contact
    (pied de page : Mentions légales · Confidentialité)
```

Deux principes simples :

- **Pas plus de trois niveaux** de profondeur pour un site vitrine. Au-delà, les visiteurs se perdent.
- **Des noms de menu que tout le monde comprend.** « Nos pains » plutôt que « L'univers du levain ». La créativité va dans les textes, pas dans la navigation.

## L'anatomie d'une page

Presque toutes les pages d'un site partagent la même ossature :

| Zone | Contenu habituel |
|---|---|
| **En-tête** | Logo (lien vers l'accueil), menu de navigation, parfois un bouton d'action principal |
| **Contenu principal** | Le sujet de la page, avec un seul titre principal |
| **Pied de page** | Coordonnées, liens secondaires, liens légaux, réseaux sociaux |

Sur l'accueil, le contenu principal se découpe souvent en **sections** qui s'enchaînent comme un argumentaire :

1. **Accroche** : titre, phrase de présentation, bouton d'action.
2. **Offre** : les deux à quatre services principaux, chacun menant à sa page.
3. **Preuves** : avis clients, références, chiffres, labels, photos de réalisations.
4. **Rassurance** : comment ça se passe, délais, garanties.
5. **Appel à l'action final** : contact, réservation, devis.

Vous retrouverez cette structure dans des milliers de sites. Ce n'est pas un manque d'imagination : c'est l'ordre dans lequel un visiteur se pose ses questions.

## Le contenu d'abord, le design ensuite

Voici la règle qui sépare les amateurs des professionnels : **on ne commence pas un site sans ses contenus**, ou au moins une version de travail.

Un design pensé pour un texte d'exemple (*lorem ipsum*) explose dès qu'arrive le vrai texte, trois fois plus long, avec un titre qui fait deux lignes. Les photos « en attendant » restent en ligne deux ans. Le site part avec trois semaines de retard parce que le client n'a « pas encore eu le temps » d'écrire sa page À propos.

Avant de coder, rassemblez donc :

- les **textes** de chaque page, même imparfaits ;
- les **images** (photos réelles de préférence, en bonne résolution) et le **logo** en format vectoriel (SVG ou PDF) si possible ;
- les **informations pratiques** : adresse, horaires, téléphone, numéro SIRET pour les mentions légales ;
- les **accès** : nom de domaine, hébergement, comptes existants.

> **Astuce** Créez un simple document partagé avec une rubrique par page de l'arborescence. Chaque rubrique contient : l'objectif de la page, le titre, les textes, la liste des images. Ce document devient la référence de tout le projet.

## Le parcours d'un visiteur

Pour finir, gardez en tête qu'un visiteur ne lit pas un site de haut en bas comme un livre. Il **survole**, cherche une réponse précise, et part s'il ne la trouve pas. Pour chaque page, demandez-vous :

- D'où vient le visiteur ? (moteur de recherche, réseau social, lien direct)
- Que cherche-t-il ? (un horaire, un prix, une preuve de sérieux)
- Quelle est la **seule** action que j'aimerais qu'il fasse ensuite ?

Si vous ne savez pas répondre à la troisième question, la page n'a pas encore de raison d'exister.

> **Exercice** Choisissez une petite entreprise près de chez vous (réelle, sans site ou avec un site daté). Dessinez son arborescence idéale sur papier, avec au maximum huit pages. Puis, pour la page d'accueil, listez les cinq sections dans l'ordre, avec pour chacune un titre provisoire. Gardez ce travail : il vous servira de sujet d'entraînement dans le livre suivant.

## Ce qu'il faut retenir

- Un site vitrine comprend un **accueil**, des **pages d'offre**, un **à propos**, un **contact** et les **pages légales**.
- On dessine l'**arborescence** avant tout, sur trois niveaux maximum.
- Chaque page partage une ossature : **en-tête, contenu principal, pied de page**.
- L'accueil suit l'ordre des questions du visiteur : accroche, offre, preuves, rassurance, action.
- **Le contenu d'abord** : pas de site sérieux sans textes et images réels.

Vous avez maintenant les fondations. Dans « HTML & CSS, à la main », on construit les murs.
