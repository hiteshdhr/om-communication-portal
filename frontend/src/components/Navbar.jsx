import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, Camera, PhoneCall, DoorOpen, Fingerprint, Wrench, Network, Shield, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/ocw-logo.png'

// ─── Navigation Data ─────────────────────────────────────────────────────────
const solutionGroups = [
  {
    category: 'Surveillance',
    items: [
      { label: 'CCTV Surveillance Systems', href: '/services/cctv', icon: Camera, desc: 'IP & HD cameras, NVR recording, remote view' },
    ],
  },
  {
    category: 'Communication',
    items: [
      { label: 'EPABX & Office Intercom', href: '/services/epabx', icon: PhoneCall, desc: 'Multi-line PBX & society intercoms' },
      { label: 'Video Door Phone (VDP)', href: '/services/vdp', icon: DoorOpen, desc: 'Multi-apartment & villa video entry' },
    ],
  },
  {
    category: 'Access Control',
    items: [
      { label: 'Biometric Access Systems', href: '/services/biometrics', icon: Fingerprint, desc: 'Attendance, face recognition & EM locks' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { label: 'Networking & Structured Cabling', href: '/services/networking', icon: Network, desc: 'CAT6 copper, server racks & PoE switches' },
    ],
  },
  {
    category: 'Maintenance',
    items: [
      { label: 'Annual Maintenance Contracts (AMC)', href: '/services/amc', icon: Wrench, desc: 'Quarterly inspections & priority breakdown SLA' },
    ],
  },
]

const industryLinks = [
  { label: 'Commercial Offices & IT Parks', href: '/industries/offices', desc: 'Integrated CCTV, EPABX, and biometric access' },
  { label: 'Factories & Industrial Plants', href: '/industries/factories', desc: 'Perimeter cameras, conduit wiring, and turnstiles' },
  { label: 'Residential Societies & Apartments', href: '/industries/residential', desc: 'Gate-to-flat intercom, VDP, and society CCTV' },
  { label: 'Retail Chains & Showrooms', href: '/industries/retail', desc: 'Loss prevention cameras and POS network points' },
]

export default function Navbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const solRef = useRef(null)
  const indRef = useRef(null)

  // Close dropdowns on route change
  useEffect(() => {
    setSolutionsOpen(false)
    setIndustriesOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (solRef.current && !solRef.current.contains(e.target)) setSolutionsOpen(false)
      if (indRef.current && !indRef.current.contains(e.target)) setIndustriesOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
      }}>
        {/* ── Brand Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img
            src={logo}
            alt="Om Communication Work"
            style={{ width: 38, height: 38, objectFit: 'contain' }}
          />
          <div>
            <div style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontWeight: 900,
              fontSize: '1rem',
              color: '#111827',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              OM COMMUNICATION
            </div>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: '#B4233C',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Security &amp; Telecom Engineering
            </div>
          </div>
        </Link>

        {/* ── Desktop Navigation Links ── */}
        <nav
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 28 }}
          aria-label="Main Navigation"
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: location.pathname === '/' ? '#B4233C' : '#111827',
              transition: 'color 0.15s',
            }}
          >
            Home
          </Link>

          {/* Solutions Dropdown Trigger */}
          <div ref={solRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setSolutionsOpen(o => !o); setIndustriesOpen(false) }}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: '0.9rem',
                fontWeight: 600,
                color: location.pathname.startsWith('/services') || solutionsOpen ? '#B4233C' : '#111827',
                cursor: 'pointer',
              }}
              aria-expanded={solutionsOpen}
            >
              <span>Solutions</span>
              <ChevronDown size={14} style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 580,
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)',
                    zIndex: 1100,
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 10,
                  }}>
                    {solutionGroups.map((group) => (
                      <div key={group.category} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 10,
                              padding: '10px 12px',
                              borderRadius: 8,
                              textDecoration: 'none',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#F6F7F8'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div style={{
                              width: 32,
                              height: 32,
                              borderRadius: 6,
                              background: '#FAF4F5',
                              border: '1px solid rgba(180, 35, 60, 0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 2,
                            }}>
                              <item.icon size={16} color="#B4233C" />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827', marginBottom: 2 }}>
                                {item.label}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#59636F', lineHeight: 1.35 }}>
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: '1px solid #F0F2F5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Link
                      to="/services"
                      style={{ fontSize: '0.8rem', fontWeight: 700, color: '#B4233C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      View All Solutions Overview <ArrowRight size={13} />
                    </Link>
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Turnkey Installation &amp; AMC</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Dropdown Trigger */}
          <div ref={indRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setIndustriesOpen(o => !o); setSolutionsOpen(false) }}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: '0.9rem',
                fontWeight: 600,
                color: location.pathname.startsWith('/industries') || industriesOpen ? '#B4233C' : '#111827',
                cursor: 'pointer',
              }}
              aria-expanded={industriesOpen}
            >
              <span>Industries</span>
              <ChevronDown size={14} style={{ transform: industriesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            <AnimatePresence>
              {industriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 380,
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)',
                    zIndex: 1100,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {industryLinks.map((ind) => (
                      <Link
                        key={ind.href}
                        to={ind.href}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 6,
                          textDecoration: 'none',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F6F7F8'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827', marginBottom: 2 }}>
                          {ind.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#59636F' }}>
                          {ind.desc}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #F0F2F5' }}>
                    <Link
                      to="/industries"
                      style={{ fontSize: '0.8rem', fontWeight: 700, color: '#B4233C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      All Industry Deployments <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/projects"
            style={{
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: location.pathname === '/projects' ? '#B4233C' : '#111827',
            }}
          >
            Projects
          </Link>

          <Link
            to="/about"
            style={{
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: location.pathname === '/about' ? '#B4233C' : '#111827',
            }}
          >
            About
          </Link>

          <Link
            to="/services/amc"
            style={{
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: location.pathname === '/services/amc' ? '#B4233C' : '#111827',
            }}
          >
            AMC
          </Link>
        </nav>

        {/* ── Right Actions (Phone & Quote CTA) ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href="tel:+917217715296"
            className="desktop-phone"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#111827',
            }}
          >
            <Phone size={14} color="#B4233C" />
            <span>+91 72177 15296</span>
          </a>

          <Link
            to="/quote"
            className="btn-primary"
            style={{
              fontSize: '0.875rem',
              padding: '8px 18px',
              minHeight: 40,
            }}
          >
            Get a Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              padding: 6,
              cursor: 'pointer',
              color: '#111827',
              display: 'none',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: '#FFFFFF',
              borderTop: '1px solid #E5E7EB',
              padding: '16px 20px 24px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/" style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', textDecoration: 'none' }}>
                Home
              </Link>

              <div style={{ borderTop: '1px solid #F0F2F5', paddingTop: 8 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#B4233C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Solutions
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, paddingLeft: 8 }}>
                  <Link to="/services/cctv" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>CCTV Surveillance</Link>
                  <Link to="/services/epabx" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>EPABX &amp; Intercom</Link>
                  <Link to="/services/vdp" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Video Door Phone (VDP)</Link>
                  <Link to="/services/biometrics" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Biometrics &amp; Access Control</Link>
                  <Link to="/services/networking" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Structured Cabling &amp; LAN</Link>
                  <Link to="/services/amc" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Annual Maintenance (AMC)</Link>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F0F2F5', paddingTop: 8 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#B4233C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Industries
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, paddingLeft: 8 }}>
                  <Link to="/industries/offices" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Commercial Offices</Link>
                  <Link to="/industries/factories" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Industrial &amp; Factories</Link>
                  <Link to="/industries/residential" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Residential Societies</Link>
                  <Link to="/industries/retail" style={{ textDecoration: 'none', color: '#59636F', fontSize: '0.9rem' }}>Retail &amp; Showrooms</Link>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F0F2F5', paddingTop: 10, display: 'flex', gap: 16 }}>
                <Link to="/projects" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', textDecoration: 'none' }}>Projects</Link>
                <Link to="/about" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', textDecoration: 'none' }}>About</Link>
                <Link to="/contact" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', textDecoration: 'none' }}>Contact</Link>
              </div>

              <div style={{ borderTop: '1px solid #F0F2F5', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="tel:+917217715296"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    borderRadius: 6,
                    border: '1px solid #D1D5DB',
                    textDecoration: 'none',
                    color: '#111827',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  <Phone size={15} color="#B4233C" /> Call +91 72177 15296
                </a>
                <Link
                  to="/quote"
                  className="btn-primary"
                  style={{ justifyContent: 'center' }}
                >
                  Get a Quotation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .desktop-phone { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  )
}
