import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    '[EQOS] Supabase non configuré — copiez .env.example en .env.local et renseignez vos clés.\n' +
    'Le site fonctionne en mode hors-ligne : authentification et articles désactivés.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'eqos_auth',
  },
});

/* ─── Storage helpers ─── */

export const BUCKETS = {
  COVERS: 'article-covers',
  AVATARS: 'avatars',
  CVS: 'cvs',
} as const;

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/* ─── Auth helpers ─── */

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, meta: { full_name: string; company?: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: meta },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

/* ─── Article helpers ─── */

export async function fetchPublishedArticles(categorySlug?: string) {
  let query = supabase
    .from('articles')
    .select(`
      id, slug, title, excerpt, cover_url, reading_time, views, published_at, created_at,
      category:article_categories(id, slug, name, color),
      author:profiles(id, full_name, avatar_url),
      tags:article_tags(tag)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (categorySlug && categorySlug !== 'tous') {
    query = query.eq('category.slug', categorySlug);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:article_categories(*),
      author:profiles(id, full_name, avatar_url),
      tags:article_tags(tag)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;

  // Increment view count (fire-and-forget, typed via cast)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (supabase.rpc as any)('increment_article_views', { article_slug: slug }).then(() => null);

  return data;
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('article_categories')
    .select('*')
    .order('name');
  if (error) throw error;
  return data ?? [];
}

/* ─── Jobs helpers ─── */

export async function fetchJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** Enregistre une demande d'équipe. Insertion seule : la RLS n'autorise pas la relecture publique. */
export async function submitTeamRequest(request: import('../types/database').TeamRequestInsert) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from('team_requests').insert(request);
  if (error) throw error;
}

export async function submitApplication(
  application: import('../types/database').JobApplicationInsert,
  cvFile?: File,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: Record<string, any> = {
    job_id:    application.job_id   ?? null,
    job_title: application.job_title,
    full_name: application.full_name,
    email:     application.email,
  };
  if (application.phone)   payload['phone']   = application.phone;
  if (application.message) payload['message'] = application.message;
  if (application.sector)  payload['sector']  = application.sector;
  if (application.trade)   payload['trade']   = application.trade;

  let cvPath: string | null = null;

  if (cvFile) {
    const ext  = cvFile.name.split('.').pop();
    cvPath = `${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKETS.CVS)
      .upload(cvPath, cvFile, { contentType: cvFile.type });
    if (uploadError) throw uploadError;
    payload['cv_url'] = getPublicUrl(BUCKETS.CVS, cvPath);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { error } = await (supabase as any)
    .from('job_applications')
    .insert(payload);

  // Migration 003 pas encore appliquée (colonnes sector/trade absentes) : on réessaie sans elles
  if (error && ('sector' in payload || 'trade' in payload) && /sector|trade|column/i.test(error.message ?? '')) {
    delete payload['sector'];
    delete payload['trade'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ error } = await (supabase as any).from('job_applications').insert(payload));
  }

  if (error) {
    if (cvPath) {
      supabase.storage.from(BUCKETS.CVS).remove([cvPath]).catch(() => null);
    }
    throw new Error('Une erreur est survenue. Veuillez réessayer ou nous contacter à contact.eqos@gmail.com');
  }

  // Les emails (notification à l'équipe, accusé au candidat) partent du backend : /api/jobs/apply-notify
  return { id: crypto.randomUUID() };
}

/* ─── Profile helpers ─── */

export async function updateProfile(uid: string, email: string, updates: import('../types/database').ProfileUpdate & { avatar_url?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('profiles')
    .upsert({ id: uid, email, ...updates, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export async function uploadAvatar(uid: string, file: File): Promise<string> {
  const ext  = file.name.split('.').pop();
  const path = `${uid}/avatar.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKETS.AVATARS)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  return getPublicUrl(BUCKETS.AVATARS, path);
}
