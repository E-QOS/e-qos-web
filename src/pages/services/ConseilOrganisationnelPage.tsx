import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Search, GitMerge, Users, BarChart3, Shield, Target } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';
import styles from '../../components/shared/ServicePageLayout.module.css';

const ConseilOrganisationnelPage: React.FC = () => {
  usePageMeta({
    title: 'Conseil Organisationnel & Optimisation des Processus | EQOS Africa',
    description: 'EQOS analyse vos structures, optimise vos processus et accompagne la réorganisation de vos équipes et workflows pour améliorer la performance opérationnelle de votre organisation en Guinée.',
  });
  return (
    <ServicePageLayout
      title="Conseil organisationnel — Structurer pour mieux performer"
      subtitle="Nous analysons vos organisations de l'intérieur pour identifier les gains de performance et construire des structures plus efficaces."
      breadcrumb="Conseil organisationnel"
      intro="Une organisation bien structurée exécute mieux, plus vite et à moindre coût. EQOS intervient en amont des projets technologiques pour s'assurer que les processus, les rôles et les workflows sont alignés avec vos objectifs stratégiques. Nos recommandations sont concrètes, actionnables et adaptées à votre réalité locale."
      cards={[
        { icon: <Search size={22} />, title: 'Diagnostic organisationnel', desc: 'Analyse des structures existantes, entretiens individuels, cartographie des flux d\'information et identification des dysfonctionnements structurels.' },
        { icon: <GitMerge size={22} />, title: 'Optimisation des processus', desc: 'Rationalisation des processus métier : suppression des redondances, automatisation des tâches à faible valeur, standardisation des procédures.' },
        { icon: <Users size={22} />, title: 'Réorganisation des équipes', desc: 'Définition des périmètres de responsabilité, clarification des rôles, création de nouvelles fonctions adaptées aux enjeux digitaux.' },
        { icon: <Shield size={22} />, title: 'Gouvernance IT', desc: 'Mise en place des instances de gouvernance, politiques IT, comités de pilotage et tableaux de bord pour les décideurs.' },
        { icon: <BarChart3 size={22} />, title: 'Tableaux de bord de performance', desc: 'Définition des KPIs stratégiques et opérationnels, mise en place des outils de reporting et suivi des indicateurs clés.' },
        { icon: <Target size={22} />, title: 'Alignement stratégique', desc: 'Traduction de la vision stratégique en objectifs opérationnels clairs, avec des plans d\'action priorisés et un suivi régulier.' },
      ]}
      extras={
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <div className="section-line" />
              <h2>Notre valeur ajoutée</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { t: 'Connaissance du terrain africain', d: 'Nos consultants ont une expérience directe des organisations guinéennes : contraintes réglementaires, culture managériale, ressources disponibles.' },
                { t: 'Recommandations actionnables', d: 'Pas de rapports qui restent sur une étagère. Chaque mission produit un plan d\'action concret avec des responsables, des délais et des indicateurs.' },
                { t: 'Transfert de compétences', d: 'Nous formons vos équipes pour qu\'elles soient autonomes après la mission, pas dépendantes d\'un consultant externe.' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.07)', borderRadius: 14, padding: '1.5rem', boxShadow: '0 2px 10px rgba(10,22,40,0.05)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{item.t}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{item.d}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem', padding: '2rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(10,22,40,0.08)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Types de missions réalisées</h3>
              <div className={styles.tagsList}>
                {['Refonte organisationnelle', 'Optimisation des achats', 'Restructuration RH', 'Mise en place de la gouvernance IT', 'Amélioration du service client', 'Digitalisation des processus administratifs', 'Schéma directeur informatique'].map(t => (
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

export default ConseilOrganisationnelPage;
