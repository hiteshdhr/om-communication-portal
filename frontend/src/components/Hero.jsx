import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, CheckCircle2, PhoneCall, MapPin } from 'lucide-react'
import { images } from '../assets/imageMap'

export default function Hero() {
  return (
    <section
      aria-label="Security and telecom engineering hero"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: 'clamp(40px, 6vw, 72px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }} className="hero-grid">
          
          {/* ── Left Column: Editorial Value Proposition ── */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#B4233C',
                display: 'inline-block',
              }} />
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#B4233C',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Security &amp; Telecom Solutions
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: '#111827',
              margin: '0 0 18px',
            }}>
              Security infrastructure<br />
              built for business.
            </h1>

            {/* Supporting Description */}
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.65,
              color: '#59636F',
              margin: '0 0 28px',
              maxWidth: 540,
            }}>
              CCTV, access control, EPABX, networking and maintenance solutions designed around real business environments.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 32 }}>
              <Link to="/services" className="btn-primary">
                Explore Solutions <ArrowRight size={16} />
              </Link>
              <Link to="/quote" className="btn-secondary">
                Talk to an Expert →
              </Link>
            </div>

            {/* Technical Capability Badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 20,
              borderTop: '1px solid #F0F2F5',
            }}>
              {[
                'Turnkey Project Execution',
                'Delhi-NCR Field Teams',
                'Preventive AMC Support',
              ].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={15} color="#B4233C" />
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#374151' }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Authentic Project Installation Visual ── */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.07)',
              background: '#F6F7F8',
              height: 'clamp(320px, 42vw, 440px)',
              position: 'relative',
            }}>
              <img
                src={images.projects.controlRoom}
                alt="Corporate security control room and CCTV monitoring installation by Om Communication Work"
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Sub-label badge on image */}
              <div style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                background: 'rgba(23, 25, 29, 0.88)',
                backdropFilter: 'blur(8px)',
                borderRadius: 8,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#FFFFFF',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={16} color="#B4233C" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    Integrated Control Room Installation
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#9CA3AF' }}>
                  <MapPin size={12} />
                  <span>Delhi-NCR</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}
