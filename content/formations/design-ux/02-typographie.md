---
titre: "La typographie, 90 % du design"
resume: "Choisir ses polices, construire une échelle de tailles, régler interlignage et longueur de ligne. La compétence qui transforme le plus vite un site."
---

Un site web est fait de texte à plus de 90 %. Améliorer la typographie, c'est donc améliorer presque toute la surface du site d'un seul geste. C'est aussi le domaine où quelques règles simples produisent l'effet le plus spectaculaire.

## Les familles de polices

Sans entrer dans une classification d'historien, retenez quatre grandes familles :

| Famille | Caractéristique | Impression générale | Usage typique |
|---|---|---|---|
| **Avec empattements** (*serif*) | Petits traits aux extrémités des lettres | Classique, littéraire, institutionnel, élégant | Titres, textes longs, secteurs traditionnels ou haut de gamme |
| **Linéales** (*sans-serif*) | Sans empattements | Moderne, neutre, technique, accessible | Texte courant, interfaces, la majorité des sites |
| **Monospaces** | Toutes les lettres ont la même largeur | Technique, brut | Code, détails ponctuels |
| **Display / manuscrites** | Très expressives | Forte personnalité | Logos, très gros titres, avec beaucoup de modération |

Il n'y a pas de famille « meilleure ». Une linéale bien choisie convient à presque tout ; un titre à empattements apporte immédiatement du caractère.

## Combien de polices ?

**Une ou deux. Jamais plus.**

- **Une seule famille**, en jouant sur les graisses (normal, demi-gras, gras) et les tailles : c'est la solution la plus sûre, et souvent la plus élégante.
- **Deux familles** : une pour les titres, une pour le texte. Associez-les par **contraste** (une à empattements et une linéale, par exemple) plutôt que par ressemblance : deux linéales presque identiques donnent l'impression d'une erreur.

Les polices **variables** (une seule police qui contient toute une gamme de graisses et parfois de largeurs) sont aujourd'hui largement prises en charge. Elles offrent beaucoup de nuances pour un seul fichier.

## Où trouver des polices, légalement

Une police est un logiciel, protégé par une **licence**. Vérifiez toujours qu'elle autorise un usage sur le web.

- **Les polices libres** (licence SIL Open Font License, par exemple) sont utilisables gratuitement, y compris pour des projets commerciaux. Google Fonts et Fontsource en proposent des centaines.
- **Les fonderies indépendantes** vendent des polices sous licence, souvent d'excellente qualité, qui distingueront un site de ceux qui utilisent toujours les mêmes polices gratuites.
- **Les polices système** (déjà installées sur les appareils) ne demandent aucun téléchargement : `system-ui` donne un rendu natif et rapide.

> **Attention** Charger des polices depuis un serveur tiers (en appelant directement un service de polices en ligne) transmet l'adresse IP de chaque visiteur à ce tiers. En Europe, des décisions de justice ont jugé cette pratique contraire au RGPD sans consentement. **Hébergez vos polices sur votre propre serveur** : c'est plus respectueux, plus rapide, et WordPress le fait automatiquement avec sa bibliothèque de polices.

## L'échelle typographique

Les tailles de texte d'un site ne doivent pas être choisies au hasard. On utilise une **échelle** : une série de tailles liées par un rapport constant. Par exemple, avec un texte de base de 18 px et un rapport de 1,25 :

| Usage | Calcul | Taille |
|---|---|---|
| Petit texte (mentions, légendes) | 18 ÷ 1,25 | ≈ 14 px |
| **Texte courant** | base | **18 px** |
| Intertitre `h3` | 18 × 1,25 | ≈ 22 px |
| Intertitre `h2` | 18 × 1,25² | ≈ 28 px |
| Titre de section | 18 × 1,25³ | ≈ 35 px |
| Titre de page `h1` | 18 × 1,25⁴ | ≈ 44 px |
| Très grand titre d'accueil | 18 × 1,25⁵ | ≈ 55 px |

