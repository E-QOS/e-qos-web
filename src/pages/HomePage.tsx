import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { SignatureStroke } from '../components/brand/SignatureStroke';
import { ContactForm } from '../components/contact/ContactForm';
import {
  MISE_EN_RELATION_PATH, offerIntro, audiences, steps, domains,
  contactLink, BESOIN_SUBJECT, PROFIL_SUBJECT,
} from '../data/miseEnRelation';
import styles from './HomePage.module.css';
import offerStyles from './MiseEnRelationPage.module.css';

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

const countries = ['Guinée', 'Sénégal', 'Mali'];

const pad = (n: number) => String(n).padStart(2, '0');

// ─── Page ─────────────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  usePageMeta({
    title: 'EQOS Africa, mise en relation, intérim et services numériques en Guinée',
    description: 'E-QOS met en relation les entreprises et institutions de Guinée avec des professionnels qualifiés, pour des missions d\'intérim dans tous les secteurs. Services numériques : Odoo, paiements mobiles, cybersécurité, conseil.',
  });

  return (
    <div className={styles.home}>

      {/* ════ HERO ════════════════════════════════════════════════════════════ */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className="container">
          <span className="kicker">Conakry, Guinée · Est. 2026</span>
          <h1 id="hero-title" className={styles.heroTitle}>
            Mise en relation et intérim, dans tous les <span className={styles.accent}>domaines.</span>
          </h1>
          <SignatureStroke variant="draw" className={styles.heroStroke} />
          <p className={styles.heroSub}>{offerIntro}</p>
          <div className={styles.heroCtas}>
            <Link to={contactLink(BESOIN_SUBJECT)} className="btn btn-primary">
              Exprimer un besoin
            </Link>
            <Link to={contactLink(PROFIL_SUBJECT)} className="arrow-link">
              Proposer mon profil <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className={styles.presenceLine}>
            <span className={styles.presenceLabel}>Présence</span>
            {countries.join(' · ')}
          </p>
        </div>
      </section>

      {/* ════ OFFRE : MISE EN RELATION ET INTÉRIM ═══════════════════════════ */}
      <section className={styles.section} aria-labelledby="offre-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Mise en relation et intérim</span>
            <h2 id="offre-title">Le bon profil, pour chaque mission</h2>
            <p>Nous travaillons avec les deux côtés : les organisations qui recrutent pour une mission, et les professionnels qui cherchent la suivante.</p>
          </header>
          <ul className={offerStyles.audiences}>
            {audiences.map((a, i) => (
              <li key={a.key} className={`${offerStyles.audience} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <h3 className={offerStyles.audienceTitle}>{a.title}</h3>
                <p className={offerStyles.audienceDesc}>{a.desc}</p>
                <ul className={offerStyles.points}>
                  {a.points.map(p => <li key={p}>{p}</li>)}
                </ul>
                <Link to={contactLink(a.subject)} className="arrow-link">
                  {a.cta} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════ COMMENT ÇA MARCHE ═══════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.warm}`} aria-labelledby="etapes-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Comment ça marche</span>
            <h2 id="etapes-title">Une mission en quatre étapes</h2>
          </header>
          <ol className={styles.steps}>
            {steps.map((st, i) => (
              <li key={st.t} className={`${styles.step} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className={styles.stepNum}>{pad(i + 1)}</span>
                <h3 className={styles.stepTitle}>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════ DOMAINES ════════════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionTight}`} aria-labelledby="domaines-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <span className="kicker">Domaines</span>
            <h2 id="domaines-title">Tous les domaines d'activité</h2>
            <p>Notre réseau ne se limite pas au numérique. Quelques exemples de secteurs :</p>
          </header>
          <ul className={styles.sectors}>
            {domains.map((d, i) => (
              <li key={d} className="reveal" style={{ '--i': i % 4 } as React.CSSProperties}>
                <span className={styles.sector}>{d}</span>
              </li>
            ))}
          </ul>
          <p className={styles.moreLink}>
            <Link to={MISE_EN_RELATION_PATH} className="arrow-link">
              Tout savoir sur la mise en relation et l'intérim <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <div className={`container ${styles.separator}`}><SignatureStroke /></div>

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

      {/* ════ EXPERTISES ══════════════════════════════════════════════════════ */}
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

      {/* ════ CONVICTION : unique surface sombre du site ══════════════════════ */}
      <section className={styles.conviction} aria-labelledby="action-title">
        <div className="container">
          <span className={styles.convictionKicker}>Passons à l'action</span>
          <h2 id="action-title" className={`${styles.convictionTitle} reveal`}>
            Trouvons ensemble le bon <span className={styles.accentDark}>profil.</span>
          </h2>
          <p className={styles.convictionSub}>Décrivez votre besoin. Notre équipe vous répond sous 48h.</p>
          <div className={styles.convictionCtas}>
            <Link to={contactLink(BESOIN_SUBJECT)} className={styles.convictionBtn}>Exprimer un besoin</Link>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={styles.convictionLink}>
              Réserver un appel gratuit
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>
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
            <h2 id="contact-title">Exprimez votre besoin</h2>
            <p className={styles.contactIntro}>
              Décrivez le poste, les compétences recherchées, le lieu et la durée de la mission.
              Pour un projet numérique ou toute autre demande, choisissez l'objet correspondant.
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
