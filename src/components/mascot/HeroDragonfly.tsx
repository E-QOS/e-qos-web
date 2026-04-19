import React from 'react';
import styles from './HeroDragonfly.module.css';

/* ──────────────────────────────────────────────────────────────
   Libellule diamant blanc sombre + orange
   Palette compatible homepage dark navy (#050D1A) + orange (#FF5A1F)
   ViewBox : 0 0 420 590
────────────────────────────────────────────────────────────── */
const HeroDragonfly: React.FC = () => (
  <div className={styles.wrap}>
    <svg
      viewBox="0 0 420 590"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
      role="img"
      aria-label="Mascotte libellule eQOS"
    >
      <defs>
        {/* Glow blanc doux — corps */}
        <filter id="hd-body" x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="9" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Glow — ailes */}
        <filter id="hd-wing" x="-18%" y="-18%" width="136%" height="136%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Glow orange intense — yeux / pointes antennes */}
        <filter id="hd-hot" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Glow doux — branche & fleurs */}
        <filter id="hd-branch" x="-12%" y="-12%" width="124%" height="124%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Halo ambiant derrière la libellule ── */}
      <ellipse cx="210" cy="245" rx="62" ry="128" fill="rgba(255,90,31,0.04)"/>

      {/* ════ AILES SUPÉRIEURES ════ */}

      {/* Aile haut-gauche */}
      <path d="M 176,186
               Q 116,160 72,124
               Q 30,92  26,58
               Q 23,32  49,34
               Q 82,36  122,76
               Q 164,118 176,186 Z"
            fill="rgba(230,238,255,0.042)"
            stroke="rgba(230,238,255,0.25)"
            strokeWidth="0.85"
            filter="url(#hd-wing)"/>
      <path d="M 176,186 Q 102,152 56,94"  stroke="rgba(230,238,255,0.16)"  strokeWidth="0.65" fill="none"/>
      <path d="M 170,178 Q 106,150 78,118" stroke="rgba(230,238,255,0.10)" strokeWidth="0.5"  fill="none"/>
      <path d="M 162,168 Q 112,148 94,132" stroke="rgba(230,238,255,0.06)" strokeWidth="0.4"  fill="none"/>

      {/* Aile haut-droite */}
      <path d="M 244,186
               Q 304,160 348,124
               Q 390,92  394,58
               Q 397,32  371,34
               Q 338,36  298,76
               Q 256,118 244,186 Z"
            fill="rgba(230,238,255,0.042)"
            stroke="rgba(230,238,255,0.25)"
            strokeWidth="0.85"
            filter="url(#hd-wing)"/>
      <path d="M 244,186 Q 318,152 364,94"  stroke="rgba(230,238,255,0.16)"  strokeWidth="0.65" fill="none"/>
      <path d="M 250,178 Q 314,150 342,118" stroke="rgba(230,238,255,0.10)" strokeWidth="0.5"  fill="none"/>
      <path d="M 258,168 Q 308,148 326,132" stroke="rgba(230,238,255,0.06)" strokeWidth="0.4"  fill="none"/>

      {/* ════ AILES INFÉRIEURES ════ */}

      {/* Aile bas-gauche */}
      <path d="M 174,207
               Q 112,240  74,282
               Q 42,316  50,348
               Q 58,370  85,362
               Q 118,354 150,310
               Q 178,268 174,207 Z"
            fill="rgba(230,238,255,0.030)"
            stroke="rgba(230,238,255,0.20)"
            strokeWidth="0.85"
            filter="url(#hd-wing)"/>
      <path d="M 174,207 Q 106,252 66,318" stroke="rgba(230,238,255,0.11)" strokeWidth="0.65" fill="none"/>
      <path d="M 169,220 Q 106,262 80,312"  stroke="rgba(230,238,255,0.07)" strokeWidth="0.45" fill="none"/>

      {/* Aile bas-droite */}
      <path d="M 246,207
               Q 308,240 346,282
               Q 378,316 370,348
               Q 362,370 335,362
               Q 302,354 270,310
               Q 242,268 246,207 Z"
            fill="rgba(230,238,255,0.030)"
            stroke="rgba(230,238,255,0.20)"
            strokeWidth="0.85"
            filter="url(#hd-wing)"/>
      <path d="M 246,207 Q 314,252 354,318" stroke="rgba(230,238,255,0.11)" strokeWidth="0.65" fill="none"/>
      <path d="M 251,220 Q 314,262 340,312"  stroke="rgba(230,238,255,0.07)" strokeWidth="0.45" fill="none"/>

      {/* ════ CORPS — TÊTE ════ */}
      {/* Diamant principal — blanc sombre */}
      <polygon points="210,93 245,128 210,163 175,128"
               fill="rgba(230,238,255,0.70)"
               filter="url(#hd-body)"/>
      {/* Facette ombre bas-droite */}
      <polygon points="210,128 245,128 210,163 227,128"
               fill="rgba(180,210,255,0.18)"/>
      {/* Facette lumière haut-gauche */}
      <polygon points="210,93 175,128 210,118 196,122"
               fill="rgba(255,255,255,0.35)"/>
      {/* Reflet intérieur */}
      <polygon points="210,102 238,128 210,153 182,128"
               fill="rgba(200,225,255,0.22)"/>
      {/* Lignes de facette */}
      <line x1="210" y1="93"  x2="210" y2="163" stroke="rgba(230,238,255,0.15)" strokeWidth="0.5"/>
      <line x1="175" y1="128" x2="245" y2="128" stroke="rgba(230,238,255,0.10)" strokeWidth="0.5"/>
      {/* Éclat au sommet — orange */}
      <circle cx="210" cy="93" r="2.5" fill="#FF5A1F" filter="url(#hd-hot)"/>

      {/* ── Yeux composés — ORANGE ── */}
      <circle cx="193" cy="124" r="10.5" fill="rgba(255,90,31,0.10)" stroke="#FF5A1F" strokeWidth="1.1" filter="url(#hd-hot)"/>
      <circle cx="193" cy="124" r="6.5"  fill="rgba(255,90,31,0.65)"/>
      <circle cx="193" cy="124" r="3.5"  fill="#FF5A1F"/>
      <circle cx="190" cy="121" r="1.5"  fill="rgba(255,200,160,0.90)"/>

      <circle cx="227" cy="124" r="10.5" fill="rgba(255,90,31,0.10)" stroke="#FF5A1F" strokeWidth="1.1" filter="url(#hd-hot)"/>
      <circle cx="227" cy="124" r="6.5"  fill="rgba(255,90,31,0.65)"/>
      <circle cx="227" cy="124" r="3.5"  fill="#FF5A1F"/>
      <circle cx="224" cy="121" r="1.5"  fill="rgba(255,200,160,0.90)"/>

      {/* ── Antennes — pointes orange ── */}
      <path d="M 195,96 Q 178,72 166,52" stroke="rgba(230,238,255,0.42)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <circle cx="165" cy="50" r="3.2" fill="#FF5A1F" filter="url(#hd-hot)"/>
      <circle cx="165" cy="50" r="1.4" fill="rgba(255,180,120,0.9)"/>

      <path d="M 225,96 Q 242,72 254,52" stroke="rgba(230,238,255,0.42)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <circle cx="255" cy="50" r="3.2" fill="#FF5A1F" filter="url(#hd-hot)"/>
      <circle cx="255" cy="50" r="1.4" fill="rgba(255,180,120,0.9)"/>

      {/* ════ CORPS — THORAX ════ */}
      <polygon points="210,163 252,195 210,227 168,195"
               fill="rgba(230,238,255,0.70)"
               filter="url(#hd-body)"/>
      <polygon points="210,163 252,195 210,176 193,183" fill="rgba(255,255,255,0.32)"/>
      <polygon points="210,195 252,195 210,227 232,195" fill="rgba(180,210,255,0.16)"/>
      <polygon points="210,172 244,195 210,218 176,195" fill="rgba(200,225,255,0.20)"/>
      <line x1="210" y1="163" x2="210" y2="227" stroke="rgba(230,238,255,0.14)" strokeWidth="0.5"/>
      <line x1="168" y1="195" x2="252" y2="195" stroke="rgba(230,238,255,0.10)" strokeWidth="0.5"/>
      <circle cx="210" cy="163" r="1.8" fill="rgba(230,238,255,0.45)"/>

      {/* ════ ABDOMEN 1 ════ */}
      <polygon points="210,229 234,253 210,277 186,253"
               fill="rgba(230,238,255,0.65)"
               filter="url(#hd-body)"/>
      <polygon points="210,229 234,253 210,241 196,246" fill="rgba(255,255,255,0.28)"/>
      <polygon points="210,237 228,253 210,269 192,253"  fill="rgba(200,225,255,0.18)"/>

      {/* ════ ABDOMEN 2 ════ */}
      <polygon points="210,279 232,300 210,321 188,300"
               fill="rgba(230,238,255,0.60)"
               filter="url(#hd-body)"/>
      <polygon points="210,279 232,300 210,290 196,294" fill="rgba(255,255,255,0.25)"/>
      <polygon points="210,287 226,300 210,313 194,300"  fill="rgba(200,225,255,0.16)"/>

      {/* ════ ABDOMEN 3 ════ */}
      <polygon points="210,323 229,339 210,355 191,339"
               fill="rgba(230,238,255,0.56)"
               filter="url(#hd-body)"/>
      <polygon points="210,323 229,339 210,333 197,335" fill="rgba(255,255,255,0.22)"/>

      {/* ════ ABDOMEN 4 ════ */}
      <polygon points="210,357 226,371 210,385 194,371"
               fill="rgba(230,238,255,0.52)"/>
      <polygon points="210,357 226,371 210,366 198,368" fill="rgba(255,255,255,0.20)"/>

      {/* ════ POINTE DE QUEUE — orange ════ */}
      <polygon points="210,387 219,400 210,415 201,400"
               fill="rgba(230,238,255,0.62)"
               filter="url(#hd-body)"/>
      <polygon points="210,389 217,400 210,410 203,400" fill="rgba(255,255,255,0.30)"/>
      <circle cx="210" cy="415" r="2.8" fill="#FF5A1F" filter="url(#hd-hot)"/>

      {/* ════════════════════════════════════════════
          BRANCHE FLORALE DIGITALE
      ════════════════════════════════════════════ */}

      {/* Fil de connexion queue → branche */}
      <line x1="210" y1="418" x2="210" y2="458"
            stroke="rgba(255,90,31,0.22)"
            strokeWidth="0.9"
            strokeDasharray="2.5,3.5"/>

      {/* ── Branche principale — blanc sombre ── */}
      <path d="M 44,472 Q 130,460 210,457 Q 290,454 376,468"
            stroke="rgba(230,238,255,0.52)"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            filter="url(#hd-branch)"/>

      {/* ── Nœuds sur la branche ── */}
      {/* Nœud centre — orange (point de perchage) */}
      <polygon points="210,452 215,457 210,462 205,457"
               fill="#FF5A1F"
               filter="url(#hd-branch)"/>
      {/* Nœud gauche — blanc sombre */}
      <polygon points="128,465 133,469 128,473 123,469"
               fill="rgba(230,238,255,0.55)"/>
      {/* Nœud droite — orange */}
      <polygon points="295,460 300,464 295,468 290,464"
               fill="rgba(255,90,31,0.70)"/>

      {/* ── Sous-branches montantes ── */}
      <path d="M 126,467 Q 95,446 68,420"
            stroke="rgba(230,238,255,0.45)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M 170,461 Q 154,442 146,420"
            stroke="rgba(230,238,255,0.32)" strokeWidth="1"  fill="none" strokeLinecap="round"/>
      <path d="M 254,458 Q 268,440 274,420"
            stroke="rgba(230,238,255,0.32)" strokeWidth="1"  fill="none" strokeLinecap="round"/>
      <path d="M 297,462 Q 324,441 347,416"
            stroke="rgba(230,238,255,0.45)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>

      {/* ── Sous-branches descendantes ── */}
      <path d="M 86,470 Q 76,487 72,506"
            stroke="rgba(230,238,255,0.24)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M 338,466 Q 350,482 354,500"
            stroke="rgba(230,238,255,0.24)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>

      {/* Petites marques circuit */}
      <line x1="158" y1="450" x2="158" y2="458" stroke="rgba(230,238,255,0.24)" strokeWidth="1"/>
      <line x1="262" y1="452" x2="262" y2="460" stroke="rgba(230,238,255,0.24)" strokeWidth="1"/>
      <line x1="192" y1="455" x2="192" y2="460" stroke="rgba(230,238,255,0.16)"  strokeWidth="0.8"/>
      <line x1="228" y1="455" x2="228" y2="460" stroke="rgba(230,238,255,0.16)"  strokeWidth="0.8"/>

      {/* ════ FLEURS DIGITALES ════ */}

      {/* Fleur gauche grande — ORANGE (68, 412) */}
      <g transform="translate(68,412)" filter="url(#hd-branch)">
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(255,90,31,0.82)"                     />
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(255,90,31,0.82)" transform="rotate(60)" />
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(255,90,31,0.82)" transform="rotate(120)"/>
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(255,90,31,0.60)" transform="rotate(180)"/>
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(255,90,31,0.60)" transform="rotate(240)"/>
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(255,90,31,0.60)" transform="rotate(300)"/>
        <circle r="5" fill="#FF5A1F"/>
        <circle r="2" fill="rgba(255,200,120,0.85)"/>
      </g>

      {/* Fleur centre-gauche petite — blanc sombre (146, 412) */}
      <g transform="translate(146,412)" filter="url(#hd-branch)">
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(230,238,255,0.65)"                     />
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(230,238,255,0.65)" transform="rotate(60)" />
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(230,238,255,0.65)" transform="rotate(120)"/>
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(230,238,255,0.48)" transform="rotate(180)"/>
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(230,238,255,0.48)" transform="rotate(240)"/>
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(230,238,255,0.48)" transform="rotate(300)"/>
        <circle r="3.8" fill="rgba(230,238,255,0.80)"/>
      </g>

      {/* Fleur centre-droite petite — ORANGE (274, 412) */}
      <g transform="translate(274,412)" filter="url(#hd-branch)">
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(255,90,31,0.75)"                     />
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(255,90,31,0.75)" transform="rotate(60)" />
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(255,90,31,0.75)" transform="rotate(120)"/>
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(255,90,31,0.55)" transform="rotate(180)"/>
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(255,90,31,0.55)" transform="rotate(240)"/>
        <polygon points="0,-10 2.5,0 0,10 -2.5,0" fill="rgba(255,90,31,0.55)" transform="rotate(300)"/>
        <circle r="3.8" fill="#FF5A1F"/>
      </g>

      {/* Fleur droite grande — blanc sombre (347, 408) */}
      <g transform="translate(347,408)" filter="url(#hd-branch)">
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(230,238,255,0.72)"                     />
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(230,238,255,0.72)" transform="rotate(60)" />
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(230,238,255,0.72)" transform="rotate(120)"/>
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(230,238,255,0.55)" transform="rotate(180)"/>
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(230,238,255,0.55)" transform="rotate(240)"/>
        <polygon points="0,-14 3.5,0 0,14 -3.5,0" fill="rgba(230,238,255,0.55)" transform="rotate(300)"/>
        <circle r="5" fill="rgba(230,238,255,0.82)"/>
        <circle r="2" fill="rgba(255,255,255,0.60)"/>
      </g>

      {/* Petits bourgeons au bout des branches descendantes */}
      <g transform="translate(72,508)">
        <polygon points="0,-7 2,0 0,7 -2,0" fill="rgba(255,90,31,0.45)"/>
        <polygon points="0,-7 2,0 0,7 -2,0" fill="rgba(255,90,31,0.45)" transform="rotate(90)"/>
        <circle r="2.8" fill="rgba(255,90,31,0.55)"/>
      </g>
      <g transform="translate(354,502)">
        <polygon points="0,-7 2,0 0,7 -2,0" fill="rgba(230,238,255,0.42)"/>
        <polygon points="0,-7 2,0 0,7 -2,0" fill="rgba(230,238,255,0.42)" transform="rotate(90)"/>
        <circle r="2.8" fill="rgba(230,238,255,0.52)"/>
      </g>

      {/* ════ ÉTINCELLES — mix orange + blanc sombre ════ */}

      {/* + shapes orange */}
      <g filter="url(#hd-hot)" opacity="0.72">
        <line x1="60"  y1="54"  x2="60"  y2="66"  stroke="#FF5A1F" strokeWidth="1.6"/>
        <line x1="54"  y1="60"  x2="66"  y2="60"  stroke="#FF5A1F" strokeWidth="1.6"/>
      </g>
      {/* + shape blanc sombre */}
      <g filter="url(#hd-hot)" opacity="0.55">
        <line x1="360" y1="60"  x2="360" y2="70"  stroke="rgba(230,238,255,0.9)" strokeWidth="1.6"/>
        <line x1="355" y1="65"  x2="365" y2="65"  stroke="rgba(230,238,255,0.9)" strokeWidth="1.6"/>
      </g>
      <g filter="url(#hd-hot)" opacity="0.42">
        <line x1="30"  y1="208" x2="30"  y2="217" stroke="#FF5A1F" strokeWidth="1.2"/>
        <line x1="25"  y1="212" x2="35"  y2="212" stroke="#FF5A1F" strokeWidth="1.2"/>
      </g>
      <g filter="url(#hd-hot)" opacity="0.40">
        <line x1="390" y1="204" x2="390" y2="213" stroke="rgba(230,238,255,0.9)" strokeWidth="1.2"/>
        <line x1="385" y1="208" x2="395" y2="208" stroke="rgba(230,238,255,0.9)" strokeWidth="1.2"/>
      </g>

      {/* Losanges étincelle */}
      <polygon points="38,148 43,154 38,160 33,154"
               fill="rgba(255,90,31,0.72)" filter="url(#hd-hot)"/>
      <polygon points="382,142 387,148 382,154 377,148"
               fill="rgba(230,238,255,0.60)" filter="url(#hd-hot)"/>
      <polygon points="20,298 25,304 20,310 15,304"
               fill="rgba(255,90,31,0.48)" filter="url(#hd-hot)"/>
      <polygon points="400,292 405,298 400,304 395,298"
               fill="rgba(230,238,255,0.42)" filter="url(#hd-hot)"/>

      {/* Points flottants — alternance orange / blanc sombre */}
      <circle cx="48"  cy="168" r="2"   fill="rgba(255,90,31,0.50)"/>
      <circle cx="372" cy="174" r="2"   fill="rgba(230,238,255,0.40)"/>
      <circle cx="38"  cy="352" r="1.6" fill="rgba(255,90,31,0.38)"/>
      <circle cx="382" cy="342" r="1.6" fill="rgba(230,238,255,0.34)"/>
      <circle cx="90"  cy="545" r="1.4" fill="rgba(255,90,31,0.26)"/>
      <circle cx="330" cy="540" r="1.4" fill="rgba(230,238,255,0.22)"/>
    </svg>
  </div>
);

export default HeroDragonfly;
