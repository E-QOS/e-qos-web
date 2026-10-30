# Rapport final, refonte premium e-qos.com

Branche `redesign/premium`, à partir de `main` (`82b4259`). Projet : `e-qos-web` (Vite, React 19, TypeScript). Aucune dépendance ajoutée, aucun framework nouveau.

## 1. Résumé

- **Système de design** : tokens de la refonte (encre, papier, papier chaud, filets, orange en touches rares), Cormorant Garamond 500/600 pour les titres et Manrope variable pour le texte. Les polices sont auto-hébergées (latin et latin-ext) et préchargées. Plus aucune requête vers Google Fonts. Les anciens noms de variables pointent vers la nouvelle palette, ce qui fait hériter toutes les pages.
- **Signature** : trait effilé, bulbe et point orange en SVG inline (`SignatureStroke`). Il se trace en 1,2 s sous le titre du hero, puis sert deux fois de séparateur statique. Aucun autre ornement.
- **En-tête** : logo PNG d'origine (32 px, 40 px au-delà de 1440 px), sous-menus ouverts au survol *et* au clavier, bouton « Nous contacter » en contour noir, filet qui apparaît au défilement. Menu mobile plein écran, avec piège du focus, Échap et retour du focus.
- **Accueil** : hero, positionnement, liste indexée des 8 services, approche en 4 phases, solutions en lignes éditoriales, secteurs, bande de conviction (seule surface sombre du site), présence, formulaire de contact.
- **Contact** : formulaire extrait dans `ContactForm`, réutilisé sur l'accueil et sur `/contact`. Champs à filet inférieur, erreurs par champ. L'envoi vers `/api/contact/send` est inchangé.
- **Pages internes** : en-tête de page clair avec fil d'Ariane. Gabarits Service et Secteur, index Services, Secteurs et Solutions, pages Wali, Wandi, Makiti et À propos refaits sur le même système, avec filets, numéros discrets et serif.
- **Mouvement** : apparition au défilement (opacité et 12 px, 600 ms, 60 ms entre éléments, une fois) via `IntersectionObserver`, soulignements dessinés en 200 ms, trait du hero. Avec `prefers-reduced-motion`, seules les transitions de couleur restent. Retirés : curseur personnalisé, barre de progression, fond animé, mascotte, compteurs, carrousel automatique.
- **Performance** : Supabase n'est chargé que si une session existe (ou à l'ouverture de la connexion), la modale d'authentification à sa première ouverture. L'accueil n'importe plus framer-motion et ses sections hors écran sont en `content-visibility: auto`.
- **Accessibilité** : lien d'évitement, landmarks, fil d'Ariane balisé, hiérarchie de titres corrigée, focus orange 2 px avec décalage, `aria-invalid` et messages d'erreur reliés aux champs.

## 2. Commits

```
docs(redesign): audit initial, plan et captures de référence
feat(design): fondations du système (tokens, polices auto-hébergées, typographie, mouvement)
feat(layout): nouvel en-tête et pied de page
feat(contact): formulaire extrait dans ContactForm et restylé
feat(home): nouvelle page d'accueil éditoriale
feat(pages): pages internes sur le même système
perf: Supabase et modale d'authentification hors du bundle initial
fix(a-propos): page À propos sur le nouveau système, accueil chargé sans lazy
perf: Supabase chargé seulement si une session existe, sections de l'accueil en content-visibility
docs(redesign): rapport final, captures après, description de PR
```

## 3. Fichiers modifiés

Nouveaux : `src/styles/fonts.css`, `src/hooks/useReveal.ts`, `src/components/brand/SignatureStroke.tsx` (+ CSS), `src/components/contact/ContactForm.tsx` (+ CSS), `public/fonts/*` (6 woff2 et 2 licences OFL), `public/brand/README.md`, `docs/redesign/*`.

