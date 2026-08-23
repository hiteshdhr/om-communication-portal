import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { FAQAccordion, ServiceCTA } from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const amcBenefits = [
  'Comprehensive & Non-Comprehensive Annual Maintenance Contracts (AMC)',
  'Scheduled Quarterly Preventative Diagnostics (Camera Focus, Lens Cleaning, HDD Health)',
  'Priority 24–48 Hour SLA Technician Dispatch for Critical Breakdown Calls',
  'On-Site Cable Testing, Krone Block Servicing & Riser Shaft Re-Terminations',
  'Firmware Updates, NVR Recording Audits & Time Synchronization Checks',
  'Detailed Service Log Reports & Equipment Health Recommendations'
]

const faqs = [
  { q: 'What is included in a Comprehensive AMC vs Non-Comprehensive AMC?', a: 'Non-Comprehensive AMC covers all scheduled preventative maintenance visits, emergency breakdown labor, technician visits, and diagnostics. Comprehensive AMC includes labor plus replacement of covered faulty components (such as power supplies, connectors, and standard hardware parts) per contract terms.' },
  { q: 'Can OCW take over AMC for systems installed by another vendor?', a: 'Yes. We conduct a preliminary system health audit, document the existing equipment and cabling status, rectify pre-existing defects, and onboard the facility under our standard AMC contract.' },
  { q: 'How quickly does a technician respond during an emergency breakdown?', a: 'Under our standard AMC SLA, technician dispatch is arranged within 24 to 48 hours for standard issues and prioritized for complete system outages.' },
  { q: 'What types of facilities are covered under your AMC plans?', a: 'We manage AMC agreements for residential high-rise RWAs, industrial factories, manufacturing warehouses, corporate headquarters, and multi-branch retail locations.' }
]

export default function AmcPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="AMC & Turnkey Maintenance Contracts | Om Communication Work"
        description="Comprehensive Annual Maintenance Contracts (AMC), scheduled preventative health checks, emergency technician dispatch, and cabling repairs for security systems."
        canonical="/services/amc"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Lifecycle Care & Maintenance
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Annual Maintenance Contracts (AMC)
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Guaranteed operational uptime, routine preventative health audits, and priority emergency technician support for your security and communication infrastructure.
          </p>
        </motion.div>

        {/* Hero Photo & Capability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'center', marginBottom: 60 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(197,160,63,0.25)', height: 320, position: 'relative' }}>
            <img
              src={images.services.amc.rackMaintenance}
              alt="OCW support technician conducting preventative maintenance, diagnosis, and cable testing on communication server rack"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
              loading="eager"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,12,26,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
              <div style={{ color: '#FBF6E0', fontWeight: 700, fontSize: '1.1rem' }}>Preventative Health Audits & SLA Support</div>
              <div style={{ color: '#A8BCCC', fontSize: '0.8125rem' }}>Proactive maintenance preventing critical system downtime</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Key AMC Service Highlights
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {amcBenefits.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 3 }} />
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
        headline="Ready to Discuss an AMC for Your Facility?"
        sub="Our team will perform a system audit and structure a maintenance contract tailored to your equipment inventory and operational requirements."
      />
      <Footer />
    </div>
  )
}
