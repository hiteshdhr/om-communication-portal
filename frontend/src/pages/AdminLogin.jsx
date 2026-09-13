import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Shield, Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react'
import api from '../api'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username || !form.password) {
      toast.error('Please enter username and password.')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      localStorage.setItem('om_admin_token', data.token)
      localStorage.setItem('om_admin_user', JSON.stringify({ username: data.username, role: data.role, email: data.email }))
      toast.success(`Welcome back, ${data.username}!`)
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#F6F7F8',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      color: '#111827'
    }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} style={{ maxWidth: 400, width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, background: '#FAF4F5', border: '1px solid #F2D2D7',
            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Shield size={26} color="#B4233C" />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px', color: '#111827', letterSpacing: '-0.01em' }}>Admin Portal</h1>
          <p style={{ color: '#59636F', fontSize: '0.875rem', margin: 0 }}>OM Communication — Internal Management</p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          padding: '32px'
        }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Username</label>
            <input className="form-input" placeholder="admin" autoComplete="username"
              value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                autoComplete="current-password" style={{ paddingRight: 44 }}
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280'
              }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
            <Lock size={16} /> {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link to="/" style={{ color: '#59636F', fontSize: '0.8125rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={13} /> Back to Public Website
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
