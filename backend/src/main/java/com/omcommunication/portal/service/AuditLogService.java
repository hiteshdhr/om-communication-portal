package com.omcommunication.portal.service;

import com.omcommunication.portal.model.AuditLog;
import com.omcommunication.portal.repository.AuditLogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void log(String action, String entityType, String entityRef, String detail, String performedBy) {
        AuditLog entry = new AuditLog();
        entry.setAction(action);
        entry.setEntityType(entityType);
        entry.setEntityRef(entityRef);
        entry.setDetail(detail);
        entry.setPerformedBy(performedBy != null ? performedBy : "ADMIN");
        auditLogRepository.save(entry);
    }

    public List<AuditLog> getRecentLogs(int limit) {
        return auditLogRepository.findAllByOrderByTimestampDesc(PageRequest.of(0, limit));
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc(PageRequest.of(0, 200));
    }
}
