---
titre: "Installer son atelier"
resume: "Éditeur de code, navigateurs, outils de développement, organisation des dossiers : un poste de travail propre dès le premier jour."
---

Un menuisier ne commence pas sans établi. Avant d'écrire votre première page, prenons une heure pour installer un poste de travail **simple, gratuit et professionnel**. Rien de ce qui suit ne coûte un euro, et tout fonctionne sur Windows, macOS et Linux.

## 1. Un éditeur de code

Un éditeur de code est un traitement de texte pour le code : il colore la syntaxe, complète les balises, signale les erreurs. Surtout, il n'ajoute rien de caché dans vos fichiers, contrairement à Word.

**Visual Studio Code** (VS Code), gratuit et édité par Microsoft, est aujourd'hui le standard de fait. Il existe une version entièrement libre, **VSCodium**, sans télémétrie. Les deux fonctionnent de la même façon. D'autres éditeurs existent (Zed, Sublime Text, les éditeurs JetBrains) ; prenez-en un et restez-y le temps d'apprendre.

### Les réglages à faire tout de suite

Ouvrez les paramètres (`Ctrl + ,` ou `Cmd + ,`) et vérifiez :

- **Format On Save** : activé. Le code est remis en forme à chaque enregistrement.
- **Auto Save** : `afterDelay`. Vous ne perdrez plus de travail.
- **Tab Size** : `2`. C'est la convention la plus répandue en HTML et CSS.
- **Word Wrap** : `on`. Les longues lignes passent à la ligne au lieu de déborder.

### Trois extensions, pas plus

1. **Prettier** : formate automatiquement HTML, CSS et JavaScript selon des règles communes. Fini les débats sur l'indentation.
2. **Live Server** (ou **Live Preview**) : ouvre votre page dans le navigateur et la recharge à chaque enregistrement.
3. **Un correcteur orthographique français** (*French - Code Spell Checker*). Les fautes dans les textes d'un site coûtent plus cher en crédibilité que les bugs.

> **Astuce** Résistez à la tentation d'installer vingt extensions. Chacune ralentit l'éditeur et ajoute des comportements que vous ne comprendrez pas. Ajoutez-en une seulement quand un besoin réel se présente.

## 2. Deux navigateurs, au moins

Vos sites seront consultés dans plusieurs navigateurs. Installez-en au minimum deux, de moteurs différents :

- **Firefox** (moteur Gecko), dont les outils de développement sont excellents pour le CSS ;
- **Chrome** ou **Edge** (moteur Chromium), qui représentent la majorité des visites.

Si vous êtes sur Mac, vous avez Safari (moteur WebKit), qui est aussi celui de tous les navigateurs sur iPhone : à tester systématiquement avant une livraison.

## 3. Les outils de développement

C'est l'outil que vous utiliserez le plus, et le plus sous-estimé par les débutants. `F12` (ou clic droit → *Inspecter*) ouvre un panneau qui permet de :

- **Inspecter** n'importe quel élément : voir son HTML, les règles CSS qui s'y appliquent, et celles qui sont écrasées (barrées) ;
- **Modifier en direct** le CSS pour essayer une couleur ou un espacement sans toucher au fichier ;
- **Simuler un mobile** (icône de téléphone/tablette, ou `Ctrl + Maj + M`) avec différentes tailles d'écran ;
- **Voir le réseau** : chaque fichier chargé, son poids, son temps de chargement ;
- **Lire la console** : les erreurs JavaScript et les avertissements s'y affichent en rouge et jaune.

> **Exercice** Ouvrez le site d'un média que vous lisez. Avec l'inspecteur, sélectionnez le titre d'un article et changez sa couleur en `red` dans le panneau des styles. Puis passez en vue mobile et observez comment la mise en page s'adapte. Rien n'est cassé : vos modifications ne vivent que dans votre navigateur et disparaissent au rechargement.

## 4. Une organisation de dossiers qui tient la route

Les débutants perdent un temps fou à chercher leurs fichiers. Adoptez une structure **dès maintenant**, et gardez-la pour chaque projet.

```
Sites/
└── boulangerie-martin/
    ├── index.html
    ├── horaires.html
    ├── contact.html
    ├── css/
    │   └── style.css
    ├── js/
    │   └── menu.js
    ├── images/
    │   ├── devanture.jpg
    │   └── logo.svg
    └── documents/
        └── brief-client.pdf
```

Et ces règles de nommage, qui vous épargneront des bugs incompréhensibles :

- **minuscules uniquement** : certains serveurs distinguent `Logo.png` et `logo.png` ;
- **pas d'espaces ni d'accents** : `a-propos.html`, jamais `À propos.html` ;
- des **tirets** pour séparer les mots ;
- la page d'accueil s'appelle toujours **`index.html`** : c'est le fichier que les serveurs affichent par défaut.

## 5. Sauvegarder et versionner

Vos fichiers doivent exister à **au moins deux endroits**. Un dossier synchronisé dans un service de stockage en ligne est un minimum.

Le niveau professionnel, c'est **Git** : un outil qui enregistre l'historique complet de chaque modification et permet de revenir en arrière à tout moment. Couplé à un service comme GitHub, GitLab ou Codeberg, il sert aussi de sauvegarde et, nous le verrons dans « Mettre en ligne et faire durer », d'outil de publication. Installez-le dès maintenant (git-scm.com) ; VS Code sait l'utiliser sans passer par la ligne de commande.

Trois gestes suffisent pour commencer, depuis l'onglet *Contrôle de code source* de VS Code :

1. **Initialiser** le dépôt dans le dossier du projet ;
2. **Valider** (*commit*) avec un message clair à chaque étape franchie : « Ajoute la page horaires » ;
3. **Pousser** (*push*) vers un dépôt distant pour avoir une copie en ligne.

## 6. Une boîte à outils en ligne

Quelques ressources gratuites à mettre dans vos favoris dès aujourd'hui :

| Ressource | Pour |
|---|---|
| MDN Web Docs (developer.mozilla.org/fr) | La documentation de référence de HTML, CSS et JavaScript, en français |
| Can I use (caniuse.com) | Savoir si une fonctionnalité est prise en charge par les navigateurs |
| Validateur du W3C (validator.w3.org) | Vérifier qu'un HTML est correct |
| Squoosh (squoosh.app) | Compresser et convertir des images |
| WebAIM Contrast Checker | Vérifier le contraste des couleurs |

> **À retenir** MDN est votre manuel de référence. Quand vous cherchez « comment faire X en CSS », ajoutez « mdn » à votre recherche : vous tomberez sur une explication fiable plutôt que sur un forum de 2012.

## Ce qu'il faut retenir

- **VS Code** (ou VSCodium) avec Prettier, Live Server et un correcteur.
- **Deux navigateurs** de moteurs différents, et Safari/iPhone avant chaque livraison.
- Les **outils de développement** (`F12`) sont votre meilleur allié.
- Une **structure de dossiers** et des **noms de fichiers** stricts dès le premier projet.
- **Git** pour l'historique et la sauvegarde, et MDN comme documentation.
