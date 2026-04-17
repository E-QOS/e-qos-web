import React from 'react';
import { Pickaxe } from 'lucide-react';
import SecteurPageLayout from '../../components/shared/SecteurPageLayout';

const MinesPage: React.FC = () => (
  <SecteurPageLayout
    title="Mines & Ressources naturelles"
    subtitle="Solutions ERP, logistique et reporting ESG pour les acteurs du secteur extractif africain."
    icon={<Pickaxe size={28} />}
    context="La Guinée est le premier producteur mondial de bauxite et abrite l'un des plus grands gisements de minerai de fer au monde avec le mégaprojet Simandou 2040. Ce chantier, l'un des plus grands d'Afrique, génère une demande massive en systèmes de gestion, en logistique et en reporting. Le secteur minier guinéen est un moteur économique qui requiert des systèmes d'information robustes, capables de gérer des volumes importants, des réglementations strictes et des exigences croissantes en matière d'ESG de la part des investisseurs internationaux."
    challenges={[
      'Gestion d\'actifs industriels complexes : équipements lourds, maintenance préventive, cycles de vie',
      'Traçabilité des extractions et gestion des stocks de minerai brut et transformé',
      'Coordination logistique de milliers de sous-traitants locaux et internationaux',
      'Conformité ESG et reporting investisseurs en anglais et en normes internationales (GRI, SASB)',
      'Paie et gestion des ressources humaines sur des sites éloignés',
      'Paiements des fournisseurs locaux via mobile money et conciliation des comptes',
      'Gestion des permis, des redevances minières et des obligations réglementaires locales',
    ]}
    services={[
      { label: 'Implémentation ERP industriel (SAP, Dynamics)', to: '/services/erp' },
      { label: 'Développement d\'applications terrain mobiles', to: '/services/developpement' },
      { label: 'Intégration paiements fournisseurs mobiles', to: '/services/paiements' },
      { label: 'BI & Reporting ESG', to: '/services/ia-data' },
      { label: 'Cybersécurité des systèmes de contrôle', to: '/services/cybersecurite' },
    ]}
  />
);

export default MinesPage;
