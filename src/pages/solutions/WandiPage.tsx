import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, CreditCard, Clock, Shield, BarChart3, Navigation,
  Smartphone, Building2, ArrowRight
} from 'lucide-react';
import styles from './SolutionPage.module.css';

const features = [
  { icon: <Navigation size={20} />, title: 'Réservation de transport', desc: 'Réservez un trajet en quelques secondes. Choisissez votre type de véhicule, confirmez le prix avant de partir.' },
  { icon: <MapPin size={20} />, title: 'Géolocalisation des véhicules', desc: 'Suivez votre chauffeur en temps réel sur la carte. Partagez votre position en direct avec vos proches.' },
  { icon: <CreditCard size={20} />, title: 'Paiement mobile intégré', desc: 'Réglez vos trajets via Orange Money, MTN MoMo ou Wave. Facturation transparente, reçu digital automatique.' },
  { icon: <Clock size={20} />, title: 'Historique des trajets', desc: 'Accédez à l\'ensemble de vos trajets passés avec les détails, distances, coûts et évaluations.' },
  { icon: <Shield size={20} />, title: 'Chauffeurs vérifiés', desc: 'Chaque chauffeur passe par un processus de vérification : permis, véhicule, identité. Votre sécurité est notre priorité.' },
  { icon: <BarChart3 size={20} />, title: 'Gestion de flotte entreprise', desc: 'Module B2B pour gérer le transport de votre personnel. Centralisation des demandes, validation, reporting mensuel.' },
];

const WandiPage: React.FC = () => (
  <div className={styles.page}>
    <section className={styles.hero} style={{ '--hero-color': '#1e5fa0' } as React.CSSProperties}>
      <div className={styles.heroGlow}      aria-hidden="true" />
      <div className={styles.heroGlowRight} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Mobilité intelligente</span>
          <h1 className={styles.heroTitle}>Wandi — La mobilité intelligente pour les villes africaines</h1>
          <p className={styles.heroSub}>Dans les villes africaines, le transport reste un défi quotidien. Wandi connecte passagers et chauffeurs vérifiés sur une plateforme sécurisée, avec paiement mobile intégré et suivi en temps réel.</p>
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
            <h2>Transport d'entreprise</h2>
            <p>Wandi propose une solution dédiée aux entreprises qui souhaitent gérer le transport de leur personnel : navettes, déplacements professionnels, flotte de véhicules partenaires.</p>
            <p>Tableau de bord centralisé, validation des demandes, facturation mensuelle consolidée et reporting par département.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              En savoir plus <ArrowRight size={15} />
            </Link>
          </div>
          <div className={styles.b2bIcon}>
            <Building2 size={80} color="rgba(30,95,160,0.12)" />
          </div>
        </div>
      </div>
    </section>

    <section className="cta-band">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Vous déplacez-vous souvent en ville ?</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Téléchargez Wandi et réservez votre prochain trajet en quelques secondes.</p>
        <a href="#" className="btn btn-white btn-lg">
          <Smartphone size={16} />
          Télécharger Wandi
        </a>
      </div>
    </section>
  </div>
);

export default WandiPage;
