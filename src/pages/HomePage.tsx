import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { SignatureStroke } from '../components/brand/SignatureStroke';
import { ContactForm } from '../components/contact/ContactForm';
import { HeroReel } from '../components/media/HeroReel';
import { SectorShowcase } from '../components/media/SectorShowcase';
import { sectors } from '../data/secteursGuinee';
import {
  RECRUTEMENT_PATH, heroKicker, heroLead, ctaClient, ctaTalent,
  audiences, method, contactLink, BESOIN_SUBJECT, CANDIDATURE_PATH,
} from '../data/recrutement';
import styles from './HomePage.module.css';
import offerStyles from './RecrutementPage.module.css';

const CALENDAR_URL = 'https://calendar.app.google/C7KRgHGHW6gE478s6';

// Services numériques (second plan), textes repris de la version précédente
const services = [
  { title: 'Transformation digitale', desc: 'Diagnostic, feuille de route numérique et conduite du changement.', to: '/services/transformation-digitale' },
  { title: 'Conseil organisationnel', desc: 'Optimisation des processus, restructuration et performance.', to: '/services/conseil-organisationnel' },
  { title: 'Implémentation Odoo', desc: 'ERP open source de A à Z : paramétrage, intégration, support.', to: '/services/odoo' },
  { title: 'Paiements locaux', desc: 'Orange Money, MTN MoMo, Wave intégrés à vos systèmes métier.', to: '/services/paiements-locaux' },
  { title: 'Cybersécurité', desc: 'Audit, protection des SI, gestion des incidents et conformité.', to: '/services/cybersecurite' },
  { title: 'Support informatique', desc: 'Helpdesk, infogérance et maintenance de vos infrastructures.', to: '/services/support' },
  { title: 'Management & Consulting', desc: 'Gouvernance, pilotage de projets complexes et performance.', to: '/services/management-consulting' },
  { title: 'Interim Management', desc: 'DSI, chefs de projet et experts mobilisables rapidement.', to: '/services/interim' },
];

const countries = ['Guinée', 'Sénégal', 'Mali'];

const pad = (n: number) => String(n).padStart(2, '0');

