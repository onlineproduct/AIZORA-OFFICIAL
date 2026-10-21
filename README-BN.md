# AIZORA OFFICIAL v0.4.2 — পরীক্ষাধীন পরিবর্তন

স্বতন্ত্র Cloudflare Worker + Static Assets + D1 database-ভিত্তিক physical ও digital online store।

## বর্তমান storefront/API
- বাংলা storefront, physical/digital catalog ও search, cart, checkout form, order ID এবং tracking API।
- Checkout-এ server-side product price lookup; COD, bKash/Nagad transaction reference গ্রহণ।
- Admin API: product creation, orders, payment/order status updates, sales reports; Bearer `ADMIN_TOKEN` আবশ্যক।
- D1 schema ও migrations 0001–0003; stock guard trigger।
- Automated API tests ও GitHub Actions CI।

## PR #1: একই স্ক্রিনে দ্রুত পণ্য যোগ
- Admin form-এ একসঙ্গে পণ্যের ধরন, নাম, বিবরণ, বিক্রয়মূল্য, আগের দাম/discount, stock এবং ছবি।
- HTTPS image URL দেওয়া যায়।
- R2 binding `MEDIA_BUCKET` configured থাকলে 5 MB পর্যন্ত JPG/PNG/WEBP/GIF upload হয়।
- Storefront card uploaded image, old price এবং discount দেখায়।
- Migration `0004_product_media_and_discounts.sql` image URL, compare-at price ও digital file key field যোগ করে।
- এই পরিবর্তন feature branch/PR #1-এ আছে; main-এ merge হয়েছে বা live deploy হয়েছে—এমন নয়।

## বাধ্যতামূলক setup
1. PR review/CI success-এর পরে migration 0004 D1-এ apply করুন।
2. Cloudflare R2 bucket-এ `MEDIA_BUCKET` binding দিন; না হলে image file upload 503 দেবে। তখন HTTPS image URL ব্যবহার করা যায়।
3. Cloudflare Worker secret `ADMIN_TOKEN` সেট করুন; secret public repo বা chat-এ রাখবেন না।
4. Deploy করার আগে D1 binding এবং environment configuration পুনরায় যাচাই করুন।

## Production blockers
- bKash/Nagad official gateway/webhook verification নেই; transaction reference জমা হওয়া payment verified হওয়া নয়।
- Customer password login/session নেই।
- Private digital file delivery, license key generation, entitlement issuance সম্পূর্ণ হয়নি।
- Shipping integration, automated email/SMS ও browser/mobile acceptance tests বাকি।
- CI green হলেই production readiness নিশ্চিত হয় না। এই blockers বন্ধ এবং বাস্তব পরীক্ষা সফল না হওয়া পর্যন্ত live customer orders/payment চালু করবেন না।

## Local verification
`npm install`, `npm test`, `node --check src/index.js`, `node --check public/app.js`, `node --check public/admin.js`, `npx wrangler deploy --dry-run`।

অন্য live project—Mother Editor, AIZORA Builder, AI Camera, Live Studio, Cloudfloor Store—পরিবর্তন করবেন না।
