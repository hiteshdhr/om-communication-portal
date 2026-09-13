import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Users, CheckCircle2, MapPin, PhoneCall, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { images } from '../assets/imageMap'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827' }}>
      <SEO
        title="About Us | Om Communication Work — Enterprise Security & Infrastructure Solutions"
        description="Learn about Om Communication Work (OCW), an enterprise security, CCTV surveillance, EPABX telecom, and turnkey infrastructure service provider serving Delhi-NCR."
        canonical="/about"
      />
      <Navbar />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '36px clamp(16px, 4vw, 32px) 80px' }}>
        <Breadcrumbs items={[{ label: 'About Us' }]} light={true} />

        {/* Hero Section */}
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow">About Om Communication Work</div>
          <h1 style={{
            fontFamily: "'Manrope', 'Inter', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: '#111827',
            margin: '0 0 14px',
            lineHeight: 1.1,
          }}>
            Security &amp; Communication Infrastructure
          </h1>
          <p style={{ color: '#59636F', fontSize: '1.05rem', maxWidth: 720, margin: 0, lineHeight: 1.65 }}>
            Om Communication Work is a full-lifecycle turnkey engineering provider specializing in on-site security assessment, system design, hardware installation, and long-term AMC maintenance across Delhi-NCR.
          </p>
        </div>

        {/* Real Consultation Showcase Visual */}
        <div style={{
          borderRadius: 14,
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          marginBottom: 48,
          position: 'relative',
          maxHeight: 380,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          <img
            src={images.about.consultation}
            alt="OCW engineer discussing security and telecom installation requirements with client on-site"
            style={{ width: '100%', height: 380, objectFit: 'cover', objectPosition: 'center 35%' }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            background: 'rgba(23, 25, 29, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: 8,
            padding: '12px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            color: '#FFFFFF',
          }}>
            <div>
              <div style={{ color: '#B4233C', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Engineering Focus
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                On-Site Surveys &amp; Direct Field Execution
              </div>
            </div>
            <div style={{
              background: '#22262C',
              border: '1px solid #2D323B',
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#D1D5DB',
            }}>
              15+ Years Field Track Record
            </div>
          </div>
        </div>

        {/* Story / Values Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 48 }}>
          <div className="clean-card" style={{ padding: 28 }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: '#FAF4F5',
              border: '1px solid rgba(180, 35, 60, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Shield size={20} color="#B4233C" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 8, color: '#111827' }}>
              Solution-First Engineering
            </h2>
            <p style={{ color: '#59636F', lineHeight: 1.65, fontSize: '0.9rem', margin: 0 }}>
              We do not sell boxed products blindly. Every installation begins with a detailed on-site assessment of viewing angles, conduit pathways, line counts, and power loads to engineer an optimal layout.
            </p>
          </div>

          <div className="clean-card" style={{ padding: 28 }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: '#FAF4F5',
              border: '1px solid rgba(180, 35, 60, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Users size={20} color="#B4233C" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 8, color: '#111827' }}>
              Dedicated Field Teams
            </h2>
            <p style={{ color: '#59636F', lineHeight: 1.65, fontSize: '0.9rem', margin: 0 }}>
              Our in-house technicians handle conduit laying, cable pulling, patch panel termination, device calibration, and testing directly, ensuring quality control from start to finish.
            </p>
          </div>
        </div>

        {/* Technical Capabilities Checklist */}
        <div style={{
          background: '#F6F7F8',
          border: '1px solid #E5E7EB',
          borderRadius: 12,
          padding: 'clamp(24px, 4vw, 36px)',
          marginBottom: 48,
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 16, color: '#111827' }}>
            Core Systems &amp; Disciplines
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {[
              'IP & HD Analog CCTV Surveillance Systems',
              'EPABX Intercom & Multi-Line Office Exchanges',
              'Video Door Phone (VDP) Entry Infrastructure',
              'Biometric Attendance & Access Control Terminals',
              'CAT6 Structured Cabling & Server Rack Dressing',
              'Annual Maintenance Contracts (AMC) with Priority SLAs',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={16} color="#B4233C" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#374151' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div style={{
          background: '#FAF4F5',
          border: '1px solid rgba(180, 35, 60, 0.2)',
          borderRadius: 12,
          padding: '32px 28px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: 8, color: '#111827' }}>
            Ready to plan your security or telecom installation?
          </h2>
          <p style={{ color: '#59636F', maxWidth: 500, margin: '0 auto 20px', fontSize: '0.95rem' }}>
            Contact our engineering team to schedule a physical site inspection anywhere in Delhi-NCR.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary">
              Request Site Survey <ArrowRight size={15} />
            </Link>
            <a href="tel:+917217715296" className="btn-secondary">
              <PhoneCall size={14} color="#B4233C" /> Call +91 72177 15296
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
