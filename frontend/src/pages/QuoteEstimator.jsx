import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Camera, Phone, DoorOpen, Fingerprint, Wrench, Building2, Factory, Home, ShoppingBag, Network,
  ChevronRight, ChevronLeft, CheckCircle2, Send, PhoneCall, MessageCircle
} from 'lucide-react'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'

const STEPS = ['Select Services', 'Facility Type', 'Site Requirements', 'Survey & Contact']

const servicesList = [
  { id: 'CCTV Surveillance', label: 'CCTV Surveillance Systems', icon: Camera },
  { id: 'EPABX & Telecom', label: 'EPABX & Society Intercoms', icon: Phone },
  { id: 'Video Door Phone', label: 'Video Door Phone (VDP)', icon: DoorOpen },
  { id: 'Biometric Access', label: 'Biometric Access & Attendance', icon: Fingerprint },
  { id: 'AMC Maintenance', label: 'Annual Maintenance Contract (AMC)', icon: Wrench },
  { id: 'Structured Cabling', label: 'Structured Cabling & Networking', icon: Network },
]

const facilityList = [
  { id: 'Residential Society', label: 'Residential Society / High-Rise RWA', icon: Home },
  { id: 'Factory / Industrial', label: 'Factory / Manufacturing Plant', icon: Factory },
  { id: 'Warehouse / Logistics', label: 'Warehouse & Logistics Park', icon: Building2 },
  { id: 'Commercial Office', label: 'Commercial / Corporate Office', icon: Building2 },
  { id: 'Retail Showroom', label: 'Retail Chain / Commercial Outlet', icon: ShoppingBag },
  { id: 'Villa / Kothi', label: 'Independent Villa / Bungalow', icon: Home },
]

