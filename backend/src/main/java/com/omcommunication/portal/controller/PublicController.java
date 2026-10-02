package com.omcommunication.portal.controller;

import com.omcommunication.portal.model.Inquiry;
import com.omcommunication.portal.model.Invoice;
import com.omcommunication.portal.model.InvoiceItem;
import com.omcommunication.portal.model.Ticket;
import com.omcommunication.portal.service.InquiryService;
import com.omcommunication.portal.service.InvoiceService;
import com.omcommunication.portal.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    // ─── Health Check Endpoint for Cloud / Hosting Platforms ─────────────────
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Om Communication Work Portal API",
                "timestamp", System.currentTimeMillis()
        ));
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
                "assignedTechnician", ticket.getAssignedTechnician() != null
                        ? ticket.getAssignedTechnician() : "Awaiting Assignment"
        ));
    }

    // ─── Get Invoice for Payment Page (PII-minimized) ─────────────────────────
    // Returns only the fields needed to render the payment page.
    // Does NOT expose: clientPhone, clientEmail, clientAddress, clientGstin,
    // internal DB id, razorpayPaymentId, or razorpaySignature.
    @GetMapping("/invoices/{invoiceNumber}")
    public ResponseEntity<?> getInvoice(@PathVariable String invoiceNumber) {
        Invoice invoice = invoiceService.getByInvoiceNumber(invoiceNumber);
        // invoiceService throws RuntimeException("Invoice not found: ...") if absent;
        // GlobalExceptionHandler maps that to HTTP 404.

        Map<String, Object> response = new HashMap<>();
        response.put("invoiceNumber", invoice.getInvoiceNumber());
        response.put("documentType", invoice.getDocumentType());
        response.put("subject", invoice.getSubject() != null ? invoice.getSubject() : "");
        response.put("clientName", invoice.getClientName() != null ? invoice.getClientName() : "");
        response.put("status", invoice.getStatus() != null ? invoice.getStatus().name() : "PENDING");
        response.put("gstEnabled", invoice.getGstEnabled());
        response.put("gstRate", invoice.getGstRate());
        response.put("subtotal", invoice.getSubtotal());
        response.put("taxAmount", invoice.getTaxAmount());
        response.put("totalAmount", invoice.getTotalAmount());
        response.put("razorpayOrderId", invoice.getRazorpayOrderId());
        response.put("createdAt", invoice.getCreatedAt() != null ? invoice.getCreatedAt().toString() : null);
        response.put("termsAndConditions", invoice.getTermsAndConditions());

        // Include line items (description and amounts only — no internal IDs)
        if (invoice.getItems() != null) {
            List<Map<String, Object>> items = invoice.getItems().stream().map(item -> {
                Map<String, Object> it = new HashMap<>();
                it.put("description", item.getDescription() != null ? item.getDescription() : "");
                it.put("quantity", item.getQuantity());
                it.put("unitPrice", item.getUnitPrice());
                it.put("amount", item.getAmount());
                return it;
            }).collect(Collectors.toList());
            response.put("items", items);
        } else {
            response.put("items", List.of());
        }

        return ResponseEntity.ok(response);
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
