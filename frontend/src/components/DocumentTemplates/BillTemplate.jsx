import React from 'react'
import { numberToWordsINR } from '../../utils/numberToWords'

export default function BillTemplate({ doc = {} }) {
  const items = doc.items || []
  const dateStr = doc.createdAt
    ? new Date(doc.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const totalAmount = Number(doc.totalAmount || doc.subtotal || 0)
  const totalQty = items.reduce((acc, it) => acc + (Number(it.quantity) || 1), 0)

  const outerBorder = '1.5px solid #B0B0B0'
  const innerBorder = '1px solid #B0B0B0'
  const pinkBg = '#FCE7F3'   // matches reference image — keep as-is

  // Quantity label: "1 NO" / "4 NOS"
  const qtyLabel = (qty) => {
    const n = Number(qty) || 1
    return `${n}${n === 1 ? 'NO.' : 'NOS.'}`
  }

  // Default terms if none configured
  const defaultTerms = ['ADVANCE PAYMENT 100%', 'GOODS ONCE SOLD WILL NOT BE TAKEN BACK']
  const termsList = doc.termsAndConditions
    ? doc.termsAndConditions.split('\n').filter(Boolean)
    : defaultTerms

  return (
    <div
      className="a4-document bill-doc"
      style={{
        width: '794px',
        minHeight: '1123px',
        margin: '0 auto',
        padding: '24px',
        background: '#FFFFFF',
        color: '#0F172A',
        fontFamily: "'Inter', Arial, sans-serif",
        boxSizing: 'border-box',
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        fontSize: '12px',
        lineHeight: 1.4,
      }}
    >
      {/* Print isolation — hides all admin UI; only .a4-document prints */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .a4-document { visibility: visible !important; position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; margin: 0 !important; padding: 20px !important; box-shadow: none !important; border-radius: 0 !important; }
          .a4-document * { visibility: visible !important; }
          @page { margin: 0; size: A4 portrait; }
        }
      `}</style>

      {/* ── OUTER BORDER CONTAINER ─────────────────────────────── */}
      <div style={{
        border: outerBorder,
        minHeight: '1075px',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* ── COMPANY HEADER ────────────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          padding: '14px 16px 12px',
          borderBottom: outerBorder,
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 900,
            color: '#CC1B1B',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            marginBottom: 3,
          }}>
            OM COMMUNICATION WORKS
          </div>
          <div style={{ fontSize: '12px', color: '#333333' }}>
            1/4007 Ram Nagar Shahdara, Delhi, 110032
          </div>
          <div style={{ fontSize: '12px', color: '#333333', marginTop: 1 }}>
            PAN Number: COSPS8901L
          </div>
        </div>

        {/* ── BILL TO / INVOICE META ────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 260px',
          borderBottom: outerBorder,
          minHeight: '72px',
        }}>
          {/* Left: Bill To */}
          <div style={{ padding: '10px 14px', borderRight: outerBorder }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#555555', textTransform: 'uppercase', marginBottom: 3 }}>
              BILL TO
            </div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
              {doc.clientName || 'CUSTOMER NAME'}
            </div>
            {doc.clientAddress && (
              <div style={{ fontSize: '11.5px', color: '#333333', marginTop: 2, whiteSpace: 'pre-line' }}>
                Address: {doc.clientAddress}
              </div>
            )}
            {doc.clientPhone && (
              <div style={{ fontSize: '11px', color: '#555555', marginTop: 1 }}>Ph: {doc.clientPhone}</div>
            )}
            {doc.clientEmail && (
              <div style={{ fontSize: '11px', color: '#555555' }}>Email: {doc.clientEmail}</div>
            )}
          </div>

          {/* Right: Invoice No. + Invoice Date side-by-side (matches reference) */}
          <div style={{ padding: '10px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            <div style={{ borderRight: innerBorder, paddingRight: 10 }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#555555', marginBottom: 4 }}>Invoice No.</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                {doc.invoiceNumber || 'OCW-B-2026-001'}
              </div>
            </div>
            <div style={{ paddingLeft: 10 }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#555555', marginBottom: 4 }}>Invoice Date</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{dateStr}</div>
            </div>
          </div>
        </div>

        {/* ── TABLE SECTION (fills remaining height) ────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 1fr 80px 90px 110px',
            borderBottom: outerBorder,
          }}>
            {[
              { label: 'S.NO.', align: 'center', borderRight: true },
              { label: 'ITEMS', align: 'center', borderRight: true },
              { label: 'QTY.', align: 'center', borderRight: true },
              { label: 'RATE', align: 'center', borderRight: true },
              { label: 'AMOUNT', align: 'right', borderRight: false },
            ].map((col) => (
              <div
                key={col.label}
                style={{
                  padding: '8px 6px',
                  fontWeight: 800,
                  fontSize: '11.5px',
                  textAlign: col.align,
                  borderRight: col.borderRight ? innerBorder : 'none',
                }}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Item Rows */}
          <div style={{ flex: 1 }}>
            {items.map((item, idx) => {
              const amt = Number(item.amount || ((item.quantity || 1) * (item.unitPrice || 0)) || 0)
              return (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 1fr 80px 90px 110px',
                    borderBottom: innerBorder,
                    minHeight: '30px',
                    alignItems: 'start',
                  }}
                >
                  <div style={{ padding: '7px 6px', borderRight: innerBorder, textAlign: 'center', fontWeight: 600 }}>
                    {idx + 1}
                  </div>
                  <div style={{ padding: '7px 10px', borderRight: innerBorder, fontWeight: 500, textTransform: 'uppercase', wordBreak: 'break-word', lineHeight: 1.35 }}>
                    {item.description}
                  </div>
                  <div style={{ padding: '7px 6px', borderRight: innerBorder, textAlign: 'center', fontWeight: 600 }}>
                    {qtyLabel(item.quantity)}
                  </div>
                  <div style={{ padding: '7px 6px', borderRight: innerBorder, textAlign: 'right', fontWeight: 500 }}>
                    {Number(item.unitPrice || 0).toLocaleString('en-IN')}
                  </div>
                  <div style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 600 }}>
                    {amt.toLocaleString('en-IN')}/-
                  </div>
                </div>
              )
            })}

            {/* Ruled filler: vertical separators continue through empty area — matches reference exactly */}
            <div style={{
              flex: 1,
              minHeight: '200px',
              display: 'grid',
              gridTemplateColumns: '50px 1fr 80px 90px 110px',
            }}>
              <div style={{ borderRight: innerBorder }} />
              <div style={{ borderRight: innerBorder }} />
              <div style={{ borderRight: innerBorder }} />
              <div style={{ borderRight: innerBorder }} />
              <div />
            </div>
          </div>

          {/* ── TOTAL ROW (pink bg, matches reference) ────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 1fr 80px 90px 110px',
            background: pinkBg,
            borderTop: outerBorder,
            borderBottom: innerBorder,
          }}>
            <div style={{ padding: '8px 6px', borderRight: innerBorder }} />
            <div style={{ padding: '8px 10px', borderRight: innerBorder, textAlign: 'right', fontWeight: 800, fontSize: '12px' }}>
              TOTAL
            </div>
            <div style={{ padding: '8px 6px', borderRight: innerBorder, textAlign: 'center', fontWeight: 800, fontSize: '12px' }}>
              {totalQty}
            </div>
            <div style={{ padding: '8px 6px', borderRight: innerBorder }} />
            <div style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 900, fontSize: '13px', color: '#0F172A' }}>
              ₹{totalAmount.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Extra pink row below total (matches reference) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 1fr 80px 90px 110px',
            background: pinkBg,
            borderBottom: outerBorder,
            height: '20px',
          }}>
            <div style={{ borderRight: innerBorder }} />
            <div style={{ borderRight: innerBorder }} />
            <div style={{ borderRight: innerBorder }} />
            <div style={{ borderRight: innerBorder }} />
            <div />
          </div>
        </div>

        {/* ── AMOUNT IN WORDS ───────────────────────────────────── */}
        <div style={{ padding: '8px 14px 10px', borderBottom: outerBorder }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#333333', marginBottom: 2 }}>
            Total Amount (in words)
          </div>
          <div style={{ fontSize: '12.5px', fontWeight: 400, color: '#0F172A', textTransform: 'uppercase' }}>
            {numberToWordsINR(totalAmount)}
          </div>
        </div>

        {/* ── TERMS & CONDITIONS + SIGNATORY (side by side, matches reference) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', minHeight: '96px', borderBottom: outerBorder }}>

          {/* Left: Terms and Conditions */}
          <div style={{ padding: '10px 14px', borderRight: outerBorder }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#555555', marginBottom: 4 }}>
              Terms and Conditions
            </div>
            {termsList.map((t, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#333333', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase' }}>
                {t}
              </div>
            ))}
          </div>

          {/* Right: Authorised Signatory */}
          <div style={{
            padding: '10px 14px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              {/* Signature space */}
              <div style={{ height: '40px' }} />
              <div style={{ borderTop: '1px solid #334155', paddingTop: 4, textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#0F172A', textDecoration: 'underline' }}>
                  Authorised Signatory For
                </div>
                <div style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginTop: 2 }}>
                  OM COMMUNICATION WORKS
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
