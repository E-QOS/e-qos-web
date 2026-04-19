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
    let mounted = true;

    // onAuthStateChange must be synchronous — awaiting inside the callback
    // deadlocks the Supabase client (it holds an internal lock until the
    // callback returns, so any Supabase query fired inside an async callback
    // will hang forever and block all data fetches).
    let initialized = false;
    const done = () => {
      if (mounted && !initialized) { initialized = true; setLoading(false); }
    };

    let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} };
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, s) => {
        if (!mounted) return;
        setSession(s);
        setUser(s?.user ?? null);

        if (!s?.user) {
          setProfile(null);
          done();
          return;
        }

        // Fire profile fetch without awaiting — must not block this callback
        fetchProfile(s.user.id)
          .catch(() => {})
          .finally(done);
      });
      subscription = data.subscription;
    } catch {
      // Supabase not configured
      done();
    }

    // Safety valve: unblock after 8s if no auth event fires
    const timeout = setTimeout(done, 8000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
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
