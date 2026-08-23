package com.omcommunication.portal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "inquiries")
public class Inquiry {

    public enum Status {
        NEW, CONTACTED, SITE_SURVEY, REQUIREMENT_CONFIRMED,
        QUOTATION_PREPARING, QUOTED, NEGOTIATION, WON, LOST, CANCELLED, EXPIRED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Client name is required")
    @Size(max = 100, message = "Client name cannot exceed 100 characters")
    @Column(nullable = false)
    private String clientName;

    @Size(max = 150, message = "Company name cannot exceed 150 characters")
    private String companyName;

    @NotBlank(message = "Phone number is required")
    @Size(min = 8, max = 20, message = "Phone number must be between 8 and 20 characters")
    @Column(nullable = false)
    private String phone;

    @Email(message = "Email address must be valid")
    @Size(max = 150, message = "Email cannot exceed 150 characters")
    private String email;

    @Size(max = 100, message = "Facility type cannot exceed 100 characters")
    private String facilityType; // Residential Society, Factory, Office, Retail

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "inquiry_services", joinColumns = @JoinColumn(name = "inquiry_id"))
    @Column(name = "service")
    private List<String> servicesRequired = new ArrayList<>();

    @Size(max = 50, message = "Estimated scale cannot exceed 50 characters")
    private String estimatedScale; // e.g., "1-16", "16-64", "64+"

    @Size(max = 500, message = "Site location cannot exceed 500 characters")
    private String siteLocation;   // Site address / area provided during inquiry

    @Size(max = 2000, message = "Message cannot exceed 2000 characters")
    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.NEW;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Cascade-delete associated site surveys when this inquiry is removed
    @OneToMany(mappedBy = "inquiry", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SiteSurvey> siteSurveys = new ArrayList<>();

    // Getters & Setters
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
    public String getFacilityType() { return facilityType; }
    public void setFacilityType(String facilityType) { this.facilityType = facilityType; }
    public List<String> getServicesRequired() { return servicesRequired; }
    public void setServicesRequired(List<String> servicesRequired) { this.servicesRequired = servicesRequired; }
    public String getEstimatedScale() { return estimatedScale; }
    public void setEstimatedScale(String estimatedScale) { this.estimatedScale = estimatedScale; }
    public String getSiteLocation() { return siteLocation; }
    public void setSiteLocation(String siteLocation) { this.siteLocation = siteLocation; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<SiteSurvey> getSiteSurveys() { return siteSurveys; }
    public void setSiteSurveys(List<SiteSurvey> siteSurveys) { this.siteSurveys = siteSurveys; }
}
