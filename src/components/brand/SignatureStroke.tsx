import React, { useId } from 'react';
import styles from './SignatureStroke.module.css';

interface SignatureStrokeProps {
  /** `draw` : se trace au chargement (hero). `static` : séparateur discret. */
  variant?: 'draw' | 'static';
  className?: string;
}

/**
 * Trait signature inspiré du logo E-QOS : un trait effilé qui s'élargit vers un bulbe,
 * suivi d'un point orange. Dessin d'interprétation, ce n'est pas le logo.
 */
export function SignatureStroke({ variant = 'static', className }: SignatureStrokeProps) {
  const maskId = `sig-${useId().replace(/:/g, '')}`;
  const draw = variant === 'draw';

  return (
    <svg
      className={`${styles.stroke} ${draw ? styles.draw : styles.static} ${className ?? ''}`}
      viewBox="0 0 640 40"
      aria-hidden="true"
      focusable="false"
    >
      {draw && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="40">
            <path className={styles.maskPath} d="M0 29 L592 21" pathLength={1} />
          </mask>
        </defs>
      )}
      <g className={styles.body} mask={draw ? `url(#${maskId})` : undefined}>
        {/* Corps effilé : quasi nul à gauche, s'élargit vers la droite */}
        <path d="M0 29.4 L548 19.2 L548 25.6 L0 29.8 Z" />
        {/* Bulbe */}
        <ellipse cx="566" cy="22.6" rx="26" ry="5.4" transform="rotate(-2 566 22.6)" />
      </g>
      <circle className={styles.dot} cx="620" cy="16" r="11" />
    </svg>
  );
}
