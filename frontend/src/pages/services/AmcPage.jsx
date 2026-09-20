import { Clock, Shield, Wrench, CheckCircle2, AlertCircle, Zap, FileCheck, PhoneCall } from 'lucide-react'
import ServicePageLayout from '../../components/ServiceShared'
import { images } from '../../assets/imageMap'

const benefits = [
  {
    icon: Shield,
    title: 'Continuous System Uptime Support',
    desc: 'Regular scheduled inspections detect and resolve hardware degradation, dust accumulation, and power supply drops before outages occur.',
  },
  {
    icon: Clock,
    title: 'Priority On-Site Dispatch',
    desc: 'Direct hotline with priority breakdown dispatch ensuring operational downtime is minimized across Delhi-NCR facilities.',
  },
  {
    icon: Wrench,
    title: 'Preventive Lens & Hardware Servicing',
    desc: 'Quarterly physical cleaning of camera lenses, sensor recalibration, Krone terminal tightening, and server rack dust removal preserve clarity.',
  },
  {
    icon: Zap,
    title: 'Power Supply & UPS Battery Audits',
    desc: 'Routine voltage testing of SMPS power supplies, PoE switch ports, and UPS battery backup arrays prevents unexpected recording interruptions.',
  },
  {
    icon: FileCheck,
    title: 'Comprehensive Health Audit Reports',
    desc: 'Every preventive visit concludes with a signed technical audit report documenting storage retention status, line voltages, and component health.',
  },
  {
    icon: CheckCircle2,
    title: 'Predictable Maintenance Budgeting',
    desc: 'Eliminate surprise emergency repair costs with predictable, transparent annual maintenance pricing and discounted replacement components.',
  },
]

const capabilities = [
  'Comprehensive AMC (Covers Preventive Labor + Breakdown Visits + Replacement Spares)',
  'Non-Comprehensive AMC (Covers Scheduled Labor + Priority Breakdown Visits; Spares at Cost)',
  'Quarterly Scheduled Preventive Maintenance Inspections (4 Mandatory Visits/Year)',
  'CCTV Camera Cleaning, Focal Re-Alignment, and NVR Hard Drive Sector Diagnostics',
  'EPABX Intercom Line Voltage Testing, Dial-Tone Verification & Krone Re-Punching',
  'Biometric Access Reader Sensor Cleaning, Lock Latch Calibration & User Database Backup',
  'Video Door Phone Audio/Video Calibration, Lock Power Supply & Wiring Continuity Checks',
  'Structured Cabling Port Continuity Audits & Server Rack Ventilation Fan Servicing',
  'Dedicated Breakdown Response Dispatch across Delhi-NCR',
  'Firmware & Security Patch Updates for Network Video Recorders and Access Controllers',
  'Inventory Tagging and Serialized Equipment Documentation at Contract Onboarding',
  'Customer Support Ticketing Desk with Online Complaint Tracking and Service Logs',
]

const process = [
  {
    step: '01',
    title: 'Initial Site Survey & Inventory Audit',
    desc: 'Our engineers conduct a full physical audit of all existing cameras, NVRs, PBX switchboards, biometric readers, and cabling.',
  },
  {
    step: '02',
    title: 'System Health Baseline & Remediation',
    desc: 'We test existing component functionality, identify legacy faults, fix degraded wiring, and establish a certified operating baseline.',
  },
  {
    step: '03',
    title: 'AMC Contract Onboarding & Tagging',
    desc: 'All hardware units are assigned unique asset IDs, contract terms (Comprehensive or Non-Comprehensive) are formalized, and support is activated.',
  },
  {
    step: '04',
    title: 'Scheduled Quarterly Preventive Visits',
    desc: 'Technicians execute systematic quarterly maintenance checklists covering optical cleaning, electrical voltage tests, and firmware reviews.',
  },
  {
    step: '05',
    title: 'Priority Breakdown Response & Logging',
    desc: 'Whenever an issue arises, our mobile engineering team is dispatched per contract agreement, resolving faults with formal service log sign-offs.',
  },
]

const considerations = [
  {
    title: 'Comprehensive vs. Non-Comprehensive',
    desc: 'Non-Comprehensive covers all labor and unlimited service calls (spares charged separately). Comprehensive includes spare parts replacement for mature hardware.',
  },
  {
    title: 'System Age & Existing Faults',
    desc: 'Before initiating an AMC, an initial health audit identifies pre-existing hardware failures so they can be rectified before entering maintenance coverage.',
  },
  {
    title: 'Priority Service Response',
    desc: 'Evaluate facility criticality: manufacturing plants and commercial sites receive priority breakdown scheduling based on operational requirements.',
  },
  {
    title: 'Backup Storage & Spare Inventory',
    desc: 'A reliable AMC provider maintains ready standby buffer stock of essential spares (NVR power supplies, camera adapters, EM lock coils) for instant replacement.',
  },
]

