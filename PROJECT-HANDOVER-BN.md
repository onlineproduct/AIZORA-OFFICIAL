# AIZORA OFFICIAL — Handover v0.4.3 (PR #1; staging/release review pending)

## প্রকল্পের সীমা
এটি স্বতন্ত্র AIZORA OFFICIAL ই-কমার্স প্রকল্প। Mother Editor, AIZORA Universal App Builder, AIZORA AI Camera, Live Studio, Cloudfloor Store বা অন্য কোনো live repo/deployment/database পরিবর্তন করা যাবে না।

## ব্র্যান্ড সিদ্ধান্ত
- Repository/technical project: `AIZORA-OFFICIAL`
- পূর্বের সিদ্ধান্ত অনুযায়ী customer-facing নাম পরবর্তী পর্যায়ে `AIZORA EASY` করা হবে।
- নাম, production Worker বা live deployment এখন পরিবর্তন করা হবে না।

## বর্তমান branch ও PR
- Branch: `feature/one-screen-product-upload`
- PR #1: https://github.com/onlineproduct/AIZORA-OFFICIAL/pull/1
- পরিবর্তনগুলো এখনো PR branch-এ; main-এ merge বা production-এ deploy করা হয়নি।

## ধাপ ২-এর কোডে অন্তর্ভুক্ত
- বাংলা storefront: physical/digital product list, search, cart, checkout, order tracking।
- Admin-token protected product creation, order management, manual payment-status update, sales report।
- একই admin screen-এ product image upload/change/remove; D1-এ image storage (সর্বোচ্চ 700 KB)।
- Digital product file upload (সর্বোচ্চ 512 KB), verified payment-এর পরে license/download entitlement creation, 30-day expiry এবং 10-download limit।
- Customer registration/login, PBKDF2 password hash, hashed expiring sessions এবং HttpOnly/Secure/SameSite cookie।
- Customer নিজের order history দেখতে পারে; verified digital delivery-এর license/link পুনরায় ইস্যু করার জন্য 15-minute cooldown আছে।
- Migrations 0001–0008: core schema, checkout fields, stock guard, product media/discounts, D1 image storage, digital delivery, customer sessions, digital reissue cooldown।
- CI: local D1 migration smoke test, JS syntax checks, API unit tests এবং Wrangler deploy dry-run।

## এখনও বাস্তব staging-এ যাচাই বাকি
- Customer register/login/logout/order history-এর D1-backed end-to-end test।
- Checkout/stock, admin payment verification, image upload, digital fulfillment, expiry/download limit এবং reissue cooldown-এর end-to-end tests।
- Browser/mobile acceptance test ও staging Worker/D1 binding validation।
- bKash/Nagad automatic payment gateway/webhook, automated email/SMS এবং বড় digital file object storage নেই। D1 digital upload limit 512 KB; বড় APK/ZIP-এর জন্য উপযুক্ত নয়।
- তাই এই সংস্করণকে এখনো live customer payment-এর জন্য production-ready বলা যাবে না।

## নিরাপদ পরবর্তী ধাপ
1. সর্বশেষ CI run-এ migrations 0001–0008, syntax, tests এবং dry-run সব green কি না নিশ্চিত করা।
2. আলাদা staging Worker/D1-এ end-to-end tests করা।
3. ফলাফল review করে তবেই PR merge/deploy অনুমোদনের কথা ভাবা।
4. কোনো remote migration বা production deploy এই হ্যান্ডওভার আপডেটের অংশ নয়।
5. Mother Editor, AIZORA Builder, AIZORA AI Camera, Live Studio বা অন্য live project/database স্পর্শ করা যাবে না।
