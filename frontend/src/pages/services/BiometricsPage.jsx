import { Fingerprint, Shield, Users, Clock, Lock, KeyRound, Smartphone, CheckCircle2 } from 'lucide-react'
import ServicePageLayout from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const benefits = [
  {
    icon: Shield,
    title: 'Zero Buddy Punching & Proxy Attendance',
    desc: 'Unique biological identifiers (fingerprints and 3D facial contours) eliminate time theft and proxy punching among staff.',
  },
  {
    icon: Lock,
    title: 'Zone-Based Door Access Restriction',
    desc: 'Restrict entry to authorized personnel only across sensitive areas like server rooms, cash vaults, executive offices, and R&D labs.',
  },
  {
    icon: Clock,
    title: 'Automated Shift & Overtime Calculation',
    desc: 'Attendance software logs exact clock-in, clock-out, break intervals, late arrivals, and overtime hours automatically for HR payroll export.',
  },
  {
    icon: Users,
    title: 'Touchless High-Speed Facial Recognition',
    desc: 'AI face recognition verifies employees within 0.2 seconds from up to 2 meters away, ensuring hygienic touchless entry even during peak shift changes.',
  },
  {
    icon: KeyRound,
    title: 'Multi-Factor Verification Flexibility',
    desc: 'Support hybrid authentication combining Face + Fingerprint + RFID Proximity Card + PIN on a single terminal based on security tiers.',
  },
  {
    icon: Smartphone,
    title: 'Centralized Multi-Branch Cloud Management',
    desc: 'Manage staff user enrollment, door access permissions, and attendance logs across multiple branch offices from a single dashboard.',
  },
]

const capabilities = [
  'AI Facial Recognition Access Terminals with Live Face Anti-Spoofing',
  'Optical & Capacitive Fingerprint Readers with Scratch-Resistant Sensor Glass',
  'RFID Proximity Card (125kHz EM & 13.56MHz Mifare) Readers and Keyfobs',
  'Electromagnetic (EM) Locks (600 lbs / 1200 lbs Holding Force) with LED Status',
  'Drop-Bolt Locks & Electric Strikes for Frameless Glass, Wooden, and Metal Doors',
  'Emergency Break-Glass Units and Heavy-Duty Stainless Steel Push-to-Exit Switches',
  'Multi-Door Access Controllers (1-Door, 2-Door, 4-Door TCP/IP & RS485 Boards)',
  'Turnstile & Flap Barrier Gate Integration for High-Volume Factory/Campus Entrances',
  'Desktop USB Enrollment Scanners for Fast HR Employee Onboarding',
  'Automated Time-Attendance Management Software with Excel/CSV & API Payroll Export',
  'Standalone Battery-Backed Access Power Supply with Fire Alarm Interlocking',
  'Annual Maintenance Contracts (AMC), Sensor Calibration & Access Software Support',
]

const process = [
  {
    step: '01',
    title: 'Door Structure & Egress Assessment',
    desc: 'We inspect door frame materials (frameless glass, aluminum, wood, fire-rated steel), pedestrian traffic volume, and emergency exit routes.',
  },
  {
    step: '02',
    title: 'Access Controller & Lock Specification',
    desc: 'We select matching electromagnetic locks, U-brackets/L-brackets for glass doors, biometric reader specifications, and power supply sizing.',
  },
  {
    step: '03',
    title: 'Concealed Cabling & Conduit Installation',
    desc: 'CAT6 network cables and multi-core access control power lines are run through concealed conduit from door frames to controller panels.',
  },
  {
    step: '04',
    title: 'Hardware Mounting & Lock Calibration',
    desc: 'Biometric terminals, EM locks, exit switches, and power supplies with battery backup are mounted and calibrated with millimeter precision.',
  },
  {
    step: '05',
    title: 'Software Setup, Enrollment & Handover',
    desc: 'We install the attendance software, configure shift timings, enroll initial employee biometrics, test emergency door release, and train HR staff.',
  },
]

const considerations = [
  {
    title: 'Door Type & Bracket Hardware',
    desc: 'Frameless glass doors require specialized U-brackets; narrow wooden frames need L-brackets or ZL-brackets. Proper bracket selection prevents door sagging.',
  },
  {
    title: 'Fire Alarm Interlock (Safety Compliance)',
    desc: 'Access-controlled doors must automatically release and unlock when a building fire alarm triggers to guarantee safe emergency evacuation.',
  },
  {
    title: 'Backup Battery Capacity',
    desc: 'Electromagnetic locks require constant power to stay locked (fail-safe). A dedicated 12V DC power supply with battery backup is mandatory.',
  },
  {
    title: 'Environmental Light at Sensor',
    desc: 'Facial recognition terminals should not face direct strong outdoor sunlight to maintain instantaneous 0.2s identification speeds.',
  },
]

const applications = [
  { label: 'Corporate IT Offices & Coworking', desc: 'Touchless facial recognition attendance, server room restricted access, and HR payroll integration.' },
  { label: 'Factories & Industrial Plants', desc: 'Heavy-duty turnstile biometric integration for multi-shift labor workforce time-tracking.' },
  { label: 'Hospitals & Medical Laboratories', desc: 'Hygienic touchless access for operation theaters, pharmacy storage, and doctor staff attendance.' },
  { label: 'Banks & Financial Institutions', desc: 'Dual-authentication access control for cash vaults, server rooms, and record archives.' },
  { label: 'Gyms & Membership Clubs', desc: 'RFID card and biometric reader turnstiles for automated member expiry access gating.' },
  { label: 'Educational Campuses & Schools', desc: 'Staff biometric attendance logging and automated SMS notifications upon student arrival.' },
]

