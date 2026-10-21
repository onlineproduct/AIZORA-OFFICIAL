# ধাপ ৩ — ধাপ ২ সম্পন্নের পর আলাদা টেস্ট ও রিলিজ প্রস্তুতি

**ধাপ ২-এর ফিচার ইমপ্লিমেন্টেশন চূড়ান্তভাবে সম্পন্ন ঘোষণা করা হয়েছে।** এই ধাপটি শুধু staging/end-to-end যাচাই এবং release readiness-এর জন্য; CI pass-কে production approval হিসেবে ধরা যাবে না।

## উদ্দেশ্য
ধাপ ২-এর পণ্য অ্যাডমিন, ছবি আপলোড, অর্ডার, ম্যানুয়াল পেমেন্ট যাচাই, ডিজিটাল ডেলিভারি এবং গ্রাহক অ্যাকাউন্টকে আলাদা টেস্ট পরিবেশে যাচাই করা। এই ধাপে Production deploy বা live D1 migration করা হবে না।

## CI-তে যাচাই
- Worker ও browser JavaScript syntax checks
- API unit tests (D1 অনুপস্থিত থাকলে নিরাপদ ব্যর্থতা, admin authorization, account/logout আচরণ)
- Wrangler deploy dry-run
- Wrangler local D1-এ migrations 0001–0008 apply করার smoke test

## আলাদা staging-এ পরবর্তী end-to-end টেস্ট
1. Health ও product listing।
2. ফিজিক্যাল/ডিজিটাল অর্ডার তৈরি, স্টক, order tracking এবং payment status।
3. Admin token authorization, পণ্য/ছবি আপলোড, order status ও payment verification।
4. Customer registration, login, HttpOnly session cookie, logout, নিজের order history এবং অন্য customer-এর order access প্রত্যাখ্যান।
5. Verified digital order-এর file upload, license/link generation, 15-minute reissue cooldown, 30-day expiry ও 10-download limit।
6. ভুল পাসওয়ার্ড, malformed token, unpaid order, expired link, repeated requests ও database outage-এর negative tests।

## গুরুত্বপূর্ণ নিরাপত্তা সীমা
- এই ধাপে `wrangler d1 migrations apply ... --remote` চালাবেন না।
- `wrangler deploy` চালাবেন না।
- `ADMIN_TOKEN`, Cloudflare API token বা password GitHub-এ বা chat-এ দেবেন না।
- Mother Editor, AIZORA Builder, AIZORA AI Camera, Live Studio এবং অন্য কোনো live project/database পরিবর্তন করবেন না।
- bKash/Nagad gateway/webhook, automated email delivery, বড় digital file storage এবং বাস্তব Cloudflare staging-এ end-to-end test এখনও সম্পন্ন নয়। D1-এ ডিজিটাল ফাইলের সীমা 512 KB।
- CI pass হওয়া শুধু code/migration smoke test; এটি একা live customer payment নেওয়ার অনুমোদন নয়।
