---
titre: "Nom de domaine, hébergement, DNS"
resume: "Les trois briques indispensables pour qu'un site existe, comment les choisir et comment les relier."
---

Pour qu'un site soit accessible, il faut trois choses : une **adresse** (le nom de domaine), un **terrain** où poser les fichiers (l'hébergement), et un **panneau indicateur** qui relie les deux (le DNS). On les confond souvent parce que beaucoup de prestataires les vendent ensemble. Pourtant ce sont trois services distincts, et les comprendre séparément vous évitera bien des blocages.

## Le nom de domaine : une location, pas un achat

On dit « acheter un nom de domaine », mais on ne fait que le **louer**, généralement à l'année. Si vous oubliez de renouveler, le nom redevient disponible et quelqu'un d'autre peut le prendre. C'est arrivé à de grandes entreprises ; ça arrivera à des clients à vous si personne ne surveille.

Un nom de domaine se loue auprès d'un **bureau d'enregistrement** (*registrar*) : OVHcloud, Gandi, Infomaniak, Ionos, Namecheap, Cloudflare, etc. Ce bureau s'adresse lui-même au gestionnaire de l'extension, par exemple l'**AFNIC** pour le `.fr`.

### Choisir l'extension

| Extension | Pour qui | Remarque |
|---|---|---|
| `.fr` | Activité en France | Réservé aux personnes et entreprises de l'Union européenne (et quelques pays associés) |
| `.com` | Tout le monde | Le plus connu, mais les noms courts sont rares |
| `.eu` | Activité européenne | Moins répandu |
| `.org` | Associations | Usage non obligatoire, mais c'est la convention |
| `.studio`, `.design`, `.paris`… | Image de marque | Parfois chers au renouvellement : vérifiez le prix de la deuxième année |

### Choisir le nom

Quelques règles qui tiennent la route :

1. **Court et prononçable.** On doit pouvoir le dicter au téléphone sans l'épeler.
2. **Sans tiret si possible**, sans chiffre ambigu (« 2 » ou « deux » ?).
3. **Sans accent.** Les noms accentués existent techniquement, mais posent encore des problèmes avec certaines messageries.
4. **Vérifiez les marques.** Un nom de domaine identique à une marque déposée par un tiers peut vous être retiré. Une recherche rapide sur la base de l'INPI (data.inpi.fr) évite les mauvaises surprises.
5. **Réservez les variantes utiles** : la version `.com` si vous prenez le `.fr`, une faute de frappe courante si le nom est très exposé.

> **Le piège** Les « domaines premium » ou les promotions à 1 € la première année cachent parfois un renouvellement à 40 ou 60 €. Regardez toujours le prix de renouvellement, pas le prix d'appel.

### À qui doit appartenir le domaine ?

Quand vous créerez des sites pour d'autres, retenez ceci : **le nom de domaine doit être enregistré au nom du client**, sur un compte auquel il a accès. Si vous le gérez pour lui, faites-le de manière transparente. Un client qui découvre, au moment de changer de prestataire, que « son » domaine appartient à l'ancien est un client en colère, et à juste titre.

## L'hébergement : où vivent les fichiers

L'hébergeur vous loue une place sur un serveur. Il existe plusieurs formules, de la plus simple à la plus technique.

**L'hébergement statique.** Pour des sites faits uniquement de fichiers HTML, CSS, JavaScript et images. Des services comme Netlify, Cloudflare Pages ou GitHub Pages le proposent, souvent gratuitement pour de petits sites. Rapide, sûr, sans maintenance de serveur.

**L'hébergement mutualisé.** Vous partagez un serveur avec d'autres clients. Il fournit PHP et une base de données MySQL : c'est la formule classique pour WordPress. Quelques euros par mois chez o2switch, OVHcloud, Infomaniak, Hostinger, etc.

**Le serveur virtuel (VPS).** Une machine virtuelle pour vous seul, que vous administrez entièrement. Plus de puissance et de liberté, mais vous devenez responsable des mises à jour de sécurité du système. À réserver aux projets qui en ont vraiment besoin.

### Les critères qui comptent vraiment

