CREATE TRIGGER IF NOT EXISTS prevent_negative_product_stock
BEFORE UPDATE OF stock ON products
WHEN OLD.stock IS NOT NULL AND NEW.stock IS NOT NULL AND NEW.stock < 0
BEGIN
  SELECT RAISE(ABORT, 'insufficient stock');
END;
