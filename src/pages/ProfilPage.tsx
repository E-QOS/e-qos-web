import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Lock, Camera, Save, CheckCircle, AlertCircle, Loader2,
  LogOut, Eye, EyeOff, Link2, Globe, Phone, MapPin, Briefcase, Star,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, updatePassword, uploadAvatar } from '../lib/supabase';
import { usePageMeta } from '../hooks/usePageMeta';
import type { ExperienceLevel } from '../types/database';
import styles from './ProfilPage.module.css';

const EXPERIENCE_LEVELS: ExperienceLevel[] = ['Junior', 'Confirmé', 'Senior', 'Expert'];

const DOMAINS = [
  'Tech & Développement',
  'Conseil & ERP',
  'Cybersécurité',
  'Paiements & Fintech',
  'Management & Conseil',
  'Marketing & Business',
  'Support & Qualité',
  'Autre',
];

const ERR_GENERIC = 'Une erreur est survenue. Veuillez réessayer.';

const ProfilPage: React.FC = () => {
  usePageMeta({ title: 'Mon profil — EQOS' });

  const { user, profile, loading: authLoading, refreshProfile, openAuthModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      openAuthModal('signin');
      navigate('/', { replace: true });
    }
  }, [authLoading, user, openAuthModal, navigate]);

  /* ─── Derive display values ─── */
  const meta      = user?.user_metadata ?? {};
  const initName  = profile?.full_name ?? meta.full_name ?? '';
  const avatarUrl = profile?.avatar_url ?? null;

  const initials = initName
    ? initName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?';

  /* ─── Identity form ─── */
  const [fullName, setFullName] = useState(initName);
  const [phone,    setPhone]    = useState(profile?.phone ?? '');
  const [location, setLocation] = useState(profile?.location ?? '');

  /* ─── Bio form ─── */
  const [bio, setBio] = useState(profile?.bio ?? '');

  /* ─── Professional profile form ─── */
  const [jobTitle,    setJobTitle]    = useState(profile?.job_title ?? '');
  const [domain,      setDomain]      = useState(profile?.domain ?? '');
  const [expLevel,    setExpLevel]    = useState<ExperienceLevel | ''>(profile?.experience_level ?? '');
  const [skills,      setSkills]      = useState<string[]>(profile?.skills ?? []);
  const [skillInput,  setSkillInput]  = useState('');

  /* ─── Links form ─── */
  const [linkedin,  setLinkedin]  = useState(profile?.linkedin_url ?? '');
  const [portfolio, setPortfolio] = useState(profile?.portfolio_url ?? '');

  /* ─── Sync when profile loads async ─── */
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '');
      setPhone(profile.phone ?? '');
      setLocation(profile.location ?? '');
      setBio(profile.bio ?? '');
      setJobTitle(profile.job_title ?? '');
      setDomain(profile.domain ?? '');
      setExpLevel(profile.experience_level ?? '');
      setSkills(profile.skills ?? []);
      setLinkedin(profile.linkedin_url ?? '');
      setPortfolio(profile.portfolio_url ?? '');
    }
  }, [profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── Save states ─── */
  const [identitySaving, setIdentitySaving] = useState(false);
  const [identityMsg,    setIdentityMsg]    = useState<{ ok: boolean; text: string } | null>(null);
  const [proSaving,      setProSaving]      = useState(false);
  const [proMsg,         setProMsg]         = useState<{ ok: boolean; text: string } | null>(null);
  const [linksSaving,    setLinksSaving]    = useState(false);
  const [linksMsg,       setLinksMsg]       = useState<{ ok: boolean; text: string } | null>(null);

  /* ─── Password form ─── */
  const [newPw,    setNewPw]    = useState('');
  const [confirmPw,setConfirmPw]= useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg,    setPwMsg]    = useState<{ ok: boolean; text: string } | null>(null);

  /* ─── Avatar ─── */
  const [avatarUploading, setAvatarUploading] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  /* ─── Guard ─── */
  if (authLoading) {
    return (
      <div className={styles.centerLoader}>
        <Loader2 size={32} className={styles.spin} />
      </div>
    );
  }
  if (!user) return null;

  /* ─── Skills helpers ─── */
  const addSkill = (val: string) => {
    const s = val.trim();
    if (s && !skills.includes(s) && skills.length < 20) {
      setSkills(prev => [...prev, s]);
    }
    setSkillInput('');
  };

  const handleSkillKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(skillInput); }
    if (e.key === 'Backspace' && skillInput === '' && skills.length > 0) {
      setSkills(prev => prev.slice(0, -1));
    }
  };

  /* ─── Handlers ─── */
  const saveIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) { setIdentityMsg({ ok: false, text: 'Le nom est requis.' }); return; }
    setIdentitySaving(true); setIdentityMsg(null);
    try {
      await updateProfile(user.id, user.email ?? '', {
        full_name: fullName.trim(),
        phone:    phone.trim() || null,
        location: location.trim() || null,
      });
      await refreshProfile();
      setIdentityMsg({ ok: true, text: 'Informations enregistrées.' });
    } catch { setIdentityMsg({ ok: false, text: ERR_GENERIC }); }
    finally { setIdentitySaving(false); }
  };

  const savePro = async (e: React.FormEvent) => {
    e.preventDefault();
    setProSaving(true); setProMsg(null);
    try {
      await updateProfile(user.id, user.email ?? '', {
        bio:              bio.trim() || null as unknown as undefined,
        job_title:        jobTitle.trim() || null as unknown as undefined,
        domain:           domain || null as unknown as undefined,
        experience_level: expLevel || null,
        skills:           skills.length ? skills : null as unknown as undefined,
      });
      await refreshProfile();
      setProMsg({ ok: true, text: 'Profil professionnel enregistré.' });
    } catch { setProMsg({ ok: false, text: ERR_GENERIC }); }
    finally { setProSaving(false); }
  };

  const saveLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinksSaving(true); setLinksMsg(null);
    try {
      await updateProfile(user.id, user.email ?? '', {
        linkedin_url:  linkedin.trim() || null,
        portfolio_url: portfolio.trim() || null,
      });
      await refreshProfile();
      setLinksMsg({ ok: true, text: 'Liens mis à jour.' });
    } catch { setLinksMsg({ ok: false, text: ERR_GENERIC }); }
    finally { setLinksSaving(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (newPw.length < 8) { setPwMsg({ ok: false, text: 'Le mot de passe doit contenir au moins 8 caractères.' }); return; }
    if (newPw !== confirmPw) { setPwMsg({ ok: false, text: 'Les mots de passe ne correspondent pas.' }); return; }
    setPwSaving(true);
    try {
      await updatePassword(newPw);
      setPwMsg({ ok: true, text: 'Mot de passe modifié avec succès.' });
      setNewPw(''); setConfirmPw('');
    } catch { setPwMsg({ ok: false, text: ERR_GENERIC }); }
    finally { setPwSaving(false); }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    setAvatarUploading(true);
    try {
      const url = await uploadAvatar(user.id, file);
      await updateProfile(user.id, user.email ?? '', { avatar_url: url });
      await refreshProfile();
    } catch { /* silent */ }
    finally { setAvatarUploading(false); }
  };

  /* ─── Render ─── */
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ══ HERO ══ */}
        <div className={styles.heroCard}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {avatarUrl
                ? <img src={avatarUrl} alt={initName} className={styles.avatarImg} />
                : <span className={styles.avatarInitials}>{initials}</span>
              }
              {avatarUploading && (
                <div className={styles.avatarLoader}>
                  <Loader2 size={20} className={styles.spin} />
                </div>
              )}
            </div>
            <button
              className={styles.avatarEditBtn}
              onClick={() => avatarRef.current?.click()}
              title="Changer la photo"
              disabled={avatarUploading}
            >
              <Camera size={14} />
            </button>
            <input
              ref={avatarRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className={styles.heroInfo}>
            <h1 className={styles.heroName}>{initName || user.email}</h1>
            {profile?.job_title && (
              <p className={styles.heroJobTitle}>{profile.job_title}</p>
            )}
            <p className={styles.heroEmail}>{user.email}</p>
            <div className={styles.heroBadges}>
              {profile?.domain && (
                <span className={styles.domainBadge}><Briefcase size={11} /> {profile.domain}</span>
              )}
              {profile?.experience_level && (
                <span className={styles.expBadge}><Star size={11} /> {profile.experience_level}</span>
              )}
              {profile?.location && (
                <span className={styles.locationBadge}><MapPin size={11} /> {profile.location}</span>
              )}
            </div>
            {profile?.skills && profile.skills.length > 0 && (
              <div className={styles.heroSkills}>
                {profile.skills.slice(0, 6).map(s => (
                  <span key={s} className={styles.skillPill}>{s}</span>
                ))}
                {profile.skills.length > 6 && (
                  <span className={styles.skillPillMore}>+{profile.skills.length - 6}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ══ IDENTITY ══ */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <User size={18} />
            <h2>Mon identité</h2>
          </div>
          <form className={styles.cardBody} onSubmit={saveIdentity}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="pf-name">Nom complet</label>
                <div className={styles.inputWrap}>
                  <User size={15} className={styles.inputIcon} />
                  <input id="pf-name" type="text" placeholder="Prénom Nom" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="pf-email">Adresse email</label>
                <div className={styles.inputWrap}>
                  <Mail size={15} className={styles.inputIcon} />
                  <input id="pf-email" type="email" value={user.email ?? ''} readOnly className={styles.inputReadOnly} />
                </div>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="pf-phone">Téléphone</label>
                <div className={styles.inputWrap}>
                  <Phone size={15} className={styles.inputIcon} />
                  <input id="pf-phone" type="tel" placeholder="+224 600 000 000" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="pf-loc">Localisation</label>
                <div className={styles.inputWrap}>
                  <MapPin size={15} className={styles.inputIcon} />
                  <input id="pf-loc" type="text" placeholder="Conakry, Guinée" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>
            </div>
            {identityMsg && <Feedback ok={identityMsg.ok} text={identityMsg.text} />}
            <div className={styles.cardFooter}>
              <SaveButton loading={identitySaving} label="Enregistrer" />
            </div>
          </form>
        </div>

        {/* ══ PROFESSIONAL PROFILE ══ */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Briefcase size={18} />
            <h2>Profil professionnel</h2>
          </div>
          <form className={styles.cardBody} onSubmit={savePro}>
            <div className={styles.field}>
              <label htmlFor="pf-bio">Présentation</label>
              <textarea
                id="pf-bio"
                className={styles.textarea}
                placeholder="Décrivez votre parcours, vos motivations et ce que vous recherchez…"
                rows={4}
                value={bio}
                onChange={e => setBio(e.target.value)}
                maxLength={600}
              />
              <p className={styles.fieldHint}>{bio.length}/600 caractères</p>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="pf-jobtitle">Métier recherché</label>
                <div className={styles.inputWrap}>
                  <Briefcase size={15} className={styles.inputIcon} />
                  <input id="pf-jobtitle" type="text" placeholder="ex. Développeur Full-Stack" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="pf-domain">Domaine d'expertise</label>
                <div className={styles.inputWrap}>
                  <div className={styles.inputIcon}><Briefcase size={15} /></div>
                  <select id="pf-domain" className={styles.select} value={domain} onChange={e => setDomain(e.target.value)}>
                    <option value="">Sélectionner…</option>
                    {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label>Niveau d'expérience</label>
              <div className={styles.levelGroup}>
                {EXPERIENCE_LEVELS.map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    className={`${styles.levelBtn} ${expLevel === lvl ? styles.levelBtnActive : ''}`}
                    onClick={() => setExpLevel(prev => prev === lvl ? '' : lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Compétences</label>
              <div className={styles.skillsBox}>
                {skills.map(s => (
                  <span key={s} className={styles.skillTag}>
                    {s}
                    <button type="button" className={styles.skillRemove} onClick={() => setSkills(prev => prev.filter(x => x !== s))}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
                {skills.length < 20 && (
                  <input
                    className={styles.skillInput}
                    type="text"
                    placeholder={skills.length === 0 ? 'Ajouter une compétence…' : '+ Ajouter'}
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKey}
                    onBlur={() => skillInput.trim() && addSkill(skillInput)}
                  />
                )}
              </div>
              <p className={styles.fieldHint}>Appuyez sur Entrée ou virgule pour ajouter. Max 20 compétences.</p>
            </div>

            {proMsg && <Feedback ok={proMsg.ok} text={proMsg.text} />}
            <div className={styles.cardFooter}>
              <SaveButton loading={proSaving} label="Enregistrer le profil" />
            </div>
          </form>
        </div>

        {/* ══ LINKS ══ */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Globe size={18} />
            <h2>Liens professionnels</h2>
          </div>
          <form className={styles.cardBody} onSubmit={saveLinks}>
            <div className={styles.field}>
              <label htmlFor="pf-linkedin">LinkedIn</label>
              <div className={styles.inputWrap}>
                <Link2 size={15} className={styles.inputIcon} />
                <input id="pf-linkedin" type="url" placeholder="https://linkedin.com/in/votre-profil" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="pf-portfolio">Portfolio / Site web</label>
              <div className={styles.inputWrap}>
                <Globe size={15} className={styles.inputIcon} />
                <input id="pf-portfolio" type="url" placeholder="https://votre-site.com" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
              </div>
            </div>
            {linksMsg && <Feedback ok={linksMsg.ok} text={linksMsg.text} />}
            <div className={styles.cardFooter}>
              <SaveButton loading={linksSaving} label="Enregistrer" />
            </div>
          </form>
        </div>

        {/* ══ SECURITY ══ */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Lock size={18} />
            <h2>Sécurité</h2>
          </div>
          <form className={styles.cardBody} onSubmit={handleChangePassword}>
            <div className={styles.field}>
              <label htmlFor="pw-new">Nouveau mot de passe</label>
              <div className={styles.inputWrap}>
                <Lock size={15} className={styles.inputIcon} />
                <input
                  id="pw-new"
                  type={showPw ? 'text' : 'password'}
                  placeholder="8 caractères minimum"
                  value={newPw}
                  onChange={e => setNewPw(e.target.value)}
                  autoComplete="new-password"
                />
                <button type="button" className={styles.pwToggle} onClick={() => setShowPw(v => !v)} tabIndex={-1}>
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {newPw.length > 0 && (
                <div className={styles.strengthBar}>
                  <div className={styles.strengthFill} style={{
                    width: `${Math.min(100, (newPw.length / 12) * 100)}%`,
                    background: newPw.length < 8 ? '#f87171' : newPw.length < 12 ? '#fbbf24' : '#00e5a0',
                  }} />
                </div>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="pw-confirm">Confirmer le mot de passe</label>
              <div className={styles.inputWrap}>
                <Lock size={15} className={styles.inputIcon} />
                <input
                  id="pw-confirm"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPw}
                  onChange={e => setConfirmPw(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              {confirmPw && newPw !== confirmPw && (
                <p className={styles.fieldError}>Les mots de passe ne correspondent pas.</p>
              )}
            </div>
            {pwMsg && <Feedback ok={pwMsg.ok} text={pwMsg.text} />}
            <div className={styles.cardFooter}>
              <button type="submit" className={styles.saveBtn} disabled={pwSaving || !newPw || !confirmPw}>
                {pwSaving
                  ? <><Loader2 size={15} className={styles.spin} /> Modification…</>
                  : <><Lock size={15} /> Changer le mot de passe</>}
              </button>
            </div>
          </form>
        </div>

        {/* ══ SESSION ══ */}
        <div className={`${styles.card} ${styles.cardDanger}`}>
          <div className={styles.cardHeader}>
            <LogOut size={18} />
            <h2>Session</h2>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.dangerText}>
              Connecté en tant que <strong>{user.email}</strong>.{' '}
              La déconnexion mettra fin à votre session sur cet appareil.
            </p>
            <button
              className={styles.logoutBtn}
              onClick={async () => {
                const { signOut } = await import('../lib/supabase');
                await signOut();
                navigate('/');
              }}
            >
              <LogOut size={15} /> Se déconnecter
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─── Small helpers ─── */

const Feedback: React.FC<{ ok: boolean; text: string }> = ({ ok, text }) => (
  <div className={`${styles.msg} ${ok ? styles.msgOk : styles.msgErr}`}>
    {ok ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
    {text}
  </div>
);

const SaveButton: React.FC<{ loading: boolean; label: string }> = ({ loading, label }) => (
  <button type="submit" className={styles.saveBtn} disabled={loading}>
    {loading
      ? <><Loader2 size={15} className={styles.spin} /> Enregistrement…</>
      : <><Save size={15} /> {label}</>}
  </button>
);

export default ProfilPage;
