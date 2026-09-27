import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Shield, CheckCircle2, Clock, CreditCard, AlertCircle, ArrowLeft, Printer } from 'lucide-react'
import api from '../api'

import QuotationTemplate from '../components/DocumentTemplates/QuotationTemplate'
import TaxInvoiceTemplate from '../components/DocumentTemplates/TaxInvoiceTemplate'
import BillTemplate from '../components/DocumentTemplates/BillTemplate'

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
      .catch(() => setError('Document not found. Please check your document number.'))
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
        name: 'OM Communication Works',
        description: `Payment for ${invoice.invoiceNumber}`,
        order_id: invoice.razorpayOrderId,
        handler: async function (response) {
          try {
            await api.post(`/public/invoices/${invoiceNumber}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            setPaid(true)
            toast.success('Payment successful! Your document is now marked as PAID.')
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
        <div style={{ width: 44, height: 44, border: '3px solid var(--border-light)', borderTopColor: '#B4233C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading document details...</div>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ padding: '48px', textAlign: 'center', maxWidth: 440, background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <AlertCircle size={40} color="#B4233C" style={{ marginBottom: 16 }} />
        <h2 style={{ margin: '0 0 10px', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800 }}>Document Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>{error}</p>
        <Link to="/" className="btn-secondary" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={15} /> Return Home
        </Link>
      </div>
    </div>
  )

  const isAlreadyPaid = invoice.status === 'PAID' || paid
  const isQuote = invoice.documentType === 'QUOTATION' || invoice.invoiceNumber?.startsWith('OCW-Q-')
  const isBill = invoice.documentType === 'BILL' || invoice.invoiceNumber?.startsWith('OCW-B-')

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', padding: '40px 16px', color: '#F8FAFC' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        
        {/* Navigation Header */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, background: 'rgba(180, 35, 60, 0.2)', border: '1px solid #B4233C', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} color="#F87171" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>OM Communication Works</div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Official Document Viewer</div>
            </div>
          </Link>
          
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => window.print()}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.8125rem', gap: 6, background: '#FFFFFF', color: '#0F172A' }}
            >
              <Printer size={15} /> Print / Save PDF
            </button>
            <Link to="/" style={{ color: '#94A3B8', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ArrowLeft size={14} /> Back to Site
            </Link>
          </div>
        </div>

        {/* Printable Document Container */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
          {isQuote ? (
            <QuotationTemplate doc={invoice} />
          ) : isBill ? (
            <BillTemplate doc={invoice} />
          ) : (
            <TaxInvoiceTemplate doc={invoice} />
          )}
        </motion.div>

        {/* Actions & Payment Container */}
        <div className="no-print" style={{ background: '#1E293B', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', padding: '24px 32px', maxWidth: 794, margin: '0 auto' }}>
          
          {/* Gateway Error Banner */}
          {gatewayError && (
            <div style={{ marginBottom: 20, padding: 16, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <AlertCircle size={18} color="#F87171" style={{ marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#F87171', marginBottom: 4 }}>
                    Payment service unavailable. We couldn't connect to Razorpay.
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                    <button onClick={handlePay} className="btn-secondary" style={{ padding: '4px 12px', minHeight: 32, fontSize: '0.75rem' }}>
                      Retry Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isQuote ? (
            !isAlreadyPaid ? (
              <div>
                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px', background: '#B4233C' }}
                >
                  <CreditCard size={18} />
                  {paying ? 'Opening Payment Gateway...' : `Pay ₹${Number(invoice.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} Online via Razorpay`}
                </button>
                <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.75rem', marginTop: 12, margin: '12px 0 0' }}>
                  Secured by Razorpay • Encrypted Transactions • Instant Payment Receipt
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: 10, border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <CheckCircle2 size={18} color="#4ADE80" />
                <span style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.95rem' }}>
                  This invoice has been fully paid. Thank you!
                </span>
              </div>
            )
          ) : (
            <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem' }}>
              This is an official quotation. For project confirmation or orders, please contact OM Communication Works at <strong style={{ color: '#FFFFFF' }}>+91 72177 15296</strong> or email <strong style={{ color: '#FFFFFF' }}>singhomkar053@gmail.com</strong>.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
