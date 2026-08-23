package com.omcommunication.portal.repository;

import com.omcommunication.portal.model.SiteSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.UUID;

public interface SiteSurveyRepository extends JpaRepository<SiteSurvey, UUID> {
    List<SiteSurvey> findByInquiryId(UUID inquiryId, Sort sort);
    List<SiteSurvey> findByStatus(SiteSurvey.Status status, Sort sort);
}
