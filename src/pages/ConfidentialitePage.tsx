import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './LegalPage.module.css';

const LAST_UPDATE = '19 avril 2026';

const ConfidentialitePage: React.FC = () => {
  usePageMeta({
    title: 'Politique de confidentialité — E-QOS',
    description: 'Politique de confidentialité et de traitement des données personnelles d\'E-QOS.',
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.label}>Légal</p>
          <h1 className={styles.title}>Politique de confidentialité</h1>
          <p className={styles.meta}>Dernière mise à jour : {LAST_UPDATE}</p>
        </header>

        <div className={styles.body}>

          <section className={styles.section}>
            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement de vos données personnelles est la société E-QOS,
              opérant en République de Guinée. Pour toute question relative à cette politique,
              contactez-nous à{' '}
              <a href="mailto:contact.eqos@gmail.com">contact.eqos@gmail.com</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Données collectées</h2>
            <p>
              Dans le cadre de votre utilisation du site et de nos services, nous sommes
              susceptibles de collecter les données suivantes :
            </p>
            <ul>
              <li><strong>Données d'identification :</strong> nom complet, adresse email, nom de l'entreprise ;</li>
              <li><strong>Données de connexion :</strong> adresse IP, type de navigateur, pages consultées, date et heure de visite ;</li>
              <li><strong>Données de compte :</strong> préférences, historique des interactions avec nos services ;</li>
              <li><strong>Communications :</strong> messages envoyés via le formulaire de contact ou le support.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Finalités du traitement</h2>
            <p>Vos données sont collectées et traitées pour les finalités suivantes :</p>
            <ul>
              <li>Gestion et sécurisation de votre compte utilisateur ;</li>
              <li>Fourniture des services demandés et amélioration de notre offre ;</li>
              <li>Communication relative à nos services, offres ou actualités (avec votre consentement) ;</li>
              <li>Respect de nos obligations légales et réglementaires ;</li>
              <li>Analyse statistique anonymisée de l'utilisation du site.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Base légale du traitement</h2>
            <p>Selon la nature des données et leur finalité, le traitement repose sur :</p>
            <ul>
              <li>Votre <strong>consentement</strong> explicite (case cochée lors de l'inscription) ;</li>
              <li>L'<strong>exécution d'un contrat</strong> vous concernant ;</li>
              <li>Notre <strong>intérêt légitime</strong> à améliorer nos services ;</li>
              <li>Le respect de nos <strong>obligations légales</strong>.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Conservation des données</h2>
            <p>
              Vos données personnelles sont conservées pendant la durée nécessaire à
              l'accomplissement des finalités pour lesquelles elles ont été collectées,
              augmentée des délais légaux de prescription applicables.
            </p>
            <p>
              Les données de compte sont conservées pendant toute la durée d'activité du
              compte, puis pendant une durée maximale de 3 ans après la clôture du compte.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Partage des données</h2>
            <p>
              Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent
              être partagées uniquement dans les cas suivants :
            </p>
            <ul>
              <li>Prestataires techniques assurant l'hébergement et la maintenance du site (sous contrat de confidentialité) ;</li>
              <li>Autorités compétentes sur demande légale ou judiciaire ;</li>
              <li>En cas de fusion, acquisition ou transfert d'actifs, dans le respect des droits applicables.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Cookies et traceurs</h2>
            <p>
              Notre site utilise des cookies fonctionnels nécessaires au bon fonctionnement
              du service (maintien de session, préférences). Des cookies analytiques anonymisés
              peuvent être utilisés pour mesurer l'audience. Vous pouvez désactiver les cookies
              via les paramètres de votre navigateur, ce qui peut toutefois affecter
              certaines fonctionnalités.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Vos droits</h2>
            <p>Conformément aux réglementations applicables, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Droit d'accès :</strong> obtenir une copie des données vous concernant ;</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes ;</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données ;</li>
              <li><strong>Droit à la limitation :</strong> restreindre le traitement dans certains cas ;</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement à des fins de prospection ;</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré.</li>
            </ul>
            <p>
              Pour exercer ces droits, adressez votre demande à{' '}
              <a href="mailto:contact.eqos@gmail.com">contact.eqos@gmail.com</a>.
              Nous répondrons dans un délai de 30 jours.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Sécurité des données</h2>
            <p>
              E-QOS met en œuvre des mesures techniques et organisationnelles appropriées
              pour protéger vos données contre tout accès non autorisé, divulgation,
              modification ou destruction. Les mots de passe sont stockés sous forme
              de hash cryptographique et ne sont jamais accessibles en clair.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Modifications de la politique</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour périodiquement.
              La date de dernière mise à jour est indiquée en haut de page. Nous vous
              encourageons à la consulter régulièrement. En cas de modification substantielle,
              nous vous en informerons par email ou notification sur le site.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Contact</h2>
            <p>
              Pour toute question ou réclamation concernant le traitement de vos données,
              contactez-nous à{' '}
              <a href="mailto:contact.eqos@gmail.com">contact.eqos@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ConfidentialitePage;
