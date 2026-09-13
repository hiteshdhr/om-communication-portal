import { MapPin, Layers, Wrench, Settings, CheckCircle2, ShieldCheck } from 'lucide-react'

const PROCESS_STEPS = [
  {
    step: '01',
    name: 'SITE SURVEY',
    icon: MapPin,
    desc: 'Understand the site, requirements, cable routes and physical constraints.',
  },
  {
    step: '02',
    name: 'SYSTEM DESIGN',
    icon: Layers,
    desc: 'Plan the appropriate hardware specs and structured system architecture.',
  },
  {
    step: '03',
    name: 'INSTALLATION',
    icon: Wrench,
    desc: 'Deploy cabling, conduit raceways and physical hardware to engineering standards.',
  },
  {
    step: '04',
    name: 'CONFIGURATION',
    icon: Settings,
    desc: 'Configure network IP settings, PBX call routing and access permissions.',
  },
  {
    step: '05',
    name: 'TESTING',
    icon: CheckCircle2,
    desc: 'Verify signal continuity, optical focus, night vision and system coverage.',
  },
  {
    step: '06',
    name: 'HANDOVER & SUPPORT',
    icon: ShieldCheck,
    desc: 'Complete client documentation handover and ongoing AMC maintenance support.',
  },
]

export default function ProcessTimeline() {
  return (
    <section
      aria-labelledby="methodology-heading"
      style={{
        padding: 'clamp(56px, 7vw, 88px) 0',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 44 }}>
          <div className="eyebrow">Engineering Methodology</div>
          <h2
            id="methodology-heading"
            style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#111827',
              letterSpacing: '-0.03em',
              margin: '0 0 10px',
            }}
          >
            From survey to support.
          </h2>
          <p style={{ color: '#59636F', fontSize: '1rem', margin: 0, maxWidth: 580 }}>
            Every project follows a systematic 6-stage engineering lifecycle ensuring zero blind spots and predictable post-handover reliability.
          </p>
        </div>

        {/* ── 6-Step Editorial Timeline ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }} className="process-grid">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              style={{
                background: '#F6F7F8',
                border: '1px solid #E5E7EB',
                borderRadius: 8,
                padding: '22px 18px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#B4233C',
                  background: '#FAF4F5',
                  padding: '2px 6px',
                  borderRadius: 4,
                  border: '1px solid rgba(180, 35, 60, 0.15)',
                }}>
                  {step.step}
                </span>
                <step.icon size={18} color="#59636F" />
              </div>

              <div style={{
                fontSize: '0.875rem',
                fontWeight: 800,
                color: '#111827',
                marginBottom: 6,
                letterSpacing: '0.02em',
              }}>
                {step.name}
              </div>

              <div style={{
                fontSize: '0.8rem',
                color: '#59636F',
                lineHeight: 1.5,
              }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
