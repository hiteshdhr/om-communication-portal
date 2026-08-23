import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Camera, Phone, DoorOpen, Fingerprint, Wrench,
  Building2, Factory, ShoppingBag, Home,
  ChevronRight, CheckCircle2, ArrowRight,
  Shield, MessageCircle, PhoneCall,
  MapPin, Clock, Layers, Award,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import TrustMetrics from '../components/TrustMetrics'
import TechRibbon from '../components/TechRibbon'
import { images } from '../assets/imageMap'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

// ─── Data ───────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Camera,
    title: 'CCTV Surveillance',
    href: '/services/cctv',
    photo: images.services.cctv.dome,
    alt: 'High-definition dome CCTV camera system installed by Om Communication Work',
    desc: 'High-definition IP and analog surveillance networks with NVR recording and mobile remote viewing. Designed for 24/7 facility monitoring across all site types.',
    caps: ['HD IP & Analog Cameras', 'NVR/DVR with Cloud Backup', 'Night Vision Coverage', 'Mobile Remote Viewing', 'Multi-Site Integration'],
  },
  {
    icon: Phone,
    title: 'EPABX & Telecom',
    href: '/services/epabx',
    photo: images.services.epabx.technician,
    alt: 'Field technician configuring enterprise EPABX telecom and intercom system',
    desc: 'Multi-line intercom networks, vertical riser shaft cabling, and Krone module distribution overhauls for high-rise societies and corporate offices.',
    caps: ['Multi-Extension PBX Systems', 'Intercom Network Design', 'Vertical Riser Cabling', 'Krone Module Overhaul', 'Voicemail & Auto-Attendant'],
  },
  {
    icon: DoorOpen,
    title: 'Video Door Phones',
    href: '/services/vdp',
    photo: images.services.vdp.userMonitoring,
    alt: 'Resident operating video door phone indoor monitor for secure visitor screening',
    desc: 'Multi-apartment and villa VDP solutions with high-clarity video verification, two-way audio communication, and automated door lock release.',
    caps: ['Multi-Flat VDP Networks', 'HD Video Entry Panels', 'Two-Way Audio', 'Automated Lock Release', 'Visitor Recording'],
  },
  {
    icon: Fingerprint,
    title: 'Biometric & Access Control',
    href: '/services/biometrics',
    photo: images.services.biometrics.rfid,
    alt: 'Contactless RFID card and biometric access control terminal deployed on secure door',
    desc: 'AI facial recognition, optical fingerprint, and RFID proximity card systems with automated shift-based time-attendance logging and door control.',
    caps: ['Fingerprint & Face Recognition', 'RFID Proximity Cards', 'Time & Attendance', 'Zone-Based Access', 'Integration with HR Systems'],
  },
  {
    icon: Wrench,
    title: 'AMC & Turnkey Wiring',
    href: '/services/amc',
    photo: images.services.cctv.technician1,
    alt: 'Certified technician performing preventative maintenance and inspection on outdoor security camera',
    desc: 'Annual Maintenance Contracts with scheduled preventative health audits and priority technician dispatch. Complete turnkey structured cabling solutions.',
    caps: ['Quarterly Preventative Audits', 'Priority Technician Dispatch', 'Structured Cabling Projects', 'ISI-Marked Conduit Work', 'Multi-System AMC Coverage'],
  },
]

const SECTORS = [
  {
    icon: Home,
    label: 'Residential Societies',
    href: '/industries/residential',
    photo: images.industries.residential.cctv,
    alt: 'Residential society security camera surveillance network installation',
    desc: 'High-rise RWAs, gated condos, and multi-tower complexes. Complete gate-to-flat security and intercom systems.',
    services: ['CCTV', 'VDP', 'EPABX', 'Access Control'],
  },
  {
    icon: Factory,
    label: 'Factories & Industrial',
    href: '/industries/factories',
    photo: images.industries.industrial.factory,
    alt: 'Industrial manufacturing plant and warehouse perimeter CCTV security system',
    desc: 'Manufacturing plants, warehouses, and logistics parks. Perimeter surveillance and access-controlled zones.',
    services: ['CCTV', 'Biometric', 'Structured Cabling', 'AMC'],
  },
  {
    icon: Building2,
    label: 'Commercial Offices',
    href: '/industries/offices',
    photo: images.industries.commercial.controlRoom,
    alt: 'Centralized security monitoring control room for corporate office facility',
    desc: 'Corporate headquarters, co-working spaces, and multi-floor offices. Integrated communication and security.',
    services: ['EPABX', 'CCTV', 'VDP', 'Access Control'],
  },
  {
    icon: ShoppingBag,
    label: 'Retail Chains',
    href: '/industries/retail',
    photo: images.industries.commercial.monitoring,
    alt: 'Commercial retail store CCTV surveillance and loss prevention monitoring',
    desc: 'Showrooms, retail outlets, and multi-location retail chains. Centralized monitoring and anti-theft systems.',
    services: ['CCTV', 'Biometric', 'VDP', 'AMC'],
  },
]

