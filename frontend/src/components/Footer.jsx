import { Link } from 'react-router-dom'
import { Phone, MapPin, Shield, ArrowRight } from 'lucide-react'
import logo from '../assets/ocw-logo.png'

export default function Footer() {
  return (
    <footer style={{
      background: '#17191D',
      color: '#9CA3AF',
      fontSize: '0.875rem',
      padding: '56px 24px 28px',
      borderTop: '1px solid #2D323B',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 36,
          marginBottom: 44,
        }}>
          {/* Col 1: Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <img
                src={logo}
                alt="Om Communication Work"
                style={{ width: 36, height: 36, objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.1 }}>
                  OM COMMUNICATION
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#B4233C', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Security &amp; Telecom Solutions
                </div>
              </div>
            </div>
            <p style={{ color: '#9CA3AF', lineHeight: 1.6, fontSize: '0.8125rem', marginBottom: 14 }}>
              Engineered CCTV surveillance, EPABX intercom, access control, structured cabling, and Annual Maintenance Contracts (AMC) across Delhi-NCR.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 8px',
              borderRadius: 4,
              background: '#22262C',
              border: '1px solid #2D323B',
              color: '#D1D5DB',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}>
              <Shield size={12} color="#B4233C" /> GSTIN: 07COSPS8901L2ZO
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              Solutions
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <Link to="/services/cctv" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  CCTV Surveillance Systems
                </Link>
              </li>
              <li>
                <Link to="/services/epabx" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  EPABX &amp; Office Intercom
                </Link>
              </li>
              <li>
                <Link to="/services/vdp" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Video Door Phone (VDP)
                </Link>
              </li>
              <li>
                <Link to="/services/biometrics" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Biometric Access Control
                </Link>
              </li>
              <li>
                <Link to="/services/networking" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Structured Cabling &amp; LAN
                </Link>
              </li>
              <li>
                <Link to="/services/amc" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  AMC Maintenance Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              Industries
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <Link to="/industries/offices" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Commercial Offices &amp; IT
                </Link>
              </li>
              <li>
                <Link to="/industries/factories" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Factories &amp; Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/industries/residential" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Residential Societies &amp; Flats
                </Link>
              </li>
              <li>
                <Link to="/industries/retail" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Retail Outlets &amp; Showrooms
                </Link>
              </li>
              <li>
                <Link to="/projects" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                  Project Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coverage */}
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              Direct Support
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.825rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <MapPin size={15} color="#B4233C" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Serving Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad &amp; Faridabad</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={15} color="#B4233C" style={{ flexShrink: 0 }} />
                <a href="tel:+917217715296" style={{ color: '#FFFFFF', fontWeight: 700, textDecoration: 'none' }}>
                  +91 72177 15296
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={15} color="#B4233C" style={{ flexShrink: 0 }} />
                <a href="tel:+918802980922" style={{ color: '#D1D5DB', textDecoration: 'none' }}>
                  +91 88029 80922
                </a>
              </div>
              <div style={{ marginTop: 6 }}>
                <Link
                  to="/complaint"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#B4233C',
                    textDecoration: 'none',
                  }}
                >
                  Online Complaint Desk <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: 20,
          borderTop: '1px solid #22262C',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: '0.75rem',
          color: '#6B7280',
        }}>
          <div>
            &copy; {new Date().getFullYear()} Om Communication Work. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/about" style={{ color: '#6B7280', textDecoration: 'none' }}>About Us</Link>
            <Link to="/contact" style={{ color: '#6B7280', textDecoration: 'none' }}>Contact</Link>
            <Link to="/admin/login" style={{ color: '#4B5563', textDecoration: 'none' }}>Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
