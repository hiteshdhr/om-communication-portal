import { DoorOpen, Shield, Video, Key, Smartphone, Lock, Eye, CheckCircle2 } from 'lucide-react'
import ServicePageLayout from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const benefits = [
  {
    icon: Eye,
    title: 'Visual Identity Verification',
    desc: 'See and converse with visitors in high-definition video before opening your door or authorizing entry through building gates.',
  },
  {
    icon: Key,
    title: 'One-Touch Electronic Door Release',
    desc: 'Trigger electronic rim locks, magnetic locks, or gate strikes directly from the indoor monitor or paired smartphone without walking to the door.',
  },
  {
    icon: Video,
    title: 'Automated Visitor Snapshot Logging',
    desc: 'The outdoor unit captures photos or short video clips whenever the doorbell is pressed, storing timestamped records on internal SD storage.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Call Forwarding',
    desc: 'Receive doorbell video calls directly on your iOS/Android smartphone when away from home, talk to couriers, and remotely unlock doors.',
  },
  {
    icon: Shield,
    title: 'Infrared Low-Light Night Vision',
    desc: 'Built-in infrared LEDs illuminate visitors at nighttime without blinding them, ensuring clear facial identification in total darkness.',
  },
  {
    icon: Lock,
    title: 'Vandal-Resistant Metal Enclosures',
    desc: 'Outdoor door stations feature weatherproof (IP65) zinc-alloy or aluminum casing with tamper-detection alarm triggers.',
  },
]

const capabilities = [
  'Standalone Villa Video Door Phone Systems (1 Door Station to 1–4 Monitors)',
  'Multi-Apartment Digital VDP Systems with Centralized Guard Console Integration',
  '7-Inch and 10-Inch High-Resolution Capacitive Color Touchscreen Indoor Monitors',
  'Wide-Angle HD (1080p) Door Station Cameras with 120°–140° Field of View',
  'Two-Wire & IP/PoE Digital VDP Architecture for Easy Retrofitting and New Builds',
  'Integration with Electronic Rim Locks, Electromagnetic (EM) Locks & Door Strikes',
  'RFID / Keyfob Proximity Card Reader Built into Outdoor Entry Station',
  'Inter-Monitor Intercom Calling between Multiple Rooms or Building Floors',
  'Internal MicroSD Card Slot for Continuous Snapshot & Video Message Recording',
  'Mobile App Wi-Fi Gateway for Remote Smartphone Answering and Unlock Controls',
  'Weatherproof IP65 / IK08 Metal Enclosures with Rain-Shield Mounting Hoods',
  'Annual Maintenance Contracts (AMC), Lock Power Supply Testing & Wiring Repairs',
]

const process = [
  {
    step: '01',
    title: 'Door Entry & Riser Pathway Survey',
    desc: 'We inspect the main entrance door, gate structure, indoor monitor viewing heights, lock mounting types, and cable routing pathways.',
  },
  {
    step: '02',
    title: 'System Architecture & Lock Selection',
    desc: 'We select the appropriate 2-wire or IP VDP system and specify matching electronic locks (rim lock vs. electromagnetic strike) and backup power.',
  },
  {
    step: '03',
    title: 'Conduit & Riser Cable Installation',
    desc: 'Shielded CAT6 or 4-core copper cabling is run through concealed conduit from outdoor door stations to indoor monitors and lock power supplies.',
  },
  {
    step: '04',
    title: 'Hardware Mounting & Lock Integration',
    desc: 'Outdoor door stations and indoor displays are mounted, electronic door locks are calibrated for smooth latching, and power supplies are terminated.',
  },
  {
    step: '05',
    title: 'Testing, Wi-Fi Pairing & Handover',
    desc: 'We test audio volume, video clarity, night vision, electronic unlock triggers, configure mobile apps, and train residents on system use.',
  },
]

const considerations = [
  {
    title: 'Backlight & Sunlight Positioning',
    desc: 'Avoid mounting outdoor camera stations facing direct sunlight. We position cameras to avoid intense glare or specify Wide Dynamic Range (WDR) sensors.',
  },
  {
    title: 'Dedicated Lock Power Supply',
    desc: 'Electronic locks require dedicated 12V/3A DC power supplies. Powering heavy locks directly from the VDP monitor can cause circuit burnout.',
  },
  {
    title: 'Indoor Monitor Viewing Height',
    desc: 'Indoor touch screens should be installed at eye level (approx. 1.45m to 1.55m from finished floor) for optimal viewing ergonomics.',
  },
  {
    title: '2-Wire vs. IP/PoE System Choice',
    desc: 'For existing buildings with older bell wiring, 2-wire digital VDP avoids rewiring walls. For new construction, IP/PoE offers the highest flexibility.',
  },
]

const applications = [
  { label: 'Residential Villas & Independent Bungalows', desc: 'Main boundary gate station with multi-floor indoor touch monitors and remote gate release.' },
  { label: 'Gated Residential Societies & High-Rises', desc: 'Tower entrance digital directory panel linked to individual flat monitors and guard console.' },
  { label: 'Corporate Office Reception Entrances', desc: 'Controlled visitor entry where receptionists visually verify clients before releasing magnetic locks.' },
  { label: 'Doctor Clinics & Private Consultations', desc: 'Secure entrance allowing staff to verify patients before opening waiting area doors.' },
  { label: 'Jewelry & High-Value Retail Showrooms', desc: 'Double-door interlock mantrap systems with high-resolution visual visitor screening.' },
  { label: 'Apartment Builder Floors', desc: 'Multi-family residential floors with independent calling to floor 1, 2, 3, and 4 from a single gate panel.' },
]

