package com.omcommunication.portal.service;

import com.omcommunication.portal.model.Inquiry;
import com.omcommunication.portal.model.SiteSurvey;
import com.omcommunication.portal.repository.InquiryRepository;
import com.omcommunication.portal.repository.SiteSurveyRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SiteSurveyService {

    private final SiteSurveyRepository surveyRepository;
    private final InquiryRepository inquiryRepository;

    public SiteSurveyService(SiteSurveyRepository surveyRepository,
                              InquiryRepository inquiryRepository) {
        this.surveyRepository = surveyRepository;
        this.inquiryRepository = inquiryRepository;
    }

    public SiteSurvey scheduleSurvey(UUID inquiryId, SiteSurvey survey) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("Inquiry not found: " + inquiryId));
        survey.setInquiry(inquiry);
        survey.setStatus(SiteSurvey.Status.SCHEDULED);
        // Advance inquiry status to SITE_SURVEY
        inquiry.setStatus(Inquiry.Status.SITE_SURVEY);
        inquiryRepository.save(inquiry);
        return surveyRepository.save(survey);
    }

    public List<SiteSurvey> getAllSurveys() {
        return surveyRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<SiteSurvey> getSurveysForInquiry(UUID inquiryId) {
        return surveyRepository.findByInquiryId(inquiryId, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public SiteSurvey updateSurvey(UUID surveyId, SiteSurvey updates) {
        SiteSurvey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Site survey not found: " + surveyId));
        if (updates.getStatus() != null) survey.setStatus(updates.getStatus());
        if (updates.getTechnicianAssigned() != null) survey.setTechnicianAssigned(updates.getTechnicianAssigned());
        if (updates.getSurveyNotes() != null) survey.setSurveyNotes(updates.getSurveyNotes());
        if (updates.getScheduledDate() != null) survey.setScheduledDate(updates.getScheduledDate());
        if (updates.getExistingInfrastructure() != null) survey.setExistingInfrastructure(updates.getExistingInfrastructure());
        if (updates.getRecommendedSolution() != null) survey.setRecommendedSolution(updates.getRecommendedSolution());

        SiteSurvey saved = surveyRepository.save(survey);

        // If survey is completed, advance the inquiry status
        if (updates.getStatus() == SiteSurvey.Status.COMPLETED) {
            Inquiry inquiry = saved.getInquiry();
            inquiry.setStatus(Inquiry.Status.REQUIREMENT_CONFIRMED);
            inquiryRepository.save(inquiry);
        }
        return saved;
    }

    public long countByStatus(SiteSurvey.Status status) {
        return surveyRepository.findByStatus(status, Sort.unsorted()).size();
    }
}
