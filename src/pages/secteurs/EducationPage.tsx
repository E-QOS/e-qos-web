import React from 'react';
import { GraduationCap } from 'lucide-react';
import SecteurPageLayout from '../../components/shared/SecteurPageLayout';

const EducationPage: React.FC = () => (
  <SecteurPageLayout
    title="Éducation & Formation"
    subtitle="LMS, gestion scolaire et paiements digitaux pour les établissements d'enseignement d'Afrique de l'Ouest."
    icon={<GraduationCap size={28} />}
    context="La demande en solutions digitales pour l'éducation est forte en Guinée et dans la sous-région. La gestion administrative des établissements scolaires reste très manuelle dans la plupart des structures. La collecte des frais de scolarité en cash est source de risques et de pertes. Le manque d'outils de suivi pédagogique nuit à la qualité de l'enseignement. Par ailleurs, la formation professionnelle et continue connaît une forte demande avec la montée en puissance du numérique dans les entreprises guinéennes."
    challenges={[
      'Gestion administrative : inscriptions, absences, notes, bulletins — encore très souvent sur papier',
      'Collecte des frais scolaires en cash : risques de détournements, difficultés de traçabilité',
      'Communication avec les parents d\'élèves : informations, résultats, convocations',
      'Suivi pédagogique individuel des élèves pour identifier les élèves en difficulté',
      'Formation à distance pour atteindre les apprenants hors des grandes villes',
      'Gestion des enseignants et du personnel administratif',
    ]}
    services={[
      { label: 'LMS & formation à distance', to: '/services/developpement' },
      { label: 'Logiciel de gestion scolaire', to: '/services/developpement' },
      { label: 'Portail parents & communication', to: '/services/developpement' },
      { label: 'Paiement des frais scolaires via mobile money', to: '/services/paiements' },
      { label: 'Formation des équipes pédagogiques', to: '/services/formation' },
    ]}
  />
);

export default EducationPage;
