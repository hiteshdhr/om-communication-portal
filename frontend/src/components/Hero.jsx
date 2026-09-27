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
        /* Full-viewport hero — transparent navbar overlays from top */
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        outline: 'none',
        background: '#17191D', /* fallback charcoal while images load */
      }}
    >
      {/* ── Full-bleed background image — crossfades on slide change ── */}
      <AnimatePresence>
        <motion.div
          key={`bg-${activeSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            /* Shift focus right: technician / equipment fills right side, text sits left */
            backgroundPosition: 'center right',
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* ── Gradient overlay — left-biased: text left, sharp image right ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          /*
           * Layer 1 (left→right): darkness for text legibility on the left half.
           * Fades to near-transparent on the right so image detail remains sharp.
           */
          background: [
            'linear-gradient(to right, rgba(8,10,14,0.68) 0%, rgba(8,10,14,0.44) 40%, rgba(8,10,14,0.12) 68%, rgba(8,10,14,0) 100%)',
          ].join(', '),
          zIndex: 1,
        }}
      />
      {/* Top-edge band: keep nav text readable without darkening the whole image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, rgba(8,10,14,0.38) 0%, rgba(8,10,14,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Slide content — sits above overlay ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            width: '100%',
            padding: '0 clamp(16px, 4vw, 32px)',
            paddingTop: 'calc(68px + clamp(32px, 5vw, 60px))', /* 68px navbar + breathing room */
            paddingBottom: 'clamp(40px, 6vw, 72px)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Slide Tabs & Controls Row ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 32,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
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
                      background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
                      backdropFilter: 'blur(8px)',
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
                      color: isActive ? '#FF8FA8' : 'rgba(255,255,255,0.5)',
                      fontFamily: 'monospace',
                    }}>
                      {s.id}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
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
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
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
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
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

          {/* ── Slide Content ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            {/* Left Column: Text */}
            <div
              style={{
                maxWidth: 640,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: 'easeInOut' }}
                >
                  {/* Numbered Eyebrow */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#FF6B8A',
                      display: 'inline-block',
                    }} />
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#FF8FA8',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}>
                      {slide.eyebrow}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h1
                    className="heading-accent-left"
                    style={{
                      fontFamily: "'Manrope', 'Inter', sans-serif",
                      fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                      fontWeight: 900,
                      lineHeight: 1.06,
                      letterSpacing: '-0.035em',
                      color: '#FFFFFF',
                      margin: '0 0 18px',
                    }}
                  >
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p style={{
                    fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.72)',
                    margin: '0 0 28px',
                    maxWidth: 520,
                  }}>
                    {slide.desc}
                  </p>

                  {/* CTAs */}
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 32 }}>
                    <Link to={slide.primaryCta.path} className="btn-primary">
                      {slide.primaryCta.label} <ArrowRight size={16} />
                    </Link>
                    <Link
                      to={slide.secondaryCta.path}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '10px 20px',
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.35)',
                        background: 'rgba(255,255,255,0.10)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'background 0.2s ease, border-color 0.2s ease',
                        minHeight: 42,
                      }}
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  </div>

                  {/* Technical Capability Badges */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 20,
                    paddingTop: 20,
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                  }}>
                    {slide.badges.map(badge => (
                      <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <CheckCircle2 size={15} color="#FF8FA8" />
                        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom image-label badge ── */}
          <div style={{ marginTop: 24 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(10,12,16,0.70)',
              backdropFilter: 'blur(10px)',
              borderRadius: 8,
              padding: '10px 16px',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
              <Shield size={16} color="#FF8FA8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF' }}>
                {slide.imageLabel}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>|</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)' }}>
                <MapPin size={12} />
                <span>Delhi-NCR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
