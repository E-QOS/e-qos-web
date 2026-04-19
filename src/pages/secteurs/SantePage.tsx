import React from 'react';
import { Heart } from 'lucide-react';
import SecteurPageLayout from '../../components/shared/SecteurPageLayout';

const SantePage: React.FC = () => (
  <SecteurPageLayout
    title="Santé"
    subtitle="Logiciels de gestion hospitalière, dossiers médicaux électroniques et paiements des actes via mobile money."
    icon={<Heart size={28} />}
    context="Le gouvernement guinéen s'est engagé dans l'amélioration de l'accès aux soins, avec notamment le lancement de l'E-CNSS en 2025, qui digitalise la gestion des prestations de sécurité sociale. La numérisation du secteur de la santé est un enjeu stratégique : réduire les coûts administratifs, améliorer la coordination entre structures, faciliter l'accès aux soins pour les populations éloignées et garantir la continuité des soins grâce à des dossiers médicaux accessibles."
    challenges={[
      'Dossiers patients encore majoritairement en format papier, difficiles à partager entre structures',
      'Gestion des stocks de médicaments et de consommables médicaux dans des conditions difficiles',
      'Facturation des actes médicaux et recouvrement des créances, notamment auprès de la CNSS',
      'Coordination entre différentes structures de santé d\'un même district ou réseau',
      'Paiement des soins par les patients via mobile money — alternative à l\'argent liquide',
      'Reporting statistique et épidémiologique vers le Ministère de la Santé',
    ]}
    services={[
      { label: 'Logiciels de gestion hospitalière', to: '/services/developpement' },
      { label: 'Dossiers médicaux électroniques', to: '/services/developpement' },
      { label: 'Applications agents de santé communautaire', to: '/services/developpement' },
      { label: 'Paiements des actes via mobile money', to: '/services/paiements' },
      { label: 'Formation des personnels soignants', to: '/services/formation' },
    ]}
  />
);

export default SantePage;
