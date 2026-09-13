import { PhoneCall, Building, Network, Shield, Zap, Layers, CheckCircle2 } from 'lucide-react'
import ServicePageLayout from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const benefits = [
  {
    icon: Zap,
    title: 'Zero-Cost Internal Communication',
    desc: 'Communicate instantly between offices, warehouse floors, departments, and residential flats with zero telecom call charges.',
  },
  {
    icon: PhoneCall,
    title: 'Automated Call Routing & IVR',
    desc: 'Professional auto-attendants guide external callers with customizable greeting menus, forwarding them directly to the right department.',
  },
  {
    icon: Layers,
    title: 'Multi-Line Scalability',
    desc: 'Modular switchboards allow businesses and societies to expand from 8 extensions up to hundreds of lines as facility requirements grow.',
  },
  {
    icon: Network,
    title: 'Structured Riser Shaft Cabling',
    desc: 'High-pair telephone cables (10-pair, 20-pair, 50-pair, 100-pair) terminated in organized Krone distribution boxes prevent signal cross-talk.',
  },
  {
    icon: Building,
    title: 'Gate-to-Flat Society Intercom',
    desc: 'Enables security guard cabins at society entrance gates to verify visitors directly with individual flat owners before authorizing entry.',
  },
  {
    icon: Shield,
    title: 'Power Failure Transfer & Reliability',
    desc: 'Hardware failover mechanisms and battery backup ensure critical external lines remain functional even during building electrical outages.',
  },
]

const capabilities = [
  'Digital & Analog EPABX Systems for Small-to-Mid Offices and Societies',
  'IP-PBX Hybrid Systems supporting VoIP, SIP Trunks, and Remote Extensions',
  'Interactive Voice Response (IVR) & Automated Multi-Level Call Attendant',
  'Call Forwarding, Call Waiting, Call Hold, Call Pick-Up & Call Conferencing',
  'Multi-Pair Riser Cable Pulling (10-pair up to 100-pair armored/unarmored)',
  'Krone Box Distribution Frames (MDF/IDF) with Color-Coded Patching',
  'Security Guard Intercom Consoles with Direct Flat Calling Matrix',
  'Voice Recording Integration for Quality Assurance and Security Verification',
  'Door Phone Integration with Remote Intercom-Activated Lock Release',
  'Music on Hold (MOH) and Customizable Corporate Welcome Greetings',
  'Direct Inward Dialing (DID) and Extension-Wise Call Budgeting/Locking',
  'Annual Maintenance Contracts (AMC), Line Troubleshooting, and Krone Re-Punching',
]

const process = [
  {
    step: '01',
    title: 'Capacity & Trunk Requirement Survey',
    desc: 'We calculate total internal extensions required, incoming CO/PRI/SIP lines, riser shaft pathways, and guard station locations.',
  },
  {
    step: '02',
    title: 'System Design & Distribution Architecture',
    desc: 'We map Main Distribution Frames (MDF), floor-wise Intermediate Distribution Frames (IDF), Krone module counts, and cable gauges.',
  },
  {
    step: '03',
    title: 'Riser Cabling & Conduit Installation',
    desc: 'Multi-pair telephone cables are pulled through vertical conduit shafts with strain relief, preventing wire sagging and line degradation.',
  },
  {
    step: '04',
    title: 'PBX Programming & Feature Configuration',
    desc: 'We install the central exchange unit, program extension numbers, configure IVR call trees, set up call forwarding, and terminate Krone blocks.',
  },
  {
    step: '05',
    title: 'End-to-End Line Testing & Handover',
    desc: 'Every desk extension and guard intercom is tested for audio clarity, ring signal, dial-tone reliability, and staff training is provided.',
  },
]

const considerations = [
  {
    title: 'Extension Count vs. Growth Margin',
    desc: 'Always select a PBX chassis with at least 20–30% spare capacity or expandable card slots to accommodate future office or society expansion.',
  },
  {
    title: 'Analog vs. IP-PBX Architecture',
    desc: 'Traditional analog systems are highly cost-effective for residential intercoms; corporate offices with multiple branches benefit from IP-PBX with SIP trunks.',
  },
  {
    title: 'Riser Cable Quality & ISI Conduit',
    desc: 'Poor quality unshielded telephone cables cause buzzing and cross-talk. We utilize high-grade electrolytic copper cables in dedicated conduit.',
  },
  {
    title: 'Main Distribution Frame (MDF) Labeling',
    desc: 'A meticulously labeled Krone distribution frame saves hours of troubleshooting during future line repairs or room re-allocations.',
  },
]

const applications = [
  { label: 'Residential Societies & Apartments', desc: 'Gate guard to flat intercom, inter-flat communication, clubhouse and maintenance desk lines.' },
  { label: 'Corporate Offices & Call Centers', desc: 'Departmental extensions, reception call distribution, executive direct lines, and IVR routing.' },
  { label: 'Manufacturing Facilities & Factories', desc: 'Intercom linking shop floor, inventory warehouse, security cabins, and administrative offices.' },
  { label: 'Hospitals & Healthcare Clinics', desc: 'Nurse call stations, doctor desk extensions, pharmacy coordination, and emergency emergency lines.' },
  { label: 'Hotels & Hospitality', desc: 'Guest room telephone extensions, room service routing, reception billing PBX integration.' },
  { label: 'Educational Institutions & Schools', desc: 'Staff room, administration, principal office, and campus entry security intercom lines.' },
]

