import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { Todo } from '../components/dev/Todo';
import { SectorShowcase } from '../components/media/SectorShowcase';
import { sectors } from '../data/secteursGuinee';
import {
  RECRUTEMENT_LABEL, heroLead, audiences, method, ctaClient, ctaTalent,
  contactLink, BESOIN_SUBJECT, CANDIDATURE_PATH,
} from '../data/recrutement';
import styles from './RecrutementPage.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

const RecrutementPage: React.FC = () => {
  usePageMeta({
    title: 'Recrutement et intérim en Guinée : mines, énergie, BTP, logistique | EQOS Africa',
    description: 'E-QOS constitue les équipes des grands secteurs guinéens : conducteurs d\'engins, électromécaniciens, électriciens, chefs de chantier, logisticiens, ingénieurs et encadrement.',
  });

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span aria-current="page">{RECRUTEMENT_LABEL}</span>
          </nav>
          <h1>Des équipes prêtes pour vos opérations en Guinée</h1>
          <p>{heroLead}</p>
          <div className={styles.heroCtas}>
            <Link to={contactLink(BESOIN_SUBJECT)} className="btn btn-primary">{ctaClient}</Link>
            <Link to={CANDIDATURE_PATH} className="arrow-link">
              {ctaTalent} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secteurs et métiers */}
      <section className="section">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Secteurs et métiers</span>
            <h2>Les profils que nous mobilisons</h2>
          </header>
          <SectorShowcase sectors={sectors} />
          <Todo>valider la liste des métiers par secteur avec les profils réellement disponibles dans les viviers.</Todo>
        </div>
      </section>

      {/* Deux publics */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="sr-only">Entreprises et professionnels</h2>
          <ul className={styles.audiences}>
            {audiences.map((a, i) => (
              <li key={a.key} className={`${styles.audience} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className="kicker">{a.kicker}</span>
                <h3 className={styles.audienceTitle}>{a.title}</h3>
                <p className={styles.audienceDesc}>{a.desc}</p>
                <ul className={styles.points}>
                  {a.points.map(p => <li key={p}>{p}</li>)}
                </ul>
                <Link to={a.to} className="arrow-link">
                  {a.cta} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Todo>préciser le cadre contractuel (employeur des intérimaires, contrat de mise à disposition, agrément éventuel) et les conditions tarifaires.</Todo>
        </div>
      </section>

      {/* Méthode */}
      <section className="section">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Méthode</span>
            <h2>Du cadrage à la mobilisation sur site</h2>
          </header>
          <ol className={styles.steps}>
            {method.map((s, i) => (
              <li key={s.t} className={`${styles.step} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className={styles.stepNum}>{pad(i + 1)}</span>
                <h3 className={styles.stepTitle}>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <Todo>indiquer les délais habituels de mobilisation, s'ils peuvent être annoncés.</Todo>
          <p className={styles.related}>
            Direction de transition, chef de projet ou expert sectoriel ?{' '}
            <Link to="/services/interim" className="text-link">Découvrir l'Interim Management</Link>
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Parlons de votre prochain chantier</h2>
          <p>Décrivez les postes à pourvoir. Notre équipe vous répond sous 48h.</p>
          <Link to={contactLink(BESOIN_SUBJECT)} className="btn btn-primary btn-lg">
            {ctaClient} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RecrutementPage;
