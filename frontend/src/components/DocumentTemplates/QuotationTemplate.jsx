import React from 'react'

export default function QuotationTemplate({ doc = {} }) {
  const items = doc.items || []
  const dateStr = doc.createdAt
    ? new Date(doc.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const subtotal = Number(doc.subtotal || 0)
  const gstEnabled = doc.gstEnabled !== false
  const gstRate = Number(doc.gstRate || 18)
  const taxAmount = gstEnabled ? Number(doc.taxAmount || 0) : 0
  const totalAmount = Number(doc.totalAmount || (subtotal + taxAmount))

  // Parse terms or default terms
  const termsList = doc.termsAndConditions
    ? doc.termsAndConditions.split('\n').filter(Boolean)
    : [
        'ADVANCE PAYMENT 75% WITH WORK ORDER, 25% ON COMPLETION',
        gstEnabled ? `GST ${gstRate}% INCLUDED AS APPLICABLE` : 'PRICES ARE NETT WITHOUT GST',
        '1-YEAR ON-SITE HARDWARE WARRANTY AGAINST MANUFACTURING DEFECTS',
        'CABLE AND PIPING CHARGED AS PER ACTUAL SITE MEASUREMENTS'
      ]

  return (
    <div
      className="a4-document quotation-doc"
      style={{
        width: '100%',
        maxWidth: '794px',
        minHeight: '1123px',
        margin: '0 auto',
        padding: '36px 44px',
        background: '#FFFFFF',
        color: '#1E293B',
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        boxSizing: 'border-box',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        borderRadius: 4,
        position: 'relative',
        fontSize: '13px',
        lineHeight: 1.45,
      }}
    >
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', position: 'relative', borderBottom: '2px solid #991B1B', paddingBottom: 12, marginBottom: 16 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 700, color: '#334155' }}>
          GSTIN :- 07COSPS8901L2Z0
        </div>
        <h1 style={{ margin: '0 0 2px', fontSize: '24px', fontWeight: 900, color: '#991B1B', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          OM COMMUNICATION WORKS
        </h1>
        <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#1E293B', marginBottom: 2 }}>
          Electronics and Electrical
        </div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', letterSpacing: '0.03em' }}>
          EPABX (INTERCOM), VDP, CCTV CAMERA , UPS
        </div>
        <div style={{ fontSize: '11px', color: '#475569', marginTop: 2 }}>
          1/4007, Ram Nagar, Shahdara, Delhi-110032
        </div>
        <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600, marginTop: 2 }}>
          M :- +91 72177 15296, 9643610564 &nbsp;|&nbsp; E-mail :- singhomkar053@gmail.com
        </div>
      </div>

      {/* ── CUSTOMER & SUBJECT HEADER ────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '12.5px', color: '#0F172A' }}>M/S</div>
          <div style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A', textTransform: 'uppercase' }}>
            {doc.clientName || 'CUSTOMER NAME / ORGANIZATION'}
          </div>
          {doc.clientAddress && (
            <div style={{ fontSize: '12px', color: '#475569', whiteSpace: 'pre-line', marginTop: 2, maxWidth: 450 }}>
              {doc.clientAddress}
            </div>
          )}
          {doc.clientPhone && <div style={{ fontSize: '11.5px', color: '#475569' }}>Ph: {doc.clientPhone}</div>}
          {doc.clientGstin && <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 600 }}>GSTIN: {doc.clientGstin}</div>}
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>
            DATE:- {dateStr}
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#991B1B', marginTop: 4 }}>
            Ref: {doc.invoiceNumber || 'OCW-Q-2026-001'}
          </div>
        </div>
      </div>

      <div style={{ fontWeight: 800, fontSize: '13px', color: '#0F172A', marginBottom: 8, textTransform: 'uppercase' }}>
        Sub:- {doc.subject || 'QUOTATION FOR SECURITY & TELECOM SYSTEM'}
      </div>

      <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#334155' }}>
        Dear Sir,
      </p>
      <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#334155', textAlign: 'justify' }}>
        Thanks for the keen interest shown in our products and thanks for the courtesy extended to us to serve you and also for your valuable time provided to us to understand your requirements. Please feel free to contact me in case of any clarification.
      </p>

      {/* ── MAIN ITEMS TABLE ─────────────────────────────────────────────── */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1.5px solid #0F172A',
          marginBottom: 16,
          fontSize: '12px',
        }}
      >
        <thead>
          <tr style={{ background: '#F8FAFC', borderBottom: '1.5px solid #0F172A' }}>
            <th style={{ padding: '8px 6px', borderRight: '1px solid #0F172A', width: '45px', textAlign: 'center', fontWeight: 800 }}>S.NO</th>
            <th style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', textAlign: 'left', fontWeight: 800 }}>DESCRIPTION</th>
            <th style={{ padding: '8px 6px', borderRight: '1px solid #0F172A', width: '85px', textAlign: 'center', fontWeight: 800 }}>QUANTITY</th>
            <th style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', width: '95px', textAlign: 'right', fontWeight: 800 }}>RATE</th>
            <th style={{ padding: '8px 10px', width: '110px', textAlign: 'right', fontWeight: 800 }}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const amt = Number(item.amount || (item.quantity * item.unitPrice) || 0)
            return (
              <tr key={idx} style={{ borderBottom: '1px solid #CBD5E1' }}>
                <td style={{ padding: '8px 6px', borderRight: '1px solid #0F172A', textAlign: 'center', fontWeight: 700, verticalAlign: 'top' }}>
                  {idx + 1}.
                </td>
                <td style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', fontWeight: 600, verticalAlign: 'top', textTransform: 'uppercase' }}>
                  {item.description}
                </td>
                <td style={{ padding: '8px 6px', borderRight: '1px solid #0F172A', textAlign: 'center', fontWeight: 700, verticalAlign: 'top' }}>
                  {item.quantity} {item.unit ? item.unit.toUpperCase() : 'NOS'}
                </td>
                <td style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', verticalAlign: 'top', fontWeight: 600 }}>
                  {Number(item.unitPrice || 0).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'right', verticalAlign: 'top', fontWeight: 700 }}>
                  {amt.toLocaleString('en-IN')}/-
                </td>
              </tr>
            )
          })}

          {/* Subtotal / GST rows if applicable */}
          {gstEnabled && taxAmount > 0 && (
            <>
              <tr style={{ borderTop: '1px solid #0F172A' }}>
                <td colSpan={4} style={{ padding: '6px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', fontWeight: 700 }}>
                  SUBTOTAL
                </td>
                <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700 }}>
                  ₹ {subtotal.toLocaleString('en-IN')}/-
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: '6px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', fontWeight: 700 }}>
                  GST ({gstRate}%)
                </td>
                <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700 }}>
                  ₹ {taxAmount.toLocaleString('en-IN')}/-
                </td>
              </tr>
            </>
          )}

          {/* TOTAL ROW */}
          <tr style={{ borderTop: '1.5px solid #0F172A', background: '#F1F5F9' }}>
            <td colSpan={4} style={{ padding: '8px 10px', borderRight: '1px solid #0F172A', textAlign: 'right', fontWeight: 900, fontSize: '13px' }}>
              TOTAL
            </td>
            <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 900, fontSize: '14px', color: '#0F172A' }}>
              {totalAmount.toLocaleString('en-IN')}/-
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── TERMS & CONDITIONS ────────────────────────────────────────────── */}
      <div style={{ marginTop: 16, marginBottom: 20 }}>
        <div style={{ fontWeight: 800, fontSize: '12.5px', color: '#0F172A', marginBottom: 6, textTransform: 'uppercase' }}>
          TERMS AND CONDITIONS
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: '11.5px', color: '#334155' }}>
          {termsList.map((term, i) => (
            <li key={i} style={{ marginBottom: 3, fontWeight: 700, textTransform: 'uppercase' }}>
              {term}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 12, marginBottom: 0, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
          Looking forward to your valuable order and assuring you of our best services at all times.
        </p>
      </div>

      {/* ── FOOTER / SIGNATURE ────────────────────────────────────────────── */}
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 12 }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Yours Truly,</div>
          <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#0F172A', marginTop: 16, textTransform: 'uppercase' }}>
            OMKAR SINGH
          </div>
          <div style={{ fontSize: '11.5px', color: '#334155', fontWeight: 700 }}>
            +91 72177 15296, 9643610564
          </div>
          <div style={{ fontSize: '11px', color: '#475569' }}>
            EMAIL:- SINGHOMKAR053@GMAIL.COM
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ borderBottom: '1px dashed #94A3B8', width: '180px', marginBottom: 6 }} />
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
            Authorised Signatory
          </div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#991B1B' }}>
            OM COMMUNICATION WORKS
          </div>
        </div>
      </div>
    </div>
  )
}
