import React, { useState } from 'react';
import {
  MapPin, Clock, Briefcase, ArrowRight, Search, Users,
  TrendingUp, Database, Shield, Wrench, CreditCard, BarChart2,
  Layers, HeadphonesIcon, Loader2, AlertTriangle,
} from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJobs } from '../hooks/useJobs';
import ApplicationModal from '../components/shared/ApplicationModal';
import type { Job, ContractType, JobDomain, JobLocation } from '../types/database';
import styles from './OffresEmploiPage.module.css';

/* ─── Helpers ─── */

const contratConfig: Record<ContractType, { bg: string; color: string; label: string }> = {
  CDI:     { bg: 'rgba(0,229,160,0.12)',  color: '#00E5A0', label: 'CDI' },
  Stage:   { bg: 'rgba(0,200,255,0.12)',  color: '#00C8FF', label: 'Stage' },
  Interim: { bg: 'rgba(255,90,31,0.12)',  color: '#FF5A1F', label: 'Intérim' },
};

const domainIcon: Record<JobDomain, React.ReactNode> = {
  'Tech & Dev':            <Layers size={20} />,
  'Conseil & ERP':         <Database size={20} />,
  'Cybersécurité':         <Shield size={20} />,
  'Paiements & Fintech':   <CreditCard size={20} />,
  'Management & Conseil':  <Users size={20} />,
  'Marketing & Business':  <BarChart2 size={20} />,
  'Support & Qualité':     <Wrench size={20} />,
};

