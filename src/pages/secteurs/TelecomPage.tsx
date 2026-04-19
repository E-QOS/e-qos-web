import React from 'react';
import { Smartphone } from 'lucide-react';
import SecteurPageLayout from '../../components/shared/SecteurPageLayout';

const TelecomPage: React.FC = () => (
  <SecteurPageLayout
    title="Télécommunications"
    subtitle="Systèmes de gestion, CRM et analytics pour les opérateurs télécoms d'Afrique de l'Ouest."
    icon={<Smartphone size={28} />}
    context="La Guinée compte trois opérateurs majeurs — Orange Guinée, MTN et Cellcom — dans un marché à forte croissance. L'expansion continue du réseau mobile, le quadruplement de la capacité de la fibre nationale à 200 Go fin 2024 et l'arrivée de Starlink créent un environnement en mutation. Les opérateurs télécoms font face à des besoins croissants en systèmes de gestion, en analyse de données et en digitalisation de leur distribution."
    challenges={[
      'Gestion d\'un réseau de distribution complexe avec des milliers de revendeurs indépendants',
      'CRM pour la gestion des abonnés, le suivi des réclamations et la rétention client',
      'Systèmes de facturation et de médiation pour des offres de plus en plus variées',
      'Digitalisation des processus internes (RH, achats, comptabilité)',
      'Analytics des données réseau pour optimiser la qualité de service',
      'Gestion des partenariats mobile money et integration de super-app (Orange Money, Max it)',
    ]}
    services={[
      { label: 'Implémentation ERP', to: '/services/erp' },
      { label: 'Développement CRM sur-mesure', to: '/services/developpement' },
      { label: 'Portails distributeurs & applications agents', to: '/services/developpement' },
      { label: 'Data Analytics & tableaux de bord', to: '/services/ia-data' },
      { label: 'Cybersécurité des réseaux', to: '/services/cybersecurite' },
    ]}
  />
);

export default TelecomPage;
