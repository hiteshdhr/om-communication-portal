import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, DoorOpen, PhoneCall, Fingerprint, Network, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react'

const NEEDS = [
  {
    num: '01',
    intent: 'Protect my premises',
    service: 'CCTV Surveillance Systems',
    desc: 'High-definition IP & analog cameras, NVR recording, starlight night vision, and encrypted remote access.',
    href: '/services/cctv',
    icon: Camera,
    tags: ['IP Cameras', 'NVR Storage', 'Night Vision', 'Remote View'],
  },
  {
    num: '02',
    intent: 'Control visitor entry',
    service: 'Video Door Phone & Access Control',
    desc: 'Two-way audio/video entry panels, capacitive indoor touch monitors, and electronic door lock integration.',
    href: '/services/vdp',
    icon: DoorOpen,
    tags: ['HD Door Stations', 'Indoor Monitors', 'Lock Release', 'Multi-Unit'],
  },
  {
    num: '03',
    intent: 'Connect my teams',
    service: 'EPABX & Office Intercom Systems',
    desc: 'Multi-extension PBX exchanges, automated call routing, society intercoms, and multi-pair riser cabling.',
    href: '/services/epabx',
    icon: PhoneCall,
    tags: ['Digital PBX', 'Intercom', 'Riser Cabling', 'Auto-Attendant'],
  },
  {
    num: '04',
    intent: 'Manage staff attendance',
    service: 'Biometric Access Systems',
    desc: 'Touchless facial recognition, fingerprint readers, electromagnetic door locks, and automated HR attendance logs.',
    href: '/services/biometrics',
    icon: Fingerprint,
    tags: ['Face Recognition', 'Fingerprint', 'EM Locks', 'Shift Reports'],
  },
  {
    num: '05',
    intent: 'Build network infrastructure',
    service: 'Structured Cabling & LAN',
    desc: 'Certified CAT6 copper cabling, server rack cable dressing, patch panel termination, and Gigabit PoE switches.',
    href: '/services/networking',
    icon: Network,
    tags: ['CAT6 Cabling', 'Server Racks', 'PoE Switches', 'Conduit Routing'],
  },
  {
    num: '06',
    intent: 'Maintain existing systems',
    service: 'Annual Maintenance Contracts (AMC)',
    desc: 'Scheduled preventive inspections, lens cleaning, power audits, and priority emergency technician dispatch.',
    href: '/services/amc',
    icon: Wrench,
    tags: ['Quarterly Audits', 'Priority SLA', 'Preventive Care', 'Repairs'],
  },
]

export default function SolutionSelector() {
  const [selectedNum, setSelectedNum] = useState(NEEDS[0].num)
  const activeNeed = NEEDS.find(n => n.num === selectedNum) || NEEDS[0]

  return (
    <section
      aria-labelledby="solution-selector-heading"
      style={{
        padding: 'clamp(56px, 7vw, 88px) 0',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow">Direct Solution Finder</div>
          <h2
            id="solution-selector-heading"
            style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#111827',
              letterSpacing: '-0.03em',
              margin: '0 0 10px',
            }}
          >
            What does your business need?
          </h2>
          <p style={{ color: '#59636F', fontSize: '1rem', margin: 0, maxWidth: 620 }}>
            Select an operational objective to view the recommended engineering hardware and deployment workflow.
          </p>
        </div>

        {/* Interactive Selector Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 32,
          alignItems: 'stretch',
        }} className="selector-grid">
          
          {/* Left Column: Numbered List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {NEEDS.map((item) => {
              const isSelected = item.num === selectedNum
              return (
                <button
                  key={item.num}
                  onClick={() => setSelectedNum(item.num)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: isSelected ? '#FAF4F5' : '#FFFFFF',
                    border: `1px solid ${isSelected ? 'rgba(180, 35, 60, 0.35)' : '#E5E7EB'}`,
                    borderLeft: `4px solid ${isSelected ? '#B4233C' : '#E5E7EB'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#F6F7F8'
                      e.currentTarget.style.borderColor = '#CBD5E1'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#FFFFFF'
                      e.currentTarget.style.borderColor = '#E5E7EB'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: isSelected ? '#B4233C' : '#9CA3AF',
                    }}>
                      {item.num}
                    </span>
                    <div>
                      <div style={{
                        fontSize: '0.95rem',
                        fontWeight: isSelected ? 800 : 700,
                        color: isSelected ? '#111827' : '#374151',
                      }}>
                        {item.intent}
                      </div>
                      <div style={{
                        fontSize: '0.78rem',
                        color: isSelected ? '#B4233C' : '#6B7280',
                        fontWeight: isSelected ? 600 : 400,
                      }}>
                        {item.service}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    size={16}
                    color={isSelected ? '#B4233C' : '#9CA3AF'}
                    style={{
                      transform: isSelected ? 'translateX(3px)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
              )
            })}
          </div>

          {/* Right Column: Editorial Solution Preview Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNeed.num}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                background: '#F6F7F8',
                border: '1px solid #E5E7EB',
                borderRadius: 12,
                padding: 'clamp(24px, 3.5vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 4,
                  background: '#FAF4F5',
                  border: '1px solid rgba(180, 35, 60, 0.15)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#B4233C',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}>
                  Recommended System
                </div>

                <h3 style={{
                  fontFamily: "'Manrope', 'Inter', sans-serif",
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: '#111827',
                  margin: '0 0 12px',
                  letterSpacing: '-0.02em',
                }}>
                  {activeNeed.service}
                </h3>

                <p style={{
                  color: '#59636F',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  margin: '0 0 24px',
                }}>
                  {activeNeed.desc}
                </p>

                {/* Key Technical Highlights */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}>
                    Included Technical Scope
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {activeNeed.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '4px 10px',
                          borderRadius: 4,
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          color: '#374151',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        <CheckCircle2 size={13} color="#B4233C" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  to={activeNeed.href}
                  className="btn-primary"
                  style={{ flex: '1 1 180px' }}
                >
                  View System Details <ArrowRight size={15} />
                </Link>
                <Link
                  to="/quote"
                  className="btn-secondary"
                  style={{ flex: '1 1 120px' }}
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .selector-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
