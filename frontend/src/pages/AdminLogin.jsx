import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Shield, Eye, EyeOff, Lock } from 'lucide-react'
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
      minHeight: '100vh', background: '#060e1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      backgroundImage: 'linear-gradient(rgba(0,102,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.03) 1px, transparent 1px)',
      backgroundSize: '48px 48px'
    }}>
      <div className="bg-orb" style={{ position: 'fixed', width: 500, height: 500, background: '#0066FF', top: -200, left: -100, opacity: 0.06 }} />
      <div className="bg-orb" style={{ position: 'fixed', width: 400, height: 400, background: '#FF9F0D', bottom: -150, right: -100, opacity: 0.05 }} />

      <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }} style={{ maxWidth: 420, width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 60, height: 60, background: 'linear-gradient(135deg, #0066FF, #0052cc)',
            borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 0 32px rgba(0,102,255,0.3)'
          }}>
            <Shield size={30} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px' }}>Admin Portal</h1>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem', margin: 0 }}>Om Communication Work — Internal Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '36px 36px' }}>
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Username</label>
            <input className="form-input" placeholder="admin" autoComplete="username"
              value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                autoComplete="current-password" style={{ paddingRight: 44 }}
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#64748b'
              }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
            <Lock size={16} /> {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.75rem', marginTop: 20 }}>
          Restricted to authorized personnel only
        </p>
      </motion.div>
    </div>
  )
}
