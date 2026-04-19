import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';

/* ─── Types ─── */

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  /** Refresh the profile from DB */
  refreshProfile: () => Promise<void>;
  /** Open the auth modal programmatically */
  openAuthModal: (tab?: 'signin' | 'signup') => void;
  /** Auth modal state (controlled by Header, read by components) */
  modalOpen: boolean;
  modalTab: 'signin' | 'signup';
  closeModal: () => void;
}

/* ─── Context ─── */

const AuthContext = createContext<AuthContextValue | null>(null);

/* ─── Provider ─── */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]       = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab]   = useState<'signin' | 'signup'>('signin');

  /* ── Fetch profile ── */
  const fetchProfile = useCallback(async (uid: string) => {
    // maybeSingle() returns null (not 406) when no row exists
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();

    if (!error && data) setProfile(data as Profile);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  /* ── Auth listener ── */
  useEffect(() => {
    // Initial session — wrapped in try/catch in case Supabase isn't configured
    supabase.auth.getSession()
      .then(({ data: { session: s } }) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user) fetchProfile(s.user.id);
      })
      .catch(() => { /* Supabase not configured — silently ignore */ })
      .finally(() => setLoading(false));

    // Subscribe to changes
    let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} };
    try {
      const { data } = supabase.auth.onAuthStateChange(async (_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user) {
          await fetchProfile(s.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
      subscription = data.subscription;
    } catch {
      // Supabase not configured
    }

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  /* ── Modal helpers ── */
  const openAuthModal = useCallback((tab: 'signin' | 'signup' = 'signin') => {
    setModalTab(tab);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading,
      refreshProfile,
      openAuthModal, modalOpen, modalTab, closeModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ─── Hook ─── */

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
