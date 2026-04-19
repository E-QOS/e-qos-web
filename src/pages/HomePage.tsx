import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, BarChart3, LayoutGrid, CreditCard, Shield,
  Headphones, Briefcase, UserCheck,
  Pickaxe, Smartphone, Building2, HeartPulse, Landmark, Wheat,
  ShoppingBag, GraduationCap,
  CheckCircle2, Users, Award, MapPin,
  ArrowRight, CalendarDays, ChevronLeft, ChevronRight,
  Car, ShoppingBasket,
} from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { NetworkBackground } from '../components/home/NetworkBackground';
import { SectionWrapper } from '../components/home/SectionWrapper';
import HeroDragonfly from '../components/mascot/HeroDragonfly';
import { CounterStat } from '../components/home/CounterStat';
import styles from './HomePage.module.css';

const CALENDAR_URL = 'https://calendar.app.google/C7KRgHGHW6gE478s6';

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { icon: <Zap size={22} />, title: 'Transformation digitale', desc: 'Diagnostic, feuille de route numérique et conduite du changement.', to: '/services/transformation-digitale' },
  { icon: <BarChart3 size={22} />, title: 'Conseil organisationnel', desc: 'Optimisation des processus, restructuration et performance.', to: '/services/conseil-organisationnel' },
  { icon: <LayoutGrid size={22} />, title: 'Implémentation Odoo', desc: 'ERP open source de A à Z : paramétrage, intégration, support.', to: '/services/odoo' },
  { icon: <CreditCard size={22} />, title: 'Paiements locaux', desc: 'Orange Money, MTN MoMo, Wave intégrés à vos systèmes métier.', to: '/services/paiements-locaux' },
  { icon: <Shield size={22} />, title: 'Cybersécurité', desc: 'Audit, protection des SI, gestion des incidents et conformité.', to: '/services/cybersecurite' },
  { icon: <Headphones size={22} />, title: 'Support informatique', desc: 'Helpdesk, infogérance et maintenance de vos infrastructures.', to: '/services/support' },
  { icon: <Briefcase size={22} />, title: 'Management & Consulting', desc: 'Gouvernance, pilotage de projets complexes et performance.', to: '/services/management-consulting' },
  { icon: <UserCheck size={22} />, title: 'Interim Management', desc: 'DSI, chefs de projet et experts mobilisables rapidement.', to: '/services/interim' },
];

const bigStats = [
  { icon: <Briefcase size={28} />, value: 8, suffix: '+', label: 'Services proposés' },
  { icon: <Users size={28} />, value: 20, suffix: '+', label: 'Projets livrés' },
  { icon: <Award size={28} />, value: 3, suffix: '+', label: "Années d'expertise" },
  { icon: <MapPin size={28} />, value: 1, suffix: '', label: 'Pays — Guinée' },
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
    desc: 'Plateforme de mise en relation de prestataires vérifiés — livraison, nettoyage, cours particuliers. Paiement mobile intégré, géolocalisation et notation en temps réel.',
    icon: <Smartphone size={48} />,
    accent: '#FF5A1F',
    to: '/solutions/wali',
  },
  {
    name: 'Wandi',
    tag: 'Mobilité urbaine',
    desc: 'Réservation de transport, gestion de flotte et mobilité intelligente pour particuliers et entreprises. Suivi de trajets en temps réel.',
    icon: <Car size={48} />,
    accent: '#00C8FF',
    to: '/solutions/wandi',
  },
  {
    name: 'Makiti',
    tag: 'Marketplace agricole',
    desc: 'Connexion directe entre producteurs ruraux et consommateurs urbains. Catalogue, commande, paiement mobile et livraison tracée sans intermédiaires.',
    icon: <ShoppingBasket size={48} />,
    accent: '#00E5A0',
    to: '/solutions/makiti',
  },
];

const secteurs = [
  { icon: <Pickaxe size={32} />, label: 'Mines & Ressources', to: '/secteurs/mines-ressources' },
  { icon: <Smartphone size={32} />, label: 'Télécommunications', to: '/secteurs/telecom' },
  { icon: <Building2 size={32} />, label: 'Banque & Finance', to: '/secteurs/banque-finance' },
  { icon: <HeartPulse size={32} />, label: 'Santé', to: '/secteurs/sante' },
  { icon: <Landmark size={32} />, label: 'Secteur Public', to: '/secteurs/secteur-public' },
  { icon: <Wheat size={32} />, label: 'Agriculture', to: '/secteurs/agriculture' },
  { icon: <ShoppingBag size={32} />, label: 'Commerce', to: '/secteurs/commerce-distribution' },
  { icon: <GraduationCap size={32} />, label: 'Éducation', to: '/secteurs/education' },
];

