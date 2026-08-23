import ocwLogo from '../assets/ocw-logo.png'

/**
 * OcwEmblem — Official OCW brand logo asset.
 *
 * The source PNG has a white/grey paper background around the circular badge.
 * We clip it inside a circular container sized to show only the badge
 * (the badge occupies ~78% of the image width, centred).
 *
 * objectPosition zooms in to the badge circle, hiding the paper background.
 */
export default function OcwEmblem({ size = 46 }) {
  return (
    <img
      src={ocwLogo}
      alt="Om Communication Work logo"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        flexShrink: 0,
        display: 'block',
        filter: 'drop-shadow(0 0 8px rgba(197,160,63,0.4))',
      }}
    />
  )
}
