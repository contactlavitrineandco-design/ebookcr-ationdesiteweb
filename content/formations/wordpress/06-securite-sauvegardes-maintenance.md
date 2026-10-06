---
titre: "Sécurité, sauvegardes et maintenance"
resume: "Pourquoi les sites WordPress se font pirater, comment l'éviter, comment sauvegarder pour de vrai, et quelle routine de maintenance proposer."
---

Un site WordPress n'est pas un objet qu'on livre et qu'on oublie. C'est un logiciel qui tourne sur un serveur, exposé en permanence à des robots qui testent automatiquement des milliers de sites par minute. Ils ne visent pas votre client en particulier : ils cherchent **n'importe quel** site vulnérable. La bonne nouvelle, c'est qu'une hygiène de base suffit à se mettre hors de portée de l'immense majorité de ces attaques.

## Pourquoi les sites WordPress se font pirater

Les causes sont toujours à peu près les mêmes, par ordre de fréquence :

1. **Des extensions ou thèmes pas à jour**, contenant une faille connue et publiée.
2. **Des mots de passe faibles** ou réutilisés, devinés ou issus de fuites de données.
3. **Des extensions ou thèmes piratés** (*nulled*), qui contiennent une porte dérobée dès l'installation.
4. **Des comptes oubliés** : un ancien stagiaire administrateur, un compte de test jamais supprimé.
5. **Un hébergement négligé** : version de PHP obsolète, permissions de fichiers trop larges.

Le cœur de WordPress lui-même est rarement en cause : il est examiné en permanence par une large communauté et corrigé rapidement. Le maillon faible, c'est tout ce qui gravite autour.

## Les mesures qui comptent vraiment

### 1. Les mises à jour

C'est **la** mesure la plus efficace. Trois niveaux :

- **le cœur de WordPress** : les mises à jour mineures (correctifs de sécurité) s'installent automatiquement par défaut. Laissez ce comportement activé. Les mises à jour majeures se font après une sauvegarde, idéalement testées d'abord sur une copie du site ;
- **les extensions et thèmes** : WordPress permet d'activer les mises à jour automatiques extension par extension. C'est raisonnable pour les extensions sérieuses et largement utilisées ;
- **PHP**, côté hébergeur : une version encore maintenue, que l'on monte quand l'hébergeur le propose, après vérification de compatibilité (*Outils → Santé du site* vous alerte).

### 2. Les accès

- **Mots de passe longs et uniques**, dans un gestionnaire de mots de passe.
- **Double authentification** (2FA) pour tous les comptes administrateurs, via une extension dédiée ou celle de votre extension de sécurité. Même un mot de passe volé devient inutilisable.
- **Limitation des tentatives de connexion**, pour freiner les attaques par force brute. Certains hébergeurs le font en amont.
- **Le minimum de comptes administrateurs**, et le bon rôle pour chacun.
- **Revue des comptes** à chaque intervention : supprimez ceux qui ne servent plus.

### 3. L'hébergement

Un bon hébergeur fait une bonne partie du travail : pare-feu applicatif, détection de logiciels malveillants, isolation entre les clients, certificats HTTPS automatiques. C'est un critère de choix à part entière, pas un détail.

Vérifiez aussi les **accès à l'hébergement** lui-même (espace client, FTP, base de données) : mêmes règles de mots de passe, et double authentification si elle est proposée. Préférez **SFTP** au FTP, qui transmet les mots de passe en clair.

### 4. Quelques réglages de durcissement

Pour les profils un peu techniques, quelques lignes dans le fichier `wp-config.php` renforcent la sécurité :

```php
// Interdit la modification des fichiers de thèmes et d'extensions depuis l'administration
define( 'DISALLOW_FILE_EDIT', true );

// Force l'administration en HTTPS
define( 'FORCE_SSL_ADMIN', true );
```

La première empêche un intrus qui aurait obtenu un accès administrateur de modifier le code PHP directement depuis le tableau de bord. Modifiez ce fichier avec précaution, et toujours après une sauvegarde.

## Les sauvegardes, pour de vrai

Une sauvegarde n'a de valeur que si elle remplit **trois conditions** :

1. **Elle est complète** : base de données **et** fichiers (`wp-content` au minimum : thèmes, extensions, médias).
2. **Elle est ailleurs** : sur un stockage externe au serveur (stockage en ligne, autre hébergeur). Si le serveur est compromis ou supprimé, une sauvegarde stockée dessus disparaît avec lui.
3. **Elle a été restaurée au moins une fois.** Une sauvegarde jamais testée est une hypothèse, pas une sauvegarde.

