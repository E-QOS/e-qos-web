import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wheat, MapPin, CreditCard, Truck, Star, Users,
  Smartphone, ArrowRight, TrendingUp
} from 'lucide-react';
import styles from './SolutionPage.module.css';

const features = [
  { icon: <Wheat size={20} />, title: 'Catalogue producteurs locaux', desc: 'Découvrez les producteurs de votre région et leurs produits : légumes, fruits, céréales, poissons, viandes, produits transformés.' },
  { icon: <CreditCard size={20} />, title: 'Commande & Paiement mobile', desc: 'Commandez en ligne et payez via Orange Money, MTN MoMo ou Wave. Confirmation instantanée, reçu digital.' },
  { icon: <Truck size={20} />, title: 'Livraison tracée', desc: 'Suivez votre livraison en temps réel depuis la ferme jusqu\'à votre porte. Délais estimés, notifications de statut.' },
  { icon: <TrendingUp size={20} />, title: 'Prix équitables', desc: 'En éliminant les intermédiaires superflus, Makiti permet aux producteurs de vendre à de meilleurs prix et aux consommateurs d\'acheter moins cher.' },
  { icon: <Star size={20} />, title: 'Notation & Qualité', desc: 'Chaque producteur et chaque produit est évalué par les acheteurs. Un système de réputation qui garantit la qualité.' },
  { icon: <Users size={20} />, title: 'Soutien à l\'économie rurale', desc: 'Makiti redistribue la valeur vers les agriculteurs. Chaque commande contribue directement au revenu d\'un producteur local.' },
];

const MakitiPage: React.FC = () => (
  <div className={styles.page}>
    <section className={styles.hero} style={{ '--hero-color': '#2d7a3a' } as React.CSSProperties}>
      <div className={styles.heroGlow}      aria-hidden="true" />
      <div className={styles.heroGlowRight} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Marketplace agricole</span>
          <h1 className={styles.heroTitle}>Makiti — La marketplace qui connecte producteurs et consommateurs</h1>
          <p className={styles.heroSub}>En Guinée, des producteurs ruraux ont des produits frais de qualité mais peinent à accéder aux marchés urbains. Des consommateurs urbains cherchent des produits locaux authentiques à prix juste. Makiti résout ces deux problèmes simultanément.</p>
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
              <div className={styles.featureIcon} style={{ background: 'rgba(45,122,58,0.08)', color: '#2d7a3a' }}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
          <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '2rem', border: '1px solid rgba(30,70,74,0.07)' }}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Pour les consommateurs</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem' }}>Restaurants, collectivités, particuliers, revendeurs. Commandez en ligne auprès de producteurs vérifiés, payez par mobile money et recevez vos produits frais directement.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <MapPin size={16} color="#2d7a3a" />
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Disponible en Guinée · Expansion Afrique de l'Ouest — à venir</span>
            </div>
          </div>
          <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '2rem', border: '1px solid rgba(30,70,74,0.07)' }}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Pour les producteurs</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem' }}>Inscrivez vos produits gratuitement, fixez vos prix et gérez vos commandes depuis votre téléphone. Recevez vos paiements directement sur votre wallet mobile.</p>
            <Link to="/contact" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>
              Devenir partenaire <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="cta-band">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Soutenez les producteurs locaux</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Chaque commande sur Makiti contribue directement au revenu d'un agriculteur africain.</p>
        <a href="#" className="btn btn-white btn-lg">
          <Smartphone size={16} />
          Télécharger Makiti
        </a>
      </div>
    </section>
  </div>
);

export default MakitiPage;
