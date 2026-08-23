import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { FAQAccordion, ServiceCTA } from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const processSteps = [
  { step: '01', title: 'Site Survey & Blindspot Mapping', desc: 'Our technicians inspect your perimeter, entry gates, elevator shafts, corridors, and parking areas to identify coverage requirements.' },
  { step: '02', title: 'System Architecture Design', desc: 'Selection of IP vs. HD Analog cameras, optical focal lengths, night vision ranges, PoE switch distribution, and NVR channel sizing.' },
  { step: '03', title: 'Heavy-Duty Conduit & Structured Cabling', desc: 'Deploying ISI-marked PVC conduit piping, D-Link CAT6 or RG59 coaxial cables, server racks, and surge-protected power supplies.' },
  { step: '04', title: 'Configuration & Network Setup', desc: 'NVR firmware tuning, motion detection masking, 24/7 continuous vs event recording schedules, and mobile remote app configuration.' },
  { step: '05', title: 'Commissioning & AMC Handover', desc: 'Full testing across day and night conditions, user training for security guards/administrators, and AMC warranty activation.' },
]

const faqs = [
  { q: 'What is the difference between IP Cameras and HD Analog Cameras?', a: 'IP cameras transmit digitized video over CAT6 network cables, supporting ultra-high resolution (4MP to 4K), smart motion analytics, and remote PoE power. HD Analog cameras run over coaxial cable and offer a highly cost-effective, dependable solution for standard perimeter monitoring.' },
  { q: 'How many days of video recording can be stored on the NVR/DVR?', a: 'Recording duration depends on the number of cameras, resolution, compression standard (H.265+ uses significantly less storage), and HDD capacity (typically 2TB, 4TB, or 8TB surveillance-grade drives, providing 15 to 45+ days of footage).' },
  { q: 'Can we view the live camera feeds remotely on mobile phones?', a: 'Yes. Every CCTV installation we configure includes secure mobile application access and central monitoring station software for live viewing and playback from anywhere with an internet connection.' },
  { q: 'Do you offer Annual Maintenance Contracts (AMC) for existing CCTV setups?', a: 'Yes. We provide comprehensive and non-comprehensive AMC plans for residential societies, factories, and commercial complexes, including preventative quarterly servicing and priority breakdown support.' }
]

export default function CctvPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="CCTV Surveillance Systems & Installation Services | Om Communication Work"
        description="Turnkey CCTV surveillance solutions: IP & Analog cameras, NVR/DVR setup, perimeter security, remote monitoring, and preventative AMC support across Delhi-NCR."
        canonical="/services/cctv"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Surveillance Engineering
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Enterprise CCTV Surveillance Systems
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Engineered 24/7 video monitoring infrastructure designed for multi-acre factories, residential high-rises, commercial offices, and retail facilities.
          </p>
        </motion.div>

        {/* Hero Photo & Capability Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'center', marginBottom: 60 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(197,160,63,0.25)', height: 320, position: 'relative' }}>
            <img
              src={images.services.cctv.technicianCeiling}
              alt="Certified OCW technician installing high-definition commercial CCTV camera system"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
              loading="eager"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,12,26,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
              <div style={{ color: '#FBF6E0', fontWeight: 700, fontSize: '1.1rem' }}>End-to-End Surveillance Deployment</div>
              <div style={{ color: '#A8BCCC', fontSize: '0.8125rem' }}>From single-building security to multi-block perimeter networks</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Comprehensive Surveillance Capabilities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'IP High-Definition Cameras (4MP / 4K with Color Night Vision & Two-Way Audio)',
                'HD Analog Surveillance Networks with High-Channel DVRs',
                'NVR & Storage Server Configuration with H.265+ Compression',
                'Perimeter Security, PTZ Optical Zoom & Automatic Tracking',
                'Elevator & Shaft CCTV Cabling with Heavy-Duty Flexible Conduits',
                'Centralized Security Room Setup with Multi-Screen Video Walls'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#C5A03F" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: 36, color: '#FFFFFF' }}>
            Our 5-Step Turnkey Execution Process
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {processSteps.map(p => (
              <div key={p.step} className="glass-card" style={{ padding: 24 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#C5A03F', marginBottom: 10, fontFamily: 'monospace' }}>
                  {p.step}
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>{p.title}</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
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
        headline="Ready for a CCTV Site Assessment?"
        sub="Our engineers will survey your property, identify camera positions, and prepare a detailed deployment proposal — tailored to your site."
      />
      <Footer />
    </div>
  )
}
