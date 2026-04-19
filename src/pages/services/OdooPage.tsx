import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Database, ShoppingCart, Factory, Users, BarChart3, Layers } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';
import styles from '../../components/shared/ServicePageLayout.module.css';

const whyOdoo = [
  {
    title: 'Open source & sans vendor lock-in',
    desc: 'Votre solution vous appartient. Elle peut être auditée, modifiée et transférée librement — aucune dépendance à un éditeur propriétaire.',
  },
  {
    title: 'Modulaire',
    desc: 'Déployez uniquement les modules dont vous avez besoin : ventes, achats, stock, comptabilité, RH, projets, et plus de 16 000 modules communautaires disponibles.',
  },
  {
    title: 'Accessible',
    desc: 'Coût d\'entrée bien inférieur aux ERP traditionnels. Adapté aussi bien aux PME qu\'aux grandes organisations, sans rogner sur les fonctionnalités.',
  },
  {
    title: 'Mobile & Cloud-ready',
    desc: 'Accessible depuis n\'importe quel navigateur, sans installation client. Compatible avec les réalités africaines : connexion variable, mobilité des équipes terrain.',
  },
];

const OdooPage: React.FC = () => {
  usePageMeta({
    title: 'Implémentation Odoo en Guinée | EQOS Africa',
    description: 'EQOS déploie Odoo pour les entreprises et institutions guinéennes : paramétrage, migration des données, formation et support post go-live. L\'ERP open source le plus complet du marché.',
  });
  return (
    <ServicePageLayout
      title="Implémentation Odoo — L'ERP open source pensé pour votre croissance"
      subtitle="Odoo est la solution ERP la plus complète et la plus flexible du marché. EQOS vous accompagne de l'analyse de vos besoins jusqu'au go-live, avec un support continu après déploiement."
      breadcrumb="Implémentation Odoo"
      intro="Un ERP bien implémenté transforme la façon dont votre organisation fonctionne. EQOS vous accompagne depuis la définition des besoins jusqu'au go-live et au-delà, en s'assurant que vos équipes s'approprient réellement l'outil. Nous choisissons Odoo parce que c'est la solution qui offre le meilleur équilibre entre richesse fonctionnelle, flexibilité et coût total de possession pour les organisations africaines."
      cards={[
        { icon: <BarChart3 size={22} />, title: 'Finances & Comptabilité', desc: 'Comptabilité générale et analytique, gestion budgétaire, rapports financiers, facturation et suivi des paiements en GNF.' },
        { icon: <ShoppingCart size={22} />, title: 'Achats & Ventes', desc: 'Gestion des bons de commande, appels d\'offres, approbations multi-niveaux, pipeline commercial et devis automatisés.' },
        { icon: <Factory size={22} />, title: 'Stocks & Logistique', desc: 'Gestion multi-entrepôts, traçabilité des flux, réapprovisionnement automatique, valorisation des stocks.' },
        { icon: <Users size={22} />, title: 'Ressources Humaines & Paie', desc: 'Gestion du personnel, calcul de la paie selon les règles locales guinéennes, congés, absences, évaluation et formation.' },
        { icon: <Layers size={22} />, title: 'Projets & Services', desc: 'Planification de projets, suivi du temps, facturation à l\'avancement et gestion des ressources par projet.' },
        { icon: <Database size={22} />, title: 'Intégrations locales', desc: 'Connexion native aux solutions de paiement guinéennes (Orange Money, MTN MoMo, Trésor Pay) et aux plateformes bancaires locales.' },
      ]}
      extras={
        <>
          {/* Pourquoi Odoo */}
          <section className="section">
            <div className="container">
              <div className="section-header">
                <div className="section-line" />
                <h2>Pourquoi Odoo ?</h2>
                <p className="lead">Quatre raisons pour lesquelles nous recommandons Odoo à nos clients africains.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {whyOdoo.map((item, i) => (
                  <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.07)', borderRadius: 14, padding: '1.75rem', boxShadow: '0 2px 10px rgba(10,22,40,0.05)', borderTop: '3px solid var(--color-accent)' }}>
                    <div style={{ width: 36, height: 36, background: 'rgba(255,107,44,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-accent)' }}>{i + 1}</span>
                    </div>
                    <h4 style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Méthodologie */}
          <section className="section section-alt">
            <div className="container">
              <div className="section-header">
                <div className="section-line" />
                <h2>Notre méthodologie en 5 étapes</h2>
                <p className="lead">Une approche structurée, testée sur de nombreux projets en Guinée.</p>
              </div>
              <div className={styles.methodTimeline}>
                {[
                  { n: 1, t: 'Diagnostic & Cadrage', d: 'Cartographie des processus existants, identification des écarts, définition précise du périmètre fonctionnel et du planning.' },
                  { n: 2, t: 'Conception & Paramétrage', d: 'Configuration d\'Odoo selon vos processus validés. Développements spécifiques uniquement lorsque c\'est indispensable.' },
                  { n: 3, t: 'Migration des données', d: 'Extraction, nettoyage et chargement des données historiques. Contrôle qualité et validation avec vos équipes.' },
                  { n: 4, t: 'Formation des utilisateurs', d: 'Sessions pratiques sur mesure, documentation, accompagnement au changement. Formation adaptée à chaque profil.' },
                  { n: 5, t: 'Go-live & Support renforcé', d: 'Démarrage en production sécurisé, support intensif les premières semaines, suivi des KPIs et ajustements rapides.' },
                ].map((step) => (
                  <div key={step.n} className={styles.timelineStep}>
                    <div className={styles.timelineNum}>{step.n}</div>
                    <div className={styles.timelineContent}>
                      <h4>{step.t}</h4>
                      <p>{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '3rem', padding: '2rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(10,22,40,0.08)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Spécificités africaines prises en charge</h3>
                <div className={styles.tagsList}>
                  {['Intégration Orange Money / MTN MoMo', 'Connexion Trésor Pay', 'Mode offline partiel', 'Adaptations réglementaires guinéennes', 'Interface en français', 'Devise locale (GNF)', 'Reporting multi-devises', 'TVA et fiscalité locale'].map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
};

export default OdooPage;
