import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './LegalPage.module.css';

const LAST_UPDATE = '19 avril 2026';

const MentionsLegalesPage: React.FC = () => {
  usePageMeta({
    title: 'Conditions d\'utilisation — E-QOS',
    description: 'Conditions générales d\'utilisation des services E-QOS.',
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.label}>Légal</p>
          <h1 className={styles.title}>Conditions d'utilisation</h1>
          <p className={styles.meta}>Dernière mise à jour : {LAST_UPDATE}</p>
        </header>

        <div className={styles.body}>

          <section className={styles.section}>
            <h2>1. Présentation d'E-QOS</h2>
            <p>
              E-QOS est une société de conseil en transformation digitale, systèmes d'information
              et solutions technologiques, opérant principalement en République de Guinée.
              Le présent site web a pour objet de présenter nos services, nos solutions et de
              permettre aux utilisateurs d'accéder à des ressources et à un espace personnel.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Acceptation des conditions</h2>
            <p>
              En accédant à ce site et en créant un compte, vous reconnaissez avoir lu, compris
              et accepté sans réserve les présentes conditions d'utilisation. Si vous n'acceptez
              pas ces conditions, veuillez ne pas utiliser ce site.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Accès au service</h2>
            <p>
              L'accès à certaines fonctionnalités du site nécessite la création d'un compte
              utilisateur. Vous êtes responsable de la confidentialité de vos identifiants de
              connexion et de toutes les activités réalisées sous votre compte.
            </p>
            <p>
              E-QOS se réserve le droit de suspendre ou de résilier tout compte en cas de
              non-respect des présentes conditions, de comportement abusif ou de fourniture
              d'informations fausses lors de l'inscription.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu publié sur ce site (textes, graphismes, logos, icônes,
              images, vidéos, codes sources) est la propriété exclusive d'E-QOS ou de ses
              partenaires et est protégé par les lois applicables en matière de propriété
              intellectuelle.
            </p>
            <p>
              Toute reproduction, distribution, modification ou utilisation de ce contenu
              sans l'accord préalable écrit d'E-QOS est strictement interdite.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Utilisation acceptable</h2>
            <p>En utilisant ce site, vous vous engagez à :</p>
            <ul>
              <li>Ne pas utiliser le site à des fins illicites ou frauduleuses ;</li>
              <li>Ne pas tenter d'accéder sans autorisation à des zones sécurisées ;</li>
              <li>Ne pas diffuser de contenu malveillant, trompeur ou offensant ;</li>
              <li>Respecter les droits des autres utilisateurs et d'E-QOS ;</li>
              <li>Ne pas perturber le fonctionnement normal du service.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Limitation de responsabilité</h2>
            <p>
              E-QOS s'efforce de maintenir le site accessible et à jour, mais ne garantit pas
              l'absence d'interruptions ou d'erreurs. E-QOS ne pourra être tenu responsable
              des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité
              d'utiliser le site.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Liens externes</h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers. E-QOS n'exerce aucun
              contrôle sur ces sites et n'assume aucune responsabilité quant à leur contenu
              ou leurs pratiques en matière de confidentialité.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Modification des conditions</h2>
            <p>
              E-QOS se réserve le droit de modifier les présentes conditions à tout moment.
              Les modifications entrent en vigueur dès leur publication sur le site. Il vous
              appartient de consulter régulièrement cette page. La poursuite de l'utilisation
              du site après modification vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Droit applicable et juridiction</h2>
            <p>
              Les présentes conditions sont régies par le droit guinéen. Tout litige relatif
              à leur interprétation ou leur exécution sera soumis à la compétence des
              tribunaux compétents de la République de Guinée.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Contact</h2>
            <p>
              Pour toute question relative aux présentes conditions, vous pouvez nous
              contacter à l'adresse suivante :{' '}
              <a href="mailto:contact.eqos@gmail.com">contact.eqos@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default MentionsLegalesPage;
