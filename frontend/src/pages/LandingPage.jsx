import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronRight, Phone, MessageCircle } from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import TrustMetrics from '../components/TrustMetrics'
import SolutionSelector from '../components/SolutionSelector'
import RealProjectsSection from '../components/RealProjectsSection'
import ProcessTimeline from '../components/ProcessTimeline'
import StickyMobileBar from '../components/StickyMobileBar'
import { images } from '../assets/imageMap'
import { EASE_STANDARD } from '../utils/motion'

// ─── Data: Editorial Problem → Solution ───────────────────────────────────────
const EDITORIAL_STORIES = [
  {
    num: '01',
    problem: "Can't see what's happening across your facility?",
    service: 'CCTV SURVEILLANCE',
    heading: 'See everything. Miss nothing.',
    desc: 'High-definition IP cameras, H.265+ NVR recording, starlight night vision, and encrypted remote multi-device access.',
    image: images.services.cctv.industrial,
    alt: 'Industrial plant CCTV surveillance camera installation by Om Communication Work',
    href: '/services/cctv',
    cta: 'Explore CCTV Systems →',
  },
  {
    num: '02',
    problem: 'Need positive visitor verification before opening doors?',
    service: 'VIDEO DOOR PHONE & ACCESS',
    heading: "Know who's at the door.",
    desc: 'Outdoor video entry stations, capacitive indoor touch screens, electronic lock integration, and visitor snapshot capture.',
    image: images.services.vdp.userMonitoring,
    alt: 'Video door phone indoor monitor visitor verification',
    href: '/services/vdp',
    cta: 'Explore Video Door Phones →',
  },
  {
    num: '03',
    problem: 'Internal desk-to-desk communication becoming slow or costly?',
    service: 'EPABX & OFFICE INTERCOM',
    heading: 'Communication that keeps business moving.',
    desc: 'Multi-line telephone exchanges, automated call routing, multi-pair riser cabling, and society intercom networks.',
    image: images.services.epabx.phones,
    alt: 'EPABX office telephone console and intercom network',
    href: '/services/epabx',
    cta: 'Explore EPABX Systems →',
  },
  {
    num: '04',
    problem: 'Staff attendance records difficult to manage or prone to proxy punching?',
    service: 'BIOMETRIC ACCESS CONTROL',
    heading: 'Access that knows who belongs.',
    desc: 'Touchless facial recognition, fingerprint readers, electromagnetic fail-safe door locks, and automated HR attendance export.',
    image: images.services.biometrics.rfid,
    alt: 'Biometric RFID card and access control terminal',
    href: '/services/biometrics',
    cta: 'Explore Biometric Systems →',
  },
  {
    num: '05',
    problem: 'Network drops and messy cabling causing unexpected downtime?',
    service: 'STRUCTURED CABLING & NETWORKING',
    heading: 'The infrastructure behind everything.',
    desc: 'Certified CAT6 copper cabling, server rack cable dressing, patch panel termination, and Gigabit PoE switches.',
    image: images.services.cabling.serverRack,
    alt: 'Structured cabling server rack and patch panel termination',
    href: '/services/networking',
    cta: 'Explore Structured Cabling →',
  },
]

