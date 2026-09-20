import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Shield, CheckCircle2, Clock, CreditCard, AlertCircle, ArrowLeft } from 'lucide-react'
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

  const [gatewayError, setGatewayError] = useState(null)
  const [showTechDetails, setShowTechDetails] = useState(false)

  async function handlePay() {
    if (!invoice || invoice.status === 'PAID') return
    setPaying(true)
    setGatewayError(null)

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
      setGatewayError('Failed to load payment gateway script.')
      toast.error("Payment service unavailable. We couldn't connect to Razorpay.")
      setPaying(false)
      return
    }

    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_key',
        amount: Math.round(Number(invoice.totalAmount) * 100), // paise
        currency: 'INR',
        name: 'OM Communication',
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
          } catch (err) {
            setGatewayError(err.response?.data?.error || 'Payment verification error')
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
        theme: { color: '#B4233C' },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setGatewayError(err.message || 'Razorpay Gateway Exception')
      toast.error("Payment service unavailable. We couldn't connect to Razorpay.")
      setPaying(false)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 44, height: 44, border: '3px solid #E5E7EB', borderTopColor: '#B4233C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <div style={{ color: '#59636F', fontSize: '0.9rem' }}>Loading invoice details...</div>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ padding: '48px', textAlign: 'center', maxWidth: 440, background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <AlertCircle size={40} color="#B4233C" style={{ marginBottom: 16 }} />
        <h2 style={{ margin: '0 0 10px', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800 }}>Invoice Not Found</h2>
        <p style={{ color: '#59636F', marginBottom: 20 }}>{error}</p>
        <Link to="/" className="btn-secondary" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={15} /> Return Home
        </Link>
      </div>
    </div>
  )

  const isAlreadyPaid = invoice.status === 'PAID' || paid

  return (
    <div style={{ minHeight: '100vh', background: '#F6F7F8', padding: '60px 24px', color: '#111827' }}>
      <div style={{ maxWidth: 660, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, background: '#FAF4F5', border: '1px solid #F2D2D7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} color="#B4233C" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>OM Communication</div>
              <div style={{ color: '#59636F', fontSize: '0.75rem' }}>Enterprise Security & Telecom</div>
            </div>
          </Link>
          <Link to="/" style={{ color: '#59636F', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={14} /> Back to Site
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          padding: '36px 40px'
        }}>
          {/* Invoice Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div style={{ color: '#59636F', fontSize: '0.75rem', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>Tax Invoice</div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{invoice.invoiceNumber}</div>
              <div style={{ color: '#59636F', fontSize: '0.8125rem', marginTop: 4 }}>
                Date: {new Date(invoice.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div style={{
              padding: '6px 14px', borderRadius: 8, fontSize: '0.8125rem', fontWeight: 700,
              background: isAlreadyPaid ? '#F0FDF4' : '#FFFBEB',
              color: isAlreadyPaid ? '#16A34A' : '#D97706',
              border: `1px solid ${isAlreadyPaid ? '#BBF7D0' : '#FDE68A'}`,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              {isAlreadyPaid ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              {isAlreadyPaid ? 'PAID' : 'PENDING PAYMENT'}
            </div>
          </div>

          {/* Client Info */}
          <div style={{ background: '#F6F7F8', borderRadius: 10, padding: '16px 18px', marginBottom: 24, border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.7rem', color: '#59636F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 700 }}>Billed To</div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{invoice.clientName}</div>
            {invoice.clientPhone && <div style={{ color: '#59636F', fontSize: '0.875rem', marginTop: 2 }}>{invoice.clientPhone}</div>}
            {invoice.clientEmail && <div style={{ color: '#59636F', fontSize: '0.875rem' }}>{invoice.clientEmail}</div>}
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
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.description}</td>
                  <td style={{ textAlign: 'right', color: '#59636F' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right', color: '#59636F' }}>₹{Number(item.unitPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>₹{Number(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 18, marginTop: 12 }}>
            {[
              ['Subtotal', invoice.subtotal],
              ['GST (18%)', invoice.taxAmount],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#59636F', fontSize: '0.9rem' }}>{label}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>₹{Number(val).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid #E5E7EB', marginTop: 8 }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Total Amount Due</span>
              <span style={{ fontWeight: 900, fontSize: '1.3rem', color: '#B4233C' }}>
                ₹{Number(invoice.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Gateway Error Banner */}
          {gatewayError && (
            <div style={{ marginTop: 20, padding: 16, background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <AlertCircle size={18} color="#C93636" style={{ marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#9B2C2C', marginBottom: 4 }}>
                    Payment service unavailable. We couldn't connect to Razorpay. Invoice management is still available.
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                    <button onClick={handlePay} className="btn-secondary" style={{ padding: '4px 12px', minHeight: 32, fontSize: '0.75rem' }}>
                      Retry Payment
                    </button>
                    <button onClick={() => setShowTechDetails(!showTechDetails)} style={{ background: 'none', border: 'none', color: '#742A2A', textDecoration: 'underline', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>
                      {showTechDetails ? 'Hide technical details' : 'View technical details'}
                    </button>
                  </div>
                  {showTechDetails && (
                    <div style={{ marginTop: 8, padding: 8, background: '#FFFFFF', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.7rem', color: '#742A2A', border: '1px solid #FED7D7' }}>
                      {gatewayError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          {!isAlreadyPaid ? (
            <button onClick={handlePay} disabled={paying} className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 24, fontSize: '1rem', padding: '12px' }}>
              <CreditCard size={18} />
              {paying ? 'Opening Payment Gateway...' : `Pay ₹${Number(invoice.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} via Razorpay`}
            </button>
          ) : (
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
              <CheckCircle2 size={18} color="#16A34A" />
              <span style={{ color: '#16A34A', fontWeight: 700, fontSize: '0.95rem' }}>This invoice has been fully paid. Thank you!</span>
            </div>
          )}

          <p style={{ textAlign: 'center', color: '#59636F', fontSize: '0.75rem', marginTop: 16, margin: '16px 0 0' }}>
            Secured by Razorpay • All transactions are encrypted • GST invoice will be emailed
          </p>
        </motion.div>
      </div>
    </div>
  )
}
