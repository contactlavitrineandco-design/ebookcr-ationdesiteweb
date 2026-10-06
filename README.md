# Charpente

**L'atelier pour apprendre à construire des sites web.** Six formations en e-book, vendues à l'unité (paiement unique, accès à vie, mises à jour incluses), lues en ligne dans un espace client protégé.

| Formation | Prix |
|---|---|
| 01 · Les fondations du web | 19 € |
| 02 · HTML & CSS, à la main | 29 € |
| 03 · WordPress sans bricolage | 29 € |
| 04 · Design & ergonomie pour non-designers | 24 € |
| 05 · Mettre en ligne et faire durer | 24 € |
| 06 · Du savoir-faire au métier | 29 € |
| **L'intégrale** (les 6 + les futures) | **79 €** au lieu de 154 € |

Le programme s'arrête volontairement **avant la prospection commerciale**. Les livres déjà achetés sont déduits du prix de l'intégrale.

---

## Démarrer

Prérequis : **Node.js 22.13 ou plus récent** (la base SQLite utilise le module natif `node:sqlite`, aucune base externe à installer).

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

Sans clé Stripe, en développement, les achats sont **simulés** (mode démo) pour tout tester. Ce mode est automatiquement désactivé en production.

```bash
npm run check:content  # vérifie le catalogue (fiches, chapitres, packs)
npm run lint           # vérification TypeScript
npm run build && npm start
```

## Modifier les contenus (sans toucher au code)

Tout est dans `content/` :

```
content/
├── site.json                 ← identité légale de l'éditeur (à remplir avant la mise en ligne)
├── packs.json                ← packs et leur prix
├── legal/                    ← mentions légales, CGV, confidentialité, cookies (Markdown)
└── formations/
    └── html-css/
        ├── formation.json    ← titre, prix, description, objectifs, couleur de couverture
        ├── 01-premiere-page.md
        └── 02-html-semantique.md …
```

- **Changer un prix** : modifier `"prix"` dans `formation.json` ou `packs.json`.
- **Modifier un chapitre** : éditer le fichier `.md` (Markdown standard).
- **Ajouter un chapitre** : créer `08-mon-chapitre.md`. Le numéro fixe l'ordre, le reste du nom devient l'adresse.
- **Ajouter une formation** : créer un dossier avec un `formation.json` et des chapitres. Elle apparaît partout, et les acheteurs de l'intégrale la reçoivent automatiquement.
- **Chapitre gratuit** : `apercu: true` dans l'en-tête du chapitre.

En-tête d'un chapitre :

```markdown
---
titre: "Le titre du chapitre"
resume: "Une phrase affichée dans le sommaire."
apercu: false
---
```

Encadrés : une citation qui commence par `**À retenir**`, `**Attention**`, `**Exercice**`, `**Astuce**` ou `**Le piège**` devient un encadré coloré.

Dans les textes légaux, `{{editeur.raisonSociale}}`, `{{emailContact}}`, etc. sont remplacés par les valeurs de `content/site.json`.

Après modification : `npm run check:content`, puis redéployer.

## Mise en production

1. **Remplir `content/site.json`** : raison sociale, SIRET, adresse, hébergeur, médiateur de la consommation, régime de TVA. Tant que des `[crochets]` subsistent, les pages légales ne sont pas valides.
2. **Stripe** (dashboard.stripe.com) :
   - `STRIPE_SECRET_KEY` (clé secrète, mode live) ;
   - créer un webhook vers `https://votre-domaine/api/stripe/webhook` avec les événements `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, `charge.refunded`, et renseigner `STRIPE_WEBHOOK_SECRET` ;
   - activer l'envoi des reçus et factures par e-mail aux clients (Paramètres → E-mails clients).
   - En local : `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
