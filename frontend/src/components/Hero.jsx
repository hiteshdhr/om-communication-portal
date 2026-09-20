import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Shield, CheckCircle2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { images } from '../assets/imageMap'

const SLIDES = [
  {
    id: '01',
    eyebrow: '01 / SURVEILLANCE & SECURITY',
    title: 'Security infrastructure built for business.',
    desc: 'CCTV, access control, EPABX, networking and maintenance solutions designed around real business environments.',
    image: images.projects.controlRoom,
    imageAlt: 'Corporate security control room and CCTV monitoring installation by Om Communication Work',
    imageLabel: 'Integrated Control Room Installation',
    primaryCta: { label: 'Explore Solutions', path: '/services' },
    secondaryCta: { label: 'Talk to an Expert →', path: '/quote' },
    badges: ['Turnkey Project Execution', 'Delhi-NCR Field Teams', 'Preventive Maintenance Support'],
  },
  {
    id: '02',
    eyebrow: '02 / EPABX & TELECOM NETWORKS',
    title: 'Communication that keeps business moving.',
    desc: 'Multi-line PBX exchanges, high-density society intercoms, and structured copper cabling engineered for clear connectivity.',
    image: images.services.epabx.phones,
    imageAlt: 'EPABX office telephone console and intercom network installation',
    imageLabel: 'EPABX & Office Intercom Infrastructure',
    primaryCta: { label: 'View EPABX Solutions', path: '/services/epabx' },
    secondaryCta: { label: 'Request Site Survey →', path: '/quote' },
    badges: ['Multi-Line PBX Systems', 'Society Riser Cabling', 'Direct Field Installation'],
  },
  {
    id: '03',
    eyebrow: '03 / TURNKEY ENGINEERING & AMC',
    title: 'Surveillance & maintenance executed on site.',
    desc: 'On-site physical surveys, conduit routing, patch panel termination, and scheduled preventive maintenance across Delhi-NCR.',
    image: images.services.amc.technician,
    imageAlt: 'Security system maintenance technician inspecting server rack during preventive AMC visit',
    imageLabel: 'Preventive Maintenance & Servicing',
    primaryCta: { label: 'Explore AMC Plans', path: '/services/amc' },
    secondaryCta: { label: 'Contact Engineering Desk →', path: '/contact' },
    badges: ['Quarterly Servicing Audits', 'Emergency Breakdown Visits', 'Delhi-NCR Support Coverage'],
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const heroRef = useRef(null)

  // Check reduced motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    function handleChange(e) {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Single controlled setTimeout timer for 7s autoplay
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    const timer = setTimeout(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length)
    }, 7000)
    return () => clearTimeout(timer)
  }, [activeSlide, isPaused, prefersReducedMotion])

  function handleSlideChange(index) {
    setActiveSlide(index)
  }

  function handlePrev() {
    setActiveSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1))
  }

  function handleNext() {
    setActiveSlide(prev => (prev + 1) % SLIDES.length)
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      handleNext()
    }
  }

  const slide = SLIDES[activeSlide]

  return (
    <section
      ref={heroRef}
      aria-label="Security and telecom engineering hero carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      style={{
        background: 'var(--bg-white)',
        borderBottom: '1px solid var(--border-light)',
        padding: 'clamp(36px, 5vw, 64px) 0',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        
        {/* ── Slide Navigation Controls Header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 12,
        }}>
          {/* Numbered Clickable Slide Tabs */}
          <div role="tablist" aria-label="Hero slides" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {SLIDES.map((s, idx) => {
              const isActive = idx === activeSlide
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${s.id}: ${s.eyebrow}`}
                  onClick={() => handleSlideChange(idx)}
                  style={{
                    background: isActive ? 'var(--bg-surface)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--border-red)' : 'var(--border-light)'}`,
                    borderRadius: 6,
                    padding: '6px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: isActive ? 'var(--red-primary)' : 'var(--text-muted)',
                    fontFamily: 'monospace',
                  }}>
                    {s.id}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}>
                    {s.id === '01' ? 'Security' : s.id === '02' ? 'EPABX' : 'AMC'}
                  </span>

                  {/* Active Progress Fill Bar */}
                  {isActive && !isPaused && !prefersReducedMotion && (
                    <motion.div
                      key={`progress-${activeSlide}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 7, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'var(--red-primary)',
                        transformOrigin: 'left',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Prev / Next Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ── Slide Content Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 'clamp(28px, 4vw, 56px)',
          alignItems: 'center',
          minHeight: 380, // Stable layout dimensions
        }} className="hero-grid">
          
          {/* Left Column: Stable Text Layout */}
          <div style={{ minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: 'easeInOut' }}
              >
                {/* Numbered Eyebrow */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--red-primary)',
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--red-primary)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}>
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="heading-accent-left" style={{
                  fontFamily: "'Manrope', 'Inter', sans-serif",
                  fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-primary)',
                  margin: '0 0 16px',
                  minHeight: '2.3em', // Reserve heading space for layout stability
                }}>
                  {slide.title}
                </h1>

                {/* Description */}
                <p style={{
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  margin: '0 0 28px',
                  maxWidth: 540,
                  minHeight: '3.3em', // Reserve description space
                }}>
                  {slide.desc}
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 28 }}>
                  <Link to={slide.primaryCta.path} className="btn-primary">
                    {slide.primaryCta.label} <ArrowRight size={16} />
                  </Link>
                  <Link to={slide.secondaryCta.path} className="btn-secondary">
                    {slide.secondaryCta.label}
                  </Link>
                </div>

                {/* Technical Capability Badges */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16,
                  paddingTop: 18,
                  borderTop: '1px solid var(--border-subtle)',
                }}>
                  {slide.badges.map(badge => (
                    <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle2 size={15} color="var(--red-primary)" />
                      <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Container with Touch Drag Support */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.07)',
              background: 'var(--bg-surface)',
              height: 'clamp(300px, 38vw, 400px)', // Fixed reserved height to prevent layout shift
              position: 'relative',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.4 }}
                  drag={prefersReducedMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -40) handleNext()
                    else if (offset.x > 40) handlePrev()
                  }}
                  style={{ width: '100%', height: '100%', cursor: 'grab' }}
                  whileTap={{ cursor: 'grabbing' }}
                >
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    loading="eager"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Sub-label badge on image */}
                  <div style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    background: 'rgba(23, 25, 29, 0.88)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 8,
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#FFFFFF',
                    pointerEvents: 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Shield size={16} color="var(--red-primary)" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        {slide.imageLabel}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#9CA3AF' }}>
                      <MapPin size={12} />
                      <span>Delhi-NCR</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  )
}
