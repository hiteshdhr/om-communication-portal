import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { images } from '../assets/imageMap'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

export default function SecondaryFeature() {
  return (
    <section style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '120px 0' }}>
      {/* Background orbs */}
      <div className="bg-orb" style={{ width: 600, height: 600, background: '#C5A03F', top: -200, right: -200, opacity: 0.07 }} />
      <div className="bg-orb" style={{ width: 400, height: 400, background: '#7D0022', bottom: 100, left: -100, opacity: 0.08 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, width: '100%' }}>
        {/* Top: Clean Visual */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ position: 'relative', width: '100%', height: '50vh', minHeight: 350, maxHeight: 600, marginBottom: 48 }}
        >
          <div style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(197,160,63,0.28)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(197,160,63,0.12)',
            position: 'absolute', inset: 0,
          }}>
            <img
              src={images.services.cctv.technician2}
              alt="Certified security technicians performing professional CCTV installation and alignment"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(4,12,26,0.9) 0%, transparent 60%)'
            }} />
            <span style={{
              position: 'absolute', bottom: 16, left: 16,
              background: 'rgba(0,0,0,0.8)', color: 'white',
              fontSize: '0.75rem', padding: '6px 12px', borderRadius: 6,
              backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'monospace', letterSpacing: '0.05em'
            }}>
              🔴 LIVE VIEW — CAM 01
            </span>
          </div>
        </motion.div>

        {/* Bottom content */}
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <motion.div variants={fadeUp}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(197,160,63,0.10)', border: '1px solid rgba(197,160,63,0.35)',
              borderRadius: 999, padding: '6px 16px', marginBottom: 24
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'rgba(34,197,94,0.3)', animation: 'ping 1.5s ease-out infinite' }} />
              </div>
              <span style={{ color: '#FBF6E0', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                ENTERPRISE-GRADE INSTALLATIONS
              </span>
            </div>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900,
            lineHeight: 1.1, margin: '0 0 20px',
            letterSpacing: '-0.03em', color: '#F8FAFC'
          }}>
            Security & Telecom{' '}
            <span className="gradient-text">Infrastructure</span>{' '}
            for Commercial Facilities
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontSize: '1.125rem', color: '#94A3B8', lineHeight: 1.7,
            margin: '0 auto 36px', maxWidth: 640
          }}>
            Bulk CCTV, EPABX, Biometric Access & Video Door Phone installations for
            residential societies, factories, offices, and retail chains across India.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/quote" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              Request Bulk Quote <ChevronRight size={16} />
            </Link>
            <Link to="/complaint" className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              Submit Support Ticket
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 24, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['GST Compliant', 'Insured Engineers', 'Warranty Backed'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <CheckCircle2 size={15} color="#22c55e" />
                <span style={{ color: '#94A3B8', fontSize: '0.875rem', fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
