import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { ContactForm } from '../components/contact/ContactForm';
import styles from './ContactPage.module.css';

const offices = [
  { city: 'Conakry', country: 'Guinée', role: 'Siège social', address: 'Conakry, République de Guinée' },
];

const ContactPage: React.FC = () => {
  usePageMeta({ title: 'Contact — Parlez-nous de votre projet | EQOS Africa', description: 'Contactez EQOS pour une analyse gratuite de vos besoins en transformation digitale. Réponse sous 48h. Présent en Guinée.' });

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Contact</h1>
          <p>Parlez-nous de votre projet. Nous vous revenons avec une première analyse sous 48h.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.formSection}>
              <h2 className={styles.formTitle}>Analyse gratuite de vos besoins</h2>
              <p className={styles.formIntro}>Décrivez votre projet ou vos besoins. Nos experts analysent votre situation et vous proposent une première approche adaptée, gratuitement et sans engagement.</p>
              <ContactForm />
            </div>

            <aside className={styles.aside} aria-label="Coordonnées">
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Nos bureaux</h3>
                {offices.map((o) => (
                  <div key={o.city} className={styles.office}>
                    <strong>{o.city}, {o.country}</strong>
                    <span>{o.role}</span>
                    <span>{o.address}</span>
                  </div>
                ))}
              </div>

              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Contact direct</h3>
                <a href="mailto:contact.eqos@gmail.com" className="text-link">contact.eqos@gmail.com</a>
              </div>

              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Délai de réponse</h3>
                <p>Nous traitons toutes les demandes sous 48 heures ouvrées. Pour les projets urgents, mentionnez-le dans votre message.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
