import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { FAQAccordion, ServiceCTA } from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const vdpCapabilities = [
  'Multi-Apartment IP Video Door Phone Stations with Central Guard Calling',
  'Independent Villa & Bungalow Entry Panels with High-Resolution Night Vision',
  '7-Inch & 10-Inch Indoor Touchscreen Monitors with Two-Way Audio Communication',
  'Electromagnetic Door Strike & Automated Gate Latch Release Integration',
  'Visitor Snapshot Capture, Timestamp Logging & Security Desk Call Transfers',
  'Structured IP Network Cabling & PoE Power Distribution for Clean Installations'
]

const faqs = [
  { q: 'How does a multi-apartment VDP system function?', a: 'An outdoor multi-button or digital directory station is installed at the building entry. Visitors dial the flat number, ringing the specific indoor screen inside that apartment. Residents can visually verify the visitor, speak via two-way audio, and press a button to unlock the entrance gate.' },
  { q: 'Can the VDP integrate with automated door locks?', a: 'Yes. We integrate VDP systems directly with magnetic locks, electric drop bolts, and motorized boom barriers for secure, remote access authorization.' },
  { q: 'Is it possible to receive visitor calls on smartphones?', a: 'IP-based VDP setups support mobile app integration, allowing residents to view video feeds and unlock gates remotely even when away from home.' },
  { q: 'Can VDP systems be retrofitted into older residential buildings?', a: 'Yes. Depending on building architecture, we install structured CAT6 cables or utilize specialized multi-pair wiring to retrofit modern video intercoms with minimal structural disruption.' }
]

export default function VdpPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Video Door Phone (VDP) Solutions | Om Communication Work"
        description="Multi-apartment IP Video Door Phones and Villa entry kits with high-definition video, two-way audio, and automated door lock integration."
        canonical="/services/vdp"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Access Verification Engineering
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Video Door Phone (VDP) Systems
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            High-clarity visual verification and two-way voice communication systems engineered for residential societies, luxury villas, and commercial facilities.
          </p>
        </motion.div>

        {/* Hero Photo & Capability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'center', marginBottom: 60 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(197,160,63,0.25)', height: 320, position: 'relative' }}>
            <img
              src={images.services.vdp.hero}
              alt="High-resolution indoor video door phone touchscreen monitor with intercom and visitor verification controls"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              loading="eager"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,12,26,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
              <div style={{ color: '#FBF6E0', fontWeight: 700, fontSize: '1.1rem' }}>Multi-Unit & Villa IP Systems</div>
              <div style={{ color: '#A8BCCC', fontSize: '0.8125rem' }}>Automated door release, crystal night vision & visitor logging</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              VDP System Capabilities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {vdpCapabilities.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ flexShrink: 0, marginTop: 3 }} />
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
        headline="Ready for a Video Door Phone Assessment?"
        sub="Let our engineers survey your entry points and recommend the right VDP configuration for your residential or commercial facility."
      />
      <Footer />
    </div>
  )
}