- **Localisation des serveurs.** Pour un public français, des serveurs en France ou en Europe : meilleurs temps de réponse, et simplification vis-à-vis du RGPD.
- **Certificat HTTPS gratuit** (Let's Encrypt) inclus et renouvelé automatiquement.
- **Sauvegardes automatiques**, et possibilité de les restaurer soi-même.
- **Support réactif**, en français si votre client n'est pas technique.
- **Version de PHP récente** si vous faites du WordPress.

Méfiez-vous des promesses d'« espace disque illimité » : le vrai facteur limitant est presque toujours la puissance processeur et la mémoire allouées, rarement écrites en gros.

## Le DNS : le panneau indicateur

Le DNS est l'annuaire qui dit : « le domaine `boulangerie-martin.fr` se trouve à telle adresse IP ». Quand vous louez un domaine, le bureau d'enregistrement vous donne une **zone DNS** : une petite liste d'enregistrements que vous pouvez modifier.

### Les enregistrements à connaître

| Type | Rôle | Exemple |
|---|---|---|
| `A` | Relie un nom à une adresse IPv4 | `boulangerie-martin.fr → 51.91.236.193` |
| `AAAA` | Pareil, en IPv6 | `→ 2001:41d0:301::21` |
| `CNAME` | Fait d'un nom l'alias d'un autre | `www → boulangerie-martin.fr` |
| `MX` | Indique où livrer les e-mails | `→ mx1.mail.ovh.net` |
| `TXT` | Texte libre, souvent pour prouver qu'on possède le domaine | `v=spf1 include:…` |

Pour mettre un site en ligne, vous modifierez en général **un enregistrement A** (ou un CNAME) pour le faire pointer vers votre hébergeur. L'hébergeur vous indique toujours quelles valeurs saisir.

### Les serveurs de noms

Il existe une alternative : plutôt que de modifier les enregistrements chez le bureau d'enregistrement, vous pouvez **déléguer toute la zone** à l'hébergeur en changeant les *serveurs de noms* (*nameservers*). C'est plus simple pour un débutant, mais attention : la zone est alors gérée ailleurs, et les e-mails configurés sur l'ancienne zone peuvent cesser de fonctionner si vous ne les recréez pas.

> **Attention** Avant de toucher aux serveurs de noms d'un domaine qui sert déjà à recevoir des e-mails, notez **tous** les enregistrements existants (surtout `MX` et `TXT`). Un client qui ne reçoit plus ses e-mails pendant deux jours, c'est une urgence, pas un détail.

### La propagation

Une modification DNS n'est pas instantanée partout. Les serveurs DNS du monde entier gardent les réponses en mémoire pendant une durée appelée **TTL** (*time to live*), souvent d'une heure à une journée. Pendant ce délai, certains visiteurs voient l'ancien site, d'autres le nouveau. C'est normal.

Astuce de professionnel : la veille d'une migration, réduisez le TTL de l'enregistrement concerné à 5 minutes (300 secondes). Le basculement du lendemain sera quasi immédiat.

## L'e-mail professionnel, ce grand oublié

Un nom de domaine permet aussi d'avoir des adresses comme `contact@boulangerie-martin.fr`. Le service de messagerie est **encore un autre service**, que l'on relie au domaine via les enregistrements `MX`. Beaucoup d'hébergeurs l'incluent ; on peut aussi passer par un service dédié.

Pour que ces e-mails n'atterrissent pas en spam, trois enregistrements TXT sont aujourd'hui attendus : **SPF**, **DKIM** et **DMARC**. Le fournisseur de messagerie vous donne les valeurs exactes ; votre rôle est de savoir qu'ils existent et de vérifier qu'ils sont en place.

> **Exercice** Sur le site d'un bureau d'enregistrement, cherchez trois noms de domaine possibles pour une activité fictive (une fleuriste à Nantes, par exemple). Notez pour chacun : la disponibilité en `.fr` et en `.com`, le prix de la première année et le prix de renouvellement. Puis, avec l'outil en ligne « DNS lookup » de votre choix, observez les enregistrements `A` et `MX` d'un site que vous connaissez.

## Ce qu'il faut retenir

- **Nom de domaine** = adresse louée à l'année auprès d'un bureau d'enregistrement. À renouveler, et à enregistrer au nom de son propriétaire réel.
- **Hébergement** = l'endroit où sont stockés les fichiers : statique, mutualisé ou VPS selon le projet.
- **DNS** = l'annuaire qui relie les deux. Les enregistrements `A`, `CNAME` et `MX` couvrent l'essentiel des besoins.
- Une modification DNS met du temps à se **propager** ; baissez le TTL avant une migration.
- L'e-mail est un service à part, relié par les enregistrements `MX`, `SPF`, `DKIM` et `DMARC`.
