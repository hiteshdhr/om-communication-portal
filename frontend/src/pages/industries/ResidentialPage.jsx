import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'

import { images } from '../../assets/imageMap'

export default function ResidentialPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Residential Societies & High-Rise Security Solutions | Om Communication Work"
        description="Turnkey security, CCTV surveillance, riser shaft intercom rewiring, and VDP solutions for residential high-rises and RWAs across Delhi-NCR."
        canonical="/industries/residential"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Sector Solutions
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Residential Societies & High-Rise Towers
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Integrated safety, intercom connectivity, and automated access systems designed specifically for high-density apartment complexes and gated RWAs.
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
            src={images.industries.residential.cctv}
            alt="Residential high-rise society outdoor CCTV surveillance and gate security infrastructure"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(4,12,26,0.90) 0%, rgba(4,12,26,0.30) 60%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
          }}>
            <div style={{ color: '#FBF6E0', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Turnkey Society Intercom & Perimeter Protection
            </div>
            <div style={{ color: '#A8BCCC', fontSize: '0.875rem' }}>
              Full-tower Krone overhauls, boundary surveillance & video gate intercoms
            </div>
          </div>
        </div>

        {/* Core Challenges & Solutions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 60 }}>
          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Common High-Rise RWA Challenges
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#94A3B8', fontSize: '0.88rem' }}>
              <div>• Corroded Krone distribution blocks causing dead intercom lines across floors.</div>
              <div>• Unmonitored blindspots in basements, elevator lobbies, and rear perimeter walls.</div>
              <div>• Broken guard-to-flat communication leading to unauthorized visitor entry.</div>
              <div>• Unresponsive vendors lacking emergency technician dispatch for society breakdowns.</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32, border: '1px solid rgba(197,160,63,0.35)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#C5A03F', marginBottom: 16 }}>
              The OCW Turnkey Solution
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Full Riser Shaft Krone Overhauls & Multi-Pair Cable Restorations',
                'Comprehensive Perimeter, Gate & Basement CCTV Surveillance',
                'Multi-Unit Video Door Phone Systems with Gate Intercom Links',
                'Boom Barrier & RFID Vehicle Access Control at Entry Gates',
                'Dedicated Preventative Society AMC with Quarterly Diagnostics'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#C5A03F" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Example */}
        <div className="glass-card" style={{ padding: 36, marginBottom: 60, background: 'linear-gradient(135deg, rgba(13,32,64,0.7) 0%, rgba(4,12,26,0.9) 100%)' }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Featured Case Study
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            84-Floor Multi-Tower Krone Module & Riser Overhaul — Ghaziabad
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 16 }}>
            A premier high-rise residential complex was experiencing persistent line cross-talk and failing intercoms across multiple towers. OCW engineers traced the entire vertical shaft infrastructure, replaced degraded Krone distribution modules, and restored 100% flat-to-gate communication within 5 days.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.8125rem', color: '#A8BCCC' }}>
            <span><strong>Scope:</strong> Riser Shaft Rewiring & EPABX Overhaul</span>
            <span><strong>Location:</strong> Indirapuram / Ghaziabad</span>
            <span><strong>Status:</strong> Active Long-Term AMC</span>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(197,160,63,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Request an RWA Security Assessment
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Our team will perform an on-site inspection of your society intercom riser shafts and CCTV coverage.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
              Request Society Site Survey <ChevronRight size={16} />
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
