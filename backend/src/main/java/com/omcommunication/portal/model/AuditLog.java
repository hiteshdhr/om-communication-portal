package com.omcommunication.portal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String action; // e.g. DOCUMENT_CREATED, DOCUMENT_DELETED, STATUS_CHANGED, ADMIN_LOGIN

    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    private String entityType; // e.g. INVOICE, INQUIRY, TICKET, SURVEY

    private String entityRef; // e.g. invoice number / id reference

    @Column(columnDefinition = "TEXT")
    private String detail; // human-readable description

    private String performedBy; // admin username or "SYSTEM"

    // Getters & Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public String getEntityRef() { return entityRef; }
    public void setEntityRef(String entityRef) { this.entityRef = entityRef; }
    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }
    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }
}
