import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'

import { images } from '../../assets/imageMap'

export default function FactoriesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Industrial Plant & Factory Security Solutions | Om Communication Work"
        description="Industrial CCTV surveillance, perimeter intrusion monitoring, hazardous-area conduit wiring, and shift-based biometric attendance for factories across Delhi-NCR & India."
        canonical="/industries/factories"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#FF9F0D', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Industrial Solutions
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Factories, Warehouses & Industrial Plants
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Ruggedized, high-endurance surveillance, perimeter breach protection, and automated workforce access control engineered for demanding industrial environments.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(255,159,13,0.3)',
          marginBottom: 50,
          position: 'relative',
          height: 340,
        }}>
          <img
            src={images.industries.industrial.factory}
            alt="Industrial manufacturing plant heavy-duty perimeter CCTV and facility surveillance network"
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
            <div style={{ color: '#FF9F0D', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Heavy-Duty Surveillance & Plant Access Automation
            </div>
            <div style={{ color: '#A8BCCC', fontSize: '0.875rem' }}>
              Metallic conduit cabling, high-dust endurance, loading bay cameras & biometric shifts
            </div>
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 60 }}>
          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Industrial Operational Demands
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#94A3B8', fontSize: '0.88rem' }}>
              <div>• Large perimeter footprints requiring long-range night vision & optical PTZ zoom.</div>
              <div>• Harsh environmental factors: high dust, machinery vibration, and chemical exposure.</div>
              <div>• High workforce volume across rotating shifts needing automated time-logging.</div>
              <div>• Unmonitored loading bays leading to material shrinkage and logistics disputes.</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32, border: '1px solid rgba(255,159,13,0.35)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FF9F0D', marginBottom: 16 }}>
              The OCW Industrial Package
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Long-Range 4MP IP Cameras with Smart IR Night Vision for Boundary Walls',
                'Heavy-Duty Armored Cable Laying in Metallic / ISI-Grade PVC Conduits',
                'Multi-Shift Biometric Attendance Terminals Integrated with HR Software',
                'Loading Dock & Dispatch Area High-Detail Surveillance Coverage',
                'Industrial Server Rack Setup with Surge Suppression & Battery Backup'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#FF9F0D" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Example */}
        <div className="glass-card" style={{ padding: 36, marginBottom: 60, background: 'linear-gradient(135deg, rgba(13,32,64,0.7) 0%, rgba(4,12,26,0.9) 100%)' }}>
          <div style={{ color: '#FF9F0D', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Featured Deployment
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Multi-Acre Manufacturing & Logistics Plant — Delhi NCR
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 16 }}>
            Engineered a 48-camera high-definition IP surveillance network covering raw material storage, assembly lines, dispatch bays, and perimeter fences with centralized security room monitoring and shift-based biometric access control.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.8125rem', color: '#A8BCCC' }}>
            <span><strong>Scope:</strong> Turnkey CCTV + Biometric Access Control</span>
            <span><strong>Sector:</strong> Heavy Industrial Manufacturing</span>
            <span><strong>Uptime:</strong> 99.8% on AMC Contract</span>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,159,13,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Schedule an Industrial Facility Assessment
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Our industrial security engineers will assess cable pathways, power distribution, and blindspot coverage across your plant.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
              Request Plant Site Survey <ChevronRight size={16} />
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
