# AIZORA OFFICIAL v0.4

স্বতন্ত্র Cloudflare Worker + Static Assets + D1 database-ভিত্তিক অনলাইন স্টোর।

## বর্তমানে সোর্সে যা আছে
- মোবাইল-ফ্রেন্ডলি বাংলা storefront; ফিজিক্যাল/ডিজিটাল পণ্য তালিকা ও সার্চ।
- Cart, server-side price lookup-সহ checkout API, order ID এবং order tracking API।
- Cash on Delivery, bKash/Nagad transaction reference জমা (এটি নিজে payment verify করে না)।
- Admin UI: পণ্য যোগ, অর্ডার দেখা, order/payment status পরিবর্তন।
- D1 schema/migration, basic automated API tests, GitHub Actions CI এবং Wrangler dry-run।
- Admin API-তে `ADMIN_TOKEN` secret দিয়ে Bearer-token access control।

## গুরুত্বপূর্ণ সীমাবদ্ধতা
- এই commit-এ checkout/admin কার্যকর করতে Cloudflare-এ আলাদা D1 database তৈরি করে ID bind করতে হবে; `wrangler.toml`-এ database binding এখন ইচ্ছাকৃতভাবে মন্তব্য করা।
- Cloudflare Worker-এ `ADMIN_TOKEN` secret সেট না করলে Admin API ব্যবহার করা যাবে না।
- bKash/Nagad-এর আসল payment gateway/webhook integration নেই; transaction reference শুধু জমা হয় এবং admin হাতে যাচাই করবেন।
- Customer password login/session নেই। Checkout email নেয়, কিন্তু এটি customer account/login নয়।
- Digital license generation, private R2 download delivery, automated email/SMS, image upload, shipping integration এখনো production-ready নয়।
- D1 migration চালানো, real Cloudflare deployment, production checkout এবং mobile/browser acceptance test সফল হয়েছে—এমন দাবি করা হচ্ছে না।

## Local verification
`npm install`, `npm test`, `npx wrangler deploy --dry-run` চালান। CI একই পরীক্ষা চালায়।

## Deployment safety
এটি আলাদা `aizora-official-v04` Worker name ব্যবহার করে। Mother Editor, AIZORA Builder বা অন্য live project পরিবর্তন করবেন না। Real D1 ID/secret সেট এবং migration চালানোর আগে live checkout চালু করবেন না।