const CONTRATS: ContractType[] = ['CDI', 'Stage', 'Interim'];
const LIEUX: JobLocation[] = ['Conakry', 'Remote'];
const DOMAINES: JobDomain[] = [
  'Tech & Dev', 'Conseil & ERP', 'Cybersécurité', 'Paiements & Fintech',
  'Management & Conseil', 'Marketing & Business', 'Support & Qualité',
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ─── Composant ─── */

const OffresEmploiPage: React.FC = () => {
  usePageMeta({
    title: 'Carrières — Rejoignez EQOS en Guinée',
    description:
      'Offres d\'emploi CDI, stage et intérim en Guinée. Développeurs, consultants Odoo, experts cybersécurité, profils en intérim management : bâtissez la transformation digitale guinéenne avec EQOS.',
  });

  const { jobs, loading, error } = useJobs();

  const [search, setSearch]   = useState('');
  const [contrat, setContrat] = useState<ContractType | 'Tous'>('Tous');
  const [lieu, setLieu]       = useState<JobLocation | 'Tous'>('Tous');
  const [domaine, setDomaine] = useState<JobDomain | 'Tous'>('Tous');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null | undefined>(undefined); // undefined = modal fermée

  const filtered = jobs.filter((o) => {
    if (contrat !== 'Tous' && o.contract_type !== contrat) return false;
    if (lieu    !== 'Tous' && o.location     !== lieu)    return false;
    if (domaine !== 'Tous' && o.domain       !== domaine) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (
        !o.title.toLowerCase().includes(q) &&
        !o.domain.toLowerCase().includes(q) &&
        !o.description.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  const toggle = (id: string) => setExpanded((p) => (p === id ? null : id));

  const resetFilters = () => {
    setContrat('Tous'); setLieu('Tous'); setDomaine('Tous'); setSearch('');
  };

  const hasFilter = contrat !== 'Tous' || lieu !== 'Tous' || domaine !== 'Tous' || !!search.trim();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Recrutement ouvert — Conakry, Guinée
            </div>
            <h1>Construisez l'avenir<br />digital de la Guinée</h1>
            <p>
              Rejoignez EQOS et participez à la transformation des entreprises guinéennes.
              CDI, stages et missions d'intérim — trouvez votre place dans notre équipe.
            </p>
            {!loading && !error && (
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <strong>{jobs.filter(o => o.contract_type === 'CDI').length}</strong>
                  <span>CDI ouverts</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <strong>{jobs.filter(o => o.contract_type === 'Interim').length}</strong>
                  <span>Missions intérim</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <strong>{jobs.filter(o => o.contract_type === 'Stage').length}</strong>
                  <span>Stages disponibles</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Filtres + offres ── */}
      <section className="section section-alt">
        <div className="container">

          {/* Barre de recherche + filtres */}
          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Rechercher un poste, domaine, compétence..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className={styles.filterGroups}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Contrat</span>
                <div className={styles.filterPills}>
                  <button className={`${styles.pill} ${contrat === 'Tous' ? styles.pillActive : ''}`} onClick={() => setContrat('Tous')}>Tous</button>
                  {CONTRATS.map((c) => (
                    <button key={c} className={`${styles.pill} ${contrat === c ? styles.pillActive : ''}`} onClick={() => setContrat(c)}>
                      <span className={styles.contratDot} style={{ background: contratConfig[c].color }} />
                      {contratConfig[c].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Lieu</span>
                <div className={styles.filterPills}>
                  <button className={`${styles.pill} ${lieu === 'Tous' ? styles.pillActive : ''}`} onClick={() => setLieu('Tous')}>Tous</button>
                  {LIEUX.map((l) => (
                    <button key={l} className={`${styles.pill} ${lieu === l ? styles.pillActive : ''}`} onClick={() => setLieu(l)}>{l}</button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Domaine</span>
                <div className={styles.filterPills}>
                  <button className={`${styles.pill} ${domaine === 'Tous' ? styles.pillActive : ''}`} onClick={() => setDomaine('Tous')}>Tous</button>
                  {DOMAINES.map((d) => (
                    <button key={d} className={`${styles.pill} ${domaine === d ? styles.pillActive : ''}`} onClick={() => setDomaine(d)}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className={styles.loadingState}>
              <Loader2 size={32} className={styles.loadingSpinner} />
              <p>Chargement des offres…</p>
            </div>
          )}

          {/* ── Erreur ── */}
          {error && !loading && (
            <div className={styles.errorState}>
              <AlertTriangle size={32} />
              <p>Impossible de charger les offres pour le moment.</p>
              <span>{error}</span>
            </div>
          )}

          {/* ── Résultats ── */}
          {!loading && !error && (
            <>
              <div className={styles.resultsHeader}>
                <p className={styles.resultsCount}>
                  {filtered.length} offre{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
                </p>
                {hasFilter && (
                  <button className={styles.resetBtn} onClick={resetFilters}>
                    Réinitialiser les filtres
                  </button>
                )}
              </div>

              {filtered.length > 0 ? (
                <div className={styles.offerList}>
                  {filtered.map((o) => {
                    const isOpen = expanded === o.id;
                    const cfg    = contratConfig[o.contract_type];
                    return (
                      <div key={o.id} className={`${styles.offerCard} ${isOpen ? styles.offerCardOpen : ''}`}>
                        <div
                          className={styles.offerHeader}
                          onClick={() => toggle(o.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && toggle(o.id)}
                        >
                          <div className={styles.offerMeta}>
                            <span className={styles.contratBadge} style={{ background: cfg.bg, color: cfg.color }}>
                              <Briefcase size={11} />
                              {cfg.label}
                            </span>
                            <span className={styles.domaineBadge}>{o.domain}</span>
                          </div>

                          <div className={styles.offerTitleRow}>
                            <span className={styles.offerIconWrap} style={{ color: cfg.color, borderColor: cfg.bg }}>
                              {domainIcon[o.domain]}
                            </span>
                            <h3 className={styles.offerTitle}>{o.title}</h3>
                          </div>

                          <div className={styles.offerInfo}>
                            <span className={styles.infoChip}><MapPin size={12} />{o.location}</span>
                            <span className={styles.infoChip}><Users size={12} />{o.experience}</span>
                            <span className={styles.infoChip}><Clock size={12} />Publié le {formatDate(o.published_at)}</span>
                            {o.deadline_at && (
                              <span className={`${styles.infoChip} ${styles.deadlineChip}`}>
                                Clôture le {formatDate(o.deadline_at)}
                              </span>
                            )}
                          </div>

                          <p className={styles.offerDesc}>{o.description}</p>

                          <button className={styles.toggleBtn} style={{ color: cfg.color }}>
                            {isOpen ? 'Voir moins' : 'Voir le détail'}
                            <span className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}>▾</span>
                          </button>
                        </div>

                        {isOpen && (
                          <div className={styles.offerDetail}>
                            <div className={styles.detailCols}>
                              <div>
                                <h4 className={styles.detailTitle}>Missions</h4>
                                <ul className={styles.detailList}>
                                  {o.missions.map((m, i) => <li key={i}>{m}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4 className={styles.detailTitle}>Profil recherché</h4>
                                <ul className={styles.detailList}>
                                  {o.required_profile.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                              </div>
                            </div>
                            <div className={styles.applyRow}>
                              <button
                                className="btn btn-primary"
                                onClick={(e) => { e.stopPropagation(); setApplyJob(o); }}
                              >
                                Postuler à cette offre
                                <ArrowRight size={15} />
                              </button>
                              <p className={styles.applyNote}>
                                Envoyez votre CV et lettre de motivation directement depuis ce site.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><Briefcase size={32} /></div>
                  <h3>Aucune offre ne correspond à vos critères</h3>
                  <p>Modifiez vos filtres ou revenez prochainement — de nouveaux postes sont publiés régulièrement.</p>
                  <button className="btn btn-primary" onClick={resetFilters}>Voir toutes les offres</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Pourquoi EQOS ── */}
      <section className="section">
        <div className="container">
          <div className={styles.whyGrid}>
            {[
              { icon: <TrendingUp size={22} />, title: 'Impact réel en Guinée', desc: "Vos projets touchent des secteurs clés : mines, télécoms, banques, secteur public. Vous voyez concrètement l'impact de votre travail sur l'économie guinéenne." },
              { icon: <Layers size={22} />, title: 'Technologies de pointe', desc: "React, Node.js, Odoo, AWS, cybersécurité — vous travaillez sur des stacks modernes dans un environnement qui valorise la montée en compétences." },
              { icon: <Users size={22} />, title: 'Équipe pluridisciplinaire', desc: "Consultants, développeurs, experts métier : une équipe diverse et soudée, avec une culture de partage et d'entraide au quotidien." },
              { icon: <BarChart2 size={22} />, title: 'Évolution rapide', desc: "EQOS grandit vite. Les profils engagés ont accès à des responsabilités élargies, des formations certifiantes et une progression accélérée." },
            ].map((item, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Candidature spontanée ── */}
      <section className="section section-alt">
        <div className="container">
          <div className={styles.spontaneCard}>
            <div className={styles.spontaneText}>
              <h2>Vous ne trouvez pas votre poste idéal ?</h2>
              <p>
                EQOS grandit rapidement en Guinée. Envoyez-nous votre candidature spontanée
                — nous conservons tous les profils sérieux pour nos prochains recrutements.
              </p>
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setApplyJob(null)}
            >
              Candidature spontanée
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Modal candidature ── */}
      {applyJob !== undefined && (
        <ApplicationModal job={applyJob} onClose={() => setApplyJob(undefined)} />
      )}
    </div>
  );
};

export default OffresEmploiPage;
