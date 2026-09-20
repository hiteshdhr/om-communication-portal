import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall, Building2, Factory, Home, Store, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { images } from '../assets/imageMap'

const bundles = [
  {
    title: 'Residential High-Rise & Society Bundle',
    icon: Home,
    subtitle: 'Integrated Community Safety & Voice Infrastructure',
    components: ['Perimeter & Gate IP CCTV Surveillance', 'Riser Shaft Multi-Line EPABX Intercom', 'Multi-Apartment Video Door Phones', 'Boom Barrier RFID Vehicle Access', 'Comprehensive Preventative AMC'],
    desc: 'Single-vendor turnkey accountability eliminating conflicts between separate camera, intercom, and gate automation contractors.'
  },
  {
    title: 'Industrial Plant & Warehouse Bundle',
    icon: Factory,
    subtitle: 'Heavy-Duty Industrial Security & Workforce Tracking',
    components: ['Long-Range Perimeter Night Vision Cameras', 'Loading Bay & Machinery CCTV Monitoring', 'Multi-Shift Biometric Attendance Terminals', 'Metallic Conduit & Server Rack Infrastructure', 'Scheduled Breakdown & Preventative AMC Support'],
    desc: 'Engineered for demanding manufacturing and logistics environments with surge protection and structured distribution.'
  },
  {
    title: 'Corporate Headquarters & Office Bundle',
    icon: Building2,
    subtitle: 'Executive Communication & Smart Access Control',
    components: ['Multi-Extension Office PABX & IVR System', 'Biometric Access Control on Glass Doors', 'Discreet Corridor & Server Room CCTV', 'Structured CAT6 Data/Voice Cabling', 'Annual Maintenance & Support Contract'],
    desc: 'Aesthetic, concealed wiring and seamless communication infrastructure tailored for professional corporate workspaces.'
  },
  {
    title: 'Multi-Branch Commercial & Retail Bundle',
    icon: Store,
    subtitle: 'Loss Prevention & Centralized Multi-Store Feeds',
    components: ['High-Detail POS Cash Counter CCTV', 'Central Remote Feeds for HQ / Owners', 'Stockroom Biometric Entry Authorization', 'Compact Aesthetic Dome Cameras', 'Preventative Operational Maintenance'],
    desc: 'Multi-outlet loss prevention and remote management for business owners operating across multiple NCR locations.'
  },
]

export default function SolutionsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Turnkey Security & Infrastructure Solutions | OM Communication"
        description="Consolidate CCTV, EPABX intercoms, access control, and structured cabling into unified turnkey solution packages for residential, commercial, and industrial facilities in Delhi-NCR."
        canonical="/solutions"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/solutions' }
          ]
        }}
      />
      <Navbar />

      {/* ── Page Hero ── */}
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)', padding: 'clamp(32px, 5vw, 56px) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Solutions' }]} />
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
            <div style={{ color: '#B4233C', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Turnkey Integration
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, margin: '0 0 12px', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Integrated Security &amp; Telecom Solutions
            </h1>
            <p style={{ color: '#59636F', fontSize: '1.05rem', maxWidth: 720, lineHeight: 1.65, margin: 0 }}>
              Consolidate your security, surveillance, telecom, and structured cabling under one engineering partner with end-to-end design, deployment, and ongoing AMC warranty across Delhi-NCR.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px clamp(16px, 4vw, 32px) 80px' }}>

        {/* Supporting Solutions Visual Banner */}
        <div style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          marginBottom: 48,
          background: 'var(--bg-surface)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        }}>
          <img
            src={images.preview.collage}
            alt="OM Communication turnkey solutions collage spanning structured cabling, AMC maintenance, conduit wiring, and turnkey projects"
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 420, objectFit: 'cover' }}
            loading="eager"
          />
        </div>

        {/* Bundles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 56 }}>
          {bundles.map(b => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: '#FAF4F5', border: '1px solid #F2D2D7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                }}>
                  <b.icon size={24} color="#B4233C" />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  {b.title}
                </h2>
                <div style={{ color: '#B4233C', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 14 }}>
                  {b.subtitle}
                </div>
                <p style={{ color: '#59636F', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 20 }}>
                  {b.desc}
                </p>
                <div style={{
                  background: 'var(--bg-surface)',
                  borderRadius: 10,
                  padding: 16,
                  border: '1px solid #E5E7EB',
                  marginBottom: 24
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#59636F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Bundled Sub-Systems:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {b.components.map(comp => (
                      <div key={comp} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        <CheckCircle2 size={14} color="#B4233C" style={{ flexShrink: 0 }} />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/quote"
                className="btn-primary"
                style={{ justifyContent: 'center', width: '100%', padding: '10px 16px' }}
              >
                Request Solution Proposal <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The Turnkey Advantage */}
        <div style={{
          padding: 36,
          borderRadius: 14,
          marginBottom: 48,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.01em' }}>
            The Turnkey Single-Vendor Advantage
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 10, border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 4 }}>15+ Years Track Record</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Hundreds of completed commercial &amp; residential security &amp; intercom projects across Delhi-NCR.</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 10, border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 4 }}>End-to-End Execution</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Site survey, wiring layout, equipment mounting, IP setup, and ongoing AMC maintenance.</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 10, border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 4 }}>Enterprise Brands</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Authorized deployment of Hikvision, CP PLUS, Matrix, Matrix Comsec, and Panasonic hardware.</div>
            </div>
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
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.01em' }}>
            Have an Engineered Requirement for Your Site?
          </h3>
          <p style={{ color: '#59636F', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Book a site survey with our engineers to configure a custom integrated solution package.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
              Request Solution Site Survey <ChevronRight size={16} />
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
