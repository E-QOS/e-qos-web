import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { SignatureStroke } from '../components/brand/SignatureStroke';
import { ContactForm } from '../components/contact/ContactForm';
import styles from './HomePage.module.css';

const CALENDAR_URL = 'https://calendar.app.google/C7KRgHGHW6gE478s6';

// ─── Contenus (repris de la version précédente de la page) ───────────────────

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

const whyPoints = [
  'Experts locaux basés à Conakry',
  'Approche sur-mesure par secteur d\'activité',
  'Partenaire long terme, pas juste un prestataire',
];

// Méthode publiée sur /services/transformation-digitale
const approach = [
  { t: 'Comprendre', d: 'Diagnostic de l\'existant, entretiens avec les parties prenantes, cartographie des processus critiques et identification des priorités.' },
  { t: 'Concevoir', d: 'Co-construction de la feuille de route avec vos équipes. Sélection des solutions, définition des indicateurs de succès, plan de gestion du changement.' },
  { t: 'Déployer', d: 'Mise en œuvre des outils, formation des utilisateurs, accompagnement terrain. Ajustements rapides selon les retours du terrain.' },
  { t: 'Ancrer', d: 'Mesure des résultats, optimisation continue, renforcement de l\'autonomie des équipes et préparation de la prochaine vague de transformation.' },
];

const solutions = [
  {
    name: 'Wali',
    tag: 'Services à la demande',
    desc: 'Plateforme de mise en relation de prestataires vérifiés : livraison, nettoyage, cours particuliers. Paiement mobile intégré, géolocalisation et notation en temps réel.',
    to: '/solutions/wali',
  },
  {
    name: 'Wandi',
    tag: 'Mobilité urbaine',
    desc: 'Réservation de transport, gestion de flotte et mobilité intelligente pour particuliers et entreprises. Suivi de trajets en temps réel.',
    to: '/solutions/wandi',
  },
  {
    name: 'Makiti',
    tag: 'Marketplace agricole',
    desc: 'Connexion directe entre producteurs ruraux et consommateurs urbains. Catalogue, commande, paiement mobile et livraison tracée sans intermédiaires.',
    to: '/solutions/makiti',
  },
];

const secteurs = [
  { label: 'Mines & Ressources', to: '/secteurs/mines-ressources' },
  { label: 'Télécommunications', to: '/secteurs/telecom' },
  { label: 'Banque & Finance', to: '/secteurs/banque-finance' },
  { label: 'Santé', to: '/secteurs/sante' },
  { label: 'Secteur Public', to: '/secteurs/secteur-public' },
  { label: 'Agriculture', to: '/secteurs/agriculture' },
  { label: 'Commerce', to: '/secteurs/commerce-distribution' },
  { label: 'Éducation', to: '/secteurs/education' },
];

const countries = ['Guinée', 'Sénégal', 'Mali'];

const pad = (n: number) => String(n).padStart(2, '0');

