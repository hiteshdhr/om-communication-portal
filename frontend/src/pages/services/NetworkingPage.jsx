import { Network, Server, Cable, Shield, Zap, Layers, CheckCircle2 } from 'lucide-react'
import ServicePageLayout from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const benefits = [
  {
    icon: Zap,
    title: 'High-Speed Gigabit Throughput',
    desc: 'Certified CAT6 and CAT6A solid copper cabling delivers 1Gbps to 10Gbps bandwidth with minimal packet loss and zero latency bottlenecks.',
  },
  {
    icon: Server,
    title: 'Clean, Structured Server Racks',
    desc: 'High-density patch panel termination, wire managers, and custom color-coded patch cords keep server rooms organized, accessible, and easily serviceable.',
  },
  {
    icon: Shield,
    title: 'Interference-Free Conduit Routing',
    desc: 'Cables routed through ISI-marked PVC and GI conduit are shielded from electromagnetic noise emitted by high-voltage electrical lines and machinery.',
  },
  {
    icon: Layers,
    title: 'Modular & Future-Proof Scalability',
    desc: 'A standardized structured layout allows network engineers to add new workstations, Wi-Fi access points, and IP cameras without disrupting ongoing network operations.',
  },
  {
    icon: Cable,
    title: 'Comprehensive Port & Cable Labeling',
    desc: 'Every wall faceplate, patch panel port, and network drop is systematically labeled per EIA/TIA-606 standards, reducing future troubleshooting time by 80%.',
  },
  {
    icon: Network,
    title: 'High-Power PoE Network Integration',
    desc: 'Power over Ethernet (PoE/PoE+) switches deliver data and electrical power simultaneously to CCTV cameras, IP phones, and Wi-Fi access points over a single CAT6 cable.',
  },
]

const capabilities = [
  'CAT6, CAT6A, and CAT7 UTP/FTP Structured Cabling for Offices & Data Centers',
  'Fiber Optic Cable Pulling & Splicing for High-Speed Long-Distance Building Backbones',
  'Server Rack Supply, Assembly & Cable Dressing (4U, 6U, 9U, 12U, 24U, 42U Enclosures)',
  '24-Port and 48-Port High-Density Patch Panel Termination & Port Mapping',
  'Managed & Unmanaged Gigabit PoE/PoE+ Network Switch Installation & VLAN Setup',
  'ISI-Marked PVC Heavy-Duty Conduit, GI Metal Pipes, Raceways & Cable Trays',
  'Dual-Band & Wi-Fi 6 Wireless Access Point (WAP) Strategic Placement & Installation',
  'Modular RJ45 Keystone Jack Wall Outlets and Under-Desk Faceplates',
  'End-to-End Continuity, Wire-Map, and Speed Certification Testing',
  'Cable De-Cluttering & Server Rack Re-Organization for Existing Facilities',
  'Network UPS Battery Backup Integration for Zero-Downtime Infrastructure',
  'Annual Maintenance Contracts (AMC), Port Audits & Network Expansion Support',
]

const process = [
  {
    step: '01',
    title: 'Floor Plan & Bandwidth Assessment',
    desc: 'We survey room layouts, count required data/voice drops, locate server rack locations, and identify shortest optimal cable pathways.',
  },
  {
    step: '02',
    title: 'Network Topology & Rack Design',
    desc: 'We design the structured layout including patch panel port allocation, switch bandwidth capacity, cable trays, and conduit raceways.',
  },
  {
    step: '03',
    title: 'Conduit & Cable Tray Laying',
    desc: 'Heavy-duty PVC or GI conduit and ceiling cable trays are installed, maintaining strict physical separation from electrical wiring.',
  },
  {
    step: '04',
    title: 'Cable Pulling, Termination & Dressing',
    desc: 'CAT6 cables are pulled without stretching, terminated cleanly onto patch panels and I/O keystone jacks, and neatly dressed inside server racks.',
  },
  {
    step: '05',
    title: 'Certification Testing & Handover',
    desc: 'Every single port is tested for continuity, speed, and cross-talk; ports are labeled, and complete network schematic documentation is delivered.',
  },
]

