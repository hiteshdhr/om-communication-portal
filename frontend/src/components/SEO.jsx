import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'Om Communication Work | Enterprise Security, CCTV & Telecom Solutions Delhi-NCR',
  description = 'Enterprise-grade security, CCTV surveillance, EPABX telecom, biometric access control, and turnkey infrastructure solutions across Delhi-NCR and India.',
  canonical,
  ogType = 'website',
  ogImage = '/assets/ocw-logo.png',
  schema
}) {
  const siteUrl = window.location.origin
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : window.location.href

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Om Communication Work" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

      {/* Optional Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
