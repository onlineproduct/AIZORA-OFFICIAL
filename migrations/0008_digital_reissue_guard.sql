-- Avoid repeated account-side license/link rotation in a short period.
ALTER TABLE digital_deliveries ADD COLUMN last_reissued_at TEXT;
