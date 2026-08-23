import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '../assets/imageMap'

const nvrFeeds = [
  { label: 'Main Entrance & Perimeter', img: images.services.cctv.exterior, pos: 'center center' },
  { label: 'Visitor & Reception Station', img: images.services.vdp.userMonitoring, pos: 'center center' },
  { label: 'Server & Network Rack', img: images.services.cabling.serverRack, pos: 'center center' },
  { label: 'Industrial Warehouse Bay', img: images.services.cctv.warehouse, pos: 'center center' },
]

const stats = [
  { value: '10+', label: 'Years in Industry' },
  { value: '800+', label: 'Installations Completed' },
  { value: '99.2%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Enterprise Clients' },
]

export default function MonitoringShowcase() {
  const [activeCamera] = useState(0)
  const [nvrTime, setNvrTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setNvrTime(now.toLocaleTimeString('en-IN', { hour12: false }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="monitoring-showcase" style={{ padding: '120px 0', background: '#0B1E38', color: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 12px' }}>Real-Time Infrastructure Monitoring</h2>
          <p style={{ color: '#94A3B8', fontSize: '1.0625rem', maxWidth: 600, margin: '0 auto' }}>
            Live operational feeds across commercial sites, EPABX racks, and biometric terminals installed by Om Communication Work.
          </p>
        </div>

        {/* NVR Interactive Widget */}
        <div style={{
          background: 'rgba(4,12,26,0.88)',
          border: '1px solid rgba(197,160,63,0.30)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,160,63,0.10)',
          backdropFilter: 'blur(16px)',
          width: '100%',
          margin: '0 auto'
        }}>
          {/* NVR top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px',
            background: 'rgba(2,6,23,0.90)',
            borderBottom: '1px solid rgba(197,160,63,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#C5A03F', letterSpacing: '0.08em' }}>OCW-NVR · LIVE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#60A890' }}>{nvrTime}</span>
              <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 4, padding: '3px 8px', fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, letterSpacing: '0.1em' }}>● REC</div>
            </div>
          </div>

          {/* Main preview */}
          <div style={{ position: 'relative', height: 'min(70vh, 650px)', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCamera}
                src={nvrFeeds[activeCamera].img}
                alt={nvrFeeds[activeCamera].label}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: nvrFeeds[activeCamera].pos, display: 'block' }}
              />
            </AnimatePresence>
            {/* Scan-line CRT overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
            }} />
            {/* Camera label */}
            <div style={{
              position: 'absolute', bottom: 16, left: 16,
              background: 'rgba(2,6,23,0.75)', backdropFilter: 'blur(4px)',
              border: '1px solid rgba(197,160,63,0.25)', borderRadius: 6,
              padding: '6px 14px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#C5A03F',
            }}>
              CAM {activeCamera + 1} · {nvrFeeds[activeCamera].label.toUpperCase()}
            </div>
          </div>


        </div>

        {/* Stats Counter Bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24, marginTop: 48,
          borderTop: '1px solid rgba(197,160,63,0.2)', paddingTop: 48,
          textAlign: 'center'
        }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#C5A03F', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
