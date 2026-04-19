import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import styles from './SecteurPageLayout.module.css';

interface ServiceLink {
  label: string;
  to: string;
}

interface SecteurPageProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  context: string;
  challenges: string[];
  services: ServiceLink[];
  ctaText?: string;
}

const SecteurPageLayout: React.FC<SecteurPageProps> = ({
  title,
  subtitle,
  icon,
  context,
  challenges,
  services,
  ctaText = 'Discutons de vos enjeux sectoriels. Nos experts vous proposent une première analyse gratuite sous 48h.',
}) => (
  <div>
    <section className={`page-hero`}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">Accueil</Link>
          <ChevronRight size={13} />
          <Link to="/secteurs">Secteurs</Link>
          <ChevronRight size={13} />
          <span>{title}</span>
        </div>
        <div className={styles.heroIcon}>{icon}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.contextCard}>
              <h2>Contexte du secteur</h2>
              <p>{context}</p>
            </div>
            <div className={styles.challengesCard}>
              <h2>Défis digitaux spécifiques</h2>
              <ul className={styles.challengesList}>
                {challenges.map((c, i) => (
                  <li key={i} className={styles.challengeItem}>
                    <span className={styles.challengeDot} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className={styles.aside}>
            <div className={styles.servicesCard}>
              <h3>Services EQOS adaptés</h3>
              <ul className={styles.servicesList}>
                {services.map((s, i) => (
                  <li key={i}>
                    <Link to={s.to} className={styles.serviceLink}>
                      <ArrowRight size={14} />
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.ctaSide}>
              <h4>Parlons de votre secteur</h4>
              <p>{ctaText}</p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Prendre contact
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
);

export default SecteurPageLayout;
