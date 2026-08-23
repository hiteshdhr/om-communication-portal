import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { FAQAccordion, ServiceCTA } from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const biometricCapabilities = [
  'AI Facial Recognition, Optical Fingerprint & RFID Proximity Card Readers',
  'Automated Time-Attendance Logging with Shift Schedules & HR Software Exports',
  'Access Control Door Controller Units (Single-Door, 2-Door & 4-Door Controllers)',
  'Electromagnetic Locks (600 lbs / 1200 lbs) & Electric Bolt Drop Latches',
  'Full Integration with Turnstiles, Flap Barriers & Motorized Boom Gates',
  'Comprehensive Audit Trail, Entry/Exit Logging & Anti-Passback Configuration'
]

const faqs = [
  { q: 'How does facial recognition perform in varied lighting conditions?', a: 'Modern biometric terminals equipped with dual infrared and visible light sensors perform reliably in direct sunlight, low-light environments, and complete darkness with sub-second recognition.' },
  { q: 'Can the attendance system handle multiple shifts and overtime?', a: 'Yes. The software configuration allows multi-shift rules, grace periods, overtime calculation, leave management, and automated monthly Excel / payroll CSV data exports.' },
  { q: 'What happens during a power failure?', a: 'Access control systems are equipped with dedicated battery backup power supplies (UPS), ensuring electromagnetic locks maintain secure fail-safe or fail-secure operation during power interruptions.' },
  { q: 'Can we install biometric access on glass doors in commercial offices?', a: 'Yes. We install specialized frameless glass door brackets (U-brackets / L-brackets) designed specifically for glass doors without damaging the architectural aesthetic.' }
]

export default function BiometricsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Biometric Access Control & Attendance Solutions | Om Communication Work"
        description="Enterprise biometric access control, AI facial recognition, RFID card terminals, electromagnetic locks, and time-attendance software across Delhi-NCR."
        canonical="/services/biometrics"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Identity & Access Engineering
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Biometric Access Control & Attendance
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Precision entry control, employee verification, and automated attendance tracking engineered for corporate offices, manufacturing plants, and secure facilities.
          </p>
        </motion.div>

        {/* Hero Photo & Capability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'center', marginBottom: 60 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(197,160,63,0.25)', height: 320, position: 'relative' }}>
            <img
              src={images.services.biometrics.hero}
              alt="High-accuracy optical fingerprint and AI facial recognition biometric terminal"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              loading="eager"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,12,26,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
              <div style={{ color: '#FBF6E0', fontWeight: 700, fontSize: '1.1rem' }}>Multi-Modal Entry & Verification</div>
              <div style={{ color: '#A8BCCC', fontSize: '0.8125rem' }}>Sub-second face recognition, fingerprint scanning & electromagnetic door locks</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Access Control Capabilities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {biometricCapabilities.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#D4AA50" style={{ flexShrink: 0, marginTop: 3 }} />
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
        headline="Ready for a Biometric & Access Control Assessment?"
        sub="Our engineers will evaluate your entry points, workforce size, and access zones to design the right biometric system for your facility."
      />
      <Footer />
    </div>
  )
}
