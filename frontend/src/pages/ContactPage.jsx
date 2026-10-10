import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import api from '../api'

export default function ContactPage() {
  const [form, setForm] = useState({
    clientName: '',
    phone: '',
    email: '',
    companyName: '',
    facilityType: 'Residential Society',
    servicesRequired: ['CCTV Surveillance'],
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleService = (svc) => {
    setForm(f => ({
      ...f,
      servicesRequired: f.servicesRequired.includes(svc)
        ? f.servicesRequired.filter(s => s !== svc)
        : [...f.servicesRequired, svc]
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientName || !form.phone) {
      toast.error('Please provide your name and phone number.')
      return
    }
    setLoading(true)
    try {
      await api.post('/public/inquiries', form)
      setSubmitted(true)
      toast.success('Inquiry received! Our team will contact you shortly.')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Contact Us & Book a Site Survey | OM Communication"
        description="Get in touch with OM Communication. Call +91 72177 15296, message via WhatsApp, or submit a request for an on-site security and intercom assessment across Delhi-NCR."
        canonical="/contact"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact OM Communication',
          description: 'Technical consultations and on-site engineering surveys for security, intercom, and networking systems in Delhi-NCR.'
        }}
      />
      <Navbar />

      {/* ── Page Hero ── */}
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)', padding: 'clamp(32px, 5vw, 56px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact & Survey' }]} />
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
            <div style={{ color: 'var(--red-primary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
              Direct Engineering Contact
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 900, margin: '0 0 12px', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Get in Touch &amp; Book a Site Survey
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 720, lineHeight: 1.65, margin: 0 }}>
              Speak directly with our technical team to schedule an on-site inspection or request an engineered proposal for your property in Delhi-NCR.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px clamp(16px, 4vw, 32px) 80px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 56 }}>
          {/* Left Column: Direct Contact Details */}
          <div>
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: 14,
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              padding: 32,
              marginBottom: 24
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20, letterSpacing: '-0.01em' }}>
                Direct Communication Channels
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a
                  href="tel:+917217715296"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px',
                    borderRadius: 10,
                    background: 'var(--bg-blush)',
                    border: '1px solid var(--border-red)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--red-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={20} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--red-primary)', fontWeight: 700, textTransform: 'uppercase' }}>Direct Phone / Dispatch</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>+91 72177 15296</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/917217715296?text=Hello%20OM%20Communication,%20I%20would%20like%20to%20inquire%20about%20a%20site%20survey%20for%20our%20facility."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px',
                    borderRadius: 10,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={22} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700, textTransform: 'uppercase' }}>WhatsApp Direct</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Chat on WhatsApp</div>
                  </div>
                </a>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 14,
              border: '1px solid var(--border-light)',
              padding: 28
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                <MapPin size={18} /> Service Locations & Coverage
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 16 }}>
                <strong>Primary Operations Hub:</strong> Delhi, Noida, Greater Noida, Ghaziabad (Indirapuram, Vaishali, Vasundhara), Gurugram, and Faridabad.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.88rem' }}>
                <Clock size={16} color="var(--red-primary)" /> Working Hours
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                Monday – Saturday: 9:00 AM – 7:30 PM<br />
                Emergency AMC support available for contracted sites.
              </p>
            </div>
          </div>

          {/* Right Column: Contact / Site Survey Form */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 14,
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            padding: 32
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(22, 163, 74, 0.1)', border: '2px solid #16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={32} color="#16A34A" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>Inquiry Submitted!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>
                  Thank you, <strong>{form.clientName}</strong>. Our engineering team will review your requirement and reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  Request an On-Site Survey
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 24 }}>
                  Fill out the form below and an engineer will schedule a site visit.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Full Name *</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Rajesh Sharma"
                      value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Phone Number *</label>
                    <input
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Company / Society / RWA Name</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Green Heights RWA or Industrial Plant"
                      value={form.companyName}
                      onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Property / Facility Type</label>
                  <select
                    className="form-input"
                    value={form.facilityType}
                    onChange={e => setForm(f => ({ ...f, facilityType: e.target.value }))}
                  >
                    <option value="Residential Society">Residential Society / High-Rise RWA</option>
                    <option value="Factory / Industrial">Factory / Industrial Plant / Warehouse</option>
                    <option value="Commercial Office">Commercial / Corporate Office</option>
                    <option value="Retail Chain">Retail Chain / Commercial Showroom</option>
                    <option value="Independent Villa">Independent Villa / Kothi</option>
                    <option value="Other Facility">Other Facility</option>
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Services Required</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
                    {['CCTV Surveillance', 'EPABX & Telecom', 'Video Door Phone', 'Biometric Access', 'AMC Maintenance', 'Structured Cabling'].map(svc => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => toggleService(svc)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          textAlign: 'left',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: form.servicesRequired.includes(svc) ? 'var(--bg-blush)' : 'var(--bg-surface)',
                          border: `1px solid ${form.servicesRequired.includes(svc) ? '#B4233C' : 'var(--border-light)'}`,
                          color: form.servicesRequired.includes(svc) ? '#B4233C' : 'var(--text-secondary)',
                          transition: 'all 0.15s'
                        }}
                      >
                        {form.servicesRequired.includes(svc) ? '✓ ' : '+ '}{svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Project Details / Site Description</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Briefly describe your site challenges, number of towers/entrances, or timeline..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <Send size={16} /> {loading ? 'Submitting Requirement...' : 'Request On-Site Technical Assessment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