const applications = [
  { label: 'Corporate IT Offices & Business Parks', desc: 'Continuous surveillance uptime, biometric attendance reliability, and server room access compliance.' },
  { label: 'Residential Societies & High-Rises', desc: 'Gate-to-flat intercom clarity, perimeter CCTV coverage, and high-cycle boom barrier/VDP maintenance.' },
  { label: 'Manufacturing Facilities & Industrial Hubs', desc: 'Harsh environment camera cleaning, factory floor conduit inspection, and multi-shift biometrics support.' },
  { label: 'Retail Chains & Commercial Showrooms', desc: 'Zero-downtime cash desk cameras, anti-theft surveillance recording, and POS network drops.' },
  { label: 'Warehouses & Logistics Centers', desc: 'Perimeter fence cameras, loading dock surveillance, and high-ceiling optical maintenance.' },
  { label: 'Hospitals & Educational Institutions', desc: 'Continuous campus security support, emergency intercom line maintenance, and nurse call verification.' },
]

const faqs = [
  {
    q: 'What is an Annual Maintenance Contract (AMC) for security systems?',
    a: 'An AMC is a formal service agreement where Om Communication Work assumes full responsibility for the routine preventive servicing, troubleshooting, and emergency repair of your electronic security and telecommunication infrastructure (CCTV, EPABX, Biometrics, VDP, and Networking). Instead of paying high ad-hoc repair charges when equipment fails, an AMC guarantees regular maintenance, priority technician dispatch, and maximum system lifespan.',
  },
  {
    q: 'What is the difference between Comprehensive and Non-Comprehensive AMC?',
    a: 'A Non-Comprehensive AMC covers all routine quarterly maintenance visits, breakdown labor visits, and technical support; any damaged spare parts are billed at actual cost. A Comprehensive AMC covers both labor and the cost of repairing or replacing faulty hardware components within agreed contract terms.',
  },
  {
    q: 'What specific tasks are performed during a quarterly preventive visit?',
    a: 'During each scheduled visit, our technicians: (1) physically clean camera lenses and dome covers, (2) inspect and tighten all BNC, RJ45, and power connectors, (3) verify NVR hard drive health and check recording retention days, (4) test line voltages on SMPS power supplies and UPS batteries, (5) clean biometric optical/facial sensors and back up user databases, (6) verify EPABX intercom dial-tones and Krone connections, and (7) deliver a signed service health audit report.',
  },
  {
    q: 'What is your response time for emergency breakdown calls in Delhi-NCR?',
    a: 'For clients under an active AMC contract, our emergency response team is dispatched promptly for critical system outages (such as complete NVR failure or gate intercom shutdown) across Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad.',
  },
  {
    q: 'Can you take over the AMC for a system installed by another contractor?',
    a: 'Yes. A large portion of our AMC portfolio consists of systems originally installed by other vendors. We start with a comprehensive site audit to evaluate cable quality, equipment condition, and power supplies. We rectify any initial baseline faults and seamlessly onboard the infrastructure under our standardized AMC support.',
  },
  {
    q: 'How do we log a service complaint under an active AMC contract?',
    a: 'AMC clients can log service requests 24/7 through our Online Complaint Desk portal, by calling our dedicated service desk at +91 72177 15296, or directly via WhatsApp. Every ticket receives an immediate tracking reference and status updates until technician resolution.',
  },
]

export default function AmcPage() {
  return (
    <ServicePageLayout
      seo={{
        title: 'Security System AMC & Maintenance Contracts Delhi-NCR | Om Communication Work',
        description: 'Comprehensive and non-comprehensive Annual Maintenance Contracts (AMC) for CCTV, EPABX intercom, biometric access control, and network infrastructure across Delhi, Noida, Gurgaon, and Ghaziabad.',
        canonical: '/services/amc',
      }}
      breadcrumbs={[
        { label: 'Solutions', href: '/services' },
        { label: 'Annual Maintenance Contracts' },
      ]}
      hero={{
        eyebrow: 'Annual Maintenance Contracts (AMC)',
        h1: "Security doesn't end<br /><span class=\"gradient-text\">at installation.</span>",
        sub: 'Scheduled preventive inspections, priority breakdown response, optical lens cleaning, and power audits across Delhi-NCR.',
        image: images.services.amc.technician,
        imageAlt: 'Security system maintenance technician inspecting server rack and NVR during preventive AMC visit by Om Communication Work',
      }}
      overview="Electronic security and telecommunication systems are critical infrastructure that must function reliably throughout the year. Dust accumulation, power surges, cable oxidation, and hard drive wear are leading causes of sudden footage loss and system failure. Om Communication Work provides structured Annual Maintenance Contracts (AMC) tailored for corporate offices, high-rise residential societies, and industrial manufacturing plants across Delhi-NCR."
      whyNeeded={{
        title: 'Why proactive maintenance is far superior to ad-hoc emergency repairs',
        text: 'Waiting for hardware to fail before calling a technician leaves your premises vulnerable without surveillance footage or intercom communication when security incidents occur. An engineered AMC delivers:',
        points: [
          'High recording and communication uptime through quarterly preventive audits',
          'Priority emergency technician dispatch bypassing long public waitlists',
          'Prolonged equipment lifespan through regular optical cleaning and power supply testing',
          'Transparent, predictable annual maintenance budgeting with zero surprise labor fees',
        ],
      }}
      benefits={benefits}
      capabilities={capabilities}
      process={process}
      considerations={considerations}
      applications={applications}
      faqs={faqs}
    />
  )
}
