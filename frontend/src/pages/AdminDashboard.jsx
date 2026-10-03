import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  LogOut, TrendingUp, AlertTriangle, FileText, DollarSign,
  Plus, X, MessageCircle, Trash2,
  LayoutDashboard, Inbox, TicketIcon, RefreshCw, Wrench,
  Calendar, Menu, Sun, Moon, Settings, ClipboardList,
  CheckCircle2, Clock, AlertCircle, Building2, CreditCard, Mail, Database
} from 'lucide-react'
import api from '../api'
import logo from '../assets/ocw-logo.png'
import { useTheme } from '../utils/theme.jsx'
import CreateDocumentModal from '../components/CreateDocumentModal'

// ─── Helper Functions ──────────────────────────────────────────────────────────
const fmtCurrency = v => `₹${Number(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const statusColor = {
  NEW: '#60a5fa',
  CONTACTED: '#a78bfa',
  SITE_SURVEY: '#06b6d4',
  REQUIREMENT_CONFIRMED: '#38bdf8',
  QUOTATION_PREPARING: '#f59e0b',
  QUOTED: '#fbbf24',
  NEGOTIATION: '#e879f9',
  WON: '#4ade80',
  LOST: '#f87171',
  CANCELLED: '#94a3b8',
  EXPIRED: '#64748b',

  // Ticket & Survey statuses
  OPEN: '#fbbf24',
  IN_PROGRESS: '#60a5fa',
  RESOLVED: '#4ade80',
  CLOSED: '#64748b',
  SCHEDULED: '#06b6d4',
  COMPLETED: '#4ade80',
  PAID: '#4ade80',
  PENDING: '#fbbf24'
}

const priorityColor = { LOW: '#4ade80', MEDIUM: '#fbbf24', HIGH: '#FF9F0D', CRITICAL: '#ef4444' }

const INQUIRY_STATUSES = [
  'NEW', 'CONTACTED', 'SITE_SURVEY', 'REQUIREMENT_CONFIRMED',
  'QUOTATION_PREPARING', 'QUOTED', 'NEGOTIATION', 'WON', 'LOST', 'CANCELLED', 'EXPIRED'
]
const TICKET_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']
const SURVEY_STATUSES = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']

function StatusBadge({ value }) {
  const col = statusColor[value] || '#94A3B8'
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700,
      letterSpacing: '0.05em', background: `${col}15`, color: col, border: `1px solid ${col}35`,
      whiteSpace: 'nowrap'
    }}>{value?.replace(/_/g, ' ')}</span>
  )
}

// ─── Modal: Schedule Site Survey ───────────────────────────────────────────────
function ScheduleSurveyModal({ inquiry, onClose, onCreated }) {
  const [form, setForm] = useState({
    siteAddress: inquiry?.facilityType || '',
    contactPerson: inquiry?.clientName || '',
    contactPhone: inquiry?.phone || '',
    scheduledDate: new Date().toISOString().split('T')[0],
    technicianAssigned: '',
    surveyNotes: inquiry?.message || '',
    existingInfrastructure: '',
    recommendedSolution: ''
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.siteAddress) { toast.error('Site address is required.'); return }
    setLoading(true)
    try {
      const { data } = await api.post(`/admin/site-surveys/inquiry/${inquiry.id}`, form)
      toast.success('Site survey scheduled successfully!')
      onCreated(data)
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to schedule survey.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="glass-card" style={{ maxWidth: 640, width: '100%', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>Schedule Site Survey</h2>
            <div style={{ fontSize: '0.8rem', color: '#A8BCCC', marginTop: 4 }}>For Lead: {inquiry?.clientName} ({inquiry?.companyName || inquiry?.facilityType})</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label className="form-label">Contact Person</label>
              <input className="form-input" value={form.contactPerson} onChange={e => setForm(f => ({ ...f, contactPerson: e.target.value }))} required />
            </div>
            <div>
              <label className="form-label">Contact Phone</label>
              <input className="form-input" value={form.contactPhone} onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))} required />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Site Address & Location</label>
              <input className="form-input" placeholder="e.g. Tower 4, Indirapuram, Ghaziabad" value={form.siteAddress} onChange={e => setForm(f => ({ ...f, siteAddress: e.target.value }))} required />
            </div>
            <div>
              <label className="form-label">Scheduled Date</label>
              <input className="form-input" type="date" value={form.scheduledDate} onChange={e => setForm(f => ({ ...f, scheduledDate: e.target.value }))} required />
            </div>
            <div>
              <label className="form-label">Assign Technician</label>
              <input className="form-input" placeholder="e.g. Ramesh Kumar" value={form.technicianAssigned} onChange={e => setForm(f => ({ ...f, technicianAssigned: e.target.value }))} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Survey Notes / Client Instructions</label>
              <textarea className="form-input" rows={2} value={form.surveyNotes} onChange={e => setForm(f => ({ ...f, surveyNotes: e.target.value }))} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
              <Calendar size={16} /> {loading ? 'Scheduling...' : 'Confirm Site Survey'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Navigation Structure ──────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'OPERATIONS',
    items: [
      { id: 'leads', label: 'Leads & Enquiries', icon: Inbox },
      { id: 'surveys', label: 'Site Surveys', icon: Wrench },
      { id: 'tickets', label: 'Support Desk', icon: TicketIcon },
      { id: 'invoices', label: 'Documents', icon: FileText },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings & Log', icon: Settings },
    ]
  }
]

// ─── Main Admin Dashboard ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [metrics, setMetrics] = useState(null)
  const [inquiries, setInquiries] = useState([])
  const [surveys, setSurveys] = useState([])
  const [tickets, setTickets] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [settingsData, setSettingsData] = useState(null)
  const [auditLogs, setAuditLogs] = useState([])
  const [auditFilter, setAuditFilter] = useState('')
  const [settingsLoading, setSettingsLoading] = useState(false)
  // True when one or more dashboard API calls fail for a non-auth reason
  // (e.g. backend down, DB error). Surfaced as a banner instead of silently
  // rendering empty/placeholder metrics.
  const [loadError, setLoadError] = useState(false)

  // Modals
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [docFilter, setDocFilter] = useState('ALL')
  const [surveyInquiry, setSurveyInquiry] = useState(null)

  const navGroups = NAV_GROUPS
  const tabs = NAV_GROUPS.flatMap(g => g.items)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    let anyError = false
    // Use independent calls so one failure does not destroy the entire dashboard.
    const safeGet = async (url, fallback) => {
      try {
        const res = await api.get(url)
        return res
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error('Session expired. Please log in.')
          localStorage.removeItem('om_admin_token')
          navigate('/admin/login')
          throw err
        }
        // Non-auth failure (backend/network/DB) — record it so the UI can
        // show a real error state rather than a misleading empty dashboard.
        anyError = true
        return { data: fallback }
      }
    }

    try {
      const [m, inq, surv, tick, inv] = await Promise.all([
        safeGet('/admin/dashboard/metrics', {}),
        safeGet('/admin/inquiries', []),
        safeGet('/admin/site-surveys', []),
        safeGet('/admin/tickets', []),
        safeGet('/admin/invoices', []),
      ])
      setLoadError(anyError)
      setMetrics(m.data || {})
      setInquiries(Array.isArray(inq.data) ? inq.data : [])
      setSurveys(Array.isArray(surv.data) ? surv.data : [])
      setTickets(Array.isArray(tick.data) ? tick.data : [])
      setInvoices(Array.isArray(inv.data) ? inv.data : [])
    } catch (err) {
      // safeGet already handled 401/403 above; other errors here are navigation-related
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    const token = localStorage.getItem('om_admin_token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchAll()
  }, [fetchAll, navigate])

  function logout() {
    localStorage.removeItem('om_admin_token')
    localStorage.removeItem('om_admin_user')
    toast.success('Logged out.')
    navigate('/admin/login')
  }

  async function updateInquiryStatus(id, status) {
    try {
      await api.put(`/admin/inquiries/${id}/status`, { status })
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
      toast.success('Lead status updated.')
    } catch {
      toast.error('Failed to update status.')
    }
  }

  async function updateSurveyStatus(surveyId, status) {
    try {
      await api.patch(`/admin/site-surveys/${surveyId}`, { status })
      setSurveys(prev => prev.map(s => s.id === surveyId ? { ...s, status } : s))
      toast.success('Survey status updated.')
      fetchAll()
    } catch {
      toast.error('Failed to update survey.')
    }
  }

  async function updateTicketStatus(id, status) {
    try {
      await api.put(`/admin/tickets/${id}`, { status })
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t))
      toast.success('Ticket status updated.')
    } catch {
      toast.error('Failed to update ticket.')
    }
  }

  async function assignTechnician(id, technician) {
    try {
      await api.put(`/admin/tickets/${id}`, { assignedTechnician: technician })
      setTickets(prev => prev.map(t => t.id === id ? { ...t, assignedTechnician: technician } : t))
      toast.success('Technician assigned.')
    } catch {
      toast.error('Failed to assign technician.')
    }
  }

  async function deleteInquiry(id) {
    if (!window.confirm('Permanently delete this lead / inquiry?')) return
    try {
      await api.delete(`/admin/inquiries/${id}`)
      setInquiries(prev => prev.filter(i => i.id !== id))
      toast.success('Lead deleted.')
    } catch {
      toast.error('Failed to delete lead.')
    }
  }

  async function deleteTicket(id) {
    if (!window.confirm('Permanently delete this support ticket?')) return
    try {
      await api.delete(`/admin/tickets/${id}`)
      setTickets(prev => prev.filter(t => t.id !== id))
      toast.success('Ticket deleted.')
    } catch {
      toast.error('Failed to delete ticket.')
    }
  }

  async function deleteInvoice(id, doc) {
    const docLabel = doc ? `${doc.documentType?.replace('_', ' ')} — ${doc.invoiceNumber} (${doc.clientName})` : 'this document'
    if (!window.confirm(`DELETE ${docLabel}?\n\nThis action cannot be undone. PAID documents cannot be deleted.\n\nClick OK to confirm deletion.`)) return
    try {
      await api.delete(`/admin/invoices/${id}`)
      setInvoices(prev => prev.filter(i => i.id !== id))
      toast.success('Document deleted successfully.')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete document. PAID documents cannot be deleted.')
    }
  }

  // Open the unified Document creation modal (QUOTATION) pre-filled from a lead.
  // Routes the "Quote" action through the single Document Management workflow
  // so quotations are real, persisted documents (no separate print-only generator).
  function openQuoteForLead(inq) {
    const subjectParts = inq?.servicesRequired?.length
      ? `QUOTATION FOR ${inq.servicesRequired.join(', ').toUpperCase()}`
      : 'QUOTATION FOR SECURITY & TELECOM SYSTEM'
    setSelectedDoc({
      documentType: 'QUOTATION',
      clientName: inq?.clientName || '',
      clientPhone: inq?.phone || '',
      clientEmail: inq?.email || '',
      clientAddress: inq?.address || '',
      subject: subjectParts,
    })
    setShowDocumentModal(true)
  }

  function sharePaymentLink(inv) {
    const link = `${window.location.origin}/pay/${inv.invoiceNumber}`
    const docTitle = inv.documentType === 'QUOTATION' ? 'Quotation' : inv.documentType === 'BILL' ? 'Bill' : 'Invoice'
    const msg = `*${docTitle} from Om Communication Works*\n\n${docTitle} No: ${inv.invoiceNumber}\nClient: ${inv.clientName}\nAmount: ${fmtCurrency(inv.totalAmount)}\n\nView document:\n${link}\n\n— Om Communication Works | +91 72177 15296`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  async function fetchSettings() {
    setSettingsLoading(true)
    try {
      const [settRes, logRes] = await Promise.all([
        api.get('/admin/settings'),
        api.get('/admin/audit-logs?limit=100'),
      ])
      setSettingsData(settRes.data)
      setAuditLogs(Array.isArray(logRes.data) ? logRes.data : [])
    } catch (err) {
      toast.error('Failed to load settings.')
    } finally {
      setSettingsLoading(false)
    }
  }



  const metricCards = [
    { label: 'Total Inquiries', value: metrics?.totalInquiries ?? '—', icon: Inbox, color: '#B4233C', sub: 'All time service leads' },
    { label: 'New Leads', value: metrics?.newLeads ?? '—', icon: TrendingUp, color: '#3E6F8F', sub: 'Awaiting initial contact' },
    { label: 'Site Surveys', value: metrics?.siteSurveysScheduled ?? '—', icon: Wrench, color: '#B7791F', sub: 'Scheduled inspections' },
    { label: 'Active Complaints', value: metrics?.activeComplaints ?? '—', icon: AlertTriangle, color: '#C93636', sub: 'Open + In-progress tickets' },
    { label: 'Total Revenue', value: metrics?.totalRevenue !== undefined ? fmtCurrency(metrics.totalRevenue) : '—', icon: DollarSign, color: '#18864B', sub: 'Paid invoices' },
    { label: 'Outstanding', value: metrics?.outstandingPayments !== undefined ? fmtCurrency(metrics.outstandingPayments) : '—', icon: FileText, color: '#B7791F', sub: 'Pending invoices' },
  ]

  const filteredInquiries = inquiries.filter(i =>
    !search || i.clientName?.toLowerCase().includes(search.toLowerCase()) ||
    i.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    i.phone?.includes(search)
  )

  const [mobileAdminNav, setMobileAdminNav] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)', transition: 'background-color 0.3s ease' }}>
      {/* Mobile Top Header */}
      <header className="mobile-admin-header" style={{
        display: 'none',
        height: 60,
        background: 'var(--bg-charcoal)',
        borderBottom: '1px solid var(--border-charcoal)',
        padding: '0 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logo} alt="Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-on-dark)' }}>OCW Operations</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ background: 'none', border: 'none', color: 'var(--text-on-dark)', cursor: 'pointer', padding: 6 }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} color="#FBBF24" />}
          </button>
          <button
            onClick={() => setMobileAdminNav(o => !o)}
            style={{ background: 'none', border: 'none', color: 'var(--text-on-dark)', cursor: 'pointer', padding: 6 }}
          >
            {mobileAdminNav ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <aside className={`admin-sidebar ${mobileAdminNav ? 'mobile-open' : ''}`} style={{
          width: 260,
          background: 'var(--bg-charcoal)',
          borderRight: '1px solid var(--border-charcoal)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-charcoal)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={logo} alt="Logo" style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-on-dark)' }}>OCW Operations</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--red-primary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Command Center</div>
            </div>
          </div>

          <nav style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1, overflowY: 'auto' }}>
            {navGroups.map(group => (
              <div key={group.title}>
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: 'var(--text-faint)',
                  letterSpacing: '0.12em',
                  padding: '0 12px 8px',
                  textTransform: 'uppercase',
                }}>
                  {group.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {group.items.map(t => {
                    const active = activeTab === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => { setActiveTab(t.id); setMobileAdminNav(false) }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 14px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          border: 'none',
                          background: active ? 'var(--red-primary)' : 'transparent',
                          color: active ? '#FFFFFF' : 'var(--text-on-dark-sub)',
                          fontWeight: active ? 700 : 500,
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          transition: 'all 0.15s'
                        }}
                      >
                        <t.icon size={18} color={active ? '#FFFFFF' : 'var(--text-on-dark-sub)'} />
                        <span>{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

        <div style={{ padding: 16, borderTop: '1px solid var(--border-charcoal)' }}>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 6,
              cursor: 'pointer',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.08)',
              color: '#f87171',
              fontWeight: 600,
              fontSize: '0.84rem',
              width: '100%'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '28px 36px', overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Om Communication Work Management Portal
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={fetchAll} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8125rem' }}>
              <RefreshCw size={14} /> Refresh Data
            </button>
            {activeTab === 'invoices' && (
              <button onClick={() => { setSelectedDoc(null); setShowDocumentModal(true) }} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
                <Plus size={15} /> Create Document
              </button>
            )}
            {activeTab === 'settings' && (
              <button onClick={fetchSettings} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8125rem' }}>
                <RefreshCw size={14} /> Refresh
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>Loading dashboard data...</div>
        ) : (
          <>
            {/* Real error banner — shown when a dashboard API call failed for a
                non-auth reason, so an empty dashboard is never mistaken for "no data". */}
            {loadError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', marginBottom: 20, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: 10 }}>
                <AlertTriangle size={20} color="#F87171" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#F87171', fontSize: '0.9rem' }}>Some dashboard data failed to load.</div>
                  <div style={{ color: '#FCA5A5', fontSize: '0.8rem', marginTop: 2 }}>Figures shown may be incomplete. Check your connection or the server, then retry.</div>
                </div>
                <button onClick={fetchAll} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                  <RefreshCw size={14} /> Retry
                </button>
              </div>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                  {metricCards.map(m => (
                    <div key={m.label} className="glass-card" style={{ padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>{m.label}</span>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <m.icon size={18} color={m.color} />
                        </div>
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>{m.value}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Leads Preview */}
                <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Recent Leads & Enquiries</h3>
                    <button onClick={() => setActiveTab('leads')} style={{ background: 'none', border: 'none', color: '#C5A03F', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>
                      View All Leads →
                    </button>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(197,160,63,0.15)', color: '#94A3B8', textAlign: 'left' }}>
                          <th style={{ padding: '10px 12px' }}>Client</th>
                          <th style={{ padding: '10px 12px' }}>Facility</th>
                          <th style={{ padding: '10px 12px' }}>Services</th>
                          <th style={{ padding: '10px 12px' }}>Status</th>
                          <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map(inq => (
                          <tr key={inq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '12px' }}>
                              <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{inq.clientName}</div>
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{inq.phone}</div>
                            </td>
                            <td style={{ padding: '12px' }}>{inq.facilityType || '—'}</td>
                            <td style={{ padding: '12px' }}>{inq.servicesRequired?.join(', ') || '—'}</td>
                            <td style={{ padding: '12px' }}><StatusBadge value={inq.status} /></td>
                            <td style={{ padding: '12px', textAlign: 'right' }}>
                              <button
                                onClick={() => openQuoteForLead(inq)}
                                style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(197,160,63,0.15)', border: '1px solid rgba(197,160,63,0.3)', color: '#FBF6E0', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                              >
                                Prepare Quote
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ marginBottom: 20 }}>
                  <input
                    className="form-input"
                    placeholder="Search by client name, company, or phone..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ maxWidth: 360 }}
                  />
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(197,160,63,0.18)', color: '#94A3B8', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Date</th>
                        <th style={{ padding: '12px' }}>Client & Contact</th>
                        <th style={{ padding: '12px' }}>Facility</th>
                        <th style={{ padding: '12px' }}>Services Required</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map(inq => (
                        <tr key={inq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <td style={{ padding: '14px 12px', color: '#94A3B8', fontSize: '0.78rem' }}>{fmtDate(inq.createdAt)}</td>
                          <td style={{ padding: '14px 12px' }}>
                            <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{inq.clientName}</div>
                            {inq.companyName && <div style={{ fontSize: '0.75rem', color: '#C5A03F' }}>{inq.companyName}</div>}
                            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{inq.phone}</div>
                          </td>
                          <td style={{ padding: '14px 12px' }}>{inq.facilityType}</td>
                          <td style={{ padding: '14px 12px' }}>{inq.servicesRequired?.join(', ')}</td>
                          <td style={{ padding: '14px 12px' }}>
                            <select
                              value={inq.status}
                              onChange={e => updateInquiryStatus(inq.id, e.target.value)}
                              style={{
                                background: '#0D2040',
                                border: '1px solid rgba(197,160,63,0.3)',
                                color: statusColor[inq.status] || '#FFFFFF',
                                padding: '4px 8px',
                                borderRadius: 6,
                                fontSize: '0.75rem',
                                fontWeight: 700
                              }}
                            >
                              {INQUIRY_STATUSES.map(st => (
                                <option key={st} value={st}>{st.replace(/_/g, ' ')}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setSurveyInquiry(inq)}
                                title="Schedule Site Survey"
                                style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                              >
                                Survey
                              </button>
                              <button
                                onClick={() => openQuoteForLead(inq)}
                                title="Create Formal Quotation"
                                style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(197,160,63,0.15)', border: '1px solid rgba(197,160,63,0.3)', color: '#FBF6E0', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                              >
                                Quote
                              </button>
                              <button
                                onClick={() => deleteInquiry(inq.id)}
                                title="Delete Lead"
                                style={{ padding: '5px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', cursor: 'pointer' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SITE SURVEYS TAB */}
            {activeTab === 'surveys' && (
              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Site Surveys & Field Inspections</h3>
                </div>

                {surveys.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
                    No site surveys scheduled yet. Go to "Leads" tab and click "Survey" on any lead to schedule one.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(197,160,63,0.18)', color: '#94A3B8', textAlign: 'left' }}>
                          <th style={{ padding: '12px' }}>Scheduled Date</th>
                          <th style={{ padding: '12px' }}>Site Address & Contact</th>
                          <th style={{ padding: '12px' }}>Technician Assigned</th>
                          <th style={{ padding: '12px' }}>Survey Notes</th>
                          <th style={{ padding: '12px' }}>Status</th>
                          <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {surveys.map(sv => (
                          <tr key={sv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <td style={{ padding: '14px 12px', color: '#C5A03F', fontWeight: 700 }}>{sv.scheduledDate || '—'}</td>
                            <td style={{ padding: '14px 12px' }}>
                              <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{sv.contactPerson}</div>
                              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{sv.siteAddress}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Ph: {sv.contactPhone}</div>
                            </td>
                            <td style={{ padding: '14px 12px', color: '#FBF6E0' }}>{sv.technicianAssigned || 'Unassigned'}</td>
                            <td style={{ padding: '14px 12px', color: '#94A3B8', fontSize: '0.8rem', maxWidth: 220 }}>{sv.surveyNotes || '—'}</td>
                            <td style={{ padding: '14px 12px' }}>
                              <select
                                value={sv.status}
                                onChange={e => updateSurveyStatus(sv.id, e.target.value)}
                                style={{
                                  background: '#0D2040',
                                  border: '1px solid rgba(197,160,63,0.3)',
                                  color: statusColor[sv.status] || '#FFFFFF',
                                  padding: '4px 8px',
                                  borderRadius: 6,
                                  fontSize: '0.75rem',
                                  fontWeight: 700
                                }}
                              >
                                {SURVEY_STATUSES.map(st => (
                                  <option key={st} value={st}>{st}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                              <button
                                onClick={() => updateSurveyStatus(sv.id, 'COMPLETED')}
                                style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', color: '#22c55e', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                              >
                                Mark Complete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SUPPORT TICKETS TAB */}
            {activeTab === 'tickets' && (
              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(197,160,63,0.18)', color: '#94A3B8', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Ticket #</th>
                        <th style={{ padding: '12px' }}>Client</th>
                        <th style={{ padding: '12px' }}>Issue Category</th>
                        <th style={{ padding: '12px' }}>Priority</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px' }}>Technician</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Del</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map(t => (
                        <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <td style={{ padding: '14px 12px', fontFamily: 'monospace', fontWeight: 700, color: '#C5A03F' }}>{t.ticketNumber}</td>
                          <td style={{ padding: '14px 12px' }}>
                            <div style={{ fontWeight: 700 }}>{t.clientName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{t.phone}</div>
                          </td>
                          <td style={{ padding: '14px 12px' }}>{t.issueCategory}</td>
                          <td style={{ padding: '14px 12px' }}>
                            <span style={{ color: priorityColor[t.priority] || '#FFFFFF', fontWeight: 700, fontSize: '0.75rem' }}>{t.priority}</span>
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <select
                              value={t.status}
                              onChange={e => updateTicketStatus(t.id, e.target.value)}
                              style={{
                                background: '#0D2040',
                                border: '1px solid rgba(197,160,63,0.3)',
                                color: statusColor[t.status] || '#FFFFFF',
                                padding: '4px 8px',
                                borderRadius: 6,
                                fontSize: '0.75rem',
                                fontWeight: 700
                              }}
                            >
                              {TICKET_STATUSES.map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <input
                              className="form-input"
                              placeholder="Assign technician..."
                              defaultValue={t.assignedTechnician || ''}
                              onBlur={e => {
                                if (e.target.value !== (t.assignedTechnician || '')) {
                                  assignTechnician(t.id, e.target.value)
                                }
                              }}
                              style={{ fontSize: '0.78rem', padding: '4px 8px', minWidth: 140 }}
                            />
                          </td>
                          <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                            <button
                              onClick={() => deleteTicket(t.id)}
                              title="Delete Ticket"
                              style={{ padding: '5px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', cursor: 'pointer' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DOCUMENTS / INVOICES TAB */}
            {activeTab === 'invoices' && (
              <div className="glass-card" style={{ padding: 24 }}>
                {/* Filter Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[
                      { id: 'ALL', label: 'All Documents' },
                      { id: 'QUOTATION', label: 'Quotations' },
                      { id: 'TAX_INVOICE', label: 'Tax Invoices' },
                      { id: 'BILL', label: 'Bills (Non-GST)' },
                      { id: 'PENDING', label: 'Pending' },
                      { id: 'PAID', label: 'Paid' },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setDocFilter(f.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 6,
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: docFilter === f.id ? 'var(--red-primary)' : 'rgba(255,255,255,0.06)',
                          color: docFilter === f.id ? '#FFFFFF' : '#94A3B8',
                          border: docFilter === f.id ? '1px solid var(--red-primary)' : '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => { setSelectedDoc(null); setShowDocumentModal(true) }}
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    <Plus size={14} /> CREATE DOCUMENT +
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(197,160,63,0.18)', color: '#94A3B8', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Document #</th>
                        <th style={{ padding: '12px' }}>Type</th>
                        <th style={{ padding: '12px' }}>Customer / Company</th>
                        <th style={{ padding: '12px' }}>Amount</th>
                        <th style={{ padding: '12px' }}>Date</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices
                        .filter(inv => {
                          if (docFilter === 'ALL') return true
                          if (docFilter === 'QUOTATION') return inv.documentType === 'QUOTATION' || inv.invoiceNumber?.startsWith('OCW-Q-')
                          if (docFilter === 'TAX_INVOICE') return inv.documentType === 'TAX_INVOICE' || inv.invoiceNumber?.startsWith('OCW-INV-') || !inv.documentType
                          if (docFilter === 'BILL') return inv.documentType === 'BILL' || inv.invoiceNumber?.startsWith('OCW-B-')
                          if (docFilter === 'PENDING') return inv.status === 'PENDING'
                          if (docFilter === 'PAID') return inv.status === 'PAID'
                          return true
                        })
                        .map(inv => {
                          const isQuote = inv.documentType === 'QUOTATION' || inv.invoiceNumber?.startsWith('OCW-Q-')
                          const isBill = inv.documentType === 'BILL' || inv.invoiceNumber?.startsWith('OCW-B-')
                          const typeLabel = isQuote ? 'QUOTATION' : isBill ? 'BILL (NON-GST)' : 'TAX INVOICE'
                          const typeBg = isQuote ? 'rgba(245, 158, 11, 0.15)' : isBill ? 'rgba(56, 189, 248, 0.15)' : 'rgba(180, 35, 60, 0.15)'
                          const typeColor = isQuote ? '#F59E0B' : isBill ? '#38BDF8' : '#F87171'

                          return (
                            <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                              <td style={{ padding: '14px 12px', fontFamily: 'monospace', fontWeight: 700, color: '#C5A03F' }}>
                                {inv.invoiceNumber}
                              </td>
                              <td style={{ padding: '14px 12px' }}>
                                <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 800, background: typeBg, color: typeColor, border: `1px solid ${typeColor}40` }}>
                                  {typeLabel}
                                </span>
                              </td>
                              <td style={{ padding: '14px 12px' }}>
                                <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{inv.clientName}</div>
                                {inv.clientPhone && <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Ph: {inv.clientPhone}</div>}
                              </td>
                              <td style={{ padding: '14px 12px', fontWeight: 800, color: '#4ADE80' }}>
                                {fmtCurrency(inv.totalAmount)}
                              </td>
                              <td style={{ padding: '14px 12px', color: '#94A3B8', fontSize: '0.8rem' }}>
                                {fmtDate(inv.createdAt)}
                              </td>
                              <td style={{ padding: '14px 12px' }}>
                                <StatusBadge value={inv.status} />
                              </td>
                              <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                                  <button
                                    onClick={() => { setSelectedDoc(inv); setShowDocumentModal(true) }}
                                    title="View / Print Document"
                                    style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => { setSelectedDoc(inv); setShowDocumentModal(true) }}
                                    title="Edit Document"
                                    style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => sharePaymentLink(inv)}
                                    title="Share Document via WhatsApp"
                                    style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                                  >
                                    <MessageCircle size={12} /> WA
                                  </button>
                                  {inv.status !== 'PAID' && (
                                    <button
                                      onClick={() => deleteInvoice(inv.id, inv)}
                                      title="Delete Document"
                                      style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', cursor: 'pointer' }}
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SETTINGS & LOG TAB */}
            {activeTab === 'settings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Load button if not loaded */}
                {!settingsData && !settingsLoading && (
                  <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                    <Settings size={36} color="#94A3B8" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>Settings & Activity Log</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: 20 }}>Load current application settings and admin activity log.</div>
                    <button onClick={fetchSettings} className="btn-primary" style={{ padding: '10px 24px' }}>
                      <RefreshCw size={15} /> Load Settings & Log
                    </button>
                  </div>
                )}

                {settingsLoading && (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>Loading settings...</div>
                )}

                {settingsData && (
                  <>
                    {/* ── SECTION A: SETTINGS ── */}
                    <div className="glass-card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <Building2 size={20} color="#C5A03F" />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Business Information</h3>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {[
                          ['Business Name', settingsData.businessName],
                          ['Address', settingsData.businessAddress],
                          ['Phone', settingsData.businessPhone],
                          ['Email', settingsData.businessEmail],
                          ['GSTIN', settingsData.gstin],
                          ['PAN', settingsData.pan],
                        ].map(([label, value]) => (
                          <div key={label} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>{value || '—'}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <FileText size={20} color="#60A5FA" />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Document Numbering Configuration</h3>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                        {[
                          ['Quotation Prefix', settingsData.quotationPrefix, '#F59E0B'],
                          ['Tax Invoice Prefix', settingsData.invoicePrefix, '#F87171'],
                          ['Bill Prefix', settingsData.billPrefix, '#38BDF8'],
                          ['Default GST Rate', `${settingsData.defaultGstRate}%`, '#4ADE80'],
                        ].map(([label, value, color]) => (
                          <div key={label} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: color || '#FFFFFF', fontFamily: 'monospace' }}>{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <CreditCard size={20} color="#818CF8" />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Integration Status</h3>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Razorpay Payment Gateway</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700,
                              background: settingsData.razorpayStatus?.includes('Configured') && !settingsData.razorpayStatus?.includes('Not') ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)',
                              color: settingsData.razorpayStatus?.includes('Configured') && !settingsData.razorpayStatus?.includes('Not') ? '#4ADE80' : '#FBBF24',
                              border: '1px solid currentColor',
                            }}>
                              {settingsData.razorpayStatus}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 6 }}>Key: {settingsData.razorpayKeyIdPrefix} — Secret: Environment Managed</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Email / SMTP</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700,
                              background: settingsData.emailStatus === 'Configured' ? 'rgba(34,197,94,0.15)' : 'rgba(148,163,184,0.15)',
                              color: settingsData.emailStatus === 'Configured' ? '#4ADE80' : '#94A3B8',
                              border: '1px solid currentColor',
                            }}>
                              {settingsData.emailStatus}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 6 }}>Host: {settingsData.emailHost} — Password: Environment Managed</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Database</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(34,197,94,0.15)', color: '#4ADE80', border: '1px solid #4ADE80' }}>
                              {settingsData.databaseStatus}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 6 }}>Credentials: Environment Managed</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>JWT Authentication</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, background: 'rgba(34,197,94,0.15)', color: '#4ADE80', border: '1px solid #4ADE80' }}>
                              Active
                            </span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 6 }}>Secret: Environment Managed — Expiry: 24 hours</div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <Database size={20} color="#94A3B8" />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Application Statistics</h3>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                        {[
                          ['Total Documents', settingsData.totalDocuments, '#F87171'],
                          ['Total Leads', settingsData.totalLeads, '#60A5FA'],
                          ['Total Tickets', settingsData.totalTickets, '#FBBF24'],
                          ['Total Revenue', fmtCurrency(settingsData.totalRevenue), '#4ADE80'],
                        ].map(([label, value, color]) => (
                          <div key={label} style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color }}>{value}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 3 }}>{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── SECTION B: AUDIT LOG ── */}
                    <div className="glass-card" style={{ padding: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <ClipboardList size={20} color="#C5A03F" />
                          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Admin Activity Log</h3>
                          <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.72rem', fontWeight: 700, background: 'rgba(197,160,63,0.15)', color: '#C5A03F' }}>
                            {auditLogs.length} entries
                          </span>
                        </div>
                        <input
                          placeholder="Filter by action, entity, or ref..."
                          value={auditFilter}
                          onChange={e => setAuditFilter(e.target.value)}
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '6px 12px', color: '#FFFFFF', fontSize: '0.8rem', outline: 'none', width: 260 }}
                        />
                      </div>

                      {auditLogs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: '#64748B' }}>
                          <ClipboardList size={32} style={{ marginBottom: 10, opacity: 0.4 }} />
                          <div style={{ fontWeight: 600 }}>No activity recorded yet.</div>
                          <div style={{ fontSize: '0.8rem', marginTop: 6 }}>Admin actions (document creation, deletion, status changes) will appear here going forward.</div>
                        </div>
                      ) : (
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                            <thead>
                              <tr style={{ borderBottom: '1px solid rgba(197,160,63,0.18)', color: '#94A3B8', textAlign: 'left' }}>
                                <th style={{ padding: '10px 12px' }}>Date & Time</th>
                                <th style={{ padding: '10px 12px' }}>Action</th>
                                <th style={{ padding: '10px 12px' }}>Entity</th>
                                <th style={{ padding: '10px 12px' }}>Reference</th>
                                <th style={{ padding: '10px 12px' }}>Detail</th>
                              </tr>
                            </thead>
                            <tbody>
                              {auditLogs
                                .filter(log => !auditFilter ||
                                  log.action?.toLowerCase().includes(auditFilter.toLowerCase()) ||
                                  log.entityType?.toLowerCase().includes(auditFilter.toLowerCase()) ||
                                  log.entityRef?.toLowerCase().includes(auditFilter.toLowerCase()) ||
                                  log.detail?.toLowerCase().includes(auditFilter.toLowerCase())
                                )
                                .map(log => {
                                  const actionColor = log.action?.includes('DELETED') ? '#f87171'
                                    : log.action?.includes('CREATED') ? '#4ADE80'
                                    : log.action?.includes('STATUS') ? '#60A5FA'
                                    : '#FBBF24'
                                  return (
                                    <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                      <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                                        {log.timestamp ? new Date(log.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                                      </td>
                                      <td style={{ padding: '10px 12px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 800, background: `${actionColor}15`, color: actionColor, border: `1px solid ${actionColor}35`, whiteSpace: 'nowrap' }}>
                                          {log.action?.replace(/_/g, ' ')}
                                        </span>
                                      </td>
                                      <td style={{ padding: '10px 12px', color: '#94A3B8', fontSize: '0.78rem' }}>
                                        {log.entityType || '—'}
                                      </td>
                                      <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#C5A03F', fontSize: '0.78rem' }}>
                                        {log.entityRef || '—'}
                                      </td>
                                      <td style={{ padding: '10px 12px', color: '#CBD5E1', fontSize: '0.8rem', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {log.detail || '—'}
                                      </td>
                                    </tr>
                                  )
                                })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

          </>
        )}
      </main>

      {/* MODALS */}
      {showDocumentModal && (
        <CreateDocumentModal
          initialData={selectedDoc}
          onClose={() => { setShowDocumentModal(false); setSelectedDoc(null) }}
          onSaved={() => fetchAll()}
        />
      )}

      {surveyInquiry && (
        <ScheduleSurveyModal
          inquiry={surveyInquiry}
          onClose={() => setSurveyInquiry(null)}
          onCreated={() => { fetchAll(); setActiveTab('surveys') }}
        />
      )}

    </div>
    </div>
  )
}
