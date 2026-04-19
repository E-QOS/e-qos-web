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
  const { error } = await (supabase as any)
    .from('job_applications')
    .insert(payload);

  if (error) {
    if (cvPath) {
      supabase.storage.from(BUCKETS.CVS).remove([cvPath]).catch(() => null);
    }
    throw new Error('Une erreur est survenue. Veuillez réessayer ou nous contacter à contact.eqos@gmail.com');
  }

  // Accusé de réception (fire-and-forget)
  sendReceiptEmail(application.full_name, application.email, application.job_title).catch(() => null);

  return { id: crypto.randomUUID() };
}

const SITE_URL_PUBLIC = 'https://www.e-qos.com';
const LOGO_URL_PUBLIC = 'https://zkyfugzcaiyapgfyqqzx.supabase.co/storage/v1/object/public/assets/eqos_logo.png';

async function sendReceiptEmail(candidateName: string, email: string, jobTitle: string) {
  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#050D1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050D1A;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#0A1828;border-radius:16px 16px 0 0;padding:28px 36px;border-bottom:1px solid rgba(255,90,31,0.25);">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td><img src="${LOGO_URL_PUBLIC}" alt="EQOS" height="38" style="display:block;" onerror="this.style.display='none'"/></td>
            <td align="right" style="font-size:12px;color:rgba(255,255,255,0.35);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Ressources humaines</td>
          </tr></table>
        </td></tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#FF5A1F 0%,rgba(255,90,31,0.2) 100%);"></td></tr>
        <tr><td style="background:#0A1828;padding:40px 36px;">
          <div style="display:inline-block;background:rgba(0,229,160,0.10);border:1px solid rgba(0,229,160,0.25);border-radius:8px;padding:8px 16px;margin-bottom:24px;">
            <span style="font-size:13px;font-weight:700;color:#00e5a0;text-transform:uppercase;letter-spacing:0.08em;">✓ Candidature reçue</span>
          </div>
          <h1 style="margin:0 0 24px;font-size:24px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;line-height:1.3;">Nous avons bien reçu votre candidature</h1>
          <p style="margin:0 0 16px;font-size:15px;color:rgba(255,255,255,0.72);line-height:1.75;">Bonjour <strong style="color:#FFFFFF;">${candidateName}</strong>,</p>
          <p style="margin:0 0 16px;font-size:15px;color:rgba(255,255,255,0.72);line-height:1.75;">Votre candidature pour le poste de <strong style="color:#FF5A1F;">${jobTitle}</strong> a bien été enregistrée. Nous vous remercions de l'intérêt que vous portez à EQOS.</p>
          <p style="margin:0 0 32px;font-size:15px;color:rgba(255,255,255,0.72);line-height:1.75;">Notre équipe RH examinera votre dossier avec attention et reviendra vers vous dans les meilleurs délais.</p>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td style="background:#FF5A1F;border-radius:10px;">
              <a href="${SITE_URL_PUBLIC}/carrieres" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;">Voir d'autres offres →</a>
            </td></tr>
          </table>
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.75;">Merci de votre confiance.<br/><strong style="color:rgba(255,255,255,0.80);">L'équipe Ressources Humaines — EQOS</strong></p>
        </td></tr>
        <tr><td style="background:#060F1A;border-radius:0 0 16px 16px;padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.28);line-height:1.6;">Cet email a été envoyé automatiquement suite à votre candidature.<br/>© ${new Date().getFullYear()} EQOS — <a href="${SITE_URL_PUBLIC}" style="color:#FF5A1F;text-decoration:none;">eqos.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  await supabase.functions.invoke('send-email', {
    body: { emails: [{ to: email, name: candidateName, subject: `Candidature reçue — ${jobTitle}`, html }] },
  });
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
