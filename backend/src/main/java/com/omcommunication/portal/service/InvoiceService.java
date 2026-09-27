package com.omcommunication.portal.service;

import com.omcommunication.portal.model.Invoice;
import com.omcommunication.portal.model.InvoiceItem;
import com.omcommunication.portal.repository.InvoiceRepository;
import com.razorpay.RazorpayException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class InvoiceService {

    private static final AtomicInteger COUNTER = new AtomicInteger(1000);

    private final InvoiceRepository invoiceRepository;
    private final RazorpayService razorpayService;

    public InvoiceService(InvoiceRepository invoiceRepository, RazorpayService razorpayService) {
        this.invoiceRepository = invoiceRepository;
        this.razorpayService = razorpayService;
    }

    private String generateInvoiceNumber(String documentType) {
        String year = DateTimeFormatter.ofPattern("yyyy").format(LocalDateTime.now());
        int num = COUNTER.incrementAndGet();
        String prefix = "OCW-INV-";
        if ("QUOTATION".equalsIgnoreCase(documentType)) {
            prefix = "OCW-Q-";
        } else if ("BILL".equalsIgnoreCase(documentType)) {
            prefix = "OCW-B-";
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
            System.err.println("Razorpay Order Creation Warning: " + e.getMessage());
        }

        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice updateInvoice(UUID id, Invoice updated) {
        Invoice existing = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with ID: " + id));

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

        if (!razorpayService.verifySignature(orderId, paymentId, signature)) {
            throw new RuntimeException("Invalid payment signature — potential fraud");
        }

        invoice.setStatus(Invoice.Status.PAID);
        invoice.setRazorpayPaymentId(paymentId);
        invoice.setRazorpaySignature(signature);
        invoice.setPaidAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    public BigDecimal getTotalRevenue() {
        return invoiceRepository.findAll().stream()
                .filter(i -> i.getStatus() == Invoice.Status.PAID)
                .map(Invoice::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getOutstandingAmount() {
        return invoiceRepository.findAll().stream()
                .filter(i -> i.getStatus() == Invoice.Status.PENDING)
                .map(Invoice::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
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
