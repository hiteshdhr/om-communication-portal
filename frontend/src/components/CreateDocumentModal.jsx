import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  X, FileText, Receipt, Calculator, Check, ArrowRight, ArrowLeft,
  Plus, Trash2, Printer, Send, MessageCircle, Mail, Eye, Edit3, ShieldCheck
} from 'lucide-react'
import api from '../api'

import QuotationTemplate from './DocumentTemplates/QuotationTemplate'
import TaxInvoiceTemplate from './DocumentTemplates/TaxInvoiceTemplate'
import BillTemplate from './DocumentTemplates/BillTemplate'

export default function CreateDocumentModal({ initialData = null, onClose, onSaved }) {
  const [viewMode, setViewMode] = useState('EDIT')

  const [documentType, setDocumentType] = useState(initialData?.documentType || 'QUOTATION')
  const [clientName, setClientName] = useState(initialData?.clientName || '')
  const [clientPhone, setClientPhone] = useState(initialData?.clientPhone || '')
  const [clientEmail, setClientEmail] = useState(initialData?.clientEmail || '')
  const [clientAddress, setClientAddress] = useState(initialData?.clientAddress || '')
  const [clientGstin, setClientGstin] = useState(initialData?.clientGstin || '')

  const [subject, setSubject] = useState(initialData?.subject || 'QUOTATION FOR SECURITY & TELECOM SYSTEM')
  const [gstEnabled, setGstEnabled] = useState(
    initialData?.gstEnabled !== undefined
      ? initialData.gstEnabled
      : documentType !== 'BILL'
  )
  const [gstRate, setGstRate] = useState(initialData?.gstRate || 18)
  const [termsAndConditions, setTermsAndConditions] = useState(
    initialData?.termsAndConditions ||
      'ADVANCE PAYMENT 75% WITH WORK ORDER, 25% ON COMPLETION\nGST 18% INCLUDED AS APPLICABLE\n1-YEAR ON-SITE HARDWARE WARRANTY AGAINST MANUFACTURING DEFECTS\nCABLE AND PIPING CHARGED AS PER ACTUAL SITE MEASUREMENTS'
  )

  const [deliveryWhatsApp, setDeliveryWhatsApp] = useState(true)
  const [deliveryEmail, setDeliveryEmail] = useState(true)

  const [items, setItems] = useState(
    initialData?.items?.length > 0
      ? initialData.items.map(it => ({
          description: it.description || '',
          quantity: Number(it.quantity) || 1,
          unitPrice: Number(it.unitPrice) || 0,
        }))
      : [
          { description: 'CP PLUS HD CCTV SURVEILLANCE CAMERAS PACKAGE', quantity: 4, unitPrice: 3500 },
          { description: 'CONCEALED PVC CONDUIT PIPING & CAT6 STRUCTURED CABLING', quantity: 1, unitPrice: 8500 },
          { description: 'INSTALLATION, TESTING & COMMISSIONING CHARGES', quantity: 1, unitPrice: 4500 },
        ]
  )

  const [loading, setLoading] = useState(false)
  const [savedDoc, setSavedDoc] = useState(initialData)

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    if (documentType === 'BILL') {
      setGstEnabled(false)
    } else if (documentType === 'TAX_INVOICE') {
      setGstEnabled(true)
    }
  }, [documentType])

  const subtotal = items.reduce((acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0)
  const taxAmount = gstEnabled ? subtotal * (Number(gstRate || 18) / 100) : 0
  const totalAmount = subtotal + taxAmount

  const handleAddItem = () => {
    setItems(prev => [...prev, { description: '', quantity: 1, unitPrice: 0 }])
  }
  const handleRemoveItem = idx => {
    setItems(prev => prev.filter((_, i) => i !== idx))
  }
  const handleItemChange = (idx, field, val) => {
    setItems(prev => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: val }
      return copy
    })
  }

  const currentDoc = {
    ...(savedDoc || {}),
    documentType,
    invoiceNumber: savedDoc?.invoiceNumber || (documentType === 'QUOTATION' ? 'OCW-Q-2026-PREVIEW' : documentType === 'BILL' ? 'OCW-B-2026-PREVIEW' : 'OCW-INV-2026-PREVIEW'),
    clientName, clientPhone, clientEmail, clientAddress, clientGstin,
    subject, gstEnabled, gstRate, termsAndConditions,
    subtotal, taxAmount, totalAmount, items,
    createdAt: savedDoc?.createdAt || new Date().toISOString(),
  }

  async function handleFinalizeSave() {
    if (!clientName.trim()) { toast.error('Customer / Company Name is required.'); return }
    if (items.length === 0) { toast.error('Please add at least one line item.'); return }

    setLoading(true)
    const payload = {
      documentType, clientName, clientPhone, clientEmail, clientAddress, clientGstin,
      subject, gstEnabled, gstRate: Number(gstRate), termsAndConditions,
      items: items.map(it => ({
        description: it.description,
        quantity: Number(it.quantity) || 1,
        unitPrice: Number(it.unitPrice) || 0,
        amount: (Number(it.quantity) || 1) * (Number(it.unitPrice) || 0),
      })),
    }

    try {
      let res
      if (savedDoc?.id) {
        res = await api.put(`/admin/invoices/${savedDoc.id}`, payload)
        toast.success('Document updated successfully!')
      } else {
        res = await api.post('/admin/invoices', payload)
        toast.success('Document finalized and saved!')
      }
      setSavedDoc(res.data)
      onSaved && onSaved(res.data)
      setViewMode('PREVIEW')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save document.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => window.print()

  const handleWhatsAppSend = () => {
    const docNo = savedDoc?.invoiceNumber || currentDoc.invoiceNumber
    const docTitle = documentType === 'QUOTATION' ? 'QUOTATION' : documentType === 'BILL' ? 'BILL' : 'TAX INVOICE'
    const link = `${window.location.origin}/invoice/${docNo}`
    const msg = `*OFFICIAL ${docTitle} — OM COMMUNICATION WORKS*\n\nDocument No: ${docNo}\nClient: ${clientName}\nTotal Amount: ₹${totalAmount.toLocaleString('en-IN')}\n\nView Digital Document:\n${link}\n\n— Om Communication Work | +91 72177 15296`
    const phoneClean = clientPhone.replace(/\D/g, '')
    window.open(`https://wa.me/${phoneClean.length === 10 ? '91' + phoneClean : phoneClean}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleEmailSend = () => {
    const docNo = savedDoc?.invoiceNumber || currentDoc.invoiceNumber
    const docTitle = documentType === 'QUOTATION' ? 'Quotation' : documentType === 'BILL' ? 'Bill' : 'Tax Invoice'
    const link = `${window.location.origin}/invoice/${docNo}`
    const subjectLine = `${docTitle} #${docNo} from OM Communication Works`
    const body = `Dear ${clientName},\n\nPlease find your ${docTitle.toLowerCase()} details below:\n\nDocument No: ${docNo}\nTotal Amount: ₹${totalAmount.toLocaleString('en-IN')}\n\nView Online:\n${link}\n\nThank you,\nOm Communication Works`
    window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`, '_blank')
  }

  return (
    <div
      className="doc-modal-overlay"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <style>{`
        /* ── Mobile-first modal overrides (≤600px) ───────────────────────── */
        @media (max-width: 600px) {
          /* Full-screen sheet from bottom */
          .doc-modal-overlay {
            padding: 0 !important;
            align-items: flex-end !important;
          }
          .doc-modal-root {
            border-radius: 16px 16px 0 0 !important;
            max-height: 96dvh !important;
            max-height: 96vh !important;
          }

          /* Compact header: title+close on row 1, preview toggle on row 2 */
          .doc-modal-header {
            flex-wrap: wrap !important;
            gap: 6px !important;
            padding: 10px 14px !important;
          }
          .doc-modal-header-info {
            flex: 1 !important;
            min-width: 0 !important;
          }
          .doc-modal-header-info h2 {
            font-size: 0.88rem !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          /* Hide the subtitle line on mobile to save vertical space */
          .doc-modal-header-subtitle {
            display: none !important;
          }
          .doc-modal-header-actions {
            width: 100% !important;
            order: 3 !important;
          }

          /* Less horizontal padding in body */
          .doc-modal-body {
            padding: 12px !important;
          }

          /* Step 1: 3-col → 1-col */
          .doc-type-grid {
            grid-template-columns: 1fr !important;
          }

          /* Step 2: 2-col → 1-col; span-2 cells collapse gracefully */
          .doc-customer-grid {
            grid-template-columns: 1fr !important;
          }

          /* Step 3: hide desktop column headers, turn each row into a card */
          .doc-items-header { display: none !important; }
          .doc-item-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            background: var(--admin-surface) !important;
            border: 1px solid var(--admin-border) !important;
            border-radius: 8px !important;
            padding: 10px !important;
          }
          /* Row 1: description full-width */
          .doc-item-desc  { grid-column: 1 / span 2 !important; }
          /* Row 2: qty | rate side by side */
          .doc-item-qty   { grid-column: 1 !important; text-align: left !important; }
          .doc-item-rate  { grid-column: 2 !important; text-align: left !important; }
          /* Row 3: amount | delete */
          .doc-item-amount {
            grid-column: 1 !important;
            text-align: left !important;
            align-self: center !important;
          }
          .doc-item-delete {
            grid-column: 2 !important;
            justify-content: flex-end !important;
          }

          /* Step 4: 2-col → 1-col; span-2 cells collapse gracefully */
          .doc-settings-grid { grid-template-columns: 1fr !important; }

          /* Totals: left-aligned wrapping row */
          .doc-totals-row {
            justify-content: flex-start !important;
            flex-wrap: wrap !important;
            gap: 12px !important;
          }

          /* Preview toolbar: stack label on top, buttons below */
          .doc-preview-toolbar {
            flex-wrap: wrap !important;
            gap: 8px !important;
            padding: 10px 14px !important;
          }
          .doc-preview-toolbar > div:first-child {
            width: 100% !important;
          }
          .doc-preview-toolbar > div:last-child {
            width: 100% !important;
            flex-wrap: wrap !important;
          }
          .doc-preview-toolbar button {
            flex: 1 !important;
            justify-content: center !important;
            font-size: 0.75rem !important;
            padding: 6px 8px !important;
          }

          /* A4 preview: zoom to fit viewport */
          .doc-a4-preview-wrap {
            overflow: hidden !important;
            justify-content: flex-start !important;
          }
          .doc-a4-preview-wrap .a4-document {
            zoom: 0.43 !important;
          }

          /* Footer: actions on top, cancel full-width below */
          .doc-modal-footer {
            flex-direction: column !important;
            gap: 8px !important;
            padding: 10px 14px !important;
          }
          .doc-modal-footer > .btn-secondary:first-child {
            order: 2 !important;
            width: 100% !important;
            justify-content: center !important;
            font-size: 0.8rem !important;
            padding: 9px 12px !important;
            min-height: 40px !important;
          }
          .doc-modal-footer-actions {
            order: 1 !important;
            width: 100% !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
          .doc-modal-footer-actions .btn-primary,
          .doc-modal-footer-actions .btn-secondary {
            flex: 1 !important;
            min-width: 0 !important;
            white-space: normal !important;
            text-align: center !important;
            justify-content: center !important;
            font-size: 0.8rem !important;
            padding: 9px 10px !important;
            min-height: 40px !important;
          }
        }

        /* Narrower phones: tighter A4 zoom */
        @media (max-width: 400px) {
          .doc-a4-preview-wrap .a4-document { zoom: 0.37 !important; }
        }
        @media (max-width: 340px) {
          .doc-a4-preview-wrap .a4-document { zoom: 0.32 !important; }
        }
      `}</style>

      <motion.div
        className="doc-modal-root"
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          width: '100%',
          maxWidth: viewMode === 'PREVIEW' ? '1100px' : '920px',
          maxHeight: '94vh',
          background: 'var(--admin-surface)',
          color: 'var(--admin-text-primary)',
          borderRadius: 14,
          border: '1px solid var(--admin-border)',
          boxShadow: '0 20px 40px -8px rgba(0,0,0,0.18), 0 4px 12px -2px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── MODAL HEADER ── */}
        <div className="doc-modal-header" style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--admin-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--admin-surface-subtle)',
        }}>
          <div className="doc-modal-header-info" style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: 'var(--admin-accent-light)', border: '1px solid var(--admin-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--admin-accent)',
            }}>
              <FileText size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--admin-text-primary)', letterSpacing: '-0.01em' }}>
                {savedDoc?.id ? 'Edit Document' : 'Create New Document'}
              </h2>
              <div className="doc-modal-header-subtitle" style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: 1 }}>
                OM Communication Works — Document Management System
              </div>
            </div>
          </div>

          <div className="doc-modal-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {viewMode === 'EDIT' ? (
              <button onClick={() => setViewMode('PREVIEW')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6 }}>
                <Eye size={14} /> Live A4 Preview
              </button>
            ) : (
              <button onClick={() => setViewMode('EDIT')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6 }}>
                <Edit3 size={14} /> Back to Edit Form
              </button>
            )}
            <button onClick={onClose} style={{
              background: 'none', border: '1px solid var(--admin-border)', borderRadius: 6,
              color: 'var(--admin-text-muted)', cursor: 'pointer', padding: '4px 6px',
              display: 'flex', alignItems: 'center',
            }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── MODAL BODY ── */}
        <div className="doc-modal-body" style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--admin-surface)' }}>
          {viewMode === 'EDIT' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* STEP 1: Document Type */}
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Step 1 — Select Document Type
                </div>
                <div className="doc-type-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  {[
                    { id: 'QUOTATION', num: '01', title: 'QUOTATION', desc: 'Price estimate or proposal sent before order confirmation.', icon: FileText },
                    { id: 'TAX_INVOICE', num: '02', title: 'TAX INVOICE', desc: 'Formal invoice with 18% GST calculation and breakdown.', icon: Receipt },
                    { id: 'BILL', num: '03', title: 'BILL / NON-GST', desc: 'Statement of charges without GST calculation.', icon: Calculator },
                  ].map(t => {
                    const Icon = t.icon
                    const isSelected = documentType === t.id
                    return (
                      <div key={t.id} onClick={() => setDocumentType(t.id)} style={{
                        padding: '14px 16px', borderRadius: 8, cursor: 'pointer',
                        background: isSelected ? 'var(--admin-accent-light)' : 'var(--admin-surface-subtle)',
                        border: isSelected ? '2px solid var(--admin-accent)' : '1px solid var(--admin-border)',
                        transition: 'all 0.18s ease', position: 'relative',
                      }}>
                        <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '1.6rem', fontWeight: 700, lineHeight: 1, color: isSelected ? 'var(--admin-accent)' : 'var(--admin-border)', marginBottom: 8, userSelect: 'none' }}>
                          {t.num}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontWeight: 700, fontSize: '0.82rem', color: isSelected ? 'var(--admin-accent)' : 'var(--admin-text-primary)', letterSpacing: '0.04em' }}>
                            {t.title}
                          </span>
                          <Icon size={15} color={isSelected ? 'var(--admin-accent)' : 'var(--admin-text-muted)'} />
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--admin-text-muted)', lineHeight: 1.45 }}>
                          {t.desc}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* STEP 2: Customer Details */}
              <div style={{ background: 'var(--admin-surface-subtle)', padding: '20px', borderRadius: 10, border: '1px solid var(--admin-border)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
                  Step 2 — Customer &amp; Delivery Information
                </div>
                <div className="doc-customer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>Customer / Company Name *</label>
                    <input className="form-input" placeholder="e.g. Abhyant Apartments or M/S Delhi Infra" value={clientName} onChange={e => setClientName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>Phone Number</label>
                    <input className="form-input" placeholder="e.g. +91 98765 43210" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>Email Address</label>
                    <input className="form-input" type="email" placeholder="e.g. client@example.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>GSTIN (where applicable)</label>
                    <input className="form-input" placeholder="e.g. 07AAAAA0000A1Z5" value={clientGstin} onChange={e => setClientGstin(e.target.value)} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>Billing &amp; Site Address</label>
                    <textarea className="form-input" rows={2} placeholder="e.g. Plot No. 14, Vasundhara Enclave, Delhi-110096" value={clientAddress} onChange={e => setClientAddress(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* STEP 3: Line Items */}
              <div style={{ background: 'var(--admin-surface-subtle)', padding: '20px', borderRadius: 10, border: '1px solid var(--admin-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Step 3 — Products &amp; Services (Line Items)
                  </div>
                  <button type="button" onClick={handleAddItem} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem', gap: 4 }}>
                    <Plus size={14} /> Add Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Desktop column headers — hidden on mobile via .doc-items-header */}
                  <div className="doc-items-header" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 110px 36px', gap: 10, fontSize: '0.72rem', color: 'var(--admin-text-muted)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '0 4px', paddingBottom: 6, borderBottom: '1px solid var(--admin-border)' }}>
                    <span>Description</span>
                    <span style={{ textAlign: 'center' }}>Qty</span>
                    <span style={{ textAlign: 'right' }}>Rate (₹)</span>
                    <span style={{ textAlign: 'right' }}>Amount (₹)</span>
                    <span />
                  </div>

                  {items.map((it, idx) => {
                    const amt = (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0)
                    return (
                      <div key={idx} className="doc-item-row" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 110px 36px', gap: 10, alignItems: 'center' }}>
                        <input
                          className="form-input doc-item-desc"
                          placeholder="Item description / technical scope..."
                          value={it.description}
                          onChange={e => handleItemChange(idx, 'description', e.target.value)}
                        />
                        <input
                          className="form-input doc-item-qty"
                          type="number"
                          min="1"
                          style={{ textAlign: 'center' }}
                          value={it.quantity}
                          onChange={e => handleItemChange(idx, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                        />
                        <input
                          className="form-input doc-item-rate"
                          type="number"
                          min="0"
                          style={{ textAlign: 'right' }}
                          value={it.unitPrice}
                          onChange={e => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                        <div className="doc-item-amount" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--admin-success)', fontSize: '0.88rem' }}>
                          ₹{amt.toLocaleString('en-IN')}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="doc-item-delete"
                          style={{ background: 'none', border: 'none', color: 'var(--admin-danger)', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* STEP 4: Settings & Terms */}
              <div style={{ background: 'var(--admin-surface-subtle)', padding: '20px', borderRadius: 10, border: '1px solid var(--admin-border)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
                  Step 4 — Document Settings &amp; Tax Configuration
                </div>

                <div className="doc-settings-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {documentType === 'QUOTATION' && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>Quotation Subject</label>
                      <input className="form-input" value={subject} onChange={e => setSubject(e.target.value)} />
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="checkbox"
                      id="gstToggle"
                      checked={gstEnabled}
                      onChange={e => setGstEnabled(e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: 'var(--admin-accent)', cursor: 'pointer' }}
                    />
                    <label htmlFor="gstToggle" style={{ fontSize: '0.85rem', color: 'var(--admin-text-primary)', fontWeight: 600, cursor: 'pointer' }}>
                      Include GST (18% Tax)
                    </label>
                  </div>
                  {gstEnabled && (
                    <div>
                      <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>GST Rate (%)</label>
                      <input className="form-input" type="number" value={gstRate} onChange={e => setGstRate(parseFloat(e.target.value) || 0)} />
                    </div>
                  )}
                  <div style={{ gridColumn: 'span 2', marginTop: 2 }}>
                    <label className="form-label" style={{ color: 'var(--admin-text-secondary)' }}>Terms &amp; Conditions (Bullet Points)</label>
                    <textarea className="form-input" rows={3} value={termsAndConditions} onChange={e => setTermsAndConditions(e.target.value)} />
                  </div>
                </div>

                {/* Summary Totals */}
                <div className="doc-totals-row" style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'flex-end', gap: 28, fontSize: '0.88rem' }}>
                  <div>
                    <span style={{ color: 'var(--admin-text-muted)' }}>Subtotal: </span>
                    <span style={{ fontWeight: 700, color: 'var(--admin-text-primary)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {gstEnabled && (
                    <div>
                      <span style={{ color: 'var(--admin-text-muted)' }}>GST ({gstRate}%): </span>
                      <span style={{ fontWeight: 700, color: 'var(--admin-warning)' }}>₹{taxAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div>
                    <span style={{ color: 'var(--admin-text-muted)' }}>Total: </span>
                    <span style={{ fontWeight: 800, color: 'var(--admin-success)', fontSize: '1rem' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* PREVIEW MODE */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

              <div className="doc-preview-toolbar" style={{ width: '100%', maxWidth: '794px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--admin-surface-subtle)', padding: '12px 18px', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                  Document: <strong style={{ color: 'var(--admin-text-primary)' }}>{currentDoc.invoiceNumber}</strong>{' '}
                  <span style={{ color: 'var(--admin-text-faint)' }}>({documentType})</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handlePrint} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6 }}>
                    <Printer size={14} /> Print / Save PDF
                  </button>
                  <button onClick={handleWhatsAppSend} style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, background: '#25D366', color: '#FFFFFF', border: 'none', borderRadius: 7, fontWeight: 600, cursor: 'pointer' }}>
                    <MessageCircle size={14} /> WhatsApp
                  </button>
                  <button onClick={handleEmailSend} style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6, background: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: 7, fontWeight: 600, cursor: 'pointer' }}>
                    <Mail size={14} /> Email
                  </button>
                </div>
              </div>

              {/* A4 Template — zoomed to fit on narrow screens via CSS zoom */}
              <div className="doc-a4-preview-wrap" style={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                {documentType === 'QUOTATION' ? (
                  <QuotationTemplate doc={currentDoc} />
                ) : documentType === 'BILL' ? (
                  <BillTemplate doc={currentDoc} />
                ) : (
                  <TaxInvoiceTemplate doc={currentDoc} />
                )}
              </div>

            </div>
          )}
        </div>

        {/* ── MODAL FOOTER ── */}
        <div className="doc-modal-footer" style={{ padding: '14px 24px', borderTop: '1px solid var(--admin-border)', background: 'var(--admin-surface-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="button" onClick={onClose} className="btn-secondary" style={{ color: 'var(--admin-text-muted)' }}>
            Cancel
          </button>

          <div className="doc-modal-footer-actions" style={{ display: 'flex', gap: 10 }}>
            {viewMode === 'EDIT' ? (
              <>
                <button type="button" onClick={() => setViewMode('PREVIEW')} className="btn-secondary">
                  <Eye size={15} /> Preview Document
                </button>
                <button type="button" disabled={loading} onClick={handleFinalizeSave} className="btn-primary" style={{ padding: '10px 20px' }}>
                  <ShieldCheck size={16} /> {loading ? 'Saving...' : 'Finalize & Save Document'}
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setViewMode('EDIT')} className="btn-secondary">
                  <Edit3 size={15} /> Edit Details
                </button>
                <button type="button" disabled={loading} onClick={handleFinalizeSave} className="btn-primary" style={{ padding: '10px 20px', background: 'var(--admin-success)' }}>
                  <Check size={16} /> {savedDoc?.id ? 'Update Saved Document' : 'Finalize Document'}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
