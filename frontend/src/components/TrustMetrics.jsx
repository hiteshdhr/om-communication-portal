import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Clock, MapPin, Layers } from 'lucide-react'

const METRICS = [
  {
    icon: Clock,
    value: 15,
    suffix: '+',
    label: 'Years in Operation',
    sub: 'Serving Delhi-NCR since 2009',
  },
  {
    icon: Layers,
    value: 4,
    suffix: '',
    label: 'Industries Served',
    sub: 'Residential • Industrial • Commercial • Retail',
  },
  {
    icon: MapPin,
    value: null,
    display: 'NCR',
    suffix: '',
    label: 'Primary Service Area',
    sub: 'Delhi, Noida, Ghaziabad, Gurugram',
  },
  {
    icon: ShieldCheck,
    value: null,
    display: 'AMC',
    suffix: '',
    label: 'Long-Term Support',
    sub: 'Annual Maintenance Contracts',
  },
]

function AnimatedCounter({ target, suffix, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.6 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || target === null) return
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return <span ref={ref}>{target !== null ? count : ''}{suffix}</span>
}

export default function TrustMetrics() {
  return (
    <section style={{
      padding: '0 0 0 0',
      background: 'rgba(7,15,31,0.8)',
      borderTop: '1px solid rgba(197,160,63,0.10)',
      borderBottom: '1px solid rgba(197,160,63,0.10)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* faint dot grid */}
      <div className="bg-dots" style={{
        position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}>
          {METRICS.map(({ icon: Icon, value, display, suffix, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                padding: '40px 32px',
                borderRight: i < METRICS.length - 1 ? '1px solid rgba(197,160,63,0.10)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 44, height: 44,
                background: 'rgba(197,160,63,0.08)',
                border: '1px solid rgba(197,160,63,0.20)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
              }}>
                <Icon size={20} color="#C5A03F" />
              </div>

              <div style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#C5A03F',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: 6,
              }}>
                {display ? display : (
                  <AnimatedCounter target={value} suffix={suffix} />
                )}
                {!display && suffix && value !== null ? '' : ''}
                {display && suffix}
              </div>

              <div style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: 4,
              }}>
                {label}
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: '#607080',
                lineHeight: 1.5,
              }}>
                {sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .trust-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
