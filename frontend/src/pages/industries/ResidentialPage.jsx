import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall, Home, ShieldCheck } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import { images } from '../../assets/imageMap'

export default function ResidentialPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Residential Societies & High-Rise Security Solutions | OM Communication"
        description="Turnkey security, CCTV surveillance, riser shaft intercom rewiring, and VDP solutions for residential high-rises and RWAs across Delhi-NCR."
        canonical="/industries/residential"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/industries' },
            { '@type': 'ListItem', position: 3, name: 'Residential Societies', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/industries/residential' }
          ]
        }}
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '110px 24px 80px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Industries', path: '/industries' }, { label: 'Residential Societies' }]} />

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'left', marginBottom: 40 }}>
          <div style={{ color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Residential Infrastructure
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Residential Societies & High-Rise Towers
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: '1.05rem', maxWidth: 760, lineHeight: 1.65 }}>
            Integrated safety, intercom connectivity, and automated access systems designed specifically for high-density apartment complexes and gated RWAs across Delhi-NCR.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <div style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--border-light)',
          marginBottom: 48,
          position: 'relative',
          background: '#17191D',
          height: 340,
        }}>
          <img
            src={images.industries.residential.cctv}
            alt="Residential high-rise society outdoor CCTV surveillance and gate security infrastructure"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.85 }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23,25,29,0.92) 0%, rgba(23,25,29,0.3) 60%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
          }}>
            <div style={{ color: 'var(--text-on-dark)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Turnkey Society Intercom & Perimeter Protection
            </div>
            <div style={{ color: 'var(--text-on-dark-sub)', fontSize: '0.875rem' }}>
              Full-tower Krone overhauls, boundary surveillance & video gate intercoms
            </div>
          </div>
        </div>

        {/* Core Challenges & Solutions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 48 }}>
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 14,
            padding: 32,
            border: '1px solid var(--border-light)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.01em' }}>
              Common High-Rise RWA Challenges
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <div>• Corroded Krone distribution blocks causing dead intercom lines across tower shafts.</div>
              <div>• Unmonitored blindspots in basements, elevator lobbies, and rear perimeter walls.</div>
              <div>• Broken guard-to-flat communication leading to unauthorized visitor entry.</div>
              <div>• Unresponsive contractors lacking structured preventative maintenance for society hardware.</div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 14,
            padding: 32,
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--red-primary)', marginBottom: 16, letterSpacing: '-0.01em' }}>
              The OM Communication Society Solution
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Multi-Tower EPABX & Riser Shaft Cabling Overhauls',
                'Boundary Wall, Gate & Basement HD/IP CCTV Surveillance',
                'Video Door Phones & Guard Console Setup',
                'Comprehensive Preventative Annual Maintenance Contracts (AMC)'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="var(--red-primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Example */}
        <div style={{
          padding: 32,
          borderRadius: 14,
          marginBottom: 48,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Featured Deployment
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
            84-Floor Multi-Tower Society — Ghaziabad, NCR
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 16 }}>
            Complete vertical riser overhaul replacing corroded Krone distribution modules across all towers, restoring 100% guard-to-flat voice clarity and eliminating intercom cross-talk.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span><strong>Scope:</strong> Multi-Tower EPABX Cabling Overhaul</span>
            <span><strong>Location:</strong> Ghaziabad, NCR</span>
            <span><strong>Status:</strong> Active Preventative AMC</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'var(--bg-blush)',
          border: '1px solid var(--border-red)',
          borderRadius: 14,
          padding: 40,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
            Schedule an RWA Site Survey
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Our telecom and surveillance engineers will assess your society shaft wiring and perimeter coverage.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
              Request Society Site Survey <ChevronRight size={16} />
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
