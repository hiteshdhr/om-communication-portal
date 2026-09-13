import { Phone, MessageCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StickyMobileBar() {
  return (
    <div
      className="mobile-sticky-bar"
      role="navigation"
      aria-label="Quick contact actions"
      style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        background: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        padding: 0,
      }}
    >
      {/* Call */}
      <a
        href="tel:+917217715296"
        aria-label="Call Om Communication Work"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          padding: '8px 6px',
          color: '#111827',
          textDecoration: 'none',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          borderRight: '1px solid #E5E7EB',
          minHeight: 52,
        }}
      >
        <Phone size={16} color="#B4233C" />
        <span>Call</span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/917217715296?text=Hello%20Om%20Communication%20Work,%20I%20would%20like%20to%20inquire%20about%20a%20site%20survey%20for%20our%20facility."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Om Communication Work"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          padding: '8px 6px',
          color: '#111827',
          textDecoration: 'none',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          borderRight: '1px solid #E5E7EB',
          minHeight: 52,
        }}
      >
        <MessageCircle size={16} color="#25D366" />
        <span>WhatsApp</span>
      </a>

      {/* Get Quote */}
      <Link
        to="/quote"
        aria-label="Get a quote from Om Communication Work"
        style={{
          flex: 1.4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          padding: '8px 6px',
          background: '#B4233C',
          color: '#FFFFFF',
          textDecoration: 'none',
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          minHeight: 52,
        }}
      >
        <ChevronRight size={16} color="#FFFFFF" />
        <span>Get Quote</span>
      </Link>
    </div>
  )
}
