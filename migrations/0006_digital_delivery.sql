-- Only admin-approved paid digital order items receive a download token.
CREATE TABLE IF NOT EXISTS digital_deliveries (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 order_item_id INTEGER NOT NULL UNIQUE REFERENCES order_items(id),
 download_token TEXT NOT NULL UNIQUE,
 license_key TEXT NOT NULL,
 file_url TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_digital_deliveries_token ON digital_deliveries(download_token);
