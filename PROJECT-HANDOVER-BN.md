# AIZORA OFFICIAL — Handover v0.4.2 (প্রস্তাবিত পরিবর্তন; PR #1)

## প্রকল্পের সীমা
এটি স্বতন্ত্র AIZORA OFFICIAL ই-কমার্স প্রকল্প। Mother Editor, AIZORA Universal App Builder, AIZORA AI Camera, Live Studio বা Cloudfloor Store-এর live repo/deployment পরিবর্তন করা যাবে না।

## ব্র্যান্ড সিদ্ধান্ত
- বর্তমানে repository/technical project: `AIZORA-OFFICIAL`
- ভবিষ্যতে কাস্টমারদের সামনে দেখানো নাম: `AIZORA EASY`
- নাম পরিবর্তন হবে সাইট পরীক্ষা ও feature completion-এর পরে; repository/Cloudflare resource name এখন পরিবর্তন করা হবে না।

## বর্তমান কোডে আছে
- বাংলা storefront, physical/digital catalog, search, cart, checkout form এবং order tracking API/UI।
- D1 schema: products, customers, orders, order_items, digital_entitlements।
- Admin-token protected product creation, order management, payment status update, sales report।
- API unit tests এবং GitHub Actions CI workflow।
- Order checkout server-side product price lookup করে; bKash/Nagad transaction reference নেয়, কিন্তু gateway/webhook দিয়ে payment নিজে verify করে না।
- Migration 0003 stock guard trigger যোগ করে।

## PR #1-এ প্রস্তাবিত পরিবর্তন (এখনো main-এ merge করা হয়নি)
- Migration 0004: `image_url`, `compare_at_price`, `digital_file_key` columns।
- Admin-এর এক স্ক্রিনে physical/digital type, নাম, description, sale price, optional old price/discount, stock, image file/HTTPS image URL।
- R2 `MEDIA_BUCKET` binding থাকলে 5 MB পর্যন্ত JPG/PNG/WEBP/GIF image upload; public product-image route।
- Storefront product cards uploaded image এবং discount display করে।
- নতুন upload authorization test।

## বাধ্যতামূলক external setup
- PR merge হওয়ার পরে তবেই migration 0004 apply করতে হবে; আগে নয়।
- Direct image upload-এর জন্য Cloudflare R2 bucket তৈরি/বেছে নিয়ে Worker-এ `MEDIA_BUCKET` binding করতে হবে।
- Worker-এ `ADMIN_TOKEN` secret থাকতে হবে; token chat বা public repo-তে লেখা যাবে না।
- বর্তমান `wrangler.toml` D1 binding ব্যবহার করে; production deployment-এ যাওয়ার আগে actual binding/configuration যাচাই করতে হবে।

## এখনো production-ready নয়
- Private digital file upload/download ও entitlement issue flow সম্পূর্ণ হয়নি।
- Real bKash/Nagad payment gateway/webhook নেই।
- Customer password login/session নেই।
- Automated email/SMS, shipping integration এবং browser/mobile acceptance test নেই।
- PR #1-এর CI ফল এখনো যাচাই হয়নি; CI green হলেও live deployment/browser acceptance test-এর বিকল্প নয়।
- Live customer orders/payment নেওয়া যাবে না যতক্ষণ blockers সমাধান ও test না হয়।

## কাজের নিয়ম
1. আগে পৃথক branch/PR-এ পরিবর্তন ও পরীক্ষা।
2. PR/CI review ছাড়া main merge নয়।
3. Migration apply/deploy করার আগে database, secret ও storage binding নিশ্চিত করতে হবে।
4. Mother Editor বা অন্য live project স্পর্শ করা যাবে না।
5. Android-friendly বাংলা ধাপে নির্দেশনা দিতে হবে এবং যাচাই ছাড়া completed/live দাবি করা যাবে না।
