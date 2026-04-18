// Auto-generated types for Supabase schema
// Run `supabase gen types typescript` to regenerate after schema changes

export type UserRole = 'user' | 'editor' | 'admin';
export type ArticleStatus = 'draft' | 'published' | 'archived';
export type ContractType = 'CDI' | 'CDD' | 'Stage' | 'Alternance' | 'Interim' | 'Consultance';
export type JobDomain =
  | 'Tech & Dev'
  | 'Conseil & ERP'
  | 'Cybersécurité'
  | 'Paiements & Fintech'
  | 'Management & Conseil'
  | 'Marketing & Business'
  | 'Support & Qualité';
export type JobLocation = 'Conakry' | 'Remote';
export type ApplicationStatus = 'pending' | 'reviewed' | 'rejected' | 'hired';

/* ─── Tables ─── */

export type ExperienceLevel = 'Junior' | 'Confirmé' | 'Senior' | 'Expert';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  bio: string | null;
  job_title: string | null;
  domain: string | null;
  experience_level: ExperienceLevel | null;
  skills: string[] | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  phone: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleCategory {
  id: number;
  slug: string;
  name: string;
  color: string;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category_id: number | null;
  author_id: string | null;
  status: ArticleStatus;
  reading_time: number;
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  category?: ArticleCategory | null;
  author?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'> | null;
  tags?: ArticleTag[];
}

export interface ArticleTag {
  article_id: string;
  tag: string;
}

export interface Job {
  id: string;
  title: string;
  contract_type: ContractType;
  domain: JobDomain;
  location: JobLocation;
  description: string;
  missions: string[];
  required_profile: string[];
  benefits: string[];
  salary: string | null;
  experience: string;
  is_active: boolean;
  published_at: string;
  deadline_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string | null;
  job_title: string;
  full_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  cv_url: string | null;
  status: ApplicationStatus;
  created_at: string;
}

export interface JobApplicationInsert {
  job_id?: string | null;
  job_title: string;
  full_name: string;
  email: string;
  phone?: string;
  message?: string;
  cv_url?: string;
}

/* ─── Insert / Update payloads ─── */

export interface ArticleInsert {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  category_id?: number;
  status?: ArticleStatus;
  reading_time?: number;
  published_at?: string;
}

export interface ArticleUpdate extends Partial<ArticleInsert> {
  updated_at?: string;
}

export interface ProfileUpdate {
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  job_title?: string;
  domain?: string;
  experience_level?: ExperienceLevel | null;
  skills?: string[];
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  phone?: string | null;
  location?: string | null;
  updated_at?: string;
}

/* ─── Database type map (for Supabase client generic) ─── */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: ProfileUpdate;
      };
      article_categories: {
        Row: ArticleCategory;
        Insert: Omit<ArticleCategory, 'id' | 'created_at'>;
        Update: Partial<Omit<ArticleCategory, 'id' | 'created_at'>>;
      };
      articles: {
        Row: Article;
        Insert: ArticleInsert & { author_id?: string };
        Update: ArticleUpdate;
      };
      article_tags: {
        Row: ArticleTag;
        Insert: ArticleTag;
        Update: never;
      };
      jobs: {
        Row: Job;
        Insert: Omit<Job, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Job, 'id' | 'created_at' | 'updated_at'>>;
      };
      job_applications: {
        Row: JobApplication;
        Insert: JobApplicationInsert;
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_article_views: {
        Args: { article_slug: string };
        Returns: void;
      };
    };
    Enums: {
      user_role: UserRole;
      article_status: ArticleStatus;
    };
  };
}
