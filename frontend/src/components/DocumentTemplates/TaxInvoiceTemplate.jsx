import React from 'react'
import { numberToWordsINR } from '../../utils/numberToWords'

export default function TaxInvoiceTemplate({ doc = {} }) {
  const items = doc.items || []
  const dateStr = doc.createdAt
    ? new Date(doc.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const subtotal = Number(doc.subtotal || 0)
  const gstEnabled = doc.gstEnabled !== false
  const gstRate = Number(doc.gstRate || 18)
  const taxAmount = gstEnabled ? Number(doc.taxAmount || (subtotal * (gstRate / 100))) : 0
  const totalAmount = Number(doc.totalAmount || (subtotal + taxAmount))
  const totalQty = items.reduce((acc, it) => acc + (Number(it.quantity) || 1), 0)

  return (
    <div
      className="a4-document invoice-doc"
      style={{
        width: '100%',
        maxWidth: '794px',
        minHeight: '1123px',
        margin: '0 auto',
        padding: '24px',
        background: '#FFFFFF',
        color: '#0F172A',
        fontFamily: "'Inter', Arial, sans-serif",
        boxSizing: 'border-box',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        borderRadius: 4,
        position: 'relative',
        fontSize: '12px',
        lineHeight: 1.4,
      }}
    >
      {/* ── MAIN CONTAINER BORDER ────────────────────────────────────────── */}
      <div style={{ border: '2px solid #0F172A', height: '100%', minHeight: '1050px', display: 'flex', flexDirection: 'column' }}>
        
        {/* ── TOP HEADER ──────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', padding: '16px 12px', borderBottom: '2px solid #0F172A' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 900, color: '#991B1B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            OM COMMUNICATION WORKS
          </h1>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
            1/4007 Ram Nagar Shahdara, Delhi, 110032
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A', marginTop: 2 }}>
            GSTIN: 07COSPS8901L2Z0 &nbsp;|&nbsp; PAN Number: COSPS8901L
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: 2 }}>
            Ph: +91 72177 15296, 9643610564 &nbsp;|&nbsp; Email: singhomkar053@gmail.com
          </div>
        </div>

        {/* ── BILL TO & INVOICE NO / DATE HEADER BOX ──────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', borderBottom: '2px solid #0F172A' }}>
          <div style={{ padding: '12px 16px', borderRight: '2px solid #0F172A' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
              BILL TO
            </div>
            <div style={{ fontWeight: 900, fontSize: '14px', color: '#0F172A', textTransform: 'uppercase' }}>
              {doc.clientName || 'CUSTOMER NAME / ORGANIZATION'}
            </div>
            {doc.clientAddress && (
              <div style={{ fontSize: '11.5px', color: '#334155', marginTop: 2, whiteSpace: 'pre-line' }}>
                Address: {doc.clientAddress}
              </div>
            )}
            {doc.clientGstin && (
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A', marginTop: 2 }}>
                GSTIN: {doc.clientGstin}
              </div>
            )}
            {doc.clientPhone && (
              <div style={{ fontSize: '11px', color: '#475569' }}>
                Ph: {doc.clientPhone}
              </div>
            )}
          </div>

          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 800, color: '#0F172A' }}>Invoice No.</span>
              <span style={{ fontWeight: 900, color: '#991B1B', fontSize: '13px' }}>{doc.invoiceNumber || 'OCW-INV-2026-001'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 800, color: '#0F172A' }}>Invoice Date</span>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>{dateStr}</span>
            </div>
          </div>
        </div>

        {/* ── TABLE AREA ──────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#FCE7F3', borderBottom: '2px solid #0F172A' }}>
                <th style={{ padding: '8px 6px', borderRight: '1px solid #0F172A', width: '45px', textAlign: 'center', fontWeight: 800 }}>S.NO.</th>
                <th style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', textAlign: 'left', fontWeight: 800 }}>ITEMS / DESCRIPTION</th>
                <th style={{ padding: '8px 6px', borderRight: '1px solid #0F172A', width: '70px', textAlign: 'center', fontWeight: 800 }}>QTY.</th>
                <th style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', width: '90px', textAlign: 'right', fontWeight: 800 }}>RATE</th>
                <th style={{ padding: '8px 10px', width: '110px', textAlign: 'right', fontWeight: 800 }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const amt = Number(item.amount || (item.quantity * item.unitPrice) || 0)
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 6px', borderRight: '1px solid #0F172A', textAlign: 'center', fontWeight: 700, verticalAlign: 'top' }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: '10px 10px', borderRight: '1px solid #0F172A', fontWeight: 600, verticalAlign: 'top', textTransform: 'uppercase' }}>
                      {item.description}
                    </td>
                    <td style={{ padding: '10px 6px', borderRight: '1px solid #0F172A', textAlign: 'center', fontWeight: 700, verticalAlign: 'top' }}>
                      {item.quantity} {item.unit ? item.unit.toUpperCase() : 'NOS'}
                    </td>
                    <td style={{ padding: '10px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', verticalAlign: 'top', fontWeight: 600 }}>
                      {Number(item.unitPrice || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', verticalAlign: 'top', fontWeight: 700 }}>
                      {amt.toLocaleString('en-IN')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Spacer to push total row to bottom if table items are few */}
          <div style={{ flex: 1, minHeight: '120px' }} />

          {/* SUBTOTAL & GST ROWS */}
          <table style={{ width: '100%', borderCollapse: 'collapse', borderTop: '2px solid #0F172A', fontSize: '12px' }}>
            <tbody>
              {gstEnabled && taxAmount > 0 && (
                <>
                  <tr style={{ borderBottom: '1px solid #CBD5E1' }}>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', fontWeight: 700 }}>
                      SUBTOTAL
                    </td>
                    <td style={{ padding: '6px 10px', width: '110px', textAlign: 'right', fontWeight: 700 }}>
                      ₹ {subtotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #CBD5E1' }}>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', fontWeight: 700 }}>
                      CGST ({gstRate / 2}%) + SGST ({gstRate / 2}%) [{gstRate}% GST]
                    </td>
                    <td style={{ padding: '6px 10px', width: '110px', textAlign: 'right', fontWeight: 700 }}>
                      ₹ {taxAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </>
              )}

              {/* TOTAL ROW */}
              <tr style={{ background: '#FCE7F3', borderTop: '2px solid #0F172A' }}>
                <td style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', fontWeight: 900, fontSize: '12.5px' }}>
                  TOTAL
                </td>
                <td style={{ padding: '8px 6px', borderRight: '1px solid #0F172A', width: '70px', textAlign: 'center', fontWeight: 900 }}>
                  {totalQty}
                </td>
                <td style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', width: '90px' }} />
                <td style={{ padding: '8px 10px', width: '110px', textAlign: 'right', fontWeight: 900, fontSize: '13px', color: '#0F172A' }}>
                  ₹ {totalAmount.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── AMOUNT IN WORDS BOX ─────────────────────────────────────────── */}
        <div style={{ borderTop: '2px solid #0F172A', padding: '10px 14px', background: '#FFFFFF' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#334155' }}>
            TotalAmount(inwords)
          </div>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', marginTop: 2, textTransform: 'capitalize' }}>
            {numberToWordsINR(totalAmount)}
          </div>
        </div>

        {/* ── SIGNATURE BOX ───────────────────────────────────────────────── */}
        <div style={{ borderTop: '2px solid #0F172A', padding: '16px 14px', textAlign: 'center', background: '#FFFFFF' }}>
          <div style={{ margin: '0 auto 6px', width: '160px', borderBottom: '1px dashed #64748B' }} />
          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0F172A' }}>
            AuthorisedSignatory For OM COMMUNICATIONWORKS
          </div>
        </div>
      </div>
    </div>
  )
}
