import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, Camera, PhoneCall, DoorOpen, Fingerprint, Wrench, Network, Shield, ArrowRight, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/ocw-logo.png'
import { useTheme } from '../utils/theme.jsx'

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
      { label: 'Annual Maintenance Contracts (AMC)', href: '/services/amc', icon: Wrench, desc: 'Quarterly inspections & priority breakdown support' },
    ],
  },
]

const industryLinks = [
  { label: 'Commercial Offices & IT Parks', href: '/industries/offices', desc: 'Integrated CCTV, EPABX, and biometric access' },
  { label: 'Factories & Industrial Plants', href: '/industries/factories', desc: 'Perimeter cameras, conduit wiring, and turnstiles' },
  { label: 'Residential Societies & Apartments', href: '/industries/residential', desc: 'Gate-to-flat intercom, VDP, and society CCTV' },
  { label: 'Retail Chains & Showrooms', href: '/industries/retail', desc: 'Loss prevention cameras and POS network points' },
]

const NAVBAR_HEIGHT = 68
const SCROLL_THRESHOLD = 6 // px of scroll required before triggering hide/show

export default function Navbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Scroll-hide state
  const [headerVisible, setHeaderVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const solRef = useRef(null)
  const indRef = useRef(null)

  // Close dropdowns on route change
  useEffect(() => {
    setSolutionsOpen(false)
    setIndustriesOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  // ── Samsung-style scroll hide / reveal ──────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY
        const diff = currentY - lastScrollY.current

        // Show header whenever near the top of the page
        if (currentY < NAVBAR_HEIGHT) {
          setHeaderVisible(true)
          setScrolled(false)
        } else {
          setScrolled(true)
          // Only react when movement exceeds threshold (prevents micro-jitter)
          if (Math.abs(diff) >= SCROLL_THRESHOLD) {
            if (diff > 0) {
              // Scrolling DOWN — hide header
              setHeaderVisible(false)
              // Close any open menus so they don't hover orphaned
              setSolutionsOpen(false)
              setIndustriesOpen(false)
            } else {
              // Scrolling UP — show header
              setHeaderVisible(true)
            }
          }
        }

        lastScrollY.current = currentY
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on outside click and Escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (solRef.current && !solRef.current.contains(e.target)) setSolutionsOpen(false)
      if (indRef.current && !indRef.current.contains(e.target)) setIndustriesOpen(false)
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        setSolutionsOpen(false)
        setIndustriesOpen(false)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [])

  return (
    <>
      {/* ── Spacer: prevents layout shift when header is fixed ── */}
      <div style={{ height: NAVBAR_HEIGHT, flexShrink: 0 }} aria-hidden="true" />

      {/* ── Backdrop Behind Mega Menu & Dropdowns ── */}
      <AnimatePresence>
        {(solutionsOpen || industriesOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setSolutionsOpen(false)
              setIndustriesOpen(false)
            }}
            style={{
              position: 'fixed',
              top: NAVBAR_HEIGHT,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'dark' ? 'rgba(0, 0, 0, 0.30)' : 'rgba(15, 23, 42, 0.12)',
              zIndex: 999,
              pointerEvents: 'auto',
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'var(--bg-white)',
          borderBottom: scrolled
            ? '1px solid var(--border-light)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? (theme === 'dark'
                ? '0 2px 12px rgba(0,0,0,0.35)'
                : '0 2px 12px rgba(15,23,42,0.08)')
            : 'none',
          transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: [
            'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
            'background-color 0.3s ease',
            'border-color 0.3s ease',
            'box-shadow 0.3s ease',
          ].join(', '),
          willChange: 'transform',
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
        position: 'relative',
        zIndex: 1002,
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
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              OM COMMUNICATION
            </div>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--red-primary)',
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
              color: location.pathname === '/' ? 'var(--red-primary)' : 'var(--text-primary)',
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
                color: location.pathname.startsWith('/services') || solutionsOpen ? 'var(--red-primary)' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
            >
              <span>Solutions</span>
              <ChevronDown
                size={14}
                style={{
                  transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.985, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                  exit={{ opacity: 0, y: -8, scale: 0.985, x: '-50%' }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transformOrigin: 'top center',
                    width: 580,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: theme === 'dark'
                      ? '0 20px 45px -4px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)'
                      : '0 20px 45px -4px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.06)',
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
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div style={{
                              width: 32,
                              height: 32,
                              borderRadius: 6,
                              background: 'var(--red-light)',
                              border: '1px solid var(--border-red)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 2,
                            }}>
                              <item.icon size={16} color="var(--red-primary)" />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                                {item.label}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
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
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Link
                      to="/services"
                      style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--red-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      View All Solutions Overview <ArrowRight size={13} />
                    </Link>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Turnkey Installation &amp; AMC</span>
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
                color: location.pathname.startsWith('/industries') || industriesOpen ? 'var(--red-primary)' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
              aria-expanded={industriesOpen}
              aria-haspopup="true"
            >
              <span>Industries</span>
              <ChevronDown
                size={14}
                style={{
                  transform: industriesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </button>

            <AnimatePresence>
              {industriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.985, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                  exit={{ opacity: 0, y: -8, scale: 0.985, x: '-50%' }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transformOrigin: 'top center',
                    width: 380,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: theme === 'dark'
                      ? '0 20px 45px -4px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)'
                      : '0 20px 45px -4px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.06)',
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
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                          {ind.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {ind.desc}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                    <Link
                      to="/industries"
                      style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--red-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
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
              color: location.pathname === '/projects' ? 'var(--red-primary)' : 'var(--text-primary)',
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
              color: location.pathname === '/about' ? 'var(--red-primary)' : 'var(--text-primary)',
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
              color: location.pathname === '/services/amc' ? 'var(--red-primary)' : 'var(--text-primary)',
            }}
          >
            AMC
          </Link>
        </nav>

        {/* ── Right Actions (Theme Toggle, Phone & Quote CTA) ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease',
            }}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} color="#FBBF24" />}
          </button>

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
              color: 'var(--text-primary)',
            }}
          >
            <Phone size={14} color="var(--red-primary)" />
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
              color: 'var(--text-primary)',
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
              background: 'var(--bg-white)',
              borderTop: '1px solid var(--border-light)',
              padding: '16px 20px 24px',
              overflow: 'hidden',
              transition: 'background-color 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
                Home
              </Link>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--red-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Solutions
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, paddingLeft: 8 }}>
                  <Link to="/services/cctv" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>CCTV Surveillance</Link>
                  <Link to="/services/epabx" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>EPABX &amp; Intercom</Link>
                  <Link to="/services/vdp" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Video Door Phone (VDP)</Link>
                  <Link to="/services/biometrics" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Biometrics &amp; Access Control</Link>
                  <Link to="/services/networking" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Structured Cabling &amp; LAN</Link>
                  <Link to="/services/amc" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Annual Maintenance (AMC)</Link>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--red-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Industries
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, paddingLeft: 8 }}>
                  <Link to="/industries/offices" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Commercial Offices</Link>
                  <Link to="/industries/factories" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Industrial &amp; Factories</Link>
                  <Link to="/industries/residential" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Residential Societies</Link>
                  <Link to="/industries/retail" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Retail &amp; Showrooms</Link>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10, display: 'flex', gap: 16 }}>
                <Link to="/projects" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>Projects</Link>
                <Link to="/about" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>About</Link>
                <Link to="/contact" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>Contact</Link>
              </div>

              {/* Theme Toggle Row (Mobile) */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Theme Mode</span>
                <button
                  onClick={toggleTheme}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 6,
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  {theme === 'light' ? <Moon size={15} /> : <Sun size={15} color="#FBBF24" />}
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="tel:+917217715296"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    borderRadius: 6,
                    border: '1px solid var(--border-light)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  <Phone size={15} color="var(--red-primary)" /> Call +91 72177 15296
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
    </>
  )
}
