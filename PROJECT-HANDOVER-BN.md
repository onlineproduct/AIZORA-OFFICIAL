# AIZORA OFFICIAL — Handover v0.4.4

## ধাপ ২-এর চূড়ান্ত ঘোষণা
**ধাপ ২ (ফিচার ইমপ্লিমেন্টেশন) সম্পন্ন।** এই ঘোষণা PR branch-এ নির্ধারিত মূল storefront, admin, physical/digital order flow, manual payment verification, customer account এবং digital delivery-এর কোড যুক্ত হওয়ার ভিত্তিতে। এটি production-ready বা live-payment approval নয়; staging acceptance testing ধাপ ৩-এর অংশ।

## প্রকল্পের সীমা
এটি স্বতন্ত্র AIZORA OFFICIAL ই-কমার্স প্রকল্প। Mother Editor, AIZORA Universal App Builder, AIZORA AI Camera, Live Studio, Cloudfloor Store বা অন্য কোনো live repo/deployment/database পরিবর্তন করা যাবে না।

## ব্র্যান্ড সিদ্ধান্ত
- Repository/technical project: `AIZORA-OFFICIAL`
- পূর্বের সিদ্ধান্ত অনুযায়ী customer-facing নাম পরবর্তী পর্যায়ে `AIZORA EASY` করা হবে।
- নাম, production Worker বা live deployment এখন পরিবর্তন করা হবে না।

## Branch ও PR
- Branch: `feature/one-screen-product-upload`
- PR #1: https://github.com/onlineproduct/AIZORA-OFFICIAL/pull/1
- পরিবর্তনগুলো PR branch-এ; main-এ merge বা production-এ deploy করা হয়নি।

## ধাপ ২-এ যুক্ত ফিচার
- বাংলা storefront: physical/digital product list, search, cart, checkout, order tracking।
- Admin-token protected product creation, order management, manual payment-status update, sales report।
- একই admin screen-এ product image upload/change/remove; D1 image storage (সর্বোচ্চ 700 KB)।
- Digital product file upload (সর্বোচ্চ 512 KB), verified payment-এর পরে license/download entitlement, 30-day expiry এবং 10-download limit।
- Customer registration/login, PBKDF2 password hashing, hashed expiring sessions এবং HttpOnly/Secure/SameSite cookie।
- Customer নিজের order history দেখতে পারে; verified digital delivery-এর license/link পুনরায় ইস্যু করার জন্য 15-minute cooldown।
- Migrations 0001–0008: core schema, checkout fields, stock guard, product media/discounts, D1 image storage, digital delivery, customer sessions, digital reissue cooldown।
- CI-তে local D1 migration smoke test, JS syntax checks, API unit tests এবং Wrangler deploy dry-run।

## যাচাইকৃত CI
- Run: https://github.com/onlineproduct/AIZORA-OFFICIAL/actions/runs/39662316091
- ফলাফল: migrations, syntax checks, API unit tests ও deploy dry-run সফল।
- এটি local CI verification; real Cloudflare staging test নয়।

## ধাপ ৩-এ বাকি — staging/release readiness
1. আলাদা staging Worker/D1-এ end-to-end test: checkout, inventory, order tracking, admin authorization, image upload, payment verification।
2. Customer registration/login/logout, নিজের order history ও অন্য customer-এর order access প্রত্যাখ্যান যাচাই।
3. Digital fulfillment, expired link, 10-download cap, 15-minute reissue cooldown যাচাই।
4. Mobile browser acceptance test ও Worker secret/binding validation।
5. bKash/Nagad automatic payment gateway/webhook, automated email/SMS এবং 512 KB-এর বেশি digital file-এর private storage এখনও নেই।
6. Staging ফলাফল review না হওয়া পর্যন্ত production deploy/remote migration নয়।

## নিরাপত্তা সীমা
- Worker target: আলাদা `aizora-official-v04` প্রকল্প।
- `ADMIN_TOKEN`, Cloudflare API token বা password GitHub-এ/চ্যাটে দেবেন না।
- `wrangler d1 migrations apply ... --remote` বা `wrangler deploy` চালানো হয়নি।
- Mother Editor, AIZORA Builder, AIZORA AI Camera, Live Studio ও অন্য live project/database স্পর্শ করা যাবে না।
