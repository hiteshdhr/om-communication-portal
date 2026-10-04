import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  LogOut, TrendingUp, AlertTriangle, FileText, DollarSign,
  Plus, X, MessageCircle, Trash2,
  LayoutDashboard, Inbox, TicketIcon, RefreshCw, Wrench,
  Calendar, Menu, Sun, Moon, Settings, ClipboardList,
  CheckCircle2, Clock, AlertCircle, Building2, CreditCard, Mail, Database,
  Shield, Key, Eye, EyeOff, ChevronRight, UserCircle, Search, Filter
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
  const [settingsTab, setSettingsTab] = useState('business')
  const [showChangePwd, setShowChangePwd] = useState(false)
  const [changePwdForm, setChangePwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [changePwdLoading, setChangePwdLoading] = useState(false)
  const [showPwdCurrent, setShowPwdCurrent] = useState(false)
  const [showPwdNew, setShowPwdNew] = useState(false)
  const [showPwdConfirm, setShowPwdConfirm] = useState(false)
  const [selectedLogEntry, setSelectedLogEntry] = useState(null)
  const [logActionFilter, setLogActionFilter] = useState('')
  const [logTextFilter, setLogTextFilter] = useState('')
  const [sectionErrors, setSectionErrors] = useState({
    metrics: false,
    inquiries: false,
    surveys: false,
    tickets: false,
    invoices: false,
  })

  // Modals
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [docFilter, setDocFilter] = useState('ALL')
  const [surveyInquiry, setSurveyInquiry] = useState(null)

  const navGroups = NAV_GROUPS
  const tabs = NAV_GROUPS.flatMap(g => g.items)

  const [retryStatus, setRetryStatus] = useState('')

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setRetryStatus('')
    const newErrors = { metrics: false, inquiries: false, surveys: false, tickets: false, invoices: false }

    // Retry helper — retries up to maxRetries times on transient server errors
    // (network failure, 502, 503, 504). 401/403 are NOT retried; they trigger
    // an immediate redirect to the login page.
    const safeFetch = async (url, fallback, key, maxRetries = 3) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const res = await api.get(url)
          return res.data
        } catch (err) {
          const status = err.response?.status
          // Auth failure — redirect immediately, no retry
          if (status === 401 || status === 403) {
            toast.error('Session expired. Please log in.')
            localStorage.removeItem('om_admin_token')
            localStorage.removeItem('om_admin_user')
            navigate('/admin/login')
            throw err
          }
          // Transient server/network error — retry with exponential backoff
          const isTransient = !status || status === 502 || status === 503 || status === 504
          if (isTransient && attempt < maxRetries) {
            const delayMs = 1500 * Math.pow(2, attempt - 1) // 1.5s, 3s, 6s
            setRetryStatus(`Backend is starting up… retrying in ${Math.round(delayMs / 1000)}s (attempt ${attempt}/${maxRetries - 1})`)
            await new Promise(resolve => setTimeout(resolve, delayMs))
            setRetryStatus('')
            continue
          }
          // Final attempt failed or non-transient error
          newErrors[key] = true
          return fallback
        }
      }
      newErrors[key] = true
      return fallback
    }

    try {
      const [m, inq, surv, tick, inv] = await Promise.all([
        safeFetch('/admin/dashboard/metrics', {}, 'metrics'),
        safeFetch('/admin/inquiries', [], 'inquiries'),
        safeFetch('/admin/site-surveys', [], 'surveys'),
        safeFetch('/admin/tickets', [], 'tickets'),
        safeFetch('/admin/invoices', [], 'invoices'),
      ])
      setSectionErrors(newErrors)
      setMetrics(m || {})
      setInquiries(Array.isArray(inq) ? inq : [])
      setSurveys(Array.isArray(surv) ? surv : [])
      setTickets(Array.isArray(tick) ? tick : [])
      setInvoices(Array.isArray(inv) ? inv : [])
    } catch (err) {
      // 401/403 handled above
    } finally {
      setLoading(false)
      setRetryStatus('')
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

  async function changePassword() {
    if (!changePwdForm.currentPassword || !changePwdForm.newPassword || !changePwdForm.confirmPassword) {
      toast.error('All password fields are required.'); return
    }
    if (changePwdForm.newPassword !== changePwdForm.confirmPassword) {
      toast.error('New passwords do not match.'); return
    }
    if (changePwdForm.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters.'); return
    }
    setChangePwdLoading(true)
    try {
      await api.post('/admin/change-password', {
        currentPassword: changePwdForm.currentPassword,
        newPassword: changePwdForm.newPassword
      })
      toast.success('Password changed successfully.')
      setShowChangePwd(false)
      setChangePwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to change password.')
    } finally {
      setChangePwdLoading(false)
    }
  }

  async function logoutAllSessions() {
    if (!window.confirm('This will revoke ALL active sessions including this one. You will be logged out immediately. Continue?')) return
    try {
      await api.post('/admin/logout-all-sessions')
      toast.success('All sessions revoked.')
      localStorage.removeItem('om_admin_token')
      localStorage.removeItem('om_admin_user')
      navigate('/admin/login')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to revoke sessions.')
    }
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
              <RefreshCw size={14} /> Sync Data
            </button>
            {activeTab === 'invoices' && (
              <button onClick={() => { setSelectedDoc(null); setShowDocumentModal(true) }} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
                <Plus size={15} /> Create Document
              </button>
            )}

          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
            <div>Loading dashboard data...</div>
            {retryStatus && (
              <div style={{ marginTop: 10, fontSize: '0.8rem', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <RefreshCw size={13} style={{ animation: 'spin 1.2s linear infinite' }} />
                {retryStatus}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Real error banner — shown when any dashboard API call failed for a non-auth reason */}
            {Object.values(sectionErrors).some(Boolean) && (
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

                {sectionErrors.inquiries ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#F87171' }}>
                    <AlertCircle size={32} style={{ marginBottom: 8 }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Failed to load leads from backend.</div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 4, marginBottom: 16 }}>Check network or backend connection.</div>
                    <button onClick={fetchAll} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <RefreshCw size={14} /> Retry Loading Leads
                    </button>
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
                    No leads or inquiries found.
                  </div>
                ) : (
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
                )}
              </div>
            )}

            {/* SITE SURVEYS TAB */}
            {activeTab === 'surveys' && (
              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Site Surveys & Field Inspections</h3>
                </div>

                {sectionErrors.surveys ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#F87171' }}>
                    <AlertCircle size={32} style={{ marginBottom: 8 }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Failed to load site surveys from backend.</div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 4, marginBottom: 16 }}>Check network or backend connection.</div>
                    <button onClick={fetchAll} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <RefreshCw size={14} /> Retry Loading Surveys
                    </button>
                  </div>
                ) : surveys.length === 0 ? (
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
                {sectionErrors.tickets ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#F87171' }}>
                    <AlertCircle size={32} style={{ marginBottom: 8 }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Failed to load support tickets from backend.</div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 4, marginBottom: 16 }}>Check network or backend connection.</div>
                    <button onClick={fetchAll} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <RefreshCw size={14} /> Retry Loading Tickets
                    </button>
                  </div>
                ) : tickets.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
                    No support tickets filed yet.
                  </div>
                ) : (
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
                )}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                {/* Inner Tab Bar */}
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 24, overflowX: 'auto' }}>
                  {[
                    { key: 'business', label: 'Business Settings', icon: Building2 },
                    { key: 'document', label: 'Document Settings', icon: FileText },
                    { key: 'account', label: 'Account & Security', icon: Shield },
                    { key: 'log', label: 'Activity Log', icon: ClipboardList },
                  ].map(({ key, label, icon: Icon }) => (
                    <button key={key} onClick={() => { setSettingsTab(key); if ((key === 'business' || key === 'document') && !settingsData) fetchSettings() }}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: settingsTab === key ? '2px solid #B4233C' : '2px solid transparent', color: settingsTab === key ? '#FFFFFF' : '#64748B', fontWeight: settingsTab === key ? 700 : 500, fontSize: '0.875rem', whiteSpace: 'nowrap', transition: 'color 0.15s' }}
                      onMouseEnter={e => { if (settingsTab !== key) e.currentTarget.style.color = '#CBD5E1' }}
                      onMouseLeave={e => { if (settingsTab !== key) e.currentTarget.style.color = '#64748B' }}>
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>

                {/* ── BUSINESS SETTINGS ── */}
                {settingsTab === 'business' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {!settingsData && !settingsLoading && (
                      <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                        <Building2 size={36} color="#94A3B8" style={{ marginBottom: 12 }} />
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Load Business Settings</div>
                        <button onClick={fetchSettings} className="btn-primary" style={{ padding: '10px 24px' }}>Load Settings</button>
                      </div>
                    )}
                    {settingsLoading && <div className="glass-card" style={{ padding: 32, textAlign: 'center', color: '#94A3B8' }}>Loading…</div>}
                    {settingsData && (
                      <>
                        <div className="glass-card" style={{ padding: 24 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <Building2 size={18} color="#B4233C" />
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Business Information</span>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
                            {[
                              ['Business Name', settingsData.businessName],
                              ['Address', settingsData.businessAddress],
                              ['Phone', settingsData.businessPhone],
                              ['Email', settingsData.businessEmail],
                              ['GSTIN', settingsData.gstin],
                              ['PAN', settingsData.pan],
                            ].map(([label, value]) => (
                              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 16px' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</div>
                                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#E2E8F0' }}>{value || '—'}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="glass-card" style={{ padding: 24 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <Database size={18} color="#60A5FA" />
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Integration Status</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                              { label: 'Razorpay Payment', status: settingsData.razorpayStatus, sub: `Key: ${settingsData.razorpayKeyIdPrefix} — Secret: Environment Managed`, icon: CreditCard },
                              { label: 'Email (SMTP)', status: settingsData.emailStatus, sub: `Host: ${settingsData.emailHost} — Password: Environment Managed`, icon: Mail },
                              { label: 'PostgreSQL Database', status: settingsData.databaseStatus, sub: 'Connection via Railway — Credentials: Environment Managed', icon: Database },
                            ].map(({ label, status, sub, icon: Icon }) => {
                              const ok = status === 'Configured' || status === 'Connected'
                              return (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 16px' }}>
                                  <Icon size={18} color={ok ? '#4ADE80' : '#FBBF24'} style={{ flexShrink: 0 }} />
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{label}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>{sub}</div>
                                  </div>
                                  <span style={{ flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: ok ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)', color: ok ? '#4ADE80' : '#FBBF24' }}>{status}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* ── DOCUMENT SETTINGS ── */}
                {settingsTab === 'document' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {!settingsData && !settingsLoading && (
                      <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                        <FileText size={36} color="#94A3B8" style={{ marginBottom: 12 }} />
                        <button onClick={fetchSettings} className="btn-primary" style={{ padding: '10px 24px' }}>Load Settings</button>
                      </div>
                    )}
                    {settingsLoading && <div className="glass-card" style={{ padding: 32, textAlign: 'center', color: '#94A3B8' }}>Loading…</div>}
                    {settingsData && (
                      <>
                        <div className="glass-card" style={{ padding: 24 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <FileText size={18} color="#F59E0B" />
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Document Numbering</span>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
                            {[
                              ['Quotation Prefix', settingsData.quotationPrefix],
                              ['Tax Invoice Prefix', settingsData.invoicePrefix],
                              ['Bill Prefix', settingsData.billPrefix],
                              ['Default GST Rate', `${settingsData.defaultGstRate}%`],
                            ].map(([label, value]) => (
                              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{label}</div>
                                <code style={{ fontSize: '1rem', fontWeight: 700, color: '#E2E8F0', fontFamily: 'ui-monospace,monospace' }}>{value}</code>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 16px' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Default Terms & Conditions</div>
                            <div style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>{settingsData.defaultTerms}</div>
                          </div>
                        </div>

                        <div className="glass-card" style={{ padding: 24 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <TrendingUp size={18} color="#4ADE80" />
                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>App Statistics</span>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
                            {[
                              ['Total Documents', settingsData.totalDocuments, '#60A5FA'],
                              ['Total Leads', settingsData.totalLeads, '#34D399'],
                              ['Total Tickets', settingsData.totalTickets, '#FBBF24'],
                              ['Total Revenue', fmtCurrency(settingsData.totalRevenue), '#4ADE80'],
                            ].map(([label, value, color]) => (
                              <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '18px 16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{value}</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94A3B8', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* ── ACCOUNT & SECURITY ── */}
                {settingsTab === 'account' && (() => {
                  const storedUser = (() => { try { return JSON.parse(localStorage.getItem('om_admin_user') || '{}') } catch { return {} } })()
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {/* Admin Account Info */}
                      <div className="glass-card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                          <UserCircle size={18} color="#60A5FA" />
                          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Admin Account</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
                          {[
                            ['Username', storedUser.username || '—'],
                            ['Email', storedUser.email || '—'],
                            ['Role', storedUser.role || 'ROLE_ADMIN'],
                          ].map(([label, value]) => (
                            <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 16px' }}>
                              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</div>
                              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#E2E8F0' }}>{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Password Management */}
                      <div className="glass-card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <Key size={18} color="#C5A03F" />
                          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Password Management</span>
                        </div>
                        <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: 16 }}>Change your admin password. You must provide your current password to confirm the change.</p>
                        <button onClick={() => setShowChangePwd(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px' }}>
                          <Key size={15} /> Change Password
                        </button>
                      </div>

                      {/* Session Management */}
                      <div className="glass-card" style={{ padding: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <Shield size={18} color="#F87171" />
                          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Session Management</span>
                        </div>
                        <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: 4 }}>
                          Sessions are authenticated via JWT tokens valid for 24 hours. "Logout All Sessions" invalidates all tokens immediately — including this one — by incrementing a server-side version counter.
                        </p>
                        <p style={{ color: '#94A3B8', fontSize: '0.8125rem', marginBottom: 18 }}>Use this if your credentials were compromised or you logged in from an untrusted device.</p>
                        <button onClick={logoutAllSessions} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'rgba(180,35,60,0.15)', border: '1px solid rgba(180,35,60,0.4)', borderRadius: 8, color: '#F87171', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                          <LogOut size={15} /> Logout All Sessions
                        </button>
                      </div>
                    </div>
                  )
                })()}

                {/* ── ACTIVITY LOG ── */}
                {settingsTab === 'log' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {auditLogs.length === 0 && !settingsLoading && (
                      <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                        <ClipboardList size={36} color="#94A3B8" style={{ marginBottom: 12 }} />
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Activity Log</div>
                        <button onClick={fetchSettings} className="btn-primary" style={{ padding: '10px 24px' }}>Load Log</button>
                      </div>
                    )}
                    {settingsLoading && <div className="glass-card" style={{ padding: 32, textAlign: 'center', color: '#94A3B8' }}>Loading…</div>}
                    {auditLogs.length > 0 && (
                      <div className="glass-card" style={{ padding: 24 }}>
                        {/* Filters */}
                        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: '0 0 auto' }}>
                            <Filter size={14} color="#64748B" />
                            <select value={logActionFilter} onChange={e => setLogActionFilter(e.target.value)}
                              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', padding: '6px 10px', fontSize: '0.8125rem' }}>
                              <option value="">All Types</option>
                              {['INVOICE', 'INQUIRY', 'TICKET', 'SURVEY', 'USER', 'DOCUMENT'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: '1 1 200px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px' }}>
                            <Search size={14} color="#64748B" />
                            <input value={logTextFilter} onChange={e => setLogTextFilter(e.target.value)} placeholder="Search actions, refs, details…"
                              style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.8125rem', width: '100%' }} />
                          </div>
                          <span style={{ color: '#64748B', fontSize: '0.8125rem' }}>
                            {auditLogs.filter(l => (!logActionFilter || (l.entityType || '').toUpperCase().includes(logActionFilter)) && (!logTextFilter || JSON.stringify(l).toLowerCase().includes(logTextFilter.toLowerCase()))).length} entries
                          </span>
                        </div>

                        {/* Log Table */}
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                            <thead>
                              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                {['WHEN', 'WHO', 'WHAT', 'WHICH', 'RESULT / DETAIL'].map(h => (
                                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748B', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {auditLogs
                                .filter(l => (!logActionFilter || (l.entityType || '').toUpperCase().includes(logActionFilter)) && (!logTextFilter || JSON.stringify(l).toLowerCase().includes(logTextFilter.toLowerCase())))
                                .map(entry => {
                                  const badgeColor = {
                                    DOCUMENT_CREATED: '#4ADE80', DOCUMENT_UPDATED: '#60A5FA', DOCUMENT_DELETED: '#F87171',
                                    STATUS_CHANGED: '#F59E0B', SURVEY_SCHEDULED: '#A78BFA', SURVEY_UPDATED: '#60A5FA',
                                    TICKET_UPDATED: '#38BDF8', TICKET_DELETED: '#F87171',
                                    INQUIRY_DELETED: '#F87171',
                                    PASSWORD_CHANGED: '#C5A03F', LOGOUT_ALL_SESSIONS: '#F87171',
                                    ADMIN_LOGIN: '#4ADE80',
                                  }[entry.action] || '#94A3B8'
                                  return (
                                    <tr key={entry.id} onClick={() => setSelectedLogEntry(entry)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.1s' }}
                                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                      <td style={{ padding: '10px 12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>{new Date(entry.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                      <td style={{ padding: '10px 12px', color: '#E2E8F0', fontWeight: 600 }}>{entry.performedBy || 'SYSTEM'}</td>
                                      <td style={{ padding: '10px 12px' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: badgeColor + '26', color: badgeColor }}>{entry.action}</span>
                                      </td>
                                      <td style={{ padding: '10px 12px', color: '#CBD5E1' }}><span style={{ fontWeight: 600 }}>{entry.entityType}</span>{entry.entityRef ? <span style={{ color: '#64748B' }}> · {entry.entityRef}</span> : ''}</td>
                                      <td style={{ padding: '10px 12px', color: '#94A3B8', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {entry.detail}
                                        <ChevronRight size={12} color="#475569" style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                                      </td>
                                    </tr>
                                  )
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

          </>
        )}
      </main>

      {/* MODALS */}

      {/* Change Password Modal */}
      {showChangePwd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={e => { if (e.target === e.currentTarget) { setShowChangePwd(false); setChangePwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' }) } }}>
          <div style={{ width: '100%', maxWidth: 440, padding: 28, borderRadius: 16, background: '#FFFFFF', boxShadow: '0 25px 60px rgba(0,0,0,0.35)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(180,35,60,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Key size={18} color="#B4233C" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827', lineHeight: 1.2 }}>Change Password</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: 2 }}>Minimum 8 characters required.</div>
                </div>
              </div>
              <button onClick={() => { setShowChangePwd(false); setChangePwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' }) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 6, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password', show: showPwdCurrent, toggle: () => setShowPwdCurrent(v => !v) },
                { key: 'newPassword', label: 'New Password', placeholder: 'At least 8 characters', show: showPwdNew, toggle: () => setShowPwdNew(v => !v) },
                { key: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Re-enter new password', show: showPwdConfirm, toggle: () => setShowPwdConfirm(v => !v) },
              ].map(({ key, label, placeholder, show, toggle }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: 6, letterSpacing: '0.01em' }}>{label}</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 8 }}
                    onFocusCapture={e => e.currentTarget.style.borderColor = '#B4233C'}
                    onBlurCapture={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <input
                      type={show ? 'text' : 'password'}
                      value={changePwdForm[key]}
                      onChange={e => setChangePwdForm(f => ({ ...f, [key]: e.target.value }))}
                      autoComplete={key === 'currentPassword' ? 'current-password' : 'new-password'}
                      placeholder={placeholder}
                      style={{ flex: 1, background: 'none', border: 'none', outline: 'none', padding: '11px 14px', color: '#111827', fontSize: '0.9375rem' }}
                    />
                    <button type="button" onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {changePwdForm.newPassword && changePwdForm.confirmPassword && changePwdForm.newPassword !== changePwdForm.confirmPassword && (
              <div style={{ marginTop: 12, fontSize: '0.8125rem', color: '#DC2626', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>&#x2715;</span> Passwords do not match.
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowChangePwd(false); setChangePwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' }) }}
                style={{ padding: '10px 20px', borderRadius: 8, background: 'none', border: '1.5px solid #D1D5DB', color: '#374151', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>Cancel</button>
              <button onClick={changePassword} disabled={changePwdLoading}
                style={{ padding: '10px 22px', borderRadius: 8, background: changePwdLoading ? '#9CA3AF' : '#B4233C', border: 'none', color: '#FFFFFF', fontWeight: 700, fontSize: '0.875rem', cursor: changePwdLoading ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!changePwdLoading) e.currentTarget.style.background = '#9B1D30' }}
                onMouseLeave={e => { if (!changePwdLoading) e.currentTarget.style.background = '#B4233C' }}>
                {changePwdLoading ? 'Saving…' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Detail Drawer */}
      {selectedLogEntry && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 900, display: 'flex', justifyContent: 'flex-end' }}
          onClick={e => { if (e.target === e.currentTarget) setSelectedLogEntry(null) }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: 420, height: '100%', borderRadius: '14px 0 0 14px', padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Log Entry Detail</span>
              <button onClick={() => setSelectedLogEntry(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: 4 }}><X size={18} /></button>
            </div>
            {[
              ['WHEN', new Date(selectedLogEntry.timestamp).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'medium' })],
              ['WHO', selectedLogEntry.performedBy || 'SYSTEM'],
              ['WHAT (Action)', selectedLogEntry.action],
              ['WHICH (Entity Type)', selectedLogEntry.entityType || '—'],
              ['WHICH (Reference)', selectedLogEntry.entityRef || '—'],
              ['RESULT / DETAIL', selectedLogEntry.detail || '—'],
            ].map(([label, value]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: '0.9rem', color: '#E2E8F0', wordBreak: 'break-word' }}>{String(value)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

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
