import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Smartphone, Wheat, ArrowRight } from 'lucide-react';
import styles from './SolutionsPage.module.css';

const solutions = [
  {
    name: 'Wali',
    tag: 'Services à la demande',
    icon: <Zap size={32} />,
    desc: 'Plateforme de mise en relation entre particuliers, PME et prestataires de services vérifiés. Livraison, nettoyage, cours particuliers, plomberie — tout en un tap, avec paiement mobile intégré.',
    to: '/solutions/wali',
    color: '#1e464a',
  },
  {
    name: 'Wandi',
    tag: 'Mobilité intelligente',
    icon: <Smartphone size={32} />,
    desc: 'Application de réservation de transport et de gestion de flotte pour particuliers et entreprises. Géolocalisation, paiement mobile, historique de trajets et gestion de flotte entreprise.',
    to: '/solutions/wandi',
    color: '#1e5fa0',
  },
  {
    name: 'Makiti',
    tag: 'Marketplace agricole',
    icon: <Wheat size={32} />,
    desc: 'Marketplace qui connecte producteurs ruraux et consommateurs urbains. Commande en ligne, paiement mobile, livraison tracée et prix équitables — sans intermédiaires superflus.',
    to: '/solutions/makiti',
    color: '#2d7a3a',
  },
];

const SolutionsPage: React.FC = () => (
  <div>
    <section className="page-hero">
      <div className="container">
        <h1>Nos solutions propriétaires</h1>
        <p>En plus de nos services d'intégration, EQOS développe ses propres produits digitaux conçus pour les marchés africains.</p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className={styles.grid}>
          {solutions.map((s) => (
            <div key={s.name} className={styles.card} style={{ '--col': s.color } as React.CSSProperties}>
              <div className={styles.cardIcon}>{s.icon}</div>
              <div className={styles.cardTag}>{s.tag}</div>
              <h2 className={styles.cardName}>{s.name}</h2>
              <p className={styles.cardDesc}>{s.desc}</p>
              <Link to={s.to} className={styles.cardLink}>
                Découvrir {s.name} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default SolutionsPage;
