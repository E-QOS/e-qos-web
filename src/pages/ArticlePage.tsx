import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Clock, Eye, Tag, CalendarDays,
  Loader2, AlertTriangle, BookOpen,
} from 'lucide-react';
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

  /* ── Loading ── */
  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <Loader2 size={40} className={styles.spinner} />
        <p>Chargement de l'article…</p>
      </div>
    );
  }

  /* ── Error / 404 ── */
  if (error || !article) {
    return (
      <div className={styles.errorWrap}>
        <AlertTriangle size={40} />
        <p>Article introuvable</p>
        <span>{error ?? "Cet article n'existe pas ou a été supprimé."}</span>
        <Link to="/ressources" className={styles.ctaBtn} style={{ marginTop: '1.5rem', width: 'auto', padding: '0.75rem 1.5rem' }}>
          <ArrowLeft size={15} />
          Retour aux ressources
        </Link>
      </div>
    );
  }

  const catColor    = (article.category as any)?.color ?? '#FF5A1F';
  const catName     = (article.category as any)?.name  ?? 'Article';
  const authorName  = (article.author as any)?.full_name;
  const authorAvatar = (article.author as any)?.avatar_url;
  const tags        = (article.tags as any[])?.map((t: any) => t.tag) ?? [];
  const content     = article.content ?? '';
  const isHtml      = hasHtmlTags(content);

  return (
    <div>
      {/* ════ HERO ════════════════════════════════════════════ */}
      <section className={styles.hero}>

        {/* Cover image in background */}
        {article.cover_url && (
          <div className={styles.heroCover}>
            <img src={article.cover_url} alt="" aria-hidden="true" />
          </div>
        )}
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.glowOrange}  aria-hidden="true" />
        <div className={styles.glowCyan}    aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>

          {/* Back link */}
          <Link to="/ressources" className={styles.backLink}>
            <ArrowLeft size={14} />
            Retour aux ressources
          </Link>

          {/* Category badge */}
          <div
            className={styles.categoryBadge}
            style={{
              background: catColor + '18',
              color: catColor,
              borderColor: catColor + '33',
            }}
          >
            <Tag size={11} />
            {catName}
          </div>

          {/* Title */}
          <h1 className={styles.heroTitle}>{article.title}</h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className={styles.heroExcerpt}>{article.excerpt}</p>
          )}

          {/* Meta row */}
          <div className={styles.heroMeta}>
            {/* Author */}
            <div className={styles.authorBlock}>
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName ?? 'Auteur'}
                  className={styles.authorAvatar}
                />
              ) : (
                <div className={styles.authorInitials}>{initials(authorName)}</div>
              )}
              <span className={styles.authorName}>{authorName ?? 'EQOS'}</span>
            </div>

            {article.published_at && (
              <>
                <div className={styles.metaDivider} />
                <span className={styles.metaChip}>
                  <Calendar size={13} />
                  {formatDate(article.published_at)}
                </span>
              </>
            )}

            {article.reading_time > 0 && (
              <>
                <div className={styles.metaDivider} />
                <span className={styles.metaChip}>
                  <Clock size={13} />
                  {article.reading_time} min de lecture
                </span>
              </>
            )}

            {article.views > 0 && (
              <>
                <div className={styles.metaDivider} />
                <span className={styles.metaChip}>
                  <Eye size={13} />
                  {article.views.toLocaleString('fr-FR')} lectures
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.tagsBar}>
              <BookOpen size={13} style={{ color: '#4a6a6e' }} />
              {tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════ BODY ════════════════════════════════════════════ */}
      <section className="section-alt">
        <div className="container">
          <div className={styles.layout}>

            {/* ── Article content ── */}
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
                <div className={styles.noContent}>
                  <BookOpen size={28} style={{ margin: '0 auto 0.75rem', color: '#4a6a6e' }} />
                  <p>Le contenu de cet article sera disponible prochainement.</p>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className={styles.sidebar}>

              {/* Article info card */}
              <div className={styles.sideCard}>
                <p className={styles.sideCardTitle}>À propos de cet article</p>

                {article.published_at && (
                  <div className={styles.statRow}>
                    <Calendar size={15} className={styles.statIcon} />
                    <span className={styles.statLabel}>Publié le</span>
                    <span className={styles.statValue}>{formatDate(article.published_at)}</span>
                  </div>
                )}

                <div className={styles.statRow}>
                  <Clock size={15} className={styles.statIcon} />
                  <span className={styles.statLabel}>Lecture</span>
                  <span className={styles.statValue}>{article.reading_time || 1} min</span>
                </div>

                {article.views > 0 && (
                  <div className={styles.statRow}>
                    <Eye size={15} className={styles.statIcon} />
                    <span className={styles.statLabel}>Lectures</span>
                    <span className={styles.statValue}>{article.views.toLocaleString('fr-FR')}</span>
                  </div>
                )}

                <div className={styles.statRow}>
                  <Tag size={15} className={styles.statIcon} />
                  <span className={styles.statLabel}>Catégorie</span>
                  <span className={styles.statValue} style={{ color: catColor }}>{catName}</span>
                </div>
              </div>

              {/* CTA card */}
              <div className={styles.ctaCard}>
                <h4>Parlons de votre projet</h4>
                <p>
                  EQOS accompagne les entreprises guinéennes dans leur transformation
                  digitale. Réservez un appel gratuit avec nos experts.
                </p>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaBtn}
                >
                  <CalendarDays size={14} />
                  Réserver un appel gratuit
                </a>
              </div>

              {/* Back to resources */}
              <Link to="/ressources" className={styles.ctaBtn} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#7a9ba0', textDecoration: 'none' }}>
                <ArrowLeft size={14} />
                Tous les articles
              </Link>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
