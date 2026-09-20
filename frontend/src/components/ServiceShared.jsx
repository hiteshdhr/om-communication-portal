import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, ChevronDown, Phone, ArrowRight,
  ShieldCheck, Wrench, MapPin, Clock, FileText
} from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import SEO from './SEO'
import StickyMobileBar from './StickyMobileBar'
import Breadcrumbs from './Breadcrumbs'

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const id = `sp-faq-q-${index}`
  const panelId = `sp-faq-p-${index}`

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden',
      }}
    >
      <button
        className="faq-question"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        id={id}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          color: open ? 'var(--red-primary)' : 'var(--text-primary)',
          fontSize: '0.975rem',
          fontWeight: 700,
          fontFamily: "'Manrope', 'Inter', sans-serif",
          textAlign: 'left',
          gap: 16,
          transition: 'color 0.15s',
        }}
      >
        <span>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0, color: open ? 'var(--red-primary)' : 'var(--text-muted)' }}
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
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '0.925rem',
              lineHeight: 1.7,
              padding: '0 0 16px',
              maxWidth: 780,
            }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Reusable Contextual Service CTA ──────────────────────────────────────────
export function ServiceCTA({ headline, sub, ctaText = 'Plan My System →', serviceName = 'Security System' }) {
  return (
    <section
      aria-label="Service consultation request"
      style={{
        padding: 'clamp(48px, 6vw, 80px) 0',
        background: 'var(--bg-blush)',
        borderTop: '1px solid var(--border-red)',
        borderBottom: '1px solid var(--border-light)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(180, 35, 60, 0.22)',
          borderRadius: 14,
          padding: 'clamp(36px, 6vw, 56px) clamp(20px, 4vw, 44px)',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(180, 35, 60, 0.06)',
        }}>
          <div className="eyebrow" style={{ display: 'inline-flex', marginBottom: 10 }}>
            Engineering Consultation &amp; Site Assessment
          </div>

          <h2 style={{
            fontFamily: "'Manrope', 'Inter', sans-serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: '0 0 12px',
            color: 'var(--text-primary)',
            lineHeight: 1.15,
          }}>
            {headline || `Plan your ${serviceName} with our engineers.`}
          </h2>

          <p style={{
            color: '#59636F',
            maxWidth: 540,
            margin: '0 auto 28px',
            fontSize: '0.975rem',
            lineHeight: 1.65,
          }}>
            {sub || 'Schedule a professional on-site survey anywhere in Delhi-NCR. We inspect your layout, calculate technical specifications, and provide a clear, itemized proposal.'}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/quote"
              className="btn-primary"
              style={{ fontSize: '0.9375rem', padding: '12px 28px' }}
            >
              {ctaText}
            </Link>
            <a
              href="tel:+917217715296"
              className="btn-secondary"
              style={{ fontSize: '0.9375rem', padding: '12px 24px' }}
            >
              <Phone size={14} color="#B4233C" /> Call +91 72177 15296
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main Service Page Template ───────────────────────────────────────────────
export default function ServicePageLayout({
  seo,             // { title, description, canonical }
  breadcrumbs,     // [{ label, href }]
  hero,            // { eyebrow, h1, sub, image, imageAlt }
  overview,        // string or JSX
  whyNeeded,       // { title, text, points: [] }
  benefits,        // [{ icon, title, desc }]
  capabilities,    // string[]
  process,         // [{ step, title, desc }]
  considerations,  // [{ title, desc }]
  maintenanceInfo, // { title, text, amcLink }
  applications,    // [{ label, desc }]
  faqs,            // [{ q, a }]
  relatedLinks,    // [{ label, href }]
  ctaHeadline,
  ctaSub,
  ctaText,
  children,
}) {
  const serviceBreadcrumbs = breadcrumbs || [
    { label: 'Solutions', href: '/services' },
    { label: hero?.eyebrow || 'Service' },
  ]

  // Construct Service JSON-LD Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: hero?.eyebrow || 'Security & Telecommunication Engineering',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Om Communication Work',
      telephone: '+917217715296',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Delhi-NCR',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Delhi-NCR (Delhi, Noida, Gurgaon, Ghaziabad, Faridabad)',
    },
    description: seo?.description || hero?.sub,
    url: `https://om-communication-portal.hiteshdheer155.workers.dev${seo?.canonical || ''}`,
  }

  // Construct FAQPage JSON-LD Schema
  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  } : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO title={seo.title} description={seo.description} canonical={seo.canonical} />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      {/* ── Page Hero (Clean Light Layout) ── */}
      <section
        style={{
          background: '#F6F7F8',
          borderBottom: '1px solid #E5E7EB',
          padding: 'clamp(36px, 5vw, 64px) 0',
        }}
        aria-labelledby="sp-h1"
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          {/* Semantic Breadcrumbs with Schema */}
          <Breadcrumbs items={serviceBreadcrumbs} light={true} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: hero.image ? '1.15fr 0.85fr' : '1fr',
            gap: 'clamp(28px, 4vw, 48px)',
            alignItems: 'center',
          }} className="sp-hero-grid">
            <div>
              {hero.eyebrow && (
                <div className="eyebrow" style={{ marginBottom: 8 }}>
                  {hero.eyebrow}
                </div>
              )}
              <h1
                id="sp-h1"
                style={{
                  fontFamily: "'Manrope', 'Inter', sans-serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-primary)',
                  margin: '0 0 14px',
                  lineHeight: 1.1,
                }}
                dangerouslySetInnerHTML={{ __html: hero.h1 }}
              />
              <p style={{
                color: '#59636F',
                fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                lineHeight: 1.65,
                maxWidth: 620,
                margin: '0 0 24px',
              }}>
                {hero.sub}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/quote" className="btn-primary" style={{ fontSize: '0.9375rem', padding: '11px 24px' }}>
                  {ctaText || 'Request Site Assessment →'}
                </Link>
                <a href="tel:+917217715296" className="btn-secondary" style={{ fontSize: '0.9375rem', padding: '11px 20px' }}>
                  <Phone size={14} color="#B4233C" /> Call +91 72177 15296
                </a>
              </div>
            </div>

            {hero.image && (
              <div style={{
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                maxHeight: 320,
                background: '#E5E7EB',
              }}>
                <img
                  src={hero.image}
                  alt={hero.imageAlt || hero.eyebrow}
                  loading="eager"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Content Container ── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>

        {/* ── 1. Technical Overview ── */}
        {overview && (
          <section style={{ padding: 'clamp(48px, 6vw, 72px) 0 0' }} aria-label="Technical overview">
            <div className="eyebrow">Engineering Specification</div>
            <h2 style={{
              fontFamily: "'Manrope', 'Inter', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              margin: '0 0 16px',
              letterSpacing: '-0.025em',
            }}>
              What is this system &amp; how does it work?
            </h2>
            <div style={{
              color: '#374151',
              fontSize: '1rem',
              lineHeight: 1.75,
            }}>
              {typeof overview === 'string' ? <p style={{ margin: 0 }}>{overview}</p> : overview}
            </div>
          </section>
        )}

        {/* ── 2. Why This System is Needed ── */}
        {whyNeeded && (
          <section style={{ padding: 'clamp(44px, 5vw, 64px) 0 0' }} aria-labelledby="sp-why-needed">
            <div style={{
              background: '#F6F7F8',
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              padding: 'clamp(24px, 4vw, 36px)',
            }}>
              <div className="eyebrow">Operational Need</div>
              <h2 id="sp-why-needed" style={{
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 12px',
              }}>
                {whyNeeded.title || 'Why does a business need this system?'}
              </h2>
              <p style={{ color: '#59636F', fontSize: '0.975rem', lineHeight: 1.7, margin: '0 0 20px' }}>
                {whyNeeded.text}
              </p>

              {whyNeeded.points && whyNeeded.points.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                  {whyNeeded.points.map((pt, idx) => (
                    <div key={idx} style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}>
                      <CheckCircle2 size={16} color="#B4233C" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span style={{ color: '#1F2937', fontSize: '0.85rem', lineHeight: 1.5, fontWeight: 600 }}>
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── 3. Engineering Benefits ── */}
        {benefits && benefits.length > 0 && (
          <section style={{ padding: 'clamp(48px, 6vw, 72px) 0 0' }} aria-labelledby="sp-benefits">
            <div className="eyebrow">Key Advantages</div>
            <h2 id="sp-benefits" className="section-title" style={{ marginBottom: 28, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              Core Technical Benefits
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="clean-card"
                  style={{ padding: '22px 20px' }}
                >
                  {b.icon && (
                    <div style={{
                      width: 38, height: 38, borderRadius: 8,
                      background: '#FAF4F5', border: '1px solid rgba(180, 35, 60, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
                    }}>
                      <b.icon size={18} color="#B4233C" />
                    </div>
                  )}
                  <h3 style={{ fontSize: '0.975rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                    {b.title}
                  </h3>
                  <p style={{ color: '#59636F', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 4. Capabilities & Hardware Scope ── */}
        {capabilities && capabilities.length > 0 && (
          <section style={{ padding: 'clamp(48px, 6vw, 72px) 0 0' }} aria-labelledby="sp-capabilities">
            <div className="eyebrow">Scope of Supply</div>
            <h2 id="sp-capabilities" className="section-title" style={{ marginBottom: 24, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              What OM Communication Provides
            </h2>
            <div style={{
              background: '#F6F7F8',
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              padding: 'clamp(20px, 3.5vw, 32px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '10px 20px',
            }}>
              {capabilities.map(cap => (
                <div key={cap} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
                  <CheckCircle2 size={15} color="#B4233C" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: '#1F2937', fontSize: '0.875rem', lineHeight: 1.55, fontWeight: 500 }}>
                    {cap}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. Installation Lifecycle ── */}
        {process && process.length > 0 && (
          <section style={{ padding: 'clamp(48px, 6vw, 72px) 0 0' }} aria-labelledby="sp-process">
            <div className="eyebrow">Deployment Lifecycle</div>
            <h2 id="sp-process" className="section-title" style={{ marginBottom: 28, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              How We Design &amp; Install
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {process.map((p) => (
                <div
                  key={p.step}
                  style={{
                    padding: '20px 16px',
                    borderRadius: 8,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#B4233C',
                    background: '#FAF4F5',
                    padding: '2px 6px',
                    borderRadius: 4,
                    display: 'inline-block',
                    marginBottom: 8,
                  }}>
                    {p.step}
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                    {p.title}
                  </h3>
                  <p style={{ color: '#59636F', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 6. Site Considerations ── */}
        {considerations && considerations.length > 0 && (
          <section style={{ padding: 'clamp(48px, 6vw, 72px) 0 0' }} aria-labelledby="sp-considerations">
            <div className="eyebrow">Planning Factors</div>
            <h2 id="sp-considerations" className="section-title" style={{ marginBottom: 24, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              What to Consider Before Installation
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {considerations.map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: '18px 18px',
                    borderRadius: 8,
                    background: '#F6F7F8',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <FileText size={15} color="#B4233C" />
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {c.title}
                    </h3>
                  </div>
                  <p style={{ color: '#59636F', fontSize: '0.825rem', lineHeight: 1.6, margin: 0 }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 7. Maintenance & AMC ── */}
        {maintenanceInfo && (
          <section style={{ padding: 'clamp(44px, 5vw, 64px) 0 0' }}>
            <div style={{
              background: '#FAF4F5',
              border: '1px solid rgba(180, 35, 60, 0.18)',
              borderRadius: 12,
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={18} color="#B4233C" />
                <h2 style={{
                  fontFamily: "'Manrope', 'Inter', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>
                  {maintenanceInfo.title || 'Ongoing Maintenance & Support'}
                </h2>
              </div>
              <p style={{ color: '#59636F', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                {maintenanceInfo.text}
              </p>
              <div>
                <Link
                  to={maintenanceInfo.amcLink || '/services/amc'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#B4233C',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                  }}
                >
                  Explore Maintenance Contracts (AMC) <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── 8. Sector Applications ── */}
        {applications && applications.length > 0 && (
          <section style={{ padding: 'clamp(48px, 6vw, 72px) 0 0' }} aria-labelledby="sp-apps">
            <div className="eyebrow">Industry Applications</div>
            <h2 id="sp-apps" className="section-title" style={{ marginBottom: 24, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              Where This System is Applied
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {applications.map(app => (
                <div
                  key={app.label}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                    {app.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#59636F', lineHeight: 1.5 }}>
                    {app.desc}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 9. Delhi-NCR Coverage Note ── */}
        <section style={{ padding: 'clamp(36px, 4vw, 56px) 0 0' }}>
          <div style={{
            background: '#F6F7F8',
            border: '1px solid #E5E7EB',
            borderRadius: 8,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}>
            <MapPin size={20} color="#B4233C" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>
                Delhi-NCR Service &amp; On-Site Support
              </div>
              <div style={{ fontSize: '0.8rem', color: '#59636F', lineHeight: 1.45 }}>
                Field engineering units available across Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad, and Faridabad.
              </div>
            </div>
          </div>
        </section>

        {/* ── Children slot ── */}
        {children}

        {/* ── 10. FAQs ── */}
        {faqs && faqs.length > 0 && (
          <section style={{ padding: 'clamp(48px, 6vw, 72px) 0 0' }} aria-labelledby="sp-faq">
            <div className="eyebrow">Practical Guidance</div>
            <h2 id="sp-faq" className="section-title" style={{ marginBottom: 24, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              Frequently Asked Questions
            </h2>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: '8px 24px',
            }}>
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── 11. Related Services ── */}
        {relatedLinks && relatedLinks.length > 0 && (
          <section style={{ padding: 'clamp(36px, 4vw, 56px) 0' }} aria-labelledby="sp-related">
            <h2 id="sp-related" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
              Related Security &amp; Telecom Systems:
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {relatedLinks.map(rl => (
                <Link
                  key={rl.href}
                  to={rl.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 6,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#B4233C'
                    e.currentTarget.style.color = '#B4233C'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#D1D5DB'
                    e.currentTarget.style.color = '#374151'
                  }}
                >
                  {rl.label} <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Contextual Conversion CTA ── */}
      <ServiceCTA
        headline={ctaHeadline}
        sub={ctaSub}
        ctaText={ctaText}
        serviceName={hero.eyebrow}
      />

      <StickyMobileBar />
      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .sp-hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  )
}