const HomePage: React.FC = () => {
  usePageMeta({
    title: 'EQOS Africa, recrutement et intérim pour les grands secteurs de Guinée',
    description: 'E-QOS constitue les équipes des mines, de l\'énergie, du BTP, de la logistique et des services en Guinée : opérateurs, techniciens, ingénieurs et encadrement. Services numériques : Odoo, paiements mobiles, cybersécurité.',
  });

  return (
    <div className={styles.home}>

      {/* ════ HERO VIDÉO ══════════════════════════════════════════════════════ */}
      <HeroReel sectors={sectors}>
        <span className={styles.heroKicker}>{heroKicker}</span>
        <h1 id="hero-title" className={styles.heroTitle}>
          Les équipes qui font avancer les grands projets de <span className={styles.accent}>Guinée.</span>
        </h1>
        <SignatureStroke variant="draw" className={styles.heroStroke} />
        <p className={styles.heroSub}>{heroLead}</p>
        <div className={styles.heroCtas}>
          <Link to={contactLink(BESOIN_SUBJECT)} className={styles.heroBtn}>{ctaClient}</Link>
          <Link to={CANDIDATURE_PATH} className={styles.heroLink}>
            {ctaTalent} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </HeroReel>

      {/* ════ SECTEURS ════════════════════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="secteurs-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Secteurs</span>
            <h2 id="secteurs-title">Au cœur de l'économie guinéenne</h2>
            <p>Mines, énergie, infrastructures, logistique, agriculture et services : les secteurs qui portent la croissance du pays, et les métiers qui les font tourner.</p>
          </header>
          <SectorShowcase sectors={sectors} />
        </div>
      </section>

      {/* ════ DEUX PUBLICS ════════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.warm}`} aria-labelledby="publics-title">
        <div className="container">
          <h2 id="publics-title" className="sr-only">Entreprises et professionnels</h2>
          <ul className={offerStyles.audiences}>
            {audiences.map((a, i) => (
              <li key={a.key} className={`${offerStyles.audience} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className="kicker">{a.kicker}</span>
                <h3 className={offerStyles.audienceTitle}>{a.title}</h3>
                <p className={offerStyles.audienceDesc}>{a.desc}</p>
                <ul className={offerStyles.points}>
                  {a.points.map(p => <li key={p}>{p}</li>)}
                </ul>
                <Link to={a.to} className="arrow-link">
                  {a.cta} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════ MÉTHODE ═════════════════════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="methode-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Méthode</span>
            <h2 id="methode-title">Du cadrage à la mobilisation sur site</h2>
          </header>
          <ol className={styles.steps}>
            {method.map((st, i) => (
              <li key={st.t} className={`${styles.step} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className={styles.stepNum}>{pad(i + 1)}</span>
                <h3 className={styles.stepTitle}>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
          <p className={styles.moreLink}>
            <Link to={RECRUTEMENT_PATH} className="arrow-link">
              Recrutement et intérim : notre offre en détail <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* ════ CONVICTION ══════════════════════════════════════════════════════ */}
      <section className={styles.conviction} aria-labelledby="action-title">
        <div className="container">
          <span className={styles.convictionKicker}>Passons à l'action</span>
          <h2 id="action-title" className={`${styles.convictionTitle} reveal`}>
            Parlons de votre prochain <span className={styles.accentDark}>chantier.</span>
          </h2>
          <p className={styles.convictionSub}>Décrivez les postes à pourvoir. Notre équipe vous répond sous 48h.</p>
          <div className={styles.convictionCtas}>
            <Link to={contactLink(BESOIN_SUBJECT)} className={styles.convictionBtn}>{ctaClient}</Link>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={styles.convictionLink}>
              Réserver un appel gratuit
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ════ SERVICES NUMÉRIQUES (second plan) ═══════════════════════════════ */}
      <section className={styles.section} aria-labelledby="services-title" id="services">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Services numériques</span>
            <h2 id="services-title">Nos services</h2>
            <p>Une offre complète couvrant l'ensemble du spectre de la transformation numérique en Guinée et en Afrique de l'Ouest.</p>
          </header>
          <ol className={styles.index}>
            {services.map((s, i) => (
              <li key={s.to} className="reveal" style={{ '--i': i } as React.CSSProperties}>
                <Link to={s.to} className={styles.indexRow}>
                  <span className={styles.indexNum} aria-hidden="true">{pad(i + 1)}</span>
                  <span className={styles.indexTitle}>{s.title}</span>
                  <span className={styles.indexDesc}>{s.desc}</span>
                  <ArrowRight size={20} className={styles.indexArrow} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════ PRÉSENCE ════════════════════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="presence-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Présence</span>
            <h2 id="presence-title">Partenaire digital en Afrique de l'Ouest</h2>
          </header>
          <ul className={styles.countries}>
            {countries.map((c, i) => (
              <li key={c} className={`${styles.country} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <h3 className={styles.countryName}>{c}</h3>
                {c === 'Guinée' && (
                  <address className={styles.countryInfo}>
                    <span>Conakry, Guinée (siège)</span>
                    <a href="mailto:contact.eqos@gmail.com" className="text-link">contact.eqos@gmail.com</a>
                  </address>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className={`container ${styles.separator}`}><SignatureStroke /></div>

      {/* ════ CONTACT ═════════════════════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="contact-title" id="contact">
        <div className={`container ${styles.split}`}>
          <div className={`${styles.splitHead} reveal`}>
            <span className="kicker">Contact</span>
            <h2 id="contact-title">Constituer une équipe</h2>
            <p className={styles.contactIntro}>
              Indiquez les postes, le nombre de personnes, le site et la date de démarrage.
              Pour une candidature ou un projet numérique, choisissez l'objet correspondant.
            </p>
          </div>
          <div className={styles.splitBody}>
            <ContactForm defaultSubject={BESOIN_SUBJECT} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
