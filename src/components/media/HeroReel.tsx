import React, { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Sector } from '../../data/secteursGuinee';
import { SectorVideo } from './SectorVideo';
import styles from './HeroReel.module.css';

const SLIDE_MS = 7000;

interface HeroReelProps {
  sectors: Sector[];
  children: React.ReactNode;
}

/**
 * Hero plein cadre : vidéos de secteurs en fondu enchaîné, défilement automatique avec bouton pause
 * (WCAG 2.2.2). Avec prefers-reduced-motion, pas de défilement automatique.
 */
export const HeroReel: React.FC<HeroReelProps> = ({ sectors, children }) => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setIdx(i => (i + 1) % sectors.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [idx, paused, sectors.length]);

  // Onglet masqué : on suspend le défilement
  useEffect(() => {
    const onVis = () => { if (document.hidden) setPaused(true); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <section className={styles.reel} aria-labelledby="hero-title">
      <div className={styles.slides} aria-hidden="true">
        {sectors.map((s, i) => (
          <div key={s.key} className={`${styles.slide} ${i === idx ? styles.slideActive : ''}`}>
            <SectorVideo media={s.media} label={s.name} active={i === idx} className={styles.video} />
          </div>
        ))}
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        {children}
      </div>

      <div className={`container ${styles.bar}`}>
        <ol className={styles.tabs} aria-label="Secteurs présentés">
          {sectors.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                className={`${styles.tab} ${i === idx ? styles.tabActive : ''}`}
                aria-current={i === idx ? 'true' : undefined}
                onClick={() => setIdx(i)}
              >
                <span className={styles.tabTrack} aria-hidden="true">
                  <span
                    key={`${i}-${idx}-${paused}`}
                    className={`${styles.tabFill} ${i === idx && !paused ? styles.tabFillRun : ''} ${i < idx ? styles.tabFillDone : ''}`}
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                </span>
                <span className={styles.tabLabel}>{s.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={styles.pause}
          onClick={() => setPaused(p => !p)}
          aria-label={paused ? 'Reprendre le défilement des vidéos' : 'Mettre en pause le défilement des vidéos'}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
};

export default HeroReel;
