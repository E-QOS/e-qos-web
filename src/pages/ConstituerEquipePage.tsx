import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus, X } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { sectors } from '../data/secteursGuinee';
import styles from './ConstituerEquipePage.module.css';

/* ─── Référentiels ─── */

const NEEDS = [
  { key: 'renfort', label: 'Renfort ponctuel', desc: 'Pic d\'activité, démarrage de chantier, remplacement' },
  { key: 'interim', label: 'Intérim', desc: 'Personnel mis à disposition pour une durée déterminée' },
  { key: 'talent', label: 'Recherche de talent', desc: 'Recrutement d\'un profil clé pour votre équipe' },
] as const;

const SITES = ['Conakry', 'Boké', 'Kamsar', 'Simandou', 'Siguiri', 'Kindia', 'Kankan', 'Labé', 'Nzérékoré', 'Fria'];
const STARTS = ['Dès que possible', 'Sous 2 semaines', 'Sous 1 mois', 'Dans 1 à 3 mois'];
const DURATIONS = ['Moins d\'1 mois', '1 à 3 mois', '3 à 6 mois', '6 à 12 mois', 'Plus de 12 mois', 'Poste permanent'];
const LEVELS = ['Opérateur', 'Technicien', 'Cadre ou expert'];

type NeedKey = typeof NEEDS[number]['key'];
interface Role { title: string; count: number }

interface Draft {
  need: NeedKey | '';
  sector: string;
  roles: Role[];
  level: string;
  site: string;
  start: string;
  duration: string;
  details: string;
  company: string;
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
}

const EMPTY: Draft = {
  need: '', sector: '', roles: [], level: '', site: '', start: '', duration: '', details: '',
  company: '', name: '', jobTitle: '', email: '', phone: '',
};

const STORAGE_KEY = 'eqos_demande_equipe';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS = ['Besoin', 'Postes', 'Mission', 'Envoi'];

function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function saveDraft(d: Draft | null) {
  try {
    if (d) localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* stockage indisponible : le parcours fonctionne sans */ }
}

const needLabel = (k: string) => NEEDS.find(n => n.key === k)?.label ?? '';
const sectorName = (k: string) => sectors.find(s => s.key === k)?.name ?? '';
const totalPeople = (roles: Role[]) => roles.reduce((n, r) => n + r.count, 0);

