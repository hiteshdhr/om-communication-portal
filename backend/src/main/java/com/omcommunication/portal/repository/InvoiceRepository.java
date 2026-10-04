package com.omcommunication.portal.repository;

import com.omcommunication.portal.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
    boolean existsByInvoiceNumber(String invoiceNumber);

    /** Returns all invoice numbers so the counter can be seeded from the DB at startup. */
    @Query("SELECT i.invoiceNumber FROM Invoice i WHERE i.invoiceNumber IS NOT NULL")
    List<String> findAllInvoiceNumbers();

    /**
     * Fetches all invoices with their line items in a single query, ordered newest first.
     * Uses LEFT JOIN FETCH so invoices with no items are still returned.
     * DISTINCT prevents duplicate Invoice rows from the join.
     */
    @Query("SELECT DISTINCT i FROM Invoice i LEFT JOIN FETCH i.items ORDER BY i.createdAt DESC")
    List<Invoice> findAllWithItemsOrderByCreatedAtDesc();

    @Query("SELECT COALESCE(SUM(i.totalAmount), 0) FROM Invoice i WHERE i.status = :status")
    BigDecimal sumTotalAmountByStatus(@Param("status") Invoice.Status status);

    default BigDecimal sumTotalAmountByStatusPaid() {
        return sumTotalAmountByStatus(Invoice.Status.PAID);
    }

    default BigDecimal sumTotalAmountByStatusPending() {
        return sumTotalAmountByStatus(Invoice.Status.PENDING);
    }
}