const faqs = [
  {
    q: 'What is an EPABX system and how does it work?',
    a: 'EPABX stands for Electronic Private Automatic Branch Exchange. It is a dedicated switching system that manages internal telephone extensions within an organization or residential community while sharing a limited number of external telephone lines (CO/SIP trunks). Internal calls between extensions are routed automatically without incurring public telecom costs.',
  },
  {
    q: 'What is the difference between a traditional EPABX and an IP-PBX?',
    a: 'Traditional EPABX systems route calls through physical copper telephone pairs and analog/digital switchboards. IP-PBX (Internet Protocol PBX) systems route voice calls as data packets over Ethernet LAN cables or the internet using SIP (Session Initiation Protocol), allowing remote extensions, smartphone softphones, and inter-branch VoIP connectivity without long-distance charges.',
  },
  {
    q: 'How does residential society gate-to-flat intercom work?',
    a: 'A central EPABX exchange is connected to the security guard cabin at the society entrance gate and linked to every flat via multi-pair riser cables. When a visitor arrives, the guard dials the flat number on their master console. The flat owner answers, verifies the visitor, and authorizes entry. The system can also incorporate intercom calls to facility management, maintenance staff, and clubhouse offices.',
  },
  {
    q: 'Can an existing analog intercom wiring setup be repaired or upgraded?',
    a: 'Yes. Om Communication specializes in revitalizing older residential and commercial intercom systems across Delhi-NCR. We test cable continuity, replace rusted Krone junction boxes, trace broken pairs, re-terminate distribution frames, and replace aging PBX motherboards with modern, surge-protected systems.',
  },
  {
    q: 'What is a Krone box and why is it important in EPABX installations?',
    a: 'A Krone box (Distribution Frame) is a structured junction box containing insulation displacement connection (IDC) modules. It allows multiple telephone pairs coming from the central exchange to be cleanly punched down, organized, color-coded, and routed to specific rooms or apartments. A well-organized Krone box prevents signal cross-talk and makes troubleshooting fast and reliable.',
  },
  {
    q: 'Do you offer AMC maintenance for EPABX intercom systems?',
    a: 'Yes. Our EPABX AMC contracts cover scheduled quarterly testing of line voltages, Krone re-punching, power supply inspection, extension re-programming, priority breakdown response for dead lines, and rapid technician dispatch in Delhi, Noida, Gurgaon, and Ghaziabad.',
  },
]

export default function EpabxPage() {
  return (
    <ServicePageLayout
      seo={{
        title: 'EPABX & Intercom System Installation Delhi-NCR | Om Communication Work',
        description: 'Turnkey EPABX system design, office telephone exchange installation, residential society intercom, multi-pair riser cabling, and AMC maintenance across Delhi, Noida, Gurgaon, and Ghaziabad.',
        canonical: '/services/epabx',
      }}
      breadcrumbs={[
        { label: 'Solutions', href: '/services' },
        { label: 'EPABX & Intercom' },
      ]}
      hero={{
        eyebrow: 'EPABX & Intercom Systems',
        h1: 'Communication that keeps<br /><span class="gradient-text">your business moving.</span>',
        sub: 'Multi-line telephone exchanges, seamless office intercom routing, vertical riser cabling, and residential gate-to-flat communication networks — engineered for reliability across Delhi-NCR.',
        image: images.services.epabx.phones,
        imageAlt: 'EPABX telephone console and office intercom system installation by Om Communication Work',
      }}
      overview="Clear, immediate internal communication is critical for operational efficiency and security. Om Communication Work engineers complete EPABX and telecom intercom infrastructure — from multi-department corporate PBX networks with IVR call routing to multi-hundred-flat residential society intercom backbones. We handle complete multi-pair riser cabling, Krone distribution frame termination, exchange configuration, and long-term maintenance across Delhi-NCR."
      whyNeeded={{
        title: 'Why professional intercom infrastructure is essential',
        text: 'Relying solely on mobile phones for internal business operations or residential visitor security creates delays, recurring mobile call expenses, and privacy risks. Engineered EPABX infrastructure delivers:',
        points: [
          'Immediate, zero-cost internal communication across all desks, floors, and facility blocks',
          'Controlled visitor entry verification from society security gate to flat owners',
          'Professional corporate image with customized IVR greetings and departmental call routing',
          'Centralized telephone management with call logging and extension-level budgeting',
        ],
      }}
      benefits={benefits}
      capabilities={capabilities}
      process={process}
      considerations={considerations}
      maintenanceInfo={{
        title: 'EPABX & Intercom AMC Support',
        text: 'Intercom lines in high-rise buildings and corporate campuses are vulnerable to moisture in riser shafts, oxidation on Krone terminals, and power surges. Om Communication provides preventive EPABX maintenance agreements with periodic line continuity testing, dial-tone audits, exchange battery testing, and priority technician dispatch.',
        amcLink: '/services/amc',
      }}
      applications={applications}
      faqs={faqs}
      relatedLinks={[
        { label: 'CCTV Surveillance', href: '/services/cctv' },
        { label: 'Video Door Phone (VDP)', href: '/services/vdp' },
        { label: 'Structured Cabling & Networking', href: '/services/networking' },
        { label: 'Biometric Access Control', href: '/services/biometrics' },
        { label: 'Annual Maintenance Contracts (AMC)', href: '/services/amc' },
      ]}
      ctaHeadline="Need EPABX or Intercom Installation in Delhi-NCR?"
      ctaSub="Schedule a technical site consultation with our telecommunication engineers to evaluate extension capacity, cable routes, and get a complete turnkey proposal."
      ctaText="Plan My Office Communication →"
    />
  )
}
