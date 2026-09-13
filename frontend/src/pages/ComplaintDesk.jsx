import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { AlertCircle, Search, CheckCircle2, ArrowLeft, Send, PhoneCall } from 'lucide-react'
import api from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'

const categories = ['CCTV Surveillance', 'EPABX / Telecom', 'Video Door Phone', 'Biometric Access', 'Network / Wiring', 'AMC / Maintenance', 'Other']
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const priorityColors = {
  LOW: '#16A34A', MEDIUM: '#D97706', HIGH: '#EA580C', CRITICAL: '#B4233C'
}
const statusColors = {
  OPEN: '#D97706', IN_PROGRESS: '#2563EB', RESOLVED: '#16A34A', CLOSED: '#6B7280'
}

const initialForm = {
  clientName: '', phone: '', installationId: '', issueCategory: '',
  priority: 'MEDIUM', description: '', installationAddress: ''
}

export default function ComplaintDesk() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [trackId, setTrackId] = useState('')
  const [trackResult, setTrackResult] = useState(null)
  const [trackLoading, setTrackLoading] = useState(false)
  const [tab, setTab] = useState('submit') // 'submit' | 'track'

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

  async function handleTrack(e) {
    e.preventDefault()
    if (!trackId.trim()) return
    setTrackLoading(true)
    setTrackResult(null)
    try {
      const { data } = await api.get(`/public/tickets/track/${trackId.trim().toUpperCase()}`)
      setTrackResult(data)
    } catch {
      toast.error('Ticket not found. Please verify your ticket number.')
    } finally {
      setTrackLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <SEO title="Complaint Submitted | OM Communication" canonical="/support" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ maxWidth: 560, width: '100%', padding: '48px', textAlign: 'center', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ width: 72, height: 72, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '2px solid #16A34A' }}>
            <CheckCircle2 size={36} color="#16A34A" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px', color: '#111827' }}>Ticket Submitted!</h2>
          <p style={{ color: '#59636F', lineHeight: 1.65 }}>
            Your complaint has been logged. A support technician will be assigned to review your issue.
          </p>
          <div style={{
            background: '#FAF4F5', border: '1px solid #F2D2D7',
            borderRadius: 12, padding: '20px 24px', margin: '28px 0'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#59636F', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>Your Support Ticket Number</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#B4233C', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
              {submitted.ticketNumber}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#59636F', marginTop: 6 }}>Save this ticket number for tracking your service status</div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => { setSubmitted(null); setForm(initialForm); setTab('track'); setTrackId(submitted.ticketNumber) }}
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
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827' }}>
      <SEO
        title="Support Desk & Service Tickets | OM Communication"
        description="Log service complaints, request troubleshooting, or track existing technical support tickets for security and telecom infrastructure."
        canonical="/support"
      />
      <Navbar />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '110px 24px 80px' }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Support Desk' }]} />

        <div style={{ textAlign: 'left', marginBottom: 36 }}>
          <div style={{ color: '#B4233C', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Customer Service & Maintenance
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, margin: '0 0 10px', color: '#111827', letterSpacing: '-0.02em' }}>
            Customer Support Desk
          </h1>
          <p style={{ color: '#59636F', fontSize: '1rem', lineHeight: 1.6 }}>
            Log a technical service complaint or track the real-time status of an existing ticket.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, background: '#F6F7F8', borderRadius: 10, padding: 4, border: '1px solid #E5E7EB' }}>
          {[['submit', 'Submit New Ticket'], ['track', 'Track Existing Ticket']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem',
              background: tab === id ? '#FFFFFF' : 'transparent',
              color: tab === id ? '#111827' : '#59636F',
              boxShadow: tab === id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s'
            }}>{label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'submit' ? (
            <motion.div key="submit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <form onSubmit={handleSubmit} style={{
                background: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                padding: '36px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Client / Facility Name *</label>
                    <input className="form-input" placeholder="Your full name" value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Phone Number *</label>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Installation / Invoice ID</label>
                    <input className="form-input" placeholder="OM-INV-2024-0001 (optional)" value={form.installationId}
                      onChange={e => setForm(f => ({ ...f, installationId: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Site Location / Address</label>
                    <input className="form-input" placeholder="Society / Sector location" value={form.installationAddress}
                      onChange={e => setForm(f => ({ ...f, installationAddress: e.target.value }))} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Service Category</label>
                    <select className="form-input" value={form.issueCategory}
                      onChange={e => setForm(f => ({ ...f, issueCategory: e.target.value }))}>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Priority Level</label>
                    <select className="form-input" value={form.priority}
                      onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                      {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Problem Description *</label>
                  <textarea className="form-input" rows={4} placeholder="Describe the issue in detail — what happened, when it started, and affected cameras/extensions..."
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 110 }} required />
                </div>

                {/* Priority warning for CRITICAL */}
                {form.priority === 'CRITICAL' && (
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, background: '#FAF4F5', border: '1px solid #F2D2D7', borderRadius: 8, padding: '12px 16px' }}>
                    <AlertCircle size={16} color="#B4233C" />
                    <span style={{ color: '#B4233C', fontSize: '0.85rem', fontWeight: 600 }}>Critical priority tickets receive expedited review. For urgent emergencies, please call our dispatch desk.</span>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center', padding: '12px' }}>
                  {loading ? 'Submitting...' : <><Send size={16} /> Submit Complaint Ticket</>}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="track" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <form onSubmit={handleTrack} style={{
                background: '#FFFFFF',
                borderRadius: 14,
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                padding: '36px'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: '0 0 16px' }}>Enter your ticket number to check status</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input className="form-input" placeholder="OM-TICK-XXXXX" value={trackId}
                    onChange={e => setTrackId(e.target.value)} style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.95rem', letterSpacing: '0.05em' }} />
                  <button type="submit" disabled={trackLoading} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    <Search size={16} /> {trackLoading ? 'Searching...' : 'Track Ticket'}
                  </button>
                </div>

                {trackResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 24, background: '#F6F7F8', borderRadius: 10, padding: 24, border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                      <div>
                        <div style={{ fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 800, color: '#B4233C' }}>{trackResult.ticketNumber}</div>
                        <div style={{ color: '#59636F', fontSize: '0.8rem', marginTop: 4 }}>
                          Submitted: {new Date(trackResult.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div style={{
                        padding: '6px 14px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700,
                        background: `${statusColors[trackResult.status]}15`,
                        color: statusColors[trackResult.status],
                        border: `1px solid ${statusColors[trackResult.status]}40`
                      }}>{trackResult.status.replace('_', ' ')}</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {[
                        ['Client', trackResult.clientName],
                        ['Category', trackResult.issueCategory || 'General'],
                        ['Priority', trackResult.priority],
                        ['Assigned To', trackResult.assignedTechnician || 'Dispatch Queue'],
                      ].map(([k, v]) => (
                        <div key={k} style={{ background: '#FFFFFF', borderRadius: 8, padding: '12px 14px', border: '1px solid #E5E7EB' }}>
                          <div style={{ fontSize: '0.7rem', color: '#59636F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{k}</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: k === 'Priority' ? priorityColors[v] : '#111827' }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
