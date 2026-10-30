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
  /** Conservé pour compatibilité, n'est plus affiché. */
  icon?: React.ReactNode;
  context: string;
  challenges: string[];
  services: ServiceLink[];
  ctaText?: string;
}

// Liens communs à tous les secteurs : l'offre de recrutement
const recruitmentLinks: ServiceLink[] = [
  { label: 'Recrutement et intérim', to: '/recrutement-interim' },
  { label: 'Constituer une équipe', to: '/constituer-une-equipe' },
];

const SecteurPageLayout: React.FC<SecteurPageProps> = ({
  title,
  subtitle,
  context,
  challenges,
  services,
  ctaText = 'Discutons de vos enjeux sectoriels. Nos experts vous proposent une première analyse gratuite sous 48h.',
}) => (
  <div>
    <section className="page-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link to="/secteurs">Secteurs</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span aria-current="page">{title}</span>
        </nav>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Contexte du secteur</h2>
              <p className={styles.context}>{context}</p>
            </div>
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Défis digitaux spécifiques</h2>
              <ol className={styles.challengesList}>
                {challenges.map((c, i) => (
                  <li key={i} className={styles.challengeItem}>
                    <span className={styles.challengeNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <aside className={styles.aside}>
            <div className={styles.asideBlock}>
              <h2 className={styles.asideTitle}>Services EQOS adaptés</h2>
              <ul className={styles.servicesList}>
                {[...services, ...recruitmentLinks].map((s, i) => (
                  <li key={i}>
                    <Link to={s.to} className={styles.serviceLink}>
                      <span>{s.label}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.asideBlock}>
              <h2 className={styles.asideTitle}>Parlons de votre secteur</h2>
              <p className={styles.asideText}>{ctaText}</p>
              <Link to="/contact" className="btn btn-primary">
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
