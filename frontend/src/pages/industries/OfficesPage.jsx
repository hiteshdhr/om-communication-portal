import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'

import { images } from '../../assets/imageMap'

export default function OfficesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Commercial & Corporate Office Security Solutions | Om Communication Work"
        description="Integrated EPABX telephone systems, glass door biometric access control, visitor screening, and structured cabling for corporate offices across Delhi-NCR."
        canonical="/industries/offices"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#06b6d4', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Commercial Solutions
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Commercial & Corporate Offices
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Modern office communication, smart biometric entry, visitor screening, and structured CAT6 cabling engineered for professional workplaces.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(6,182,212,0.3)',
          marginBottom: 50,
          position: 'relative',
          height: 340,
        }}>
          <img
            src={images.industries.commercial.controlRoom}
            alt="Corporate office facility integrated security monitoring control room"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(4,12,26,0.92) 0%, rgba(4,12,26,0.30) 60%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
          }}>
            <div style={{ color: '#06b6d4', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Integrated Office Communication & Access Control
            </div>
            <div style={{ color: '#A8BCCC', fontSize: '0.875rem' }}>
              Multi-line PABX intercoms, glass door biometrics & structured CAT6 workstations
            </div>
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 60 }}>
          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Modern Office Infrastructure Needs
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#94A3B8', fontSize: '0.88rem' }}>
              <div>• Seamless internal calling between departments and executive cabins.</div>
              <div>• Sleek biometric access on frameless glass doors without ugly exposed wiring.</div>
              <div>• Clean structured network cabling from server rack to individual workstations.</div>
              <div>• Secure visitor screening and access verification at main reception.</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32, border: '1px solid rgba(6,182,212,0.35)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#06b6d4', marginBottom: 16 }}>
              The OCW Office Infrastructure Solution
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Multi-Line EPABX Systems with Auto-Attendant & IVR Routing',
                'AI Face Recognition & Card Access on Glass Doors with Magnetic Locks',
                'Discreet Dome CCTV Surveillance for Receptions, Corridors & Server Rooms',
                'Server Rack Management, Patch Panels & D-Link CAT6 Structured Cabling',
                'Preventative AMC Covering All Office Telecom & Security Equipment'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Plan Your Office Security & Cabling Infrastructure
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Book a site survey with our engineers to map extension layouts, access points, and server rack requirements.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
              Request Office Site Survey <ChevronRight size={16} />
            </Link>
            <a href="tel:+917217715296" className="btn-secondary" style={{ padding: '12px 24px' }}>
              <PhoneCall size={14} /> Call +91 72177 15296
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
