import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const columns = [
  {
    title: 'Services',
    links: [
      { to: '/services/transformation-digitale', label: 'Transformation digitale' },
      { to: '/services/conseil-organisationnel', label: 'Conseil organisationnel' },
      { to: '/services/odoo', label: 'Implémentation Odoo' },
      { to: '/services/paiements-locaux', label: 'Paiements locaux' },
      { to: '/services/cybersecurite', label: 'Cybersécurité' },
      { to: '/services/support', label: 'Support informatique' },
      { to: '/services/management-consulting', label: 'Management & Consulting' },
      { to: '/services/interim', label: 'Interim Management' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { to: '/solutions/wali', label: 'Wali' },
      { to: '/solutions/wandi', label: 'Wandi' },
      { to: '/solutions/makiti', label: 'Makiti' },
    ],
    title2: 'Secteurs clés',
    links2: [
      { to: '/secteurs/mines-ressources', label: 'Mines & Ressources' },
      { to: '/secteurs/secteur-public', label: 'Secteur public' },
      { to: '/secteurs/banque-finance', label: 'Banque & Finance' },
      { to: '/secteurs', label: 'Tous les secteurs' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { to: '/a-propos', label: 'À propos' },
      { to: '/ressources', label: 'Ressources' },
      { to: '/carrieres', label: 'Carrières' },
      { to: '/contact', label: 'Contact' },
      { to: '/mentions-legales', label: 'Mentions légales' },
      { to: '/confidentialite', label: 'Confidentialité' },
    ],
  },
];

const socials = [
  { href: 'https://www.linkedin.com/company/e-qos/', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/eqosconsulting/', label: 'Facebook' },
  { href: 'https://x.com/EConsultin71892', label: 'X' },
  { href: 'https://www.instagram.com/contact.eqos', label: 'Instagram' },
];

const LinkList: React.FC<{ title: string; links: { to: string; label: string }[]; spaced?: boolean }> = ({ title, links, spaced }) => (
  <>
    <h2 className={`${styles.colTitle} ${spaced ? styles.colTitleSpaced : ''}`}>{title}</h2>
    <ul className={styles.linkList}>
      {links.map(l => (
        <li key={l.to + l.label}><Link to={l.to} className="text-link">{l.label}</Link></li>
      ))}
    </ul>
  </>
);

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label="E-QOS, accueil">
            <img src="/images/e-qos-pruducts/eqos_logo.png" alt="E-QOS" width={1264} height={627} loading="lazy" />
          </Link>
          <p className={styles.tagline}>Votre partenaire de transformation digitale en Guinée</p>
          <address className={styles.address}>
            <span>Conakry, Guinée (siège)</span>
            <a href="mailto:contact.eqos@gmail.com" className="text-link">contact.eqos@gmail.com</a>
          </address>
          <ul className={styles.social} aria-label="Réseaux sociaux">
            {socials.map(s => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${s.label} E-QOS (nouvel onglet)`}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map(c => (
          <div key={c.title} className={styles.col}>
            <LinkList title={c.title} links={c.links} />
            {c.title2 && c.links2 && <LinkList title={c.title2} links={c.links2} spaced />}
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaText}>Besoin d'un accompagnement digital en Guinée ?</p>
        <Link to="/contact" className="arrow-link">
          Parlons de votre projet <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 E-QOS SARL. Tous droits réservés.</p>
        <p>Présent en Guinée · Vision Afrique de l'Ouest</p>
      </div>
    </div>
  </footer>
);

export default Footer;
