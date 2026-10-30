// Secteurs phares de l'économie guinéenne : contenu des vitrines vidéo et de la page Recrutement et intérim.
// Faits vérifiés (sources dans docs/redesign/REPORT.md, section 10) :
// - Guinée premier producteur mondial de bauxite (Coface, 2025) ; premier minerai de Simandou expédié en décembre 2025 (Rio Tinto).
// - Kaléta 240 MW (2015) et Souapiti 450 MW (Tractebel Engie).
// - Agriculture : environ 32 % du PIB et plus de 60 % des emplois (Banque mondiale, Guinea Economic Update, octobre 2026).

export interface SectorMedia {
  /** Vidéo MP4 (H.264), sans son. Laisser vide tant que le fichier n'est pas livré. */
  video?: string;
  /** Vidéo WebM (VP9), optionnelle, plus légère. */
  webm?: string;
  /** Image affichée avant lecture et sur connexion lente. */
  poster?: string;
}

export interface Sector {
  key: string;
  name: string;
  places: string;
  fact: string;
  profiles: string[];
  media: SectorMedia;
}

// Déposer les fichiers dans public/media/secteurs/ (voir le README de ce dossier), puis renseigner `media`.
export const sectors: Sector[] = [
  {
    key: 'mines',
    name: 'Mines et carrières',
    places: 'Boké · Kamsar · Simandou · Siguiri',
    fact: 'Premier producteur mondial de bauxite, la Guinée exporte depuis fin 2025 le minerai de fer de Simandou.',
    profiles: ['Conducteurs d\'engins', 'Mécaniciens engins lourds', 'Électromécaniciens', 'Topographes', 'Responsables HSE', 'Superviseurs de production'],
    media: {},
  },
  {
    key: 'energie',
    name: 'Énergie',
    places: 'Kaléta · Souapiti · Conakry',
    fact: 'Les centrales de Kaléta (240 MW) et de Souapiti (450 MW) structurent la production hydroélectrique du pays.',
    profiles: ['Électriciens HT/BT', 'Techniciens de maintenance', 'Automaticiens', 'Ingénieurs d\'exploitation'],
    media: {},
  },
  {
    key: 'btp',
    name: 'BTP et infrastructures',
    places: 'Corridor Simandou · Conakry · Intérieur du pays',
    fact: 'Voies ferrées, ports, routes et bâtiments : les grands chantiers d\'infrastructures redessinent le territoire.',
    profiles: ['Conducteurs de travaux', 'Chefs de chantier', 'Soudeurs', 'Coffreurs-ferrailleurs', 'Géomètres'],
    media: {},
  },
  {
    key: 'logistique',
    name: 'Ports, transport et logistique',
    places: 'Port de Conakry · Kamsar',
    fact: 'Conakry et Kamsar concentrent les flux d\'import et d\'export du pays, du conteneur au minerai.',
    profiles: ['Logisticiens', 'Caristes', 'Chauffeurs poids lourds', 'Agents de transit', 'Mécaniciens'],
    media: {},
  },
  {
    key: 'agro',
    name: 'Agriculture et agro-industrie',
    places: 'Basse, Moyenne, Haute Guinée et Guinée forestière',
    fact: 'L\'agriculture représente près d\'un tiers du PIB et plus de 60 % des emplois du pays.',
    profiles: ['Techniciens agricoles', 'Chefs d\'exploitation', 'Responsables qualité', 'Conducteurs de machines'],
    media: {},
  },
  {
    key: 'services',
    name: 'Banque, télécoms et services',
    places: 'Conakry et capitales régionales',
    fact: 'Banques, opérateurs et entreprises de services renforcent leurs équipes au rythme de la croissance.',
    profiles: ['Comptables', 'Chargés de clientèle', 'Techniciens réseaux', 'Assistants administratifs'],
    media: {},
  },
];
