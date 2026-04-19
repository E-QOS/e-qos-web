import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Loader2, AlertTriangle, BookOpen } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import styles from './RessourcesPage.module.css';

const RessourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const { articles, categories, loading, error } = useArticles();

  // Map category slug to display name (for filtering)
  const categoryLabels = ['Tous', ...categories.map((c) => c.name)];

  const filtered = activeCategory === 'Tous'
    ? articles
    : articles.filter((a) => {
        const cat = categories.find((c) => c.id === a.category_id);
        return cat?.name === activeCategory;
      });

  const getCategoryMeta = (categoryId: number | null | undefined) => {
    if (!categoryId) return { name: 'Général', color: '#7A90B0' };
    const cat = categories.find((c) => c.id === categoryId);
    return { name: cat?.name ?? 'Général', color: cat?.color ?? '#7A90B0' };
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
          <h1>Ressources</h1>
          <p>Guides pratiques, études de cas et actualités sur la transformation digitale en Afrique de l'Ouest.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">

          {/* ── Category filters ── */}
          {!loading && !error && (
            <div className={styles.filters}>
              {categoryLabels.map((c) => (
                <button
                  key={c}
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
            <div className={styles.loadingState}>
              <Loader2 size={32} className={styles.loadingSpinner} />
              <p>Chargement des articles…</p>
            </div>
          )}

          {/* ── Error state ── */}
          {error && !loading && (
            <div className={styles.errorState}>
              <AlertTriangle size={32} />
              <p>Impossible de charger les articles pour le moment.</p>
              <span>{error}</span>
            </div>
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
                        <img src={a.cover_url} alt={a.title} loading="lazy" />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span
                          className={styles.category}
                          style={{
                            background: catMeta.color + '18',
                            color: catMeta.color,
                            borderColor: catMeta.color + '33',
                          }}
                        >
                          <Tag size={11} />
                          {catMeta.name}
                        </span>
                        {a.published_at && (
                          <span className={styles.date}>
                            <Calendar size={12} />
                            {formatDate(a.published_at)}
                          </span>
                        )}
                      </div>
                      <h3 className={styles.title}>{a.title}</h3>
                      {a.excerpt && <p className={styles.extrait}>{a.excerpt}</p>}
                      <div className={styles.cardFooter}>
                        {a.reading_time && (
                          <span className={styles.reading}>{a.reading_time} min de lecture</span>
                        )}
                        <Link to={`/ressources/${a.slug}`} className={styles.readLink}>
                          Lire l'article <ArrowRight size={13} />
                        </Link>
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
              <BookOpen size={40} />
              <p>Aucun article dans cette catégorie pour le moment.</p>
              <button className={styles.filterBtn} onClick={() => setActiveCategory('Tous')}>
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
