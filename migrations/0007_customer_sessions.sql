-- Hashed, expiring sessions for customer accounts. Raw session tokens are only held in secure HttpOnly cookies.
CREATE TABLE IF NOT EXISTS customer_sessions (
 id TEXT PRIMARY KEY,
 customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 token_hash TEXT NOT NULL UNIQUE,
 expires_at TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_customer_sessions_customer ON customer_sessions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_sessions_expiry ON customer_sessions(expires_at);
