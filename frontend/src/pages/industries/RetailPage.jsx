import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall, ShoppingBag } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import { images } from '../../assets/imageMap'

export default function RetailPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Retail Chains & Store Security Solutions | OM Communication"
        description="Loss prevention CCTV surveillance, POS billing counter monitoring, multi-store remote viewing, and staff attendance for retail chains across Delhi-NCR."
        canonical="/industries/retail"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/industries' },
            { '@type': 'ListItem', position: 3, name: 'Retail Chains & Outlets', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/industries/retail' }
          ]
        }}
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '110px 24px 80px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Industries', path: '/industries' }, { label: 'Retail Chains & Outlets' }]} />

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'left', marginBottom: 40 }}>
          <div style={{ color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Retail Infrastructure
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Retail Chains, Showrooms & Commercial Outlets
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: '1.05rem', maxWidth: 760, lineHeight: 1.65 }}>
            Loss prevention surveillance, high-detail billing counter monitoring, multi-branch remote viewing, and staff attendance solutions engineered for retail operations in Delhi-NCR.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <div style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--border-light)',
          marginBottom: 48,
          position: 'relative',
          background: '#17191D',
          height: 340,
        }}>
          <img
            src={images.industries.commercial.monitoring}
            alt="Retail store aisle surveillance camera and loss prevention monitoring system"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', opacity: 0.85 }}
            loading="eager"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23,25,29,0.92) 0%, rgba(23,25,29,0.30) 60%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 28,
            right: 28,
          }}>
            <div style={{ color: 'var(--text-on-dark)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 4 }}>
              Loss Prevention & Multi-Branch Visibility
            </div>
            <div style={{ color: 'var(--text-on-dark-sub)', fontSize: '0.875rem' }}>
              POS counter detail cameras, stockroom security & mobile remote viewing
            </div>
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 48 }}>
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 14,
            padding: 32,
            border: '1px solid var(--border-light)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.01em' }}>
              Retail Security Challenges
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <div>• Disputed cash drawer transactions and customer change disputes.</div>
              <div>• Stockroom shrinkage and unauthorized staff entry into inventory zones.</div>
              <div>• Requirement for business owners to monitor multiple branches from a single phone app.</div>
              <div>• Unsightly dangling wires damaging store interior aesthetics.</div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 14,
            padding: 32,
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--red-primary)', marginBottom: 16, letterSpacing: '-0.01em' }}>
              The OM Communication Retail Setup
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Specialized Varifocal Cameras Focused on POS Billing Counters',
                'Multi-Store Mobile / NVR Remote Viewing Feeds for Owners',
                'Stockroom Access Control via Biometrics / Keycards',
                'Clean Concealed Cabling Protecting Showroom Interior Finish',
                'Preventative Maintenance Support to Avoid Downtime During Sales'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="var(--red-primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Example */}
        <div style={{
          padding: 32,
          borderRadius: 14,
          marginBottom: 48,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Featured Deployment
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
            Multi-Branch Retail Outlets — Delhi NCR
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 16 }}>
            Installed high-detail POS counter dome cameras and biometric staff attendance terminals across store locations, feeding into a unified remote monitoring platform for management.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span><strong>Scope:</strong> POS CCTV + Biometrics + Mobile Feeds</span>
            <span><strong>Location:</strong> Delhi-NCR</span>
            <span><strong>Status:</strong> Active Preventative Support</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'var(--bg-blush)',
          border: '1px solid var(--border-red)',
          borderRadius: 14,
          padding: 40,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
            Secure Your Retail Stores
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Our security technicians will evaluate billing counter angles, aisle sightlines, and remote network setup.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn-primary" style={{ padding: '12px 28px' }}>
              Request Store Site Survey <ChevronRight size={16} />
            </Link>
            <a href="tel:+917217715296" className="btn-secondary" style={{ padding: '12px 24px' }}>
              <PhoneCall size={15} /> Call +91 72177 15296
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
