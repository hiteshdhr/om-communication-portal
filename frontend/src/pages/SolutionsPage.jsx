import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall, Building2, Factory, Home, Store } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

import { images } from '../assets/imageMap'

const bundles = [
  {
    title: 'Residential High-Rise & Society Bundle',
    icon: Home,
    color: '#C5A03F',
    subtitle: 'Integrated Community Safety & Voice Infrastructure',
    components: ['Perimeter & Gate IP CCTV Surveillance', 'Riser Shaft Multi-Line EPABX Intercom', 'Multi-Apartment Video Door Phones', 'Boom Barrier RFID Vehicle Access', 'Comprehensive Preventative AMC'],
    desc: 'Single-vendor turnkey accountability eliminating conflicts between separate camera, intercom, and gate automation contractors.'
  },
  {
    title: 'Industrial Plant & Warehouse Bundle',
    icon: Factory,
    color: '#FF9F0D',
    subtitle: 'Heavy-Duty Industrial Security & Workforce Tracking',
    components: ['Long-Range Perimeter Night Vision Cameras', 'Loading Bay & Machinery CCTV Monitoring', 'Multi-Shift Biometric Attendance Terminals', 'Armored Conduit & Server Rack Infrastructure', 'Priority 24-Hr Breakdown AMC Support'],
    desc: 'Engineered for harsh, high-dust manufacturing and logistics environments with robust surge protection and battery backups.'
  },
  {
    title: 'Corporate Headquarters & Office Bundle',
    icon: Building2,
    color: '#06b6d4',
    subtitle: 'Executive Communication & Smart Access Control',
    components: ['Multi-Extension Office PABX & IVR System', 'AI Facial Recognition on Glass Doors', 'Discreet Corridor & Server Room CCTV', 'Structured D-Link CAT6 Data/Voice Cabling', 'Annual Maintenance & Support Contract'],
    desc: 'Aesthetic, concealed wiring and seamless communication infrastructure tailored for professional corporate workspaces.'
  },
  {
    title: 'Multi-Branch Retail Security Bundle',
    icon: Store,
    color: '#22c55e',
    subtitle: 'Loss Prevention & Centralized Multi-Store Feeds',
    components: ['High-Detail POS Cash Counter CCTV', 'Central Cloud/Mobile Remote Feeds for HQ', 'Stockroom Biometric Entry Authorization', 'Compact Aesthetic Dome Cameras', 'Preventative Operational Maintenance'],
    desc: 'Multi-outlet loss prevention and remote management for retail business owners operating across multiple locations.'
  },
]

export default function SolutionsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Turnkey Security & Infrastructure Solutions | Om Communication Work"
        description="Explore how OCW combines CCTV, EPABX intercoms, access control, and structured cabling into unified turnkey solution packages for residential, commercial, and industrial facilities."
        canonical="/solutions"
      />
      <Navbar />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Turnkey Integration
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Integrated Security & Telecom Solutions
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Consolidate your security, surveillance, telecom, and structured cabling under one engineering partner with end-to-end design, deployment, and ongoing AMC warranty.
          </p>
        </motion.div>

        {/* Supporting Solutions Visual Banner */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(197,160,63,0.25)',
          marginBottom: 50,
          background: 'rgba(4,12,26,0.6)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
        }}>
          <img
            src={images.preview.collage}
            alt="OCW turnkey solutions collage spanning structured cabling, AMC maintenance, conduit wiring, and turnkey projects"
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 'none', objectFit: 'contain' }}
            loading="eager"
          />
        </div>

        {/* Bundles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 60 }}>
          {bundles.map(b => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: `${b.color}15`, border: `1px solid ${b.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                }}>
                  <b.icon size={26} color={b.color} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                  {b.title}
                </h2>
                <div style={{ color: b.color, fontSize: '0.8125rem', fontWeight: 600, marginBottom: 16 }}>
                  {b.subtitle}
                </div>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 20 }}>
                  {b.desc}
                </p>
                <div style={{
                  background: 'rgba(4,12,26,0.6)',
                  borderRadius: 10,
                  padding: 16,
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: 24
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A8BCCC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Bundled Sub-Systems:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {b.components.map(comp => (
                      <div key={comp} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#E2E8F0' }}>
                        <CheckCircle2 size={14} color={b.color} style={{ flexShrink: 0 }} />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/quote"
                className="btn-primary"
                style={{ justifyContent: 'center', width: '100%', padding: '10px' }}
              >
                Request Custom Solution Proposal <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The Turnkey Advantage */}
        <div className="glass-card" style={{ padding: 40, marginBottom: 60, background: 'linear-gradient(135deg, rgba(13,32,64,0.7) 0%, rgba(4,12,26,0.9) 100%)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', textAlign: 'center', marginBottom: 28 }}>
            The Turnkey Single-Vendor Advantage
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <div>
              <h4 style={{ color: '#C5A03F', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Zero Vendor Finger-Pointing</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>CCTV, intercoms, and cabling are managed by one accountable team — no passing blame when an issue arises.</p>
            </div>
            <div>
              <h4 style={{ color: '#C5A03F', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Optimized Cable Pathways</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>We plan conduit routes for both data and telecom lines simultaneously, reducing labour time and wall drilling.</p>
            </div>
            <div>
              <h4 style={{ color: '#C5A03F', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Unified AMC Contract</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>A single Annual Maintenance Contract covers all security, voice, and access systems under one scheduled SLA.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(197,160,63,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Have an Engineered Requirement for Your Site?
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Book a site survey with our engineers to configure a custom integrated solution package.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
              Request Solution Site Survey <ChevronRight size={16} />
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
