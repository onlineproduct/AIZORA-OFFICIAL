# AIZORA OFFICIAL — পরবর্তী নিরাপদ রিলিজ ধাপ (বাংলা)

**সর্বশেষ যাচাই:** 2026-10-22। GitHub Actions run `39665830122` সফল; 16টি API unit test পাস, local D1 migrations 0001–0008, JavaScript syntax checks এবং Wrangler deploy dry-run সফল।

**গুরুত্বপূর্ণ:** এই ফলাফল production-ready ঘোষণা নয়। বাস্তব Cloudflare staging Worker/D1-এ end-to-end test এবং mobile browser acceptance test এখনও করা হয়নি। এই নথির কাজ staging-এ নিরাপদে যাচাই করা—production deploy নয়।

## ইতিমধ্যে যাচাই করা
- GitHub repo: `onlineproduct/AIZORA-OFFICIAL`
- Branch: `feature/one-screen-product-upload`
- PR #1: https://github.com/onlineproduct/AIZORA-OFFICIAL/pull/1 (draft/open; main-এ merge করা হয়নি)
- Worker config-এ নাম `aizora-official-v04`; main file `src/index.js`; static assets `public/`।
- D1 binding `DB`, configured database `aizora-official-db`। বর্তমান config-এ একটি Database ID আছে; এটিকে staging database বলে ধরে নেওয়া যাবে না।
- Automated tests checkout-created email-এর account claim বন্ধ থাকার regression check-সহ 16/16 পাস করেছে।
- Production deploy বা remote D1 migration করা হয়নি।

## পরবর্তী ধাপ — আলাদা staging তৈরি
1. Cloudflare Dashboard → Storage & databases → D1 খুলুন।
2. **নতুন, আলাদা staging database** তৈরি করুন; নাম দিন `aizora-official-staging-db`।
3. নতুন database-এর Database ID শুধু এখানে দিন। Database ID secret নয়; কিন্তু কোনো API token, password বা `ADMIN_TOKEN` পাঠাবেন না।
4. এই ID পাওয়ার পর staging-এর জন্য পৃথক Wrangler environment/binding তৈরি করে CI যাচাই করতে হবে। ID অনুমান করে বা production database পুনঃব্যবহার করে staging কনফিগার করা যাবে না।
5. Staging Worker-এ `ADMIN_TOKEN` Cloudflare-এর Variables and Secrets থেকে আপনি নিজে সেট করবেন; secret chat/GitHub-এ দেবেন না।

## Staging acceptance checklist
Staging-এ test data দিয়ে প্রতিটি ধাপ হাতে যাচাই করতে হবে:
- Health endpoint ও product list।
- Physical/digital checkout; ভুল product/quantity/stock প্রত্যাখ্যান; duplicate বা concurrent stock purchase-এ negative stock না হওয়া।
- Order ID + checkout email দিয়ে tracking; ভুল email-এ order details না দেখানো।
- Admin token ছাড়া product/order/report/image/digital-asset APIs প্রত্যাখ্যান; সঠিক token-সহ admin flow।
- Product image upload: JPG/PNG/WEBP/GIF content validation, 700 KB সীমা এবং image render।
- bKash/Nagad transaction reference-এর manual review; admin যাচাই না করা পর্যন্ত digital entitlement/download না দেওয়া।
- Account register/login/logout, session expiry, own-order-only access; checkout email-এ ownership verification ছাড়া account claim বন্ধ থাকা।
- Digital file upload 512 KB সীমা, verified payment, download expiry, 10-download cap, reissue cooldown এবং unpaid/expired/revoked access rejection।
- Android mobile browser-এ layout, checkout validation, tracking ও admin workflow।
- Database outage, malformed input, repeated requests ও unauthorized access-এর negative checks।

## Production release-এর আগে বাধ্যতামূলক
- Staging acceptance checklist-এর ফলাফল নথিবদ্ধ করে review।
- Production Worker secret/bindings, database backup/restore এবং migration/rollback plan যাচাই।
- Rate limiting/abuse protection ও privacy/retention review।
- বড় digital file-এর জন্য private object storage পরিকল্পনা; বর্তমান D1 digital file limit 512 KB।
- bKash/Nagad automatic gateway/webhook ও automated email/SMS নেই। Manual payment verification-ই বর্তমান আচরণ; live payment automation হিসেবে প্রচার করা যাবে না।
- Email ownership verification/claim flow এখনও নেই। Checkout-created email দিয়ে account registration ইচ্ছাকৃতভাবে block করা হয়।
- সব blocker বন্ধ ও explicit release approval না পাওয়া পর্যন্ত production deploy বা remote production migration নয়।

## নিরাপত্তার সীমানা
- Mother Editor, AIZORA Builder, AIZORA AI Camera, Live Studio, Cloudfloor Store বা অন্য কোনো live project/database পরিবর্তন করবেন না।
- `wrangler deploy` বা `wrangler d1 migrations apply ... --remote` এখন চালাবেন না।
- Production database-কে staging test-এর জন্য ব্যবহার করবেন না।
- CI green বা dry-run সফল হওয়া মানেই real deployment/browser/payment flow সফল হওয়া নয়।
