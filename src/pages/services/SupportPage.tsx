import React from 'react';
import { Wrench, Activity, RefreshCw, Phone, FileSearch, Zap } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';

const SupportPage: React.FC = () => (
  <ServicePageLayout
    title="Support & Maintenance — Un accompagnement qui dure"
    subtitle="Le go-live n'est pas la fin du projet. C'est le début d'une phase d'exploitation où la qualité du support conditionne le retour sur investissement."
    breadcrumb="Support & Maintenance"
    intro="Les organisations qui tirent le plus de valeur de leurs systèmes digitaux sont celles qui bénéficient d'un support continu et réactif. EQOS reste à vos côtés après le déploiement pour assurer la performance, l'évolution et la sécurité de vos systèmes."
    cards={[
      { icon: <Phone size={22} />, title: 'Support utilisateurs', desc: 'Helpdesk multicanal (email, téléphone, messagerie) pour vos utilisateurs. Tickets priorisés, suivi de résolution et base de connaissances.' },
      { icon: <Activity size={22} />, title: 'Monitoring applicatif', desc: 'Supervision des applications en production, détection proactive des anomalies, alertes avant incident majeur. SLA définis selon vos exigences.' },
      { icon: <Wrench size={22} />, title: 'Maintenance corrective', desc: 'Analyse des bugs signalés, correction, tests de non-régression et déploiement. Délais de résolution garantis par niveau de criticité.' },
      { icon: <RefreshCw size={22} />, title: 'Maintenance évolutive', desc: 'Développement de nouvelles fonctionnalités, évolutions réglementaires, mises à jour de versions. Roadmap co-construite avec vos équipes.' },
      { icon: <FileSearch size={22} />, title: 'Audits périodiques', desc: 'Revues régulières de performance, de sécurité et d\'usage. Recommandations d\'optimisation basées sur les données d\'exploitation réelles.' },
      { icon: <Zap size={22} />, title: 'Interventions d\'urgence', desc: 'Equipe de crise disponible pour les incidents critiques en production. Mobilisation rapide avec procédures d\'escalade claires.' },
    ]}
  />
);

export default SupportPage;
