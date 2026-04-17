import React from 'react';
import { Wheat } from 'lucide-react';
import SecteurPageLayout from '../../components/shared/SecteurPageLayout';

const AgriculturePage: React.FC = () => (
  <SecteurPageLayout
    title="Agriculture & Agroalimentaire"
    subtitle="Traçabilité, mise en marché digital et financement mobile pour les acteurs de la filière agricole."
    icon={<Wheat size={28} />}
    context="L'agriculture est le secteur dominant de l'économie guinéenne en termes d'emplois. Le potentiel de digitalisation est considérable : en connectant les producteurs ruraux aux marchés urbains, en leur permettant de recevoir des paiements via mobile money et en leur donnant accès à des services financiers, la technologie peut transformer les conditions de vie de millions d'agriculteurs. C'est précisément l'objectif de Makiti, la solution marketplace d'EQOS dédiée au secteur agri-alimentaire."
    challenges={[
      'Accès des producteurs ruraux aux marchés urbains — trop souvent via des intermédiaires qui captent la valeur',
      'Traçabilité des produits de la ferme à la table : garantie de fraîcheur, d\'origine, certification',
      'Gestion des coopératives : membres, cotisations, distribution de revenus, suivi des récoltes',
      'Financement des intrants et des campagnes agricoles via mobile money',
      'Logistique de collecte en zones rurales peu connectées',
      'Information sur les prix du marché en temps réel pour les producteurs',
    ]}
    services={[
      { label: 'Makiti — Marketplace agricole', to: '/solutions/makiti' },
      { label: 'Plateformes de gestion de coopératives', to: '/services/developpement' },
      { label: 'Applications terrain offline-first', to: '/services/developpement' },
      { label: 'Paiements agriculteurs via mobile money', to: '/services/paiements' },
      { label: 'Conseil & transformation digitale', to: '/services/conseil' },
    ]}
  />
);

export default AgriculturePage;
