import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items = [], light = false }) {
  if (!items || items.length === 0) return null

  // Build schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://om-communication-portal.hiteshdheer155.workers.dev/',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href
          ? `https://om-communication-portal.hiteshdheer155.workers.dev${item.href}`
          : undefined,
      })),
    ],
  }

  const textColor = 'var(--text-secondary)'
  const activeColor = 'var(--text-primary)'
  const hoverColor = 'var(--red-primary)'
  const slashColor = 'var(--text-muted)'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
        <ol style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 6,
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: '0.825rem',
          fontWeight: 500,
        }}>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to="/"
              style={{
                color: textColor,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = hoverColor}
              onMouseLeave={e => e.currentTarget.style.color = textColor}
            >
              <Home size={13} />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ChevronRight size={12} color={slashColor} />
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    style={{ color: activeColor, fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    style={{
                      color: textColor,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = hoverColor}
                    onMouseLeave={e => e.currentTarget.style.color = textColor}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
