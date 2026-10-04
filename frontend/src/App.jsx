import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Existing working pages
import LandingPage from './pages/LandingPage'
import QuoteEstimator from './pages/QuoteEstimator'
import ComplaintDesk from './pages/ComplaintDesk'
import InvoicePayment from './pages/InvoicePayment'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

// New dedicated multi-page routes
import AboutPage from './pages/AboutPage'
import ServicesOverviewPage from './pages/ServicesOverviewPage'
import CctvPage from './pages/services/CctvPage'
import EpabxPage from './pages/services/EpabxPage'
import VdpPage from './pages/services/VdpPage'
import BiometricsPage from './pages/services/BiometricsPage'
import AmcPage from './pages/services/AmcPage'
import NetworkingPage from './pages/services/NetworkingPage'

import IndustriesOverviewPage from './pages/IndustriesOverviewPage'
import ResidentialPage from './pages/industries/ResidentialPage'
import FactoriesPage from './pages/industries/FactoriesPage'
import OfficesPage from './pages/industries/OfficesPage'
import RetailPage from './pages/industries/RetailPage'

import SolutionsPage from './pages/SolutionsPage'
import InstallationPage from './pages/InstallationPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import LLMInfoPage from './pages/LLMInfoPage'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('om_admin_token')
  return token ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0f2035',
            color: '#F8FAFC',
            border: '1px solid rgba(197,160,63,0.3)',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#0f2035' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#0f2035' } },
        }}
      />
      <Routes>
        {/* Core Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Services Spectrum */}
        <Route path="/services" element={<ServicesOverviewPage />} />
        <Route path="/services/cctv" element={<CctvPage />} />
        <Route path="/services/epabx" element={<EpabxPage />} />
        <Route path="/services/vdp" element={<VdpPage />} />
        <Route path="/services/biometrics" element={<BiometricsPage />} />
        <Route path="/services/amc" element={<AmcPage />} />
        <Route path="/services/networking" element={<NetworkingPage />} />

        {/* Industries Served */}
        <Route path="/industries" element={<IndustriesOverviewPage />} />
        <Route path="/industries/residential" element={<ResidentialPage />} />
        <Route path="/industries/factories" element={<FactoriesPage />} />
        <Route path="/industries/offices" element={<OfficesPage />} />
        <Route path="/industries/retail" element={<RetailPage />} />

        {/* Solutions & Installation Workflow */}
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/installation" element={<InstallationPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Dynamic Service Quote & Complaint Desk */}
        <Route path="/quote" element={<QuoteEstimator />} />
        <Route path="/complaint" element={<ComplaintDesk />} />
        <Route path="/pay/:invoiceNumber" element={<InvoicePayment />} />

        {/* Admin Portal */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />

        {/* Catch-all redirect */}
        <Route path="/llm" element={<LLMInfoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
