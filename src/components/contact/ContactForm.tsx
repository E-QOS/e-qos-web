import React, { useState } from 'react';
import { BESOIN_SUBJECT, PROFIL_SUBJECT } from '../../data/recrutement';
import styles from './ContactForm.module.css';

export const subjects = [
  BESOIN_SUBJECT,
  PROFIL_SUBJECT,
  'Transformation digitale',
  'Conseil organisationnel',
  'Cybersécurité',
  'Support informatique',
  'Management & Consulting',
  'Interim Management',
  'Solution Wali',
  'Solution Wandi',
  'Solution Makiti',
  'Autre',
];

type Status = 'idle' | 'loading' | 'success' | 'error';
type Fields = 'nom' | 'prenom' | 'email' | 'telephone' | 'organisation' | 'objet' | 'message';
type FormState = Record<Fields, string>;

const empty: FormState = { nom: '', prenom: '', email: '', telephone: '', organisation: '', objet: '', message: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): Partial<Record<Fields, string>> {
  const errors: Partial<Record<Fields, string>> = {};
  if (!form.nom.trim()) errors.nom = 'Veuillez indiquer votre nom.';
  if (!form.prenom.trim()) errors.prenom = 'Veuillez indiquer votre prénom.';
  if (!form.email.trim()) errors.email = 'Veuillez indiquer votre adresse email.';
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Cette adresse email ne semble pas valide.';
  if (!form.objet) errors.objet = 'Veuillez choisir l\'objet de votre demande.';
  if (!form.message.trim()) errors.message = 'Veuillez décrire votre projet.';
  return errors;
}

/** Formulaire de contact. Envoi vers /api/contact/send (e-qos-web-backend), traitement inchangé. */
export const ContactForm: React.FC<{ defaultSubject?: string }> = ({ defaultSubject }) => {
  const initial: FormState = { ...empty, objet: defaultSubject && subjects.includes(defaultSubject) ? defaultSubject : '' };
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as Fields;
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('loading');
    try {
      // Correspondance avec les champs attendus par le backend
      const payload = {
        name: `${form.prenom} ${form.nom}`.trim(),
        email: form.email,
        subject: form.objet || 'Demande de contact',
        message: [
          form.organisation ? `Organisation : ${form.organisation}` : '',
          form.telephone ? `Téléphone : ${form.telephone}` : '',
          '',
          form.message,
        ].filter(Boolean).join('\n'),
      };

      const res = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        setForm(initial);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <h3>Message envoyé</h3>
        <p>Merci pour votre message. Notre équipe prendra contact avec vous dans les 48 heures.</p>
      </div>
    );
  }

  const field = (name: Fields, label: string, input: React.ReactNode, wide = false) => (
    <div className={`${styles.field} ${wide ? styles.wide : ''} ${errors[name] ? styles.invalid : ''}`}>
      <label htmlFor={`contact-${name}`}>{label}</label>
      {input}
      {errors[name] && <p id={`contact-${name}-error`} className={styles.fieldError}>{errors[name]}</p>}
    </div>
  );

  const aria = (name: Fields) => ({
    id: `contact-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'}>
      {field('nom', 'Nom *', <input type="text" required autoComplete="family-name" {...aria('nom')} />)}
      {field('prenom', 'Prénom *', <input type="text" required autoComplete="given-name" {...aria('prenom')} />)}
      {field('email', 'Email *', <input type="email" required autoComplete="email" {...aria('email')} />)}
      {field('telephone', 'Téléphone', <input type="tel" autoComplete="tel" {...aria('telephone')} />)}
      {field('organisation', 'Organisation', <input type="text" autoComplete="organization" {...aria('organisation')} />, true)}
      {field('objet', 'Objet de votre demande *', (
        <select required {...aria('objet')}>
          <option value="">Sélectionner...</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      ), true)}
      {field('message', 'Décrivez votre projet *', (
        <textarea rows={5} required placeholder="Décrivez votre contexte, vos besoins, vos contraintes..." {...aria('message')} />
      ), true)}

      {status === 'error' && (
        <p className={styles.formError} role="alert">
          Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
        </p>
      )}

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
          {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </button>
        <span className={styles.required}>* Champs obligatoires</span>
      </div>
    </form>
  );
};

export default ContactForm;
