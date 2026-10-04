import { useState, useEffect, useRef, useCallback } from 'react'
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

// ─── Constants ───────────────────────────────────────────────────────────────
const NAVBAR_HEIGHT   = 68
const SCROLL_SOLID_AT = 40   // px from top before header becomes solid
const SCROLL_HIDE_AFTER = 160 // px — only start hiding the header past this depth
const SCROLL_DELTA      = 6   // px — ignore tiny scroll jitter before reacting
const HOVER_OPEN_DELAY  = 180  // ms before mega-menu opens on hover
const HOVER_CLOSE_DELAY = 120  // ms after cursor leaves before closing

// ─── Framer Motion Variants ──────────────────────────────────────────────────
const menuContainerVariants = {
  hidden: { opacity: 0, y: -10, scaleY: 0.97 },
  visible: {
    opacity: 1, y: 0, scaleY: 1,
    transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1], staggerChildren: 0.04, delayChildren: 0.06 },
  },
  exit: { opacity: 0, y: -8, scaleY: 0.97, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
}

const menuItemVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] } },
}

// Reduced-motion overrides
const menuContainerVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
  exit:   { opacity: 0, transition: { duration: 0.08 } },
}
const menuItemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// ─── Navbar Component ─────────────────────────────────────────────────────────
export default function Navbar() {
  // Which menu is open: null | 'solutions' | 'industries'
  const [activeMenu, setActiveMenu]       = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll state — controls transparent vs solid appearance only
  const [scrolled, setScrolled] = useState(false)
  // Hide-on-scroll-down / reveal-on-scroll-up (Samsung-style header)
  const [hidden, setHidden] = useState(false)

  // Hover intent timers
  const openTimerRef  = useRef(null)
  const closeTimerRef = useRef(null)

  // Scroll bookkeeping
  const ticking = useRef(false)
  const lastScrollY = useRef(0)

  // Reduced-motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  // Is this the homepage? (transparent overlay header only on /)
  const isHomePage = location.pathname === '/'

  // ── refs for click-outside detection ──────────────────────────────────────
  const solRef = useRef(null)
  const indRef = useRef(null)
  const navRef = useRef(null)

  // ── Detect reduced motion ─────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Close menus on route change ───────────────────────────────────────────
  useEffect(() => {
    clearTimeout(openTimerRef.current)
    clearTimeout(closeTimerRef.current)
    setActiveMenu(null)
    setMobileMenuOpen(false)
  }, [location.pathname])

  // ── Scroll handler — appearance (transparent → solid) + hide/reveal ──────
  useEffect(() => {
    const startY = window.scrollY || document.documentElement.scrollTop || 0
    setScrolled(startY > SCROLL_SOLID_AT)
    lastScrollY.current = startY

    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop || 0
        setScrolled(y > SCROLL_SOLID_AT)

        // Direction-based hide/reveal with a small delta so it does not flicker.
        const prev = lastScrollY.current
        if (Math.abs(y - prev) > SCROLL_DELTA) {
          if (y > prev && y > SCROLL_HIDE_AFTER) setHidden(true)   // scrolling down
          else if (y < prev) setHidden(false)                     // scrolling up
          lastScrollY.current = y
        }
        if (y <= SCROLL_HIDE_AFTER) setHidden(false)              // always show near top

        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Escape key + outside click ────────────────────────────────────────────
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        clearTimeout(openTimerRef.current)
        clearTimeout(closeTimerRef.current)
        setActiveMenu(null)
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        clearTimeout(openTimerRef.current)
        clearTimeout(closeTimerRef.current)
        setActiveMenu(null)
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

  // ── Hover Intent Handlers (desktop only) ──────────────────────────────────
  const handleMenuMouseEnter = useCallback((menuName) => {
    clearTimeout(closeTimerRef.current)
    clearTimeout(openTimerRef.current)
    openTimerRef.current = setTimeout(() => {
      setActiveMenu(menuName)
    }, HOVER_OPEN_DELAY)
  }, [])

  const handleMenuMouseLeave = useCallback(() => {
    clearTimeout(openTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, HOVER_CLOSE_DELAY)
  }, [])

  const handleMegaMenuMouseEnter = useCallback(() => {
    clearTimeout(closeTimerRef.current)
    clearTimeout(openTimerRef.current)
  }, [])

  const handleMegaMenuMouseLeave = useCallback(() => {
    clearTimeout(openTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, HOVER_CLOSE_DELAY)
  }, [])

  // Toggle on click (keyboard/click fallback)
  const handleMenuClick = useCallback((menuName) => {
    clearTimeout(openTimerRef.current)
    clearTimeout(closeTimerRef.current)
    setActiveMenu(prev => prev === menuName ? null : menuName)
  }, [])

  // ── Cleanup timers on unmount ─────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current)
      clearTimeout(closeTimerRef.current)
    }
  }, [])

  // ── Computed header appearance ────────────────────────────────────────────
  const solutionsOpen  = activeMenu === 'solutions'
  const industriesOpen = activeMenu === 'industries'
  const isMenuOpen     = solutionsOpen || industriesOpen

  // Slide the header up only while genuinely scrolling down — never while a
  // menu is open, and never when the user prefers reduced motion.
  const headerHidden = hidden && !isMenuOpen && !mobileMenuOpen && !prefersReducedMotion

  // On homepage at top: transparent overlay EXCEPT when mega-menu is open.
  // When mega-menu is open, header transitions to white/surface so header + mega-menu merge as ONE unified surface.
  const isTransparent = isHomePage && !scrolled && !isMenuOpen

  // Header background
  const headerBg = isTransparent
    ? 'transparent'
    : (theme === 'dark'
        ? 'rgba(23, 26, 32, 0.97)'
        : 'rgba(255, 255, 255, 0.97)')

  // Backdrop filter (frosted glass when scrolled or menu open, none when transparent)
  const headerBackdrop = isTransparent ? 'none' : 'blur(16px) saturate(160%)'

  // Border: Remove header bottom border when mega-menu is open so they visually merge
  const headerBorder = isMenuOpen
    ? '1px solid transparent'
    : (scrolled
        ? (theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)')
        : '1px solid transparent')

  // Shadow: Remove header shadow when mega-menu is open (shadow is at bottom of mega-menu)
  const headerShadow = isMenuOpen
    ? 'none'
    : (scrolled
        ? (theme === 'dark'
            ? '0 2px 20px rgba(0,0,0,0.45)'
            : '0 2px 20px rgba(15,23,42,0.1)')
        : 'none')

  // Text color: white on transparent dark hero, theme-aware otherwise
  const navTextColor   = isTransparent ? 'rgba(255,255,255,0.88)' : 'var(--text-primary)'
  // Active Solutions/Industries text color: red accent on solid/open surface, restrained warm white on transparent
  const navActiveColor = isTransparent ? 'rgba(255,255,255,1)' : 'var(--red-primary)'

  // Pick correct animation variants based on reduced-motion pref
  const cVariants = prefersReducedMotion ? menuContainerVariantsReduced : menuContainerVariants
  const iVariants = prefersReducedMotion ? menuItemVariantsReduced : menuItemVariants

  return (
    <>
      {/*
       * ── Spacer: Only shown on non-homepage pages (or homepage when NOT transparent).
       * On homepage we want the header to overlay the hero, so no spacer.
       */}
      {!isHomePage && (
        <div style={{ height: NAVBAR_HEIGHT, flexShrink: 0 }} aria-hidden="true" />
      )}

      {/* ── Page backdrop when mega-menu is open ─────────────────────────── */}
      <AnimatePresence>
        {(solutionsOpen || industriesOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.05 : 0.2 }}
            onClick={() => {
              clearTimeout(openTimerRef.current)
              clearTimeout(closeTimerRef.current)
              setActiveMenu(null)
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'dark' ? 'rgba(0, 0, 0, 0.28)' : 'rgba(15, 23, 42, 0.10)',
              zIndex: 998,
              pointerEvents: 'auto',
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: headerBg,
          backdropFilter: headerBackdrop,
          WebkitBackdropFilter: headerBackdrop,
          borderBottom: headerBorder,
          boxShadow: headerShadow,
          // Samsung-style: slide up on scroll-down, slide back on scroll-up.
          // Use `none` (not translateY(0)) when visible so the header never
          // becomes a containing block for its fixed descendants (mega menu).
          transform: 'none',
          willChange: 'transform',
          transition: [
            'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            'background 0.35s ease',
            'backdrop-filter 0.35s ease',
            'border-color 0.35s ease',
            'box-shadow 0.35s ease',
          ].join(', '),
        }}
      >
        <div
          ref={navRef}
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 clamp(16px, 4vw, 32px)',
            height: NAVBAR_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            position: 'relative',
            zIndex: 1002,
          }}
        >
          {/* ── Brand Logo ── */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
          >
            <img
              src={logo}
              alt="Om Communication Work"
              style={{
                width: 38,
                height: 38,
                objectFit: 'contain',
                transition: 'opacity 0.35s ease',
              }}
            />
            <div>
              <div style={{
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontWeight: 900,
                fontSize: '1rem',
                color: isTransparent ? '#FFFFFF' : 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                transition: 'color 0.35s ease',
              }}>
                OM COMMUNICATION
              </div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: isTransparent ? 'rgba(255,255,255,0.65)' : 'var(--red-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.35s ease',
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
                color: location.pathname === '/' ? navActiveColor : navTextColor,
                transition: 'color 0.2s ease',
              }}
            >
              Home
            </Link>

            {/* ── Solutions Trigger ── */}
            <div
              ref={solRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMenuMouseEnter('solutions')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button
                id="solutions-trigger"
                onClick={() => handleMenuClick('solutions')}
                onFocus={() => handleMenuMouseEnter('solutions')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: location.pathname.startsWith('/services') || solutionsOpen
                    ? navActiveColor
                    : navTextColor,
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                aria-controls="solutions-menu"
              >
                <span>Solutions</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: 'inherit',
                  }}
                />
              </button>
            </div>

            {/* ── Industries Trigger ── */}
            <div
              ref={indRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMenuMouseEnter('industries')}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button
                id="industries-trigger"
                onClick={() => handleMenuClick('industries')}
                onFocus={() => handleMenuMouseEnter('industries')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: location.pathname.startsWith('/industries') || industriesOpen
                    ? navActiveColor
                    : navTextColor,
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                aria-expanded={industriesOpen}
                aria-haspopup="true"
                aria-controls="industries-menu"
              >
                <span>Industries</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: industriesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: 'inherit',
                  }}
                />
              </button>
            </div>

            <Link
              to="/projects"
              style={{
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: location.pathname === '/projects' ? navActiveColor : navTextColor,
                transition: 'color 0.2s ease',
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
                color: location.pathname === '/about' ? navActiveColor : navTextColor,
                transition: 'color 0.2s ease',
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
                color: location.pathname === '/services/amc' ? navActiveColor : navTextColor,
                transition: 'color 0.2s ease',
              }}
            >
              AMC
            </Link>
          </nav>

          {/* ── Right Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            {/* Theme Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              style={{
                /* No background box in transparent mode — icon sits directly over hero */
                background: isTransparent ? 'transparent' : 'var(--bg-surface)',
                border: isTransparent ? 'none' : '1px solid var(--border-light)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isTransparent ? 'rgba(255,255,255,0.88)' : 'var(--text-primary)',
                transition: 'all 0.3s ease',
              }}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} color={isTransparent ? '#FBBF24' : '#FBBF24'} />}
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
                fontWeight: 600,
                color: navTextColor,
                transition: 'color 0.3s ease',
              }}
            >
              <Phone size={14} color={isTransparent ? 'rgba(255,255,255,0.7)' : 'var(--red-primary)'} />
              <span>+91 72177 15296</span>
            </a>

            <Link
              to="/quote"
              className="btn-primary"
              style={{
                fontSize: '0.875rem',
                padding: '8px 18px',
                minHeight: 40,
                // slightly more opaque on transparent header so CTA reads well
                ...(isTransparent ? {
                  background: 'var(--red-primary)',
                  color: '#fff',
                } : {}),
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
                color: isTransparent ? '#FFFFFF' : 'var(--text-primary)',
                display: 'none',
                transition: 'color 0.3s ease',
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
              transition={{ duration: prefersReducedMotion ? 0.05 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                background: theme === 'dark' ? 'rgba(15, 17, 21, 0.97)' : 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(14px)',
                borderTop: '1px solid var(--border-light)',
                padding: '16px 20px 24px',
                overflow: 'hidden',
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
                  <Link to="/quote" className="btn-primary" style={{ justifyContent: 'center' }}>
                    Get a Quotation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          MEGA MENU PANEL — rendered as a fixed overlay BELOW the header.
          Both menus share one persistent container so switching feels seamless.
         ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(solutionsOpen || industriesOpen) && (
          <motion.div
            key={activeMenu} // key change = re-animate content when switching
            id={solutionsOpen ? 'solutions-menu' : 'industries-menu'}
            role="region"
            aria-label={solutionsOpen ? 'Solutions mega menu' : 'Industries mega menu'}
            variants={cVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              top: NAVBAR_HEIGHT,
              left: 0,
              right: 0,
              zIndex: 999,
              transformOrigin: 'top center',
              // Glassmorphism panel
              background: theme === 'dark'
                ? 'rgba(23, 26, 32, 0.97)'
                : 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(16px) saturate(160%)',
              WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              borderBottom: theme === 'dark'
                ? '1px solid rgba(255,255,255,0.07)'
                : '1px solid rgba(0,0,0,0.07)',
              boxShadow: theme === 'dark'
                ? '0 24px 48px -4px rgba(0,0,0,0.6)'
                : '0 24px 48px -4px rgba(15,23,42,0.14)',
            }}
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          >
            <div
              style={{
                maxWidth: 1240,
                margin: '0 auto',
                /* Tighter vertical padding: ~30% reduction from 32px → 14px top/bottom */
                padding: '14px clamp(16px, 4vw, 32px)',
              }}
            >
              {/* ── SOLUTIONS CONTENT ── */}
              {solutionsOpen && (
                <>
                  {/* Section heading */}
                  <motion.div
                    variants={iVariants}
                    style={{ marginBottom: 10, display: 'flex', alignItems: 'baseline', gap: 10 }}
                  >
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--red-primary)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}>
                      Our Solutions
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Security &amp; telecom systems engineered for your site
                    </div>
                  </motion.div>

                  {/* Grid of solution groups */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 4,
                    marginBottom: 12,
                  }}>
                    {solutionGroups.map((group) => (
                      group.items.map((item) => (
                        <motion.div key={item.href} variants={iVariants}>
                          <Link
                            to={item.href}
                            onClick={() => setActiveMenu(null)}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 10,
                              padding: '7px 10px',
                              borderRadius: 8,
                              textDecoration: 'none',
                              transition: 'background 0.15s ease, transform 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'var(--bg-surface)'
                              e.currentTarget.style.transform = 'translateX(3px)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'transparent'
                              e.currentTarget.style.transform = 'translateX(0)'
                            }}
                          >
                             <div style={{
                              width: 30,
                              height: 30,
                              borderRadius: 7,
                              background: 'var(--red-light)',
                              border: '1px solid var(--border-red)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 1,
                            }}>
                              <item.icon size={16} color="var(--red-primary)" />
                            </div>
                            <div>
                              <div style={{
                                fontSize: '0.88rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                marginBottom: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                              }}>
                                {item.label}
                                <ArrowRight
                                  size={12}
                                  color="var(--red-primary)"
                                  style={{ opacity: 0.7, transition: 'transform 0.15s ease' }}
                                />
                              </div>
                              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))
                    ))}
                  </div>

                  {/* Footer row */}
                  <motion.div
                    variants={iVariants}
                    style={{
                      paddingTop: 10,
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Link
                      to="/services"
                      onClick={() => setActiveMenu(null)}
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--red-primary)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        transition: 'gap 0.15s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.gap = '8px' }}
                      onMouseLeave={e => { e.currentTarget.style.gap = '5px' }}
                    >
                      View All Solutions Overview <ArrowRight size={14} />
                    </Link>
                    <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                      Turnkey Installation &amp; AMC
                    </span>
                  </motion.div>
                </>
              )}

              {/* ── INDUSTRIES CONTENT ── */}
              {industriesOpen && (
                <>
                  {/* Section heading */}
                  <motion.div
                    variants={iVariants}
                    style={{ marginBottom: 10, display: 'flex', alignItems: 'baseline', gap: 10 }}
                  >
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--red-primary)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}>
                      Industries We Serve
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Sector-specific deployments across Delhi-NCR
                    </div>
                  </motion.div>

                  {/* Industry links grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 4,
                    marginBottom: 12,
                  }}>
                    {industryLinks.map((ind) => (
                      <motion.div key={ind.href} variants={iVariants}>
                        <Link
                          to={ind.href}
                          onClick={() => setActiveMenu(null)}
                          style={{
                            display: 'block',
                            padding: '7px 10px',
                            borderRadius: 8,
                            textDecoration: 'none',
                            transition: 'background 0.15s ease, transform 0.15s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--bg-surface)'
                            e.currentTarget.style.transform = 'translateX(3px)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.transform = 'translateX(0)'
                          }}
                        >
                          <div style={{
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}>
                            {ind.label}
                            <ArrowRight
                              size={12}
                              color="var(--red-primary)"
                              style={{ opacity: 0.7 }}
                            />
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            {ind.desc}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer row */}
                  <motion.div
                    variants={iVariants}
                    style={{
                      paddingTop: 10,
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Link
                      to="/industries"
                      onClick={() => setActiveMenu(null)}
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--red-primary)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        transition: 'gap 0.15s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.gap = '8px' }}
                      onMouseLeave={e => { e.currentTarget.style.gap = '5px' }}
                    >
                      All Industry Deployments <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive CSS ─────────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav   { display: none !important; }
          .desktop-phone { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  )
}
