import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall, ShieldCheck, Wrench } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { images } from '../assets/imageMap'

const installationStages = [
  { num: '01', title: 'On-Site Technical Assessment', desc: 'Our engineers visit your premises to inspect structural blueprints, cable pathway access, riser shafts, power sources, and optical camera focal requirements.' },
  { num: '02', title: 'System Architecture & BOM Preparation', desc: 'We engineer an itemized Bill of Materials (BOM) specifying camera types, NVR/DVR channel loads, Krone distribution modules, PoE switches, and conduit lengths.' },
  { num: '03', title: 'Heavy-Duty Conduit & Structured Cabling', desc: 'Laying ISI-marked PVC conduit piping, armored telephone multi-pair wires, and CAT6 cables through vertical shafts and underground pathways.' },
  { num: '04', title: 'Hardware Mounting & Termination', desc: 'Secure physical installation of cameras, junction boxes, EPABX main units, Krone blocks, biometric terminals, magnetic locks, and server racks.' },
  { num: '05', title: 'Network Configuration & Testing', desc: 'IP address planning, VLAN isolation, H.265+ stream optimization, motion detection masking, intercom extension mapping, and remote viewing setup.' },
  { num: '06', title: 'Formal Commissioning & Handover', desc: 'Comprehensive day/night testing, staff/guard training on operating consoles, handover of cable maps and documentation, and warranty activation.' },
]

export default function InstallationPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827' }}>
      <SEO
        title="Turnkey Installation & Project Execution Process | OM Communication"
        description="Learn about OM Communication's 6-stage turnkey engineering and installation process — from on-site survey and conduit piping to network configuration and formal commissioning in Delhi-NCR."
        canonical="/installation"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Installation Standards', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/installation' }
          ]
        }}
      />
      <Navbar />

      {/* ── Page Hero ── */}
      <section style={{ background: '#F6F7F8', borderBottom: '1px solid #E5E7EB', padding: 'clamp(32px, 5vw, 56px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Installation Standards' }]} />
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
            <div style={{ color: '#B4233C', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Engineering Standards
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, margin: '0 0 12px', color: '#111827', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Turnkey Installation &amp; Project Execution
            </h1>
            <p style={{ color: '#59636F', fontSize: '1.05rem', maxWidth: 720, lineHeight: 1.65, margin: 0 }}>
              Professional installation is the foundation of system reliability. We follow a strict 6-stage engineering process to ensure maximum uptime, clean cable aesthetics, and zero structural compromises.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px clamp(16px, 4vw, 32px) 80px' }}>

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
            src={images.services.cabling.rackTech}
            alt="OM Communication systems technician performing structured network rack cabling and termination"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', opacity: 0.85 }}
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
              Structured Infrastructure & Certified Workmanship
            </div>
            <div style={{ color: '#D1D5DB', fontSize: '0.875rem' }}>
              ISI-marked conduit pathways, neat server rack dressing & documented terminations
            </div>
          </div>
        </div>

        {/* 6 Stages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 48 }}>
          {installationStages.map(st => (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                padding: 28
              }}
            >
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#B4233C', marginBottom: 10, letterSpacing: '-0.02em' }}>
                STAGE {st.num}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: 8, letterSpacing: '-0.01em' }}>
                {st.title}
              </h3>
              <p style={{ color: '#59636F', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Standards Banner */}
        <div style={{
          padding: 36,
          borderRadius: 14,
          marginBottom: 48,
          background: '#F6F7F8',
          border: '1px solid #E5E7EB'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 24, letterSpacing: '-0.01em' }}>
            Our Strict On-Site Workmanship Standards
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              '100% Concealed Conduit Piping — No Loose Hanging Wires',
              'Permanent Cable Numbering & Ferrule Tagging for Fast Future Maintenance',
              'Surge-Suppressed Power Supplies & Inverter Battery Backup Integration',
              'Weatherproof Outdoor Junction Boxes with IP66 Rating'
            ].map(rule => (
              <div key={rule} style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 10, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#111827', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="#B4233C" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{rule}</span>
              </div>
            ))}
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
            Schedule an Installation Site Assessment
          </h3>
          <p style={{ color: '#59636F', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Book a site survey with our engineers to evaluate conduit pathways and power requirements for your property.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
              Book a Site Survey <ChevronRight size={16} />
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
