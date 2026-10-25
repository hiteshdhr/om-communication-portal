import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { AlertCircle, Search, CheckCircle2, Send, ClipboardList } from 'lucide-react'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'

const categories = ['CCTV Surveillance', 'EPABX / Telecom', 'Video Door Phone', 'Biometric Access', 'Network / Wiring', 'AMC / Maintenance', 'Other']
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const priorityColors = {
  LOW: '#16A34A', MEDIUM: '#D97706', HIGH: '#EA580C', CRITICAL: '#B4233C',
}
const ticketStatusColors = {
  OPEN: '#D97706', IN_PROGRESS: '#2563EB', RESOLVED: '#16A34A', CLOSED: '#6B7280',
}

const INQUIRY_STATUS = {
  NEW: { color: '#D97706', label: 'Under Review', next: 'Our team will review your request and contact you within one business day.' },
  CONTACTED: { color: '#2563EB', label: 'Team in Contact', next: 'Our team has reached out. Please check your phone and email.' },
  SITE_SURVEY: { color: '#7C3AED', label: 'Site Survey Arranged', next: 'A site visit is being arranged. Our team will confirm the date with you.' },
  REQUIREMENT_CONFIRMED: { color: '#0891B2', label: 'Requirements Confirmed', next: 'Your requirements have been confirmed. A quotation is being prepared.' },
  QUOTATION_PREPARING: { color: '#D97706', label: 'Quotation in Progress', next: 'We are preparing a detailed quotation for your review.' },
  QUOTED: { color: '#2563EB', label: 'Quotation Sent', next: 'A quotation has been shared with you for review and approval.' },
  NEGOTIATION: { color: '#0891B2', label: 'Under Discussion', next: 'We are working through the final details with you.' },
  WON: { color: '#16A34A', label: 'Order Confirmed', next: 'The order has been confirmed. We will contact you to schedule the work.' },
  LOST: { color: '#6B7280', label: 'Enquiry Closed', next: 'This enquiry has been closed. Contact us to discuss further.' },
  CANCELLED: { color: '#6B7280', label: 'Cancelled', next: 'This request has been cancelled. Submit a new request to start again.' },
  EXPIRED: { color: '#6B7280', label: 'Expired', next: 'This enquiry has expired. Please submit a new request if you still need assistance.' },
}

const initialForm = {
  clientName: '', phone: '', installationId: '', issueCategory: '',
  priority: 'MEDIUM', description: '', installationAddress: '',
}