const testimonials = [
  {
    quote: "EQOS a transformé notre façon de travailler. L'implémentation d'Odoo a été menée avec un professionnalisme remarquable et un vrai respect de nos contraintes locales.",
    name: 'Mamadou Diallo',
    title: 'Directeur Général',
    org: 'PME de distribution, Conakry',
    initials: 'MD',
    gradFrom: '#FF5A1F',
    gradTo: '#CC3D00',
  },
  {
    quote: "La mise en place des paiements Orange Money dans notre système de gestion a été réalisée en un temps record. Notre taux de recouvrement a considérablement augmenté.",
    name: 'Fatoumata Bah',
    title: 'Responsable Financière',
    org: 'Institution de Microfinance',
    initials: 'FB',
    gradFrom: '#0A1628',
    gradTo: '#00C8FF',
  },
  {
    quote: "EQOS ne livre pas un projet et disparaît. Leur équipe est restée à nos côtés après le déploiement. C'est ce qui fait la différence.",
    name: 'Ibrahima Sow',
    title: 'DSI',
    org: 'Entreprise de télécommunications',
    initials: 'IS',
    gradFrom: '#003322',
    gradTo: '#00E5A0',
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const heroBadgeAnim = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const popItem = {
  hidden: { opacity: 0, scale: 0.82 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionLabel}>{children}</p>;
}

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };
  const prev = () => go((idx - 1 + testimonials.length) % testimonials.length);
  const next = () => go((idx + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselCard}>
        <span className={styles.carouselQuoteMark}>"</span>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className={styles.carouselQuote}>{t.quote}</p>
            <div className={styles.carouselDivider} />
            <div className={styles.carouselAuthor}>
              <div
                className={styles.carouselAvatar}
                style={{ background: `linear-gradient(135deg, ${t.gradFrom}, ${t.gradTo})` }}
              >
                {t.initials}
              </div>
              <div>
                <strong className={styles.carouselName}>{t.name}</strong>
                <span className={styles.carouselRole}>{t.title}, {t.org}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.carouselControls}>
        <button className={styles.carouselBtn} onClick={prev} aria-label="Précédent">
          <ChevronLeft size={18} />
        </button>
        <div className={styles.carouselDots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
              onClick={() => go(i)}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
        <button className={styles.carouselBtn} onClick={next} aria-label="Suivant">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  usePageMeta({
    title: 'EQOS Africa — Partenaire digital en Guinée et Afrique de l\'Ouest',
    description: 'EQOS accompagne les entreprises et institutions guinéennes dans leur transformation numérique : Odoo, paiements mobiles, cybersécurité, conseil et management.',
  });

  return (
    <div className={styles.home}>

      {/* ════ HERO ════════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <NetworkBackground />

        {/* Radial glow overlays */}
        <div className={styles.heroGlowOrange} aria-hidden="true" />
        <div className={styles.heroGlowCyan} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroContent}
            variants={heroStagger}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={heroBadgeAnim} className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} aria-hidden="true" />
              CONAKRY, GUINÉE &nbsp;·&nbsp; EST. 2023
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={heroItem} className={styles.heroTitle}>
              Transformez votre organisation.{' '}
              <span className={styles.heroLine2}>
                Bâtissez l'avenir{' '}
                <span className={styles.heroAccentWord}>digital.</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={heroItem} className={styles.heroSub}>
              EQOS accompagne les entreprises et institutions guinéennes
              dans leur transformation numérique — conseil, implémentation,
              cybersécurité et management.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={heroItem} className={styles.heroCtas}>
              <Link to="/services" className={styles.ctaPrimary}>
                Découvrir nos services
                <ArrowRight size={16} />
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                <CalendarDays size={16} />
                Réserver un appel
              </a>
            </motion.div>

            {/* Hero stats bar */}
            <motion.div variants={heroItem} className={styles.heroStats}>
              {[
                { value: '8+', label: 'Services' },
                { value: '100%', label: 'Local' },
                { value: 'Guinée', label: 'Présence' },
              ].map((s, i) => (
                <React.Fragment key={s.value}>
                  {i > 0 && <div className={styles.heroStatDivider} aria-hidden="true" />}
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatValue}>{s.value}</span>
                    <span className={styles.heroStatLabel}>{s.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero illustration */}
          <div className={styles.heroIllo} aria-hidden="true">
            <HeroDragonfly />
          </div>
        </div>

        <div className={styles.heroScrollHint} aria-hidden="true">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className={styles.heroScrollDot}
          />
        </div>
      </section>

      {/* ════ SERVICES ════════════════════════════════════════════════════════ */}
      <SectionWrapper className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionLabel>CE QUE NOUS FAISONS</SectionLabel>
            <h2 className={styles.sectionTitle}>Nos services</h2>
            <p className={styles.sectionSub}>
              Une offre complète couvrant l'ensemble du spectre de la transformation
              numérique en Guinée et en Afrique de l'Ouest.
            </p>
          </div>

          <motion.div
            className={styles.servicesGrid}
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            {services.map(s => (
              <motion.div key={s.title} variants={gridItem}>
                <Link to={s.to} className={styles.serviceCard}>
                  <div className={styles.serviceCardInner}>
                    <div className={styles.serviceIcon}>{s.icon}</div>
                    <h3 className={styles.serviceTitle}>{s.title}</h3>
                    <p className={styles.serviceDesc}>{s.desc}</p>
                    <span className={styles.serviceLink}>
                      En savoir plus <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ════ WHY EQOS ════════════════════════════════════════════════════════ */}
      <SectionWrapper className={styles.whySection}>
        <div className={styles.whyGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.whyLayout}>
            {/* Left */}
            <div className={styles.whyLeft}>
              <SectionLabel>NOTRE FORCE</SectionLabel>
              <h2 className={styles.sectionTitle}>
                Ancrés dans les réalités guinéennes
              </h2>
              <p className={styles.whyText}>
                EQOS ne transpose pas des méthodes venues d'ailleurs. Chaque solution
                est conçue pour les contraintes réelles du terrain : connectivité variable,
                paiements mobiles dominants, contextes réglementaires locaux.
              </p>
              <ul className={styles.whyList}>
                {whyPoints.map(p => (
                  <li key={p} className={styles.whyPoint}>
                    <CheckCircle2 size={16} className={styles.whyCheckIcon} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — stats grid */}
            <motion.div
              className={styles.whyStatsGrid}
              variants={gridStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {bigStats.map(s => (
                <motion.div key={s.label} variants={gridItem} className={styles.whyStatCard}>
                  <div className={styles.whyStatIcon}>{s.icon}</div>
                  <div className={styles.whyStatValue}>
                    <CounterStat value={s.value} suffix={s.suffix} />
                  </div>
                  <div className={styles.whyStatLabel}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ════ SOLUTIONS ═══════════════════════════════════════════════════════ */}
      <SectionWrapper className={styles.solutionsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionLabel>NOS PRODUITS</SectionLabel>
            <h2 className={styles.sectionTitle}>Solutions propriétaires</h2>
            <p className={styles.sectionSub}>
              En plus de nos services, EQOS développe ses propres produits digitaux
              pensés pour les marchés africains.
            </p>
          </div>

          <div className={styles.solutionsList}>
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.name}
                className={styles.solutionCard}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{ '--sol-accent': sol.accent } as React.CSSProperties}
              >
                {/* Color block */}
                <div
                  className={`${styles.solutionVisual} ${i % 2 !== 0 ? styles.solutionVisualRight : ''}`}
                  style={{ background: `linear-gradient(135deg, ${sol.accent}22 0%, ${sol.accent}08 100%)`, borderColor: `${sol.accent}30` }}
                >
                  <div className={styles.solutionIconWrap} style={{ color: sol.accent }}>
                    {sol.icon}
                  </div>
                  <span className={styles.solutionBigName} style={{ color: sol.accent }}>{sol.name}</span>
                </div>
                {/* Text block */}
                <div className={`${styles.solutionText} ${i % 2 !== 0 ? styles.solutionTextLeft : ''}`}>
                  <span className={styles.solutionTag} style={{ color: sol.accent, borderColor: `${sol.accent}40` }}>
                    {sol.tag}
                  </span>
                  <h3 className={styles.solutionName}>{sol.name}</h3>
                  <p className={styles.solutionDesc}>{sol.desc}</p>
                  <Link to={sol.to} className={styles.solutionLink} style={{ color: sol.accent }}>
                    Découvrir {sol.name} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ════ SECTEURS ════════════════════════════════════════════════════════ */}
      <SectionWrapper className={styles.secteursSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionLabel>NOS MARCHÉS</SectionLabel>
            <h2 className={styles.sectionTitle}>Secteurs d'activité</h2>
            <p className={styles.sectionSub}>
              Une expertise sectorielle construite sur des projets réels en Guinée.
            </p>
          </div>

          <motion.div
            className={styles.secteursGrid}
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {secteurs.map(s => (
              <motion.div key={s.label} variants={popItem}>
                <Link to={s.to} className={styles.secteurCard}>
                  <div className={styles.secteurIcon}>{s.icon}</div>
                  <span className={styles.secteurLabel}>{s.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ════ TÉMOIGNAGES ═════════════════════════════════════════════════════ */}
      <SectionWrapper className={styles.testimonialsSection}>
        <div className={styles.testimonialsLine} aria-hidden="true" />
        <div className="container">
          <div className={styles.sectionHeader}>
            <SectionLabel>ILS NOUS FONT CONFIANCE</SectionLabel>
            <h2 className={styles.sectionTitle}>Ce que disent nos clients</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </SectionWrapper>

      {/* ════ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        {/* Decorative circles */}
        <div className={styles.ctaDecorWrap} aria-hidden="true">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <circle cx="200" cy="200" r="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <circle cx="200" cy="200" r="100" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
            <circle cx="200" cy="200" r="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          </svg>
        </div>

        <div className="container">
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className={styles.ctaLabel}>PASSONS À L'ACTION</p>
            <h2 className={styles.ctaTitle}>Votre transformation digitale commence ici.</h2>
            <p className={styles.ctaSub}>
              Échangeons sur votre projet. Notre équipe vous répond sous 48h.
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              <CalendarDays size={18} />
              Réserver un appel gratuit
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
