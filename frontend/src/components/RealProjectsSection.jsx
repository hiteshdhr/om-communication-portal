import { Link } from 'react-router-dom'
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

export default function RealProjectsSection() {
  return (
    <section
      aria-labelledby="projects-showcase-heading"
      style={{
        padding: 'clamp(56px, 7vw, 88px) 0',
        background: '#F6F7F8',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 36,
        }}>
          <div>
            <div className="eyebrow">Real-World Engineering</div>
            <h2
              id="projects-showcase-heading"
              style={{
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#111827',
                letterSpacing: '-0.03em',
                margin: '0 0 8px',
              }}
            >
              Built in the real world.
            </h2>
            <p style={{ color: '#59636F', fontSize: '1rem', margin: 0, maxWidth: 580 }}>
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
        </div>

        {/* Real Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 20,
        }}>
          {REAL_INSTALLATIONS.map((project) => (
            <div
              key={project.title}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: 10,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              {/* Photo */}
              <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: '#E5E7EB' }}>
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  background: 'rgba(17, 24, 39, 0.85)',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#B4233C', fontWeight: 700, marginBottom: 6 }}>
                  <MapPin size={13} />
                  <span>{project.location}</span>
                </div>

                <h3 style={{
                  fontFamily: "'Manrope', 'Inter', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 6px',
                  lineHeight: 1.35,
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: '0.825rem',
                  color: '#59636F',
                  lineHeight: 1.55,
                  margin: 0,
                  marginTop: 'auto',
                }}>
                  {project.scope}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