function InquiryStatusResult({ inquiryResult }) {
  const cfg = INQUIRY_STATUS[inquiryResult.status] || { color: '#6B7280', label: inquiryResult.status, next: '' }
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 24, background: 'var(--bg-surface)', borderRadius: 10, padding: 24, border: '1px solid var(--border-light)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Reference ID</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
            {inquiryResult.inquiryId}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 6 }}>
            Submitted: {new Date(inquiryResult.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap',
          background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}40`,
        }}>{cfg.label}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 16 }}>
        {inquiryResult.facilityType && (
          <div style={{ background: 'var(--bg-card)', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Facility Type</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{inquiryResult.facilityType}</div>
          </div>
        )}
        {inquiryResult.servicesRequired?.length > 0 && (
          <div style={{ background: 'var(--bg-card)', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border-light)', gridColumn: inquiryResult.facilityType ? 'auto' : '1 / -1' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Services</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {inquiryResult.servicesRequired.map(s => (
                <span key={s} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 5, padding: '2px 8px' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {cfg.next && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: `${cfg.color}10`, border: `1px solid ${cfg.color}30`, borderRadius: 8, padding: '12px 14px' }}>
          <ClipboardList size={15} color={cfg.color} style={{ marginTop: 1, flexShrink: 0 }} />
          <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            <strong>Next step:</strong> {cfg.next}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function ComplaintDesk() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [tab, setTab] = useState('submit')

  const [trackType, setTrackType] = useState('ticket')
  const [ticketId, setTicketId] = useState('')
  const [ticketResult, setTicketResult] = useState(null)
  const [ticketLoading, setTicketLoading] = useState(false)

  const [inquiryId, setInquiryId] = useState('')
  const [inquiryResult, setInquiryResult] = useState(null)
  const [inquiryLoading, setInquiryLoading] = useState(false)

  const latestTicketReq = useRef(0)
  const latestInquiryReq = useRef(0)

  async function fetchTicketById(id) {
    const reqId = ++latestTicketReq.current
    setTicketLoading(true)
    setTicketResult(null)
    try {
      const { data } = await api.get(`/public/tickets/track/${id.trim().toUpperCase()}`)
      if (reqId !== latestTicketReq.current) return
      setTicketResult(data)
    } catch (err) {
      if (reqId !== latestTicketReq.current) return
      if (err.response?.status === 404) {
        toast.error('Ticket not found. Please verify your ticket number.')
      } else {
        toast.error('Unable to retrieve ticket status. Please try again.')
      }
    } finally {
      if (reqId === latestTicketReq.current) setTicketLoading(false)
    }
  }

  async function fetchInquiryById(id) {
    const reqId = ++latestInquiryReq.current
    setInquiryLoading(true)
    setInquiryResult(null)
    try {
      const { data } = await api.get(`/public/inquiries/track/${id.trim()}`)
      if (reqId !== latestInquiryReq.current) return
      setInquiryResult(data)
    } catch (err) {
      if (reqId !== latestInquiryReq.current) return
      if (err.response?.status === 404) {
        toast.error('Reference not found. Please check the ID and try again.')
      } else {
        toast.error('Unable to retrieve request status. Please try again.')
      }
    } finally {
      if (reqId === latestInquiryReq.current) setInquiryLoading(false)
    }
  }

  useEffect(() => {
    const trackParam = searchParams.get('track')
    const typeParam = searchParams.get('type')
    if (!trackParam) return
    setTab('track')
    if (typeParam === 'inquiry') {
      setTrackType('inquiry')
      setInquiryId(trackParam)
      fetchInquiryById(trackParam)
    } else {
      setTrackType('ticket')
      const id = trackParam.toUpperCase()
      setTicketId(id)
      fetchTicketById(id)
    }
  }, [searchParams])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientName || !form.phone || !form.description) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/public/tickets', form)
      setSubmitted(data)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleTicketTrack(e) {
    e.preventDefault()
    if (!ticketId.trim()) return
    await fetchTicketById(ticketId)
  }

  async function handleInquiryTrack(e) {
    e.preventDefault()
    if (!inquiryId.trim()) return
    await fetchInquiryById(inquiryId)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <SEO title="Complaint Submitted | OM Communication" canonical="/support" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ maxWidth: 560, width: '100%', padding: '48px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ width: 72, height: 72, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '2px solid #16A34A' }}>
            <CheckCircle2 size={36} color="#16A34A" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px', color: 'var(--text-primary)' }}>Ticket Submitted!</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Your complaint has been logged. A support technician will be assigned to review your issue.
          </p>
          <div style={{ background: 'var(--bg-blush)', border: '1px solid var(--border-red)', borderRadius: 12, padding: '20px 24px', margin: '28px 0' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>Your Support Ticket Number</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#B4233C', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
              {submitted.ticketNumber}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>Save this ticket number for tracking your service status</div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => { setSubmitted(null); setForm(initialForm); setTab('track'); setTrackType('ticket'); setTicketId(submitted.ticketNumber) }}
              className="btn-secondary" style={{ fontSize: '0.875rem' }}>
              Track This Ticket
            </button>
            <Link to="/" className="btn-primary" style={{ fontSize: '0.875rem' }}>Back to Home</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)' }}>
      <SEO
        title="Support Desk & Service Tickets | OM Communication"
        description="Log service complaints, request troubleshooting, or track existing technical support tickets for security and telecom infrastructure."
        canonical="/support"
      />
      <Navbar />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '110px 24px 80px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Support Desk' }]} />

        <div style={{ textAlign: 'left', marginBottom: 36 }}>
          <div style={{ color: 'var(--red-primary)', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Customer Service & Maintenance
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, margin: '0 0 10px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Customer Support Desk
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Log a technical complaint, or track the status of a repair ticket or service enquiry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 28, background: 'var(--bg-surface)', borderRadius: 10, padding: 4, border: '1px solid var(--border-light)' }}>
          {[['submit', 'Submit New Ticket'], ['track', 'Track Request']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem',
              background: tab === id ? 'var(--bg-card)' : 'transparent',
              color: tab === id ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: tab === id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s',
            }}>{label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'submit' ? (
            <motion.div key="submit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', padding: '36px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Client / Facility Name *</label>
                    <input className="form-input" placeholder="Your full name" value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Phone Number *</label>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Installation / Invoice ID</label>
                    <input className="form-input" placeholder="OM-INV-2024-0001 (optional)" value={form.installationId}
                      onChange={e => setForm(f => ({ ...f, installationId: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Site Location / Address</label>
                    <input className="form-input" placeholder="Society / Sector location" value={form.installationAddress}
                      onChange={e => setForm(f => ({ ...f, installationAddress: e.target.value }))} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Service Category</label>
                    <select className="form-input" value={form.issueCategory}
                      onChange={e => setForm(f => ({ ...f, issueCategory: e.target.value }))}>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Priority Level</label>
                    <select className="form-input" value={form.priority}
                      onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                      {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Problem Description *</label>
                  <textarea className="form-input" rows={4} placeholder="Describe the issue — what happened, when it started, and affected equipment..."
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 110 }} required />
                </div>

                {form.priority === 'CRITICAL' && (
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-blush)', border: '1px solid var(--border-red)', borderRadius: 8, padding: '12px 16px' }}>
                    <AlertCircle size={16} color="var(--red-primary)" />
                    <span style={{ color: 'var(--red-primary)', fontSize: '0.85rem', fontWeight: 600 }}>Critical priority tickets receive expedited review. For urgent emergencies, please call our dispatch desk.</span>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center', padding: '12px' }}>
                  {loading ? 'Submitting...' : <><Send size={16} /> Submit Complaint Ticket</>}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="track" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', padding: '36px' }}>

                <div style={{ display: 'flex', gap: 6, marginBottom: 28, background: 'var(--bg-surface)', borderRadius: 8, padding: 4, border: '1px solid var(--border-light)' }}>
                  {[['ticket', 'Repair Ticket'], ['inquiry', 'Service Enquiry']].map(([id, label]) => (
                    <button type="button" key={id} onClick={() => { setTrackType(id); setTicketResult(null); setInquiryResult(null) }} style={{
                      flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem',
                      background: trackType === id ? 'var(--bg-card)' : 'transparent',
                      color: trackType === id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      boxShadow: trackType === id ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.15s',
                    }}>{label}</button>
                  ))}
                </div>

                {trackType === 'ticket' && (
                  <form onSubmit={handleTicketTrack}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                      Enter the ticket number from your repair or fault report.
                    </p>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <input className="form-input" placeholder="OM-TICK-XXXXX" value={ticketId}
                        onChange={e => setTicketId(e.target.value)} style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.95rem', letterSpacing: '0.05em' }} />
                      <button type="submit" disabled={ticketLoading} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                        <Search size={16} /> {ticketLoading ? 'Searching...' : 'Track Ticket'}
                      </button>
                    </div>

                    {ticketResult && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: 24, background: 'var(--bg-surface)', borderRadius: 10, padding: 24, border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                          <div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 800, color: 'var(--red-primary)' }}>{ticketResult.ticketNumber}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 4 }}>
                              Submitted: {new Date(ticketResult.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                          <div style={{
                            padding: '6px 14px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700,
                            background: `${ticketStatusColors[ticketResult.status]}15`,
                            color: ticketStatusColors[ticketResult.status],
                            border: `1px solid ${ticketStatusColors[ticketResult.status]}40`,
                          }}>{ticketResult.status.replace('_', ' ')}</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
                          {[
                            ['Client', ticketResult.clientName],
                            ['Category', ticketResult.issueCategory || 'General'],
                            ['Priority', ticketResult.priority],
                            ['Assigned To', ticketResult.assignedTechnician || 'Dispatch Queue'],
                          ].map(([k, v]) => (
                            <div key={k} style={{ background: 'var(--bg-card)', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border-light)' }}>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{k}</div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: k === 'Priority' ? priorityColors[v] : 'var(--text-primary)' }}>{v}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}

                {trackType === 'inquiry' && (
                  <form onSubmit={handleInquiryTrack}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                      Enter the reference ID from your installation, AMC or project enquiry confirmation.
                    </p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <input className="form-input" placeholder="e.g. a1b2c3d4-e5f6-…" value={inquiryId}
                        onChange={e => setInquiryId(e.target.value)}
                        style={{ flex: 1, minWidth: 200, fontFamily: 'monospace', fontSize: '0.88rem', letterSpacing: '0.03em' }} />
                      <button type="submit" disabled={inquiryLoading} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                        <Search size={16} /> {inquiryLoading ? 'Searching...' : 'Track Enquiry'}
                      </button>
                    </div>

                    {inquiryResult && <InquiryStatusResult inquiryResult={inquiryResult} />}
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
