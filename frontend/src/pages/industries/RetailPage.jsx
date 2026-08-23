import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'

import { images } from '../../assets/imageMap'

export default function RetailPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Retail Chains & Store Security Solutions | Om Communication Work"
        description="Loss prevention CCTV surveillance, POS cash counter monitoring, multi-store remote viewing, and staff attendance for retail chains across Delhi-NCR."
        canonical="/industries/retail"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Retail Solutions
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Retail Chains, Showrooms & Commercial Outlets
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 680, margin: '14px auto 0', lineHeight: 1.6 }}>
            Loss prevention surveillance, high-detail billing counter monitoring, multi-branch remote viewing, and staff attendance solutions engineered for retail operations.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(34,197,94,0.3)',
          marginBottom: 50,
          position: 'relative',
          height: 340,
        }}>
          <img
            src={images.industries.commercial.monitoring}
            alt="Retail store aisle surveillance camera and loss prevention monitoring system"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
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
            <div style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Loss Prevention & Multi-Branch Visibility
            </div>
            <div style={{ color: '#A8BCCC', fontSize: '0.875rem' }}>
              POS counter monitoring, compact dome aesthetics, central multi-store remote feeds & AMC
            </div>
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 60 }}>
          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              Key Retail Operational Priorities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#94A3B8', fontSize: '0.88rem' }}>
              <div>• Preventing inventory shrinkage in aisles, fitting rooms, and stock rooms.</div>
              <div>• Ultra-clear denomination & transaction monitoring at cash / POS counters.</div>
              <div>• Centralized mobile viewing for business owners managing multi-location outlets.</div>
              <div>• Compact, aesthetic installation that doesn't disrupt retail visual merchandising.</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 32, border: '1px solid rgba(34,197,94,0.35)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#22c55e', marginBottom: 16 }}>
              The OCW Retail Security Setup
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'High-Resolution POS Counter CCTV with Micro-Detail Currency Capture',
                'Aesthetic Dome Cameras Matching Store Lighting & Ceiling Grid Aesthetics',
                'Centralized Cloud & Mobile App Remote Monitoring for Multi-Branch Outlets',
                'Stockroom & Employee Entry Biometric Access Control',
                'Fast-Response Maintenance AMC to Ensure 100% Continuous Recording Uptime'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(13,32,64,0.6) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>
            Secure Your Retail Stores & Outlets
          </h3>
          <p style={{ color: '#94A3B8', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Book a site survey to design a tailored security setup for single stores or multi-location retail chains.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 30px' }}>
              Request Retail Site Survey <ChevronRight size={16} />
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
