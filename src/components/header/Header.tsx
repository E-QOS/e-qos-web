import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Database,
  CreditCard,
  Shield,
  Compass,
  Users,
  Briefcase,
  TrendingUp,
  Wrench,
  Pickaxe,
  Smartphone,
  Building2,
  Heart,
  Wheat,
  ShoppingBag,
  Landmark,
  GraduationCap,
  Zap,
  X,
  CalendarDays,
  LogIn,
  UserPlus,
  LogOut,
  UserCircle,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../lib/supabase';
import styles from './Header.module.css';

const servicesLinks = [
  { to: '/services/transformation-digitale', label: 'Transformation digitale', desc: 'Diagnostic, feuille de route, pilotage', icon: <TrendingUp size={14} /> },
  { to: '/services/conseil-organisationnel', label: 'Conseil organisationnel', desc: 'Processus, structure, performance', icon: <Compass size={14} /> },
  { to: '/services/odoo', label: 'Implémentation Odoo', desc: 'ERP open source, de A à Z', icon: <Database size={14} /> },
  { to: '/services/paiements-locaux', label: 'Paiements locaux', desc: 'Orange Money, MTN MoMo, Wave', icon: <CreditCard size={14} /> },
  { to: '/services/cybersecurite', label: 'Cybersécurité', desc: 'Audit, protection, conformité', icon: <Shield size={14} /> },
  { to: '/services/support', label: 'Support informatique', desc: 'Helpdesk, infogérance, maintenance', icon: <Wrench size={14} /> },
  { to: '/services/management-consulting', label: 'Management & Consulting', desc: 'Gouvernance, projets complexes', icon: <Users size={14} /> },
  { to: '/services/interim', label: 'Interim Management', desc: 'DSI, chefs de projet, experts', icon: <Briefcase size={14} /> },
];

const secteursLinks = [
  { to: '/secteurs/mines-ressources', label: 'Mines & Ressources', icon: <Pickaxe size={14} /> },
  { to: '/secteurs/telecom', label: 'Télécommunications', icon: <Smartphone size={14} /> },
  { to: '/secteurs/banque-finance', label: 'Banque, Finance & Microfinance', icon: <Building2 size={14} /> },
  { to: '/secteurs/sante', label: 'Santé', icon: <Heart size={14} /> },
  { to: '/secteurs/secteur-public', label: 'Secteur public & ONG', icon: <Landmark size={14} /> },
  { to: '/secteurs/agriculture', label: 'Agriculture & Agroalimentaire', icon: <Wheat size={14} /> },
  { to: '/secteurs/commerce-distribution', label: 'Commerce & Distribution', icon: <ShoppingBag size={14} /> },
  { to: '/secteurs/education', label: 'Éducation', icon: <GraduationCap size={14} /> },
];

const solutionsLinks = [
  { to: '/solutions/wali', label: 'Wali', desc: 'Services à la demande', icon: <Zap size={14} /> },
  { to: '/solutions/wandi', label: 'Wandi', desc: 'Mobilité intelligente', icon: <Smartphone size={14} /> },
  { to: '/solutions/makiti', label: 'Makiti', desc: 'Marketplace agricole', icon: <Wheat size={14} /> },
];

const CALENDAR_URL = 'https://calendar.app.google/C7KRgHGHW6gE478s6';

