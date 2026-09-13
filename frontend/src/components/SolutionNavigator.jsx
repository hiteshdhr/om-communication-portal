import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Fingerprint, PhoneCall, Monitor, Network, Wrench } from 'lucide-react'

const SOLUTIONS = [
  { id: 'surveillance',    label: 'Surveillance',     icon: Camera,       href: '#section-cctv' },
  { id: 'access',          label: 'Access Control',   icon: Fingerprint,  href: '#section-biometrics' },
  { id: 'communication',   label: 'Communication',    icon: PhoneCall,    href: '#section-epabx' },
  { id: 'biometrics',      label: 'Biometrics',       icon: Monitor,      href: '#section-biometrics' },
  { id: 'networking',      label: 'Networking',        icon: Network,      href: '#section-networking' },
  { id: 'maintenance',     label: 'Maintenance',       icon: Wrench,       href: '#section-amc' },
]

export default function SolutionNavigator({ activeSectionId }) {
  const [active, setActive] = useState('surveillance')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (activeSectionId) {
      const match = SOLUTIONS.find(s => activeSectionId.includes(s.id))
      if (match) setActive(match.id)
    }
  }, [activeSectionId])

  const handleClick = (sol) => {
    setActive(sol.id)
    const target = document.querySelector(sol.href)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div
      style={{
        position: 'sticky', top: 68, zIndex: 90,
        background: 'rgba(4,12,26,0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(197,160,63,0.12)',
        borderTop: '1px solid rgba(197,160,63,0.08)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        {/* Heading row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 32,
          justifyContent: 'space-between', padding: '16px 0',
        }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, color: '#607080',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            flexShrink: 0, display: 'none',
          }} className="sol-nav-label">
            One partner. Every system.
          </div>

          {/* Pill row — horizontal scroll on mobile */}
          <div
            ref={scrollRef}
            className="h-scroll"
            style={{ display: 'flex', gap: 4, flex: 1, overflowX: 'auto' }}
            role="tablist"
            aria-label="Solution categories"
          >
            {SOLUTIONS.map((sol) => (
              <button
                key={sol.id}
                role="tab"
                aria-selected={active === sol.id}
                aria-controls={`section-${sol.id}`}
                className={`sol-nav-pill ${active === sol.id ? 'active' : ''}`}
                onClick={() => handleClick(sol)}
                style={{ flexShrink: 0 }}
              >
                <sol.icon size={14} style={{ flexShrink: 0 }} />
                {sol.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
