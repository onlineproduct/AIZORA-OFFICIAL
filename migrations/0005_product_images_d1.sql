-- Billing-free D1 image storage; original bytes are retained for admin download.
CREATE TABLE IF NOT EXISTS product_images (
 id TEXT PRIMARY KEY,
 mime_type TEXT NOT NULL CHECK(mime_type IN ('image/jpeg','image/png','image/webp','image/gif')),
 original_name TEXT NOT NULL,
 data_base64 TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
