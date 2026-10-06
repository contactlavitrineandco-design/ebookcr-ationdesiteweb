---
titre: "Ce qui se passe entre un clic et une page"
resume: "Navigateur, serveur, requête, réponse : le trajet d'une page web, expliqué sans jargon inutile."
apercu: true
---

Vous tapez une adresse, vous appuyez sur Entrée, et une demi-seconde plus tard une page s'affiche. Entre les deux, une dizaine d'étapes se sont enchaînées. Vous n'avez pas besoin de toutes les connaître par cœur pour créer des sites, mais vous avez besoin d'en avoir une **image mentale juste**. C'est elle qui vous permettra, plus tard, de comprendre pourquoi un site est lent, pourquoi un nom de domaine « ne marche pas encore », ou pourquoi une modification n'apparaît pas.

Ce chapitre construit cette image.

## Deux ordinateurs qui se parlent

Le web repose sur une idée simple : **un ordinateur demande, un autre répond**.

- Celui qui demande, c'est le **client**. Concrètement, c'est votre navigateur : Firefox, Chrome, Safari, Edge.
- Celui qui répond, c'est le **serveur**. C'est un ordinateur allumé en permanence, quelque part dans un centre de données, qui garde les fichiers d'un site et les envoie à qui les demande.

Un serveur n'a rien de magique. C'est un ordinateur comme le vôtre, sans écran ni clavier, optimisé pour rester allumé et répondre vite. Quand on dit qu'un site est « hébergé », on dit simplement que ses fichiers sont posés sur un de ces ordinateurs.

> **À retenir** Un site web, c'est un ensemble de fichiers posés sur un serveur. Un navigateur, c'est un programme qui sait demander ces fichiers et les afficher.

## Le trajet, étape par étape

Prenons l'adresse `https://www.boulangerie-martin.fr/horaires`.

### 1. Le navigateur découpe l'adresse

Cette adresse s'appelle une **URL**. Elle contient plusieurs informations :

| Morceau | Nom | Rôle |
|---|---|---|
| `https://` | protocole | la « langue » utilisée, ici chiffrée |
| `www.boulangerie-martin.fr` | nom de domaine | l'identité du site |
| `/horaires` | chemin | la page précise demandée |

### 2. Il cherche l'adresse réelle du serveur

Les ordinateurs ne se trouvent pas par leur nom, mais par un numéro : l'**adresse IP** (par exemple `51.91.236.193`). Un nom de domaine est une étiquette lisible collée sur ce numéro.

Pour faire la correspondance, le navigateur interroge le **DNS** (Domain Name System), l'annuaire du web. Il demande : « quelle est l'adresse IP de `www.boulangerie-martin.fr` ? ». L'annuaire répond avec un numéro. Nous détaillerons le DNS au chapitre suivant, parce que c'est là que la plupart des débutants se perdent.

### 3. Il établit une connexion sécurisée

Le `s` de `https` signifie que la conversation est chiffrée. Avant d'échanger quoi que ce soit, le navigateur et le serveur se mettent d'accord sur une clé de chiffrement, et le serveur présente un **certificat** prouvant qu'il est bien `boulangerie-martin.fr`. C'est ce qui affiche le petit cadenas dans la barre d'adresse.

Aujourd'hui, un site sans HTTPS est signalé comme « non sécurisé » par les navigateurs. Ce n'est plus une option.

### 4. Il envoie une requête

Le navigateur envoie un court message texte, une **requête HTTP**, qui ressemble à ceci :

```
GET /horaires HTTP/1.1
Host: www.boulangerie-martin.fr
Accept-Language: fr-FR
```

Traduction : « Donne-moi la page `/horaires` du site `boulangerie-martin.fr`, en français si possible. »

### 5. Le serveur répond

Le serveur trouve (ou fabrique) la page demandée et renvoie une **réponse HTTP**. Elle commence par un **code de statut** :

