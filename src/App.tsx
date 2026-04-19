import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { CustomCursor } from './components/home/CustomCursor';
import { ScrollProgress } from './components/home/ScrollProgress';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import './styles/globals.css';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

// Global AuthModal — rendered once at root so any component can open it
const GlobalAuthModal: React.FC = () => {
  const { modalOpen, modalTab, closeModal } = useAuth();
  return <AuthModal isOpen={modalOpen} initialTab={modalTab} onClose={closeModal} />;
};

// Layout wrapper
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <ScrollProgress />
    <CustomCursor />
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));

// Services (8 services EQOS)
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const TransformationDigitalePage = lazy(() => import('./pages/services/TransformationDigitalePage'));
const ConseilOrganisationnelPage = lazy(() => import('./pages/services/ConseilOrganisationnelPage'));
const OdooPage = lazy(() => import('./pages/services/OdooPage'));
const PaiementsLocauxPage = lazy(() => import('./pages/services/PaiementsLocauxPage'));
const CybersecuritePage = lazy(() => import('./pages/services/CybersecuritePage'));
const SupportPage = lazy(() => import('./pages/services/SupportPage'));
const ManagementConsultingPage = lazy(() => import('./pages/services/ManagementConsultingPage'));
const InterimPage = lazy(() => import('./pages/services/InterimPage'));

// Secteurs
const SecteursPage = lazy(() => import('./pages/secteurs/SecteursPage'));
const MinesPage = lazy(() => import('./pages/secteurs/MinesPage'));
const TelecomPage = lazy(() => import('./pages/secteurs/TelecomPage'));
const BanquePage = lazy(() => import('./pages/secteurs/BanquePage'));
const SantePage = lazy(() => import('./pages/secteurs/SantePage'));
const SecteurPublicPage = lazy(() => import('./pages/secteurs/SecteurPublicPage'));
const AgriculturePage = lazy(() => import('./pages/secteurs/AgriculturePage'));
const CommercePage = lazy(() => import('./pages/secteurs/CommercePage'));
const EducationPage = lazy(() => import('./pages/secteurs/EducationPage'));

// Solutions
const SolutionsPage = lazy(() => import('./pages/solutions/SolutionsPage'));
const WaliPage = lazy(() => import('./pages/solutions/WaliPage'));
const WandiPage = lazy(() => import('./pages/solutions/WandiPage'));
const MakitiPage = lazy(() => import('./pages/solutions/MakitiPage'));

// Autres
const RessourcesPage = lazy(() => import('./pages/RessourcesPage'));
const ArticlePage    = lazy(() => import('./pages/ArticlePage'));
const AProposPage = lazy(() => import('./pages/AProposPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const OffresEmploiPage = lazy(() => import('./pages/OffresEmploiPage'));
const ProfilPage = lazy(() => import('./pages/ProfilPage'));

// Légal
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'));
const ConfidentialitePage  = lazy(() => import('./pages/ConfidentialitePage'));

// Équipe
const DirectionGeneralePage = lazy(() => import('./pages/equipe/DirectionGeneralePage'));
const TechniquePage = lazy(() => import('./pages/equipe/TechniquePage'));
const MarketingEquipePage = lazy(() => import('./pages/equipe/MarketingPage'));
const SupportEquipePage = lazy(() => import('./pages/equipe/SupportEquipePage'));

// Loading fallback
const PageLoader: React.FC = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#FF6B2C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />
      <GlobalAuthModal />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />

          {/* Services */}
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/services/transformation-digitale" element={<Layout><TransformationDigitalePage /></Layout>} />
          <Route path="/services/conseil-organisationnel" element={<Layout><ConseilOrganisationnelPage /></Layout>} />
          <Route path="/services/odoo" element={<Layout><OdooPage /></Layout>} />
          <Route path="/services/paiements-locaux" element={<Layout><PaiementsLocauxPage /></Layout>} />
          <Route path="/services/cybersecurite" element={<Layout><CybersecuritePage /></Layout>} />
          <Route path="/services/support" element={<Layout><SupportPage /></Layout>} />
          <Route path="/services/management-consulting" element={<Layout><ManagementConsultingPage /></Layout>} />
          <Route path="/services/interim" element={<Layout><InterimPage /></Layout>} />

          {/* Legacy redirects services */}
          <Route path="/services/erp" element={<Layout><OdooPage /></Layout>} />
          <Route path="/services/paiements" element={<Layout><PaiementsLocauxPage /></Layout>} />
          <Route path="/services/conseil" element={<Layout><ConseilOrganisationnelPage /></Layout>} />

          {/* Secteurs */}
          <Route path="/secteurs" element={<Layout><SecteursPage /></Layout>} />
          <Route path="/secteurs/mines-ressources" element={<Layout><MinesPage /></Layout>} />
          <Route path="/secteurs/telecom" element={<Layout><TelecomPage /></Layout>} />
          <Route path="/secteurs/banque-finance" element={<Layout><BanquePage /></Layout>} />
          <Route path="/secteurs/sante" element={<Layout><SantePage /></Layout>} />
          <Route path="/secteurs/secteur-public" element={<Layout><SecteurPublicPage /></Layout>} />
          <Route path="/secteurs/agriculture" element={<Layout><AgriculturePage /></Layout>} />
          <Route path="/secteurs/commerce-distribution" element={<Layout><CommercePage /></Layout>} />
          <Route path="/secteurs/education" element={<Layout><EducationPage /></Layout>} />

          {/* Solutions */}
          <Route path="/solutions" element={<Layout><SolutionsPage /></Layout>} />
          <Route path="/solutions/wali" element={<Layout><WaliPage /></Layout>} />
          <Route path="/solutions/wandi" element={<Layout><WandiPage /></Layout>} />
          <Route path="/solutions/makiti" element={<Layout><MakitiPage /></Layout>} />

          {/* Autres */}
          <Route path="/ressources" element={<Layout><RessourcesPage /></Layout>} />
          <Route path="/ressources/:slug" element={<Layout><ArticlePage /></Layout>} />
          <Route path="/a-propos" element={<Layout><AProposPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/carrieres" element={<Layout><OffresEmploiPage /></Layout>} />
          <Route path="/profil"   element={<Layout><ProfilPage /></Layout>} />

          {/* Équipe */}
          <Route path="/equipe/direction-generale" element={<Layout><DirectionGeneralePage /></Layout>} />
          <Route path="/equipe/technique" element={<Layout><TechniquePage /></Layout>} />
          <Route path="/equipe/marketing" element={<Layout><MarketingEquipePage /></Layout>} />
          <Route path="/equipe/support" element={<Layout><SupportEquipePage /></Layout>} />

          {/* Légal */}
          <Route path="/mentions-legales" element={<Layout><MentionsLegalesPage /></Layout>} />
          <Route path="/confidentialite"  element={<Layout><ConfidentialitePage /></Layout>} />

          {/* Legacy */}
          <Route path="/app/wali" element={<Layout><WaliPage /></Layout>} />
          <Route path="/app/wandi" element={<Layout><WandiPage /></Layout>} />
          <Route path="/app/makiti" element={<Layout><MakitiPage /></Layout>} />
        </Routes>
      </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
