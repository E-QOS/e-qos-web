import React, { useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { MapPin, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './ContactPage.module.css';

const subjects = [
  'Transformation digitale',
  'Conseil organisationnel',
  'Implémentation Odoo',
  'Intégration paiements mobiles',
  'Cybersécurité',
  'Support informatique',
  'Management & Consulting',
  'Interim Management',
  'Solution Wali',
  'Solution Wandi',
  'Solution Makiti',
  'Autre',
];

const offices = [
  { city: 'Conakry', country: 'Guinée', role: 'Siège social', address: 'Conakry, République de Guinée' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    organisation: '', objet: '', message: ''
  });
  const [status, setStatus] = useState<Status>('idle');
  usePageMeta({ title: 'Contact — Parlez-nous de votre projet | EQOS Africa', description: 'Contactez EQOS pour une analyse gratuite de vos besoins en transformation digitale. Réponse sous 48h. Présent en Guinée.' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Map form fields to what the backend expects
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
        setForm({ nom: '', prenom: '', email: '', telephone: '', organisation: '', objet: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Contact</h1>
          <p>Parlez-nous de votre projet. Nous vous revenons avec une première analyse sous 48h.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className={styles.layout}>
            {/* Formulaire */}
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2>Analyse gratuite de vos besoins</h2>
                <p>Décrivez votre projet ou vos besoins. Nos experts analysent votre situation et vous proposent une première approche adaptée — gratuitement et sans engagement.</p>
              </div>

              {status === 'success' ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={40} />
                  <h3>Message envoyé</h3>
                  <p>Merci pour votre message. Notre équipe prendra contact avec vous dans les 48 heures.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="nom">Nom *</label>
                      <input id="nom" name="nom" type="text" value={form.nom} onChange={handleChange} required autoComplete="family-name" />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="prenom">Prénom *</label>
                      <input id="prenom" name="prenom" type="text" value={form.prenom} onChange={handleChange} required autoComplete="given-name" />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="telephone">Téléphone</label>
                      <input id="telephone" name="telephone" type="tel" value={form.telephone} onChange={handleChange} autoComplete="tel" />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="organisation">Organisation</label>
                    <input id="organisation" name="organisation" type="text" value={form.organisation} onChange={handleChange} autoComplete="organization" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="objet">Objet de votre demande *</label>
                    <select id="objet" name="objet" value={form.objet} onChange={handleChange} required>
                      <option value="">Sélectionner...</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="message">Décrivez votre projet *</label>
                    <textarea
                      id="message" name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Décrivez votre contexte, vos besoins, vos contraintes..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className={styles.errorMsg}>
                      <AlertCircle size={16} />
                      Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </button>
                </form>
              )}
            </div>

            {/* Informations contact */}
            <aside className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h3>Nos bureaux</h3>
                <div className={styles.officeList}>
                  {offices.map((o) => (
                    <div key={o.city} className={styles.officeItem}>
                      <MapPin size={16} className={styles.officeIcon} />
                      <div>
                        <strong>{o.city}, {o.country}</strong>
                        <span>{o.role}</span>
                        <span>{o.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>Contact direct</h3>
                <div className={styles.contactItem}>
                  <Mail size={16} className={styles.contactIcon} />
                  <a href="mailto:contact.eqos@gmail.com">contact.eqos@gmail.com</a>
                </div>
              </div>

              <div className={styles.responseCard}>
                <Clock size={20} className={styles.responseIcon} />
                <div>
                  <h4>Délai de réponse</h4>
                  <p>Nous traitons toutes les demandes sous 48 heures ouvrées. Pour les projets urgents, mentionnez-le dans votre message.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
