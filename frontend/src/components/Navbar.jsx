import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, ChevronDown, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/ocw-logo.png'

const serviceLinks = [
  { label: 'CCTV Surveillance', href: '/services/cctv', desc: 'IP & HD Analog systems, NVR setup & remote monitoring' },
  { label: 'EPABX & Telecom', href: '/services/epabx', desc: 'Intercoms, multi-line systems & society cabling' },
  { label: 'Video Door Phone (VDP)', href: '/services/vdp', desc: 'Multi-apartment & villa video entry systems' },
  { label: 'Biometrics & Access', href: '/services/biometrics', desc: 'Attendance, face recognition & smart door access' },
  { label: 'AMC & Turnkey Wiring', href: '/services/amc', desc: 'Annual maintenance contracts & preventative service' },
]

const industryLinks = [
  { label: 'Residential Societies', href: '/industries/residential' },
  { label: 'Factories & Industrial', href: '/industries/factories' },
  { label: 'Commercial Offices', href: '/industries/offices' },
  { label: 'Retail Chains', href: '/industries/retail' },
]

const moreLinks = [
  { label: 'Turnkey Solutions', href: '/solutions' },
  { label: 'Installation Process', href: '/installation' },
  { label: 'AMC Support', href: '/services/amc' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Support Desk', href: '/complaint' },
]

function DropdownMenu({ links, showDesc = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        left: -20,
        minWidth: showDesc ? 290 : 210,
        background: 'rgba(4,12,26,0.98)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(197,160,63,0.22)',
        borderRadius: 12,
        padding: '8px',
        boxShadow: '0 20px 48px rgba(0,0,0,0.65)',
        zIndex: 1100,
      }}
    >
      {links.map(s => (
        <Link
          key={s.href}
          to={s.href}
          style={{
            display: 'block',
            padding: '9px 12px',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#F8FAFC',
            fontSize: '0.845rem',
            fontWeight: 600,
            transition: 'background 0.18s, color 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,63,0.11)'; e.currentTarget.style.color = '#FBF6E0' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F8FAFC' }}
        >
          <div>{s.label}</div>
          {showDesc && s.desc && (
            <div style={{ fontSize: '0.72rem', color: '#607080', fontWeight: 400, marginTop: 2 }}>{s.desc}</div>
          )}
        </Link>
      ))}
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) // 'services' | 'industries' | 'more' | null
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  const NavLink = ({ to, label, isDropdownTrigger = false, dropdownKey }) => {
    const active = isActive(to)
    return (
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => isDropdownTrigger && setOpenDropdown(dropdownKey)}
        onMouseLeave={() => isDropdownTrigger && setOpenDropdown(null)}
      >
        <Link
          to={to}
          className={`nav-link ${active ? 'nav-link-active' : ''}`}
          style={{
            color: active ? '#FBF6E0' : '#A8BCCC',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: active ? 700 : 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => !active && (e.currentTarget.style.color = '#FBF6E0')}
          onMouseLeave={e => !active && (e.currentTarget.style.color = '#A8BCCC')}
        >
          {label}
          {isDropdownTrigger && (
            <ChevronDown
              size={13}
              style={{
                transform: openDropdown === dropdownKey ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
                color: active ? '#C5A03F' : 'currentColor',
              }}
            />
          )}
        </Link>
      </div>
    )
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '8px 0' : '12px 0',
        background: scrolled ? 'rgba(4,12,26,0.97)' : 'rgba(4,12,26,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(197,160,63,0.28)' : 'rgba(197,160,63,0.15)'}`,
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16,
        }}>

          {/* ── Brand ── */}
          <Link
            to="/"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}
          >
            <img
              src={logo}
              alt="Om Communication Work Logo"
              style={{
                width: 44,
                height: 44,
                objectFit: 'contain',
                flexShrink: 0,
                display: 'block',
                filter: 'drop-shadow(0 0 8px rgba(197,160,63,0.4))',
              }}
            />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800, fontSize: '1rem',
                color: '#FFFFFF', letterSpacing: '-0.02em',
              }}>
                Om Communication Work
              </div>
              <div style={{
                fontWeight: 600, fontSize: '0.65rem',
                color: '#C5A03F', letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Enterprise Security & Telecom
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 22, flex: 1, justifyContent: 'center' }}>

            <NavLink to="/" label="Home" />
            <NavLink to="/about" label="About" />

            {/* Services dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/services"
                className={`nav-link ${isActive('/services') ? 'nav-link-active' : ''}`}
                style={{
                  color: isActive('/services') ? '#FBF6E0' : '#A8BCCC',
                  textDecoration: 'none', fontSize: '0.875rem', fontWeight: isActive('/services') ? 700 : 600,
                  display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s',
                }}
              >
                Services
                <ChevronDown size={13} style={{ transform: openDropdown === 'services' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </Link>
              <AnimatePresence>
                {openDropdown === 'services' && <DropdownMenu links={serviceLinks} showDesc={true} />}
              </AnimatePresence>
            </div>

            {/* Industries dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setOpenDropdown('industries')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/industries"
                className={`nav-link ${isActive('/industries') ? 'nav-link-active' : ''}`}
                style={{
                  color: isActive('/industries') ? '#FBF6E0' : '#A8BCCC',
                  textDecoration: 'none', fontSize: '0.875rem', fontWeight: isActive('/industries') ? 700 : 600,
                  display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s',
                }}
              >
                Industries
                <ChevronDown size={13} style={{ transform: openDropdown === 'industries' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </Link>
              <AnimatePresence>
                {openDropdown === 'industries' && <DropdownMenu links={industryLinks} />}
              </AnimatePresence>
            </div>

            <NavLink to="/projects" label="Projects" />

            {/* More dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setOpenDropdown('more')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button style={{
                color: '#A8BCCC', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
                padding: 0, transition: 'color 0.2s', fontFamily: 'inherit',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#FBF6E0'}
                onMouseLeave={e => e.currentTarget.style.color = '#A8BCCC'}
              >
                More
                <ChevronDown size={13} style={{ transform: openDropdown === 'more' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence>
                {openDropdown === 'more' && <DropdownMenu links={moreLinks} />}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right CTAs ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <a
              href="tel:+917217715296"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                color: '#FBF6E0', fontSize: '0.8rem', fontWeight: 700,
                textDecoration: 'none', padding: '6px 12px', borderRadius: 8,
                background: 'rgba(197,160,63,0.08)',
                border: '1px solid rgba(197,160,63,0.22)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,63,0.15)'; e.currentTarget.style.borderColor = 'rgba(197,160,63,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(197,160,63,0.08)'; e.currentTarget.style.borderColor = 'rgba(197,160,63,0.22)' }}
            >
              <Phone size={13} color="#C5A03F" />
              <span className="brand-full">+91 72177 15296</span>
            </a>

            <Link
              to="/quote"
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
            >
              Request Site Survey <ChevronRight size={13} />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="mobile-menu-btn"
              style={{
                display: 'none', background: 'none',
                border: '1px solid rgba(197,160,63,0.28)',
                borderRadius: 8, color: '#FBF6E0', cursor: 'pointer',
                padding: '6px 7px', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Toggle Navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 62, left: 0, right: 0, zIndex: 999,
              background: 'rgba(4,12,26,0.99)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(197,160,63,0.18)',
              padding: '20px 24px 28px',
              maxHeight: 'calc(100vh - 62px)',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <MobileLink to="/" label="Home" />
              <MobileLink to="/about" label="About Us" />

              <div style={{ padding: '8px 0 4px', color: '#C5A03F', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                Services
              </div>
              <div style={{ paddingLeft: 14, borderLeft: '2px solid rgba(197,160,63,0.25)', marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {serviceLinks.map(s => (
                  <Link key={s.href} to={s.href} style={{ color: '#A8BCCC', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>{s.label}</Link>
                ))}
              </div>

              <div style={{ padding: '4px 0', color: '#C5A03F', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                Industries
              </div>
              <div style={{ paddingLeft: 14, borderLeft: '2px solid rgba(197,160,63,0.25)', marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {industryLinks.map(ind => (
                  <Link key={ind.href} to={ind.href} style={{ color: '#A8BCCC', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>{ind.label}</Link>
                ))}
              </div>

              <MobileLink to="/projects" label="Projects & Deployments" />
              <MobileLink to="/solutions" label="Turnkey Solutions" />
              <MobileLink to="/installation" label="Installation Process" />
              <MobileLink to="/contact" label="Contact & Site Survey" />
              <MobileLink to="/complaint" label="Support Desk" />
            </div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href="tel:+917217715296"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px', borderRadius: 10,
                  background: 'rgba(197,160,63,0.12)',
                  border: '1px solid rgba(197,160,63,0.30)',
                  color: '#FBF6E0', fontWeight: 700, textDecoration: 'none',
                }}
              >
                <Phone size={16} color="#C5A03F" /> Call +91 72177 15296
              </a>
              <Link to="/quote" className="btn-primary" style={{ justifyContent: 'center' }}>
                Request a Site Survey <ChevronRight size={16} />
              </Link>
              <Link to="/complaint" className="btn-secondary" style={{ justifyContent: 'center' }}>
                Support Ticket Desk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MobileLink({ to, label }) {
  return (
    <Link
      to={to}
      style={{ padding: '9px 0', color: '#F8FAFC', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}
    >
      {label}
    </Link>
  )
}
