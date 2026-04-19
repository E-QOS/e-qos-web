import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowRight } from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.grid}>
            {/* Col 1 — E-QOS */}
            <div className={styles.col1}>
              <Link to="/" className={styles.footerLogo}>
                <span className={styles.footerLogoText}>E-QOS</span>
              </Link>
              <p className={styles.tagline}>Votre partenaire de transformation digitale en Guinée</p>
              <div className={styles.addresses}>
                <div className={styles.addressItem}>
                  <MapPin size={14} className={styles.addressIcon} />
                  <span>Conakry, Guinée (siège)</span>
                </div>
                <div className={styles.addressItem}>
                  <Mail size={14} className={styles.addressIcon} />
                  <a href="mailto:contact.eqos@gmail.com" className={styles.mailLink}>contact.eqos@gmail.com</a>
                </div>
              </div>
              <div className={styles.social}>
                <a href="https://www.linkedin.com/company/e-qos/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn E-QOS" className={styles.socialLink}>
                  <FaLinkedinIn size={13} />
                </a>
                <a href="https://www.facebook.com/eqosconsulting/" target="_blank" rel="noopener noreferrer" aria-label="Facebook E-QOS" className={styles.socialLink}>
                  <FaFacebookF size={13} />
                </a>
                <a href="https://x.com/EConsultin71892" target="_blank" rel="noopener noreferrer" aria-label="X E-QOS" className={styles.socialLink}>
                  <FaXTwitter size={13} />
                </a>
                <a href="https://www.instagram.com/contact.eqos" target="_blank" rel="noopener noreferrer" aria-label="Instagram E-QOS" className={styles.socialLink}>
                  <FaInstagram size={13} />
                </a>
              </div>
            </div>

            {/* Col 2 — Services */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li><Link to="/services/transformation-digitale">Transformation digitale</Link></li>
                <li><Link to="/services/conseil-organisationnel">Conseil organisationnel</Link></li>
                <li><Link to="/services/odoo">Implémentation Odoo</Link></li>
                <li><Link to="/services/paiements-locaux">Paiements locaux</Link></li>
                <li><Link to="/services/cybersecurite">Cybersécurité</Link></li>
                <li><Link to="/services/support">Support informatique</Link></li>
                <li><Link to="/services/management-consulting">Management & Consulting</Link></li>
                <li><Link to="/services/interim">Interim Management</Link></li>
              </ul>
            </div>

            {/* Col 3 — Solutions & Secteurs */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Solutions</h4>
              <ul className={styles.linkList}>
                <li><Link to="/solutions/wali">Wali</Link></li>
                <li><Link to="/solutions/wandi">Wandi</Link></li>
                <li><Link to="/solutions/makiti">Makiti</Link></li>
              </ul>
              <h4 className={`${styles.colTitle} ${styles.colTitleSpaced}`}>Secteurs clés</h4>
              <ul className={styles.linkList}>
                <li><Link to="/secteurs/mines-ressources">Mines & Ressources</Link></li>
                <li><Link to="/secteurs/secteur-public">Secteur public</Link></li>
                <li><Link to="/secteurs/banque-finance">Banque & Finance</Link></li>
                <li><Link to="/secteurs">Tous les secteurs</Link></li>
              </ul>
            </div>

            {/* Col 4 — Entreprise */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Entreprise</h4>
              <ul className={styles.linkList}>
                <li><Link to="/a-propos">À propos</Link></li>
                <li><Link to="/ressources">Ressources</Link></li>
                <li><Link to="/carrieres">Carrières</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/contact">Mentions légales</Link></li>
              </ul>
              <div className={styles.footerCta}>
                <p className={styles.footerCtaText}>Besoin d'un accompagnement digital en Guinée ?</p>
                <Link to="/contact" className={styles.footerCtaBtn}>
                  Parlons de votre projet
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p className={styles.copyright}>
            © 2026 E-QOS SARL. Tous droits réservés.
          </p>
          <p className={styles.countries}>
            Présent en Guinée · Vision Afrique de l'Ouest
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
