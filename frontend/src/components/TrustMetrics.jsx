import { motion } from 'framer-motion'

const METRICS = [
  {
    number: '15+',
    label: 'Years',
    sub: 'Field Experience',
    desc: 'Turnkey projects across commercial & industrial sites',
  },
  {
    number: '2009',
    label: 'Established',
    sub: 'Continuous Operations',
    desc: 'Dedicated technical installation & AMC field units',
  },
  {
    number: 'NCR',
    label: 'Coverage',
    sub: 'Regional Reach',
    desc: 'Delhi, Noida, Gurgaon, Ghaziabad & Faridabad',
  },
  {
    number: 'AMC',
    label: 'Support',
    sub: 'Preventive Care',
    desc: 'Structured quarterly maintenance & priority response',
  },
]

export default function TrustMetrics() {
  return (
    <section
      aria-label="Verified company trust metrics"
      style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        padding: '36px 0',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
        }}>
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: i > 0 ? '1px solid var(--border-light)' : 'none',
                paddingLeft: i > 0 ? 24 : 0,
              }}
              className="metric-column"
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{
                  fontFamily: "'Manrope', 'Inter', sans-serif",
                  fontSize: 'clamp(2.2rem, 3.2vw, 3rem)',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}>
                  {m.number}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--red-primary)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {m.label}
                </span>
              </div>

              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>
                {m.sub}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {m.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .metric-column { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--border-light); padding-top: 20px; }
          .metric-column:first-child { border-top: none; padding-top: 0; }
        }
      `}</style>
    </section>
  )
}
