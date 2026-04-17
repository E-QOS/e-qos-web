import { useState, useEffect, useCallback } from 'react';
import { fetchPublishedArticles, fetchCategories } from '../lib/supabase';
import type { Article, ArticleCategory } from '../types/database';

interface UseArticlesResult {
  articles: Article[];
  categories: ArticleCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useArticles(categorySlug?: string): UseArticlesResult {
  const [articles, setArticles]     = useState<Article[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [arts, cats] = await Promise.all([
        fetchPublishedArticles(categorySlug),
        fetchCategories(),
      ]);
      setArticles(arts as unknown as Article[]);
      setCategories(cats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement.');
    } finally {
      setLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => { load(); }, [load]);

  return { articles, categories, loading, error, refetch: load };
}
