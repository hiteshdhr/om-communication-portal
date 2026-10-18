import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Wrench, PlusCircle, ClipboardList, Building2, Camera, Phone, DoorOpen,
  Fingerprint, Network, ChevronRight, ChevronLeft, CheckCircle2, Send,
  AlertCircle, ArrowLeft, Home, Factory, ShoppingBag, Briefcase, Search
} from 'lucide-react'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'

// ─── Service path definitions ──────────────────────────────────────────────────
const PATHS = [
  {
    id: 'repair',
    Icon: Wrench,
    title: 'Repair or Report a Problem',
    shortLabel: 'Repair / Fault',
    description: 'Camera offline, DVR/NVR issue, intercom not working, biometric error, or network fault.',
    examples: ['CCTV camera or recording offline', 'DVR/NVR or remote-view issue', 'Intercom / EPABX fault', 'Biometric or access-control error', 'Network drop or cabling fault'],
    accentColor: '#B4233C',
    outcome: 'You will receive a support ticket number for tracking',
  },
  {
    id: 'installation',
    Icon: PlusCircle,
    title: 'Book an Installation or Additional Service',
    shortLabel: 'Installation',
    description: 'Add cameras, intercoms, door phones, biometric readers, or network points to an existing or new installation.',
    examples: ['Add CCTV cameras to an existing system', 'Install additional intercom extensions', 'Add a video door phone', 'Install access-control devices', 'Add network points or data cabling'],
    accentColor: '#2563EB',
    outcome: 'We will assess the scope and confirm details with you',
  },
  {
    id: 'amc',
    Icon: ClipboardList,
    title: 'Maintenance and AMC',
    shortLabel: 'Maintenance / AMC',
    description: 'Preventive maintenance visit, system health inspection, or annual maintenance contract enquiry.',
    examples: ['Routine preventive maintenance', 'System health check', 'AMC contract enquiry', 'Existing AMC support request'],
    accentColor: '#16A34A',
    outcome: 'We will reach out to discuss available maintenance options',
  },
  {
    id: 'project',
    Icon: Building2,
    title: 'New Project or Enterprise Solution',
    shortLabel: 'New Project',
    description: 'Complete security and communication infrastructure for a school, office, factory, society, or multi-site organisation.',
    examples: ['New development or site build-out', 'Multi-floor or multi-building campus', 'Industrial facility security systems', 'Multi-branch organisation rollout'],
    accentColor: '#D97706',
    outcome: 'We will arrange a site survey and consultation',
  },
]

// ─── Shared option lists ───────────────────────────────────────────────────────
const FAULT_CATEGORIES = [
  { id: 'CCTV Surveillance', label: 'CCTV Surveillance', Icon: Camera },
  { id: 'EPABX / Telecom', label: 'EPABX / Intercom', Icon: Phone },
  { id: 'Video Door Phone', label: 'Video Door Phone', Icon: DoorOpen },
  { id: 'Biometric Access', label: 'Biometric / Access Control', Icon: Fingerprint },
  { id: 'Network / Wiring', label: 'Network / Cabling', Icon: Network },
  { id: 'AMC / Maintenance', label: 'General Maintenance', Icon: Wrench },
  { id: 'Other', label: 'Other / Not Listed', Icon: AlertCircle },
]

const SERVICES = [
  { id: 'CCTV Surveillance', label: 'CCTV Surveillance', Icon: Camera },
  { id: 'EPABX & Telecom', label: 'EPABX / Intercom', Icon: Phone },
  { id: 'Video Door Phone', label: 'Video Door Phone', Icon: DoorOpen },
  { id: 'Biometric Access', label: 'Biometric / Access Control', Icon: Fingerprint },
  { id: 'Structured Cabling', label: 'Networking / Structured Cabling', Icon: Network },
  { id: 'AMC Maintenance', label: 'AMC / Maintenance', Icon: Wrench },
]

const FACILITY_TYPES = [
  { id: 'Residential Society', label: 'Residential Society / RWA', Icon: Home },
  { id: 'Commercial Office', label: 'Commercial Office / IT Park', Icon: Briefcase },
  { id: 'Factory / Industrial', label: 'Factory / Industrial Plant', Icon: Factory },
  { id: 'Retail / Showroom', label: 'Retail Chain / Showroom', Icon: ShoppingBag },
  { id: 'School / Institution', label: 'School / Institution', Icon: Building2 },
  { id: 'Other', label: 'Other Facility', Icon: Building2 },
]

