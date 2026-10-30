// Offre « Mise en relation et intérim » : contenus partagés entre l'accueil et /mise-en-relation.
// Textes rédigés pour la réorientation du site, à valider par E-QOS (voir docs/redesign/REPORT.md).

export const MISE_EN_RELATION_PATH = '/mise-en-relation';

/** Lien vers le formulaire de contact, avec l'objet présélectionné. */
export const BESOIN_SUBJECT = 'Mise en relation / intérim : je recherche un profil';
export const PROFIL_SUBJECT = 'Mise en relation / intérim : je propose mon profil';
export const contactLink = (subject: string) => `/contact?objet=${encodeURIComponent(subject)}`;

export const offerTitle = 'Mise en relation et intérim, dans tous les domaines';

export const offerIntro =
  'E-QOS met en relation les entreprises et les institutions de Guinée avec des professionnels qualifiés, '
  + 'pour des missions d\'intérim ou des besoins ponctuels, dans tous les secteurs d\'activité.';

export const audiences = [
  {
    key: 'entreprises',
    title: 'Pour les entreprises et institutions',
    desc: 'Vous avez un poste à pourvoir pour une durée déterminée, un pic d\'activité ou une absence à remplacer. Vous nous décrivez le besoin, nous vous présentons des profils qui y répondent.',
    points: ['Missions d\'intérim', 'Renfort ponctuel', 'Remplacement d\'un collaborateur absent'],
    cta: 'Exprimer un besoin',
    subject: BESOIN_SUBJECT,
  },
  {
    key: 'professionnels',
    title: 'Pour les professionnels',
    desc: 'Vous cherchez des missions dans votre métier, quel qu\'il soit. Vous nous transmettez votre profil, nous vous proposons les missions qui vous correspondent.',
    points: ['Missions dans tous les métiers', 'Profils qualifiés ou expérimentés', 'Partout en Guinée'],
    cta: 'Proposer mon profil',
    subject: PROFIL_SUBJECT,
  },
];

export const steps = [
  { t: 'Votre besoin', d: 'Vous décrivez le poste, les compétences attendues, le lieu et la durée de la mission.' },
  { t: 'La sélection', d: 'Nous identifions et présélectionnons des profils qui correspondent à votre demande.' },
  { t: 'La rencontre', d: 'Vous échangez avec les candidats retenus et choisissez la personne qui rejoindra votre équipe.' },
  { t: 'Le suivi', d: 'Nous restons votre interlocuteur pendant toute la durée de la mission.' },
];

/** Domaines cités à titre d'exemple : ce sont les secteurs déjà présentés sur le site. */
export const domains = [
  'Mines & Ressources',
  'Télécommunications',
  'Banque & Finance',
  'Santé',
  'Secteur public & ONG',
  'Agriculture',
  'Commerce & Distribution',
  'Éducation',
];
