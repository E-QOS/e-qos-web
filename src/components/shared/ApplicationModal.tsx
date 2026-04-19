import React, { useState, useRef } from 'react';
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
      <div className={styles.modal} role="dialog" aria-modal="true">

        {success ? (
          <div className={styles.success}>
            <CheckCircle size={56} className={styles.successIcon} />
            <h3>Candidature envoyée !</h3>
            <p>
              Merci <strong>{fullName}</strong>, votre candidature a bien été reçue.
              Nous reviendrons vers vous dans les meilleurs délais.
            </p>
            <button className={styles.submitBtn} onClick={onClose}>Fermer</button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.headerText}>
                <h2>{job ? `Postuler — ${job.title}` : 'Candidature spontanée'}</h2>
                <p>Tous les champs marqués <span style={{ color: '#00e5a0' }}>*</span> sont obligatoires.</p>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
                <X size={20} />
              </button>
            </div>

            <form className={styles.body} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Nom complet <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="Mamadou Diallo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Email <span className={styles.required}>*</span></label>
                  <input
                    type="email"
                    placeholder="mamadou@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label>Téléphone</label>
                <input
                  type="tel"
                  placeholder="+224 6XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Message de motivation</label>
                <textarea
                  placeholder="Présentez-vous brièvement et expliquez pourquoi ce poste vous intéresse..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className={styles.field}>
                <label>CV (PDF ou Word, max 10 Mo)</label>
                <label className={styles.cvLabel} htmlFor="cv-upload">
                  <Upload size={16} />
                  {cvFile ? cvFile.name : 'Cliquez pour joindre votre CV'}
                </label>
                <input
                  id="cv-upload"
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  style={{ display: 'none' }}
                />
                {cvFile && (
                  <span className={styles.cvSelected}>
                    <CheckCircle size={12} /> {cvFile.name}
                  </span>
                )}
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <Loader2 size={18} className="spin" /> : <Send size={16} />}
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
