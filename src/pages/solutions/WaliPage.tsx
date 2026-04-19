import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Star, CreditCard, Clock, Shield, MessageSquare,
  ArrowRight, Smartphone, Building2
} from 'lucide-react';
import styles from './SolutionPage.module.css';

const features = [
  { icon: <MapPin size={20} />, title: 'Géolocalisation des prestataires', desc: 'Trouvez les prestataires disponibles près de vous en temps réel. Filtrez par compétence, notation et disponibilité.' },
  { icon: <Star size={20} />, title: 'Notation & Avis vérifiés', desc: 'Système de réputation transparent. Chaque mission évaluée par le client et le prestataire pour garantir la qualité.' },
  { icon: <CreditCard size={20} />, title: 'Paiement mobile intégré', desc: 'Orange Money, MTN MoMo et Wave intégrés nativement. Pas de cash — transaction sécurisée et tracée.' },
  { icon: <Clock size={20} />, title: 'Suivi en temps réel', desc: 'Suivez l\'avancement de votre mission et la position du prestataire en direct depuis l\'application.' },
  { icon: <Shield size={20} />, title: 'Profils vérifiés', desc: 'Chaque prestataire passe par un processus de vérification. Identité confirmée, compétences évaluées, historique visible.' },
  { icon: <MessageSquare size={20} />, title: 'Messagerie intégrée', desc: 'Communiquez directement avec votre prestataire depuis l\'application, sans partager votre numéro de téléphone.' },
];

const WaliPage: React.FC = () => (
  <div className={styles.page}>
    <section className={styles.hero} style={{ '--hero-color': '#1e464a' } as React.CSSProperties}>
      <div className={styles.heroGlow}      aria-hidden="true" />
      <div className={styles.heroGlowRight} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Services à la demande</span>
          <h1 className={styles.heroTitle}>Wali — Les services à domicile, en un tap</h1>
          <p className={styles.heroSub}>Trouver un prestataire de confiance pour une livraison, un nettoyage, des cours particuliers ou un service professionnel ne devrait pas être compliqué. Wali met en relation particuliers, PME et prestataires vérifiés sur une plateforme simple, sécurisée et adaptée aux réalités africaines.</p>
          <div className={styles.heroCtas}>
            <a href="#" className="btn btn-white" aria-label="Télécharger sur Google Play">
              <Smartphone size={16} />
              Google Play
            </a>
            <a href="#" className="btn btn-white-outline" aria-label="Télécharger sur App Store">
              App Store
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2>Fonctionnalités principales</h2>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className={styles.b2bSection}>
          <div>
            <h2>Intégration B2B via API</h2>
            <p>Vous gérez une entreprise de services ou souhaitez intégrer Wali dans votre ERP ou application existante ? EQOS propose une API complète pour connecter Wali à vos systèmes.</p>
            <p>Cas d'usage : réservation de services depuis votre CRM, dispatch automatique de techniciens, suivi des interventions intégré à votre ERP de maintenance.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Parler à notre équipe <ArrowRight size={15} />
            </Link>
          </div>
          <div className={styles.b2bIcon}>
            <Building2 size={80} color="rgba(30,70,74,0.12)" />
          </div>
        </div>
      </div>
    </section>

    <section className="cta-band">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Prêt à simplifier votre quotidien ?</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Rejoignez des milliers d'utilisateurs qui accèdent à des prestataires de confiance via Wali.</p>
        <a href="#" className="btn btn-white btn-lg">
          <Smartphone size={16} />
          Télécharger Wali
        </a>
      </div>
    </section>
  </div>
);

export default WaliPage;
