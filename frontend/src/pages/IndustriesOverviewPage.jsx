import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Factory, Home, ShoppingBag, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

import { images } from '../assets/imageMap'

const industries = [
  {
    icon: Home,
    title: 'Residential Societies & High-Rise Apartments',
    href: '/industries/residential',
    photo: images.industries.residential.cctv,
    alt: 'High-rise residential society perimeter CCTV security and intercom wiring',
    desc: 'Complete security and intercom infrastructure for gated complexes, multi-tower RWAs, and condominium towers.',
    solutions: ['Perimeter & Gate CCTV Coverage', 'Multi-Floor Riser Shaft Intercom Networks', 'Video Door Phones & Boom Barrier Integration', 'Long-Term Preventative Society AMC'],
    color: '#C5A03F'
  },
  {
    icon: Factory,
    title: 'Factories, Industrial Plants & Warehouses',
    href: '/industries/factories',
    photo: images.industries.industrial.factory,
    alt: 'Industrial manufacturing factory long-range perimeter CCTV monitoring',
    desc: 'Heavy-duty surveillance, perimeter breach detection, loading bay monitoring, and shift-based biometric attendance.',
    solutions: ['Industrial PTZ & Long-Range Night Vision', 'Shift-Based Biometric Access & Payroll Integration', 'Hazardous & High-Dust Area Conduit Wiring', 'Loading Bay & Machinery Monitoring'],
    color: '#FF9F0D'
  },
  {
    icon: Building2,
    title: 'Commercial & Corporate Offices',
    href: '/industries/offices',
    photo: images.industries.commercial.controlRoom,
    alt: 'Modern corporate office facility central security control room',
    desc: 'Integrated office communication, smart glass-door biometric entry, visitor screening, and structured network cabling.',
    solutions: ['Executive PABX & Multi-Line Extension Setup', 'Face & Fingerprint Access on Glass Doors', 'Visitor Screenings & Video Verification', 'Server Rack & Structured CAT6 Wiring'],
    color: '#06b6d4'
  },
  {
    icon: ShoppingBag,
    title: 'Retail Chains & Commercial Outlets',
    href: '/industries/retail',
    photo: images.industries.commercial.monitoring,
    alt: 'Multi-store retail chain centralized CCTV surveillance and transaction monitoring',
    desc: 'Loss prevention surveillance, cash counter monitoring, customer footfall analytics, and multi-store central view.',
    solutions: ['Cash Counter & POS High-Detail CCTV', 'Multi-Store Remote Monitoring Feeds', 'Staff Attendance & Store Entry Control', 'Preventative Breakdown AMC Support'],
    color: '#22c55e'
  },
]

export default function IndustriesOverviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Industries We Secure | Om Communication Work"
        description="Tailored security and communication infrastructure solutions for residential societies, manufacturing factories, corporate offices, and retail chains across Delhi-NCR."
        canonical="/industries"
      />
      <Navbar />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Sector-Specific Solutions
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Industries & Facilities We Secure
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 640, margin: '14px auto 0', lineHeight: 1.6 }}>
            Every facility has unique physical layout constraints and compliance standards. We engineer customized security architectures built for your specific operational environment.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 60 }}>
          {industries.map(ind => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              {/* Card Image Banner */}
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img
                  src={ind.photo}
                  alt={ind.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,15,30,0.95) 0%, rgba(4,12,26,0.3) 60%, transparent 100%)' }} />
                <div style={{
                  position: 'absolute', bottom: 16, left: 24,
                  width: 44, height: 44, borderRadius: 10,
                  background: `${ind.color}25`, border: `1px solid ${ind.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <ind.icon size={22} color={ind.color} />
                </div>
              </div>

              <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>
                    {ind.title}
                  </h2>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 18 }}>
                    {ind.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                    {ind.solutions.map(sol => (
                      <div key={sol} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#E2E8F0' }}>
                        <CheckCircle2 size={14} color={ind.color} style={{ flexShrink: 0 }} />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={ind.href}
                  className="btn-secondary"
                  style={{ justifyContent: 'center', width: '100%', padding: '10px' }}
                >
                  Explore Sector Solutions <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(197,160,63,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Have a Specific Facility Requirement?
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Our engineering team will conduct an on-site evaluation and design a customized security specification for your site.
          </p>
          <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
            Book On-Site Technical Assessment <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
