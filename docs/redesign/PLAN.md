# Plan d'implémentation

Branche : `redesign/premium`. Un commit par étape.

## Principes

- Aucun nouveau framework ni bibliothèque. Les animations passent par CSS et `IntersectionObserver`. `framer-motion` reste installé pour ne rien casser, mais la nouvelle page d'accueil ne l'importe plus.
- Les anciens tokens (`--color-primary`, `--accent`…) sont redirigés vers la nouvelle palette. Les pages pas encore retouchées héritent ainsi de la typographie et des couleurs sans régression.
- Textes repris du dépôt. Toute modification est consignée dans `REPORT.md`.

## Ordre des travaux

1. **Fondations** : polices auto-hébergées (`public/fonts`, latin et latin-ext, préchargement), tokens, reset, typographie, grille, boutons, kicker, liens soulignés, focus, apparition au défilement, `prefers-reduced-motion`. Suppression des appels à Google Fonts. `theme-color` mis à `#FFFFFF`.
2. **Signature** : composant `SignatureStroke` (SVG inline, tracé `stroke-dashoffset` 1,2 s, variante statique de séparation).
3. **En-tête** : logo PNG d'origine, navigation existante, sous-menus ouverts au survol et au clavier, bouton « Nous contacter » en contour, filet au défilement, menu mobile plein écran (Échap, piège du focus).
4. **Pied de page** : fond `--paper-warm`, logo, navigation, liens légaux, réseaux sociaux.
5. **Accueil** : hero, positionnement, expertises (liste indexée des 8 services existants), approche (4 phases déjà publiées), solutions, secteurs, bande de conviction, présence, contact.
6. **Contact** : extraction du formulaire dans `ContactForm`, réutilisé sur l'accueil et sur `/contact`. Traitement inchangé.
7. **Pages internes** : en-tête de page générique (`.page-hero`), `ServicePageLayout`, `SecteurPageLayout`, index Services, Secteurs et Solutions, styles en ligne de la page Odoo et des pages de service.
8. **Performance** : sortir `AuthModal` (et Supabase si possible) du bundle initial, retirer `CustomCursor` et `ScrollProgress` du layout.
9. **Vérification** : build, captures après, axe, Lighthouse, test des 40 routes, `REPORT.md`, description de PR.

## Hors périmètre de cette passe (héritent seulement des fondations)

À propos, Ressources et Article, Carrières, Profil, pages Équipe, pages produit Wali, Wandi et Makiti, modale d'authentification. Leurs modules CSS gardent des couleurs codées en dur. Ces pages sont listées dans les TODO du rapport.
