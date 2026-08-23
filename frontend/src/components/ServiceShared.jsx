import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, PhoneCall, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FAQAccordion — reusable accordion component for service pages
 * @param {Array} faqs — [{ q: string, a: string }]
 */
export function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ maxWidth: 780 }}>
      {faqs.map(({ q, a }, i) => (
        <div key={i} className="faq-item">
          <button
            className="faq-question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{q}</span>
            <ChevronDown
              size={18}
              color="#C5A03F"
              style={{
                transform: open === i ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.25s ease',
                flexShrink: 0,
              }}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <p className="faq-answer">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/**
 * ServiceCTA — standardized end-of-page CTA for all service pages
 * @param {string} headline
 * @param {string} sub
 */
export function ServiceCTA({ headline, sub }) {
  return (
    <section className="page-section" style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(197,160,63,0.10) 0%, rgba(13,32,64,0.60) 100%)',
            border: '1px solid rgba(197,160,63,0.25)',
            borderRadius: 24,
            padding: '56px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* faint bg radial */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(197,160,63,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>
              Planning a Security Project?
            </div>

            <h2 style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 800,
              margin: '0 0 14px',
              color: '#FFFFFF',
            }}>
              {headline || 'Ready for an On-Site Security Assessment?'}
            </h2>

            <p style={{
              color: '#94A3B8',
              fontSize: '1.05rem',
              maxWidth: 520,
              margin: '0 auto 32px',
              lineHeight: 1.65,
            }}>
              {sub || 'Our field engineering team will assess your facility, evaluate requirements, and prepare a detailed technical proposal — tailored to your site.'}
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/quote"
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '13px 32px' }}
              >
                Request a Site Survey <ChevronRight size={16} />
              </Link>
              <a
                href="tel:+917217715296"
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '13px 28px' }}
              >
                <PhoneCall size={15} /> Call +91 72177 15296
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * SectionHeader — reusable eyebrow + title + body for section starts
 */
export function SectionHeader({ eyebrow, title, body, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ textAlign: center ? 'center' : 'left', marginBottom: 48 }}
    >
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {body && (
        <p className="section-body" style={{ margin: center ? '0 auto' : '0' }}>
          {body}
        </p>
      )}
    </motion.div>
  )
}