const considerations = [
  {
    title: 'Separation from Electrical Lines',
    desc: 'Data cables must run at least 12 inches (30cm) away from parallel high-voltage AC electrical lines to avoid electromagnetic cross-talk and data packet drop.',
  },
  {
    title: 'Cable Bend Radius & Pulling Tension',
    desc: 'CAT6 cables must not be bent sharply or pulled with excessive force during installation, as micro-deformations inside the copper twisted pairs cause signal loss.',
  },
  {
    title: 'Server Rack Ventilation & Depth',
    desc: 'Ensure the server rack has sufficient depth (e.g. 600mm to 1000mm) and ventilation fans to accommodate deep servers, switches, and UPS batteries.',
  },
  {
    title: 'Solid Pure Copper vs. CCA Wires',
    desc: 'We strictly install 100% pure electrolytic solid copper cables. Cheaper Copper Clad Aluminum (CCA) cables suffer from high resistance, overheating, and PoE failure.',
  },
]

const applications = [
  { label: 'Corporate Offices & IT Hubs', desc: 'Workstation LAN drops, server room racks, boardroom conferencing lines, and Wi-Fi access points.' },
  { label: 'Manufacturing Plants & Warehouses', desc: 'Rugged GI conduit cabling connecting shop floors, logistics terminals, and PoE cameras.' },
  { label: 'Residential Societies & Apartments', desc: 'Central internet distribution hubs, intercom riser backbones, and clubhouse networking.' },
  { label: 'Educational Campuses & Institutions', desc: 'Computer labs, smart classrooms, library networking, and multi-block fiber backbones.' },
  { label: 'Commercial Retail Chains & Malls', desc: 'Point of Sale (POS) network points, inventory scanner Wi-Fi, and surveillance drops.' },
  { label: 'Data Rooms & Server Closets', desc: 'Structured patch panel dressing, cable tray organization, and rack cooling optimization.' },
]

const faqs = [
  {
    q: 'What is structured cabling and why is it better than standard wiring?',
    a: 'Structured cabling is a standardized, organized architecture for building telecommunication and data networks. Instead of messy point-to-point cables running directly from devices to routers, structured cabling runs all cables to centralized patch panels in a server rack. This ensures reliable signal quality, clean cable organization, easy troubleshooting, and effortless scalability as your organization grows.',
  },
  {
    q: 'What is the practical difference between CAT5e, CAT6, and CAT6A cables?',
    a: 'CAT5e supports speeds up to 1Gbps at 100MHz bandwidth over 100 meters. CAT6 supports 1Gbps reliably over 100 meters and up to 10Gbps over shorter distances (up to 37–55 meters) with 250MHz bandwidth and tighter pair twisting to reduce noise. CAT6A supports 10Gbps over the full 100-meter run at 500MHz bandwidth. For all modern commercial office and surveillance installations, CAT6 or CAT6A is the industry standard.',
  },
  {
    q: 'Why is pure copper cabling mandatory for PoE (Power over Ethernet)?',
    a: 'Power over Ethernet (PoE) delivers direct electrical current alongside data to power IP cameras, phones, and access points. Pure bare copper wires have very low electrical resistance, ensuring stable power delivery without voltage drops or heat buildup. Substandard Copper Clad Aluminum (CCA) cables have high resistance, which causes severe voltage drops, overheating, and can destroy PoE equipment.',
  },
  {
    q: 'Can you clean up and re-organize our existing messy server rack?',
    a: 'Yes. Om Communication provides complete server rack de-cluttering and dressing services across Delhi-NCR. We trace and label unlabeled cables, install horizontal and vertical cable managers, replace tangled long cables with custom-sized color-coded patch cords, and re-terminate damaged ports without extended business downtime.',
  },
  {
    q: 'Do you also design and install Wi-Fi wireless networks?',
    a: 'Yes. We perform Wi-Fi signal coverage planning and install enterprise dual-band Wireless Access Points (WAPs) powered by PoE switches, providing seamless roaming, high bandwidth, and zero dead zones across multi-floor offices, warehouses, and campuses.',
  },
  {
    q: 'Do you provide AMC support for network infrastructure?',
    a: 'Yes. Our networking AMC agreements include periodic patch panel continuity audits, switch port health monitoring, rack fan and thermal inspection, UPS battery load testing, and priority technician dispatch for broken network points.',
  },
]

