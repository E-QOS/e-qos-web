import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, LogOut, UserCircle, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css';

const servicesLinks = [
  { to: '/services/transformation-digitale', label: 'Transformation digitale', desc: 'Diagnostic, feuille de route, pilotage' },
  { to: '/services/conseil-organisationnel', label: 'Conseil organisationnel', desc: 'Processus, structure, performance' },
  { to: '/services/ERP', label: 'Implémentation ERP', desc: 'ERP open source et commercial, de A à Z' },
  { to: '/services/paiements-locaux', label: 'Paiements locaux', desc: 'Orange Money, MTN MoMo, Wave' },
  { to: '/services/cybersecurite', label: 'Cybersécurité', desc: 'Audit, protection, conformité' },
  { to: '/services/support', label: 'Support informatique', desc: 'Helpdesk, infogérance, maintenance' },
  { to: '/services/management-consulting', label: 'Management & Consulting', desc: 'Gouvernance, projets complexes' },
  { to: '/services/interim', label: 'Interim Management', desc: 'DSI, chefs de projet, experts' },
];

const secteursLinks = [
  { to: '/secteurs/mines-ressources', label: 'Mines & Ressources' },
  { to: '/secteurs/telecom', label: 'Télécommunications' },
  { to: '/secteurs/banque-finance', label: 'Banque, Finance & Microfinance' },
  { to: '/secteurs/sante', label: 'Santé' },
  { to: '/secteurs/secteur-public', label: 'Secteur public & ONG' },
  { to: '/secteurs/agriculture', label: 'Agriculture & Agroalimentaire' },
  { to: '/secteurs/commerce-distribution', label: 'Commerce & Distribution' },
  { to: '/secteurs/education', label: 'Éducation' },
];

const solutionsLinks = [
  { to: '/solutions/wali', label: 'Wali', desc: 'Services à la demande' },
  { to: '/solutions/wandi', label: 'Wandi', desc: 'Mobilité intelligente' },
  { to: '/solutions/makiti', label: 'Makiti', desc: 'Marketplace agricole' },
];

type MenuLink = { to: string; label: string; desc?: string };

const menus: { key: string; label: string; allLabel: string; to: string; links: MenuLink[]; wide?: boolean }[] = [
  { key: 'services', label: 'Services', allLabel: 'Tous les services', to: '/services', links: servicesLinks, wide: true },
  { key: 'secteurs', label: 'Secteurs', allLabel: 'Tous les secteurs', to: '/secteurs', links: secteursLinks },
  { key: 'solutions', label: 'Solutions', allLabel: 'Toutes les solutions', to: '/solutions', links: solutionsLinks },
];

// Offre principale, en tête de navigation
const featuredLink = { to: '/mise-en-relation', label: 'Mise en relation & intérim' };

