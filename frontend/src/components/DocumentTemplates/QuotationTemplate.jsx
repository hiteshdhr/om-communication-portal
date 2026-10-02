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

  // Custom terms or default from reference
  const defaultTerms = [
    'ADVANCE PAYMENT 100%',
    gstEnabled ? 'INCLUDE GST' : 'GST EXTRA AS APPLICABLE',
  ]
  const termsList = doc.termsAndConditions
    ? doc.termsAndConditions.split('\n').filter(Boolean)
    : defaultTerms

  return (
    <div
      className="a4-document quotation-doc"
      style={{
        width: '794px',
        minHeight: '1123px',
        margin: '0 auto',
        padding: '30px 40px',
        background: '#FFFFFF',
        color: '#000000',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        boxSizing: 'border-box',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        fontSize: '12px',
        lineHeight: 1.45,
      }}
    >
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', position: 'relative', marginBottom: 16, paddingBottom: 6 }}>
        {/* Top left GSTIN */}
        <div style={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 700, color: '#000000' }}>
          GSTIN :- 07COSPS8901L2Z0
        </div>

        {/* Title & Underline */}
        <h1 style={{
          margin: '0 0 2px',
          fontSize: '28px',
          fontWeight: 900,
          color: '#B22222',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          textDecoration: 'underline',
          textDecorationColor: '#B22222',
          textUnderlineOffset: '4px',
        }}>
          OM COMMUNICATION WORKS
        </h1>

        <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginTop: 4 }}>
          Electronics and Electrical
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginTop: 1 }}>
          EPABX (INTERCOM), VDP, CCTV CAMERA , UPS
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginTop: 1 }}>
          1/4007, Ram Nagar, Shahdara, Delhi-110032
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginTop: 1 }}>
          M :-7217715296, 9643610564
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginTop: 1 }}>
          E-mail :- <span style={{ color: '#0056b3', textDecoration: 'underline' }}>singhomkar053@gmail.com</span>
        </div>
      </div>

      {/* ── CUSTOMER & SUBJECT ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 800, fontSize: '12px', color: '#000000', marginBottom: 2 }}>M/S</div>
        <div style={{ fontWeight: 800, fontSize: '13px', color: '#000000', textTransform: 'uppercase', marginBottom: doc.clientAddress ? 2 : 10 }}>
          {doc.clientName || 'SHRI KRISHNA SEHKARI AWAS SAMITI'}
        </div>
        {doc.clientAddress && (
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#000000', whiteSpace: 'pre-line', marginBottom: 10 }}>
            {doc.clientAddress}
          </div>
        )}

        <div style={{ fontWeight: 800, fontSize: '12px', color: '#000000', marginBottom: 12, textTransform: 'uppercase' }}>
          Sub:- {doc.subject || 'QUOTATION FOR IP CAMERAS'}
        </div>

        <div style={{ fontWeight: 700, fontSize: '12px', color: '#000000', marginBottom: 8 }}>Dear Sir,</div>

        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: '#000000', lineHeight: 1.4 }}>
          Thanks for the keen interest shown in our products and thanks for the courtesy extended to us to serve you and also for your valuable time provided to us to understand your requirements.
        </p>

        <p style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: 700, color: '#000000' }}>
          Please feel free to contact me in case of any clarification.
        </p>
      </div>

      {/* ── DATE ALIGNED RIGHT ABOVE TABLE ───────────────────────────────── */}
      <div style={{ textAlign: 'right', fontWeight: 800, fontSize: '12px', color: '#000000', marginBottom: 4 }}>
        DATE:- {doc.createdAt ? dateStr : '03/04/2025'}
      </div>

      {/* ── ITEMS TABLE ──────────────────────────────────────────────────── */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '2px solid #000000',
        marginBottom: 24,
        fontSize: '11.5px',
      }}>
        <thead>
          <tr style={{ background: '#FFFFFF', borderBottom: '2px solid #000000' }}>
            <th style={{ padding: '8px 6px', borderRight: '2px solid #000000', width: '55px', textAlign: 'left', fontWeight: 800 }}>S.NO</th>
            <th style={{ padding: '8px 8px', borderRight: '2px solid #000000', textAlign: 'left', fontWeight: 800 }}>DESCRIPTION</th>
            <th style={{ padding: '8px 6px', borderRight: '2px solid #000000', width: '130px', textAlign: 'center', fontWeight: 800 }}>QUANTITY</th>
            <th style={{ padding: '8px 8px', borderRight: '2px solid #000000', width: '100px', textAlign: 'center', fontWeight: 800 }}>RATE</th>
            <th style={{ padding: '8px 8px', width: '115px', textAlign: 'right', fontWeight: 800 }}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const amt = Number(item.amount || ((item.quantity || 1) * (item.unitPrice || 0)) || 0)
            return (
              <tr key={idx} style={{ borderBottom: '1.5px solid #000000' }}>
                <td style={{ padding: '8px 6px', borderRight: '2px solid #000000', textAlign: 'left', fontWeight: 700, verticalAlign: 'top' }}>
                  {idx + 1}.
                </td>
                <td style={{ padding: '8px 8px', borderRight: '2px solid #000000', fontWeight: 700, verticalAlign: 'top', textTransform: 'uppercase', wordBreak: 'break-word' }}>
                  {item.description}
                </td>
                <td style={{ padding: '8px 6px', borderRight: '2px solid #000000', textAlign: 'center', fontWeight: 700, verticalAlign: 'top' }}>
                  {item.quantity} {item.unit ? item.unit.toUpperCase() : 'NOS'}
                </td>
                <td style={{ padding: '8px 8px', borderRight: '2px solid #000000', textAlign: 'center', verticalAlign: 'top', fontWeight: 700 }}>
                  {Number(item.unitPrice || 0).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '8px 8px', textAlign: 'right', verticalAlign: 'top', fontWeight: 700 }}>
                  {amt.toLocaleString('en-IN')}/-
                </td>
              </tr>
            )
          })}

          {/* Table Total Row */}
          <tr style={{ borderTop: '2px solid #000000' }}>
            <td style={{ padding: '10px 6px', borderRight: '2px solid #000000' }} />
            <td style={{ padding: '10px 8px', borderRight: '2px solid #000000' }} />
            <td style={{ padding: '10px 6px', borderRight: '2px solid #000000' }} />
            <td style={{ padding: '10px 8px', borderRight: '2px solid #000000' }} />
            <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 800, fontSize: '12px', color: '#000000' }}>
              {totalAmount.toLocaleString('en-IN')}/-
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── TERMS AND CONDITIONS ────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 800, fontSize: '13px', color: '#000000', marginBottom: 8, textTransform: 'uppercase' }}>
          TERMS AND CONDITIONS
        </div>
        <ul style={{ margin: '0 0 14px', paddingLeft: 20, fontSize: '12px', color: '#000000', listStyleType: 'disc' }}>
          {termsList.map((term, i) => (
            <li key={i} style={{ marginBottom: 4, fontWeight: 800, textTransform: 'uppercase' }}>
              {term}
            </li>
          ))}
        </ul>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#000000' }}>
          Looking forward to your valuable order and assuring you of our best services at all times.
        </div>
      </div>

      {/* ── SIGNATURE / YOURS TRULY ──────────────────────────────────────── */}
      <div style={{ marginTop: 30 }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#000000', marginBottom: 12 }}>Yours Truly,</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#000000', textTransform: 'uppercase' }}>
          OMKAR SINGH
        </div>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#000000', marginTop: 2 }}>
          +917217715296,9643610564
        </div>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#000000', marginTop: 2 }}>
          EMAIL:- <span style={{ color: '#0056b3', textDecoration: 'underline' }}>SINGHOMKAR053@GMAIL.COM</span>
        </div>
      </div>
    </div>
  )
}
