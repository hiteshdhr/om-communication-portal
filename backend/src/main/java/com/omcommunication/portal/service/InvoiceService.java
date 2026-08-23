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

    private String generateInvoiceNumber() {
        String year = DateTimeFormatter.ofPattern("yyyy").format(LocalDateTime.now());
        int num = COUNTER.incrementAndGet();
        return "OM-INV-" + year + "-" + String.format("%04d", num);
    }

    @Transactional
    public Invoice createInvoice(Invoice invoice) throws RazorpayException {
        // Generate unique invoice number
        invoice.setInvoiceNumber(generateInvoiceNumber());

        // Set parent reference on each item and compute item amount
        BigDecimal subtotal = BigDecimal.ZERO;
        for (InvoiceItem item : invoice.getItems()) {
            item.setInvoice(invoice);
            item.setAmount(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            subtotal = subtotal.add(item.getAmount());
        }

        BigDecimal taxAmount = subtotal.multiply(BigDecimal.valueOf(0.18)).setScale(2, RoundingMode.HALF_UP); // 18% GST
        BigDecimal total = subtotal.add(taxAmount);

        invoice.setSubtotal(subtotal);
        invoice.setTaxAmount(taxAmount);
        invoice.setTotalAmount(total);
        invoice.setStatus(Invoice.Status.PENDING);

        // Create Razorpay order
        String razorpayOrderId = razorpayService.createOrder(total);
        invoice.setRazorpayOrderId(razorpayOrderId);

        return invoiceRepository.save(invoice);
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
