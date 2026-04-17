import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Target, Heart, Zap, Users } from 'lucide-react';
import styles from './AProposPage.module.css';

const values = [
  { icon: <Zap size={22} />, title: 'Excellence', desc: 'Chaque projet livré est un projet dont nous sommes fiers. Rigueur technique, respect des délais et qualité sans compromis.' },
  { icon: <Heart size={22} />, title: 'Proximité', desc: 'Nous travaillons aux côtés de nos clients — pas à distance. Présence terrain, réactivité et connaissance de votre contexte.' },
  { icon: <Target size={22} />, title: 'Pragmatisme', desc: 'Pas de solutions théoriques. Nous recommandons ce qui fonctionne dans votre réalité opérationnelle, pas la dernière mode technologique.' },
  { icon: <Users size={22} />, title: 'Engagement long terme', desc: 'Notre objectif n\'est pas de livrer et de disparaître. Nous mesurons notre succès à l\'impact que nos solutions ont dans le temps.' },
];

const teams = [
  {
    slug: 'direction-generale',
    name: 'Direction Générale',
    tag: 'Leadership',
    description: 'Pilotage stratégique et vision globale pour transformer le paysage digital en Afrique de l\'Ouest.',
    image: '/images/e-qos-pruducts/equipe-direction-generale-bg.jpg',
    members: [
      { name: 'FOFANA Ayouba', photo: '/images/e-qos-pruducts/ayouba.jpg' },
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Diadié Traoré', photo: '/images/e-qos-pruducts/diadie.jpeg' },
      { name: 'Souleymane Kodjo', photo: '/images/e-qos-pruducts/kodjo.jpg' },
    ],
  },
  {
    slug: 'technique',
    name: 'Équipe Technique',
    tag: 'R&D',
    description: 'Développement et innovation technologique pour des solutions digitales robustes et évolutives.',
    image: '/images/e-qos-pruducts/equipe-technique-bg.jpg',
    members: [
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Diadié Traoré', photo: '/images/e-qos-pruducts/diadie.jpeg' },
      { name: 'Souleymane Kodjo', photo: '/images/e-qos-pruducts/kodjo.jpg' },
    ],
  },
  {
    slug: 'marketing',
    name: 'Marketing & Business',
    tag: 'Commercial',
    description: 'Croissance, partenariats stratégiques et développement commercial sur le continent.',
    image: '/images/e-qos-pruducts/equipe-marketing-bg.jpg',
    members: [
      { name: 'FOFANA Ayouba', photo: '/images/e-qos-pruducts/ayouba.jpg' },
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Diadié Traoré', photo: '/images/e-qos-pruducts/diadie.jpeg' },
    ],
  },
  {
    slug: 'support',
    name: 'Support & Qualité',
    tag: 'Service Client',
    description: 'Support technique et satisfaction client pour une expérience optimale à chaque étape.',
    image: '/images/e-qos-pruducts/equipe-support-bg.jpg',
    members: [
      { name: 'FOFANA Ayouba', photo: '/images/e-qos-pruducts/ayouba.jpg' },
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Souleymane Kodjo', photo: '/images/e-qos-pruducts/kodjo.jpg' },
    ],
  },
];

const partners = ['Odoo', 'Orange (API)', 'MTN (API)', 'Wave', 'Microsoft 365', 'Google Workspace'];

const offices = [
  { city: 'Conakry', country: 'Guinée', note: 'Siège social', color: '#0A1628' },
  { city: 'Afrique de l\'Ouest', country: 'Région', note: 'Expansion en cours', color: '#FF6B2C' },
];

const AProposPage: React.FC = () => (
  <div>
    <section className="page-hero">
      <div className="container">
        <h1>À propos d'EQOS</h1>
        <p>Votre partenaire digital de référence pour les organisations en Afrique de l'Ouest.</p>
      </div>
    </section>

    {/* Histoire & Mission */}
    <section className="section section-alt">
      <div className="container">
        <div className={styles.storyLayout}>
          <div>
            <h2>Notre histoire</h2>
            <p>EQOS est née d'une conviction simple : la technologie peut résoudre les défis réels des organisations africaines, à condition d'être pensée pour leurs réalités locales. Pas de solutions copiées-collées depuis d'autres marchés — mais une approche construite à partir des contraintes et des opportunités propres à l'Afrique de l'Ouest.</p>
            <p>Fondée à Conakry, EQOS accompagne aujourd'hui des entreprises, des institutions et des gouvernements en Guinée dans leur transformation numérique — de l'implémentation Odoo à l'intégration de paiements mobiles, du conseil organisationnel au renforcement de la cybersécurité — avec une vision d'expansion sur toute l'Afrique de l'Ouest.</p>
          </div>
          <div className={styles.missionCard}>
            <div className={styles.missionIcon}><Target size={28} /></div>
            <h3>Notre mission</h3>
            <p>Rendre la transformation digitale accessible, concrète et durable pour les entreprises, institutions et gouvernements africains — en combinant expertise technique internationale et ancrage local profond.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Valeurs */}
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2>Nos valeurs</h2>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueIcon}>{v.icon}</div>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Équipe */}
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2>Notre équipe</h2>
          <p className="lead">Des experts pluridisciplinaires, ancrés localement, avec une vision africaine de la transformation numérique.</p>
        </div>
        <div className={styles.teamGroupGrid}>
          {teams.map((team) => (
            <Link key={team.slug} to={`/equipe/${team.slug}`} className={styles.teamGroupCard}>
              <div className={styles.teamGroupImage}>
                <img
                  src={team.image}
                  alt={team.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className={styles.teamGroupOverlay} />
                <span className={styles.teamGroupTag}>{team.tag}</span>
              </div>
              <div className={styles.teamGroupBody}>
                <h4 className={styles.teamGroupName}>{team.name}</h4>
                <p className={styles.teamGroupDesc}>{team.description}</p>
                <div className={styles.teamGroupFooter}>
                  <div className={styles.memberAvatars}>
                    {team.members.slice(0, 4).map((m, i) => (
                      <img
                        key={i}
                        src={m.photo}
                        alt={m.name}
                        className={styles.memberAvatar}
                        style={{ zIndex: 4 - i }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ))}
                    <span className={styles.memberCount}>{team.members.length} membres</span>
                  </div>
                  <span className={styles.teamGroupCta}>
                    Découvrir <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Présence */}
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2>Notre présence</h2>
        </div>
        <div className={styles.officesGrid}>
          {offices.map((o) => (
            <div key={o.city} className={styles.officeCard} style={{ borderTopColor: o.color }}>
              <div className={styles.officeIcon} style={{ background: o.color + '18', color: o.color }}>
                <MapPin size={22} />
              </div>
              <div>
                <h3 className={styles.officeCity}>{o.city}</h3>
                <p className={styles.officeCountry}>{o.country}</p>
                <span className={styles.officeNote}>{o.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Partenaires technologiques */}
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-line" />
          <h2>Partenaires technologiques</h2>
          <p className="lead">Nous travaillons avec les meilleures solutions du marché, adaptées au contexte africain.</p>
        </div>
        <div className={styles.partnersGrid}>
          {partners.map((p) => (
            <div key={p} className={styles.partnerCard}>
              <span className={styles.partnerName}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta-band">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Rejoignez nos clients</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Plus de 100 organisations en Guinée nous font déjà confiance pour leur transformation digitale.</p>
        <Link to="/contact" className="btn btn-white btn-lg">
          Démarrer un projet <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </div>
);

export default AProposPage;
