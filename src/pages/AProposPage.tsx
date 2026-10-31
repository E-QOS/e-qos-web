import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { serviceGroups } from '../data/services';
import { DEMANDE_PATH } from '../data/recrutement';
import styles from './AProposPage.module.css';

const values = [
  { title: 'Excellence', desc: 'Chaque mission menée est une mission dont nous sommes fiers. Rigueur, respect des délais et qualité sans compromis.' },
  { title: 'Proximité', desc: 'Nous travaillons aux côtés de nos clients, pas à distance. Présence terrain, réactivité et connaissance de votre contexte.' },
  { title: 'Pragmatisme', desc: 'Pas de solutions théoriques. Nous recommandons ce qui fonctionne dans votre réalité opérationnelle, pas la dernière mode.' },
  { title: 'Engagement long terme', desc: 'Notre objectif n\'est pas de livrer et de disparaître. Nous mesurons notre succès à l\'impact de notre travail dans le temps.' },
];

// Faits vérifiés, sources dans docs/redesign/REPORT.md (section 10)
const facts = [
  { fact: 'Premier producteur mondial de bauxite.', source: 'Coface, 2025' },
  { fact: 'Premier minerai de fer de Simandou expédié en décembre 2025.', source: 'Rio Tinto' },
  { fact: 'L\'agriculture représente plus de 60 % des emplois du pays.', source: 'Banque mondiale, 2026' },
];

const teams = [
  {
    slug: 'direction-generale',
    name: 'Direction Générale',
    description: 'Pilotage stratégique et développement d\'E-QOS en Guinée et en Afrique de l\'Ouest.',
    members: [
      { name: 'FOFANA Ayouba', photo: '/images/e-qos-pruducts/ayouba.png' },
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Diadié Traoré', photo: '/images/e-qos-pruducts/diadie.jpeg' },
      { name: 'Souleymane Kodjo', photo: '/images/e-qos-pruducts/kodjo.jpg' },
    ],
  },
  {
    slug: 'technique',
    name: 'Équipe Technique',
    description: 'Développement et innovation technologique pour des solutions digitales robustes et évolutives.',
    members: [
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Diadié Traoré', photo: '/images/e-qos-pruducts/diadie.jpeg' },
      { name: 'Souleymane Kodjo', photo: '/images/e-qos-pruducts/kodjo.jpg' },
    ],
  },
  {
    slug: 'marketing',
    name: 'Marketing & Business',
    description: 'Croissance, partenariats stratégiques et développement commercial.',
    members: [
      { name: 'FOFANA Ayouba', photo: '/images/e-qos-pruducts/ayouba.png' },
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Diadié Traoré', photo: '/images/e-qos-pruducts/diadie.jpeg' },
    ],
  },
  {
    slug: 'support',
    name: 'Support & Qualité',
    description: 'Support technique et suivi client à chaque étape de la mission.',
    members: [
      { name: 'FOFANA Ayouba', photo: '/images/e-qos-pruducts/ayouba.png' },
      { name: 'Souleymane Faya Leno', photo: '/images/e-qos-pruducts/leno.jpeg' },
      { name: 'Souleymane Kodjo', photo: '/images/e-qos-pruducts/kodjo.jpg' },
    ],
  },
];

const offices = [
  { city: 'Conakry', country: 'Guinée', note: 'Siège social' },
  { city: 'Afrique de l\'Ouest', country: 'Région', note: 'Expansion en cours' },
];