Appliquez la règle classique du **3-2-1** : trois copies des données, sur deux supports différents, dont une hors site.

| Fréquence | Pour quel site |
|---|---|
| Quotidienne | Site avec formulaires stockés, actualités fréquentes, boutique |
| Hebdomadaire | Site vitrine mis à jour quelques fois par mois |
| Avant chaque intervention | **Toujours**, quelle que soit la fréquence habituelle |

Conservez plusieurs générations (par exemple 30 jours) : un piratage discret peut n'être découvert que trois semaines après les faits, et il faut alors pouvoir remonter à une version saine.

> **Exercice** Dans votre WordPress d'entraînement, configurez une sauvegarde complète vers un stockage externe. Puis faites l'exercice que presque personne ne fait : supprimez une page et une image, et **restaurez** la sauvegarde pour les récupérer. Chronométrez. Vous saurez désormais combien de temps prend une restauration, une information précieuse le jour où elle sera urgente.

## Et si le site est piraté ?

Les signes : redirections vers des sites douteux, pages en langue étrangère apparues dans les résultats de recherche, alerte de l'hébergeur, avertissement « site dangereux » dans le navigateur, comptes administrateurs inconnus.

La marche à suivre, dans l'ordre :

1. **Ne pas paniquer, ne rien supprimer à la hâte.** Prévenez l'hébergeur, qui a souvent des outils et des journaux utiles.
2. **Mettre le site en maintenance** ou le suspendre pour protéger les visiteurs.
3. **Changer tous les mots de passe** : WordPress, hébergement, FTP, base de données.
4. **Restaurer une sauvegarde saine**, antérieure à l'intrusion, puis **mettre à jour immédiatement** tout ce qui doit l'être. Sans cela, la même faille resservira.
5. **Identifier la cause** (extension vulnérable, mot de passe compromis) et la supprimer.
6. **Vérifier** les comptes utilisateurs, et demander un réexamen dans la Search Console si le site était signalé comme dangereux.
7. **Évaluer la fuite de données** : si des données personnelles ont pu être consultées (messages de formulaires, comptes clients), le responsable du traitement (votre client) peut avoir l'obligation de **notifier la CNIL dans les 72 heures** (article 33 du RGPD). Informez-le sans attendre.

## La routine de maintenance

Voici une routine mensuelle réaliste pour un site vitrine, que vous pourrez proposer à vos clients sous forme de contrat de maintenance (le livre « Du savoir-faire au métier » vous aide à la chiffrer) :

**Chaque mois**
- [ ] Sauvegarde complète vérifiée.
- [ ] Mises à jour du cœur, des extensions et du thème, puis vérification visuelle des pages principales.
- [ ] Revue de Santé du site.
- [ ] Test du formulaire de contact (envoi et réception).
- [ ] Revue des comptes utilisateurs.

**Chaque trimestre**
- [ ] Test de restauration d'une sauvegarde sur un environnement de test.
- [ ] Revue des extensions : toujours utiles ? toujours maintenues ?
- [ ] Contrôle des performances (Lighthouse) et du référencement (Search Console).
- [ ] Vérification de la version de PHP.

**Chaque année**
- [ ] Renouvellement du nom de domaine, de l'hébergement et des licences payantes (vérifiez les dates **avant** l'échéance).
- [ ] Relecture des mentions légales et de la politique de confidentialité.

> **À retenir** Documentez chaque intervention dans un journal de maintenance (date, actions, versions, anomalies). Il prouve votre travail au client, et il est inestimable le jour où quelque chose casse : vous saurez exactement ce qui a changé.

## Ce qu'il faut retenir

- Les piratages viennent surtout d'**extensions non mises à jour**, de **mots de passe faibles** et de **thèmes piratés**.
- **Mises à jour**, **double authentification**, **peu de comptes administrateurs**, **bon hébergeur** : 90 % de la sécurité.
- Une sauvegarde est **complète**, **externe**, et **déjà restaurée une fois**.
- En cas de piratage : suspendre, changer les accès, restaurer, mettre à jour, trouver la cause, et penser à la **notification CNIL** si des données ont fuité.
- Une **routine de maintenance** mensuelle, trimestrielle et annuelle, documentée dans un journal.
