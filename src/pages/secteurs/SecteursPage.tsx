import React from 'react';
import { Link } from 'react-router-dom';
import {
  Pickaxe, Smartphone, Building2, Heart,
  Landmark, Wheat, ShoppingBag, GraduationCap, ArrowRight
} from 'lucide-react';
import styles from './SecteursPage.module.css';

const secteurs = [
  { icon: <Pickaxe size={32} />, title: 'Mines & Ressources naturelles', desc: 'ERP industriel, traçabilité, logistique, reporting ESG pour les acteurs du secteur extractif.', to: '/secteurs/mines-ressources' },
  { icon: <Smartphone size={32} />, title: 'Télécommunications', desc: 'CRM, facturation, portails distributeurs et analytics pour les opérateurs télécoms.', to: '/secteurs/telecom' },
  { icon: <Building2 size={32} />, title: 'Banque, Finance & Microfinance', desc: 'Core banking, intégration mobile money, conformité BCEAO, digitalisation des parcours clients.', to: '/secteurs/banque-finance' },
  { icon: <Heart size={32} />, title: 'Santé', desc: 'Logiciels hospitaliers, dossiers médicaux électroniques, paiements des actes via mobile money.', to: '/secteurs/sante' },
  { icon: <Landmark size={32} />, title: 'Secteur public & ONG', desc: 'E-gouvernement, ERP public, guichets numériques, paiements d\'État, reporting bailleurs.', to: '/secteurs/secteur-public' },
  { icon: <Wheat size={32} />, title: 'Agriculture & Agroalimentaire', desc: 'Traçabilité, marketplace agricole, gestion de coopératives, paiement mobile pour les agriculteurs.', to: '/secteurs/agriculture' },
  { icon: <ShoppingBag size={32} />, title: 'Commerce & Distribution', desc: 'E-commerce avec paiements mobiles intégrés, ERP distribution, CRM et logistique last-mile.', to: '/secteurs/commerce-distribution' },
  { icon: <GraduationCap size={32} />, title: 'Éducation & Formation', desc: 'LMS, logiciels de gestion scolaire, portails parents et paiement des frais scolaires en ligne.', to: '/secteurs/education' },
];

const SecteursPage: React.FC = () => (
  <div>
    <section className="page-hero">
      <div className="container">
        <h1>Secteurs d'activité</h1>
        <p>Une expertise sectorielle construite sur des projets réels en Guinée, au Sénégal et au Mali.</p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className={styles.grid}>
          {secteurs.map((s) => (
            <Link key={s.to} to={s.to} className={styles.card}>
              <div className={styles.icon}>{s.icon}</div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <span className={styles.link}>En savoir plus <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default SecteursPage;