const faqs = [
  {
    q: 'How does a biometric access control system work?',
    a: 'A biometric access system consists of a biometric terminal (fingerprint, facial recognition, or RFID reader) connected to an electronic door lock (such as an electromagnetic EM lock) and a power controller. When an enrolled person presents their face or finger, the terminal matches the biological data against its internal database. If authorized, it signals the controller to momentarily cut power to the EM lock, releasing the door.',
  },
  {
    q: 'What is the difference between fail-safe and fail-secure electronic locks?',
    a: 'Fail-safe locks (such as standard Electromagnetic EM locks) unlock when electrical power is cut, ensuring people can safely exit during emergencies or fires. Fail-secure locks (such as electric drop-bolts or rim strikes) remain locked when power fails, prioritizing perimeter security. For occupied commercial offices and fire exit doors, fail-safe locks integrated with emergency release switches are standard.',
  },
  {
    q: 'Can biometric attendance software integrate with payroll software?',
    a: 'Yes. The management software installed by Om Communication automatically logs daily in-time, out-time, break hours, late marks, half-days, and overtime. It can generate standard attendance reports and export data cleanly into Excel, CSV, or directly via database APIs into popular Indian payroll software like Tally, Spine, GreytHR, and Keka.',
  },
  {
    q: 'How does facial recognition work with face masks or glasses?',
    a: 'Our modern AI-powered facial recognition terminals use deep-learning neural network algorithms that analyze over 1,000 nodal points on the face, primarily focusing on eye geometry, nose bridge, and forehead structure. They accurately identify registered employees wearing prescription glasses, facial hair, or surgical face masks in under 0.2 seconds.',
  },
  {
    q: 'Can biometric systems work during internet and power outages?',
    a: 'Yes. All biometric hardware terminals store employee templates and thousands of offline punch records locally in their internal flash memory. When internet connectivity is restored, logs automatically sync to the server. For power cuts, our systems include dedicated 12V DC battery backup packs to keep locks and readers fully functional.',
  },
  {
    q: 'Do you provide maintenance for existing biometric attendance machines?',
    a: 'Yes. Om Communication offers Annual Maintenance Contracts (AMC) and on-call technician support across Delhi-NCR. We service hardware sensor errors, replace worn EM locks and exit buttons, re-install attendance database software, and assist HR teams with staff re-enrollments.',
  },
]

export default function BiometricsPage() {
  return (
    <ServicePageLayout
      seo={{
        title: 'Biometric Attendance & Access Control Systems Delhi-NCR | Om Communication Work',
        description: 'Professional biometric fingerprint attendance, AI facial recognition terminals, RFID access control, electromagnetic EM door locks, and AMC support across Delhi, Noida, Gurgaon, and Ghaziabad.',
        canonical: '/services/biometrics',
      }}
      breadcrumbs={[
        { label: 'Solutions', href: '/services' },
        { label: 'Biometric & Access Control' },
      ]}
      hero={{
        eyebrow: 'Biometric & Access Control Systems',
        h1: 'Access that knows<br /><span class="gradient-text">who belongs.</span>',
        sub: 'Touchless AI facial recognition, high-precision fingerprint terminals, electromagnetic door locks, and automated HR time-attendance software — engineered for offices, factories, and institutions across Delhi-NCR.',
        image: images.services.biometrics.rfid,
        imageAlt: 'Biometric RFID card reader and electronic access control door installation by Om Communication Work',
      }}
      overview="Controlling physical access and accurately managing workforce attendance are fundamental to corporate security and operational productivity. Om Communication Work installs complete access control architectures — from single-door glass office biometric locks to multi-door enterprise turnstile networks and multi-branch attendance software. We ensure reliable hardware calibration, fire-safe emergency interlocking, and seamless payroll data exports."
      whyNeeded={{
        title: 'Why manual attendance registers and mechanical keys fail',
        text: 'Physical keys are easily lost, copied, or stolen, while paper attendance registers lead to proxy punching and payroll calculation disputes. Engineered biometric access systems deliver:',
        points: [
          '100% elimination of proxy attendance and time theft with biological verification',
          'Selective, zone-based access control protecting servers, vaults, and confidential areas',
          'Instant, automated HR attendance reports saving hours of monthly payroll processing',
          'Complete audit trail with timestamped entry/exit logs accessible in real time',
        ],
      }}
      benefits={benefits}
      capabilities={capabilities}
      process={process}
      considerations={considerations}
      maintenanceInfo={{
        title: 'Access Control & Biometrics AMC Plans',
        text: 'Access control systems endure heavy daily usage with hundreds of daily door unlock cycles. Worn push-to-exit buttons, misaligned magnetic brackets, power supply battery failure, or database sync errors can compromise facility security. Our AMC plans include periodic lock tension testing, sensor cleaning, power supply audits, and rapid technician dispatch in Delhi, Noida, Gurgaon, and Ghaziabad.',
        amcLink: '/services/amc',
      }}
      applications={applications}
      faqs={faqs}
      relatedLinks={[
        { label: 'CCTV Surveillance', href: '/services/cctv' },
        { label: 'Video Door Phone (VDP)', href: '/services/vdp' },
        { label: 'EPABX & Intercom Systems', href: '/services/epabx' },
        { label: 'Structured Cabling & Networking', href: '/services/networking' },
        { label: 'Annual Maintenance Contracts (AMC)', href: '/services/amc' },
      ]}
      ctaHeadline="Secure Your Facility with Biometric Access Control"
      ctaSub="Schedule an on-site survey in Delhi-NCR. Our security engineers will inspect your doors, evaluate access control requirements, and provide an all-inclusive technical quotation."
      ctaText="Plan My Attendance System →"
    />
  )
}