| Code | Signification | Ce que vous verrez |
|---|---|---|
| `200` | Tout va bien | la page |
| `301` | Déplacé définitivement | une redirection automatique |
| `404` | Introuvable | la fameuse page « 404 » |
| `500` | Erreur du serveur | une page d'erreur, souvent blanche |

Puis vient le contenu : un fichier **HTML**.

### 6. Le navigateur lit, demande la suite, et affiche

Le HTML décrit la structure de la page. En le lisant, le navigateur découvre qu'il a besoin d'autres fichiers : une feuille de style CSS, des images, des polices, des scripts. Il les demande à leur tour, souvent en parallèle. Une page ordinaire nécessite ainsi entre 20 et 80 requêtes.

Une fois qu'il a de quoi faire, il **assemble** : il construit la structure, applique les styles, calcule la place de chaque élément, et peint le résultat à l'écran.

## Statique ou dynamique : deux façons de répondre

À l'étape 5, le serveur peut répondre de deux manières.

**Le site statique.** La page `/horaires` existe déjà sous forme de fichier, écrit à l'avance. Le serveur se contente de l'envoyer. C'est très rapide, très sûr, et peu coûteux à héberger. C'est le cas des sites que vous coderez à la main dans « HTML & CSS, à la main ».

**Le site dynamique.** La page n'existe pas à l'avance. Le serveur exécute un programme (en PHP pour WordPress, par exemple) qui va chercher les informations dans une **base de données**, assemble le HTML et l'envoie. C'est ce qui permet à quelqu'un de modifier son site depuis une interface d'administration, sans toucher au code.

Aucune approche n'est « meilleure ». Une boulangerie qui change ses horaires deux fois par an n'a pas les mêmes besoins qu'un restaurant qui publie son menu chaque semaine. Savoir choisir fait partie du métier, et c'est l'objet du chapitre 4.

## Pourquoi cette image mentale vous servira

Voici trois situations réelles que vous rencontrerez, et que ce chapitre vous permet déjà de comprendre :

1. **« J'ai acheté mon nom de domaine mais le site ne s'affiche pas. »** L'étape 2 n'aboutit pas : l'annuaire ne connaît pas encore la bonne adresse IP, ou ne la connaît que depuis quelques minutes.
2. **« J'ai modifié mon fichier CSS mais rien ne change. »** À l'étape 6, le navigateur a réutilisé une copie gardée en mémoire (le **cache**) au lieu de redemander le fichier. Un rechargement forcé (`Ctrl + Maj + R`, ou `Cmd + Maj + R` sur Mac) règle la question.
3. **« La page met cinq secondes à s'afficher. »** Il y a trop de fichiers à l'étape 6, ou des fichiers trop lourds, ou un serveur trop lent à l'étape 5. Vous saurez où chercher.

> **Exercice** Ouvrez n'importe quel site dans votre navigateur. Appuyez sur `F12` (ou clic droit → *Inspecter*), puis ouvrez l'onglet **Réseau** (*Network*). Rechargez la page. Comptez approximativement le nombre de requêtes affichées en bas, et repérez le premier fichier de la liste : c'est le HTML. Cliquez dessus et cherchez son code de statut. Vous venez d'observer les étapes 4 à 6 en direct.

## Ce qu'il faut retenir

- Le web, c'est un **client** (le navigateur) qui demande des fichiers à un **serveur**.
- Une **URL** contient un protocole, un nom de domaine et un chemin.
- Le **DNS** traduit le nom de domaine en adresse IP.
- **HTTPS** chiffre l'échange et prouve l'identité du site.
- Le serveur renvoie un **code de statut** (200, 301, 404, 500…) et un fichier **HTML**, qui appelle ensuite les autres fichiers.
- Un site peut être **statique** (fichiers prêts à l'avance) ou **dynamique** (pages fabriquées à la demande).

Au chapitre suivant, on s'attaque aux trois mots qui font le plus peur aux débutants : domaine, hébergement et DNS.
