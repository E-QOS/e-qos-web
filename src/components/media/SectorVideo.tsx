import React, { useEffect, useRef, useState } from 'react';
import type { SectorMedia } from '../../data/secteursGuinee';
import styles from './SectorVideo.module.css';

/** Connexion lente ou économie de données : on s'en tient à l'image fixe. */
export function prefersLightMedia(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ''));
}

interface SectorVideoProps {
  media: SectorMedia;
  label: string;
  /** Lecture pilotée par le parent (bobine du hero). Sinon : lecture quand la vidéo est visible. */
  active?: boolean;
  className?: string;
}

/**
 * Vidéo muette en boucle, chargée seulement à l'approche du viewport et mise en pause hors écran.
 * Sans fichier livré, affiche un cadre neutre (aucune requête réseau).
 */
export const SectorVideo: React.FC<SectorVideoProps> = ({ media, label, active, className }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [load, setLoad] = useState(false);
  const light = useRef(prefersLightMedia()).current;
  const hasVideo = !!(media.video || media.webm) && !light;
  const controlled = active !== undefined;

  // Chargement différé et lecture selon la visibilité
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasVideo) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting) setLoad(true);
    }, { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [hasVideo]);

  const shouldPlay = hasVideo && load && inView && (!controlled || active);

  useEffect(() => {
    const el = ref.current;
    if (!el || !load) return;
    if (shouldPlay) el.play().catch(() => { /* lecture refusée : l'image reste affichée */ });
    else el.pause();
  }, [shouldPlay, load]);

  if (!hasVideo && !media.poster) {
    return (
      <div className={`${styles.frame} ${styles.placeholder} ${className ?? ''}`} role="img" aria-label={label}>
        <span className={styles.placeholderLabel} aria-hidden="true">{label}</span>
      </div>
    );
  }

  if (!hasVideo) {
    return (
      <div className={`${styles.frame} ${className ?? ''}`}>
        <img className={styles.media} src={media.poster} alt={label} loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div className={`${styles.frame} ${className ?? ''}`}>
      <video
        ref={ref}
        className={styles.media}
        muted
        loop
        playsInline
        preload="none"
        poster={media.poster}
        aria-label={label}
      >
        {load && media.webm && <source src={media.webm} type="video/webm" />}
        {load && media.video && <source src={media.video} type="video/mp4" />}
      </video>
    </div>
  );
};

export default SectorVideo;