Modifiés : `index.html`, `src/App.tsx`, `src/contexts/AuthContext.tsx`, `src/styles/globals.css`, `src/styles/variables.css`, `src/components/header/*`, `src/components/footer/*`, `src/components/shared/ServicePageLayout.*`, `src/components/shared/SecteurPageLayout.*`, `src/pages/HomePage.*`, `src/pages/ContactPage.*`, `src/pages/AProposPage.*`, `src/pages/services/{ServicesPage.*, OdooPage, ConseilOrganisationnelPage, InterimPage, ManagementConsultingPage, PaiementsLocauxPage, TransformationDigitalePage}.tsx`, `src/pages/secteurs/SecteursPage.*`, `src/pages/solutions/{SolutionPage.module.css, SolutionsPage.module.css, WaliPage, WandiPage, MakitiPage}.tsx`.

Bilan : 48 fichiers, +2 437 / −4 587 lignes (hors docs).

Aucun composant supprimé. N'étant plus importés, ces fichiers peuvent être retirés après validation : `components/home/{NetworkBackground, CounterStat, SectionWrapper, CustomCursor, ScrollProgress}`, `components/mascot/HeroDragonfly`, `components/hero/Hero`, `components/stats/Stats`, ainsi que les `sections/*` non utilisées (déjà mortes avant la refonte).

## 4. Mesures

### Lighthouse 12.2, mobile (4G simulée, CPU ×4), build de production

Mesure appariée : les versions avant (`main`) et après sont servies en même temps et testées en alternance, 3 passages chacune. Valeurs médianes. Détail dans `lighthouse-paired.json`.

| Page | Version | Perf. | Access. | Bonnes prat. | SEO | LCP | CLS | TBT | Poids transféré |
|---|---|---|---|---|---|---|---|---|---|
| `/` | avant | 67 | 94 | 100 | 100 | 4,5 s | 0,080 | 301 ms | 363 Kio |
| `/` | **après** | **91** | **100** | 100 | 100 | **2,1 s** | **0** | 313 ms | **174 Kio** |
| `/contact` | avant | 83 | 96 | 100 | 100 | 3,4 s | 0,001 | 213 ms | 241 Kio |
| `/contact` | **après** | **86** | **100** | 100 | 100 | **2,4 s** | **0** | 427 ms | **177 Kio** |
| `/services/odoo` | avant | 84 | 94 | 100 | 100 | 3,4 s | 0,007 | 201 ms | 243 Kio |
| `/services/odoo` | **après** | 83 | **100** | 100 | 100 | **2,5 s** | **0** | 498 ms | **183 Kio** |

Scores de performance par passage : accueil 65/67/68 → 91/93/88, contact 83/83/86 → 85/86/90, Odoo 83/84/85 → 83/83/94.

Lecture honnête :
- Atteints : accessibilité 100 (objectif 95), bonnes pratiques 100, SEO 100, CLS 0 partout (objectif < 0,05), LCP sous 2,5 s sur l'accueil et le contact.
- **Pas atteint de façon stable** : performance ≥ 90 hors accueil, et LCP de la page Odoo (2,5 s, limite). Le facteur limitant est le TBT, qui varie de 200 à 700 ms d'un passage à l'autre sur cette machine, y compris pour la version `main` inchangée. Il faudrait confirmer sur une machine de mesure stable ou avec PageSpeed Insights une fois la branche déployée en prévisualisation.
- INP n'est pas mesurable en laboratoire. À suivre sur le terrain (CrUX ou Search Console) après mise en production.

### Budget de poids (gzip, hors polices)

| | Avant | Après |
|---|---|---|
| JS du chemin critique de l'accueil | 145,7 + 52,5 = 198 ko | 88,9 ko |
| CSS initial | 6,7 + 5,0 ko | 6,8 ko |
| Supabase | inclus ci-dessus | 54,5 ko, chargé seulement si une session existe |

Total initial HTML, CSS et JS : environ 97 ko gzip, sous le budget de 150 ko. Polices : 2 fichiers critiques préchargés (45 ko), 4 autres chargés à la demande selon les glyphes.

### axe-core (WCAG 2.1 A/AA)

Avant : violations `color-contrast` sérieuses sur les 14 contrôles (7 pages × 2 largeurs), de 5 à 19 nœuds. **Après : 0 violation sur les 14 contrôles.**

### Routes et interactions