const faqs = [
  {
    q: 'How does a Video Door Phone (VDP) system work?',
    a: 'A VDP system consists of an outdoor entry unit containing a camera, microphone, speaker, and call button, linked to one or more indoor touch display monitors. When a visitor presses the call button, the indoor monitor chimes, displays live high-definition video of the visitor, and enables hands-free two-way voice communication. If an electronic lock is connected, the resident can press an unlock button on the monitor to open the door.',
  },
  {
    q: 'Can a Video Door Phone open the door automatically?',
    a: 'Yes. By integrating the VDP monitor with an electronic rim lock, electromagnetic lock (EM lock), or electric door strike, residents can release the door latch directly from the indoor monitor or through their smartphone app without walking to the door.',
  },
  {
    q: 'Can I answer the Video Door Phone on my smartphone when away from home?',
    a: 'Yes. With our Wi-Fi and IP-enabled VDP models, incoming doorbell calls are forwarded in real time to authorized smartphones via encrypted mobile apps. You can view live video, speak with the visitor, and remotely unlock the door from anywhere with an active internet connection.',
  },
  {
    q: 'Can multiple indoor monitors be installed in one house or villa?',
    a: 'Yes. We frequently install multi-monitor setups in duplexes, builder floors, and multi-story villas (e.g., ground floor living room, first floor master bedroom, kitchen). When a visitor rings, all monitors ring simultaneously, and residents can also use the monitors for room-to-room internal intercom calls.',
  },
  {
    q: 'Does the system record who visited while I was away?',
    a: 'Yes. Modern VDP indoor monitors feature internal flash memory or MicroSD card slots that automatically take timestamped photos or 15-second video clips whenever the doorbell is pressed, creating a reliable log of all visitors.',
  },
  {
    q: 'Can VDP be retrofitted into a home with existing doorbell wiring?',
    a: 'Yes. Our 2-wire digital VDP technology is specifically designed for retrofit projects. It transmits high-definition digital video, two-way audio, power, and lock control signals over standard 2-core existing bell wire, eliminating the need to break or re-plaster walls.',
  },
]

export default function VdpPage() {
  return (
    <ServicePageLayout
      seo={{
        title: 'Video Door Phone (VDP) & Intercom Installation Delhi-NCR | Om Communication Work',
        description: 'Professional Video Door Phone (VDP) installation, multi-apartment video intercom, indoor touch monitors, electronic lock integration, and AMC maintenance across Delhi, Noida, Gurgaon, and Ghaziabad.',
        canonical: '/services/vdp',
      }}
      breadcrumbs={[
        { label: 'Solutions', href: '/services' },
        { label: 'Video Door Phone' },
      ]}
      hero={{
        eyebrow: 'Video Door Phone Systems',
        h1: "Know who's<br /><span class=\"gradient-text\">at the door.</span>",
        sub: 'High-definition video entry stations, crystal-clear two-way audio, electronic door lock release, and remote smartphone answering — for villas, builder floors, and residential high-rises across Delhi-NCR.',
        image: images.services.vdp.userMonitoring,
        imageAlt: 'Video door phone indoor touch screen monitor and visitor identification by Om Communication Work',
      }}
      overview="A Video Door Phone is the first line of defense for homes, builder floors, and corporate entrances. Om Communication Work installs complete video intercom solutions — from single-villa video doorbell systems with electronic gate lock release to multi-apartment building digital entry directories. Our systems combine wide-angle HD cameras, infrared night vision, capacitive color touch monitors, and smartphone app integration for effortless access control."
      whyNeeded={{
        title: 'Why traditional audio doorbells are no longer enough',
        text: 'Answering a door without visual verification creates serious security vulnerabilities for families, children, and office staff. Engineered Video Door Phone systems deliver:',
        points: [
          'Positive facial visual identification before unlocking entrance gates or doors',
          'Automated timestamped photo/video logging of all visitors and couriers',
          'Convenient one-touch door unlocking from indoor displays or mobile apps',
          'Safe screening of unknown visitors without opening main entrance doors',
        ],
      }}
      benefits={benefits}
      capabilities={capabilities}
      process={process}
      considerations={considerations}
      maintenanceInfo={{
        title: 'VDP Maintenance & Lock Servicing',
        text: 'Outdoor door stations are exposed to dust, heat, and rain, while electronic door locks experience mechanical wear over thousands of daily cycles. Om Communication provides preventive maintenance plans covering camera lens polishing, audio microphone tuning, electronic lock latch alignment, power supply testing, and cable continuity checks.',
        amcLink: '/services/amc',
      }}
      applications={applications}
      faqs={faqs}
      relatedLinks={[
        { label: 'CCTV Surveillance', href: '/services/cctv' },
        { label: 'Biometric Access Control', href: '/services/biometrics' },
        { label: 'EPABX & Intercom Systems', href: '/services/epabx' },
        { label: 'Structured Cabling & Networking', href: '/services/networking' },
        { label: 'Annual Maintenance Contracts (AMC)', href: '/services/amc' },
      ]}
      ctaHeadline="Upgrade Your Entryway with a Video Door Phone"
      ctaSub="Schedule an on-site demonstration and quotation in Delhi, Noida, Gurgaon, or Ghaziabad. Our technicians will inspect your door structure and recommend the ideal VDP system."
      ctaText="Plan My Access System →"
    />
  )
}
