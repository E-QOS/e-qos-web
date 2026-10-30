import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { Todo } from '../components/dev/Todo';
import {
  offerTitle, offerIntro, audiences, steps, domains, contactLink, BESOIN_SUBJECT,
} from '../data/miseEnRelation';
import styles from './MiseEnRelationPage.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

const MiseEnRelationPage: React.FC = () => {
  usePageMeta({
    title: 'Mise en relation et intérim dans tous les domaines | EQOS Africa',
    description: 'E-QOS met en relation les entreprises et institutions de Guinée avec des professionnels qualifiés, pour des missions d\'intérim ou des besoins ponctuels, dans tous les secteurs d\'activité.',
  });

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page">Mise en relation et intérim</span>
          </nav>
          <h1>{offerTitle}</h1>
          <p>{offerIntro}</p>
          <div className={styles.heroCtas}>
            <Link to={contactLink(BESOIN_SUBJECT)} className="btn btn-primary">Exprimer un besoin</Link>
            <Link to="/carrieres" className="arrow-link">
              Voir les offres <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Deux publics */}
      <section className="section">
        <div className="container">
          <ul className={styles.audiences}>
            {audiences.map((a, i) => (
              <li key={a.key} className={`${styles.audience} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <h2 className={styles.audienceTitle}>{a.title}</h2>
                <p className={styles.audienceDesc}>{a.desc}</p>
                <ul className={styles.points}>
                  {a.points.map(p => <li key={p}>{p}</li>)}
                </ul>
                <Link to={contactLink(a.subject)} className="arrow-link">
                  {a.cta} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Todo>préciser le cadre contractuel (qui emploie l'intérimaire, contrat de mise à disposition, agrément éventuel) et les conditions tarifaires.</Todo>
        </div>
      </section>

      {/* Déroulé */}
      <section className="section section-alt">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Comment ça marche</span>
            <h2>Une mission en quatre étapes</h2>
          </header>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.t} className={`${styles.step} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className={styles.stepNum}>{pad(i + 1)}</span>
                <h3 className={styles.stepTitle}>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <Todo>indiquer les délais habituels de présentation des profils, s'ils peuvent être annoncés.</Todo>
        </div>
      </section>

      {/* Domaines */}
      <section className="section">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Domaines</span>
            <h2>Tous les domaines d'activité</h2>
            <p>Notre réseau ne se limite pas au numérique. Quelques exemples de secteurs :</p>
          </header>
          <ul className={styles.domains}>
            {domains.map((d, i) => (
              <li key={d} className="reveal" style={{ '--i': i % 4 } as React.CSSProperties}>{d}</li>
            ))}
          </ul>
          <Todo>compléter avec les métiers réellement couverts (BTP, logistique, hôtellerie, administratif…).</Todo>
          <p className={styles.related}>
            Besoin d'un dirigeant ou d'un expert de transition ?{' '}
            <Link to="/services/interim" className="text-link">Découvrir l'Interim Management</Link>
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Un poste à pourvoir ?</h2>
          <p>Décrivez votre besoin. Notre équipe vous répond sous 48h.</p>
          <Link to={contactLink(BESOIN_SUBJECT)} className="btn btn-primary btn-lg">
            Exprimer un besoin <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MiseEnRelationPage;
