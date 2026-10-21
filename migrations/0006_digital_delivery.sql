-- Private digital fulfillment. Never expose data_base64 through public product APIs.
CREATE TABLE IF NOT EXISTS digital_assets (
 id TEXT PRIMARY KEY,
 product_id INTEGER NOT NULL REFERENCES products(id),
 filename TEXT NOT NULL,
 mime_type TEXT NOT NULL,
 data_base64 TEXT NOT NULL,
 byte_length INTEGER NOT NULL CHECK(byte_length > 0 AND byte_length <= 524288),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_digital_assets_product ON digital_assets(product_id);
CREATE TABLE IF NOT EXISTS digital_deliveries (
 id TEXT PRIMARY KEY,
 order_item_id INTEGER NOT NULL UNIQUE REFERENCES order_items(id),
 asset_id TEXT NOT NULL REFERENCES digital_assets(id),
 license_key_hash TEXT NOT NULL,
 download_token_hash TEXT NOT NULL UNIQUE,
 download_count INTEGER NOT NULL DEFAULT 0 CHECK(download_count >= 0),
 expires_at TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_digital_deliveries_order_item ON digital_deliveries(order_item_id);