const HOW_WE_WORK = [
  { step: '01', icon: MapPin,     title: 'Site Survey',           desc: 'Detailed on-site inspection evaluating layout, camera positions, cable pathways, power availability, and specific project requirements.' },
  { step: '02', icon: Layers,     title: 'Requirement Analysis',  desc: 'Documenting technical requirements, system load calculations, equipment specifications, and project scope for formal proposal.' },
  { step: '03', icon: Shield,     title: 'System Design',         desc: 'Custom engineering design mapping hardware placement, cable runs, network distribution, and integration architecture.' },
  { step: '04', icon: Wrench,     title: 'Installation & Cabling', desc: 'Structured cabling, ISI-marked conduit, camera mounting, EPABX/NVR installation — following approved design drawings.' },
  { step: '05', icon: Camera,     title: 'Config & Testing',      desc: 'System configuration, network setup, remote viewing activation, and rigorous day/night quality verification testing.' },
  { step: '06', icon: Clock,      title: 'Handover & AMC',        desc: 'Official documentation handover, client/guard training, and ongoing Annual Maintenance Contract for long-term reliability.' },
]

const WHY_OCW = [
  { icon: MapPin,     title: 'Site-Specific Engineering',   desc: 'Every system is designed around your actual site. No templates, no guesswork — we survey before we propose.' },
  { icon: Shield,     title: 'Professional Installation',    desc: 'Structured, clean installation by trained technicians with documented quality checks throughout the process.' },
  { icon: Layers,     title: 'Integrated Solutions',         desc: 'CCTV, communication, access control, and cabling — all under one engineering team and one accountable partner.' },
  { icon: Clock,      title: 'Long-Term AMC Support',        desc: 'Scheduled maintenance contracts and priority technician dispatch keep your systems operational after handover.' },
  { icon: Award,      title: 'Turnkey Execution',            desc: 'From initial assessment to final handover — complete project management without multiple uncoordinated vendors.' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeService, setActiveService] = useState(0)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)',
      backgroundAttachment: 'fixed',
      overflowX: 'hidden',
    }}>
      <SEO
        title="Om Communication Work | Enterprise Security, CCTV & Telecom Solutions Delhi-NCR"
        description="Comprehensive enterprise security, CCTV surveillance, EPABX intercom networks, biometric access control, and turnkey AMC solutions for residential societies, factories, and corporate offices across Delhi-NCR."
        canonical="/"
      />
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <Hero />

      {/* ─── TRUST METRICS ────────────────────────────────────────────── */}
      <TrustMetrics />

      {/* ─── TECH RIBBON ──────────────────────────────────────────────── */}
      <TechRibbon />

      {/* ─── SERVICES — INTERACTIVE PANEL ─────────────────────────────── */}
      <section className="page-section" id="services">
        <div className="container">
          <SectionHeader
            eyebrow="Our Solutions Spectrum"
            title="Complete Security & Telecom Infrastructure"
            body="Engineered turnkey solutions from initial consultation and site survey through commissioning and long-term maintenance."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: 2,
            background: 'rgba(197,160,63,0.08)',
            borderRadius: 20,
            border: '1px solid rgba(197,160,63,0.15)',
            overflow: 'hidden',
          }}>
            {/* Left — service list */}
            <div style={{
              background: 'rgba(4,12,26,0.8)',
              padding: '8px 0',
            }}>
              {SERVICES.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveService(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 22px',
                    background: activeService === i
                      ? 'rgba(197,160,63,0.10)'
                      : 'transparent',
                    borderLeft: activeService === i
                      ? '3px solid #C5A03F'
                      : '3px solid transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    background: activeService === i
                      ? 'rgba(197,160,63,0.15)'
                      : 'rgba(197,160,63,0.06)',
                    border: '1px solid rgba(197,160,63,0.20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    <s.icon size={16} color={activeService === i ? '#C5A03F' : '#607080'} />
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: activeService === i ? 700 : 500,
                    color: activeService === i ? '#FBF6E0' : '#A8BCCC',
                    lineHeight: 1.3,
                  }}>
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right — service detail */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 440 }}>
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={false}
                  animate={{
                    opacity: activeService === i ? 1 : 0,
                    scale: activeService === i ? 1 : 0.98,
                    pointerEvents: activeService === i ? 'auto' : 'none',
                  }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                  }}
                >
                  {/* Image half */}
                  <div className="img-hover-zoom" style={{ overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={s.photo}
                      alt={s.alt || s.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(90deg, rgba(4,12,26,0) 60%, rgba(4,12,26,0.9) 100%)',
                    }} />
                  </div>

                  {/* Content half */}
                  <div style={{
                    padding: '36px 32px',
                    background: 'rgba(7,15,30,0.95)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  }}>
                    <div style={{ marginBottom: 8 }}>
                      <span className="eyebrow">Service</span>
                    </div>
                    <h3 style={{
                      fontFamily: "'Outfit', 'Inter', sans-serif",
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: '0 0 12px',
                    }}>{s.title}</h3>

                    <p style={{
                      color: '#A8BCCC', fontSize: '0.9rem', lineHeight: 1.7,
                      margin: '0 0 20px',
                    }}>{s.desc}</p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {s.caps.map(cap => (
                        <li key={cap} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <CheckCircle2 size={13} color="#C5A03F" style={{ flexShrink: 0 }} />
                          <span style={{ color: '#A8BCCC', fontSize: '0.8375rem' }}>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={s.href}
                      className="btn-primary"
                      style={{ alignSelf: 'flex-start', fontSize: '0.875rem', padding: '10px 22px' }}
                    >
                      Explore {s.title} <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: fallback simple grid */}
          <style>{`
            @media (max-width: 768px) {
              .services-panel { display: none !important; }
              .services-mobile { display: grid !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ─── WHY OCW ──────────────────────────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 56, alignItems: 'start',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="eyebrow">The OCW Standard</div>
              <h2 className="section-title">
                Engineering-Led Security Partner for Enterprise Facilities
              </h2>
              <p className="section-body" style={{ marginBottom: 28 }}>
                Security systems are only as dependable as their underlying engineering and ongoing maintenance.
                OCW combines site-specific design with dedicated after-sales AMC support — ensuring reliable systems, not just installed equipment.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/quote" className="btn-primary">
                  Request Site Survey <ChevronRight size={16} />
                </Link>
                <Link to="/about" className="btn-secondary">
                  About OCW
                </Link>
              </div>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 2,
              borderRadius: 16,
              border: '1px solid rgba(197,160,63,0.12)',
              overflow: 'hidden',
            }}>
              {WHY_OCW.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: '18px 20px',
                    background: 'rgba(13,32,64,0.4)',
                    borderBottom: i < WHY_OCW.length - 1 ? '1px solid rgba(197,160,63,0.08)' : 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,160,63,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,32,64,0.4)'}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(197,160,63,0.08)',
                    border: '1px solid rgba(197,160,63,0.20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <w.icon size={16} color="#C5A03F" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#FBF6E0', marginBottom: 3 }}>
                      {w.title}
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                      {w.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ───────────────────────────────────────────────── */}
      <section className="page-section" id="sectors">
        <div className="container">
          <SectionHeader
            eyebrow="Industry Expertise"
            title="Facilities We Secure & Connect"
            body="OCW designs and deploys integrated security and communication systems across four major facility categories."
          />

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {SECTORS.map(s => (
              <motion.div key={s.label} variants={fadeUp}>
                <Link to={s.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    className="industry-card img-hover-zoom"
                    style={{
                      position: 'relative', borderRadius: 16, overflow: 'hidden',
                      height: 300, cursor: 'pointer',
                      border: '1px solid rgba(197,160,63,0.15)',
                    }}
                  >
                    <img
                      src={s.photo}
                      alt={s.alt || s.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                      loading="lazy"
                    />
                    {/* Gradient overlay — always visible */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(4,12,26,0.95) 0%, rgba(4,12,26,0.50) 55%, rgba(4,12,26,0.15) 100%)',
                    }} />

                    {/* Content */}
                    <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: 'rgba(197,160,63,0.15)',
                        border: '1px solid rgba(197,160,63,0.30)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 12,
                      }}>
                        <s.icon size={18} color="#C5A03F" />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#FFFFFF', marginBottom: 5 }}>
                        {s.label}
                      </div>
                      <p style={{ color: '#A8BCCC', fontSize: '0.8rem', lineHeight: 1.5, margin: '0 0 10px' }}>
                        {s.desc}
                      </p>
                      <div className="overlay-content" style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {s.services.map(sv => (
                          <span key={sv} style={{
                            padding: '3px 9px', borderRadius: 99,
                            background: 'rgba(197,160,63,0.15)',
                            border: '1px solid rgba(197,160,63,0.30)',
                            fontSize: '0.7rem', fontWeight: 600,
                            color: '#FBF6E0', letterSpacing: '0.04em',
                          }}>{sv}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW WE WORK — TIMELINE ───────────────────────────────────── */}
      <section className="page-section-gold">
        <div className="container">
          <SectionHeader
            eyebrow="Project Lifecycle"
            title="How We Execute Turnkey Projects"
            body="A disciplined, engineering-led execution methodology — from first site visit to final handover and ongoing AMC support."
          />

          {/* Desktop horizontal timeline */}
          <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: 8 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 0,
              minWidth: 800,
            }}>
              {/* Connector line */}
              <div style={{
                position: 'absolute',
                top: 27,
                left: 'calc(1/12 * 100%)',
                right: 'calc(1/12 * 100%)',
                height: 2,
                background: 'rgba(197,160,63,0.15)',
                zIndex: 0,
              }} />

              {HOW_WE_WORK.map((hw, i) => (
                <motion.div
                  key={hw.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center', padding: '0 12px', position: 'relative', zIndex: 1,
                  }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(13,32,64,0.9)',
                    border: '2px solid rgba(197,160,63,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16, flexShrink: 0,
                    boxShadow: '0 0 0 6px rgba(4,12,26,0.8)',
                  }}>
                    <hw.icon size={20} color="#C5A03F" />
                  </div>

                  <div style={{
                    fontSize: '0.65rem', fontWeight: 800,
                    color: '#C5A03F', letterSpacing: '0.12em',
                    textTransform: 'uppercase', marginBottom: 6,
                  }}>
                    {hw.step}
                  </div>

                  <div style={{
                    fontSize: '0.875rem', fontWeight: 700,
                    color: '#FFFFFF', marginBottom: 6, lineHeight: 1.3,
                  }}>
                    {hw.title}
                  </div>

                  <p style={{
                    color: '#94A3B8', fontSize: '0.775rem',
                    lineHeight: 1.6, margin: 0,
                  }}>
                    {hw.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 96px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{
              background: 'linear-gradient(135deg, rgba(197,160,63,0.10) 0%, rgba(13,32,64,0.65) 100%)',
              border: '1px solid rgba(197,160,63,0.25)',
              borderRadius: 24, padding: 'clamp(36px, 5vw, 60px) clamp(24px, 5vw, 48px)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(197,160,63,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div className="eyebrow" style={{ display: 'block', marginBottom: 10 }}>
                Planning a Security Project?
              </div>
              <h2 style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                fontWeight: 900, margin: '0 0 14px', color: '#FFFFFF',
              }}>
                Ready for an On-Site Assessment?
              </h2>
              <p style={{
                color: '#94A3B8', fontSize: '1.05rem',
                maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.65,
              }}>
                Our field engineering team will visit your facility, evaluate requirements, and prepare a detailed
                technical proposal — tailored to your specific site.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/quote" className="btn-primary" style={{ fontSize: '1rem', padding: '13px 32px' }}>
                  Request a Site Survey <ChevronRight size={16} />
                </Link>
                <a href="tel:+917217715296" className="btn-secondary" style={{ fontSize: '1rem', padding: '13px 28px' }}>
                  <PhoneCall size={15} /> Call +91 72177 15296
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FLOATING WHATSAPP ────────────────────────────────────────── */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9998 }}>
        <div style={{ position: 'relative' }} className="wa-wrap">
          <a
            href="https://wa.me/917217715296?text=Hello%20Om%20Communication%20Work,%20I%20would%20like%20to%20inquire%20about%20a%20site%20survey%20for%20our%20facility."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with Om Communication Work"
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #25D366 0%, #128C5E 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(37,211,102,0.40)',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.55)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.40)'
            }}
          >
            <MessageCircle size={22} color="white" fill="white" />
          </a>
          {/* Tooltip */}
          <div style={{
            position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(4,12,26,0.95)',
            border: '1px solid rgba(197,160,63,0.25)',
            borderRadius: 8, padding: '6px 12px',
            fontSize: '0.78rem', fontWeight: 600, color: '#FBF6E0',
            whiteSpace: 'nowrap', pointerEvents: 'none',
            opacity: 0, transition: 'opacity 0.2s',
          }} className="wa-tooltip">
            Chat with OCW
          </div>
        </div>
      </div>

      <style>{`
        .wa-wrap:hover .wa-tooltip { opacity: 1 !important; }
        @media (max-width: 768px) {
          .services-interactive { display: none; }
        }
      `}</style>

      <Footer />
    </div>
  )
}

// Inline SectionHeader helper
function SectionHeader({ eyebrow, title, body }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ textAlign: 'center', marginBottom: 48 }}
    >
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {body && (
        <p className="section-body" style={{ margin: '8px auto 0', textAlign: 'center' }}>
          {body}
        </p>
      )}
    </motion.div>
  )
}
