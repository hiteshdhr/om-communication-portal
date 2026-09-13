import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// ─── Reusable editorial ServiceShowcase section ──────────────────────────────
// image: URL string
// imageAlt: alt text
// eyebrow: small label above heading
// heading: large H2
// body: paragraph
// bullets: string[]
// href: CTA link
// ctaText: CTA label
// reverse: boolean — image on right

export default function ServiceShowcase({ image, imageAlt, eyebrow, heading, body, bullets, href, ctaText, reverse = false, sectionId }) {
  return (
    <div
      id={sectionId}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 560,
        border: '1px solid rgba(197,160,63,0.12)',
        borderRadius: 24,
        overflow: 'hidden',
      }}
      className="service-showcase-grid"
    >
      {/* Image Panel */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="img-hover-zoom"
        style={{
          position: 'relative',
          overflow: 'hidden',
          order: reverse ? 2 : 1,
          minHeight: 400,
        }}
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
        {/* Gradient blend toward content */}
        <div style={{
          position: 'absolute', inset: 0,
          background: reverse
            ? 'linear-gradient(270deg, rgba(4,12,26,0) 50%, rgba(4,12,26,0.8) 100%)'
            : 'linear-gradient(90deg, rgba(4,12,26,0) 50%, rgba(4,12,26,0.8) 100%)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* Content Panel */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(135deg, rgba(7,18,40,0.98) 0%, rgba(4,12,26,0.99) 100%)',
          padding: 'clamp(40px, 6vw, 64px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          order: reverse ? 1 : 2,
          gap: 20,
        }}
      >
        {eyebrow && (
          <div className="eyebrow">{eyebrow}</div>
        )}

        <h2
          className="section-title"
          style={{ margin: 0, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        <p style={{ color: '#8DA8BE', lineHeight: 1.75, margin: 0, fontSize: '1rem', maxWidth: 480 }}>
          {body}
        </p>

        {bullets && bullets.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {bullets.map(b => (
              <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: '#A8BCCC' }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#C5A03F', flexShrink: 0, marginTop: 7,
                }} />
                {b}
              </li>
            ))}
          </ul>
        )}

        {href && (
          <div style={{ marginTop: 4 }}>
            <Link
              to={href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: '0.9rem', fontWeight: 700, color: '#C5A03F',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(197,160,63,0.3)',
                paddingBottom: 2,
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FBF6E0'; e.currentTarget.style.borderColor = '#FBF6E0' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#C5A03F'; e.currentTarget.style.borderColor = 'rgba(197,160,63,0.3)' }}
            >
              {ctaText || 'Learn more'} <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .service-showcase-grid {
            grid-template-columns: 1fr !important;
          }
          .service-showcase-grid > div:first-child { min-height: 280px !important; }
          .service-showcase-grid > div { order: unset !important; }
        }
      `}</style>
    </div>
  )
}
