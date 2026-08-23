package com.omcommunication.portal.controller;

import com.omcommunication.portal.model.Inquiry;
import com.omcommunication.portal.model.Invoice;
import com.omcommunication.portal.model.SiteSurvey;
import com.omcommunication.portal.model.Ticket;
import com.omcommunication.portal.service.InquiryService;
import com.omcommunication.portal.service.InvoiceService;
import com.omcommunication.portal.service.SiteSurveyService;
import com.omcommunication.portal.service.TicketService;
import com.razorpay.RazorpayException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final InquiryService inquiryService;
    private final InvoiceService invoiceService;
    private final TicketService ticketService;
    private final SiteSurveyService siteSurveyService;

    public AdminController(InquiryService inquiryService,
                           InvoiceService invoiceService,
                           TicketService ticketService,
                           SiteSurveyService siteSurveyService) {
        this.inquiryService = inquiryService;
        this.invoiceService = invoiceService;
        this.ticketService = ticketService;
        this.siteSurveyService = siteSurveyService;
    }

    // ─── Dashboard Metrics ────────────────────────────────────────────────────
    @GetMapping("/dashboard/metrics")
    public ResponseEntity<?> getDashboardMetrics() {
        return ResponseEntity.ok(Map.of(
                "totalInquiries", inquiryService.countTotal(),
                "newLeads", inquiryService.countByStatus(Inquiry.Status.NEW),
                "siteSurveysScheduled", siteSurveyService.countByStatus(SiteSurvey.Status.SCHEDULED),
                "quotationsPreparing", inquiryService.countByStatus(Inquiry.Status.QUOTATION_PREPARING),
                "activeComplaints", ticketService.countByStatus(Ticket.Status.OPEN)
                        + ticketService.countByStatus(Ticket.Status.IN_PROGRESS),
                "totalRevenue", invoiceService.getTotalRevenue(),
                "outstandingPayments", invoiceService.getOutstandingAmount()
        ));
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
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    // ─── Invoices ─────────────────────────────────────────────────────────────
    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @PostMapping("/invoices")
    public ResponseEntity<?> createInvoice(@RequestBody Invoice invoice) {
        try {
            Invoice created = invoiceService.createInvoice(invoice);
            return ResponseEntity.ok(created);
        } catch (RazorpayException e) {
            return ResponseEntity.status(502).body(Map.of("error", "Razorpay error: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ─── Invoices ─────────────────────────────────────────────────────────────
    // (Already has GET & POST above — adding DELETE below)

    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable UUID id) {
        try {
            invoiceService.deleteInvoice(id);
            return ResponseEntity.ok(Map.of("message", "Invoice deleted successfully."));
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
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable UUID id) {
        try {
            ticketService.deleteTicket(id);
            return ResponseEntity.ok(Map.of("message", "Ticket deleted successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}
