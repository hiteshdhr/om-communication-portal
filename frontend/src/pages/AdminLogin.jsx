import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Lock, ArrowLeft, KeyRound, Sun, Moon } from 'lucide-react'
import api from '../api'
import { useTheme } from '../utils/theme.jsx'

export default function AdminLogin() {
  const { theme, toggleTheme } = useTheme()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) {
      toast.error('Please enter username and password.')
      return
    }
    setLoading(true)
    try {
      const payload = { username: form.username.trim(), password: form.password.trim() }
      const { data } = await api.post('/auth/login', payload)
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      color: 'var(--text-primary)',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      position: 'relative',
    }}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 42,
          height: 42,
          borderRadius: 10,
          border: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease',
        }}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#FBBF24" />}
      </button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 420, width: '100%', position: 'relative', zIndex: 1 }}
      >
        {/* Refined Editorial Header (Shield icon removed) */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--red-primary)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            OM COMMUNICATION
          </div>
          <h1 style={{
            fontFamily: "'Manrope', 'Inter', sans-serif",
            fontSize: 'clamp(1.5rem, 3.2vw, 1.85rem)',
            fontWeight: 900,
            margin: '0 0 6px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
          }}>
            ADMIN WORKSPACE
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
            Internal Operations &amp; Management Portal
          </p>
        </motion.div>

        {/* Login Form Container */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          style={{
            background: 'var(--bg-card)',
            borderRadius: 14,
            border: '1px solid var(--border-light)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            padding: 'clamp(24px, 5vw, 36px)',
          }}
        >
          {/* Username Field */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 6,
            }}>
              Username
            </label>
            <input
              className="form-input"
              placeholder="Enter your admin username"
              autoComplete="username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: 26 }}>
            <label style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 6,
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  padding: '10px 44px 10px 14px',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
            }}
          >
            {loading ? (
              'Authenticating...'
            ) : (
              <>
                <KeyRound size={16} /> Sign In to Workspace
              </>
            )}
          </button>
        </motion.form>

        {/* Back Link */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: 22 }}>
          <Link
            to="/"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontWeight: 600,
              transition: 'color 0.2s ease',
            }}
          >
            <ArrowLeft size={13} /> Back to Public Website
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
