import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// ─── Reusable FAQ accordion ───────────────────────────────────────────────────

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const id = `faq-q-${index}`
  const panelId = `faq-p-${index}`

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        id={id}
      >
        <span>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0, color: open ? '#C5A03F' : '#607080' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="faq-answer">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const DEFAULT_FAQS = [
  {
    q: 'Do you provide CCTV installation services?',
    a: 'Yes. We provide complete CCTV surveillance installation including site survey, system design, camera mounting, structured cabling, NVR/DVR configuration, and remote monitoring setup. We serve Delhi, Noida, Ghaziabad, Gurugram, and Faridabad.',
  },
  {
    q: 'Do you provide Annual Maintenance Contracts (AMC) after installation?',
    a: 'Yes. We offer comprehensive and non-comprehensive AMC plans that include scheduled preventative maintenance visits, system health checks, and priority technician dispatch for any faults or service requirements.',
  },
  {
    q: 'Can you maintain CCTV systems that were not installed by you?',
    a: 'Yes. We provide AMC support for existing security systems, regardless of the original installer, subject to a site assessment to evaluate the current system condition.',
  },
  {
    q: 'Do you install EPABX and intercom systems?',
    a: 'Yes. We install multi-line EPABX systems, office intercom networks, vertical riser cabling, and Krone distribution modules for corporate offices, residential societies, and commercial buildings.',
  },
  {
    q: 'Do you provide biometric attendance and access control systems?',
    a: 'Yes. We supply and install fingerprint, face recognition, and RFID card-based biometric systems for attendance tracking, access management, and restricted zone control.',
  },
  {
    q: 'Do you install Video Door Phone (VDP) systems?',
    a: 'Yes. We install multi-apartment and villa VDP solutions with HD video entry panels, two-way audio, automated door lock release, and visitor recording capabilities.',
  },
  {
    q: 'Do you provide structured cabling and networking infrastructure?',
    a: 'Yes. We install CAT6 structured cabling, LAN network infrastructure, server racks, patch panels, conduit wiring, and complete networking solutions for offices, societies, and industrial facilities.',
  },
  {
    q: 'Do you provide complete turnkey security projects?',
    a: 'Yes. We manage the entire project lifecycle — site assessment, system design, equipment procurement, professional installation, configuration, testing, commissioning, handover documentation, and ongoing AMC support.',
  },
  {
    q: 'Which types of businesses and facilities do you serve?',
    a: 'We serve residential societies and high-rise communities, commercial offices and corporate campuses, factories and industrial plants, retail outlets and multi-location retail chains, warehouses, and educational institutions across Delhi-NCR.',
  },
  {
    q: 'How can I request a quotation or site survey?',
    a: 'You can request a site survey directly through our website using the "Get a Quote" button, or call us at +91 72177 15296. Our engineering team will visit your facility, assess requirements, and prepare a detailed technical proposal.',
  },
]

export default function FAQSection({ faqs = DEFAULT_FAQS, heading = 'Frequently asked questions', eyebrow = 'FAQ' }) {
  return (
    <section
      style={{
        padding: 'var(--section-lg) 0',
        background: 'rgba(5,14,31,0.8)',
        position: 'relative',
      }}
      aria-labelledby="faq-heading"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }} className="faq-grid">

          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'sticky', top: 100 }}
          >
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h2
              id="faq-heading"
              className="section-title"
              style={{ marginBottom: 16 }}
            >
              {heading}
            </h2>
            <p style={{ color: '#607080', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Have a question? Call us at<br />
              <a href="tel:+917217715296" style={{ color: '#C5A03F', fontWeight: 700, textDecoration: 'none' }}>
                +91 72177 15296
              </a>
            </p>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQPage schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }) }} />

      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  )
}
