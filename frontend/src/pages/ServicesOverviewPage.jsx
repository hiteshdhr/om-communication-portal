import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, Phone, DoorOpen, Fingerprint, Wrench, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { images } from '../assets/imageMap'

const services = [
  {
    icon: Camera,
    title: 'CCTV Surveillance Systems',
    href: '/services/cctv',
    desc: 'High-definition IP and analog video surveillance solutions engineered for 24/7 security monitoring, perimeter protection, and high-capacity recording.',
    features: ['IP, Dome, Bullet & PTZ Cameras', 'NVR/DVR Configuration & Storage Planning', 'Remote Mobile & Central Monitor Feeds', 'Preventative AMC Health Checks'],
    color: '#C5A03F',
    photo: images.services.cctv.dome,
    alt: 'Commercial dome CCTV security camera installation'
  },
  {
    icon: Phone,
    title: 'EPABX & Telecom Intercoms',
    href: '/services/epabx',
    desc: 'Enterprise PABX systems, multi-line intercoms, Krone module distributions, and riser shaft cabling for high-rises, offices, and factories.',
    features: ['Multi-Line & Auto-Attendant Setup', 'Society Riser Shaft & Krone Overhaul', 'Beetel Standard & Display Extensions', 'Seamless Flat-to-Gate Communication'],
    color: '#8b5cf6',
    photo: images.services.epabx.hero,
    alt: 'Enterprise EPABX telecom rack and structured office telephone cabling'
  },
  {
    icon: DoorOpen,
    title: 'Video Door Phone (VDP) Systems',
    href: '/services/vdp',
    desc: 'Multi-apartment and villa VDP solutions with high-clarity video panels, two-way audio, and automated door latch integration.',
    features: ['Multi-Apartment IP Video Networks', 'Villa Entry Kits with 7-Inch Screens', 'Night-Vision Outdoor Calling Stations', 'Access Control Integration'],
    color: '#06b6d4',
    photo: images.services.vdp.hero,
    alt: 'Indoor video door phone access verification and communication touchscreen monitor'
  },
  {
    icon: Fingerprint,
    title: 'Biometric Access Control',
    href: '/services/biometrics',
    desc: 'Multi-modal access control and time-attendance terminals utilizing biometric fingerprint, RFID cards, and AI facial recognition.',
    features: ['Face Recognition & Fingerprint Readers', 'Automated Time & Attendance Logging', 'Magnetic Lock & Turnstile Integration', 'Audit Trail & Entry Permission Sets'],
    color: '#D4AA50',
    photo: images.services.biometrics.hero,
    alt: 'High-accuracy optical fingerprint and AI facial recognition biometric terminal'
  },
  {
    icon: Wrench,
    title: 'AMC & Turnkey Maintenance',
    href: '/services/amc',
    desc: 'Comprehensive Annual Maintenance Contracts (AMC) with scheduled preventative audits, priority technician dispatch, and cabling health care.',
    features: ['Scheduled Preventative Audits', '24–48 Hr SLA Technician Dispatch', 'Camera, NVR & PSU Health Diagnostics', 'Emergency Breakdown Repair'],
    color: '#22c55e',
    photo: images.services.amc.rackMaintenance,
    alt: 'OCW technician conducting scheduled preventative maintenance and testing on telecom server rack'
  },
]

export default function ServicesOverviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Enterprise Security & Telecom Services | Om Communication Work"
        description="Explore our full spectrum of enterprise security solutions: CCTV surveillance, EPABX intercom networks, Video Door Phones, biometric access control, and turnkey AMC maintenance."
        canonical="/services"
      />
      <Navbar />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Engineered Security Solutions
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Enterprise Services & Infrastructure Solutions
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 640, margin: '14px auto 0', lineHeight: 1.6 }}>
            OCW designs, installs, and maintains mission-critical security and communication infrastructure across residential societies, factories, and corporate offices.
          </p>
        </motion.div>

        {/* Services List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginBottom: 60 }}>
          {services.map((s, index) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
              style={{ padding: 36, overflow: 'hidden' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'center' }}>
                <div>
                  <div style={{
                    width: 52, height: 52, background: `${s.color}15`,
                    border: `1px solid ${s.color}35`, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                  }}>
                    <s.icon size={26} color={s.color} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
                    {s.title}
                  </h2>
                  <p style={{ color: '#94A3B8', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 20 }}>
                    {s.desc}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                    {s.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', color: '#E2E8F0' }}>
                        <CheckCircle2 size={15} color={s.color} style={{ flexShrink: 0 }} />
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
                  <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 260, border: '1px solid rgba(197,160,63,0.2)' }}>
                    <img
                      src={s.photo}
                      alt={s.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(4,12,26,0.7) 0%, rgba(4,12,26,0.1) 100%)'
                    }} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(197,160,63,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Need a Multi-Service Security Solution?
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            We bundle CCTV, Intercoms, Access Control, and Cabling into unified turnkey packages with single-vendor accountability.
          </p>
          <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
            Request Site Survey / Quote <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