- 40 routes sur 40 répondent et rendent un `<h1>`, sans erreur JavaScript (`measures-after.json`).
- Clavier : sous-menus atteignables au Tab, menu mobile avec focus initial sur « Fermer », piège du focus, Échap et retour du focus sur le bouton Menu.
- Formulaire : envoi vide, 5 champs marqués `aria-invalid` et focus placé sur le premier champ en erreur.
- Modale de connexion : s'ouvre et charge Supabase à la demande.
- Apparition au défilement : 38 éléments sur 38 révélés sur l'accueil, 6 sur 6 sur Odoo.
- Aucun défilement horizontal à 375 px.

### Build et contrôle de types

`npm run build` (`tsc && vite build`) passe sans erreur ni avertissement. L'avertissement de chunk de plus de 500 ko a disparu. Le projet n'a pas de linter configuré (pas de script `lint`), aucun contrôle de lint n'a donc pu être lancé.

### Captures

`docs/redesign/screenshots/before-*.png` et `after-*.png` : 7 pages (accueil, services, Odoo, secteur Mines, solutions, contact, à propos) à 375, 768, 1280 et 1536 px. Les captures avant de l'accueil montrent un grand vide sombre : sur la version d'origine, les sections restaient à opacité 0 tant qu'elles n'avaient pas été défilées.

## 5. Textes modifiés (liste exacte)

### Corrections de ponctuation (tirets cadratins utilisés comme séparateurs)

| Emplacement | Avant | Après |
|---|---|---|
| Accueil, sous-titre du hero | « …dans leur transformation numérique — conseil, implémentation, cybersécurité et management. » | « …dans leur transformation numérique : conseil, implémentation, cybersécurité et management. » |
| Accueil, Wali | « …prestataires vérifiés — livraison, nettoyage, cours particuliers. » | « …prestataires vérifiés : livraison, nettoyage, cours particuliers. » |
| Contact et accueil, introduction du formulaire | « …une première approche adaptée — gratuitement et sans engagement. » | « …une première approche adaptée, gratuitement et sans engagement. » |

Les autres tirets cadratins du site (34 fichiers de pages, titres `<title>` et Open Graph compris) **n'ont pas été modifiés** : la règle interdit de réécrire les textes existants et de toucher aux balises meta. Voir la question 9.

### Textes retirés de l'affichage (toujours présents dans l'historique git)

- Accueil, hero : chiffres « 8+ Services », « 100% Local », « Guinée Présence ».
- Accueil : grille de compteurs « 8+ Services proposés », « 20+ Projets livrés », « 3+ Années d'expertise », « 1 Pays — Guinée ».
- Accueil : section « Ils nous font confiance / Ce que disent nos clients » et ses 3 témoignages (Mamadou Diallo, Fatoumata Bah, Ibrahima Sow). Voir la question 2.
- En-tête (bureau) : bouton « Réserver un appel » (toujours dans le hero, la bande de conviction et le menu mobile), bouton « S'inscrire » (toujours dans le menu mobile et dans la modale), lien « Contact » (remplacé par le bouton « Nous contacter »).
- Pages de service et de secteur, À propos, Solutions : icônes décoratives des cartes. Les icônes restent en place dans les fonctionnalités des pages Wali, Wandi et Makiti et dans les cas d'usage de Paiements locaux.
- À propos : visuels d'illustration des quatre équipes (`equipe-*-bg.jpg`), qui relèvent de la photo d'illustration générique (dont une poignée de mains). Les photos des membres restent.

### Textes ajoutés

