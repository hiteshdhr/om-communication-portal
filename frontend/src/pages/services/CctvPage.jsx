import { Camera, Shield, Eye, Lock, HardDrive, Smartphone, Zap, CheckCircle2 } from 'lucide-react'
import ServicePageLayout from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const benefits = [
  {
    icon: Eye,
    title: 'Zero-Blind-Spot Coverage',
    desc: 'Strategic optical focal calculations ensure comprehensive coverage of entry gates, perimeter fences, corridors, and blind angles.',
  },
  {
    icon: HardDrive,
    title: 'H.265+ High-Density Recording',
    desc: 'Smart video compression reduces storage consumption by up to 50% while preserving crystal-clear evidence recording up to 4K resolution.',
  },
  {
    icon: Smartphone,
    title: 'Encrypted Remote Viewing',
    desc: 'Secure live streams and playback accessible from iOS, Android, macOS, and Windows workstations with multi-tier role permissions.',
  },
  {
    icon: Zap,
    title: 'Color Night Vision & IR Detection',
    desc: 'Low-light sensors and infrared illuminators deliver actionable identification (faces and license plates) even in complete darkness.',
  },
  {
    icon: Shield,
    title: 'Intelligent Motion & Perimeter Alerts',
    desc: 'Configure tripwire and intrusion zones that trigger immediate mobile notifications, deterring unauthorized access before breaches occur.',
  },
  {
    icon: Lock,
    title: 'Tamper-Resistant Infrastructure',
    desc: 'ISI-marked GI/PVC conduits protect video and power lines from vandalism, weather wear, and electromagnetic interference.',
  },
]

const capabilities = [
  'IP CCTV Systems (2MP, 4MP, 8MP / 4K UHD Ultra-High Resolution)',
  'HD Analog / Turbo HD Surveillance Systems for Cost-Effective Retrofits',
  'Network Video Recorders (NVR) with RAID Redundancy & Hot-Swappable Bays',
  'Digital Video Recorders (DVR) with H.265+ Compression',
  'Pan-Tilt-Zoom (PTZ) Optical Zoom Cameras with Preset Patrol Tours',
  'ColorVu / Full-Color Low-Light & Starlight Night Vision Sensors',
  'Power over Ethernet (PoE) Architecture & High-Capacity PoE Switches',
  'Centralized Monitoring Room Setup & Multi-Display Video Wall Matrix',
  'Concealed PVC and Surface GI Metal Conduit Installation',
  'Remote Cloud P2P Streaming & Static IP Dedicated Surveillance Routing',
  'Automated Motion Detection, Tripwire Crossing, and Area Intrusion Analytics',
  'Preventive Maintenance, Lens Calibration & Camera Realignment Services',
]

const process = [
  {
    step: '01',
    title: 'Site Survey & Lighting Assessment',
    desc: 'Our engineers inspect your facility layout, light levels, entrance points, perimeter perimeters, and identify optical focal angles.',
  },
  {
    step: '02',
    title: 'System Architecture & Storage Design',
    desc: 'We map camera positions, calculate bitrate requirements, size hard drive storage for required retention days, and plan cable pathways.',
  },
  {
    step: '03',
    title: 'Structured Cabling & Conduit Laying',
    desc: 'CAT6 copper or coaxial cabling is pulled through heavy-duty conduit, safely separated from high-voltage electrical lines.',
  },
  {
    step: '04',
    title: 'Mounting, NVR Config & Network Setup',
    desc: 'Cameras are securely fastened, aligned, focused, assigned static IPs, connected to the NVR, and paired with mobile client software.',
  },
  {
    step: '05',
    title: 'Field Verification, Handover & AMC',
    desc: 'We verify day/night clarity across all channels, conduct user training for footage retrieval, and initiate ongoing maintenance contracts.',
  },
]

const considerations = [
  {
    title: 'Resolution vs. Storage Retention',
    desc: 'Higher megapixel counts (e.g., 4K) require balanced compression (H.265+) and calculated HDD capacity to achieve 30 to 90 days of retention.',
  },
  {
    title: 'Indoor vs. Outdoor Enclosures',
    desc: 'Outdoor cameras require IP66/IP67 weatherproofing and IK10 vandal resistance to survive dust, monsoon rain, and heat extremes.',
  },
  {
    title: 'Lighting & Glare Conditions',
    desc: 'Entrances with strong backlight need True WDR (Wide Dynamic Range 120dB) cameras to avoid silhouettes and capture facial clarity.',
  },
  {
    title: 'Power Backup & Surge Protection',
    desc: 'NVRs and PoE switches must be backed by online UPS systems and surge protectors to ensure continuous recording during power cuts.',
  },
]

const applications = [
  { label: 'Corporate Offices & IT Parks', desc: 'Reception access, server room monitoring, cubicle areas, and parking surveillance.' },
  { label: 'Manufacturing Plants & Factories', desc: 'Perimeter protection, assembly floor oversight, raw material storage, and loading bays.' },
  { label: 'Residential Societies & Apartments', desc: 'Boundary walls, entry/exit boom barriers, lift lobbies, and children play areas.' },
  { label: 'Retail Stores & Commercial Showrooms', desc: 'Cash counter monitoring, aisle surveillance, loss prevention, and customer footfall.' },
  { label: 'Warehouses & Logistics Hubs', desc: 'High-ceiling long-range lens coverage, loading docks, and inventory dispatch areas.' },
  { label: 'Hospitals & Educational Campuses', desc: 'Corridor monitoring, public entry gates, emergency wards, and campus perimeters.' },
]

