export default function TechRibbon() {
  const items = [
    'CCTV Surveillance',
    'EPABX & Telecom',
    'Video Door Phones',
    'Biometric Access Control',
    'Structured Cabling',
    'Annual Maintenance Contracts',
    'Site Survey',
    'Turnkey Installation',
    'Remote Monitoring',
    'Access Control',
  ]

  // Duplicate for seamless loop
  const track = [...items, ...items]

  return (
    <div
      style={{
        borderTop: '1px solid rgba(197,160,63,0.08)',
        borderBottom: '1px solid rgba(197,160,63,0.08)',
        background: 'rgba(4,12,26,0.6)',
        padding: '14px 0',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div className="marquee-wrap">
        <div className="marquee-track">
          {track.map((item, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 28px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#607080',
              whiteSpace: 'nowrap',
              gap: 28,
            }}>
              {item}
              <span style={{
                width: 4, height: 4, borderRadius: '50%',
                background: 'rgba(197,160,63,0.35)',
                display: 'inline-block', flexShrink: 0,
              }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
