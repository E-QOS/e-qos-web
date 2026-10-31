# Refonte premium du site e-qos.com : recrutement et intérim pour les grands secteurs de Guinée

## Pourquoi

Le site est la vitrine d'E-QOS auprès de clients, d'institutions et de partenaires. Le design précédent ne reflétait pas le positionnement de la société : fonds sombres animés, compteurs, carrousel, cartes à ombres. Cette PR apporte deux choses :
- une direction éditoriale sobre : serif pour les titres, filets fins, beaucoup de blanc, orange en touches rares ;
- une réorientation de l'offre vers le recrutement et l'intérim pour les grands secteurs de Guinée.

La stack ne change pas (Vite, React 19, TypeScript, CSS Modules), aucune bibliothèque d'animation n'est ajoutée, et le logo n'est ni redessiné ni recoloré.

## Ce qui change

**Système de design**
- Tokens, Cormorant Garamond et Manrope auto-hébergées, focus visible, `prefers-reduced-motion`.
- Trait signature tiré du logo.

**En-tête**
- Bouton principal « Constituer une équipe ».
- Menu « Recrutement & intérim » : demande d'équipe, offres d'emploi, candidature spontanée.
- Sous-menus accessibles au clavier, menu mobile plein écran.

**Offre**
- Nouvelle page `/recrutement-interim`, avec six secteurs en vitrines vidéo : mines, énergie, BTP, ports et logistique, agro-industrie, services.
- Accueil avec un hero vidéo plein cadre qui défile.
- Les vidéos sont à fournir : `public/media/secteurs/README.md`.

**Parcours « Constituer une équipe »** (`/constituer-une-equipe`)
- 4 étapes avec brouillon conservé, référence `EQ-AAMMJJ-XXXX`.
- Le dossier est enregistré dans Supabase (`team_requests`) et envoyé aux agents par l'API.
- Replis si l'API ou la base ne sont pas encore à jour.

**Services et pages**
- Services réorganisés en deux familles : recrutement et intérim (tous métiers), puis conseil et services numériques au second plan.
- Retirés à la demande :
  - Odoo et Paiements locaux, redirigés en 301 vers `/services` ;
  - IoT / énergie propre ;
  - les chiffres « 98 % », « 24h/24 », « 15 min » et « 12+ ».
- Carrières, Ressources, articles, profil, pages légales et À propos (deux métiers, faits sourcés) sont alignés sur le système.
- La candidature spontanée enregistre le secteur et le métier visés.

**Performance**
- Supabase et la modale d'authentification ne sont plus dans le bundle initial.
- Les sections de l'accueil hors écran sont rendues à la demande.

Détail complet, textes modifiés et questions ouvertes : `docs/redesign/REPORT.md`.

## Dépendances de mise en ligne

Ordre : **migration Supabase, puis backend, puis site, puis admin**.

1. **Migration** `e-qos-web-backend/supabase/migrations/003_team_requests_talent_pool.sql` : table `team_requests`, colonnes `sector` / `trade`. Elle n'est pas encore appliquée en production.
2. **Backend** : route `POST /api/team-requests/notify`, sur la branche `redesign/premium` de `e-qos-web-backend`, non poussée dans ce lot.

Le site reste fonctionnel sans ces deux étapes. Le parcours se replie sur `/api/contact/send`, puis sur un email, et la candidature s'envoie sans secteur ni métier.

La console admin, PR séparée sur `e-qos-web-admin`, traite les demandes d'équipe et les viviers.

## Mesures (Lighthouse mobile, médianes appariées avant/après)

| Page | Perf. | Access. | LCP | CLS | Poids |
|---|---|---|---|---|---|
| `/` | 67 → **91** | 94 → **100** | 4,5 → **2,1 s** | 0,08 → **0** | 363 → **174 Kio** |
| `/contact` | 83 → 86 | 96 → **100** | 3,4 → **2,4 s** | 0 | 241 → 177 Kio |

Autres contrôles :
- axe-core (WCAG 2.1 AA) : 0 violation, y compris sur le nouvel en-tête ;
- toutes les routes répondent, et les redirections ont été vérifiées ;
- `npm run build` passe sans avertissement.

## Captures

| | Avant | Après |
|---|---|---|
| Accueil 375 px | ![](https://github.com/E-QOS/e-qos-web/blob/redesign/premium/docs/redesign/screenshots/before-home-375.png?raw=true) | ![](https://github.com/E-QOS/e-qos-web/blob/redesign/premium/docs/redesign/screenshots/after-home-375.png?raw=true) |
| Accueil 1280 px | ![](https://github.com/E-QOS/e-qos-web/blob/redesign/premium/docs/redesign/screenshots/before-home-1280.png?raw=true) | ![](https://github.com/E-QOS/e-qos-web/blob/redesign/premium/docs/redesign/screenshots/after-home-1280.png?raw=true) |
| Contact 375 px | ![](https://github.com/E-QOS/e-qos-web/blob/redesign/premium/docs/redesign/screenshots/before-contact-375.png?raw=true) | ![](https://github.com/E-QOS/e-qos-web/blob/redesign/premium/docs/redesign/screenshots/after-contact-375.png?raw=true) |

En-tête :

![](https://github.com/E-QOS/e-qos-web/blob/redesign/premium/docs/redesign/screenshots/after-header-menu-1440.png?raw=true)

Toutes les captures : `docs/redesign/screenshots/`.

## À valider avant fusion

1. Textes de la nouvelle offre : ils ont été rédigés pour cette refonte et doivent être validés par E-QOS.
2. Cadre légal de l'intérim en Guinée (agrément) et lieux cités (Boké, Kamsar, Simandou…).
3. Présence réelle : Guinée seule, ou Guinée, Sénégal et Mali ?
4. Vidéos des secteurs à fournir.
5. Contenu des mentions légales.
6. Logo SVG et version pour fond sombre.

## Comment tester

```bash
npm install
npm run build && npm run preview
```

Parcours à vérifier :
- en-tête au clavier (Tab dans « Recrutement & intérim ») ;
- menu mobile à 375 px ;
- parcours « Constituer une équipe » jusqu'à l'envoi ;
- formulaire de contact, vide puis rempli ;
- candidature spontanée depuis Carrières ;
- `/services/odoo`, qui doit rediriger vers `/services`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