| Emplacement | Texte | Source |
|---|---|---|
| Accueil, présence | « Présence » et « Guinée · Sénégal · Mali » | `<meta name="description">` |
| Accueil, titre de la section Présence | « Partenaire digital en Afrique de l'Ouest » | `<title>` |
| Accueil, section Approche | « Notre approche en 4 phases », 4 étapes et sous-titre | page Transformation digitale |
| Accueil, kickers | « Notre approche », « Présence », « Contact » | nouveaux libellés de section |
| Accueil, contact | « Analyse gratuite de vos besoins » et l'introduction | page Contact |
| En-tête | « Nous contacter », « Menu », « Fermer », « Tous les services », « Tous les secteurs », « Toutes les solutions » | nouveaux |
| Pied de page | lien « Confidentialité » | route existante `/confidentialite` |
| Formulaire | « Veuillez indiquer votre nom. », « Veuillez indiquer votre prénom. », « Veuillez indiquer votre adresse email. », « Cette adresse email ne semble pas valide. », « Veuillez choisir l'objet de votre demande. », « Veuillez décrire votre projet. », « * Champs obligatoires » | nouveaux |
| Accessibilité (lecteurs d'écran) | « Aller au contenu », « Chargement », « (nouvel onglet) », « Fil d'Ariane », « Réseaux sociaux », « Coordonnées » | nouveaux |
| Libellé d'accessibilité du logo | « E-QOS - Accueil » devient « E-QOS, accueil » | |

### Liens corrigés

- Pied de page « Mentions légales » : `/contact` devient `/mentions-legales`.
- Réseaux sociaux du pied de page : icônes rondes remplacées par des liens texte (LinkedIn, Facebook, X, Instagram), mêmes URL.

## 6. Hypothèses retenues

1. **Expertises** : le brief cite 5 expertises (ERP, paiements mobiles, cybersécurité, développement web et mobile, IA). Le dépôt n'a de page que pour 8 services, et aucune pour le développement ni pour l'IA. L'accueil liste donc ces 8 services, numérotés de 01 à 08, avec leurs textes et liens existants.
2. **Titre du hero** : le H1 existant (« Transformez votre organisation. Bâtissez l'avenir digital. ») est conservé, puisqu'un titre existait déjà. « digital. » sert de mot d'accent orange.
3. **Approche** : seule méthode générale publiée, celle de la page Transformation digitale a été reprise sur l'accueil.
4. **Réalisations** : aucune donnée réelle dans le dépôt, la section n'est pas affichée.
5. **Bande de conviction** : construite avec le CTA final existant (« Votre transformation digitale commence ici. »).
6. **Présence** : les trois pays des métadonnées sont affichés. Seule la Guinée porte des coordonnées (siège à Conakry et email), car ce sont les seules publiées.
7. **`theme-color`** : `#FFFFFF`, la couleur de l'en-tête.
8. **framer-motion** reste installé mais n'est plus importé par aucune page active.

## 7. Questions ouvertes

1. **Présence réelle** : le site dit à la fois « Guinée, Sénégal et Mali » (meta, page Secteurs), « 1 Pays — Guinée » (ancien accueil), « Présent en Guinée · Vision Afrique de l'Ouest » (pied de page) et « Afrique de l'Ouest, expansion en cours » (À propos). Quelle formulation est exacte ? Si E-QOS n'est présente qu'en Guinée, il faut corriger la meta description et la section Présence.
2. **Témoignages** : les trois citations nominatives sont-elles réelles et autorisées ? Si oui, elles peuvent revenir en citations statiques, sans carrousel.
3. **« Est. 2026 »** (kicker du hero) contredit « 3+ années d'expertise ». Quelle date de création afficher ?
4. **Affirmations chiffrées non sourcées** encore visibles : « Plus de 100 organisations en Guinée nous font déjà confiance » (À propos), « Rejoignez des milliers d'utilisateurs » (Wali), « testée sur de nombreux projets en Guinée » (Odoo). À confirmer ou à retirer.
5. **Page Équipe technique** : sa mission parle d'« énergie propre », d'IoT et de « capteurs énergétiques », ce qui ne correspond pas à l'activité d'E-QOS. Ce texte vient-il d'un autre projet ?
6. **Partenaires technologiques** (À propos : Odoo, Orange, MTN, Wave, Microsoft 365, Google Workspace) : s'agit-il de partenariats formels, ou des outils utilisés ? L'intitulé engage la société.
7. **Liens morts** : `/services/developpement` et `/services/ia-data`, cités dans plusieurs pages secteur, n'existent pas. Vers quelles pages les rediriger ?
8. **Liens des stores** (Wali, Wandi, Makiti) : `href="#"`. Les applications sont-elles publiées ?
9. **Tirets cadratins** dans les textes existants et les balises `<title>` : faut-il les remplacer partout (virgules, deux-points) ? Cela modifie les titres indexés.
10. **Sitemap** : il n'en existe pas. Faut-il en générer un (`https://e-qos.com/...`, 40 routes) ? Quel est le domaine canonique ?
11. **Anti-spam** : le formulaire n'a qu'une limitation de débit côté backend. Faut-il ajouter un champ piège (honeypot), qui demande une petite modification du backend ?
12. **`dist/` versionné** : Netlify reconstruit le site, ce dossier pourrait sortir de git. Il n'a pas été modifié dans cette branche.

## 8. TODO restants

- **Logo vectoriel** officiel (`public/brand/eqos-logo.svg`) et **version pour fond sombre**. Le PNG actuel est utilisé tel quel, sur fonds clairs uniquement. Le trait signature est un dessin d'interprétation, pas le logo.
- **Photographies réelles** de l'équipe en situation et des projets, en remplacement des visuels d'illustration masqués. Les photos individuelles (jusqu'à 1,5 Mo en PNG ou JPEG) sont à convertir en WebP ou AVIF aux dimensions d'affichage.
- **Pages pas encore refaites**, qui n'héritent que des polices, des couleurs de base et de l'en-tête et du pied de page : Carrières (panneau de filtres sombre, bandeau en dégradé orange), Ressources et Article, Profil, les 4 pages Équipe (thème sombre complet), Mentions légales et Confidentialité, modale d'authentification, modale de candidature.
- Retrait des composants devenus inutilisés (liste en section 3), après validation.
- Mesure Lighthouse sur une prévisualisation Netlify (PageSpeed Insights) pour confirmer les scores de performance hors du bruit de la machine locale.

## 9. Réorientation : mise en relation et intérim (demande du 30 octobre 2026)

Consigne reçue : orienter le site vers **la mise en relation et l'intérim dans tous les domaines en Guinée, pas uniquement le numérique**. Arbitrages validés :
- services numériques gardés au second plan, pages et URL conservées ;
- offre E-QOS distincte de Wali ;
- textes rédigés par Claude, à valider par E-QOS.

### Ce qui change
- **Nouvelle route `/mise-en-relation`** (41 routes au total) : deux publics (entreprises et institutions, professionnels), déroulé en 4 étapes, domaines d'activité, lien vers l'Interim Management (dirigeants et experts de transition) et appel à l'action.
- **Accueil** : hero, offre, « Comment ça marche » et domaines passent en tête. Viennent ensuite le positionnement, les 8 services numériques (kicker « Services numériques »), les solutions, la bande de conviction, la présence et le contact. Les sections « Approche en 4 phases » (transformation digitale) et « Secteurs d'activité » sont retirées de l'accueil, mais restent sur leurs pages.
- **Navigation** : « Mise en relation & intérim » en premier lien de l'en-tête et du menu mobile, colonne « Mise en relation » dans le pied de page.
- **Formulaire** : deux nouveaux objets, présélectionnés selon le bouton cliqué (`/contact?objet=…`). L'objet « je recherche un profil » est présélectionné sur l'accueil.
- **Emplacements TODO** (composant `Todo`, visible uniquement avec `npm start`) : cadre contractuel et tarifs, délais de présentation des profils, liste des métiers couverts.

### Textes nouveaux (rédigés, à valider)

Source unique : `src/data/miseEnRelation.ts`.

| Emplacement | Texte |
|---|---|
| H1 de l'accueil et de `/mise-en-relation` | « Mise en relation et intérim, dans tous les domaines » (« domaines. » en accent sur l'accueil) |
| Texte d'appui | « E-QOS met en relation les entreprises et les institutions de Guinée avec des professionnels qualifiés, pour des missions d'intérim ou des besoins ponctuels, dans tous les secteurs d'activité. » |
| Boutons | « Exprimer un besoin », « Proposer mon profil », « Voir les offres » |
| Section offre (accueil) | « Le bon profil, pour chaque mission » ; « Nous travaillons avec les deux côtés : les organisations qui recrutent pour une mission, et les professionnels qui cherchent la suivante. » |
| Entreprises | « Vous avez un poste à pourvoir pour une durée déterminée, un pic d'activité ou une absence à remplacer. Vous nous décrivez le besoin, nous vous présentons des profils qui y répondent. » Points : « Missions d'intérim », « Renfort ponctuel », « Remplacement d'un collaborateur absent » |
| Professionnels | « Vous cherchez des missions dans votre métier, quel qu'il soit. Vous nous transmettez votre profil, nous vous proposons les missions qui vous correspondent. » Points : « Missions dans tous les métiers », « Profils qualifiés ou expérimentés », « Partout en Guinée » |
| Étapes | Votre besoin, La sélection, La rencontre, Le suivi (une phrase chacune) |
| Domaines | « Tous les domaines d'activité » ; « Notre réseau ne se limite pas au numérique. Quelques exemples de secteurs : » suivi des 8 secteurs déjà présents sur le site |
| Bande de conviction | « Trouvons ensemble le bon profil. » ; « Décrivez votre besoin. Notre équipe vous répond sous 48h. » |
| Contact (accueil) | « Exprimez votre besoin » ; « Décrivez le poste, les compétences recherchées, le lieu et la durée de la mission. Pour un projet numérique ou toute autre demande, choisissez l'objet correspondant. » |
| Pied de page | Accroche « Mise en relation, intérim et services numériques en Guinée » (remplace « Votre partenaire de transformation digitale en Guinée ») ; « Un poste à pourvoir en Guinée ? » (remplace « Besoin d'un accompagnement digital en Guinée ? ») ; titre de colonne « Services numériques » (remplace « Services ») |
| Métadonnées par défaut (`index.html`) | Titre et `og:title` : « E-QOS, mise en relation, intérim et services numériques en Guinée ». Description et `og:description` réécrites autour de l'offre ; la mention « Présent en Guinée, Sénégal et Mali » est conservée dans la description |

Retirés de l'accueil (toujours dans l'historique git) : l'ancien H1 « Transformez votre organisation. Bâtissez l'avenir digital. », le titre « Votre transformation digitale commence ici. », l'introduction « Analyse gratuite de vos besoins » et le CTA « Découvrir nos services » du hero.

### Questions ouvertes liées à la réorientation
13. **Cadre légal de l'intérim** : en Guinée, l'activité de travail temporaire peut exiger un statut ou un agrément spécifique, et le contrat de mise à disposition doit désigner l'employeur. Le site parle de « missions d'intérim » : E-QOS dispose-t-elle de ce cadre ? Sinon, faut-il parler uniquement de « mise en relation » ?
14. **« Partout en Guinée »** et **« Notre équipe vous répond sous 48h »** : ces engagements sont-ils tenables ?
15. **Métiers couverts** : la liste actuelle reprend les 8 secteurs du site. Quels métiers citer (BTP, logistique, hôtellerie, administratif…) ?
16. **Présence** : l'offre est présentée pour la Guinée, mais la ligne « Guinée · Sénégal · Mali » et la section Présence sont maintenues en attendant la réponse à la question 1.
17. **Côté professionnels** : « Proposer mon profil » mène au formulaire de contact. Faut-il plutôt l'envoyer vers la candidature spontanée de `/carrieres` ? La page Carrières est titrée « Construisez l'avenir digital de la Guinée », ce qui ne correspond plus à l'offre.

## 10. Discours sectoriel et hero vidéo (remplace la section 9)

Retour d'E-QOS : pas de formules génériques (« tous les domaines », « mise en relation »). L'offre doit se comprendre à travers les secteurs phares de la Guinée, avec des vidéos de professionnels qui défilent. Arbitrages validés : vidéos fournies par E-QOS, ton « Les équipes qui font avancer les grands projets de Guinée ».

### Recherche sectorielle (sources)

| Fait utilisé sur le site | Source |
|---|---|
| Premier producteur mondial de bauxite | [Coface, fiche pays Guinée](https://www.coface.com/news-economy-and-insights/business-risk-dashboard/country-risk-files/guinea) |
| Premier minerai de fer de Simandou expédié en décembre 2025 | [Mining Weekly, décembre 2025](https://www.miningweekly.com/article/simandou-iron-ore-project-guinea-update-2025-12-12) |
| Kaléta 240 MW (2015), Souapiti 450 MW | [Tractebel Engie](https://tractebel-engie.com/en/news/2021/guinea-doubles-its-hydroelectric-production-capacity-with-the-commissioning-of-the-souapiti-hydroelectric-facility), [Le Monde du Droit](https://www.lemondedudroit.fr/deals/61036-baker-mckenzie-conseille-china-international-water-electric-corp.html) |
| Agriculture : près d'un tiers du PIB, plus de 60 % des emplois | [Banque mondiale, Guinea Economic Update, octobre 2026](https://www.banquemondiale.org/fr/country/guinea/publication/guinea-economic-update-2026-beyond-mining-turning-resource-wealth-into-private-sector-growth-and-job-creation) |

Contexte non publié sur le site, mais utile au discours commercial : Simandou a dépassé 60 000 travailleurs au pic de construction, et la démobilisation est en cours ([Agence Ecofin](https://www.agenceecofin.com/actualites/2309-141805-simandou-de-la-construction-a-l-exploitation-la-course-a-l-emploi-local-en-guinee)). Les objectifs de contenu local visent au moins 70 % d'emplois guinéens. La Banque mondiale insiste sur le déficit de compétences et d'emploi formel (8,5 % de la main-d'œuvre).

### Ce qui change
- **Accueil** :
  - Hero plein cadre `HeroReel` : six vidéos de secteurs en fondu enchaîné toutes les 7 s, barre de progression par secteur, bouton pause (WCAG 2.2.2), défilement suspendu si l'onglet est masqué ou si `prefers-reduced-motion` est actif.
  - Sections suivantes, dans l'ordre : six secteurs en lignes alternées vidéo et texte (`SectorShowcase`), deux publics, méthode, bande « Parlons de votre prochain chantier. », services numériques au second plan, présence, contact. Les solutions Wali, Wandi et Makiti ne figurent plus sur l'accueil, mais restent dans le menu.
- **Page `/recrutement-interim`** : remplace `/mise-en-relation`, qui n'a jamais été publiée. Elle reprend les secteurs et les métiers, les publics, la méthode et un lien vers l'Interim Management.
- **Libellés** : « Recrutement & intérim » dans le menu, « Constituer une équipe » et « Rejoindre nos viviers » pour les boutons. Objets du formulaire : « Constituer une équipe ou recruter en intérim » et « Rejoindre les viviers E-QOS (candidature) ».
- **Vidéos** (`SectorVideo`) :
  - muettes, en boucle, `preload="none"`, chargées à l'approche de l'écran et mises en pause hors écran ;
  - image fixe seule si l'utilisateur active l'économie de données, est en 2G ou a choisi de réduire les animations ;
  - sans fichier livré, un cadre sombre neutre s'affiche, sans aucune requête réseau.
- **Cahier des charges des médias** : `public/media/secteurs/README.md` (formats, poids, contenu attendu, commande ffmpeg). Les chemins se renseignent dans `src/data/secteursGuinee.ts`.

### Textes nouveaux (à valider)

Tous sont regroupés dans `src/data/recrutement.ts` et `src/data/secteursGuinee.ts` :
- **H1** : « Les équipes qui font avancer les grands projets de Guinée. »
- **Texte d'appui** : « Opérateurs, techniciens, ingénieurs et encadrement, mobilisés pour les mines, l'énergie, les infrastructures et la logistique. »
- **Fiches secteurs** : un fait clé et entre quatre et six métiers par secteur.
- **Publics** : « Vous renforcez vos équipes » et « Vous visez votre prochaine mission ».
- **Méthode** : Cadrage, Présélection, Validation, Mobilisation.
- **Métadonnées** : titre par défaut « E-QOS, recrutement et intérim pour les grands secteurs de Guinée ».

### Vérifications
- 41 routes sur 41 répondent, sans erreur JavaScript.
- axe : 0 violation sur l'accueil et `/recrutement-interim` (375 et 1280 px) et sur le contact.
- Présélection de l'objet du formulaire vérifiée, bouton pause fonctionnel, aucun défilement horizontal.
- **Non testé** : la lecture avec de vrais fichiers vidéo (aucun média livré, et ffmpeg n'est pas disponible pour générer un fichier de test). À vérifier dès le dépôt des premières vidéos.
- Les scores Lighthouse de la section 4 datent d'avant la réorientation et sont à refaire. Le hero n'a pas de vidéo au premier rendu, donc le LCP reste le titre. En revanche, chaque vidéo pèsera jusqu'à 2,5 Mo, chargée seulement à l'écran.

### Questions ouvertes
13. **Cadre légal de l'intérim** : un agrément de travail temporaire est-il requis en Guinée, et E-QOS l'a-t-elle ? Le site parle d'« intérim ».
14. **Engagements** à confirmer : « vérification de l'expérience et des références », « suivi de la mission jusqu'à son terme », « réponse sous 48h ».
15. **Métiers par secteur** : la liste doit correspondre aux profils réellement disponibles dans les viviers.
16. **Lieux cités** (Boké, Kamsar, Simandou, Siguiri, Kaléta, Souapiti) : E-QOS peut-elle mobiliser sur ces sites ? Ils suggèrent une capacité d'intervention.
17. **Carrières** : la page s'intitule encore « Construisez l'avenir digital de la Guinée ». Faut-il l'aligner, et faire pointer « Rejoindre nos viviers » vers la candidature spontanée ?
18. **Présence** : la section « Partenaire digital en Afrique de l'Ouest » (Guinée, Sénégal, Mali) est conservée en attendant la réponse à la question 1.

## 11. Pages restantes et parcours « Constituer une équipe »

### Parcours `/constituer-une-equipe`
- **4 étapes courtes** :
  1. Besoin (renfort ponctuel, intérim, recherche de talent) et secteur, en tuiles.
  2. Postes : les postes fréquents du secteur s'ajoutent en un clic, champ libre pour un autre poste, nombre de personnes par poste.
  3. Lieu (6 sites proposés en un clic, saisie libre possible), démarrage, durée, précisions facultatives.
  4. Coordonnées, puis envoi.
- **Confort** :
  - récapitulatif toujours visible sur ordinateur, et sur mobile à l'étape d'envoi ;
  - brouillon conservé sur l'appareil jusqu'à l'envoi ;
  - secteur présélectionnable (`?secteur=mines`), avec un lien par secteur depuis l'accueil et la page Recrutement.
- **Envoi** : le dossier est rédigé en texte et passe par le relais email existant (`/api/contact/send`), avec un objet du type « Demande d'équipe EQ-AAMMJJ-XXXX : Intérim, Mines et carrières, 5 personnes ». En cas d'échec, un lien ouvre l'email pré-rempli avec le dossier.
- **Test de bout en bout**, avec le backend simulé :
  - demande complète en 13 clics, saisie des coordonnées comprise ;
  - 0 violation axe à chaque étape, à 375 et à 1280 px ;
  - dossier reçu complet.
- **Limite** : le dossier n'est pas enregistré en base, il arrive seulement par email. Une table Supabase `team_requests` et une vue dans l'admin permettraient un suivi par les agents (statut, attribution). C'est à décider.

### Pages refaites
- **Carrières** :
  - en-tête aligné sur l'offre, métiers recherchés par secteur ;
  - filtres en onglets texte, offres en lignes éditoriales ;
  - `?candidature=spontanee` ouvre directement la candidature avec CV. « Rejoindre nos viviers » y mène désormais.
- **Modale de candidature** : panneau clair, libellés reliés aux champs, Échap, CV accessible au clavier.
- **Ressources et Article** : colonnes à filet, cartes entièrement cliquables, article à 68 caractères par ligne.
- **Les 4 pages Équipe** : une feuille commune `teamDetail.module.css` remplace les 4 anciennes. Les images d'en-tête inexistantes sont retirées.
- **Mentions légales et Confidentialité** : mise en page éditoriale.
- **Modale de connexion** : vrai logo à la place de l'imitation en texte, champs à filet.
- **Profil** : blocs à filet, boutons noirs, couleurs de robustesse du mot de passe accessibles.

### Contenus à revoir (non modifiés)
- **Page Équipe technique** : énergie propre, IoT, « capteurs énergétiques » (voir question 5).
- **Page Équipe support** : « Support 24/7 », « 98 % Satisfaction client », « 15 min de temps de réponse moyen ». Ces chiffres sont non sourcés et engagent la société.
- **`/mentions-legales`** affiche des conditions d'utilisation, pas de mentions légales : raison sociale, RCCM, NIF, siège, directeur de publication et hébergeur manquent.
- Le bouton « Postuler maintenant » des pages Équipe mène au formulaire de contact. Il pourrait mener à la candidature spontanée.