export default function QuoteEstimator() {
  const [step, setStep] = useState(0)
  const [services, setServices] = useState(['CCTV Surveillance'])
  const [facilityType, setFacilityType] = useState('Residential Society')
  
  // Dynamic requirement specifics
  const [projectType, setProjectType] = useState('New Installation') // 'New Installation' | 'Upgrade / Expansion' | 'Repair / Overhaul'
  const [cctvScope, setCctvScope] = useState({ indoorOutdoor: 'Both Indoor & Outdoor', remoteAccess: 'Yes, Mobile & Central Screen', approxPoints: '8–16 Points' })
  const [epabxScope, setEpabxScope] = useState({ approxLines: '10–50 Extensions', riserCablingNeeded: 'Yes, Riser Shaft Cabling' })
  const [vdpScope, setVdpScope] = useState({ units: 'Multi-Apartment Building', lockIntegration: 'Yes, Automated Gate Release' })
  const [biometricScope, setBiometricScope] = useState({ employees: '20–100 Staff', type: 'Face Recognition + Fingerprint' })
  const [amcScope, setAmcScope] = useState({ currentStatus: 'Systems Working, Need Routine Care', urgency: 'Within 7 Days' })
  const [notes, setNotes] = useState('')

  // Contact
  const [clientName, setClientName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [siteLocation, setSiteLocation] = useState('')
  const [surveyDatePreference, setSurveyDatePreference] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleService = (id) => {
    setServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const canProceed = () => {
    if (step === 0) return services.length > 0
    if (step === 1) return !!facilityType
    if (step === 2) return true
    if (step === 3) return clientName.trim() && phone.trim()
    return true
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault()
    if (!clientName || !phone) {
      toast.error('Please enter your name and phone number.')
      return
    }

    setLoading(true)
    const compositeMessage = [
      `Project Scope: ${projectType}`,
      `Site Location: ${siteLocation || 'Not specified'}`,
      `Preferred Survey Date: ${surveyDatePreference || 'As soon as possible'}`,
      services.includes('CCTV Surveillance') ? `CCTV: ${cctvScope.approxPoints}, ${cctvScope.indoorOutdoor}, Remote: ${cctvScope.remoteAccess}` : '',
      services.includes('EPABX & Telecom') ? `EPABX: ${epabxScope.approxLines}, ${epabxScope.riserCablingNeeded}` : '',
      services.includes('Video Door Phone') ? `VDP: ${vdpScope.units}, Gate Lock: ${vdpScope.lockIntegration}` : '',
      services.includes('Biometric Access') ? `Biometrics: ${biometricScope.employees}, ${biometricScope.type}` : '',
      services.includes('AMC Maintenance') ? `AMC: ${amcScope.currentStatus}` : '',
      notes ? `Additional Notes: ${notes}` : ''
    ].filter(Boolean).join('\n')

    const payload = {
      clientName,
      companyName,
      phone,
      email,
      facilityType,
      servicesRequired: services,
      estimatedScale: projectType,
      siteLocation,
      message: compositeMessage,
    }

    try {
      await api.post('/public/inquiries', payload)
      setSubmitted(true)
      toast.success('Site survey request received! An engineer will contact you.')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        <SEO title="Requirement Submitted | OM Communication" canonical="/quote" />
        <Navbar />
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '140px 24px 80px', textAlign: 'center' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{
            background: 'var(--bg-card)',
            borderRadius: 16,
            border: '1px solid var(--border-light)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            padding: '48px 36px'
          }}>
            <div style={{ width: 72, height: 72, background: '#F0FDF4', borderRadius: '50%', border: '2px solid #16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={36} color="#16A34A" />
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
              Requirement Received!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 20 }}>
              Thank you, <strong style={{ color: 'var(--text-primary)' }}>{clientName}</strong>. Our engineering team has logged your technical requirement for <strong>{facilityType}</strong>.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 28, background: 'var(--bg-blush)', padding: 16, borderRadius: 10, border: '1px solid var(--border-red)' }}>
              An engineer will call you at <strong>{phone}</strong> to verify cable access, schedule your on-site assessment, and prepare an official itemized technical quotation.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/917217715296?text=${encodeURIComponent(`Hello OM Communication,\n\nI have submitted a quotation requirement:\nName: ${clientName}\nFacility: ${facilityType}\nServices: ${services.join(', ')}\n\nPlease connect with me.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ background: '#16A34A', border: 'none' }}
              >
                <MessageCircle size={16} /> Send via WhatsApp
              </a>
              <a href="tel:+917217715296" className="btn-secondary">
                <PhoneCall size={15} /> Call Direct
              </a>
              <Link to="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Request a Quotation & Site Assessment | OM Communication"
        description="Submit your facility security and communication requirements. Our engineers will evaluate your property and structure a customized turnkey quotation in Delhi-NCR."
        canonical="/quote"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Quote Estimator', item: 'https://om-communication-portal.hiteshdheer155.workers.dev/quote' }
          ]
        }}
      />
      <Navbar />

      <div style={{ maxWidth: 840, margin: '0 auto', padding: '110px 24px 80px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Quote Estimator' }]} />

        {/* Header */}
        <div style={{ textAlign: 'left', marginBottom: 36 }}>
          <div style={{ color: '#B4233C', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Engineered Proposal Desk
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: '0 0 10px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Request Quotation & Site Assessment
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Tell us about your facility requirements. We will engineer a custom technical specification and formal quotation for your site.
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', fontWeight: 700, border: '2px solid',
                  ...(i < step
                    ? { background: 'rgba(22, 163, 74, 0.1)', borderColor: '#16A34A', color: '#16A34A' }
                    : i === step
                    ? { background: 'var(--bg-blush)', borderColor: 'var(--red-primary)', color: 'var(--red-primary)' }
                    : { background: 'var(--bg-card)', borderColor: 'var(--border-light)', color: 'var(--text-muted)' })
                }}>
                  {i < step ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, marginTop: 6, color: i === step ? 'var(--red-primary)' : 'var(--text-secondary)', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                  {s}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 20, background: i < step ? '#16A34A' : 'var(--border-light)', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              padding: '36px 32px'
            }}
          >
            {/* STEP 0: Select Services */}
            {step === 0 && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  Which systems do you require?
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 24 }}>
                  Select all systems that apply to your site (you can bundle multiple solutions):
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                  {servicesList.map(s => {
                    const selected = services.includes(s.id)
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '16px 18px',
                          borderRadius: 10,
                          cursor: 'pointer',
                          textAlign: 'left',
                          border: `2px solid ${selected ? 'var(--red-primary)' : 'var(--border-light)'}`,
                          background: selected ? 'var(--bg-blush)' : 'var(--bg-card)',
                          color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{
                          width: 38, height: 38, borderRadius: 8,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: selected ? 'var(--red-primary)' : 'var(--bg-surface)',
                          color: selected ? '#FFFFFF' : 'var(--text-primary)'
                        }}>
                          <s.icon size={19} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.88rem', color: selected ? 'var(--red-primary)' : 'var(--text-primary)' }}>{s.label}</span>
                        {selected && <CheckCircle2 size={16} color="var(--red-primary)" style={{ marginLeft: 'auto' }} />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 1: Facility Type */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  What type of property / facility is this for?
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 24 }}>
                  This helps our engineers determine relevant compliance, cable routing, and environmental constraints:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                  {facilityList.map(f => {
                    const selected = facilityType === f.id
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFacilityType(f.id)}
                        style={{
                          padding: '18px',
                          borderRadius: 10,
                          cursor: 'pointer',
                          textAlign: 'left',
                          border: `2px solid ${selected ? 'var(--red-primary)' : 'var(--border-light)'}`,
                          background: selected ? 'var(--bg-blush)' : 'var(--bg-card)',
                          color: 'var(--text-primary)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <f.icon size={22} color={selected ? 'var(--red-primary)' : 'var(--text-secondary)'} style={{ marginBottom: 10 }} />
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: selected ? 'var(--red-primary)' : 'var(--text-primary)' }}>{f.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Site Requirements */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  Specific Requirements & Project Scope
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 24 }}>
                  Provide technical context for the selected services:
                </p>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Nature of Work</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
                    {['New Installation', 'Upgrade / Expansion', 'Repair / Overhaul', 'Annual Maintenance (AMC)'].map(t => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setProjectType(t)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 8,
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: projectType === t ? 'var(--bg-blush)' : 'var(--bg-surface)',
                          border: `1px solid ${projectType === t ? 'var(--red-primary)' : 'var(--border-light)'}`,
                          color: projectType === t ? 'var(--red-primary)' : 'var(--text-secondary)'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CCTV Specifics */}
                {services.includes('CCTV Surveillance') && (
                  <div style={{ background: 'var(--bg-surface)', padding: 18, borderRadius: 10, border: '1px solid var(--border-light)', marginBottom: 16 }}>
                    <div style={{ color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.82rem', marginBottom: 10, textTransform: 'uppercase' }}>CCTV Parameters</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>Approx. Number of Points</label>
                        <select className="form-input" style={{ fontSize: '0.85rem', padding: '8px 12px' }} value={cctvScope.approxPoints} onChange={e => setCctvScope(s => ({ ...s, approxPoints: e.target.value }))}>
                          <option>1–8 Cameras (Small Facility)</option>
                          <option>8–16 Points (Mid Facility)</option>
                          <option>16–32 Points (Large Complex)</option>
                          <option>32+ Points (Multi-Tower / Multi-Acre)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>Environment</label>
                        <select className="form-input" style={{ fontSize: '0.85rem', padding: '8px 12px' }} value={cctvScope.indoorOutdoor} onChange={e => setCctvScope(s => ({ ...s, indoorOutdoor: e.target.value }))}>
                          <option>Both Indoor & Outdoor</option>
                          <option>Primarily Indoor Corridors & Lobbies</option>
                          <option>Primarily Outdoor Boundary & Gates</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* EPABX Specifics */}
                {services.includes('EPABX & Telecom') && (
                  <div style={{ background: 'var(--bg-surface)', padding: 18, borderRadius: 10, border: '1px solid var(--border-light)', marginBottom: 16 }}>
                    <div style={{ color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.82rem', marginBottom: 10, textTransform: 'uppercase' }}>EPABX Parameters</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>Approx. Extension Lines</label>
                        <select className="form-input" style={{ fontSize: '0.85rem', padding: '8px 12px' }} value={epabxScope.approxLines} onChange={e => setEpabxScope(s => ({ ...s, approxLines: e.target.value }))}>
                          <option>1–8 Lines (Small Office)</option>
                          <option>10–50 Extensions (Commercial Building)</option>
                          <option>50–200+ Lines (Multi-Tower Society)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>Riser Shaft Cabling</label>
                        <select className="form-input" style={{ fontSize: '0.85rem', padding: '8px 12px' }} value={epabxScope.riserCablingNeeded} onChange={e => setEpabxScope(s => ({ ...s, riserCablingNeeded: e.target.value }))}>
                          <option>Yes, Riser Shaft Cabling & Krone Blocks</option>
                          <option>Existing Cables OK, Need EPABX Unit Only</option>
                          <option>Requires Diagnostic Assessment</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Additional Site Details or Challenges</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="e.g. 3 towers with 12 floors each, basement blindspots, or existing cabling issues..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Survey & Contact Info */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  Contact Information & Site Location
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 24 }}>
                  Our field engineers will reach out to schedule an on-site inspection:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Contact Person Name *</label>
                    <input
                      className="form-input"
                      placeholder="Your full name"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Phone Number *</label>
                    <input
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Society / Company Name</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Mahagun Society or Plant Unit"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Site City / Sector Location</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Indirapuram, Ghaziabad or Sector 62, Noida"
                      value={siteLocation}
                      onChange={e => setSiteLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Preferred Site Survey Date / Time</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Tomorrow afternoon / This Saturday"
                      value={surveyDatePreference}
                      onChange={e => setSurveyDatePreference(e.target.value)}
                    />
                  </div>
                </div>

                {/* Summary Box */}
                <div style={{ background: 'var(--bg-blush)', borderRadius: 10, padding: 16, border: '1px solid var(--border-red)', marginTop: 20 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--red-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Inquiry Summary
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div><strong>Facility:</strong> {facilityType} ({projectType})</div>
                    <div><strong>Selected Systems:</strong> {services.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="btn-secondary"
            style={{ opacity: step === 0 ? 0.3 : 1 }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="btn-primary"
              style={{ opacity: canProceed() ? 1 : 0.4 }}
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !canProceed()}
              className="btn-primary"
            >
              {loading ? 'Submitting Requirement...' : <><Send size={15} /> Request Site Survey & Quotation</>}
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