const faqs = [
  {
    q: 'What is the key difference between IP CCTV and HD Analog systems?',
    a: 'IP CCTV cameras transmit digital video data over standard CAT6 Ethernet cables using TCP/IP networking, delivering superior resolutions (up to 4K), power over Ethernet (PoE), and onboard edge analytics. HD Analog systems use coaxial cabling (RG59) connected to a DVR; they are budget-friendly and great for simple residential or small retail setups, but lack the network scalability and advanced intelligence of IP systems.',
  },
  {
    q: 'How many days of CCTV recording can be stored?',
    a: 'Storage duration depends on the number of cameras, recording resolution (e.g. 2MP vs 4MP), frame rate (15–25 fps), compression standard (H.265+ saves ~50% over H.264), and whether recording is continuous or motion-triggered. During the site survey, OM Communication calculates the exact hard drive capacity required for your target retention period (typically 15, 30, 60, or 90 days).',
  },
  {
    q: 'Can I view CCTV footage on my phone when outside the premises?',
    a: 'Yes. We configure encrypted P2P cloud services and dedicated DDNS/static IP mobile applications for iOS and Android. As long as the NVR/DVR is connected to an active internet connection, authorized administrators can view live multi-channel video, playback recorded events, and receive push notifications from anywhere in the world.',
  },
  {
    q: 'How does night vision work in complete darkness?',
    a: 'Modern surveillance systems use two primary night vision technologies: Infrared (IR) LEDs, which illuminate scenes invisibly to human eyes producing crisp black-and-white night footage, and Full-Color/ColorVu technology, which utilizes ultra-large aperture lenses (F1.0) and advanced low-light sensors with warm supplemental LED lighting to produce vivid, full-color footage 24/7.',
  },
  {
    q: 'What happens to CCTV recording during power outages?',
    a: 'We design surveillance installations with dedicated online UPS (Uninterruptible Power Supply) systems supporting the NVR, PoE switches, and all connected cameras. This ensures continuous, uninterrupted recording and video protection during mains power cuts and electrical transitions.',
  },
  {
    q: 'Do you provide maintenance for existing third-party CCTV setups?',
    a: 'Yes. Om Communication offers Annual Maintenance Contracts (AMC) and repair services for existing CCTV installations across Delhi-NCR, including camera realignment, lens cleaning, cable rewiring, NVR firmware upgrades, power supply replacement, and storage recovery.',
  },
]

export default function CctvPage() {
  return (
    <ServicePageLayout
      seo={{
        title: 'CCTV Installation & Surveillance Systems Delhi-NCR | Om Communication Work',
        description: 'Professional IP CCTV and HD surveillance system design, camera installation, NVR setup, remote mobile monitoring, and AMC maintenance across Delhi, Noida, Gurgaon, and Ghaziabad.',
        canonical: '/services/cctv',
      }}
      breadcrumbs={[
        { label: 'Solutions', href: '/services' },
        { label: 'CCTV Surveillance' },
      ]}
      hero={{
        eyebrow: 'CCTV Surveillance Systems',
        h1: 'See everything.<br /><span class="gradient-text">Miss nothing.</span>',
        sub: 'High-definition IP surveillance, smart night vision, centralized video storage, and encrypted remote access — engineered for commercial, industrial, and residential protection across Delhi-NCR.',
        image: images.services.cctv.industrial,
        imageAlt: 'Industrial CCTV surveillance camera and monitoring installation by Om Communication Work',
      }}
      overview="CCTV surveillance is the primary foundation of any electronic security architecture. Om Communication Work provides complete turnkey CCTV solutions — from site layout inspection and camera focal planning to structured cabling, NVR storage calculation, and centralized control room integration. Whether securing a corporate campus in Noida, an industrial warehouse in Greater Noida, or a residential community in Gurgaon, our installations deliver reliable, clear, and legally defensible visual evidence 24/7."
      whyNeeded={{
        title: 'Why professional surveillance is vital for your facility',
        text: 'Consumer-grade DIY cameras often fail in commercial environments due to unshielded cabling, poor night resolution, limited storage retention, and wireless signal drops. Professional engineered CCTV provides:',
        points: [
          'Deterrence of theft, vandalism, and unauthorized intrusion before incidents occur',
          'Conclusive forensic evidence with timestamped, tamper-evident high-definition video',
          'Real-time situational awareness across multi-acre perimeters and complex facilities',
          'Operational compliance and safety oversight for manufacturing and commercial teams',
        ],
      }}
      benefits={benefits}
      capabilities={capabilities}
      process={process}
      considerations={considerations}
      maintenanceInfo={{
        title: 'CCTV Maintenance & Preventive Health Checks',
        text: 'Surveillance hardware operates continuously in demanding indoor and outdoor conditions. Dust on camera domes, loose BNC/RJ45 terminations, hard drive sector degradation, and power fluctuations can cause critical recording failures when you need footage most. Our comprehensive CCTV AMC plans include quarterly physical inspections, lens cleaning, voltage testing, storage health checks, and priority breakdown response.',
        amcLink: '/services/amc',
      }}
      applications={applications}
      faqs={faqs}
      relatedLinks={[
        { label: 'Video Door Phone (VDP)', href: '/services/vdp' },
        { label: 'Biometric Access Control', href: '/services/biometrics' },
        { label: 'EPABX & Intercom Systems', href: '/services/epabx' },
        { label: 'Structured Cabling & Networking', href: '/services/networking' },
        { label: 'Annual Maintenance Contracts (AMC)', href: '/services/amc' },
      ]}
      ctaHeadline="Need Professional CCTV Installation or Upgrades?"
      ctaSub="Our certified surveillance engineers will survey your premises in Delhi-NCR, assess optical coverage requirements, and deliver a detailed, transparent proposal."
      ctaText="Plan My CCTV System →"
    />
  )
}
