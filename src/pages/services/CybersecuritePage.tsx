import React from 'react';
import { Shield, Search, Lock, AlertTriangle, FileCheck, Users } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';

const CybersecuritePage: React.FC = () => (
  <ServicePageLayout
    title="Cybersécurité — Protégez votre organisation à l'ère du tout numérique"
    subtitle="La digitalisation accélérée des organisations africaines expose de nouveaux systèmes à des risques croissants. EQOS vous aide à anticiper, protéger et répondre."
    breadcrumb="Cybersécurité"
    intro="La transformation numérique crée de nouvelles vulnérabilités. Chaque système connecté, chaque application déployée et chaque portefeuille mobile intégré élargit la surface d'attaque. Une approche proactive de la sécurité n'est plus optionnelle — c'est une condition de pérennité."
    cards={[
      { icon: <Search size={22} />, title: 'Audit de sécurité', desc: 'Évaluation complète de votre posture de sécurité : tests d\'intrusion, analyse des vulnérabilités, revue des configurations et rapport priorisé de remédiation.' },
      { icon: <Shield size={22} />, title: 'Protection des SI', desc: 'Déploiement et configuration de firewalls, antivirus d\'entreprise, segmentation réseau et gestion des accès privilégiés (IAM).' },
      { icon: <AlertTriangle size={22} />, title: 'Gestion des incidents', desc: 'Détection des comportements anormaux, confinement rapide, investigation forensique, remédiation et rapport post-incident.' },
      { icon: <FileCheck size={22} />, title: 'Conformité réglementaire', desc: 'Accompagnement aux exigences BCEAO, protection des données personnelles, normes sectorielles. Audit de conformité et plan de mise en conformité.' },
      { icon: <Lock size={22} />, title: 'Sécurisation des applications', desc: 'Revue du code, tests OWASP, sécurisation des APIs, chiffrement des données sensibles, gestion des secrets.' },
      { icon: <Users size={22} />, title: 'Sensibilisation des équipes', desc: 'Formation aux bonnes pratiques de sécurité, simulation de phishing, gestion des mots de passe, politique d\'accès. Les employés sont votre première ligne de défense.' },
    ]}
  />
);

export default CybersecuritePage;
