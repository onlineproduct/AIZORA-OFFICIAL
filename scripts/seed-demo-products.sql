-- AIZORA OFFICIAL staging/demo catalog only.
-- Run this ONLY against a separate staging D1 database, never production.
-- Demo products are clearly labelled and use no real payment integration.
INSERT INTO products (type,name,description,price,icon,stock,active)
SELECT 'physical','DEMO · Smart Bottle','ডেমো পণ্য — বাস্তব অর্ডার/ডেলিভারির জন্য নয়।',450,'🥤',20,1
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='DEMO · Smart Bottle');
INSERT INTO products (type,name,description,price,icon,stock,active)
SELECT 'physical','DEMO · Mini Speaker','ডেমো পণ্য — বাস্তব অর্ডার/ডেলিভারির জন্য নয়।',1250,'🔊',10,1
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='DEMO · Mini Speaker');
INSERT INTO products (type,name,description,price,icon,stock,active)
SELECT 'physical','DEMO · Desk Organizer','ডেমো পণ্য — বাস্তব অর্ডার/ডেলিভারির জন্য নয়।',390,'🗂️',15,1
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='DEMO · Desk Organizer');
INSERT INTO products (type,name,description,price,icon,stock,active)
SELECT 'digital','DEMO · E-book Bundle','ডেমো পণ্য — বাস্তব ফাইল/লাইসেন্স সংযুক্ত নয়; কিনবেন না।',250,'📘',NULL,1
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='DEMO · E-book Bundle');
INSERT INTO products (type,name,description,price,icon,stock,active)
SELECT 'digital','DEMO · Design Assets','ডেমো পণ্য — বাস্তব ফাইল/লাইসেন্স সংযুক্ত নয়; কিনবেন না।',590,'🎨',NULL,1
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='DEMO · Design Assets');
INSERT INTO products (type,name,description,price,icon,stock,active)
SELECT 'digital','DEMO · Website Template','ডেমো পণ্য — বাস্তব ফাইল/লাইসেন্স সংযুক্ত নয়; কিনবেন না।',790,'💻',NULL,1
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='DEMO · Website Template');