Un rapport faible (1,2) donne une hiérarchie douce, adaptée aux sites riches en texte ; un rapport fort (1,333 ou 1,5) donne des titres spectaculaires, adaptés aux pages d'accueil aérées. Sur mobile, on réduit le rapport pour que les grands titres ne débordent pas : c'est exactement ce que fait `clamp()`, vu dans « HTML & CSS, à la main ».

**Taille du texte courant :** 16 px est un minimum ; **17 à 20 px** est plus confortable pour un site de contenu. Les écrans sont plus loin des yeux qu'un livre.

## L'interlignage

L'interlignage (`line-height`) est l'espace entre les lignes.

- **Texte courant : 1,5 à 1,7.** Plus la ligne est longue, plus l'interlignage doit être généreux, pour que l'œil retrouve la ligne suivante.
- **Titres : 1,05 à 1,25.** Les grands caractères ont besoin de moins d'interlignage ; un titre sur deux lignes avec un interlignage de 1,6 paraît disloqué.

## La longueur de ligne

C'est le réglage le plus négligé, et l'un des plus importants : **entre 50 et 75 caractères par ligne** pour un texte courant (espaces compris), idéalement autour de 65.

En dessous, l'œil saute sans cesse à la ligne ; au-dessus, il se perd en revenant au début. En CSS : `max-width: 65ch;`. Sur un grand écran, cela signifie un texte qui n'occupe pas toute la largeur : c'est voulu.

## La graisse, l'alignement et les détails

- **Le gras se mérite.** S'il y a du gras partout, il n'y en a nulle part. Réservez-le aux titres et à quelques mots-clés.
- **Alignez à gauche.** Le texte justifié crée sur le web des « rivières » d'espaces irrégulières, car les navigateurs coupent mal les mots. Le centrage convient aux titres courts et aux blocs de deux ou trois lignes, jamais aux paragraphes.
- **Évitez les majuscules** sur des phrases entières : elles se lisent plus lentement. Pour un petit surtitre en capitales, ajoutez un léger espacement des lettres (`letter-spacing: 0.05em` à `0.1em`).
- **Soignez la typographie française** : espace insécable avant `: ; ! ?` et à l'intérieur des guillemets « », apostrophe typographique (’), points de suspension (…), tirets corrects. Un texte sans ces détails trahit immédiatement le travail bâclé, surtout auprès d'un public exigeant.

## Le contraste de hiérarchie

Une bonne hiérarchie se voit **en plissant les yeux**. Floutez la page (ou reculez de deux mètres) : vous devez distinguer immédiatement le titre principal, les intertitres et les blocs de texte. Si tout se ressemble, renforcez les écarts de taille, de graisse ou de couleur. Une différence timide (18 px contre 20 px) ne crée pas de hiérarchie, elle crée une hésitation.

> **Exercice** Choisissez une ou deux polices libres adaptées à votre entreprise d'entraînement (justifiez le choix en une phrase par rapport à l'impression recherchée). Construisez une échelle de 6 tailles avec un rapport de 1,25, puis appliquez-la à votre page d'accueil (variables CSS ou styles globaux WordPress). Réglez l'interlignage du texte et des titres, limitez la largeur des paragraphes à 65ch, et corrigez la typographie française de vos textes. Faites une capture avant et après : la différence vous surprendra.

## Ce qu'il faut retenir

- **Une ou deux polices**, associées par contraste, avec une licence web valide, **hébergées sur votre serveur**.
- Une **échelle typographique** fondée sur un rapport constant ; texte courant à **17-20 px**.
- **Interlignage** de 1,5 à 1,7 pour le texte, 1,05 à 1,25 pour les titres.
- **50 à 75 caractères** par ligne : `max-width: 65ch`.
- Gras rare, alignement à gauche, **typographie française** soignée.
- La hiérarchie doit se voir **en plissant les yeux**.
