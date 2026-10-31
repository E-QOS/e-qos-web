import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Sector } from '../../data/secteursGuinee';
import { SectorVideo } from './SectorVideo';
import styles from './SectorShowcase.module.css';

interface SectorShowcaseProps {
  sectors: Sector[];
  /** Niveau du titre de chaque secteur (h3 sous un h2 de section). */
  headingLevel?: 'h2' | 'h3';
  /** Lien « Constituer une équipe » présélectionnant le secteur. */
  ctaHref?: (sectorKey: string) => string;
}

/** Secteurs en lignes alternées : vidéo plein bord d'un côté, fait clé et profils de l'autre. */
export const SectorShowcase: React.FC<SectorShowcaseProps> = ({ sectors, headingLevel = 'h3', ctaHref }) => {
  const Heading = headingLevel;
  return (
    <ol className={styles.list}>
      {sectors.map((s, i) => (
        <li key={s.key} className={`${styles.row} ${i % 2 ? styles.rowReverse : ''}`} id={`secteur-${s.key}`}>
          <SectorVideo media={s.media} label={s.name} className={`${styles.visual} reveal`} />
          <div className={`${styles.text} reveal`}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <Heading className={styles.name}>{s.name}</Heading>
            <p className={styles.places}>{s.places}</p>
            <p className={styles.fact}>{s.fact}</p>
            <ul className={styles.profiles} aria-label={`Profils mobilisés, ${s.name}`}>
              {s.profiles.map(p => <li key={p}>{p}</li>)}
            </ul>
            {ctaHref && (
              <Link to={ctaHref(s.key)} className={`arrow-link ${styles.cta}`}>
                Constituer une équipe <span className="sr-only">, {s.name}</span> <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default SectorShowcase;
