import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

import { images } from '../assets/imageMap'

const installationStages = [
  { num: '01', title: 'On-Site Technical Assessment', desc: 'Our engineers visit your premises to inspect structural blueprints, cable pathway access, riser shafts, power sources, and optical camera focal requirements.' },
  { num: '02', title: 'System Architecture & BOM Preparation', desc: 'We engineer an itemized Bill of Materials (BOM) specifying camera types, NVR/DVR channel loads, Krone distribution modules, PoE switches, and conduit lengths.' },
  { num: '03', title: 'Heavy-Duty Conduit & Structured Cabling', desc: 'Laying ISI-marked PVC conduit piping, armored telephone multi-pair wires, and D-Link CAT6 cables through vertical shafts and underground trenches.' },
  { num: '04', title: 'Hardware Mounting & Termination', desc: 'Secure physical installation of cameras, junction boxes, EPABX main units, Krone blocks, biometric terminals, magnetic locks, and server racks.' },
  { num: '05', title: 'Network Configuration & Testing', desc: 'IP address planning, VLAN isolation, H.265+ stream optimization, motion detection masking, intercom extension mapping, and remote viewing app setup.' },
  { num: '06', title: 'Formal Commissioning & Handover', desc: 'Comprehensive day/night testing, staff/guard training on operating consoles, handover of cable maps and documentation, and warranty activation.' },
]

export default function InstallationPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Turnkey Installation & Project Execution Process | Om Communication Work"
        description="Learn about OCW's 6-stage turnkey engineering and installation process — from on-site survey and conduit piping to network configuration and formal commissioning."
        canonical="/installation"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Engineering Standards
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Turnkey Installation & Project Execution
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Professional installation is the foundation of system reliability. We follow a strict 6-stage engineering process to ensure maximum uptime, clean cable aesthetics, and zero structural compromises.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(197,160,63,0.25)',
          marginBottom: 50,
          position: 'relative',
          height: 340,
        }}>
          <img
            src={images.services.cabling.rackTech}
            alt="OCW systems technician performing structured network rack cabling and termination"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(4,12,26,0.92) 0%, rgba(4,12,26,0.30) 60%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
          }}>
            <div style={{ color: '#FBF6E0', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Structured Infrastructure & Certified Workmanship
            </div>
            <div style={{ color: '#A8BCCC', fontSize: '0.875rem' }}>
              ISI-marked conduit pathways, neat server rack dressing & documented terminations
            </div>
          </div>
        </div>

        {/* 6 Stages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 60 }}>
          {installationStages.map(st => (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: 28 }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#C5A03F', marginBottom: 12, fontFamily: 'monospace' }}>
                STAGE {st.num}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 10 }}>
                {st.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Standards Banner */}
        <div className="glass-card" style={{ padding: 36, marginBottom: 60, background: 'linear-gradient(135deg, rgba(13,32,64,0.7) 0%, rgba(4,12,26,0.9) 100%)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', textAlign: 'center', marginBottom: 24 }}>
            Our Strict On-Site Workmanship Standards
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              '100% Concealed Conduit Piping — No Loose Hanging Wires',
              'Permanent Cable Numbering & Ferrule Tagging for Fast Future Troubleshooting',
              'Surge-Suppressed Power Supplies & Inverter Battery Backup Integration',
              'Weatherproof Outdoor Junction Boxes with IP66 Rating'
            ].map(rule => (
              <div key={rule} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.85rem', color: '#E2E8F0' }}>
                <CheckCircle2 size={16} color="#C5A03F" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(197,160,63,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Schedule an Installation Site Assessment
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Book a site survey with our engineers to evaluate conduit pathways and power requirements for your site.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
              Book a Site Survey <ChevronRight size={16} />
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
