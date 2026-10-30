import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, CheckCircle, Loader2, Send } from 'lucide-react';
import { submitApplication } from '../../lib/supabase';
import type { Job } from '../../types/database';
import styles from './ApplicationModal.module.css';

interface Props {
  job: Job | null; // null = candidature spontanée
  onClose: () => void;
}

const ApplicationModal: React.FC<Props> = ({ job, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [message, setMessage]   = useState('');
  const [cvFile, setCvFile]     = useState<File | null>(null);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus initial, fermeture par Échap, défilement de la page bloqué
  useEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      setError('Le fichier ne doit pas dépasser 10 Mo.');
      return;
    }
    setError(null);
    setCvFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim()) {
      setError('Nom et email sont obligatoires.');
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setError('Adresse email invalide.');
      return;
    }

    setLoading(true);
    try {
      await submitApplication(
        {
          job_id: job?.id ?? null,
          job_title: job?.title ?? 'Candidature spontanée',
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          message: message.trim() || undefined,
        },
        cvFile ?? undefined,
      );

      // Notify backend to send confirmation email (fire-and-forget)
      const backendUrl = (import.meta.env.VITE_BACKEND_URL as string) || '';
      if (backendUrl) {
        fetch(`${backendUrl}/api/jobs/apply-notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: fullName.trim(),
            email: email.trim().toLowerCase(),
            job_title: job?.title ?? 'Candidature spontanée',
          }),
        }).catch(() => null);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="application-title" ref={dialogRef}>

        {success ? (
          <div className={styles.success}>
            <h3 id="application-title">Candidature envoyée</h3>
            <p>
              Merci <strong>{fullName}</strong>, votre candidature a bien été reçue.
              Nous reviendrons vers vous dans les meilleurs délais.
            </p>
            <button type="button" className={styles.submitBtn} onClick={onClose}>Fermer</button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.headerText}>
                <h2 id="application-title">{job ? `Postuler : ${job.title}` : 'Candidature spontanée'}</h2>
                <p>Tous les champs marqués * sont obligatoires.</p>
              </div>
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
                <X size={20} />
              </button>
            </div>

            <form className={styles.body} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="app-name">Nom complet <span className={styles.required}>*</span></label>
                  <input
                    id="app-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Mamadou Diallo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="app-email">Email <span className={styles.required}>*</span></label>
                  <input
                    id="app-email"
                    type="email"
                    autoComplete="email"
                    placeholder="mamadou@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="app-phone">Téléphone</label>
                <input
                  id="app-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+224 6XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="app-message">Message de motivation</label>
                <textarea
                  id="app-message"
                  placeholder="Présentez-vous brièvement et expliquez pourquoi ce poste vous intéresse..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>CV (PDF ou Word, max 10 Mo)</span>
                <label className={styles.cvLabel} htmlFor="cv-upload">
                  <Upload size={16} aria-hidden="true" />
                  {cvFile ? cvFile.name : 'Cliquez pour joindre votre CV'}
                </label>
                <input
                  id="cv-upload"
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="sr-only"
                />
                {cvFile && (
                  <span className={styles.cvSelected}>
                    <CheckCircle size={12} aria-hidden="true" /> {cvFile.name}
                  </span>
                )}
              </div>

              {error && <p className={styles.errorMsg} role="alert">{error}</p>}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <Loader2 size={18} className={styles.spin} aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
                {loading ? 'Envoi en cours…' : 'Envoyer ma candidature'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
