import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Target, BarChart3, Shield, Compass, Users, TrendingUp } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';
import styles from '../../components/shared/ServicePageLayout.module.css';

const ManagementConsultingPage: React.FC = () => {
  usePageMeta({
    title: 'Management & Consulting — Pilotage de projets complexes | EQOS Africa',
    description: 'EQOS accompagne les dirigeants guinéens dans la conduite de projets complexes, la gouvernance IT et l\'optimisation opérationnelle. Conseil en management adapté au contexte africain.',
  });
  return (
    <ServicePageLayout
      title="Management & Consulting — L'expertise au service de vos décisions"
      subtitle="Nous accompagnons les décideurs dans la conduite de projets complexes, la gouvernance et l'optimisation de leurs opérations."
      breadcrumb="Management & Consulting"
      intro="Les organisations guinéennes font face à des défis spécifiques : ressources contraintes, mutations réglementaires rapides, pression sur la compétitivité. EQOS met à disposition une expertise de haut niveau en management et en pilotage de projets pour aider les décideurs à traverser ces transformations avec méthode et sécurité."
      cards={[
        { icon: <Target size={22} />, title: 'Pilotage de projets complexes', desc: 'Cadrage, planification, gestion des risques et pilotage opérationnel des projets stratégiques. Reporting au CODIR et arbitrages éclairés.' },
        { icon: <Shield size={22} />, title: 'Gouvernance IT', desc: 'Mise en place de politiques IT, comités de pilotage, schéma directeur informatique et tableaux de bord pour les décideurs.' },
        { icon: <BarChart3 size={22} />, title: 'Optimisation opérationnelle', desc: 'Analyse de la performance opérationnelle, identification des leviers d\'amélioration, déploiement de plans d\'action mesurables.' },
        { icon: <Compass size={22} />, title: 'Benchmarking sectoriel', desc: 'Comparaison de votre organisation avec les meilleures pratiques du secteur en Afrique de l\'Ouest. Identification des écarts et recommandations.' },
        { icon: <Users size={22} />, title: 'Gestion des parties prenantes', desc: 'Cartographie et gestion des parties prenantes, animation des comités, communication stratégique et alignement des équipes dirigeantes.' },
        { icon: <TrendingUp size={22} />, title: 'Plans de transformation', desc: 'Construction et suivi de plans de transformation stratégique : organisation, processus, systèmes et culture.' },
      ]}
      extras={
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <div className="section-line" />
              <h2>Pourquoi faire appel à EQOS pour le consulting ?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { t: 'Ancrage local', d: 'Nos consultants connaissent les réalités guinéennes : culture d\'entreprise, contraintes réglementaires, réseau de partenaires et enjeux propres au marché local.' },
                { t: 'Indépendance', d: 'Nous ne vendons pas de produits logiciels. Notre seul intérêt est votre réussite. Nos recommandations sont objectives et adaptées à vos vrais besoins.' },
                { t: 'Résultats mesurables', d: 'Chaque mission se clôt avec des indicateurs de résultat clairs, validés avec vous en amont. Vous savez à quoi sert chaque euro investi.' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.07)', borderRadius: 14, padding: '1.75rem', boxShadow: '0 2px 10px rgba(10,22,40,0.05)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{item.t}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{item.d}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem', padding: '2rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(10,22,40,0.08)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Domaines d'intervention</h3>
              <div className={styles.tagsList}>
                {['Transformation digitale', 'Réorganisation', 'Gouvernance IT', 'Gestion de crise', 'Stratégie digitale', 'Performance commerciale', 'Conduite du changement', 'Plan directeur'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      }
    />
  );
};

export default ManagementConsultingPage;
