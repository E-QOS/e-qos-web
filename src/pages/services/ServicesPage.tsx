import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database, CreditCard, Shield,
  Compass, Wrench, ArrowRight,
  TrendingUp, Users, Briefcase,
} from 'lucide-react';
import styles from './ServicesPage.module.css';

const services = [
  { icon: <TrendingUp size={28} />, title: 'Transformation digitale', desc: 'Diagnostic, feuille de route numérique et conduite du changement adaptés aux réalités des organisations africaines.', to: '/services/transformation-digitale' },
  { icon: <Compass size={28} />, title: 'Conseil organisationnel', desc: 'Optimisation des processus, restructuration et renforcement de la performance de vos équipes et systèmes.', to: '/services/conseil-organisationnel' },
  { icon: <Database size={28} />, title: 'Implémentation Odoo', desc: 'ERP open source de A à Z : analyse fonctionnelle, paramétrage, intégrations, migration et support post-déploiement.', to: '/services/odoo' },
  { icon: <CreditCard size={28} />, title: 'Paiements locaux', desc: 'Connexion de vos logiciels aux solutions Orange Money, MTN MoMo, Wave et autres solutions mobiles africaines.', to: '/services/paiements-locaux' },
  { icon: <Shield size={28} />, title: 'Cybersécurité', desc: 'Audit de sécurité, protection des systèmes d\'information, gestion des incidents et conformité réglementaire.', to: '/services/cybersecurite' },
  { icon: <Wrench size={28} />, title: 'Support informatique', desc: 'Helpdesk, infogérance, maintenance préventive et corrective de vos infrastructures IT.', to: '/services/support' },
  { icon: <Users size={28} />, title: 'Management & Consulting', desc: 'Gouvernance, pilotage de projets complexes et amélioration continue des performances organisationnelles.', to: '/services/management-consulting' },
  { icon: <Briefcase size={28} />, title: 'Interim Management', desc: 'DSI, chefs de projet, experts techniques mobilisables rapidement pour vos missions ponctuelles ou de transition.', to: '/services/interim' },
];

const ServicesPage: React.FC = () => (
  <div>
    <section className="page-hero">
      <div className="container">
        <h1>Nos services</h1>
        <p>Une offre complète couvrant l'ensemble du spectre de la transformation numérique en Guinée et en Afrique de l'Ouest.</p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className={styles.grid}>
          {services.map((s) => (
            <Link key={s.to} to={s.to} className={styles.card}>
              <div className={styles.icon}>{s.icon}</div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <span className={styles.link}>Découvrir <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section className="cta-band">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Vous ne savez pas par où commencer ?</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Nos consultants analysent votre situation et identifient les priorités. Échange gratuit, sans engagement.</p>
        <Link to="/contact" className="btn btn-white btn-lg">Prendre contact <ArrowRight size={16} /></Link>
      </div>
    </section>
  </div>
);

export default ServicesPage;