const directLinks = [
  { to: '/ressources', label: 'Ressources' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/carrieres', label: 'Carrières' },
];

const CALENDAR_URL = 'https://calendar.app.google/C7KRgHGHW6gE478s6';
const LOGO_SRC = '/images/e-qos-pruducts/eqos_logo.png';

const Header: React.FC = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openSection, setOpenSection]   = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const toggleRef   = useRef<HTMLButtonElement>(null);
  const dialogRef   = useRef<HTMLDivElement>(null);
  const location    = useLocation();

  const { user, profile, loading: authLoading, openAuthModal } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); setOpenSection(null); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Menu mobile : focus initial, piège du focus, fermeture par Échap
  useEffect(() => {
    if (!mobileOpen) return;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeMobile(); return; }
      if (e.key !== 'Tab' || !dialog) return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        .filter(el => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen, closeMobile]);

  // Fermeture du menu utilisateur au clic extérieur et à Échap
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setUserMenuOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Échap referme un sous-menu ouvert au clavier
  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Escape') (document.activeElement as HTMLElement | null)?.blur();
  };

  const toggleSection = (name: string) => setOpenSection(prev => prev === name ? null : name);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    try {
      const { signOut } = await import('../../lib/supabase');
      await signOut();
    } catch { /* ignore */ }
  };

  /** Initiales pour l'avatar par défaut */
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?';

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="E-QOS, accueil">
            <img src={LOGO_SRC} alt="E-QOS" className={styles.logoImg} width={1264} height={627} />
          </Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink to={featuredLink.to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                  {featuredLink.label}
                </NavLink>
              </li>
              {menus.map(m => (
                <li key={m.key} className={styles.navItem} onKeyDown={onMenuKeyDown}>
                  <NavLink to={m.to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                    {m.label}
                    <ChevronDown size={13} className={styles.chevron} aria-hidden="true" />
                  </NavLink>
                  <div className={`${styles.dropdown} ${m.wide ? styles.dropdownWide : ''}`}>
                    <ul>
                      {m.links.map(l => (
                        <li key={l.to}>
                          <Link to={l.to} className={styles.dropdownLink}>
                            <span className={styles.dropdownLabel}>{l.label}</span>
                            {l.desc && <span className={styles.dropdownDesc}>{l.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              {directLinks.map(l => (
                <li key={l.to} className={styles.navItem}>
                  <NavLink to={l.to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            {!authLoading && !user && (
              <button type="button" className={styles.signInBtn} onClick={() => openAuthModal('signin')}>
                Connexion
              </button>
            )}

            {!authLoading && user && (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  type="button"
                  className={styles.userAvatar}
                  onClick={() => setUserMenuOpen(v => !v)}
                  aria-label="Menu utilisateur"
                  aria-expanded={userMenuOpen}
                >
                  {profile?.avatar_url
                    ? <img src={profile.avatar_url} alt="" className={styles.avatarImg} />
                    : <span className={styles.avatarInitials}>{initials}</span>
                  }
                  <ChevronDown size={12} aria-hidden="true" className={`${styles.avatarChevron} ${userMenuOpen ? styles.avatarChevronOpen : ''}`} />
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
                    <Link to="/profil" className={styles.userDropdownItem}>
                      <UserCircle size={15} aria-hidden="true" /> Mon profil
                    </Link>
                    {(profile?.role === 'admin' || profile?.role === 'editor') && (
                      <Link to="/admin/articles" className={styles.userDropdownItem}>
                        <LayoutDashboard size={15} aria-hidden="true" /> Gérer les articles
                      </Link>
                    )}
                    <button type="button" className={styles.userDropdownItem} onClick={handleSignOut}>
                      <LogOut size={15} aria-hidden="true" /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link to="/contact" className={styles.ctaBtn}>Nous contacter</Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            <span className={styles.mobileToggleText}>Menu</span>
            <span className={styles.burger} aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={dialogRef}
        className={`${styles.mobileNav} ${mobileOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!mobileOpen}
      >
        <div className={styles.mobileNavHeader}>
          <Link to="/" className={styles.logo} aria-label="E-QOS, accueil">
            <img src={LOGO_SRC} alt="E-QOS" className={styles.logoImg} width={1264} height={627} />
          </Link>
          <button type="button" className={styles.mobileClose} onClick={closeMobile} data-autofocus>
            Fermer
          </button>
        </div>

        <nav className={styles.mobileBody} aria-label="Navigation mobile">
          <div className={styles.mobileSection}>
            <Link to={featuredLink.to} className={styles.mobileLink}>{featuredLink.label}</Link>
          </div>
          {menus.map(m => (
            <div key={m.key} className={styles.mobileSection}>
              <button
                type="button"
                className={styles.mobileAccordionBtn}
                onClick={() => toggleSection(m.key)}
                aria-expanded={openSection === m.key}
                aria-controls={`mobile-${m.key}`}
              >
                <span>{m.label}</span>
                <ChevronDown size={18} aria-hidden="true" className={`${styles.mobileChevron} ${openSection === m.key ? styles.mobileChevronOpen : ''}`} />
              </button>
              <ul id={`mobile-${m.key}`} className={styles.mobileSub} hidden={openSection !== m.key}>
                <li><Link to={m.to} className={styles.mobileSubLink}>{m.allLabel}</Link></li>
                {m.links.map(l => (
                  <li key={l.to}><Link to={l.to} className={styles.mobileSubLink}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          {[...directLinks, { to: '/contact', label: 'Contact' }].map(l => (
            <div key={l.to} className={styles.mobileSection}>
              <Link to={l.to} className={styles.mobileLink}>{l.label}</Link>
            </div>
          ))}
        </nav>

        <div className={styles.mobileFooter}>
          <Link to="/contact" className="btn btn-primary">Nous contacter</Link>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="arrow-link">
            Réserver un appel <ArrowRight size={16} aria-hidden="true" />
          </a>
          {!authLoading && !user && (
            <div className={styles.mobileAuth}>
              <button type="button" className="text-link" onClick={() => { setMobileOpen(false); openAuthModal('signin'); }}>Connexion</button>
              <button type="button" className="text-link" onClick={() => { setMobileOpen(false); openAuthModal('signup'); }}>S'inscrire</button>
            </div>
          )}
          {!authLoading && user && (
            <div className={styles.mobileAuth}>
              <Link to="/profil" className="text-link">{profile?.full_name ?? user.email}</Link>
              <button type="button" className="text-link" onClick={handleSignOut}>Déconnexion</button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.spacer} aria-hidden="true" />
    </>
  );
};

export default Header;
