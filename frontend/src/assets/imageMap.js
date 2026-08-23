// Centralized Image Registry for OM Communication Works (OCW)
// All assets sourced from verified structured folder

// Brand
import ocwLogo from './ocw/01-brand/ocw-logo.png'

// Homepage Hero & Promotional Assets
import securitySurveillanceHero from './ocw/02-homepage/hero/security-surveillance-hero.png'
import services4PanelCollage from './ocw/02-homepage/services-preview/services-4-panel-collage.png'

// CCTV Service Assets
import cctvDomeInstallation from './ocw/03-services/cctv/cctv-dome-installation.jpg'
import cctvExteriorInstallation from './ocw/03-services/cctv/cctv-exterior-installation.jpg'
import cctvIndustrialMonitoring from './ocw/03-services/cctv/cctv-industrial-monitoring.jpg'
import cctvResidentialInstallation from './ocw/03-services/cctv/cctv-residential-installation.jpg'
import cctvTechnicianCeilingInstallation from './ocw/03-services/cctv/cctv-technician-ceiling-installation.jpg'
import cctvTechnicianInstallation2 from './ocw/03-services/cctv/cctv-technician-installation-2.jpg'
import cctvTechnicianInstallation from './ocw/03-services/cctv/cctv-technician-installation.jpg'
import cctvWarehouseSurveillance from './ocw/03-services/cctv/cctv-warehouse-surveillance.jpg'

// EPABX & Telecom Assets
import epabxOfficeCablingInstallation from './ocw/03-services/epabx-telecom/epabx-office-cabling-installation.jpg'
import epabxOfficePhones from './ocw/03-services/epabx-telecom/epabx-office-phones.jpg'
import epabxSystemTechnician from './ocw/03-services/epabx-telecom/epabx-system-technician.jpg'
import epabxTelephoneConsole from './ocw/03-services/epabx-telecom/epabx-telephone-console.jpg'
import telecomCablingTechnician from './ocw/03-services/epabx-telecom/telecom-cabling-technician.jpg'
import telecomRackTechnician from './ocw/03-services/epabx-telecom/telecom-rack-technician.jpg'

// Video Door Phone (VDP) Assets
import vdpIndoorMonitor from './ocw/03-services/vdp/vdp-indoor-monitor.jpg'
import vdpUserMonitoring from './ocw/03-services/vdp/vdp-user-monitoring.jpg'

// Biometric & Access Control Assets
import accessControlGate from './ocw/03-services/biometric-access-control/access-control-gate.jpg'
import accessControlTechnician from './ocw/03-services/biometric-access-control/access-control-technician.jpg'
import biometricAccessReader from './ocw/03-services/biometric-access-control/biometric-access-reader.jpg'
import biometricTerminalInstallation from './ocw/03-services/biometric-access-control/biometric-terminal-installation.jpg'
import doorEntrySystemInstallation from './ocw/03-services/biometric-access-control/door-entry-system-installation.jpg'
import rfidCardAccessControl from './ocw/03-services/biometric-access-control/rfid-card-access-control.jpg'

// Structured Cabling Assets
import cat6CablingOfficeInstallation from './ocw/03-services/structured-cabling/cat6-cabling-office-installation.jpg'
import networkCabinetEquipment from './ocw/03-services/structured-cabling/network-cabinet-equipment.jpg'
import networkRackTechnician from './ocw/03-services/structured-cabling/network-rack-technician.jpg'
import patchPanelCableManagement from './ocw/03-services/structured-cabling/patch-panel-cable-management.jpg'
import serverNetworkRack from './ocw/03-services/structured-cabling/server-network-rack.jpg'
import serverRackCableInstallation from './ocw/03-services/structured-cabling/server-rack-cable-installation.jpg'
import structuredCablingServerRack from './ocw/03-services/structured-cabling/structured-cabling-server-rack.jpg'
import structuredCablingTechnician from './ocw/03-services/structured-cabling/structured-cabling-technician.jpg'

