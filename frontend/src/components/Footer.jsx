import { Link } from 'react-router-dom'
import { Phone, MapPin, Shield, ChevronRight } from 'lucide-react'
import logo from '../assets/ocw-logo.png'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(197,160,63,0.22)',
      background: 'linear-gradient(180deg, rgba(4,12,26,0.96) 0%, rgba(2,6,15,0.99) 100%)',
      padding: '64px 24px 32px',
      color: '#A8BCCC',
      fontSize: '0.875rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 40,
          marginBottom: 48
        }}>
          {/* Col 1: Brand & Credentials */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img
                src={logo}
                alt="Om Communication Work Logo"
                style={{
                  width: 44,
                  height: 44,
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'block',
                  filter: 'drop-shadow(0 0 8px rgba(197,160,63,0.35))'
                }}
              />
              <div>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1rem', letterSpacing: '-0.01em' }}>
                  Om Communication Work
                </div>
                <div style={{ color: '#C5A03F', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Enterprise Security & Telecom
                </div>
              </div>
            </div>
            <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '0.8125rem', marginBottom: 16 }}>
              End-to-end security, surveillance, telecom, and communication infrastructure solutions — consultation, system design, turnkey installation, and AMC support.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(197,160,63,0.1)',
              border: '1px solid rgba(197,160,63,0.25)',
              color: '#FBF6E0',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              <Shield size={13} color="#C5A03F" /> GSTIN: 07COSPS8901L2ZO
            </div>
          </div>

          {/* Col 2: Solutions & Services */}
          <div>
            <h4 style={{ color: '#FBF6E0', fontSize: '0.9375rem', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Solutions
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link to="/services/cctv" style={{ color: '#A8BCCC', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  CCTV Surveillance Systems
                </Link>
              </li>
              <li>
                <Link to="/services/epabx" style={{ color: '#A8BCCC', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  EPABX & Telecom Intercoms
                </Link>
              </li>
              <li>
                <Link to="/services/vdp" style={{ color: '#A8BCCC', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  Video Door Phone (VDP)
                </Link>
              </li>
              <li>
                <Link to="/services/biometrics" style={{ color: '#A8BCCC', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  Biometric Access Control
                </Link>
              </li>
              <li>
                <Link to="/services/amc" style={{ color: '#A8BCCC', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  AMC & Turnkey Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <h4 style={{ color: '#FBF6E0', fontSize: '0.9375rem', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Industries Served
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link to="/industries/residential" style={{ color: '#A8BCCC', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  Residential Societies & High-Rises
                </Link>
              </li>
              <li>
                <Link to="/industries/factories" style={{ color: '#A8BCCC', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  Factories & Industrial Plants
                </Link>
              </li>
              <li>
                <Link to="/industries/offices" style={{ color: '#A8BCCC', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  Commercial & Corporate Offices
                </Link>
              </li>
              <li>
                <Link to="/industries/retail" style={{ color: '#A8BCCC', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#FBF6E0'}
                  onMouseLeave={e => e.target.style.color = '#A8BCCC'}>
                  Retail Chains & Outlets
                </Link>
              </li>
              <li>
                <Link to="/solutions" style={{ color: '#C5A03F', fontWeight: 600, textDecoration: 'none' }}>
                  Integrated Turnkey Solutions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div>
            <h4 style={{ color: '#FBF6E0', fontSize: '0.9375rem', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Direct Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href="tel:+917217715296"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#FBF6E0',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  background: 'rgba(197,160,63,0.12)',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid rgba(197,160,63,0.3)'
                }}
              >
                <Phone size={15} color="#C5A03F" /> +91 72177 15296
              </a>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#94A3B8', fontSize: '0.8125rem' }}>
                <MapPin size={15} color="#C5A03F" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Primary Hub: Delhi-NCR (Delhi, Noida, Ghaziabad, Gurugram) & Pan-India for Enterprise Projects</span>
              </div>

              <div style={{ marginTop: 8 }}>
                <Link to="/quote" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem', width: '100%', justifyContent: 'center' }}>
                  Request Site Survey <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(197,160,63,0.12)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: '0.78125rem',
          color: '#607080'
        }}>
          <div>
            © {new Date().getFullYear()} Om Communication Work. All rights reserved. GST Registered Enterprise.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/installation" style={{ color: '#94A3B8', textDecoration: 'none' }}>Installation Process</Link>
            <Link to="/projects" style={{ color: '#94A3B8', textDecoration: 'none' }}>Projects</Link>
            <Link to="/complaint" style={{ color: '#94A3B8', textDecoration: 'none' }}>Support Desk</Link>
            <Link to="/admin/login" style={{ color: '#C5A03F', textDecoration: 'none', opacity: 0.8 }}>Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
