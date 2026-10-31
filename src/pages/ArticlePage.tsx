import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { usePageMeta } from '../hooks/usePageMeta';
import { fetchArticleBySlug } from '../lib/supabase';
import type { Article } from '../types/database';
import { useState, useEffect } from 'react';
import styles from './ArticlePage.module.css';

const CALENDAR_URL = 'https://calendar.app.google/C7KRgHGHW6gE478s6';

/* ── Helpers ── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function hasHtmlTags(str: string) {
  return /<[a-z][\s\S]*>/i.test(str);
}

function initials(name: string | null | undefined) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

/* ── Hook ── */

function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchArticleBySlug(slug)
      .then((data) => {
        if (!cancelled) setArticle(data as unknown as Article);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Article introuvable.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { article, loading, error };
}

/* ── Page ── */

const ArticlePage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug);

  usePageMeta({
    title: article ? `${article.title} — EQOS Ressources` : 'Article — EQOS',
    description: article?.excerpt ?? 'Ressources et articles EQOS sur la transformation digitale en Afrique.',
  });

  if (loading) {
    return (
      <div className={`container ${styles.stateWrap}`}>
        <p role="status">Chargement de l'article…</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className={`container ${styles.stateWrap}`}>
        <span className="kicker">Ressources</span>
        <h1 className={styles.stateTitle}>Article introuvable</h1>
        <p>Cet article n'existe pas ou a été supprimé.</p>
        <Link to="/ressources" className="arrow-link">
          Retour aux ressources <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const catName      = (article.category as any)?.name ?? 'Article';
  const authorName   = (article.author as any)?.full_name;
  const authorAvatar = (article.author as any)?.avatar_url;
  const tags         = (article.tags as any[])?.map((t: any) => t.tag) ?? [];
  const content      = article.content ?? '';
  const isHtml       = hasHtmlTags(content);

  return (
    <article>
      {/* ════ EN-TÊTE ═════════════════════════════════════════ */}
      <header className={styles.hero}>
        <div className="container">
          <Link to="/ressources" className={styles.backLink}>
            <ArrowLeft size={14} aria-hidden="true" />
            Retour aux ressources
          </Link>

          <span className="kicker">{catName}</span>
          <h1 className={styles.heroTitle}>{article.title}</h1>

          {article.excerpt && <p className={styles.heroExcerpt}>{article.excerpt}</p>}

          <div className={styles.heroMeta}>
            <span className={styles.authorBlock}>
              {authorAvatar ? (
                <img src={authorAvatar} alt="" className={styles.authorAvatar} />
              ) : (
                <span className={styles.authorInitials} aria-hidden="true">{initials(authorName)}</span>
              )}
              <span className={styles.authorName}>{authorName ?? 'EQOS'}</span>
            </span>
            {article.published_at && <span>{formatDate(article.published_at)}</span>}
            {article.reading_time > 0 && <span>{article.reading_time} min de lecture</span>}
          </div>
        </div>

        {article.cover_url && (
          <div className={`container ${styles.coverWrap}`}>
            <img src={article.cover_url} alt="" className={styles.cover} decoding="async" />
          </div>
        )}
      </header>

      {/* ════ CORPS ═══════════════════════════════════════════ */}
      <section className={styles.bodySection}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.articleBody}>
              {content ? (
                isHtml ? (
                  <div
                    className={styles.prose}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(content, {
                        ALLOWED_TAGS: [
                          'h2','h3','h4','p','ul','ol','li','strong','em','a',
                          'blockquote','code','pre','img','hr','br','span','div',
                          'table','thead','tbody','tr','th','td',
                        ],
                        ALLOWED_ATTR: ['href','src','alt','title','class','target','rel'],
                      }),
                    }}
                  />
                ) : (
                  <p className={styles.plainContent}>{content}</p>
                )
              ) : (
                <p className={styles.noContent}>Le contenu de cet article sera disponible prochainement.</p>
              )}

              {tags.length > 0 && (
                <ul className={styles.tagsBar} aria-label="Mots-clés">
                  {tags.map((t) => <li key={t} className={styles.tag}>{t}</li>)}
                </ul>
              )}
            </div>

            <aside className={styles.sidebar}>
              <dl className={styles.sideCard}>
                {article.published_at && (
                  <div className={styles.statRow}>
                    <dt className={styles.statLabel}>Publié le</dt>
                    <dd className={styles.statValue}>{formatDate(article.published_at)}</dd>
                  </div>
                )}
                <div className={styles.statRow}>
                  <dt className={styles.statLabel}>Lecture</dt>
                  <dd className={styles.statValue}>{article.reading_time || 1} min</dd>
                </div>
                {article.views > 0 && (
                  <div className={styles.statRow}>
                    <dt className={styles.statLabel}>Lectures</dt>
                    <dd className={styles.statValue}>{article.views.toLocaleString('fr-FR')}</dd>
                  </div>
                )}
                <div className={styles.statRow}>
                  <dt className={styles.statLabel}>Catégorie</dt>
                  <dd className={styles.statValue}>{catName}</dd>
                </div>
              </dl>

              <div className={styles.ctaCard}>
                <h2 className={styles.ctaTitle}>Parlons de votre projet</h2>
                <p>
                  EQOS accompagne les entreprises guinéennes dans leur transformation
                  digitale. Réservez un appel gratuit avec nos experts.
                </p>
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Réserver un appel gratuit
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
              </div>

              <Link to="/ressources" className="arrow-link">
                Tous les articles <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ArticlePage;
