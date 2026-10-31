import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { serviceGroups } from '../../data/services';
import styles from './ServicesPage.module.css';

const ServicesPage: React.FC = () => {
  usePageMeta({
    title: 'Nos services | EQOS Africa',
    description: 'Recrutement et intérim pour les grands secteurs de Guinée, conseil et services numériques : transformation digitale, cybersécurité, support informatique.',
  });

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">Services</span>
          <h1>Nos services</h1>
          <p>Recrutement et intérim pour tous les métiers, conseil et services numériques pour les organisations, en Guinée.</p>
        </div>
      </section>

      {serviceGroups.map((g, gi) => (
        <section key={g.key} className={`section ${gi % 2 ? 'section-alt' : ''}`} aria-labelledby={`groupe-${g.key}`}>
          <div className="container">
            <header className="section-header reveal">
              <span className="kicker">{String(gi + 1).padStart(2, '0')}</span>
              <h2 id={`groupe-${g.key}`}>{g.title}</h2>
              <p>{g.intro}</p>
            </header>
            <div className={styles.grid}>
              {g.items.map((s) => (
                <Link key={s.to} to={s.to} className={styles.card}>
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.desc}>{s.desc}</p>
                  <span className={styles.link}>Découvrir <ArrowRight size={14} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="cta-band">
        <div className="container">
          <h2>Vous ne savez pas par où commencer ?</h2>
          <p>Nos consultants analysent votre situation et identifient les priorités. Échange gratuit, sans engagement.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Prendre contact <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
