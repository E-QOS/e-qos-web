import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Compass, Map, Users, Puzzle, BarChart3, Lightbulb } from 'lucide-react';
import ServicePageLayout from '../../components/shared/ServicePageLayout';
import styles from '../../components/shared/ServicePageLayout.module.css';

const TransformationDigitalePage: React.FC = () => {
  usePageMeta({
    title: 'Transformation Digitale en Guinée | EQOS Africa',
    description: 'EQOS accompagne les organisations guinéennes dans leur transformation digitale : diagnostic, feuille de route, pilotage de projets et intégration des outils numériques dans les processus métier.',
  });
  return (
    <ServicePageLayout
      title="Transformation digitale — Du diagnostic à l'impact mesurable"
      subtitle="Nous accompagnons les organisations dans leur passage au numérique avec une approche pragmatique, adaptée aux réalités africaines."
      breadcrumb="Transformation digitale"
      intro="La transformation digitale n'est pas un projet informatique. C'est un projet d'entreprise. Elle touche les processus, les équipes, les outils et la culture. EQOS vous accompagne à chaque étape — de l'état des lieux initial jusqu'à l'ancrage durable des nouveaux usages — avec une méthode éprouvée sur des organisations guinéennes de toutes tailles."
      cards={[
        { icon: <Compass size={22} />, title: 'Diagnostic digital', desc: 'Évaluation de la maturité numérique de votre organisation : cartographie des outils existants, identification des freins et des opportunités de gain rapide.' },
        { icon: <Map size={22} />, title: 'Feuille de route', desc: 'Construction d\'un plan de transformation priorisé, réaliste et budgétisé. Jalons clairs, indicateurs mesurables, arbitrages stratégiques.' },
        { icon: <Puzzle size={22} />, title: 'Intégration d\'outils', desc: 'Sélection et déploiement des outils digitaux les plus adaptés à votre contexte : ERP, CRM, outils collaboratifs, paiements mobiles.' },
        { icon: <Users size={22} />, title: 'Conduite du changement', desc: 'Accompagnement des équipes pour lever les résistances, créer l\'adhésion et ancrer durablement les nouveaux usages dans le quotidien.' },
        { icon: <BarChart3 size={22} />, title: 'Pilotage & gouvernance', desc: 'Mise en place d\'un comité de pilotage, tableaux de bord de suivi, reporting régulier aux décideurs et ajustements en continu.' },
        { icon: <Lightbulb size={22} />, title: 'Formation & adoption', desc: 'Programmes de montée en compétences adaptés à chaque profil utilisateur pour garantir l\'autonomie après déploiement.' },
      ]}
      extras={
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <div className="section-line" />
              <h2>Notre approche en 4 phases</h2>
              <p className="lead">Une transformation qui tient dans le temps, pas un projet qui se referme au go-live.</p>
            </div>
            <div className={styles.methodTimeline}>
              {[
                { n: 1, t: 'Comprendre', d: 'Diagnostic de l\'existant, entretiens avec les parties prenantes, cartographie des processus critiques et identification des priorités.' },
                { n: 2, t: 'Concevoir', d: 'Co-construction de la feuille de route avec vos équipes. Sélection des solutions, définition des indicateurs de succès, plan de gestion du changement.' },
                { n: 3, t: 'Déployer', d: 'Mise en œuvre des outils, formation des utilisateurs, accompagnement terrain. Ajustements rapides selon les retours du terrain.' },
                { n: 4, t: 'Ancrer', d: 'Mesure des résultats, optimisation continue, renforcement de l\'autonomie des équipes et préparation de la prochaine vague de transformation.' },
              ].map((step) => (
                <div key={step.n} className={styles.timelineStep}>
                  <div className={styles.timelineNum}>{step.n}</div>
                  <div className={styles.timelineContent}>
                    <h4>{step.t}</h4>
                    <p>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem', padding: '2rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(10,22,40,0.08)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Secteurs accompagnés en Guinée</h3>
              <div className={styles.tagsList}>
                {['Mines & Ressources', 'Banque & Microfinance', 'Santé', 'Secteur public & ONG', 'Commerce & Distribution', 'Agriculture', 'Télécommunications', 'Éducation'].map(t => (
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

export default TransformationDigitalePage;
