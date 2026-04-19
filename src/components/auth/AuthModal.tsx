import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Building2, ArrowRight, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { signIn, signUp, resetPassword } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AuthModal.module.css';

type ModalView = 'signin' | 'signup' | 'reset';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─── Sub-forms ─── */

function SignInForm({ onSwitch, onForgot, onSuccess }: {
  onSwitch: () => void;
  onForgot: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!EMAIL_RE.test(email)) { setError('Adresse email invalide.'); return; }
    if (!password)             { setError('Mot de passe requis.'); return; }

    setLoading(true);
    try {
      await signIn(email, password);
      onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur de connexion.';
      setError(
        msg.includes('Invalid login') || msg.includes('invalid_credentials')
          ? 'Email ou mot de passe incorrect.'
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {error && (
        <div className={styles.alert} role="alert">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="si-email">Email professionnel</label>
        <div className={styles.inputWrap}>
          <Mail size={16} className={styles.inputIcon} />
          <input
            id="si-email" type="email" autoComplete="email"
            placeholder="vous@entreprise.com"
            value={email} onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="si-password">Mot de passe</label>
          <button type="button" className={styles.forgotLink} onClick={onForgot}>
            Mot de passe oublié ?
          </button>
        </div>
        <div className={styles.inputWrap}>
          <Lock size={16} className={styles.inputIcon} />
          <input
            id="si-password" type={showPw ? 'text' : 'password'} autoComplete="current-password"
            placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="button" className={styles.pwToggle} onClick={() => setShowPw(v => !v)} tabIndex={-1}>
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? <><Loader size={15} className={styles.spin} /> Connexion...</> : <>Se connecter <ArrowRight size={15} /></>}
      </button>

      <p className={styles.switchText}>
        Pas encore de compte ?{' '}
        <button type="button" className={styles.switchLink} onClick={onSwitch}>
          Créer un compte
        </button>
      </p>
    </form>
  );
}

function SignUpForm({ onSwitch, onSuccess }: {
  onSwitch: () => void;
  onSuccess: () => void;
}) {
  const [fullName, setFullName]         = useState('');
  const [email, setEmail]               = useState('');
  const [company, setCompany]           = useState('');
  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');
  const [showPw, setShowPw]             = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState(false);

  const pwStrength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
    : 3;

  const strengthLabel = ['', 'Faible', 'Moyen', 'Fort', 'Très fort'][pwStrength];
  const strengthClass = [styles.s0, styles.s1, styles.s2, styles.s3, styles.s4][pwStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim())       { setError('Nom complet requis.'); return; }
    if (!EMAIL_RE.test(email))  { setError('Adresse email invalide.'); return; }
    if (password.length < 8)    { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    if (password !== confirm)   { setError('Les mots de passe ne correspondent pas.'); return; }
    if (!termsAccepted)         { setError('Vous devez accepter les conditions d\'utilisation pour continuer.'); return; }

    setLoading(true);
    try {
      await signUp(email, password, { full_name: fullName.trim(), company: company.trim() || undefined });
      setSuccess(true);
      setTimeout(onSuccess, 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de l'inscription.";
      setError(
        msg.includes('already registered') || msg.includes('already been registered')
          ? 'Un compte existe déjà avec cet email.'
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}><CheckCircle size={40} /></div>
        <h3>Compte créé !</h3>
        <p>Un email de confirmation vous a été envoyé à <strong>{email}</strong>. Vérifiez votre boîte de réception.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {error && (
        <div className={styles.alert} role="alert">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="su-name">Nom complet *</label>
          <div className={styles.inputWrap}>
            <User size={16} className={styles.inputIcon} />
            <input
              id="su-name" type="text" autoComplete="name"
              placeholder="Prénom Nom"
              value={fullName} onChange={e => setFullName(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="su-company">Entreprise</label>
          <div className={styles.inputWrap}>
            <Building2 size={16} className={styles.inputIcon} />
            <input
              id="su-company" type="text" autoComplete="organization"
              placeholder="Optionnel"
              value={company} onChange={e => setCompany(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="su-email">Email professionnel *</label>
        <div className={styles.inputWrap}>
          <Mail size={16} className={styles.inputIcon} />
          <input
            id="su-email" type="email" autoComplete="email"
            placeholder="vous@entreprise.com"
            value={email} onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="su-password">Mot de passe *</label>
        <div className={styles.inputWrap}>
          <Lock size={16} className={styles.inputIcon} />
          <input
            id="su-password" type={showPw ? 'text' : 'password'} autoComplete="new-password"
            placeholder="8 caractères minimum"
            value={password} onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="button" className={styles.pwToggle} onClick={() => setShowPw(v => !v)} tabIndex={-1}>
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {password.length > 0 && (
          <div className={styles.strengthBar}>
            <div className={`${styles.strengthFill} ${strengthClass}`} style={{ width: `${pwStrength * 25}%` }} />
          </div>
        )}
        {password.length > 0 && (
          <span className={`${styles.strengthLabel} ${strengthClass}`}>{strengthLabel}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="su-confirm">Confirmer le mot de passe *</label>
        <div className={styles.inputWrap}>
          <Lock size={16} className={styles.inputIcon} />
          <input
            id="su-confirm" type={showPw ? 'text' : 'password'} autoComplete="new-password"
            placeholder="••••••••"
            value={confirm} onChange={e => setConfirm(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <label className={styles.termsCheck}>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={e => setTermsAccepted(e.target.checked)}
          disabled={loading}
        />
        <span>
          J'accepte les{' '}
          <a href="/mentions-legales" target="_blank" rel="noopener noreferrer">conditions d'utilisation</a>{' '}
          et la{' '}
          <a href="/confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>
        </span>
      </label>

      <button type="submit" className={styles.submitBtn} disabled={loading || !termsAccepted}>
        {loading ? <><Loader size={15} className={styles.spin} /> Création...</> : <>Créer mon compte <ArrowRight size={15} /></>}
      </button>

      <p className={styles.switchText}>
        Déjà un compte ?{' '}
        <button type="button" className={styles.switchLink} onClick={onSwitch}>
          Se connecter
        </button>
      </p>
    </form>
  );
}

function ResetForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [sent, setSent]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!EMAIL_RE.test(email)) { setError('Adresse email invalide.'); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la demande.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}><Mail size={36} /></div>
        <h3>Email envoyé</h3>
        <p>Vérifiez votre boîte de réception et suivez le lien pour réinitialiser votre mot de passe.</p>
        <button type="button" className={styles.switchLink} onClick={onBack}>
          ← Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.resetIntro}>
        Saisissez l'adresse email associée à votre compte. Vous recevrez un lien pour créer un nouveau mot de passe.
      </p>
      {error && (
        <div className={styles.alert} role="alert">
          <AlertCircle size={15} /> {error}
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="reset-email">Email</label>
        <div className={styles.inputWrap}>
          <Mail size={16} className={styles.inputIcon} />
          <input
            id="reset-email" type="email" autoComplete="email"
            placeholder="vous@entreprise.com"
            value={email} onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? <><Loader size={15} className={styles.spin} /> Envoi...</> : 'Envoyer le lien'}
      </button>
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Retour à la connexion
      </button>
    </form>
  );
}

/* ─── Main Modal ─── */

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: 'signin' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialTab = 'signin', onClose }) => {
  const [view, setView] = useState<ModalView>(initialTab);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Sync with external tab changes
  useEffect(() => { if (isOpen) setView(initialTab); }, [isOpen, initialTab]);

  // Trap focus & close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={view === 'signin' ? 'Connexion' : view === 'signup' ? 'Créer un compte' : 'Réinitialiser le mot de passe'}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalLogo}>
            <span>E-Q<b>OS</b></span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        {/* Tabs (only signin/signup) */}
        {view !== 'reset' && (
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${view === 'signin' ? styles.tabActive : ''}`}
              onClick={() => setView('signin')}
            >Se connecter</button>
            <button
              className={`${styles.tab} ${view === 'signup' ? styles.tabActive : ''}`}
              onClick={() => setView('signup')}
            >Créer un compte</button>
          </div>
        )}

        {/* Title */}
        <div className={styles.modalTitle}>
          {view === 'signin' && <>
            <h2>Bon retour !</h2>
            <p>Accédez à votre espace personnel E-QOS.</p>
          </>}
          {view === 'signup' && <>
            <h2>Rejoignez E-QOS</h2>
            <p>Créez votre compte pour accéder à nos ressources exclusives.</p>
          </>}
          {view === 'reset' && <>
            <h2>Mot de passe oublié</h2>
          </>}
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {view === 'signin' && (
            <SignInForm
              onSwitch={() => setView('signup')}
              onForgot={() => setView('reset')}
              onSuccess={handleSuccess}
            />
          )}
          {view === 'signup' && (
            <SignUpForm
              onSwitch={() => setView('signin')}
              onSuccess={handleSuccess}
            />
          )}
          {view === 'reset' && (
            <ResetForm onBack={() => setView('signin')} />
          )}
        </div>
      </div>
    </div>
  );
};
