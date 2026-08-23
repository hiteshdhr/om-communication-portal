import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #040C1A 0%, #0B1E38 100%)' }}>
      <SEO
        title="Contact Us & Book a Site Survey | Om Communication Work"
        description="Get in touch with Om Communication Work. Call +91 72177 15296, message via WhatsApp, or submit a request for an on-site security and intercom assessment."
        canonical="/contact"
      />
      <Navbar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ color: '#C5A03F', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Direct Engineering Contact
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Get in Touch & Book a Site Survey
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 14, fontSize: '1.05rem', maxWidth: 640, margin: '14px auto 0', lineHeight: 1.6 }}>
            Speak directly with our technical team to schedule an on-site inspection or request an engineered proposal for your property.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, marginBottom: 60 }}>
          {/* Left Column: Direct Contact Details */}
          <div>
            <div className="glass-card" style={{ padding: 32, marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 20 }}>
                Direct Communication Channels
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a
                  href="tel:+917217715296"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px',
                    borderRadius: 12,
                    background: 'rgba(197,160,63,0.12)',
                    border: '1px solid rgba(197,160,63,0.3)',
                    color: '#FBF6E0',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#C5A03F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={20} color="#040C1A" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#C5A03F', fontWeight: 700, textTransform: 'uppercase' }}>Direct Phone / Dispatch</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>+91 72177 15296</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/917217715296?text=Hello%20Om%20Communication%20Work,%20I%20would%20like%20to%20inquire%20about%20a%20site%20survey%20for%20our%20facility."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px',
                    borderRadius: 12,
                    background: 'rgba(37,211,102,0.12)',
                    border: '1px solid rgba(37,211,102,0.35)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={22} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 700, textTransform: 'uppercase' }}>WhatsApp Direct</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>Chat on WhatsApp</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, color: '#C5A03F', fontWeight: 700, fontSize: '0.9rem' }}>
                <MapPin size={18} /> Service Locations & Coverage
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 16 }}>
                <strong>Primary Operations Hub:</strong> Delhi, Noida, Greater Noida, Ghaziabad (Indirapuram, Vaishali, Vasundhara), Gurugram, and Faridabad.
              </p>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                <strong>Pan-India Enterprise Projects:</strong> Available for large manufacturing plants, multi-facility warehouse complexes, and corporate rollouts across India.
              </p>
            </div>
          </div>

          {/* Right Column: Contact / Site Survey Form */}
          <div className="glass-card" style={{ padding: 36 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={32} color="#22c55e" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>Inquiry Submitted!</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>
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
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                  Request an On-Site Survey
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: 24 }}>
                  Fill out the form below and an engineer will schedule a site visit.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Rajesh Sharma"
                      value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Company / Society / RWA Name</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Green Heights RWA or Steelbird Plant"
                      value={form.companyName}
                      onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label className="form-label">Property / Facility Type</label>
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
                  <label className="form-label">Services Required</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
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
                          background: form.servicesRequired.includes(svc) ? 'rgba(197,160,63,0.18)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${form.servicesRequired.includes(svc) ? '#C5A03F' : 'rgba(255,255,255,0.08)'}`,
                          color: form.servicesRequired.includes(svc) ? '#FBF6E0' : '#94A3B8',
                          transition: 'all 0.15s'
                        }}
                      >
                        {form.servicesRequired.includes(svc) ? '✓ ' : '+ '}{svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label className="form-label">Project Details / Site Description</label>
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
