import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Shield, CheckCircle2, Clock, CreditCard, AlertCircle } from 'lucide-react'
import api from '../api'

export default function InvoicePayment() {
  const { invoiceNumber } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(`/public/invoices/${invoiceNumber}`)
      .then(r => setInvoice(r.data))
      .catch(() => setError('Invoice not found. Please check your invoice number.'))
      .finally(() => setLoading(false))
  }, [invoiceNumber])

  async function handlePay() {
    if (!invoice || invoice.status === 'PAID') return
    setPaying(true)

    // Load Razorpay script dynamically
    const scriptLoaded = await new Promise(resolve => {
      if (document.getElementById('razorpay-script')) { resolve(true); return }
      const script = document.createElement('script')
      script.id = 'razorpay-script'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.head.appendChild(script)
    })

    if (!scriptLoaded) {
      toast.error('Failed to load payment gateway. Please try again.')
      setPaying(false)
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_key',
      amount: Math.round(Number(invoice.totalAmount) * 100), // paise
      currency: 'INR',
      name: 'Om Communication Work',
      description: `Invoice ${invoice.invoiceNumber}`,
      order_id: invoice.razorpayOrderId,
      handler: async function (response) {
        try {
          await api.post(`/public/invoices/${invoiceNumber}/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
          setPaid(true)
          toast.success('Payment successful! Your invoice is now marked as PAID.')
        } catch {
          toast.error('Payment verification failed. Please contact support.')
        }
        setPaying(false)
      },
      modal: { ondismiss: () => setPaying(false) },
      prefill: {
        name: invoice.clientName,
        contact: invoice.clientPhone || '',
        email: invoice.clientEmail || '',
      },
      theme: { color: '#0066FF' },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0B192C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid rgba(0,102,255,0.2)', borderTopColor: '#0066FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <div style={{ color: '#94A3B8' }}>Loading invoice...</div>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#0B192C', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="glass-card" style={{ padding: '48px', textAlign: 'center', maxWidth: 440 }}>
        <AlertCircle size={40} color="#ef4444" style={{ marginBottom: 16 }} />
        <h2 style={{ margin: '0 0 10px' }}>Invoice Not Found</h2>
        <p style={{ color: '#94A3B8' }}>{error}</p>
      </div>
    </div>
  )

  const isAlreadyPaid = invoice.status === 'PAID' || paid

  return (
    <div style={{ minHeight: '100vh', background: '#0B192C', padding: '60px 24px' }}>
      {/* Orbs */}
      <div className="bg-orb" style={{ width: 400, height: 400, background: '#0066FF', top: -100, right: -100, opacity: 0.07 }} />

      <div style={{ maxWidth: 660, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #0066FF, #0052cc)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>Om Communication Work</div>
            <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Enterprise Security & Telecom</div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '36px 40px' }}>
          {/* Invoice Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>Tax Invoice</div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 800 }}>{invoice.invoiceNumber}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8125rem', marginTop: 4 }}>
                Date: {new Date(invoice.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div style={{
              padding: '8px 18px', borderRadius: 10, fontSize: '0.8125rem', fontWeight: 700,
              background: isAlreadyPaid ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
              color: isAlreadyPaid ? '#4ade80' : '#fbbf24',
              border: `1px solid ${isAlreadyPaid ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              {isAlreadyPaid ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              {isAlreadyPaid ? 'PAID' : 'PENDING PAYMENT'}
            </div>
          </div>

          {/* Client Info */}
          <div style={{ background: 'rgba(11,25,44,0.6)', borderRadius: 12, padding: '16px 18px', marginBottom: 24, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Billed To</div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{invoice.clientName}</div>
            {invoice.clientPhone && <div style={{ color: '#94A3B8', fontSize: '0.875rem', marginTop: 3 }}>{invoice.clientPhone}</div>}
            {invoice.clientEmail && <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>{invoice.clientEmail}</div>}
          </div>

          {/* Line Items */}
          <table className="data-table" style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Unit Price</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{item.description}</td>
                  <td style={{ textAlign: 'right', color: '#94A3B8' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right', color: '#94A3B8' }}>₹{Number(item.unitPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{Number(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, marginTop: 12 }}>
            {[
              ['Subtotal', invoice.subtotal],
              ['GST (18%)', invoice.taxAmount],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{label}</span>
                <span style={{ fontSize: '0.9rem' }}>₹{Number(val).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 8 }}>
              <span style={{ fontWeight: 800, fontSize: '1.0625rem' }}>Total Amount Due</span>
              <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#0066FF' }}>
                ₹{Number(invoice.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          {!isAlreadyPaid ? (
            <button onClick={handlePay} disabled={paying} className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 24, fontSize: '1.0625rem', padding: '14px' }}>
              <CreditCard size={18} />
              {paying ? 'Opening Payment Gateway...' : `Pay ₹${Number(invoice.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} via Razorpay`}
            </button>
          ) : (
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: 12, border: '1px solid rgba(34,197,94,0.25)' }}>
              <CheckCircle2 size={20} color="#22c55e" />
              <span style={{ color: '#4ade80', fontWeight: 700 }}>This invoice has been fully paid. Thank you!</span>
            </div>
          )}

          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.75rem', marginTop: 16 }}>
            Secured by Razorpay • All transactions are encrypted • GST invoice will be emailed
          </p>
        </motion.div>
      </div>
    </div>
  )
}