// ─── Page ─────────────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  usePageMeta({
    title: 'EQOS Africa — Partenaire digital en Guinée et Afrique de l\'Ouest',
    description: 'EQOS accompagne les entreprises et institutions guinéennes dans leur transformation numérique : Odoo, paiements mobiles, cybersécurité, conseil et management.',
  });

  return (
    <div className={styles.home}>

      {/* ════ HERO ════════════════════════════════════════════════════════════ */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className="container">
          <span className="kicker">Conakry, Guinée · Est. 2026</span>
          <h1 id="hero-title" className={styles.heroTitle}>
            Transformez votre organisation. Bâtissez l'avenir <span className={styles.accent}>digital.</span>
          </h1>
          <SignatureStroke variant="draw" className={styles.heroStroke} />
          <p className={styles.heroSub}>
            EQOS accompagne les entreprises et institutions guinéennes dans leur
            transformation numérique : conseil, implémentation, cybersécurité et management.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/services" className="btn btn-primary">
              Découvrir nos services
            </Link>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="arrow-link">
              Réserver un appel <ArrowRight size={16} aria-hidden="true" />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>
          <p className={styles.presenceLine}>
            <span className={styles.presenceLabel}>Présence</span>
            {countries.join(' · ')}
          </p>
        </div>
      </section>

      {/* ════ POSITIONNEMENT ══════════════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="force-title">
        <div className={`container ${styles.split}`}>
          <div className={`${styles.splitHead} reveal`}>
            <span className="kicker">Notre force</span>
            <h2 id="force-title" className={styles.smallTitle}>Ancrés dans les réalités guinéennes</h2>
          </div>
          <div className={styles.splitBody}>
            <p className={`${styles.statement} reveal`}>
              EQOS ne transpose pas des méthodes venues d'ailleurs. Chaque solution
              est conçue pour les contraintes réelles du terrain : connectivité variable,
              paiements mobiles dominants, contextes réglementaires locaux.
            </p>
            <ul className={styles.points}>
              {whyPoints.map((p, i) => (
                <li key={p} className="reveal" style={{ '--i': i } as React.CSSProperties}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className={`container ${styles.separator}`}><SignatureStroke /></div>

      {/* ════ EXPERTISES ══════════════════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="services-title" id="services">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Ce que nous faisons</span>
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

      {/* ════ APPROCHE ════════════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.warm}`} aria-labelledby="approche-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Notre approche</span>
            <h2 id="approche-title">Notre approche en 4 phases</h2>
            <p>Une transformation qui tient dans le temps, pas un projet qui se referme au go-live.</p>
          </header>
          <ol className={styles.steps}>
            {approach.map((s, i) => (
              <li key={s.t} className={`${styles.step} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className={styles.stepNum}>{pad(i + 1)}</span>
                <h3 className={styles.stepTitle}>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════ SOLUTIONS ═══════════════════════════════════════════════════════ */}
      <section className={styles.section} aria-labelledby="solutions-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Nos produits</span>
            <h2 id="solutions-title">Solutions propriétaires</h2>
            <p>En plus de nos services, EQOS développe ses propres produits digitaux pensés pour les marchés africains.</p>
          </header>

          <ul className={styles.products}>
            {solutions.map((sol, i) => (
              <li key={sol.name} className={`${styles.product} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <h3 className={styles.productName}>{sol.name}</h3>
                <span className={styles.productTag}>{sol.tag}</span>
                <p className={styles.productDesc}>{sol.desc}</p>
                <Link to={sol.to} className={`arrow-link ${styles.productLink}`}>
                  Découvrir {sol.name} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════ SECTEURS ════════════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionTight}`} aria-labelledby="secteurs-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Nos marchés</span>
            <h2 id="secteurs-title">Secteurs d'activité</h2>
            <p>Une expertise sectorielle construite sur des projets réels en Guinée.</p>
          </header>
          <ul className={styles.sectors}>
            {secteurs.map((s, i) => (
              <li key={s.to} className="reveal" style={{ '--i': i % 4 } as React.CSSProperties}>
                <Link to={s.to} className={styles.sector}>
                  {s.label}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════ CONVICTION : unique surface sombre du site ══════════════════════ */}
      <section className={styles.conviction} aria-labelledby="action-title">
        <div className="container">
          <span className={styles.convictionKicker}>Passons à l'action</span>
          <h2 id="action-title" className={`${styles.convictionTitle} reveal`}>
            Votre transformation digitale commence <span className={styles.accentDark}>ici.</span>
          </h2>
          <p className={styles.convictionSub}>Échangeons sur votre projet. Notre équipe vous répond sous 48h.</p>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={styles.convictionBtn}>
            Réserver un appel gratuit
            <span className="sr-only">(nouvel onglet)</span>
          </a>
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
            <h2 id="contact-title">Analyse gratuite de vos besoins</h2>
            <p className={styles.contactIntro}>
              Décrivez votre projet ou vos besoins. Nos experts analysent votre situation et vous
              proposent une première approche adaptée, gratuitement et sans engagement.
            </p>
          </div>
          <div className={styles.splitBody}>
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
