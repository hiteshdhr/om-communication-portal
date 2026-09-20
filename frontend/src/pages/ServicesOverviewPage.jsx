import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, Phone, DoorOpen, Fingerprint, Network, Wrench, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { images } from '../assets/imageMap'

const services = [
  {
    icon: Camera,
    title: 'CCTV Surveillance Systems',
    href: '/services/cctv',
    desc: 'High-definition IP and analog video surveillance solutions engineered for 24/7 security monitoring, perimeter protection, and high-capacity recording.',
    features: ['IP, Dome, Bullet & PTZ Cameras', 'NVR/DVR Configuration & Storage Planning', 'Remote Mobile & Central Monitor Feeds', 'Preventative AMC Health Checks'],
    photo: images.services.cctv.dome,
    alt: 'Commercial dome CCTV security camera installation'
  },
  {
    icon: Phone,
    title: 'EPABX & Telecom Intercoms',
    href: '/services/epabx',
    desc: 'Enterprise PABX systems, multi-line intercoms, Krone module distributions, and riser shaft cabling for high-rises, offices, and factories.',
    features: ['Multi-Line & Auto-Attendant Setup', 'Society Riser Shaft & Krone Overhaul', 'Beetel Standard & Display Extensions', 'Seamless Flat-to-Gate Communication'],
    photo: images.services.epabx.hero,
    alt: 'Enterprise EPABX telecom rack and structured office telephone cabling'
  },
  {
    icon: DoorOpen,
    title: 'Video Door Phone (VDP) Systems',
    href: '/services/vdp',
    desc: 'Multi-apartment and villa VDP solutions with high-clarity video panels, two-way audio, and automated door latch integration.',
    features: ['Multi-Apartment IP Video Networks', 'Villa Entry Kits with 7-Inch Screens', 'Night-Vision Outdoor Calling Stations', 'Access Control Integration'],
    photo: images.services.vdp.hero,
    alt: 'Indoor video door phone access verification and communication touchscreen monitor'
  },
  {
    icon: Fingerprint,
    title: 'Biometric Access Control',
    href: '/services/biometrics',
    desc: 'Multi-modal access control and time-attendance terminals utilizing biometric fingerprint, RFID cards, and verification logs.',
    features: ['Face Recognition & Fingerprint Readers', 'Automated Time & Attendance Logging', 'Magnetic Lock & Turnstile Integration', 'Audit Trail & Entry Permission Sets'],
    photo: images.services.biometrics.hero,
    alt: 'High-accuracy optical fingerprint and biometric access terminal'
  },
  {
    icon: Network,
    title: 'Networking & Structured Cabling',
    href: '/services/networking',
    desc: 'Enterprise CAT6 / CAT6A data & voice cabling, server rack assembly, patch panel dressing, and PoE network infrastructure.',
    features: ['D-Link / Schneider Certified Cabling', 'Server Rack & Patch Panel Dressing', 'PoE Switch & Managed Distribution', 'Fluke / Continuity Certified Testing'],
    photo: images.services.networking.rack,
    alt: 'Structured CAT6 network cabling and server rack installation'
  },
  {
    icon: Wrench,
    title: 'AMC & Maintenance Contracts',
    href: '/services/amc',
    desc: 'Comprehensive Annual Maintenance Contracts (AMC) with scheduled preventative audits, priority technician dispatch, and cabling health care.',
    features: ['Scheduled Preventative Audits', 'Prompt Technician Dispatch', 'Camera, NVR & PSU Health Diagnostics', 'Emergency Breakdown Repair'],
    photo: images.services.amc.rackMaintenance,
    alt: 'OM Communication technician conducting scheduled preventative maintenance on server rack'
  },
]

export default function ServicesOverviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Enterprise Security & Telecom Services | OM Communication"
        description="Explore our full spectrum of enterprise security solutions: CCTV surveillance, EPABX intercom networks, Video Door Phones, biometric access control, networking, and turnkey AMC maintenance in Delhi-NCR."
        canonical="/services"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/services' }
          ]
        }}
      />
      <Navbar />

      {/* ── Page Hero ── */}
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)', padding: 'clamp(32px, 5vw, 56px) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Services' }]} />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: 16 }}
          >
            <div style={{ color: '#B4233C', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Engineered Capabilities
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, margin: '0 0 12px', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Enterprise Services &amp; Infrastructure Solutions
            </h1>
            <p style={{ color: '#59636F', fontSize: '1.05rem', maxWidth: 720, lineHeight: 1.65, margin: 0 }}>
              OM Communication designs, installs, and maintains mission-critical security and communication infrastructure across residential societies, factories, and corporate offices in Delhi-NCR.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px clamp(16px, 4vw, 32px) 80px' }}>

        {/* Services List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 56 }}>
          {services.map((s, index) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              style={{
                background: '#FFFFFF',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                padding: 32,
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'center' }}>
                <div>
                  <div style={{
                    width: 48, height: 48, background: '#FAF4F5',
                    border: '1px solid #F2D2D7', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
                  }}>
                    <s.icon size={24} color="#B4233C" />
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h2>
                  <p style={{ color: '#59636F', lineHeight: 1.65, fontSize: '0.92rem', marginBottom: 18 }}>
                    {s.desc}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 24 }}>
                    {s.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        <CheckCircle2 size={15} color="#B4233C" style={{ flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={s.href}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', fontSize: '0.875rem' }}
                  >
                    View Complete Solution <ArrowRight size={14} />
                  </Link>
                </div>

                {s.photo && (
                  <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', height: 240, border: '1px solid #E5E7EB' }}>
                    <img
                      src={s.photo}
                      alt={s.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: '#FAF4F5',
          border: '1px solid #F2D2D7',
          borderRadius: 14,
          padding: 40,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
            Need a Multi-Service Security Solution?
          </h3>
          <p style={{ color: '#59636F', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            We bundle CCTV, Intercoms, Access Control, and Structured Cabling into unified turnkey packages with single-vendor accountability.
          </p>
          <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
            Request Site Survey / Quote <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
