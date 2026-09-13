import { Calendar, Clock, MapPin, Wrench } from 'lucide-react'

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
        background: '#F6F7F8',
        borderBottom: '1px solid #E5E7EB',
        padding: '32px 0',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
        }}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: i > 0 ? '1px solid #E5E7EB' : 'none',
                paddingLeft: i > 0 ? 24 : 0,
              }}
              className="metric-column"
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{
                  fontFamily: "'Manrope', 'Inter', sans-serif",
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: '#111827',
                  lineHeight: 1,
                }}>
                  {m.number}
                </span>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#B4233C',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  {m.label}
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', marginBottom: 2 }}>
                {m.sub}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#59636F', lineHeight: 1.4 }}>
                {m.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .metric-column { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #E5E7EB; padding-top: 16px; }
          .metric-column:first-child { border-top: none; padding-top: 0; }
        }
      `}</style>
    </section>
  )
}
