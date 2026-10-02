package com.omcommunication.portal.repository;

import com.omcommunication.portal.model.AuditLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
    List<AuditLog> findAllByOrderByTimestampDesc(Pageable pageable);
    List<AuditLog> findByEntityTypeOrderByTimestampDesc(String entityType);
}
