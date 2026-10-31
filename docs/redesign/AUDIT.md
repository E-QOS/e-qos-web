# Audit initial, refonte premium e-qos.com

Date : 30 octobre 2026. Branche de départ : `main` (commit `82b4259`).

## 1. Stack

| Élément | Valeur |
|---|---|
| Build | Vite 6, TypeScript 5.7 (`tsc && vite build`) |
| UI | React 19, React Router 7 (`BrowserRouter`), pages chargées en `lazy()` |
| Styles | CSS Modules par page et composant, plus `src/styles/globals.css` et `variables.css` |
| Animation | `framer-motion` 12 (utilisé uniquement par la page d'accueil et `SectionWrapper`) |
| Icônes | `lucide-react`, `react-icons` (pied de page) |
| Données | Supabase (auth, articles, offres d'emploi) via `src/lib/supabase.ts`, `AuthContext` monté à la racine |
| Contact | `POST /api/contact/send`, proxifié par Netlify vers `e-qos-web-backend` (Render). Limitation de débit côté backend, aucun anti-spam côté front |
| Hébergement | Netlify (`netlify.toml`, repli SPA vers `index.html`) |
| Lint / tests | Aucun linter ni test configurés dans ce projet |
| Polices | Google Fonts (Inter dans `index.html`, Syne et DM Sans importées dans `globals.css`) |
| Analytics | Aucun outil d'analyse présent dans le dépôt |
| SEO | Balises title, description et Open Graph dans `index.html`, surchargées par page via `usePageMeta`. `robots.txt` présent (tout autorisé). **Aucun sitemap** |

Contenus : tous les textes sont codés en dur dans les composants de page (pas de CMS ni d'i18n), sauf les articles (`/ressources`) et les offres (`/carrieres`), lus dans Supabase.

## 2. Routes (40, toutes en 200 avec un `<h1>` rendu avant refonte)

- `/` accueil
- Services : `/services`, `/services/transformation-digitale`, `/services/conseil-organisationnel`, `/services/odoo`, `/services/paiements-locaux`, `/services/cybersecurite`, `/services/support`, `/services/management-consulting`, `/services/interim`, plus les alias `/services/erp`, `/services/paiements`, `/services/conseil`
- Secteurs : `/secteurs` et 8 pages (`mines-ressources`, `telecom`, `banque-finance`, `sante`, `secteur-public`, `agriculture`, `commerce-distribution`, `education`)
- Solutions : `/solutions`, `/solutions/wali`, `/solutions/wandi`, `/solutions/makiti`, plus les alias `/app/wali`, `/app/wandi`, `/app/makiti`
- `/ressources`, `/ressources/:slug`, `/a-propos`, `/contact`, `/carrieres`, `/profil`
- Équipe : `/equipe/direction-generale`, `/equipe/technique`, `/equipe/marketing`, `/equipe/support`
- Légal : `/mentions-legales`, `/confidentialite`

## 3. Page d'accueil actuelle (`src/pages/HomePage.tsx`)

| Section | Contenu | Remarques |
|---|---|---|
| Hero | Badge « CONAKRY, GUINÉE · EST. 2026 », H1 « Transformez votre organisation. Bâtissez l'avenir digital. », sous-titre, CTA « Découvrir nos services » et « Réserver un appel » (Google Agenda), trois chiffres (8+, 100 %, Guinée) | Fond sombre animé (canvas réseau), mascotte libellule animée, indicateur de défilement |
| Nos services | 8 cartes avec icône, titre, description, lien | Grille de cartes identiques |
| Notre force | Titre « Ancrés dans les réalités guinéennes », paragraphe, 3 points | Grille de 4 compteurs animés (8+ services, 20+ projets livrés, 3+ années, 1 pays) |
| Solutions propriétaires | Wali, Wandi, Makiti | Blocs colorés par produit |
| Secteurs d'activité | 8 secteurs en cartes à icône | |
| Témoignages | 3 citations nominatives en carrousel automatique (5 s) | Authenticité non vérifiable dans le dépôt (voir questions) |
| CTA final | « Votre transformation digitale commence ici. » | Bande orange en dégradé |

Composants globaux : `ScrollProgress` (barre de progression), `CustomCursor` (curseur personnalisé), `Header` (méga-menus au survol uniquement, boutons Connexion et S'inscrire), `Footer` (fond sombre, logo en texte).

## 4. Assets

- Logo : `public/images/e-qos-pruducts/eqos_logo.png` (PNG 1264 × 627, noir et orange, fond transparent, 32 ko). Copie légèrement différente dans `public/eqos_logo.png`. **Aucune version SVG, aucune version pour fond sombre.**
- Le logo comprend : un trait orange effilé qui s'élargit vers la droite et se termine par un bulbe, un point orange, une libellule orange, le mot E-QOS.
- Photos d'équipe et visuels produits dans `public/images/e-qos-pruducts/` (jusqu'à 1,5 Mo par image, JPEG/PNG non optimisés).
- Logos partenaires dans `public/images/partners/` (non utilisés par les pages actives).
- Favicons et `site.webmanifest`. `public/index.html` et `public/manifest.json` sont des restes de Create React App, non utilisés par Vite.

## 5. Mesures avant refonte

Build de production (`vite preview`), Lighthouse 12.2 mobile (émulation par défaut, 4G simulée), 2 passages par page.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 71 / 79 | 94 | 100 | 100 | 4,4 s / 4,1 s | 0,08 / 0 | 250 / 20 ms |
| `/contact` | 90 | 96 | 100 | 100 | 3,0 s | 0 | 20 ms |
| `/services/odoo` | 90 | 94 | 100 | 100 | 2,9 s | 0 | 20 ms |

Poids JS : bundle principal 501 ko (145,7 ko gzip), plus le chunk de l'accueil 166,7 ko (52,5 ko gzip). Total initial de l'accueil environ 200 ko gzip, au-delà du budget de 150 ko.

axe-core (WCAG 2.1 AA) : violations `color-contrast` (sérieuses) sur toutes les pages testées (5 à 19 nœuds par page). Lighthouse signale aussi `heading-order`.

Autres constats :
- Accueil : les sections sous le hero restent invisibles (opacité 0) tant qu'elles ne sont pas entrées dans le viewport. Une capture pleine page n'affiche donc qu'un grand vide sombre.
- Les méga-menus ne s'ouvrent qu'au survol, pas au clavier.
- Liens internes cassés : `/services/developpement` et `/services/ia-data` (pages Secteurs), routes inexistantes.
- Le lien « Mentions légales » du pied de page pointe vers `/contact` alors que `/mentions-legales` existe.
- `dist/` est versionné dans git alors que Netlify reconstruit le site.

Captures de référence : `docs/redesign/screenshots/before-*.png` (7 pages × 4 largeurs).

## 6. Incohérences de contenu relevées (non corrigées sans validation)

1. Présence : les métadonnées annoncent « Guinée, Sénégal et Mali », la page Secteurs parle de « projets réels en Guinée, au Sénégal et au Mali », mais l'accueil affiche « 1 Pays, Guinée », le pied de page « Présent en Guinée · Vision Afrique de l'Ouest » et À propos « Afrique de l'Ouest, expansion en cours ».
2. Le badge « Est. 2026 » contredit « 3+ années d'expertise » et « 20+ projets livrés ».
3. Les métadonnées citent « développement web & mobile » et « IA », mais aucune page de service ne les présente.
4. Les trois témoignages de l'accueil n'ont aucune source dans le dépôt.
