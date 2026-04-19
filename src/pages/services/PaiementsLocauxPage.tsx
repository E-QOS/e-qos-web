import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { CreditCard, Smartphone, RefreshCw, ShoppingBag, Building2, Zap } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';
import styles from '../../components/shared/ServicePageLayout.module.css';

const usecases = [
  { icon: <ShoppingBag size={20} />, title: 'E-commerce', desc: 'Validation automatique des commandes à réception du paiement. Réduction des impayés, expérience client fluide.' },
  { icon: <RefreshCw size={20} />, title: 'ERP & Comptabilité', desc: 'Réconciliation automatique des encaissements mobile money dans Odoo. Écritures comptables générées automatiquement.' },
  { icon: <Zap size={20} />, title: 'Distribution terrain', desc: 'Agents commerciaux encaissant par mobile money. Mise à jour instantanée des stocks et comptes clients en back-office.' },
  { icon: <Building2 size={20} />, title: 'Services publics', desc: 'Collecte de taxes, redevances administratives et frais de services d\'État via mobile money. Connexion avec Trésor Pay.' },
  { icon: <CreditCard size={20} />, title: 'Microfinance & Épargne', desc: 'Remboursement de crédits et dépôts d\'épargne via portefeuille mobile. Réconciliation automatique avec le core banking.' },
  { icon: <Smartphone size={20} />, title: 'Abonnements & Facturation', desc: 'Prélèvements automatiques récurrents sur portefeuille mobile pour abonnements, mensualités et factures périodiques.' },
];

const PaiementsLocauxPage: React.FC = () => {
  usePageMeta({
    title: 'Intégration Paiements Mobiles Guinée — Orange Money, MTN MoMo, Wave | EQOS Africa',
    description: 'Connectez vos logiciels aux solutions de paiement mobile guinéennes : Orange Money, MTN MoMo, Wave, Trésor Pay. API REST, réconciliation automatique, reporting en temps réel.',
  });
  return (
    <ServicePageLayout
      title="Intégration paiements locaux — Orange Money, MTN MoMo, Wave et Trésor Pay"
      subtitle="Connectez vos systèmes, applications et plateformes aux solutions de paiement mobile qui structurent l'économie guinéenne."
      breadcrumb="Paiements locaux"
      intro="Le mobile money est devenu la principale infrastructure financière de la Guinée. La bancarisation classique reste limitée, mais des millions de personnes et d'entreprises utilisent Orange Money, MTN MoMo ou Wave quotidiennement. Toute organisation qui n'intègre pas ces modes de paiement dans ses processus laisse sur la table une partie significative de son marché."
      cards={[
        { icon: <CreditCard size={22} />, title: 'Orange Money', desc: 'Paiements marchands en ligne via l\'API Web Payment Orange Guinée. Réconciliation automatique, reporting temps réel, callbacks sécurisés. Solution dominante sur le marché guinéen.' },
        { icon: <Smartphone size={22} />, title: 'MTN MoMo', desc: 'Collecte via portefeuille électronique MTN. Intégration API pour e-commerce et logiciels de gestion. Deuxième acteur mobile money en Guinée.' },
        { icon: <Zap size={22} />, title: 'Wave', desc: 'Fintech à faibles frais avec adoption croissante en Guinée. Paiements marchands, transferts et épargne. Forte présence dans la zone UEMOA.' },
        { icon: <Building2 size={22} />, title: 'YMO', desc: 'Startup guinéenne de mobile money fondée en 2019. Partenaire Ecobank pour l\'inclusion financière locale. Solution de proximité pour le marché guinéen.' },
        { icon: <RefreshCw size={22} />, title: 'Trésor Pay', desc: 'Plateforme nationale guinéenne adoptée par l\'État pour les paiements publics : taxes, redevances, frais administratifs.' },
        { icon: <CreditCard size={22} />, title: 'Banques locales', desc: 'Intégration avec Ecobank, BICIGUI et autres banques locales. Terminaux de paiement, passerelles bancaires et cartes.' },
      ]}
      extras={
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <div className="section-line" />
              <h2>Cas d'usage</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {usecases.map((u, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(10,22,40,0.07)', borderRadius: 14, padding: '1.5rem', boxShadow: '0 2px 10px rgba(10,22,40,0.05)' }}>
                  <div style={{ width: 40, height: 40, background: 'rgba(0,212,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-alt)', marginBottom: '0.875rem' }}>{u.icon}</div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{u.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{u.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem', padding: '2rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(10,22,40,0.08)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Notre approche technique</h3>
              <div className={styles.tagsList}>
                {['API REST', 'Webhooks de confirmation', 'Gestion des timeouts', 'Réconciliation automatique', 'Sécurité & chiffrement', 'Tableau de bord transactions', 'Tests sandbox', 'Documentation complète'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      }
    />
  );
};

export default PaiementsLocauxPage;
