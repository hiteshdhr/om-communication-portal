package com.omcommunication.portal.repository;

import com.omcommunication.portal.model.DocumentCounter;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DocumentCounterRepository extends JpaRepository<DocumentCounter, String> {

    /**
     * Fetch the counter row under a PESSIMISTIC_WRITE lock so concurrent document
     * creations are serialized and cannot mint duplicate numbers. Must be called
     * inside a transaction.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select c from DocumentCounter c where c.id = :id")
    Optional<DocumentCounter> findByIdForUpdate(@Param("id") String id);
}
