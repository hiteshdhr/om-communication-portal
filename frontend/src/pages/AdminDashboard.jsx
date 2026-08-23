import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  LogOut, TrendingUp, AlertTriangle, FileText, DollarSign,
  Plus, X, MessageCircle, ExternalLink, Trash2,
  LayoutDashboard, Inbox, TicketIcon, ReceiptText, RefreshCw, Wrench,
  Calendar, Printer
} from 'lucide-react'
import api from '../api'
import logo from '../assets/ocw-logo.png'

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

// ─── Modal: Quotation Generator & Printable PDF ────────────────────────────────
function QuotationModal({ inquiry, onClose }) {
  const quoteRef = useRef()
  const quoteNumber = `OCW-Q-2026-${Math.floor(100000 + Math.random() * 900000)}`
  const [items, setItems] = useState([
    { description: 'CCTV High-Definition IP Surveillance Package (Cameras, NVR, Storage & PoE Switches)', quantity: 1, unitPrice: 32000 },
    { description: 'Concealed ISI PVC Conduit Piping & Structured D-Link CAT6 Cabling (per site measurements)', quantity: 1, unitPrice: 14500 },
    { description: 'Installation, Server Rack Mounting, Testing & Mobile Configuration', quantity: 1, unitPrice: 8500 }
  ])

  const addItem = () => setItems(prev => [...prev, { description: '', quantity: 1, unitPrice: 0 }])
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx))
  const updateItem = (idx, field, val) => {
    setItems(prev => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: val }
      return copy
    })
  }

  const subtotal = items.reduce((s, it) => s + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0)
  const gst = subtotal * 0.18
  const total = subtotal + gst

  const handlePrint = () => {
    window.print()
  }

  const handleWhatsApp = () => {
    const msg = `*OFFICIAL QUOTATION — OM COMMUNICATION WORK*\n\nQuote No: ${quoteNumber}\nClient: ${inquiry?.clientName}\nFacility: ${inquiry?.facilityType}\nTotal Amount: ${fmtCurrency(total)} (incl. 18% GST)\n\n*Terms:* 75% Advance, 25% on completion | 1-Year On-Site Hardware Warranty.\n\n— Om Communication Work | +91 72177 15296`
    window.open(`https://wa.me/${inquiry?.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="glass-card" style={{ maxWidth: 840, width: '100%', padding: '32px', maxHeight: '92vh', overflowY: 'auto', background: '#07152B' }}>
        
        {/* Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(197,160,63,0.2)' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handlePrint} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button onClick={handleWhatsApp} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8125rem', color: '#25D366' }}>
              <MessageCircle size={15} /> Share via WhatsApp
            </button>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
        </div>

        {/* Printable Quotation Document */}
        <div ref={quoteRef} style={{ background: '#FFFFFF', color: '#040C1A', padding: '36px', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.3)', fontFamily: "'Inter', sans-serif" }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #C5A03F', paddingBottom: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src={logo} alt="Logo" style={{ width: 56, height: 56, objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#040C1A', letterSpacing: '-0.02em' }}>OM COMMUNICATION WORK</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C5A03F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Enterprise Security & Telecom Solutions</div>
                <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: 2 }}>GSTIN: 07COSPS8901L2ZO | Ph: +91 72177 15296</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#C5A03F' }}>QUOTATION</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#040C1A', marginTop: 4 }}>{quoteNumber}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            </div>
          </div>

          {/* Client & Scope Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24, fontSize: '0.85rem' }}>
            <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Quotation Issued To:</div>
              <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{inquiry?.clientName}</div>
              {inquiry?.companyName && <div style={{ color: '#475569', fontWeight: 600 }}>{inquiry?.companyName}</div>}
              <div style={{ color: '#475569' }}>Phone: {inquiry?.phone}</div>
              {inquiry?.email && <div style={{ color: '#475569' }}>Email: {inquiry?.email}</div>}
            </div>

            <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Project Details:</div>
              <div><strong>Facility:</strong> {inquiry?.facilityType}</div>
              <div><strong>Services:</strong> {inquiry?.servicesRequired?.join(', ')}</div>
              <div><strong>Quote Validity:</strong> 30 Days from issue</div>
            </div>
          </div>

          {/* Editable Line Items Table */}
          <div style={{ marginBottom: 20 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#0B1E38', color: '#FFFFFF', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Scope of Work / Item Description</th>
                  <th style={{ padding: '10px 12px', width: 60, textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '10px 12px', width: 120, textAlign: 'right' }}>Rate (₹)</th>
                  <th style={{ padding: '10px 12px', width: 120, textAlign: 'right' }}>Amount (₹)</th>
                  <th style={{ width: 30 }} className="no-print"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '8px 12px' }}>
                      <input
                        style={{ width: '100%', border: 'none', background: 'transparent', font: 'inherit', color: '#0F172A' }}
                        value={it.description}
                        onChange={e => updateItem(i, 'description', e.target.value)}
                      />
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                      <input
                        type="number"
                        min="1"
                        style={{ width: 45, textAlign: 'center', border: '1px solid #CBD5E1', borderRadius: 4, padding: 4 }}
                        value={it.quantity}
                        onChange={e => updateItem(i, 'quantity', e.target.value)}
                      />
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <input
                        type="number"
                        style={{ width: 90, textAlign: 'right', border: '1px solid #CBD5E1', borderRadius: 4, padding: 4 }}
                        value={it.unitPrice}
                        onChange={e => updateItem(i, 'unitPrice', e.target.value)}
                      />
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700 }}>
                      {fmtCurrency((Number(it.quantity) || 0) * (Number(it.unitPrice) || 0))}
                    </td>
                    <td className="no-print" style={{ padding: '8px 4px' }}>
                      <button onClick={() => removeItem(i)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="no-print" style={{ marginTop: 10 }}>
              <button onClick={addItem} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', fontSize: '0.75rem', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                <Plus size={12} /> Add Scope Line Item
              </button>
            </div>
          </div>

          {/* Totals & Commercial Terms */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, paddingTop: 14, borderTop: '2px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: 4 }}>Standard Commercial Terms:</div>
              <div>• 75% Advance payment along with official Purchase Order / Work Order.</div>
              <div>• 25% Balance payment immediately upon successful installation and testing.</div>
              <div>• Cabling & PVC conduit piping billed on actual site measurements.</div>
              <div>• 1-Year Comprehensive On-Site Warranty on all active hardware components.</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 8, fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#64748b' }}>Subtotal:</span>
                <span style={{ fontWeight: 600 }}>{fmtCurrency(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#64748b' }}>GST (18%):</span>
                <span style={{ fontWeight: 600 }}>{fmtCurrency(gst)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #CBD5E1', fontSize: '1rem', fontWeight: 900, color: '#0B1E38' }}>
                <span>Total Amount:</span>
                <span style={{ color: '#C5A03F' }}>{fmtCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Authorized Signatory */}
          <div style={{ marginTop: 36, display: 'flex', justifyContent: 'flex-end', textAlign: 'center' }}>
            <div>
              <div style={{ height: 40 }}></div>
              <div style={{ borderTop: '1px solid #0F172A', paddingTop: 4, fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>
                Authorized Signatory
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Om Communication Work</div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

// ─── Modal: Create Invoice ─────────────────────────────────────────────────────
function InvoiceModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ clientName: '', clientPhone: '', clientEmail: '', items: [{ description: '', quantity: 1, unitPrice: '' }] })
  const [loading, setLoading] = useState(false)

  function addItem() { setForm(f => ({ ...f, items: [...f.items, { description: '', quantity: 1, unitPrice: '' }] })) }
  function removeItem(i) { setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) })) }
  function updateItem(i, field, val) {
    setForm(f => { const items = [...f.items]; items[i] = { ...items[i], [field]: val }; return { ...f, items } })
  }

  const subtotal = form.items.reduce((s, it) => s + (Number(it.unitPrice) || 0) * (Number(it.quantity) || 0), 0)
  const gst = subtotal * 0.18
  const total = subtotal + gst

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientName) { toast.error('Client name is required.'); return }
    setLoading(true)
    try {
      const payload = {
        ...form,
        items: form.items.map(it => ({
          description: it.description,
          quantity: parseInt(it.quantity),
          unitPrice: parseFloat(it.unitPrice),
          amount: parseFloat(it.unitPrice) * parseInt(it.quantity)
        }))
      }
      const { data } = await api.post('/admin/invoices', payload)
      toast.success(`Invoice ${data.invoiceNumber} created!`)
      onCreated(data)
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create invoice.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="glass-card" style={{ maxWidth: 720, width: '100%', padding: '36px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Create Invoice</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={22} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[['clientName', 'Client Name *', 'text', 'Full name'], ['clientPhone', 'Phone', 'tel', '+91 98765 43210'], ['clientEmail', 'Email', 'email', 'client@company.com']].map(([k, l, t, ph]) => (
              <div key={k} style={{ gridColumn: k === 'clientName' ? 'span 2' : 'span 1' }}>
                <label className="form-label">{l}</label>
                <input className="form-input" type={t} placeholder={ph} value={form[k]}
                  onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Line Items</label>
              <button type="button" onClick={addItem} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,102,255,0.12)', color: '#60a5fa', border: '1px solid rgba(0,102,255,0.25)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600 }}>
                <Plus size={14} /> Add Item
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {form.items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 80px 120px auto', gap: 10, alignItems: 'center' }}>
                  <input className="form-input" placeholder="Item description" value={item.description}
                    onChange={e => updateItem(i, 'description', e.target.value)} />
                  <input className="form-input" type="number" min="1" placeholder="Qty" value={item.quantity}
                    onChange={e => updateItem(i, 'quantity', e.target.value)} style={{ textAlign: 'center' }} />
                  <input className="form-input" type="number" min="0" placeholder="Unit price" value={item.unitPrice}
                    onChange={e => updateItem(i, 'unitPrice', e.target.value)} />
                  <button type="button" onClick={() => removeItem(i)} disabled={form.items.length === 1}
                    style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', borderRadius: 8, padding: '10px', cursor: form.items.length === 1 ? 'not-allowed' : 'pointer', opacity: form.items.length === 1 ? 0.4 : 1 }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div style={{ background: 'rgba(11,25,44,0.7)', borderRadius: 12, padding: '16px 18px', marginBottom: 24, border: '1px solid rgba(255,255,255,0.07)' }}>
            {[['Subtotal', subtotal], ['GST 18%', gst]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                <span style={{ color: '#94A3B8' }}>{l}</span>
                <span>{fmtCurrency(v)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)', fontWeight: 800, fontSize: '1.0625rem' }}>
              <span>Total</span><span style={{ color: '#C5A03F' }}>{fmtCurrency(total)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
              <ReceiptText size={16} /> {loading ? 'Creating Invoice...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Main Admin Dashboard ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [metrics, setMetrics] = useState(null)
  const [inquiries, setInquiries] = useState([])
  const [surveys, setSurveys] = useState([])
  const [tickets, setTickets] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // Modals
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [surveyInquiry, setSurveyInquiry] = useState(null)
  const [quoteInquiry, setQuoteInquiry] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [m, inq, surv, tick, inv] = await Promise.all([
        api.get('/admin/dashboard/metrics'),
        api.get('/admin/inquiries'),
        api.get('/admin/site-surveys').catch(() => ({ data: [] })),
        api.get('/admin/tickets'),
        api.get('/admin/invoices'),
      ])
      setMetrics(m.data)
      setInquiries(inq.data)
      setSurveys(surv.data || [])
      setTickets(tick.data)
      setInvoices(inv.data)
    } catch {
      toast.error('Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  function logout() {
    localStorage.removeItem('om_admin_token')
    localStorage.removeItem('om_admin_user')
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

  async function deleteInvoice(id) {
    if (!window.confirm('Delete this invoice? (PAID invoices cannot be deleted)')) return
    try {
      await api.delete(`/admin/invoices/${id}`)
      setInvoices(prev => prev.filter(i => i.id !== id))
      toast.success('Invoice deleted.')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete invoice.')
    }
  }

  function sharePaymentLink(inv) {
    const link = `${window.location.origin}/pay/${inv.invoiceNumber}`
    const msg = `*Invoice from Om Communication Work*\n\nInvoice No: ${inv.invoiceNumber}\nClient: ${inv.clientName}\nAmount Due: ${fmtCurrency(inv.totalAmount)}\n\nPay securely online:\n${link}\n\n— Om Communication Work | +91 72177 15296`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads & Enquiries', icon: Inbox },
    { id: 'surveys', label: 'Site Surveys', icon: Wrench },
    { id: 'tickets', label: 'Support Desk', icon: TicketIcon },
    { id: 'invoices', label: 'Invoices', icon: ReceiptText },
  ]

  const metricCards = [
    { label: 'Total Inquiries', value: metrics?.totalInquiries ?? '—', icon: Inbox, color: '#C5A03F', sub: 'All time service leads' },
    { label: 'New Leads', value: metrics?.newLeads ?? '—', icon: TrendingUp, color: '#06b6d4', sub: 'Awaiting initial contact' },
    { label: 'Site Surveys', value: metrics?.siteSurveysScheduled ?? '—', icon: Wrench, color: '#e879f9', sub: 'Scheduled inspections' },
    { label: 'Active Complaints', value: metrics?.activeComplaints ?? '—', icon: AlertTriangle, color: '#ef4444', sub: 'Open + In-progress tickets' },
    { label: 'Total Revenue', value: metrics?.totalRevenue !== undefined ? fmtCurrency(metrics.totalRevenue) : '—', icon: DollarSign, color: '#22c55e', sub: 'Paid invoices' },
    { label: 'Outstanding', value: metrics?.outstandingPayments !== undefined ? fmtCurrency(metrics.outstandingPayments) : '—', icon: FileText, color: '#f59e0b', sub: 'Pending invoices' },
  ]

  const filteredInquiries = inquiries.filter(i =>
    !search || i.clientName?.toLowerCase().includes(search.toLowerCase()) ||
    i.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    i.phone?.includes(search)
  )

  return (
    <div style={{ minHeight: '100vh', background: '#040C1A', display: 'flex', color: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: '#0B1E38', borderRight: '1px solid rgba(197,160,63,0.2)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(197,160,63,0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={logo} alt="Logo" style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>OCW Operations</div>
            <div style={{ fontSize: '0.7rem', color: '#C5A03F', fontWeight: 600 }}>Admin Workspace</div>
          </div>
        </div>

        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {tabs.map(t => {
            const active = activeTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 14px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  border: 'none',
                  background: active ? 'rgba(197,160,63,0.15)' : 'transparent',
                  color: active ? '#FBF6E0' : '#A8BCCC',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  transition: 'all 0.15s'
                }}
              >
                <t.icon size={18} color={active ? '#C5A03F' : '#A8BCCC'} />
                <span>{t.label}</span>
              </button>
            )
          })}
        </nav>

        <div style={{ padding: 16, borderTop: '1px solid rgba(197,160,63,0.15)' }}>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 8,
              cursor: 'pointer',
              border: 'none',
              background: 'rgba(239,68,68,0.12)',
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
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 4 }}>
              Om Communication Work Management Portal
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={fetchAll} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8125rem' }}>
              <RefreshCw size={14} /> Refresh Data
            </button>
            {activeTab === 'invoices' && (
              <button onClick={() => setShowInvoiceModal(true)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
                <Plus size={15} /> Create Invoice
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>Loading dashboard data...</div>
        ) : (
          <>
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
                                onClick={() => setQuoteInquiry(inq)}
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
                                onClick={() => setQuoteInquiry(inq)}
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

            {/* INVOICES TAB */}
            {activeTab === 'invoices' && (
              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(197,160,63,0.18)', color: '#94A3B8', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Invoice #</th>
                        <th style={{ padding: '12px' }}>Client</th>
                        <th style={{ padding: '12px' }}>Amount</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(inv => (
                        <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <td style={{ padding: '14px 12px', fontFamily: 'monospace', fontWeight: 700, color: '#C5A03F' }}>{inv.invoiceNumber}</td>
                          <td style={{ padding: '14px 12px' }}>
                            <div style={{ fontWeight: 700 }}>{inv.clientName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{inv.clientPhone}</div>
                          </td>
                          <td style={{ padding: '14px 12px', fontWeight: 700 }}>{fmtCurrency(inv.totalAmount)}</td>
                          <td style={{ padding: '14px 12px' }}><StatusBadge value={inv.status} /></td>
                          <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                              <a
                                href={`/pay/${inv.invoiceNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#06b6d4', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                              >
                                Open <ExternalLink size={12} />
                              </a>
                              <button
                                onClick={() => sharePaymentLink(inv)}
                                title="Share payment link via WhatsApp"
                                style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                              >
                                <MessageCircle size={12} /> WA
                              </button>
                              {inv.status !== 'PAID' && (
                                <button
                                  onClick={() => deleteInvoice(inv.id)}
                                  title="Delete Invoice"
                                  style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', cursor: 'pointer' }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* MODALS */}
      {showInvoiceModal && (
        <InvoiceModal
          onClose={() => setShowInvoiceModal(false)}
          onCreated={() => fetchAll()}
        />
      )}

      {surveyInquiry && (
        <ScheduleSurveyModal
          inquiry={surveyInquiry}
          onClose={() => setSurveyInquiry(null)}
          onCreated={() => { fetchAll(); setActiveTab('surveys') }}
        />
      )}

      {quoteInquiry && (
        <QuotationModal
          inquiry={quoteInquiry}
          onClose={() => setQuoteInquiry(null)}
        />
      )}
    </div>
  )
}