// Single Story Item with Viewport Reveal
function StoryItem({ story, idx, prefersReducedMotion }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'center',
        paddingBottom: 40,
        borderBottom: idx < EDITORIAL_STORIES.length - 1 ? '1px solid var(--border-light)' : 'none',
        position: 'relative',
      }}
    >
      {/* Image Container */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid var(--border-light)',
          height: 280,
          background: 'var(--bg-surface)',
          order: idx % 2 === 1 ? 2 : 1,
        }}
        className="story-image-box"
      >
        <motion.img
          initial={prefersReducedMotion ? {} : { scale: 1.03 }}
          animate={isInView ? { scale: 1 } : { scale: 1.03 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          src={story.image}
          alt={story.alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* Text Container */}
      <div style={{ order: idx % 2 === 1 ? 1 : 2 }} className="story-text-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: 'var(--red-primary)',
            background: 'var(--red-light)',
            padding: '2px 8px',
            borderRadius: 4,
            border: '1px solid var(--border-red)',
          }}>
            {story.num}
          </span>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-secondary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {story.service}
          </span>
        </div>

        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
          {story.problem}
        </div>

        <h3 style={{
          fontFamily: "'Manrope', 'Inter', sans-serif",
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          margin: '0 0 12px',
          letterSpacing: '-0.025em',
          lineHeight: 1.2,
        }}>
          {story.heading}
        </h3>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.65,
          margin: '0 0 20px',
        }}>
          {story.desc}
        </p>

        <Link
          to={story.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--red-primary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          {story.cta}
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Component: Problem → Solution (Editorial Numbered Layout with Timeline) ──
function EditorialProblemStories() {
  const containerRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scaleY = useTransform(scrollYProgress, [0.1, 0.85], [0, 1])

  return (
    <section
      ref={containerRef}
      aria-labelledby="stories-heading"
      style={{
        padding: 'clamp(56px, 7vw, 96px) 0',
        background: 'var(--bg-white)',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', position: 'relative' }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ marginBottom: 48 }}
        >
          <div className="eyebrow">The Challenges We Solve</div>
          <h2
            id="stories-heading"
            style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              margin: '0 0 10px',
            }}
          >
            Your business shouldn't have blind spots.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, maxWidth: 620 }}>
            Real-world security and telecommunication challenges solved with site-engineered hardware and clean installation.
          </p>
        </motion.div>

        {/* Vertical Timeline Progress Bar Container */}
        <div style={{ position: 'relative' }}>
          {!prefersReducedMotion && (
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: -12,
              width: 3,
              background: 'var(--border-light)',
              borderRadius: 2,
              display: 'block',
            }} className="timeline-line">
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--red-primary)',
                  scaleY,
                  transformOrigin: 'top',
                  borderRadius: 2,
                }}
              />
            </div>
          )}

          {/* Stories List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {EDITORIAL_STORIES.map((story, idx) => (
              <StoryItem
                key={story.num}
                story={story}
                idx={idx}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-image-box { order: 1 !important; height: 220px !important; }
          .story-text-box { order: 2 !important; }
          .timeline-line { display: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Component: AMC Section (Editorial 2-Column Split) ────────────────────────
function AMCSection() {
  const sectionRef   = useRef(null)
  const headerInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const h = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const AMC_COVERAGE = [
    {
      service: 'PREVENTIVE AUDIT',
      detail: 'Quarterly on-site inspection of all camera mounts, lens focus, and NVR storage disks.',
    },
    {
      service: 'EMERGENCY DISPATCH',
      detail: 'Priority technician response within 4 hours for critical system failure.',
    },
    {
      service: 'CABLE & TERMINATION CHECK',
      detail: 'Annual re-inspection of all conduit raceways, junction boxes, and crimp terminations.',
    },
    {
      service: 'VOLTAGE & POWER HEALTH',
      detail: 'UPS battery testing, supply voltage verification, and surge suppressor condition review.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      aria-labelledby="amc-heading"
      style={{
        padding: 'clamp(56px, 7vw, 88px) 0',
        background: 'var(--bg-blush)',
        borderBottom: '1px solid var(--border-light)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(36px, 5vw, 72px)',
          alignItems: 'start',
        }}>

          {/* Left: Editorial header + CTA */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.55, ease: EASE_STANDARD }}
          >
            <div className="eyebrow">Annual Maintenance Contracts</div>
            <h2
              id="amc-heading"
              style={{
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                margin: '0 0 14px',
              }}
            >
              Security doesn't end at installation.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65, margin: '0 0 28px' }}>
              Dust accumulation, power surges, and cable oxidation cause the majority of preventable footage loss events. A structured AMC contract converts unpredictable system failure into scheduled, documented maintenance.
            </p>
            <Link
              to="/services/amc"
              className="btn-primary"
              style={{ fontSize: '0.9375rem', padding: '12px 28px', display: 'inline-flex' }}
            >
              Discuss Maintenance Support →
            </Link>
          </motion.div>

          {/* Right: Coverage rows — thin rule table */}
          <div>
            {AMC_COVERAGE.map((item, i) => (
              <motion.div
                key={item.service}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0.15 : 0.45,
                  delay: prefersReducedMotion ? 0 : 0.1 + i * 0.09,
                  ease: EASE_STANDARD,
                }}
                style={{
                  borderTop: '1px solid var(--border-color)',
                  borderBottom: i === AMC_COVERAGE.length - 1 ? '1px solid var(--border-color)' : 'none',
                  padding: '16px 0',
                }}
              >
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--red-primary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  {item.service}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                }}>
                  {item.detail}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Component: FAQ Section ───────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null)
  const sectionRef = useRef(null)
  const headerInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const h = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const FAQS = [
    {
      q: 'How many CCTV cameras does a typical business facility need?',
      a: 'Camera counts depend on the number of entry/exit doors, blind angles, cash counters, perimeter fence lengths, and warehouse aisle layouts. During our on-site survey, OM Communication maps exact focal lengths to eliminate blind spots with the most efficient camera count.',
    },
    {
      q: 'How is CCTV storage retention planned for 30 to 90 days?',
      a: 'We calculate hard drive capacities based on camera megapixel resolution, frame rate (15–25 fps), recording mode (continuous vs. motion-activated), and H.265+ smart compression. Storage is sized with built-in buffer capacity to ensure footage is never prematurely overwritten.',
    },
    {
      q: 'Can an EPABX system support both internal intercom and external phone lines?',
      a: 'Yes. An EPABX exchange connects incoming telecom lines (CO lines, PRI, or SIP trunks) and distributes them to internal desk extensions, allowing seamless internal desk-to-desk intercom calling as well as external calling with auto-attendant IVR routing.',
    },
    {
      q: 'What is the practical difference between CCTV and Access Control?',
      a: 'CCTV provides passive visual monitoring, recording, and forensic evidence. Access Control actively regulates who can physically open doors, gates, or turnstiles using biometric verification (face/fingerprint) or RFID cards, preventing unauthorized entry before it happens.',
    },
    {
      q: 'How often should commercial security and intercom systems be maintained?',
      a: 'We recommend scheduled quarterly preventive maintenance (every 3 months). This includes camera lens cleaning, power supply voltage checks, NVR hard drive sector testing, and Krone distribution frame tightening to prevent unexpected recording or communication downtime.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      aria-labelledby="faq-heading"
      style={{
        padding: 'clamp(56px, 7vw, 88px) 0',
        background: 'var(--bg-white)',
        borderBottom: '1px solid var(--border-light)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        {/* Section heading */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.55, ease: EASE_STANDARD }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Practical Guidance</div>
          <h2
            id="faq-heading"
            style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              margin: '0 0 8px',
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ items — staggered */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0.12 : 0.45,
                  delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.065,
                  ease: EASE_STANDARD,
                }}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: isOpen ? 'var(--bg-surface)' : 'var(--bg-card)',
                  padding: '16px 20px',
                  transition: 'background 0.15s',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                    color: 'var(--text-primary)',
                    fontSize: '0.975rem',
                    fontWeight: 700,
                    fontFamily: "'Manrope', 'Inter', sans-serif",
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    size={16}
                    color="#B4233C"
                    style={{
                      transform: isOpen ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{
                        marginTop: 10,
                        paddingTop: 10,
                        borderTop: '1px solid var(--border-light)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Component: Final CTA ─────────────────────────────────────────────────────
function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      style={{
        padding: 'clamp(56px, 7vw, 96px) 0',
        background: 'var(--bg-blush)',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.99 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE_STANDARD }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(180, 35, 60, 0.22)',
            borderRadius: 14,
            padding: 'clamp(36px, 6vw, 64px) clamp(20px, 4vw, 48px)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(180, 35, 60, 0.06)',
          }}
        >
          <div className="eyebrow" style={{ display: 'inline-flex', marginBottom: 12 }}>
            Turnkey Security &amp; Telecom Solutions
          </div>
          <h2
            id="cta-heading"
            style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              margin: '0 0 14px',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            Plan your system with certified field engineers.
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: 540,
            margin: '0 auto 28px',
            lineHeight: 1.65,
          }}>
            Tell us about your facility layout and security objectives. Our engineering teams in Delhi-NCR will perform a site inspection and provide a detailed turnkey proposal.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ fontSize: '0.9375rem', padding: '12px 28px' }}>
              Request Site Assessment →
            </Link>
            <a href="tel:+917217715296" className="btn-secondary" style={{ fontSize: '0.9375rem', padding: '12px 24px' }}>
              <Phone size={14} color="#B4233C" /> Call +91 72177 15296
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', overflowX: 'hidden' }}>
      <SEO
        title="Om Communication Work | CCTV, EPABX, Biometric & Security Systems Delhi-NCR"
        description="Professional CCTV surveillance, EPABX intercom, video door phone, biometric access control, structured cabling, and turnkey AMC solutions across Delhi, Noida, Gurgaon, and Ghaziabad."
        canonical="/"
      />
      <Navbar />

      {/* 1. HERO (Clean White) */}
      <Hero />

      {/* 2. TRUST METRICS (Editorial Horizontal) */}
      <TrustMetrics />

      {/* 3. SOLUTION SELECTOR (Numbered Interactive) */}
      <SolutionSelector />

      {/* 4. PROBLEM → SOLUTION (Numbered Editorial Stories) */}
      <EditorialProblemStories />

      {/* 5. REAL PROJECTS SHOWCASE */}
      <RealProjectsSection />

      {/* 6. ENGINEERING METHODOLOGY TIMELINE */}
      <ProcessTimeline />

      {/* 7. AMC SECTION */}
      <AMCSection />

      {/* 8. FAQ SECTION */}
      <FAQSection />

      {/* 9. FINAL CTA */}
      <FinalCTA />

      {/* Floating WhatsApp Quick Action */}
      <div style={{ position: 'fixed', bottom: 88, right: 20, zIndex: 9998 }} className="wa-float">
        <a
          href="https://wa.me/917217715296?text=Hello%20Om%20Communication%20Work,%20I%20would%20like%20to%20inquire%20about%20a%20site%20survey%20for%20our%20facility."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Om Communication Work"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
            textDecoration: 'none',
          }}
        >
          <MessageCircle size={22} color="white" fill="white" />
        </a>
      </div>

      <StickyMobileBar />
      <Footer />

      <style>{`
        @media (min-width: 769px) { .wa-float { bottom: 28px !important; right: 28px !important; } }
        @media (max-width: 768px) { .wa-float { bottom: 80px !important; } }
      `}</style>
    </div>
  )
}
