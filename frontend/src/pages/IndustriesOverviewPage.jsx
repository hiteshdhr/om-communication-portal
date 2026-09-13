import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Factory, Home, ShoppingBag, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
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
  },
  {
    icon: Factory,
    title: 'Factories, Industrial Plants & Warehouses',
    href: '/industries/factories',
    photo: images.industries.industrial.factory,
    alt: 'Industrial manufacturing factory long-range perimeter CCTV monitoring',
    desc: 'Heavy-duty surveillance, perimeter breach detection, loading bay monitoring, and shift-based biometric attendance.',
    solutions: ['Industrial PTZ & Long-Range Night Vision', 'Shift-Based Biometric Access & Attendance', 'Conduit Wiring for Demanding Areas', 'Loading Bay & Machinery Monitoring'],
  },
  {
    icon: Building2,
    title: 'Commercial & Corporate Offices',
    href: '/industries/offices',
    photo: images.industries.commercial.controlRoom,
    alt: 'Modern corporate office facility central security control room',
    desc: 'Integrated office communication, biometric glass-door entry, visitor screening, and structured network cabling.',
    solutions: ['Executive PABX & Multi-Line Extension Setup', 'Biometric Access on Glass Doors', 'Visitor Screening & Video Verification', 'Server Rack & Structured CAT6 Wiring'],
  },
  {
    icon: ShoppingBag,
    title: 'Retail Chains & Commercial Outlets',
    href: '/industries/retail',
    photo: images.industries.commercial.monitoring,
    alt: 'Multi-store retail chain centralized CCTV surveillance and transaction monitoring',
    desc: 'Loss prevention surveillance, cash counter monitoring, employee attendance logging, and multi-store central view.',
    solutions: ['Cash Counter & POS Detail CCTV', 'Multi-Store Remote Monitoring Feeds', 'Staff Attendance & Store Entry Control', 'Preventative Maintenance AMC Support'],
  },
]

export default function IndustriesOverviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827' }}>
      <SEO
        title="Industries We Secure | OM Communication"
        description="Tailored security and communication infrastructure solutions for residential societies, manufacturing factories, corporate offices, and retail chains across Delhi-NCR."
        canonical="/industries"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/industries' }
          ]
        }}
      />
      <Navbar />

      {/* ── Page Hero ── */}
      <section style={{ background: '#F6F7F8', borderBottom: '1px solid #E5E7EB', padding: 'clamp(32px, 5vw, 56px) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Industries' }]} />
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
            <div style={{ color: '#B4233C', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Sector-Specific Solutions
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, margin: '0 0 12px', color: '#111827', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Industries &amp; Facilities We Secure
            </h1>
            <p style={{ color: '#59636F', fontSize: '1.05rem', maxWidth: 720, lineHeight: 1.65, margin: 0 }}>
              Every facility has unique physical layout constraints and compliance standards. We engineer customized security architectures built for your specific operational environment in Delhi-NCR.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px clamp(16px, 4vw, 32px) 80px' }}>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 56 }}>
          {industries.map(ind => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Card Image Banner */}
              <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
                <img
                  src={ind.photo}
                  alt={ind.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  loading="lazy"
                />
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    color: '#B4233C', fontWeight: 700, fontSize: '0.8125rem', marginBottom: 8
                  }}>
                    <ind.icon size={16} /> Industry Sector
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: 10, letterSpacing: '-0.01em' }}>
                    {ind.title}
                  </h2>
                  <p style={{ color: '#59636F', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 18 }}>
                    {ind.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                    {ind.solutions.map(sol => (
                      <div key={sol} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#111827', fontWeight: 500 }}>
                        <CheckCircle2 size={14} color="#B4233C" style={{ flexShrink: 0 }} />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={ind.href}
                  className="btn-secondary"
                  style={{ justifyContent: 'center', width: '100%', padding: '10px 16px' }}
                >
                  Explore Sector Solutions <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: '#FAF4F5',
          border: '1px solid #F2D2D7',
          borderRadius: 14,
          padding: 40,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', marginBottom: 10, letterSpacing: '-0.01em' }}>
            Have a Specific Facility Requirement?
          </h3>
          <p style={{ color: '#59636F', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Our engineering team will conduct an on-site evaluation and design a customized security specification for your site.
          </p>
          <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
            Book On-Site Technical Assessment <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
