package com.omcommunication.portal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "site_surveys")
public class SiteSurvey {

    public enum Status {
        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inquiry_id", nullable = false)
    private Inquiry inquiry;

    @Column(nullable = false)
    private String siteAddress;

    private String contactPerson;

    private String contactPhone;

    private LocalDate scheduledDate;

    private String technicianAssigned;

    @Column(columnDefinition = "TEXT")
    private String surveyNotes;

    @Column(columnDefinition = "TEXT")
    private String existingInfrastructure;

    @Column(columnDefinition = "TEXT")
    private String recommendedSolution;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.SCHEDULED;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    public void preUpdate() { this.updatedAt = LocalDateTime.now(); }

    // Getters & Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Inquiry getInquiry() { return inquiry; }
    public void setInquiry(Inquiry inquiry) { this.inquiry = inquiry; }
    public String getSiteAddress() { return siteAddress; }
    public void setSiteAddress(String siteAddress) { this.siteAddress = siteAddress; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public LocalDate getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDate scheduledDate) { this.scheduledDate = scheduledDate; }
    public String getTechnicianAssigned() { return technicianAssigned; }
    public void setTechnicianAssigned(String technicianAssigned) { this.technicianAssigned = technicianAssigned; }
    public String getSurveyNotes() { return surveyNotes; }
    public void setSurveyNotes(String surveyNotes) { this.surveyNotes = surveyNotes; }
    public String getExistingInfrastructure() { return existingInfrastructure; }
    public void setExistingInfrastructure(String existingInfrastructure) { this.existingInfrastructure = existingInfrastructure; }
    public String getRecommendedSolution() { return recommendedSolution; }
    public void setRecommendedSolution(String recommendedSolution) { this.recommendedSolution = recommendedSolution; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
