package com.omcommunication.portal.controller;

import com.omcommunication.portal.model.Inquiry;
import com.omcommunication.portal.model.Invoice;
import com.omcommunication.portal.model.Ticket;
import com.omcommunication.portal.service.InquiryService;
import com.omcommunication.portal.service.InvoiceService;
import com.omcommunication.portal.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final InquiryService inquiryService;
    private final InvoiceService invoiceService;
    private final TicketService ticketService;

    public PublicController(InquiryService inquiryService,
                            InvoiceService invoiceService,
                            TicketService ticketService) {
        this.inquiryService = inquiryService;
        this.invoiceService = invoiceService;
        this.ticketService = ticketService;
    }

    // ─── Submit Bulk Quote / Inquiry ──────────────────────────────────────────
    @PostMapping("/inquiries")
    public ResponseEntity<?> submitInquiry(@Valid @RequestBody Inquiry inquiry) {
        Inquiry saved = inquiryService.submitInquiry(inquiry);
        return ResponseEntity.ok(Map.of(
                "message", "Your inquiry has been received. Our team will contact you shortly.",
                "inquiryId", saved.getId().toString()
        ));
    }

    // ─── Submit Support Ticket ────────────────────────────────────────────────
    @PostMapping("/tickets")
    public ResponseEntity<?> submitTicket(@Valid @RequestBody Ticket ticket) {
        Ticket saved = ticketService.createTicket(ticket);
        return ResponseEntity.ok(Map.of(
                "message", "Ticket submitted successfully.",
                "ticketNumber", saved.getTicketNumber(),
                "status", saved.getStatus().name()
        ));
    }

    // ─── Track Complaint Ticket by TicketNumber ───────────────────────────────
    @GetMapping("/tickets/track/{ticketNumber}")
    public ResponseEntity<?> trackTicket(@PathVariable String ticketNumber) {
        Ticket ticket = ticketService.getByTicketNumber(ticketNumber);
        return ResponseEntity.ok(Map.of(
                "ticketNumber", ticket.getTicketNumber(),
                "clientName", ticket.getClientName(),
                "issueCategory", ticket.getIssueCategory() != null ? ticket.getIssueCategory() : "",
                "priority", ticket.getPriority().name(),
                "status", ticket.getStatus().name(),
                "createdAt", ticket.getCreatedAt().toString(),
                "assignedTechnician", ticket.getAssignedTechnician() != null ? ticket.getAssignedTechnician() : "Awaiting Assignment"
        ));
    }

    // ─── Get Invoice for Payment Page ─────────────────────────────────────────
    @GetMapping("/invoices/{invoiceNumber}")
    public ResponseEntity<?> getInvoice(@PathVariable String invoiceNumber) {
        Invoice invoice = invoiceService.getByInvoiceNumber(invoiceNumber);
        return ResponseEntity.ok(invoice);
    }

    // ─── Verify Razorpay Payment & Mark Invoice as PAID ──────────────────────
    @PostMapping("/invoices/{invoiceNumber}/verify-payment")
    public ResponseEntity<?> verifyPayment(
            @PathVariable String invoiceNumber,
            @RequestBody Map<String, String> payload) {
        String orderId = payload.get("razorpay_order_id");
        String paymentId = payload.get("razorpay_payment_id");
        String signature = payload.get("razorpay_signature");

        try {
            Invoice invoice = invoiceService.verifyAndMarkPaid(invoiceNumber, orderId, paymentId, signature);
            return ResponseEntity.ok(Map.of(
                    "message", "Payment verified and recorded successfully.",
                    "status", invoice.getStatus().name(),
                    "paidAt", invoice.getPaidAt().toString()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}