const AProposPage: React.FC = () => {
  usePageMeta({
    title: 'À propos | EQOS Africa',
    description: 'E-QOS, entreprise fondée à Conakry : recrutement et intérim pour les grands secteurs de Guinée, conseil et services numériques pour les organisations.',
  });

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">À propos d'E-QOS</span>
          <h1>Des équipes et des outils pour les organisations de Guinée</h1>
          <p>
            Fondée à Conakry, E-QOS réunit deux métiers : le recrutement et l'intérim pour les grands
            secteurs du pays, le conseil et les services numériques pour les organisations.
          </p>
        </div>
      </section>

      {/* Histoire et mission */}
      <section className="section">
        <div className="container">
          <div className={styles.storyLayout}>
            <div className="reveal">
              <h2>Notre histoire</h2>
              <p>
                E-QOS est née d'une conviction simple : les organisations guinéennes avancent quand elles
                disposent des bonnes compétences, au bon moment, et d'outils pensés pour leurs réalités.
                Pas de solutions copiées-collées depuis d'autres marchés, mais une approche construite à
                partir des contraintes et des opportunités du terrain.
              </p>
              <p>
                Depuis Conakry, E-QOS accompagne des entreprises, des institutions et des administrations :
                constitution d'équipes et intérim pour les mines, l'énergie, le BTP, la logistique et les
                services, conseil organisationnel, transformation digitale et cybersécurité. Avec une vision
                d'expansion sur toute l'Afrique de l'Ouest.
              </p>
            </div>
            <div className={`${styles.missionCard} reveal`}>
              <h3>Notre mission</h3>
              <p>
                Mettre les bonnes compétences au service des projets qui transforment la Guinée, et
                accompagner les organisations dans leur modernisation, avec rigueur et proximité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deux métiers */}
      <section className="section section-alt" aria-labelledby="metiers-title">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Ce que nous faisons</span>
            <h2 id="metiers-title">Deux métiers, un même engagement</h2>
          </header>
          <div className={styles.trades}>
            {serviceGroups.map((g, i) => (
              <div key={g.key} className={`${styles.trade} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <span className={styles.tradeNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.tradeTitle}>{g.title}</h3>
                <p className={styles.tradeIntro}>{g.intro}</p>
                <ul className={styles.tradeList}>
                  {g.items.map(s => (
                    <li key={s.to}>
                      <Link to={s.to} className={styles.tradeLink}>
                        <span>{s.title}</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terrain */}
      <section className="section" aria-labelledby="terrain-title">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Notre terrain</span>
            <h2 id="terrain-title">Un pays en pleine transformation</h2>
            <p>Les grands projets miniers, énergétiques et d'infrastructures appellent des compétences, sur site comme dans les bureaux.</p>
          </header>
          <ul className={styles.facts}>
            {facts.map((f, i) => (
              <li key={f.fact} className={`${styles.factItem} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <p className={styles.factText}>{f.fact}</p>
                <span className={styles.factSource}>Source : {f.source}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section section-alt" aria-labelledby="valeurs-title">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Valeurs</span>
            <h2 id="valeurs-title">Nos valeurs</h2>
          </header>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={v.title} className={`${styles.valueCard} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section" aria-labelledby="equipe-title">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Équipe</span>
            <h2 id="equipe-title">Notre équipe</h2>
            <p>Une équipe pluridisciplinaire basée à Conakry, entre recrutement, conseil et technologie.</p>
          </header>
          <div className={styles.teamGroupGrid}>
            {teams.map((team) => (
              <Link key={team.slug} to={`/equipe/${team.slug}`} className={styles.teamGroupCard}>
                <div className={styles.teamGroupBody}>
                  <h3 className={styles.teamGroupName}>{team.name}</h3>
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
                          loading="lazy"
                          decoding="async"
                          width={32}
                          height={32}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ))}
                      <span className={styles.memberCount}>{team.members.length} membres</span>
                    </div>
                    <span className={styles.teamGroupCta}>
                      Découvrir <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Présence */}
      <section className="section section-alt" aria-labelledby="presence-title">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Présence</span>
            <h2 id="presence-title">Notre présence</h2>
          </header>
          <div className={styles.officesGrid}>
            {offices.map((o) => (
              <div key={o.city} className={styles.officeCard}>
                <h3 className={styles.officeCity}>{o.city}</h3>
                <p className={styles.officeCountry}>{o.country}</p>
                <span className={styles.officeNote}>{o.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="cta-band">
        <div className="container">
          <h2>Travaillons ensemble</h2>
          <p>Une équipe à constituer, un poste clé à pourvoir ou un projet de transformation : parlons-en.</p>
          <div className={styles.ctaRow}>
            <Link to={DEMANDE_PATH} className="btn btn-primary btn-lg">
              Constituer une équipe <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="arrow-link">
              Nous écrire <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AProposPage;
