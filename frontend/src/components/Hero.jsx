import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Camera, Phone, DoorOpen, Fingerprint, Wrench, ArrowRight } from 'lucide-react'
import { images } from '../assets/imageMap'
const heroPhoto = images.hero.background

const SERVICE_PILLS = [
  { icon: Camera,      label: 'CCTV',       href: '/services/cctv' },
  { icon: Phone,       label: 'EPABX',      href: '/services/epabx' },
  { icon: DoorOpen,    label: 'VDP',        href: '/services/vdp' },
  { icon: Fingerprint, label: 'Biometric',  href: '/services/biometrics' },
  { icon: Wrench,      label: 'AMC',        href: '/services/amc' },
]

const TRUST_CARDS = [
  { value: '15+', label: 'Years Experience' },
  { value: '4',   label: 'Industries Served' },
  { value: 'NCR', label: 'Delhi-NCR Coverage' },
  { value: 'AMC', label: 'Long-Term Support' },
]

// Fade-up stagger variants
const item = (delay = 0) => ({
  initial:  { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Hero() {
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current

  // Subtle mouse parallax for floating cards (desktop only)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (prefersReduced) return
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      setMouse({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReduced])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#020B18',
      }}
    >
      {/* ── Background Image ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'brightness(0.28)',
          transform: prefersReduced ? 'none' : `scale(1.04) translate(${mouse.x * -6}px, ${mouse.y * -4}px)`,
          transition: 'transform 0.8s ease-out',
        }}
        aria-hidden="true"
      />

      {/* ── Deep gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(4,12,26,0.92) 0%, rgba(7,22,50,0.85) 50%, rgba(4,12,26,0.90) 100%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* ── Subtle gold orb ── */}
      <div style={{
        position: 'absolute', top: '40%', left: '10%',
        width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(197,160,63,0.07) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* ── Surveillance corner brackets (very faint) ── */}
      <div style={{
        position: 'absolute', top: 100, right: 80,
        width: 80, height: 80,
        borderTop: '1.5px solid rgba(197,160,63,0.12)',
        borderRight: '1.5px solid rgba(197,160,63,0.12)',
        pointerEvents: 'none',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', bottom: 80, left: 60,
        width: 60, height: 60,
        borderBottom: '1.5px solid rgba(197,160,63,0.12)',
        borderLeft: '1.5px solid rgba(197,160,63,0.12)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* ── Main content ── */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 24px',
        position: 'relative', zIndex: 2,
        paddingTop: 120, paddingBottom: 80,
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,400px)',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Eyebrow — 150ms */}
            <motion.div {...item(0.15)} style={{ marginBottom: 24 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(197,160,63,0.10)',
                border: '1px solid rgba(197,160,63,0.30)',
                borderRadius: 999, padding: '6px 18px',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#C5A03F', display: 'block',
                  boxShadow: '0 0 6px #C5A03F',
                }} />
                <span style={{
                  color: '#FBF6E0', fontSize: '0.72rem',
                  fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}>
                  Security &nbsp;•&nbsp; Surveillance &nbsp;•&nbsp; Communication
                </span>
              </span>
            </motion.div>

            {/* Headline — 300ms */}
            <motion.h1
              {...item(0.30)}
              style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: 'clamp(2.6rem, 5vw, 4.25rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                margin: '0 0 24px',
                color: '#FFFFFF',
              }}
            >
              Integrated Security<br />
              Solutions,{' '}
              <span className="gradient-text">
                Built for Your Site.
              </span>
            </motion.h1>

            {/* Description — 450ms */}
            <motion.p
              {...item(0.45)}
              style={{
                color: '#A8BCCC',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                maxWidth: 520,
                margin: '0 0 16px',
              }}
            >
              From site assessment to system design, professional installation,
              configuration, testing, commissioning, handover — and long-term AMC support.
            </motion.p>

            {/* Process chain — 500ms */}
            <motion.div {...item(0.50)} style={{ marginBottom: 36 }}>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
              }}>
                {['Site Survey', 'System Design', 'Installation', 'Commissioning', 'AMC'].map((step, i, arr) => (
                  <span key={step} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600,
                      color: '#607080', letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>{step}</span>
                    {i < arr.length - 1 && (
                      <ArrowRight size={10} color="rgba(197,160,63,0.45)" />
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs — 600ms */}
            <motion.div
              {...item(0.60)}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Link
                to="/quote"
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '14px 32px' }}
              >
                Request a Site Survey <ChevronRight size={16} />
              </Link>
              <Link
                to="/services"
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '14px 28px' }}
              >
                Explore Our Services
              </Link>
            </motion.div>

            {/* Service pills — 750ms */}
            <motion.div {...item(0.75)} style={{ marginTop: 40 }}>
              <div style={{
                fontSize: '0.6875rem', color: '#607080', fontWeight: 600,
                letterSpacing: '0.10em', textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                What We Install &amp; Maintain
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SERVICE_PILLS.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    to={href}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 14px',
                      background: 'rgba(13,32,64,0.7)',
                      border: '1px solid rgba(197,160,63,0.18)',
                      borderRadius: 99,
                      color: '#A8BCCC',
                      fontSize: '0.78rem', fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(197,160,63,0.50)'
                      e.currentTarget.style.color = '#FBF6E0'
                      e.currentTarget.style.background = 'rgba(197,160,63,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(197,160,63,0.18)'
                      e.currentTarget.style.color = '#A8BCCC'
                      e.currentTarget.style.background = 'rgba(13,32,64,0.7)'
                    }}
                  >
                    <Icon size={12} color="#C5A03F" />
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Floating Trust Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              alignSelf: 'center',
            }}
          >
            {TRUST_CARDS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                style={{
                  background: 'rgba(13,32,64,0.65)',
                  border: '1px solid rgba(197,160,63,0.20)',
                  borderRadius: 16,
                  padding: '24px 20px',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center',
                  transform: prefersReduced ? 'none' : `translate(${mouse.x * (i % 2 === 0 ? 5 : 8)}px, ${mouse.y * (i < 2 ? 4 : 7)}px)`,
                  transition: 'transform 0.5s ease-out, box-shadow 0.3s',
                }}
                whileHover={{
                  borderColor: 'rgba(197,160,63,0.45)',
                  boxShadow: '0 0 28px rgba(197,160,63,0.12)',
                  y: -4,
                }}
              >
                <div style={{
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#C5A03F',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {value}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#A8BCCC',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  lineHeight: 1.35,
                }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 120,
        background: 'linear-gradient(to bottom, transparent, #040C1A)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* ── Responsive override for mobile ── */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
        @media (max-width: 640px) {
          .hero-grid h1 { font-size: 2.2rem !important; }
        }
      `}</style>
    </section>
  )
}
