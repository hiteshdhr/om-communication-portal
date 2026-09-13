import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall, Building2 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import { images } from '../../assets/imageMap'

export default function OfficesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827' }}>
      <SEO
        title="Commercial & Corporate Office Security Solutions | OM Communication"
        description="Integrated EPABX telephone systems, glass door biometric access control, visitor screening, and structured cabling for corporate offices across Delhi-NCR."
        canonical="/industries/offices"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/industries' },
            { '@type': 'ListItem', position: 3, name: 'Corporate Offices', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/industries/offices' }
          ]
        }}
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '110px 24px 80px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Industries', path: '/industries' }, { label: 'Corporate Offices' }]} />

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'left', marginBottom: 40 }}>
          <div style={{ color: '#B4233C', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Commercial Infrastructure
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 800, margin: 0, color: '#111827', letterSpacing: '-0.02em' }}>
            Commercial & Corporate Offices
          </h1>
          <p style={{ color: '#59636F', marginTop: 12, fontSize: '1.05rem', maxWidth: 760, lineHeight: 1.65 }}>
            Modern office communication, biometric access control, visitor verification, and structured CAT6 cabling engineered for professional workplaces in Delhi-NCR.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <div style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          marginBottom: 48,
          position: 'relative',
          background: '#17191D',
          height: 340,
        }}>
          <img
            src={images.industries.commercial.controlRoom}
            alt="Corporate office facility integrated security monitoring control room"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', opacity: 0.85 }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23,25,29,0.92) 0%, rgba(23,25,29,0.30) 60%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
          }}>
            <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Integrated Office Communication & Access Control
            </div>
            <div style={{ color: '#D1D5DB', fontSize: '0.875rem' }}>
              Multi-extension intercoms, frameless glass door biometric locks & concealed CAT6 runs
            </div>
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 48 }}>
          <div style={{
            background: '#F6F7F8',
            borderRadius: 14,
            padding: 32,
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: 16, letterSpacing: '-0.01em' }}>
              Office Infrastructure Requirements
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#59636F', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <div>• Seamless internal call routing between departments and floor levels.</div>
              <div>• Frameless glass door biometric access with clean electromagnetic lock brackets.</div>
              <div>• Neat server rack organization with labeled patch panels and zero loose cabling.</div>
              <div>• Discrete corridor, reception, and server room CCTV coverage.</div>
            </div>
          </div>

          <div style={{
            background: '#FFFFFF',
            borderRadius: 14,
            padding: 32,
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B4233C', marginBottom: 16, letterSpacing: '-0.01em' }}>
              The OM Communication Office Setup
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Multi-Extension Office PABX / Intercom with Auto-Attendant Setup',
                'Fingerprint & RFID Access Control for Glass and Wooden Doors',
                'Structured CAT6 / CAT6A Data & Voice Cabling with Patch Panels',
                'High-Resolution Dome Surveillance for Receptions, Corridors & Server Rooms',
                'Scheduled Maintenance and On-Demand Support Contract'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: '#111827', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="#B4233C" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Example */}
        <div style={{
          padding: 32,
          borderRadius: 14,
          marginBottom: 48,
          background: '#F6F7F8',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ color: '#B4233C', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Featured Deployment
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: 12 }}>
            Multi-Story Corporate Headquarters — Noida, NCR
          </h3>
          <p style={{ color: '#59636F', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 16 }}>
            Implemented complete CAT6 cabling infrastructure, multi-extension office EPABX intercom network, server rack integration, and biometric access control on glass partitions across 3 executive floors.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.85rem', color: '#374151' }}>
            <span><strong>Scope:</strong> EPABX + Structured Cabling + Biometric Access</span>
            <span><strong>Location:</strong> Noida, Uttar Pradesh</span>
            <span><strong>Status:</strong> Active Preventative Support</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: '#FAF4F5',
          border: '1px solid #F2D2D7',
          borderRadius: 14,
          padding: 40,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', marginBottom: 10 }}>
            Plan Your Office Communication & Access Setup
          </h3>
          <p style={{ color: '#59636F', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Our technical team will visit your office to design a clean, concealed cabling and communication layout.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
              Request Office Site Survey <ChevronRight size={16} />
            </Link>
            <a href="tel:+917217715296" className="btn-secondary" style={{ padding: '12px 24px' }}>
              <PhoneCall size={15} /> Call +91 72177 15296
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
