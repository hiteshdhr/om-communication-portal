import { motion } from 'framer-motion'
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
        background: 'var(--bg-white)',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 44 }}
        >
          <div className="eyebrow-numbered">03 / HOW WE EXECUTE</div>
          <h2
            id="methodology-heading"
            className="heading-accent-left"
            style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              margin: '0 0 10px',
            }}
          >
            From survey to support.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, maxWidth: 580 }}>
            Every project follows a systematic 6-stage engineering lifecycle ensuring zero blind spots and predictable post-handover reliability.
          </p>
        </motion.div>

        {/* ── 6-Step Editorial Timeline ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          position: 'relative',
        }} className="process-grid">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 8,
                padding: '22px 18px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--red-primary)'
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.boxShadow = 'none'
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
                  color: 'var(--red-primary)',
                  background: 'var(--red-light)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  border: '1px solid rgba(180, 35, 60, 0.15)',
                }}>
                  {step.step}
                </span>
                <step.icon size={18} color="var(--text-secondary)" />
              </div>

              <div style={{
                fontSize: '0.875rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: 6,
                letterSpacing: '0.02em',
              }}>
                {step.name}
              </div>

              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                {step.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
