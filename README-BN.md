# AIZORA OFFICIAL v0.3
স্বতন্ত্র Cloudflare Worker + Static Assets + D1 database starter.

## কী আছে
Responsive storefront, Physical/Digital products, search, demo cart (localStorage), GET /api/health, GET /api/products, GET /api/products?type=physical|digital, GET /api/orders/:id, D1 schema.

## কী নেই
Production checkout, payment, login, admin dashboard, order creation, secure license issuance, private download, shipping workflow, automated tests. বাস্তব অর্থ লেনদেন বা গ্রাহকের সংবেদনশীল তথ্য সংগ্রহ করবেন না।

## সেটআপ
1. নতুন GitHub repo ও আলাদা Cloudflare Worker project ব্যবহার করুন। অন্য AIZORA live project পরিবর্তন করবেন না।
2. Node/Wrangler environment থাকলে `npm install` চালান।
3. D1 ছাড়াই `npm run dev` চালালে sample products দিয়ে API demo mode চলে।
4. D1 চালাতে `wrangler d1 create aizora-official-db` চালিয়ে পাওয়া ID wrangler.toml-এর commented D1 block uncomment করে বসান।
5. `npm run migrate` দিয়ে remote D1 schema তৈরি করুন। Migration-এ sample product seed নেই: D1 খালি থাকলে পণ্যের তালিকা খালি থাকবে।
6. `npm run deploy` দিয়ে নতুন project-এ deploy করুন। /api/health ও /api/products পরীক্ষা করুন।
7. Android browser testing এবং Cloudflare deploy বাস্তবে এখনো করা হয়নি।

## নিরাপত্তা
Client cart ও price বিশ্বাস করে অর্ডার তৈরি করা যাবে না। Payment verification server-side webhook দিয়ে করতে হবে। Login, authorization, rate limiting, private R2 file access, license generation, CSRF protections, validation ও testing পরবর্তী ধাপ।
