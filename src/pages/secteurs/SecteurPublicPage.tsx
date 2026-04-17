import React from 'react';
import { Landmark } from 'lucide-react';
import SecteurPageLayout from '../../components/shared/SecteurPageLayout';

const SecteurPublicPage: React.FC = () => (
  <SecteurPageLayout
    title="Secteur public & ONG"
    subtitle="E-gouvernement, ERP public et accompagnement des organisations internationales en Afrique de l'Ouest."
    icon={<Landmark size={28} />}
    context="L'administration guinéenne est en pleine transformation numérique sous l'impulsion de l'ANDE (Agence Nationale de Digitalisation de l'État). La vision 2026 vise une administration fortement digitalisée avec des services en ligne accessibles aux citoyens. L'E-CNSS lancé en 2025, l'adoption de Trésor Pay pour les paiements publics et la dématérialisation des marchés publics sont autant de jalons de cette transformation. Les ONG et bailleurs internationaux exigent quant à eux des systèmes de suivi-évaluation rigoureux et une traçabilité totale des fonds."
    challenges={[
      'Applications éparpillées, non interconnectées, données saisies plusieurs fois dans des systèmes différents',
      'Processus administratifs encore manuels, longs et source d\'erreurs',
      'Collecte des taxes et redevances encore très peu digitalisée',
      'Reporting bailleurs internationaux (PNUD, Banque Mondiale, UE) en formats normalisés',
      'Sécurisation des données citoyennes et des archives publiques',
      'Formation des agents publics à de nouveaux outils et processus',
    ]}
    services={[
      { label: 'ERP public & gestion budgétaire', to: '/services/erp' },
      { label: 'E-gouvernement & guichets numériques', to: '/services/e-gouvernement' },
      { label: 'Intégration Trésor Pay & paiements publics', to: '/services/paiements' },
      { label: 'Interopérabilité des systèmes d\'État', to: '/services/developpement' },
      { label: 'Formation des agents publics', to: '/services/formation' },
    ]}
  />
);

export default SecteurPublicPage;
