import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { FAQAccordion, ServiceCTA } from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const epabxCapabilities = [
  'Crystal 108, Matrix & Panasonic Multi-Line Enterprise EPABX Systems',
  'Residential Society Riser Shaft Rewiring & Krone Module Distribution Overhauls',
  'Beetel Standard Instruments (C-11) & Executive Display Sets (B-37)',
  'Main Gate-to-Flat Intercom Lines & Guard Console Terminals',
  'Multi-Extension Office PABX with Auto-Attendant & IVR Routing',
  'Structured Telecom Cabling & Armored Jelly-Filled Underground Cable Laying'
]

const faqs = [
  { q: 'What is the standard EPABX solution for a multi-floor residential society?', a: 'For residential societies, we deploy multi-line EPABX systems connected through vertical riser shafts with Krone termination blocks on each floor, linking every apartment directly to the main security gate and facilities management office.' },
  { q: 'Can you repair or upgrade an existing broken society intercom network?', a: 'Yes. A major specialty of OCW is diagnosing faulty riser shafts, rewiring degraded underground telephone cables, cleaning/replacing rusted Krone modules, and restoring clear flat-to-gate communication.' },
  { q: 'What phone instruments are supported?', a: 'We install robust Beetel standard instruments (Beetel C-11), executive display phones with caller ID (Beetel B-37), and dedicated security guard consoles.' },
  { q: 'Do you provide maintenance for office PABX telephone systems?', a: 'Yes. We offer scheduled AMC packages covering line testing, programming extension routing, line expansions, and emergency repair.' }
]

export default function EpabxPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="EPABX & Telecom Intercom Solutions | Om Communication Work"
        description="Enterprise EPABX systems, residential society intercom networks, Krone module distribution, and structured telecom cabling across Delhi-NCR."
        canonical="/services/epabx"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Telecom & Intercom Engineering
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            EPABX & Society Intercom Solutions
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Reliable voice communication networks for high-rise residential towers, corporate offices, industrial campuses, and commercial complexes.
          </p>
        </motion.div>

        {/* Hero Photo & Capability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'center', marginBottom: 60 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(197,160,63,0.25)', height: 320, position: 'relative' }}>
            <img
              src={images.services.epabx.hero}
              alt="Enterprise EPABX telecom server cabinet and structured intercom cabling installation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              loading="eager"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,12,26,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
              <div style={{ color: '#FBF6E0', fontWeight: 700, fontSize: '1.1rem' }}>Riser Shaft & Krone Module Overhauls</div>
              <div style={{ color: '#A8BCCC', fontSize: '0.8125rem' }}>Restoring crystal-clear communication across hundreds of extensions</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Key Telecom Infrastructure Solutions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {epabxCapabilities.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginBottom: 60 }}>
          <div className="eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 12 }}>Common Questions</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#FFFFFF' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ maxWidth: 880, margin: '0 auto', background: 'rgba(13,32,64,0.4)', border: '1px solid rgba(197,160,63,0.12)', borderRadius: 16, padding: '8px 28px' }}>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </div>

      <ServiceCTA
        headline="Ready for an EPABX or Intercom Assessment?"
        sub="Whether you need a new intercom system or an existing society network rehabilitated, our engineers are ready."
      />
      <Footer />
    </div>
  )
}
