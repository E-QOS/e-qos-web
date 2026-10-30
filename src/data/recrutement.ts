// Offre « Recrutement et intérim » : textes partagés entre l'accueil, /recrutement-interim, l'en-tête,
// le pied de page et le formulaire. Rédigés pour la réorientation du site, à valider par E-QOS.

export const RECRUTEMENT_PATH = '/recrutement-interim';
export const RECRUTEMENT_LABEL = 'Recrutement & intérim';

/** Objets du formulaire de contact, présélectionnés via /contact?objet= */
export const BESOIN_SUBJECT = 'Constituer une équipe ou recruter en intérim';
export const PROFIL_SUBJECT = 'Rejoindre les viviers E-QOS (candidature)';
export const contactLink = (subject: string) => `/contact?objet=${encodeURIComponent(subject)}`;

export const heroKicker = 'Conakry · Boké · Kamsar · Simandou';
export const heroTitle = 'Les équipes qui font avancer les grands projets de Guinée.';
export const heroLead =
  'Opérateurs, techniciens, ingénieurs et encadrement, mobilisés pour les mines, l\'énergie, '
  + 'les infrastructures et la logistique.';

export const ctaClient = 'Constituer une équipe';
export const ctaTalent = 'Rejoindre nos viviers';

export const audiences = [
  {
    key: 'entreprises',
    kicker: 'Entreprises et institutions',
    title: 'Vous renforcez vos équipes',
    desc: 'Démarrage de chantier, pic de production, remplacement ou poste clé à couvrir : nous constituons l\'équipe dont vos opérations ont besoin, pour la durée de votre projet.',
    points: ['Intérim et missions de durée déterminée', 'Constitution d\'équipes complètes', 'Profils d\'encadrement et d\'expertise'],
    cta: ctaClient,
    subject: BESOIN_SUBJECT,
  },
  {
    key: 'talents',
    kicker: 'Professionnels',
    title: 'Vous visez votre prochaine mission',
    desc: 'Opérateur, technicien, ingénieur ou cadre : rejoignez nos viviers et accédez aux missions des secteurs qui recrutent en Guinée.',
    points: ['Missions sur site et en entreprise', 'Mines, énergie, BTP, logistique, services', 'Accompagnement pendant la mission'],
    cta: ctaTalent,
    subject: PROFIL_SUBJECT,
  },
];

export const method = [
  { t: 'Cadrage', d: 'Postes, compétences, habilitations, lieu, durée et calendrier de mobilisation.' },
  { t: 'Présélection', d: 'Recherche dans nos viviers, vérification de l\'expérience et des références.' },
  { t: 'Validation', d: 'Vous rencontrez les candidats retenus et arrêtez votre choix.' },
  { t: 'Mobilisation', d: 'Arrivée sur site et suivi de la mission jusqu\'à son terme.' },
];