export default function NetworkingPage() {
  return (
    <ServicePageLayout
      seo={{
        title: 'Structured Cabling & Networking Infrastructure Delhi-NCR | Om Communication Work',
        description: 'Professional CAT6/CAT6A structured cabling, LAN network installation, server rack cable dressing, patch panel termination, PoE switch setup, and AMC maintenance across Delhi, Noida, Gurgaon, and Ghaziabad.',
        canonical: '/services/networking',
      }}
      breadcrumbs={[
        { label: 'Solutions', href: '/services' },
        { label: 'Structured Cabling & Networking' },
      ]}
      hero={{
        eyebrow: 'Networking & Structured Cabling',
        h1: 'The infrastructure<br /><span class="gradient-text">behind everything.</span>',
        sub: 'High-speed CAT6/CAT6A cabling, certified server rack dressing, patch panel termination, Gigabit PoE switches, and ISI conduit raceways — the dependable backbone for your enterprise technology across Delhi-NCR.',
        image: images.services.cabling.serverRack,
        imageAlt: 'Structured cabling server rack and network patch panel installation by Om Communication Work',
      }}
      overview="Every modern electronic security, communication, and IT system depends entirely on the physical network infrastructure supporting it. Om Communication Work designs and deploys certified structured cabling systems — from small office 24-port LAN setups to multi-floor corporate IT backbones and industrial fiber connections. We ensure organized server rack dressing, standardized port labeling, and high-performance throughput across Delhi-NCR."
      whyNeeded={{
        title: 'Why unstructured, ad-hoc network wiring cripples operations',
        text: 'Unorganized tangle of loose cables without proper conduit leads to unexpected network drops, severe cross-talk, hardware overheating, and hours of costly downtime during minor troubleshooting. Engineered structured cabling delivers:',
        points: [
          'Guaranteed Gigabit transmission speeds with zero electromagnetic signal interference',
          'Meticulously organized server racks and labeled ports enabling instant maintenance',
          'Stable, high-wattage PoE delivery to CCTV cameras, biometric readers, and Wi-Fi APs',
          'Long-term modular scalability allowing rapid addition of new workstations and hardware',
        ],
      }}
      benefits={benefits}
      capabilities={capabilities}
      process={process}
      considerations={considerations}
      maintenanceInfo={{
        title: 'Networking & Structured Cabling AMC Support',
        text: 'Network hardware and cables are subject to physical movement, dust accumulation in switch fans, accidental port damage, and power surges. Our preventive networking AMC contracts include quarterly patch panel continuity testing, switch port diagnostics, server rack cleaning, thermal checks, and priority on-site technician dispatch.',
        amcLink: '/services/amc',
      }}
      applications={applications}
      faqs={faqs}
      relatedLinks={[
        { label: 'CCTV Surveillance', href: '/services/cctv' },
        { label: 'EPABX & Intercom Systems', href: '/services/epabx' },
        { label: 'Biometric Access Control', href: '/services/biometrics' },
        { label: 'Video Door Phone (VDP)', href: '/services/vdp' },
        { label: 'Annual Maintenance Contracts (AMC)', href: '/services/amc' },
      ]}
      ctaHeadline="Plan Your Structured Cabling or Network Setup"
      ctaSub="Schedule a technical site survey with our network engineers in Delhi-NCR. We will assess your node count, design optimal conduit routes, and provide a clear, itemized proposal."
      ctaText="Plan My Network →"
    />
  )
}