// Conduit Wiring Assets
import conduitCableInstallation from './ocw/03-services/conduit-wiring/conduit-cable-installation.jpg'

// Turnkey Project Assets
import turnkeyProjectTeam from './ocw/03-services/turnkey-projects/turnkey-project-team.jpg'
import turnkeySitePlanningTeam from './ocw/03-services/turnkey-projects/turnkey-site-planning-team.jpg'

// Industry-Specific Assets
import commercialCctvMonitoring from './ocw/04-industries/commercial/commercial-cctv-monitoring.jpg'
import securityControlRoom from './ocw/04-industries/commercial/security-control-room.jpg'
import industrialCctvFactory from './ocw/04-industries/industrial/industrial-cctv-factory.jpg'

// About & Corporate Consultation Assets
import technicianClientConsultation from './ocw/05-about/technician-client-consultation.jpg'

export const images = {
  brand: {
    logo: ocwLogo,
  },
  hero: {
    background: cctvIndustrialMonitoring, // Clean high-resolution surveillance photo without baked text
    composite: securitySurveillanceHero,
  },
  preview: {
    collage: services4PanelCollage,
  },
  services: {
    cctv: {
      hero: cctvTechnicianCeilingInstallation,
      dome: cctvDomeInstallation,
      warehouse: cctvWarehouseSurveillance,
      residential: cctvResidentialInstallation,
      exterior: cctvExteriorInstallation,
      industrial: cctvIndustrialMonitoring,
      technician1: cctvTechnicianInstallation,
      technician2: cctvTechnicianInstallation2,
      technicianCeiling: cctvTechnicianCeilingInstallation,
    },
    epabx: {
      hero: epabxOfficeCablingInstallation,
      technician: epabxSystemTechnician,
      console: epabxTelephoneConsole,
      phones: epabxOfficePhones,
      cablingTech: telecomCablingTechnician,
      rackTech: telecomRackTechnician,
    },
    vdp: {
      hero: vdpIndoorMonitor,
      userMonitoring: vdpUserMonitoring,
    },
    biometrics: {
      hero: biometricAccessReader,
      rfid: rfidCardAccessControl,
      gate: accessControlGate,
      technician: accessControlTechnician,
      doorEntry: doorEntrySystemInstallation,
      terminal: biometricTerminalInstallation,
    },
    cabling: {
      serverRack: structuredCablingServerRack,
      rackTech: networkRackTechnician,
      equipment: networkCabinetEquipment,
      patchPanel: patchPanelCableManagement,
      cat6Office: cat6CablingOfficeInstallation,
      rackCableInst: serverRackCableInstallation,
      networkRack: serverNetworkRack,
      technician: structuredCablingTechnician,
    },
    conduit: {
      installation: conduitCableInstallation,
    },
    turnkey: {
      team: turnkeyProjectTeam,
      planning: turnkeySitePlanningTeam,
    },
    amc: {
      inspection: cctvTechnicianInstallation2,
      rackMaintenance: telecomRackTechnician,
      cableCheck: telecomCablingTechnician,
      serverCheck: networkRackTechnician,
    }
  },
  industries: {
    commercial: {
      controlRoom: securityControlRoom,
      monitoring: commercialCctvMonitoring,
    },
    industrial: {
      factory: industrialCctvFactory,
    },
    residential: {
      cctv: cctvResidentialInstallation,
      vdp: vdpIndoorMonitor,
    }
  },
  about: {
    consultation: technicianClientConsultation,
    team: turnkeySitePlanningTeam,
  },
  projects: {
    hero: turnkeyProjectTeam,
    sitePlanning: turnkeySitePlanningTeam,
    networkRack: structuredCablingServerRack,
    controlRoom: securityControlRoom,
    factory: industrialCctvFactory,
    telecomCabinet: epabxOfficeCablingInstallation,
    technicianWork: structuredCablingTechnician,
  }
}

export default images