const PRIORITIES = [
  { id: 'LOW', label: 'Low — No immediate disruption' },
  { id: 'MEDIUM', label: 'Medium — Affecting some functions' },
  { id: 'HIGH', label: 'High — Significant disruption' },
  { id: 'CRITICAL', label: 'Critical — Complete system failure' },
]
const PRIORITY_COLOR = { LOW: '#16A34A', MEDIUM: '#D97706', HIGH: '#EA580C', CRITICAL: '#B4233C' }

// ─── Small shared components ───────────────────────────────────────────────────
function StepProgress({ current, total, labels }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < total - 1 ? 1 : 'none' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 800,
              background: done ? 'var(--red-primary)' : active ? 'var(--red-primary)' : 'var(--bg-surface)',
              color: (done || active) ? '#fff' : 'var(--text-muted)',
              border: active ? '2px solid var(--red-primary)' : done ? 'none' : '2px solid var(--border-light)',
              transition: 'all 0.2s',
            }}>
              {done ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            {labels?.[i] && (
              <span className="step-label" style={{
                fontSize: '0.7rem', fontWeight: active ? 700 : 500,
                color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                marginLeft: 6, whiteSpace: 'nowrap',
              }}>{labels[i]}</span>
            )}
            {i < total - 1 && (
              <div style={{
                flex: 1, height: 2, marginLeft: labels ? 8 : 4, marginRight: 4,
                background: done ? 'var(--red-primary)' : 'var(--border-light)',
                borderRadius: 2, transition: 'background 0.2s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function OptionGrid({ options, selected, onToggle, multi = false }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
      {options.map(({ id, label, Icon }) => {
        const isSelected = multi ? selected.includes(id) : selected === id
        return (
          <button key={id} type="button" onClick={() => onToggle(id)} style={{
            padding: '14px 16px', borderRadius: 8, border: `1.5px solid ${isSelected ? 'var(--red-primary)' : 'var(--border-light)'}`,
            background: isSelected ? 'var(--bg-blush)' : 'var(--bg-card)',
            cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 7, flexShrink: 0,
              background: isSelected ? 'var(--red-primary)' : 'var(--bg-surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}>
              <Icon size={16} color={isSelected ? '#fff' : 'var(--text-muted)'} />
            </div>
            <span style={{
              fontSize: '0.8125rem', fontWeight: isSelected ? 700 : 500,
              color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
              lineHeight: 1.3,
            }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function FormField({ label, required, children, hint }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: '0.8125rem', fontWeight: 700,
        color: 'var(--text-primary)', marginBottom: 6,
      }}>
        {label}{required && <span style={{ color: 'var(--red-primary)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 5 }}>{hint}</div>}
    </div>
  )
}

function BackButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 0',
      marginBottom: 24, transition: 'color 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--red-primary)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
    >
      <ArrowLeft size={15} /> Back
    </button>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ result, onReset }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <SEO title="Request Submitted | OM Communication Works" canonical="/get-help" />
      <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{
          maxWidth: 560, width: '100%', padding: '48px 40px', textAlign: 'center',
          background: 'var(--bg-card)', borderRadius: 16,
          border: '1px solid var(--border-color)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        }}>
        <div style={{
          width: 72, height: 72, background: '#F0FDF4', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', border: '2px solid #16A34A',
        }}>
          <CheckCircle2 size={36} color="#16A34A" />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px', color: 'var(--text-primary)' }}>
          {result.type === 'ticket' ? 'Ticket Submitted' : 'Request Received'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 28px' }}>
          {result.type === 'ticket'
            ? 'Your fault report has been logged. A support technician will be assigned to review your issue.'
            : 'Your request has been received. Our team will review it and contact you within one business day.'}
        </p>
        {result.ticketNumber && (
          <div style={{
            background: 'var(--bg-blush)', border: '1px solid var(--border-red)',
            borderRadius: 12, padding: '20px 24px', marginBottom: 28,
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
              Your Support Ticket Number
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--red-primary)', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
              {result.ticketNumber}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>
              Save this number — use it to track your service status
            </div>
          </div>
        )}
        {result.inquiryId && (
          <div style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-light)',
            borderRadius: 12, padding: '16px 20px', marginBottom: 28, textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>
              Your Reference Number
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace', wordBreak: 'break-all', marginBottom: 6 }}>
              {result.inquiryId}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Save this reference number. Our team will contact you directly — you do not need to call us.
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {result.ticketNumber && (
            <Link to="/complaint" className="btn-secondary" style={{ fontSize: '0.875rem' }}>
              <Search size={15} /> Track This Ticket
            </Link>
          )}
          {result.inquiryId && (
            <Link to={`/complaint?track=${result.inquiryId}&type=inquiry`} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
              <Search size={15} /> Track This Request
            </Link>
          )}
          <button onClick={onReset} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
            Submit Another Request
          </button>
          <Link to="/" className="btn-primary" style={{ fontSize: '0.875rem' }}>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Path A: Repair / Fault Report ────────────────────────────────────────────
function RepairForm({ onBack, onSubmitted }) {
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('MEDIUM')
  const [form, setForm] = useState({ clientName: '', phone: '', installationId: '', installationAddress: '', description: '' })
  const [loading, setLoading] = useState(false)

  const stepLabels = ['System', 'Details', 'Contact']

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientName.trim() || !form.phone.trim() || !form.description.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/public/tickets', {
        clientName: form.clientName.trim(),
        phone: form.phone.trim(),
        installationId: form.installationId.trim() || undefined,
        installationAddress: form.installationAddress.trim() || undefined,
        issueCategory: category || 'Other',
        priority,
        description: form.description.trim(),
      })
      onSubmitted({ type: 'ticket', ticketNumber: data.ticketNumber })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow"><Wrench size={13} /> Repair / Fault Report</div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Report a Problem
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          Describe the issue and we will assign a technician to review it.
        </p>
      </div>

      <StepProgress current={step} total={3} labels={stepLabels} />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px 28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 16px', color: 'var(--text-primary)' }}>
                Which system has a problem?
              </h3>
              <OptionGrid options={FAULT_CATEGORIES} selected={category} onToggle={setCategory} />
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => setStep(1)}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
                Describe the problem
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <FormField label="Problem Description" required hint="What happened, when it started, and which devices are affected.">
                  <textarea className="form-input" rows={4} placeholder="e.g. Camera 3 at main gate shows black screen since yesterday. Other cameras working. DVR accessible remotely." value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 110 }} />
                </FormField>
                <FormField label="Priority Level" hint="How urgently do you need assistance?">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
                    {PRIORITIES.map(({ id, label }) => (
                      <button key={id} type="button" onClick={() => setPriority(id)} style={{
                        padding: '10px 14px', borderRadius: 7, cursor: 'pointer', textAlign: 'left',
                        border: `1.5px solid ${priority === id ? PRIORITY_COLOR[id] : 'var(--border-light)'}`,
                        background: priority === id ? `${PRIORITY_COLOR[id]}12` : 'var(--bg-card)',
                        transition: 'all 0.15s',
                      }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: priority === id ? PRIORITY_COLOR[id] : 'var(--text-secondary)' }}>{id}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>{label.split('— ')[1]}</div>
                      </button>
                    ))}
                  </div>
                </FormField>
                {priority === 'CRITICAL' && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'var(--bg-blush)', border: '1px solid var(--border-red)', borderRadius: 8, padding: '12px 16px' }}>
                    <AlertCircle size={16} color="var(--red-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: 'var(--red-primary)', fontSize: '0.83rem', fontWeight: 600, lineHeight: 1.5 }}>
                      Critical priority tickets receive expedited review. For urgent security emergencies, please also call our dispatch desk directly.
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => setStep(0)}><ChevronLeft size={16} /> Back</button>
              <button type="button" className="btn-primary" onClick={() => { if (!form.description.trim()) { toast.error('Please describe the problem.'); return; } setStep(2) }}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
                  Your contact details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <FormField label="Name" required>
                    <input className="form-input" placeholder="Your full name" value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} required />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                  </FormField>
                  <FormField label="Site Location / Address" hint="Society name, sector, or area">
                    <input className="form-input" placeholder="e.g. Sector 18, Noida" value={form.installationAddress}
                      onChange={e => setForm(f => ({ ...f, installationAddress: e.target.value }))} />
                  </FormField>
                  <FormField label="Installation or Invoice ID" hint="OM-INV-... or contract reference, if known">
                    <input className="form-input" placeholder="Optional — helps us locate your record" value={form.installationId}
                      onChange={e => setForm(f => ({ ...f, installationId: e.target.value }))} />
                  </FormField>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}><ChevronLeft size={16} /> Back</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Submitting…' : <><Send size={15} /> Submit Fault Report</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Path B: Installation / Addition ──────────────────────────────────────────
function InstallationForm({ onBack, onSubmitted }) {
  const [step, setStep] = useState(0)
  const [services, setServices] = useState([])
  const [facilityType, setFacilityType] = useState('')
  const [form, setForm] = useState({
    clientName: '', companyName: '', phone: '', email: '',
    siteLocation: '', estimatedScale: '', notes: ''
  })
  const [loading, setLoading] = useState(false)

  const toggleService = id => setServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  const stepLabels = ['Services', 'Facility', 'Contact']

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientName.trim() || !form.phone.trim()) {
      toast.error('Please enter your name and phone number.')
      return
    }
    setLoading(true)
    try {
      const descParts = ['[Installation / Addition Request]']
      if (services.length) descParts.push(`Services: ${services.join(', ')}.`)
      if (facilityType) descParts.push(`Facility: ${facilityType}.`)
      if (form.estimatedScale) descParts.push(`Approximate scale: ${form.estimatedScale}.`)
      if (form.notes.trim()) descParts.push(form.notes.trim())
      const { data } = await api.post('/public/inquiries', {
        clientName: form.clientName.trim(),
        companyName: form.companyName.trim() || undefined,
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        facilityType: facilityType || 'Not specified',
        servicesRequired: services,
        estimatedScale: form.estimatedScale || undefined,
        siteLocation: form.siteLocation.trim() || undefined,
        message: descParts.join(' '),
      })
      onSubmitted({ type: 'inquiry', inquiryId: data.inquiryId })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow"><PlusCircle size={13} /> Installation &amp; Addition</div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Book an Installation
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          Tell us what you need. We will review the scope and follow up to confirm details.
        </p>
      </div>

      <StepProgress current={step} total={3} labels={stepLabels} />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                What do you need installed or added?
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: '0 0 16px' }}>Select all that apply.</p>
              <OptionGrid options={SERVICES} selected={services} onToggle={toggleService} multi />
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => { if (!services.length) { toast.error('Please select at least one service.'); return; } setStep(1) }}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 16px', color: 'var(--text-primary)' }}>
                About the facility
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <FormField label="Facility type">
                  <OptionGrid options={FACILITY_TYPES} selected={facilityType} onToggle={setFacilityType} />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <FormField label="Approximate scale" hint="e.g. 8 cameras, 2 doors, 50-extension PBX">
                    <input className="form-input" placeholder="Rough quantity or scope" value={form.estimatedScale}
                      onChange={e => setForm(f => ({ ...f, estimatedScale: e.target.value }))} />
                  </FormField>
                  <FormField label="Site location" hint="Society, sector, or area">
                    <input className="form-input" placeholder="e.g. DLF Phase 2, Gurugram" value={form.siteLocation}
                      onChange={e => setForm(f => ({ ...f, siteLocation: e.target.value }))} />
                  </FormField>
                </div>
                <FormField label="Additional requirements or notes">
                  <textarea className="form-input" rows={3} placeholder="Anything specific about the installation — existing system, access constraints, preferred timeline…"
                    value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    style={{ resize: 'vertical' }} />
                </FormField>
              </div>
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => setStep(0)}><ChevronLeft size={16} /> Back</button>
              <button type="button" className="btn-primary" onClick={() => setStep(2)}>Next <ChevronRight size={16} /></button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
                  Your contact details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <FormField label="Name" required>
                    <input className="form-input" placeholder="Your full name" value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} required />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                  </FormField>
                  <FormField label="Company or Organisation">
                    <input className="form-input" placeholder="Optional" value={form.companyName}
                      onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
                  </FormField>
                  <FormField label="Email Address">
                    <input className="form-input" type="email" placeholder="Optional" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </FormField>
                </div>
                <div style={{ marginTop: 16, padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                    After reviewing your request, we will contact you to discuss the scope, visit your site if needed, and provide a confirmed price and schedule.
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}><ChevronLeft size={16} /> Back</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Submitting…' : <><Send size={15} /> Send Request</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Path C: Maintenance / AMC ────────────────────────────────────────────────
function AmcForm({ onBack, onSubmitted }) {
  const [step, setStep] = useState(0)
  const [systems, setSystems] = useState([])
  const [amcNeed, setAmcNeed] = useState('')
  const [form, setForm] = useState({
    clientName: '', phone: '', email: '', siteLocation: '', notes: ''
  })
  const [loading, setLoading] = useState(false)

  const toggleSystem = id => setSystems(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  const stepLabels = ['Systems', 'Requirement', 'Contact']

  const AMC_NEEDS = [
    { id: 'Routine preventive maintenance visit', label: 'Routine preventive maintenance' },
    { id: 'System health inspection and report', label: 'System health inspection' },
    { id: 'AMC contract enquiry for new coverage', label: 'AMC contract enquiry' },
    { id: 'Existing AMC — breakdown support request', label: 'Existing AMC support request' },
    { id: 'Battery or consumables replacement', label: 'Battery / consumables replacement' },
    { id: 'System upgrade or component replacement', label: 'Upgrade / component replacement' },
  ]

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientName.trim() || !form.phone.trim()) {
      toast.error('Please enter your name and phone number.')
      return
    }
    setLoading(true)
    try {
      const descParts = ['[Maintenance / AMC Enquiry]']
      if (systems.length) descParts.push(`Systems: ${systems.join(', ')}.`)
      if (amcNeed) descParts.push(`Requirement: ${amcNeed}.`)
      if (form.notes.trim()) descParts.push(form.notes.trim())
      const { data } = await api.post('/public/inquiries', {
        clientName: form.clientName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        facilityType: 'AMC / Maintenance Enquiry',
        servicesRequired: systems,
        siteLocation: form.siteLocation.trim() || undefined,
        message: descParts.join(' '),
      })
      onSubmitted({ type: 'inquiry', inquiryId: data.inquiryId })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow"><ClipboardList size={13} /> Maintenance &amp; AMC</div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Maintenance &amp; Service Contracts
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          Tell us what you have and what you need. We will get back to you with the available options.
        </p>
      </div>

      <StepProgress current={step} total={3} labels={stepLabels} />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Which systems do you have on site?
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: '0 0 16px' }}>Select all that apply.</p>
              <OptionGrid options={SERVICES} selected={systems} onToggle={toggleSystem} multi />
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => { if (!systems.length) { toast.error('Please select at least one system.'); return; } setStep(1) }}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 16px', color: 'var(--text-primary)' }}>
                What do you need?
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {AMC_NEEDS.map(({ id, label }) => (
                  <button key={id} type="button" onClick={() => setAmcNeed(id)} style={{
                    padding: '14px 16px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                    border: `1.5px solid ${amcNeed === id ? 'var(--red-primary)' : 'var(--border-light)'}`,
                    background: amcNeed === id ? 'var(--bg-blush)' : 'var(--bg-card)',
                    transition: 'all 0.15s',
                  }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: amcNeed === id ? 700 : 500, color: amcNeed === id ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <FormField label="Additional notes">
                  <textarea className="form-input" rows={3} placeholder="Any specific concerns, frequency needed, or existing contract details…"
                    value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    style={{ resize: 'vertical' }} />
                </FormField>
              </div>
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => setStep(0)}><ChevronLeft size={16} /> Back</button>
              <button type="button" className="btn-primary" onClick={() => { if (!amcNeed) { toast.error('Please select what you need.'); return; } setStep(2) }}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
                  Your contact details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <FormField label="Name" required>
                    <input className="form-input" placeholder="Your name" value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} required />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                  </FormField>
                  <FormField label="Email Address">
                    <input className="form-input" type="email" placeholder="Optional" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </FormField>
                  <FormField label="Site Location">
                    <input className="form-input" placeholder="Society / office area" value={form.siteLocation}
                      onChange={e => setForm(f => ({ ...f, siteLocation: e.target.value }))} />
                  </FormField>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}><ChevronLeft size={16} /> Back</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Submitting…' : <><Send size={15} /> Send Enquiry</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Path D: New Project / Enterprise ─────────────────────────────────────────
function ProjectForm({ onBack, onSubmitted }) {
  const [step, setStep] = useState(0)
  const [orgType, setOrgType] = useState('')
  const [systems, setSystems] = useState([])
  const [form, setForm] = useState({
    clientName: '', companyName: '', phone: '', email: '',
    siteLocation: '', estimatedScale: '', numberOfSites: '', notes: ''
  })
  const [loading, setLoading] = useState(false)

  const toggleSystem = id => setSystems(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  const stepLabels = ['Organisation', 'Scope', 'Contact']

  const ORG_TYPES = [
    { id: 'Residential Society / RWA', label: 'Residential Society / RWA', Icon: Home },
    { id: 'Commercial Office / IT Park', label: 'Office / IT Campus', Icon: Briefcase },
    { id: 'Factory / Manufacturing', label: 'Factory / Manufacturing', Icon: Factory },
    { id: 'School / College / Institution', label: 'School / Institution', Icon: Building2 },
    { id: 'Retail Chain / Mall', label: 'Retail Chain / Mall', Icon: ShoppingBag },
    { id: 'Warehouse / Logistics', label: 'Warehouse / Logistics', Icon: Building2 },
    { id: 'Hospital / Healthcare', label: 'Hospital / Healthcare', Icon: Building2 },
    { id: 'Other Organisation', label: 'Other Organisation', Icon: Building2 },
  ]

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientName.trim() || !form.phone.trim()) {
      toast.error('Please enter your name and phone number.')
      return
    }
    setLoading(true)
    try {
      const descParts = ['[New Project / Enterprise Enquiry]']
      if (orgType) descParts.push(`Organisation type: ${orgType}.`)
      if (systems.length) descParts.push(`Systems required: ${systems.join(', ')}.`)
      if (form.estimatedScale) descParts.push(`Approximate scale: ${form.estimatedScale}.`)
      if (form.numberOfSites) descParts.push(`Number of locations/sites: ${form.numberOfSites}.`)
      if (form.notes.trim()) descParts.push(form.notes.trim())
      const { data } = await api.post('/public/inquiries', {
        clientName: form.clientName.trim(),
        companyName: form.companyName.trim() || undefined,
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        facilityType: orgType || 'Enterprise / New Project',
        servicesRequired: systems,
        estimatedScale: form.estimatedScale || undefined,
        siteLocation: form.siteLocation.trim() || undefined,
        message: descParts.join(' '),
      })
      onSubmitted({ type: 'inquiry', inquiryId: data.inquiryId })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <BackButton onClick={onBack} />
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow"><Building2 size={13} /> New Project</div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          New Project or Enterprise Solution
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          Tell us about your organisation and what you need. We will arrange a site survey or consultation.
        </p>
      </div>

      <StepProgress current={step} total={3} labels={stepLabels} />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 16px', color: 'var(--text-primary)' }}>
                What type of organisation or facility is this for?
              </h3>
              <OptionGrid options={ORG_TYPES} selected={orgType} onToggle={setOrgType} />
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => { if (!orgType) { toast.error('Please select your organisation type.'); return; } setStep(1) }}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                    Which systems are required?
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: '0 0 14px' }}>Select all that apply.</p>
                  <OptionGrid options={SERVICES} selected={systems} onToggle={toggleSystem} multi />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <FormField label="Approximate scale" hint="e.g. 64 cameras, 200 extensions, 5 floors">
                    <input className="form-input" placeholder="Rough size or scope" value={form.estimatedScale}
                      onChange={e => setForm(f => ({ ...f, estimatedScale: e.target.value }))} />
                  </FormField>
                  <FormField label="Number of locations / sites" hint="For multi-site projects">
                    <input className="form-input" placeholder="e.g. 1 campus, 3 branches" value={form.numberOfSites}
                      onChange={e => setForm(f => ({ ...f, numberOfSites: e.target.value }))} />
                  </FormField>
                  <FormField label="Site location or area">
                    <input className="form-input" placeholder="e.g. Noida Expressway" value={form.siteLocation}
                      onChange={e => setForm(f => ({ ...f, siteLocation: e.target.value }))} />
                  </FormField>
                </div>
                <FormField label="Project description or additional details">
                  <textarea className="form-input" rows={4} placeholder="Describe the project — type of building, existing infrastructure, goals, any relevant timeline…"
                    value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    style={{ resize: 'vertical' }} />
                </FormField>
              </div>
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => setStep(0)}><ChevronLeft size={16} /> Back</button>
              <button type="button" className="btn-primary" onClick={() => { if (!systems.length) { toast.error('Please select at least one system.'); return; } setStep(2) }}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
                  Your contact details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <FormField label="Name" required>
                    <input className="form-input" placeholder="Your name" value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} required />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                  </FormField>
                  <FormField label="Company / Organisation Name">
                    <input className="form-input" placeholder="Recommended for project enquiries" value={form.companyName}
                      onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
                  </FormField>
                  <FormField label="Email Address">
                    <input className="form-input" type="email" placeholder="Optional" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </FormField>
                </div>
                <div style={{ marginTop: 16, padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                    We will review your project requirements and arrange a site survey or consultation before any quotation is prepared.
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}><ChevronLeft size={16} /> Back</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Submitting…' : <><Send size={15} /> Submit Project Enquiry</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Path Selector ─────────────────────────────────────────────────────────────
function PathSelector({ onSelect }) {
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <div className="eyebrow">Customer Service Portal</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.025em' }}>
          How can we help you?
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
          Choose the option that best describes what you need. Each path takes two to three minutes.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: 16 }}>
        {PATHS.map(({ id, Icon, title, description, examples, accentColor, outcome }) => (
          <motion.button
            key={id}
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(id)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: 14, padding: '28px', cursor: 'pointer', textAlign: 'left',
              display: 'flex', flexDirection: 'column', gap: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.08)` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: `${accentColor}14`,
                border: `1px solid ${accentColor}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={22} color={accentColor} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  {description}
                </p>
              </div>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {examples.map(ex => (
                <li key={ex} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
                  {ex}
                </li>
              ))}
            </ul>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: 14, borderTop: '1px solid var(--border-light)',
            }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{outcome}</span>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: `${accentColor}14`, border: `1px solid ${accentColor}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChevronRight size={15} color={accentColor} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div style={{ marginTop: 36, padding: '18px 22px', background: 'var(--bg-surface)', borderRadius: 10, border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>Already have a ticket number?</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Track the status of an existing support ticket.</div>
        </div>
        <Link to="/complaint" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '9px 20px', whiteSpace: 'nowrap' }}>
          <Search size={14} /> Track a Ticket
        </Link>
      </div>
    </div>
  )
}

// ─── Page root ─────────────────────────────────────────────────────────────────
export default function GetHelpPage() {
  const [selectedPath, setSelectedPath] = useState(null)
  const [submitted, setSubmitted] = useState(null)

  if (submitted) {
    return (
      <>
        <Navbar />
        <SuccessScreen result={submitted} onReset={() => { setSubmitted(null); setSelectedPath(null) }} />
        <Footer />
      </>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Get Help | OM Communication Works"
        description="Report a fault, book an installation, enquire about maintenance, or start a new project with OM Communication Works."
        canonical="/get-help"
      />
      <Navbar />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(96px, 14vw, 120px) 20px 80px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Get Help' }]} />

        <AnimatePresence mode="wait">
          {!selectedPath ? (
            <motion.div key="selector" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              <PathSelector onSelect={setSelectedPath} />
            </motion.div>
          ) : selectedPath === 'repair' ? (
            <motion.div key="repair" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              <RepairForm onBack={() => setSelectedPath(null)} onSubmitted={setSubmitted} />
            </motion.div>
          ) : selectedPath === 'installation' ? (
            <motion.div key="installation" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              <InstallationForm onBack={() => setSelectedPath(null)} onSubmitted={setSubmitted} />
            </motion.div>
          ) : selectedPath === 'amc' ? (
            <motion.div key="amc" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              <AmcForm onBack={() => setSelectedPath(null)} onSubmitted={setSubmitted} />
            </motion.div>
          ) : (
            <motion.div key="project" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              <ProjectForm onBack={() => setSelectedPath(null)} onSubmitted={setSubmitted} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
