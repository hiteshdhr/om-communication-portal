import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Factory, Home, ShoppingBag, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { images } from '../assets/imageMap'

const projects = [
  {
    title: '84-Floor Multi-Tower Residential Complex',
    sector: 'Residential High-Rise Society',
    location: 'Ghaziabad, Uttar Pradesh',
    photo: images.projects.telecomCabinet,
    alt: 'Multi-tower vertical riser shaft telephone cabling and Krone module overhaul',
    icon: Home,
    color: '#C5A03F',
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
    color: '#FF9F0D',
    requirement: 'Need for high-definition 24/7 boundary surveillance, perimeter intrusion monitoring, and shift-based workforce time-attendance.',
    solution: 'Deployed a 48-channel IP surveillance network with 4MP smart infrared bullet cameras, industrial surge-suppressed server racks, and AI facial recognition attendance terminals integrated with HR software.',
    servicesDeployed: ['4MP IP CCTV Surveillance', 'Perimeter IR Night Vision', 'AI Face Recognition Biometrics', 'Heavy-Duty Metallic Conduit Wiring'],
    outcome: '99.8% recording uptime maintained over 3+ consecutive years on AMC contract.'
  },
  {
    title: 'Multi-Story Corporate Headquarters',
    sector: 'Commercial Office',
    location: 'Noida, Uttar Pradesh',
    photo: images.projects.networkRack,
    alt: 'Corporate server room structured CAT6 network rack and patch panel installation',
    icon: Building2,
    color: '#06b6d4',
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
    color: '#C5A03F',
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
    color: '#22c55e',
    requirement: 'High-detail billing counter monitoring, staff attendance logging, and centralized remote mobile viewing across multiple store branches.',
    solution: 'Installed compact dome IP cameras with specialized focal lenses on POS cash counters, employee biometric terminals at staff entries, and centralized multi-site remote feeds for executive management.',
    servicesDeployed: ['POS Counter Detail CCTV', 'Staff Biometric Terminals', 'Centralized Mobile Remote Feeds', 'Preventative Store AMC'],
    outcome: 'Real-time multi-branch visibility and enhanced transaction dispute resolution.'
  },
]

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Featured Projects & Infrastructure Deployments | Om Communication Work"
        description="Explore verified case studies of turnkey security, CCTV surveillance, EPABX society intercom overhauls, and access control deployments across Delhi-NCR."
        canonical="/projects"
      />
      <Navbar />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Proven Execution Track Record
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Featured Deployments & Case Studies
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Explore verified project deployments demonstrating how OCW solves complex site communication, surveillance, and access challenges.
          </p>
        </motion.div>

        {/* Turnkey Project Team Primary Showcase */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(197,160,63,0.25)',
          marginBottom: 50,
          position: 'relative',
          maxHeight: 380,
        }}>
          <img
            src={images.projects.hero}
            alt="Turnkey project execution engineering team on-site at commercial facility deployment"
            style={{ width: '100%', height: 360, objectFit: 'cover', objectPosition: 'center 30%' }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(4,12,26,0.92) 0%, rgba(4,12,26,0.40) 50%, transparent 100%)',
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
              <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                Turnkey Project Management
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.3rem' }}>
                End-to-End Survey, Design, Installation, Commissioning & Handover
              </div>
            </div>
            <div style={{
              background: 'rgba(13,32,64,0.85)',
              border: '1px solid rgba(197,160,63,0.3)',
              borderRadius: 10,
              padding: '8px 16px',
              color: '#FBF6E0',
              fontSize: '0.8125rem',
              fontWeight: 600
            }}>
              Zero Subcontractors • 100% In-House Team
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 60 }}>
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card"
              style={{ padding: 36 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: p.color, fontSize: '0.8125rem', fontWeight: 700, marginBottom: 6 }}>
                    <p.icon size={15} /> {p.sector} • {p.location}
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    {p.title}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 20, alignItems: 'center' }}>
                <div style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  height: 190,
                  border: '1px solid rgba(197,160,63,0.2)',
                  position: 'relative'
                }}>
                  <img
                    src={p.photo}
                    alt={p.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    loading="lazy"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,12,26,0.6) 0%, transparent 60%)' }} />
                </div>

                <div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A8BCCC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                      The Requirement & Challenge:
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      {p.requirement}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#C5A03F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                      The OCW Engineered Solution:
                    </div>
                    <p style={{ color: '#E2E8F0', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      {p.solution}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(4,12,26,0.6)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A8BCCC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Services Deployed:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.servicesDeployed.map(s => (
                      <span key={s} style={{
                        background: 'rgba(197,160,63,0.1)',
                        border: '1px solid rgba(197,160,63,0.25)',
                        color: '#FBF6E0',
                        fontSize: '0.75rem',
                        padding: '3px 8px',
                        borderRadius: 6
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={15} color="#22c55e" /> {p.outcome}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(197,160,63,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Have a Similar Project Requirement?
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Our engineering team will assess your site layout, identify conduit pathways, and prepare an engineered proposal.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
              Book On-Site Project Survey <ChevronRight size={16} />
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
