import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '../assets/imageMap'

const nvrFeeds = [
  { label: 'Main Entrance & Perimeter', img: images.services.cctv.exterior, pos: 'center center' },
  { label: 'Visitor & Reception Station', img: images.services.vdp.userMonitoring, pos: 'center center' },
  { label: 'Server & Network Rack', img: images.services.cabling.serverRack, pos: 'center center' },
  { label: 'Industrial Warehouse Bay', img: images.services.cctv.warehouse, pos: 'center center' },
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
    <section id="monitoring-showcase" style={{ padding: '80px 0', background: 'var(--bg-surface)', color: 'var(--text-primary)', transition: 'background-color 0.3s ease' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#B4233C', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Real-Time Telemetry
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 10px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Live Infrastructure Monitoring</h2>
          <p style={{ color: '#59636F', fontSize: '1rem', maxWidth: 600, margin: '0 auto' }}>
            Live operational feeds across commercial sites, EPABX racks, and biometric terminals installed by OM Communication.
          </p>
        </div>

        {/* NVR Interactive Widget */}
        <div style={{
          background: '#17191D',
          border: '1px solid #E5E7EB',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
          width: '100%',
          margin: '0 auto'
        }}>
          {/* NVR top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px',
            background: '#111827',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#B4233C', boxShadow: '0 0 8px #B4233C' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>
                NVR-LIVE-STATION-01
              </span>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: '#D1D5DB' }}>
              {nvrTime || '00:00:00'} IST
            </div>
          </div>

          {/* 4-Camera Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, background: '#111827' }}>
            {nvrFeeds.map((feed, idx) => (
              <div key={idx} style={{ position: 'relative', height: 220, background: '#000', overflow: 'hidden' }}>
                <img
                  src={feed.img}
                  alt={feed.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: feed.pos }}
                />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.7)', padding: '3px 8px', borderRadius: 4, color: '#FFF', fontSize: '0.72rem', fontWeight: 600 }}>
                  CH-0{idx + 1}: {feed.label}
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: 4, color: '#16A34A', fontSize: '0.68rem', fontWeight: 700 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A' }} /> LIVE 1080P
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
