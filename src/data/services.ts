// Liste des services E-QOS, partagée par l'en-tête, le pied de page, l'accueil et /services.
// Deux familles : le recrutement pour tous les métiers, puis le conseil et le numérique.

export interface Service {
  title: string;
  /** Description courte (menus, listes). */
  short: string;
  /** Description développée (page /services). */
  desc: string;
  to: string;
}

export interface ServiceGroup {
  key: string;
  title: string;
  intro: string;
  items: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    key: 'recrutement',
    title: 'Recrutement et intérim',
    intro: 'Des équipes pour les grands secteurs de Guinée, des opérateurs à l\'encadrement.',
    items: [
      {
        title: 'Intérim et renfort d\'équipes',
        short: 'Mines, énergie, BTP, logistique, services',
        desc: 'Opérateurs, techniciens, ingénieurs et encadrement mobilisés pour un démarrage de chantier, un pic de production ou un remplacement.',
        to: '/recrutement-interim',
      },
      {
        title: 'Recherche de talents',
        short: 'Profils clés et encadrement',
        desc: 'Recrutement des profils clés de votre organisation : responsables de site, ingénieurs, experts métier, fonctions support.',
        to: '/constituer-une-equipe?besoin=talent',
      },
      {
        title: 'Interim Management',
        short: 'DSI, chefs de projet, experts',
        desc: 'DSI, chefs de projet, experts techniques mobilisables rapidement pour vos missions ponctuelles ou de transition.',
        to: '/services/interim',
      },
    ],
  },
  {
    key: 'conseil',
    title: 'Conseil et services numériques',
    intro: 'Organisation, transformation et sécurité des systèmes d\'information.',
    items: [
      {
        title: 'Transformation digitale',
        short: 'Diagnostic, feuille de route, pilotage',
        desc: 'Diagnostic, feuille de route numérique et conduite du changement adaptés aux réalités des organisations africaines.',
        to: '/services/transformation-digitale',
      },
      {
        title: 'Conseil organisationnel',
        short: 'Processus, structure, performance',
        desc: 'Optimisation des processus, restructuration et renforcement de la performance de vos équipes et systèmes.',
        to: '/services/conseil-organisationnel',
      },
      {
        title: 'Management & Consulting',
        short: 'Gouvernance, projets complexes',
        desc: 'Gouvernance, pilotage de projets complexes et amélioration continue des performances organisationnelles.',
        to: '/services/management-consulting',
      },
      {
        title: 'Cybersécurité',
        short: 'Audit, protection, conformité',
        desc: 'Audit de sécurité, protection des systèmes d\'information, gestion des incidents et conformité réglementaire.',
        to: '/services/cybersecurite',
      },
      {
        title: 'Support informatique',
        short: 'Helpdesk, infogérance, maintenance',
        desc: 'Helpdesk, infogérance, maintenance préventive et corrective de vos infrastructures IT.',
        to: '/services/support',
      },
    ],
  },
];

export const allServices: Service[] = serviceGroups.flatMap(g => g.items);
