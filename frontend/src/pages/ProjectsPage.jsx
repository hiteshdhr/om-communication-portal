import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Factory, Home, ShoppingBag, CheckCircle2, ChevronRight, PhoneCall, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { images } from '../assets/imageMap'

const projects = [
  {
    title: '84-Floor Multi-Tower Residential Complex',
    sector: 'Residential High-Rise Society',
    location: 'Ghaziabad, Uttar Pradesh',
    photo: images.projects.telecomCabinet,
    alt: 'Multi-tower vertical riser shaft telephone cabling and Krone module overhaul',
    icon: Home,
    requirement: 'Complex was suffering from extensive intercom line noise, cross-talk, and failed extensions across vertical shafts.',
    solution: 'Engineered a complete vertical riser shaft overhaul with fresh multi-pair telephone cabling, replaced rusted Krone distribution modules on every floor, and integrated an updated central security console.',
    servicesDeployed: ['Riser Shaft Cabling', 'Krone Module Distribution Overhaul', 'Multi-Line EPABX Network', 'Dedicated Guard Console'],
    outcome: '100% flat-to-gate communication restored across all towers with active preventative AMC.'
  },
  {
    title: 'Heavy Industrial Manufacturing Plant',
    sector: 'Industrial & Manufacturing',
    location: 'Delhi-NCR',
    photo: images.projects.factory,
    alt: 'Heavy industrial manufacturing factory perimeter CCTV surveillance and biometric attendance',
    icon: Factory,
    requirement: 'Need for high-definition 24/7 boundary surveillance, perimeter intrusion monitoring, and shift-based workforce time-attendance.',
    solution: 'Deployed a 48-channel IP surveillance network with 4MP smart infrared bullet cameras, industrial surge-suppressed server racks, and biometric attendance terminals.',
    servicesDeployed: ['4MP IP CCTV Surveillance', 'Perimeter IR Night Vision', 'Biometric Attendance Terminals', 'Heavy-Duty Metallic Conduit Wiring'],
    outcome: '99.8% recording uptime maintained over 3+ consecutive years on AMC contract.'
  },
  {
    title: 'Multi-Story Corporate Headquarters',
    sector: 'Commercial Office',
    location: 'Noida, Uttar Pradesh',
    photo: images.projects.networkRack,
    alt: 'Corporate server room structured CAT6 network rack and patch panel installation',
    icon: Building2,
    requirement: 'Executive intercom communication across multiple departmental floors, smart biometric glass door access, and aesthetic concealed cabling.',
    solution: 'Installed a multi-extension office PABX with auto-attendant routing, electromagnetic glass-door lock brackets with RFID/fingerprint readers, and structured CAT6 cabling throughout workstation zones.',
    servicesDeployed: ['Multi-Extension Office PABX', 'Frameless Glass Door Access Control', 'Structured CAT6 Cabling', 'Server Rack Integration'],
    outcome: 'Seamless departmental communication and strict access control for executive zones.'
  },
  {
    title: '24-Channel IP Surveillance Network for Gated Society',
    sector: 'Residential RWA',
    location: 'Delhi-NCR',
    photo: images.industries.residential.cctv,
    alt: 'Perimeter and gate surveillance camera deployment for residential gated society',
    icon: Home,
    requirement: 'Upgrading aged analog cameras with blindspots at society perimeter gates, parks, basement parking, and clubhouse.',
    solution: 'Designed and installed a high-speed 24-channel IP camera network with dedicated PoE switches, high-capacity NVR storage for 30+ days recording, and central security guard monitoring.',
    servicesDeployed: ['24-Ch IP CCTV Network', 'PoE Network Infrastructure', 'High-Capacity NVR Server', 'Security Room Video Setup'],
    outcome: 'Complete elimination of vehicular and pedestrian blindspots at society access gates.'
  },
  {
    title: 'Multi-Location Commercial Retail Outlets',
    sector: 'Retail Chains & Outlets',
    location: 'NCR Region',
    photo: images.industries.commercial.monitoring,
    alt: 'Commercial retail store high-detail surveillance and POS monitoring setup',
    icon: ShoppingBag,
    requirement: 'High-detail billing counter monitoring, staff attendance logging, and centralized remote mobile viewing across multiple store branches.',
    solution: 'Installed compact dome IP cameras with specialized focal lenses on POS cash counters, employee biometric terminals at staff entries, and centralized multi-site remote feeds for executive management.',
    servicesDeployed: ['POS Counter Detail CCTV', 'Staff Biometric Terminals', 'Centralized Mobile Remote Feeds', 'Preventative Store AMC'],
    outcome: 'Real-time multi-branch visibility and enhanced transaction dispute resolution.'
  },
]

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827' }}>
      <SEO
        title="Featured Projects & Infrastructure Deployments | OM Communication"
        description="Explore verified case studies of turnkey security, CCTV surveillance, EPABX society intercom overhauls, and access control deployments across Delhi-NCR."
        canonical="/projects"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/projects' }
          ]
        }}
      />
      <Navbar />

      {/* ── Page Hero ── */}
      <section style={{ background: '#F6F7F8', borderBottom: '1px solid #E5E7EB', padding: 'clamp(32px, 5vw, 56px) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Projects' }]} />
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
            <div style={{ color: '#B4233C', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Proven Execution Track Record
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, margin: '0 0 12px', color: '#111827', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Featured Deployments &amp; Field Case Studies
            </h1>
            <p style={{ color: '#59636F', fontSize: '1.05rem', maxWidth: 720, lineHeight: 1.65, margin: 0 }}>
              Verified on-site engineering projects demonstrating how OM Communication delivers turnkey surveillance, intercom overhauls, biometric access, and structured cabling across Delhi-NCR.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px clamp(16px, 4vw, 32px) 80px' }}>

        {/* Turnkey Project Team Primary Showcase */}
        <div style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          marginBottom: 48,
          position: 'relative',
          background: '#17191D',
          maxHeight: 380,
        }}>
          <img
            src={images.projects.hero}
            alt="Turnkey project execution engineering team on-site at commercial facility deployment"
            style={{ width: '100%', height: 360, objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.85 }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23,25,29,0.95) 0%, rgba(23,25,29,0.3) 50%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div>
              <div style={{ color: '#E04864', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                Turnkey Engineering Standards
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.3rem' }}>
                End-to-End Survey, System Design, Conduit Installation, Commissioning & Handover
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              padding: '8px 16px',
              color: '#FFFFFF',
              fontSize: '0.8125rem',
              fontWeight: 600
            }}>
              Zero Subcontractors • 100% In-House Technical Team
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 60 }}>
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                padding: '32px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#B4233C', fontSize: '0.8125rem', fontWeight: 700, marginBottom: 6 }}>
                    <p.icon size={15} /> {p.sector} • {p.location}
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.01em' }}>
                    {p.title}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 20, alignItems: 'center' }}>
                <div style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  height: 200,
                  border: '1px solid #E5E7EB',
                  position: 'relative'
                }}>
                  <img
                    src={p.photo}
                    alt={p.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    loading="lazy"
                  />
                </div>

                <div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#59636F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                      The Requirement & Site Challenge:
                    </div>
                    <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      {p.requirement}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#B4233C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                      The OM Communication Solution:
                    </div>
                    <p style={{ color: '#111827', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                      {p.solution}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                background: '#F6F7F8',
                borderRadius: 10,
                padding: '16px 20px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#59636F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Services Deployed:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.servicesDeployed.map(s => (
                      <span key={s} style={{
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        color: '#111827',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 6
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={16} color="#059669" /> {p.outcome}
                </div>
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
            Have a Similar Infrastructure Requirement?
          </h3>
          <p style={{ color: '#59636F', maxWidth: 560, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Our engineering team will assess your site layout, identify conduit pathways, and prepare an engineered proposal with verified pricing.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
              Book On-Site Project Survey <ChevronRight size={16} />
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
