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
      {/* En-tête */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link to="/services">Services</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page">{breadcrumb}</span>
          </nav>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      {/* Introduction */}
      {intro && (
        <section className="section">
          <div className="container">
            <p className={styles.intro}>{intro}</p>
          </div>
        </section>
      )}

      {/* Prestations */}
      <section className={`section ${intro ? styles.flushTop : ''}`}>
        <div className="container">
          <div className={styles.cardsGrid}>
            {cards.map((c, i) => (
              <div key={i} className={`${styles.card} reveal`} style={{ '--i': i % 3 } as React.CSSProperties}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
                <h2 className={styles.cardTitle}>{c.title}</h2>
                <p className={styles.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extras}

      {/* Appel à l'action */}
      <section className="cta-band">
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>{ctaTitle}</h2>
            <p>{ctaText}</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Prendre contact
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageLayout;
