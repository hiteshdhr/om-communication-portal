import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { AlertCircle, Search, CheckCircle2, ArrowLeft, Send } from 'lucide-react'
import api from '../api'
import Navbar from '../components/Navbar'

const categories = ['CCTV Surveillance', 'EPABX / Telecom', 'Video Door Phone', 'Biometric Access', 'Network / Wiring', 'Other']
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const priorityColors = {
  LOW: '#22c55e', MEDIUM: '#f59e0b', HIGH: '#FF9F0D', CRITICAL: '#ef4444'
}
const statusColors = {
  OPEN: '#f59e0b', IN_PROGRESS: '#0066FF', RESOLVED: '#22c55e', CLOSED: '#64748b'
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
      <div style={{ minHeight: '100vh', background: '#0B192C', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="glass-card" style={{ maxWidth: 560, width: '100%', padding: '56px 48px', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, background: 'rgba(34,197,94,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '2px solid rgba(34,197,94,0.4)' }}>
            <CheckCircle2 size={36} color="#22c55e" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px' }}>Ticket Submitted!</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Your complaint has been logged. A technician will be assigned within 4 business hours.
          </p>
          <div style={{
            background: 'rgba(255,159,13,0.08)', border: '1px solid rgba(255,159,13,0.25)',
            borderRadius: 12, padding: '20px 24px', margin: '28px 0'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>Your Ticket Number</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FF9F0D', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
              {submitted.ticketNumber}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 6 }}>Save this for tracking your complaint status</div>
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
    <div style={{ minHeight: '100vh', background: '#0B192C' }}>
      <Navbar />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem', marginBottom: 24 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, margin: '0 0 10px' }}>Customer Support Desk</h1>
          <p style={{ color: '#94A3B8' }}>Log a service complaint or track an existing support ticket.</p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 32, background: 'rgba(11,25,44,0.8)', borderRadius: 12, padding: 4, border: '1px solid rgba(255,255,255,0.07)' }}>
          {[['submit', 'Submit New Ticket'], ['track', 'Track Existing Ticket']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: '11px', borderRadius: 9, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
              background: tab === id ? '#0066FF' : 'transparent',
              color: tab === id ? 'white' : '#94A3B8',
              transition: 'all 0.2s'
            }}>{label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'submit' ? (
            <motion.div key="submit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '36px 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label className="form-label">Client Name *</label>
                    <input className="form-input" placeholder="Your full name" value={form.clientName}
                      onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Installation / Invoice ID</label>
                    <input className="form-input" placeholder="OM-INV-2024-0001" value={form.installationId}
                      onChange={e => setForm(f => ({ ...f, installationId: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Installation Address</label>
                    <input className="form-input" placeholder="Site address" value={form.installationAddress}
                      onChange={e => setForm(f => ({ ...f, installationAddress: e.target.value }))} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
                  <div>
                    <label className="form-label">Service Category</label>
                    <select className="form-input" value={form.issueCategory}
                      onChange={e => setForm(f => ({ ...f, issueCategory: e.target.value }))}>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Priority Level</label>
                    <select className="form-input" value={form.priority}
                      onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                      {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <label className="form-label">Problem Description *</label>
                  <textarea className="form-input" rows={4} placeholder="Describe the issue in detail — what happened, when it started, what you've already tried..."
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 110 }} />
                </div>

                {/* Priority warning for CRITICAL */}
                {form.priority === 'CRITICAL' && (
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 16px' }}>
                    <AlertCircle size={16} color="#ef4444" />
                    <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>Critical priority tickets are escalated immediately. For emergencies, call us directly.</span>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
                  {loading ? 'Submitting...' : <><Send size={16} /> Submit Complaint Ticket</>}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="track" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <form onSubmit={handleTrack} className="glass-card" style={{ padding: '36px 40px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 20px' }}>Enter your ticket number to check status</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input className="form-input" placeholder="OM-TICK-XXXXX" value={trackId}
                    onChange={e => setTrackId(e.target.value)} style={{ flex: 1, fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '0.05em' }} />
                  <button type="submit" disabled={trackLoading} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    <Search size={16} /> {trackLoading ? 'Searching...' : 'Track Ticket'}
                  </button>
                </div>

                {trackResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 28, background: 'rgba(11,25,44,0.7)', borderRadius: 14, padding: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                      <div>
                        <div style={{ fontFamily: 'monospace', fontSize: '1.125rem', fontWeight: 800, color: '#FF9F0D' }}>{trackResult.ticketNumber}</div>
                        <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 4 }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      {[
                        ['Client', trackResult.clientName],
                        ['Category', trackResult.issueCategory || 'General'],
                        ['Priority', trackResult.priority],
                        ['Assigned To', trackResult.assignedTechnician],
                      ].map(([k, v]) => (
                        <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px' }}>
                          <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{k}</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: k === 'Priority' ? priorityColors[v] : '#F8FAFC' }}>{v}</div>
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
    </div>
  )
}
