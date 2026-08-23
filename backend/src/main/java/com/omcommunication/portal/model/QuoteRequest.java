package com.omcommunication.portal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Represents a detailed multi-step quote request submitted through the
 * QuoteEstimator wizard. Supplements the Inquiry model with richer
 * scope-of-work context captured at submission time.
 */
@Entity
@Table(name = "quote_requests")
public class QuoteRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // ─── Client Identity ─────────────────────────────────────────────────────
    @Column(nullable = false)
    private String clientName;

    private String companyName;

    @Column(nullable = false)
    private String phone;

    private String email;

    private String siteLocation;

    // ─── Scope Details ────────────────────────────────────────────────────────
    @Column(nullable = false)
    private String facilityType;  // e.g. "Residential Society", "Factory / Industrial"

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "quote_request_services", joinColumns = @JoinColumn(name = "quote_request_id"))
    @Column(name = "service")
    private List<String> servicesRequired = new ArrayList<>();

    private String projectType;   // "New Installation" | "Upgrade / Expansion" | "Repair / Overhaul"

    @Column(columnDefinition = "TEXT")
    private String scopeDetails;  // JSON-serialized or plain-text scope from frontend

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String surveyDatePreference;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.RECEIVED;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        RECEIVED, REVIEWED, CONVERTED_TO_INQUIRY, CLOSED
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSiteLocation() { return siteLocation; }
    public void setSiteLocation(String siteLocation) { this.siteLocation = siteLocation; }
    public String getFacilityType() { return facilityType; }
    public void setFacilityType(String facilityType) { this.facilityType = facilityType; }
    public List<String> getServicesRequired() { return servicesRequired; }
    public void setServicesRequired(List<String> servicesRequired) { this.servicesRequired = servicesRequired; }
    public String getProjectType() { return projectType; }
    public void setProjectType(String projectType) { this.projectType = projectType; }
    public String getScopeDetails() { return scopeDetails; }
    public void setScopeDetails(String scopeDetails) { this.scopeDetails = scopeDetails; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getSurveyDatePreference() { return surveyDatePreference; }
    public void setSurveyDatePreference(String surveyDatePreference) { this.surveyDatePreference = surveyDatePreference; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
