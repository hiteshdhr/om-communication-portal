package com.omcommunication.portal.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Persistent, concurrency-safe document numbering counter.
 *
 * A single row (id = "DOCUMENT_SEQ") holds the current sequence value for the
 * shared OCW document numbering (OCW-INV / OCW-Q / OCW-B all draw from it, as
 * before). Reading it under a pessimistic write lock makes numbering safe across
 * JVM restarts AND multiple backend instances — unlike the previous in-memory
 * AtomicInteger, which only survived restarts on a single instance.
 */
@Entity
@Table(name = "document_counters")
public class DocumentCounter {

    @Id
    private String id;

    @Column(nullable = false)
    private long counterValue;

    public DocumentCounter() {
    }

    public DocumentCounter(String id, long counterValue) {
        this.id = id;
        this.counterValue = counterValue;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public long getCounterValue() { return counterValue; }
    public void setCounterValue(long counterValue) { this.counterValue = counterValue; }
}
