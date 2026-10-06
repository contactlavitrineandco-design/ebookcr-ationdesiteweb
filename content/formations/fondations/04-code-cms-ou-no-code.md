---
titre: "Coder, utiliser un CMS ou du no-code ?"
resume: "Les trois familles d'outils, leurs vrais avantages, leurs vrais coûts, et une grille pour choisir selon le projet."
---

Il existe trois grandes façons de fabriquer un site : l'écrire soi-même en code, utiliser un **CMS** comme WordPress, ou passer par un outil **no-code** comme Webflow, Wix ou Squarespace. Chacune a ses défenseurs passionnés. Ce chapitre ne vous dira pas laquelle est la meilleure, parce que la question n'a pas de sens sans projet. Il vous donne de quoi **choisir, et justifier votre choix**, ce qui est exactement ce qu'un client attendra de vous.

## Le code « à la main »

Vous écrivez vous-même les fichiers HTML, CSS et, au besoin, JavaScript. Le résultat est un site statique, posé sur un hébergement simple.

**Avantages**
- Contrôle total sur le résultat, au pixel près.
- Performance excellente : rien d'inutile n'est chargé.
- Sécurité : pas de base de données, pas d'interface d'administration à pirater.
- Hébergement très bon marché, souvent gratuit.
- Aucune dépendance à un éditeur de logiciel.

**Limites**
- Le propriétaire du site ne peut pas modifier facilement ses contenus lui-même.
- Toute évolution passe par quelqu'un qui sait coder.
- Plus long à produire au début, tant qu'on n'a pas ses propres modèles.

**Idéal pour** : une page de présentation, un site de portfolio, un site événementiel, un site qui change rarement. Et pour **apprendre** : c'est la seule voie qui vous fait comprendre ce que tous les autres outils font à votre place.

## Le CMS : WordPress et les autres

Un CMS (*Content Management System*, système de gestion de contenu) sépare le **contenu** (stocké en base de données, modifiable via une interface) de la **présentation** (gérée par un thème). WordPress domine très largement ce marché ; on trouve aussi Drupal, Joomla, ou des CMS plus récents.

**Avantages**
- Le client modifie ses pages, ses actualités, ses photos, seul.
- Un écosystème immense de thèmes et d'extensions.
- Une communauté énorme : toute question a déjà une réponse quelque part.
- Logiciel libre : pas d'abonnement à l'outil lui-même, et le site peut changer d'hébergeur.

**Limites**
- **Maintenance obligatoire** : mises à jour du cœur, des extensions et du thème, sous peine de failles de sécurité.
- Performances à surveiller : un WordPress chargé d'extensions devient vite lent.
- Qualité très inégale des extensions et des thèmes.

**Idéal pour** : la majorité des sites vitrines de TPE, artisans, associations, professions libérales qui veulent publier eux-mêmes. C'est le sujet de « WordPress sans bricolage ».

## Le no-code hébergé : Webflow, Wix, Squarespace…

Ces plateformes réunissent tout en un seul abonnement : éditeur visuel, hébergement, nom de domaine parfois, formulaires, statistiques.

**Avantages**
- Prise en main rapide, résultat visuel immédiat.
- Pas de maintenance technique : la plateforme gère tout.
- Webflow en particulier offre un contrôle de mise en page proche du CSS.

**Limites**
- **Abonnement à vie** : le site n'existe que tant qu'on paie.
- **Dépendance** : on ne peut généralement pas exporter un site complet et fonctionnel pour le porter ailleurs. Si la plateforme augmente ses prix ou change ses conditions, on subit.
- Personnalisation plafonnée par ce que l'outil permet.

**Idéal pour** : des clients qui veulent tout déléguer, accepter un abonnement, et n'ont pas de besoin sortant de l'ordinaire.

## La grille de décision

Posez ces six questions au début de chaque projet. Les réponses désignent presque toujours l'outil.

| Question | Plutôt code | Plutôt CMS | Plutôt no-code |
|---|---|---|---|
| Le client modifiera-t-il le contenu lui-même ? | Rarement | Souvent | Souvent |
| Le client accepte-t-il un abonnement mensuel à vie ? | — | — | Oui |
| Quelqu'un assurera-t-il les mises à jour de sécurité ? | Pas nécessaire | **Indispensable** | Inclus |
| Le design est-il très spécifique ? | Oui | Selon le thème | Selon l'outil |
| La performance est-elle critique ? | Oui | À surveiller | Correcte |
| Le client veut-il pouvoir changer de prestataire facilement ? | Oui | Oui | Difficile |

> **Le piège** Choisir un outil parce que c'est celui qu'on maîtrise, et pas parce que c'est celui qui convient. Si vous ne connaissez que WordPress, tout ressemble à un site WordPress. Ce programme vous apprend volontairement le code *et* WordPress pour que votre choix soit libre.

## Et les générateurs de sites statiques ?

Entre le code pur et le CMS, il existe une famille intermédiaire : les **générateurs de sites statiques** (Eleventy, Hugo, Astro…). On écrit le contenu dans des fichiers texte simples, et l'outil assemble automatiquement les pages HTML à partir de modèles. On garde la rapidité et la sécurité du statique, avec la facilité de mise à jour d'un système de modèles.

C'est une excellente étape après « HTML & CSS, à la main », une fois que vous aurez écrit trois ou quatre sites et que vous en aurez assez de copier-coller votre en-tête dans chaque page.

## Et l'intelligence artificielle ?

Des outils génèrent aujourd'hui des pages entières à partir d'une description. Ils sont utiles pour aller vite sur un premier jet, ou pour débloquer un problème de CSS. Mais ils produisent régulièrement du code approximatif, peu accessible, ou qui « marche » sans qu'on sache pourquoi.

La compétence qui garde toute sa valeur, c'est celle de **juger** le résultat : est-ce sémantique, accessible, rapide, maintenable ? C'est exactement ce que ce programme vous apprend. Un professionnel qui sait lire et corriger le code d'une IA travaille plus vite que les deux pris séparément.

> **Exercice** Imaginez trois clients : (1) un photographe qui veut un portfolio élégant et ne publiera qu'une fois par an ; (2) un cabinet de kinésithérapie qui veut annoncer ses fermetures et ses nouveaux praticiens ; (3) une créatrice qui veut tout gérer seule, sans jamais parler technique, et accepte un abonnement. Pour chacun, passez la grille de décision et rédigez en trois lignes l'outil que vous recommanderiez, et pourquoi.

## Ce qu'il faut retenir

- **Code** : contrôle, performance, sécurité, mais modifications réservées aux initiés.
- **CMS** (WordPress) : autonomie du client, mais maintenance indispensable.
- **No-code** : simplicité, mais abonnement et dépendance à vie.
- On choisit l'outil **pour le projet**, avec une grille de questions, pas par habitude.
