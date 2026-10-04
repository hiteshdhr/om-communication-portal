-- ============================================================
-- postgres-patch.sql
-- Idempotent schema patch for OCW Portal (invoices + invoice_items)
-- Runs BEFORE Hibernate ddl-auto:update via spring.sql.init
-- ============================================================

-- invoices: columns added after initial table creation
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS document_type    VARCHAR(255) NOT NULL DEFAULT 'TAX_INVOICE';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS subject          VARCHAR(255);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS client_address   TEXT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS client_gstin     VARCHAR(255);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS gst_enabled      BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS gst_rate         NUMERIC(5,2) NOT NULL DEFAULT 18.00;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS paid_at          TIMESTAMP;

-- invoice_items: amount column may be missing from older schemas
ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS amount      NUMERIC(12,2);

-- document_counters: required by InvoiceService for sequence generation
CREATE TABLE IF NOT EXISTS document_counters (
    id            VARCHAR(255) PRIMARY KEY,
    counter_value BIGINT       NOT NULL DEFAULT 0
);
