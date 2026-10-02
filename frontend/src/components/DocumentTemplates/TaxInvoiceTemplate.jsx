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

  const border = '1.5px solid #1E293B'
  const headerBg = '#F1F5F9'

  return (
    <div
      className="a4-document invoice-doc"
      style={{
        width: '794px',
        margin: '0 auto',
        padding: '20px',
        background: '#FFFFFF',
        color: '#0F172A',
        fontFamily: "'Inter', Arial, sans-serif",
        boxSizing: 'border-box',
        boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
        borderRadius: 3,
        fontSize: '11.5px',
        lineHeight: 1.45,
      }}
    >
      {/* ── OUTER BORDER ───────────────────────────────────────── */}
      <div style={{ border, padding: 0 }}>

        {/* ── HEADER: Company Info ──────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          padding: '14px 14px 10px',
          borderBottom: border,
          background: '#FAFAFA',
        }}>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#991B1B', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 3 }}>
            OM COMMUNICATION WORKS
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155' }}>
            Electronics and Electrical — EPABX (Intercom), VDP, CCTV Camera, UPS
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: 2 }}>
            1/4007 Ram Nagar Shahdara, Delhi, 110032
          </div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', marginTop: 2 }}>
            GSTIN: 07COSPS8901L2Z0&nbsp;&nbsp;|&nbsp;&nbsp;PAN: COSPS8901L
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: 1 }}>
            Ph: +91 72177 15296, 9643610564&nbsp;&nbsp;|&nbsp;&nbsp;Email: singhomkar053@gmail.com
          </div>
        </div>

        {/* ── DOCUMENT TITLE BAR ───────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          padding: '6px',
          borderBottom: border,
          background: '#991B1B',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: 900,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          TAX INVOICE
        </div>

        {/* ── BILL TO / INVOICE META ────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', borderBottom: border }}>
          {/* Bill To */}
          <div style={{ padding: '10px 14px', borderRight: border }}>
            <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              BILL TO
            </div>
            <div style={{ fontWeight: 900, fontSize: '13px', color: '#0F172A', textTransform: 'uppercase' }}>
              {doc.clientName || 'CUSTOMER NAME / ORGANIZATION'}
            </div>
            {doc.clientAddress && (
              <div style={{ fontSize: '11px', color: '#334155', marginTop: 3, whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                {doc.clientAddress}
              </div>
            )}
            {doc.clientGstin && (
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A', marginTop: 3 }}>
                GSTIN: {doc.clientGstin}
              </div>
            )}
            {doc.clientPhone && (
              <div style={{ fontSize: '11px', color: '#475569', marginTop: 2 }}>
                Ph: {doc.clientPhone}
              </div>
            )}
            {doc.clientEmail && (
              <div style={{ fontSize: '11px', color: '#475569' }}>
                Email: {doc.clientEmail}
              </div>
            )}
          </div>

          {/* Invoice Meta */}
          <div style={{ padding: '10px 14px' }}>
            <table style={{ width: '100%', fontSize: '11.5px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '4px 0', fontWeight: 700, color: '#334155' }}>Invoice No.</td>
                  <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 900, color: '#991B1B', fontSize: '12px' }}>
                    {doc.invoiceNumber || 'OCW-INV-2026-001'}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', fontWeight: 700, color: '#334155' }}>Invoice Date</td>
                  <td style={{ padding: '4px 0', textAlign: 'right', fontWeight: 700 }}>{dateStr}</td>
                </tr>
                {doc.subject && (
                  <tr>
                    <td colSpan={2} style={{ padding: '6px 0 0', fontWeight: 700, color: '#334155', fontSize: '10.5px' }}>
                      Sub: {doc.subject}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ITEMS TABLE ───────────────────────────────────────── */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ background: headerBg }}>
              <th style={{ padding: '8px 6px', borderBottom: border, borderRight: border, width: '42px', textAlign: 'center', fontWeight: 800, fontSize: '11px' }}>S.NO.</th>
              <th style={{ padding: '8px 10px', borderBottom: border, borderRight: border, textAlign: 'left', fontWeight: 800, fontSize: '11px' }}>ITEMS / DESCRIPTION</th>
              <th style={{ padding: '8px 6px', borderBottom: border, borderRight: border, width: '65px', textAlign: 'center', fontWeight: 800, fontSize: '11px' }}>QTY.</th>
              <th style={{ padding: '8px 10px', borderBottom: border, borderRight: border, width: '90px', textAlign: 'right', fontWeight: 800, fontSize: '11px' }}>RATE (₹)</th>
              <th style={{ padding: '8px 10px', borderBottom: border, width: '105px', textAlign: 'right', fontWeight: 800, fontSize: '11px' }}>AMOUNT (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const amt = Number(item.amount || ((item.quantity || 1) * (item.unitPrice || 0)) || 0)
              return (
                <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '9px 6px', borderRight: border, textAlign: 'center', fontWeight: 700, verticalAlign: 'top' }}>
                    {idx + 1}
                  </td>
                  <td style={{ padding: '9px 10px', borderRight: border, fontWeight: 600, verticalAlign: 'top', textTransform: 'uppercase', wordBreak: 'break-word' }}>
                    {item.description}
                  </td>
                  <td style={{ padding: '9px 6px', borderRight: border, textAlign: 'center', fontWeight: 700, verticalAlign: 'top' }}>
                    {item.quantity} {item.unit ? item.unit.toUpperCase() : 'NOS'}
                  </td>
                  <td style={{ padding: '9px 10px', borderRight: border, textAlign: 'right', verticalAlign: 'top', fontWeight: 600 }}>
                    {Number(item.unitPrice || 0).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '9px 10px', textAlign: 'right', verticalAlign: 'top', fontWeight: 700 }}>
                    {amt.toLocaleString('en-IN')}
                  </td>
                </tr>
              )
            })}
            {/* Filler row if few items to give some breathing room but NOT an enormous space */}
            {items.length < 4 && (
              <tr>
                <td colSpan={5} style={{ height: `${Math.max(20, (4 - items.length) * 18)}px`, borderBottom: border }} />
              </tr>
            )}
          </tbody>

          {/* ── SUBTOTAL / GST / TOTAL ROWS ─────────────────────── */}
          <tfoot>
            {gstEnabled && taxAmount > 0 && (
              <>
                <tr style={{ borderTop: border }}>
                  <td colSpan={4} style={{ padding: '6px 10px', borderRight: border, textAlign: 'right', fontWeight: 700, borderTop: border }}>
                    SUBTOTAL
                  </td>
                  <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, borderTop: border }}>
                    ₹ {subtotal.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: '6px 10px', borderRight: border, textAlign: 'right', fontWeight: 700, borderTop: '1px solid #CBD5E1' }}>
                    CGST ({gstRate / 2}%) + SGST ({gstRate / 2}%) = GST {gstRate}%
                  </td>
                  <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 700, borderTop: '1px solid #CBD5E1' }}>
                    ₹ {taxAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </>
            )}

            {/* TOTAL ROW */}
            <tr style={{ background: '#F1F5F9', borderTop: border }}>
              <td style={{ padding: '8px 6px', borderRight: border, borderTop: border, textAlign: 'center', fontWeight: 900 }}>
                TOTAL
              </td>
              <td style={{ padding: '8px 10px', borderRight: border, borderTop: border, fontWeight: 700, fontSize: '11px', color: '#334155' }}>
                {/* empty */}
              </td>
              <td style={{ padding: '8px 6px', borderRight: border, borderTop: border, textAlign: 'center', fontWeight: 900 }}>
                {totalQty}
              </td>
              <td style={{ padding: '8px 10px', borderRight: border, borderTop: border, textAlign: 'right' }} />
              <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 900, fontSize: '13px', color: '#0F172A', borderTop: border }}>
                ₹ {totalAmount.toLocaleString('en-IN')}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* ── AMOUNT IN WORDS ───────────────────────────────────── */}
        <div style={{ borderTop: border, padding: '8px 14px', background: '#FAFAFA' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
            Total Amount (In Words):&nbsp;
          </span>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>
            {numberToWordsINR(totalAmount)}
          </span>
        </div>

        {/* ── TERMS & CONDITIONS ───────────────────────────────── */}
        {doc.termsAndConditions && (
          <div style={{ borderTop: border, padding: '8px 14px' }}>
            <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
              TERMS & CONDITIONS
            </div>
            {doc.termsAndConditions.split('\n').filter(Boolean).map((t, i) => (
              <div key={i} style={{ fontSize: '10.5px', color: '#334155', fontWeight: 600, marginBottom: 2 }}>
                • {t}
              </div>
            ))}
          </div>
        )}

        {/* ── SIGNATORY ────────────────────────────────────────── */}
        <div style={{ borderTop: border, padding: '16px 14px 12px', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'center', minWidth: 200 }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: 2 }}>For</div>
            <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginBottom: 32 }}>
              OM COMMUNICATION WORKS
            </div>
            <div style={{ borderTop: '1px solid #334155', paddingTop: 5 }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                Authorised Signatory
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
