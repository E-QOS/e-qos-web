import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Briefcase, Users, Zap, BarChart3, Shield, Compass } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';
import styles from '../../components/shared/ServicePageLayout.module.css';

const profiles = [
  { role: 'DSI de transition', desc: 'Direction des systèmes d\'information en mode intérim pour piloter une transformation, gérer une vacance de poste ou accompagner une fusion.' },
  { role: 'Chef de projet digital', desc: 'Pilotage end-to-end d\'un projet de transformation digitale, d\'implémentation ERP ou de refonte système.' },
  { role: 'Consultant fonctionnel', desc: 'Expert métier (finance, RH, logistique) pour accompagner un déploiement Odoo ou structurer les processus d\'une direction.' },
  { role: 'Manager de crise', desc: 'Intervention rapide pour stabiliser une situation : incident majeur, conflit organisationnel, perte de compétences clés.' },
];

const InterimPage: React.FC = () => {
  usePageMeta({
    title: 'Interim Management — Managers & Experts en mission | EQOS Africa',
    description: 'EQOS met à disposition des managers et experts qualifiés pour des missions temporaires : DSI de transition, chef de projet, consultant fonctionnel. Disponibles en Guinée rapidement.',
  });
  return (
    <ServicePageLayout
      title="Interim Management — Les bons experts, au bon moment"
      subtitle="Nous mettons à disposition des managers et experts qualifiés pour des missions temporaires dans vos organisations."
      breadcrumb="Interim Management"
      intro="Une vacance de poste stratégique, un projet critique sans pilote, une transformation qui nécessite une expertise que vous n'avez pas en interne — voilà les situations où l'interim management fait la différence. EQOS dispose d'un réseau de managers expérimentés, disponibles rapidement, pour prendre en charge des responsabilités opérationnelles le temps que vous trouviez la solution pérenne."
      cards={[
        { icon: <Briefcase size={22} />, title: 'DSI de transition', desc: 'Direction des systèmes d\'information en mode intérim pour piloter une transformation majeure ou pallier une vacance de poste.' },
        { icon: <Users size={22} />, title: 'Chef de projet', desc: 'Pilotage end-to-end de vos projets stratégiques : ERP, transformation digitale, refonte organisationnelle.' },
        { icon: <Compass size={22} />, title: 'Consultant fonctionnel', desc: 'Expert métier (finance, RH, logistique, commercial) pour structurer les processus ou accompagner un déploiement Odoo.' },
        { icon: <Zap size={22} />, title: 'Manager de crise', desc: 'Intervention rapide pour stabiliser une situation critique : incident majeur, conflit, perte de compétences clés.' },
        { icon: <BarChart3 size={22} />, title: 'Directeur de transformation', desc: 'Pilotage global d\'un programme de transformation avec coordination de multiples chantiers simultanés.' },
        { icon: <Shield size={22} />, title: 'Expert sectoriel', desc: 'Apport d\'une expertise pointue dans un secteur spécifique (mines, banque, santé, public) pour des missions de conseil court terme.' },
      ]}
      extras={
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <div className="section-line" />
              <h2>Profils disponibles</h2>
              <p className="lead">Des managers opérationnels, disponibles rapidement, avec une expérience éprouvée en Afrique.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {profiles.map((p, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.07)', borderRadius: 14, padding: '1.5rem', boxShadow: '0 2px 10px rgba(10,22,40,0.05)', borderLeft: '4px solid var(--color-accent)' }}>
                  <h4 style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{p.role}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem', padding: '2rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(10,22,40,0.08)' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Modalités d'engagement</h3>
              <div className={styles.tagsList}>
                {['Mission dès 1 mois', 'Temps plein ou partiel', 'Sur site ou hybride', 'Briefing en 48h', 'Prise de poste rapide', 'Transmission documentée', 'Bilan de fin de mission'].map(t => (
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

export default InterimPage;
