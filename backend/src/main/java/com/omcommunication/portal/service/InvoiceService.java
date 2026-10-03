package com.omcommunication.portal.service;

import com.omcommunication.portal.model.DocumentCounter;
import com.omcommunication.portal.model.Invoice;
import com.omcommunication.portal.model.InvoiceItem;
import com.omcommunication.portal.repository.DocumentCounterRepository;
import com.omcommunication.portal.repository.InvoiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class InvoiceService {

    private static final Logger log = LoggerFactory.getLogger(InvoiceService.class);

    /** Minimum start value for the shared document sequence. */
    private static final long COUNTER_FLOOR = 1000;
    /** Single-row key for the persistent document counter. */
    private static final String SEQ_ID = "DOCUMENT_SEQ";

    private final InvoiceRepository invoiceRepository;
    private final RazorpayService razorpayService;
    private final DocumentCounterRepository documentCounterRepository;

    public InvoiceService(InvoiceRepository invoiceRepository,
                          RazorpayService razorpayService,
                          DocumentCounterRepository documentCounterRepository) {
        this.invoiceRepository = invoiceRepository;
        this.razorpayService = razorpayService;
        this.documentCounterRepository = documentCounterRepository;
    }

    /**
     * Return the next document sequence value from the database, under a
     * pessimistic write lock so concurrent creations (even across instances)
     * cannot mint duplicates. Called inside the @Transactional createInvoice.
     * The row is lazily seeded from the highest existing document number the
     * first time it is needed, preserving continuity with pre-existing records.
     */
    private long nextSequence() {
        DocumentCounter counter = documentCounterRepository.findByIdForUpdate(SEQ_ID)
                .orElseGet(() -> documentCounterRepository.save(
                        new DocumentCounter(SEQ_ID, seedFromExistingMax())));
        long next = counter.getCounterValue() + 1;
        counter.setCounterValue(next);
        documentCounterRepository.save(counter);
        return next;
    }

    /** Highest numeric suffix across existing document numbers, or the floor. */
    private long seedFromExistingMax() {
        long max = COUNTER_FLOOR;
        try {
            for (String num : invoiceRepository.findAllInvoiceNumbers()) {
                if (num == null) continue;
                int lastDash = num.lastIndexOf('-');
                if (lastDash >= 0 && lastDash < num.length() - 1) {
                    try {
                        long val = Long.parseLong(num.substring(lastDash + 1));
                        if (val > max) max = val;
                    } catch (NumberFormatException ignored) {
                        // Non-numeric suffix — skip
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Could not seed document counter from existing numbers, starting at {}. Reason: {}",
                    COUNTER_FLOOR, e.getMessage());
        }
        return max;
    }

    private String generateInvoiceNumber(String documentType) {
        String year = DateTimeFormatter.ofPattern("yyyy").format(LocalDateTime.now());
        long num = nextSequence();
        String prefix;
        if ("QUOTATION".equalsIgnoreCase(documentType)) {
            prefix = "OCW-Q-";
        } else if ("BILL".equalsIgnoreCase(documentType)) {
            prefix = "OCW-B-";
        } else {
            prefix = "OCW-INV-";
        }
        return prefix + year + "-" + String.format("%04d", num);
    }

    @Transactional
    public Invoice createInvoice(Invoice invoice) {
        // Generate unique invoice number if not set
        if (invoice.getInvoiceNumber() == null || invoice.getInvoiceNumber().trim().isEmpty()) {
            invoice.setInvoiceNumber(generateInvoiceNumber(invoice.getDocumentType()));
        }

        // Default documentType if missing
        if (invoice.getDocumentType() == null || invoice.getDocumentType().trim().isEmpty()) {
            invoice.setDocumentType("TAX_INVOICE");
        }

        // Default GST settings
        if (invoice.getGstEnabled() == null) {
            invoice.setGstEnabled(!"BILL".equalsIgnoreCase(invoice.getDocumentType()));
        }
        if (invoice.getGstRate() == null) {
            invoice.setGstRate(new BigDecimal("18.00"));
        }

        // Set parent reference on each item and compute item amount
        BigDecimal subtotal = BigDecimal.ZERO;
        if (invoice.getItems() != null) {
            for (InvoiceItem item : invoice.getItems()) {
                item.setInvoice(invoice);
                BigDecimal qty = BigDecimal.valueOf(item.getQuantity() != null ? item.getQuantity() : 1);
                BigDecimal unitPrice = item.getUnitPrice() != null ? item.getUnitPrice() : BigDecimal.ZERO;
                item.setAmount(unitPrice.multiply(qty));
                subtotal = subtotal.add(item.getAmount());
            }
        }

        BigDecimal taxAmount = BigDecimal.ZERO;
        if (Boolean.TRUE.equals(invoice.getGstEnabled())) {
            BigDecimal rateFraction = invoice.getGstRate().divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
            taxAmount = subtotal.multiply(rateFraction).setScale(2, RoundingMode.HALF_UP);
        }
        BigDecimal total = subtotal.add(taxAmount);

        invoice.setSubtotal(subtotal);
        invoice.setTaxAmount(taxAmount);
        invoice.setTotalAmount(total);
        if (invoice.getStatus() == null) {
            invoice.setStatus(Invoice.Status.PENDING);
        }

        // Create Razorpay order safely (do not fail document creation if payment gateway is offline)
        try {
            if (total.compareTo(BigDecimal.ZERO) > 0) {
                String razorpayOrderId = razorpayService.createOrder(total);
                invoice.setRazorpayOrderId(razorpayOrderId);
            }
        } catch (Exception e) {
            log.warn("Razorpay order creation skipped for document {}: {}",
                    invoice.getInvoiceNumber(), e.getMessage());
        }

        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice updateInvoice(UUID id, Invoice updated) {
        Invoice existing = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with ID: " + id));

        // Business logic guard: PAID and CANCELLED documents cannot be edited
        if (existing.getStatus() == Invoice.Status.PAID) {
            throw new RuntimeException("Cannot edit a PAID document. Cancel it first if changes are needed.");
        }
        if (existing.getStatus() == Invoice.Status.CANCELLED) {
            throw new RuntimeException("Cannot edit a CANCELLED document.");
        }

        existing.setClientName(updated.getClientName());
        existing.setClientPhone(updated.getClientPhone());
        existing.setClientEmail(updated.getClientEmail());
        existing.setClientAddress(updated.getClientAddress());
        existing.setClientGstin(updated.getClientGstin());
        existing.setSubject(updated.getSubject());
        existing.setTermsAndConditions(updated.getTermsAndConditions());
        existing.setDocumentType(updated.getDocumentType());
        existing.setGstEnabled(updated.getGstEnabled());
        if (updated.getGstRate() != null) {
            existing.setGstRate(updated.getGstRate());
        }

        // Clear existing items and add updated items
        existing.getItems().clear();
        BigDecimal subtotal = BigDecimal.ZERO;
        if (updated.getItems() != null) {
            for (InvoiceItem item : updated.getItems()) {
                item.setInvoice(existing);
                BigDecimal qty = BigDecimal.valueOf(item.getQuantity() != null ? item.getQuantity() : 1);
                BigDecimal unitPrice = item.getUnitPrice() != null ? item.getUnitPrice() : BigDecimal.ZERO;
                item.setAmount(unitPrice.multiply(qty));
                subtotal = subtotal.add(item.getAmount());
                existing.getItems().add(item);
            }
        }

        BigDecimal taxAmount = BigDecimal.ZERO;
        if (Boolean.TRUE.equals(existing.getGstEnabled())) {
            BigDecimal rateFraction = existing.getGstRate().divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
            taxAmount = subtotal.multiply(rateFraction).setScale(2, RoundingMode.HALF_UP);
        }
        BigDecimal total = subtotal.add(taxAmount);

        existing.setSubtotal(subtotal);
        existing.setTaxAmount(taxAmount);
        existing.setTotalAmount(total);

        return invoiceRepository.save(existing);
    }

    public Invoice getById(UUID id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with ID: " + id));
    }

    public Invoice getByInvoiceNumber(String invoiceNumber) {
        return invoiceRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + invoiceNumber));
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @Transactional
    public Invoice verifyAndMarkPaid(String invoiceNumber, String orderId, String paymentId, String signature) {
        Invoice invoice = getByInvoiceNumber(invoiceNumber);

        // Idempotency guard: prevent double-processing
        if (invoice.getStatus() == Invoice.Status.PAID) {
            return invoice; // Already paid — safe to return existing record
        }

        // Bind the payment to THIS invoice's own Razorpay order. This prevents an
        // attacker from replaying a genuinely-valid (order, payment, signature)
        // triple from a cheap document against an expensive one: the stored order
        // id must match, and the signature is verified against the stored order id
        // (not the client-supplied one). The order was created server-side with the
        // invoice total, so the paid amount is bound to the document total.
        String expectedOrderId = invoice.getRazorpayOrderId();
        if (expectedOrderId == null || expectedOrderId.isBlank()) {
            throw new RuntimeException("No payment order is associated with this document.");
        }
        if (orderId == null || !expectedOrderId.equals(orderId)) {
            throw new RuntimeException("Payment order does not belong to this document.");
        }

        if (!razorpayService.verifySignature(expectedOrderId, paymentId, signature)) {
            throw new RuntimeException("Invalid payment signature — potential fraud");
        }

        invoice.setStatus(Invoice.Status.PAID);
        invoice.setRazorpayPaymentId(paymentId);
        invoice.setRazorpaySignature(signature);
        invoice.setPaidAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    public BigDecimal getTotalRevenue() {
        BigDecimal result = invoiceRepository.sumTotalAmountByStatusPaid();
        return result != null ? result : BigDecimal.ZERO;
    }

    public BigDecimal getOutstandingAmount() {
        BigDecimal result = invoiceRepository.sumTotalAmountByStatusPending();
        return result != null ? result : BigDecimal.ZERO;
    }

    public void deleteInvoice(UUID id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + id));
        if (invoice.getStatus() == Invoice.Status.PAID) {
            throw new RuntimeException("Cannot delete a PAID invoice. Cancel it first.");
        }
        invoiceRepository.deleteById(id);
    }
}
