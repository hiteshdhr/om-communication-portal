import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { images } from '../assets/imageMap'

const REAL_INSTALLATIONS = [
  {
    title: 'Multi-Channel Video Surveillance & Monitoring',
    category: 'CCTV Surveillance',
    location: 'Noida Sector 62',
    image: images.projects.controlRoom,
    alt: 'Corporate security control room video wall installation in Noida by Om Communication Work',
    scope: 'Centralized multi-screen monitoring console, NVR storage rack, and high-definition IP camera matrix.',
  },
  {
    title: 'Industrial Plant Perimeter & Heavy Conduit Cabling',
    category: 'Industrial Security',
    location: 'Greater Noida Industrial Area',
    image: images.projects.industrialCctv,
    alt: 'Industrial plant perimeter CCTV camera and heavy-duty conduit installation in Greater Noida',
    scope: 'Perimeter night vision surveillance, weather-sealed conduit raceways, and entrance gate coverage.',
  },
  {
    title: 'High-Density Server Rack & Structured Cabling',
    category: 'Structured Cabling',
    location: 'Faridabad Industrial Sector',
    image: images.projects.serverRack,
    alt: 'Structured cabling server rack and patch panel dressing in Faridabad by Om Communication Work',
    scope: 'CAT6 copper patch panel termination, organized cable dressing, and Gigabit PoE network switch array.',
  },
  {
    title: 'Commercial Office Intercom & Telephone Wiring',
    category: 'EPABX & Telecom',
    location: 'Gurgaon Sector 48',
    image: images.projects.telecomCabinet,
    alt: 'EPABX office telephone console and Krone distribution frame installation in Gurgaon',
    scope: 'Multi-extension PBX distribution frame, floor-wise riser cabling, and desk telephone terminations.',
  },
]

function ProjectCard({ project, index, prefersReducedMotion }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, delay: prefersReducedMotion ? 0 : index * 0.1 }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Photo */}
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: 'var(--bg-surface)' }}>
        <motion.img
          initial={prefersReducedMotion ? {} : { scale: 1.03 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1 }}
          transition={{ duration: 0.4 }}
          src={project.image}
          alt={project.alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: 'rgba(23, 25, 29, 0.85)',
          backdropFilter: 'blur(4px)',
          color: '#FFFFFF',
          fontSize: '0.72rem',
          fontWeight: 700,
          padding: '3px 8px',
          borderRadius: 4,
        }}>
          {project.category}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--red-primary)', fontWeight: 700, marginBottom: 6 }}>
          <MapPin size={13} />
          <span>{project.location}</span>
        </div>

        <h3 style={{
          fontFamily: "'Manrope', 'Inter', sans-serif",
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          margin: '0 0 6px',
          lineHeight: 1.35,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.825rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          margin: 0,
          marginTop: 'auto',
        }}>
          {project.scope}
        </p>
      </div>
    </motion.div>
  )
}

export default function RealProjectsSection() {
  const sectionRef = useRef(null)
  const headerInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="projects-showcase-heading"
      style={{
        padding: 'clamp(56px, 7vw, 88px) 0',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        
        {/* Header with entrance animation */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div>
            <div className="eyebrow">Real-World Engineering</div>
            <h2
              id="projects-showcase-heading"
              style={{
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                margin: '0 0 8px',
              }}
            >
              Built in the real world.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, maxWidth: 580 }}>
              Authentic installation and system engineering photography from active deployments across Delhi-NCR.
            </p>
          </div>

          <Link
            to="/projects"
            className="btn-secondary"
            style={{ fontSize: '0.875rem', padding: '8px 18px', minHeight: 40 }}
          >
            View Full Project Gallery <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Real Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 20,
        }}>
          {REAL_INSTALLATIONS.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={idx}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
