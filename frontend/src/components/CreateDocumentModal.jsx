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
  // Mode: 'EDIT' | 'PREVIEW' | 'SEND_CONFIRM'
  const [viewMode, setViewMode] = useState('EDIT')

  // Form State
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

  // Update GST default when document type changes
  useEffect(() => {
    if (documentType === 'BILL') {
      setGstEnabled(false)
    } else if (documentType === 'TAX_INVOICE') {
      setGstEnabled(true)
    }
  }, [documentType])

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0)
  const taxAmount = gstEnabled ? subtotal * (Number(gstRate || 18) / 100) : 0
  const totalAmount = subtotal + taxAmount

  // Item Handlers
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

  // Construct current doc object for live preview
  const currentDoc = {
    ...(savedDoc || {}),
    documentType,
    invoiceNumber: savedDoc?.invoiceNumber || (documentType === 'QUOTATION' ? 'OCW-Q-2026-PREVIEW' : documentType === 'BILL' ? 'OCW-B-2026-PREVIEW' : 'OCW-INV-2026-PREVIEW'),
    clientName,
    clientPhone,
    clientEmail,
    clientAddress,
    clientGstin,
    subject,
    gstEnabled,
    gstRate,
    termsAndConditions,
    subtotal,
    taxAmount,
    totalAmount,
    items,
    createdAt: savedDoc?.createdAt || new Date().toISOString(),
  }

  // Save / Finalize Document to Database
  async function handleFinalizeSave() {
    if (!clientName.trim()) {
      toast.error('Customer / Company Name is required.')
      return
    }
    if (items.length === 0) {
      toast.error('Please add at least one line item.')
      return
    }

    setLoading(true)
    const payload = {
      documentType,
      clientName,
      clientPhone,
      clientEmail,
      clientAddress,
      clientGstin,
      subject,
      gstEnabled,
      gstRate: Number(gstRate),
      termsAndConditions,
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

  // Print / PDF Handler
  const handlePrint = () => {
    window.print()
  }

  // WhatsApp Send Handler
  const handleWhatsAppSend = () => {
    const docNo = savedDoc?.invoiceNumber || currentDoc.invoiceNumber
    const docTitle = documentType === 'QUOTATION' ? 'QUOTATION' : documentType === 'BILL' ? 'BILL' : 'TAX INVOICE'
    const link = `${window.location.origin}/invoice/${docNo}`

    const msg = `*OFFICIAL ${docTitle} — OM COMMUNICATION WORKS*\n\nDocument No: ${docNo}\nClient: ${clientName}\nTotal Amount: ₹${totalAmount.toLocaleString('en-IN')}\n\nView Digital Document:\n${link}\n\n— Om Communication Work | +91 72177 15296`
    const phoneClean = clientPhone.replace(/\D/g, '')
    window.open(`https://wa.me/${phoneClean.length === 10 ? '91' + phoneClean : phoneClean}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  // Email Send Handler
  const handleEmailSend = () => {
    const docNo = savedDoc?.invoiceNumber || currentDoc.invoiceNumber
    const docTitle = documentType === 'QUOTATION' ? 'Quotation' : documentType === 'BILL' ? 'Bill' : 'Tax Invoice'
    const link = `${window.location.origin}/invoice/${docNo}`
    const subjectLine = `${docTitle} #${docNo} from OM Communication Works`
    const body = `Dear ${clientName},\n\nPlease find your ${docTitle.toLowerCase()} details below:\n\nDocument No: ${docNo}\nTotal Amount: ₹${totalAmount.toLocaleString('en-IN')}\n\nView Online:\n${link}\n\nThank you,\nOm Communication Works`

    window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`, '_blank')
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          width: '100%',
          maxWidth: viewMode === 'PREVIEW' ? '1100px' : '920px',
          maxHeight: '94vh',
          background: '#0B132B',
          color: '#F8FAFC',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── MODAL HEADER ────────────────────────────────────────────────── */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#070D1E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(180, 35, 60, 0.2)', border: '1px solid #B4233C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F87171' }}>
              <FileText size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                {savedDoc?.id ? 'Edit Document' : 'Create New Document'}
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                OM Communication Works — Document Management System
              </div>
            </div>
          </div>

          {/* Toggle View Mode & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {viewMode === 'EDIT' ? (
              <button
                onClick={() => setViewMode('PREVIEW')}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6, background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Eye size={14} /> Live A4 Preview
              </button>
            ) : (
              <button
                onClick={() => setViewMode('EDIT')}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6, background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Edit3 size={14} /> Back to Edit Form
              </button>
            )}

            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4 }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── MODAL BODY ──────────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {viewMode === 'EDIT' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* STEP 1: SELECT DOCUMENT TYPE */}
              <div>
                <label className="form-label" style={{ color: '#E2E8F0', marginBottom: 10, display: 'block', fontWeight: 700 }}>
                  1. SELECT DOCUMENT TYPE
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {[
                    { id: 'QUOTATION', title: 'QUOTATION', desc: 'Price estimate / proposal sent before order confirmation.', icon: FileText },
                    { id: 'TAX_INVOICE', title: 'TAX INVOICE', desc: 'Formal invoice with 18% GST calculation & breakdown.', icon: Receipt },
                    { id: 'BILL', title: 'BILL / NON-GST', desc: 'Statement of charges without GST calculation.', icon: Calculator },
                  ].map(t => {
                    const Icon = t.icon
                    const isSelected = documentType === t.id
                    return (
                      <div
                        key={t.id}
                        onClick={() => setDocumentType(t.id)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: 10,
                          cursor: 'pointer',
                          background: isSelected ? 'rgba(180, 35, 60, 0.15)' : 'rgba(255,255,255,0.03)',
                          border: isSelected ? '2px solid #B4233C' : '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#F87171' : '#FFFFFF' }}>
                            {t.title}
                          </span>
                          <Icon size={16} color={isSelected ? '#F87171' : '#94A3B8'} />
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.3 }}>
                          {t.desc}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* STEP 2: CUSTOMER DETAILS */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <label className="form-label" style={{ color: '#E2E8F0', marginBottom: 14, display: 'block', fontWeight: 700 }}>
                  2. CUSTOMER & DELIVERY INFORMATION
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="form-label" style={{ color: '#94A3B8' }}>Customer / Company Name *</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Abhyant Apartments or M/S Delhi Infra"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ color: '#94A3B8' }}>Phone Number</label>
                    <input
                      className="form-input"
                      placeholder="e.g. +91 98765 43210"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ color: '#94A3B8' }}>Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="e.g. client@example.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ color: '#94A3B8' }}>GSTIN (where applicable)</label>
                    <input
                      className="form-input"
                      placeholder="e.g. 07AAAAA0000A1Z5"
                      value={clientGstin}
                      onChange={e => setClientGstin(e.target.value)}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label" style={{ color: '#94A3B8' }}>Billing & Site Address</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      placeholder="e.g. Plot No. 14, Vasundhara Enclave, Delhi-110096"
                      value={clientAddress}
                      onChange={e => setClientAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* STEP 3: LINE ITEMS EDITOR */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <label className="form-label" style={{ color: '#E2E8F0', margin: 0, fontWeight: 700 }}>
                    3. PRODUCTS & SERVICES (LINE ITEMS)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="btn-secondary"
                    style={{ padding: '4px 12px', fontSize: '0.75rem', gap: 4, background: 'rgba(255,255,255,0.08)' }}
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 110px 36px', gap: 10, fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, padding: '0 4px' }}>
                    <span>Description</span>
                    <span style={{ textAlign: 'center' }}>Qty</span>
                    <span style={{ textAlign: 'right' }}>Rate (₹)</span>
                    <span style={{ textAlign: 'right' }}>Amount (₹)</span>
                    <span />
                  </div>

                  {items.map((it, idx) => {
                    const amt = (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0)
                    return (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 110px 36px', gap: 10, alignItems: 'center' }}>
                        <input
                          className="form-input"
                          placeholder="Item description / technical scope..."
                          value={it.description}
                          onChange={e => handleItemChange(idx, 'description', e.target.value)}
                        />
                        <input
                          className="form-input"
                          type="number"
                          min="1"
                          style={{ textAlign: 'center' }}
                          value={it.quantity}
                          onChange={e => handleItemChange(idx, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                        />
                        <input
                          className="form-input"
                          type="number"
                          min="0"
                          style={{ textAlign: 'right' }}
                          value={it.unitPrice}
                          onChange={e => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                        <div style={{ textAlign: 'right', fontWeight: 700, color: '#4ADE80', fontSize: '0.9rem' }}>
                          ₹{amt.toLocaleString('en-IN')}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* STEP 4: DOCUMENT SETTINGS & TERMS */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <label className="form-label" style={{ color: '#E2E8F0', marginBottom: 14, display: 'block', fontWeight: 700 }}>
                  4. DOCUMENT SETTINGS & TAX CONFIGURATION
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {documentType === 'QUOTATION' && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="form-label" style={{ color: '#94A3B8' }}>Quotation Subject</label>
                      <input
                        className="form-input"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="checkbox"
                      id="gstToggle"
                      checked={gstEnabled}
                      onChange={e => setGstEnabled(e.target.checked)}
                      style={{ width: 18, height: 18, accentColor: '#B4233C', cursor: 'pointer' }}
                    />
                    <label htmlFor="gstToggle" style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600, cursor: 'pointer' }}>
                      Include GST (18% Tax)
                    </label>
                  </div>

                  {gstEnabled && (
                    <div>
                      <label className="form-label" style={{ color: '#94A3B8' }}>GST Rate (%)</label>
                      <input
                        className="form-input"
                        type="number"
                        value={gstRate}
                        onChange={e => setGstRate(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  )}

                  <div style={{ gridColumn: 'span 2', marginTop: 6 }}>
                    <label className="form-label" style={{ color: '#94A3B8' }}>Terms & Conditions (Bullet Points)</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      value={termsAndConditions}
                      onChange={e => setTermsAndConditions(e.target.value)}
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: 24, fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Subtotal: </span>
                    <span style={{ fontWeight: 700, color: '#FFFFFF' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {gstEnabled && (
                    <div>
                      <span style={{ color: '#94A3B8' }}>GST ({gstRate}%): </span>
                      <span style={{ fontWeight: 700, color: '#FBBF24' }}>₹{taxAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div>
                    <span style={{ color: '#94A3B8' }}>Total: </span>
                    <span style={{ fontWeight: 900, color: '#4ADE80', fontSize: '1.05rem' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* PREVIEW MODE: Realistic A4 Document Container */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              
              {/* Preview Action Toolbar */}
              <div style={{ width: '100%', maxWidth: '794px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  Document: <strong style={{ color: '#FFFFFF' }}>{currentDoc.invoiceNumber}</strong> ({documentType})
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={handlePrint} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6, background: '#FFFFFF', color: '#0F172A' }}>
                    <Printer size={14} /> Print / Save PDF
                  </button>

                  <button onClick={handleWhatsAppSend} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6, background: '#25D366', color: '#FFFFFF', border: 'none' }}>
                    <MessageCircle size={14} /> WhatsApp
                  </button>

                  <button onClick={handleEmailSend} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', gap: 6, background: '#3B82F6', color: '#FFFFFF', border: 'none' }}>
                    <Mail size={14} /> Email
                  </button>
                </div>
              </div>

              {/* Render Selected A4 Template */}
              <div style={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
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

        {/* ── MODAL FOOTER ACTIONS ────────────────────────────────────────── */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#070D1E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="button" onClick={onClose} className="btn-secondary" style={{ color: '#94A3B8' }}>
            Cancel
          </button>

          <div style={{ display: 'flex', gap: 12 }}>
            {viewMode === 'EDIT' ? (
              <>
                <button
                  type="button"
                  onClick={() => setViewMode('PREVIEW')}
                  className="btn-secondary"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
                >
                  <Eye size={15} /> Preview Document
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleFinalizeSave}
                  className="btn-primary"
                  style={{ background: '#B4233C', padding: '10px 20px' }}
                >
                  <ShieldCheck size={16} /> {loading ? 'Saving...' : 'Finalize & Save Document'}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setViewMode('EDIT')}
                  className="btn-secondary"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
                >
                  <Edit3 size={15} /> Edit Details
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleFinalizeSave}
                  className="btn-primary"
                  style={{ background: '#16A34A', padding: '10px 20px' }}
                >
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
