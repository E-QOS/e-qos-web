import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, ChevronDown } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJobs } from '../hooks/useJobs';
import ApplicationModal from '../components/shared/ApplicationModal';
import { sectors } from '../data/secteursGuinee';
import { RECRUTEMENT_PATH } from '../data/recrutement';
import type { Job, ContractType, JobDomain, JobLocation } from '../types/database';
import styles from './OffresEmploiPage.module.css';

/* ─── Helpers ─── */

const contratLabel: Record<ContractType, string> = {
  CDI: 'CDI',
  CDD: 'CDD',
  Stage: 'Stage',
  Alternance: 'Alternance',
  Interim: 'Intérim',
  Consultance: 'Consultance',
};

const CONTRATS: ContractType[] = ['CDI', 'CDD', 'Stage', 'Alternance', 'Interim', 'Consultance'];
const LIEUX: JobLocation[] = ['Conakry', 'Remote'];
const DOMAINES: JobDomain[] = [
  'Tech & Dev', 'Conseil & ERP', 'Cybersécurité', 'Paiements & Fintech',
  'Management & Conseil', 'Marketing & Business', 'Support & Qualité',
];

const whyPoints = [
  { title: 'Impact réel en Guinée', desc: "Vos projets touchent des secteurs clés : mines, télécoms, banques, secteur public. Vous voyez concrètement l'impact de votre travail sur l'économie guinéenne." },
  { title: 'Technologies de pointe', desc: "React, Node.js, AWS, cybersécurité : vous travaillez sur des stacks modernes dans un environnement qui valorise la montée en compétences." },
  { title: 'Équipe pluridisciplinaire', desc: "Consultants, développeurs, experts métier : une équipe diverse et soudée, avec une culture de partage et d'entraide au quotidien." },
  { title: 'Évolution rapide', desc: "EQOS grandit vite. Les profils engagés ont accès à des responsabilités élargies, des formations certifiantes et une progression accélérée." },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Groupe de filtres en onglets texte (boutons à bascule). */
function FilterGroup<T extends string>({ label, value, options, render, onChange }: {
  label: string;
  value: T | 'Tous';
  options: T[];
  render?: (o: T) => string;
  onChange: (v: T | 'Tous') => void;
}) {
  return (
    <div className={styles.filterGroup} role="group" aria-label={label}>
      <span className={styles.filterLabel}>{label}</span>
      <div className={styles.filterPills}>
        {(['Tous', ...options] as (T | 'Tous')[]).map((o) => (
          <button
            key={o}
            type="button"
            className={`${styles.pill} ${value === o ? styles.pillActive : ''}`}
            aria-pressed={value === o}
            onClick={() => onChange(o)}
          >
            {o === 'Tous' ? 'Tous' : render ? render(o as T) : o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Composant ─── */

const OffresEmploiPage: React.FC = () => {
  usePageMeta({
    title: 'Carrières — Rejoignez EQOS en Guinée',
    description:
      'Offres d\'emploi, missions d\'intérim et stages en Guinée : mines, énergie, BTP, logistique, services et numérique. Candidature en ligne avec CV.',
  });

  const { jobs, loading, error } = useJobs();
  const [params, setParams] = useSearchParams();

  const [search, setSearch]   = useState('');
  const [contrat, setContrat] = useState<ContractType | 'Tous'>('Tous');
  const [lieu, setLieu]       = useState<JobLocation | 'Tous'>('Tous');
  const [domaine, setDomaine] = useState<JobDomain | 'Tous'>('Tous');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null | undefined>(undefined); // undefined = modal fermée

  // /carrieres?candidature=spontanee ouvre directement la candidature spontanée
  useEffect(() => {
    if (params.get('candidature') === 'spontanee') {
      setApplyJob(null);
      params.delete('candidature');
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

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
      {/* ── En-tête ── */}
      <section className="page-hero">
        <div className="container">
          <span className="kicker">Carrières</span>
          <h1>Rejoignez les équipes des grands projets de Guinée</h1>
          <p>
            Mines, énergie, BTP, logistique, services et numérique : postes permanents, missions
            d'intérim et stages. Déposez votre profil, nous vous proposons les missions qui vous correspondent.
          </p>
          <div className={styles.heroCtas}>
            <button type="button" className="btn btn-primary" onClick={() => setApplyJob(null)}>
              Candidature spontanée
            </button>
            <a href="#offres" className="arrow-link">
              Voir les offres <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Secteurs qui recrutent ── */}
      <section className="section">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Secteurs</span>
            <h2>Les métiers que nous recherchons</h2>
          </header>
          <ul className={styles.sectorGrid}>
            {sectors.map((s, i) => (
              <li key={s.key} className={`${styles.sectorItem} reveal`} style={{ '--i': i % 3 } as React.CSSProperties}>
                <h3 className={styles.sectorName}>{s.name}</h3>
                <p className={styles.sectorProfiles}>{s.profiles.join(' · ')}</p>
              </li>
            ))}
          </ul>
          <p className={styles.sectorMore}>
            <Link to={RECRUTEMENT_PATH} className="arrow-link">
              Recrutement et intérim en détail <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* ── Filtres + offres ── */}
      <section className="section section-alt" id="offres" aria-labelledby="offres-title">
        <div className="container">
          <header className="section-header">
            <span className="kicker">Offres</span>
            <h2 id="offres-title">Offres en cours</h2>
          </header>

          <div className={styles.filterBar}>
            <label className={styles.searchWrapper}>
              <span className="sr-only">Rechercher une offre</span>
              <Search size={18} className={styles.searchIcon} aria-hidden="true" />
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Rechercher un poste, domaine, compétence..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <div className={styles.filterGroups}>
              <FilterGroup label="Contrat" value={contrat} options={CONTRATS} render={(c) => contratLabel[c]} onChange={setContrat} />
              <FilterGroup label="Lieu" value={lieu} options={LIEUX} onChange={setLieu} />
              <FilterGroup label="Domaine" value={domaine} options={DOMAINES} onChange={setDomaine} />
            </div>
          </div>

          {loading && (
            <p className={styles.stateMsg} role="status">Chargement des offres…</p>
          )}

          {error && !loading && (
            <div className={styles.stateMsg} role="alert">
              <p>Impossible de charger les offres pour le moment.</p>
              <button type="button" className="text-link" onClick={() => setApplyJob(null)}>
                Envoyer une candidature spontanée
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className={styles.resultsHeader}>
                <p className={styles.resultsCount} aria-live="polite">
                  {filtered.length} offre{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
                </p>
                {hasFilter && (
                  <button type="button" className={`${styles.resetBtn} text-link`} onClick={resetFilters}>
                    Réinitialiser les filtres
                  </button>
                )}
              </div>

              {filtered.length > 0 ? (
                <ul className={styles.offerList}>
                  {filtered.map((o) => {
                    const isOpen = expanded === o.id;
                    const detailId = `offre-${o.id}`;
                    return (
                      <li key={o.id} className={`${styles.offerCard} ${isOpen ? styles.offerCardOpen : ''}`}>
                        <div className={styles.offerHeader}>
                          <p className={styles.offerMeta}>
                            <span className={styles.contratBadge}>{contratLabel[o.contract_type] ?? o.contract_type}</span>
                            <span className={styles.domaineBadge}>{o.domain}</span>
                          </p>
                          <h3 className={styles.offerTitle}>{o.title}</h3>
                          <p className={styles.offerInfo}>
                            <span>{o.location}</span>
                            <span>{o.experience}</span>
                            <span>Publié le {formatDate(o.published_at)}</span>
                            {o.deadline_at && <span className={styles.deadlineChip}>Clôture le {formatDate(o.deadline_at)}</span>}
                          </p>
                          <p className={styles.offerDesc}>{o.description}</p>
                          <button
                            type="button"
                            className={styles.toggleBtn}
                            aria-expanded={isOpen}
                            aria-controls={detailId}
                            onClick={() => toggle(o.id)}
                          >
                            {isOpen ? 'Voir moins' : 'Voir le détail'}
                            <ChevronDown size={16} aria-hidden="true" className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`} />
                          </button>
                        </div>

                        {isOpen && (
                          <div className={styles.offerDetail} id={detailId}>
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

                            {(o.salary || (o.benefits && o.benefits.length > 0)) && (
                              <div className={styles.detailExtra}>
                                {o.salary && (
                                  <div className={styles.detailExtraItem}>
                                    <span className={styles.detailExtraLabel}>Salaire proposé</span>
                                    <span className={styles.detailExtraValue}>{o.salary}</span>
                                  </div>
                                )}
                                {o.benefits && o.benefits.length > 0 && (
                                  <div className={styles.detailExtraItem}>
                                    <span className={styles.detailExtraLabel}>Avantages</span>
                                    <ul className={styles.benefitsList}>
                                      {o.benefits.map((b, i) => <li key={i}>{b}</li>)}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            <div className={styles.applyRow}>
                              <button type="button" className="btn btn-primary" onClick={() => setApplyJob(o)}>
                                Postuler à cette offre
                                <ArrowRight size={15} aria-hidden="true" />
                              </button>
                              <p className={styles.applyNote}>
                                Envoyez votre CV et lettre de motivation directement depuis ce site.
                              </p>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className={styles.emptyState}>
                  <h3>Aucune offre ne correspond à vos critères</h3>
                  <p>Modifiez vos filtres ou revenez prochainement : de nouveaux postes sont publiés régulièrement.</p>
                  <button type="button" className="btn btn-outline" onClick={resetFilters}>Voir toutes les offres</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Pourquoi EQOS ── */}
      <section className="section">
        <div className="container">
          <header className="section-header reveal">
            <span className="kicker">Travailler chez E-QOS</span>
            <h2>Rejoindre l'équipe E-QOS</h2>
          </header>
          <ul className={styles.whyGrid}>
            {whyPoints.map((item, i) => (
              <li key={item.title} className={`${styles.whyCard} reveal`} style={{ '--i': i } as React.CSSProperties}>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Candidature spontanée ── */}
      <section className="cta-band">
        <div className="container">
          <div className={styles.spontaneCard}>
            <div className={styles.spontaneText}>
              <h2>Vous ne trouvez pas votre poste idéal ?</h2>
              <p>
                EQOS grandit rapidement en Guinée. Envoyez-nous votre candidature spontanée :
                nous conservons tous les profils sérieux pour nos prochains recrutements.
              </p>
            </div>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => setApplyJob(null)}>
              Candidature spontanée
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {applyJob !== undefined && (
        <ApplicationModal job={applyJob} onClose={() => setApplyJob(undefined)} />
      )}
    </div>
  );
};

export default OffresEmploiPage;