3. **SMTP** pour les e-mails transactionnels (bienvenue, confirmation d'achat, mot de passe oublié).
4. `APP_URL` = l'URL publique en `https://`, `ADMIN_EMAILS` = vos adresses (tableau de bord sur `/admin`), `TRUST_PROXY=true` derrière un reverse proxy.
5. Héberger sur un serveur Node persistant (VPS, Railway, Render, Fly.io, Scalingo…) avec un **volume** pour `data/`. Sauvegarder `data/charpente.db` régulièrement (une copie de fichier suffit).

> Les plateformes « serverless » sans disque persistant (Vercel, Netlify) ne conviennent pas à SQLite. Le schéma (`src/lib/db.ts`) se transpose tel quel vers PostgreSQL si besoin.

## Sécurité et conformité

**Protection des comptes et des données**
- Mots de passe hachés avec **scrypt** et sel unique ; comparaison à temps constant ; réponse identique que l'e-mail existe ou non.
- Sessions : jeton aléatoire de 256 bits en cookie `HttpOnly`, `Secure`, `SameSite=Lax` ; seul son empreinte SHA-256 est stockée.
- Verrouillage 15 min après 8 échecs ; limitation de débit sur l'inscription, la connexion, la réinitialisation et la commande ; champ piège anti-robots.
- Réinitialisation par lien à usage unique valable 1 h ; toutes les sessions sont fermées après un changement de mot de passe.
- Protection contre les redirections ouvertes ; Server Actions protégées par vérification d'origine (CSRF).

**En-têtes HTTP** : Content-Security-Policy stricte avec nonce par requête (aucun script tiers), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP ; `noindex` et `no-store` sur l'espace client.

**Paiements** : redirection vers Stripe Checkout (aucune donnée de carte ne transite par le site) ; montant calculé côté serveur ; accès accordé **uniquement** sur webhook signé (ou vérification serveur auprès de Stripe) ; webhooks idempotents ; contrôle du montant payé ; remboursement → retrait automatique des accès.

**Protection des e-books (créateurs)** : contenus stockés hors du dossier public et servis uniquement après vérification des droits ; filigrane nominatif (nom, e-mail, référence de commande) sur chaque page lue et imprimée ; licence personnelle rappelée en bas de chaque chapitre ; sélection de texte désactivée hors blocs de code ; pages non indexées.

**RGPD et droit de la consommation**
- Données minimales (nom, e-mail, commandes, progression). Aucun cookie publicitaire ni outil de mesure tiers → pas de bandeau de consentement nécessaire.
- Export JSON de toutes ses données (accès/portabilité) et suppression du compte en libre-service (effacement) ; les commandes payées sont anonymisées et conservées 10 ans (obligation comptable).
- Case de **renonciation au droit de rétractation** distincte et obligatoire (art. L221-28 13° C. conso.), horodatée et enregistrée avec la version des CGV acceptée.
- Mentions légales, CGV (licence d'utilisation, garantie de conformité, médiation), politique de confidentialité et page cookies fournies dans `content/legal/`.

> Les textes légaux sont des modèles soignés mais génériques : faites-les relire par un professionnel du droit avant le lancement, et vérifiez votre régime de TVA (vente de services numériques à des particuliers d'autres pays de l'UE : guichet OSS).

## Architecture

- **Next.js 16** (App Router, Server Components, Server Actions), **React 19**, TypeScript.
- **SQLite** via `node:sqlite` (`src/lib/db.ts`) — tables `users`, `sessions`, `orders`, `entitlements`, `progress`, `password_resets`, `webhook_events`.
- **Stripe Checkout** en paiement unique (`src/app/actions/checkout.ts`, `src/app/api/stripe/webhook/route.ts`).
- Rendu Markdown avec **marked**, HTML brut neutralisé (`src/lib/markdown.ts`).
- Polices auto-hébergées (Fraunces, Instrument Sans, JetBrains Mono via Fontsource) : aucune requête vers un service tiers.
- CSS écrit à la main (`src/app/globals.css`), sans framework.

```
src/
├── app/
│   ├── (site)/          pages publiques, espace client, commande, admin, pages légales
│   ├── lire/            liseuse des e-books
│   ├── actions/         Server Actions (auth, compte, paiement)
│   └── api/             webhook Stripe, export RGPD
├── components/
├── lib/                 base de données, auth, catalogue, commandes, Stripe, e-mails
└── proxy.ts             Content-Security-Policy
```
