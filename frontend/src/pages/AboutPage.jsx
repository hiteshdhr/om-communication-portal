import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Users, CheckCircle2, MapPin, ChevronRight, PhoneCall } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { images } from '../assets/imageMap'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="About Us | Om Communication Work — Enterprise Security & Infrastructure Solutions"
        description="Learn about Om Communication Work (OCW), an enterprise security, CCTV surveillance, EPABX telecom, and turnkey infrastructure service provider serving Delhi-NCR and Pan-India."
        canonical="/about"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 50 }}
        >
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            About Om Communication Work
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Enterprise Security & Communication Infrastructure
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 16, fontSize: '1.1rem', maxWidth: 720, margin: '16px auto 0', lineHeight: 1.6 }}>
            We are not a retail product store — OCW is a full-lifecycle turnkey solutions provider specializing in site assessment, custom engineering, professional deployment, and long-term AMC maintenance.
          </p>
        </motion.div>

        {/* Real Consultation Showcase Visual */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(197,160,63,0.25)',
          marginBottom: 60,
          position: 'relative',
          maxHeight: 420,
        }}>
          <img
            src={images.about.consultation}
            alt="OCW security and telecom engineer discussing facility technical requirements with client on-site"
            style={{ width: '100%', height: 400, objectFit: 'cover', objectPosition: 'center 35%' }}
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
                Hands-On Engineering Support
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.3rem' }}>
                On-Site Site Surveys, Layout Blueprints & Direct Execution
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
              Over 15+ Years Field Track Record
            </div>
          </div>
        </div>

        {/* Story / Mission Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 60 }}>
          <div className="glass-card" style={{ padding: 36 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(197,160,63,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Shield size={24} color="#C5A03F" />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 12, color: '#FFFFFF' }}>
              Solution-First Engineering
            </h2>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, fontSize: '0.925rem' }}>
              Om Communication Work delivers turnkey solutions designed around physical premises and operational risks. From residential high-rise society intercom networks to industrial factory perimeter surveillance, we design, install, test, and maintain systems end-to-end.
            </p>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(197,160,63,0.15)', color: '#FBF6E0', fontSize: '0.85rem' }}>
              <strong>Official GSTIN:</strong> 07COSPS8901L2ZO
            </div>
          </div>

          <div className="glass-card" style={{ padding: 36 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(197,160,63,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Users size={24} color="#C5A03F" />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 12, color: '#FFFFFF' }}>
              Lean, Agile Field Operations
            </h2>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, fontSize: '0.925rem' }}>
              Our field engineering team directly manages initial site surveys, structured cabling, hardware configuration, technician dispatch, and preventative AMC servicing. No unnecessary middlemen or outsourced subcontractors.
            </p>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(197,160,63,0.15)', color: '#FBF6E0', fontSize: '0.85rem' }}>
              <strong>Operations Hub:</strong> Delhi-NCR + Pan-India Enterprise Deployments
            </div>
          </div>
        </div>

        {/* Service Geography */}
        <div className="glass-card" style={{ padding: 40, marginBottom: 60, background: 'linear-gradient(135deg, rgba(13,32,64,0.7) 0%, rgba(4,12,26,0.9) 100%)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 10 }}>
            <MapPin size={22} color="#C5A03F" /> Service Geography & Coverage
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#C5A03F', marginBottom: 8 }}>
                Delhi-NCR (Full Project Spectrum)
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Direct on-site services across Delhi, Noida, Greater Noida, Ghaziabad (Indirapuram, Vaishali, Vasundhara), Gurugram, and Faridabad. Projects range from small commercial facilities to multi-tower residential societies.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#C5A03F', marginBottom: 8 }}>
                Pan-India (Large Turnkey Projects)
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                For multi-facility industrial plants, corporate campus rollouts, and large-scale warehouse security infrastructure, we execute turnkey projects across India on an engineered project basis.
              </p>
            </div>
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#FFFFFF' }}>
            Why Enterprise Clients Choose OCW
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { title: 'Site-Specific Custom Design', desc: 'No cookie-cutter packages. Every camera angle, conduit run, and intercom extension is mapped to site blueprints.' },
              { title: 'Turnkey Cabling & Infrastructure', desc: 'We handle heavy conduit piping, Krone distribution modules, riser shafts, and server rack installations.' },
              { title: 'Full Commissioning & Handover', desc: 'NVR network setup, mobile remote monitoring access, staff training, and handover documentation.' },
              { title: 'Dedicated Post-Sales AMC Support', desc: 'Preventative quarterly health checks, priority breakdown emergency response, and scheduled servicing.' },
            ].map(item => (
              <div key={item.title} className="glass-card" style={{ padding: 24 }}>
                <CheckCircle2 size={20} color="#C5A03F" style={{ marginBottom: 12 }} />
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>{item.title}</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(197,160,63,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Schedule an On-Site Technical Assessment
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Our field engineers will inspect your facility, evaluate existing cable pathways, and prepare a tailored technical proposal.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
              Request Site Survey <ChevronRight size={16} />
            </Link>
            <a href="tel:+917217715296" className="btn-secondary" style={{ padding: '12px 28px' }}>
              <PhoneCall size={15} /> Call +91 72177 15296
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
