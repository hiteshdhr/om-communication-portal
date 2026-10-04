package com.omcommunication.portal.controller;

import com.omcommunication.portal.model.AuditLog;
import com.omcommunication.portal.model.Inquiry;
import com.omcommunication.portal.model.Invoice;
import com.omcommunication.portal.model.SiteSurvey;
import com.omcommunication.portal.model.Ticket;
import com.omcommunication.portal.service.AuditLogService;
import com.omcommunication.portal.service.InquiryService;
import com.omcommunication.portal.service.InvoiceService;
import com.omcommunication.portal.service.SiteSurveyService;
import com.omcommunication.portal.service.TicketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final Logger log = LoggerFactory.getLogger(AdminController.class);

    private final InquiryService inquiryService;
    private final InvoiceService invoiceService;
    private final TicketService ticketService;
    private final SiteSurveyService siteSurveyService;
    private final AuditLogService auditLogService;

    @Value("${razorpay.key-id:NOT_CONFIGURED}")
    private String razorpayKeyId;

    @Value("${spring.mail.host:localhost}")
    private String mailHost;

    @Value("${spring.mail.username:mock}")
    private String mailUsername;

    public AdminController(InquiryService inquiryService,
                           InvoiceService invoiceService,
                           TicketService ticketService,
                           SiteSurveyService siteSurveyService,
                           AuditLogService auditLogService) {
        this.inquiryService = inquiryService;
        this.invoiceService = invoiceService;
        this.ticketService = ticketService;
        this.siteSurveyService = siteSurveyService;
        this.auditLogService = auditLogService;
    }

    // ─── Dashboard Metrics ────────────────────────────────────────────────────
    @GetMapping("/dashboard/metrics")
    public ResponseEntity<?> getDashboardMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalInquiries", inquiryService.countTotal());
        metrics.put("newLeads", inquiryService.countByStatus(Inquiry.Status.NEW));
        metrics.put("siteSurveysScheduled", siteSurveyService.countByStatus(SiteSurvey.Status.SCHEDULED));
        metrics.put("quotationsPreparing", inquiryService.countByStatus(Inquiry.Status.QUOTATION_PREPARING));
        metrics.put("activeComplaints", ticketService.countByStatus(Ticket.Status.OPEN)
                + ticketService.countByStatus(Ticket.Status.IN_PROGRESS));
        metrics.put("totalRevenue", invoiceService.getTotalRevenue());
        metrics.put("outstandingPayments", invoiceService.getOutstandingAmount());
        return ResponseEntity.ok(metrics);
    }

    // ─── Inquiries / Leads ────────────────────────────────────────────────────
    @GetMapping("/inquiries")
    public ResponseEntity<List<Inquiry>> getInquiries() {
        return ResponseEntity.ok(inquiryService.getAllInquiries());
    }

    @PutMapping("/inquiries/{id}/status")
    public ResponseEntity<?> updateInquiryStatus(@PathVariable UUID id,
                                                  @RequestBody Map<String, String> body) {
        try {
            Inquiry.Status status = Inquiry.Status.valueOf(body.get("status").toUpperCase());
            Inquiry updated = inquiryService.updateStatus(id, status);
            auditLogService.log("STATUS_CHANGED", "INQUIRY", id.toString(),
                    "Inquiry status changed to " + status + " for client: " + updated.getClientName(), "ADMIN");
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid status. Valid values: "
                    + List.of(Inquiry.Status.values())));
        }
    }

    @DeleteMapping("/inquiries/{id}")
    public ResponseEntity<?> deleteInquiry(@PathVariable UUID id) {
        try {
            inquiryService.deleteInquiry(id);
            auditLogService.log("INQUIRY_DELETED", "INQUIRY", id.toString(), "Inquiry deleted by admin", "ADMIN");
            return ResponseEntity.ok(Map.of("message", "Inquiry deleted successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    // ─── Site Surveys ─────────────────────────────────────────────────────────
    @GetMapping("/site-surveys")
    public ResponseEntity<List<SiteSurvey>> getSiteSurveys() {
        return ResponseEntity.ok(siteSurveyService.getAllSurveys());
    }

    @GetMapping("/site-surveys/inquiry/{inquiryId}")
    public ResponseEntity<List<SiteSurvey>> getSurveysForInquiry(@PathVariable UUID inquiryId) {
        return ResponseEntity.ok(siteSurveyService.getSurveysForInquiry(inquiryId));
    }

    @PostMapping("/site-surveys/inquiry/{inquiryId}")
    public ResponseEntity<?> scheduleSurvey(@PathVariable UUID inquiryId,
                                             @RequestBody SiteSurvey survey) {
        try {
            SiteSurvey created = siteSurveyService.scheduleSurvey(inquiryId, survey);
            auditLogService.log("SURVEY_SCHEDULED", "SURVEY", created.getId().toString(),
                    "Site survey scheduled for: " + created.getContactPerson() + " at " + created.getSiteAddress(), "ADMIN");
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/site-surveys/{surveyId}")
    public ResponseEntity<?> updateSurvey(@PathVariable UUID surveyId,
                                           @RequestBody SiteSurvey updates) {
        try {
            SiteSurvey updated = siteSurveyService.updateSurvey(surveyId, updates);
            auditLogService.log("SURVEY_UPDATED", "SURVEY", surveyId.toString(),
                    "Survey status updated to: " + updated.getStatus(), "ADMIN");
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    // ─── Documents / Invoices ─────────────────────────────────────────────────
    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @PostMapping("/invoices")
    public ResponseEntity<?> createInvoice(@Valid @RequestBody Invoice invoice) {
        try {
            Invoice created = invoiceService.createInvoice(invoice);
            auditLogService.log("DOCUMENT_CREATED", "DOCUMENT", created.getInvoiceNumber(),
                    created.getDocumentType() + " created for client: " + created.getClientName()
                            + " | Amount: ₹" + created.getTotalAmount(), "ADMIN");
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            log.error("Failed to create document", e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to create document. Please try again."));
        }
    }

    @PutMapping("/invoices/{id}")
    public ResponseEntity<?> updateInvoice(@PathVariable UUID id, @Valid @RequestBody Invoice invoice) {
        try {
            Invoice updated = invoiceService.updateInvoice(id, invoice);
            auditLogService.log("DOCUMENT_UPDATED", "DOCUMENT", updated.getInvoiceNumber(),
                    updated.getDocumentType() + " updated for client: " + updated.getClientName()
                            + " | Amount: ₹" + updated.getTotalAmount(), "ADMIN");
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            // Business-rule failures (e.g. "Cannot edit a PAID document") carry a
            // safe, developer-authored message and are a client error (400).
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Failed to update document", e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to update document. Please try again."));
        }
    }

    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable UUID id) {
        try {
            // Fetch reference before deletion for audit log
            String ref = id.toString();
            try {
                Invoice inv = invoiceService.getById(id);
                ref = inv.getInvoiceNumber() + " (" + inv.getDocumentType() + ") - " + inv.getClientName();
            } catch (Exception ignored) {}

            invoiceService.deleteInvoice(id);
            auditLogService.log("DOCUMENT_DELETED", "DOCUMENT", id.toString(),
                    "Document deleted: " + ref, "ADMIN");
            return ResponseEntity.ok(Map.of("message", "Document deleted successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    // ─── Support Tickets ──────────────────────────────────────────────────────
    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @PutMapping("/tickets/{id}")
    public ResponseEntity<?> updateTicket(@PathVariable UUID id,
                                           @RequestBody Ticket updates) {
        try {
            Ticket updated = ticketService.updateTicket(id, updates);
            auditLogService.log("TICKET_UPDATED", "TICKET", updated.getTicketNumber(),
                    "Support ticket " + updated.getTicketNumber() + " updated. Status: " + updated.getStatus(), "ADMIN");
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable UUID id) {
        try {
            ticketService.deleteTicket(id);
            auditLogService.log("TICKET_DELETED", "TICKET", id.toString(), "Support ticket deleted by admin", "ADMIN");
            return ResponseEntity.ok(Map.of("message", "Ticket deleted successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    // ─── Settings & Audit Log ─────────────────────────────────────────────────
    @GetMapping("/settings")
    public ResponseEntity<?> getSettings() {
        Map<String, Object> settings = new HashMap<>();

        // Application Info
        settings.put("appName", "OM Communication Works — Admin Portal");
        settings.put("appVersion", "2.0.0");
        settings.put("businessName", "OM COMMUNICATION WORKS");
        settings.put("businessAddress", "1/4007 Ram Nagar, Shahdara, Delhi, 110032");
        settings.put("businessPhone", "+91 72177 15296, 9643610564");
        settings.put("businessEmail", "singhomkar053@gmail.com");
        settings.put("gstin", "07COSPS8901L2Z0");
        settings.put("pan", "COSPS8901L");

        // Document Settings
        settings.put("defaultGstRate", 18);
        settings.put("quotationPrefix", "OCW-Q-");
        settings.put("invoicePrefix", "OCW-INV-");
        settings.put("billPrefix", "OCW-B-");
        settings.put("defaultTerms", "75% ADVANCE WITH WORK ORDER, 25% ON COMPLETION | 1-YEAR ON-SITE WARRANTY");

        // Payment Config Status (never expose secrets)
        boolean razorpayConfigured = razorpayKeyId != null && !razorpayKeyId.equals("NOT_CONFIGURED")
                && !razorpayKeyId.equals("rzp_test_key_id");
        settings.put("razorpayStatus", razorpayConfigured ? "Configured" : "Test Mode / Not Configured");
        settings.put("razorpayKeyIdPrefix", razorpayKeyId != null && razorpayKeyId.length() > 8
                ? razorpayKeyId.substring(0, 8) + "..." : "Not Set");

        // Email Config Status (never expose password/secrets)
        boolean mailConfigured = mailHost != null && !mailHost.equals("localhost");
        settings.put("emailStatus", mailConfigured ? "Configured" : "Not Configured");
        settings.put("emailHost", mailConfigured ? mailHost : "Not Configured");
        settings.put("emailFrom", mailConfigured ? mailUsername : "Not Configured");

        // Database
        settings.put("databaseStatus", "Connected");

        // Stats
        settings.put("totalDocuments", invoiceService.countAllInvoices());
        settings.put("totalLeads", inquiryService.countTotal());
        settings.put("totalTickets", ticketService.getAllTickets().size());
        settings.put("totalRevenue", invoiceService.getTotalRevenue());

        return ResponseEntity.ok(settings);
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs(
            @RequestParam(defaultValue = "100") int limit) {
        return ResponseEntity.ok(auditLogService.getRecentLogs(Math.min(limit, 200)));
    }
}
