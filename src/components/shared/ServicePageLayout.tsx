import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import styles from './ServicePageLayout.module.css';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  intro?: string;
  cards: ServiceCard[];
  extras?: React.ReactNode;
  ctaTitle?: string;
  ctaText?: string;
}

const ServicePageLayout: React.FC<ServicePageProps> = ({
  title,
  subtitle,
  breadcrumb,
  intro,
  cards,
  extras,
  ctaTitle = 'Discutons de votre projet',
  ctaText = 'Nos experts analysent vos besoins et vous proposent une approche adaptée à votre contexte. Échange gratuit sous 48h.',
}) => {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link to="/">Accueil</Link>
            <ChevronRight size={13} />
            <Link to="/services">Services</Link>
            <ChevronRight size={13} />
            <span>{breadcrumb}</span>
          </div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      {/* Intro */}
      {intro && (
        <section className="section section-alt">
          <div className="container">
            <div className={styles.intro}>
              <p className="lead">{intro}</p>
            </div>
          </div>
        </section>
      )}

      {/* Cards grid */}
      <section className="section">
        <div className="container">
          <div className={styles.cardsGrid}>
            {cards.map((c, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardIcon}>{c.icon}</div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extras */}
      {extras}

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>{ctaTitle}</h2>
            <p>{ctaText}</p>
            <Link to="/contact" className="btn btn-white btn-lg">
              Prendre contact
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageLayout;