function makeReference() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `EQ-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/** Dossier en texte brut, envoyé aux agents par le relais email du backend. */
function buildDossier(d: Draft, ref: string) {
  const lines = [
    `Référence : ${ref}`,
    '',
    'BESOIN',
    `Type : ${needLabel(d.need)}`,
    `Secteur : ${sectorName(d.sector)}`,
    d.level ? `Niveau : ${d.level}` : '',
    '',
    `POSTES (${totalPeople(d.roles)} personne${totalPeople(d.roles) > 1 ? 's' : ''})`,
    ...d.roles.map(r => `- ${r.count} × ${r.title}`),
    '',
    'MISSION',
    `Lieu : ${d.site}`,
    `Démarrage : ${d.start}`,
    `Durée : ${d.duration}`,
    d.details ? `Précisions : ${d.details}` : '',
    '',
    'CONTACT',
    `Entreprise : ${d.company}`,
    `Nom : ${d.name}${d.jobTitle ? `, ${d.jobTitle}` : ''}`,
    `Email : ${d.email}`,
    `Téléphone : ${d.phone}`,
  ];
  return lines.filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
}

/* ─── Petits composants ─── */

function ChoiceGroup({ legend, name, options, value, onChange, columns = 3 }: {
  legend: string;
  name: string;
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.choices} style={{ '--cols': columns } as React.CSSProperties}>
        {options.map(o => (
          <label key={o.value} className={`${styles.choice} ${value === o.value ? styles.choiceOn : ''}`}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span className={styles.choiceLabel}>{o.label}</span>
            {o.desc && <span className={styles.choiceDesc}>{o.desc}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Chips({ legend, options, value, onChange }: {
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.chips}>
        {options.map(o => (
          <label key={o} className={`${styles.chip} ${value === o ? styles.chipOn : ''}`}>
            <input type="radio" name={legend} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ─── Page ─── */

type Status = 'idle' | 'sending' | 'sent' | 'error';

const ConstituerEquipePage: React.FC = () => {
  usePageMeta({
    title: 'Constituer une équipe | EQOS Africa',
    description: 'Décrivez votre besoin de renfort, d\'intérim ou de recrutement en quelques étapes : postes, lieu, démarrage. Le dossier est transmis directement à nos agents.',
  });

  const [params] = useSearchParams();
  const [d, setD] = useState<Draft>(() => {
    const draft = loadDraft();
    const s = params.get('secteur');
    const b = params.get('besoin');
    return {
      ...draft,
      sector: s && sectors.some(x => x.key === s) ? s : draft.sector,
      need: b && NEEDS.some(n => n.key === b) ? (b as NeedKey) : draft.need,
    };
  });
  const [step, setStep] = useState(0);
  const [customRole, setCustomRole] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [reference, setReference] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD(prev => ({ ...prev, [k]: v }));

  useEffect(() => { if (status !== 'sent') saveDraft(d); }, [d, status]);

  // À chaque étape, le focus va sur le titre (lecteurs d'écran) et la vue remonte
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [step, status]);

  const sector = useMemo(() => sectors.find(s => s.key === d.sector), [d.sector]);

  /* Postes */
  const addRole = (title: string) => {
    const t = title.trim();
    if (!t) return;
    setD(prev => prev.roles.some(r => r.title.toLowerCase() === t.toLowerCase())
      ? prev
      : { ...prev, roles: [...prev.roles, { title: t, count: 1 }] });
  };
  const changeCount = (i: number, delta: number) =>
    setD(prev => ({ ...prev, roles: prev.roles.map((r, j) => j === i ? { ...r, count: Math.min(500, Math.max(1, r.count + delta)) } : r) }));
  const setCount = (i: number, n: number) =>
    setD(prev => ({ ...prev, roles: prev.roles.map((r, j) => j === i ? { ...r, count: Math.min(500, Math.max(1, n || 1)) } : r) }));
  const removeRole = (i: number) => setD(prev => ({ ...prev, roles: prev.roles.filter((_, j) => j !== i) }));

  /* Validation par étape */
  const validate = (s: number): string[] => {
    const e: string[] = [];
    if (s === 0) {
      if (!d.need) e.push('Choisissez le type de besoin.');
      if (!d.sector) e.push('Choisissez le secteur.');
    }
    if (s === 1 && !d.roles.length) e.push('Ajoutez au moins un poste.');
    if (s === 2) {
      if (!d.site.trim()) e.push('Indiquez le lieu de la mission.');
      if (!d.start) e.push('Indiquez la date de démarrage souhaitée.');
      if (!d.duration) e.push('Indiquez la durée.');
    }
    if (s === 3) {
      if (!d.company.trim()) e.push('Indiquez le nom de votre entreprise ou institution.');
      if (d.name.trim().length < 2) e.push('Indiquez votre nom.');
      if (!EMAIL_RE.test(d.email.trim())) e.push('Indiquez une adresse email valide.');
      if (d.phone.replace(/\D/g, '').length < 8) e.push('Indiquez un numéro de téléphone joignable.');
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (!e.length) setStep(s => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => { setErrors([]); setStep(s => Math.max(s - 1, 0)); };
  const goTo = (s: number) => { setErrors([]); setStep(s); };

  const submit = async () => {
    const e = [0, 1, 2, 3].flatMap(validate);
    setErrors(e);
    if (e.length) return;

    const ref = makeReference();
    const n = totalPeople(d.roles);
    setStatus('sending');

    // 1. Enregistrement en base (console admin, rubrique Demandes d'équipe)
    let stored = false;
    try {
      const { submitTeamRequest } = await import('../lib/supabase');
      await submitTeamRequest({
        reference: ref,
        need: d.need as NeedKey,
        sector: sectorName(d.sector),
        roles: d.roles,
        headcount: n,
        level: d.level || null,
        site: d.site.trim(),
        start_window: d.start,
        duration: d.duration,
        details: d.details.trim() || null,
        company: d.company.trim(),
        contact_name: d.name.trim(),
        contact_title: d.jobTitle.trim() || null,
        email: d.email.trim().toLowerCase(),
        phone: d.phone.trim(),
      });
      stored = true;
    } catch { /* l'email aux agents reste la trace de la demande */ }

    // 2. Email aux agents et accusé de réception au client
    const post = (url: string, body: unknown) =>
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(r => r.ok)
        .catch(() => false);

    let notified = await post('/api/team-requests/notify', {
      reference: ref, need: d.need, sector: sectorName(d.sector), roles: d.roles, level: d.level,
      site: d.site, start: d.start, duration: d.duration, details: d.details,
      company: d.company, name: d.name, jobTitle: d.jobTitle, email: d.email, phone: d.phone, stored,
    });
    // Repli sur le relais de contact (backend pas encore mis à jour, par exemple)
    if (!notified) {
      notified = await post('/api/contact/send', {
        name: d.name.trim(),
        email: d.email.trim(),
        subject: `Demande d'équipe ${ref} : ${needLabel(d.need)}, ${sectorName(d.sector)}, ${n} personne${n > 1 ? 's' : ''}`.slice(0, 200),
        message: buildDossier(d, ref).slice(0, 5000),
      });
    }

    if (stored || notified) {
      setReference(ref);
      setStatus('sent');
      saveDraft(null);
    } else {
      setStatus('error');
    }
  };

  const mailtoFallback = () => {
    const ref = reference || makeReference();
    return `mailto:contact.eqos@gmail.com?subject=${encodeURIComponent(`Demande d'équipe ${ref}`)}&body=${encodeURIComponent(buildDossier(d, ref))}`;
  };

  /* ─── Confirmation ─── */
  if (status === 'sent') {
    return (
      <section className={styles.page}>
        <div className={`container ${styles.done}`}>
          <span className="kicker">Dossier transmis</span>
          <h1 ref={headingRef} tabIndex={-1} className={styles.doneTitle}>Votre demande est entre les mains de nos agents.</h1>
          <p className={styles.doneRef}>Référence <strong>{reference}</strong></p>
          <p>Un agent vous recontacte sous 48h au {d.phone} ou à {d.email} pour valider les profils et le calendrier.</p>
          <div className={styles.doneActions}>
            <button type="button" className="btn btn-outline" onClick={() => { setD(EMPTY); setStep(0); setStatus('idle'); }}>
              Nouvelle demande
            </button>
            <Link to="/" className="arrow-link">Retour à l'accueil <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Parcours ─── */
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.main}>
            <span className="kicker">Constituer une équipe</span>
            <ol className={styles.progress} aria-label="Étapes">
              {STEPS.map((s, i) => (
                <li key={s} className={`${styles.progressItem} ${i === step ? styles.progressCurrent : ''} ${i < step ? styles.progressDone : ''}`} aria-current={i === step ? 'step' : undefined}>
                  {i < step ? (
                    <button type="button" className={styles.progressBtn} onClick={() => goTo(i)}>
                      <span className={styles.progressNum}>{String(i + 1).padStart(2, '0')}</span>{s}
                    </button>
                  ) : (
                    <span className={styles.progressBtn}><span className={styles.progressNum}>{String(i + 1).padStart(2, '0')}</span>{s}</span>
                  )}
                </li>
              ))}
            </ol>

            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); if (step < 3) next(); else submit(); }} noValidate>
              {step === 0 && (
                <>
                  <h1 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>De quoi avez-vous besoin ?</h1>
                  <ChoiceGroup
                    legend="Type de besoin"
                    name="need"
                    value={d.need}
                    onChange={(v) => set('need', v as NeedKey)}
                    options={NEEDS.map(n => ({ value: n.key, label: n.label, desc: n.desc }))}
                  />
                  <ChoiceGroup
                    legend="Secteur"
                    name="sector"
                    value={d.sector}
                    onChange={(v) => set('sector', v)}
                    options={sectors.map(s => ({ value: s.key, label: s.name }))}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <h1 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>Quels postes faut-il pourvoir ?</h1>
                  {sector && (
                    <fieldset className={styles.fieldset}>
                      <legend className={styles.legend}>Postes fréquents, {sector.name.toLowerCase()}</legend>
                      <div className={styles.chips}>
                        {sector.profiles.map(p => {
                          const on = d.roles.some(r => r.title === p);
                          return (
                            <button
                              key={p}
                              type="button"
                              className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                              aria-pressed={on}
                              onClick={() => on ? removeRole(d.roles.findIndex(r => r.title === p)) : addRole(p)}
                            >
                              {on ? '✓ ' : '+ '}{p}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  <div className={styles.addRow}>
                    <label htmlFor="custom-role" className={styles.legend}>Autre poste</label>
                    <div className={styles.addField}>
                      <input
                        id="custom-role"
                        type="text"
                        placeholder="Ex. : Soudeur tuyauteur"
                        value={customRole}
                        onChange={(e) => setCustomRole(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRole(customRole); setCustomRole(''); } }}
                      />
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => { addRole(customRole); setCustomRole(''); }}>
                        Ajouter
                      </button>
                    </div>
                  </div>

                  {d.roles.length > 0 && (
                    <ul className={styles.roles} aria-label="Postes demandés">
                      {d.roles.map((r, i) => (
                        <li key={r.title} className={styles.role}>
                          <span className={styles.roleTitle}>{r.title}</span>
                          <div className={styles.stepper}>
                            <button type="button" onClick={() => changeCount(i, -1)} aria-label={`Une personne de moins, ${r.title}`} disabled={r.count <= 1}>
                              <Minus size={14} aria-hidden="true" />
                            </button>
                            <input
                              type="number"
                              inputMode="numeric"
                              min={1}
                              max={500}
                              value={r.count}
                              onChange={(e) => setCount(i, parseInt(e.target.value, 10))}
                              aria-label={`Nombre de personnes, ${r.title}`}
                            />
                            <button type="button" onClick={() => changeCount(i, 1)} aria-label={`Une personne de plus, ${r.title}`}>
                              <Plus size={14} aria-hidden="true" />
                            </button>
                          </div>
                          <button type="button" className={styles.roleRemove} onClick={() => removeRole(i)} aria-label={`Retirer ${r.title}`}>
                            <X size={16} aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Chips legend="Niveau attendu (facultatif)" options={LEVELS} value={d.level} onChange={(v) => set('level', v)} />
                </>
              )}

              {step === 2 && (
                <>
                  <h1 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>Où et quand ?</h1>
                  <div className={styles.field}>
                    <label htmlFor="site" className={styles.legend}>Lieu de la mission</label>
                    <input id="site" type="text" list="sites" placeholder="Ville, site ou projet" value={d.site} onChange={(e) => set('site', e.target.value)} />
                    <datalist id="sites">{SITES.map(s => <option key={s} value={s} />)}</datalist>
                    <div className={styles.quickSites}>
                      {SITES.slice(0, 6).map(s => (
                        <button key={s} type="button" className={`${styles.chip} ${d.site === s ? styles.chipOn : ''}`} aria-pressed={d.site === s} onClick={() => set('site', s)}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <Chips legend="Démarrage" options={STARTS} value={d.start} onChange={(v) => set('start', v)} />
                  <Chips legend="Durée" options={DURATIONS} value={d.duration} onChange={(v) => set('duration', v)} />
                  <div className={styles.field}>
                    <label htmlFor="details" className={styles.legend}>Précisions (facultatif)</label>
                    <textarea
                      id="details"
                      rows={3}
                      maxLength={1200}
                      placeholder="Habilitations, horaires, hébergement sur site, langues…"
                      value={d.details}
                      onChange={(e) => set('details', e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h1 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>Vos coordonnées</h1>
                  <div className={styles.grid2}>
                    <div className={`${styles.field} ${styles.full}`}>
                      <label htmlFor="company" className={styles.legend}>Entreprise ou institution</label>
                      <input id="company" type="text" autoComplete="organization" value={d.company} onChange={(e) => set('company', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="name" className={styles.legend}>Nom et prénom</label>
                      <input id="name" type="text" autoComplete="name" value={d.name} onChange={(e) => set('name', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="jobTitle" className={styles.legend}>Fonction (facultatif)</label>
                      <input id="jobTitle" type="text" autoComplete="organization-title" value={d.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.legend}>Email</label>
                      <input id="email" type="email" autoComplete="email" value={d.email} onChange={(e) => set('email', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="phone" className={styles.legend}>Téléphone</label>
                      <input id="phone" type="tel" autoComplete="tel" placeholder="+224 6XX XX XX XX" value={d.phone} onChange={(e) => set('phone', e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {errors.length > 0 && (
                <div className={styles.errors} role="alert">
                  {errors.map(e => <p key={e}>{e}</p>)}
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errors} role="alert">
                  <p>L'envoi n'a pas abouti. Réessayez, ou transmettez le dossier par email : il est déjà rédigé.</p>
                  <a href={mailtoFallback()} className="text-link">Envoyer le dossier par email</a>
                </div>
              )}

              <div className={styles.nav}>
                {step > 0 && (
                  <button type="button" className={styles.backBtn} onClick={back}>
                    <ArrowLeft size={16} aria-hidden="true" /> Retour
                  </button>
                )}
                {step < 3 ? (
                  <button type="submit" className="btn btn-primary btn-lg">
                    Continuer <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le dossier'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Récapitulatif toujours visible */}
          <aside className={`${styles.summary} ${step === 3 ? styles.summaryFinal : ''}`} aria-label="Récapitulatif de la demande">
            <h2 className={styles.summaryTitle}>Votre demande</h2>
            <dl>
              <div className={styles.sumRow}>
                <dt>Besoin</dt>
                <dd>{needLabel(d.need) || 'À préciser'}</dd>
              </div>
              <div className={styles.sumRow}>
                <dt>Secteur</dt>
                <dd>{sectorName(d.sector) || 'À préciser'}</dd>
              </div>
              <div className={styles.sumRow}>
                <dt>Postes</dt>
                <dd>
                  {d.roles.length
                    ? <ul>{d.roles.map(r => <li key={r.title}>{r.count} × {r.title}</li>)}</ul>
                    : 'À préciser'}
                </dd>
              </div>
              <div className={styles.sumRow}>
                <dt>Mission</dt>
                <dd>{[d.site, d.start, d.duration].filter(Boolean).join(' · ') || 'À préciser'}</dd>
              </div>
            </dl>
            {d.roles.length > 0 && (
              <p className={styles.sumTotal}>
                {totalPeople(d.roles)} personne{totalPeople(d.roles) > 1 ? 's' : ''} à mobiliser
              </p>
            )}
            <p className={styles.sumNote}>Votre saisie est conservée sur cet appareil jusqu'à l'envoi.</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ConstituerEquipePage;