const Header: React.FC = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location    = useLocation();

  const { user, profile, loading: authLoading, openAuthModal } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    try { await signOut(); } catch { /* ignore */ }
  };

  /** Initiales for avatar fallback */
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?';

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="EQOS - Accueil">
            <div className={styles.logoMark}>EQ</div>
            <span className={styles.logoText}>EQ<span>OS</span></span>
          </Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            <div className={styles.navItem}>
              <Link to="/services" className={styles.navLink} aria-haspopup="true">
                Services <ChevronDown size={13} className={styles.chevron} />
              </Link>
              <div className={`${styles.dropdown} ${styles.dropdownWide}`} role="menu">
                {servicesLinks.map((s) => (
                  <Link key={s.to} to={s.to} className={styles.dropdownLink} role="menuitem">
                    <div className={styles.dropdownIcon}>{s.icon}</div>
                    <div className={styles.dropdownLinkText}>
                      <strong>{s.label}</strong>
                      <span>{s.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.navItem}>
              <Link to="/secteurs" className={styles.navLink} aria-haspopup="true">
                Secteurs <ChevronDown size={13} className={styles.chevron} />
              </Link>
              <div className={styles.dropdown} role="menu">
                {secteursLinks.map((s) => (
                  <Link key={s.to} to={s.to} className={styles.dropdownLink} role="menuitem">
                    <div className={styles.dropdownIcon}>{s.icon}</div>
                    <div className={styles.dropdownLinkText}><strong>{s.label}</strong></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.navItem}>
              <Link to="/solutions" className={styles.navLink} aria-haspopup="true">
                Solutions <ChevronDown size={13} className={styles.chevron} />
              </Link>
              <div className={styles.dropdown} role="menu">
                {solutionsLinks.map((s) => (
                  <Link key={s.to} to={s.to} className={styles.dropdownLink} role="menuitem">
                    <div className={styles.dropdownIcon}>{s.icon}</div>
                    <div className={styles.dropdownLinkText}>
                      <strong>{s.label}</strong>
                      <span>{s.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/ressources" className={styles.navLink}>Ressources</Link>
            <Link to="/a-propos" className={styles.navLink}>À propos</Link>
            <Link to="/carrieres" className={styles.navLink}>Carrières</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </nav>

          <div className={styles.headerCta}>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              <CalendarDays size={14} />
              Réserver un appel
            </a>

            {/* ── Auth zone ── */}
            {!authLoading && !user && (
              <div className={styles.authBtns}>
                <button className={styles.signInBtn} onClick={() => openAuthModal('signin')}>
                  <LogIn size={14} />
                  Connexion
                </button>
                <button className={styles.signUpBtn} onClick={() => openAuthModal('signup')}>
                  <UserPlus size={14} />
                  S'inscrire
                </button>
              </div>
            )}

            {!authLoading && user && (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userAvatar}
                  onClick={() => setUserMenuOpen(v => !v)}
                  aria-label="Menu utilisateur"
                  aria-expanded={userMenuOpen}
                >
                  {profile?.avatar_url
                    ? <img src={profile.avatar_url} alt={profile.full_name ?? ''} className={styles.avatarImg} />
                    : <span className={styles.avatarInitials}>{initials}</span>
                  }
                  <ChevronDown size={12} className={`${styles.avatarChevron} ${userMenuOpen ? styles.avatarChevronOpen : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userDropdownHeader}>
                      <p className={styles.userDropdownName}>{profile?.full_name ?? user.email}</p>
                      <p className={styles.userDropdownEmail}>{user.email}</p>
                      {profile?.role && profile.role !== 'user' && (
                        <span className={styles.roleBadge}>{profile.role}</span>
                      )}
                    </div>
                    <div className={styles.userDropdownDivider} />
                    <Link to="/profil" className={styles.userDropdownItem}>
                      <UserCircle size={15} /> Mon profil
                    </Link>
                    {(profile?.role === 'admin' || profile?.role === 'editor') && (
                      <Link to="/admin/articles" className={styles.userDropdownItem}>
                        <LayoutDashboard size={15} /> Gérer les articles
                      </Link>
                    )}
                    <div className={styles.userDropdownDivider} />
                    <button className={`${styles.userDropdownItem} ${styles.userDropdownSignOut}`} onClick={handleSignOut}>
                      <LogOut size={15} /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className={`${styles.mobileToggle} ${mobileOpen ? styles.open : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <nav className={`${styles.mobileNav} ${mobileOpen ? styles.open : ''}`} aria-label="Navigation mobile">
        <div className={styles.mobileNavHeader}>
          <Link to="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
            <div className={styles.logoMark}>EQ</div>
            <span className={styles.logoText}>EQ<span>OS</span></span>
          </Link>
          <button className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Fermer">
            <X size={16} />
          </button>
        </div>

        <div className={styles.mobileNavCta}>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={styles.mobileNavCtaBtn}>
            <CalendarDays size={15} />
            Réserver un appel
          </a>
          {!authLoading && !user && (
            <div className={styles.mobileAuthBtns}>
              <button className={styles.mobileSignInBtn} onClick={() => { setMobileOpen(false); openAuthModal('signin'); }}>
                <LogIn size={15} /> Connexion
              </button>
              <button className={styles.mobileSignUpBtn} onClick={() => { setMobileOpen(false); openAuthModal('signup'); }}>
                <UserPlus size={15} /> S'inscrire
              </button>
            </div>
          )}
          {!authLoading && user && (
            <div className={styles.mobileUserInfo}>
              <span className={styles.mobileUserName}>{profile?.full_name ?? user.email}</span>
              <button className={styles.mobileSignOutBtn} onClick={handleSignOut}>
                <LogOut size={14} /> Déconnexion
              </button>
            </div>
          )}
        </div>

        <div className={styles.mobileSection}>
          <p className={styles.mobileSectionTitle}>Services</p>
          {servicesLinks.map((s) => (
            <Link key={s.to} to={s.to} className={styles.mobileLink}>
              <span className={styles.mobileLinkIcon}>{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </div>

        <div className={styles.mobileSection}>
          <p className={styles.mobileSectionTitle}>Secteurs</p>
          {secteursLinks.map((s) => (
            <Link key={s.to} to={s.to} className={styles.mobileLink}>
              <span className={styles.mobileLinkIcon}>{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </div>

        <div className={styles.mobileSection}>
          <p className={styles.mobileSectionTitle}>Solutions</p>
          {solutionsLinks.map((s) => (
            <Link key={s.to} to={s.to} className={styles.mobileLink}>
              <span className={styles.mobileLinkIcon}>{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </div>

        <div className={styles.mobileSection}>
          <p className={styles.mobileSectionTitle}>Entreprise</p>
          <Link to="/ressources" className={styles.mobileLink}>Ressources</Link>
          <Link to="/a-propos" className={styles.mobileLink}>À propos</Link>
          <Link to="/carrieres" className={styles.mobileLink}>Carrières</Link>
          <Link to="/contact" className={styles.mobileLink}>Contact</Link>
        </div>
      </nav>

      <div className={styles.spacer} aria-hidden="true" />
    </>
  );
};

export default Header;
