import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './RessourcesPage.module.css';

const RessourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const { articles, categories, loading, error } = useArticles();
  usePageMeta({
    title: 'Ressources | EQOS Africa',
    description: 'Guides pratiques, études de cas et actualités sur la transformation digitale en Afrique de l\'Ouest.',
  });

  // Map category slug to display name (for filtering)
  const categoryLabels = ['Tous', ...categories.map((c) => c.name)];

  const filtered = activeCategory === 'Tous'
    ? articles
    : articles.filter((a) => {
        const cat = categories.find((c) => c.id === a.category_id);
        return cat?.name === activeCategory;
      });

  const getCategoryMeta = (categoryId: number | null | undefined) => {
    if (!categoryId) return { name: 'Général' };
    const cat = categories.find((c) => c.id === categoryId);
    return { name: cat?.name ?? 'Général' };
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">Ressources</span>
          <h1>Analyses et actualités</h1>
          <p>Guides pratiques, études de cas et actualités sur la transformation digitale en Afrique de l'Ouest.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">

          {/* ── Category filters ── */}
          {!loading && !error && (
            <div className={styles.filters} role="group" aria-label="Catégories">
              {categoryLabels.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={activeCategory === c}
                  className={`${styles.filterBtn} ${activeCategory === c ? styles.filterActive : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* ── Loading skeleton ── */}
          {loading && (
            <p className={styles.loadingState} role="status">Chargement des articles…</p>
          )}

          {/* ── Error state ── */}
          {error && !loading && (
            <p className={styles.errorState} role="alert">Impossible de charger les articles pour le moment.</p>
          )}

          {/* ── Articles grid ── */}
          {!loading && !error && (
            <div className={styles.grid}>
              {filtered.map((a) => {
                const catMeta = getCategoryMeta(a.category_id);
                return (
                  <article key={a.id} className={styles.card}>
                    {a.cover_url && (
                      <div className={styles.cardCover}>
                        <img src={a.cover_url} alt="" loading="lazy" decoding="async" />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.category}>{catMeta.name}</span>
                        {a.published_at && (
                          <span className={styles.date}>
                            {formatDate(a.published_at)}
                          </span>
                        )}
                      </div>
                      <h2 className={styles.title}>
                        <Link to={`/ressources/${a.slug}`} className={styles.titleLink}>{a.title}</Link>
                      </h2>
                      {a.excerpt && <p className={styles.extrait}>{a.excerpt}</p>}
                      <div className={styles.cardFooter}>
                        {a.reading_time && (
                          <span className={styles.reading}>{a.reading_time} min de lecture</span>
                        )}
                        <span className={styles.readLink} aria-hidden="true">
                          Lire l'article <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && !error && filtered.length === 0 && (
            <div className={styles.emptyState}>
              <p>Aucun article dans cette catégorie pour le moment.</p>
              <button type="button" className="text-link" onClick={() => setActiveCategory('Tous')}>
                Voir tous les articles
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default RessourcesPage;
